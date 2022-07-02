import { useEffect, useState } from "react"
import BotonesRegistro from "./componentes/botonesRegistro"
import ComponenteJugador from "./componentes/componenteJugador"
import ComponentePublico from "./componentes/componentePublico"
import io from "socket.io-client"
import { setCookies, removeCookies, getCookie } from 'cookies-next';
import TransitionComponent from "./componentes/transitionComponent"
import TabletaAdmin from "./tabletaAdmin"
import GitPopOut from "./componentes/gitPopOut"
import ModeGame from "./componentes/modegame"
import ComponenteSinglePlayer from "./componentes/componenteSinglePlayer"
import ComponenteMultiPlayer from "./componentes/componenteMultiPlayer"
const socket = io('https://serverazteca.herokuapp.com')
let timeGame = 50
let cont = 0
let cookies2 = 'sinCookie'
let cookies3 = 'sinCookie'
let cookies4 = 'sinCookie'
const TabletaParticipantes = (props) => {
    const [changeMode, setChangeMode] = useState('sinRegistro')
    const [adminData, setadminData] = useState('')
    const [helpPreStream, sethelpPreStream] = useState(false)
    const [warningPreStreamNeedingHelp, setwarningPreStreamNeedingHelp] = useState(false)
    const [helpTime, sethelpTime] = useState(120)
    const [inHelping, setinHelping] = useState(false)
    const [multiPlayerGo, setmultiPlayerGo] = useState(false)
    const [roomAdmin, setroomAdmin] = useState(false)
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

    const [roomPlayers, setRoomPlayers] = useState([])
    const [roomsArray, setRoomsArray] = useState([])
    const [goNow, setgoNow] = useState(false)
    const [singlePlayerReady, setsinglePlayerReady] = useState(false)
    const [multiPlayerReady, setmultiPlayerReady] = useState(false)
    const [roomName, setRoomName] = useState('sinSala')
    const [nowInlevel, setnowInlevel] = useState(0)
    const [selectingIp, setselectingIp] = useState(false)
    const [ipChoosed, setipChoosed] = useState('')
    const [primeraEleccion, setPrimeraEleccion] = useState(-1)
    const [gameChoose, setgameChoose] = useState(-1)
    const [chooseState, setChooseState] = useState(false)

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

    const [SinglePlayArray, setSinglePlayArray] = useState([])
    const [SinglePlayLevel, setSinglePlayLevel] = useState(0)
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

    const [nameRequire, setnameRequire] = useState('vacio')
    const [inRoom, setInRoom] = useState(false)

    const [nowinHelping, setnowinHelping] = useState(false)
    const [initing, setIniting] = useState(false)
    const [playerData, setplayerData] = useState({
        name: '',
        ip: ''
    })
    const [playerType, setPlayerType] = useState('publico')
    const minutes = () => {
        let cookies5 = getCookie('playerType') || false
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
                        if (playerType === 'jugando' || (cookies5 === 'jugando')) {
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
        socket.emit(
            'millonario', {
            'gameType': gameChoose,
            'roomName': roomName,
            'actionTodo': 'helping',
            'dataIn': respuesta,
        })
        sethelpRequired(false)
    }
    const startLonelyGamme = (dataIn) => {
        setCookies("gameType", 'singlePlayer', {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        cookies4 = getCookie('roomName')
        if (cookies4) {
            removeCookies('roomName')
        }
        setChangeMode('singlePlayer')
        setsinglePlayerReady(true)
        setactualPlayer(playerData)
        setselectingIp(true)
        setPlayerType('jugando')
        setTimeout(() => {
            setHelpRes(false)
            setlastMin(false)
            setlostGame(false)
            setwinning(false)
            seteltiempo(50)
            startTransition()
            setHelpsCome([])
            sethelpRequired(false)
            setgameChoose(-1)
            setPrimeraEleccion(- 1)
            setpregunta(dataIn[SinglePlayLevel].pregunta)
            let preguntas = []
            preguntas.push(dataIn[SinglePlayLevel].respuesta1, dataIn[SinglePlayLevel].respuesta2, dataIn[SinglePlayLevel].respuesta3, dataIn[SinglePlayLevel].respuesta4)
            setrespuestas(preguntas)
            setgameActive(true)
            cont = 0
            timeGame = 50
            minutes()
        }, 8000)

    }
    const anwserLonelyGamme = (repuesta) => {
        cont = 10
        if (repuesta == SinglePlayArray[SinglePlayLevel].correcta) {
            showGifPop('ok')
            setgameChoose(SinglePlayArray[SinglePlayLevel].correcta)
            setwinning(true)
            socket.emit(
                'millonario', {
                'gameType': 'singlePlayer',
                'roomName': cookies4 ? cookies4 : roomName,
                'dataIn': {
                    ip: parseInt(cookies2) || ip,
                    'actionTodo': 'goodAnwser',
                },
                'actionTodo': 'goodAnwser',
            })
            setTimeout(() => {
                newQuestionLonelyGamme(); setnowInlevel(SinglePlayLevel + 1)
            }, 8000)

        } else {
            setlostGame(true)
            showGifPop('no')
            setgameChoose(SinglePlayArray[SinglePlayLevel].correcta)
            offLonelyGamme()
        }
    }
    const offLonelyGamme = () => {

        socket.emit(
            'millonario', {
            'gameType': 'millonario',
            'roomName': cookies4 ? cookies4 : roomName,
            'dataIn': {
                ip: parseInt(cookies2),
                'actionTodo': 'gameOver',
            },
            'actionTodo': 'gameOver',
        })
        setTimeout(() => {
            setCookies("gameType", 'off', {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            socket.emit(
                'millonario', {
                'gameType': 'millonario',
                'roomName': cookies4 ? cookies4 : roomName,
                'dataIn': {
                    ip: parseInt(cookies2),
                    'actionTodo': 'ipSend',
                },
                'actionTodo': 'ipSend',
            })
            if (playerType !== 'publico') {
                setPlayerType('jugador')
            }
            setinClasification(false); setarrayClassificatorio([{
                pregunta: '',
                repuestas: [],
                correcta: -1
            }]); setclasificationArray([]);
            setPlayerType('jugador')
            setSinglePlayArray([])
            setSinglePlayLevel(0)
            setPlayerActive(false)
            setlastMin(false)
            setlostGame(false)
            setwinning(false)
            seteltiempo(-1)
            setHelpRes(false)
            setClasificDone(false); setuserResults([{
                estado: "",
                numeroDePregunta: 0
            }]); setpregunta([]);
            setgameActive(false); setselectingIp(false); setChangeMode('sinRegistro')
            setmultiPlayerReady(false)
            setsinglePlayerReady(false); setgoNow(false);
        }, 8000)
    }
    const newQuestionLonelyGamme = (newwArray) => {
        if (newwArray) {
            const many = SinglePlayLevel + 1
            setSinglePlayLevel(SinglePlayLevel + 1)
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
            setpregunta(newwArray[many].pregunta)
            let preguntas = []
            preguntas.push(newwArray[many].respuesta1, newwArray[many].respuesta2, newwArray[many].respuesta3, newwArray[many].respuesta4)
            setrespuestas(preguntas)
            setgameActive(true)
            cont = 0
            timeGame = 50
            minutes()
        } else {
            const many = SinglePlayLevel + 1
            setSinglePlayLevel(SinglePlayLevel + 1)
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
            setpregunta(SinglePlayArray[many].pregunta)
            let preguntas = []
            preguntas.push(SinglePlayArray[many].respuesta1, SinglePlayArray[many].respuesta2, SinglePlayArray[many].respuesta3, SinglePlayArray[many].respuesta4)
            setrespuestas(preguntas)
            setgameActive(true)
            cont = 0
            timeGame = 50
            minutes()
        }
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
        cookies3 = getCookie('gameType')
        cookies4 = getCookie('roomName')
        console.log(changeMode, cookies3, 'roomName');
        if (changeMode === 'millonario' || changeMode === 'multiPlayer' || cookies3 === 'multiPlayer') {
            console.log(respuesta, 'respuesta');

            socket.emit(
                'millonario', {
                'gameType': cookies3,
                'roomName': cookies4,
                'dataIn': {
                    respuesta,
                    'actionTodo': 'sendRespuesta',
                },
                'actionTodo': 'sendRespuesta',
            })
        } else {
            if (cookies3 === 'singlePlayer') {
                anwserLonelyGamme(respuesta)
            }
        }

    }
    const startMillonario = (participante) => {
        cookies3 = getCookie('gameType')
        cookies4 = getCookie('roomName')
        if (cookies3 === 'singlePlayer') {
            socket.emit(
                'millonario', {
                'gameType': 'singlePlay',
                'roomName': cookies4 || roomName,
                'dataIn': {
                    participante,
                    'actionTodo': 'singlePlay',
                },
                'actionTodo': 'singlePlay',
            })
        } else {
            socket.emit(
                'millonario', {
                'gameType': cookies3,
                'roomName': cookies4 || roomName,
                'dataIn': {
                    participante,
                    'actionTodo': 'createMillonario',
                },
                'actionTodo': 'createMillonario',
            })
        }
    }
    const startClassific = () => {
        socket.emit(
            'millonario', {
            'gameType': 'multiPlayer',
            'roomName': roomName,
            'actionTodo': 'createClassification',
        })
    }
    const sendPregunta = (pregunta) => {
        socket.emit(
            'millonario', {
            'gameType': gameChoose,
            'roomName': roomName,
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
            'gameType': gameChoose,
            'roomName': roomName,
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
            'gameType': gameChoose,
            'roomName': roomName,
            'dataIn': {
                playerData: playerData,
                'actionTodo': 'playerDataSend',
            },
            'actionTodo': 'playerDataSend',
        })
    }
    const inChoosing = (i) => {
        cookies3 = getCookie('gameType')
        cookies4 = getCookie('roomName')
        if (cookies3 === 'millonario' || cookies3 === 'multiPlayer') {
            socket.emit(
                'millonario', {
                'gameType': cookies3,
                'roomName': roomName,
                'dataIn': i,
                'actionTodo': 'inChoosing',
            })
        } else {
            setPrimeraEleccion(parseInt((i + 1) - 1))
        }

    }
    const helpNeed = (i) => {
        cont = 10
        timeGame = 55
        setnowinHelping(true)
        cookies3 = getCookie('gameType')

        if (i.state && cookies3 !== 'siglePlayer') {
            socket.emit(
                'millonario', {
                'gameType': gameChoose,
                'roomName': roomName,
                'dataIn': i.friend,
                'actionTodo': 'help2',
            })
        } else {
            switch (i) {
                case 1:
                    if (cookies3 === 'siglePlayer') {
                        socket.emit(
                            'millonario', {
                            'gameType': gameChoose,
                            'roomName': roomName,
                            'dataIn': {
                                ip: parseInt(cookies2),
                                level: SinglePlayLevel,
                                'actionTodo': 'help1',
                            },
                            'actionTodo': 'help1',
                        })

                    } else {
                        socket.emit(
                            'millonario', {
                            'gameType': gameChoose,
                            'roomName': roomName,
                            'dataIn': {
                                'actionTodo': 'help1',
                            },
                            'actionTodo': 'help1',
                        })
                    }

                    break;

                case 3:
                    if (cookies3 !== 'siglePlayer') {
                        socket.emit(
                            'millonario', {
                            'gameType': gameChoose,
                            'roomName': roomName,
                            'dataIn': {
                                'actionTodo': 'help3',
                            },
                            'actionTodo': 'help3',
                        })
                    }
                    break;

                case 4:
                    if (cookies3 === 'siglePlayer') {
                        let newwArray = []
                        for (let index = 1; index < SinglePlayArray.length; index++) {
                            const element = SinglePlayArray[index];
                            newwArray.push(element)
                        }
                        setSinglePlayArray(newwArray)
                        newQuestionLonelyGamme(newwArray)
                    } else {
                        socket.emit(
                            'millonario', {
                            'gameType': gameChoose,
                            'roomName': roomName,
                            'dataIn': {
                                'actionTodo': 'help4',
                            },
                            'actionTodo': 'help4',
                        })
                        setinTransition(true)
                    }
                    break;
                default:
                    break;
            }
        }

    }

    const endGame = () => {
        socket.emit(
            'millonario', {
            'gameType': gameChoose,
            'roomName': roomName,
            'dataIn': {
                'actionTodo': 'EndMillonario',
            },
            'actionTodo': 'EndMillonario',
        })
    }
    const acceptHelp = () => {
        socket.emit(
            'millonario', {
            'gameType': gameChoose,
            'roomName': roomName,
            'dataIn': {
                ip: ip,
                'actionTodo': 'giveHelp',
            },
            'actionTodo': 'giveHelp',
        })
    }

    const checkName = (info) => {
        setRoomName(info)
        setnameRequire('enviando')
        socket.emit(
            'millonario', {
            'gameType': gameChoose,
            'roomName': roomName,
            'dataIn': info,
            'actionTodo': 'checkName',
        })
    }
    const createRoom = () => {
        setadminData(playerData)
        setCookies("gameType", 'multiPlayer', {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        setCookies("roomName", roomName, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })

        socket.emit(
            'millonario', {
            'gameType': gameChoose,
            'roomName': roomName,
            'dataIn': {
                ip: parseInt(cookies2) || ip,
                'playerData': playerData,
                'roomWillName': roomName
            },
            'actionTodo': 'createRoom',
        })
    }
    const createClasification = () => {
        socket.emit(
            'millonario', {
            'gameType': gameChoose,
            'roomName': roomName,
            'dataIn': {
                ip: ip,
                'actionTodo': 'createClassification',
            },
            'actionTodo': 'createClassification',
        })
    }

    const enterRoom = (info) => {
        setCookies("gameType", 'multiPlayer', {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        setCookies("roomName", info, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        setRoomName(info)
        socket.emit(
            'millonario', {
            'gameType': gameChoose,
            'roomName': info,
            'dataIn': {
                playerData: playerData,
                roomName: info,
                'actionTodo': 'enterRoom',
            },
            'actionTodo': 'enterRoom',
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
        cookies3 = getCookie('gameType')
        cookies4 = getCookie('roomName')
        socket.on("millonario", (chat) => {
            console.log('millonario', cookies3, cookies2, cookies4, chat);

            let inGame = false
            const actionTodo = chat.actionTodo
            const dataIn = chat.dataIn || ""
            switch (actionTodo) {
                case 'playerDataRes':
                    setUsersInRegister(dataIn)
                    dataIn.map((key, i) => {
                        if (key.ip === ip || key.ip === parseInt(cookies2)) {
                            /*  if (initing) {
                                 startTransition(true)
                             } else {
                                 startTransition()
                             } */
                            setplayerData({
                                ip: key.ip,
                                name: key.name
                            })
                            setCookies("millonarioIp", key.ip, {
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
                case 'startSingle':
                    setSinglePlayArray(dataIn)
                    startLonelyGamme(dataIn)
                    break;
                case 'youArePlaying':
                    console.log('ssssssss');
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        setactualPlayer(playerData)
                        setmultiPlayerReady(true)
                        setselectingIp(true)
                        setPlayerType('jugando')
                        setPlayerActive(true)
                        setinClasification(true)
                        setgoNow(true)
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

                    }
                    break;
                case 'nameOcuped':
                    setnameRequire('ocupado')
                    break;
                case 'millonarioNameUsed':
                    window.alert('nombre ya ocupado')
                    break;
                case 'nameGood':
                    setnameRequire('libre')
                    break;
                case 'roomCreated':
                    if (dataIn.roomName === roomName) {
                        setgoNow(true)
                    }
                    break;
                case 'usersInRoom':
                    if (!ClasificDone) {
                        chat.dataIn.array.map((key, i) => {
                            if (key.ip == ip || key.ip == parseInt(cookies2) && !ClasificDone) {
                                if (!ClasificDone) {
                                    setRoomName(chat.dataIn.roomName)
                                    setInRoom(true)
                                    if (key.type === 'admin' && !ClasificDone) {
                                        setmultiPlayerReady(true)
                                        setInRoom(true)
                                        setroomAdmin(true)
                                        /*                                         setgoNow(false)
                                         */
                                    } else {
                                        if (!ClasificDone) {
                                            setmultiPlayerReady(true)
                                            setInRoom(true)
                                            setgoNow(true)
                                        }

                                    }
                                }

                                setRoomPlayers(chat.dataIn.array)
                            }
                        })
                    }
                    break;
                case 'rooms':
                    let roomsAux = []
                    dataIn.rooms.map((key, i) => {
                        if (key.state) {
                            roomsAux.push(key)
                        }

                    })
                    setRoomsArray(roomsAux)

                    break;
                case 'playerChooseSingle':
                    setactualPlayer(playerData)
                    setselectingIp(true)
                    setPlayerType('jugando')
                    showGifPop('yourTurn')
                    setCookies("playerType", 'jugando', {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/',
                    })
                    break;
                case 'playerChooseMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        setTimeout(() => {
                            let corecto = false
                            dataIn.array.map((key, i) => {
                                console.log('key', key, 'fatainn', dataIn);
                                if (key.playerData.ip == dataIn.ip || key.playerData.ip == dataIn.ip.ip) {
                                    corecto = true
                                    setactualPlayer(key.playerData)

                                }
                            })
                            if (corecto) {
                                setselectingIp(true)
                            }
                            setselectingIp(true)
                            if (ip == dataIn.ip || ip == dataIn.ip.ip || dataIn.ip.ip === parseInt(cookies2)) {
                                setPlayerType('jugando')
                                showGifPop('yourTurn')
                                setCookies("playerType", 'jugando', {
                                    maxAge: 30 * 24 * 60 * 60,
                                    path: '/',
                                })
                            } else {
                                showGifPop('notYourTurn')
                                setCookies("playerType", 'jugador', {
                                    maxAge: 30 * 24 * 60 * 60,
                                    path: '/',
                                })
                                setPlayerType('jugador')
                            }
                        }, 2500)
                    }


                    break;
                case 'playerChoose':
                    cookies3 = getCookie('gameType')
                    if (cookies3 === 'millonario') {
                        setTimeout(() => {
                            let corecto = false
                            dataIn.array.map((key, i) => {
                                if (key.playerData.ip == dataIn.ip.ip) {
                                    corecto = true
                                    setactualPlayer(key.playerData)

                                }
                            })
                            if (corecto) {
                                setselectingIp(true)
                            }
                            setselectingIp(true)
                            if (ip == dataIn.ip.ip || dataIn.ip.ip === parseInt(cookies2)) {
                                setPlayerType('jugando')
                                showGifPop('yourTurn')

                            } else {
                                showGifPop('notYourTurn')

                                setPlayerType('jugador')

                            }
                        }, 2500)
                    }
                    break;
                case 'playerChooseSinle':
                    setTimeout(() => {
                        let corecto = false
                        dataIn.array.map((key, i) => {
                            if (key.array.ip == dataIn.ip.ip || key.playerData.ip == dataIn.ip.ip) {
                                corecto = true
                                setactualPlayer(key.playerData)

                            }
                        })
                        if (corecto) {
                            setselectingIp(true)
                        }
                        setselectingIp(true)
                        if (ip == dataIn.ip.ip || dataIn.ip.ip === parseInt(cookies2)) {
                            setPlayerType('jugando')
                            showGifPop('yourTurn')

                        } else {
                            showGifPop('notYourTurn')

                            setPlayerType('jugador')

                        }
                    }, 2500)

                    break;
                case 'helpRequired':
                    if (cookies3 === 'millonario') {
                        cont = 10
                        timeGame = 55
                        setTimeout(() => {
                            setnowinHelping(true)
                            minutes()
                        }, 3000)
                        sethelpRequired(true)
                        setinHelping(true)
                        setnowinHelping(true)
                    }
                    break;
                case 'helpRequiredMultiplayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        cont = 10
                        timeGame = 55
                        setTimeout(() => {
                            setnowinHelping(true)
                            minutes()
                        }, 3000)
                        sethelpRequired(true)
                        setinHelping(true)
                        setnowinHelping(true)
                    }
                    break;

                case 'respuestas':
                    setrespuestas(dataIn)
                    break;
                case 'stopReloj':
                    if (cookies3 === 'millonario') {
                        cont = 10
                    }
                    break;
                case 'stopRelojMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        cont = 10
                    }
                    break;

                case 'gameActive':
                    if (cookies3 === 'millonario') {
                        startTransition()
                    }
                    /*   if (playerType !== 'jugando') {
                          showGifPop('https://i.pinimg.com/originals/42/cd/6e/42cd6edb536ac19657ecfaff140db76a.gif')
                      } */

                    break;
                case 'inClasification':
                    if (cookies3 === 'millonario') {
                        setinClasification(true)
                    }
                    break;
                case 'inClasificationMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        setinClasification(true)
                        setgoNow(true)
                    }
                    break;
                case 'clasificationArray':
                    if (cookies3 === 'millonario') {
                        setclasificationArray(dataIn)
                    }
                    break;
                case 'arrayClassificatorio':
                    if (cookies3 === 'millonario') {
                        setarrayClassificatorio(dataIn)
                        setinClasification(true)
                    }
                    break;
                case 'arrayClassificatorioMultiplayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 && !inClasification) {
                        setgoNow(true)
                        setarrayClassificatorio(dataIn.newclasif)
                        setinClasification(true)
                    }
                    break;
                case 'helpingResYesMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4) {
                        sethelpPreStream(false)
                        setwarningPreStreamNeedingHelp(false)
                        setHelpRes('acepto')
                    }
                    break
                case 'helpingResYes':
                    if (cookies3 === 'millonario') {
                        sethelpPreStream(false)
                        setwarningPreStreamNeedingHelp(false)
                        setHelpRes('acepto')
                    }
                    break;
                case 'helpingResNoMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4) {
                        setHelpRes('NoAcepto')
                        sethelpPreStream(false)
                        sethelpRequired(false)
                    }
                    break;
                case 'helpingResNo':
                    if (cookies3 === 'millonario') {
                        setHelpRes('NoAcepto')
                        sethelpPreStream(false)
                        sethelpRequired(false)
                    }
                    break;
                case 'juegoSolitario':
                    setSinglePlayArray(dataIn)
                    startLonelyGamme(dataIn)
                    setHelpsPlayer({
                        help1: true,
                        help2: false,
                        help3: false,
                        help4: true,
                    })

                    break;

                case 'inpuntuacion':
                    if (cookies3 === 'millonario') {
                        if (props.fromPage === 'pacheco') {
                            setClasificDone(true)

                        }

                        dataIn.map((key, i) => {
                            if (key.playerData.ip === ip || key.playerData.ip === parseInt(cookies2)) {
                          /*   if (initing) {
                                startTransition(true)
                            } else {
                                startTransition()
                            }  */setuserResults(key.array)
                                setClasificDone(true)
                            }
                        })
                        setusersResults(dataIn)
                        setclasificationArray(dataIn)
                    }
                    break;
                case 'inpuntuacionMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4) {
                        dataIn.array.map((key, i) => {
                            if (key.playerData.ip === ip || key.playerData.ip === parseInt(cookies2)) {
                                /*   if (initing) {
                                      startTransition(true)
                                  } else {
                                      startTransition()
                                  }  */
                                setgoNow(true)
                                setuserResults(key.array)
                                setClasificDone(true)
                            }
                        })
                        setusersResults(dataIn.array)
                        setclasificationArray(dataIn.array)
                    }
                    break;
                case 'newArray':
                    if (cookies3 === 'millonario') {
                    }
                    break;
                case 'preguntaSiguienteMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
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
                        setpregunta(dataIn.pregunta.pregunta)
                        let preguntasM = []
                        preguntasM.push(dataIn.pregunta.respuesta1, dataIn.pregunta.respuesta2, dataIn.pregunta.respuesta3, dataIn.pregunta.respuesta4)
                        setrespuestas(preguntasM)
                        setgameActive(true)
                        cont = 0
                        timeGame = 50
                        minutes()
                    }
                    break;
                case 'preguntaSiguiente':
                    if (cookies3 === 'millonario') {
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
                        setpregunta(dataIn.pregunta)
                        let preguntas = []
                        preguntas.push(dataIn.respuesta1, dataIn.respuesta2, dataIn.respuesta3, dataIn.respuesta4)
                        setrespuestas(preguntas)
                        setgameActive(true)
                        cont = 0
                        timeGame = 50
                        minutes()
                    }
                    break;
                case 'sendRespuestaResOk':
                    if (cookies3 === 'millonario') {
                        showGifPop('ok')
                        setgameChoose(dataIn)
                        setwinning(true)
                        cont = 10
                    }
                    break;
                case 'sendRespuestaResOkMultiplayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        showGifPop('ok')
                        setgameChoose(dataIn.correcta)
                        setwinning(true)
                        cont = 10
                    }
                    break;

                case 'sendRespuestaResNoMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        timeGame = -100
                        cont = 10
                        showGifPop('no')
                        setlostGame(true)
                        setChangeMode('millonario')
                        setgameChoose(dataIn.correcta)
                        setRoomName('sinSala')
                        removeCookies('roomName')
                        removeCookies('gameType')
                        cookies4=false
                        cookies3='off'
                        setTimeout(() => {
                            setCookies("gameType", 'off', {
                                maxAge: 30 * 24 * 60 * 60,
                                path: '/',
                            })
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
                            setwinning(false);
                            setChangeMode('sinRegistro')
                            setmultiPlayerReady(false)
                            setsinglePlayerReady(false); setgoNow(false);
                            seteltiempo(-1); setgameActive(false); setselectingIp(false); startTransition(true);
                            setpregunta([])

                        }, 15000)
                    }
                    break;
                case 'sendRespuestaResNo':
                    if (cookies3 === 'millonario') {
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
                            setwinning(false);
                            setChangeMode('sinRegistro')
                            setmultiPlayerReady(false)
                            setsinglePlayerReady(false); setgoNow(false);
                            seteltiempo(-1); setgameActive(false); setselectingIp(false); startTransition(true);
                            setpregunta([])

                        }, 15000)
                    }
                    break;
                case 'inChoosed':
                    if (cookies3 === 'millonario') {
                        setPrimeraEleccion(parseInt((dataIn + 1) - 1))
                    }
                    break;
                case 'inChoosedMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        setPrimeraEleccion(parseInt((dataIn.choosed + 1) - 1))
                    }
                    break;
                case 'helpsUsed':
                    if (cookies3 === 'millonario') {
                        setHelpsPlayer(dataIn)
                    }

                    break;
                case 'helpsUsedMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        setHelpsPlayer(dataIn.helpsUsed)
                    }

                    break;

                case 'cambiemosDepregunta':
                    if (cookies3 === 'millonario') {
                        if (props.fromPage !== 'pacheco') {
                            setinTransition(true)
                            setchangeQuestion(true)
                        }
                        setchangeQuestion(true)
                    }
                    break;
                case 'helpingRes':
                    if (cookies3 === 'millonario') {
                        setHelpsCome(dataIn)
                    }
                    break;
                case 'helpingResMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        setHelpsCome(dataIn.helpArray)
                    }
                    break;
                case 'helpRequiredOne':
                    if (cookies3 === 'millonario') {
                        if (dataIn.ip === ip || dataIn.ip === parseInt(cookies2)) {
                            sethelpRequired(true)
                        }
                        setTimeout(() => {
                            setnowinHelping(true)
                            minutes()
                        }, 3000)
                    }
                    break;
                case 'helpRequiredOneMultiplayer':

                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {

                        if (dataIn.user.ip === ip || dataIn.user.ip === parseInt(cookies2)) {
                            sethelpRequired(true)
                        }
                        setTimeout(() => {
                            setnowinHelping(true)
                            minutes()
                        }, 3000)
                    }
                    break;
                case 'nameUserOcuped':

                    window.alert('NOMBRE NO DISPONIBLE')
                    break;
                case 'roomLoose':
                    window.alert('SALA OFF')

                    break;
                case 'roomLive':

                    if (!ClasificDone) {
                        if (chat.dataIn !== 'player') {
                            setroomAdmin(true)
                        }
                        setChooseState(false)
                        setChangeMode(cookies3)
                        setRoomName(cookies4)
                        setmultiPlayerReady(true)
                        setInRoom(true)
/*                         setgoNow(false)
 */                    }
                    break;
                case 'millonarioActualTurn':
                    if (cookies3 === 'millonario') {

                        setnowInlevel(dataIn)
                    }
                    break;
                case 'millonarioActualTurnMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        setnowInlevel(dataIn.level)
                    }
                    break;
                case 'youAreOwner':
                    console.log('asasas', dataIn);
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        setplayerData(dataIn.playerData)

                        setTimeout(() => {
                            setadminData(dataIn.playerData)
                        }, 2300)
                    }
                    break;
                case 'retomSingle':
                    let retomArray = []
                    if (dataIn.helpNumber === 1) {
                        for (let index = 1; index < dataIn.array.length; index++) {
                            const element = dataIn.array[index];
                            retomArray.push(element)
                        }
                    } else {
                        retomArray = dataIn.array
                    }
                    setplayerData(dataIn.playerData)
                    setHelpsPlayer(dataIn.helps)
                    setSinglePlayArray(retomArray)
                    setSinglePlayLevel(dataIn.level)
                    setnowInlevel(dataIn.level + 1)
                    let restartArray = []
                    for (let index = dataIn.level; index < dataIn.array.length; index++) {
                        const element = dataIn.array[index];
                        restartArray.push(element)
                    }
                    startLonelyGamme(restartArray)
                    console.log(chat, 'retom', chat);
                    break;

                case 'offGameMultiPlayer':
                    cookies3 = getCookie('gameType')
                    cookies4 = getCookie('roomName')
                    if (dataIn.roomName === cookies4 || dataIn.roomName === roomName) {
                        removeCookies('roomName')
                        setCookies("gameType", 'sinSala', {
                            maxAge: 30 * 24 * 60 * 60,
                            path: '/',
                        })
                        setPlayerActive(false)
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
                            }]); setpregunta([]);
                            setgameActive(false); setselectingIp(false); setChangeMode('sinRegistro')
                            setmultiPlayerReady(false)
                            setsinglePlayerReady(false); setgoNow(false);
                        }, 5000)
                    }

                    break;
                case 'offGame':
                    if (cookies3 === 'millonario') {

                        setPlayerActive(false)
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
                            }]); setpregunta([]);
                            setgameActive(false); setselectingIp(false); setChangeMode('sinRegistro')
                            setmultiPlayerReady(false)
                            setsinglePlayerReady(false); setgoNow(false);
                        }, 5000)
                    }
                    break;



                default:
                    break;
            }
        })

        startTransition()
        cookies2 = getCookie('millonarioIp')
        cookies3 = getCookie('gameType')
        cookies4 = getCookie('roomName')
        if (cookies2) {
            if (cookies2) {
                if (cookies3) {
                    setIp(parseInt(cookies2))
                    socket.emit(
                        'millonario', {
                        'gameType': cookies3,
                        'roomName': cookies4 ? cookies4 : roomName,
                        'dataIn': {
                            ip: parseInt(cookies2),
                            'actionTodo': 'ipSend',
                        },
                        'actionTodo': 'ipSend',
                    })
                } else {
                    setIp(parseInt(cookies2))
                    socket.emit(
                        'millonario', {
                        'gameType': 'millonario',
                        'roomName': cookies4 ? cookies4 : roomName,
                        'dataIn': {
                            ip: parseInt(cookies2),
                            'actionTodo': 'ipSend',
                        },
                        'actionTodo': 'ipSend',
                    })
                }

            } else {
                socket.emit(
                    'millonario', {
                    'gameType': 'millonario',
                    'roomName': cookies4 ? cookies4 : roomName,
                    'dataIn': {
                        ip: ip,
                        'actionTodo': 'ipSend',
                    },
                    'actionTodo': 'ipSend',
                })
            }
        } else {
            setCookies("millonarioIp", ip, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            cookies2 = ip
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
        </div> : changeMode === 'sinRegistro' ? <ModeGame roomName={roomName} chooseState={chooseState} setChooseState={setChooseState} setmultiPlayerReady={setmultiPlayerReady} setmultiPlayerGo={setmultiPlayerGo} setRoomName={setRoomName} setsinglePlayerReady={setsinglePlayerReady} changeMode={changeMode} setChangeMode={setChangeMode} /> : (playerType === 'jugador' || playerType === 'jugando') ? <>
            <ModeGame roomName={roomName} chooseState={chooseState} setChooseState={setChooseState} setmultiPlayerReady={setmultiPlayerReady} setsinglePlayerReady={setsinglePlayerReady} setmultiPlayerGo={setmultiPlayerGo} setRoomName={setRoomName} changeMode={changeMode} setChangeMode={setChangeMode} />
            {
                changeMode === 'millonario' ? <ComponenteJugador helpTime={helpTime} inHelping={inHelping} lastMin={lastMin} lostGame={lostGame} winning={winning} eltiempo={eltiempo} warningPreStreamNeedingHelp={warningPreStreamNeedingHelp} setwarningPreStreamNeedingHelp={setwarningPreStreamNeedingHelp} sethelpPreStream={sethelpPreStream} helpRes={helpRes} helpPreStream={helpPreStream} acceptHelp={acceptHelp} usersInRegister={usersInRegister} nowInlevel={nowInlevel} actualPlayer={actualPlayer} helpsCome={helpsCome} helpsPlayer={helpsPlayer} helpNeed={helpNeed} gameChoose={gameChoose} primeraEleccion={primeraEleccion} inChoosing={inChoosing} userResults={userResults} usersResults={usersResults} ClasificDone={ClasificDone} playerData={playerData} sendPuntuation={sendPuntuation} arrayClassificatorio={arrayClassificatorio} clasificationArray={clasificationArray} inClasification={inClasification} gameActive={gameActive}
                    pregunta={pregunta} playerType={playerType} respuestas={respuestas} sendHelp={sendHelp} escogerEsta={escogerEsta} helpRequired={helpRequired} ip={ip} /> :
                    <>{
                        changeMode === 'singlePlayer' ?
                            <>
                                {
                                    !singlePlayerReady ?
                                        <>
                                            <ComponenteSinglePlayer gameActive={gameActive} setmultiPlayerReady={setmultiPlayerReady} changeMode={changeMode} playerData={playerData} setsinglePlayerReady={setsinglePlayerReady} startMillonario={startMillonario}
                                            />
                                        </>
                                        :
                                        <>
                                            <ComponenteJugador helpTime={helpTime} inHelping={inHelping} lastMin={lastMin} lostGame={lostGame} winning={winning} eltiempo={eltiempo} warningPreStreamNeedingHelp={warningPreStreamNeedingHelp} setwarningPreStreamNeedingHelp={setwarningPreStreamNeedingHelp} sethelpPreStream={sethelpPreStream} helpRes={helpRes} helpPreStream={helpPreStream} acceptHelp={acceptHelp} usersInRegister={usersInRegister} nowInlevel={nowInlevel} actualPlayer={actualPlayer} helpsCome={helpsCome} helpsPlayer={helpsPlayer} helpNeed={helpNeed} gameChoose={gameChoose} primeraEleccion={primeraEleccion} inChoosing={inChoosing} userResults={userResults} usersResults={usersResults} ClasificDone={ClasificDone} playerData={playerData} sendPuntuation={sendPuntuation} arrayClassificatorio={arrayClassificatorio} clasificationArray={clasificationArray} inClasification={inClasification} gameActive={gameActive}
                                                pregunta={pregunta} playerType={playerType} respuestas={respuestas} sendHelp={sendHelp} escogerEsta={escogerEsta} helpRequired={helpRequired} ip={ip} changeMode={changeMode} />
                                        </>
                                }
                            </> :
                            <>
                                {
                                    multiPlayerReady ?
                                        <>{
                                            !goNow ?
                                                <ComponenteSinglePlayer roomAdmin={roomAdmin} roomPlayers={roomPlayers} changeMode={changeMode} playerData={playerData} setgoNow={setgoNow} setsinglePlayerReady={setsinglePlayerReady} startMillonario={startClassific} roomName={roomName} setmultiPlayerReady={setmultiPlayerReady} multiplayer /> :
                                                <ComponenteJugador adminData={adminData} helpTime={helpTime} inHelping={inHelping} lastMin={lastMin} lostGame={lostGame} winning={winning} eltiempo={eltiempo} warningPreStreamNeedingHelp={warningPreStreamNeedingHelp} setwarningPreStreamNeedingHelp={setwarningPreStreamNeedingHelp} startMillonario={startMillonario} sethelpPreStream={sethelpPreStream} helpRes={helpRes} helpPreStream={helpPreStream} acceptHelp={acceptHelp} usersInRegister={usersInRegister} nowInlevel={nowInlevel} actualPlayer={actualPlayer} helpsCome={helpsCome} helpsPlayer={helpsPlayer} helpNeed={helpNeed} gameChoose={gameChoose} primeraEleccion={primeraEleccion} inChoosing={inChoosing} userResults={userResults} usersResults={usersResults} ClasificDone={ClasificDone} playerData={playerData} sendPuntuation={sendPuntuation} arrayClassificatorio={arrayClassificatorio} clasificationArray={clasificationArray} inClasification={inClasification} gameActive={gameActive}
                                                    pregunta={pregunta} playerType={playerType} respuestas={respuestas} sendHelp={sendHelp} escogerEsta={escogerEsta} helpRequired={helpRequired} ip={ip} changeMode={changeMode} />
                                        }

                                        </>
                                        :
                                        <>
                                            <ComponenteMultiPlayer inRoom={inRoom} roomPlayers={roomPlayers} enterRoom={enterRoom} roomsArray={roomsArray} setnameRequire={setnameRequire}
                                                nameRequire={nameRequire} checkName={checkName} createRoom={createRoom} setmultiPlayerGo={setmultiPlayerGo} multiPlayerGo={multiPlayerGo} changeMode={changeMode} setsinglePlayerReady={setsinglePlayerReady} playerData={playerData} sendRoom={startMillonario} ip={ip} setRoomName={setRoomName} setmultiPlayerReady={setmultiPlayerReady} roomName={roomName} />
                                        </>
                                }
                            </>
                    }
                    </>
            }

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