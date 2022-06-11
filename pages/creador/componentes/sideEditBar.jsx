import { useState, useEffect } from "react"
import SectionAdd from "../tools/sectionAdd";
import SizeEditor from "../tools/sizeEdit";
import InEditSection from "./inEditSection";
const SideEdiBar = ({ props }) => {
    const {
        setErrasing = console.log,
        setValueBorders = console.log,
        borderColorSet = console.log,
        radiusSet = console.log,
        borderSet = console.log,
        setStylePp = console.log, compomentStyle = {
            color: 'white',
            size: '100',
            position: 0,
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
            border: {
                active: false,
                size: 0,
                color: '',
                radius: {
                    active: false,
                    value: 0
                }
            },
        }, restartPage = console.log, sendedPage = console.log, saveSection = console.log, goSection = console.log, change = false, sectionEditing = [], position = -1, newPage = console.log, sending = console.log, sending2 = console.log, stageIn = 1, sectionin = [{
            position: 0,
            state: false,
            value: {},
            editSectionNumber: 0,
            i: 0,
            array: []
        }] } = props
    const posi = sectionin.position

    const [newSection, setnewSection] = useState(true)
    const [waitingtext, setwaitingtext] = useState(true)
    const [waitingImg, setwaitingImg] = useState(true)
    const [imgwillsend, setimgwillsend] = useState('')
    const [styleValue, setstyleValue] = useState({
        wth: '188',
        hgt: '',
        bgColor: 'white',
        color: 'black'
    })
    const [sectionEditingArray, setsectionEditingArray] = useState(sectionEditing)
    const [textwillsend, settextwillsend] = useState('')
    const [newSubSection, setnewSubSection] = useState(true)
    const sended = () => {
        setnewSection(false)
    }
    const sended2 = () => {
        setnewSubSection(!newSubSection)
    }
    const reset = () => {
        setnewSection(true)
        setnewSubSection(true)
    }
    const handeltext = (e) => {
        e.preventDefault()
        const value = e.target.value
        settextwillsend(value)
    }
    const sendText = () => {
        setwaitingtext(true)
    }
    const applyText = () => {
        sending2(1, sectionin, sectionin.i, sectionin.editSectionNumber, posi, 'text', textwillsend, 'put', false)
        setwaitingtext(false)
    }
    const handelimg = (e) => {
        e.preventDefault()
        const value = e.target.value
        setimgwillsend(value)
    }
    /*    const handelStyle = (value,type) => {
           e.preventDefault()
           setstyleValue({
               ...styleValue,
               [type]:value
           })
       } */
    const sendImg = () => {
        setwaitingImg(true)
    }
    const applyImg = () => {
        sending2(1, sectionin, sectionin.i, sectionin.editSectionNumber, posi, 'img', imgwillsend, 'put', false)
        setwaitingImg(false)
    }
    const applyBox = () => {
        sending2(2, sectionin, sectionin.i, sectionin.editSectionNumber, posi, 'contenedor', "", 'block', true)
    }
    const setStyle = (value, type) => {
        setStylePp(value, type)
  /*       sending2(1, sectionin, sectionin.i, sectionin.editSectionNumber, posi, type, value, 'style')
      */   setwaitingImg(false)
    }
    /* useEffect(() => {
        setsectionEditingArray(sectionEditing)
    }, [change])
     */return (
        <>
            <div className="wdt-20 column">
                <div className="hgt-40">
                    <SectionAdd newPage={newPage} />
                </div>
                {
                    sectionEditing.map((key, i) => {
                        return (
                            <li 
                             id={`container-${i}`} key={`container-${i}`}
                            onClick={(e) => { e.preventDefault(); goSection(i) }}
                            >{key.name} num {i}</li>
                        )
                    })
                }
                {
                    position !== -1 ?
                        <>
                            {!sectionin.state ? 'editor' : `Editando la seccion ${sectionin.editSectionNumber + 1} 
                en la fila ${sectionin.i + 1}`
                            }
                            {
                                newSection && !sectionin.state ?
                                    <button onClick={(e) => { e.preventDefault(); sended() }}>Nueva seccion</button> : !sectionin.state ?
                                        <> cantidad de diviciones
                                            <button onClick={(e) => { e.preventDefault(); reset(); sending(1, sectionin, sectionin.i, sectionin.editSectionNumber, posi); setnewSection(true) }}>1</button>
                                            <button onClick={(e) => { e.preventDefault(); reset(); sending(2, sectionin, sectionin.i, sectionin.editSectionNumber, posi); setnewSection(true) }}>2</button>
                                            <button onClick={(e) => { e.preventDefault(); reset(); sending(3, sectionin, sectionin.i, sectionin.editSectionNumber, posi); setnewSection(true) }}>3</button>
                                        </> : null
                            }
                            {
                                sectionin.state ?
                                    <>

                                        <InEditSection
                                            props={{
                                                compomentStyle: compomentStyle,
                                                setValueBorders: setValueBorders,
                                                borderColorSet: borderColorSet,
                                                radiusSet: radiusSet,
                                                borderSet: borderSet, compomentStyle,
                                                sended2, sending2, sendText, applyText, applyBox,
                                                sendImg, applyImg, reset, imgwillsend, handelimg, waitingImg, newSubSection, sectionin, posi, setnewSection, handeltext, textwillsend, waitingtext,
                                                stageIn,
                                                setStyle
                                            }} />

                                    </> : null
                            }
                        </> : null
                }
                <button onClick={(e) => { e.preventDefault(); setErrasing() }}>
                    Errase Mode
                </button>
                <button onClick={(e) => { e.preventDefault(); saveSection() }}>
                    salvar seccion
                </button>
                <button onClick={(e) => { e.preventDefault(); sendedPage() }}>
                    guardar pagina
                </button>
                <button onClick={(e) => { e.preventDefault(); restartPage() }}>
                    cambiar datos principales
                </button>
            </div>
        </>
    )
}
export default SideEdiBar