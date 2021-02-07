const TICK = Symbol('TICK')
const TICK_HANDLER = Symbol('TICK_HANDLER')
const ANIMATIONS = Symbol('ANIMATIONS')
const STARTTIME = Symbol('STARTTIME')
const PAUSE_START = Symbol('PAUSE_START')
const PAUSE_TIME = Symbol('PAUSE_TIME')



export class Timeline {
    constructor() {
        this.state = 'inited'
        this[ANIMATIONS] = new Set()
        this[STARTTIME] = new Map()
    }
    start() {
        if(this.state !== 'inited') return;
        this.state = 'started'
        let startTime = Date.now()
        this[PAUSE_TIME] = 0
        this[TICK] = () => {
            let now = Date.now()
            for (const animation of this[ANIMATIONS]) {
                let t;
                if (this[STARTTIME].get(animation) < startTime) {
                    t = now - startTime
                } else {
                    t = now - this[STARTTIME].get(animation)
                }
                t = t - this[PAUSE_TIME] - animation.delay
                if (animation.duration < t) {
                    t = animation.duration
                    this[ANIMATIONS].delete(animation)
                }
                if (t > 0) {
                    animation.receive(t)
                }
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
        }
        this[TICK]()
        return this;
    }
    pause() {
        if(this.state !== 'started') return;
        this.state = 'paused'
        this[PAUSE_START] = Date.now()
        cancelAnimationFrame(this[TICK_HANDLER])
    }

    resume() {
        if(this.state !== 'paused') return;
        this.state = 'started'
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
        this[TICK]()
    }

    reset() {
        this.pause()
        this.state = 'inited'
        this[PAUSE_TIME] = 0
        this[ANIMATIONS] = new Set()
        this[STARTTIME] = new Map()
        this[TICK_HANDLER] = null
        this[PAUSE_START] = null
    }
    add(animation, startTime) {
        if (arguments.length < 2) {
            startTime = Date.now()
        }
        this[ANIMATIONS].add(animation)
        this[STARTTIME].set(animation, startTime)
        return this;
    }
}


export class Animation {
    constructor(object, property, startValue, endValue, duration = 500, delay = 0, timingFunction = v => v, template = v => v) {
        this.object = object
        this.property = property
        this.startValue = startValue
        this.endValue = endValue
        this.duration = duration
        this.timingFunction = timingFunction
        this.delay = delay
        this.template = template
    }
    receive(time) {
        let range = this.endValue - this.startValue
        let p = this.timingFunction(time / this.duration)
        this.object[this.property] = this.template(this.startValue + range * p)
    }

}