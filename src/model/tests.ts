import { Value } from "ts-postgres";


const convertToTest = (res1: any, res2:any): SendBackTest => {
    return {
        temp_flow_in: res1[1],
        temp_flow_out: res1[2],
        temp_out_side: res1[3],
        temp_in_side: res1[4],
        test:{
            sec0:{
                sensor0: res2[2],
                sensor1: res2[3],
                sensor2: res2[4],
                sensor3: res2[5],
                sensor4: res2[6],
            },
            sec1:{
                sensor0: res2[7],
                sensor1: res2[8],
                sensor2: res2[9],
                sensor3: res2[10],
                sensor4: res2[11],
            },
            sec2:{
                sensor0: res2[12],
                sensor1: res2[13],
                sensor2: res2[14],
                sensor3: res2[15],
                sensor4: res2[16],
            }
        },
        tested_at: res1[5]
    };
}


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
    convertToTest,
    SendBackTest,
    Test,
    TestOxig,
    TestVapour
};

