const Index = () => {
  
    return <></>
}
export default Index
export const SendingObjFather = (i, data, col, row, pos, typeBox, textvalue, createdSections, sectMany) => {
    let NewcreatedSections = {
        components: createdSections.components,
        contain: false,
        array: [],
        oldArray: createdSections.oldArray
    }
    const itemsArray = []
    let many = createdSections.components
    let lastArray = createdSections.array
    let oldArray = createdSections.lastArray

    for (let index = 0; index < i; index++) {
        const newItem = {
            editingValues: {
                color: typeBox === 'contenedor' ? 'transparent' : typeBox === 'text' ? 'black' : 'green',
                size: i === 1 ? 100 : i === 2 ? 50 : 33,
                baseWidth: i === 1 ? 100 : i === 2 ? 50 : 33,
                position: many + index + 1,
                active: false,
                text: typeBox === 'contenedor' ? '' : typeBox === 'text' || typeBox === 'img' ? textvalue : typeBox,
                fontSize: 16,
                border:{
                    active:false,
                    size:0,
                    color:'',
                    radius:{
                        active:false,
                        value:0
                    }
                },
                align: {
                    direction: false,
                    justify: false,
                    align: false,
                    gap: false
                },
                paddings: {
                    top: false,
                    bottom: false,
                    left: false,
                    rigth: false,
                }
            },
            fontSize: 16,
            align: {
                direction: false,
                justify: false,
                align: false,
                gap: false
            },
            paddings: {
                top: false,
                bottom: false,
                left: false,
                rigth: false,
            },
            border:{
                active:false,
                size:0,
                color:'',
                radius:{
                    active:false,
                    value:0
                }
            },
            newSection: true,
            fatherId: pos,
            fatherbaseSection: sectMany,
            fatherbaseSubSection: index,
            position: many + index + 1,
            sectionFather: true,
            stage: 2,
            basePosition: index,
            type: typeBox === 'contenedor' ? 'contenedor' : typeBox,
            column: false,
            bgColor: typeBox === 'contenedor' ? 'transparent' : typeBox === 'text' ? 'white' : 'green',
            margins: false,
            aditionalCss: ' ',
            especificWidth: true,
            baseWidth: i === 1 ? 100 : i === 2 ? 50 : 33,
            width: i === 1 ? 100 : i === 2 ? 50 : 33,
            text: typeBox === 'contenedor' ? '' : typeBox === 'text' || typeBox === 'img' ? textvalue : typeBox,
            zIndex: true,
            zIndexValue: 200,
            color: 'black',
            childrenContain: false,
            children: []
        }

        itemsArray.push(newItem)
    }

    let newSec = {
        contain: true,
        array: itemsArray
    }

    const newArray = newSec.array

    if (createdSections.array && createdSections.array[0] && createdSections.array[0][0] && !createdSections.array[0][0].newSection) {
        let usingArray = []
        oldArray[0].map((key, i) => {
            usingArray.push(key.children)
        })
        lastArray.push(newArray)
        NewcreatedSections = ({
            components: createdSections.components + i + 1,
            contain: true,
            array: lastArray,
            oldArray: usingArray
        })
    } else {
        lastArray.push(newArray)
        NewcreatedSections = ({
            components: createdSections.components + i +1,
            contain: true,
            array: lastArray,
            oldArray: createdSections.oldArray
        })

    }
    return NewcreatedSections
}
