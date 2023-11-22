import { dbConfig } from "../config/db_config";
import { connectToDB, q, saveTestToDB } from "../helper/db_helper";
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

            console.log(matrix);
            //save matrix to db

            const test: Test = {
                id: 0,
                temp_flow_in: req.body.temp_flow_in,
                temp_flow_out: req.body.temp_flow_out,
                temp_out_side: req.body.temp_out_side,
                temp_in_side: req.body.temp_in_side,
                test_id: 0,//TODO
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
