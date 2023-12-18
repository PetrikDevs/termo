import { Request, Response } from "express";
import ValveService from "../service/valveService";
import { Valve } from "../types/valveT";

export default class ValveController {
    public valveService: ValveService = new ValveService();

    public getValve(req: Request, res: Response) {
        try {
            const valve: Valve =  this.valveService.getValve();
            res.json({ data: 'valve' });
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public async setValve(req: Request, res: Response) {
        try {
            let valve: Valve =  this.valveService.formatValve(req.body.valve);
            let result = await this.valveService.setValve(valve);
            res.json({ data: result });
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
