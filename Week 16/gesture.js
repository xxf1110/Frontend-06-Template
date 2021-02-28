
export class Dispatcher {
    constructor(element) {
        this.element = element
    }
    dispatch(type, properties = {}) {
        let event = new Event(type)
        for (const name in properties) {
            event[name] = properties[name]
        }
        this.element.dispatchEvent(event)
    }
}


// new Listener(new Recognizer(dispatch))

export class Listener {
    constructor(element, recognizer) {
        let contexts = new Map()
        let isListeningMouse = false

        element.addEventListener('mousedown', event => {
            let context = Object.create(null)
            // button 0 1 2 3 4  1 << 2 = 4
            contexts.set('mouse' + (1 << event.button), context)
            recognizer.start(event, context)
            const mousemove = (event) => {
                // mousemove 不分按键
                // buttons 1 2 4 8 16 或者其中多个之和
                let button = 1
                while (button <= event.buttons) {
                    if (button & event.buttons) {
                        // buttons 中建 右键顺序相反
                        let key = button
                        if (button === 2) {
                            key = 4
                        } else if (button === 4) {
                            key = 2
                        }
                        let context = contexts.get('mouse' + key)
                        recognizer.move(event, context)
                    }
                    button = button << 1
                }
            }

            const mouseup = (event) => {
                let context = contexts.get('mouse' + (1 << event.button))
                recognizer.end(event, context)
                contexts.delete('mouse' + (1 << event.button))
                if (event.buttons === 0) {
                    document.removeEventListener('mousemove', mousemove)
                    document.removeEventListener('mouseup', mouseup)
                    isListeningMouse = false
                }
            }
            if (!isListeningMouse) {
                document.addEventListener('mousemove', mousemove)
                document.addEventListener('mouseup', mouseup)
                isListeningMouse = true
            }
        })

        element.addEventListener('touchstart', (event) => {
            for (const touch of event.changedTouches) {
                let context = Object.create(null)
                contexts.set(touch.identifier, context)
                recognizer.start(touch, context)
            }
        })
        element.addEventListener('touchmove', (event) => {
            for (const touch of event.changedTouches) {
                let context = contexts.get(touch.identifier)
                recognizer.move(touch, context)
            }
        })
        element.addEventListener('touchend', (event) => {
            for (const touch of event.changedTouches) {
                let context = contexts.get(touch.identifier)
                recognizer.end(touch, context)
                contexts.delete(touch.identifier)
            }
        })
        element.addEventListener('touchcancel', (event) => {
            for (const touch of event.changedTouches) {
                let context = contexts.get(touch.identifier)
                recognizer.cancel(touch, context)
                contexts.delete(touch.identifier)
            }
        })
    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher
    }
    start(point, context){
        this.dispatcher.dispatch('start', {
            clientX: point.clientX,
            clientY: point.clientY,
        })
        context.startX = point.clientX
        context.startY = point.clientY

        context.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY,
        }]
        context.isPress = false
        context.isPan = false
        context.isTap = true

        context.handler = setTimeout(() => {
            // console.log('press');
            context.isPress = true
            context.isPan = false
            context.isTap = false
            context.handler = null
            this.dispatcher.dispatch('press', {})
        }, 500)
    }
    move(point, context){
        let dx = point.clientX - context.startX
        let dy = point.clientY - context.startY
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            // 移动距离大于10px
            context.isPan = true
            context.isPress = false
            context.isTap = false
            // console.log('pan start');
            context.isVertical = Math.abs(dx) < Math.abs(dy)
            this.dispatcher.dispatch('panstart', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
            })
            clearTimeout(context.handler)
        }
        if (context.isPan) {
            // console.log('pan');
            this.dispatcher.dispatch('pan', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical, 
            })
        }
        // 只取500ms以内的点
        context.points = context.points.filter(p => Date.now() - p.t < 500)
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY,
        })
    }
    end(point, context) {
        if (context.isPress) {
            // console.log('press end');
            this.dispatcher.dispatch('pressend', {})
        }

        if (context.isTap) {
            clearTimeout(context.handler)
            // console.log('tap');
            this.dispatcher.dispatch('tap', {})
        }

        context.points = context.points.filter(p => Date.now() - p.t < 500)
        let d, v;
        if (context.points.length) {
            d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2)
            v = d / (Date.now() - context.points[0].t)
        } else {
            v = 0
        }
        if (v > 1) { 
            // 这里方便触摸板测试改成了1.0 实际情况取1.5
            context.isFlick = true
            this.dispatcher.dispatch('panend', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical, // 是否需要重新计算
                isFlick: context.isFlick,
                velocity: v,
            })
        } else {
            context.isFlick = false
        }

        if (context.isPan) {
            // console.log('pan end');
            this.dispatcher.dispatch('panend', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical, // 是否需要重新计算
                isFlick: context.isFlick,
                velocity: v,
            })
        }
        this.dispatcher.dispatch('end', {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            isVertical: context.isVertical, // 是否需要重新计算
            isFlick: context.isFlick,
            velocity: v,
        })
    }
    cancel(point, context){
        this.dispatcher.dispatch('cancel', {})
        clearTimeout(context.handler)
    }
}

export const enableGesture = (element) => {
    new Listener(element, new Recognizer(new Dispatcher(element)))
}

