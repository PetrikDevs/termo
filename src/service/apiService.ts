import axios from "axios";

export default class ApiService {
  private readonly base: any;
  constructor() {
    this.base = axios.create({
      baseURL: process.env.API_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get(path: string) {
    try {
      const res = await this.base.get(path);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  public async post(path: string, data: any) {
    try {
      const res = await this.base.post(path, data);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
