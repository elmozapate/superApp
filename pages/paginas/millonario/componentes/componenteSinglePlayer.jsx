import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const ComponenteSinglePlayer = (props) => {
    const { gameActive=false,roomAdmin = false, roomPlayers = [], setgoNow = console.log, roomName = 'sinSala', setmultiPlayerReady = console.log, multiplayer = false, changeMode = 'sinRegistro', playerData = {}, setsinglePlayerReady = console.log, startMillonario = console.log } = props
    const [cookies, setcookie] = useState(getCookie('gameType') || false)
    useEffect(() => {
        setcookie(getCookie('gameType') || false)
    }, [gameActive])
    return (
        <div className={"wdt-100 column hg100vh Ia-center Ij-center"}>
            {
                roomName !== 'sinSala' && multiplayer ?
                    <>
                        <span className='fontcolor-green' >
                            Sala : {roomName}
                        </span>
                        <br />
                    </>
                    :
                    <>

                    </>

            }
            {
                roomAdmin || !multiplayer ?
                    <>
                        <div className="wdt-50 column  hg80vh Ia-center Ij-center">
                            <button className={'btn-azteca pointer bgInedit-green pointer'} onClick={changeMode === 'multiPlayer' ? (e) => {
                                e.preventDefault();
                                setgoNow(true)
                                startMillonario(playerData)
                            } : (e) => {
                                e.preventDefault();
                                setsinglePlayerReady(true)
                                    ;
                                startMillonario(playerData)
                            }}>EMPEZAR</button>
                            <button className={changeMode === 'multiPlayer' ? 'btn-azteca pointer bgInedit-green pointer' : 'hide'} onClick={(e) => {
                                e.preventDefault();
                                setgoNow(false)
                                setmultiPlayerReady(false)
                                setsinglePlayerReady(false)
                            }}>Volver</button>
                        </div >

                        <div className={!multiplayer ? 'hide' : "wdt-50 column    Ia-center Ij-center"}>
                            <h1 className="fontcolor-white"> USUARIOS EN LA SALA </h1>
                            {roomPlayers.map((key, i) => {
                                return (
                                    <div className="wdt-100 column  Ia-center Ij-center">
                                        < li key={`user-${i}`} className={'fontcolor-green  wdt-80 Ia-center Ij-center'} >{key.name}</li>
                                    </div>

                                )
                            })}
                        </div>
                    </>
                    :
                    <div className={!multiplayer ? 'hide' : ""}>
                        <h1 className="fontcolor-white"> USUARIOS EN LA SALA </h1>
                        {roomPlayers.map((key, i) => {
                            return (
                                <div className="wdt-100 column  Ia-center Ij-center">
                                    < li key={`user-${i}`} className={'fontcolor-green  wdt-80 Ia-center Ij-center'} >{key.name}</li>
                                </div>

                            )
                        })}
                    </div>
            }
           {/*  {cookies !== 'singlePlayer' ? <></> : <><button className={'btn-azteca pointer bgInedit-green pointer'} onClick={(e) => {
                e.preventDefault();
                startMillonario(playerData)
            }}>INICIAR JUEGO Sin</button></>} */}

        </div>
    )
}
export default ComponenteSinglePlayer