import { useState, useEffect } from 'react';
import io from "socket.io-client"
import { EnvM } from '../../envMachetero';
import CrearPuente from './crearPuente';
const envM=EnvM()

const socket = io(envM.hostBack)

const ParticipantesPuente = (props) => {
    const [isActive, setisActive] = useState(false)
    const [ip, setIp] = useState(props.ip || false)
    const [admin, setAdmin] = useState(false)
    const [inProgress, setinProgress] = useState(false)
    const [inProgressDone, setinProgressDone] = useState(false)
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
        if (mensaje.user === 'anfitrion' || e.target.value === 'anfitrion') {
            setAdmin(true)
        }
    }
     const hora2 = () => {
        const date = new Date();
        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
        const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
        return ` ${day} de ${month} del ${year} A las ${hour}:${minutes}:${seconds} `
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
        const datenow = hora2()
        socket.emit('calamar', {
            'dataIn': {
                user: mensaje.user,
                ip: ip,
                hora: datenow,
                'actionTodo': 'ipSend',
            },
            actionTodo: "ipSend",
            pageFrom: 'calamarPuente'
        });
    }
    useEffect(() => {
        socket.on("calamar", (chat) => {
            const actionTodo = chat.actionTodo
            const array = chat.dataIn
            switch (actionTodo) {
                case 'playerList':
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
                case 'createdOne':
                    setinProgress(true)
                    break;
                case 'theWinner':
                    setinProgressDone(true)
                    break;
                case 'noPuente':
                    setinProgressDone(false)
                    setinProgress(false)
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
                user: '',
                'actionTodo': 'ipSend',
            },
            'actionTodo': 'ipSend',
        })
    }, [])
    return (<div className='flex-row column I-column-reverse  hg100vh'>
        {inProgress ?
            <>
                <button className={'btn-azteca pointer bgcolorInedit-green'} >
                    {inProgressDone ? 'FINALIZADO' : 'EN CURSO'}
                </button>
                {

                    participants.map((key, i) => {
                        return <li className={key.user === '' ? 'hide' : 'transform-2'} key={`participante-${i}`}>{key.user} </li>
                    })
                }
            </> :
            isActive ?
                <>
                    {admin ? <></> :
                        participants.map((key, i) => {
                            return <li className={key.user === '' ? 'hide' : 'transform-2'} key={`participante-${i}`}>{key.user} </li>
                        })
                    }
                </> : <>
                    <input
                        className='transform-2'
                        id='user'
                        value={mensaje.user}
                        onChange={handleLogin}
                        placeholder={'INGRESA TU NOMBRE'}
                    />
                    <button className={mensaje.user.length > 2 ? 'btn-azteca pointer bgcolorInedit-green' : 'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); sendLatino() }}
                    >Registrarse</button>
                    {admin ? <></> :
                        participants.map((key, i) => {
                            return <li className={key.user === '' ? 'hide' : 'transform-2'} key={`participante-${i}`}>{key.user} </li>
                        })
                    }
                </>
        }
        {
            admin ? <CrearPuente /> : <></>
        }
        <input
            className='invisible'
            id='user'
            value={mensaje.user}
            onChange={handleLogin}
        />
    </div>)
}

export async function getServerSideProps({ req }) {
    const forwarded = req.headers["x-forwarded-for"]
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    let min = 1111111110
    let max = 9000000000
    return {
        props: {
            ip: ip,
        },
    }
}
export default ParticipantesPuente