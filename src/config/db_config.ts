import e from "express";

interface DBConfig {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
}

const dbConfig: DBConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),

    database: process.env.POSTGRES_DB || 'alma',
    username: process.env.POSTGRES_USER || 'alma',
    password: process.env.POSTGRES_PASSWORD || 'alma'
};

export {
    dbConfig,
    DBConfig
};
