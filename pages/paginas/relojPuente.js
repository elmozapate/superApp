import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
import RelojApp from '../../components/containers/relojApp';
import { EnvM } from '../../envMachetero';
const envM=EnvM()

const socket = io(envM.hostBack)

export default function RelojPuente() {
    const [winning, seTwinning] = useState(false)
    const [eltiempo, setEltiempo] = useState(0)
    const [changing, seTchanging] = useState(false)
    const [lastMin, setlastMin] = useState(false)
    const [lostGame, setlostGame] = useState(false)
    const [jail, setJail] = useState(false)

    useEffect(() => {
        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {
                case 'llegoPlayer':
                    seTwinning(true)
                    break;
                case 'die':
                    setJail(true)
                    break;
                case 'IniciarReloj':
                    seTwinning(false)
                    seTchanging(true)
                    break;
                case 'TimeReloj':
                    seTchanging(true)
                    setEltiempo(array)
                    break;
                case 'noPuente':
                    seTwinning(false)
                    seTchanging(false)
                    break;
                case 'theWinner':
                    seTchanging(true)
                    seTwinning(true)
                    break;
                case 'lastMinute':
                    console.log('lastmin');
                    setlastMin(true)
                    break;
                case 'lostGame':
                    setlostGame(true)
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
        {/*         <audio className='hide' src={'http://stream.zeno.fm/72cnmakr4f0uv'} controls autoPlay></audio>
 */}
        {
            !changing ? <><div className='reloj-puente'>
                <span>  OFF</span>
            </div>
            </> : <>
                <RelojApp lostGame={lostGame} lastMin={lastMin} jail={jail} winning={winning} eltiempo={eltiempo} />
            </>
        }
    </>)
}