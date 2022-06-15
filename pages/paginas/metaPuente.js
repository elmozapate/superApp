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
            const actionTodo = chat.actionTodo
            switch (actionTodo) {
                case 'llegoPlayer':
                    seTwinning(true)
                    break;
                case 'passingFinalReady':
                    seTchanging(true)
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