import React from 'react';
import { useState, useEffect } from 'react';
import FloorApp from '../../components/containers/floorApp';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")
export default function Calamar(props) {
    const [ip, setIp] = useState(props.ip || false)
    const [nowPlaying, setnowPlaying] = useState(false)
    const [userIn, setUserIn] = useState(1)
    const [floorMap, seTfloorMap] = useState([])
    const [changing, seTchanging] = useState(false)
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
            window.location.replace(`vww://aztecasecreto.vww/@78688#break${key.leter}${key.number}`)
        } else {
            if (userIn >= 9) {
                socket.emit(
                    'calamar', {
                    'dataIn': {
                        puente: copiedarray,
                        levelIn: userIn + 1,
                        'actionTodo': 'passingFinal',
                    },
                    'actionTodo': 'passing',
                })
            }
            socket.emit(
                'calamar', {
                'dataIn': {
                    puente: copiedarray,
                    levelIn: userIn + 1,
                    'actionTodo': 'passing',
                },
                'actionTodo': 'passing',
            })
            window.location.replace(`vww://aztecasecreto.vww/@78688#piso${key.leter}${key.number}`)
        }
    }
    useEffect(() => {
        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            const array = chat.dataIn.array
            const levelIn = chat.dataIn.levelIn
            switch (actionTodo) {
                case 'puente':
                    console.log('acahay pulevelInente', levelIn);

                    seTfloorMap(array)
                    setUserIn(levelIn)
                    break;
                case 'createdOne':
                    console.log('acahay pulevelInente', levelIn);
                    seTfloorMap(array)
                    setUserIn(levelIn)
                    break;
                case 'newPass':
                    console.log('acahay pulevelInente', levelIn);

                    seTfloorMap(array)
                    setUserIn(levelIn)
                    break;
                case 'noPuente':
                    setUserIn(0)
                    seTfloorMap([])
                    break;
                case 'fallingin':
                    chat.dataIn.participants.map((key, i) => {
                        if (chat.dataIn.ip === key.ip) {
                            if ((i + 1) === chat.dataIn.participants.length) {
                                if (chat.dataIn.participants[0].ip === ip) {
                                    console.log('tetoca');
                                    setnowPlaying(true)
                                }
                                console.log(chat.dataIn.participants[0].ip, 'proximaIp', ip);
                            } else {
                                if (chat.dataIn.participants[i + 1].ip === ip) {
                                    console.log('tetoca');
                                    setnowPlaying(true)
                                }
                            }
                        }
                    })
                    break;
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
        {
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