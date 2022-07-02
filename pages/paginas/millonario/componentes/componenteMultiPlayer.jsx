import { useState } from "react";
import ComponenteSinglePlayer from "./componenteSinglePlayer";
import FormularioRegistro from "./formularioRegistro";

const ComponenteMultiPlayer = (props) => {
    const {inRoom=false,roomPlayers=[],roomsArray=[],setnameRequire= console.log, checkName=console.log,nameRequire='enviando', createRoom = console.log, setmultiPlayerGo = console.log, multiPlayerGo = false, roomName = 'sinSala', changeMode = 'sinRegistro', playerData = {}, roomArray = [], setsinglePlayerReady = console.log, sendRoom = console.log, ip = '', setRoomName = console.log, enterRoom = console.log, setmultiPlayerReady = console.log } = props
    const [doing, setDoing] = useState('starting')
const setRoom=(info)=>{
    setRoomName(info);
    createRoom(info)
}
   /*   roomArray.map((key, i) => {
          return (
              <button key={`sala-${i}`} className={doing === 'admin' ? 'hide' : 'btn-azteca pointer bgInedit-green pointer'} onClick={(e) => {
                  e.preventDefault();
                  setRoomName(key.name);
                  enterRoom(key.room, ip);
                  setmultiPlayerReady(true)
              }}>{key.name}</button>
          )
      }) */
      if (inRoom) {
        {roomPlayers.map((key, i) => {
            return (
                <div className="wdt-100 column hg100vh Ia-center Ij-center">
                < li key={`sala-${i}`} className={doing === 'admin' ? 'hide' : 'fontcolor-green pointer wdt-80 Ia-center Ij-center'} >{key.name}</li>
                </div>
                
            )
        })}
      }
    return (
        <>
            <button className={doing === 'multiPlayer' || doing === 'admin' ? 'hide' : 'btn-azteca pointer bgInedit-green pointer'} onClick={(e) => {
                e.preventDefault();
                ; setDoing('admin');
            }}>CREAR SALA</button>
            {
                doing === 'admin' ?
                    <div className="wdt-100 column hg100vh Ia-center Ij-center">
                        {
                            !multiPlayerGo ?
                                <FormularioRegistro setDoing={setDoing} setnameRequire={setnameRequire} nameRequire={nameRequire} checkName={checkName} ip={ip} sendPlayer={setRoom} setmultiPlayerReady={setmultiPlayerReady} setmultiPlayerGo={setmultiPlayerGo}
                                    multiPlayer /> : <></>

                        }
                    </div>
                    :
                    <>
                    </>
            }
            <button className={doing === 'admin' ||doing === 'multiPlayer'? 'hide' : 'btn-azteca pointer bgInedit-green pointer'} onClick={(e) => {
                e.preventDefault();
                setDoing('multiPlayer');
            }}>BUSCAR SALAS</button>
            {
                doing === 'multiPlayer' ?
                    <>
                        {<div className="wdt-100 column hg100vh Ia-center Ij-center">
                          <h1 className="fontcolor-white ">  SALAS ACTIVAS</h1>  
                            {roomsArray.map((key, i) => {
                                return (
                                    <>
                                   < li key={`sala-${i}`} className={doing === 'admin' ? 'hide' :'fontcolor-green pointer wdt-80 Ia-center Ij-center'} ><span className="fontcolor-green mrr-20 ">SALA : {key.roomName}</span><span className="fontcolor-green mrr-20 ">  Estado : {key.inGame?'  EN JUEGO  ':key.clasification?'  EN CLASIFICACION':'ESPERANDO CLASIFICACION '}</span><button className={key.inGame? 'btn-azteca-mini pointer bgcolorInedit-red pointer':'btn-azteca-mini pointer bgcolorInedit-green pointer'} onClick={(e) => {
                                        e.preventDefault();
                                        setRoomName(key.roomName);
                                        enterRoom(key.roomName);
                                    }}> {key.inGame? 'VER / AYUDAR':'PARTICIPAR'}</button></li>
                                    </>
                                    
                                )
                            })}
                            <br />
                            <button className={'btn-azteca pointer bgInedit-green pointer'} onClick={(e) => {
                                e.preventDefault();
                                setDoing('starting');
                            }}>VOLVER</button>
                            </div>
                        }
                    </>
                    :
                    <>
                    </>
            }
        </>
    )
}
export default ComponenteMultiPlayer