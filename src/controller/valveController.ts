import { Request, Response } from "express";
import ValveService from "../service/valveService";
import { Valve } from "../types/valveT";

export default class ValveController {
    private valveService: ValveService = new ValveService();

    constructor() {
        this.getValve = this.getValve.bind(this);
        this.setValve = this.setValve.bind(this);
    }

    public getValve(req: Request, res: Response) {
        try {
            const valve: Valve =  this.valveService.getValve();
            res.json({ data: valve });
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public setValve(req: Request, res: Response) {
        try {
            console.log(req.body.valve);
            let valve: Valve =  this.valveService.formatValve(req.body.valve);
            let result = this.valveService.setValve(valve);
            res.json({ data: result });
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
