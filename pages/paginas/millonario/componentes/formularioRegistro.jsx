import { useState } from "react"

const FormularioRegistro = (props) => {
    const { sendPlayer = console.log } = props
    const [playerData, setPlayerData] = useState({
        ip: props.ip || false,
        name: ''
    })
    const handlePlayer = (e) => {
        let value = e.target.value
        setPlayerData({
            ...playerData,
            name: value
        })
    }
    return (
        <>
            <input id={'player'} onChange={handlePlayer} value={playerData.name} className={'bingo-name-small'} placeholder='NOMBRE DEL JUGADOR' />

            <button className={playerData.name.length > 2 ? 'btn-azteca pointer' : 'hide'} onClick={(e) => { e.preventDefault(); sendPlayer(playerData) }}>Registrarce</button>

        </>
    )
}
export default FormularioRegistro