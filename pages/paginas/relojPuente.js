import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
import RelojApp from '../../components/containers/relojApp';
const socket = io("https://serverazteca.herokuapp.com/")

export default function RelojPuente() {
    const [winning, seTwinning] = useState(false)
    const [eltiempo, setEltiempo] = useState(0)
    const [changing, seTchanging] = useState(false)
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
{/*         <audio className='hide' src={'http://stream.zeno.fm/72cnmakr4f0uv'} controls autoPlay></audio>
 */}
        {
            !changing ? <><div className='reloj-puente'>
                <span>  OFF</span>
            </div>
            </> : <>
                <RelojApp jail={jail} winning={winning} eltiempo={eltiempo} />

            </>
        }
    </>)
}