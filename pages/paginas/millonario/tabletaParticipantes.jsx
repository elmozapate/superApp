import { useEffect, useState } from "react"
import BotonesRegistro from "./componentes/botonesRegistro"
import ComponenteJugador from "./componentes/componenteJugador"
import ComponentePublico from "./componentes/componentePublico"
import io from "socket.io-client"
import TransitionComponent from "./componentes/transitionComponent"
import TabletaAdmin from "./tabletaAdmin"
import GitPopOut from "./componentes/gitPopOut"
const socket = io("http://serverazteca.herokuapp.com/")
let timeGame = 50
let cont = 0
const TabletaParticipantes = (props) => {
    const [helpPreStream, sethelpPreStream] = useState(false)
    const [warningPreStreamNeedingHelp, setwarningPreStreamNeedingHelp] = useState(false)
    const [helpTime, sethelpTime] = useState(120)
    const [inHelping, setinHelping] = useState(false)

    const [lastMin, setlastMin] = useState(false)
    const [lostGame, setlostGame] = useState(false)
    const [winning, setwinning] = useState(false)
    const [eltiempo, seteltiempo] = useState(50)
    const [helpRes, setHelpRes] = useState(false)
    const [ip, setIp] = useState(props.ip || false)
    const [changeQuestion, setchangeQuestion] = useState(false)
    const [usersInRegister, setUsersInRegister] = useState([])
    const [helpsCome, setHelpsCome] = useState([])
    const [actualPlayer, setactualPlayer] = useState({
        name: '',
        ip: ''
    })
    const [gifPop, setGifPop] = useState({
        state: false,
        msg: 'welcome'
    })
    const [nowInlevel, setnowInlevel] = useState(0)
    const [selectingIp, setselectingIp] = useState(false)
    const [ipChoosed, setipChoosed] = useState('')
    const [primeraEleccion, setPrimeraEleccion] = useState(-1)
    const [gameChoose, setgameChoose] = useState(-1)
    const [helpsPlayer, setHelpsPlayer] = useState({
        help1: true,
        help2: true,
        help3: true,
        help4: true,
    })

    const [usersResults, setusersResults] = useState([])
    const [userResults, setuserResults] = useState([{
        estado: "",
        numeroDePregunta: 0
    }])
    const [ClasificDone, setClasificDone] = useState(false)
    const [inTransition, setinTransition] = useState(false)
    const [playerActive, setPlayerActive] = useState(false)
    const [clasificationArray, setclasificationArray] = useState([])
    const [inClasification, setinClasification] = useState(false)
    const [gameActive, setgameActive] = useState(false)
    const [playerChoose, setplayerChoose] = useState(-1)
    const [pregunta, setpregunta] = useState('')
    const [arrayClassificatorio, setarrayClassificatorio] = useState([{
        pregunta: '',
        repuestas: [],
        correcta: -1
    }])
    const [helpRequired, sethelpRequired] = useState(false)
    const [respuestas, setrespuestas] = useState([{
        respuesta: ''
    }])
    const [nowinHelping, setnowinHelping] = useState(false)
    const [initing, setIniting] = useState(false)
    const [playerData, setplayerData] = useState({
        name: '',
        ip: ''
    })
    const [playerType, setPlayerType] = useState('publico')
    const minutes = () => {
        timeGame = timeGame - 1
        if (cont === 10) {
            cont = 0
        }
        else {
            if (timeGame < -1) {
                setlostGame(true)
                cont = 0

            } else {
                seteltiempo(timeGame)
                setTimeout(minutes, 1000)
                if (timeGame === 15) {
                    setlastMin(true)
                }
                if (timeGame === 0) {
                    if (nowinHelping) {
                        sethelpRequired(false)
                        setnowinHelping(false)
                        setinHelping(false)
                        timeGame = 55
                    } else {
                        setlostGame(true)
                        if (playerType === 'jugando') {
                            escogerEsta({ respuesta: -1 })
                        }
                        showGifPop('https://i.gifer.com/4XAI.gif')
                    }

                }

            }
        }
    }
    const onlyPublic = () => {
        setPlayerType('publico')
        setPlayerActive(true)
    }
    const sendHelp = (respuesta) => {
        console.log(respuesta, 'helped');
        socket.emit(
            'millonario', {
            'actionTodo': 'helping',
            'dataIn': respuesta,
        })
        sethelpRequired(false)
    }
    const startTransition = (condition) => {
        if (condition) {
            setIniting(true)
            setinTransition(true)

            setTimeout(endTransition, 15000)
        } else {
            setinTransition(true)
            setTimeout(endTransition, 5000)
        }

    }
    const endTransition = () => {
        setIniting(false)
        setinTransition(false)

    }
    const escogerEsta = (respuesta) => {
        socket.emit(
            'millonario', {
            'dataIn': {
                respuesta,
                'actionTodo': 'sendRespuesta',
            },
            'actionTodo': 'sendRespuesta',
        })
        console.log('escigio', respuesta);
    }
    const startMillonario = (participante) => {
        console.log('start');
        socket.emit(
            'millonario', {
            'dataIn': {
                participante,
                'actionTodo': 'createMillonario',
            },
            'actionTodo': 'createMillonario',
        })

    }
    const sendPregunta = (pregunta) => {
        socket.emit(
            'millonario', {
            'dataIn': {
                pregunta,
                'actionTodo': 'nuevaPregunta',
            },
            'actionTodo': 'nuevaPregunta',
        })
    }
    const sendPuntuation = (array, time) => {
        socket.emit(
            'millonario', {
            'dataIn': {
                playerData,
                array,
                time,
                'actionTodo': 'puntuacion',
            },
            'actionTodo': 'puntuacion',
        })
    }
    const sendPlayer = (playerData) => {
        socket.emit(
            'millonario', {
            'dataIn': {
                playerData: playerData,
                'actionTodo': 'playerDataSend',
            },
            'actionTodo': 'playerDataSend',
        })
    }
    const inChoosing = (i) => {
        socket.emit(
            'millonario', {
            'dataIn': i,
            'actionTodo': 'inChoosing',
        })
    }
    const helpNeed = (i) => {
        cont = 10
        timeGame = 55
        setnowinHelping(true)
        if (i.state) {
            socket.emit(
                'millonario', {
                'dataIn': i.friend,
                'actionTodo': 'help2',
            })
        } else {
            switch (i) {
                case 1:
                    socket.emit(
                        'millonario', {
                        'dataIn': {
                            'actionTodo': 'help1',
                        },
                        'actionTodo': 'help1',
                    })
                    break;

                case 3:

                    socket.emit(
                        'millonario', {
                        'dataIn': {
                            'actionTodo': 'help3',
                        },
                        'actionTodo': 'help3',
                    })
                    break;

                case 4:
                    socket.emit(
                        'millonario', {
                        'dataIn': {
                            'actionTodo': 'help4',
                        },
                        'actionTodo': 'help4',
                    })
                    setinTransition(true)

                    break;
                default:
                    break;
            }
        }

    }

    const endGame = () => {
        socket.emit(
            'millonario', {
            'dataIn': {
                'actionTodo': 'EndMillonario',
            },
            'actionTodo': 'EndMillonario',
        })
    }
    const acceptHelp = () => {
        socket.emit(
            'millonario', {
            'dataIn': {
                ip: ip,
                'actionTodo': 'giveHelp',
            },
            'actionTodo': 'giveHelp',
        })
    }
    const createClasification = () => {
        socket.emit(
            'millonario', {
            'dataIn': {
                ip: ip,
                'actionTodo': 'createClassification',
            },
            'actionTodo': 'createClassification',
        })
    }

    const resetGifPop = () => {
        setGifPop({
            state: false,
            msg: ''
        })
    }
    const showGifPop = (msg) => {
        setGifPop({
            state: true,
            msg: msg
        })
        setTimeout(resetGifPop, 4000)
    }
    useEffect(() => {
        socket.on("millonario", (chat) => {
            let inGame = false
            const actionTodo = chat.actionTodo
            const dataIn = chat.dataIn || ""
            switch (actionTodo) {
                case 'playerDataRes':
                    setUsersInRegister(dataIn)
                    dataIn.map((key, i) => {
                        if (key.ip === ip) {
                            /*  if (initing) {
                                 startTransition(true)
                             } else {
                                 startTransition()
                             } */
                            console.log(key);
                            setplayerData({
                                ip: key.ip,
                                name: key.name
                            })
                            inGame = true
                        }
                    })
                    if (inGame) {
                        setPlayerType('jugador')
                        setPlayerActive(true)
                    }
                    break;
                case 'playerChoose':
                    let corecto = false
                    console.log('asa', dataIn);

                    dataIn.array.map((key, i) => {

                        if (key.playerData.ip == dataIn.ip.ip) {
                            corecto = true
                            setactualPlayer(key.playerData)

                        }
                    })
                    if (corecto) {
                        setselectingIp(true)
                        console.log('ccoor');
                    }
                    setselectingIp(true)
                    if (ip == dataIn.ip.ip) {
                        setPlayerType('jugando')
                        showGifPop('https://c.tenor.com/Y8ABES9syAYAAAAS/your-turn-its-your-turn.gif')
                    } else {
                        setPlayerType('jugador')

                    }

                    break;
                case 'helpRequired':
                    cont = 10
                    timeGame = 55
                    setTimeout(() => {
                        setnowinHelping(true)
                        minutes()
                    }, 3000)
                    sethelpRequired(true)
                    setinHelping(true)
                    setnowinHelping(true)
                    break;
                case 'helpTime':
                    /*      sethelpRequired(false)
                         setinHelping(false) */
                    /*   minutes() */
                    break;
                case 'helpTimeNumber':
/*                     sethelpTime(dataIn)
 */                    break;

                case 'respuestas':
                    setrespuestas(dataIn)
                    break;
                case 'stopReloj':
                    cont = 10
                    break;
                case 'gameActive':
                    startTransition()
                    /*   if (playerType !== 'jugando') {
                          showGifPop('https://i.pinimg.com/originals/42/cd/6e/42cd6edb536ac19657ecfaff140db76a.gif')
                      } */

                    break;
                case 'inClasification':
                    setinClasification(true)
                    break;
                case 'clasificationArray':
                    setclasificationArray(dataIn)
                    break;
                case 'arrayClassificatorio':
                    setarrayClassificatorio(dataIn)
                    setinClasification(true)
                    break;
                case 'helpingResYes':
                    sethelpPreStream(false)
                    setwarningPreStreamNeedingHelp(false)
                    setHelpRes('acepto')
                    /*  setarrayClassificatorio(dataIn)
                     setinClasification(true) */
                    break;
                case 'helpingResNo':
                    setHelpRes('NoAcepto')
                    sethelpPreStream(false)
                    sethelpRequired(false)
                    /*  setarrayClassificatorio(dataIn)
                     setinClasification(true) */
                    break;
                case 'inpuntuacion':
                    if (props.fromPage === 'pacheco') {
                        setClasificDone(true)

                    }
                    dataIn.map((key, i) => {
                        if (key.playerData.ip === ip) {
                          /*   if (initing) {
                                startTransition(true)
                            } else {
                                startTransition()
                            }  */setuserResults(key.array)
                            setClasificDone(true)
                        }
                    })
                    console.log(dataIn[0], 'oaoasas');
                    setusersResults(dataIn)
                    setclasificationArray(dataIn)
                    break;
                case 'newArray':
                    console.log(dataIn, 'newArray');
                    break;

                case 'preguntaSiguiente':
                    setHelpRes(false)
                    setlastMin(false)
                    setlostGame(false)
                    setwinning(false)
                    seteltiempo(50)
                    startTransition()

                    showGifPop('https://i.pinimg.com/originals/42/cd/6e/42cd6edb536ac19657ecfaff140db76a.gif')

                    setHelpsCome([])
                    sethelpRequired(false)
                    setgameChoose(-1)
                    setPrimeraEleccion(- 1)
                    console.log(dataIn, 'preguntaSiguiente');
                    setpregunta(dataIn.pregunta)
                    let preguntas = []
                    preguntas.push(dataIn.respuesta1, dataIn.respuesta2, dataIn.respuesta3, dataIn.respuesta4)
                    setrespuestas(preguntas)
                    setgameActive(true)
                    cont = 0
                    timeGame = 50
                    minutes()
                    break;
                case 'sendRespuestaResOk':
                    console.log(dataIn, 'dataIndataInYes');
                    setgameChoose(dataIn)
                    setwinning(true)
                    cont = 10
                    if (gameActive) {
                        showGifPop('https://c.tenor.com/ZWopsXeO7tQAAAAS/clapping-applause.gif')
                    }

                    break;
                case 'sendRespuestaResNo':
                    if (gameActive) {
                        timeGame = -100
                        cont = 10
                        showGifPop(playerType === 'jugador' || playerType === 'publico' ? 'https://c.tenor.com/FhF7cOauHTcAAAAM/oyun-bitti-loser.gif' : 'https://c.tenor.com/2oSIv7HNnPsAAAAC/ups-ops.gif')
                    }
                    setlostGame(true)
                    setgameChoose(dataIn)
                    setTimeout(() => {
                        if (playerType !== 'publico') {
                            setPlayerType('jugador')
                        }
                        setinClasification(false); setarrayClassificatorio([{
                            pregunta: '',
                            repuestas: [],
                            correcta: -1
                        }]); setclasificationArray([]);
                        setClasificDone(false); setuserResults([{
                            estado: "",
                            numeroDePregunta: 0
                        }]); setlastMin(false)
                        setlostGame(false)
                        setwinning(false)
                        seteltiempo(-1); setgameActive(false); setselectingIp(false); startTransition(true);
                    }, 15000)
                    break;
                case 'inChoosed':
                    setPrimeraEleccion(parseInt((dataIn + 1) - 1))
                    /*     if (dataIn) {
                            startTransition()
                        }else{
                            setplayerChoose(dataIn)
                        } */
                    break;
                case 'helpsUsed':
                    console.log(dataIn, 'helpsUsed');
                    setHelpsPlayer(dataIn)

                    break;
                case 'cambiemosDepregunta':
                    if (props.fromPage !== 'pacheco') {
                        setinTransition(true)
                        setchangeQuestion(true)
                    }
                    setchangeQuestion(true)

                    break;
                case 'helpingRes':
                    setHelpsCome(dataIn)

                    break;
                case 'helpRequiredOne':
                    if (dataIn.ip === ip) {
                        sethelpRequired(true)
                    }
                    setTimeout(() => {
                        setnowinHelping(true)
                        minutes()
                    }, 3000)

                    break;
                case 'millonarioActualTurn':
                    setnowInlevel(dataIn)
                    break;
                case 'offGame':
                    setlastMin(false)
                    setlostGame(false)
                    setwinning(false)
                    seteltiempo(-1)
                    setHelpRes(false)
                    setTimeout(() => {
                        if (playerType !== 'publico') {
                            setPlayerType('jugador')
                        }
                        setinClasification(false); setarrayClassificatorio([{
                            pregunta: '',
                            repuestas: [],
                            correcta: -1
                        }]); setclasificationArray([]);
                        setClasificDone(false); setuserResults([{
                            estado: "",
                            numeroDePregunta: 0
                        }]); setgameActive(false); setselectingIp(false);
                    }, 5000)
                    break;
                default:
                    break;
            }
        })
        socket.emit(
            'millonario', {
            'dataIn': {
                ip: ip,
                'actionTodo': 'ipSend',
            },
            'actionTodo': 'ipSend',
        })
        startTransition()
    }, [])
    if (inTransition) {
        return (<>
            <TransitionComponent initing={initing} />
            <GitPopOut gifPop={gifPop} />
        </>
        )
    }
    if (props.fromPage === 'pacheco') {
        return (<>
            <TabletaAdmin usersInRegister={usersInRegister} endGame={endGame} gameActive={gameActive} createClasification={createClasification} setchangeQuestion={setchangeQuestion}
                changeQuestion={changeQuestion} ClasificDone={ClasificDone} usersResults={usersResults} startMillonario={startMillonario} ipChoosed={ipChoosed} sendPregunta={sendPregunta} selectingIp={selectingIp} />
        </>)
    }
    return (<>
        <GitPopOut gifPop={gifPop} />
        {!playerActive ? <div className="column fontcolorInedit-white wdt-100 Ia-center Ij-center">
            <BotonesRegistro sendPlayer={sendPlayer} onlyPublic={onlyPublic} ip={ip} />
        </div> : (playerType === 'jugador' || playerType === 'jugando') ? <>
            <ComponenteJugador helpTime={helpTime} inHelping={inHelping} lastMin={lastMin} lostGame={lostGame} winning={winning} eltiempo={eltiempo} warningPreStreamNeedingHelp={warningPreStreamNeedingHelp} setwarningPreStreamNeedingHelp={setwarningPreStreamNeedingHelp} sethelpPreStream={sethelpPreStream} helpRes={helpRes} helpPreStream={helpPreStream} acceptHelp={acceptHelp} usersInRegister={usersInRegister} nowInlevel={nowInlevel} actualPlayer={actualPlayer} helpsCome={helpsCome} helpsPlayer={helpsPlayer} helpNeed={helpNeed} gameChoose={gameChoose} primeraEleccion={primeraEleccion} inChoosing={inChoosing} userResults={userResults} usersResults={usersResults} ClasificDone={ClasificDone} playerData={playerData} sendPuntuation={sendPuntuation} arrayClassificatorio={arrayClassificatorio} clasificationArray={clasificationArray} inClasification={inClasification} gameActive={gameActive}
                pregunta={pregunta} playerType={playerType} respuestas={respuestas} sendHelp={sendHelp} escogerEsta={escogerEsta} helpRequired={helpRequired} ip={ip} />
        </> : <>
            <ComponentePublico helpTime={helpTime} inHelping={inHelping} lastMin={lastMin} lostGame={lostGame} winning={winning} eltiempo={eltiempo}
                sethelpPreStream={sethelpPreStream} helpRes={helpRes} helpPreStream={helpPreStream} acceptHelp={acceptHelp}
                nowInlevel={nowInlevel} actualPlayer={actualPlayer} helpsCome={helpsCome} helpsPlayer={helpsPlayer} helpNeed={helpNeed}
                gameActive={gameActive} primeraEleccion={primeraEleccion} gameChoose={gameChoose}
                playerChoose={playerChoose} pregunta={pregunta} playerType={playerType} respuestas={respuestas} sendHelp={sendHelp} helpRequired={helpRequired} ip={ip}
                sendPlayer={sendPlayer} onlyPublic={onlyPublic} />
        </>
        }
    </>
    )
}
export default TabletaParticipantes