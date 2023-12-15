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
}