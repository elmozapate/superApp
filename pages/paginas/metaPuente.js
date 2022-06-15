import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")

export default function MetaPuente() {
    const [changing, seTchanging] = useState(false)
    const llegarPuente = () => {
        socket.emit(
            'calamar', {
            'dataIn': {
                'actionTodo': 'endPuente',
            },
            'actionTodo': 'endPuente',
        })
        seTchanging(true)
        window.location.replace(`vww://aztecasecreto.vww/@78688#llegada`)
    }

    useEffect(() => {
            socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            switch (actionTodo) {
                case 'llegoPlayer':
                    seTchanging(true)
                    break;

                default:
                    break;
            }
        })
    }, [])

    return (< >
        {
            changing ? <><p className='btn-azteca '>FELICIDADES</p>
             
        </> : <button className={'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); llegarPuente() }} >
                Llegar </button>
        }
    </>)
}