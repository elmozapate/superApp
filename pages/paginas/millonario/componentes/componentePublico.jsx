import { useState } from "react"
import BarraInfo from "./barraInfo"
import BotonesRegistro from "./botonesRegistro"
import ComponentePreguntas from "./componentePreguntas"
import TiempoPreguntas from "./tiempoPreguntas"

const ComponentePublico = (props) => {
    const [ip, setIp] = useState(props.ip || false)
    const { lastMin = false, lostGame = false, winning = false, eltiempo = -1,sethelpPreStream=console.log, helpRes=false, helpPreStream =false, acceptHelp=false,actualPlayer = {
        name: '',
        ip: ''
    },nowInlevel=0, helpsCome = [], helpsPlayer = {}, gameChoose = -1, helpNeed = console.log, primeraEleccion = -1, inChoosing = console.log, userResults = [], usersResults = [], playerData = { name: '' }, ClasificDone = false, sendPuntuation = console.log, arrayClassificatorio = [], clasificationArray = [], inClasification = false, playerChoose = -1, gameActive = false, sendHelp = console.log, sendPlayer = console.log, escogerEsta = console.log, pregunta = '', respuestas = [], helpRequired = false, playerType = 'publico' } = props

    return (
        <div className="column fontcolorInedit-white wdt-100 Ia-center Ij-center">
            {
                gameActive ?
                    <>
                      <div className={playerType === 'jugando' ? "fontcolorInedit-white wdt-100 Ia-center Ij-center hgtI-15" : "fontcolorInedit-white wdt-100 Ia-center Ij-center hgtI-15"}>
                            <BarraInfo nowInlevel={nowInlevel} actualPlayer={actualPlayer} playerData={playerData}
                                usersResults={usersResults} helpsCome={helpsCome} helpsPlayer={helpsPlayer} helpNeed={helpNeed} playerType={playerType} gameChoose={gameChoose} ip={ip} />
                                <BotonesRegistro sendPlayer={sendPlayer} ip={ip} changeMode />
                            <TiempoPreguntas lastMin={lastMin} lostGame={lostGame} winning={winning} eltiempo={eltiempo} />
                        </div>
                    
                        <ComponentePreguntas sethelpPreStream={sethelpPreStream}  helpRes={helpRes} helpPreStream={helpPreStream}  acceptHelp={acceptHelp} gameChoose={gameChoose} primeraEleccion={primeraEleccion} playerChoose={playerChoose} pregunta={pregunta} playerType={playerType} escogerEsta={escogerEsta} respuestas={respuestas} sendHelp={sendHelp} helpRequired={helpRequired} ip={ip} publico={true} />
                    </>
                    :
                    <>
                        ESPERANDO JUEGO
                        <BotonesRegistro sendPlayer={sendPlayer} ip={ip} changeMode />
                    </>
            }
        </div>
    )
}
export default ComponentePublico