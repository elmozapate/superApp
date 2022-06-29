import { useEffect, useState } from "react"
import BotonesRegistro from "./componentes/botonesRegistro"
import ComponenteJugador from "./componentes/componenteJugador"
import ComponentePublico from "./componentes/componentePublico"
import io from "socket.io-client"
import nookies, { parseCookies, setCookie, destroyCookie } from 'nookies'
import TransitionComponent from "./componentes/transitionComponent"
import TabletaAdmin from "./tabletaAdmin"
import GitPopOut from "./componentes/gitPopOut"
const socket = io("https://serverazteca.herokuapp.com/")
let timeGame = 50
let cont = 0
let cookies2 = 'sinCookie'
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
        msg: 'welcome',
        audio: ''

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
                        showGifPop('perdio')

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
            msg: '',
            audio: ''

        })
    }
    const showGifPop = (msg) => {

        switch (msg) {
            case 'ok':
                let imgs4 = ['https://c.tenor.com/ZWopsXeO7tQAAAAS/clapping-applause.gif', 'https://c.tenor.com/Oj2nKJiZSU4AAAAC/celebration-will-smith.gif ', ' https://media2.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif?cid=790b76119581833a99349a997c874904cd7abf10efdea4cd&rid=giphy.gif&ct=g ', 'https://c.tenor.com/3kLOiYZ4elcAAAAC/elmo-jimmyfallon.gif', ' https://i.gifer.com/origin/c9/c99a2ba9b7b577dfe17e7f74c4314fc2_w200.gif', 'https://i.pinimg.com/originals/b1/34/ca/b134ca64e6fdf2d4a109a90705711770.gif'
                ]
                imgs4 = imgs4.sort(function (a, b) { return (Math.random() - 0.5) });
                setGifPop({
                    state: true,
                    msg: imgs4[0],
                    audio: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/millonario%2Faplausos.mp3?alt=media&token=77a0f516-4400-4be7-9e72-970a85e431fc'

                })
                setTimeout(resetGifPop, 8000)
                break;
            case 'no':
                let imgs3 = [' https://media4.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif?cid=790b761116fbfb499578001ee048e90750a4d53c92c8ebdc&rid=giphy.gif&ct=g', ' https://c.tenor.com/kRYmL5XfwzMAAAAC/miggi-you-lose.gif ', ' https://www.epicgifs.net/images/show/P1KDAY3RF ', ' https://c.tenor.com/HIiVcEQR_xwAAAAC/game-over-its-over.gif ', ' https://i.pinimg.com/originals/ed/58/d3/ed58d31cdfb5b5da28ff06a11cf860d6.gif', 'https://i.gifer.com/4XAI.gif'
                ]
                imgs3 = imgs3.sort(function (a, b) { return (Math.random() - 0.5) });
                setGifPop({
                    state: true,
                    msg: imgs3[0],


                    audio: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/millonario%2Fmixkit-player-losing-or-failing-2042.wav?alt=media&token=da862dc9-9820-457e-a37d-98846fa8b084'

                })
                setTimeout(resetGifPop, 7000)
                break;
            case 'next':
                setGifPop({
                    state: true,
                    msg: 'https://i.pinimg.com/originals/42/cd/6e/42cd6edb536ac19657ecfaff140db76a.gif',
                    audio: ''
                })
                setTimeout(resetGifPop, 5000)
                break;
            case 'perdio':
                setGifPop({
                    state: true,
                    msg: !playerType === 'jugador' || !playerType === 'publico' ? 'https://c.tenor.com/FhF7cOauHTcAAAAM/oyun-bitti-loser.gif' : 'https://c.tenor.com/2oSIv7HNnPsAAAAC/ups-ops.gif', audio: ''

                })
                setTimeout(resetGifPop, 7000)
                break;
            case 'yourTurn':
                let imgs2 = ['https://c.tenor.com/Y8ABES9syAYAAAAS/your-turn-its-your-turn.gif,', 'https://c.tenor.com/I-KWVf8K0ocAAAAd/game-time-its-time.gif', 'https://media0.giphy.com/media/dVZSQpraBtKKnKUZg1/giphy.gif?cid=790b76119d7ab87be7512ea18f0e982850678c62badcfdef&rid=giphy.gif&ct=g', 'https://c.tenor.com/pBTl9Roc4cYAAAAC/you-got-this.gif']
                imgs2 = imgs2.sort(function (a, b) { return (Math.random() - 0.5) });
                setGifPop({
                    state: true,
                    msg: imgs2[0],
                    audio: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/millonario%2FWhatsapp%20Star%20Wars%20(Nuevotono.Net).mp3?alt=media&token=532f2269-1a47-466a-8645-aa5d1f23fcfa'
                })
                setTimeout(resetGifPop, 10000)
                break;
            case 'notYourTurn':
                let imgs = ['https://c.tenor.com/LCFZOuwQvgAAAAAC/keep-trying-trying.gif', 'https://c.tenor.com/vF1GD6UN6bUAAAAC/next-time-excited.gif']
                imgs = imgs.sort(function (a, b) { return (Math.random() - 0.5) });

                setGifPop({
                    state: true,
                    msg: imgs,
                    audio: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/millonario%2Fmixkit-player-losing-or-failing-2042.wav?alt=media&token=da862dc9-9820-457e-a37d-98846fa8b084'
                })
                setTimeout(resetGifPop, 10000)
                break;
            default:
                break;
        }

    }
    useEffect(() => {
        socket.on("millonario", (chat) => {
            let inGame = false
            const actionTodo = chat.actionTodo
            const dataIn = chat.dataIn || ""
            switch (actionTodo) {
                case 'playerDataRes':
                    console.log('playerDataRes', chat);
                    setUsersInRegister(dataIn)
                    dataIn.map((key, i) => {
                        if (key.ip === ip || key.ip === parseInt(cookies2.millonarioIp)) {
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
                            setCookie(null, "millonarioIp", key.ip, {
                                maxAge: 30 * 24 * 60 * 60,
                                path: '/',
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
                    if (ip == dataIn.ip.ip||dataIn.ip.ip === parseInt(cookies2.millonarioIp)) {
                        setPlayerType('jugando')
                        showGifPop('yourTurn')

                    } else {
                        showGifPop('notYourTurn')

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
                        if (key.playerData.ip === ip||key.playerData.ip === parseInt(cookies2.millonarioIp)) {
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

                    showGifPop('next')

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
                    showGifPop('ok')
                    console.log(dataIn, 'dataIndataInYes');
                    setgameChoose(dataIn)
                    setwinning(true)
                    cont = 10
                    break;
                case 'sendRespuestaResNo':
                    timeGame = -100
                    cont = 10
                    showGifPop('no')

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
                    if (dataIn.ip === ip||dataIn.ip === parseInt(cookies2.millonarioIp)) {
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

        startTransition()
        cookies2 = parseCookies('millonarioIp')
        console.log('ip', ip);

        if (cookies2) {
            if (cookies2.millonarioIp) {
                console.log('envias');
                setIp(parseInt(cookies2.millonarioIp))
                socket.emit(
                    'millonario', {
                    'dataIn': {
                        ip: parseInt(cookies2.millonarioIp),
                        'actionTodo': 'ipSend',
                    },
                    'actionTodo': 'ipSend',
                })
            } else {
                socket.emit(
                    'millonario', {
                    'dataIn': {
                        ip: ip,
                        'actionTodo': 'ipSend',
                    },
                    'actionTodo': 'ipSend',
                })
            }
        }
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