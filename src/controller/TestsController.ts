import dbService from "../service/dbService";
import { Senzor_m } from "../model/sensor_m";
import { Test } from "../model/tests";
import { Request, Response } from "express";
import TestService from "../service/testService";


export class TestsController {
    private testService: TestService = new TestService();

    public async getTests(req: Request, res: Response) {
        try {
            const result = await this.dbService.query('SELECT * FROM tests');
            res.json({ data: result.rows });
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    public async createTest(req: Request, res: Response) {
        try {
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

            const sens_id = await this.dbService.query(`INSERT INTO term_matrix (sec0_sensor0, sec0_sensor1, sec0_sensor2, sec0_sensor3, sec0_sensor4, sec1_sensor0, sec1_sensor1, sec1_sensor2, sec1_sensor3, sec1_sensor4, sec2_sensor0, sec2_sensor1, sec2_sensor2, sec2_sensor3, sec2_sensor4, tested_at) VALUES (${sens.sec0.sensor0}, ${sens.sec0.sensor1}, ${sens.sec0.sensor2}, ${sens.sec0.sensor3}, ${sens.sec0.sensor4}, ${sens.sec1.sensor0}, ${sens.sec1.sensor1}, ${sens.sec1.sensor2}, ${sens.sec1.sensor3}, ${sens.sec1.sensor4}, ${sens.sec2.sensor0}, ${sens.sec2.sensor1}, ${sens.sec2.sensor2}, ${sens.sec2.sensor3}, ${sens.sec2.sensor4}, ${sens.tested_at}) RETURNING id`);

            const test: Test = {
                temp_flow_in: req.body.temp_flow_in,
                temp_flow_out: req.body.temp_flow_out,
                temp_out_side: req.body.temp_out_side,
                temp_in_side: req.body.temp_in_side,
                test_id: sens_id,//TODO
                tested_at: new Date()
            };
            await this.dbService.query(`INSERT INTO tests (temp_flow_in, temp_flow_out, temp_out_side, temp_in_side, test_id, tested_at) VALUES (${test.temp_flow_in}, ${test.temp_flow_out}, ${test.temp_out_side}, ${test.temp_in_side}, ${test.test_id}, ${test.tested_at})`);

            res.json({ data: test });
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }
}
