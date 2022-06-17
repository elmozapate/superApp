import React from 'react';
import { useState, useEffect } from 'react';
import io from "socket.io-client"
import RelojApp from '../../components/containers/relojApp';
const socket = io("https://serverazteca.herokuapp.com/")

export default function RelojPuente() {
    const [winning, seTwinning] = useState(false)
    const [eltiempo, setEltiempo] = useState(0)
    const [changing, seTchanging] = useState(false)
    const [relojSrc, setrelojSrc] = useState('https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20Reloj%20Minutero%20%20Efecto%20de%20Sonidolento.mp3?alt=media&token=aa3d406f-6724-4f87-9715-475f865f282e')

    useEffect(() => {

        socket.on("calamar", (chat) => {
            console.log(chat, 'reloj');
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {
                case 'llegoPlayer':                
                    seTwinning(true)
                    setrelojSrc('https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Ffanfare-triumphal.mp3?alt=media&token=86ec38ea-bf88-4656-96aa-148b6ebd7812')
                    break;
                    case 'finalMinute':    
                    setrelojSrc("https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20sonido%20de%20reloj%20tic%20tic.mp3?alt=media&token=b870b388-39e0-4cd7-9e52-cac388629217")
                    break;
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
            </> : <>
                <RelojApp relojSrc={relojSrc} winning={winning} eltiempo={eltiempo} />
               
            </>
        }
    </>)
}