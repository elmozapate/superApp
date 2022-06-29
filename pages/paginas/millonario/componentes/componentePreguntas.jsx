import { useState } from "react"
import PreguntaActiva from "./preguntaActiva"
import RespuestasActivas from "./respuestasActivas"
import TiempoPreguntas from "./tiempoPreguntas"

const ComponentePreguntas = (props) => {
    const {sethelpPreStream=console.log, helpRes=false, helpPreStream =false, acceptHelp=false,helpsCome=[],gameChoose = -1,primeraEleccion=-1, inChoosing = console.log, pregunta = '',playerChoose=-1, respuestas = [], sendHelp = console.log, helpRequired = false ,playerType='publico', escogerEsta=  console.log} = props
    const [inSending, setinSending] = useState(false)
    const [theChoosed, setTheChoosed] = useState(false)
    let change = 0

    const InSending=(choosed)=>{
        if (choosed) {
            setTheChoosed=choosed
        }
        setinSending(!inSending)
        if (change<10) {
            change++
            setTimeout(InSending,1000)
        }else{
            escogerEsta(theChoosed);
        }
    }
    return (
        <>
            <div className="column wdt-100 Ia-center Ij-center hgtIVH-80">
                <div className="wdt-100 flex-row Ia-center Ij-center hgtIVH-15 ">
                    <PreguntaActiva pregunta={pregunta} />
                </div>
                <div className="wdt-100 flex-wrap-true Ia-center Ij-center hgtIVH-63 ngap-10">
                    <RespuestasActivas sethelpPreStream={sethelpPreStream}  helpRes={helpRes} helpPreStream={helpPreStream}  acceptHelp={acceptHelp} inSending={inSending} InSending={InSending} gameChoose={gameChoose}  primeraEleccion={primeraEleccion} inChoosing={inChoosing} playerChoose={playerChoose} pregunta={pregunta} playerType={playerType} escogerEsta={escogerEsta} respuestas={respuestas} sendHelp={sendHelp} helpRequired={helpRequired} />
                </div>
            </div>
        </>
    )
}
export default ComponentePreguntas