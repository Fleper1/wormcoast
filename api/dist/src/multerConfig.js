"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupUpload = void 0;
const path = require('path');
const multer = require('multer');
class StorageImpl {
    constructor() {
        this._MAX_FILE_SIZE_B = 69e7;
        this._upload = {};
        this.setupUpload = (type, event, extensions) => {
            this._upload[event] = {
                event,
                extensions
            };
            return this._multer[type](event);
        };
        this._fileFilter = (req, file, next) => {
            var _a;
            if (!file)
                return next(new Error('File is not provided!'));
            const { event } = req.body || {};
            const upload = (_a = this._upload) === null || _a === void 0 ? void 0 : _a[event];
            if (typeof event !== 'string' || !upload)
                return next(new Error('Upload event is incorrect or not exists!'));
            const isExtensionValid = upload.extensions.includes(path.extname(file.originalname).slice(1));
            if (!isExtensionValid)
                return next(new Error(`Incorrect file extension: '${file.originalname}'`));
            return next(null, true);
        };
        this._multer = multer({
            fileFilter: this._fileFilter,
            limits: { fileSize: this._MAX_FILE_SIZE_B }
        });
    }
}
exports.setupUpload = new StorageImpl().setupUpload;
//# sourceMappingURL=multerConfig.js.map