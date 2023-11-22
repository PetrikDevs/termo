import { Value } from "ts-postgres";

type Test = {
    temp_flow_in: number;
    temp_flow_out: number;
    temp_out_side: number;
    temp_in_side: number;
    test_id: Value;
    tested_at: Date;
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
    Test,
    TestOxig,
    TestVapour
};

