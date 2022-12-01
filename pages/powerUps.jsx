import VolumenComponent from "./volumenComponente";

const PowerUps = (props) => {
    const { itemsGet = {
        enUso: 'ninguno',
        array: []
    }, setObject = console.log, powerUpsGet = [], volver = console.log, efectVolumen = console.log, volumenEfectsLevel = { value: 2, mute: false }, volumenLevel = { value: 2, mute: false }, setFullScreen = console.log, requestFullScreen = console.log, reboot = console.log, setGameStart = console.log, playerStage = { stage: 0 }, playerTime = { time: 0 }, playerVidas = { vidas: 5, health: 100, maxHealth: 100 }, player = { pause: false }, onMobil = false, fullScreen = false, gameStart = false, setProps = console.log, volumenSet = console.log } = props
    return (
        <>
            <div className={onMobil ? "open open-mobil noOpacity" : "open noOpacity"}>
                <div className="game-info menu-cont">
                    <span className={(parseInt(100 / playerVidas.maxHealth) * playerVidas.health) < 30 ? "fontcolor-red" : ((parseInt(100 / playerVidas.maxHealth) * playerVidas.health) > 30) && ((parseInt(100 / playerVidas.maxHealth) * playerVidas.health) < 60) ? 'fontcolor-yellow' : 'fontcolor-green'}>SALUD:{(parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) > 0 ? (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) : 0}%</span>
                    <span>STAGE:{playerStage.stage}</span>
                    <span>NIVEL:{player.level}</span>
                    <span>VIDAS:{playerVidas.vidas}</span>
                    <span className="tiempillo">TIEMPO:{playerTime.time}</span>

                    <div></div>
                </div>
                <h1 className="fontcolor-white text-align-center">
                    PowerUps
                </h1>
                <div className="grandes menu-cont">
                    <div className="itemsBox">
                        <h1 className="fontcolor-white">Items</h1>
                        {itemsGet.array.map((key, i) => {
                            if (key.nombre !== 'ninguno') {
                                return (<>
                                    <div  key={`itemsGcascaset-${i}`} className="btn-game-menu-content">
                                        <div key={`dfdfdcscsaivs-${i}`} className="info-game-box">
                                            <h2 key={`dfdacsacasaffh2s-${i}`} className="fontcolor-white">{key.nombre}</h2>
                                            <button key={`dfcsacdffbtns-${i}`} className={key.active ? 'bgcolorInedit-green' : ''} onClick={(e) => { e.preventDefault(); setObject(`items-${key.nombre}`, key.active ? false : true, 'powerUps') }}
                                            >
                                                Estado: {key.active ? 'Activado' : 'En espera'}
                                            </button>
                                        </div>

                                        <img 
                                        key={`powcsacerUpsGesat-${i}`}
                                        src={`/items/${key.nombre}/img/btn.png`}
                                            alt={`items-${key.nombre}-btn`}
                                            width={onMobil ? '60px' : '100px'}
                                            height={onMobil ? '60px' : '100px'} />

                                    </div>

                                </>)
                            }
                        })}
                    </div>
                    <div className="itemsBox">
                        <h1 className="fontcolor-white">Power Ups</h1>
                        {powerUpsGet.map((key, i) => {
                            return (
                                <>
                                    <div key={`powerUcsaspsGet-${i}`} className="btn-game-menu-content">

                                        <div key={`fdfdfv-${i}`} className="info-game-box">
                                            <h2 key={`dfdfsfh1-${i}`} className="fontcolor-white">{key.nombre}</h2>
                                            <button key={`dfdfcfbtn-${i}`}  className={key.active ? 'bgcolorInedit-green' : ''}
                                                onClick={(e) => { e.preventDefault(); setObject(`powerUps-${key.nombre}`, key.active ? 'normal' : (key.nombre), 'powerUps') }}
                                            >
                                                Estado: {key.active ? key.nombre === 'inmortal' ? 'Activado' : 'Fumadisimo' : key.nombre !== 'inmortal' ? 'Sin Fumar' : 'En espera'}

                                            </button>
                                        </div>

                                        <img 
                                        key={`sadads-${i}`}
                                        src={`/powerUps/${key.nombre}/img/btn.png`}
                                            alt={`powerUps-${key.nombre}-btn`}
                                            width={onMobil ? '60px' : '100px'}
                                            height={onMobil ? '60px' : '100px'} />
                                    </div>
                                </>
                            )
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
export default PowerUps