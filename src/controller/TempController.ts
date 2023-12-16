
import dbService from "../service/dbService";
import { SendBackTestT, convertToTest } from "../types/testT";
import { Request, Response } from "express";


export default class TempController {
    private dbService: dbService;

    constructor(dbService: dbService) {
        this.dbService = dbService;
    }

    public async getLastTest(req: Request, res: Response) {
        try {
            const result = await this.dbService.query('SELECT * FROM tests ORDER BY tested_at DESC LIMIT 1');
            const result2 = await this.dbService.query(`SELECT * FROM term_matrix WHERE id = ${result.rows[0][6]}`);

            const test: SendBackTestT = convertToTest(result.rows[0], result2.rows[0]);

            res.json(test);
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    public async getAllTests(req: Request, res: Response) {
        try {
            const result = await this.dbService.query('SELECT * FROM tests ORDER BY tested_at DESC');
            const test_list: SendBackTestT[] = [];
            for(let i = 0; i < result.rows.length; i++){
              const result2 = await this.dbService.query(`SELECT * FROM term_matrix WHERE id = ${result.rows[i][6]}`);
              test_list.push(convertToTest(result.rows[i], result2.rows[0]));
            }
            res.json(test_list);
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }
};