type SensorMatrixT= {
    sec0:{
        sensor0: number;
        sensor1: number;
        sensor2: number;
        sensor3: number;
        sensor4: number;
    }
    sec1:{
        sensor0: number;
        sensor1: number;
        sensor2: number;
        sensor3: number;
        sensor4: number;
    }
    sec2:{
        sensor0: number;
        sensor1: number;
        sensor2: number;
        sensor3: number;
        sensor4: number;
    }
    tested_at: Date;
};

type Sensor_res = {
    id: number;
}

export {
    Sensor_res,
    SensorMatrixT
};