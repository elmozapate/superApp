import { useEffect, useState } from "react"
import BarraInfo from "./barraInfo"
import ComponenteClasificatorio from "./componenteClasificatorio"
import ComponentePreguntas from "./componentePreguntas"
import TiempoPreguntas from "./tiempoPreguntas"
import { getCookie } from 'cookies-next';

const ComponenteJugador = (props) => {
    const [cookies, setcookie] = useState(getCookie('gameType') || false)
    const [ip, setIp] = useState(props.ip || false)
    const { startMillonario = console.log, adminData = { name: '', ip: '' }, inHelping = false, lastMin = false, lostGame = false, winning = false, eltiempo = -1, warningPreStreamNeedingHelp = false, setwarningPreStreamNeedingHelp = console.log, sethelpPreStream = console.log, helpRes = false, helpPreStream = false, acceptHelp = false, usersInRegister = [], actualPlayer = {
        name: '',
        ip: ''
    }, helpTime = 0, nowInlevel = 0, helpsCome = [], helpsPlayer = {}, gameChoose = -1, helpNeed = console.log, primeraEleccion = -1, inChoosing = console.log, userResults = [], usersResults = [], playerData = { name: '' }, ClasificDone = false, sendPuntuation = console.log, arrayClassificatorio = [], clasificationArray = [], inClasification = false, playerChoose = -1, gameActive = false, sendHelp = console.log, sendPlayer = console.log, escogerEsta = console.log, pregunta = '', respuestas = [], helpRequired = false, playerType = 'publico' } = props
    useEffect(() => {
        setcookie(getCookie('gameType') || false)
    }, [gameActive])

    return (
        <div className="column fontcolorInedit-white wdt-100 Ia-center Ij-center hgtIVH-100">
            {
                gameActive ?
                    <>
                        <div className={playerType === 'jugando' ? "fontcolorInedit-white wdt-100 Ia-center Ij-center  hgtIVH-20 flex-wrap-true" : "fontcolorInedit-white wdt-100 Ia-center Ij-center hgtIVH-20 flex-wrap-true"}>
                            <BarraInfo lastMin={lastMin} lostGame={lostGame} winning={winning} eltiempo={eltiempo} helpRequired={helpRequired} helpTime={eltiempo} inHelping={inHelping} warningPreStreamNeedingHelp={warningPreStreamNeedingHelp} setwarningPreStreamNeedingHelp={setwarningPreStreamNeedingHelp} usersInRegister={usersInRegister} nowInlevel={nowInlevel} actualPlayer={actualPlayer} playerData={playerData}
                                usersResults={usersResults} helpsCome={helpsCome} helpsPlayer={helpsPlayer} helpNeed={helpNeed} playerType={playerType} gameChoose={gameChoose} ip={ip} />


                        </div>
                        <ComponentePreguntas sethelpPreStream={sethelpPreStream} helpRes={helpRes} helpPreStream={helpPreStream} acceptHelp={acceptHelp} gameChoose={gameChoose} primeraEleccion={primeraEleccion} inChoosing={inChoosing} playerChoose={playerChoose} pregunta={pregunta} playerType={playerType} escogerEsta={escogerEsta} respuestas={respuestas} sendHelp={sendHelp} helpRequired={helpRequired} ip={ip} publico={true} />
                    </>
                    :
                    <>
                        {
                            inClasification ? <><ComponenteClasificatorio
                                adminData={adminData}
                                actualPlayer={actualPlayer}
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
                                                return <li className={adminData.name === playerData.name ? 'fontcolor-green pointer' : 'fontcolor-blue '} onClick={adminData.name === playerData.name ? (e) => { e.preventDefault(); startMillonario(key.playerData); } : (e) => { e.preventDefault(); console.log }} key={`resultados-${i}`}><span>{key.playerData.name}</span>--<span>{many}/{key.array.length}</span></li>
                                            })
                                        }</> : <></>
                                }

                            </> : <>
                                
                               {/*  {cookies !== 'singlePlayer' ? <></> : <><button className={'btn-azteca pointer bgInedit-green pointer'} onClick={(e) => {
                                        e.preventDefault();
                                        startMillonario(playerData)
                                    }}>INICIAR JUEGO SINGLE PLAYER</button></>} */}
                                {playerData.name}{`=>`}Espera un Juego</>

                        }
                    </>
            }
        </div>
    )

}
export default ComponenteJugador