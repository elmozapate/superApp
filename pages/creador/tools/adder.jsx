import { AdderTwo } from "./addertwo";
const Index = () => {
  
    return <></>
}
export default Index
export const Adder = (array, componentNumber, action, value, fullArray, classType, secondBlock, i, secInd) => {
    console.log('entraadder', value);
    let vector = array
    let res = {
        state: false,
        item: {}
    }
    if (action === 'set' || action === 'get' || action === 'delete') {
        vector = array
        let index = 0
        let indexTwo = 0
        let indexThree = 0
        let indexFour = 0
        let indexFive = 0
        let lastIndex = 0
        for (index = 0; index < vector.length; index++) {
            let element = vector[index];
            if (element.position === componentNumber) {
                if (action === 'get' || action === 'delete') {
                    if (action === 'get') {
                        return res = {
                            state: true,
                            item: element
                        }
                    }
                    if (action === 'delete') {
                        vector[index] = value
                    }
                } else {
                    vector[index].editingValues = value
                    vector[index].border = value.border
                    vector[index].align = value.align
                    vector[index].text = value.text
                    vector[index].width = value.size
                    vector[index].paddings = value.paddings
                    if (vector[index].type === 'text') {
                        vector[index].aditionalCss = ` fontcolor-${value.color}`
                        vector[index].fontSize = value.fontSize
                    } else {
                        vector[index].bgColor = value.color
                    }
                }
                index = vector.length + 1
            } else {
                if (element.childrenContain) {
                    let childTwo = element.children
                    for (indexTwo = 0; indexTwo < childTwo.length; indexTwo++) {
                        let elementTwo = childTwo[indexTwo];
                        if (elementTwo.position === componentNumber) {
                            if (action === 'get' || action === 'delete') {
                                if (action === 'get') {
                                    return res = {
                                        state: true,
                                        item: elementTwo
                                    }
                                }
                                if (action === 'delete') {
                                    vector[index].children[indexTwo] = value
                                }
                            } else {
                                vector[index].children[indexTwo].border = value.border
                                vector[index].children[indexTwo].editingValues = value
                                vector[index].children[indexTwo].align = value.align
                                vector[index].children[indexTwo].text = value.text
                                vector[index].children[indexTwo].width = value.size
                                vector[index].children[indexTwo].paddings = value.paddings
                                if (vector[index].children[indexTwo].type === 'text') {
                                    vector[index].children[indexTwo].fontSize = value.fontSize
                                    vector[index].children[indexTwo].aditionalCss = ` fontcolor-${value.color}`
                                } else {
                                    vector[index].children[indexTwo].bgColor = value.color
                                }
                            }
                            index = vector.length + 1
                            indexTwo = childTwo.length + 1;
                        } else {
                            if (elementTwo.childrenContain) {
                                let childThree = elementTwo.children
                                for (indexThree = 0; indexThree < childThree.length; indexThree++) {
                                    let elementThree = childThree[indexThree];
                                    if (elementThree.position === componentNumber) {
                                        if (action === 'get' || action === 'delete') {
                                            if (action === 'get') {
                                                return res = {
                                                    state: true,
                                                    item: elementThree
                                                }
                                            }
                                            if (action === 'delete') {
                                                vector[index].children[indexTwo].children[indexThree] = value
                                            }
                                        } else {
                                            vector[index].children[indexTwo].children[indexThree].editingValues = value
                                            vector[index].children[indexTwo].children[indexThree].border = value.border
                                            vector[index].children[indexTwo].children[indexThree].width = value.size
                                            vector[index].children[indexTwo].children[indexThree].align = value.align
                                            vector[index].children[indexTwo].children[indexThree].text = value.text
                                            vector[index].children[indexTwo].children[indexThree].paddings = value.paddings
                                            if (vector[index].children[indexTwo].children[indexThree].type === 'text') {
                                                vector[index].children[indexTwo].children[indexThree].aditionalCss = ` fontcolor-${value.color}`
                                                vector[index].children[indexTwo].children[indexThree].fontSize = value.fontSize
                                            } else {
                                                vector[index].children[indexTwo].children[indexThree].bgColor = value.color
                                            }
                                        }
                                        index = vector.length + 1
                                        indexTwo = childTwo.length + 1;
                                        indexThree = childThree.length + 1;

                                    } else {
                                        if (elementThree.childrenContain) {
                                            let childFour = elementThree.children
                                            for (indexFour = 0; indexFour < childFour.length; indexFour++) {
                                                let elementFour = childFour[indexFour];
                                                if (elementFour.position === componentNumber) {
                                                    if (action === 'get' || action === 'delete') {
                                                        if (action === 'get') {
                                                            return res = {
                                                                state: true,
                                                                item: elementFour
                                                            }
                                                        }
                                                        if (action === 'delete') {
                                                            vector[index].children[indexTwo].children[indexThree].children[indexFour] = value
                                                        }
                                                    }else {
                                                        vector[index].children[indexTwo].children[indexThree].children[indexFour].editingValues = value
                                                        vector[index].children[indexTwo].children[indexThree].children[indexFour].border = value.border
                                                        vector[index].children[indexTwo].children[indexThree].children[indexFour].align = value.align
                                                        vector[index].children[indexTwo].children[indexThree].children[indexFour].text = value.text
                                                        vector[index].children[indexTwo].children[indexThree].children[indexFour].width = value.size
                                                        vector[index].children[indexTwo].children[indexThree].children[indexFour].paddings = value.paddings
                                                        if (vector[index].children[indexTwo].children[indexThree].children[indexFour].type === 'text') {
                                                            vector[index].children[indexTwo].children[indexThree].children[indexFour].fontSize = value.fontSize
                                                            vector[index].children[indexTwo].children[indexThree].children[indexFour].aditionalCss = ` fontcolor-${value.color}`
                                                        } else {
                                                            vector[index].children[indexTwo].children[indexThree].children[indexFour].bgColor = value.color
                                                        }
                                                    }
                                                    index = vector.length + 1
                                                    indexTwo = childTwo.length + 1;
                                                    indexThree = childThree.length + 1;
                                                    indexFour = childFour.length + 1;
                                                } else {
                                                    if (elementFour.childrenContain) {
                                                        let childFive = elementFour.children
                                                        for (indexFive = 0; indexFive < childFive.length; indexFive++) {
                                                            let elementFive = childFive[indexFive];
                                                            if (elementFive.position === componentNumber) {
                                                                if (action === 'get' || action === 'delete') {
                                                                    if (action === 'get') {
                                                                        return res = {
                                                                            state: true,
                                                                            item: elementFive
                                                                        }
                                                                    }
                                                                    if (action === 'delete') {
                                                                        vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive] = value
                                                                    }
                                                                } else {
                                                                    vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].editingValues = value
                                                                    vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].border = value.border
                                                                    vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].align = value.align
                                                                    vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].text = value.text
                                                                    vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].width = value.size
                                                                    vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].paddings = value.paddings
                                                                    if (vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].type === 'text') {
                                                                        vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].fontSize = value.fontSize
                                                                        vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].aditionalCss = ` fontcolor-${value.color}`
                                                                    } else {
                                                                        vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].bgColor = value.color
                                                                    }
                                                                }
                                                                index = vector.length + 1
                                                                indexTwo = childTwo.length + 1;
                                                                indexThree = childThree.length + 1;
                                                                indexFour = childFour.length + 1;
                                                                indexFive = childFive.length + 1;
                                                            } else {
                                                                if (elementFive.childrenContain) {
                                                                    let lastChild = elementFive.children
                                                                    for (lastIndex = 0; lastIndex < lastChild.length; lastIndex++) {
                                                                        let elementFive = lastChild[lastIndex];
                                                                        if (elementFive.position === componentNumber) {
                                                                            if (action === 'get' || action === 'delete') {
                                                                                if (action === 'get') {
                                                                                    return res = {
                                                                                        state: true,
                                                                                        item: lastChild
                                                                                    }
                                                                                }
                                                                                if (action === 'delete') {
                                                                                    vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex] = value
                                                                                }
                                                                            } else {
                                                                                vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex].editingValues = value
                                                                                vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex].border = value.border
                                                                                vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex].align = value.align
                                                                                vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex].text = value.text
                                                                                vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex].width = value.size
                                                                                vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex].paddings = value.paddings
                                                                                if (vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex].type === 'text') {
                                                                                    vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex].fontSize = value.fontSize
                                                                                    vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex].aditionalCss = ` fontcolor-${value.color}`
                                                                                } else {
                                                                                    vector[index].children[indexTwo].children[indexThree].children[indexFour].children[indexFive].children[lastIndex].bgColor = value.color
                                                                                }
                                                                            }
                                                                            index = vector.length + 1
                                                                            indexTwo = childTwo.length + 1;
                                                                            indexThree = childThree.length + 1;
                                                                            indexFour = childFour.length + 1;
                                                                            indexFive = childFive.length + 1;
                                                                            lastIndex = lastChild.length + 1
                                                                        } else {
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
            }
            res = {
                state: true,
                item: vector
            }
        }
        return res
    }
    /*   if (action === 'get' || action === 'get2') {
          if (action === 'get') {
              vector = array[0]
                        }
          if (action === 'get2') {
              vector = array
                        }
          let many = vector.length
          let isObj = false
                    if (!vector.length === true) {
              isObj = true
              many = 1
          }
          for (let index = 0; index < many; index++) {
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
              if (element.position === componentNumber) {
                  res = {
                      state: true,
                      item: element
                  }
                  index = vector.length + 1
              }
              else {
                  if (element.childrenContain) {
                      for (let index2 = 0; index2 < element.children.length; index2++) {
                          const element2 = element.children[index2];
                          let nextChild = AdderTwo(element2, componentNumber, 'get2')
                          if (nextChild.state) {
                                                            index2 = element.children.length + 1
                              res = {
                                  state: true,
                                  item: nextChild.item
                              }
                              return res
                          } else {
                                
                          }
                      }
                  }
              }
          }
          return res
      } */
    if (action === 'put') {
        for (let index = 0; index < vector.length; index++) {
            let element = vector[index];
            if (element.position === componentNumber) {
                if (action === 'put') {
                    if (!vector[index].childrenContain) {
                        vector[index].childrenContain = true
                        vector[index].children = value
                        index = vector.length + 1
                        return vector
                    } else {
                        let use = vector[index].children
                        use.push(value[0])
                        vector[index].column = true
                        vector[index].children = use
                        index = vector.length + 1
                        return vector
                    }
                }
            } else {
                if (element.childrenContain) {
                    let nextChild = AdderTwo(element.children, componentNumber, 'put', value, [], '', secondBlock)
                    if (!secondBlock) {
                        if (nextChild) {
                            let use = vector[index].children
                            use.push(nextChild.array)
                            vector[index].children = use
                            index = vector.length + 1
                            return vector
                        }
                    } else {
                        if (nextChild) {
                            let use = []
                            let done = false
                            const clean = () => {
                                vector[index].children[nextChild.useIndex].children.map((key) => {
                                    if (key.position) {
                                        use.push(key)
                                    }
                                })
                                done = true
                            }
                            if (!done) {
                                clean()
                            }
/*                             use.push(nextChild.array)
 */                            vector[index].children[nextChild.useIndex].children = use
                            index = vector.length + 1
                            return vector
                        }
                    }
                }
            }
        }
    }
    if (action === 'style') {

        for (let index = 0; index < vector.length; index++) {
            let element = vector[index];
            if (element.position === componentNumber) {
                if (classType === 'wdt') {
                    let sizeMax = element.especificWidth ? element.baseWidth : 100
                    let marginNumber = parseInt(((sizeMax / 100) * value).toFixed())
                    vector[index].width = marginNumber
                    vector[index].margins = ' mr-' + (element.baseWidth - marginNumber).toString()
                    index = vector.length + 1
                    return vector
                }
                if (classType === 'bgColor') {

                    if (vector[index].type === 'text') {
                        vector[index].aditionalCss = `fontcolor-${value}`
                        index = vector.length + 1
                        return vector
                    } else {

                        vector[index].bgColor = value
                        index = vector.length + 1
                        return vector
                    }

                }
            } else {
                if (element.childrenContain) {
                    let nextChild = AdderTwo([element.children], componentNumber, action, value)
                    if (!nextChild !== true) {
                        let use = vector[index].children
                        use.push(nextChild)
                        vector[index].children = use
                        index = vector.length + 1
                        return vector
                    }
                }
            }
        }
    }
    if (action === 'style-align') {
        for (let index = 0; index < vector.length; index++) {
            let element = vector[index];
            if (element.position === componentNumber) {
                vector[index].align = value
                index = vector.length + 1
                return vector
            } else {
                if (element.childrenContain) {
                    let nextChild = AdderTwo([element.children], componentNumber, action, value)
                    if (!nextChild !== true) {
                        let use = vector[index].children
                        use.push(nextChild)
                        vector[index].children = use
                        index = vector.length + 1
                        return vector
                    }
                }
            }
        }
    }
    if (action === 'style-paddings') {
        for (let index = 0; index < vector.length; index++) {
            let element = vector[index];
            if (element.position === componentNumber) {
                vector[index].paddings = value
                index = vector.length + 1
                return vector
            } else {
                if (element.childrenContain) {
                    let nextChild = AdderTwo([element.children], componentNumber, action, value)
                    if (!nextChild !== true) {
                        let use = vector[index].children
                        use.push(nextChild)
                        vector[index].children = use
                        index = vector.length + 1
                        return vector
                    }
                }
            }
        }
    }
    if (action === 'style-in') {
        for (let index = 0; index < vector.length; index++) {
            let elementMain = vector[index];
            let element = vector[index]
            if (elementMain[index]) {
                for (let index2 = 0; index2 < elementMain.length; index2++) {
                    element = elementMain[index2]
                    if (element.position === componentNumber) {
                        index = vector.length + 1
                        index2 = elementMain.length + 1
                        return element
                    }
                }
            } else {
                if (element.position === componentNumber) {

                    index = vector.length + 1
                    return element
                }
            }
            if (element.position === componentNumber) {
                index = vector.length + 1
                return element
            }
            else {
                if (element.childrenContain) {
                    let nextChild = AdderTwo([element.children], componentNumber, action, value)
                    if (!nextChild !== true) {
                        index = elementMain.length + 1
                        return nextChild
                    }
                }
            }
        }
    }
}