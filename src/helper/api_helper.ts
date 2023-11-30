import axiosConfig from "../config/axios_config";
import { Szelep } from "../model/szelep";

const getSzelep = async () => {
    try {
        const szelep: Szelep = {
            szelep0: false,
            szelep1: false,
            szelep2: false,
            szelep3: false,
            szelep4: false
        }
        return szelep;
        /*
        const res = await axiosConfig.get('/szelep');
        return res.data.data;
        */
    } catch (error) {
        console.error(error);
    }
}

const setSzelep = async (szelep: Szelep) => {
    try {
        const res = await axiosConfig.post('/szelep', { szelep });
        return res.data.data;
    } catch (error) {
        console.error(error);
    }
}

export {
    getSzelep,
    setSzelep
};