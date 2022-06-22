import { useState, useEffect } from 'react';
import io from "socket.io-client"
import CrearPuente from './crearPuente';
const socket = io("https://serverazteca.herokuapp.com/")


const ParticipantesPuente = (props) => {
    const [isActive, setisActive] = useState(false)
    const [ip, setIp] = useState(props.ip || false)
    const [admin, setAdmin] = useState(false)

    const [participants, setparticipants] = useState([])
    const [mensaje, setMsj] = useState({
        user: '',
        ip: ip || props.ip || false
    })
    const handleLogin = (e) => {
        e.preventDefault()
        const value = e.target.value
        setMsj({
            ...mensaje,
            user: value
        })
        if (mensaje.user === 'anfitrion') {
            setAdmin(true)
            setMsj({
                ...mensaje,
                user: ''
            })
        }
    }
    const sendLatino = () => {
        socket.emit('calamar', {
            'dataIn': {
                ip: ip || mensaje.ip,
                user: mensaje.user,
                actionTodo: 'playerSend',
            },
            actionTodo: "playerSend"
        });
    }
    useEffect(() => {
        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {
                case 'playerList':
                    console.log('lellega');
                    setparticipants(array)
                    let register = false
                    array.map((key, i) => {
                        if (key.ip === ip) {
                            register = true
                        }
                        return
                    })
                    if (register) {
                        setisActive(true)
                    }
                    break;
                case 'noPuente':
                    setparticipants([])
                    setisActive(false)
                    break;
                default:
                    break;
            }
        })
        socket.emit(
            'calamar', {
            'dataIn': {
                ip: ip,
                'actionTodo': 'ipSend',
            },
            'actionTodo': 'ipSend',

        })
    }, [])
    return (<div className='flex-row column'>
        {
            admin ? <CrearPuente /> : <></>
        }
        {

            isActive ?
                <>
                    {
                        participants.map((key, i) => {
                            return <li key={`participante-${i}`}>{key.user} </li>
                        })

                    }

                </> : <>

                    <input
                        id='user'
                        value={mensaje.user}
                        onChange={handleLogin}
                        placeholder={'Registrate'}
                    />
                    <button className={mensaje.user.length > 2 ? 'btn-azteca pointer' : 'hide'} onClick={(e) => { e.preventDefault(); sendLatino() }}
                    >Registrarce</button>
                    {
                        participants.map((key, i) => {
                            return <li key={`participante-${i}`}>{key.user} </li>
                        })

                    }
                </>
        }

    </div>)
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
export default ParticipantesPuente