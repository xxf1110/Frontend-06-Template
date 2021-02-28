import { Component, createElement, STATE, ATTRIBUTE } from "./framework";
import { Timeline, Animation } from "./animation";
import { enableGesture } from "./gesture";
import { ease } from "./ease";

export {STATE, ATTRIBUTE} from './framework'

export class Carousel extends Component {
    constructor() {
        super()
    }
    appendChild(child) {
        child.mountTo(this.root)
    }
    render() {
        // console.log(this.attributes.src);
        this.root = document.createElement('div')
        this.root.classList.add('carousel')

        for (const record of this[ATTRIBUTE].src) {
            let child = document.createElement('div')
            child.innerHTML = record.img
            this.root.appendChild(child)
        }

        /*let currentIndex = 0
        setInterval(() => {
            let children = this.root.children
            let nextIndex = (currentIndex + 1) % children.length
            let next = children[nextIndex]
            let current = children[currentIndex]

            next.style.transition = 'none'
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`

            setTimeout(() => {
                next.style.transition = ''
                current.style.transform = `translateX(${-100 -currentIndex * 100}%)`
                next.style.transform  = `translateX(${-nextIndex * 100}%)`
                currentIndex = nextIndex
            },16)
        }, 3000)*/
        enableGesture(this.root)
        let timeline = new Timeline()
        timeline.start()

        let children = this.root.children
        this[STATE].position = 0
        let t = 0
        let handler = null;
        let ax = 0

        this.root.addEventListener('tap', e => {
            this.triggerEvent('click', {
                data: this[ATTRIBUTE].src[this[STATE].position],
                position: this[STATE].position
            })
        })

        this.root.addEventListener('start', e => {
            timeline.pause()
            clearInterval(handler)
            let progress = (Date.now() - t) / 500
            ax = ease(progress) * 400 - 400
        })
        this.root.addEventListener('pan', e => {
            let x = e.clientX - e.startX - ax
            let current = this[STATE].position - (x - x % 400) / 400
            for (const offset of [-1, 0, 1]) {
                let pos = current + offset
                pos = (pos % children.length + children.length) % children.length
                children[pos].style.transition = 'none'
                children[pos].style.transform = `translate(${-pos * 400 + offset * 400 + (x % 400)}px)`
            }
        })
        this.root.addEventListener('end', e => {
            timeline.reset()
            timeline.start()
            handler = setInterval(nextPicture, 3000)
            let x = e.clientX - e.startX - ax
            let direction = Math.round(x % 400 / 400)
            if(e.isFlick){
                if(e.velocity < 0){
                    direction = Math.ceil(x % 400 / 400)
                }else{
                    direction = Math.floor(x % 400 / 400)
                }
            }

            for (const offset of [-1, 0, 1]) {
                let pos = this[STATE].position + offset
                pos = (pos + children.length) % children.length
                children[pos].style.transition = 'none'
                // children[pos].style.transform = `translate(${-pos * 400 + offset * 400}px)`
                timeline.add(new Animation(
                    children[pos].style,
                    'transform',
                    -pos * 400 + offset * 400 + x % 400,
                    -pos * 400 + offset * 400 + direction * 400,
                    500,
                    0,
                    ease,
                    v => `translateX(${v}px)`
                ))
            }
            this[STATE].position = this[STATE].position - ((x - x % 400) / 400) - direction
            this[STATE].position = (this[STATE].position % children.length + children.length) % children.length
            this.triggerEvent('change', {data: this[STATE].position})
        })
        const nextPicture = () => {
            let children = this.root.children
            let nextIndex = (this[STATE].position + 1) % children.length
            let next = children[nextIndex]
            let current = children[this[STATE].position]

            t = Date.now()
            // next.style.transition = 'none'
            // next.style.transform = `translateX(${400 - nextIndex * 400}px)`

            timeline.add(new Animation(
                current.style,
                'transform',
                -this[STATE].position * 400,
                -400 - this[STATE].position * 400,
                500,
                0,
                ease,
                v => `translateX(${v}px)`
            ))
            timeline.add(new Animation(
                next.style,
                'transform',
                400 - nextIndex * 400,
                - nextIndex * 400,
                500,
                0,
                ease,
                v => `translateX(${v}px)`
            ))
            this[STATE].position = nextIndex
            // console.log(this[STATE].position);
            this.triggerEvent('change', {data: this[STATE].position})
        }
        handler = setInterval(nextPicture, 3000)


        // this.root.addEventListener('mousedown', (event) => {
        //     let startX = event.clientX
        //     let children = this.root.children

        //     const move = (e) => {
        //         let x = e.clientX - startX

        //         let current = this[STATE].position - (x - x % 400) / 400
        //         for (const offset of [-1, 0, 1]) {
        //             let pos = current + offset
        //             pos = (pos + children.length) % children.length
        //             children[pos].style.transition = 'none'
        //             children[pos].style.transform = `translate(${-pos * 400 + offset * 400 + (x % 400)}px)`
        //         }
        //     }
        //     const up = (e) => {
        //         let x = e.clientX - startX
        //         this[STATE].position = this[STATE].position - Math.round(x / 400)

        //         for (const offset of [0, -Math.sign(Math.round(x / 400) - x + 200 * Math.sign(x))]) {
        //             let pos = this[STATE].position + offset
        //             pos = (pos + children.length) % children.length
        //             children[pos].style.transition = ''
        //             children[pos].style.transform = `translate(${-pos * 400 + offset * 400}px)`
        //         }

        //         document.removeEventListener('mousemove', move)
        //         document.removeEventListener('mouseup', up)
        //     }

        //     document.addEventListener('mousemove', move)
        //     document.addEventListener('mouseup', up)
        // })
        return this.root
    }

}