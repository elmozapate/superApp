import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")
let news = true
let pass = [
    'b', 'b', 'a', 'a', 'a', 'b', 'a', 'b', 'a', 'a'
]
export default function CrearPuente() {
    const [floorMap, seTfloorMap] = useState([])
    const [changing, seTchanging] = useState(false)
    const crearRandom = () => {
        let min = 0
        let max = 20
        let randomNumber = Math.floor(Math.random() * (max - min)) + min
        for (let index = 0; index < pass.length; index++) {
            const element = pass[index];
            if (((randomNumber / 2) * 2) === randomNumber) {
                pass[index] = 'a'
            } else {
                pass[index] = 'b'
            }
        }
        createPuente()
    }
    const [participants, setparticipants] = useState([])

    let fila = true
    let numberof = 0
    let floorArray = []
    const crearUserRandom = () => {
        socket.emit(
            'calamar', {
            'dataIn': {
                'actionTodo': 'crearUserRandom',
            },
            'actionTodo': 'crearUserRandom',
        })
    }
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
        setparticipants([])

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
                case 'playerList':
                    console.log('lellega');
                    setparticipants(array)
                    break;
                case 'createdOne':
                    seTchanging(true)
                    break;
                    case 'noPuente':
                        seTchanging(false)
                        break;
                default:
                    break;
            }
        })
    }, [])
      useEffect(() => {
      
     socket.emit(
            'calamar', {
            'dataIn': {
                'actionTodo': 'ipSend',
            },
            'actionTodo': 'ipSend',

        })
      }, [])
    return (< >
        {
            changing ? <><p className='btn-azteca '>Creado</p>
                <button className={'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); deletePuente() }} >
                    BORRAR PUENTE </button>
            </> : <>
            <button className={'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); crearRandom() }} >
                    CREAR PUENTE </button>
                <button className={'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); crearUserRandom() }} >
                   Alistar Juego </button>
                {
                    participants.map((key, i) => {
                        return <li key={`participante-${i}`}>{key.user} </li>
                    })

                }</>
        }
    </>)
}