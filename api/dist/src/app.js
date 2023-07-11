"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require('express');
const multerConfig_1 = require("./multerConfig");
const gridController_1 = require("./gridController");
const PORT = 5000;
const expressApp = express();
expressApp.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
expressApp.post('/grid/data', (0, multerConfig_1.setupUpload)('single', 'grid', ['grid']), gridController_1.gridController.postProcessGrid);
expressApp.listen(PORT, function () {
    console.log("App started on port: ", PORT);
});
exports.app = expressApp;
//# sourceMappingURL=app.js.map