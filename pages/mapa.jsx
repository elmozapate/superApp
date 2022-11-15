import VolumenComponent from "./volumenComponente"

const Mapa = (props) => {
    const { volver = console.log,efectVolumen=console.log,volumenEfectsLevel={ value: 2, mute: false },  volumenLevel = { value: 2, mute: false }, setFullScreen = console.log, requestFullScreen = console.log, reboot = console.log, setGameStart = console.log, playerStage = { stage: 0 }, playerTime = { time: 0 }, playerVidas = { vidas: 5, health: 100, maxHealth: 100 }, player = { pause: false }, onMobil = false, fullScreen = false, gameStart = false, setProps = console.log, volumenSet = console.log } = props
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
                <div className="onWindow">
                    MAPA
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
export default Mapa