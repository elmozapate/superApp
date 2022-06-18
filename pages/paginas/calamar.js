import React from 'react';
import { useState, useEffect } from 'react';
import FloorApp from '../../components/containers/floorApp';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")
export default function Calamar(props) {
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
                    ip: props.ip || false,

                    'actionTodo': 'passing',
                },
                'actionTodo': 'passing',
            })
            socket.emit(
                'calamar', {
                'dataIn': {
                    ip: props.ip || false,
                    'actionTodo': 'passingFall',
                },
                'actionTodo': 'passingFall',
            })
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
            changing ? <></> : <FloorApp userIn={userIn} floorMap={floorMap} changeArray={changeArray} />

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