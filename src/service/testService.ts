import DbService from "./dbService";
import { TestT } from "../types/testT";
import SensorMatrix from "../model/sensor";

export default class TestService {
    private dbService: DbService = new DbService();

    public async getAllTests() {
        const sql = `SELECT * FROM tests`;
        const result = await this.dbService.query(sql);
        return result;
    }

    public async getTestById(id: string) {
        const sql = `SELECT * FROM tests WHERE id = ?`;
        const result = await this.dbService.query(sql, [id]);
        return result;
    }

    public async createTest(req: any) {
        try {
            const sens = new SensorMatrix(req.body.test);
            const sensorValues = sens.convertToDBFormat();
            
            const sql = `INSERT INTO term_matrix (
                sec0_sensor0, sec0_sensor1, sec0_sensor2, sec0_sensor3, sec0_sensor4,sec1_sensor0, sec1_sensor1, sec1_sensor2, sec1_sensor3, sec1_sensor4, sec2_sensor0, sec2_sensor1, sec2_sensor2, sec2_sensor3, sec2_sensor4, tested_at
                ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
                ) RETURNING id`;
            
            const sens_id = await this.dbService.query(sql, sensorValues);
            
            const test: TestT = {
                temp_flow_in: req.body.temp_flow_in,
                temp_flow_out: req.body.temp_flow_out,
                temp_out_side: req.body.temp_out_side,
                temp_in_side: req.body.temp_in_side,
                test_id: sens_id,
                tested_at: new Date()
            };
            await this.dbService.query(`INSERT INTO tests (temp_flow_in, temp_flow_out, temp_out_side, temp_in_side, test_id, tested_at) VALUES (${test.temp_flow_in}, ${test.temp_flow_out}, ${test.temp_out_side}, ${test.temp_in_side}, ${test.test_id}, ${test.tested_at})`);
        }
        catch (error) {
            console.error("Error in the testService:", error);
        }
    }
}