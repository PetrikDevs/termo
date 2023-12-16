import { TestT } from "../types/testT";

export default class Test {
   private test: TestT;

   constructor() {
       this.test = {
           tested_at: new Date()
       };
   }

   setTestMain(req: any, id: any) {
        this.test.temp_flow_in = req.body.temp_flow_in,
        this.test.temp_flow_out = req.body.temp_flow_out,
        this.test.temp_out_side = req.body.temp_out_side,
        this.test.temp_in_side = req.body.temp_in_side,
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

   setSendBack(req1: any, req2: any) {
        this.test = {
            temp_flow_in: req1[1],
            temp_flow_out: req1[2],
            temp_out_side: req1[3],
            temp_in_side: req1[4],
            test_id: req1[6],
            test: {
                sec0:{
                    sensor0: req2[2],
                    sensor1: req2[3],
                    sensor2: req2[4],
                    sensor3: req2[5],
                    sensor4: req2[6],
                },
                sec1:{
                    sensor0: req2[7],
                    sensor1: req2[8],
                    sensor2: req2[9],
                    sensor3: req2[10],
                    sensor4: req2[11],
                },
                sec2:{
                    sensor0: req2[12],
                    sensor1: req2[13],
                    sensor2: req2[14],
                    sensor3: req2[15],
                    sensor4: req2[16],
                }
            },
            tested_at: req1[5]
        };
    }
}