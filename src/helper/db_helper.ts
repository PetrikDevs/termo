import { Client } from 'ts-postgres';
import { DBConfig } from '../config/db_config';
import { Test, TestOxig } from '../model/tests';
import { Senzor_m } from '../model/sensor_m';


export default class dbService {
    db_config: DBConfig = {
        host: process.env.DB_HOST || 'termo-db-1',
        port: parseInt(process.env.DB_PORT || '5432'),
    
        database: process.env.POSTGRES_DB || 'alma',
        user: process.env.POSTGRES_USER || 'alma',
        password: process.env.POSTGRES_PASSWORD || 'alma'
    };

    public async connectToDB() {
        const client = await connectToDB(this.db_config);
        return client;
    }

    public async query(query: string) {
        try {
            const client = await this.connectToDB();
            const result = await client.query(query);
            await client.end();
            return result;
          } catch (error) {
            console.error("Error connecting to the database:", error);
          }
    }
    public async getTests() {
        try {
            const client = await connectToDB(dbConfig);
            const result = await q(client, 'SELECT * FROM tests');
            await client.end();
            return result.rows;
          } catch (error) {
            console.error("Error connecting to the database:", error);
          }
    }

    public async getTestOxig() {
        try {
            const client = await connectToDB(dbConfig);
            const result = await q(client, 'SELECT * FROM tests_oxig');
            await client.end();
            return result.rows;
          } catch (error) {
            console.error("Error connecting to the database:", error);
          }
    }

    public async getTermMatrix() {
        try {
            const client = await connectToDB(dbConfig);
            const result = await q(client, 'SELECT * FROM term_matrix');
            await client.end();
            return result.rows;
          } catch (error) {
            console.error("Error connecting to the database:", error);
          }
    }

    public async createTest(test: Test) {
        try {
            const client = await connectToDB(dbConfig);
            await saveTestToDB(client, test);
            await client.end();
          } catch (error) {
            console.error("Error connecting to the database:", error);
          }
    }

    public async createTestOxig(test: TestOxig) {
        try {
            const client = await connectToDB(dbConfig);
            await saveTestOxigToDB(client, test);
            await client.end();
          } catch (error) {
            console.error("Error connecting to the database:", error);
          }
    }

    public async createTermMatrix(matrix: Senzor_m) {
        try {
            const client = await connectToDB(dbConfig);
            await saveSensorToDB(client, matrix);
            await client.end();
          } catch (error) {
            console.error("Error connecting to the database:", error);
          }
    }
}

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

const db_init = async (client: Client) => {
    await client.query(`
        CREATE TABLE IF NOT EXISTS tests (
            id SERIAL PRIMARY KEY,
            temp_flow_in FLOAT NOT NULL,
            temp_flow_out FLOAT NOT NULL,
            temp_out_side FLOAT NOT NULL,
            temp_in_side FLOAT NOT NULL,
            tested_at TIMESTAMP NOT NULL,
            term_matrix INT NOT NULL
        );
    `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS term_matrix (
            id SERIAL PRIMARY KEY,
            sensor_00 FLOAT NOT NULL,
            sensor_01 FLOAT NOT NULL,
            sensor_02 FLOAT NOT NULL,
            sensor_03 FLOAT NOT NULL,
            sensor_04 FLOAT NOT NULL,
            sensor_10 FLOAT NOT NULL,
            sensor_11 FLOAT NOT NULL,
            sensor_12 FLOAT NOT NULL,
            sensor_13 FLOAT NOT NULL,
            sensor_14 FLOAT NOT NULL,
            sensor_20 FLOAT NOT NULL,
            sensor_21 FLOAT NOT NULL,
            sensor_22 FLOAT NOT NULL,
            sensor_23 FLOAT NOT NULL,
            sensor_24 FLOAT NOT NULL,
            tested_at TIMESTAMP NOT NULL
        );
    `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS tests_oxig (
            id SERIAL PRIMARY KEY,
            oxig FLOAT NOT NULL,
            tested_at TIMESTAMP NOT NULL
        );
    `);
}

const saveTestToDB = async (client: Client, test: Test) => {
    await client.query(`
        INSERT INTO tests (temp_flow_in, temp_flow_out, temp_out_side, temp_in_side, tested_at, term_matrix)
        VALUES (${test.temp_flow_in}, ${test.temp_flow_out}, ${test.temp_out_side}, ${test.temp_in_side}, '${test.tested_at.toISOString()}', ${test.test_id})
    `);
}

const saveSensorToDB = async (client: Client, sensor: Senzor_m) => {
    const result = await client.query(`
        INSERT INTO term_matrix (sensor_00, sensor_01, sensor_02, sensor_03, sensor_04,
                                sensor_10, sensor_11, sensor_12, sensor_13, sensor_14,
                                sensor_20, sensor_21, sensor_22, sensor_23, sensor_24,
                             tested_at)
        VALUES (${sensor.sec0.sensor0}, ${sensor.sec0.sensor1}, ${sensor.sec0.sensor2}, ${sensor.sec0.sensor3}, ${sensor.sec0.sensor4},
                ${sensor.sec1.sensor0}, ${sensor.sec1.sensor1}, ${sensor.sec1.sensor2}, ${sensor.sec1.sensor3}, ${sensor.sec1.sensor4},
                ${sensor.sec2.sensor0}, ${sensor.sec2.sensor1}, ${sensor.sec2.sensor2}, ${sensor.sec2.sensor3}, ${sensor.sec2.sensor4},
                '${sensor.tested_at.toISOString()}')
        RETURNING id;
    `);
    return result.rows[0][0];
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
    saveSensorToDB,
    q,
    db_init
};