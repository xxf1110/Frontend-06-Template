
const EOF = Symbol('EOF')
let currentToken = null
let currentAttribute = null
let stack = null
let currentTextNode = null

function emit(token) {
    let top = stack[stack.length - 1]
    if (token.type === 'startTag') {
        let element = {
            type: 'element',
            tagName: token.tagName,
            children: [],
            attributes: [],
        }
        for (const key in token) {
            if (key !== 'type' && key !== 'tagName') {
                element.attributes.push({
                    name: key,
                    value: token[key]
                })
            }
        }
        // computeCSS(element)
        top.children.push(element)
        element.parent = top
        if (!token.isSelfClosing) {
            stack.push(element)
        }
        currentTextNode = null
    } else if (token.type === 'endTag') {
        if (top.tagName !== token.tagName) {
            throw Error("Tag start end  doesn't match")
        } else {
            if (token.tagName === 'style') {

            }
            stack.pop()
        }
        currentTextNode = null
    } else if (token.type === 'text') {
        if (!currentTextNode) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
}

function data(c) {
    if (c === '<') {
        return tagOpen
    } else if (c === EOF) {
        emit({
            type: 'EOF'
        })
        return;
    } else {
        emit({
            type: 'text',
            content: c
        })
        return data;
    }

}

function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        return;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c === '>') {

    } else if (c === EOF) {

    } else {

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStarTag
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName
    } else if (c === '>') {
        emit(currentToken)
        return data
    } else {
        return tagName
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '>' || c === '/' || c === EOF) {
        // emit(currentToken)
        // return data;
        return afterAttributeName(c)
    } else if (c === '=') {

    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}
function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '>' || c === '/' || c === EOF) {
        return afterAttributeName(c)
    } else if (c === '=') {
        return beforeAttributeValue
    } else if (c === '\u0000') {

    } else if (c === "\"" || c === "'" || c === '<') {

    } else {
        currentAttribute.name += c
        return attributeName
    }
}
function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '>' || c === '/' || c === EOF) {
        return afterAttributeName(c)
    } else if (c === "\"") {
        return doubleQuotedAttributeValue
    } else if (c === "\'") {
        return singleQuotedAttributeValue
    } else if (c === ">") {

    } else {
        return UnquotedAttributeValue(c)
    }
}
function doubleQuotedAttributeValue(c) {
    if (c === "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}
function singleQuotedAttributeValue(c) {
    if (c === "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c
        return singleQuotedAttributeValue
    }
}
function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if (c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStarTag
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data;
    } else if (c === '\u0000') {

    } else if (c === "\"" || c === "'" || c === "<" || c === '=' || c === '`') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c
        return UnquotedAttributeValue
    }
}
function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName
    } else if (c === '/') {
        return selfClosingStarTag
    } else if (c === '=') {
        return beforeAttributeValue
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c === EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}
function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c === '/') {
        return selfClosingStarTag
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data;
    } else if (c === EOF) {

    } else {
        throw Error('unexpected chartar')
    }
}
function selfClosingStarTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true
        emit(currentToken)
        return data
    } else if (c === EOF) {

    } else {

    }
}



export const parseHTML = function parseHTML(html) {
    currentToken = null
    currentAttribute = null
    stack = [{ type: 'document', children: [] }]
    currentTextNode = null
    let state = data
    for (const c of html) {
        state = state(c)
    }
    state = state(EOF)
    return stack.pop()
}