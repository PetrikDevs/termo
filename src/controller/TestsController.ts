import { Request, Response } from "express";
import TestService from "../service/testService";

export default class TestController {
    private testService: TestService = new TestService();

    public async getAllTests(req: Request, res: Response) {
        try {
            const test = await this.testService.getAllTests();
            res.status(200).json({ data: test });
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    public async getAllTestMain(req: Request, res: Response) {
        try {
            const tests = await this.testService.getAllMainTests();
            res.status(200).json({ data: tests });
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    public async getTestById(req: Request, res: Response) {
        try {
            const test = await this.testService.getMainTestById(req.params.id);
            res.status(200).json({ data: test });
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    public async createTest(req: Request, res: Response) {
        try {
            await this.testService.createTest(req);
            res.status(200).json({ succes: true });
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }
}
