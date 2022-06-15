import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
import RelojApp from '../../components/containers/relojApp';
const socket = io("https://serverazteca.herokuapp.com/")

export default function RelojPuente() {
    const [eltiempo, setEltiempo] = useState(0)
    const [changing, seTchanging] = useState(false)
    useEffect(() => {

        socket.on("calamar", (chat) => {
            console.log(chat, 'reloj');
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {

                case 'IniciarReloj':
                    seTchanging(true)
                    break;
                case 'TimeReloj':
                    seTchanging(true)
                    setEltiempo(array)
                    break;
                default:
                    break;
            }
        })

    }, [])
    /*   useEffect(() => {
      
  
      }, []) */
    return (< >
        {
            !changing ? <><div className='reloj-puente'>
                <span>  OFF</span>
            </div>
            </> : <RelojApp eltiempo={eltiempo} />
        }
    </>)
}