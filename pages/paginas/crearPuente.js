import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")
let news = true
let pass = [
    'a', 'a', 'b', 'a', 'a', 'b', 'b', 'b', 'a', 'b'
]
export default function CrearPuente() {
    const [floorMap, seTfloorMap] = useState([])
    const [changing, seTchanging] = useState(false)

    let fila = true
    let numberof = 0
    let floorArray = []
    const createPuente = () => {
        socket.emit(
            'calamar', {
            'dataIn': {
                puente: floorMap,
                'actionTodo': 'createPuente',
            },
            'actionTodo': 'createPuente',
        })
        seTchanging(true)

    }
    const deletePuente = () => {
        socket.emit(
            'calamar', {
            'dataIn': {
                'actionTodo': 'resetPuente',
            },
            'actionTodo': 'resetPuente',
        })
        seTchanging(false)

    }
    useEffect(() => {
        if (news) {
            for (let index = 0; index < 20; index++) {
                numberof++
                if (index === 10) { fila = false; numberof = 1 }
                let letterIn = fila ? 'b' : 'a'
                const element = {
                    action: pass[numberof - 1] === letterIn ? 'pass' : 'fall',
                    state: false,
                    number: numberof,
                    leter: letterIn

                }
                floorArray.push(element)
            }
            seTfloorMap(floorArray)
            console.log(floorArray);
            news = false
        }
        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {

                case 'createdOne':
                    seTchanging(true)
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
    return (< >
        {
            changing ? <><p className='btn-azteca '>Creado</p>
             <button className={'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); deletePuente() }} >
                BORRAR PUENTE </button>
        </> : <button className={'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); createPuente() }} >
                CREAR PUENTE </button>
        }
    </>)
}