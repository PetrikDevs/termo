import axiosConfig from "../config/axios_config";
import { Motors } from "../model/motors";

const getMotors = async () => {
    try {
        const res = await axiosConfig.get('/motors');
        return res.data.data;
    } catch (error) {
        console.error(error);
    }
}

const setMotor = async (motors: Motors[],) => {
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