import { createElement } from "./framework";
import { Carousel } from "./carousel";
import { Timeline, Animation } from "./animation";

const d = [
    1, 2, 3, 4
]



let a = <Carousel src={d} />
a.mountTo(document.body)


// let tl = new Timeline()
// tl.start()

// window.tl = tl
// window.animation = new Animation({
//     set a(v){
//         console.log(v)
//     }
// }, 'a', 0, 500, 1000, 0, null)