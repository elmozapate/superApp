import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
import { EnvM } from '../../envMachetero';
const envM=EnvM()

const socket = io(envM.hostBack)

const MetaPuente = (props) => {
    const [changing, seTchanging] = useState(false)
    const [winning, seTwinning] = useState(false)
    const [ip, setIp] = useState(props.ip || false)
    const [winIp, setWinIp] = useState(false)
    const llegarPuente = () => {
        socket.emit(
            'calamar', {
            'dataIn': {
                ip: ip,
                'actionTodo': 'endPuente',
            },
            'actionTodo': 'endPuente',
        })
        seTchanging(true)
    }
    useEffect(() => {
        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo || ''
            switch (actionTodo) {
                case 'createdOne':
                    const dataIn = chat.dataIn
                    const levelIn = dataIn.levelIn || 0
                    if (levelIn === 11) {
                        console.log('chat', chat);
                        setWinIp(chat.dataIn.winIp)
                        seTchanging(true)
                    }
                    break;
                case 'llegoPlayer':
                    seTwinning(true)
                    break;
                case 'passingFinalReady':
                    seTchanging(true)
                    break;
                case 'passingFinalReadyRes':
                    seTchanging(true)
                    seTwinning(true)
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
            winning && winIp === ip ? <><p className='btn-azteca '>FELICIDADES</p>

            </> : changing && winIp === ip? <button className={'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); llegarPuente() }} >
                Parar Reloj </button> : <></>
        }
    </>)
}

export async function getServerSideProps({ req }) {
    const forwarded = req.headers["x-forwarded-for"]
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    let min = 1111111110
    let max = 9000000000
    return {
        props: {
            ip:/* Math.floor(Math.random() * (max - min)) + min */ ip
            ,
        },
    }
}
export default MetaPuente