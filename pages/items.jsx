import VolumenComponent from "./volumenComponente";

const Items = (props) => {
    const { itemsGet = {
        enUso: 'ninguno',
        array: []
    }, armasGet = {
        enUso: 'ninguna',
        array: []
    }, setObject = console.log, volver = console.log, efectVolumen = console.log, volumenEfectsLevel = { value: 2, mute: false }, volumenLevel = { value: 2, mute: false }, setFullScreen = console.log, requestFullScreen = console.log, reboot = console.log, setGameStart = console.log, playerStage = { stage: 0 }, playerTime = { time: 0 }, playerVidas = { vidas: 5, health: 100, maxHealth: 100 }, player = { pause: false }, onMobil = false, fullScreen = false, gameStart = false, setProps = console.log, volumenSet = console.log } = props
    return (
        <>
            <div className={onMobil?"open open-mobil noOpacity":"open noOpacity"}>
                <div className="game-info menu-cont">
                    <span className={(parseInt(100 / playerVidas.maxHealth) * playerVidas.health) < 30 ? "fontcolor-red" : ((parseInt(100 / playerVidas.maxHealth) * playerVidas.health) > 30) && ((parseInt(100 / playerVidas.maxHealth) * playerVidas.health) < 60) ? 'fontcolor-yellow' : 'fontcolor-green'}>SALUD:{(parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) > 0 ? (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) : 0}%</span>
                    <span>STAGE:{playerStage.stage}</span>
                    <span>NIVEL:{player.level}</span>
                    <span>VIDAS:{playerVidas.vidas}</span>
                    <span className="tiempillo">TIEMPO:{playerTime.time}</span>

                    <div></div>
                </div>
                <div className="grandes menu-cont">
                    <div className="itemsBox ">
                        <h1 className="fontcolor-white">ARMAS {armasGet.enUso === 'desArmado' ? 'desArmado' : ` ${armasGet.enUso}`}</h1>
                        <div className=" itemsBoxDouble">
                            {armasGet.array.map((key, i) => {
                                if (key.nombre !== 'desArmados') {
                                    return (<>

                                        <div className="btn-game-menu-content">
                                            <div className="info-game-box">
                                                <h2 className="fontcolor-white">{key.nombre}</h2>
                                                <button className={key.active ? 'bgcolorInedit-green' : ''} onClick={(e) => { e.preventDefault(); setObject(`armas-${key.nombre}`, key.active ? false : true, 'items') }}
                                                >                                        Estado: {key.active ? 'Activado' : 'En espera'}
                                                </button>
                                            </div>

                                            <img src={`/armas/${key.nombre}/img/btn.png`}
                                                alt={`armas-${key.nombre}-btn`}
                                                width={onMobil?'60px':'100px'}
                                        height={onMobil?'60px':'100px'} />

                                        </div>

                                    </>)
                                }
                            })}
                        </div>
                    </div>
                    <div className="itemsBox">
                        <h1 className="fontcolor-white">Items</h1>
                        {itemsGet.array.map((key, i) => {
                            if (key.nombre !== 'ninguno') {
                                return (<>
                                    <div className="btn-game-menu-content">
                                        <div className="info-game-box">
                                            <h2 className="fontcolor-white">{key.nombre}</h2>
                                            <button className={key.active ? 'bgcolorInedit-green' : ''} onClick={(e) => { e.preventDefault(); setObject(`items-${key.nombre}`, key.active ? false : true, 'items') }}
                                            >
                                                Estado: {key.active ? 'Activado' : 'En espera'}
                                            </button>
                                        </div>

                                        <img src={`/items/${key.nombre}/img/btn.png`}
                                            alt={`items-${key.nombre}-btn`}
                                            width={onMobil?'60px':'100px'}
                                        height={onMobil?'60px':'100px'} />

                                    </div>

                                </>)
                            }
                        })}
                    </div>
                </div>
                <div className="menu-cont">

                <VolumenComponent volumenSet={volumenSet} volumenLevel={volumenLevel} volumenEfectsLevel={volumenEfectsLevel} efectVolumen={efectVolumen} />

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
export default Items