import { dbConfig } from "../config/db_config";
import { connectToDB, q, saveSensorToDB, saveTestToDB } from "../helper/db_helper";
import { Senzor_m } from "../model/sensor_m";
import { Test } from "../model/tests";
import { Request, Response } from "express";


export class TestsController {

    public async getTests(req: Request, res: Response) {
        try {
            const client = await connectToDB(dbConfig);
            const result = await q(client, 'SELECT * FROM tests');
            await client.end();
            res.json({ data: result.rows });
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    public async createTest(req: Request, res: Response) {
        try {
            const client = await connectToDB(dbConfig);
            console.log(req.body);
            const matrix = req.body.test;

            const sens: Senzor_m = {
                sec0:{
                    sensor0: matrix.sec0.sensor0,
                    sensor1: matrix.sec0.sensor1,
                    sensor2: matrix.sec0.sensor2,
                    sensor3: matrix.sec0.sensor3,
                    sensor4: matrix.sec0.sensor4,
                },
                sec1:{
                    sensor0: matrix.sec1.sensor0,
                    sensor1: matrix.sec1.sensor1,
                    sensor2: matrix.sec1.sensor2,
                    sensor3: matrix.sec1.sensor3,
                    sensor4: matrix.sec1.sensor4,
                },
                sec2:{
                    sensor0: matrix.sec2.sensor0,
                    sensor1: matrix.sec2.sensor1,
                    sensor2: matrix.sec2.sensor2,
                    sensor3: matrix.sec2.sensor3,
                    sensor4: matrix.sec2.sensor4,
                },
                tested_at: new Date()
            };

            const sens_id = await saveSensorToDB(client, sens);

            const test: Test = {
                temp_flow_in: req.body.temp_flow_in,
                temp_flow_out: req.body.temp_flow_out,
                temp_out_side: req.body.temp_out_side,
                temp_in_side: req.body.temp_in_side,
                test_id: sens_id,//TODO
                tested_at: new Date()
            };
            await saveTestToDB(client, test);
            await client.end();
            res.json({ data: test });
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }
}
