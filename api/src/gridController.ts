import {RequestHandler, Request, Response} from "express";
import {gridService} from "./gridService";

interface GridController {
    postProcessGrid: RequestHandler
}


class GridControllerImpl implements GridController {
    async postProcessGrid(req: Request, res: Response) {
        try {
            const {file} = req || {};
            if (!file) return res.sendStatus(400);
            const serviceResponse = await gridService.processGrid(file);
            return res.status(200).json(serviceResponse)
        } catch (error: unknown) {
            return res.sendStatus(500);
        }
    }
}

export const gridController = new GridControllerImpl();
