import { useEffect, useState } from "react"

const FormularioRegistro = (props) => {
    const { setDoing= console.log,setnameRequire = console.log, checkName = console.log, nameRequire = 'vacio', setmultiPlayerReady = console.log, sendPlayer = console.log, multiPlayer = false } = props
    const [playerData, setPlayerData] = useState({
        ip: props.ip || false,
        name: ''
    })
    const [inSendRes, setInSendRes] = useState('sinSend')
    const [nameGood, setnameGood] = useState(false)
    const [inSend, setInSend] = useState(false)
    const handlePlayer = (e) => {
        let value = e.target.value
        setPlayerData({
            ...playerData,
            name: value
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
                    <h1 className={inSendRes === '404' ? "fontcolor-red" : "fontcolor-green"}>
                        {inSendRes === '404' ? ' ERROR DE CONECCION' : inSendRes === 'sinSend' ? ' VIENDO DISPONIBILIDAD.........' : inSendRes === 'si' ? 'Nombre Disponible' : 'Nombre No Disponible'}
                    </h1>
                    : <></>

            }
            <>
                {multiPlayer ? <>CREAR UNA SALA</> : <></>}
                <input id={'player'} onChange={handlePlayer} value={playerData.name} className={inSend ? 'hide' : 'bingo-name-small'} placeholder={multiPlayer ? 'NOMBRE DE LA SALA' : 'NOMBRE DEL JUGADOR'} />
                <button className={inSend ? 'hide' : multiPlayer ? playerData.name.length > 2 ? 'btn-azteca pointer' : 'hide' : 'hide'} onClick={(e) => { e.preventDefault(); checkName(playerData.name); }}>REVISAR DISPONIBILIDAD</button>
                <button className={inSend ? 'hide' : !multiPlayer ? playerData.name.length > 2 ? 'btn-azteca pointer' : 'hide' : nameGood ? 'btn-azteca pointer' : 'hide'} onClick={!multiPlayer ? (e) => { e.preventDefault(); sendPlayer(playerData) } : (e) => { e.preventDefault(); sendPlayer(playerData.name); }}>{multiPlayer ? <>CREAR</> : <>Registrarce</>}</button>
                <button className={!multiPlayer ? 'hide' : 'btn-azteca pointer'} onClick={(e) => { e.preventDefault(); setDoing('starting') }}>VOLVER</button>

            </>

        </>
    )
}
export default FormularioRegistro