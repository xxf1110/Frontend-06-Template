import { Timeline, Animation } from "./animation";
import { ease, easeIn, } from "./ease";

let tl = new Timeline()
let obj = new Animation(document.getElementById('box').style, 'transform', 0, 400, 2000, 0, easeIn, v => `translateX(${v}px)`)
tl.add(obj)



document.getElementById('start-btn').addEventListener('click', () => {
    tl.start()
    document.getElementById('box2').style.transition = 'transform 2s ease-in'
    document.getElementById('box2').style.transform = 'translateX(400px)'
})
document.getElementById('pause-btn').addEventListener('click', () => {
    tl.pause()
})
document.getElementById('resume-btn').addEventListener('click', () => {
    tl.resume()
})
document.getElementById('reset-btn').addEventListener('click', () => {
    tl.reset()
    let obj = new Animation(document.getElementById('box').style, 'transform', 0, 400, 2000, 0, easeIn, v => `translateX(${v}px)`)
    tl.add(obj)
    document.getElementById('box2').style.transition = ''
    document.getElementById('box2').style.transform = 'translateX(0)'
    document.getElementById('box').style.transform = 'translateX(0)'
})
