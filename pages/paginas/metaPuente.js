import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")

export default function MetaPuente() {
    const [changing, seTchanging] = useState(false)
    const [winning, seTwinning] = useState(false)

    const llegarPuente = () => {
        socket.emit(
            'calamar', {
            'dataIn': {
                'actionTodo': 'endPuente',
            },
            'actionTodo': 'endPuente',
        })
        seTchanging(true)
    }

    useEffect(() => {
        socket.on("calamar", (chat) => {
            console.log(chat);
            const actionTodo = chat.actionTodo || ''
            switch (actionTodo) {
                case 'createdOne':
                    const dataIn = chat.dataIn
                    const levelIn = dataIn.levelIn || 0
                    console.log('acahay pulevelInente', levelIn);
                    if (levelIn === 11) {
                        seTchanging(true)
                    }
                    break;
                case 'llegoPlayer':
                    seTwinning(true)
                    break;
                case 'passingFinalReady':
                    console.log('gano');
                    seTwinning(true)
                    break;
                case 'passingFinalReadyRes':
                    console.log('conecto');
                    seTchanging(true)
                    break;
                    case 'noPuente':
                        seTwinning(false)
                        seTchanging(false)
                        break;
                default:
                    break;
            }
        })
        socket.emit(
            'calamar', {
            'dataIn': {
                'actionTodo': 'metaPlace',
            },
            'actionTodo': 'metaPlace',
        })
     
    }, [])

    return (< >
        {
            winning ? <><p className='btn-azteca '>FELICIDADES</p>

            </> : changing ? <button className={'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); llegarPuente() }} >
                Parar Reloj </button> : <></>
        }
    </>)
}