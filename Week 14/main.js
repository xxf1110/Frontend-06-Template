import { createElement, Compontent } from "./framework";

class Carousel extends Compontent {
    constructor() {
        super()
        this.attributes = Object.create(null)
    }
    setAttribute(name, value) {
        this.attributes[name] = value
    }
    appendChild(child) {
        child.mountTo(this.root)
    }
    mountTo(parent) {
        parent.appendChild(this.render())
    }
    render() {
        console.log(this.attributes.src);
        this.root = document.createElement('div')
        this.root.classList.add('carousel')

        for (const record of this.attributes.src) {
            let child = document.createElement('div')
            child.innerHTML = record

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

        let position = 0
        this.root.addEventListener('mousedown', (event) => {
            let startX = event.clientX
            let children = this.root.children

            const move = (e) => {
                let x = e.clientX - startX

                let current = position - (x - x % 400) / 400
                for (const offset of [-1, 0, 1]) {
                    let pos = current + offset
                    pos = (pos + children.length) % children.length
                    children[pos].style.transition = 'none'
                    children[pos].style.transform = `translate(${-pos * 400 + offset * 400 + (x % 400)}px)`
                }
            }
            const up = (e) => {
                let x = e.clientX - startX
                position = position - Math.round(x / 400)

                for (const offset of [0, -Math.sign(Math.round(x / 400) - x + 200 * Math.sign(x))]) {
                    let pos = position + offset
                    pos = (pos + children.length) % children.length
                    children[pos].style.transition = ''
                    children[pos].style.transform = `translate(${-pos * 400 + offset * 400}px)`
                }

                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }

            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        })
        return this.root
    }

}

const d = [
    1, 2, 3, 4
]

let a = <Carousel src={d} />

a.mountTo(document.body)