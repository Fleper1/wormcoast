type TValue = { value: number, index: number }

const BINARY_DIMENSION_X = 36000;
const DIMENSION_Y = 17999;

interface GridService {
    processGrid: (gridFile: Express.Multer.File) => Promise<TValue[] | null>
}


class GridServiceImpl implements GridService {

    public async processGrid(gridFile: Express.Multer.File): Promise<TValue[] | null> {
        try {
            const results: number[] = [];
            const buffer: Int8Array = new Int8Array(gridFile.buffer)

            for (let y = 0; y < DIMENSION_Y; y += 10)
                for (let x = 0; x < BINARY_DIMENSION_X; x += 10)
                    results.push(this._getAverage(BINARY_DIMENSION_X * y + x, buffer))

            return this._getTreatedData(results);
        } catch (error: unknown) {
            console.error("Error reading the file:", error);
            return null
        }
    }


    private _getTreatedData(data: number[]): TValue[] {
        const treatedData: TValue[] = [];
        data.map((value, index) => {
            if (value > -19)
                treatedData.push({value, index})
        })
        return treatedData;
    }

    private _getAverage(startIndex: number, fileData: Int8Array): number {
        let x = startIndex % BINARY_DIMENSION_X;
        let y = Math.floor(startIndex / BINARY_DIMENSION_X);
        let average = 0;

        for (let i = y; i < y + 10; i++)
            for (let j = x; j < x + 10; j++)
                average += fileData[BINARY_DIMENSION_X * y + x];

        return Math.floor((Math.floor(average / 100) - 32) * 5 / 9)
    }
}

export const gridService = new GridServiceImpl()