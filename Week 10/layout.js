function getStyle(element){
    if(!element.style){
        element.style = {}
    }
    for (const prop in element.computedStyle) {
        let value = element.computedStyle[prop].value
        element.style[prop] = value
        if(element.style[prop].toString().match(/px$/)){
            element.style[prop] = parseInt(value)
        }
        if(element.style[prop].toString().match(/^[0-9\.]+$/)){
            element.style[prop] = parseInt(value)
        }
    }
    return element.style
}

function layout(element){
    if(!element.computedStyle) return;
    let elementStyle = getStyle(element)
    if(elementStyle.display !== 'flex') return;
    let items = element.children.filter(ele => ele.type === 'element')
    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0)
    })
    // 下面为预处理
    let style = elementStyle;
    ['width', 'height'].forEach(size => {
        if(style[size] == 'auto' || style[size] == ''){
            style[size] = null
        }
    })
    if(!style.flexDirection || style.flexDirection === 'auto'){
        style.flexDirection = 'row'
    }
    if(!style.alignItems || style.alignItems === 'auto'){
        style.alignItems = 'stretch'
    }
    if(!style.justifyContent || style.justifyContent === 'auto'){
        style.justifyContent = 'flex-start'
    }
    if(!style.flexWrap || style.flexWrap === 'auto'){
        style.flexWrap = 'nowrap'
    }
    if(!style.alignContent || style.alignContent === 'auto'){
        style.alignContent = 'stretch'
    }
    let mainSize,
    mainStart,
    mainEnd,
    mainSign,
    mainBase,
    corssSize,
    corssStart,
    corssEnd,
    corssSign,
    corssBase;
    if(style.flexDirection === 'row'){
        mainSize = 'width'
        mainStart = 'left'
        mainEnd = 'right'
        mainSign = +1
        mainBase = 0

        corssSize = 'height'
        corssStart = 'top'
        corssEnd = 'bottom'
    }
    if(style.flexDirection === 'row-reverse'){
        mainSize = 'width'
        mainStart = 'right'
        mainEnd = 'left'
        mainSign = -1
        mainBase = style.width

        corssSize = 'height'
        corssStart = 'bottom'
        corssEnd = 'top'
    }

    if(style.flexDirection === 'column'){
        mainSize = 'height'
        mainStart = 'top'
        mainEnd = 'bottom'
        mainSign = +1
        mainBase = 0

        corssSize = 'width'
        corssStart = 'left'
        corssEnd = 'right'
    }
    if(style.flexDirection === 'column-reverse'){
        mainSize = 'height'
        mainStart = 'bottom'
        mainEnd = 'top'
        mainSign = -1
        mainBase = style.height

        corssSize = 'width'
        corssStart = 'left'
        corssEnd = 'right'
    }
    if(style.flexWrap === 'wrap-reverse'){
        [corssStart, corssEnd] = [corssEnd, corssStart];
        corssSign = -1
    }else{
        corssSign = 1
        corssBase = 0
    }
    // 上面为预处理
    let isAutoMainSize = false
    if(!style[mainSize]){
        // auto
        elementStyle[mainSize] = 0
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item)
            if(itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)){
                elementStyle[mainSize] += item[mainSize]
            }
        }
        isAutoMainSize = true
    }

    let flexLine = []
    let flexLines = [flexLine]
    let mainSpace = elementStyle[mainSize]
    let corssSpace = 0
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let itemStyle = getStyle(item)
        if(itemStyle[mainSize] === null){
            itemStyle[mainSize] = 0
        }
        if(itemStyle.flex){
            flexLine.push(item)
        }else if(itemStyle.flexWrap === 'nowrap' && isAutoMainSize){
            mainSpace -= itemStyle[mainSize]
            if(itemStyle[corssSize] !== null && itemStyle[mainSize] !== (void 0)){
                corssSpace = Math.max(itemStyle[corssSize], corssSpace)
            }
            flexLine.push(item)
        }else{
            // 主轴大于父级元素 压缩当前元素
            if(itemStyle[mainSize] > style[mainSize]){
                itemStyle[mainSize] = style[mainSize]
            }
            if(mainSpace < itemStyle[mainSize]){
                // 剩余空间不够 换行
                flexLine.mainSpace = mainSpace
                flexLine.corssSpace = corssSpace
                flexLine = [item]
                flexLines.push(flexLine)
                mainSpace = style[mainSize]
                corssSpace = 0            
            }else{
                flexLine.push(item)
            }
            if(itemStyle[corssSize] !== null && itemStyle[mainSize] !== (void 0)){
                corssSpace = Math.max(itemStyle[corssSize], corssSpace)
            }
            mainSpace -= itemStyle[mainSize]
        }
    }
    // 最后一行
    flexLine.mainSpace = mainSpace
    
    if(style.flexWrap === 'nowrap' || isAutoMainSize){
        flexLine.corssSpace = (style[corssSize] !== undefined) ? style[corssSize] : corssSpace
    }else{
        flexLine.corssSpace = corssSpace
    }
    if(mainSpace < 0){
        // 单行 不换行
        let scale = style[mainSize] / (style[mainSize - mainSpace])
        let currentMain = mainBase
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item)
            if(itemStyle.flex){
                itemStyle[mainSize] = 0
            } 
            itemStyle[mainSize] = itemStyle[mainSize] * scale
            itemStyle[mainStart] = currentMain
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
            currentMain = itemStyle[mainEnd]
        }
    }else{
        // 多行 换行
        flexLines.forEach(items => {
            let mainSpace = items.mainSpace
            let flexTotal = 0

            // 收集元素flex值
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const itemStyle = getStyle(item) 
                if(itemStyle.flex !== null && itemStyle.flex !== (void 0)){
                    flexTotal += itemStyle.flex
                    continue;
                }
            }

            if(flexTotal > 0){
                // 有flex值
                let currentMain = mainBase
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const itemStyle = getStyle(item) 
                    if(itemStyle.flex ){
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex
                    }
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd]
                }
            }else{
                // 没有flex值 根据justify-content 分配
                let step = 0 // 元素间隔
                let currentMain = mainBase
                if(style.justifyContent === 'flex-start'){
                    currentMain = mainBase
                    step = 0
                }

                if(style.justifyContent === 'flex-end'){
                    currentMain = mainSpace * mainSign + mainBase
                    step = 0
                }

                if(style.justifyContent === 'center'){
                    currentMain = mainSpace / 2 * mainSign + mainBase
                    step = 0
                }

                if(style.justifyContent === 'space-around'){
                    step = mainSpace / items.length * mainSign
                    currentMain = step / 2 + mainBase
                }

                if(style.justifyContent === 'space-between'){
                    currentMain = mainBase
                    step = mainSpace / (items.length - 1) * mainSign
                }

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const itemStyle = getStyle(item)
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd] + step
                }
            }
        })
    }

    if(!style[corssSize]){
        // auto size
        corssSpace = 0
        elementStyle[corssSize] = 0
        for (let i = 0; i < flexLines.length; i++) {
            elementStyle[corssSize] += flexLines[i].corssSpace
        }
    }else{
        corssSpace = style[corssSize]
        for (let i = 0; i < flexLines.length; i++) {
            corssSpace -= flexLines[i].corssSpace
        }
    }
    if(style.flexWrap === 'wrap-reverse'){
        corssBase = style[corssSize]
    }else{
        corssBase = 0
    }
    let lineSize = style[corssSize] / flexLines.length
    let step;
    if(style.alignContent === 'flex-start'){
        corssBase += 0
        step = 0
    }
    if(style.alignContent === 'flex-end'){
        corssBase += corssSign * corssSpace
        step = 0
    }
    if(style.alignContent === 'center'){
        corssBase += corssSign * corssSpace / 2
        step = 0
    }
    if(style.alignContent === 'space-between'){
        step = corssSpace / (flexLines.length-1)
        corssBase += 0
    }
    if(style.alignContent === 'space-around'){
        step = corssSpace / flexLines.length
        corssBase += corssSign * step / 2
    }
    if(style.alignContent === 'stretch'){
        corssBase += 0
        step = 0
    }
    flexLines.forEach(items => {
        let lineCorssSize = style.alignContent === 'stretch' ? 
            items.corssSpace + corssSpace / flexLines.length : item.corssSpace
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let itemStyle = getStyle(item)
            let align = itemStyle.alignSelf || style.alignItems
            if(itemStyle[corssSize] === null || itemStyle[corssSize] === void 0){
                itemStyle[corssSize] = (align === 'stretch') ? lineCorssSize : 0
            }
            if(align === 'flex-start'){
                itemStyle[corssStart] = corssBase
                itemStyle[corssEnd] = itemStyle[corssStart] + corssSign * itemStyle[corssSize] 
            }
            if(align === 'flex-end'){
                itemStyle[corssStart] = itemStyle[corssEnd] - corssSign * itemStyle[corssSize] 
                itemStyle[corssEnd] = corssBase + corssSign * lineCorssSize 
            }
            if(align === 'center'){
                itemStyle[corssStart] = corssBase + corssSign * (lineCorssSize - itemStyle[corssSize]) / 2
                itemStyle[corssEnd] = itemStyle[corssStart] + corssSign * itemStyle[corssSize] 
            }
            if(align === 'stretch'){
                itemStyle[corssStart] = corssBase
                itemStyle[corssEnd] = corssBase + corssSign * itemStyle[corssSize]
                itemStyle[corssSize] = corssSign * (itemStyle[corssEnd] - itemStyle[corssStart])
            }
        }
        corssBase += corssSign * (lineCorssSize + step)
    })
}


module.exports = layout