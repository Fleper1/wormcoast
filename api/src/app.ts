const express = require('express')
import {setupUpload} from "./multerConfig";
import {gridController} from "./gridController";

const PORT = 5000;

const expressApp = express()

expressApp.use(function (req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next()
});

expressApp.post('/grid/data', setupUpload('single', 'grid', ['grid']), gridController.postProcessGrid);

expressApp.listen(PORT, function () {
    console.log("App started on port: ", PORT);
});

export const app = expressApp;
