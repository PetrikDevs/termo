import { Valve } from "../types/valveT";
import ApiService from "./apiService";

export default class ValveService {
    private apiService: ApiService = new ApiService();;

    public getValve(): Valve {
        try {
            return {
                valve0: false,
                valve1: false,
                valve2: false,
                valve3: false,
                valve4: false
            }
            /*
            const res = await axiosConfig.get('/get_valve');
            return res.data.data;
            */
        } catch (error) {
            console.error(error);
        }
    }

    public getAlma(): string {
        try {
            return "alma";
        } catch (error) {
            console.error(error);
        }
    }

    public async setValve(valve: Valve): Promise<any> {
        try {
            const res = await this.apiService.post('/set_valve', valve);
            return res.data.data;
        } catch (error) {
            console.error(error);
        }
    }
    public formatValve(id: string): Valve {
        switch (id) {
            case "1":
                return {
                    valve0: true,
                    valve1: true,
                    valve2: false,
                    valve3: false,
                    valve4: false
                }
            case "2":
                return {
                    valve0: false,
                    valve1: false,
                    valve2: true,
                    valve3: true,
                    valve4: false
                }
            case "3":
                return {
                    valve0: true,
                    valve1: true,
                    valve2: true,
                    valve3: true,
                    valve4: false
                }
            case "4":
                return {
                    valve0: false,
                    valve1: false,
                    valve2: false,
                    valve3: false,
                    valve4: true
                }
            default:
                return {
                    valve0: false,
                    valve1: false,
                    valve2: false,
                    valve3: false,
                    valve4: false
                }
        }
    }
}