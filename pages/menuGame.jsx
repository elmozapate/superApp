import { useEffect, useState } from "react"
import Image from "next/image"
import Mapa from "./mapa"
import PowerUps from "./powerUps"
import VolumenComponent from "./volumenComponente"
import Armas from "./armas"

const MenuGame = (props) => {
    const { refreshValue = console.log, inRefreshing = false, powerCuant = 0, itemsGet = {
        enUso: 'ninguno',
        array: []
    }, armasGet = {
        enUso: 'ninguna',
        array: []
    },gunsGet = {
        enUso: 'ninguna',
        array: []
    }, windowOpen = {
        active: false,
        selected: ''
    }, setwindowOpen = console.log, menuActive = false, setmenuActive = console.log, powerUpsGet = [], setObject = console.log, efectVolumen = console.log, volumenEfectsLevel = { value: 2, mute: false }, volumenLevel = { value: 2, mute: false }, setFullScreen = console.log, requestFullScreen = console.log, reboot = console.log, setGameStart = console.log, playerStage = { stage: 0 }, playerTime = { time: 0 }, playerVidas = { vidas: 5, health: 100, maxHealth: 100 }, player = { pause: false }, onMobil = false, fullScreen = false, gameStart = false, setProps = console.log, volumenSet = console.log } = props
    const [armasLabel, setArmasLabel] = useState(false)
    const [itemsLabel, setItemsLabel] = useState(false)
    const [gunsLabel, setGunsLabel] = useState(false)
    const [powerUpsLabel, setPowerUpsLabel] = useState(false)
    const goWindow = (value) => {
        setwindowOpen({
            ...windowOpen,
            active: true,
            selected: value
        })
    }
    const getBack = (value) => {
        setwindowOpen({
            ...windowOpen,
            active: false,
            selectet: ''
        })
    }

    const activeMenu = (condition) => {
        setProps('imagenes', 'onMove', menuActive);
        setmenuActive(!menuActive)

    }

    return (
        <>
            {inRefreshing ? <></> : <>
                <div className={onMobil ? `barra-items barra-items-mobil` : `barra-items`}>
                    <div className={onMobil ? 'labelBarra-mobil' : 'labelBarra'}>
                        {powerCuant === 0 && !powerUpsLabel ?
                            <>
                                <div
                                    onClick={(e) => { e.preventDefault(); setPowerUpsLabel(true) }}
                                >
                                    <p className="fontcolor-white">POWER UPS</p>
                                </div>
                            </>
                            :
                            powerUpsLabel ?
                                <div className="label-armas">
                                    {powerUpsGet.map((key, i) => {
                                        return (
                                            <div
                                                className={key.active ? ' bgcolor-green' : 'bgcolor-red'}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setObject(`powerUps-${key.nombre}`, key.active ? 'normal' : key.nombre, 'powerUps', 'barra');
                                                    refreshValue()

                                                }}
                                            >
                                                <img src={`/powerUps/${key.nombre}/img/btn.png`}
                                                    alt={`powerUps-${key.nombre}-btn`}
                                                    width={onMobil ? '40px' : '70px'}
                                                    height={onMobil ? '40px' : '70px'} />
                                            </div>
                                        )
                                    })
                                    }
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        setPowerUpsLabel(false);
                                    }}>close</button>
                                </div> :
                                powerUpsGet.map((key, i) => {
                                    if (key.active) {
                                        return (
                                            <div
                                                onClick={(e) => { e.preventDefault(); setPowerUpsLabel(!powerUpsLabel) }}>
                                                <img src={`/powerUps/${key.nombre}/img/btn.png`}
                                                    alt={`powerUps-${key.nombre}-btn`}
                                                    width={onMobil ? '40px' : '70px'}
                                                    height={onMobil ? '40px' : '70px'} />
                                            </div>
                                        )
                                    }
                                })


                        }

                    </div>
                    <div className={onMobil ? 'labelBarra-mobil' : 'labelBarra'}>
                        {(itemsGet.enUso === 'ninguno' || itemsGet.enUso === 'ninguna') && !itemsLabel ?
                            <>
                                <div
                                    onClick={(e) => { e.preventDefault(); setItemsLabel(true) }}
                                >
                                    <p className="fontcolor-white">ITEMS</p>
                                </div>
                            </>
                            :
                            <div className={onMobil ? 'labelBarra-mobil' : 'labelBarra'}>
                                {!itemsLabel ?
                                    itemsGet.array.map((key, i) => {
                                        if (key.active) {
                                            return (<div onClick={(e) => { e.preventDefault(); setItemsLabel(!itemsLabel) }}
                                            > <img
                                                    id={`labelClose`}
                                                    src={`/items/${key.nombre}/img/btn.png`}
                                                    alt={`items-${key.nombre}-btn`}
                                                    width={onMobil ? '40px' : '70px'}
                                                    height={onMobil ? '40px' : '70px'} /></div>)
                                        }
                                    })
                                    :
                                    <>{
                                        <div className="label-armas"
                                        >
                                            {itemsGet.array.map((key2, i2) => {
                                                return (<div
                                                    className={key2.active ? 'bgcolor-green' : 'bgcolor-red'}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setObject(`items-${key2.nombre}`, key2.active ? false : true, 'items', 'barra');
                                                    }}>
                                                    <img
                                                        id={`label-${i2}`}

                                                        src={`/items/${key2.nombre}/img/btn.png`}
                                                        alt={`items-${key2.nombre}-btn`}
                                                        width={onMobil ? '40px' : '70px'}
                                                        height={onMobil ? '40px' : '70px'} />
                                                </div>)
                                            })}
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                setItemsLabel(false);
                                            }}>close</button>
                                        </div>
                                    }

                                    </>

                                }
                            </div>}

                    </div>
                    <div className={onMobil ? 'labelBarra-mobil' : 'labelBarra'}>
                        {(gunsGet.enUso === 'ninguno' || gunsGet.enUso === 'ninguna') && !gunsLabel ?
                            <>
                                <div
                                    onClick={(e) => { e.preventDefault(); setGunsLabel(true) }}
                                >
                                    <p className="fontcolor-white">GUNS</p>
                                </div>
                            </>
                            :
                            <div className={onMobil ? 'labelBarra-mobil' : 'labelBarra'}>
                                {!gunsLabel ?
                                    gunsGet.array.map((key, i) => {
                                        if (key.active) {
                                            return (<div onClick={(e) => { e.preventDefault(); setGunsLabel(!gunsLabel) }}
                                            > <img
                                                    id={`labelCloseGuns`}
                                                    src={`/guns/${key.nombre}/img/btn.png`}
                                                    alt={`guns-${key.nombre}-btn`}
                                                    width={onMobil ? '40px' : '70px'}
                                                    height={onMobil ? '40px' : '70px'} /></div>)
                                        }
                                    })
                                    :
                                    <>{
                                        <div className="label-armas"
                                        >
                                            {gunsGet.array.map((key2, i2) => {
                                                return (<div
                                                    className={key2.active ? 'bgcolor-green' : 'bgcolor-red'}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setObject(`guns-${key2.nombre}`, key2.active ? false : true, 'guns', 'barra');
                                                    }}>
                                                    <img
                                                        id={`label-${i2}`}

                                                        src={`/guns/${key2.nombre}/img/btn.png`}
                                                        alt={`guns-${key2.nombre}-btn`}
                                                        width={onMobil ? '40px' : '70px'}
                                                        height={onMobil ? '40px' : '70px'} />
                                                </div>)
                                            })}
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                setGunsLabel(false);
                                            }}>close</button>
                                        </div>
                                    }

                                    </>

                                }
                            </div>}

                    </div>
                    <div className={onMobil ? 'labelBarra-mobil' : 'labelBarra'}>
                        {(armasGet.enUso === 'ninguno' || armasGet.enUso === 'ninguna' || armasGet.enUso === 'desArmado') && !armasLabel ?
                            <>
                                <div
                                    onClick={(e) => { e.preventDefault(); setArmasLabel(true) }}
                                >
                                    <p className="fontcolor-white">ARMAS</p>
                                </div>
                            </>
                            : armasLabel ?
                                <div className="label-armas"
                                >
                                    {armasGet.array.map((key2, i2) => {
                                        return (<div
                                            className={key2.active ? 'bgcolor-green' : 'bgcolor-red'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setObject(`armas-${key2.nombre}`, key2.active ? false : true, 'armas', 'barra');
                                            }}>
                                            <img
                                                id={`label-${i2}`}

                                                src={`/armas/${key2.nombre}/img/btn.png`}
                                                alt={`armas-${key2.nombre}-btn`}
                                                width={onMobil ? '40px' : '70px'}
                                                height={onMobil ? '40px' : '70px'} />
                                        </div>)
                                    })}
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        setArmasLabel(false);
                                    }}>close</button>
                                </div> : armasGet.array.map((key, i) => {
                                    return (
                                        <>{

                                            key.active ?
                                                <div onClick={(e) => { e.preventDefault(); setArmasLabel(!armasLabel) }}
                                                > <img
                                                        id={`labelClose`}
                                                        src={`/armas/${key.nombre}/img/btn.png`}
                                                        alt={`armas-${key.nombre}-btn`}
                                                        width={onMobil ? '40px' : '70px'}
                                                        height={onMobil ? '40px' : '70px'} /></div> : <></>
                                        }

                                        </>
                                    )

                                })}
                    </div>
                </div>
                <div className={onMobil ? `barra-health barra-health-mobil` : `barra-health`}>
                    <div className="barra-health-valor"><span className={`porcentaje-${(parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) > 0 ? (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) : 0}`} >
                        {(parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) > 0 ? (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) : 0}
                    </span></div>
                    <div className={`valorplus valor2-${((100 - (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) < 100) ? 100 - (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) : 100)}`}>

                    </div>
                    <div className={`valorplus valor-${(parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) > 100 ? 100 : (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) > 0 ? (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) : 0}`}>

                    </div>

                    {/* <div className="vidas">
                    {playerVidas.vidas}
                </div> */}
                </div>
                <div className={onMobil ? `close-menu close-menu-mobil` : ` close-menu `}>
                    <button className={menuActive ? 'bgcolor-red' : 'bgcolor-green'} onClick={(e) => { e.preventDefault(); activeMenu(player.pause ? true : false) }}>
                        <Image
                            src="/icons/menu.png"
                            alt="Menu"
                            width={100}
                            height={100}
                        />
                    </button>
                </div>

                <div className={` menuLayer ${menuActive ? (onMobil ? `opened opened-mobil` : 'opened') : 'closed'} `}>

                    {
                        !menuActive ?
                            <></>
                            : <>
                                {
                                    !windowOpen.active ?
                                        <div className={(onMobil ? `open open-mobil` : 'open')}>
                                            <div className="game-info menu-cont">
                                                <span className={(parseInt(100 / playerVidas.maxHealth) * playerVidas.health) < 30 ? "fontcolor-red" : ((parseInt(100 / playerVidas.maxHealth) * playerVidas.health) > 30) && ((parseInt(100 / playerVidas.maxHealth) * playerVidas.health) < 60) ? 'fontcolor-yellow' : 'fontcolor-green'}>SALUD:{(parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) > 0 ? (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) : 0}%</span>
                                                <span>STAGE:{playerStage.stage}</span>
                                                <span>NIVEL:{player.level}</span>
                                                <span>VIDAS:{playerVidas.vidas}</span>
                                                <span className="tiempillo">TIEMPO:{playerTime.time}</span>

                                                <div></div>
                                            </div>
                                            <div className="grandes menu-cont">
                                                <button onClick={(e) => { e.preventDefault(); goWindow('mapa') }}> Mapa </button>
                                                <button onClick={(e) => { e.preventDefault(); goWindow('armas') }}> Armas </button>
                                                <button onClick={(e) => { e.preventDefault(); goWindow('powerUps') }}> Power Up </button>
                                            </div>
                                            <div className=" menu-cont">
                                                <button
/*                                     className={onMobil ? "" : 'ocult'}
 */                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (fullScreen) {
                                                            setFullScreen(false)
                                                            requestFullScreen()
                                                        } else {
                                                            setFullScreen(true);
                                                            requestFullScreen()
                                                        }
                                                    }}>{fullScreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN'}</button>
                                                <button
/*                                     className={gameStart ? "" : 'ocult'}
 */                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        reboot();
                                                        setGameStart(false);
                                                        if (fullScreen) {
                                                            setFullScreen(false)
                                                            requestFullScreen()
                                                        };

                                                    }}>{'EXIT'}</button>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); activeMenu(true) }}
                                                >Continue</button>
                                                <VolumenComponent volumenSet={volumenSet} volumenLevel={volumenLevel} volumenEfectsLevel={volumenEfectsLevel} efectVolumen={efectVolumen} />
                                            </div>
                                        </div> : <>
                                            {
                                                windowOpen.selected ===  'mapa' ? <><Mapa volver={getBack} setFullScreen={setFullScreen} requestFullScreen={requestFullScreen} reboot={reboot} setGameStart={setGameStart} player={player} onMobil={onMobil} fullScreen={fullScreen} gameStart={gameStart} setProps={setProps} playerStage={playerStage} playerTime={playerTime} playerVidas={playerVidas} volumenSet={volumenSet} volumenLevel={volumenLevel} efectVolumen={efectVolumen} volumenEfectsLevel={volumenEfectsLevel} /></> : <></>
                                            }
                                            {
                                                windowOpen.selected === 'armas' ? <><Armas gunsGet={gunsGet} armasGet={armasGet} setObject={setObject} volver={getBack} setFullScreen={setFullScreen} requestFullScreen={requestFullScreen} reboot={reboot} setGameStart={setGameStart} player={player} onMobil={onMobil} fullScreen={fullScreen} gameStart={gameStart} setProps={setProps} playerStage={playerStage} playerTime={playerTime} playerVidas={playerVidas} volumenSet={volumenSet} volumenLevel={volumenLevel} efectVolumen={efectVolumen} volumenEfectsLevel={volumenEfectsLevel} /></> : <></>
                                            }
                                            {
                                                windowOpen.selected === 'powerUps' ? <><PowerUps itemsGet={itemsGet} powerUpsGet={powerUpsGet} setObject={setObject} volver={getBack} setFullScreen={setFullScreen} requestFullScreen={requestFullScreen} reboot={reboot} setGameStart={setGameStart} player={player} onMobil={onMobil} fullScreen={fullScreen} gameStart={gameStart} setProps={setProps} playerStage={playerStage} playerTime={playerTime} playerVidas={playerVidas} volumenSet={volumenSet} volumenLevel={volumenLevel} efectVolumen={efectVolumen} volumenEfectsLevel={volumenEfectsLevel} /></> : <></>
                                            }
                                        </>
                                }

                            </>
                    }
                </div>

            </>}
        </>
    )
}
export default MenuGame