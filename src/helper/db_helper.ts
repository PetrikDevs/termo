import { Client } from 'ts-postgres';
import { DBConfig } from '../config/db_config';
import { Test, TestOxig } from '../model/tests';

const connectToDB = async (dbConfig: DBConfig): Promise<Client> =>{
    const client = new Client({
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        user: dbConfig.user,
        password: dbConfig.password
    });

    await client.connect();

    return client;
}

const disconnectFromDB = async (client: Client) => {
    await client.end();
}

const saveTestToDB = async (client: Client, test: Test) => {
    await client.query(`
        INSERT INTO tests (temp_flow_in, temp_flow_out, temp_out_side, temp_in_side, tested_at)
        VALUES (${test.temp_flow_in}, ${test.temp_flow_out}, ${test.temp_out_side}, ${test.temp_in_side}, '${test.tested_at.toISOString()}')
    `);
}

const saveTestOxigToDB = async (client: Client, test: TestOxig) => {
    await client.query(`
        INSERT INTO tests_oxig (oxig, tested_at)
        VALUES (${test.oxig}, '${test.tested_at.toISOString()}')
    `);
}

const q = async (client: Client, query: string) => {
    let res = await client.query(query);
    return res;
}

export {
    connectToDB,
    disconnectFromDB,
    saveTestToDB,
    saveTestOxigToDB,
    q
};