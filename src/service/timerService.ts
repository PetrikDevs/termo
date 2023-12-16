export default class TimerService {
    private time: number = 3; //in minutes
    private func: Function;
    private intervalId: NodeJS.Timeout | null = null;

    constructor(func: Function) {
        // Start the interval when the instance is created
        this.func = func;
        this.startInterval();
    }
    
    private startInterval() {
        // Clear any existing interval
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
        }

        // Set a new interval
        this.intervalId = setInterval(() => {
            this.func();
        }, this.time * 60 * 1000);
    }

    public setTime(time: number) {
        this.time = time;
        this.startInterval();
    }

    public getTime() {
        return this.time;
    }

    private stopTestInterval() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public cleanup() {
        this.stopTestInterval();
    }
}