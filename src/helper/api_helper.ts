import axiosConfig from "../config/axios_config";
import { Motors } from "../model/motors";

const getMotors = async () => {
    try {
        const motors: Motors = {
            mot0: false,
            mot1: false,
            mot2: false,
            mot3: false,
            mot4: false
        }
        return motors;
        /*
        const res = await axiosConfig.get('/motors');
        return res.data.data;
        */
    } catch (error) {
        console.error(error);
    }
}

const setMotor = async (motors: Motors) => {
    try {
        const res = await axiosConfig.post('/motors', { motors });
        return res.data.data;
    } catch (error) {
        console.error(error);
    }
}

export {
    getMotors,
    setMotor
};