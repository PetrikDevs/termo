import e from "express";

type Senzor_m = {
    id: number;
    sec1:{
        sensor0: number;
        sensor1: number;
        sensor2: number;
        sensor3: number;
        sensor4: number;
    }
    tested_at: Date;
};

export {
    Senzor_m
};