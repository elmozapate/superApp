
import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
import ComponenteLista from './componenteLista';
const socket = io("https://serverazteca.herokuapp.com/")
let count=0
export default function IstaDefinitiva() {
    const [participants, setparticipants] = useState([])
    const [participantsturn, setparticipantsturn] = useState(-1)

    useEffect(() => {

        socket.on("calamar", (chat) => {
            console.log(chat, 'reloj');
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {
                case 'playerListReady':
                    console.log('llegolalista');
                    setparticipants(array)
                    break;
                case 'playerTurn':
                    console.log('llegolalista',chat);

                    setparticipantsturn(count+1)
                    count++
                    break;
                case 'playerDesTurns':
                    console.log(chat, 'falla');
                    break;
                default:
                    break;

            }
        })
        socket.emit(
            'calamar', {
            'dataIn': {
                'actionTodo': 'ipSend',
            },
        })
    }, [])
    /*   useEffect(() => {
      
  
      }, []) */
    return (< >


        <ComponenteLista participants={participants} participantsturn={participantsturn} />
    </>)
}