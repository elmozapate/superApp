import { useState, useEffect } from 'react';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")
const SecureApp = () => {

    const [chatArray, setChatArray] = useState([])
    const [change, setChange] = useState(false)
    /* 
        let displayHello = () => {
    
        } */

    useEffect(() => {
        socket.emit('BINGO', {
            'dataIn':{
                'actionTodo': 'ipReq',
            },
            'actionTodo': 'ipReq'
        });
 
        socket.on("Secure", (chat) => {
            const actionTodo = chat.actionTodo
            const Data = chat.dataIn
       
            switch (actionTodo) {
                case 'userinzabby':
                    console.log('entro', Data)
                    setChatArray(Data)
                    setChange(!change)
                    break;
            }
        })
    }, [])
    useEffect(() => {
        console.log('nuevo');
    }, [change])
    return (<>
        <div className='IDiv-main bgctr'>
            <div className='flex-center h100vh colummn ngap-20 '>
                SECURITY MANAGER
                {chatArray.map((key, i) => {
                    return <li key={`securelist-${i}`} id={`securelist-${i}`} >{key.mensaje}---A las---{key.hora}---Desde-----{key.ip}</li>
                })}

            </div>
        </div>



    </>)
}
export default SecureApp
