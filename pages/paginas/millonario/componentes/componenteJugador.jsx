import { useState } from "react"
import BarraInfo from "./barraInfo"
import ComponenteClasificatorio from "./componenteClasificatorio"
import ComponentePreguntas from "./componentePreguntas"
import TiempoPreguntas from "./tiempoPreguntas"

const ComponenteJugador = (props) => {
    const [ip, setIp] = useState(props.ip || false)
    const { inHelping = false,lastMin = false, lostGame = false, winning = false, eltiempo = -1,   warningPreStreamNeedingHelp=false, setwarningPreStreamNeedingHelp=console.log,sethelpPreStream=console.log, helpRes=false, helpPreStream =false, acceptHelp=false,usersInRegister=[], actualPlayer = {
        name: '',
        ip: ''
    },helpTime=0,nowInlevel=0, helpsCome = [], helpsPlayer = {}, gameChoose = -1, helpNeed = console.log, primeraEleccion = -1, inChoosing = console.log, userResults = [], usersResults = [], playerData = { name: '' }, ClasificDone = false, sendPuntuation = console.log, arrayClassificatorio = [], clasificationArray = [], inClasification = false, playerChoose = -1, gameActive = false, sendHelp = console.log, sendPlayer = console.log, escogerEsta = console.log, pregunta = '', respuestas = [], helpRequired = false, playerType = 'publico' } = props
    console.log(playerData);
    return (
        <div className="column fontcolorInedit-white wdt-100 Ia-center Ij-center">
            {
                gameActive ?
                    <>
                        <div className={playerType === 'jugando' ? "fontcolorInedit-white wdt-100 Ia-center Ij-center hgtI-15" : "fontcolorInedit-white wdt-100 Ia-center Ij-center hgtI-15"}>
                            <BarraInfo  helpTime={helpTime}  inHelping={inHelping} warningPreStreamNeedingHelp={warningPreStreamNeedingHelp} setwarningPreStreamNeedingHelp={setwarningPreStreamNeedingHelp}      usersInRegister={usersInRegister} nowInlevel={nowInlevel} actualPlayer={actualPlayer} playerData={playerData}
                                usersResults={usersResults} helpsCome={helpsCome} helpsPlayer={helpsPlayer} helpNeed={helpNeed} playerType={playerType} gameChoose={gameChoose} ip={ip} />
                            <TiempoPreguntas lastMin={lastMin} lostGame={lostGame} winning={winning} eltiempo={eltiempo} />
                        </div>
                        <ComponentePreguntas  sethelpPreStream={sethelpPreStream}  helpRes={helpRes} helpPreStream={helpPreStream}  acceptHelp={acceptHelp} gameChoose={gameChoose} primeraEleccion={primeraEleccion} inChoosing={inChoosing} playerChoose={playerChoose} pregunta={pregunta} playerType={playerType} escogerEsta={escogerEsta} respuestas={respuestas} sendHelp={sendHelp} helpRequired={helpRequired} ip={ip} publico={true} />
                    </>
                    :
                    <>
                        {
                            inClasification ? <><ComponenteClasificatorio
                                playerData={playerData}
                                userResults={userResults}
                                ClasificDone={ClasificDone}
                                sendPuntuation={sendPuntuation}
                                arrayClassificatorio={arrayClassificatorio}
                                clasificationArray={clasificationArray} ip={ip} />
                                {
                                    ClasificDone ? <> <br />
                                        <br />
                                        <br />
                                        <br />
                                        CLASIFICACION AL MOMENTO
                                        {
                                            usersResults.map((key, i) => {
                                                let many = 0
                                                key.array.map((key) => {
                                                    if (key.estado === 'correcta') {
                                                        many = many + 1
                                                    }
                                                })
                                                return <li key={`resultados-${i}`}><span>{key.playerData.name}</span>--<span>{many}/{key.array.length}</span></li>
                                            })
                                        }</> : <></>
                                }

                            </> : <>{playerData.name}{`=>`}Espera un Juego</>

                        }
                    </>
            }
        </div>
    )

}
export default ComponenteJugador