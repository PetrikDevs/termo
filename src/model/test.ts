import { TestT } from "../types/testT";

export default class Test {
   private test: TestT;

   constructor() {
       this.test = {
           tested_at: new Date()
       };
   }

   setTestMain(req: any, id: any) {
        this.test.temp_flow_in = req.temp_flow_in,
        this.test.temp_flow_out = req.temp_flow_out,
        this.test.temp_out_side = req.temp_out_side,
        this.test.temp_in_side = req.temp_in_side,
        this.test.test_id = id
    };

    convertToDBFormat() {
        return [
            this.test.temp_flow_in,
            this.test.temp_flow_out,
            this.test.temp_out_side,
            this.test.temp_in_side,
            this.test.test_id,
            this.test.tested_at
        ];
    }

   setSendBack(req1: any) {
        this.test = {
            temp_flow_in: req1[1],
            temp_flow_out: req1[2],
            temp_out_side: req1[3],
            temp_in_side: req1[4],
            test_id: req1[6],
            test: {
                sec0:{
                    sensor0: req1[9],
                    sensor1: req1[10],
                    sensor2: req1[11],
                    sensor3: req1[12],
                    sensor4: req1[13],
                },
                sec1:{
                    sensor0: req1[14],
                    sensor1: req1[15],
                    sensor2: req1[16],
                    sensor3: req1[17],
                    sensor4: req1[18],
                },
                sec2:{
                    sensor0: req1[19],
                    sensor1: req1[20],
                    sensor2: req1[21],
                    sensor3: req1[22],
                    sensor4: req1[23],
                }
            },
            tested_at: req1[5]
        };
    }
}