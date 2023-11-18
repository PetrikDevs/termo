import { Request, Response } from "express";
import { getMotors, setMotor } from "../helper/api_helper";
import { Motors } from "../model/motors";

export class MotorsController {

    public async getMotors(req: Request, res: Response) {
        try {
            const motors: Motors = await getMotors();
            res.json({ data: motors });
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public async setMotor(req: Request, res: Response) {
        try {
            const result = await setMotor(req.body.motors);
            res.json({ data: result });
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
