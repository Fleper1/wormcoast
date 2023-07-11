import axios from "axios";

export default class GridReaderService {

    static async getGridData(file: FormData) {
        try {
            return await axios.post('http://localhost:5001/grid/data', file)
        } catch (e: any) {
            console.log(e)
            return e;
        }
    }

}