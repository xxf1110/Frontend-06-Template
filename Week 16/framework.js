
export function createElement(type, attributes, ...children) {
    let element;
    if (typeof type === 'string') {
        element = new ElementWapper(type)
    } else {
        element = new type()
    }

    for (const name in attributes) {
        element.setAttribute(name, attributes[name])
    }
    const processChildren = (children) => {
        for (let child of children) {
            if(typeof child === 'object' && (child instanceof Array)){
                processChildren(child)
                continue;
            }
            if (typeof child === 'string' || typeof child === 'number') {
                child = new TextWapper(child)
            }
            element.appendChild(child)
        }
    }
    processChildren(children)

    return element;
}

export const STATE = Symbol('state')
export const ATTRIBUTE = Symbol('attribute')

export class Component {
    constructor() {
        this[ATTRIBUTE] = Object.create(null)
        this[STATE] = Object.create(null)
    }
    setAttribute(name, value) {
        this[ATTRIBUTE][name] = value
    }
    appendChild(child) {
        child.mountTo(this.root)
    }
    mountTo(parent) {
        if(!this.root) {
            this.render()
        }
        parent.appendChild(this.root)
    }
    triggerEvent(type, args){
        this[ATTRIBUTE]['on' + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, {detail: args}))
    }
    render(){
        return this.root
    }
}

class ElementWapper extends Component {
    constructor(type) {
        super()
        this.root = document.createElement(type)
    }
}
class TextWapper extends Component {
    constructor(type) {
        super()
        this.root = document.createTextNode(type)
    }
}