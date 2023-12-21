import { Valve } from "../types/valveT";
import ApiService from "./apiService";

export default class ValveService {
    private apiService: ApiService = new ApiService();
    private valve: Valve = {
        valve0: false,
        valve1: false,
        valve2: false,
        valve3: false,
        valve4: false
    }

    public getValve(): Valve {
        try {
            return this.valve;
            /*
            const res = await axiosConfig.get('/get_valve');
            return res.data.data;
            */
        } catch (error) {
            console.error(error);
        }
    }

    public setValve(valve: Valve): Valve {
        try {
            this.valve = valve;
            /*const res = await this.apiService.post('/set_valve', valve);
            return res.data.data;*/
            return this.valve;
        } catch (error) {
            console.error(error);
        }
    }
    public formatValve(data: any): Valve {
        try {
            const valve: Valve = {
                valve0: data.valve0,
                valve1: data.valve1,
                valve2: data.valve2,
                valve3: data.valve3,
                valve4: data.valve4
            }
            return valve;
        } catch (error) {
            console.error(error);
            return this.valve;
        }
    }
}