import MobileDetect from "mobile-detect";
import { useEffect, useState } from "react";
import armasEst from "./armasEst";
import BotonesJuego from "./botonesJuego";
import ChargeComponent from "./chargeComponent";
import Colisonador from "./colisionador";
import ColisionBasica from "./colisionBasica";
import CrearItems, { CrearItemsWorld, LosFondos, Plataforma, PropsImage } from "./crearItems";
import GamePad from "./gamePad";
import InteractiveBotonCanvas from "./InteractiveBtnCanvas";
import MenuGame from "./menuGame";
import ProtoPlataforma from "./prototiposSprites/protoPlataforma";
import VolumenComponent from "./volumenComponente";
/*      
     -------------------------- VARIABLES  ---------------------------------------
*/
let off = true, oImgW = 0, oImgH = 0, charged = false, muted = false, auxPlataformas = [], imagenesBody = {}, inPause = false, initing = true, chargedLevel = [], colisioned = {
    state: false,
    item: 0,
    result: 'live'
}, obst = [], itemsImage = { jetPack: [], patineta: [] }, lazyImg = [], mapFloor = 150, actualFloorLimit = { state: false, x1: 0, x2: 300, y: mapFloor }, onPunalSound = true, inShot = false, timeOfgame = 0, actualFloor = 150, lastDireccion = 'xf', plataformaFalses = [],
    armas = {
        bat: {},
        otroBat: {},
        desArmado: {},
        lata: {}
    }, audioPlaying = 0, obtenerOrientacion = console.log, audioPp, actualVidas = 5, mxActive = false, myActive = false, fantasmas = [], dibujarMalos = {
        die: false, last: [], new: []
    }, mxDirection = { left: false, right: false }, auxnow = 0, gameStage = 1, proyectiles = [], malosFalses = [{ posX: 150, posY: 0, widthX: 0, heightY: 0, }], dropsFalses = [], levelFalses = [{ posX: 150, posY: 0, widthX: 0, heightY: 0, }], proyectilesFalses = [], proyectilesImg = { malos: [], balas: [] }, imagenesSrc = [`/img/finales/foto-de-anime-4.png`, `/img/finales/foto-de-anime-3.png`, `/img/finales/foto-de-anime-2.png`, `/img/finales/foto-de-anime-1.png`, `/img/finales/foto-de-anime-0.png`], soundToch = false, itemsImageAux = {}, soundLevels = { sfx: 2, music: 2 }, inPausetouch = false, fondos = LosFondos, inLayer = 0, propsImage = PropsImage, propsAction = { onPlataform: true, onDrop: false, speedLevel: 1, strikeLevel: 1, jumping: false, gravity: true, eating: false, jumpLevel: 1.10, gravityLevel: 1.10 }, canvas, levelGo = 1, ctx, imgArray = [], onHitSoundNow = false,
    imagenA, canvasC, ctxC, canvasB, ctxB, canvasD, ctxD, canvasE, ctxE, ctxF, canvasF, imagenes = [{ onMove: false }], worldItems = [], timeRestart = false, levelDificulty = 20
/* ----------------------------------------------------------------------------------- */

let sfxObject = {
    risabebe: true, llantobebe: true, muertebebe: true, joshisound: true, joshisound2: true, joshisound3: [true, true, true, true], pow: true, balaSound: true, WeaponAudio: [true, true], itemsSound: [], yaWey: true, jump: true, pass: true, sierra: true, dolor: true, onHitSound: true, portraitAudio: true
}

