import { SendBackTestT, TestT } from "../types/testT";

export default class Test {
   private test: TestT;

   constructor(test: any) {
       this.test = {
           temp_flow_in: test.temp_flow_in,
           temp_flow_out: test.temp_flow_out,
           temp_out_side: test.temp_out_side,
           temp_in_side: test.temp_in_side,
           test_id: test.test_id,
           tested_at: new Date()
       };
   }
   setSensorMatrix(matrix: any) {
         this.test.test = {
              sec0:{
                sensor0: matrix.sec0.sensor0,
                sensor1: matrix.sec0.sensor1,
                sensor2: matrix.sec0.sensor2,
                sensor3: matrix.sec0.sensor3,
                sensor4: matrix.sec0.sensor4,
              },
              sec1:{
                sensor0: matrix.sec1.sensor0,
                sensor1: matrix.sec1.sensor1,
                sensor2: matrix.sec1.sensor2,
                sensor3: matrix.sec1.sensor3,
                sensor4: matrix.sec1.sensor4,
              },
              sec2:{
                sensor0: matrix.sec2.sensor0,
                sensor1: matrix.sec2.sensor1,
                sensor2: matrix.sec2.sensor2,
                sensor3: matrix.sec2.sensor3,
                sensor4: matrix.sec2.sensor4,
              }
         };
    }
}