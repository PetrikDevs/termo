interface DBConfig {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}

const dbConfig: DBConfig = {
    host: process.env.DB_HOST || 'termo-db-1',
    port: parseInt(process.env.DB_PORT || '5432'),

    database: process.env.POSTGRES_DB || 'alma',
    user: process.env.POSTGRES_USER || 'alma',
    password: process.env.POSTGRES_PASSWORD || 'alma'
};

export {
    dbConfig,
    DBConfig
};
