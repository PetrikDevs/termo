/* 
This table will be updated every minutes by the latest data from the sensors.
*/


CREATE TABLE IF NOT EXISTS tests (
    id SERIAL PRIMARY KEY,
    temp_flow_in INTEGER,
    temp_flow_out INTEGER,
    temp_out_side INTEGER,
    temp_in_side INTEGER,
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