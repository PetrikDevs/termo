import { Client } from 'ts-postgres';
import DBConfig from '../model/dbConfig';

export default class DbService {
    private db_config: DBConfig = {
        host: process.env.DB_HOST || 'termo-db-1',
        port: parseInt(process.env.DB_PORT || '5432'),
    
        database: process.env.POSTGRES_DB || 'alma',
        user: process.env.POSTGRES_USER || 'alma',
        password: process.env.POSTGRES_PASSWORD || 'alma'
    };

    private async connectToDB() {
        try{
            const client = new Client({
                host: this.db_config.host,
                port: this.db_config.port,
                database: this.db_config.database,
                user: this.db_config.user,
                password: this.db_config.password
            });
            await client.connect();
            return client; 
        }
        catch (error) {
            console.error("Error connecting to the database:", error);
        }
    }

    private async disconnectFromDB(client: Client) {
        try {
            await client.end();
        }
        catch (error) {
                console.error("Error disconnecting from the database:", error);
        }
    }

    public async query(query: string) {
        try {
            const client = await this.connectToDB();
            try {
                const result = await client.query(query);
                return result;
            }
            catch (error) {
                console.error("Error executing query:", error);
            }
            finally {
                await this.disconnectFromDB(client);
            }
        } 
        catch (error) {
            console.error("Error connecting to the database:", error);
        }
    }

    public init = async () => {
        try {
            await this.query(`
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

            await this.query(`
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

            await this.query(`
            CREATE TABLE IF NOT EXISTS tests_oxig (
                id SERIAL PRIMARY KEY,
                oxig FLOAT NOT NULL,
                tested_at TIMESTAMP NOT NULL
                );
            `);
    
        }
        catch (error) {
            console.error("Error initializing database:", error);
        }
    }
}