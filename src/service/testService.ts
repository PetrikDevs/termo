import DbService from "./dbService";
import SensorMatrix from "../model/sensor";
import Test from "../model/test";

export default class TestService {
    private dbService: DbService = new DbService();

    public async getAllTests() {
        const result = await this.dbService.query('SELECT * FROM tests ORDER BY tested_at DESC LIMIT 1');
        const result2 = await this.dbService.query(`SELECT * FROM term_matrix WHERE id = ${result.rows[0][6]}`);

        const test = new Test();
        test.setSendBack(result.rows[0], result2.rows[0]);
        return test;
    }

    public async getAllMainTests() {
        const sql = `SELECT * FROM tests`;
        const result = await this.dbService.query(sql);
        return result;
    }

    public async getMainTestById(id: string) {
        const sql = `SELECT * FROM tests WHERE id = ?`;
        const result = await this.dbService.query(sql, [id]);
        return result;
    }

    public async createTest(req: any) {
        try {
            //creating the test and the sensor matrix instances
            const test = new Test();
            const sens = new SensorMatrix(req.body.test);

            //saving matrix to db
            const sensorValues = sens.convertToDBFormat();
            const sql = `INSERT INTO term_matrix (
                sec0_sensor0, sec0_sensor1, sec0_sensor2, sec0_sensor3, sec0_sensor4,sec1_sensor0, sec1_sensor1, sec1_sensor2, sec1_sensor3, sec1_sensor4, sec2_sensor0, sec2_sensor1, sec2_sensor2, sec2_sensor3, sec2_sensor4, tested_at
                ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
                ) RETURNING id`;
            const sens_id = await this.dbService.query(sql, sensorValues);

            //setting the main elements of the test
            test.setTestMain(req, sens_id.rows[0][0]);

            //saving test to db
            const testValues = test.convertToDBFormat();
            const sql2 = `INSERT INTO tests (
                temp_flow_in, temp_flow_out, temp_out_side, temp_in_side, test_id, tested_at
                ) VALUES (
                $1, $2, $3, $4, $5, $6
                )`;
            await this.dbService.query(sql2, testValues);
        }
        catch (error) {
            console.error("Error in the testService:", error);
        }
    }
}