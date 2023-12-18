import { Request, Response } from "express";
import TestService from "../service/testService";
import TimerService from "../service/timerService";

export default class TestController {
    private testService: TestService = new TestService();
    private timerService: TimerService = new TimerService(this.testService.createTest);

    public setTimer(req: Request, res: Response) {
        try {
            this.timerService.setTime(req.body.time);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public getTimer(req: Request, res: Response) {
      try {
          const time: number = this.timerService.getTime();
          console.log(time);
          return res.status(200).json({ data: time });
      } catch (error) {
          console.error("Error trying to get timer", error);
          res.status(500).json({ error: "Internal Server Error" });
      }
  }
  

    public async getAllTests(req: Request, res: Response) {
        try {
            const test = await this.testService.getAllTests();
            res.status(200).json({ data: test });
          } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    public async getLastTest(req: Request, res: Response) {
        try {
            const test = await this.testService.getLastTest();
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

}
