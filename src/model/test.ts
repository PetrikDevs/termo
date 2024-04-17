import { all } from "axios";
import { TestT } from "../types/testT";

export default class Test {
  private test: TestT;

  constructor() {
    this.test = {
      tested_at: new Date(),
    };
  }

  setTestMain(req: any, id: any) {
    (this.test.temp_flow_in = req.temp_flow_in),
      (this.test.temp_flow_out = req.temp_flow_out),
      (this.test.temp_out_side = req.temp_out_side),
      (this.test.temp_in_side = req.temp_in_side),
      (this.test.test_id = id);
  }

  convertToDBFormat() {
    return [
      this.test.temp_flow_in,
      this.test.temp_flow_out,
      this.test.temp_out_side,
      this.test.temp_in_side,
      this.test.test_id,
      this.test.tested_at,
    ];
  }

  testFormin127(req1: any) {
    let w = [];
    let g = [];
    let avg = 0;
    for (let i = 8; i < 23; i++) {
      if (req1[i] == -127 || req1[i] == 85) {
        w.push(i);
      } else {
        g.push();
      }
    }

    for (let i = 0; i < g.length; i++) {
      avg += req1[g[i]];
    }
    avg = avg / g.length;

    for (let i = 0; i < w.length; i++) {
      req1[w[i]] = avg;
    }

    return req1;
  }

  setSendBack(req1: any) {
    req1 = this.testFormin127(req1);
    this.test = {
      temp_flow_in: req1[1],
      temp_flow_out: req1[2],
      temp_out_side: req1[3],
      temp_in_side: req1[4],
      test_id: req1[6],
      test: {
        sec0: {
          sensor0: req1[8],
          sensor1: req1[9],
          sensor2: req1[10],
          sensor3: req1[11],
          sensor4: req1[12],
        },
        sec1: {
          sensor0: req1[13],
          sensor1: req1[14],
          sensor2: req1[15],
          sensor3: req1[16],
          sensor4: req1[17],
        },
        sec2: {
          sensor0: req1[18],
          sensor1: req1[19],
          sensor2: req1[20],
          sensor3: req1[21],
          sensor4: req1[22],
        },
      },
      tested_at: req1[5],
    };
  }
}
