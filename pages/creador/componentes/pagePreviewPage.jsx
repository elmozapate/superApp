import { useState, useEffect } from "react"
import IComponent from "../../../components/iComponents/icomponent"
import { AlignValues, BorderValues, CompomentStyle, ComponentIn, CreatedSections, HistorialArray, ObjContent, PaddingValues } from "../../../components/iComponents/ObjDfeault"
import { Adder } from "../tools/adder"
import Align from "../tools/alineation"
import FontSize from "../tools/fontsize"
import { Historial } from "../tools/historial"
import PaddingComponent from "../tools/paddingComponent"
import PaletaColores from "../tools/paletaColores"
import SizeEditor from "../tools/sizeEdit"
import { SendingObj } from "./sendingObj"
import { SendingObjFather } from "./sendingObjFather"
import SideEdiBar from "./sideEditBar"
let tempvector = [{
    components: 0,
    contain: false,
    array: [],
    oldArray: false
}]
let tempvectorstyle = []
let tempvectorcomponentIn = []
let positionofSearch = 0
let thePos = 0
let actSize = 100
let actFontSize = 16
let secondPos = 0
let sectMany = 0
const PagePreview = ({ update = false, pageValues = {
    name: '',
    password: '',
    passwordRepeat: '',
    color: 'negro',
    logo: '',
    sectionNew: '',
    sectionNewDescription: '',
    arraySection: [],
    comerce: false

}, historialArray = HistorialArray, historialValue = {
    value: 0,
    action: false
}, action = false, historialPrint = console.log, restartPage = console.log, goSection = console.log, sendSection = console.log, sendedPage = console.log, sectionEditing = [], position = -1, newPage = console.log }) => {
    let inStage = 0
    const [rowIn, setrowIn] = useState(0)
    const [errasing, seterrasing] = useState(false)
    const [compomentStyle, setComponentStyle] = useState(CompomentStyle)
    const [componentIn, setcomponentIn] = useState(ComponentIn)
    const [olderArray, setOlderArray] = useState([])
    const [alignValues, setAlignValues] = useState(AlignValues)
    const [paddingValues, setpaddingValues] = useState(PaddingValues)
    const [borderValues, setborderValues] = useState(BorderValues)
    const [stageIn, setstageIn] = useState(1)
    const [auxSect, setAuxSect] = useState(-1)
    const [objStyles, setobjStyles] = useState(false)
    const [styleOpt, setStyleOpt] = useState(0)
    /*   const [historialValue, sethistorialValue] = useState({
          value: 0,
          action: false
      }) */
    const [previewActive, setPreviewActive] = useState(false)
    const [createdSections, setcreatedSections] = useState({
        components: 0,
        contain: false,
        array: [],
        oldArray: []
    })
/*     const [historialArray, setHistorialArray] = useState(HistorialArray)
 */    let theArray = []
    const sending2 = async (i, data, col, row, pos, typeBox, textvalue, action) => {
        let Row = row
        if (row !== -1) {
            setrowIn(row)
        } else {
            Row = rowIn
        }
        let theArray = createdSections.array
        let secondBlock = data.stage > 2 ? true : false
        const newSec = await SendingObj(i, data, col, Row, pos, typeBox, textvalue, createdSections, action, theArray, stageIn + 1, secondBlock)
        if (newSec) {
            /*  let saving = historialArray
             let arraypast = historialArray.array
             arraypast.push({
                 components: newSec.components,
                 contain: newSec.contain,
                 array: newSec.array,
                 oldArray: olderArray
             })
             saving.positiionIn = historialArray.positiionIn + 1,
                 saving.maxChanges = historialArray.maxChanges + 1
             saving.array = arraypast
             setHistorialArray(saving)
             tempvector.push({
                 components: newSec.components,
                 contain: newSec.contain,
                 array: newSec.array,
                 oldArray: olderArray
             })
             positionofSearch++
             tempvectorstyle.push(compomentStyle)
             tempvectorcomponentIn.push(componentIn) */
            setcreatedSections(
                {
                    components: newSec.components,
                    contain: newSec.contain,
                    array: newSec.array,
                    oldArray: olderArray
                })

            saveSection()

        }
    }
    const sending = (i, data, col, row, pos, typeBox = 'contenedor', textvalue) => {
        sectMany++
        const newSec = SendingObjFather(i, data, col, row, pos, typeBox, textvalue, createdSections, sectMany)
        /*     let saving = historialArray
            let arraypast = historialArray.array
            arraypast.push({
                components: newSec.components,
                contain: newSec.contain,
                array: newSec.array,
                oldArray: olderArray
            })
            saving.positiionIn = historialArray.positiionIn + 1,
                saving.maxChanges = historialArray.maxChanges + 1
            saving.array = arraypast
            setHistorialArray(saving)
            tempvector.push({
                components: newSec.components,
                contain: newSec.contain,
                array: newSec.array,
                oldArray: olderArray
            })
            positionofSearch++
    
            tempvectorstyle.push(compomentStyle)
            tempvectorcomponentIn.push(componentIn) */
        setcreatedSections(
            {
                components: newSec.components,
                contain: newSec.contain,
                array: newSec.array,
                oldArray: olderArray
            })
        saveSection()
    }
    useEffect(() => {
        if (position !== -1) {
            setcreatedSections(CreatedSections)
        }
        setcreatedSections(createdSections)
        goSectionGo(position)
    }, [position, action])
    useEffect(() => {
        rebootComponent()
    }, [update])
    const goSectionGo = (i) => {
        if (sectionEditing[i]) {
            if (!sectionEditing[i].content) {
                setOlderArray(false)
                setcreatedSections({
                    components: 0,
                    contain: false,
                    array: [],
                    lastArray: []
                })
                goSection(i);
            } else {
                setOlderArray(sectionEditing[i].objContent)
                let doit = []
                let nn = () => {
                    sectionEditing[i].objContent.map((key) => {
                        doit.push(key.children)
                    })
                }
                nn()
                setcreatedSections(
                    {
                        components: sectionEditing[i].components,
                        contain: true,
                        array: doit,
                        lastArray: sectionEditing[i].objContent
                    }
                )
                goSection(i)
            }
        }
    }
    /*  const historialPrint = (value) => {
         sethistorialValue({
             value: value,
             action: !historialValue.action
         })
     } */
    const editFuntion = (value = { position: '' }, i, editSectionNumber, componentNumber, active) => {
        console.log('edit', componentNumber, createdSections.array);
        let oldStyles = Adder(createdSections.array[editSectionNumber !== -1 ? editSectionNumber : auxSect], componentNumber, 'get', compomentStyle, createdSections.array, '', '', '', componentIn.editSectionNumber).item
        let stylyWhile = oldStyles.editingValues
        stylyWhile.active = true
        setComponentStyle(stylyWhile)
        setpaddingValues(stylyWhile.paddings)
        setAlignValues(stylyWhile.align)
        setborderValues(stylyWhile.border)
        setstageIn(stageIn + 1)
        secondPos = [componentIn.position - 1]
        let aux = createdSections.array
            .map((key, x) => {
                if (x === editSectionNumber) {
                    return key
                }
            })
        let find = true
        if (find) {
            if (active) {
                setAuxSect(editSectionNumber)
                setcomponentIn({
                    position: componentNumber,
                    stage: value.stage,
                    state: true,
                    value,
                    editSectionNumber,
                    i,
                    array: [value],
                    fullvalue: value,
                    fullarray: [value]
                })

            } else {
                setcomponentIn({
                    position: componentNumber,
                    stage: value.stage,
                    state: true,
                    value,
                    editSectionNumber: auxSect,
                    i,
                    array: [value],
                })
            }
        }
    }
    const setStyle = (value, type) => {
        let compomentStyleIn = compomentStyle
        let vec = createdSections
        let newVec = Adder(createdSections.array[componentIn.editSectionNumber !== -1 ? componentIn.editSectionNumber : auxSect], componentIn.position, 'set', compomentStyleIn, createdSections.array, '', '', '', componentIn.editSectionNumber)
    }

    const styleObjEditIn = (type, i, stage, position) => {
        console.log(position, 'editstyle', componentIn.position, createdSections.array);

        let ind = componentIn.editSectionNumber
        let oldStyles = Adder(createdSections.array[auxSect], position, 'get', compomentStyle, createdSections.array, '', '', '', ind).item
        let stylyWhile = oldStyles.editingValues
        stylyWhile.active = true
        setComponentStyle(stylyWhile)
        setpaddingValues(stylyWhile.paddings)
        setAlignValues(stylyWhile.align)
        setborderValues(stylyWhile.border)

        const element = Adder(createdSections.array[auxSect], position, 'get', compomentStyle, createdSections.array, '', '', '', ind)
        let waitingComponent = componentIn
        if (element.state) {
            setstageIn(stageIn + 1)
            waitingComponent.array = [element.item]
            waitingComponent.position = element.item.position
            setcomponentIn(waitingComponent)
            setobjStyles(true)
        }
    }
    const applyNewStyles = () => {
        console.log(compomentStyle, 'miues', componentIn);
        let ind = componentIn.editSectionNumber
        let compomentStyleIn = compomentStyle
        let vec = createdSections
        let newVec = Adder(createdSections.array[auxSect], componentIn.position, 'set', compomentStyleIn, createdSections.array, '', '', '', componentIn.editSectionNumber)
        vec.array[ind] = newVec.item
        /*   let saving = historialArray
          positionofSearch++
  
          let arraypast = historialArray.array
          arraypast.push({
              components: newVec.components,
              contain: newVec.contain,
              array: newVec.array,
              oldArray: olderArray
          })
          saving.positiionIn = historialArray.positiionIn + 1,
              saving.maxChanges = historialArray.maxChanges + 1
          saving.array = arraypast
          setHistorialArray(saving)
          positionofSearch++
          tempvector.push(vec)
          tempvectorstyle.push(compomentStyle)
          tempvectorcomponentIn.push(componentIn) */
        setcreatedSections(vec)
    }
    const rebootComponent = () => {
        setStyleOpt(0)
        setstageIn(1)
        setcomponentIn(ComponentIn)
        setobjStyles(false)
        setComponentStyle(CompomentStyle)
        setpaddingValues(PaddingValues)
        setAlignValues(AlignValues)
        setborderValues(BorderValues)

    }
    const sizeforcomponent = (value) => {
        setComponentStyle({
            ...compomentStyle,
            size: value
        })
        const sizefortext = (value) => {
            setComponentStyle({
                ...compomentStyle,
                fontSize: value
            })
        }
    }
    const setStylePp = (value, type) => {
        let compomentStyleaux = compomentStyle
        if (type === 'bgColor') {
            compomentStyleaux.color = value
            setComponentStyle({
                ...compomentStyle,
                color: value
            })
        }
        if (type === 'wdt') {
            const size = parseInt(((compomentStyle.baseWidth / 100) * value).toFixed()) || 100;
            compomentStyleaux.size = size
            setComponentStyle({
                ...compomentStyle,
                size: size
            })
        }
        let compomentStyleIn = compomentStyleaux
        let vec = createdSections
        let newVec = Adder(createdSections.array[componentIn.editSectionNumber !== -1 ? componentIn.editSectionNumber : auxSect], componentIn.position, 'set', compomentStyleIn, createdSections.array, '', '', '', componentIn.editSectionNumber)
    }
    const sizefortext = (value) => {
        let compomentStyleaux = compomentStyle
        compomentStyleaux.fontSize = value
        setComponentStyle({
            ...compomentStyle,
            fontSize: value
        })
        let compomentStyleIn = compomentStyleaux
        let vec = createdSections
        let newVec = Adder(createdSections.array[componentIn.editSectionNumber !== -1 ? componentIn.editSectionNumber : auxSect], componentIn.position, 'set', compomentStyleIn, createdSections.array, '', '', '', componentIn.editSectionNumber)
    }
    const colorforcomponent = (value) => {
        let compomentStyleaux = compomentStyle
        compomentStyleaux.color = value
        setComponentStyle({
            ...compomentStyle,
            color: value
        })
        let compomentStyleIn = compomentStyleaux
        let vec = createdSections
        let newVec = Adder(createdSections.array[componentIn.editSectionNumber !== -1 ? componentIn.editSectionNumber : auxSect], componentIn.position, 'set', compomentStyleIn, createdSections.array, '', '', '', componentIn.editSectionNumber)

    }
    const newtext = (e) => {
        let compomentStyleaux = compomentStyle
        compomentStyleaux.text = e.target.value
        let string = e.target.value
        setComponentStyle({
            ...compomentStyle,
            text: string
        })
        let compomentStyleIn = compomentStyleaux
        let vec = createdSections
        let newVec = Adder(createdSections.array[componentIn.editSectionNumber !== -1 ? componentIn.editSectionNumber : auxSect], componentIn.position, 'set', compomentStyleIn, createdSections.array, '', '', '', componentIn.editSectionNumber)

    }
    const nextdoit = () => {
        setcreatedSections(createdSections)
    }

    const selectAlign = (value) => {
        let compomentStyleaux = compomentStyle
        compomentStyleaux.align = value
        setComponentStyle({
            ...compomentStyle,
            align: value
        })
        setAlignValues(value)
        let compomentStyleIn = compomentStyleaux
        let vec = createdSections
        let newVec = Adder(createdSections.array[componentIn.editSectionNumber !== -1 ? componentIn.editSectionNumber : auxSect], componentIn.position, 'set', compomentStyleIn, createdSections.array, '', '', '', componentIn.editSectionNumber)

    }
    const goSectionGoin = (i) => {
        rebootComponent()
        goSectionGo(i)
    }
    const selectPadding = (value) => {
        let compomentStyleaux = compomentStyle
        compomentStyleaux.paddings = value
        setComponentStyle({
            ...compomentStyle,
            paddings: value
        })
        setpaddingValues(value)
        let compomentStyleIn = compomentStyleaux
        let vec = createdSections
        let newVec = Adder(createdSections.array[componentIn.editSectionNumber !== -1 ? componentIn.editSectionNumber : auxSect], componentIn.position, 'set', compomentStyleIn, createdSections.array, '', '', '', componentIn.editSectionNumber)

    }

    const saveSection = () => {
        sendSection(createdSections, position)
    }
    const deleteComponent = (value, i) => {
        console.log(value.position, i);
        if (errasing) {
            let newValue = value
            let afterErrase = value
            afterErrase.bgColor = 'transparent'
            afterErrase.paddings = PaddingValues
            afterErrase.align = AlignValues
            afterErrase.border = BorderValues
            afterErrase.position = value.position
            afterErrase.children = []
            afterErrase.childrenContain = false
            afterErrase.especificWidth = newValue.especificWidth
            afterErrase.width = newValue.baseWidth
            afterErrase.baseWidth = newValue.baseWidth
            afterErrase.stage = newValue.stage
            afterErrase.editingValues.paddings = PaddingValues
            afterErrase.editingValues.align = AlignValues
            afterErrase.editingValues.border = BorderValues
            afterErrase.editingValues.color = 'transparent'
            afterErrase.newSection = true
            afterErrase.fatherId = newValue.fatherId
            afterErrase.fatherbaseSection = newValue.fatherbaseSection
            afterErrase.fatherbaseSubSection = newValue.fatherbaseSubSection
            afterErrase.sectionFather = newValue.sectionFather
            afterErrase.basePosition = newValue.basePosition

            let newVec = Adder(createdSections.array[componentIn.editSectionNumber !== -1 ? componentIn.editSectionNumber : i], newValue.position, 'delete', afterErrase, createdSections.array, '', '', '', componentIn.editSectionNumber)
            let ind = componentIn.editSectionNumber !== -1 ? componentIn.editSectionNumber : i
            let vec = createdSections
            console.log(newVec, 'guardaesto');
            vec.array[ind] = newVec.item
            setcreatedSections(vec)
            seterrasing(!errasing)
            console.log(value, 'delete', afterErrase);
            return
        }
        return
    }
    /*    useEffect(() => {
           if (historialValue.value === '+') {
               let number = historialArray.positiionIn
               let num = historialArray.positiionIn + 1
               let retro = tempvector[number]
               positionofSearch = number
               setcreatedSections(retro)
               setHistorialArray({
                   ...historialArray,
                   positiionIn: num
               })
               setComponentStyle(tempvectorstyle[number])
               setcomponentIn(tempvectorcomponentIn[number])
           }
           if (historialValue.value === '-') {
               let number = historialArray.positiionIn - 2
               positionofSearch = number
               let retro = tempvector[number]
               setcreatedSections(retro)
               let num = historialArray.positiionIn - 1
               setHistorialArray({
                   ...historialArray,
                   positiionIn: num
               })
               setComponentStyle(tempvectorstyle[number])
               setcomponentIn(tempvectorcomponentIn[number])
               saveSection()
   
           }
           nextdoit()
       }, [historialValue.action]) */
    const borderColorSet = (value) => {
        let compomentStyleaux = compomentStyle
        let borders = compomentStyle.border
        compomentStyleaux.border.active = true
        compomentStyleaux.border.color = value
        compomentStyleaux.border.size = borders.size === 0 || borders.size === '' ? 1 : borders.size
        borders.active = true
        borders.size = borders.size === 0 ? 1 : borders.size
        setComponentStyle(compomentStyleaux)
        setborderValues(borders)
        console.log(value, 'testBorderColor');
    }
    const radiusSet = (e) => {
        let compomentStyleaux = compomentStyle
        compomentStyleaux.border.radius.active = true
        compomentStyleaux.border.radius.value = e.target.value
        let borders = compomentStyle.border
        borders.radius.active = true
        borders.radius.value = e.target.value
        setComponentStyle(compomentStyleaux)
        setborderValues(borders)
        console.log(e.target.value, 'testRadius');
    }
    const borderSet = (e) => {
        let compomentStyleaux = compomentStyle
        compomentStyleaux.border.active = true
        compomentStyleaux.border.size = e.target.value
        let borders = compomentStyle.border
        borders.active = true
        borders.size = e.target.value
        setComponentStyle(compomentStyleaux)
        console.log(e.target.value, 'testBorderSize', compomentStyle, compomentStyleaux);
        setborderValues(borders)
    }
    const setValueBorders = () => {
        let ind = componentIn.editSectionNumber
        let compomentStyleIn = compomentStyle
        let vec = createdSections
        let newVec = Adder(createdSections.array[auxSect], componentIn.position, 'set', compomentStyleIn, createdSections.array, '', '', '', componentIn.editSectionNumber)
        console.log(newVec, 'guardaesto');
        vec.array[ind] = newVec.item
        setcreatedSections(vec)

    }
    const setErrasing = () => {
        seterrasing(!errasing)
    }
    return (
        <>
            <div className="wdt-100">
                <Historial props={{
                    historialPrint: historialPrint,
                    historial: historialArray
                }} />
                <SideEdiBar props={{
                    setErrasing: setErrasing,
                    compomentStyle: compomentStyle,
                    setValueBorders: setValueBorders,
                    borderColorSet: borderColorSet,
                    radiusSet: radiusSet,
                    borderSet: borderSet, setStylePp,
                    restartPage,
                    sending,
                    sending2,
                    sectionin: componentIn,
                    sectionEditing: sectionEditing,
                    newPage,
                    goSection: goSectionGoin,
                    position: position,
                    sendedPage,
                    saveSection: saveSection,
                    stageIn: stageIn
                }} />
                <div className={pageValues.color !== '' ? pageValues.color + " wdt-75 column relative" : " wdt-75 column relative"} >
                    {
                        createdSections.array.map((key, i) => {
                            return (
                                <> {i >= 0 && !componentIn.state ?
                                    <>
                                        {

                                            /* key[0].newSection !== false ? <div className="wdt-100  fchild100">
                                                <IComponent contains={key.length ? key : key} editMode
                                                    inStage={0}
                                                    editSectionNumber={i}
                                                    editReturn={editFuntion} />
                                            </div> : */ <div className="wdt-100 Ij-space-around ">
                                                <IComponent contains={key/* .length ? key : key.children[0] */} editMode
                                                    errasing={errasing}
                                                    sectionHelp={i}
                                                    inStage={stageIn}
                                                    editSectionNumber={i}
                                                    editReturn={editFuntion}
                                                    deleteComponent={deleteComponent} />
                                            </div>
                                        }
                                    </>
                                    : null}
                                </>

                            )
                        })
                    }
                    {
                        componentIn.state && !objStyles ?
                            <>
                                <div
                                
                                className="wdt-100 column absolute hgPrev" >
                                    <h1>EDITANDO LA SECCION</h1>
                                    <IComponent inComponent={true} contains={componentIn.array} editMode={true} editActive
                                        errasing={errasing}
                                        deleteComponent={deleteComponent}
                                        inStage={stageIn}
                                        borderValues={borderValues}
                                        alignValues={alignValues}
                                        paddingValues={paddingValues}
                                        styleObjEditIn={styleObjEditIn}
                                        componentPos={componentIn.position}
                                        zIndexI={50}
                                        editSectionNumber={componentIn.i}
                                        editReturn={editFuntion} />
                                    <div
                                        onClick={(e) => { e.preventDefault(); setStyleOpt(1) }}
                                        className={`style-option-${styleOpt === 1 ? 'active' : 'inactive'}`}>
                                        Alinear el contenido o darle direccion
                                        {styleOpt === 1 ? <>

                                            <Align compomentStyle={compomentStyle} selectAlign={selectAlign} setStyle={setStyle} sectionin={componentIn.array} />
                                            <br />
                                            <button onClick={(e) => { e.preventDefault(); applyNewStyles() }}> salvar</button>
                                        </>
                                            : null
                                        }
                                    </div>

                                    <div
                                        onClick={(e) => { e.preventDefault(); setStyleOpt(2) }}
                                        className={`style-option-${styleOpt === 2 ? 'active' : 'inactive'}`}>
                                        Dar Paddings o empujar

                                        {styleOpt === 2 ? <>                                             <PaddingComponent compomentStyle={compomentStyle} selectSize={selectPadding} setPaddings={setStyle} sectionin={componentIn.array} />
                                            <br />
                                            <button onClick={(e) => { e.preventDefault(); applyNewStyles() }}> salvar</button>
                                        </>
                                            : null
                                        }


                                    </div>
                                    <button onClick={(e) => { e.preventDefault(); rebootComponent() }}> volver</button>

                                </div>


                            </> : null
                    }
                    {componentIn.state && objStyles ?
                        <div className="wdt-100 column absolute hgPrev" >
                            <div className="wdt-50 column hgPrev" >
                                <SizeEditor compomentStyle={compomentStyle} selectSize={sizeforcomponent} actSize={actSize} />
                                <PaletaColores compomentStyle={compomentStyle} selectColor={colorforcomponent} />
                                {componentIn.array[0].type === 'text' ? <FontSize selectSize={sizefortext} compomentStyle={compomentStyle} actSize={actFontSize} /> : <></>}
                            </div>
                            <div className="wdt-50 column hgPrev">
                                <IComponent
                                    errasing={errasing}
                                    deleteComponent={deleteComponent}
                                    newtext={newtext}
                                    compomentStyle={compomentStyle}
                                    inComponent={true} contains={componentIn.array}
                                    editMode={true} editActive
                                    inStage={stageIn}

                               /*  componentPos={componentIn.position}
                                zIndexI={50}
                                editSectionNumber={componentIn.i}
                                editReturn={editFuntion} */ />
                                <button onClick={(e) => { e.preventDefault(); applyNewStyles() }}> Guardar Cambios</button>
                                <button onClick={(e) => { e.preventDefault(); rebootComponent() }}> volver</button>
                                <br />

                            </div>
                        </div> : null
                    }

                </div>
                {componentIn.state || objStyles ?
                    <>


                        {previewActive ?
                            <div className='column wdt-70'>
                                <p className='prevTitle'>PagePreview</p>
                                <div className={pageValues.color !== '' ? pageValues.color + ' wdt-especial column relative borderEdit Ia-center Ij-flex-start  zInd-900 transformPreview' : 'wdt-especial column relative borderEdit Ia-center Ij-flex-start zInd-900 transformPreview'} >

                                    <br />
                                    <button
                                        className="absolute-closePreview "
                                        onClick={(e) => { e.preventDefault(); setPreviewActive(false) }}
                                    >
                                        Cerrar
                                    </button>
                                    {
                                        createdSections.array.map((key, i) => {
                                            return (
                                                <> {componentIn.state || objStyles ?
                                                    <>

                                                        <div
                                                            id={`container-${i}`} key={`container-${i}`}
                                                            className="wdt-100 Ij-space-around ">
                                                            <IComponent contains={key}
                                                                previewMode
                                                                itemSelected={componentIn.position} />
                                                        </div>
                                                    </>
                                                    : null}
                                                </>)
                                        })}
                                </div> </div>
                            :
                            <div className="wdt-5  al-center">
                                <button
                                    onClick={(e) => { e.preventDefault(); setPreviewActive(true) }}
                                >
                                    Preview
                                </button>
                            </div>
                        }
                    </> : null}

            </div>
        </>
    )
}
export default PagePreview