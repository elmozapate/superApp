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
    const [randomized, setRandomized] = useState(false)
    const [inProgress, setinProgress] = useState(false)
    const [inProgressDone, setinProgressDone] = useState(false)
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
                time: (mensaje.time * 60),
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
    const [mensaje, setMsj] = useState({
        time: 5,
    })
    const handleLogin = (e) => {
        e.preventDefault()
        const value = e.target.value
        setMsj({
            ...mensaje,
            time: value
        })

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
            news = false
        }
        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {
                case 'playerList':
                    setparticipants(array)
                    break;
                case 'createdOne':
                    seTchanging(true)
                    setinProgress(true)

                    break;
                case 'playerListReady':
                    if (array.length > 0) {
                        setRandomized(true)
                    }

                    break;

                case 'theWinner':
                    setinProgressDone(true)

                    break;
                case 'noPuente':
                    setRandomized(false)
                    setinProgressDone(false)
                    setinProgress(false)
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
                user: '',
                'actionTodo': 'ipSend',
            },
            'actionTodo': 'ipSend',

        })
    }, [])
    return (< >
        {
            changing ? <><p className='btn-azteca bgcolorInedit-green'>{inProgressDone ? 'Finalizado' : inProgress ? 'En curso' : 'Creado'}</p>
                <button className={'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); deletePuente() }} >
                    BORRAR PUENTE </button>
            </> : <>
                {randomized ?
                    <button className={'btn-azteca pointer bgcolorInedit-green'} onClick={(e) => { e.preventDefault(); crearRandom() }} >
                        CREAR PUENTE </button> :

                    <button className={participants.length === 0 ? 'btn-azteca pointer' : 'btn-azteca pointer bgcolorInedit-green'} onClick={participants.length === 0 ? (e) => { e.preventDefault(); console.log } : (e) => { e.preventDefault(); crearUserRandom() }} >
                        Alistar Juego </button>
                }
                TIEMPO
                <input
                    type={'number'}
                    id='time'
                    value={mensaje.time}
                    onChange={handleLogin}
                    placeholder={'Tiempo'}
                />
                {
                    participants.map((key, i) => {
                        return <li className={key.user===''?'hide':'transform-2'} key={`participante-${i}`}>{key.user} </li>
                    })

                }</>
        }
    </>)
}