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
            </> : <>
                <RelojApp eltiempo={eltiempo} />
                {eltiempo > 60 ? <><audio controls loop autoPlay>
                    <source src="https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fhousehold045.mp3?alt=media&token=defd2868-7e64-4280-8dd9-1339212302bb" type="audio/mp3" />
                    <source src="https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fhousehold045.mp3?alt=media&token=defd2868-7e64-4280-8dd9-1339212302bb" type="audio/mp3" />
                </audio></> : <><audio controls loop autoPlay>
                    <source src="https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fmisc198.mp3?alt=media&token=3be8cd3f-9b18-4479-b0bc-d828c8197b21" type="audio/mp3" />
                    <source src="https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fmisc198.mp3?alt=media&token=3be8cd3f-9b18-4479-b0bc-d828c8197b21" type="audio/mp3" />
                </audio></>

                }
            </>
        }
    </>)
}