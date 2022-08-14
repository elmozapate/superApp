import { useState, useEffect } from 'react';
import io from "socket.io-client"
import { EnvM } from '../../../envMachetero';
const socket = io(envM.hostBack)
let news = true
const envM=EnvM()

const SecureApp = () => {

    const [chatArray, setChatArray] = useState([])
    const [userArray, setuserArray] = useState([])
    const [naming, setNaming] = useState(false)
    const [playerData, setPlayerData] = useState({
        user: '',
        ip: '',
        pos: -1
    })
    const [change, setChange] = useState(false)

    let displayHello = () => {
        socket.emit('BINGO', {
            'dataIn': playerData,
            actionTodo: "putName"
        });
    }
    const handlePlayer = (e) => {
        let value = e.target.value
        setPlayerData({
            ...playerData,
            user: value
        })
    }
    useEffect(() => {
        if (news) {
            socket.emit('BINGO', {
                'dataIn': {
                    'actionTodo': 'ipReq',
                },
                'actionTodo': 'ipReq'
            });
            news = false
        }


        socket.on("Secure", (chat) => {
            const actionTodo = chat.actionTodo
            const Data = chat.dataIn

            switch (actionTodo) {
                case 'userinzabby':
                    console.log('entro', Data)
                    setChatArray(Data)
                    setChange(!change)
                    break;
                case 'userNew':
                    console.log('entroNuevo', Data)
                    setuserArray(Data)
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
            <div className='flex-center col-8 h100vh colummn ngap-20 '>
                SECURITY MANAGER
                {chatArray.map((key, i) => {
                    return <li key={`securelist-${i}`} id={`securelist-${i}`} >{key.mensaje}---A las---{key.hora}---Desde--{key.page}-IP--{key.ip}</li>
                })}

            </div>
            <div className='flex-center col-8 h100vh colummn ngap-20 '>
                SECURITY USERS
                {
                    naming ?
                        <>
                            <input id={'playerName'} onChange={handlePlayer} value={playerData.user} placeholder='NOMBRE DEL USUARIO' />
                            <button /* className={'font-big btn-reiniciar'} */ onClick={(e) => {
                                e.preventDefault(),
                                displayHello();
                                    setNaming(false)
                            }}>---Crear----</button>
                        </> :
                        <></>
                }
                {userArray.map((key, i) => {
                    return <li onClick={(e) => {
                        e.preventDefault(); /* setNaming(true); setPlayerData({
                            ...playerData, ip: key.ip, pos: i

                        }) */
                    }} key={`securelistUsers-${i}`} id={`securelistUsers-${i}`} >---User----{key.user}---IP-----{key.ip}</li>
                })}

            </div>
        </div>



    </>)
}
export default SecureApp
