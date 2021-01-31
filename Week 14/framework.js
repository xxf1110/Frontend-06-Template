
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

    for (let child of children) {
        if (typeof child === 'string') {
            child = new TextWapper(child)
        }
        element.appendChild(child)
    }

    return element;
}
export class Compontent {
    constructor() {
        
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
    appendChild(child) {
        child.mountTo(this.root)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class ElementWapper extends Compontent {
    constructor(type) {
        super()
        this.root = document.createElement(type)
    }
}
class TextWapper extends Compontent {
    constructor(type) {
        super()
        this.root = document.createTextNode(type)
    }
}