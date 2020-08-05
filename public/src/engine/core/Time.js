
let delta = 0;

class Time {

    constructor() {
        this.elapsed = performance.now();
        this.fps = 60;
        this.framerate = 1 / this.fps;
        this.fpm = this.framerate * 1000;
    }

    get delta() {
        const result = Math.round(delta / this.fpm);
        if (result > 2) {
            return 1;
        }
        return result;
    }

    get delta2() {
        return delta;
    }

    loop(time) {
        delta = time - this.elapsed;
        this.elapsed = time;
    }

    get toString() {
        return `${(1000 / delta).toFixed(0)} FPS`;
    }

}

export const TIME = new Time;
