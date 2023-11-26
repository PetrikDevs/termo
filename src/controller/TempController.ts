
import { dbConfig } from "../config/db_config";
import { connectToDB, q } from "../helper/db_helper";
import { SendBackTest, convertToTest } from "../model/tests";
import { Request, Response } from "express";


export class TempController {
    public async getLastTest(req: Request, res: Response) {
        try {
            const client = await connectToDB(dbConfig);
            const result = await q(client, 'SELECT * FROM tests ORDER BY tested_at DESC LIMIT 1');
            const result2 = await q(client, `SELECT * FROM term_matrix WHERE id = ${result.rows[0][6]}`);
            await client.end();
            const test: SendBackTest = convertToTest(result.rows[0], result2.rows[0]);

            res.json(test);
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    public async getAllTests(req: Request, res: Response) {
        try {
            const client = await connectToDB(dbConfig);
            const result = await q(client, 'SELECT * FROM tests ORDER BY tested_at DESC');
            const test_list: SendBackTest[] = [];
            for(let i = 0; i < result.rows.length; i++){
              const result2 = await q(client, `SELECT * FROM term_matrix WHERE id = ${result.rows[i][6]}`);
              test_list.push(convertToTest(result.rows[i], result2.rows[0]));
            }
            await client.end();
            res.json(test_list);
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }
};