import { setCookies, removeCookies, getCookie } from 'cookies-next';

const BotonesModo = (props) => {
    const { setmultiPlayerGo=console.log,setRoomName=console.log, setmultiPlayerReady = console.log,setsinglePlayerReady = console.log, cambiarModo = console.log, changeMode = 'sinRegistro', chooseState = false, setChooseState = console.log } = props
    return (
        <>
            {chooseState ?
                <>
                    <button className={changeMode === 'millonario' ? 'hide' : 'btn-azteca pointer bgInedit-green pointer'} onClick={(e) => {
                        e.preventDefault();
                        setCookies("gameType", 'millonario', {
                            maxAge: 30 * 24 * 60 * 60,
                            path: '/',
                        })
                       setChooseState(false)
                        ; cambiarModo('millonario');
                        setmultiPlayerGo(false)
                    }}>MILLONARIO GENERAL</button>
                    <button className={changeMode === 'singlePlayer' ? 'hide' : 'btn-azteca pointer bgInedit-green pointer'} onClick={(e) => {
                        e.preventDefault();
                        setCookies("gameType", 'singlePlayer', {
                            maxAge: 30 * 24 * 60 * 60,
                            path: '/',
                        })
                       setChooseState(false)
                        ; cambiarModo('singlePlayer')
                        setmultiPlayerGo(false)


                    }}>{changeMode === 'singlePlayer'?'Reiniciar':'SINGLE PLAYER'}</button>
                    <button className={changeMode === 'multiPlayer' ? 'hide' : 'btn-azteca pointer bgInedit-green pointer'} onClick={(e) => {
                        e.preventDefault();
                        
                       setChooseState(false)
                        ; cambiarModo('multiPlayer');
                        setmultiPlayerGo(false)
                    }}>{changeMode === 'multiPlayer'?'Reiniciar':'SALAS'}</button>
                    <button className={changeMode === 'sinRegistro'?'hide':'btn-azteca pointer bgInedit-red pointer'} onClick={(e) => {
                        e.preventDefault();
                        setChooseState(false)
                        
                    }}>CANCELAR</button></> :
                <></>}
        </>
    )
}
export default BotonesModo

