"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridService = void 0;
const BINARY_DIMENSION_X = 36000;
const DIMENSION_Y = 17999;
class GridServiceImpl {
    processGrid(gridFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = [];
                const buffer = new Int8Array(gridFile.buffer);
                for (let y = 0; y < DIMENSION_Y; y += 10)
                    for (let x = 0; x < BINARY_DIMENSION_X; x += 10)
                        results.push(this._getAverage(BINARY_DIMENSION_X * y + x, buffer));
                return this._getTreatedData(results);
            }
            catch (error) {
                console.error("Error reading the file:", error);
                return null;
            }
        });
    }
    _getTreatedData(data) {
        const treatedData = [];
        data.map((value, index) => {
            if (value > -19)
                treatedData.push({ value, index });
        });
        return treatedData;
    }
    _getAverage(startIndex, fileData) {
        let x = startIndex % BINARY_DIMENSION_X;
        let y = Math.floor(startIndex / BINARY_DIMENSION_X);
        let average = 0;
        for (let i = y; i < y + 10; i++)
            for (let j = x; j < x + 10; j++)
                average += fileData[BINARY_DIMENSION_X * y + x];
        return Math.floor((Math.floor(average / 100) - 32) * 5 / 9);
    }
}
exports.gridService = new GridServiceImpl();
//# sourceMappingURL=gridService.js.map