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
            let result;
            switch (req.body.motors) {
                case "1":
                    const motors: Motors = {
                        mot0: true,
                        mot1: false,
                        mot2: false,
                        mot3: false,
                        mot4: false
                    }
                    result = await setMotor(motors);
                    break;
                case "2":
                    const motors2: Motors = {
                        mot0: false,
                        mot1: true,
                        mot2: false,
                        mot3: false,
                        mot4: false
                    }
                    result = await setMotor(motors2);
                    break;
                case "3":
                    const motors3: Motors = {
                        mot0: false,
                        mot1: false,
                        mot2: true,
                        mot3: false,
                        mot4: false
                    }
                    result = await setMotor(motors3);
                    break;
                }
            res.json({ data: result });
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
