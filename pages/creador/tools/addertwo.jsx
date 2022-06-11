import { Adder } from "./adder";
const Index = () => {
  
    return <></>
}
export default Index
export const AdderTwo = (array, componentNumber, action, value, fullArray, classType, secondBlock) => {
    let vector = {
        array: array,
        useIndex: 0
    }
    let res = {
        state: false,
        item: {}
    }
    
    if (action === 'get' || action === 'get2') {
        if (action === 'get') {
            vector = array[0]
            console.log('hereget', vector);
        }
        if (action === 'get2') {
            vector = array
            console.log('hereget2', vector);
        }
        let many=vector.length
        let isObj = false
        console.log('here', vector,vector.length);
        if (!vector.length ===true) {
            isObj = true
            many=1
        }
        for (let index = 0; index < many ; index++) {
            let element = vector[index]
            if (!isObj) {
                element = vector[index];
            } else {
                element = vector
            }
            res = {
                state: false,
                item: element
            }
            console.log(element, 'here2');
            if (element.position === componentNumber) {
                res = {
                    state: true,
                    item: element
                }
                index = vector.length + 1
            }
            else {
                if (element.childrenContain) {
                    console.log(element, 'conhijos');
                    for (let index2 = 0; index2 < element.children.length; index2++) {
                        const element2 = element.children[index2];
                        console.log(element2, 'hijo');
                        let nextChild = Adder(element2, componentNumber, 'get2')
                        if (nextChild.state) {
                            console.log('lo hallo', nextChild);
                            index2 = element.children.length + 1
                            res = {
                                state: true,
                                item: nextChild.item
                            }
                            return res
                        } else {
                            console.log('mas hijos');

                        }
                    }
                }
            }
        }
        return res
    }
    if (action === 'put') {
        for (let index = 0; index < vector.array.length; index++) {
            let element = vector.array[index];
            if (element.position === componentNumber) {
                if (action === 'put') {
                    if (!element.childrenContain) {
                        element.childrenContain = true
                        element.children = value
                        vector.array[index] = element
                        vector.useIndex = index
                        index = vector.array.length + 1
                        return vector
                    } else {
                        let use = element.children
                        use.push(value[0])
                        vector.array[index].column = true
                        vector.array[index].children = use
                        vector.useIndex = index
                        index = vector.array.length + 1
                        return vector
                    }
                }
            } else {
                if (element.childrenContain) {
                    let nextChild = Adder(element.children, componentNumber, 'put', value, [], '', secondBlock)
                    if (!secondBlock) {
                        if (nextChild) {
                            let use = vector.array[index].children
                            use.push(nextChild)
                            vector.array[index].children = use
                            vector.useIndex = index
                            index = vector.array.length + 1
                            return vector
                        }
                    } else {
                        if (nextChild) {
                            let use = []
                            let done = false
                            const clean = () => {
                                vector.array[index].children.map((key) => {
                                    if (key.position) {
                                        use.push(key)
                                    }
                                })
                                done = true
                            }
                            if (!done) {
                                clean()
                            }
                            vector.array[index].children
/*                             use.push(nextChild)
 */                            vector.array[index].children = use
                            index = vector.array.length + 1
                            return vector
                        }
                    }
                }
            }
        }
    }
    if (action === 'style') {

        for (let index = 0; index < vector.array.length; index++) {
            let element = vector.array[index];
            if (element.position === componentNumber) {
                if (classType === 'wdt') {
                    let sizeMax = element.especificWidth ? element.baseWidth : 100
                    let marginNumber = parseInt(((sizeMax / 100) * value).toFixed())
                    vector.array[index].width = marginNumber
                    vector.array[index].margins = ' mr-' + (element.baseWidth - marginNumber).toString()
                    vector.useIndex = index

                    index = vector.array.length + 1
                    return vector
                }
                if (classType === 'bgColor') {

                    if (vector.array[index].type === 'text') {
                        vector.array[index].aditionalCss = `fontcolor-${value}`
                        vector.useIndex = index

                        index = vector.array.length + 1
                        return vector
                    } else {

                        vector.array[index].bgColor = value
                        vector.useIndex = index

                        index = vector.array.length + 1
                        return vector
                    }

                }
            } else {
                if (element.childrenContain) {
                    let nextChild = Adder([element.children], componentNumber, action, value)
                    if (!nextChild !== true) {
                        let use = vector.array[index].children
                        use.push(nextChild)
                        vector.array[index].children = use
                        vector.useIndex = index

                        index = vector.array.length + 1
                        return vector
                    }
                }
            }
        }
    }
    if (action === 'style-align') {
        for (let index = 0; index < vector.array.length; index++) {
            let element = vector.array[index];
            if (element.position === componentNumber) {
                vector.array[index].align = value
                vector.useIndex = index

                index = vector.array.length + 1
                return vector
            } else {
                if (element.childrenContain) {
                    let nextChild = Adder([element.children], componentNumber, action, value)
                    if (!nextChild !== true) {
                        let use = vector.array[index].children
                        use.push(nextChild)
                        vector.array[index].children = use
                        vector.useIndex = index

                        index = vector.array.length + 1
                        return vector
                    }
                }
            }
        }
    }
    if (action === 'style-paddings') {
        for (let index = 0; index < vector.array.length; index++) {
            let element = vector.array[index];
            if (element.position === componentNumber) {
                vector.array[index].paddings = value
                vector.useIndex = index

                index = vector.array.length + 1
                return vector
            } else {
                if (element.childrenContain) {
                    let nextChild = Adder([element.children], componentNumber, action, value, secondBlock)
                    if (!nextChild !== true) {
                        let use = vector.array[index].children
                        use.push(nextChild)
                        vector.array[index].children = use
                        vector.useIndex = index

                        index = vector.array.length + 1
                        return vector.array
                    }
                }
            }
        }
    }
    if (action === 'style-in') {
        for (let index = 0; index < vector.array.length; index++) {
            let elementMain = vector.array[index];
            let element = vector.array[index]
            if (elementMain[index]) {
                for (let index2 = 0; index2 < elementMain.length; index2++) {
                    element = elementMain[index2]
                    if (element.position === componentNumber) {
                        index = vector.array.length + 1
                        index2 = elementMain.length + 1
                        return element
                    }
                }
            } else {
                if (element.position === componentNumber) {

                    index = vector.array.length + 1
                    return element
                }
            }
            if (element.position === componentNumber) {
                index = vector.array.length + 1
                return element
            }
            else {
                if (element.childrenContain) {
                    let nextChild = Adder([element.children], componentNumber, action, value)
                    if (!nextChild !== true) {
                        index = elementMain.length + 1
                        return nextChild
                    }
                }
            }
        }
    }
}