import Head from 'next/head'
import React, { useRef } from 'react';
import RequestGetMsj from '../../request/requestGetMsj'
import RequestLogin from '../../request/requestLogin';
import Rdel from '../../request/requdelete';
import Putmsj from '../../request/reqPut';
import Creator from '../creador/index';
import { setCookies, removeCookies, getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
import { SelectedNumber } from '../creador/tools/selectedNumber';
import ReactPlayer from 'react-player';

const socket = io("https://serverazteca.herokuapp.com/")

let posAct = -1
let az = -1
let bz = 1
let n = 0;
let cont = 0
let sizeWinAux = []
let changeurl = true
let arrayHere = []
let bingoActualized = false
let posSaveAux = -1
let thecreator = false
let fullParticipants = []
let srcVideourl = ''

export default function Master() {
    const player = useRef(null);
    const [played, setPlayed] = useState(0);
    const [ipTosend, setipTosend] = useState([])
    const [playerOne, setPlayerOne] = useState(true)
    const [taqueador, setTaqueador] = useState({
        bully: false,
        url: '',
        ip: '',
        array: []
    })
    const [videoIntime, setVideoIntime] = useState(0)
    const movieUrls = [
        `https://www.youtube.com/embed/eOvnHx7VBsQ?autoplay=1&loop=1`,
        `https://www.youtube.com/embed/QY0gaf-WyYM?autoplay=1&loop=1`,
        `https://www.youtube.com/embed/Idnr9_IS2TM?autoplay=1&loop=1`,
        `https://www.youtube.com/embed/nJC0HpvySg0?autoplay=1&loop=1`,
        `https://www.youtube.com/embed/mS35rG0N_MA?autoplay=1&loop=1`,
        `https://www.youtube.com/embed/qJOFyWMZf_w?autoplay=1&loop=1`,
    ]
    const musicUrls = [
        `https://www.youtube.com/embed/TzvbA_Ecd9k?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/7-BnB3xxUoA?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/BS46C2z5lVE?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/Hwkacrln26o?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/PWgvGjAhvIw?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/2K8T2Ip6W2w?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/rWzjrM9m0As?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/W6bcNEWXM1s?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/PEnwXYJcSZc?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/T7YmI1SK-kk?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/ESXgJ9-H-2U?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/KD5fLb-WgBU?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/pUjE9H8QlA4?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/ub36ffWAqgQ?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/7agPOt1XZz8?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/YiGSFHjyAbw?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/E7eq4RFf0Sc?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/ttcboE1GrNg?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/XfR9iY5y94s?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/UoaeEAdDv-c?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/XdfTSS-ZCZI?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/KEI4qSrkPAs?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/fWNaR-rxAic?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/eOTbm-NvLII?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/ZyhrYis509A?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/-oqAU5VxFWs?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/e44LTNsVEVk?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/b9xBAtCsCTQ?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/gULONZzTPS8?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/emGri7i8Y2Y?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/XUYaP29LJ1I?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/OmbWAINlUcg?autoplay=1&t=1&loop=1`,
        `https://www.youtube.com/embed/7YvAYIJSSZY?autoplay=1&t=1&loop=1`,
    ]
    const musicUrls2 = [
        `https://www.youtube.com/embed/TzvbA_Ecd9k?autoplay=1&t=`,
        `https://www.youtube.com/embed/7-BnB3xxUoA?autoplay=1&t=`,
        `https://www.youtube.com/embed/BS46C2z5lVE?autoplay=1&t=`,
        `https://www.youtube.com/embed/Hwkacrln26o?autoplay=1&t=`,
        `https://www.youtube.com/embed/PWgvGjAhvIw?autoplay=1&t=`,
        `https://www.youtube.com/embed/2K8T2Ip6W2w?autoplay=1&t=`,
        `https://www.youtube.com/embed/rWzjrM9m0As?autoplay=1&t=`,
        `https://www.youtube.com/embed/W6bcNEWXM1s?autoplay=1&t=`,
        `https://www.youtube.com/embed/PEnwXYJcSZc?autoplay=1&t=`,
        `https://www.youtube.com/embed/T7YmI1SK-kk?autoplay=1&t=`,
        `https://www.youtube.com/embed/ESXgJ9-H-2U?autoplay=1&t=`,
        `https://www.youtube.com/embed/KD5fLb-WgBU?autoplay=1&t=`,
        `https://www.youtube.com/embed/pUjE9H8QlA4?autoplay=1&t=`,
        `https://www.youtube.com/embed/ub36ffWAqgQ?autoplay=1&t=`,
        `https://www.youtube.com/embed/7agPOt1XZz8?autoplay=1&t=`,
        `https://www.youtube.com/embed/YiGSFHjyAbw?autoplay=1&t=`,
        `https://www.youtube.com/embed/E7eq4RFf0Sc?autoplay=1&t=`,
        `https://www.youtube.com/embed/ttcboE1GrNg?autoplay=1&t=`,
        `https://www.youtube.com/embed/XfR9iY5y94s?autoplay=1&t=`,
        `https://www.youtube.com/embed/UoaeEAdDv-c?autoplay=1&t=`,
        `https://www.youtube.com/embed/XdfTSS-ZCZI?autoplay=1&t=`,
        `https://www.youtube.com/embed/KEI4qSrkPAs?autoplay=1&t=`,
        `https://www.youtube.com/embed/fWNaR-rxAic?autoplay=1&t=`,
        `https://www.youtube.com/embed/eOTbm-NvLII?autoplay=1&t=`,
        `https://www.youtube.com/embed/ZyhrYis509A?autoplay=1&t=`,
        `https://www.youtube.com/embed/-oqAU5VxFWs?autoplay=1&t=`,
        `https://www.youtube.com/embed/e44LTNsVEVk?autoplay=1&t=`,
        `https://www.youtube.com/embed/b9xBAtCsCTQ?autoplay=1&t=`,
        `https://www.youtube.com/embed/gULONZzTPS8?autoplay=1&t=`,
        `https://www.youtube.com/embed/emGri7i8Y2Y?autoplay=1&t=`,
        `https://www.youtube.com/embed/XUYaP29LJ1I?autoplay=1&t=`,
        `https://www.youtube.com/embed/OmbWAINlUcg?autoplay=1&t=`,
        `https://www.youtube.com/embed/7YvAYIJSSZY?autoplay=1&t=`,
    ]
    const pornUrls = [
        "https://www.pornhub.com/embed/ph625c64eee4325?autoplay=true",
        "https://www.pornhub.com/embed/ph5f1b2d084a8c8?autoplay=1",
        "https://www.pornhub.com/embed/ph5faa607f1cf7b?autoplay=1",
    ]
    const bingoSongs = [
        'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/y2mate.com%20-%20Sneaky%20Sneaky%20Final%20Cut.mp3?alt=media&token=adba54e0-e8fe-400e-b221-2c2c7cf3f49f',
        'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/y2mate.com%20-%20Scott%20Pilgrim%20Vs%20The%20World%20%20Black%20Sheep%20HD.mp3?alt=media&token=56395911-b07b-4358-8758-25ea3168ec26',
        'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/y2mate.com%20-%20Counting%20Crows%20%20Mr%20Jones%20Official%20Music%20Video.mp3?alt=media&token=29ede07e-face-4340-a1b5-3e8a3d4ddb83',
        'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/y2mate.com%20-%20Nightcrawlers%20%20Push%20The%20Feeling%20On%20Official%20Video.mp3?alt=media&token=e71f511f-f3a2-44ae-b2c3-ab1201abdac6'
    ]
    let pushed = false
    const arrayinuse = ['']
    const [theBoss, settheBoss] = useState(false)
    const [streamer, setStreamer] = useState(true)
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
    const [sizeWin, setsizeWin] = useState(1)
    const [playerData, setPlayerData] = useState({
        numbers: [],
        name: ''
    })
    const [playersIn, setPlayersIn] = useState([])
    const [mensajeR, setMsj] = useState(arrayinuse)
    const [createdGame, setcreatedGame] = useState(false)
    const [numeroquesalio, setnumeroquesalio] = useState('...')
    const [playing, setplaying] = useState(false)
    const [action, setAction] = useState(false)
    const [page, setPage] = useState(true)
    const [playingGame, setPlayingGame] = useState(false)
    const [bingoNumbersIn, setbingoNumbers] = useState([])
    const [posSave, setposSave] = useState(-1)
    const [bingoMusic, setbingoMusic] = useState('https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/y2mate.com%20-%20Nightcrawlers%20%20Push%20The%20Feeling%20On%20Official%20Video.mp3?alt=media&token=e71f511f-f3a2-44ae-b2c3-ab1201abdac6')
    const [changingSong, setchangingSong] = useState(false)
    const [pagefuntion, setPageFuntion] = useState(false)
    const [songtoput, setsongtoput] = useState('')
    const [Data, setData] = useState({
        text: '',
        user: '',
        password: ''
    })
    const [isPlaying, setIsPlaying] = useState(true);
    const handleBully = (e) => {
        let value = e.target.value

        setTaqueador({
            ...taqueador,
            url: value
        })
    }
    const handleBullyIp = (e) => {
        let value = e.target.value

        setTaqueador({
            ...taqueador,
            ip: value
        })
    }
    const send = async () => {
        const res = await RequestGetMsj()
        if (res) {
            let aux = res.text.split(',')
            setMsj(arrayinuse)
            setAction(true)
            setMsj(aux)
        }
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
        setSelectedNumbers([])
        setPlayersIn([])
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
        const playerNameSave = getCookie('bingo')
        if (playerNameSave) {
            setPlayerData({
                ...playerData,
                name: playerNameSave
            })
        }
    }
    const startSendingUrl = () => {
        if (streamer) {
            console.log(musicUrls2[az], bz.toFixed(), az);
            console.log(`${musicUrls2[az]}${bz.toFixed()}&loop=1`);
            let what = `${musicUrls2[az]}${bz.toFixed()}&loop=1`
            socket.emit('BINGO', {
                'dataIn': what,
                actionTodo: "taketime"
            });
            setTimeout(startSendingUrl, 3000)
        }

        /*  */  /* `https://www.youtube.com/embed/W6bcNEWXM1s?autoplay=1&t=1&loop=1`,
    ]
    const musicUrls2 = [
        `https://www.youtube.com/embed/TzvbA_Ecd9k?autoplay=1&t=`, */

    }
    const prepareGame = () => {
        setstartedGameNow(true)
        socket.emit('BINGO', {
            'dataIn': true,
            actionTodo: "creating"
        });
        for (let index = 0; index < playersIn.length; index++) {
            const element = playersIn[index];
            fullParticipants[index] = element
            fullParticipants[index].state = false
            fullParticipants[index].win = false
        }
    }
    let getedAct = '...'
    const playBingo = () => {
        if (!bingoActualized) {
            socket.emit('BINGO', {
                'dataIn': true,
                actionTodo: "actualization"
            });
            bingoActualized = true
        }
        setstartedGameNow(true);
        let continues = true
        let theWinner = ''
        setPlayerOne(true)
        socket.emit('BINGO', {
            'dataIn': 'continua...',
            actionTodo: "geted"
        });
        setWinner('continua...')
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
                let winner = 0
                for (let index2 = 0; index2 < participantnumbers.length; index2++) {
                    const element2 = participantnumbers[index2];
                    if (geted === element2) {
                        socket.emit('BINGO', {
                            'dataIn': `${participantname} lo tiene`,
                            actionTodo: "geted"
                        });
                        setWinner(`${participantname} lo tiene`)
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
                    setfinishGameNow(true)
                    winner === 0
                }
            }
            if (!continues || inGame === 1) {
                setWinner('CANTA BINGO')
                let won = theWinner
                if (inGame === 1) {
                    restartBingo()
                } else {
                    socket.emit('BINGO', {
                        'dataIn': { array: bingoNumbers, num: geted },
                        actionTodo: "start"
                    });
                    socket.emit('BINGO', {
                        'dataIn': { won },
                        actionTodo: "win"
                    });
                    won = theWinner + ' ' + 'CANTA BINGO'
                    setgetWon(true)
                    setWinner(won)
                }
            } else {
                socket.emit('BINGO', {
                    'dataIn': { array: bingoNumbers, num: geted },
                    actionTodo: "start"
                });

                setTimeout(playBingo, 1500)
            }
        } else {
            setTimeout(playBingo, 1)
        }
/*     console.log(bingoNumbers, geted, bingoNumbers[geted]);
 */  }
    const resetGame = () => {
        thecreator = false
        getedAct = '...'
        arrayHere = []
        posSaveAux = -1
        fullParticipants = []
        pushed = false
        setMovienum(-1)
        setposSave(-1)
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
        setPlayerOne(true)
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
        restartBingo()
        setcreatedGame(false)
        setsizeWin(1)
        sizeWinAux = []
    }
    useEffect(() => {
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
    /*     useEffect(() => {
            socket.emit("newBingo", true);
        }, []) */
    function hora(segundos) {
        var d = new Date(segundos * 1000);
        // Ajuste de las 23 horas
        var hora = (d.getHours() == 0) ? 23 : d.getHours() - 1;
        var hora = (hora < 9) ? "0" + hora : hora;
        var minuto = (d.getMinutes() < 9) ? "0" + d.getMinutes() : d.getMinutes();
        var segundo = (d.getSeconds() < 9) ? "0" + d.getSeconds() : d.getSeconds();
        return hora + ":" + minuto + ":" + segundo;
    }

    let timing = false
    const minutesRest = () => {
        cont = 0
        n = 0
    }
    const minutes = () => {
        if (cont === 10) {
            cont = 0
            n = 0
            setVideoIntime(n)
        } else {
            setVideoIntime(n)
            n++;
            setTimeout(minutes, 1000)
        }
    }
    useEffect(() => {

        minutes()
    }, [])

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
            console.log(inputName);
            for (let index = 0; index < players.length; index++) {
                const element = players[index].name;
                if (element === inputName) {
                    console.log('hallado');
                    find = true
                }
            }
            if (find) {
                setregistring(true);
            }
        }
    }
    const actualizeCookies = () => {
        setCookies('time', n, {
            maxAge: 60 * 60 * 12,
            sameSite: 'strict',
            path: '/'
            /* httpOnly: true, */
            // secure: true
        })
        setCookies('url', srcVideourl, {
            maxAge: 60 * 60 * 12,
            sameSite: 'strict',
            path: '/'
            /* httpOnly: true, */
            // secure: true
        })
    }
    const destroyThecookies = () => {
        console.log('destroy', n, srcVideourl);
        removeCookies('time')
        removeCookies('url')
        setTimeout(actualizeCookies, 2000)

    }
    const [srcVideo, setsrcVideo] = useState("")
    useEffect(() => {
        socket.on("url", (url) => {
            console.log('recibe', url);
            if (!streamer) {
                setbingoMovie(true); setsrcVideo(url)
            }
        })
        const isStreamer = getCookie('streamer')
        socket.on("inVideo", (value) => {
            console.log('oiahsfsahvcazbivbdvlhsbkjb');
            console.log('recibe inVideo', isStreamer, value)
            if (isStreamer && value) {
                console.log('recibe');
                destroyThecookies()
            }

            if (isStreamer) {
                socket.emit('onVideoTime', {
                    'streamer': isStreamer,
                    'time': n,
                    'url': `${srcVideourl}`
                })
            }
        })
        socket.on("inVideoTime", (data) => {
            console.log('recibe inVideoTime', data);
            if (!isStreamer) {
                setsrcVideo(data.url); setVideoIntime(data.time); setbingoMovie(true)
            }
        })
        socket.on("BINGO", (msg) => {
            let actionTodo = msg.actionTodo
            let dataIn = msg.dataIn
            switch (actionTodo) {
                case 'getback':
                    setWinner(dataIn); setTimeout(rebootname, 3500)
                    break;
                case 'numbers':
                    console.log('numeros', dataIn);
                    let arraytoIn = dataIn.array
                    setcreatedGame(true)
                    const numberCheck = getCookie('numbers')
                    setbingoNumbers(arraytoIn);
                    const numberSave = numberCheck ? JSON.parse(numberCheck) : []
                    for (let index2 = 0; index2 < numberSave.length; index2++) {
                        const element2 = numberSave[index2];
                        if (dataIn.num === element2) {
                            console.log(element2);
                            sizeWinAux.push(element2)
                            const lenghtOf = sizeWinAux.length
                            setsizeWin(lenghtOf + 1)
                        }
                    }
                    setPlayingGame(true); setbingoMovie(false); setnumeroquesalio(dataIn.num); setfinishGameNow(false)
                    break;
                case "winnner":
                    setfinishGameNow(true)
                    setWinner(`${dataIn.won}  CANTA BINGO`);
                    setgetWon(true);
                    const playerName = getCookie('bingo')
                    if (dataIn.won === playerName) {
                        settheBoss(true)
                    } else {
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
                    setPlayerOne(false); setcreatedGame(true);

                    break;
                case 'test':
                    if (dataIn === 'created' && !thecreator) {
                        console.log('recibe', dataIn)
                        setPlayerOne(false)
                    } else {

                        console.log('recibe', dataIn)
                    }
                    break;
                case 'restarted':
                    resetGame(); setcreatedGame(false); setPlayerOne(true); setPlayingGame(false)
                    break;

                case 'startedGame':
                    setstartedGameNow(true); /*  setPlayingGame(true) */
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
                    break
                case 'newRoom':
                    setcreatedGame(true);
                    setPlayerOne(false)
                    /*  setPlayingGame(true) */
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
                    break
                default:

                    break;
            }

        })
        const playerNameSave = getCookie('bingo')
        if (playerNameSave) {
            setPlayerData({
                ...playerData,
                name: playerNameSave
            })

        }
        /*  socket.on("winnner", (won) => {
             console.log('recibe', won); setWinner(won.won); setgetWon(true);
         })
     
         socket.on("players", (players) => {
             console.log('players', players); checkplayers(players);
             setPlayersIn(players);
         })
         socket.on("closeGame", () => { console.log('offGame'); })
         socket.on("go", (players) => { console.log('go'); checkplayers(players); setPlayersIn(players); prepareGame(); })
         socket.on("newStart", () => { console.log('resetGame'); setPlayerOne(true); resetGame() })
         socket.on("createdGame", () => { console.log('createdGame'); setPlayerOne(false); })
         socket.on("test", (msg) => {
             if (msg === 'created' && !thecreator) {
                 console.log('recibe', msg)
                 setPlayerOne(false)
             } else {
     
                 console.log('recibe', msg)
             }
         }) */
    }, [])
    useEffect(() => {
        setSelectedNumbers(selectedNumbers)
    }, [posSave, posSaveAux])
    const handlePlayer = (e) => {
        let value = e.target.value
        if (value === 'elmomanda') {
            socket.emit('BINGO', {
                'dataIn': true,
                actionTodo: "restart"
            });
        }
        if (value === 'elmotemandaavolar') {
            setTaqueador({
                ...taqueador,
                bully: true
            })

        }
        setPlayerData({
            ...playerData,
            name: value
        })
    }
    const handleSong = (e) => {
        let value = e.target.value
        setsongtoput(value)
    }

    const sendPlayer = (taqueadorin) => {
        if (!taqueadorin) {
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
        } else {
            if (ipTosend.length = 0) {
                console.log('aca1');
                socket.emit('BINGO', {
                    'dataIn': taqueador.url,
                    actionTodo: "elmotemandaavolar"
                });
            } else {
                console.log('aca2', taqueador, ipTosend);
                socket.emit('BINGO', {
                    'dataIn': taqueador,
                    actionTodo: "patadaIndividual"
                });

            }

        }
    }
    const sendPlayers = () => {

        if (ipTosend.length = 0) {
            console.log('aca1');
            socket.emit('BINGO', {
                'dataIn': taqueador.url,
                actionTodo: "elmotemandaavolar"
            });
        } else {
            console.log('aca2', taqueador, ipTosend);
            socket.emit('BINGO', {
                'dataIn': taqueador,
                actionTodo: "patadaIndividual"
            });

        }

    }
    const playerPause = () => {
        console.log(`trying to pause ${player.current.getCurrentTime()}`);
    }
    const changing = () => {

/*     setTimeout(changing2,10000)
 */    }
    const sendPlayerIP = () => {
        let ipin = taqueador.ip
        let aux = ipTosend
        aux.push(ipin)
        setipTosend(aux)
        setTaqueador({
            ...taqueador,
            array: ipTosend
        })
    }
    const changing2 = () => {
        changeurl = !changeurl,
            setIsPlaying(true),
            n = 0,
            setVideoIntime(0),
            srcVideourl = srcVideo,
            setMusicnum(-1),
            setxxxnum(-1),
            setMovienum(posAct),
            cont = 10,
            setStreamer(true),
            setTimeout(minutesRest, 3200),
            setTimeout(minutes, 3300)
        streamer ? socket.emit("onVideo", true) : console.log; socket.emit("video", { url: srcVideo, time: n });
    }
    return (
        <div className='main'>
            {
                page ?
                    <>
                        <Head>
                            <title>Aztecflix-Master</title>
                            <meta name="description" content="FullStack app" />
                            <link rel="icon" href="/favicon.ico" />
                        </Head>
                        <body className='boxx'>
                            {1 === 1 ? <>
                                {bingoMovie ? <>
                                    <div className='flex-row'>
                                        <button id='btn-play' onClick={(e) => {
                                            e.preventDefault(),
                                                console.log('click');
                                            setIsPlaying(!isPlaying)
                                        }}>
                                            PLAY_PAUSE
                                        </button>
                                        <ReactPlayer
                                            ref={player}
                                            onPause={playerPause}
                                            onProgress={(progress) => {
                                                bz = progress.playedSeconds
                                                setPlayed(progress.playedSeconds);
                                            }}
                                            width={'1720px'}
                                            height={'900px'}
                                            url={srcVideo}
                                            config={{
                                                youtube: {
                                                    playerVars: {
                                                        start: 0
                                                    }
                                                }
                                            }}
                                            playing={isPlaying} />
                                        <div className='flex-col-260 h100vh'>
                                            <button className='nexflix-url' onClick={(e) => {
                                                e.preventDefault(),
                                                    setbingoMovie(!bingoMovie);
                                                socket.emit("onVideo", false); setStreamer(false)
                                            }}>BINGO</button>
                                            <button className='nexflix-url' onClick={(e) => {
                                                e.preventDefault(),
                                                    setCookies('streamer', true, {
                                                        maxAge: 60 * 60 * 12,
                                                        sameSite: 'strict',
                                                        path: '/'
                                                        /* httpOnly: true, */
                                                        // secure: true
                                                    }),
                                                    setStreamer(true);
                                                startSendingUrl()
                                            }}>streamer</button>
                                            {`in minute ${played}`}
                                            {movieUrls.map((url, i) => {
                                                return (<button key={i} className={movienum === i ? 'nexflix-url url-active' : 'nexflix-url'} onClick={(e) => {
                                                    e.preventDefault();
                                                    console.log(srcVideo, 'srcVideo');
                                                    if (srcVideo === '') {
                                                        changeurl = !changeurl,
                                                            setIsPlaying(true),
                                                            setsrcVideo(url),
                                                            n = 0,
                                                            setVideoIntime(0),
                                                            srcVideourl = url,
                                                            setMusicnum(-1),
                                                            setxxxnum(-1),
                                                            setMovienum(i),
                                                            cont = 10,
                                                            setStreamer(true),
                                                            setTimeout(minutesRest, 3200),
                                                            setTimeout(minutes, 3300)
                                                        streamer ? socket.emit("onVideo", true) : console.log; socket.emit("video", { url: url, time: n });
                                                    } else {
                                                        posAct = i
                                                        setsrcVideo(url),
                                                            setIsPlaying(false)
                                                        changing()

                                                    }
                                                }
                                                }>{`PELI${i + 1}`}</button>)
                                            })}
                                            {musicUrls.map((url, i) => {
                                                return (<button key={i} className={musicnum === i ? 'nexflix-url url-active' : 'nexflix-url'} onClick={(e) => {
                                                    e.preventDefault(),
                                                        setPlayed(1),
                                                        az = i,
                                                        setIsPlaying(false),
                                                        changeurl = !changeurl,
                                                        setsrcVideo(url),
                                                        setMusicnum(i),
                                                        srcVideourl = url,
                                                        setMovienum(-1),
                                                        setxxxnum(-1),
                                                        n = 0,
                                                        setVideoIntime(0),
                                                        cont = 10,
                                                        setStreamer(true),
                                                        setTimeout(minutesRest, 3200),
                                                        setTimeout(minutes, 3300)
                                                    streamer ? socket.emit("onVideo", true) : console.log;
                                                    socket.emit("video", url);
                                                    setIsPlaying(true)

                                                }}>{`MUSI${i + 1}`}</button>)
                                            })}
                                            {pornUrls.map((url, i) => {
                                                return (<button key={i} className={xxxnum === i ? 'nexflix-url url-active' : 'nexflix-url'} onClick={(e) => {
                                                    e.preventDefault(),
                                                        n = 0,
                                                        setVideoIntime(0),
                                                        changeurl = !changeurl,
                                                        setsrcVideo(url),
                                                        setxxxnum(i),
                                                        setsrcVideo(url),
                                                        setMusicnum(-1),
                                                        setMovienum(-1),
                                                        cont = 10,
                                                        setStreamer(true),
                                                        setTimeout(minutesRest, 3200),
                                                        setTimeout(minutes, 3300)
                                                    socket.emit("video", url);
                                                }}>{`XXX${i + 1}`}</button>)
                                            })}
                                        </div>
                                    </div>
                                </>
                                    : <div className='flex-center'>
                                        <div className='flex-center row'>

                                            <h1 className='font-big'>BINGO</h1>
                                            {playerOne ? !startedGameNow ? <button className={playerOne && createdGame ? 'nexflix-url' : 'hide'} onClick={(e) => {
                                                e.preventDefault(),
                                                    prepareGame()
                                            }}>---Preparar----</button> : <h1 className='nexflix-url'>---Juego creado---</h1> : <h1 className='nexflix-url'>---Juego creado---</h1>
                                            }
                                            {playingGame ? finishGameNow ? <h1 className='nexflix-url'>---Finalizado---</h1> : <h1 className='nexflix-url'>---En curso---</h1> : <button className={(playerOne || thecreator) && startedGameNow ? 'nexflix-url' : 'hide'} onClick={(e) => {
                                                e.preventDefault(),
                                                    playBingo(),
                                                    setInGame(2),
                                                    socket.emit('BINGO', {
                                                        'dataIn': true,
                                                        actionTodo: "starting"
                                                    });
                                            }}>---JUGAR----</button>}---<button className='nexflix-url' onClick={(e) => {
                                                e.preventDefault(),
                                                    setbingoMovie(!bingoMovie)
                                            }}>---PELICULAS----</button>

                                            {
                                                !createdGame && playerOne ? <button className={playerOne ? 'nexflix-url' : 'hide'} onClick={(e) => {
                                                    e.preventDefault(),
                                                        setcreatedGame(true),
                                                        thecreator = true,
                                                        setPlayerOne(true),
                                                        socket.emit('BINGO', {
                                                            'dataIn': true,
                                                            actionTodo: "newAdmin"
                                                        });
                                                }}>---Crear----</button> : <></>
                                            }
                                            {
                                                !changingSong ? <><button className={playerOne ? 'nexflix-url' : 'hide'} onClick={(e) => {
                                                    e.preventDefault();
                                                    setchangingSong(true);

                                                }}>---musica----</button></> :
                                                    <div className='flex column'>
                                                        {
                                                            bingoSongs.map((key, i) => {
                                                                return (
                                                                    <li key={i} className={'nexflix-url'} onClick={(e) => {
                                                                        e.preventDefault(),
                                                                            setbingoMusic(key),
                                                                            setchangingSong(false),
                                                                            socket.emit('BINGO', {
                                                                                'dataIn': key,
                                                                                actionTodo: "bingoSong"
                                                                            });
                                                                    }}>Cancion - {i}</li>
                                                                )
                                                            })
                                                        }
                                                        <input className={'inputSong'} onChange={handleSong} value={songtoput} />
                                                        <button className={'nexflix-url'} onClick={(e) => {
                                                            e.preventDefault();
                                                            setbingoMusic(songtoput),
                                                                setchangingSong(false),
                                                                socket.emit('BINGO', {
                                                                    'dataIn': songtoput,
                                                                    actionTodo: "bingoSong"
                                                                });
                                                        }}>---ingresar otro----</button>
                                                    </div>
                                            }
                                        </div>
                                        {getWon ?
                                            <>
                                                {
                                                    theBoss ? <img className='winImg' src='https://media3.giphy.com/media/2gtoSIzdrSMFO/giphy.gif' alt='ganador' /> : <img className='bingoImg' src='https://c.tenor.com/TZYcIOkM-tsAAAAC/bingo.gif' alt='ganador' />
                                                }</>
                                            :
                                            <div className='flex-column gapin'>
                                                {
                                                    bingoNumbersIn.map((numberIn, i) => {
                                                        return <><span onClick={createdGame ? (e) => { e.preventDefault(); selectGame(numberIn.number) } : (e) => { e.preventDefault(); console.log('nohayjuego') }} className={!createdGame ? 'bingo-number ' : numberIn.state ? 'bingo-number activenum pointer' : 'bingo-number pointer'} id={i} key={i}>{numberIn.number}</span> </>
                                                    })
                                                }
                                            </div>
                                        }
                                        <br />
                                        {createdGame || playingGame ? <audio src={bingoMusic} autoPlay></audio> : <></>}

                                        <div className={playingGame ? 'flex-column gapin' : 'hide'}>                                            {
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
                                        <div className={createdGame ? 'resultado' : 'hide'}>
                                            {
                                                startedGameNow ? <></> : <>{registring ?
                                                    <>
                                                        <h1 className='font-big' >ESPERANDO INICIO</h1>

                                                    </> : <><h1 className={posSave < 4 ? 'font-big' : 'hide'}>Escoge 5 Números</h1>
                                                        <div className='flex-center row'>
                                                            <SelectedNumber arrayHere={selectedNumbers} pos={posSave}></SelectedNumber>
                                                        </div >
                                                        <button className={taqueador.bully ? 'font-big btn-reiniciar' : 'hide'} onClick={(e) => { e.preventDefault(); sendPlayers() }}>patear</button>

                                                        <button className={posSave === 4 && playerData.name.length > 2 && !taqueador.bully ? 'font-big btn-reiniciar' : 'hide'} onClick={(e) => { e.preventDefault(); sendPlayer() }}>ENVIAR</button>
                                                        <input id={'player'} onChange={handlePlayer} value={playerData.name} className={posSave < 4 ? 'hide' : 'bingo-name'} placeholder='NOMBRE DEL JUGADOR' />
                                                        <input id={'taqueador'} onChange={handleBully} value={taqueador.url} className={!taqueador.bully ? 'hide' : 'bingo-name'} placeholder='Url a ir' />
                                                        <input id={'taqueadorIP'} onChange={handleBullyIp} value={taqueador.ip} className={!taqueador.bully ? 'hide' : 'bingo-name'} placeholder='Url a ir' />
                                                        <button className={taqueador.ip.length > 2 && taqueador.bully ? 'font-big btn-reiniciar' : 'hide'} onClick={(e) => { e.preventDefault(); sendPlayerIP(taqueador.ip); }}>ENVIAR</button>
                                                        <br />
                                                        <br />
                                                        {
                                                            ipTosend.map((ip, i) => {
                                                                return <><span id={i} key={i}>{ip}</span> </>
                                                            })
                                                        }
                                                        <br />
                                                        <br />
                                                        <button className={taqueador.bully ? 'font-big btn-reiniciar' : 'hide'} onClick={(e) => {
                                                            e.preventDefault(); socket.emit('BINGO', {
                                                                'dataIn': {taqueador,ipTosend},
                                                                actionTodo: "patadaIndividual"
                                                            });
                                                        }}>ENVIAR</button>

                                                        <br />
                                                        <br />
                                                    </>
                                                }</>
                                            }


                                            {playersIn.map((key, i) => {
                                                return <li className={'fontSize-50 '} key={`player-${i}`}>{`player-${i} ${key.name} `}</li>
                                            })
                                            }
                                            <h1 className='font-big flex-center row flex-row'> {winner} <span className={!playingGame ? 'hide' : finishGameNow ? 'hide' : 'bingo-number activenumBig'}> {numeroquesalio}</span></h1>

                                            <br />
                                        </div>

                                        <button className={playerOne && finishGameNow ? 'font-big btn-reiniciar' : 'hide'} onClick={(e) => {
                                            e.preventDefault(); /* socket.emit('BINGO',{
                                                        'dataIn':  "newBingo",
                                                        actionTodo:false
                                                    }); */
                                            resetGame(), setPlayingGame(false), socket.emit('BINGO', {
                                                'dataIn': true,
                                                actionTodo: "restart"
                                            });
                                        }}>REINICIAR</button>

                                        {/*  <button className={playerOne ? 'font-big btn-reiniciar' : 'hide'} onClick={(e) => { e.preventDefault(); setInGame(1) }}>STOP</button> */}
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
