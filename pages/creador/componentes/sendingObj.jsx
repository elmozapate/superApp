import { Adder } from "../tools/adder";
const Index = () => {
  
    return <></>
}
export default Index
export  const SendingObj = async (i, data, col, row, pos, typeBox, textvalue, createdSections, action, fullArray, stage, secondBlock) => {
    let NewcreatedSections = {
        components: createdSections.components,
        contain: false,
        array: [],
        oldArray: createdSections.oldArray
    }
    let b = []
    let vec = createdSections
    const itemsArray = []
    const lastArray = createdSections.array
    let many = createdSections.components + 1
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
            border:{
                active:false,
                size:0,
                color:'',
                radius:{
                    active:false,
                    value:0
                }
            },
            paddings: {
                top: false,
                bottom: false,
                left: false,
                rigth: false,
            },
            newSection: false,
            fatherId: pos,
            position: many + index + 1,
            basePosition: index,
            stage: action === 'block' ? stage + 1 : stage,
            fatherbaseSection: data.value.fatherbaseSection,
            fatherbaseSubSection: data.value.fatherbaseSubSection,
            type: typeBox === 'contenedor' ? 'contenedor' : typeBox,
            column: true,
            bgColor: typeBox === 'contenedor' ? 'transparent' : typeBox === 'text' ? 'black' : 'green',
            margins: false,
            aditionalCss: ' ' + typeBox === 'contenedor' ? 'min-hbox  ' : typeBox === 'text' ? ' fontcolor-black' : '',
            fontSize: typeBox === 'text' ? 16 : false,
            especificWidth: true,
            width: i === 1 ? 100 : i === 2 ? 50 : 33,
            baseWidth: i === 1 ? 100 : i === 2 ? 50 : 33,
            text: typeBox === 'contenedor' ? '' : typeBox === 'text' || typeBox === 'img' ? textvalue : typeBox,
            zIndex: true,
            zIndexValue: 50,
            color: 'black',
            childrenContain: false,
            children: []
        }
        itemsArray.push(newItem)
    }
    let a
    if (action === 'block') {
        let newBloc = [{
            editingValues: {
                color: 'transparent',
                size: 100,
                baseWidth: 100,
                position: many + 1,
                active: false,
                text: '',
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
            newSection: false,
            fatherId: pos,
            position: many,
            basePosition: data.value.childrenContain ? data.value.children.length : 0,
            stage: stage,
            fatherbaseSection: data.value.fatherbaseSection,
            fatherbaseSubSection: data.value.fatherbaseSubSection,
            type: 'contenedor',
            column: false,
            bgColor: 'transparent',
            margins: false,
            aditionalCss: 'min-hbox  ',
            especificWidth: true,
            width: 100,
            baseWidth: 100,
            text: '',
            zIndex: true,
            zIndexValue: 50,
            color: 'black',
            childrenContain: true,
            children: itemsArray
        }]
        a = Adder(createdSections.array[row], pos, 'put', newBloc, fullArray)
        let c = createdSections.array
        c[row] = a
        b = (c)
        NewcreatedSections = ({
            components: createdSections.components + i + 1,
            contain: true,
            array: b,
            oldArray: createdSections.oldArray
        })
    } else {
        const ab = await Adder(createdSections.array[row], pos, 'put', itemsArray, fullArray, '', secondBlock)
        let c = createdSections.array
        if (ab) {

            c[row] = ab
            b = (c)
            NewcreatedSections = ({
                components: createdSections.components + i ,
                contain: true,
                array: b,
                oldArray: createdSections.oldArray
            })
        }
    }
    if (action === 'style') {

        a = await Adder(createdSections.array[row], pos, 'style', textvalue, fullArray, typeBox)
        let c = createdSections.array
        c[row] = a
        b = (c)
        NewcreatedSections = ({
            components: createdSections.components,
            contain: true,
            array: b,
            oldArray: createdSections.oldArray
        })
    }
    if (action === 'style-align') {

        a = await Adder(createdSections.array[row], pos, 'style-align', textvalue, fullArray, typeBox)
        let c = createdSections.array
        c[row] = a
        b = (c)
        NewcreatedSections = ({
            components: createdSections.components,
            contain: true,
            array: b,
            oldArray: createdSections.oldArray
        })
    }
    if (action === 'style-paddings') {

        a = await Adder(createdSections.array[row], pos, 'style-paddings', textvalue, fullArray, typeBox)
        let c = createdSections.array
        c[row] = a
        b = (c)
        NewcreatedSections = ({
            components: createdSections.components,
            contain: true,
            array: b,
            oldArray: createdSections.oldArray
        })
    }
    return NewcreatedSections
}
