type Test = {
    id: number;
    temp_flow_in: number;
    temp_flow_out: number;
    temp_out_side: number;
    temp_in_side: number;
    test_id: number;
    tested_at: Date;
};

type TestOxig = {
    id: number;
    oxig: number;
    tested_at: Date;
};

export {
    Test,
    TestOxig
};

