import React from 'react';
import { useState, useEffect } from 'react';
import FloorApp from '../../components/containers/floorApp';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")
export default function Calamar() {
    const [userIn, setUserIn] = useState(0)
    const [floorMap, seTfloorMap] = useState([])
    const [changing, seTchanging] = useState(false)
    const changeArray = (key) => {
        console.log(key);
        setUserIn(userIn + 1)
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
        socket.emit(
            'calamar', {
            'dataIn': {
                puente: copiedarray,
                'actionTodo': 'passing',
            },
            'actionTodo': 'passing',
        })
        if (key.action === 'fall') {
            window.location.replace(`vww://aztecasecreto.vww/@78678#break${key.leter}${key.number}`)
        } else {
            window.location.replace(`vww://aztecasecreto.vww/@78678#piso${key.leter}${key.number}`)
        }
    }
    useEffect(() => {
        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {
                case 'puente':
                    seTfloorMap(array)
                    break;
                case 'createdOne':
                    console.log('acahay puente', array);
                    seTfloorMap(array)
                    break;
                case 'newPass':
                    seTfloorMap(array)
                    break;
                case 'noPuente':
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