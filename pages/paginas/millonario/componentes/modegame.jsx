import { useState } from "react"
import BotonesModo from "./botonesModo"

const ModeGame = (props) => {
    const { logOut =console.log, playerData = { name: '' }, isRegister = false, roomName = '', chooseState = false, setChooseState = console.log, setmultiPlayerGo = console.log, setRoomName = console.log, changeMode = 'sinRegistro', setmultiPlayerReady = console.log, setsinglePlayerReady = console.log, setChangeMode = console.log } = props
    return (
        <div className={changeMode === 'sinRegistro' || changeMode === 'off' ? 'game-mode' : "btn-game-mode"}>
            {
                !chooseState ?
                    <>
                       <span  className={'fontcolor-white  fontSize-30'}>{!isRegister ? `Jugando como : ${playerData.name}` :  ` Hola de nuevo ${playerData.name}`}</span>
                        <span className={changeMode !== 'multiPlayer' ? 'hide' : ""}>SALA ACTUAL : {roomName}</span>
                        <span className={changeMode === 'sinRegistro' ? 'hide' : ""}>MODO ACTUAL : {changeMode}</span>
                        <button className={'btn-azteca pointer'} onClick={(e) => {
                            e.preventDefault();
                            setChooseState(true)
                        }}>{changeMode === 'sinRegistro' || changeMode === 'off' ?
                            <>
                             
                                <span>ESCOGE UN MODO</span>

                            </> : `Cambiar Modo`}</button> </> :

                    <BotonesModo isRegister={isRegister} logOut={logOut} setmultiPlayerReady={setmultiPlayerReady} setmultiPlayerGo={setmultiPlayerGo} setRoomName={setRoomName} chooseState={chooseState} setsinglePlayerReady={setsinglePlayerReady} setChooseState={setChooseState} cambiarModo={setChangeMode} changeMode={changeMode} />
            }

        </div>
    )
}
export default ModeGame