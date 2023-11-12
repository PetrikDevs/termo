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
            const test: Test = req.body as Test;
            await saveTestToDB(client, test);
            await client.end();
            res.json({ data: test });
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }
}
