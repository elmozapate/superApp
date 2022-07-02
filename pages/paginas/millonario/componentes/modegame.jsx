import { useState } from "react"
import BotonesModo from "./botonesModo"

const ModeGame = (props) => {
    const {roomName='' ,chooseState=false,setChooseState=console.log,setmultiPlayerGo=console.log,setRoomName=console.log, changeMode = 'sinRegistro',setmultiPlayerReady = console.log,setsinglePlayerReady = console.log, setChangeMode = console.log } = props
    return (
        <div className={changeMode === 'sinRegistro' ? 'game-mode' : "btn-game-mode"}>
            {
                !chooseState ?
                    <>
                    <span className={changeMode !== 'multiPlayer' ? 'hide' : ""}>SALA ACTUAL : {roomName}</span>
                    <span className={changeMode === 'sinRegistro' ? 'hide' : ""}>MODO ACTUAL : {changeMode}</span>
                        <button className={'btn-azteca pointer'} onClick={(e) => {
                            e.preventDefault();
                            setChooseState(true)
                        }}>{changeMode === 'sinRegistro' ? 'ESCOGE UN MODO' : `Cambiar Modo`}</button> </> :

                    <BotonesModo  setmultiPlayerReady={setmultiPlayerReady} setmultiPlayerGo={setmultiPlayerGo} setRoomName={setRoomName} chooseState={chooseState} setsinglePlayerReady={setsinglePlayerReady} setChooseState={setChooseState} cambiarModo={setChangeMode} changeMode={changeMode} />
            }

        </div>
    )
}
export default ModeGame