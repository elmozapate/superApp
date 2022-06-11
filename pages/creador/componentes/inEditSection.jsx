import { BorderAdder } from "../tools/borderAdder";
import PaletaColores from "../tools/paletaColores";
import SizeEditor from "../tools/sizeEdit";

const InEditSection = ({ props }) => {
    const { setValueBorders= console.log,
         borderColorSet=console.log,
        radiusSet=console.log,
        borderSet=console.log,
         compomentStyle = {
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
        border:{
            active:false,
            size:0,
            color:'',
            radius:{
                active:false,
                value:0
            }
        },
    }, stageIn = 1, sended2 = console.log, handelStyle = console.log, setStyle = console.log, sending2 = console.log, sendText = console.log, applyText = console.log,
        sendImg = console.log, applyImg = console.log, reset = console.log, imgwillsend = '', handelimg = console.log, applyBox = console.log, waitingImg = true, newSubSection = true, sectionin = [{
            position: 0,
            state: false,
            value: {},
            editSectionNumber: 0,
            i: 0,
            array: []
        }], posi = -1, setnewSection = console.log, handeltext = console.log, textwillsend = '', waitingtext = false } = props
    const size = parseInt(((sectionin.array[0].width / sectionin.array[0].baseWidth) * 100).toFixed()) || 100;
   
    return (
        <>
            <SizeEditor compomentStyle={compomentStyle} sectionin={sectionin} selectSize={setStyle} actSize={size} />
            <PaletaColores sectionin={sectionin} selectColor={setStyle} />
            <BorderAdder props={{
                compomentStyle:compomentStyle,
                setValueBorders:setValueBorders,
                borderColorSet: borderColorSet,
                radiusSet: radiusSet,
                borderSet: borderSet
            }} />
            <button
                className={newSubSection && stageIn < 3 ? '' : 'hide'}
                onClick={(e) => { e.preventDefault(); sended2() }}>Nueva Subseccion</button>
            <button
                className={newSubSection ? '' : 'hide'}
                onClick={(e) => { e.preventDefault(); sending2(1, sectionin, sectionin.i, sectionin.editSectionNumber, posi, 'input', 'put') }}>input</button>
            <button
                className={newSubSection ? '' : 'hide'}
                onClick={(e) => { e.preventDefault(); sending2(1, sectionin, sectionin.i, sectionin.editSectionNumber, posi, 'boton', 'put') }}>boton</button>
            <button
                className={newSubSection ? '' : 'hide'}
                onClick={(e) => { e.preventDefault(); sendText() }}>texto</button>
            {
                waitingtext ?
                    <>
                        <textarea rows={4} cols={20}
                            value={textwillsend}
                            onChange={handeltext}
                            type="text" placeholder="ingrese el texto" />
                        <button
                            onClick={(e) => { e.preventDefault(); applyText() }}>enviar texto</button>
                    </>
                    : null
            }
            <button
                className={newSubSection ? '' : 'hide'}
                onClick={(e) => { e.preventDefault(); sendImg() }}>Imagen</button>
            {
                waitingImg ?
                    <>
                        <input
                            value={imgwillsend}
                            onChange={handelimg}
                            type="text" placeholder="ingrese la url" />
                        <button
                            onClick={(e) => { e.preventDefault(); applyImg() }}>subir imagen</button>
                    </>
                    : null
            }{/* 
            <p className={newSubSection ? 'hide' : ''}>cantidad de diviciones</p>
             */}<button
                className={!newSubSection && stageIn < 3 ? '' : 'hide'}
                onClick={(e) => { e.preventDefault(); reset(); applyBox()/*  sending2(2, sectionin, sectionin.i, sectionin.editSectionNumber, posi); setnewSection(true) */ }}>Dividir</button>

        </>
    )
}
export default InEditSection