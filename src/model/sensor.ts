import { SensorMatrixT } from "../types/sensorMatrixT";

export default class SensorMatrix {
    private sen: SensorMatrixT;
    constructor(matrix: any) {
        const avg: number = (matrix.sec2.sensor0 + matrix.sec2.sensor1 + matrix.sec2.sensor2 + matrix.sec2.sensor3 + matrix.sec2.sensor4)/ 5;
        this.sen = {
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
                sensor2: avg,
                sensor3: matrix.sec2.sensor3,
                sensor4: matrix.sec2.sensor4,
            },
            tested_at: new Date()
        };
    }
    convertToDBFormat() {
        return [
            this.sen.sec0.sensor0,
            this.sen.sec0.sensor1,
            this.sen.sec0.sensor2,
            this.sen.sec0.sensor3,
            this.sen.sec0.sensor4,
            this.sen.sec1.sensor0,
            this.sen.sec1.sensor1,
            this.sen.sec1.sensor2,
            this.sen.sec1.sensor3,
            this.sen.sec1.sensor4,
            this.sen.sec2.sensor0,
            this.sen.sec2.sensor1,
            this.sen.sec2.sensor2,
            this.sen.sec2.sensor3,
            this.sen.sec2.sensor4,
            this.sen.tested_at
        ];
    }
}