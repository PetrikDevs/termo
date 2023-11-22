import { Value } from "ts-postgres";

type Test = {
    temp_flow_in: number;
    temp_flow_out: number;
    temp_out_side: number;
    temp_in_side: number;
    test_id: Value;
    tested_at: Date;
};

type SendBackTest = {
    temp_flow_in: Value;
    temp_flow_out: Value;
    temp_out_side: Value;
    temp_in_side: Value;
    test:{
        sec0:{
            sensor0: Value;
            sensor1: Value;
            sensor2: Value;
            sensor3: Value;
            sensor4: Value;
        },
        sec1:{
            sensor0: Value;
            sensor1: Value;
            sensor2: Value;
            sensor3: Value;
            sensor4: Value;
        },
        sec2:{
            sensor0: Value;
            sensor1: Value;
            sensor2: Value;
            sensor3: Value;
            sensor4: Value;
        }
    }
    tested_at: Value;
};

type TestOxig = {
    oxig: number;
    tested_at: Date;
};

type TestVapour = {
    vapour0: number;
    vapour1: number;
    tested_at: Date;
};

export {
    SendBackTest,
    Test,
    TestOxig,
    TestVapour
};

