/* 
This table will be updated every minutes by the latest data from the sensors.
*/


CREATE TABLE IF NOT EXISTS tests (
    id SERIAL PRIMARY KEY,
    temp_flow_in INTEGER,
    temp_flow_out INTEGER,
    temp_out_side INTEGER,
    temp_in_side INTEGER,
    temp_matrix INTEGER,
    tested_at TIMESTAMP NOT NULL
);

/*
This table will be updated every time the sensor detects a change in the air.
*/


CREATE TABLE IF NOT EXISTS oxig (
    id SERIAL PRIMARY KEY,
    oxig INTEGER,
    tested_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS term_matrix (
    id SERIAL PRIMARY KEY,
    tested_at TIMESTAMP NOT NULL,
    sensor_00 INTEGER,
    sensor_01 INTEGER,
    sensor_02 INTEGER,
    sensor_03 INTEGER,
    sensor_04 INTEGER,
    sensor_10 INTEGER,
    sensor_11 INTEGER,
    sensor_12 INTEGER,
    sensor_13 INTEGER,
    sensor_14 INTEGER,
    sensor_20 INTEGER,
    sensor_21 INTEGER,
    sensor_22 INTEGER,
    sensor_23 INTEGER,
    sensor_24 INTEGER,
);