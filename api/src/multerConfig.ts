const path = require('path');
const multer = require('multer')
import {Options} from "multer";
import {RequestHandler} from "express";


type TUploadType = 'single';
type TFileUpload = {
    event: string;
    extensions: string[];
};

type TUploadSetup = { [key: string]: TFileUpload };

type TSetupUpload = (
    type: TUploadType,
    event: string,
    extensions: string[],
) => RequestHandler;

interface Storage {
    setupUpload: TSetupUpload
}

class StorageImpl implements Storage {
    private _MAX_FILE_SIZE_B = 69e7;
    private _upload: TUploadSetup = {};

    public setupUpload: TSetupUpload = (type, event, extensions) => {
        this._upload[event] = {
            event,
            extensions
        };
        return this._multer[type](event);
    };

    private _fileFilter: Options['fileFilter'] = (req, file, next) => {
        if (!file) return next(new Error('File is not provided!'));

        const {event} = req.body || {};
        const upload: TFileUpload = this._upload?.[event];
        if (typeof event !== 'string' || !upload)
            return next(new Error('Upload event is incorrect or not exists!'));

        const isExtensionValid = upload.extensions.includes(
            path.extname(file.originalname).slice(1)
        );
        if (!isExtensionValid)
            return next(new Error(`Incorrect file extension: '${file.originalname}'`));

        return next(null, true);
    };

    private _multer = multer({
        fileFilter: this._fileFilter,
        limits: {fileSize: this._MAX_FILE_SIZE_B}
    });

}

export const {setupUpload} = new StorageImpl();