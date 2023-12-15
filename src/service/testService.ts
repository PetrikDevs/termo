import DbService from "./dbService";

export default class TestService {
    private dbService: DbService = new DbService();

    public async getAllTests() {
        const sql = `SELECT * FROM tests`;
        const result = await this.dbService.query(sql);
        return result;
    }

    public async getTestById(id: number) {
        const sql = `SELECT * FROM tests WHERE id = ${id}`;
        const result = await this.dbService.query(sql);
        return result;
    }

    public async createTest(test: any) {
        const sql = `INSERT INTO tests (temp_flow_in, temp_flow_out, temp_out_side, temp_in_side, test_id, tested_at) VALUES (${test.temp_flow_in}, ${test.temp_flow_out}, ${test.temp_out_side}, ${test.temp_in_side}, ${test.test_id}, ${test.tested_at})`;
        const result = await this.dbService.query(sql);
        return result;
    }
}