const Test2 = () => {
    /*      
         -------------------------- CONSTANTES  ---------------------------------------
    */
    const [windowOpen, setwindowOpen] = useState({
        active: false,
        selected: ''
    })
    const plataformas = Plataforma(mapFloor)
    const [volumenLevel, setVolumenLevel] = useState({ value: 2, mute: false })
    const [volumenEfectsLevel, setVolumenEfectsLevel] = useState({ value: 2, mute: false })
    const [menuActive, setmenuActive] = useState(false)
    const [getOut, setgetOut] = useState(false)
    const [sinCargar, setSinCargar] = useState(true)
    const [powerCuant, setPowerCuant] = useState(0)
    const [inRefreshing, setInRefreshing] = useState(0)
    const [ejes, setEjes] = useState({ alpha: 0, beta: 0, gamma: 0 })
    const [dificulty, setDificulty] = useState(10)
    const [nowStage, setNowStage] = useState({
        color: 'green',
        stage: 0
    })
    const [powerUpsGet, setPowerUpsGet] = useState([{ nombre: 'inmortal', active: false }, { nombre: 'fumado', active: false }])
    const [armasGet, setArmasGet] = useState({
        enUso: 'desArmado',
        array: [{ nombre: 'lata', active: false, obtenida: true }, { nombre: 'desArmado', active: false, obtenida: true }, { nombre: 'bat', active: false, obtenida: true }, { nombre: 'otroBat', active: false, obtenida: true }]
    })
    const [gunsGet, setGunsGet] = useState({
        enUso: 'ninguna',
        array: [{ nombre: 'revolver', active: false, obtenida: true }]
    })
    const [itemsGet, setItemsGet] = useState({
        enUso: 'ninguno',
        array: [{ nombre: 'jetPack', active: false, obtenida: true }, { nombre: 'patineta', active: false, obtenida: true }]
    })
    const [gameStart, setGameStart] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const [stateImage, setStateImage] = useState({
        onMove: false, direccion: 'xf', posX: -1, width: 1080, height: 720, level: 1, onMobil: false
    })
    const [playerGo, setPlayerGo] = useState({ go: false })
    const [playerStage, setPlayerStage] = useState({ stage: 0 })
    const [playerVidas, setPlayerVidas] = useState({ vidas: 5, maxHealth: 50, health: 50 })
    const [playerTime, setPlayertime] = useState({ time: 0, timeRestart: false })
    const [player, setPlayer] = useState({
        pause: false,
        level: 0,
    })
    const [playerOnDrop, setplayerOnDrop] = useState({ state: false })
    const [onMobil, setOnMobil] = useState(false)
    const [salto, setsalto] = useState({
        gravity: true,
        jumping: false,
        posY: mapFloor,
        myActive: false
    })
    /* ----------------------------------------------------------------------------------- */
    /*      
            --------------------------EFECTOS DE SONIDO---------------------------------------
    */
    const returnCharge = (retornado) => {
        console.log(retornado);
        const retobst = retornado.obst || []
        const retArmas = retornado.armas || {}
        const retPlayerImg = retornado.playerImg || {}
        const retItemsImg = retornado.itemsImg || {}
        const retProyectilesImg = retornado.proyectilesImg || {}
        const retOnHitImg = retornado.onHitImg || {}
        const retMalosImg = retornado.malosImg || {}
        proyectilesImg = retProyectilesImg
        lazyImg = retOnHitImg
        obst = retobst
        armas = {
            ...retArmas,
        }
        const retSfx = retornado.sfx || []
        retSfx.map((key, i) => {
            if (key.tipo === 'sfx') {
                let elnombre = ''
                elnombre = key.nombre
                let elnombreArray = key.nombre.split('_')
                let elNombre1 = elnombreArray[0] || ''
                let elNombre2 = parseInt(elnombreArray[1]) || 0
                if (!(elnombreArray.length > 1)) {
                    sfxObject[`${elNombre1}`] = key.archivo
                } else {
                    sfxObject[`${elNombre1}`][elNombre2] = key.archivo
                }
            }
        })
        imagenesBody = retPlayerImg
        itemsImage = retItemsImg
        let createItems = CrearItems(imagenesBody, levelGo > 0 ? 0 : 10, mapFloor)
        imagenes[0] = { imagen: imagenesBody, onMove: true }
        propsImage = {
            ...propsImage,
            imagen: imagenesBody,
            posY: mapFloor - (parseInt(oImgH)),
            widthX: oImgW,
            heightY: oImgH,
            fotograma: 0,
            direccion: 'xs',
            lastDireccion: 'xf',
            onMove: false,
            id: 0,
            layer: 0,
            jumping: false,
            gravity: true,
            items: createItems
        }
        const soundDatas = ['bat', 'otroBat', 'desArmado', 'lata']
        soundDatas.map((key, i) => {
            armas[key].sound = []
            for (let index = 0; index < 3; index++) {
                const element = new Audio(`/armas/${key}/audio/hit-${index}.mp3`);
                armas[key].sound.push(element)
                let kills = new Image
                kills.src = `/kills/explocion/explocion-explocion-xf-0.png`
                kills.onload = (() => {
                    let oImgW = kills.naturalWidth
                    let oImgH = kills.naturalHeight
                    armas[key].kills.push({
                        id: Math.floor(Math.random() * 25555555555555),
                        imagen: kills,
                        widthX: oImgW / 10,
                        heightY: oImgH / 10,
                    })
                })
            }
            const valorarArma = armasEst(key)
            armas[key] = {
                ...armas[key],
                ...valorarArma
            }
        })
        charged = true
        worldItems = CrearItemsWorld(imagenesBody, levelGo, retMalosImg, mapFloor, obst[0])
        setgetOut(true)
        setSinCargar(false)
    }

    const reboot = () => {
        ctxB.clearRect(0, 0, canvasB.width, canvasB.height)
        ctxC.clearRect(0, 0, canvas.width, canvas.height)
        ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
        ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
        fantasmas = [],
            setPlayerVidas({
                ...playerVidas,
                vidas: 5
            })
        setPlayerStage({
            stage: 0
        })
        setPlayerGo({
            ...playerGo,
            go: false
        })
        setPlayer({
            ...player,
            level: 0
        })
        setGameStart(false)
        setDificulty(10)
        setStateImage({
            onMove: false, direccion: 'xf', posX: -1, width: 1080, height: 720, level: 1, onMobil: false
        })
        setNowStage({
            color: 'green',
            stage: 0
        })
        off = true; actualVidas = 5;
        mxActive = false;
        myActive = false;
        dibujarMalos = {
            die: false, last: [], new: []
        };
        mxDirection = { left: false, right: false };
        auxnow = 0;
        gameStage = 1;
        proyectiles = [];
        malosFalses = [{ posX: 150, posY: 0, widthX: 0, heightY: 0, }];
        levelFalses = [{ posX: 150, posY: 0, widthX: 0, heightY: 0, id: 0 }];
        proyectilesFalses = [];
        imagenesSrc = [`/img/finales/foto-de-anime-4.png`, `/img/finales/foto-de-anime-3.png`, `/img/finales/foto-de-anime-2.png`, `/img/finales/foto-de-anime-1.png`, `/img/finales/foto-de-anime-0.png`];
        fondos = LosFondos;
        inLayer = 0;
        propsImage = PropsImage;
        propsAction = { onPlataform: true, onDrop: false, speedLevel: 1, strikeLevel: 1, jumping: false, gravity: true, eating: false, jumpLevel: 1.10, gravityLevel: 1.10 };
        levelGo = 1;
        imgArray = [];
        imagenes = [{ onMove: false }];
        worldItems = [];
        timeRestart = false;
        levelDificulty = 10


    }
    const aparecer = (level) => {
        let otraImagen = new Image()
        ctxB = canvasB.getContext('2d')
        ctxB.clearRect(0, 0, canvasB.width, canvasB.height)
        otraImagen.src = imagenesSrc[fondos.length - 1]
        otraImagen.onload = (() => {
            ctxB.save();
            ctxB.clearRect(0, 0, canvasB.width, canvasB.height)
            ctxB.translate(15, 110);
            ctxB.rotate(Math.PI / 2);
            ctxB.textAlign = 'right';
            ctx.textBaseline = "middle";
            const ctext = `Mundo${level} Lv-${(5 - fondos.length)}`.split("").join(String.fromCharCode(8202))
            ctxB.font = "20px Arial";
            ctxB.fillStyle = "blue";
            ctxB.strokeStyle = 'white';
            ctxB.fillText(ctext, 30, 8)
            ctxB.strokeText(ctext, 30, 8)
            ctxB.restore();
            ctxB.stroke()
            ctxB.font = "40px Arial";
            ctxB.fillStyle = "red";
            ctxB.strokeStyle = 'purple';
            ctxB.fillText('FIN', 210, 110)
            ctxB.drawImage(otraImagen, 135, 70, 100, 75)
            ctxB.strokeText('FIN', 210, 110)
            ctxB.stroke()
        })
    }
    const refreshValue = () => {
        setInRefreshing(true)
        let activePowerUps = 0
        powerUpsGet.map((key) => {
            if (key.active) {
                activePowerUps = activePowerUps + 1
            }
        })
        setPowerCuant(activePowerUps)
        setTimeout(() => {
            setInRefreshing(false)

        }, 20);
    }
    const setLevelDificulty = (id, value) => {
        if (id === 'dificulty') {
            const newValue = value === '+' ? (levelDificulty < 40 ? levelDificulty * 2 : levelDificulty + 40) :
                value === '-' ? ((levelDificulty > 40) ? levelDificulty - 40 : levelDificulty / 2) : levelDificulty
            levelDificulty = newValue
            setDificulty(newValue)
            fondos = []
            let theValue = (newValue < 40 ? newValue / 10 : (newValue / 40 + 2))
            gameStage = theValue
            for (let index = (theValue - 1); index < LosFondos.length; index++) {
                const element = LosFondos[index];
                fondos.push(element)
            }
            setNowStage({
                color: fondos[0],
                stage: gameStage
            })


        }
        if (id === 'level') {
            const newLevel = value === '+' ? player.level + 1 : player.level - 1
            inLayer = newLevel
            setStateImage({
                ...stateImage,
                posX: newLevel === 0 ? -1 : newLevel
            })
            propsImage.posX = (newLevel * 30) + 1
            setPlayer({
                ...player,
                level: newLevel
            })
        }
        if (id === 'stage') {
            /*   setPlayerStage({
                  stage: value === '+' ? playerStage.stage + 1 : playerStage.stage - 1
              }) */
            levelGo = value + 1

        }
        if (id === 'vidas') {
            actualVidas = value
        }
    }
    const laFunt = (props, posFix) => {
        let aDibujar = (props.imagen[`body_${propsImage.direccion === 'xs' && props.posY < mapFloor ? 'xj' : propsImage.direccion}_${propsAction.gravity && props.posY < mapFloor ? parseInt(props.layer / (8 * 4)) < 2 ? parseInt(props.layer / (8 * 4)) + 2 : parseInt(props.layer / (8 * 4)) : !propsAction.gravity && props.posY < mapFloor ? parseInt(props.layer / (8 * 4)) > 1 ? parseInt(props.layer / (8 * 4)) - 2 : parseInt(props.layer / (8 * 4)) : parseInt(props.layer / (8 * 4))}`])
        let newModel = props
        if (newModel.layer < (24 * 4)) {
            newModel.layer = newModel.layer + 1
        } else { newModel.layer = 0 }
        newModel.direccion = 'xs'
        ctxE.drawImage(aDibujar, props.posX, props.posY, props.widthX, parseInt(props.heightY))
        if (propsImage.levelPass) {
            setTimeout(() => {
                ctxE.clearRect(0, 0, canvas.width, canvas.height)
                laFunt(props, posFix)
            }, 5);
        }
    }
    const startTime = () => {
        if (!off) {
            if (imagenes[0].onMove) {
                timeOfgame = timeOfgame + 1
                setPlayertime({
                    ...playerTime,
                    timeRestart: false,
                    time: timeOfgame
                })

            }
            setTimeout(() => {
                startTime()
            }, 1000);
        }

    }
    const requestFullScreen = () => {
        if (fullScreen) {
            document.exitFullscreen()
                .then(() => console.log("Document Exited from Full screen mode"))
                .catch((err) => console.error(err))
        } else {
            let el = document.body;

            // Supports most browsers and their versions.
            let requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
                || el.mozRequestFullScreen || el.msRequestFullScreen;

            if (requestMethod) {

                // Native full screen.
                requestMethod.call(el);
            } else if (typeof window.ActiveXObject !== "undefined") {

                // Older IE.
                let wscript = new ActiveXObject("WScript.Shell");

                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        }
    }
    const initApp = () => {
        audioPp = document.getElementById('gameTrack')
        timeOfgame = 0

        obtenerOrientacion()
        setStateImage({
            ...stateImage,
            width: window.screen.width,
            height: window.screen.height
        })
        imagenA = new Image()
        imagenA.src = '/img/body/body-x-fs-0.png'
        canvasB = document.getElementById('canvas-Fn')
        ctxB = canvasB.getContext('2d')
        canvasC = document.getElementById('canvas-It')
        ctxC = canvasC.getContext('2d')
        canvasD = document.getElementById('canvas-ItObj')
        ctxD = canvasD.getContext('2d')
        canvasE = document.getElementById('canvas-ItMalo')
        ctxE = canvasE.getContext('2d')
        canvasF = document.getElementById('canvas-ItPlatform')
        ctxF = canvasF.getContext('2d')
        canvas = document.getElementById('canvas-Pp')
        ctx = canvas.getContext('2d')
        aparecer(levelGo)
        dibujar();
        keyListener(document)
        volumenSet()
        efectVolumen()
        startTime(0)
        falsesMuros()
        makeStage(true)
    }
    const keyListener = () => {
        document.addEventListener('keydown', async (event) => {
            event.preventDefault();
            let keyValue = event.key;
            if (keyValue === 'ArrowUp') {
                if (!armas[armasGet.enUso].state) {
                    armas[armasGet.enUso].state = true
                }
            }
            if (keyValue === 'j') {
                setObject('items-jetPack', itemsGet.enUso === 'jetPack' ? false : true, 'items', 'key')
                refreshValue()

            }
            if (keyValue === 'k') {
                setObject('items-patineta', itemsGet.enUso === 'patineta' ? false : true, 'items', 'key')
                refreshValue()

            }
            if (keyValue === 'g') {
                if (!inShot) {
                    inShot = true
                    disparar()
                    setTimeout(() => {
                        inShot = false
                    }, 300);
                }


            }
            if (keyValue === '1' || keyValue === '2' || keyValue === '3' || keyValue === '4') {
                switch (keyValue) {
                    case '1':
                        setObject(`armas-desArmado`, armasGet.enUso === 'desArmado' ? false : true, 'items', 'key')
                        break;
                    case '2':
                        setObject(`armas-bat`, armasGet.enUso === 'bat' ? false : true, 'items', 'key')
                        break;
                    case '3':
                        setObject(`armas-otroBat`, armasGet.enUso === 'otroBat' ? false : true, 'items', 'key')
                        break;
                    case '4':
                        setObject(`armas-lata`, armasGet.enUso === 'lata' ? false : true, 'items', 'key')
                        break;

                    default:
                        break;
                }

                refreshValue()

            }
            if (keyValue === 'm') {
                if (!muted) {
                    muted = true
                    efectVolumen(false, 'mute')
                    volumenSet('mute')
                }
                else {
                    muted = false

                    efectVolumen(false, '+')
                    volumenSet('+')

                }

            }
            if (keyValue === '+') {
                if (!soundToch) {
                    soundToch = true
                    if (soundLevels.sfx < 10) {
                        efectVolumen(false, '+', true)
                    }
                    if (soundLevels.music < 10) {
                        volumenSet('+', true)
                    }
                }
            }
            if (keyValue === '-') {
                if (!soundToch) {
                    soundToch = true
                    if (soundLevels.sfx > 0) {
                        efectVolumen(false, '-', true)
                    }
                    if (soundLevels.music > 0) {
                        volumenSet('-', true)
                    }
                }
            }
            if (keyValue === 'p') {
                if (!inPausetouch) {
                    inPausetouch = true
                    inPause = !inPause
                    setProps('imagenes', 'onMove', !inPause);
                    setmenuActive(inPause)
                }

            }
            if (keyValue === 's') {
                setObject('powerUps-inmortal', propsImage.items[0].health.estado !== 'normal' ? 'normal' : 'inmortal', 'powerUps', 'key')
                refreshValue()

            }
            if (keyValue === 'w') {
                setObject('powerUps-fumado', propsAction.strikeLevel === 1 ? 'normal' : 'fumado', 'powerUps', 'key')
                refreshValue()

            }
            if (keyValue === 'e') {

                if (propsAction.onDrop) {
                    try {
                        propsAction.eating = propsAction.eating ? false : true
                    } catch (error) {
                        console.log(error);
                    }
                }

            }
            if (keyValue === 'ArrowDown') {
                mxActive = true
                mxDirection = {
                    ...mxDirection,
                    left: false,
                    right: false
                }
                propsImage = {
                    ...propsImage,
                    direccion: 'xd',
                }
                propsAction = {
                    ...propsAction,
                    gravityLevel: 2.5,
                }
            }
            if (keyValue === 'ArrowRight' && !mxActive && !mxDirection.left) {
                if (itemsGet.enUso === 'patineta' && charged) {
                    sfxObject.itemsSound[1].play()
                }
                mxActive = true
                mxDirection = {
                    ...mxDirection,
                    left: false,
                    right: true
                }
                propsImage = {
                    ...propsImage,
                    direccion: 'xf',
                }
                lastDireccion = 'xf'
                dibujarMouseOn('+', true)
            } else {
                if ((keyValue === 'ArrowRight' && mxActive)) {
                    if (itemsGet.enUso === 'patineta') {
                        sfxObject.itemsSound[1].play()
                    }
                    propsImage = {
                        ...propsImage,
                        direccion: 'xf',
                    }
                    lastDireccion = 'xf'
                    mxDirection = {
                        ...mxDirection,
                        left: false,
                        right: true
                    }
                } else
                    if ((keyValue === 'ArrowRight' && mxActive && mxDirection.left)) {
                        if (itemsGet.enUso === 'patineta' && charged) {
                            sfxObject.itemsSound[1].play()
                        }
                        propsImage = {
                            ...propsImage,
                            direccion: 'xf',
                        }

                        lastDireccion = 'xf'
                        mxDirection = {
                            ...mxDirection,
                            left: false,
                            right: true
                        }
                    }
            }
            if (keyValue === 'ArrowLeft' && !mxActive) {
                if (itemsGet.enUso === 'patineta' && charged) {
                    sfxObject.itemsSound[1].play()
                }
                mxActive = true
                dibujarMouseOn('-', true)
                propsImage = {
                    ...propsImage,
                    direccion: 'xb',
                }
                lastDireccion = 'xb'
            } else {
                if ((keyValue === 'ArrowLeft' && mxActive)) {
                    if (itemsGet.enUso === 'patineta' && charged) {
                        sfxObject.itemsSound[1].play()
                    }
                    propsImage = {
                        ...propsImage,
                        direccion: 'xb',
                    }
                    lastDireccion = 'xb'
                    mxDirection = {
                        ...mxDirection,
                        left: true,
                        right: false
                    }
                } else
                    if ((keyValue === 'ArrowLeft' && mxActive && mxDirection.left)) {
                        if (itemsGet.enUso === 'patineta' && charged) {
                            sfxObject.itemsSound[1].play()
                        }
                        propsImage = {
                            ...propsImage,
                            direccion: 'xb',

                        }
                        lastDireccion = 'xb'
                        mxDirection = {
                            ...mxDirection,
                            left: true,
                            right: false
                        }
                    }
            }
            if (keyValue === ' ' && !myActive) {
                if (itemsGet.enUso === 'jetPack') {
                    actualFloorLimit.y = mapFloor
                    actualFloorLimit.state = false
                    propsAction.jumping = true
                    propsAction.onPlataform = false
                    actualFloor = mapFloor
                }
                myActive = true
                brincar()
            }
        }, false);
        document.addEventListener('keyup', (event) => {
            event.preventDefault()
            let keyValue = event.key;
            if (keyValue === 'p') {
                if (inPausetouch) {
                    inPausetouch = false
                }

            }
            if (keyValue === '+') {
                if (soundToch) {
                    soundToch = false
                }
            }
            if (keyValue === '-') {
                if (soundToch) {
                    soundToch = false
                }
            }
            if (keyValue === 'g') {
                sfxObject.balaSound.volume = 0
            }
            if (keyValue === ' ') {
                if (itemsGet.enUso === 'jetPack' && charged) {
                    actualFloorLimit.y = mapFloor
                    actualFloorLimit.state = false
                    propsAction.gravity = true
                    propsAction.jumping = true
                    propsAction.onPlataform = false
                    sfxObject.itemsSound[0].pause()
                    myActive = false

                }

            } else {
                if (mxActive && (keyValue === 'ArrowLeft' || keyValue === 'ArrowRight' || keyValue === 'ArrowDown')) {
                    if (itemsGet.enUso === 'patineta' && charged) {
                        sfxObject.itemsSound[1].pause()
                    }
                    if (keyValue === 'ArrowDown') {
                        propsImage = {
                            ...propsImage,
                            direccion: 'xs'
                        }
                        mxDirection = {
                            ...mxDirection,
                            left: false,
                            right: false
                        }
                        mxActive = false
                        propsAction = {
                            ...propsAction,
                            gravityLevel: 1.10,
                        }
                    }
                    if ((!mxDirection.right && keyValue === 'ArrowLeft')) {
                        mxActive = false
                        propsImage = {
                            ...propsImage,
                            direccion: 'xs'
                        }
                        mxDirection = {
                            ...mxDirection,
                            left: false,
                            right: false
                        }
                        mxActive = false
                    }
                    if ((!mxDirection.left && keyValue === 'ArrowRight')) {
                        mxActive = false
                        propsImage = {
                            ...propsImage,
                            direccion: 'xs'
                        }
                        mxDirection = {
                            ...mxDirection,
                            left: false,
                            right: false
                        }
                        mxActive = false
                    }
                    if ((mxDirection.right && keyValue === 'ArrowLeft')) {
                        propsImage = {
                            ...propsImage,
                            direccion: 'xf',
                        }
                        mxDirection = {
                            ...mxDirection,
                            left: false,
                            right: true
                        }
                    }
                    if ((mxDirection.left && keyValue === 'ArrowRight')) {
                        propsImage = {
                            ...propsImage,
                            direccion: 'xb',
                            lastDireccion: 'xb'
                        }
                        mxDirection = {
                            ...mxDirection,
                            left: true,
                            right: false
                        }
                    }
                    else if ((mxDirection.left && keyValue === 'ArrowRight')) {
                        propsImage = {
                            ...propsImage,
                            direccion: 'xb',
                        }
                        mxDirection = {
                            ...mxDirection,
                            left: true,
                            right: false
                        }
                    }
                }
            }
        }, false);
    }
    const makeStage = (create, recharge) => {
        if (recharge) {
            setTimeout(() => {
                for (let index = 0; index < worldItems.length; index++) {
                    const element = worldItems[index];
                    if (element.layerOnDisplay === inLayer && element.displayneed
                    ) {
                        if (element.type === 'obj') {
                            const randomNumber = element.randomNumber

                            ctxD.drawImage(obst[randomNumber], element.posX, element.posY, obst[randomNumber].naturalWidth / 14, obst[randomNumber].naturalHeight / 25)
                        }
                    }
                }
            }, 50);
        }
        if (create) {
            dibujarMalos.die = false
            malosFalses = []
            proyectiles = []
            proyectilesFalses = []
            levelFalses = []
            dibujarMalos.new = []
            dibujarMalos.last = []
            for (let index = 0; index < worldItems.length; index++) {
                const element = worldItems[index];
                dibujarMalos.last.push(element)
                if (element.layerOnDisplay === inLayer
                ) {
                    if (element.type === 'obj') {
                        const randomNumber = element.randomNumber
                        levelFalses.push({
                            killLayer: 0,
                            fotograma: 0,
                            randomNumber: randomNumber,
                            randomImage: randomNumber,
                            imagen: obst[randomNumber],
                            killImagen: randomNumber === 0 ? obst[3] : obst[randomNumber],
                            posX: element.posX > 290 ? 280 : element.posX,
                            posY: element.posY,
                            widthX: element.widthX,
                            heightY: element.heightY,
                            id: element.id,
                            damage: element.damage
                        })
                        ctxD.drawImage(obst[randomNumber], element.posX, element.posY, obst[randomNumber].naturalWidth / 14, obst[randomNumber].naturalHeight / 25)
                    } else {
                        if (element.type === 'npc') {
                            dibujarMalos.new.push(element)
                        }
                    }
                    /*   levelFalses.map((key, i) => {
                          dibujarMalos.new.map((key2, i2) => {
                              if ((key.posX + key.widthX > key2.posX) && (key.posX + key.widthX < key2.posX + key2.widthX) || (key.posX + key.widthX < key2.posX && (key.posX > key2.posX))) {
                                  dibujarMalos.new[i2].posX = dibujarMalos.new[i2].posX - 35
                              }
      
                          })
                      }) */
                }
            }
        } else {
            proyectiles = []
            fantasmas = []
            levelFalses = []
            malosFalses = []
            proyectilesFalses = []
            ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
            dibujarMalos.new = []
            for (let index = 0; index < dibujarMalos.last.length; index++) {
                const element = dibujarMalos.last[index];
                if (element.layerOnDisplay === inLayer && element.displayneed
                ) {
                    if (element.type === 'obj') {
                        const randomNumber = element.randomNumber
                        levelFalses.push({
                            killLayer: 0,
                            fotograma: 0,
                            randomNumber: randomNumber,
                            randomImage: randomNumber,
                            imagen: obst[randomNumber],
                            killImagen: randomNumber === 0 ? obst[3] : obst[randomNumber],
                            posX: element.posX > 290 ? 280 : element.posX,
                            posY: element.posY,
                            widthX: element.widthX,
                            heightY: element.heightY,
                            id: element.id,
                            damage: element.damage
                        })
                        ctxD.drawImage(obst[randomNumber], element.posX, element.posY, obst[randomNumber].naturalWidth / 14, obst[randomNumber].naturalHeight / 25)
                    } else {
                        if (element.type === 'npc') {
                            dibujarMalos.new.push(element)
                        }
                    }
                }
            }
            if (inLayer !== 0) {
                /*     propsImage.items[0].posY = (actualFloor - parseInt(propsImage.heightY))
                    setTimeout(() => {
                        propsImage.items[0].posY = (actualFloor - parseInt(propsImage.items[0].heightY))
                        propsImage.posY = (actualFloor - parseInt(propsImage.heightY))
                        propsAction = {
                            ...propsAction,
                            jumping: false,
                            gravity: true
                        }
                        imagenes[0].onMove = false
                        setTimeout(() => {
                            imagenes[0].onMove = true
                            propsImage.items[0].posX = value === '+' ? 1 : 299
                            setPlayerGo({
                                ...playerGo,
                                go: true
                            })
 
                            dibujar('go', propsImage)
                        }, 2000);
                    }, 10); */
            } else {
                setPlayerGo({
                    ...playerGo,
                    go: true
                })
            }
        }
        setPlayerGo({
            ...playerGo,
            go: true
        })
    }
    const moverCanvas = (die) => {
        falsesMuros()
        let value = '?'
        if (((propsImage.posX) - (propsImage.posX.toFixed()) / 30) - ((propsImage.posX) - (propsImage.posX.toFixed()) / 30).toFixed() > 0) {
            value = '+'
        } else {
            value = '-'
        }
        if (die === true) {
            setPlayerGo({
                ...playerGo,
                go: false
            })
            imagenes[0].onMove = true
            propsImage.posX = 10
            propsImage.refreshData = false
            propsImage.levelPass = false
            initing = true
            inLayer = 0
            setStateImage({
                ...stateImage,
                onMove: false,
                direccion: 'xs',
                posX: -1,
                width: 1080,
                height: 720,
                level: levelGo
            })
        }
        else {
            inLayer = die ? 0 : value === '-' ? (((((propsImage.posX - .5) / 30).toFixed()) * 1) - 1) : ((((propsImage.posX + .5) / 30).toFixed()) * 1) === 0 ? -1 : (((propsImage.posX + .5) / 30).toFixed()) * 1
        }
        setPlayer({
            ...player,
            level: inLayer,
        })
        if (inLayer === 11 && gameStage === 5 && levelGo === 5) {
            window.alert('melo papi ganaste')
        } else {
            if (inLayer === 11) {
                let otraImagen2 = new Image()
                otraImagen2.src = `/img/enemigos/joshi/joshi-xf.png`
                otraImagen2.onload = (() => {
                    worldItems = CrearItemsWorld(imagenesBody, levelGo, imgArray, mapFloor, obst[0])
                    initing = true
                    audioPp.src = ''
                    sfxObject.pass.play()
                    imagenes[0].onMove = false
                    propsImage.levelPass = true
                    ctxD.save();
                    ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                    ctxD.fillText('BRAVISIMO', 30, 50)
                    ctxD.strokeText(`BRAVISIMO`, 30, 50)
                    ctxD.restore();
                    ctxD.stroke();
                    auxnow = auxnow + 1
                    const lastProp = propsImage
                    laFunt(lastProp, 90)
                    makeStage(true)
                    setPlayerStage({
                        ...playerStage,
                        stage: gameStage
                    })
                    setStateImage({
                        ...stateImage,
                        posX: 11
                    })
                    setDificulty(levelDificulty)
                    if (levelGo === 5) {
                        ctxB.clearRect(0, 0, canvasB.width, canvasB.height)
                        levelDificulty = levelDificulty < 40 ? levelDificulty * 2 : levelDificulty + 40
                        fondos = fondos.slice(1, fondos.length)
                        gameStage = gameStage + 1

                        setTimeout(() => {
                            setPlayer({
                                ...player,
                                level: 0
                            })
                            setStateImage({
                                ...stateImage,
                                onMove: false,
                                direccion: 'xs',
                                posX: -1,
                                width: 1080,
                                height: 720,
                                level: levelGo
                            })
                            setNowStage({
                                ...nowStage,
                                color: fondos[0],
                                stage: nowStage.stage + 1
                            })
                            levelGo = 1
                        }, 4500);
                        setPlayerVidas({
                            ...playerVidas,
                            health: playerVidas.maxHealth,
                            vidas: playerVidas.vidas + 3
                        })
                    } else {
                        levelGo = levelGo + 1
                    }
                })
                setTimeout(() => {
                    ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                    propsImage.refreshData = true
                    propsImage.alive = false
                    aparecer(levelGo)

                    initing = true
                    setPlayerStage({
                        ...playerStage,
                        stage: levelGo - 1
                    })
                    setStateImage({
                        ...stateImage,
                        posX: -1
                    })
                    imagenes[0].onMove = true

                    setPlayer({
                        ...player,
                        level: 0
                    })
                    propsImage.alive = true
                    setPlayerGo({
                        ...playerGo,
                        go: true
                    })
                    timeRestart = false
                    propsImage.posX = 0
                    propsImage.items[0].posX = 0
                    propsImage.direccion = 'xs'
                    propsImage.levelPass = false
                    propsImage.refreshData = false
                    propsImage.alive = true
                    inLayer = 0
                    makeStage(true)
/*                     dibujar('go', propsImage)
 */                    setTimeout(() => {
                        setHalfVolume(levelGo)
                    }, 1000);
                }, 5000);
            } else {
                ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                levelFalses = []
                makeStage(false)
                /*       if ( die) {
                          chargedLevel = []
                          propsImage.items[0].posX = 0
                          propsImage.posX = 0
                          dibujar('go', propsImage)
                          let toChange = propsImage.items[0]
                          toChange.posX = 0
                          let whileAux = []
                          whileAux.push(toChange)
                          whileAux.push(worldItems)
                          propsImage.items = whileAux
                          propsImage.refreshData = false
                          propsImage.levelPass = false
                          propsImage.alive = true
                          propsImage.posX = 0
                          propsImage.direccion = 'xs'
                          levelGo = levelGo + 1
                      } */
                propsImage.items[0].posX = die ? 10 : value === '+' ? 1 : 299
                setStateImage({
                    ...stateImage,
                    posX: die ? -1 : propsImage.refreshData ? -1 : value === '-' ? (((((propsImage.posX - .5) / 30).toFixed()) * 1) - 1) === 0 ? -1 : (((((propsImage.posX - .5) / 30).toFixed()) * 1) - 1) : ((((propsImage.posX + .5) / 30).toFixed()) * 1) === 0 ? -1 : (((propsImage.posX + .5) / 30).toFixed()) * 1
                })
            }
        }
    }
    const setProps = (value1, value2, value3) => {
        if (value1 === 'imagenes') {
            imagenes[0].onMove = value3
            setPlayer({
                ...player,
                pause: value3
            })
/*             value3 ? dibujar('go', propsImage) : console.log
 */        }
        if (value1 === 'itemsSound') {
            if (value2 === 'jetPack' && charged && !value3) {
                sfxObject.itemsSound[0].pause()

            }
            if (value2 === 'patineta' && charged && !value3) {
                sfxObject.itemsSound[1].pause()

            }
            if (value2 === 'jetPack' && charged && value3) {
                sfxObject.itemsSound[0].play()

            }
            if (value2 === 'patineta' && charged && value3) {
                sfxObject.itemsSound[1].play()

            }
        }
        if (value1 === 'propsAction' || value1 === 'propsImage' || value1 === 'mxDirection') {
            if (value1 === 'mxDirection') {
                if (value2 === 'all') {
                    mxDirection = {
                        ...mxDirection,
                        left: value3,
                        right: value3,
                    }
                }
            }
            if (value1 === 'propsImage') {
                propsImage = {
                    ...propsImage,
                    [value2]: value3,
                }
            }
            if (value1 === 'propsAction') {
                propsAction = {
                    ...propsAction,
                    [value2]: value3,
                }
            }
        } else {
            if (value1 === 'lastDireccion') {
                lastDireccion = value3
            }
            if (value1 === 'mxActive') {
                mxActive = value3
            }
            if (value1 === 'armas') {
                armas[armasGet.enUso][value2] = value3
            }
        }
    }
    /* ----------------------------------------------------------------------------------- */
    /*      
        --------------------------EFECTOS DE SONIDO---------------------------------------
    */
    const efectVolumen = (start = false, value, inKey = false, inMenu = false) => {
        if (charged) {
            if (!off && charged) {
                if (!inMenu) {
                    sfxObject.yaWey.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.portraitAudio.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.WeaponAudio[0].volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.WeaponAudio[1].volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.balaSound.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.llantobebe.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.joshisound.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.joshisound2.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.onHitSound.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.pow.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.sierra.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.dolor.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.risabebe.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.muertebebe.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.pass.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.jump.volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    let newJoshiSound = []
                    sfxObject.joshisound3.map((key, i) => {
                        newJoshiSound[i] = key
                        newJoshiSound[i].volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    })
                    sfxObject.joshisound3 = newJoshiSound
                    sfxObject.itemsSound[0].volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    sfxObject.itemsSound[1].volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                    const soundDatas = ['bat', 'otroBat', 'desArmado', 'lata']
                    soundDatas.map((key, i) => {
                        for (let index = 0; index < armas[key].sound.length; index++) {
                            if (armas[key].sound[index] && armas[key].sound[index].volume) {
                                armas[key].sound[index].volume = start ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10) : value === 'mute' ? (volumenEfectsLevel.mute ? (inKey ? soundLevels.sfx : volumenEfectsLevel.value) / 10 : 0) : (value === '+' ? ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5) : ((inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5)) / 10
                            }
                        }
                    })

                }
            }
            if (value === 'mute') {
                setVolumenEfectsLevel({
                    ...volumenEfectsLevel,
                    mute: !volumenEfectsLevel.mute,
                })
            }
            if (value === '+') {
                setVolumenEfectsLevel({
                    ...volumenEfectsLevel,
                    value: (inKey ? soundLevels.sfx : volumenEfectsLevel.value) + .5,
                    mute: false
                })
                soundLevels = {
                    ...soundLevels,
                    sfx: soundLevels.sfx + .5
                }
            }
            if (value === '-') {
                setVolumenEfectsLevel({
                    ...volumenEfectsLevel,
                    value: (inKey ? soundLevels.sfx : volumenEfectsLevel.value) - .5,
                    mute: false
                })
                soundLevels = {
                    ...soundLevels,
                    sfx: soundLevels.sfx - .5
                }
            }
        }

    }
    const setHalfVolume = (pista, value = 'no', inKey = false, inMenu = false) => {
        if (value === 'no') {
            audioPp.volume = (inKey ? soundLevels.music : volumenLevel.value) / 10;
            audioPp.src = `/audio/gameSound-${pista ? pista - 1 : playerStage.stage}.mp3`

        }
        if (value === 'mute') {
            inMenu ? console.log : audioPp.volume = !volumenLevel.mute ? 0 : (volumenLevel.value) / 10;
            setVolumenLevel({
                ...volumenLevel,
                mute: !volumenLevel.mute
            })
        }
        if (value === '-' && (inKey ? soundLevels.music : volumenLevel.value) > 0) {
            inMenu ? console.log : audioPp.volume = ((inKey ? soundLevels.music : volumenLevel.value) - .5) / 10;
            setVolumenLevel({
                ...volumenLevel,
                value: (inKey ? soundLevels.music : volumenLevel.value) - .5, mute: false
            })
            soundLevels = {
                ...soundLevels,
                music: soundLevels.music - .5
            }
        }
        if (value === '+' && (inKey ? soundLevels.music : volumenLevel.value) < 10) {
            inMenu ? console.log : audioPp.volume = ((inKey ? soundLevels.music : volumenLevel.value) + .5) / 10;
            setVolumenLevel({
                ...volumenLevel,
                value: (inKey ? soundLevels.music : volumenLevel.value) + .5, mute: false
            })
            soundLevels = {
                ...soundLevels,
                music: soundLevels.music + .5
            }
        }

    }
    const volumenSet = (value, inkey = false, inMenu = false) => {
        setHalfVolume(levelGo, value, inkey, inMenu)
    }
    /* ----------------------------------------------------------------------------------- */
    /*      
        --------------------------Aciones---------------------------------------
    */
    const setObject = (action, value, division, modo) => {
        if (!modo || (modo !== 'key' && modo !== 'barra')) {
            setPlayerGo({
                ...playerGo,
                go: false
            })
            imagenes[0].onMove = true
/*             dibujar('go', propsImage)
 */        }
        if (action.split('-')[0] === 'powerUps') {
            if (action.split('-')[1] === 'inmortal') {
                let inOtorg = powerUpsGet
                inOtorg.map((key, i) => {
                    if (key.nombre === 'inmortal') {
                        inOtorg[i].active = !inOtorg[i].active
                    }
                })
                setPowerUpsGet(inOtorg)
                propsImage.items[0].health = {
                    ...propsImage.items[0].health,
                    estado: value
                }
            }
            if (action.split('-')[1] === 'fumado') {
                let inOtorg = powerUpsGet
                let activenow = false
                inOtorg.map((key, i) => {
                    if (key.nombre === 'fumado') {
                        activenow = !inOtorg[i].active
                        inOtorg[i].active = !inOtorg[i].active
                    }
                })
                setPowerUpsGet(inOtorg)
                if (activenow) {
                    propsAction = {
                        ...propsAction,
                        strikeLevel: 10
                    }
                } else {
                    propsAction = {
                        ...propsAction,
                        strikeLevel: 1
                    }
                }
            }
        }

        if (action.split('-')[0] === 'armas') {
            let nomArma = action.split('-')[1]
            let inOtorg = armasGet
            if (modo === 'barra') {
                inOtorg.enUso = nomArma
                let suposis = -1
                inOtorg.array.map((key, i) => {
                    if (key.nombre === nomArma) {
                        suposis = i
                    }
                    inOtorg.array[i].active = false
                })
                if (suposis !== -1) {
                    inOtorg.array[suposis].active = true
                }
            } else {
                if (nomArma === armasGet.enUso && armasGet.enUso !== 'desArmado') {
                    inOtorg.enUso = 'desArmado'
                    inOtorg.array.map((key, i) => {
                        if (key.nombre === nomArma) {
                            inOtorg.array[i].active = false
                        }
                        if (key.nombre === 'desArmado') {
                            inOtorg.array[i].active = true
                        }
                    })
                } else {
                    inOtorg.enUso = nomArma
                    inOtorg.array.map((key, i) => {
                        if (key.nombre === nomArma) {
                            inOtorg.array[i].active = true
                        } else {
                            inOtorg.array[i].active = false
                        }
                    })
                }
            }
            setArmasGet(inOtorg)
        }
        if (action.split('-')[0] === 'items') {
            let itemNom = action.split('-')[1]
            let inOtorg = itemsGet
            if (itemNom === itemsGet.enUso) {
                inOtorg.enUso = 'ninguno'
                inOtorg.array.map((key, i) => {
                    if (key.nombre === itemNom) {
                        inOtorg.array[i].active = false
                        darItem({ key: itemNom, value: false })
                    }
                })
            } else {
                inOtorg.enUso = itemNom
                inOtorg.array.map((key, i) => {
                    if (key.nombre === itemNom) {
                        inOtorg.array[i].active = true
                        darItem({ key: itemNom, value: true })
                    } else {
                        darItem({ key: key.nombre, value: false })
                        inOtorg.array[i].active = false
                    }
                })
            }
            setItemsGet(inOtorg)
        }
        if (action.split('-')[0] === 'guns') {
            let nomArma = action.split('-')[1]
            let inOtorg = gunsGet
            if (modo === 'barra') {
                let suposis = -1
                inOtorg.array.map((key, i) => {
                    if (key.nombre === nomArma && nomArma !== gunsGet.enUso && nomArma !== 'ninguna') {
                        suposis = i
                    } else {
                        inOtorg.enUso = 'ninguna'
                        inOtorg.array[i].active = false
                    }
                })
                if (suposis !== -1) {
                    gunsGet.array.map((key, i) => {
                        if (suposis === i) {
                            inOtorg.array[i].active = true
                            inOtorg.enUso = nomArma
                        }
                    })
                }
            } else {
                if (nomArma === gunsGet.enUso && gunsGet.enUso !== 'ninguna') {
                    inOtorg.enUso = 'ninguna'
                    inOtorg.array.map((key, i) => {
                        inOtorg.array[i].active = false
                    })
                } else {
                    inOtorg.enUso = nomArma
                    inOtorg.array.map((key, i) => {
                        if (key.nombre === nomArma) {
                            inOtorg.array[i].active = true
                        } else {
                            inOtorg.array[i].active = false
                        }
                    })
                }
            }
            setGunsGet(inOtorg)
        }
        if (!modo || (modo !== 'key' && modo !== 'barra')) {
            setTimeout(() => {
                setPlayerGo({
                    ...playerGo,
                    go: true
                })
                imagenes[0].onMove = false
                setmenuActive(true)
                setwindowOpen({
                    ...windowOpen,
                    active: true,
                    selected: division
                })
                setGameStart(true)
            }, 100);
        }
    }
    const darItem = (props) => {
        switch (props.key) {
            case 'jetPack':
                propsAction = {
                    ...propsAction,
                    jumpLevel: props.value ? 2.8 : 1.10
                }
                break;
            case 'fumado':
                propsAction = {
                    ...propsAction,
                    strikeLevel: props.value ? 4 : 1
                }
                break;
            case 'patineta':
                propsAction = {
                    ...propsAction,
                    speedLevel: props.value ? 2 : 1
                }
                break;

            default:
                break;
        }

    }
    const disparar = () => {
        try {
            sfxObject.balaSound.play()
            sfxObject.balaSound.loop = true
            sfxObject.balaSound.volume = 1
            let imgUsed = proyectilesImg.balas
            let efectRandom = parseInt(Math.random() * 2)
            proyectiles.push({
                id: `${'player-shot'}-${parseInt(Math.random() * 500)}-proy`,
                damageFor: 'npc',
                health: 22,
                hitdirection: lastDireccion,
                hitDamage: 0,
                state: 'live',
                imagen: imgUsed,
                type: 'gun',
                posX: !propsImage.direccion === 'xf' ? propsImage.items[0].posX - 60 : propsImage.items[0].posX + 10,
                posY: (propsImage.posY) + 15,
                widthX: imgUsed[0].naturalWidth / 30,
                heightY: imgUsed[0].naturalHeight / 30,
                direccion: propsImage.direccion !== 'xb' && propsImage.direccion !== 'xf' ? lastDireccion : propsImage.direccion,
                speed: 4,
                efectDirection: efectRandom === 0 ? 'up' : 'down',
                damage: 20,
            })
            setTimeout(() => {
                sfxObject.balaSound.volume = 0
            }, 300);
        } catch (error) {

        }

    }
    const comer = () => {
        propsAction.eating = true
        setplayerOnDrop({ state: false })
    }
    const brincar = () => {
        myActive = true
        propsAction.jumping = true
        propsAction.gravity = false
        setsalto(setSaltoFunt())
        if (charged) {
            switch (itemsGet.enUso) {
                case 'jetPack':
                    sfxObject.itemsSound[0].loop = true
                    sfxObject.itemsSound[0].play()
                    break;
                case 'patineta':
                    sfxObject.itemsSound[1].loop = true
                    sfxObject.itemsSound[1].play()
                    break;
                case 'ninguna':
                    sfxObject.jump.play()
                    break;
                case 'ninguno':
                    sfxObject.jump.play()
                    break;
                default:
                    break;
            }
            if (itemsGet.enUso !== 'jetPack') {
                setTimeout(() => {
                    propsAction.jumping = true
                    propsAction.gravity = true
                    sfxObject.jump.pause();
                    sfxObject.jump.currentTime = 0;
                    setsalto(setSaltoFunt())
                    /* setTimeout(() => {
                        if (propsImage.posY + parseInt(propsImage.heightY) < actualFloor) {
                            propsAction = {
                                ...propsAction,
                                jumping: true,
                                gravity: true
                            }
                            myActive = false
                            setsalto(setSaltoFunt())
                        } else {
                            propsAction = {
                                ...propsAction,
                                jumping: false,
                                gravity: true
                            }
                            myActive = false
                            setsalto(setSaltoFunt())
                        }
        
        
                    }, 400); */
                }, (onMobil ? 1000 : 400));
            }
        }


    }
    const dibujarMouseOn = (value, secondValue) => {
        if (value === 'up') {
            brincar()
        }
        if (value === '+') {
            propsImage = {
                ...propsImage,
                onMove: true,
                direccion: 'xf',

            }
            lastDireccion = 'xf'

        } else {
            if (value === '-') {
                propsImage = {
                    ...propsImage,
                    onMove: true,
                    direccion: 'xb',
                }
                lastDireccion = 'xb'
            }
        }
    }
    const setSaltoFunt = () => {
        return (
            {
                gravity: propsAction.gravity,
                jumping: propsAction.jumping,
                posY: propsImage.posY,
                myActive: myActive
            })
    }
    const morir = () => {
        dibujarMalos.die = true
        setNowStage({
            color: fondos[0],
            stage: 0
        })
        imagenes[0].onMove = false
        if (actualVidas > 1 && !imagenes[0].onMove) {
            setPlayerGo({
                ...playerGo,
                go: false
            })
            actualVidas = actualVidas - 1
            propsImage.items[0].health.nivel = 50
            propsImage.posX = 0
            propsImage.items[0].posX = 0
            setTimeout(() => {
                propsImage.posX = 0
                propsImage.items[0].posX = 0
                propsImage.posY = (mapFloor - parseInt(propsImage.heightY))
                inLayer = 0
                imagenes[0].onMove = true
                setStateImage({
                    ...stateImage,
                    posX: -1
                })
                levelFalses = []
                malosFalses = []
                proyectilesFalses = []
                malosFalses = []
                dibujarMalos.die = false
                inLayer = 0
                ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                moverCanvas(true)
                setPlayerGo({
                    ...playerGo,
                    go: true
                })
                setHalfVolume(levelGo)
                colisioned.result = 'live'
                colisioned.state = false
                setPlayerVidas({
                    ...playerVidas,
                    vidas: actualVidas,
                    health: propsImage.items[0].health.nivel
                })

/*                 dibujar('go', propsImage)
 */                propsImage.alive = true
                armas[armasGet.enUso].onHit = false
            }, 5000);
        } else {
            laFunt(propsImage, propsImage.items[0].posX)
            setTimeout(() => { reboot() }, 6000);
        }
    }
    /* ----------------------------------------------------------------------------------- */
    /*      
        -------------------------- Colisiones ---------------------------------------
    */
    const falsesMuros = async () => {
        plataformaFalses = []
        auxPlataformas = []
        ctxF.clearRect(0, 0, canvasF.width, canvasF.height)
        plataformas.map((key) => {
            if (key.layerOnDisplay === parseInt(inLayer)
            ) {
                ctxF.beginPath()
                ctxF.fillStyle = 'brown'
                ctxF.fillRect(key.posX, key.posY, key.widthX, key.heightY)
                ctxF.closePath()
                auxPlataformas.push(key)
            }
        })
        for (let index = 0; index < auxPlataformas.length; index++) {
            const element = auxPlataformas[index];
            const res = await ProtoPlataforma(element)
            if (res) {
                plataformaFalses.push({
                    ...element,
                    falses: res
                })
            }
        }
    }
    const colisonadoTrue = async () => {
        if (colisioned.result === 'die') {
            let itsMalo = false
            let indexHere = 0
            let position = { malo: 0, body: 0 }
            dibujarMalos.new.map((key, i) => {
                if (colisioned.item === key.id) {
                    key.imagen.map((key2, ia) => {
                        if (key2.direccion === `evil_${key.posX < propsImage.items[0].posX ? 'xf' : 'xb'}_${key.killLayer}`) {
                            itsMalo = true
                            indexHere = i
                            position.malo = ia;
                            dibujarMalos.new[i].killFotograma = dibujarMalos.new[i].killFotograma + 1;
                            if (dibujarMalos.new[i].killFotograma === 30) {
                                dibujarMalos.new[i].killLayer = dibujarMalos.new[i].killLayer + 1
                                dibujarMalos.new[i].killFotograma = 0
                            }
                            if (dibujarMalos.new[i].killLayer === 4) {
                                dibujarMalos.new[i].killLayer = 1
                            }
                        }
                    })
                }
            })
            if (itsMalo) {
                ctxC.clearRect(0, 0, canvas.width, canvas.height)
                /*         ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                 */        ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                ctxE.drawImage(dibujarMalos.new[indexHere].imagen[position.malo].imagen, dibujarMalos.new[indexHere].posX, dibujarMalos.new[indexHere].posY - 2, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalWidth / 22, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalHeight / 27)
                let aDibujar = propsImage.imagen[`die_${dibujarMalos.new[indexHere].posX > propsImage.items[0].posX ? 'xb' : 'xf'}_0`]
                ctxC.drawImage(aDibujar, dibujarMalos.new[indexHere].posX < propsImage.items[0].posX ? dibujarMalos.new[indexHere].posX + dibujarMalos.new[indexHere].widthX - 5 : dibujarMalos.new[indexHere].posX - propsImage.widthX + 5, dibujarMalos.new[indexHere].posY, propsImage.widthX, parseInt(propsImage.heightY))
            } else {
                let isProy = false
                let proy = 'no es proyectil'
                proyectiles.map((key, i) => {
                    if (colisioned.item === key.id) {
                        proy = key
                        isProy = true
                    }
                })
                if (isProy) {
                    console.log
                } else {
                    let posObst = 0
                    let isObst = false
                    let obstacule = 'no es obstaculo'
                    levelFalses.map((key, i) => {
                        if (colisioned.item === key.id) {
                            obstacule = key
                            posObst = i
                            isObst = true
                        }
                    })
                    if (isObst) {
                        if (levelFalses[posObst].fotograma === 7) {
                            if (levelFalses[posObst].killLayer < 3) {
                                levelFalses[posObst].killLayer = obstacule.killLayer + 1
                            } else {
                                levelFalses[posObst].killLayer = 0
                            }
                            levelFalses[posObst].fotograma = 0
                        } else {
                            levelFalses[posObst].fotograma = levelFalses[posObst].fotograma + 1
                        }

                        let posXuse = levelFalses[posObst].killLayer === 2 || levelFalses[posObst].killLayer === 3 ? levelFalses[posObst].posX + 2 : levelFalses[posObst].posX
                        let posYuse = levelFalses[posObst].killLayer === 1 || levelFalses[posObst].killLayer === 2 ? levelFalses[posObst].posY - 2 : levelFalses[posObst].posY
                        if (levelFalses[posObst].killLayer === 3) {
                            ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                            ctxE.drawImage(obst[2], posXuse + ((Math.random() * 10) - 10), posYuse + ((Math.random() * 2) - 2) - 12.5, obst[2].naturalWidth / 20, obst[2].naturalHeight / 32)
                        }
                        ctxC.clearRect(0, 0, canvas.width, canvas.height)
                        ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                        ctxD.drawImage(obstacule.killImagen, posXuse, posYuse, obstacule.killImagen.naturalWidth / 14, obstacule.killImagen.naturalHeight / 25)
                        let aDibujar = propsImage.imagen[`cuted_${lastDireccion}_${obstacule.killLayer}`]
                        ctxC.drawImage(aDibujar, posXuse - 5, posYuse - 10, 30, 25)
                        if (propsImage.posX > (341 - 0.5)) {
                            setTimeout(() => {
                                propsImage.posX = 0
                                moverCanvas(false)
                            }, 4000);
                        }
                    }
                }
            }
        }
        if (colisioned.result === 'live' || colisioned.result === 'rewind') {
            if (colisioned.result === 'live') {
                colisioned.result = 'rewind'
                setTimeout(() => {
                    ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                    propsImage.posX = propsImage.posX - 2
                    propsImage.items[0].posX = propsImage.items[0].posX - 20
                    propsImage.posX = propsImage.posX - 2
                    propsImage.items[0].posX = propsImage.items[0].posX - 20
                    imagenes[0].onMove = true
                    colisioned.state = false
                    colisioned.result = 'live'
                    makeStage(false, true)
                    audioPp.play()
                }, 3000);
            }
            let itsMalo = false
            let indexHere = 0
            let position = { malo: 0, body: 0 }
            dibujarMalos.new.map((key, i) => {
                if (colisioned.item === key.id) {
                    key.imagen.map((key2, ia) => {
                        if (key2.direccion === `onHit_${key.posX > propsImage.items[0].posX ? 'xf' : 'xb'}_${dibujarMalos.new[i].killLayer}`) {
                            itsMalo = true
                            indexHere = i
                            position.malo = ia;
                            dibujarMalos.new[i].killFotograma = dibujarMalos.new[i].killFotograma + 1;
                            if (dibujarMalos.new[i].killFotograma === 30) {
                                dibujarMalos.new[i].killLayer = dibujarMalos.new[i].killLayer + 1
                                dibujarMalos.new[i].killFotograma = 0
                            }
                            if (dibujarMalos.new[i].killLayer === 4) {
                                dibujarMalos.new[i].killLayer = 1
                            }
                        }
                    })
                }
            })
            if (itsMalo) {
                ctxC.clearRect(0, 0, canvas.width, canvas.height)
                ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                ctxE.drawImage(dibujarMalos.new[indexHere].imagen[position.malo].imagen, dibujarMalos.new[indexHere].posX, dibujarMalos.new[indexHere].posY, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalWidth / 22, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalHeight / 27)
                let aDibujar = propsImage.imagen[`die_${dibujarMalos.new[indexHere].posX > propsImage.items[0].posX ? 'xf' : 'xb'}_${0}`]
                ctxC.drawImage(aDibujar, dibujarMalos.new[indexHere].posX < propsImage.items[0].posX ? dibujarMalos.new[indexHere].posX + dibujarMalos.new[indexHere].widthX - 5 : dibujarMalos.new[indexHere].posX - propsImage.widthX + 5, dibujarMalos.new[indexHere].posY - (dibujarMalos.new[indexHere].killLayer < 2 ? (parseInt(dibujarMalos.new[indexHere].heightY) / 2) : (parseInt(dibujarMalos.new[indexHere].heightY) / 4)), propsImage.widthX, parseInt(propsImage.heightY))

            } else {
                let isProy = false
                let proy = 'no es proyectil'
                proyectiles.map((key, i) => {
                    if (key.damageFor === 'player' && colisioned.item === key.id) {
                        proy = key
                        isProy = true
                    }
                })
                if (isProy) {
                    console.log
                } else {
                    let posObst = 0
                    let isObst = false
                    let obstacule = 'no es obstaculo'
                    levelFalses.map((key, i) => {
                        if (colisioned.item === key.id) {
                            obstacule = key
                            posObst = i
                            isObst = true
                        }
                    })
                    if (isObst) {
                        if (levelFalses[posObst].fotograma === 7) {
                            if (levelFalses[posObst].killLayer < 3) {
                                levelFalses[posObst].killLayer = obstacule.killLayer + 1
                            } else {
                                levelFalses[posObst].killLayer = 0
                            }
                            levelFalses[posObst].fotograma = 0
                        } else {
                            levelFalses[posObst].fotograma = levelFalses[posObst].fotograma + 1
                        }
                        let posXuse = levelFalses[posObst].killLayer === 2 || levelFalses[posObst].killLayer === 3 ? levelFalses[posObst].posX + 2 : levelFalses[posObst].posX
                        let posYuse = levelFalses[posObst].killLayer === 1 || levelFalses[posObst].killLayer === 2 ? levelFalses[posObst].posY - 2 : levelFalses[posObst].posY
                        if (levelFalses[posObst].killLayer === 3) {
                            ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                            ctxE.drawImage(obst[2], posXuse + ((Math.random() * 10) - 10), posYuse + ((Math.random() * 2) - 2) - 12.5, obst[2].naturalWidth / 20, obst[2].naturalHeight / 32)
                        }
                        ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                        ctxC.clearRect(0, 0, canvas.width, canvas.height)
                        ctxD.drawImage(obstacule.killImagen, posXuse, posYuse, obstacule.killImagen.naturalWidth / 14, obstacule.killImagen.naturalHeight / 25)
                        let aDibujar = propsImage.imagen[`cuted_${lastDireccion}_${obstacule.killLayer}`]
                        ctxC.drawImage(aDibujar, posXuse - 5, posYuse - 10, 30, 25)

                    }
                }
            }
            /* {
              imagenes[0].onMove = false
              propsImage.posX = propsImage.posX - 5
              propsImage.items[0].posX = propsImage.items[0].posX - 50
              propsImage.posX = propsImage.posX - 5
              propsImage.items[0].posX = propsImage.items[0].posX - 50
              colisioned.result = 'rewind'
              ctxC.clearRect(0, 0, canvas.width, canvas.height)
              setTimeout(() => {
                  imagenes[0].onMove = true
                  colisioned.state = false
                  colisioned.result = 'live'
                  audioPp.play()
  
                  dibujar('go', propsImage)
              }, 3000);} */
        }
        imagenes[0].onMove = true
        return { status: true }
    }

    /* ----------------------------------------------------------------------------------- */
    /*      
        -------------------------- Funcion Principal ---------------------------------------
    */
    const dibujar = async () => {
        if (colisioned.state) {
            const tratarO = await colisonadoTrue()
            if (tratarO && tratarO.status) {
            }
        } else {
            ctxC.clearRect(0, 0, canvas.width, canvas.height)
/*         ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
 */        ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
            const tratar = await colisionadoFalse()
            if (tratar && tratar.status) {
            }
        }
        requestAnimationFrame(dibujar)

    }
    const colisionadoFalse = async () => {
        if (propsImage.posX <= (350 - 0.5) && imagenes[0].onMove) {
            if (propsImage.posY + parseInt(propsImage.heightY) >= mapFloor && propsAction.gravity) {
                propsAction.gravity = true
                propsAction.jumping = false
                actualFloorLimit.state = false
                actualFloor = mapFloor
                myActive = false
                propsAction.onPlataform = true
                propsImage.posY, propsImage.items[0].posY = mapFloor - parseInt(propsImage.heightY)
                actualFloorLimit.y = mapFloor
            }
            if (actualFloor - propsImage.heightY <= propsImage.posY && propsAction.gravity) {
                if (!actualFloorLimit.state) {
                    actualFloor, actualFloorLimit.y = mapFloor
                }

            }

            if (actualFloorLimit.state && propsAction.gravity) {

                if ((propsImage.items[0].posX + propsImage.widthX < actualFloorLimit.x1 + 1.1) && (actualFloorLimit.x2 > propsImage.items[0].posX)) {
                    actualFloor = mapFloor
                    actualFloorLimit.y = mapFloor
                    actualFloorLimit.state = false
                    propsAction.gravity = true
                    propsAction.jumping = true
                    propsAction.onPlataform = false
                    myActive = true

                }
                if ((actualFloorLimit.x1 < propsImage.items[0].posX) && actualFloorLimit.x2 < propsImage.items[0].posX) {
                    actualFloor = mapFloor
                    actualFloorLimit.state = false
                    propsAction.gravity = true
                    propsAction.jumping = true
                    propsAction.onPlataform = false
                    actualFloorLimit.y = mapFloor
                    myActive = true

                }
                if (actualFloorLimit.y - propsImage.heightY <= propsImage.posY && propsAction.gravity) {
                    myActive = false
                }
            }
            let aDibujar = propsAction.eating && propsAction.onDrop ? propsImage.imagen[`body_${propsImage.direccion === 'xf' || propsImage.direccion === 'xb' ? propsImage.direccion : 'xf'}_eat_${parseInt(propsImage.layer / (8 * 4)) < 2 ? parseInt(propsImage.layer / (8 * 4)) + 2 : parseInt(propsImage.layer / (8 * 4))}`] : armas[armasGet.enUso].state ? armas[armasGet.enUso].body : (propsImage.imagen[`body_${propsImage.direccion === 'xs' && propsImage.posY + parseInt(propsImage.heightY) < actualFloor ? 'xj' : propsImage.direccion}_${propsAction.gravity && propsImage.posY < actualFloor ? parseInt(propsImage.layer / (8 * 4)) < 2 ? parseInt(propsImage.layer / (8 * 4)) + 2 : parseInt(propsImage.layer / (8 * 4)) : !propsAction.gravity && propsImage.posY < actualFloor ? parseInt(propsImage.layer / (8 * 4)) > 1 ? parseInt(propsImage.layer / (8 * 4)) - 2 : parseInt(propsImage.layer / (8 * 4)) : parseInt(propsImage.layer / (8 * 4))}`])
            let psx = 0, Itemss = propsImage.items
            const chokeObj = await Colisonador(malosFalses, levelFalses, propsImage, false, false, false, false, inLayer)
            if (chokeObj) {
                if (chokeObj.choke) {
                    if (dibujarMalos.new[chokeObj.pos].canMove.lastChoke < 200) {
                        dibujarMalos.new[chokeObj.pos].canMove.direccion === 'xf' && dibujarMalos.new[chokeObj.pos].posX < 280 ? dibujarMalos.new[chokeObj.pos].posX + 30 : dibujarMalos.new[chokeObj.pos].posX > 30 ? dibujarMalos.new[chokeObj.pos].posX - 30 : dibujarMalos.new[chokeObj.pos].posX + 30
                    } else {
                        dibujarMalos.new[chokeObj.pos].canMove.direccion = dibujarMalos.new[chokeObj.pos].canMove.direccion === 'xf' ? 'xb' : 'xf'
                        dibujarMalos.new[chokeObj.pos].canMove.lastChoke = 0
                    }
                }
                let isArmed = armas[armasGet.enUso].state
                const chokePlayer = await ColisionBasica(propsImage.items[0], levelFalses, propsImage, true, malosFalses, proyectilesFalses, plataformaFalses, ctxF, isArmed, inLayer, dropsFalses)
                let plataformaColision = { eje: '', state: false, valor: '' }
                if (chokePlayer) {
                    if (chokePlayer.state) {
                        for (let indd = 0; indd < chokePlayer.array.length; indd++) {
                            if (chokePlayer.array[indd].a === 'plataforma') {
                                /*  mxDirection.right = false
                                 mxDirection.left = false
                                 mxActive = false */
                                const colisionPlataforma = await Colisonador(propsImage.items[0], plataformaFalses, propsImage, true, true, ctxD, chokePlayer.array[indd].a)
                                if (colisionPlataforma) {
                                    if (propsAction.jumping && colisionPlataforma.state) {
                                        let point = (colisionPlataforma.array[0].b.colision).split('-')
                                        if (point[0] === 'x') {
                                            /*  if (point[1] === 'xb') {
                                                 if (propsImage.direccion === 'xf' || propsImage.direccion === 'xf') {
                                                     propsImage.items[0].posX = propsImage.items[0].posX - ((1.25 / (40 * (1 / (levelDificulty)))))
                                                     propsImage.posX = propsImage.posX - ((0.125 / (40 * (1 / (levelDificulty)))))
                                                 }
                                                 plataformaColision = { eje: 'x', state: true, valor: 'xb' }
                                             } else {
                                                 if (propsImage.direccion === 'xb' || propsImage.direccion === 'xb') {
                                                     propsImage.items[0].posX = propsImage.items[0].posX + ((1.25 / (40 * (1 / (levelDificulty)))))
                                                     propsImage.posX = propsImage.posX + ((0.125 / (40 * (1 / (levelDificulty)))))
                                                 }
                                                 plataformaColision = { eje: 'x', state: true, valor: 'xf' }
                                             } */
                                        }
                                        if (point[0] === 'y') {
                                            /*  if (point[1] === 'xs') {
                                                 plataformaColision = { eje: 'y', state: true, valor: 'xd' }
                                                 propsAction.gravity = true
                                                 propsAction.jumping = false
                                                 actualFloor = mapFloor
                                             } */
                                            if (point[1] === 'xd') {
                                                if (propsAction.jumping) {
                                                    let thePos = (
                                                        colisionPlataforma.array[0].b.fatherPosY
                                                    )
                                                    actualFloorLimit = { state: true, x1: colisionPlataforma.array[0].b.fatherPosX + (propsImage.widthX / 2), x2: colisionPlataforma.array[0].b.fatherPosX + colisionPlataforma.array[0].b.widthX - (propsImage.widthX / 2), y: colisionPlataforma.array[0].b.fatherPosY }
                                                    actualFloor = thePos
                                                    propsImage.items[0].posY, propsImage.posY = colisionPlataforma.array[0].b.fatherPosY - parseInt(propsImage.heightY)/*  - (propsAction.jumpLevel / (onMobil ? (40 * (1 / (levelDificulty))) : 1)) */
                                                    /* - (propsAction.jumpLevel / (onMobil ? (40 * (1 / (levelDificulty))) : 1)) */
                                                    propsAction.onPlataform = true
                                                    propsAction.gravity = true
                                                    propsAction.jumping = false
                                                }
                                            }
                                        }
                                    } else {
                                        if (!propsAction.jumping) {
                                            myActive = false
                                        }
                                    }
                                    imagenes[0].onMove = true
                                }
                            } else {
                                let hiter = chokePlayer.array[indd].c ? (chokePlayer.array[indd].c === 'trues' ? 'bueno' : 'malo') : (chokePlayer.array[indd].b.id.split('-')[chokePlayer.array[indd].b.id.split('-').length - 1])
                                if (hiter === ('malo') || hiter === ('proy') || hiter === ('obst') || hiter === ('bueno')) {
                                    if (hiter === 'obst') {
                                        hiter = chokePlayer.array[indd].b.randomNumber === 0 ? 'obstA' : 'obstB'
                                    }
                                    if (((hiter === 'malo' || hiter === 'bueno') && chokePlayer.array[indd].c)) {
                                        if (hiter === 'malo') {
                                            if (!onHitSoundNow) {
                                                onHitSoundNow = true
                                                armas[armasGet.enUso].sound[parseInt(Math.random() * 3)].play()
                                                setTimeout(() => {
                                                    onHitSoundNow = false
                                                }, 5000);
                                            }
                                            /* onHitSound.play() */
                                            if (dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'die' && dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'spirit' && dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'onDie') {
                                                dibujarMalos.new[chokePlayer.array[indd].b.pos].state = 'hit'
                                                if (!armas[armasGet.enUso].onHit) {
                                                    dibujarMalos.new[chokePlayer.array[indd].b.pos].health = dibujarMalos.new[chokePlayer.array[indd].b.pos].health - ((armas[armasGet.enUso].damage * parseInt(Math.random() * 3) + 1) * propsAction.strikeLevel)
                                                    dibujarMalos.new[chokePlayer.array[indd].b.pos].lazy = { state: true, counter: 0 }
                                                    sfxObject.joshisound2.play()
                                                    if (dibujarMalos.new[chokePlayer.array[indd].b.pos].health < 0) {
                                                        sfxObject.pow.play()
                                                        armas[armasGet.enUso].onHit = true
                                                        sfxObject.joshisound3[2].play()
                                                        dibujarMalos.new[chokePlayer.array[indd].b.pos].state = 'onDie'
                                                        setTimeout(() => {
                                                            armas[armasGet.enUso].onHit = false
                                                        }, 1000);
                                                    } else {
                                                        sfxObject.pow.play()
                                                        armas[armasGet.enUso].onHit = true
                                                        setTimeout(() => {
                                                            armas[armasGet.enUso].onHit = false
                                                        }, 1000);
                                                        sfxObject.joshisound3[parseInt(Math.random() * 2)].play()
                                                    }
                                                }
                                            }
                                        } else {
                                            if (dropsFalses.length > 0 && dropsFalses[chokePlayer.array[indd].b.pos].state === 'die' && dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.state && !dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                                if (dropsFalses.length > 0 && !propsAction.eating && !dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                                    setplayerOnDrop({
                                                        ...playerOnDrop,
                                                        state: true
                                                    })
                                                    propsAction.onDrop = true

                                                }
                                                if (dropsFalses.length > 0 && propsAction.eating && !dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking) {
                                                    dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking = true
                                                }
                                                if (dropsFalses.length > 0 && propsAction.eating && !dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.done && dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking && dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad > 0 && !dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                                    dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad = dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad - .25
                                                    let healtRes = .25 * (dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.efect ? 1 : -1)
                                                    setPlayerVidas({
                                                        ...playerVidas,
                                                        health: propsImage.items[0].health.nivel + healtRes
                                                    })
                                                    propsImage.items[0].health.nivel = propsImage.items[0].health.nivel + healtRes
                                                    if (dropsFalses.length > 0 && dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad <= 0) {
                                                        dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking = true
                                                        propsAction.eating = false
                                                        dropsFalses = dropsFalses.filter(drop => drop !== dropsFalses[chokePlayer.array[indd].b.pos])
                                                    }

                                                }

                                                if (dropsFalses.length > 0 && dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                                    dropsFalses[chokePlayer.array[indd].b.pos].actions.onDie.comible.done = true
                                                    propsAction.eating = false
                                                    setplayerOnDrop({
                                                        state: false
                                                    })
                                                    propsAction.onDrop = false

                                                }
                                            }
                                        }
                                    }
                                    else {
                                        const chokeInminente = await Colisonador(propsImage.items[0], hiter === ('malo') ? malosFalses : hiter === ('proy') ? proyectiles : levelFalses, propsImage, true, true, ctxD, hiter, inLayer)
                                        if (chokeInminente) {
                                            if (chokeInminente.state && hiter === 'malo' && propsImage.items[0].health.estado === 'inmortal') {
                                                if (dibujarMalos.new[chokePlayer.array[indd].b.pos].state === 'die' && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.state && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                                    if (!propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                                        setplayerOnDrop({
                                                            ...playerOnDrop,
                                                            state: true
                                                        })
                                                        propsAction.onDrop = true

                                                    }
                                                    if (propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking) {
                                                        dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking = true
                                                    }
                                                    if (propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad > 0 && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                                        dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad = dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad - .05
                                                        let healtRes = .05 * (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.efect ? 1 : -1)
                                                        setPlayerVidas({
                                                            ...playerVidas,
                                                            health: propsImage.items[0].health.nivel + healtRes
                                                        })
                                                        propsImage.items[0].health.nivel = propsImage.items[0].health.nivel + healtRes
                                                        if (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad <= 0) {
                                                            dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking = true
                                                            propsAction.eating = false
                                                        }

                                                    }

                                                    if (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                                        dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done = true
                                                        propsAction.eating = false
                                                        setplayerOnDrop({
                                                            state: false
                                                        })
                                                        propsAction.onDrop = false

                                                    }
                                                }
                                            }
                                            if (chokeInminente.state && propsImage.items[0].health.estado !== 'inmortal') {
                                                switch (chokeInminente.array[0].b.id.split('-')[chokeInminente.array[0].b.id.split('-').length - 1]) {
                                                    case 'malo':
                                                        if (dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'die' && dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'spirit' && dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'onDie') {
                                                            sfxObject.yaWey.play()
                                                            sfxObject.joshisound.play()
                                                            colisioned.state = true
                                                            colisioned.item = dibujarMalos.new[chokeInminente.array[0].b.pos].id
                                                            propsImage.items[0].health.nivel = propsImage.items[0].health.nivel - dibujarMalos.new[chokeInminente.array[0].b.pos].damage
                                                            setPlayerVidas({
                                                                ...playerVidas,
                                                                vidas: actualVidas,
                                                                health: propsImage.items[0].health.nivel
                                                            })
                                                            if (propsImage.items[0].health.nivel < 0) {
                                                                colisioned.result = 'die'
                                                                dibujarMalos.die = true
                                                                ctxD.save();
                                                                ctxD.font = "40px Arial";
                                                                ctxD.fillStyle = "red";
                                                                ctxD.strokeStyle = 'white';
                                                                ctxD.fillText(actualVidas > 1 ? `JOSHI TE ` : 'GAME OVER', 30, 50)
                                                                ctxD.strokeText(actualVidas > 1 ? `JOSHI TE ` : 'GAME OVER', 30, 50)
                                                                ctxD.fillText(actualVidas > 1 ? ` CULEO` : '', 30, 90)
                                                                ctxD.strokeText(actualVidas > 1 ? ` CULEO` : '', 30, 90)
                                                                ctxD.restore();
                                                                ctxD.stroke()
                                                                malosFalses = []
                                                            } else {
                                                                sfxObject.joshisound3[3].play()
                                                            }
                                                        } else {
                                                            if (dibujarMalos.new[chokePlayer.array[indd].b.pos].state === 'die' && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.state && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                                                if (!propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                                                    setplayerOnDrop({
                                                                        ...playerOnDrop,
                                                                        state: true
                                                                    })
                                                                    propsAction.onDrop = true

                                                                }
                                                                if (propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking) {
                                                                    dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking = true
                                                                }
                                                                if (propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad > 0 && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                                                    dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad = dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad - .05
                                                                    let healtRes = .05 * (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.efect ? 1 : -1)
                                                                    setPlayerVidas({
                                                                        ...playerVidas,
                                                                        health: propsImage.items[0].health.nivel + healtRes
                                                                    })
                                                                    propsImage.items[0].health.nivel = propsImage.items[0].health.nivel + healtRes
                                                                    if (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad <= 0) {
                                                                        dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking = true
                                                                        propsAction.eating = false
                                                                    }

                                                                }

                                                                if (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                                                    dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done = true
                                                                    propsAction.eating = false
                                                                    setplayerOnDrop({
                                                                        state: false
                                                                    })
                                                                    propsAction.onDrop = false

                                                                }
                                                            }

                                                        }
                                                        break;
                                                    case 'proy':
                                                        sfxObject.llantobebe.play()
                                                        sfxObject.yaWey.play()
                                                        sfxObject.pow.play()
                                                        colisioned.state = true
                                                        colisioned.item = proyectiles[chokeInminente.array[0].b.pos].id
                                                        propsImage.items[0].health.nivel = propsImage.items[0].health.nivel - proyectiles[chokeInminente.array[0].b.pos].damage
                                                        setPlayerVidas({
                                                            ...playerVidas,
                                                            vidas: actualVidas,
                                                            health: propsImage.items[0].health.nivel
                                                        })
                                                        if (propsImage.items[0].health.nivel < 0) {
                                                            colisioned.result = 'die'
                                                            proyectilesFalses = []
                                                            dibujarMalos.die = true
                                                            ctxD.save();
                                                            ctxD.fillText(actualVidas > 1 ? `TRAGASTE ` : 'GAME OVER', 30, 50)
                                                            ctxD.fillText(actualVidas > 1 ? `TRAGASTE ` : 'GAME OVER', 30, 50)
                                                            ctxD.fillText(actualVidas > 1 ? ` PAÑAL` : 'GAME OVER', 30, 100)
                                                            ctxD.strokeText(actualVidas > 1 ? ` PAÑAL` : 'GAME OVER', 30, 100)
                                                            ctxD.restore();
                                                            ctxD.stroke()
                                                        }
                                                        break;
                                                    case 'obst':
                                                        sfxObject.dolor.play()
                                                        colisioned.state = true
                                                        colisioned.item = levelFalses[chokePlayer.array[indd].b.pos].id
                                                        propsImage.items[0].health.nivel = propsImage.items[0].health.nivel - levelFalses[chokePlayer.array[indd].b.pos].damage
                                                        setPlayerVidas({
                                                            ...playerVidas,
                                                            vidas: actualVidas,
                                                            health: propsImage.items[0].health.nivel
                                                        })
                                                        sfxObject.sierra.play()
                                                        if (propsImage.items[0].health.nivel < 0) {
                                                            colisioned.result = 'die'
                                                            ctxD.save();
                                                            ctxD.fillText(actualVidas > 1 ? `MUERTISIMO` : 'GAME OVER', 30, 50)
                                                            ctxD.strokeText(actualVidas > 1 ? `MUERTISIMO` : 'GAME OVER', 30, 50)
                                                            ctxD.restore();
                                                            ctxD.stroke()
                                                        }
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            } else {
                                                if ((hiter === ('obst') || hiter === ('obstA') || hiter === ('obstB')) && (chokeInminente.state && propsImage.items[0].health.estado === 'inmortal')) {
                                                    if (propsImage.direccion === 'xb' || propsImage.direccion === 'xb') {
                                                        propsImage.items[0].posX = propsImage.items[0].posX + ((1.25 / (40 * (1 / (levelDificulty)))))
                                                        propsImage.posX = propsImage.posX + ((0.125 / (40 * (1 / (levelDificulty)))))
                                                    }
                                                    if (propsImage.direccion === 'xf' || propsImage.direccion === 'xf') {
                                                        propsImage.items[0].posX = propsImage.items[0].posX - ((1.25 / (40 * (1 / (levelDificulty)))))
                                                        propsImage.posX = propsImage.posX - ((0.125 / (40 * (1 / (levelDificulty)))))
                                                    }
                                                }
                                                if (armas[armasGet.enUso].state) {
                                                    if (hiter === ('proy')) {
                                                        audioPlaying = audioPlaying > 1 ? audioPlaying + 1 : 0
                                                        sfxObject.WeaponAudio[audioPlaying].play()
                                                        setTimeout(() => {
                                                            setTimeout(() => {
                                                                armas[armasGet.enUso].onHit = false

                                                            }, 500)
                                                            sfxObject.muertebebe.play()
                                                        }, 500);
                                                        if (proyectiles[chokePlayer.array[indd].b.pos].state !== 'onDie') {
                                                            proyectiles[chokePlayer.array[indd].b.pos].state = 'hit';
                                                            proyectiles[chokePlayer.array[indd].b.pos].hitdirection = proyectiles[chokePlayer.array[indd].b.pos].direccion === 'xf' ? (lastDireccion === 'xf' ? 'xf' : 'xb') : (lastDireccion === 'xb' ? 'xb' : 'xf')
                                                            if (!armas[armasGet.enUso].onHit) {
                                                                proyectiles[chokePlayer.array[indd].b.pos].hitDamage = (Math.random() * 4);
                                                                proyectiles[chokePlayer.array[indd].b.pos].health = armas[armasGet.enUso].onHit ? proyectiles[chokePlayer.array[indd].b.pos].health : proyectiles[chokePlayer.array[indd].b.pos].health - ((proyectiles[chokePlayer.array[indd].b.pos].health * (Math.random() * armas[armasGet.enUso].damage - 3) + 3) * propsAction.strikeLevel)
                                                                armas[armasGet.enUso].onHit = true
                                                            }
                                                            if (proyectiles[chokePlayer.array[indd].b.pos].health < 0) {
                                                                proyectiles[chokePlayer.array[indd].b.pos].state = 'die';
                                                            }
                                                        }
                                                    }
                                                    if (hiter === ('malo')) {
                                                        if (!onHitSoundNow) {
                                                            onHitSoundNow = true
                                                            armas[armasGet.enUso].sound[parseInt(Math.random() * 3)].play()
                                                            setTimeout(() => {
                                                                onHitSoundNow = false
                                                            }, 5000);
                                                        }
                                                        /* onHitSound.play() */
                                                        if (dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'die' && dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'spirit' && dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'onDie') {
                                                            dibujarMalos.new[chokePlayer.array[indd].b.pos].state = 'hit'
                                                            if (!armas[armasGet.enUso].onHit) {
                                                                dibujarMalos.new[chokePlayer.array[indd].b.pos].health = dibujarMalos.new[chokePlayer.array[indd].b.pos].health - ((armas[armasGet.enUso].damage * parseInt(Math.random() * 3) + 1) * propsAction.strikeLevel)
                                                                dibujarMalos.new[chokePlayer.array[indd].b.pos].lazy = { state: true, counter: 0 }
                                                                sfxObject.joshisound2.play()
                                                                if (dibujarMalos.new[chokePlayer.array[indd].b.pos].health < 0) {
                                                                    sfxObject.pow.play()
                                                                    armas[armasGet.enUso].onHit = true
                                                                    sfxObject.joshisound3[2].play()
                                                                    dibujarMalos.new[chokePlayer.array[indd].b.pos].state = 'onDie'
                                                                    setTimeout(() => {
                                                                        armas[armasGet.enUso].onHit = false
                                                                    }, 1000);
                                                                } else {
                                                                    sfxObject.pow.play()
                                                                    armas[armasGet.enUso].onHit = true
                                                                    setTimeout(() => {
                                                                        armas[armasGet.enUso].onHit = false
                                                                    }, 1000);
                                                                    sfxObject.joshisound3[parseInt(Math.random() * 2)].play()
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            imagenes[0].onMove = true
                                        }
                                    }


                                }
                            }
                        }
                    } else {
                        setplayerOnDrop({
                            ...playerOnDrop,
                            state: false
                        })
                        propsAction.onDrop = false
                    }
                    if (colisioned.state) {
                        if (colisioned.result === 'die') {
                            audioPp.src = '/audio/die.mp3'
                            setTimeout(() => {
                                ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                                ctxC.clearRect(0, 0, canvas.width, canvas.height)
                                psx = Itemss[0].posX
                                morir()
                                colisioned.state = false
                                Itemss[0].posX = 0
                            }, 5000);
                        } else {
                            audioPp.pause()
                            propsImage.items[0].health.estado = 'normal'
                        }
/*                         dibujar('go', propsImage)
*/                    } else {
                        psx = Itemss[0].posX
                        if (propsImage.posX <= (341 - 0.5) && propsImage.posX > -1 && propsImage.direccion === 'xf' && ((((propsImage.posX / (31 - 0.5)) === (1)) || (propsImage.posX > 29.9 && inLayer === 0)) || (((propsImage.posX / (61 - 0.5)) === (1)) || (propsImage.posX > 59.9 && inLayer === 1)) || (((propsImage.posX / (91 - 0.5)) === (1)) || (propsImage.posX > 89.9 && inLayer === 2)) || (((propsImage.posX / (121 - 0.5)) === (1)) || (propsImage.posX > 119.9 && inLayer === 3)) || (((propsImage.posX / (151 - 0.5)) === (1)) || (propsImage.posX > 149.9 && inLayer === 4)) || (((propsImage.posX / (181 - 0.5)) === (1)) || (propsImage.posX > 179.9 && inLayer === 5)) || (((propsImage.posX / (211 - 0.5)) === (1)) || (propsImage.posX > 209.9 && inLayer === 6)) || (((propsImage.posX / (241 - 0.5)) === (1)) || (propsImage.posX > 239.9 && inLayer === 7)) || (((propsImage.posX / (271 - 0.5)) === (1)) || (propsImage.posX > 269.9 && inLayer === 8)) || (((propsImage.posX / (301 - 0.5)) === (1)) || (propsImage.posX > 299.9 && inLayer === 9)) || (((propsImage.posX / (331 - 0.5)) === (1)) || (propsImage.posX > 330.9 && inLayer === 10)) || ((((propsImage.posX / (341 - 0.5)) === (1)))) || (propsImage.posX > 340.9 && inLayer === 11)) && propsImage.alive && !propsImage.levelPass) {
                            moverCanvas(false)
                        }
                        if (propsImage.posX < 351 && propsImage.posX > 28 && propsImage.direccion === 'xb' && ((((propsImage.posX / (29 - 0.5)) === (1)) || (propsImage.posX < 29.9 && inLayer === 1)) || (((propsImage.posX / (59 - 0.5)) === (1)) || (propsImage.posX < 59.9 && inLayer === 2)) ||
                            (((propsImage.posX / (89 + 0.5)) === (1)) || (propsImage.posX < 89.9 && inLayer === 3)) || (((propsImage.posX / (119 + 0.5)) === (1)) || (propsImage.posX < 119.9 && inLayer === 4)) || (((propsImage.posX / (149 + 0.5)) === (1)) || (propsImage.posX < 149.9 && inLayer === 5)) || (((propsImage.posX / (179 + 0.5)) === (1)) || (propsImage.posX < 179.9 && inLayer === 6)) || (((propsImage.posX / (209 + 0.5)) === (1)) || (propsImage.posX < 209.9 && inLayer === 7)) || (((propsImage.posX / (239 + 0.5)) === (1)) || (propsImage.posX < 239.9 && inLayer === 8)) || (((propsImage.posX / (269 + 0.5)) === (1)) || (propsImage.posX < 269.9 && inLayer === 9)) || (((propsImage.posX / (299 + 0.5)) === (1)) || (propsImage.posX < 299.9 && inLayer === 10)) || (((propsImage.posX / (319 + 0.5)) === (1)) || (propsImage.posX < 319.9 && inLayer === 11)))) {
                            moverCanvas(false)
                        }
                        else {
                            console.log
                        }
                        if (imagenes[0].onMove || !colisioned.state) {
                            if (!colisioned.state) {
                                ctxC.clearRect(0, 0, canvas.width, canvas.height)
                                if (propsImage.layer < (24 * 4)) {
                                    propsImage.layer = propsImage.layer + 1
                                } else { propsImage.layer = 0 } if (propsImage.direccion === 'xf') {
                                    propsImage.direccion = 'xf'
                                } else {
                                    propsImage.direccion = propsImage.direccion
                                }
                                if ((propsImage.direccion === 'xf' && propsImage.posX < 342) || ((propsImage.direccion === 'xs' || propsImage.direccion === 'xd') && propsImage.posX < 355) || (propsImage.direccion === 'xb' && propsImage.posX > 0)) {
                                    Itemss[0].posY = !propsAction.onPlataform && !propsAction.jumping && propsImage.posY + parseInt(propsImage.heightY) > (mapFloor) ? mapFloor - (parseInt(propsImage.heightY)) : propsAction.jumping && propsImage.posY <= (actualFloor - parseInt(propsImage.heightY)) ? propsImage.posY === (actualFloor - parseInt(propsImage.heightY)) && propsAction.jumping && propsAction.gravity ? (actualFloor - parseInt(propsImage.heightY)) : !propsAction.gravity ? propsImage.posY - (propsAction.jumpLevel / (onMobil ? (40 * (1 / (levelDificulty))) : 1)) : propsAction.jumping && propsAction.gravity ? propsImage.posY + propsAction.gravityLevel : propsImage.posY === 50 ? (actualFloor - parseInt(propsImage.heightY)) : (actualFloor - parseInt(propsImage.heightY)) : (actualFloor - parseInt(propsImage.heightY))
                                    Itemss[0].posX = propsImage.refreshData ? psx : propsImage.levelPass ? psx : propsImage.direccion === 'xf' && propsImage.direccion === 'xf' ? propsAction.jumping || propsImage.posY < actualFloor ? Itemss[0].posX + ((1.25 / (40 * (1 / (levelDificulty)))) * propsAction.speedLevel) : Itemss[0].posX + ((1.25 / (40 * (1 / (levelDificulty)))) * propsAction.speedLevel) : propsImage.direccion === 'xb' && propsImage.direccion === 'xb' ? propsAction.jumping || propsImage.posY < actualFloor ? Itemss[0].posX - ((1.25 / (40 * (1 / (levelDificulty)))) * propsAction.speedLevel) : Itemss[0].posX - ((1.25 / (40 * (1 / (levelDificulty)))) * propsAction.speedLevel) : Itemss[0].posX
                                    propsImage = {
                                        ...propsImage,
                                        posY: propsAction.onPlataform && !propsAction.jumping ? propsImage.posY : propsAction.jumping && propsImage.posY <= (actualFloor - parseInt(propsImage.heightY)) ? propsImage.posY === (actualFloor - parseInt(propsImage.heightY)) && propsAction.jumping && propsAction.gravity ? (actualFloor - parseInt(propsImage.heightY)) : !propsAction.gravity ? propsImage.posY - (propsAction.jumpLevel / (onMobil ? (40 * (1 / (levelDificulty))) : 1)) : propsAction.jumping && propsAction.gravity ? propsImage.posY + propsAction.gravityLevel : propsImage.posY === 50 ? (actualFloor - parseInt(propsImage.heightY)) : (actualFloor - parseInt(propsImage.heightY)) : (actualFloor - parseInt(propsImage.heightY)),
                                        posX: propsImage.refreshData ? propsImage.posX : propsImage.levelPass ? propsImage.posX : !propsImage.alive ? 0 : propsImage.direccion === 'xf' && propsImage.direccion === 'xf' ? propsAction.jumping || propsImage.posY < actualFloor ? propsImage.posX + ((0.125 / (40 * (1 / (levelDificulty)))) * propsAction.speedLevel) : propsImage.posX + ((0.125 / (40 * (1 / (levelDificulty)))) * propsAction.speedLevel) : propsImage.direccion === 'xb' && propsImage.direccion === 'xb' ? propsAction.jumping || propsImage.posY < actualFloor ? propsImage.posX - ((0.125 / (40 * (1 / (levelDificulty)))) * propsAction.speedLevel) : propsImage.posX - ((0.125 / (40 * (1 / (levelDificulty)))) * propsAction.speedLevel) : propsImage.posX,
                                        items: propsImage.levelPass || !propsImage.alive ? propsImage.items : Itemss,
                                        fotograma: propsImage.fotograma + 1,
                                    }

                                }
                                const propsImageLast = propsImage
                                propsImage = {
                                    ...propsImage,
                                    onMove: propsImageLast.onMove,
                                    direccion: propsImageLast.direccion,
                                }
                                if (propsImage.posX > (341 - 0.5)) {
                                    setTimeout(() => {
                                        propsImage.posX = 0
                                        moverCanvas(false)
                                    }, 4000);
                                }
                                let malosFalsesAux = []
                                dibujarMalos.new.map((key, i) => {
                                    dibujarMalos.new[i].canMove.lastChoke = dibujarMalos.new[i].canMove.lastChoke + 1
                                    if (key.state !== 'die' && key.state !== 'spirit' && key.state !== 'onDie') {
                                        if (key.canMove.jumps.state && key.posY >= (mapFloor - parseInt(key.heightY)) && key.canMove.jumps.gravity) {
                                            dibujarMalos.new[i].canMove.jumps.gravity = false
                                            dibujarMalos.new[i].canMove.jumps.state = false
                                            dibujarMalos.new[i].posY = (mapFloor - parseInt(key.heightY))
                                            dibujarMalos.new[i].canMove.jumps.inInterval = 0
                                        }
                                        if (key.posY < key.canMove.jumps.maxJump) {
                                            dibujarMalos.new[i].canMove.jumps.gravity = true
                                        }
                                        if (key.actions.shot.posibility && !key.actions.shot.state) {
                                            dibujarMalos.new[i].actions.shot.inInterval = key.actions.shot.inInterval + 1
                                        }
                                        if (key.actions.shot.posibility && key.actions.shot.state) {
                                            dibujarMalos.new[i].actions.shot.inInterval = 0
                                        }
                                        if (key.state !== 'onDie' && key.state !== 'die' && key.state !== 'onDie' && key.actions.shot.posibility && !key.actions.shot.state && key.actions.shot.inInterval === key.actions.shot.interval) {
                                            sfxObject.risabebe.play()
                                            dibujarMalos.new[i].actions.shot.state = true
                                            setTimeout(() => {
                                                try {
                                                    dibujarMalos.new[i].actions.shot.state = false
                                                    armas[armasGet.enUso].onHit = false
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }, 1000);
                                            let imgUsed = proyectilesImg.malos
                                            let efectRandom = parseInt(Math.random() * 2)
                                            proyectiles.push({
                                                id: `${dibujarMalos.new[i].id.split('-')[0]}-${parseInt(Math.random() * 500)}-proy`,
                                                damageFor: 'player',
                                                health: 22,
                                                hitdirection: 'xf',
                                                hitDamage: 0,
                                                state: 'live',
                                                imagen: imgUsed,
                                                type: key.actions.shot.type,
                                                posX: !key.canMove.direccion === 'xf' ? key.posX - 60 : key.posX + 10,
                                                posY: (key.posY) + ((Math.random() * 30) - 15),
                                                widthX: imgUsed[0].naturalWidth / 30,
                                                heightY: imgUsed[0].naturalHeight / 30,
                                                direccion: key.canMove.direccion,
                                                speed: key.actions.shot.speed,
                                                efectDirection: efectRandom === 0 ? 'up' : 'down',
                                                damage: key.actions.shot.damage,
                                            })
                                        }
                                        if (key.canMove.jumps.posibility && !key.canMove.jumps.state) {
                                            dibujarMalos.new[i].canMove.jumps.inInterval = key.canMove.jumps.inInterval + 1
                                        }
                                        if (key.canMove.jumps.posibility && !key.canMove.jumps.state && key.canMove.jumps.inInterval === key.canMove.jumps.interval) {
                                            dibujarMalos.new[i].canMove.jumps.state = true
                                            dibujarMalos.new[i].canMove.jumps.gravity = false
                                        }
                                        let position = {
                                            spirit: { imagen: true },
                                            die: { imagen: true },
                                            hit: {
                                                left: { imagen: true },
                                                right: { imagen: true },
                                            },
                                            notHit: {
                                                left: { imagen: true },
                                                right: { imagen: true },
                                            },
                                        }
                                        let imagenready = true
                                        key.imagen.map((key2, i) => {
                                            if (key2.direccion === `${key.state === 'hit' ? 'hit' : 'joshi'}_${key.canMove.direccion}_0`) { imagenready = key2.imagen }
                                        })

                                        if (key.state === 'onDie') {
                                            if (key.explotionTime > 100) {

                                                dibujarMalos.new[i].state = 'spirit'
                                            } else {
                                                dibujarMalos.new[i].explotionTime = dibujarMalos.new[i].explotionTime + 1
                                            }
                                            ctxE.drawImage(armas[armasGet.enUso].kills[0].imagen, key.posX, key.posY - (key.explotionTime / 10), (armas[armasGet.enUso].kills[0].imagen.naturalWidth / 22) + (key.explotionTime / 10), (armas[armasGet.enUso].kills[0].imagen.naturalHeight / 27) + (key.explotionTime / 10))
                                        } else {
                                            if (key.lazy.state) {
                                                if (key.lazy.fotograma < 23) {
                                                    dibujarMalos.new[i].lazy.fotograma = dibujarMalos.new[i].lazy.fotograma + 1
                                                } else {
                                                    dibujarMalos.new[i].lazy.fotograma = 0
                                                    if (dibujarMalos.new[i].lazy.layer < 4) {
                                                        dibujarMalos.new[i].lazy.layer = dibujarMalos.new[i].lazy.layer + 1
                                                    } else {
                                                        dibujarMalos.new[i].lazy.layer = 0
                                                    }
                                                }
                                                let posLayer = 0
                                                lazyImg.map((keyLazy, iLazy) => {
                                                    /*     console.log(keyLazy,key.lazy.layer,dibujarMalos.new[i].canMove.direccion ); */
                                                    if (parseInt(keyLazy.id) === key.lazy.layer && dibujarMalos.new[i].canMove.direccion === keyLazy.direccion) {
                                                        posLayer = iLazy
                                                    }
                                                })
                                                let imagenready2 = lazyImg[posLayer].imagen
                                                ctxE.drawImage(imagenready2, (key.canMove.direccion === 'xb' ? key.posX - (imagenready2.naturalWidth / 44) : key.posX + (imagenready2.naturalWidth / 44)), key.posY - (imagenready2.naturalHeight / 27), imagenready2.naturalWidth / 22, imagenready2.naturalHeight / 27)
                                            }
                                            ctxE.drawImage(imagenready, key.posX, key.posY, imagenready.naturalWidth / 22, imagenready.naturalHeight / 27)
                                        }
                                        if (dibujarMalos.new[i].posX < (stateImage.posX === -1 ? 35 : 1) || dibujarMalos.new[i].posX > 299) {
                                            dibujarMalos.new[i].canMove.direccion = dibujarMalos.new[i].posX < (stateImage.posX === -1 ? 35 : 1) ? 'xf' : 'xb'
                                        }
                                        dibujarMalos.new[i].posY = dibujarMalos.new[i].posY + parseInt(dibujarMalos.new[i].heightY) > (mapFloor) ? (mapFloor - parseInt(dibujarMalos.new[i].heightY)) : (key.state === 'onDie' || key.state === 'spirit') ? dibujarMalos.new[i].posY : !dibujarMalos.new[i].canMove.jumps.posibility ? dibujarMalos.new[i].posY : dibujarMalos.new[i].canMove.jumps.state ? (!dibujarMalos.new[i].canMove.jumps.gravity ? dibujarMalos.new[i].posY + parseInt(dibujarMalos.new[i].heightY) <= (mapFloor) ? dibujarMalos.new[i].posY - (.250 + dibujarMalos.new[i].canMove.jumps.speed) : (mapFloor - parseInt(dibujarMalos.new[i].heightY)) : dibujarMalos.new[i].posY + .250) : dibujarMalos.new[i].posY
                                        dibujarMalos.new[i].posX = (key.state === 'onDie' || key.state === 'spirit') ? dibujarMalos.new[i].posX : !dibujarMalos.new[i].canMove.walks.posibility ? dibujarMalos.new[i].posX : dibujarMalos.new[i].actions.shot.state || dibujarMalos.new[i].canMove.jumps.state ? dibujarMalos.new[i].posX : dibujarMalos.new[i].canMove.direccion === 'xf' ? dibujarMalos.new[i].posX + ((dibujarMalos.new[i].lazy.state ? .05 : .25) * dibujarMalos.new[i].canMove.walks.speed) : dibujarMalos.new[i].posX - ((dibujarMalos.new[i].lazy.state ? .05 : .25) * dibujarMalos.new[i].canMove.walks.speed)
                                        if (dibujarMalos.new[i].lazy.state) {
                                            dibujarMalos.new[i].lazy.counter < 1000 ? dibujarMalos.new[i].lazy.counter = dibujarMalos.new[i].lazy.counter + 1 : dibujarMalos.new[i].lazy = { counter: 0, state: false, fotograma: 0, layer: 0 }
                                        }
                                    } else {
                                        let position = {
                                            spirit: { imagen: true },
                                            die: { imagen: true },
                                            hit: {
                                                left: { imagen: true },
                                                right: { imagen: true },
                                            },
                                        }
                                        key.imagen.map((key2, i) => {
                                            if (key2.direccion === `spirit_${key.canMove.direccion}_0`) { position.spirit.imagen = key2.imagen }
                                            if (key2.direccion === `die_${key.canMove.direccion}_0`) { position.die.imagen = key2.imagen }
                                            if (key2.direccion === `hit_xf_${key.layer}`) { position.hit.right.imagen = key2.imagen }
                                            if (key2.direccion === `hit_xb_${key.layer}`) { position.hit.left.imagen = key2.imagen }
                                        })
                                        fantasmas.map((keySpirit, iGhost) => {
                                            if (keySpirit.posY > 0) {
                                                if (fantasmas[iGhost].posY > 0) {
                                                    fantasmas[iGhost].posY = fantasmas[iGhost].posY - (1.25 / 3)
                                                    ctxE.drawImage(position.spirit.imagen, key.posX, keySpirit.posY, position.spirit.imagen.naturalWidth / 22, position.spirit.imagen.naturalHeight / 27)
                                                }
                                            }
                                        })
                                        if (key.state === 'spirit' || key.state === 'onDie') {
                                            let isDead = false
                                            fantasmas.map((kkk, xi) => {
                                                if (kkk.id === key.id) {
                                                    isDead = true
                                                }
                                            })
                                            if (!isDead) {
                                                fantasmas.push({
                                                    id: key.id,
                                                    posX: key.posX,
                                                    posY: key.posY,
                                                })
                                                dropsFalses.push(dibujarMalos.new[i])
                                                dibujarMalos.new[i].state = 'die'
                                            }
                                            ctxE.drawImage(position.spirit.imagen, key.posX, key.posY, position.spirit.imagen.naturalWidth / 22, position.spirit.imagen.naturalHeight / 27)
                                        } else {
                                            let position = {
                                                spirit: { imagen: true },
                                                die: { imagen: true },
                                                hit: {
                                                    left: { imagen: true },
                                                    right: { imagen: true },
                                                },
                                            }
                                            dibujarMalos.new.map((key, i) => {
                                                key.imagen.map((key2, i) => {
                                                    if (key2.direccion === `spirit_${key.canMove.direccion}_0`) { position.spirit.imagen = key2.imagen }
                                                    if (key2.direccion === `die_${key.canMove.direccion}_0`) { position.die.imagen = key2.imagen }
                                                    if (key2.direccion === `hit_xf_0`) { position.hit.right.imagen = key2.imagen }
                                                    if (key2.direccion === `hit_xb_${key.layer}`) { position.hit.left.imagen = key2.imagen }
                                                })
                                               /*  ctxE.drawImage(position.spirit.imagen, key.posX, keySpirit.posY, position.spirit.imagen.naturalWidth / 22, position.spirit.imagen.naturalHeight / 27) */
                                                ctxE.drawImage(position.die.imagen, key.posX, key.posY, position.die.imagen.naturalWidth / 22, position.die.imagen.naturalHeight / 27)
                                            })
                                        }
                                    }
                                    if (key.state !== 'onDie' && key.state !== 'spirit') {
                                        malosFalsesAux.push({
                                            ...key,
                                            id: key.id,
                                            posX: key.posX,
                                            posY: key.posY,
                                            widthX: key.widthX,
                                            heightY: parseInt(key.heightY),
                                        })
                                    }
                                })
                                malosFalses = malosFalsesAux
                                proyectilesFalses = []
                                let existingProyectiles = []
                                proyectiles.map((key, i) => {
                                    ctxE.drawImage(key.imagen[key.direccion === 'xf' ? 1 : 0], key.posX, key.posY, key.widthX, parseInt(key.heightY))
                                    proyectiles[i].posX = key.state !== 'hit' ? (key.direccion === 'xf' ? key.posX + (.25 * key.speed) : key.posX - (.25 * key.speed)) : (key.hitdirection === 'xb' ? key.posX - (.25 * (key.speed * 2.5)) : key.posX + (.25 * (key.speed * 2.5)))
                                    proyectiles[i].posY = key.state === 'hit' ? key.efectDirection === 'up' ? proyectiles[i].posY - (.6 * key.speed * key.hitDamage) : proyectiles[i].posY + (.6 * key.speed * key.hitDamage) : proyectiles[i].posY
                                    if ((key.state !== 'die' && key.state !== 'onDie' && key.state !== 'spirit') && (key.posX < 300 && (key.posX + key.widthX) > 0) && (key.posY > 0 && key.posY > 0)) {
                                        proyectilesFalses.push({
                                            ...key,
                                            damageFor: key.damageFor,
                                            id: key.id,
                                            state: key.posX,
                                            posX: key.posX,
                                            posY: key.posY,
                                            widthX: key.widthX,
                                            heightY: parseInt(key.heightY),
                                            health: key.health,
                                            damage: key.damage
                                        })
                                        existingProyectiles.push(key)
                                    }
                                })
                                proyectiles = existingProyectiles
                                if (itemsGet.enUso !== 'ninguno') {
                                    let playerClothes = itemsImage[itemsGet.enUso].imagen
                                    let estado = itemsGet.enUso === 'jetPack' ? !propsAction.gravity : ((propsImage.direccion === 'xf' || propsImage.direccion === 'xb') || (itemsGet.enUso === 'patineta' && propsAction.jumping && !propsAction.gravity) ? true : false)
                                    let ladireccion = armas[armasGet.enUso].state || (propsImage.direccion === 'xj' || propsImage.direccion === 'xd') || (itemsGet.enUso === 'patineta' && propsAction.jumping) ? 'xs' : itemsGet.enUso === 'jetPack' ? (propsImage.direccion === 'xj' || propsImage.direccion === 'xd') ? 'xs' : propsImage.direccion : lastDireccion
                                    let rand = itemsGet.enUso === 'patineta' && propsAction.jumping ? (propsImage.direccion === 'xb' ? 1 : 0) : parseInt((Math.random() * 2))
                                    if (estado) {
                                        itemsImage[itemsGet.enUso].map((key, i) => {
                                            if (key.direccion === ladireccion && key.layer === rand && key.estado === 'on') {
                                                playerClothes = key.imagen
                                            }
                                        })

                                    } else {
                                        itemsImage[itemsGet.enUso].map((key, i) => {
                                            if (key.direccion === ladireccion && key.estado === 'off') {
                                                playerClothes = key.imagen
                                            }
                                        })
                                    }
                                    ctxE.drawImage(playerClothes, propsImage.levelPass ? psx : propsImage.refreshData ? 10 : !propsImage.alive ? 0 : psx - 8, propsImage.direccion === 'xd' ? propsImage.posY + (parseInt(propsImage.heightY) / 2) : propsImage.posY - 7, propsImage.widthX + 16, propsImage.direccion === 'xd' ? (parseInt(propsImage.heightY) / 2) : parseInt(propsImage.heightY) + 14)
                                }
                                if (armas[armasGet.enUso].state) {
                                    let indexFor = armas[armasGet.enUso].fotograma
                                    if (armas[armasGet.enUso].layer < 13) {
                                        if (armas[armasGet.enUso].layer === 12) {
                                            armas[armasGet.enUso].onEnd = true
                                            setTimeout(() => {
                                                armas[armasGet.enUso].layer = 0
                                                armas[armasGet.enUso].state = false
                                            }, 600);
                                        }
                                        if (indexFor < armas[armasGet.enUso].speed) {
                                            indexFor = indexFor + 1
                                            armas[armasGet.enUso].fotograma = indexFor
                                        } else {
                                            indexFor = 0
                                            armas[armasGet.enUso].fotograma = indexFor
                                            armas[armasGet.enUso].layer = armas[armasGet.enUso].layer + 1
                                        }
                                        let posLayer = 0
                                        let cualLayer
                                        armas[armasGet.enUso].imagenes.map((key2, i) => {
                                            if (armas[armasGet.enUso].layer === 13 && !armas[armasGet.enUso].onHit) {
                                                cualLayer = 11

                                            } else {
                                                cualLayer = armas[armasGet.enUso].layer
                                            }
                                            if (key2.id === cualLayer && key2.direccion === lastDireccion) {
                                                posLayer = i
                                            }
                                        })
                                        ctxE.drawImage(armas[armasGet.enUso].imagenes[posLayer].imagen, psx - 15, propsImage.posY - (parseInt(propsImage.heightY) / 2), armas[armasGet.enUso].imagenes[posLayer].widthX, armas[armasGet.enUso].imagenes[posLayer].heightY);
                                    } else {
                                        let posLayer = 0
                                        let cualLayer = 0
                                        armas[armasGet.enUso].imagenes.map((key2, i) => {
                                            if (armas[armasGet.enUso].layer === 13 && !armas[armasGet.enUso].onHit) {
                                                cualLayer = 12

                                            } else {
                                                cualLayer = armas[armasGet.enUso].layer
                                            }

                                            if (key2.id === cualLayer && key2.direccion === lastDireccion) {
                                                posLayer = i
                                            }
                                        })
                                        ctxE.drawImage(armas[armasGet.enUso].imagenes[posLayer].imagen, psx - 15, propsImage.posY - (parseInt(propsImage.heightY) / 2), armas[armasGet.enUso].imagenes[posLayer].widthX, armas[armasGet.enUso].imagenes[posLayer].heightY);
                                    }
                                }
                                if (propsImage.items[0].health.estado === 'inmortal') {
                                    let playerClothes = propsImage.imagen[`body_ki_${parseInt((Math.random() * 2))}`]
                                    ctxC.drawImage(playerClothes, propsImage.levelPass ? psx : propsImage.refreshData ? 10 : !propsImage.alive ? 0 : psx - 8, propsImage.direccion === 'xd' ? propsImage.posY + (parseInt(propsImage.heightY) / 2) : propsImage.posY - 7, propsImage.widthX + 16, propsImage.direccion === 'xd' ? (parseInt(propsImage.heightY) / 2) : parseInt(propsImage.heightY) + 14)
                                }
                                if (propsAction.strikeLevel > 1) {
                                    let playerClothes = propsImage.imagen[`fumado_${((propsImage.direccion !== 'xf' && propsImage.direccion !== 'xb' || armas[armasGet.enUso].state) ? 'xs' : propsImage.direccion)}_0`]
                                    ctxC.drawImage(playerClothes, propsImage.levelPass ? psx : propsImage.refreshData ? 10 : !propsImage.alive ? 0 : psx - 8, propsImage.direccion === 'xd' ? propsImage.posY + (parseInt(propsImage.heightY) / 2) : propsImage.posY - 7, propsImage.widthX + 16, propsImage.direccion === 'xd' ? (parseInt(propsImage.heightY) / 2) : parseInt(propsImage.heightY) + 14)
                                }

                                ctxC.drawImage(aDibujar, propsImage.levelPass ? psx : propsImage.refreshData ? 10 : !propsImage.alive ? 0 : psx, propsImage.direccion === 'xd' ? propsImage.posY + (parseInt(propsImage.heightY) / 2) : propsImage.posY, propsImage.widthX, propsImage.direccion === 'xd' ? (parseInt(propsImage.heightY) / 2) : parseInt(propsImage.heightY))
                                if (propsImage.items[0].health.estado === 'inmortal' && !propsAction.eating) {
                                    let playerClothes = propsImage.imagen[`inmortal_${armas[armasGet.enUso].state ? 'xf' : propsImage.direccion === 'xf' ? 'xb' : propsImage.direccion === 'xb' ? 'xf' : 'xb'}_${parseInt((Math.random() * 2))}`]
                                    ctxC.drawImage(playerClothes, psx + (armas[armasGet.enUso].state ? -2 : propsImage.direccion === 'xb' ? -4 + (1 * (propsImage.widthX / 2)) : propsImage.direccion === 'xf' ? -17 : -12),
                                        propsImage.direccion === 'xd' ? propsImage.posY + (parseInt(propsImage.heightY) / 2) - 8 : propsImage.posY - 10.5, 30, 15)
                                }
                            } else {
                                ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                                ctxC.clearRect(0, 0, canvas.width, canvas.height)
                                let position = { malo: 0, body: 0 }
                                dibujarMalos.new.map((key, i) => {
                                    if (colisioned.item === key.id) {
                                        key.imagen.map((key2, ia) => {
                                            if (key2.direccion === `evil_${propsImage.direccion}_${key.killLayer}`) {
                                                position = ia;
                                                dibujarMalos.new[i].killFotograma = dibujarMalos.new[i].killFotograma + 1;
                                                if (dibujarMalos.new[i].killFotograma === 50) {
                                                    dibujarMalos.new[i].killLayer = dibujarMalos.new[i].killLayer + 1
                                                }
                                                if (dibujarMalos.new[i].killLayer === 4) {
                                                    dibujarMalos.new[i].killLayer = 0
                                                }
                                            }
                                            ctxE.drawImage(key.imagen[position.malo].imagen, key.posX, key.posY, key.imagen[position.malo].imagen.naturalWidth / 22, key.imagen[position.malo].imagen.naturalHeight / 27)
                                        })
                                    }
                                })
                                let aDibujar = propsImage.imagen[`die_${propsImage.direccion}_${'0'}`]
                                ctxC.drawImage(aDibujar, psx, propsImage.posY, propsImage.widthX, parseInt(propsImage.heightY))
                            }
                        }
                    }
                    return { status: true }

                }
            }
        } else {
            console.log
        }
    }
    /* ----------------------------------------------------------------------------------- */
    /*      
        -------------------------- Funciones postRender ---------------------------------------
    */
    useEffect(() => {
        if (off) {
            let imgPrueba = new Image
            imgPrueba.src = `/img/body/body-body-xs-0.png`
            imgPrueba.onload = (() => {
                oImgW = imgPrueba.naturalWidth / 10
                oImgW, oImgH = imgPrueba.naturalHeight / 10
            })
            function orientacionCambiada() {
                if (window.orientation === 90 || window.orientation === 270) {
                } if (window.orientation === 0 || window.orientation === 180) {
                    if (charged) {
                        sfxObject.portraitAudio.play()
                    }
                }
            }
            obtenerOrientacion = orientacionCambiada
            window.addEventListener("orientationchange", orientacionCambiada, false);
            window.addEventListener("deviceorientation", function (event) {
                const alpha = Math.round(event.alpha);
                const beta = Math.round(event.beta);
                const gamma = Math.round(event.gamma);
                setEjes({ alpha: alpha, beta: beta, gamma: gamma })
            }, true);


            off = false
            let isMobile = new MobileDetect(navigator.userAgent)
            document.addEventListener("contextmenu", function (e) {
                e.preventDefault();
            }, false);
            if ((isMobile.is('iPhone') || isMobile.is('Android') || isMobile.tablet() !== null || isMobile.phone() !== null || isMobile.mobile() !== null)) {
                setOnMobil(true)
            }
            setTimeout(() => {
                orientacionCambiada()
                efectVolumen(true)
            }, 2000);
        }
    }, [off])
    /*  useEffect(() => {
         refreshValue()
     }, []) */
    /* ----------------------------------------------------------------------------------- */
    return (
        <>
            <ChargeComponent returnCharge={returnCharge} getOut={getOut} />
            <audio
                id='gameTrack'
                autoPlay
                loop
                controls={false}
                className='hide'
            />
            {sinCargar ?
                <></> : <>
                    <div className={onMobil ? `IDiv-main column bgGame bgGame-mobil relativeCanvasContainer ${!gameStart ? '' : 'horizontal-mode'}` : `IDiv-main column bgGame relativeCanvasContainer ${!gameStart ? '' : 'horizontal-mode'}`}>
                        {playerOnDrop.state ?
                            <InteractiveBotonCanvas comer={comer} drop={{ posX: propsImage.items[0].posX, posY: propsImage.posY }} />
                            : <></>}
                        <div className={gameStart ? "hide" : 'game-opt'}>
                            <BotonesJuego funtion={setLevelDificulty} value={playerVidas} id='vidas' name='Vidas' setValue={setPlayerVidas} />
                            {<BotonesJuego funtion={setLevelDificulty} setValue={setPlayerStage} value={playerStage} id='stage' name='Stage' />}
                            <BotonesJuego funtion={setLevelDificulty} value={player} id='level' name='Nivel' />
                            <BotonesJuego funtion={setLevelDificulty} value={dificulty} id='dificulty' name='Velocidad' />
                            <BotonesJuego volumenSet={volumenSet} volumenLevel={volumenLevel} volumenEfectsLevel={volumenEfectsLevel} efectVolumen={efectVolumen} inSound />
                            <button className="button-game into"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setGameStart(true);
                                    onMobil ? setTimeout(() => {
                                        setFullScreen(!fullScreen);
                                        requestFullScreen();
                                    }, 5) : null;
                                    initApp()
                                }}
                            >EMPEZAR JUEGO</button>
                        </div>
                        <div className={gameStart ? '' : 'ocult'}>
                            {gameStart ? <audio
                                id='gameTracak'
                                autoPlay
                                loop
                                controls={false}
                                className='hide'
                            /> : null}
                            {gameStart && playerGo.go ?
                                <MenuGame refreshValue={refreshValue} inRefreshing={inRefreshing} powerCuant={powerCuant} itemsGet={itemsGet} armasGet={armasGet} windowOpen={windowOpen} setwindowOpen={setwindowOpen} menuActive={menuActive} setmenuActive={setmenuActive}
                                    powerUpsGet={powerUpsGet} gunsGet={gunsGet} setObject={setObject} setFullScreen={setFullScreen} requestFullScreen={requestFullScreen} reboot={reboot} setGameStart={setGameStart} player={player} onMobil={onMobil} fullScreen={fullScreen} gameStart={gameStart} setProps={setProps} playerStage={playerStage} playerTime={playerTime} playerVidas={playerVidas} volumenSet={volumenSet} volumenLevel={volumenLevel} efectVolumen={efectVolumen} volumenEfectsLevel={volumenEfectsLevel} />
                                : <></>}

                            <div className={playerGo.go ? "action action-go" : 'action action-wait'}>
                                {playerGo.go ? "Go" : 'Wait'}
                            </div>
                            {onMobil ?
                                <GamePad gunsGet={gunsGet} onMobil={onMobil} itemsGet={itemsGet} armasGet={armasGet} powerUpsGet={powerUpsGet} setProps={setProps} propsAction={propsAction} setSaltoFunt={setSaltoFunt} brincar={brincar} disparar={disparar} setsalto={setsalto} dibujarMouseOn={dibujarMouseOn} /> : <></>
                            }
                            <canvas className={`${onMobil ? 'bgUrlmobil' : 'bgUrl'}-${(playerStage.stage + 1)} lienzo-${stateImage.posX} lienzoW-${parseInt(stateImage.width)} ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-Pp">
                            </canvas>
                            <canvas className={`bgcolor-${nowStage.color} lienzo-final-${parseInt(stateImage.height)} ${onMobil ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-Fn">
                            </canvas>
                            <canvas className={`lienzo-items z-mayor ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-It">
                            </canvas>
                            <canvas className={`lienzo-items ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-ItObj">
                            </canvas>
                            <canvas className={`lienzo-items ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-ItMalo">
                            </canvas> <canvas className={`lienzo-items ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-ItPlatform">
                            </canvas>
                        </div>


                    </div>
                    <div className={`IDiv-main column bgGame relativeCanvasContainer  ${!gameStart ? '' : 'vertical-mode'}`}>
                        <div className="divRotate">

                        </div>
                    </div>
                </>

            }
        </>
    )
}
export default Test2