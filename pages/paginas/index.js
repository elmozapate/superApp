import Head from 'next/head'
import React from 'react';
import RequestGetMsj from '../../request/requestGetMsj'
import RequestLogin from '../../request/requestLogin';
import Rdel from '../../request/requdelete';
import Putmsj from '../../request/reqPut';
import Creator from '../creador/index';
import { useState, useEffect } from 'react';
import { setCookies, removeCookies,getCookie } from 'cookies-next';
import io from "socket.io-client"
import { SelectedNumber } from '../creador/tools/selectedNumber';
import { EnvM } from '../../envMachetero';
const envM=EnvM()

const socket = io(envM.hostBack)
let arrayHere = []
let posSaveAux = -1
let sizeWinAux = []
let fullParticipants = []
let srcVideourl = ''
let n=0
const movieUrls = ["https://www.youtube.com/embed/eOvnHx7VBsQ?autoplay=1&loop=1",
    "https://www.youtube.com/embed/QY0gaf-WyYM?autoplay=1&loop=1",
    "https://www.youtube.com/embed/Idnr9_IS2TM?autoplay=1&loop=1",
    "https://www.youtube.com/embed/nJC0HpvySg0?autoplay=1&loop=1",
    "https://www.youtube.com/embed/mS35rG0N_MA?autoplay=1&loop=1",
    "https://www.youtube.com/embed/qJOFyWMZf_w?autoplay=1&loop=1",
]
const musicUrls = [
    "https://www.youtube.com/embed/TzvbA_Ecd9k?autoplay=1&loop=1&list=RDe5JZ60wZrXU",
    "https://www.youtube.com/embed/7-BnB3xxUoA?autoplay=1&loop=1",
    "https://www.youtube.com/embed/BS46C2z5lVE?autoplay=1&loop=1",
    "https://www.youtube.com/embed/Hwkacrln26o?autoplay=1&loop=1",
    "https://www.youtube.com/embed/PWgvGjAhvIw?autoplay=1&loop=1",
    "https://www.youtube.com/embed/2K8T2Ip6W2w?autoplay=1&loop=1",
    "https://www.youtube.com/embed/rWzjrM9m0As?autoplay=1&loop=1",
    "https://www.youtube.com/embed/W6bcNEWXM1s?autoplay=1&loop=1",
]
const pornUrls = [
    "https://www.pornhub.com/embed/ph625c64eee4325?autoplay=true",
    "https://www.pornhub.com/embed/ph5f1b2d084a8c8?autoplay=1",
    "https://www.pornhub.com/embed/ph5faa607f1cf7b?autoplay=1",
]
export default function Master() {
    const [videoIntime, setVideoIntime] = useState(0)

    let pushed = false
    const arrayinuse = ['']
    const [sizeWin, setsizeWin] = useState(1)
    const [theBoss, settheBoss] = useState(false)
    const [movienum, setMovienum] = useState(-1)
    const [selectedNumbers, setSelectedNumbers] = useState(arrayHere)
    const [startedGameNow, setstartedGameNow] = useState(false)
    const [finishGameNow, setfinishGameNow] = useState(false)
    const [musicnum, setMusicnum] = useState(-1)
    const [xxxnum, setxxxnum] = useState(-1)
    const [getWon, setgetWon] = useState(false)
    const [inGame, setInGame] = useState(1)
    const [registring, setregistring] = useState(false)
    const [winner, setWinner] = useState('')
    const [bingoMovie, setbingoMovie] = useState(false)
    const [playerData, setPlayerData] = useState({
        numbers: [],
        name: ''
    })
    const [createdGame, setcreatedGame] = useState(false)
    const [playerOne, setPlayerOne] = useState(false)
    const [playersIn, setPlayersIn] = useState([])
    const [mensajeR, setMsj] = useState(arrayinuse)
    const [numeroquesalio, setnumeroquesalio] = useState('...')
    const [playing, setplaying] = useState(false)
    const [action, setAction] = useState(false)
    const [page, setPage] = useState(true)
    const [playingGame, setPlayingGame] = useState(false)
    const [bingoNumbersIn, setbingoNumbers] = useState([])
    const [posSave, setposSave] = useState(-1)
    const [pagefuntion, setPageFuntion] = useState(false)
    const [Data, setData] = useState({
        text: '',
        user: '',
        password: ''
    })
    const send = async () => {
        const res = await RequestGetMsj()
        if (res) {
            let aux = res.text.split(',')
            setMsj(arrayinuse)
            setAction(true)
            setMsj(aux)
        }
    }
    const destroyThecookies = () => {
        console.log('destroy', n, srcVideourl);
        removeCookies('time')
        removeCookies('url')
        setTimeout(actualizeCookies, 2000)

    }
    const send4 = async () => {
        if (Data.userd === '' && Data.password === '') {
            setAction(false)
            setMsj('complete los campos')
        } else {
            const res = await RequestLogin(Data)
            if (res) {
                setAction(false)
                setMsj(res.text)
                if (res.text === 'ok') {
                    setPage(false)
                    setPageFuntion(false)
                }
                if (res.text === 'create') {
                    setPage(false)
                    setPageFuntion(true)
                }
            }
        }
    }
    const send2 = async () => {
        if (Data.text !== '') {
            const res = await Putmsj(Data.text)
            pushed = false
            setData({
                text: '',
                user: '',
                password: ''
            })
            if (res) {
                setMsj([''])
            }
        }
    }
    const send3 = async () => {
        const res = await Rdel()
        pushed = false
        setData({
            text: '',
            user: '',
            password: ''
        })
        if (res) {
            setMsj(['Eliminado'])
        }
    }
    const send5 = () => {
        setPage(true)
    }
    const handleLogin = (e) => {
        e.preventDefault()
        pushed = true
        const id = e.target.id; const value = e.target.value
        setData({ ...Data, [id]: value })
    }
    let bingoNumbers = []
    for (let index = 0; index < 91; index++) {
        const element = index;
        const numero = {
            number: element,
            state: false
        }
        bingoNumbers.push(numero)

    }
    const [message, setMessage] = useState(bingoNumbers)
    const restartBingo = () => {
        bingoNumbers = []
        setgetWon(false)
        for (let index = 0; index < 91; index++) {
            const element = index;
            const numero = {
                number: element,
                state: false
            }
            bingoNumbers.push(numero)

        }
        setnumeroquesalio('...')
        setbingoNumbers(bingoNumbers)
        setWinner('')
        const playerNameSave =getCookie('bingo') 
        if (playerNameSave) {
            setPlayerData({
                ...playerData,
                name: playerNameSave
              })
        }
    }
    const prepareGame = () => {
        for (let index = 0; index < playersIn.length; index++) {
            const element = playersIn[index];
            fullParticipants[index] = element
            fullParticipants[index].state = false
            fullParticipants[index].win = false
        }
    }
    let getedAct = '...'
    const resetGame = () => {
        getedAct = '...'
        arrayHere = []
        posSaveAux = -1
        fullParticipants = []
        pushed = false
        setMovienum(-1)
        setSelectedNumbers(arrayHere)
        setstartedGameNow(false)
        setfinishGameNow(false)
        setMusicnum(-1)
        setxxxnum(-1)
        setgetWon(false)
        setInGame(1)
        setregistring(false)
        setWinner('')
        setbingoMovie(false)
        setPlayerData({
            numbers: [],
            name: ''
        })
        setPlayerOne(false)
        setPlayersIn([])
        setMsj(arrayinuse)
        setnumeroquesalio('...')
        setplaying(false)
        setAction(false)
        setPage(true)
        setPlayingGame(false)
        setbingoNumbers([])
        setposSave(-1)
        setPageFuntion(false)
        setWinner('')
        setcreatedGame(false)
        setsizeWin(1)
        sizeWinAux = []
    }
    const playBingo = () => {
        setstartedGameNow(true);
        let continues = true
        let theWinner = ''
        setPlayerOne(true)
        socket.emit('BINGO', {
            'dataIn': 'continua...',
            actionTodo: "geted"
        }); setWinner('continua...')
        /*     let melekwin = false
            let moetwin = false
            let guswin = false
            let lobowin = false */
        setplaying(!playing)
        let min = 0
        let max = 90
        const geted = Math.floor(Math.random() * (max - min)) + min;
        getedAct = (geted)
        if (!bingoNumbers[geted].state) {
            bingoNumbers[geted].state = true
            setbingoNumbers(bingoNumbers)
            setnumeroquesalio(getedAct)
            for (let index = 0; index < fullParticipants.length; index++) {
                const participant = fullParticipants[index];
                const participantname = fullParticipants[index].name;
                const participantnumbers = fullParticipants[index].numbers;
                console.log(participant, 'participante');
                let winner = 0
                for (let index2 = 0; index2 < participantnumbers.length; index2++) {
                    const element2 = participantnumbers[index2];
                    if (geted === element2) {
                        socket.emit('BINGO', {
                            'dataIn': `${participantname} lo tiene`,
                            actionTodo: "geted"
                        }); setWinner(`${participantname} lo tiene`)
                    }
                }
                for (let index3 = 0; index3 < participantnumbers.length; index3++) {
                    const element3 = participantnumbers[index3];
                    if (bingoNumbers[element3].state === true) {
                        winner = winner + 1
                    }
                    else {
                        index3 = 6
                    }
                }
                if (winner === 5) {
                    const won = fullParticipants[index].name
                    fullParticipants[index].win = true
                    setgetWon(true)
                    setWinner(won)
                    continues = false
                    theWinner = fullParticipants[index].name
                }
            }
            if (!continues || inGame === 1) {
                setWinner('CANTA BINGO')
                let won = theWinner
                if (inGame === 1) {
                    restartBingo()
                } else {
                    won = theWinner + ' ' + 'CANTA BINGO'
                    socket.emit('BINGO', {
                        'dataIn': { won },
                        actionTodo: "win"
                    });
                    setgetWon(true)
                    setWinner(won)
                }
            } else {
                socket.emit('BINGO', {
                    'dataIn': { array: bingoNumbers, num: geted },
                    actionTodo: "start"
                });
                setTimeout(playBingo, 2500)
            }
        } else {
            setTimeout(playBingo, 1)
        }
/*     console.log(bingoNumbers, geted, bingoNumbers[geted]);
 */  }
    useEffect(() => {
        socket.on("test", (msg) => { console.log('recibe', msg) })
        setbingoNumbers(bingoNumbers)
    }, [])
    useEffect(() => {
        /*  setbingoNumbers(bingoNumbers) */
        if (bingoNumbers[getedAct]) {
            if (!bingoNumbers[getedAct].state) {
                setnumeroquesalio(getedAct)
            }
        }
        /*  melek.map((key, i) => {
           console.log(key,'key',bingoNumbers[key].state);
           bingoNumbers[key].state === true ?  console.log('lotienemelek') : melekwin = false
         })
         gustavo.map((key, i) => {
           bingoNumbers[key].state === true ? console.log('lotienegus')  : guswin = false
         })
         moet.map((key, i) => {
           bingoNumbers[key].state === true ? console.log('lotienemoet')  : moetwin = false
         }) */
        /*  if (melekwin) {
           setWinner('GANO MELEK')
         }
         if (moetwin) {
           setWinner('GANO MOET')
         }
         if (guswin) {
           setWinner('GANO GUSTAVO')
         } */
    }, [playing])
    useEffect(() => {
        if (!pushed) {
            setData({
                text: '',
                user: '',
                password: ''
            })
        }
    }, [pushed])
    const rebootname = () => {
        setnumeroquesalio('...')
    }
    const selectGame = (value) => {
        arrayHere = selectedNumbers
        let repited = false
        for (let index = 0; index < arrayHere.length; index++) {
            const element = arrayHere[index];
            if (element === value) {
                repited = true
            }
        }
        if (repited === false && posSaveAux < 4 && posSave < 4) {
            posSaveAux = posSaveAux + 1
            arrayHere.push(value)
            setSelectedNumbers(arrayHere)
            setposSave(posSave + 1)
            setPlayerData({
                ...playerData,
                numbers: selectedNumbers
            })
        }
    }
    const checkplayers = (players) => {
        if (!registring) {
            let find = false
            const inputName = document.getElementById('player') ? document.getElementById('player').value : ''
            for (let index = 0; index < players.length; index++) {
                const element = players[index].name;
                if (element === inputName) {
                    find = true
                }
            }
            if (find) {
                setregistring(true);
            }
        }
    }
    const [streamer, setStreamer] = useState(false)
    const [srcVideo, setsrcVideo] = useState("")
    useEffect(() => {
        socket.on("url", (url) => {
            console.log('recibe', url+'autoplay=1&loop=1');
            if (!streamer) {
                setbingoMovie(true); setsrcVideo(url+'autoplay=1&loop=1')
            }
        })
        socket.on("inVideo", (value) => {
            console.log('oiahsfsahvcazbivbdvlhsbkjb');

            const isStreamer = getCookie('streamer')
            console.log('recibe inVideo', isStreamer, value)
            if (isStreamer && value) {
                console.log('recibe ff');
                destroyThecookies()
            }

            if (isStreamer) {
                socket.emit('onVideoTime', {
                    'streamer': isStreamer,
                    'time': n,
                    'url': `${srcVideourl}autoplay=1&start=${n+10}&loop=1`
                })
            }
        })
        let change=false
        socket.on("inVideoTime", (data) => {
            console.log('recibe inVideoTime', data);
            if (!streamer&& change) {
                console.log('aca');
                setsrcVideo(data.url+'autoplay=1&loop=1'); setVideoIntime(data.time); setbingoMovie(true)
            }
        })
        socket.on("BINGO", (msg) => {
            const actionTodo = msg.actionTodo
            const dataIn = msg.dataIn
            switch (actionTodo) {
                case 'new':
                  setWinner(dataIn); setTimeout(rebootname, 3500)
                    break;
                case 'numbers':
                    const numberCheck = getCookie('numbers')
                    const numberSave = numberCheck ? JSON.parse(numberCheck) : []
                    for (let index2 = 0; index2 < numberSave.length; index2++) {
                        const element2 = numberSave[index2];
                        if (dataIn.num === element2) {
                            sizeWinAux.push(element2)
                            const lenghtOf = sizeWinAux.length
                            setsizeWin(lenghtOf + 1)
                        }
                    }
                     setPlayingGame(true);         setfinishGameNow(false);

                    setbingoMovie(false); setbingoNumbers(dataIn.array); setnumeroquesalio(dataIn.num)
                    break;
                case "winnner":
                    setfinishGameNow(true)
                    setWinner(`${dataIn.won}  CANTA BINGO`);
                    setgetWon(true);
                    const playerName =getCookie('bingo') 
                    if (dataIn.won === playerName) {
                        settheBoss(true)
                    }else{
                        settheBoss(false)

                    }
                    break;

                case "players":
                     checkplayers(dataIn);
                    setPlayersIn(dataIn);

                    break;
                case "startedGame":
                    setstartedGameNow(true); /*  setPlayingGame(true) */

                    break;
                case 'closeGame':
                    console.log('offGame');

                    break;
                case 'go':
                    checkplayers(dataIn); setPlayersIn(dataIn); prepareGame();

                    break;
                case 'newStart':
                    setPlayerOne(true);/*  resetGame() */

                    break;
                case 'createdGame':
                     setPlayerOne(false);setcreatedGame(true)

                    break;
                case 'test':
                    if (dataIn === 'created' && !thecreator) {
                        setPlayerOne(false)
                    } else {

                        console.log('recibe', dataIn)
                    }
                    break;
                case 'restarted':
                setcreatedGame(false); resetGame(); setPlayerOne(true); setPlayingGame(false)
                    break;

                case 'startedGame':
                    setstartedGameNow(true); /*  setPlayingGame(true) */
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
                    break
                case 'newRoom':
                    setcreatedGame(true);
                    /*  setPlayingGame(true) */
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
                    break

                default:

                    break;
            }
            const playerNameSave =getCookie('bingo') 
            if (playerNameSave) {
                setPlayerData({
                  ...playerData,
                  name: playerNameSave
                })
                
            }
        })
    }, [])
    useEffect(() => {
        setSelectedNumbers(selectedNumbers)
    }, [posSave, posSaveAux])
    const handlePlayer = (e) => {

        let value = e.target.value
        setPlayerData({
            ...playerData,
            name: value
        })
    }
    const sendPlayer = () => {
        setCookies('bingo', playerData.name, {
            maxAge: 60 * 60 * 12,
            sameSite: 'strict',
            path: '/'
            /* httpOnly: true, */
            // secure: true
        })
        setCookies('numbers', playerData.numbers, {
            maxAge: 60 * 60 * 12,
            sameSite: 'strict',
            path: '/'
            /* httpOnly: true, */
            // secure: true
        })
        socket.emit('BINGO', {
            'dataIn': playerData,
            actionTodo: "player"
        });
    }
    return (
        <div className='main'>
            {
                page ?
                    <>
                        <Head>
                        <title>Aztecflix</title>
                            <meta name="description" content="FullStack app" />
                            <link rel="icon" href="/favicon.ico" />
                        </Head>
                        <body className='boxx'>
                            {1 === 1 ? <>
                                {bingoMovie ? <>
                                    <div className='flex-row'>
                                        <iframe className={srcVideo === "" ? 'hide' : ''} width="1920" height="1080" src={srcVideo} title="YouTube video player" frameBorder={"0"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </div>
                                </>
                                    : <div className='flex-center'>
                                        <div className='flex-center row'>
                                            <h1 className='font-big'>BINGO</h1>
                                            <h1 className={createdGame ? 'nexflix-url' : 'hide'}>Juego creado</h1>
                                            {playingGame ? finishGameNow?<h1 className='nexflix-url'>---Finalizado---</h1>:<h1 className='nexflix-url'>---En curso---</h1> : <></>}---<button className='nexflix-url' onClick={(e) => {
                                                e.preventDefault(),
                                                    setbingoMovie(!bingoMovie)
                                            }}>---PELICULAS----</button>
                                        </div>
                                        {getWon ?
                                            <>
                                            {
                                              theBoss ? <img className='winImg' src='https://media3.giphy.com/media/2gtoSIzdrSMFO/giphy.gif' alt='ganador' /> : <img className='bingoImg' src='https://c.tenor.com/TZYcIOkM-tsAAAAC/bingo.gif' alt='ganador' />
                                            }</>:
                                            <div className='flex-column gapin'>
                                                {
                                                    bingoNumbersIn.map((numberIn, i) => {
                                                        return <><span onClick={createdGame?(e) => { e.preventDefault(); selectGame(numberIn.number) }:(e) => { e.preventDefault(); sconsole.log('nohayjuego') }} className={!createdGame? 'bingo-number ' :numberIn.state ? 'bingo-number activenum pointer' : 'bingo-number pointer'} id={i} key={i}>{numberIn.number}</span> </>
                                                    })
                                                }
                                            </div>
                                        }
                                        <br />
                                        <div className={playingGame?'flex-column gapin':'hide'}>
                                            {
                                                bingoNumbersIn.map((numberIn, i) => {
                                                    const numberCheck = getCookie('numbers')
                                                    const numberSave = numberCheck ? JSON.parse(numberCheck) : []
                                                    return numberSave.map((numberOn, i) => {
                                                        if (numberOn === numberIn.number) {
                                                            return <><span onClick={createdGame ? (e) => { e.preventDefault(); selectGame(numberIn.number) } : (e) => { e.preventDefault(); selectGame(numberIn.number) }} className={!createdGame ? 'bingo-number ' : numberIn.state ? `bingo-number activenum pointer bingo-number-${sizeWin}` : `bingo-number  bingo-number-${sizeWin}`} id={i} key={i}>{numberIn.number}</span> </>
                                                        }
                                                    })
                                                })
                                            }
                                        </div>
                                        <div className={createdGame?'resultado':'hide'}>
                                        <h1 className='font-big flex-center row flex-row'> {winner} <span className={!playingGame ? 'hide' : finishGameNow ? 'hide' : 'bingo-number activenumBig'}> {numeroquesalio}</span></h1>
                                            {
                                                startedGameNow ? <></> : <>{registring ?
                                                    <>
                                                        <h1 className='font-big' >ESPERANDO INICIO</h1>
                                                        {playersIn.map((key, i) => {
                                                            return <li className={playerOne &&!playingGame? 'fontSize-50 ' : 'hide'} key={`player-${i}`}>{`player-${i} ${key.name} `}</li>
                                                        })
                                                        }
                                                    </> : <><h1 className={posSave < 4 ? 'font-big' : 'hide'}>Escoge 5 Números</h1>
                                                        <div className='flex-center row'>
                                                            <SelectedNumber arrayHere={selectedNumbers} pos={posSave}></SelectedNumber>
                                                        </div >
                                                        <input id={'player'} onChange={handlePlayer} value={playerData.name} className={posSave < 4 ? 'hide' : 'bingo-name'} placeholder='NOMBRE DEL JUGADOR' />
                                                        <br />
                                                        <br />
                                                        <br />

                                                        <button className={posSave === 4 && playerData.name.length > 2 ? 'font-big btn-reiniciar' : 'hide'} onClick={(e) => { e.preventDefault(); sendPlayer() }}>ENVIAR</button></>}</>
                                            }
                                            <br />
                                        </div>
                                    </div>}
                            </> : <>
                                <iframe width="1920" height="1080" src="https://www.youtube.com/embed/5dtZK0EiIs8?autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </>
                            }
                            {/*   <button onClick={(e) => { 
                e.preventDefault(),
                  send()
              }}>
                ver
              </button>
              <button onClick={(e) => {
                e.preventDefault(),
                  send2()
              }}>
                mandar
              </button>
              <button onClick={(e) => {
                e.preventDefault(),
                  send3()
              }}>
                Borrar
              </button>
              <button onClick={(e) => {
                e.preventDefault(),
                  send4()
              }}>
                Login
              </button>
              <input
                id='text'
                value={Data.text}
                onChange={handleLogin}
              />
              <input
                id='user'
                placeholder='Usuario'
                value={Data.user}
                onChange={handleLogin}
              />
              <input
                id='password'
                placeholder='Password'
                value={Data.password}
                onChange={handleLogin}
              />
              {
                action ?
                  <>
                    {mensajeR.map((key, i) => {
                      return <> {i > 0 ? <p>{i}-{key} <br></br></p> : null} </>
                    })}
                  </> :
                  <p>{mensajeR}</p>
              } */}
                        </body>
                    </> :
                    <>{
                        !pagefuntion ? <><iframe
                            src='https://magweb.com.co/'
                            width={'100vw'}
                            height={'199vh'}
                            className='iframe-magweb'
                        ></iframe>
                            <button className='btn-logout' onClick={(e) => {
                                e.preventDefault(),
                                    send5()
                            }}>LOGOUT</button> </>
                            : <Creator />
                    } </>
            }
        </div >
    )
}
