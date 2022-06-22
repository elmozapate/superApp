import React from 'react';
import { useState, useEffect } from 'react';
import FloorApp from '../../components/containers/floorApp';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")
 const Calamar=(props)=> {
    const [turn, setturn] = useState(-1)

    const [ip, setIp] = useState(props.ip || false)
    const [nowPlaying, setnowPlaying] = useState(false)
    const [userIn, setUserIn] = useState(1)
    const [userKey, setuserKey] = useState({
        leter: 'a',
        number: 0,
    })
    const [floorMap, seTfloorMap] = useState([])
    const [changing, seTchanging] = useState(false)
    const changelocationfalse = (key) => {
        setuserKey(key)
        setTimeout(changelocation, 2000)
    }
    const changelocation = (key) => {
        window.location.replace(`vww://aztecasecreto.vww/@78688#break${userKey.leter}${userKey.number}`)
    }
    const changelocationtrue = (key) => {
        setuserKey(key)
        setTimeout(changelocation2, 2000)
    }
    const changelocation2 = (key) => {
        window.location.replace(`vww://aztecasecreto.vww/@78688#piso${userKey.leter}${userKey.number}`)
    }
    const changeArray = (key) => {
        console.log(key);
        let copiedarray = []/* 
        seTchanging(true) */
        floorMap.map((item, i) => {
            if (item === key) {
                copiedarray.push({
                    state: item.action === 'fall' ? true : false,
                    number: item.number,
                    leter: item.leter,

                })

            } else {
                copiedarray.push(item)
            }
        })
        seTfloorMap(copiedarray)

        if (key.action === 'fall') {
            socket.emit(
                'calamar', {
                'dataIn': {
                    puente: copiedarray,
                    levelIn: userIn,
                    ip: ip || false,

                    'actionTodo': 'passing',
                },
                'actionTodo': 'passing',
            })
            socket.emit(
                'calamar', {
                'dataIn': {
                    ip: ip || false,
                    'actionTodo': 'falling',
                },
                'actionTodo': 'falling',
            })
            setnowPlaying(false)
            changelocationfalse(key)
        } else {
            console.log(userIn,'usein');
            if (userIn === 10) {
                socket.emit(
                    'calamar', {
                    'dataIn': {
                        puente: copiedarray,
                        levelIn: 11,
                        'actionTodo': 'passingFinal',
                    },
                    'actionTodo': 'passingFinal',
                })
                socket.emit(
                    'calamar', {
                    'dataIn': {
                        puente: copiedarray,
                        levelIn: 11,
                        'actionTodo': 'passing',
                    },
                    'actionTodo': 'passing',
                })
            }else{
                 socket.emit(
                'calamar', {
                'dataIn': {
                    puente: copiedarray,
                    levelIn: userIn + 1,
                    'actionTodo': 'passing',
                },
                'actionTodo': 'passing',
            })
            }
            changelocationtrue(key)
        }
    }
    useEffect(() => {
        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            const dataIn = chat.dataIn || ""

            switch (actionTodo) {
                case 'puente':
                    console.log('acahay pulevelInente', dataIn.levelIn);

                    seTfloorMap(dataIn.array)
                    setUserIn(dataIn.levelIn)
                    break;
                case 'createdOne':
                    console.log('acahay pulevelInente', chat);
                    if (chat.dataIn.participants[0].ip === ip
                    ) {
                        setnowPlaying(true)
                    }
                    seTfloorMap(dataIn.array)
                    setUserIn(dataIn.levelIn)
                    break;
                case 'newPass':
                    console.log('acahay pulevelInente', dataIn.levelIn);

                    seTfloorMap(dataIn.array)
                    setUserIn(dataIn.levelIn)
                    break;
                case 'noPuente':
                    setUserIn(0)
                    seTfloorMap([])
                    break;
                case 'vastu':
                    console.log('tetoca', chat, ip);
                    if (ip === chat.dataIn) {
                        setnowPlaying(true)
                    }else{
                        setnowPlaying(false)
                    }
                    break;
                case 'fallingin':
                  /*   console.log('tetoca', chat, ip);
                    if (turn === chat.dataIn) {
                        window.alert('vas')
                        setnowPlaying(true)

                    } */
                    /* console.log('tetoca',chat ,ip);

                    chat.dataIn.participants.map((key, i) => {
                        if (chat.dataIn.ip === key.ip) {
                            if ((i + 1) === chat.dataIn.participants.length) {
                                if (chat.dataIn.participants[0].ip === ip) {
                                    console.log('tetoca');
                                }
                                console.log(chat.dataIn.participants[0].ip, 'proximaIp', ip);
                            } else {
                                if (chat.dataIn.participants[i + 1].ip === ip) {
                                    console.log('tetoca');
                                    setnowPlaying(true)
                                }
                            }
                        }
                    }) */
                    break;
                case 'playerListReady':
                    console.log('llegolalista', chat);
                    chat.dataIn.map((key, i) => {
                        if (key.ip === ip) {
                            console.log(key.ip, 'tetoca', ip, i);
                            setturn(i)
                        }
                    })
/*                         setparticipants(array)
 */                        break;
                default:
                    break;
            }
        })
        socket.emit(
            'calamar', {
            'dataIn': {
/*                 ip: ip,
 */                'actionTodo': 'ipSend',
            },
            'actionTodo': 'ipSend',
        })
    }, [])
    /*   useEffect(() => {
      
  
      }, []) */
    return (<body className='calamar-puente'>
        <button id='btn-play' onClick={(e) => {
            e.preventDefault(),
                socket.emit(
                    'calamar', {
                    'dataIn': {
                        ip: ip || false,
                        'actionTodo': 'falling',
                    },
                    'actionTodo': 'falling',
                })
        }}>
            PLAY_PAUSE
        </button>        {
            changing ? <></> : <FloorApp nowPlaying={nowPlaying} userIn={userIn} floorMap={floorMap} changeArray={changeArray} />

        }
    </body>)
}
export async function getServerSideProps({ req }) {
    const forwarded = req.headers["x-forwarded-for"]
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    let min = 1111111110
    let max = 9000000000
    return {
        props: {
            ip: ip
            ,
        },
    }
}
export default Calamar