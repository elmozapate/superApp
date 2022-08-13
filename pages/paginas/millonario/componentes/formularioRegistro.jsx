import { useEffect, useState } from "react"
import LoginButton from "./loginBoton"

const FormularioRegistro = (props) => {
    const { oldUser = false, checkLogIn = console.log, checkNameUser = console.log, willRegister = false, setDoing = console.log, setnameRequire = console.log, checkName = console.log, nameRequire = 'vacio', setmultiPlayerReady = console.log, sendPlayerRegister = console.log, sendPlayer = console.log, multiPlayer = false } = props
    const [playerData, setPlayerData] = useState({
        ip: props.ip || false,
        name: '',
        password: '',
        passwordRepeat: ''
    })
    const [inSendRes, setInSendRes] = useState('sinSend')
    const [nameGood, setnameGood] = useState(false)
    const [inSend, setInSend] = useState(false)
    const handlePlayer = (e) => {
        let id = e.target.id
        let value = e.target.value
        setPlayerData({
            ...playerData,
            [id]: value
        })
    }
    useEffect(() => {
        if (nameRequire === 'enviando') {
            setInSend(true)
            setTimeout(() => {
                if (nameRequire === 'enviando') {
                    setInSendRes('404')
                    setTimeout(() => {
                        setInSend(false)
                        setInSendRes('sinSend')
                        setnameRequire('sinEnviar')
                    }, 4000)
                }

            }, 15000)
        }
        if (nameRequire === 'libre') {
            setInSendRes('si')
            setTimeout(() => {
                setInSend(false)
                setnameGood(true)
                setInSendRes('sinSend')
            }, 4000)
        }
        if (nameRequire === 'ocupado') {
            setInSendRes('no')
            setTimeout(() => {
                setInSend(false)
                setInSendRes('sinSend')
            }, 4000)
        }

    }, [nameRequire])
    return (
        <>
            {
                inSend ?
                    <h1 className={inSendRes === '404' || inSendRes === 'no' ? "fontcolor-red" : "fontcolor-green"}>
                        {inSendRes === '404' ? ' ERROR DE CONECCION' : inSendRes === 'sinSend' ? ' VIENDO DISPONIBILIDAD.........' : inSendRes === 'si' ? oldUser ? 'DATOS CORRECTOS ' : 'Nombre Disponible' : oldUser ? 'DATOS INCORRECTOS ' : 'Nombre No Disponible'}
                    </h1>
                    : <></>

            }
            <>
                {multiPlayer ? <>CREAR UNA SALA</> : <></>}
                {willRegister ?
                    oldUser ?
                        <>
                            <h1>LOG IN</h1>
                            <input id={'name'} onChange={handlePlayer} value={playerData.name} className={inSend ? 'hide' : 'bingo-name-small'} placeholder={!oldUser ? 'NOMBRE DE LA SALA' : 'NOMBRE DEL JUGADOR'} />
                            <input id={'password'} type='password' onChange={handlePlayer} value={playerData.password} className={inSend ? 'hide' : 'bingo-name-small'} placeholder={oldUser ? 'Password' : 'NOMBRE DEL JUGADOR'} />
                            <button className={playerData.password.length > 3 ? inSend ? 'hide' : 'btn-azteca pointer' : 'hide'} onClick={(e) => { e.preventDefault(); checkLogIn(playerData); }}>INGRESAR</button>
                            <button className={!oldUser ? 'hide' : 'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); setDoing(false) }}>VOLVER</button>
                            -------------------
                            o
                            Ingresa con Google
                            <LoginButton />
                        </>
                        :
                        <>
                            <h1>REGISTRATE</h1>
                            --------------------
                            <h1>REGISTRATE CON GOOGLE</h1>
                            <LoginButton />
                            --------------------
                            <input id={'name'} onChange={handlePlayer} value={playerData.name} className={inSend ? 'hide' : 'bingo-name-small'} placeholder={!willRegister ? 'NOMBRE DE LA SALA' : 'NOMBRE DEL JUGADOR'} />
                            <input id={'password'} onChange={handlePlayer} value={playerData.password} className={inSend ? 'hide' : 'bingo-name-small'} placeholder={willRegister ? 'Password' : 'NOMBRE DEL JUGADOR'} />
                            <span className={playerData.password.length < 3 && playerData.password.length !== 0 ? '' : 'hide'}>MINIMO 5 CARACTERES</span>
                            <input id={'passwordRepeat'} onChange={handlePlayer} value={playerData.passwordRepeat} className={inSend ? 'hide' : 'bingo-name-small'} placeholder={willRegister ? 'Confirmar Password' : 'NOMBRE DEL JUGADOR'} />
                            <span className={playerData.passwordRepeat.length !== 0 && playerData.password.length !== 0 && playerData.password !== playerData.passwordRepeat ? '' : 'hide'}>No coinciden los passwords</span>
                            <button className={playerData.password.length > 3 && playerData.password === playerData.passwordRepeat ? inSend ? 'hide' : willRegister ? playerData.name.length > 2 ? 'btn-azteca pointer' : 'hide' : 'hide' : 'hide'} onClick={(e) => { e.preventDefault(); checkNameUser(playerData.name); }}>REVISAR DISPONIBILIDAD</button>
                            <button className={inSend ? 'hide' : !willRegister ? playerData.name.length > 2 ? 'btn-azteca pointer' : 'hide' : nameGood ? 'btn-azteca pointer' : 'hide'} onClick={willRegister ? (e) => { e.preventDefault(); sendPlayerRegister(playerData) } : (e) => { e.preventDefault(); sendPlayer(playerData.name); }}>{!willRegister ? <>CREAR</> : <>Registrarce</>}</button>
                            <button className={!willRegister ? 'hide' : 'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); setDoing('starting') }}>VOLVER</button>
                        </>
                    :
                    <>
                        <input id={'name'} onChange={handlePlayer} value={playerData.name} className={inSend ? 'hide' : 'bingo-name-small'} placeholder={multiPlayer ? 'NOMBRE DE LA SALA' : 'NOMBRE DEL JUGADOR'} />
                        <button className={inSend ? 'hide' : multiPlayer ? playerData.name.length > 2 ? 'btn-azteca pointer' : 'hide' : 'hide'} onClick={(e) => { e.preventDefault(); checkName(playerData.name); }}>REVISAR DISPONIBILIDAD</button>
                        <button className={inSend ? 'hide' : !multiPlayer ? playerData.name.length > 2 ? 'btn-azteca pointer' : 'hide' : nameGood ? 'btn-azteca pointer' : 'hide'} onClick={!multiPlayer ? (e) => { e.preventDefault(); sendPlayer(playerData) } : (e) => { e.preventDefault(); sendPlayer(playerData.name); }}>{multiPlayer ? <>CREAR</> : <>Registrarce</>}</button>
                        <button className={!multiPlayer ? 'hide' : 'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); setDoing('starting') }}>VOLVER</button>

                    </>}

            </>

        </>
    )
}
export default FormularioRegistro