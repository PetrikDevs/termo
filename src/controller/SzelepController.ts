import { Request, Response } from "express";
import { getSzelep, setSzelep } from "../helper/api_helper";
import { Szelep } from "../model/szelep";

export class SzelepController {

    public async getSzelep(req: Request, res: Response) {
        try {
            const szelep: Szelep = await getSzelep();
            res.json({ data: szelep });
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public async setSzelep(req: Request, res: Response) {
        try {
            let result;
            switch (req.body.motors) {
                case "1":
                    const szelep0: Szelep = {
                        szelep0: true,
                        szelep1: false,
                        szelep2: false,
                        szelep3: false,
                        szelep4: false
                    }
                    result = await setSzelep(szelep0);
                    break;
                case "2":
                    const szelep1: Szelep = {
                        szelep0: true,
                        szelep1: false,
                        szelep2: true,
                        szelep3: false,
                        szelep4: false
                    }
                    result = await setSzelep(szelep1);
                    break;
                case "3":
                    const szelep2: Szelep = {
                        szelep0: true,
                        szelep1: false,
                        szelep2: false,
                        szelep3: true,
                        szelep4: false
                    }
                    result = await setSzelep(szelep2);
                    break;
                }
            res.json({ data: result });
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
