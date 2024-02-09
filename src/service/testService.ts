import DbService from "./dbService";
import SensorMatrix from "../model/sensor";
import Test from "../model/test";
import ApiService from "./apiService";
//import ApiService from "./apiService";

export default class TestService {
    public dbService: DbService = new DbService();

    public async getLastTest() {
        //getting the last test from the db
        const result = await this.dbService.query('SELECT * FROM tests ORDER BY tested_at DESC LIMIT 1');
    
        console.log('id: ', result.rows[0][6]);

        const result2 = await this.dbService.query(`SELECT * FROM term_matrix WHERE id = $1`, [result.rows[0][6]]);

        //creating the test instance and loadin' it up
        const test = new Test();
        test.setSendBack(result.rows[0], result2.rows[0]);
        return test;
    }

    public async getAllTests() {
        //getting all the tests from the db
        const res1 = await this.dbService.query('SELECT * FROM tests ORDER BY tested_at DESC LIMIT 10');
        const test_list: Test[] = [];

        //creating the test instances and loadin' 'em up
        for(let i = 0; i < res1.rows.length; i++){
            const res2 = await this.dbService.query('SELECT * FROM term_matrix WHERE id = $1', [res1.rows[i][6]]);
            const test = new Test();
            test.setSendBack(res1.rows[i], res2.rows[0]);
            test_list.push(test);
        }
        return test_list;
    }

    public async getAllMainTests() {
        const sql = `SELECT * FROM tests`;
        const result = await this.dbService.query(sql);
        return result;
    }

    public async getMainTestById(id: string) {
        const sql = `SELECT * FROM tests WHERE id = $1`;
        const result = await this.dbService.query(sql, [id]);
        return result;
    }

    public async createTest(){
        try {
            const apiService = new ApiService();
            const req = await apiService.get('/new_test');
            const req_body = req.data;
            console.log('data?:', req_body.test);
            //checking if the data is valid
            //console.log("No data from the arduino");
            //return;

            //creating the test and the sensor matrix instances

            const test = new Test();

            const sens = new SensorMatrix(req_body.test);
            
            //saving matrix to db
            const sensorValues = sens.convertToDBFormat();

            const sql = `INSERT INTO term_matrix (
                sensor_00, sensor_01, sensor_02, sensor_03, sensor_04, sensor_10, sensor_11, sensor_12, sensor_13, sensor_14, sensor_20, sensor_21, sensor_22, sensor_23, sensor_24, tested_at
                ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
                ) RETURNING id`;

            const sens_id = await this.dbService.query(sql, sensorValues);
            
            //setting the main elements of the test
            test.setTestMain(req_body, sens_id.rows[0][0]);

            //saving test to db
            const testValues = test.convertToDBFormat();
            const sql2 = `INSERT INTO tests (
                temp_flow_in, temp_flow_out, temp_out_side, temp_in_side, term_matrix, tested_at
                ) VALUES (
                $1, $2, $3, $4, $5, $6
                )`;
            await this.dbService.query(sql2, testValues);
        }
        catch (error) {
            console.error("Error getting the data:", error);
        }
    }
}