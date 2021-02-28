import { createElement } from "./framework";
import { Carousel } from "./carousel";
import { Button } from "./Button";
import { List } from "./List";

const d = [
    {
        img: 1,
        url: '/'
    },
    {
        img: 2,
        url: '/'
    },
    {
        img: 3,
        url: '/'
    },
    {
        img: 4,
        url: '/'
    }
]



// let a = <Carousel 
//     src={d} 
//     onChange={e => console.log(e.detail.data)} 
//     onClick={e => console.log('click', e.detail.data)} 
// />

// let a = <Button>
//     content
// </Button>

let a = <List data={d}>
    {
        (record) => (
            <div>
                <span>{record.img}</span>
            </div>
        )
    }
</List>
a.mountTo(document.body)

