
import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
import ComponenteLista from './componenteLista';
const socket = io("https://serverazteca.herokuapp.com/")
let count = 0
const IstaDefinitiva = () => {
    const [participants, setparticipants] = useState([{ user: '' }])
    const [participantsWinner, setparticipantsWinner] = useState(false)
    const [participantsturn, setparticipantsturn] = useState(0)

    useEffect(() => {

        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {
                case 'noPuente':
                    setparticipants([{ user: '' }])
                    setparticipantsturn(0)

                    setparticipantsWinner(false)
                    break;
                case 'playerListReady':
                    setparticipants(array)
                    break;
                case 'theWinner':
                    setparticipantsWinner(true)
                    setparticipantsturn(chat.dataIn)
                    break;
                case 'fallingin':
                    setparticipantsturn(chat.dataIn)
                    /*  array.participants.map((key, i) => {
                          
                         if (array.ip === key.ip) {
                             if ((i + 1) === array.participants.length) {
                                 setparticipantsturn(0)
                             } else {
                                 setparticipantsturn(i + 1)
                             }
                         }
                     }) */
                    break;
                case 'playerDesTurns':
                    break;

                case 'noPuente':
                    setparticipants([{ user: '' }])
                    setparticipantsturn(0)
                    setparticipantsWinner(false)

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
            'actionTodo': 'ipSend',

        })

    }, [])
    /*   useEffect(() => {
      
  
      }, []) */
    return (< >
        {
            participantsWinner ? <><ComponenteLista participants={participants} participantsturn={participantsturn} won={true} /></> : <ComponenteLista participants={participants} participantsturn={participantsturn} />

        }

    </>)
}
export default IstaDefinitiva