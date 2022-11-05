
const PowerUps = (props) => {
    const {setObject = console.log,powerUpsGet=[], volver = console.log,efectVolumen=console.log,volumenEfectsLevel={ value: 2, mute: false },  volumenLevel = { value: 2, mute: false }, setFullScreen = console.log, requestFullScreen = console.log, reboot = console.log, setGameStart = console.log, playerStage = { stage: 0 }, playerTime = { time: 0 }, playerVidas = { vidas: 5, health: 100, maxHealth: 100 }, player = { pause: false }, onMobil = false, fullScreen = false, gameStart = false, setProps = console.log, volumenSet = console.log } = props
    return (
        <>
            <div className="open noOpacity">
                <div className="game-info">
                    <span className={(parseInt(100 / playerVidas.maxHealth) * playerVidas.health) < 30 ? "fontcolor-red" : ((parseInt(100 / playerVidas.maxHealth) * playerVidas.health) > 30) && ((parseInt(100 / playerVidas.maxHealth) * playerVidas.health) < 60) ? 'fontcolor-yellow' : 'fontcolor-green'}>SALUD:{(parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) > 0 ? (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) : 0}%</span>
                    <span>STAGE:{playerStage.stage}</span>
                    <span>NIVEL:{player.level}</span>
                    <span>VIDAS:{playerVidas.vidas}</span>
                    <span className="tiempillo">TIEMPO:{playerTime.time}</span>

                    <div></div>
                </div>
                <div className="grandes">
                    {powerUpsGet.map((key,i)=>{
                        return(
                            <>
                            <button
                            onClick={(e)=>{e.preventDefault();setObject('inmortal-powerUps',key.active?'normal':'inmortal','powerUps')}}
                            >
                                {key.nombre}
                                <br />
                                Estado: {key.active?'Activado':'En espera'}
                            </button>
                            </>
                        )
                    })}
                    PowerUps
                </div>
                <div>

                    <div className="game-sound">
                        <span>
                            {`Música = ${volumenLevel.mute ? 'Muted' : volumenLevel.value * 10}%`}
                        </span>
                        <span>
                            <button
                                className={` ${!(volumenLevel.value > 0) ? ' hide' : 'bgcolor-green'}`}
                                onClick={(e) => { e.preventDefault(); volumenSet('-') }}
                            >--</button>
                            <button
                                className={`mute ${volumenLevel.mute ||volumenLevel.value===0? ' bgcolorInedit-red' : 'bgcolorInedit-green'}`}
                                onClick={(e) => { e.preventDefault(); volumenSet('mute') }}
                            >Mute</button>
                            <button
                                className={` ${!(volumenLevel.value < 10) ? ' hide' : 'bgcolor-green'}`}

                                onClick={(e) => { e.preventDefault(); volumenSet('+') }}
                            >+</button>

                        </span>

                    </div>
                    <div className="game-sound">
                        <span>
                            {`Efectos = ${volumenEfectsLevel.mute ? 'Muted' : volumenEfectsLevel.value * 10}%`}
                        </span>
                        <span>
                            <button
                                className={` ${!(volumenEfectsLevel.value > 0) ? ' hide' : 'bgcolor-green'}`}
                                onClick={(e) => { e.preventDefault(); efectVolumen(false,'-') }}
                            >--</button>
                            <button
                                className={`mute ${volumenEfectsLevel.mute||volumenEfectsLevel.value===0 ? ' bgcolorInedit-red' : 'bgcolorInedit-green'}`}
                                onClick={(e) => { e.preventDefault(); efectVolumen(false,'mute') }}
                            >Mute</button>
                            <button
                                className={` ${!(volumenEfectsLevel.value < 10) ? ' hide' : 'bgcolor-green'}`}

                                onClick={(e) => { e.preventDefault(); efectVolumen(false,'+') }}
                            >+</button>

                        </span>

                    </div>
                    <button
                        onClick={(e) => { e.preventDefault(), volver() }}
                    >
                        VOLVER
                    </button>
                </div>


            </div>
        </>
    )
}
export default PowerUps