import React from 'react';
import { useState, useEffect } from 'react';
import FloorApp from '../../components/containers/floorApp';
import io from "socket.io-client"
import Bowser from "bowser";

const socket = io("http://localhost:3002/")
const Calamar = (props) => {
    const [notAuth, setnotAuth] = useState(false)
    const [turn, setturn] = useState(-1)
    const [ip, setIp] = useState(props.ip || false)
    const [nowPlaying, setnowPlaying] = useState(false)
    const [userIn, setUserIn] = useState(0)
    const [userKey, setuserKeyind] = useState({
        leter: 'a',
        number: 0,
    })
    const [floorMap, seTfloorMap] = useState([])
    const [changing, seTchanging] = useState(false)
    const changelocationfalse = (key) => {
        setTimeout(() => { changelocation(key) }, 2000)
    }
    const setuserKey = (key) => {
        setuserKeyind(key)
        changeArray(key)
        console.log(key, 'iii');
    }
    const changelocation = (key) => {
        if (Bowser.name === 'Chrome') {
            window.location.replace(`vww://aztecasecreto.vww/@78688#break${key.leter}${key.number}`)
        } else {
            window.alert(`vww://aztecasecreto.vww/@78688#break${key.leter}${key.number}`)
        }
    }
    const changelocationtrue = (key) => {
        setTimeout(() => { changelocation2(key) }, 2000)
    }
    const changelocation2 = (key) => {
        if (Bowser.name === 'Chrome') {
            window.location.replace(`vww://aztecasecreto.vww/@78688#piso${key.leter}${key.number}`)
        } else {
            window.alert(`vww://aztecasecreto.vww/@78688#piso${key.leter}${key.number}`)
        }
    }
    const goJail = () => {
        window.location.replace(`vww://aztecasecreto.vww/@78688#jail`)
    }
    const changeArray = (key) => {
        let copiedarray = []
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
            if (Bowser.name === 'Chrome') {
                changelocationfalse(key)
            }
        } else {
            if (userIn === 10) {
                socket.emit(
                    'calamar', {
                    'dataIn': {
                        ip: ip,
                        puente: copiedarray,
                        levelIn: userIn + 1,
                        'actionTodo': 'passingFinal',
                    },
                    'actionTodo': 'passingFinal',
                })
                socket.emit(
                    'calamar', {
                    'dataIn': {
                        puente: copiedarray,
                        levelIn: userIn + 1,
                        'actionTodo': 'passing',
                    },
                    'actionTodo': 'passing',
                })
            } else {
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
            if (Bowser.name === 'Chrome') {
                changelocationtrue(key)
            }
        }
    }
    useEffect(() => {
        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            const dataIn = chat.dataIn || ""
            switch (actionTodo) {
                case 'puente':
                    seTfloorMap(dataIn.array)
                    setUserIn(dataIn.levelIn)
                    break;
                case 'createdOne':
                    if (chat.dataIn.participants[0].ip === ip
                    ) {
                        setnowPlaying(true)
                    }
                    seTfloorMap(dataIn.array)
                    setUserIn(dataIn.levelIn)
                    break;
                case 'newPass':
                    seTfloorMap(dataIn.array)
                    setUserIn(dataIn.levelIn)
                    break;
                case 'noPuente':
                    setUserIn(0)
                    seTfloorMap([])
                    break;
                case 'vastu':
                    if (ip === chat.dataIn) {
                        setnowPlaying(true)
                    } else {
                        setnowPlaying(false)
                    }
                    break;
                case 'estasEnJail':
                    console.log('jail',chat);
                    if (chat.dataIn.ip === ip) {
                        setTimeout(goJail, 5000)
                    }
                    break;
                case 'fallingin':
                    break;
                case 'playerListReady':

                    chat.dataIn.map((key, i) => {
                        if (key.ip === ip) {

                            setturn(i)
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
                user: '',
                'actionTodo': 'ipSend',
            },
            'actionTodo': 'ipSend',
        })
    }, [])

    if (notAuth) {
        return (<>
            <div className='not-auth-div'>
                <img className='not-auth' src='https://previews.123rf.com/images/carmenbobo/carmenbobo1507/carmenbobo150700007/41824544-sello-de-goma-con-el-texto-no-autorizado-en-el-interior-ilustraci%C3%B3n-vectorial.jpg' />
            </div >
        </>)
    }
    return (<div className='calamar-puente'>
       {
            changing ? <></> : <FloorApp nowPlaying={nowPlaying} userIn={userIn} floorMap={floorMap} setuserKey={setuserKey} changeArray={changeArray} />

        }
    </div>)
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