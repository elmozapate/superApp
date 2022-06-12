import Head from 'next/head'
import { setCookies, removeCookies, getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
import VideoRecorder from '../../components/containers/videoRecorder';
import VoiceRecorder from '../../components/containers/audioRecorder';
import Loading from '../../components/containers/loading';
import VideoStream from '../../components/containers/streamComponent';
import Streaming from '../../components/containers/streaming';
let theUser = 0

let xcv = 0

let inChat = false
let privArrayAux = []
let activePrva = ''
const socket = io("https://serverazteca.herokuapp.com/")
export default function Chat(props) {
    const hora = () => {
        const date = new Date();
        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
        const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
        return ` ${day} de ${month} del ${year} A las ${hour}:${minutes}:${seconds} `
    }
    const time2 = hora();
    const [recorded, setRecorded] = useState(false)
    const [ip, setIp] = useState(props.ip || false)
    const [aceptStream, setAceptStream] = useState(false)
    const [warningPreStream, setwarningPreStream] = useState(false)
    const [myName, setmyName] = useState('')
    const [isActive, setisActive] = useState(false)
    const [mediaAsk, setmediaAsk] = useState(false)
    const [inMedia, setinMedia] = useState(0)
    const [mediaAskSelect, setmediaAskSelect] = useState(0)
    const [streamImg, setStreamImg] = useState('nooo')
    const [recordingVoice, setrecordingVoice] = useState(false)
    const [recording, setRecording] = useState(false)
    const [ofline, setOfline] = useState(false)
    const [activePrv, setactivePrv] = useState({
        adress: ''
    })
    const [urlVideo, seturlVideo] = useState("");
    const [urlAudio, seturlAudio] = useState("");
    const [nicksArray, setnicksArray] = useState([])
    const [urName, seturName] = useState({
        user: '',
        adress: ''
    })
    const [inMessage, setinMessage] = useState(0)
    const [user, setuser] = useState({
        user: '',
        adress: ''
    })
    const [warningPre, setwarningPre] = useState(false)
    const [transmiting, settransmiting] = useState(false)
    const [privArray, setprivArray] = useState([])
    const [register, setregister] = useState(false)
    const [Users, setUsers] = useState(0)
    const [chating, setChating] = useState(false)
    const [chatArray, setChatArray] = useState([])
    const [privateChat, setPrivateChat] = useState(false)
    const [mensaje, setMsj] = useState({
        user: '',
        chat: false,
        date: time2,
        actionTodo: "",
        privAdress: false,
        adress: socket.id,
        ip: ip,
    })

    const latinoName = getCookie('userChat')



    const getStreming = (stream) => {
        const time = hora();
        socket.emit('chat', {
            'dataIn': {
                ip: ip,
                user: mensaje.user,
                date: time,
                privAdress: mensaje.privAdress,
                adress: socket.id,
                privateMsg: privateChat,
                video: stream,
                actionTodo: "stream"
            },
            actionTodo: "stream"
        }
        )
    }
    const handleLogin = (e) => {
        e.preventDefault()
        const id = e.target.id;
        const value = e.target.value
        if (id === 'user') {
            setMsj({
                ...mensaje,
                user: value
            })
        } else {
            setMsj({ ...mensaje, [id]: value })
        }
    }

    let displayHello = () => {
        if (register) {
            socket.emit('chat', {
                'dataIn': {
                    user: myName,
                    actionTodo: "checkingUsers",
                    adress: socket.id,
                    ip: ip
                },
                actionTodo: "checkingUsers"
            }
            )
        }

    }
    setInterval(displayHello, 5000);
    const sendLatino = () => {
        const time = hora();
        settransmiting(true)
        setmyName(mensaje.user)
        socket.emit('chat', {
            'dataIn': {
                ip: ip,
                user: mensaje.user,
                chat: false,
                date: time,
                actionTodo: 'new',
                privAdress: false,
                adress: socket.id,
                privateMsg: false,
                ip: ip

            },
            actionTodo: "chat"
        });
        if (!latinoName !== true && latinoName.user === mensaje.user) {
            setregister(true)

        } else {
            setregister(true)
            setCookies('userChat', {
                user: mensaje.user,
                adress: socket.id
            }, {
                maxAge: 60 * 60 * 12,
                sameSite: 'strict',
                path: '/'
                /* httpOnly: true, */
                // secure: true
            })
        }
    }
    const sendAudio = (url) => {
        const time = hora();
        socket.emit('chat', {
            'dataIn': {
                ip: ip,
                user: mensaje.user,
                chat: 'audioItem',
                date: time,
                actionTodo: 'movie',
                privAdress: mensaje.privAdress,
                adress: socket.id,
                privateMsg: privateChat,
                video: url
            },
            actionTodo: "movie"
        });
        if (privateChat) {
            let privateArray = privArray
            privateArray.push({
                ip: ip,
                user: myName !== '' ? myName : nickM.user,
                date: time,
                chat: 'audioItem',
                adress: socket.id,
                privAdress: mensaje.privAdress,
                video: url

            })
            setprivArray(privateArray)

        } else {
            let copied = chatArray
            copied.push({
                ip: ip,
                date: time,
                user: myName !== '' ? myName : nickM.user,
                chat: 'audioItem',
                adress: socket.id,
                privateMsg: false,
                video: urlAudio
            })
            setChatArray(copied)
        }
        setmediaAsk(false)
    }
    const sendVideo = (url) => {
        console.log('urlparaserve', url);
        const time = hora();
        socket.emit('chat', {
            'dataIn': {
                ip: ip,
                user: mensaje.user,
                chat: 'videoItem',
                date: time,
                actionTodo: 'movie',
                privAdress: mensaje.privAdress,
                adress: socket.id,
                privateMsg: privateChat,
                video: url
            },
            actionTodo: "movie"
        });
        if (privateChat) {
            let privateArray = privArray
            privateArray.push({
                ip: ip,
                user: myName !== '' ? myName : nickM.user,
                date: time,
                chat: 'videoItem',
                adress: socket.id,
                privAdress: mensaje.privAdress,
                video: url

            })
            setprivArray(privateArray)

        } else {
            let copied = chatArray
            copied.push({
                ip: ip,
                date: time,
                user: myName !== '' ? myName : nickM.user,
                chat: 'videoItem',
                adress: socket.id,
                privateMsg: false,
                video: urlVideo
            })
            setChatArray(copied)
        }
        setmediaAsk(false)

    }
    const sendMessage = () => {
        const nickM = getCookie('userChat')
        const time = hora();
        settransmiting(true)
        socket.emit('chat', {
            'dataIn': {
                ip: ip,
                date: time,
                actionTodo: 'add',
                user: myName !== '' ? myName : nickM.user,
                chat: mensaje.chat,
                adress: socket.id,
                privateMsg: privateChat,
                privAdress: mensaje.privAdress
            },
            actionTodo: "chat"
        });
        if (privateChat) {
            let privateArray = privArray
            privateArray.push({
                ip: ip,
                user: myName !== '' ? myName : nickM.user,
                date: time,
                chat: mensaje.chat,
                adress: socket.id,
                privAdress: mensaje.privAdress
            })
            setprivArray(privateArray)

        } else {
            let copied = chatArray
            copied.push({
                ip: ip,
                date: time,
                user: myName !== '' ? myName : nickM.user,
                chat: mensaje.chat,
                adress: socket.id,
                privateMsg: false,
                video: false
            })
            setChatArray(copied)

        }
        setMsj({
            ...mensaje,
            chat: '',
        })
    }

    useEffect(() => {

        setUsers(theUser)
    }, [theUser])
    const reset = () => {
        socket.emit('chat', {
            'dataIn': true,
            actionTodo: "chat"
        });
    }
    useEffect(() => {
        setMsj({
            ...mensaje,
            adress: socket.id
        })
        if (!inChat) {
            /* setMsj({
                user: latinoName,
                chat: false,
                date: time2,
                actionTodo: "",
                ...mensaje
            }) */
            inChat = true
        }

        socket.on("chat", (chat) => {
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {
                case 'users':
                    theUser = array
                    setUsers(array)
                    if (array >= 2) {
                        setChating(true)
                    }
                    break;
                case 'newMessage':
                    setChatArray(array)
                    break;
                case 'streaming':
                    var base64img = array
                    console.log(array);
                    setStreamImg(array)
                    break;
                case 'newMessages':
                    let initN = array
                    initN.map((key, i) => {
                        if (key.ip === ip) {
                            setinMessage(key.inTime)
                        }
                    })
                    break;
                case 'checking':
                    socket.emit('chat', {
                        'dataIn': {
                            user: myName,
                            actionTodo: "checkingUsers",
                            adress: socket.id,
                            ip: ip
                        },
                        actionTodo: "checkingUsers"
                    });
                    break;

                case 'exist':
                    if (!register) {

                        const time3 = hora()
                        setChating(true)
                        setmyName(array.user.user)
                        setinMessage(array.user.inTime)
                        setMsj({
                            user: array.user.user,
                            chat: '',
                            date: time3,
                            actionTodo: "",
                            privAdress: false,
                            adress: socket.id
                        })
                        setregister(true)
                        setChatArray(array.array)
                        socket.emit('chat', {
                            'dataIn': {
                                user: array.user.user,
                                actionTodo: "retomed",
                                adress: socket.id,
                                position: array.position
                            },
                            actionTodo: "chat"
                        });
                    }

                    break;
              

                case 'privteMsg':

                    if (chat.dataIn.mensaje.privAdress === socket.id) {
                        if (activePrva !== chat.dataIn.mensaje.adress) {
                            if (chat.dataIn.mensaje.user !== '') {
                                seturName({
                                    user: chat.dataIn.mensaje.user,
                                    adress: chat.dataIn.mensaje.adress
                                })
                                setwarningPre(true)

                            }
                        } else {
                            setprivArray(privArrayAux);
                            setTimeout(confirm, 1000);
                        }
                        let privateArray = privArray
                        privateArray.push(chat.dataIn.mensaje)
                        privArrayAux = privateArray
                    }
                    break;
                case 'privteMsgstreaming':
                    console.log('privteMsgstreaming', chat.dataIn.mensaje.privAdress, socket.id);
                    if (chat.dataIn.mensaje.privAdress === socket.id) {
                        if (activePrva !== chat.dataIn.mensaje.adress) {
                            if (chat.dataIn.mensaje.user !== '') {
                                seturName({
                                    user: chat.dataIn.mensaje.user,
                                    adress: chat.dataIn.mensaje.adress
                                })
                                setwarningPreStream(true)
                            }
                        } else {
                            setStreamImg(chat.dataIn.mensaje.video)
                        }

                    }
                    break;
                case 'inMessage':
                    setinMessage(chat.dataIn)
                    break;
                case 'nicksAct':
                    setnicksArray(chat.dataIn)
                    break;
                default:
                    break;
            }
        })
        if (!register) {

            socket.emit(
                'chat', {
                'dataIn': {
                    ip: ip,
                    'actionTodo': 'ipSend',
                }
            })
        }
    }, [])
    useEffect(() => {
        socket.emit(
            'chat', {
            'dataIn': {
                ip: ip,
                'actionTodo': 'ipSend',
            }
        })
    }, [mensaje.user])

    useEffect(() => {
        let active = false
        let repass = nicksArray.map((key, i) => {
            if (user.user === key.user) {
                active = true
            }
            return true
        })
        if (!active && repass && privateChat) {
            setOfline(true)
        }
        if (active && repass && privateChat) {
            setOfline(false)
        }
        if (!privateChat) {
            setOfline(false)
        }
        if (Users < 2) {
            setChating(false)
        }
        /*  socket.emit(
             'chat', {
             'dataIn': {
                 ip: ip,
                 'actionTodo': 'ipSend',
             }
         }) */
    }, [mensaje.chat, privateChat, nicksArray])
    useEffect(() => {
        let ActUIs = false
        nicksArray.map((key, i) => {
            if (key.user === mensaje.user) {
                ActUIs = true
            }
        })
        if (ActUIs) {
            setisActive(true)
        } else {
            setisActive(false)
        }

    }, [nicksArray])
    const confirm = () => {
        setwarningPre(false)
        setPrivateChat(true)
    }
    const acceptPrv = (stream) => {
        activePrva = urName.adress
        setuser(urName)
        setOfline(false)

        setMsj({
            ...mensaje,
            privAdress: urName.adress
        })
        if (!stream) {
            setprivArray(privArrayAux);
        }
        setTimeout(confirm, 1000);
    }

    return (
        <div className='main bgcolor-transparent '>
            <Head>
                <title>CHAT AZTECA</title>
                <meta name="description" content="FullStack app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className='boxx bgctr'>

                <div className={warningPre ? 'warning_pop' : 'hide'}>
                    <div className={warningPre ? 'warning_popout' : 'hide'}>
                        <p className='warning_tittle'>Mensaje Privado</p>
                        <div className='warning_msg'>
                            Recibes Privado de <span>{urName.user}                 </span>.
                        </div>
                        DESEAS VERLO YA?
                        <div className='accept_pop'>
                            <div className='accept_red' onClick={(e) => { e.preventDefault(); setwarningPre(false) }}>
                                <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' className='svg-inline--fa fa-times fa-w-11 fa-9x'><path fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z' className='' /></svg> <span>despues</span>
                            </div>
                            <div className='accept_green' onClick={(e) => {
                                e.preventDefault(); acceptPrv();
                            }}>
                                <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='check' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='svg-inline--fa fa-check fa-w-16 fa-9x'><path fill='currentColor' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z' className='' /></svg><span>Ver</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={warningPreStream ? 'warning_pop' : 'hide'}>
                    <div className={warningPreStream ? 'warning_popout' : 'hide'}>
                        <p className='warning_tittle'>Stream Entrante</p>
                        <div className='warning_msg'>
                            <>Recibes Stream de<span>{urName.user} </span></>
                        </div>
                        DESEAS VERLO YA?
                        <img className={aceptStream ? 'chat-stream' : 'hide'} src={streamImg} alt="" />

                        <div className='accept_pop'>
                            <div className='accept_red' onClick={(e) => { e.preventDefault(); setwarningPreStream(false); setAceptStream(false) }}>
                                <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' className='svg-inline--fa fa-times fa-w-11 fa-9x'><path fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z' className='' /></svg> <span>despues</span>
                            </div>
                            <div className='accept_green' onClick={(e) => {
                                e.preventDefault(); setAceptStream(true); acceptPrv(true);
                            }}>
                                <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='check' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='svg-inline--fa fa-check fa-w-16 fa-9x'><path fill='currentColor' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z' className='' /></svg><span>Ver</span>
                            </div>
                        </div>
                    </div>
                </div>
                {!register ?
                    <div className='bgcolor-transparent flex-center h100vh reduced'>
                        <h1>CHAT AZTECA</h1>
                        <p>Ingresa tu nombre</p>
                        <input
                            id='user'
                            value={mensaje.user}
                            onChange={handleLogin}
                            placeholder={!latinoName !== true && latinoName.user ? latinoName.user : ""}
                        />
                        <button className={mensaje.user.length > 2 ? 'btn-azteca pointer' : 'hide'} onClick={(e) => { e.preventDefault(); sendLatino() }}
                        >ENVIAR NICK</button>
                        <button className={mensaje.user === 'elmomanda' ? 'btn-azteca pointer' : 'hide'} onClick={(e) => { e.preventDefault(); reset() }}
                        >reset</button>
                    </div>
                    :
                    isActive ?
                        <div className='bgcolor-transparent flex-row '>
                            <div className='bgcolor-transparent h100vh reduced chat-col-7'>
                                <h1 className='amarillo'>{myName} ONLINE</h1>

                                <p>usuarios conectados {Users}</p>
                                {
                                    chating ? <div>
                                        {ofline ? <p>USUARIO DESCONECTADO</p> :
                                            <>


                                                <textarea id='chat'
                                                    className={inMedia === 0 ? 'chat-text' : 'hide'}
                                                    value={mensaje.chat ? mensaje.chat : ''}
                                                    onChange={handleLogin} cols={50} rows={'2'} />
                                            </>}
                                        <div id='opc-container' className="flex-row ngap-30 align-center justify-center">
                                            <button
                                                className={inMedia !== 0 ? 'hide' : mensaje.chat ? 'btn-azteca bgcolorInedit-green pointer' : 'btn-azteca'}
                                                onClick={mensaje.chat ? (e) => {
                                                    e.preventDefault(); sendMessage();
                                                } : console.log}

                                            >ENVIAR</button>
                                            {mediaAsk ? <>

                                                {mediaAsk ? mediaAskSelect === 1 ? <>
                                                    <Streaming setmediaAskSelect={setmediaAskSelect} imageSrc={streamImg} getStreming={getStreming} userName={mensaje.user} setmediaAsk={setmediaAsk} inMedia={inMedia} setinMedia={setinMedia} urlVideo={urlVideo} recorded={recorded} setRecorded={setRecorded} seturlVideo={seturlVideo} sendVideo={sendVideo} /></> :
                                                    mediaAskSelect === 2 ?
                                                        <VideoRecorder getStreming={getStreming} userName={mensaje.user} setmediaAsk={setmediaAsk} inMedia={inMedia} setinMedia={setinMedia} urlVideo={urlVideo} recorded={recorded} setRecorded={setRecorded} seturlVideo={seturlVideo} sendVideo={sendVideo} /> : <><button
                                                            className={mediaAskSelect !== 0 ? 'hide' : 'btn-azteca pointer'}
                                                            onClick={(e) => {
                                                                e.preventDefault(); setmediaAskSelect(2);
                                                            }}

                                                        >VIDEO</button>
                                                            <button
                                                                className={mediaAskSelect !== 0 ? 'hide' : 'btn-azteca pointer'}
                                                                onClick={(e) => {
                                                                    e.preventDefault(); setmediaAskSelect(1);
                                                                }}

                                                            >STREAM</button>
                                                            <button
                                                                className={inMedia !== 0 ? 'hide' : !mediaAsk ? 'btn-azteca pointer' : 'hide'}
                                                                onClick={(e) => {
                                                                    e.preventDefault(); setmediaAsk(false);
                                                                }}

                                                            >Volver</button>
                                                        </>
                                                    : <>

                                                    </>
                                                }

                                            </> : <><button
                                                className={inMedia !== 0 ? 'hide' : !mediaAsk ? 'btn-azteca pointer' : 'hide'}
                                                onClick={(e) => {
                                                    e.preventDefault(); setmediaAsk(true);
                                                }}

                                            >Stream o Video</button>

                                                <VoiceRecorder userName={mensaje.user} setmediaAsk={setmediaAsk} inMedia={inMedia} setinMedia={setinMedia} urlAudio={urlAudio} recordingVoice={recordingVoice} setrecordingVoice={setrecordingVoice} seturlAudio={seturlAudio} sendVideo={sendAudio} />

                                            </>
                                            }

                                        </div>
                                    </div> : <h1>Nadie Conectado</h1>
                                }
                                {
                                    privateChat ? <div className='bgcolor-transparent'>
                                        <h1 onClick={(e) => {
                                            e.preventDefault(); setPrivateChat(!privateChat);

                                        }}>PRIVADO con {user.user}</h1>
                                        <div className='bgcolor-transparent  h70vh n-column'>
                                            {privArray.slice(0).reverse().map((key, i) => {
                                                if ((key.privAdress === socket.id && key.user === user.user) || (myName === key.user && key.privAdress === user.adress)) {
                                                    return <li className='chat-mensaje ' key={`chat-${i}`} id={`chat-${i}`}>
                                                        {key.chat === 'videoItem' || key.chat === 'audioItem' ?
                                                            key.chat === 'audioItem' ?
                                                                <>
                                                                    <span onClick={key.user !== myName || 1 === 1 ? (e) => {
                                                                        e.preventDefault(); setPrivateChat(!privateChat), setMsj({ ...mensaje, privAdress: key.adress }),
                                                                            setOfline(false),
                                                                            setuser({
                                                                                user: key.user,
                                                                                adress: key.adress
                                                                            })
                                                                    } : console.log} className='chat-user'>{key.user}:</span>
                                                                    <audio
                                                                        className='chat-Audio'
                                                                        controls src={key.video} />
                                                                    <span className='chat-date'>{key.date}
                                                                    </span>
                                                                </>
                                                                :
                                                                <>
                                                                    <span onClick={key.user !== myName || 1 === 1 ? (e) => {
                                                                        e.preventDefault(); setPrivateChat(!privateChat), setMsj({ ...mensaje, privAdress: key.adress }),
                                                                            setOfline(false),
                                                                            setuser({
                                                                                user: key.user,
                                                                                adress: key.adress
                                                                            })
                                                                    } : console.log} className='chat-user'>{key.user}</span>
                                                                    <video className='chat-video' controls src={key.video} />
                                                                    <span className='chat-date'>{key.date}
                                                                    </span>
                                                                </>
                                                            :

                                                            <>
                                                                <span onClick={key.user !== myName || 1 === 1 ? (e) => {
                                                                    e.preventDefault(); setPrivateChat(!privateChat), setMsj({ ...mensaje, privAdress: key.adress }),
                                                                        setOfline(false),
                                                                        setuser({
                                                                            user: key.user,
                                                                            adress: key.adress
                                                                        })
                                                                } : console.log} className='chat-user'>{key.user}:</span> <span className='chat-chat'>{key.chat ? key.chat : ` Ingreso al Chat de ${key.user}`}</span> <span className='chat-date'>{key.date}
                                                                </span>
                                                            </>
                                                        }
                                                    </li>
                                                }
                                            })}
                                        </div>

                                    </div> :
                                        <div className='bgcolor-transparent  h70vh n-column'>
                                            {chatArray.slice(0).reverse().map((key, i) => {
                                                if (i < chatArray.length - inMessage) {
                                                    return <li className='chat-mensaje ' key={`chat-${i}`} id={`chat-${i}`}>
                                                        {key.chat === 'videoItem' || key.chat === 'audioItem' ?
                                                            key.chat === 'audioItem' ?
                                                                <>
                                                                    <span onClick={key.user !== myName || 1 === 1 ? (e) => {
                                                                        e.preventDefault(); setPrivateChat(!privateChat), setMsj({ ...mensaje, privAdress: key.adress }),
                                                                            setOfline(false),
                                                                            setuser({
                                                                                user: key.user,
                                                                                adress: key.adress
                                                                            })
                                                                    } : console.log} className='chat-user'>{key.user}:</span>
                                                                    <audio
                                                                        className='chat-Audio'
                                                                        controls src={key.video} />
                                                                    <span className='chat-date'>{key.date}
                                                                    </span>
                                                                </>
                                                                :
                                                                <>
                                                                    <span onClick={key.user !== myName || 1 === 1 ? (e) => {
                                                                        e.preventDefault(); setPrivateChat(!privateChat), setMsj({ ...mensaje, privAdress: key.adress }),
                                                                            setOfline(false),
                                                                            setuser({
                                                                                user: key.user,
                                                                                adress: key.adress
                                                                            })
                                                                    } : console.log} className='chat-user'>{key.user}:</span>
                                                                    <video className='chat-video' controls src={key.video} />
                                                                    <span className='chat-date'>{key.date}
                                                                    </span>
                                                                </>
                                                            :

                                                            <>
                                                                <span onClick={key.user !== myName || 1 === 1 ? (e) => {
                                                                    e.preventDefault(); setPrivateChat(!privateChat), setMsj({ ...mensaje, privAdress: key.adress }),
                                                                        setOfline(false),
                                                                        setuser({
                                                                            user: key.user,
                                                                            adress: key.adress
                                                                        })
                                                                } : console.log} className='chat-user'>{key.user}:</span> <span className='chat-chat'>{key.chat ? key.chat : ` Ingreso al Chat de ${key.user}`}</span> <span className='chat-date'>{key.date}
                                                                </span>
                                                            </>
                                                        }
                                                    </li>
                                                }
                                            })}
                                        </div>

                                }


                            </div>
                            <div className='bgcolor-transparent h100vh reduced chat-col-3'>
                                USUARIOS ON
                                <li className={'chat-users '} key={`user-${myName}`} id={`user-${myName}`} onClick={(e) => {
                                    e.preventDefault(); /*   setOfline(false),setPrivateChat(true), setMsj({ ...mensaje, privAdress: key.adress }), setuser({
                                    user: key.user,
                                    adress: key.adress
                                })  */
                                }} >{myName}</li>
                                {nicksArray.map((key, i) => {
                                    return <li className={key.user === myName ? 'hide' : 'chat-users '} key={`user-${i}`} id={`user-${i}`} onClick={(e) => {
                                        e.preventDefault(); setOfline(false), setPrivateChat(true), setMsj({ ...mensaje, privAdress: key.adress }), setuser({
                                            user: key.user,
                                            adress: key.adress
                                        })
                                    }} >{key.user}</li>
                                })}

                            </div>
                        </div> : <Loading />
                }

            </body >
        </div >
    )
}
export async function getServerSideProps({ req }) {
    const forwarded = req.headers["x-forwarded-for"]
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    let min = 1111111110
    let max = 9000000000
    return {
        props: {
            ip: /*Math.floor(Math.random() * (max - min)) + min */ ip
            ,
        },
    }
}