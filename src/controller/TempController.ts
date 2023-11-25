
import { dbConfig } from "../config/db_config";
import { connectToDB, q } from "../helper/db_helper";
import { SendBackTest } from "../model/tests";
import { Request, Response } from "express";


export class TempController {
    public async getLastTest(req: Request, res: Response) {
        try {
            const client = await connectToDB(dbConfig);
            const result = await q(client, 'SELECT * FROM tests ORDER BY tested_at DESC LIMIT 1');
            const result2 = await q(client, `SELECT * FROM term_matrix WHERE id = ${result.rows[0][6]}`);
            await client.end();
            const test: SendBackTest = {
                temp_flow_in: result.rows[0][1],
                temp_flow_out: result.rows[0][2],
                temp_out_side: result.rows[0][3],
                temp_in_side: result.rows[0][4],
                test:{
                    sec0:{
                        sensor0: result2.rows[0][2],
                        sensor1: result2.rows[0][3],
                        sensor2: result2.rows[0][4],
                        sensor3: result2.rows[0][5],
                        sensor4: result2.rows[0][6],
                    },
                    sec1:{
                        sensor0: result2.rows[0][7],
                        sensor1: result2.rows[0][8],
                        sensor2: result2.rows[0][9],
                        sensor3: result2.rows[0][10],
                        sensor4: result2.rows[0][11],
                    },
                    sec2:{
                        sensor0: result2.rows[0][12],
                        sensor1: result2.rows[0][13],
                        sensor2: result2.rows[0][14],
                        sensor3: result2.rows[0][15],
                        sensor4: result2.rows[0][16],
                    }
                },
                tested_at: result.rows[0][5]
            };

            res.json(test);
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }
};