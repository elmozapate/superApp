import MobileDetect from "mobile-detect";
import { useEffect, useState } from "react";
import BotonesJuego from "./botonesJuego";
import CrearItems, { CrearItemsWorld, LosFondos, PropsImage } from "./crearItems";
let off = true, jump, audioPp, actualVidas = 5, mxActive = false, myActive = false, mxDirection = { left: false, right: false }, auxnow = 0, gameStage = 1, levelFalses = [{
    posX: 0,
    posY: 0,
    widthX: 0,
    heightY: 0,
}], imagenesSrc = [`/img/foto-de-anime-4.png`, `/img/foto-de-anime-3.png`, `/img/foto-de-anime-2.png`, `/img/foto-de-anime-1.png`, `/img/foto-de-anime-0.png`], fondos = LosFondos, inLayer = 0, propsImage = PropsImage, propsAction = { jumping: false, graviti: true }, canvas, levelGo = 1, ctx,
    imagenA, canvasC, ctxC, canvasB, ctxB, canvasD, ctxD, imagenes = [{ onMove: false }], worldItems = [], timeRestart = false, levelDificulty = 10
const Test2 = () => {
    const [dificulty, setDificulty] = useState(10)
    const [nowStage, setNowStage] = useState({
        color: 'green',
        stage: 0
    })
    const [gameStart, setGameStart] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const [stateImage, setStateImage] = useState({
        onMove: false, direccion: 'xf', posX: -1, width: 1080, height: 720, level: 1, onMobil: false
    })
    const [playerGo, setPlayerGo] = useState({ go: false })
    const [playerStage, setPlayerStage] = useState({ stage: 0 })
    const [playerVidas, setPlayerVidas] = useState({ vidas: 5 })
    const [playerTime, setPlayertime] = useState({ time: 0, timeRestart: false })
    const [player, setPlayer] = useState({
        level: 0,
    })
    const [onMobil, setOnMobil] = useState(false)
    const [salto, setsalto] = useState({
        graviti: true,
        jumping: false,
        posY: 120,
        myActive: false
    })
    const setSaltoFunt = () => {
        return (
            {
                graviti: propsAction.graviti,
                jumping: propsAction.jumping,
                posY: propsImage.posY,
                myActive: myActive
            })
    }
    const morir = () => {
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
            setPlayerVidas({
                ...playerVidas,
                vidas: actualVidas
            })
            setTimeout(() => {
                propsImage.posX = 0
                propsImage.items[0].posX = 0
                propsImage.posY = 120
                inLayer = 0
                imagenes[0].onMove = true
                setStateImage({
                    ...stateImage,
                    posX: -1
                })
                ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                makeStage()
                setPlayerGo({
                    ...playerGo,
                    go: true
                })
                audioPp.src = `/audio/gameSound-${playerStage.stage}.mp3`
                dibujar('go', propsImage)
                propsImage.alive = true
            }, 5000);
        } else {
            laFunt(propsImage, propsImage.items[0].posX)
            setTimeout(() => {
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
                off = true, actualVidas = 5; mxActive = false; myActive = false; mxDirection = { left: false, right: false }; auxnow = 0; gameStage = 1; levelFalses = [{
                    posX: 0,
                    posY: 0,
                    widthX: 0,
                    heightY: 0,
                }]; imagenesSrc = [`/img/foto-de-anime-4.png`, `/img/foto-de-anime-3.png`, `/img/foto-de-anime-2.png`, `/img/foto-de-anime-1.png`, `/img/foto-de-anime-0.png`]; fondos = LosFondos; inLayer = 0; propsImage = PropsImage; propsAction = { jumping: false, graviti: true }; levelGo = 1; ctx;
                imagenA; canvasC; ctxC; canvasB; ctxB; canvasD; ctxD; imagenes = [{ onMove: false }]; worldItems = []; timeRestart = false; levelDificulty = 10
            }, 6000);
        }
    }
    const darVida = (theLevel, value2) => {
        setTimeout(() => {
            propsImage.posX = 0
            propsImage.items[0].posX = 0
            let toChange = propsImage.items[0]
            actualVidas = 5
            levelGo = theLevel
            propsImage.alive = false
            worldItems = CrearItemsWorld([], theLevel)
            let whileAux = []
            whileAux.push(toChange)
            whileAux.push(worldItems)
            propsImage.items = whileAux
            aparecer(theLevel)

            if (!value2) {
                moverCanvas(true)
                setTimeout(() => {
                    imagenes[0].onMove = true
                    setPlayerVidas({
                        ...playerVidas,
                        vidas: 5
                    })
                    propsImage.alive = true
                    setPlayerGo({
                        ...playerGo,
                        go: true
                    })
                    dibujar('go', propsImage)
                }, 2500);
            }
        }, 2500);
    }
    const dibujar = async (values, Props, value) => {
        let props = Props
        let propsimage = propsImage
        if (values === 'go' && props.posX <= (341 - 0.5) && imagenes[0].onMove) {
            props.Itemss
            let aDibujar = (props.imagen[`${propsImage.direccion === 'xs' && props.posY < 120 ? 'xj' : propsImage.direccion}_${propsAction.graviti && props.posY < 120 ? parseInt(props.layer / (8 * 4)) < 2 ? parseInt(props.layer / (8 * 4)) + 2 : parseInt(props.layer / (8 * 4)) : !propsAction.graviti && props.posY < 120 ? parseInt(props.layer / (8 * 4)) > 1 ? parseInt(props.layer / (8 * 4)) - 2 : parseInt(props.layer / (8 * 4)) : parseInt(props.layer / (8 * 4))}`])
            let psx = 0, colisioned = false, Itemss = propsImage.items
            levelFalses.map((key, i) => {
                if (((key.posX - 15) < (propsImage.items[0].posX)) && (((key.posX + key.widthX) - 5) > (propsImage.items[0].posX)) && props.posY > 110) {
                    ctxD.save();
                    ctxD.font = "40px Arial";
                    ctxD.fillStyle = "red";
                    ctxD.strokeStyle = 'white';
                    ctxD.fillText(actualVidas > 1 ? `MUERTISIMO` : 'GAME OVER', 30, 50)
                    ctxD.strokeText(actualVidas > 1 ? `MUERTISIMO` : 'GAME OVER', 30, 50)
                    ctxD.restore();
                    ctxD.stroke()
                    colisioned = true
                }
            })
            if (colisioned) {
                console.log('murios');
                audioPp.src = '/audio/die.mp3'
                psx = Itemss[0].posX
                morir()
                Itemss[0].posX = 0
            } else {
                if (propsImage.refreshData) {
                    psx = propsimage.items[0].posX
                } else {
                    psx = Itemss[0].posX
                }
            }
            if (!value && props.posX <= (341 - 0.5) && props.posX > -1 && propsImage.direccion === 'xf' && (((props.posX / (31 - 0.5)) === (1)) || ((props.posX / (61 - 0.5)) === (1)) || ((props.posX / (91 - 0.5)) === (1)) || ((props.posX / (121 - 0.5)) === (1)) || ((props.posX / (151 - 0.5)) === (1)) || ((props.posX / (181 - 0.5)) === (1)) || ((props.posX / (211 - 0.5)) === (1)) || ((props.posX / (241 - 0.5)) === (1)) || ((props.posX / (271 - 0.5)) === (1)) || ((props.posX / (301 - 0.5)) === (1)) || ((props.posX / (331 - 0.5)) === (1)) || (((props.posX / (341 - 0.5)) === (1)))) && propsImage.alive && !propsImage.levelPass) {
                moverCanvas()
            }
            if (!value && props.posX < 351 && props.posX > 28 && propsImage.direccion === 'xb' && (((props.posX / (29 - 0.5)) === (1)) || ((props.posX / (59 - 0.5)) === (1)) ||
                ((props.posX / (89 + 0.5)) === (1)) || ((props.posX / (119 + 0.5)) === (1)) || ((props.posX / (149 + 0.5)) === (1)) || ((props.posX / (179 + 0.5)) === (1)) || ((props.posX / (209 + 0.5)) === (1)) || ((props.posX / (239 + 0.5)) === (1)) || ((props.posX / (269 + 0.5)) === (1)) || ((props.posX / (299 + 0.5)) === (1)) || ((props.posX / (319 + 0.5)) === (1)))) {
                moverCanvas()
            }
            else {
                console.log
            }
            if (imagenes[0].onMove) {
                ctxC.clearRect(0, 0, canvas.width, canvas.height)

                let newModel = props
                if (newModel.layer < (24 * 4)) {
                    newModel.layer = newModel.layer + 1
                } else { newModel.layer = 0 } if (propsImage.direccion === 'xf') {
                    newModel.direccion = 'xf'
                } else {
                    newModel.direccion = propsImage.direccion
                }
                if ((newModel.direccion === 'xf' && newModel.posX < 342) || (newModel.direccion === 'xs' && newModel.posX < 355) || (newModel.direccion === 'xb' && newModel.posX > 0)) {
                    Itemss[0].posX = propsImage.refreshData ? psx : propsImage.levelPass ? psx : props.direccion === 'xf' && propsImage.direccion === 'xf' ? propsAction.jumping || newModel.posY < 120 ? Itemss[0].posX + ((1.25 / (40 * (1 / (levelDificulty))))) : Itemss[0].posX + ((1.25 / (40 * (1 / (levelDificulty))))) : props.direccion === 'xb' && propsImage.direccion === 'xb' ? propsAction.jumping || newModel.posY < 120 ? Itemss[0].posX - ((1.25 / (40 * (1 / (levelDificulty))))) : Itemss[0].posX - ((1.25 / (40 * (1 / (levelDificulty))))) : Itemss[0].posX
                    newModel = {
                        ...newModel,
                        posY: propsAction.jumping && newModel.posY <= 120 ? newModel.posY === 120 && propsAction.jumping && propsAction.graviti ? 120 : !propsAction.graviti ? newModel.posY - 1.10 : propsAction.jumping && propsAction.graviti ? newModel.posY + 1.10 : newModel.posY === 50 ? 120 : 120 : 120,
                        posX: propsImage.refreshData ? props.posX : propsImage.levelPass ? props.posX : !propsImage.alive ? 0 : props.direccion === 'xf' && propsImage.direccion === 'xf' ? propsAction.jumping || newModel.posY < 120 ? newModel.posX + ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX + ((0.125 / (40 * (1 / (levelDificulty))))) : props.direccion === 'xb' && propsImage.direccion === 'xb' ? propsAction.jumping || newModel.posY < 120 ? newModel.posX - ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX - ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX,
                        items: propsImage.levelPass || !propsImage.alive ? props.items : Itemss,
                        fotograma: newModel.fotograma + 1,
                    }
                    propsImage = {
                        ...propsImage,
                        posX: propsImage.refreshData ? 0 : propsImage.levelPass ? props.posX : !propsImage.alive ? 0 : props.direccion === 'xf' && propsImage.direccion === 'xf' ? propsAction.jumping || newModel.posY < 120 ? newModel.posX + ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX + ((0.125 / (40 * (1 / (levelDificulty))))) : props.direccion === 'xb' && propsImage.direccion === 'xb' ? propsAction.jumping || newModel.posY < 120 ? newModel.posX - ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX - ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX,
                        posY: propsAction.jumping && propsImage.posY <= 120 ? newModel.posY === 120 && propsAction.jumping && propsAction.graviti ? 120 : propsAction.jumping && !propsAction.graviti ? propsImage.posY - 1.10 : propsAction.jumping && propsAction.graviti ? propsImage.posY + 1.10 : propsImage.posY === 120 ? 120 : 120 : 120,
                    }
                }
                setTimeout(() => {
                    const propsImageLast = propsImage
                    propsImage = {
                        ...newModel,
                        onMove: propsImageLast.onMove,
                        direccion: propsImageLast.direccion,
                    }
                    dibujar('go', newModel)
                    if (propsImage.posX > (341 - 0.5)) {
                        setTimeout(() => {
                            propsImage.posX = 0
                            moverCanvas()
                        }, 4000);

                    }
                }, 5);
                ctxC.drawImage(aDibujar, propsImage.levelPass ? psx : propsImage.refreshData ? 10 : !propsImage.alive ? 0 : psx, props.posY, props.widthX, props.heightY)
            }
        } else {
            propsimage.items[0].posX = 10
        }
    }
    const aparecer = (level) => {
        let otraImagen = new Image()
        ctxB = canvasB.getContext('2d')
        ctxB.clearRect(0, 0, canvasB.width, canvasB.height)
        otraImagen.src = imagenesSrc[fondos.length - 1]
        otraImagen.onload = (() => {
            ctxB.save();
            ctxB.translate(15, 110);
            ctxB.rotate(Math.PI / 2);
            ctxB.textAlign = 'right';
            ctx.textBaseline = "middle";
            const ctext = `Mundo${level} Lv-${(player.level)}`.split("").join(String.fromCharCode(8202))
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
        let aDibujar = (props.imagen[`${propsImage.direccion === 'xs' && props.posY < 120 ? 'xj' : propsImage.direccion}_${propsAction.graviti && props.posY < 120 ? parseInt(props.layer / (8 * 4)) < 2 ? parseInt(props.layer / (8 * 4)) + 2 : parseInt(props.layer / (8 * 4)) : !propsAction.graviti && props.posY < 120 ? parseInt(props.layer / (8 * 4)) > 1 ? parseInt(props.layer / (8 * 4)) - 2 : parseInt(props.layer / (8 * 4)) : parseInt(props.layer / (8 * 4))}`])
        let newModel = props
        if (newModel.layer < (24 * 4)) {
            newModel.layer = newModel.layer + 1
        } else { newModel.layer = 0 }
        newModel.direccion = 'xs'
        ctxC.drawImage(aDibujar, posFix, props.posY, props.widthX, props.heightY)
        if (imagenes[0].onMove === false) {
            setTimeout(() => {
                ctxC.clearRect(0, 0, canvas.width, canvas.height)
                laFunt(props, posFix)
            }, 5);
        }
    }
    const startTime = (time) => {
        if (timeRestart) {
            setPlayertime({
                timeRestart: true,
                time: time
            })
        }
        else {
            setPlayertime({
                ...playerTime,
                timeRestart: false,
                time: time + 1
            })
            setTimeout(() => {
                startTime(propsImage.refreshData ? 0 : imagenes[0].onMove ? time + 1 : time)
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

        setStateImage({
            ...stateImage,
            width: window.screen.width,
            height: window.screen.height
        })
        imagenA = new Image()
        imagenA.src = '/img/body-x-fs-0.png'
        canvasB = document.getElementById('canvas-Fn')
        ctxB = canvasB.getContext('2d')
        canvasC = document.getElementById('canvas-It')
        ctxC = canvasC.getContext('2d')
        canvasD = document.getElementById('canvas-ItObj')
        ctxD = canvasD.getContext('2d')
        canvas = document.getElementById('canvas-Pp')
        ctx = canvas.getContext('2d')
        aparecer(levelGo)
        let imagesValue = ['xs', 'xf', 'xb', 'xj'], newArrayB = {}, oImgW = 0, oImgH = 0
        imagesValue.map((key, i) => {
            for (let index = 0; index < 4; index++) {
                new Image()
                let element = new Image
                element.src = `/img/body-${key}-${index}.png`
                element.onload = (() => {
                    oImgW = element.naturalWidth / 10
                    oImgH = element.naturalHeight / 10
                    newArrayB = {
                        ...newArrayB,
                        [`${key}_${index}`]: element
                    }
                })
            }
        })
        setTimeout(() => {
            imagenes[0] = { imagen: newArrayB, onMove: true }
            startTime(0)
            propsImage = {
                ...propsImage,
                imagen: newArrayB,
                posY: 145,
                widthX: oImgW,
                heightY: oImgH,
                fotograma: 0,
                direccion: 'xs',
                onMove: false,
                id: 0,
                layer: 0,
                jumping: false,
                graviti: true
            }
            let createItems = CrearItems(newArrayB, levelGo > 0 ? 0 : 10)
            worldItems = CrearItemsWorld(newArrayB, levelGo)
            propsImage = {
                ...propsImage,
                items: createItems
            }
            dibujar('go', propsImage);
            document.addEventListener('keydown', async (event) => {
                event.preventDefault();
                let keyValue = event.key;
                if (keyValue === 'ArrowUp') {
                    requestFullScreen()
                }
                if (keyValue === 'ArrowRight' && !mxActive && !mxDirection.left) {
                    mxActive = true
                    mxDirection = {
                        ...mxDirection,
                        left: false,
                        right: true
                    }
                    propsImage = {
                        ...propsImage,
                        direccion: 'xf'
                    }
                    dibujarMouseOn('+', true)
                } else {
                    if ((keyValue === 'ArrowRight' && mxActive)) {
                        propsImage = {
                            ...propsImage,
                            direccion: 'xf'
                        }
                        mxDirection = {
                            ...mxDirection,
                            left: false,
                            right: true
                        }
                    } else
                        if ((keyValue === 'ArrowRight' && mxActive && mxDirection.left)) {
                            propsImage = {
                                ...propsImage,
                                direccion: 'xf'
                            }
                            mxDirection = {
                                ...mxDirection,
                                left: false,
                                right: true
                            }
                        }
                }
                if (keyValue === 'ArrowLeft' && !mxActive) {
                    mxActive = true
                    dibujarMouseOn('-', true)
                    propsImage = {
                        ...propsImage,
                        direccion: 'xb'
                    }
                } else {
                    if ((keyValue === 'ArrowLeft' && mxActive)) {
                        propsImage = {
                            ...propsImage,
                            direccion: 'xb'
                        }
                        mxDirection = {
                            ...mxDirection,
                            left: true,
                            right: false
                        }
                    } else
                        if ((keyValue === 'ArrowLeft' && mxActive && mxDirection.left)) {
                            propsImage = {
                                ...propsImage,
                                direccion: 'xb'
                            }
                            mxDirection = {
                                ...mxDirection,
                                left: true,
                                right: false
                            }
                        }
                }
                if (keyValue === ' ' && !myActive) {
                    myActive = true
                    dibujarMouseOn('up', true)
                }
            }, false);
            document.addEventListener('keyup', (event) => {
                event.preventDefault()
                let keyValue = event.key;
                if (keyValue === ' ') {
                    if (propsAction.jumping) {
                        setTimeout(() => {
                            let nowJump = propsAction
                            nowJump.graviti = true
                            propsAction = {
                                ...propsAction,
                                ...nowJump
                            }
                        }, 30);
                    }
                } else {
                    if (mxActive && (keyValue === 'ArrowLeft' || keyValue === 'ArrowRight')) {
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
                                direccion: 'xf'
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
                                direccion: 'xb'
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
                                direccion: 'xb'
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
            audioPp = document.getElementById('gameTrack')
            setHalfVolume()
            makeStage()
        }, 5000);
    }
    const setHalfVolume = (pista) => {
        console.log(pista, playerStage.stage);
        audioPp.volume = 1;
        audioPp.src = `/audio/gameSound-${pista ? pista - 1 : playerStage.stage}.mp3`
    }

    const brincar = () => {
        jump.play()
        propsAction = {
            ...propsAction,
            jumping: true,
            graviti: false
        }
        setsalto(setSaltoFunt())
        myActive = true
        setTimeout(() => {
            propsAction = {
                ...propsAction,
                jumping: true,
                graviti: true
            }
            jump.pause();
            jump.currentTime = 0;
            setsalto(setSaltoFunt())
            setTimeout(() => {
                propsAction = {
                    ...propsAction,
                    jumping: false,
                    graviti: false
                }
                myActive = false
                setsalto(setSaltoFunt())

            }, 400);
        }, 400);
    }
    const stopStart = () => {
        console.log('inutil');
    }
    const darDireccion = () => {
        if (!imagenes[0].onMove && ((propsImage.direccion === 'xf' && propsImage.posX >= 1) || (propsImage.direccion === 'xb' && propsImage.posX >= 304))) {
            if ((propsImage.direccion === 'xb' && propsImage.posX >= 304)) {
                window.alert('pero hacia donde. no hay pa donde viejo/a')
            } else
                if ((propsImage.direccion === 'xf' && propsImage.posX <= 1)) {
                    window.alert('pero hacia donde. no hay pa donde viejo/a')
                }
        }
        if (imagenes[0].onMove) {
            let auxChange = propsImage
            auxChange.direccion = propsImage.direccion === 'xf' ? 'xb' : 'xf'
            propsImage = auxChange
        } else {
            let auxChange = propsImage
            auxChange.direccion = propsImage.direccion === 'xf' ? 'xb' : 'xf',
                auxChange.layer = propsImage.direccion === 'xf' ? 0 : 2
            propsImage = auxChange
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
                direccion: 'xf'
            }
        } else {
            if (value === '-') {
                propsImage = {
                    ...propsImage,
                    onMove: true,
                    direccion: 'xb'
                }
            }
        }
    }
    const makeStage = (value = '+') => {
        propsImage.posY = 120
        levelFalses = []
        for (let index = 0; index < worldItems.length; index++) {
            let otraImagen = new Image()
            otraImagen.src = `/img/obst-${Math.floor(Math.random() * 2)}.png`
            otraImagen.onload = (() => {
                const element = worldItems[index];
                if (element.layerOnDisplay === inLayer && element.displayneed
                ) {
                    levelFalses.push({
                        posX: element.posX,
                        posY: element.posY,
                        widthX: element.widthX,
                        heightY: element.heightY,
                    })

                    /*   ctxD.beginPath();
                      ctxD.moveTo(element.posX, (element.posY - element.heightY));
                      ctxD.lineTo(element.posX, (element.posY));
                      ctxD.lineTo(element.posX + element.widthX, (element.posY));
                      ctxD.lineTo(element.posX + element.widthX, (element.posY - element.heightY));
                      ctxD.closePath();
                      ctxD.fillStyle = 'green';
                      ctxD.moveTo(0, 0);
                      ctxD.stroke(); */
                    ctxD.drawImage(otraImagen, element.posX, element.posY - 30, otraImagen.naturalWidth / 14, otraImagen.naturalHeight / 25)

                }
            })

        }
        myActive = false
        if (inLayer !== 0) {
            propsImage.items[0].posY = 120
            setTimeout(() => {
                propsImage.items[0].posY = 120
                propsImage.posY = 120
                propsAction = {
                    ...propsAction,
                    jumping: false,
                    graviti: true
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
            }, 10);
        } else {
            setPlayerGo({
                ...playerGo,
                go: true
            })
        }
    }
    const moverCanvas = (die, level, props, auxBoolean) => {
        if (auxBoolean) {
            makeStage((playerStage.stage + 1))
        } else {
            let value = '?'
            if (((propsImage.posX) - (propsImage.posX.toFixed()) / 30) - ((propsImage.posX) - (propsImage.posX.toFixed()) / 30).toFixed() > 0) {
                value = '+'
            } else {
                value = '-'
            }

            if (die === true && level === true) {
                imagenes[0].onMove = true
                propsImage.posX = 10
                propsImage.refreshData = false
                propsImage.levelPass = false
            }
            if (die || level) {
                inLayer = 0
            } else {
                inLayer = die && level ? 0 : value === '-' ? (((((propsImage.posX - .5) / 30).toFixed()) * 1) - 1) : ((((propsImage.posX + .5) / 30).toFixed()) * 1) === 0 ? -1 : (((propsImage.posX + .5) / 30).toFixed()) * 1
            }
            setPlayer({
                ...player,
                level: inLayer,
            })
            setPlayerGo({
                ...playerGo,
                go: false
            })
            if (inLayer === 11 && gameStage === 5 && levelGo === 5) {
                window.alert('melo papi ganaste')
            } else {
                if (inLayer === 11) {
                    audioPp.src = `/audio/pass.mp3`

                    if (levelGo === 5) {
                        fondos = fondos.slice(1, fondos.length)
                        setTimeout(() => {
                            setNowStage({
                                ...nowStage,
                                color: fondos[0],
                                stage: nowStage.stage + 1
                            })
                        }, 4500);

                        levelDificulty = levelDificulty < 40 ? levelDificulty * 2 : levelDificulty + 40
                        setDificulty(levelDificulty)

                        gameStage = gameStage + 1
                        levelGo = 1
                        setPlayerVidas({
                            ...playerVidas,
                            vidas: playerVidas.vidas + 3
                        })
                    } else {

                        levelGo = levelGo + 1
                    }
                    setStateImage({
                        ...stateImage,
                        posX: 11
                    })
                    levelFalses = []
                    imagenes[0].onMove = false
                    propsImage.levelPass = true
                    ctxD.save();
                    ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                    ctxD.font = "40px Arial";
                    ctxD.fillStyle = "greem";
                    ctxD.strokeStyle = 'white';
                    ctxD.fillText('BRAVISIMO', 30, 50)
                    ctxD.strokeText(`BRAVISIMO`, 30, 50)
                    ctxD.restore();
                    ctxD.stroke();
                    auxnow = auxnow + 1
                    setPlayerGo({
                        ...playerGo,
                        go: false
                    })
                    setPlayerStage({
                        ...playerStage,
                        stage: gameStage
                    })
                    const lastProp = propsImage
                    laFunt(lastProp, 90)
                    setPlayerGo({
                        ...playerGo,
                        go: false
                    })
                    setTimeout(() => {
                        ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                        propsImage.refreshData = true
                        propsImage.alive = false
                        worldItems = CrearItemsWorld([], (levelGo))
                        setPlayerStage({
                            ...playerStage,
                            stage: levelGo - 1
                        })
                        aparecer(levelGo)
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
                        setPlayertime({
                            timeRestart: false,
                            time: 0
                        })
                        propsImage.posX = 0
                        propsImage.items[0].posX = 0
                        propsImage.direccion = 'xs'
                        propsImage.levelPass = false
                        propsImage.refreshData = false
                        propsImage.alive = true
                        inLayer = 0
                        makeStage(levelGo)
                        dibujar('go', propsImage)
                        setTimeout(() => {
                            setHalfVolume(levelGo)
                        }, 1000);

                    }, 5000);
                } else {
                    if (value === '+' || value === '-' || die || level) {
                        ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                        levelFalses = []
                        if (level && die) {
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
                        }
                        makeStage(value)
                        if (die || level) {
                            setStateImage({
                                ...stateImage,
                                onMove: false,
                                direccion: 'xs',
                                posX: -1,
                                width: 1080,
                                height: 720,
                                level: level ? levelGo : 1
                            })
                            propsImage = {
                                ...propsImage,
                                posX: 0,
                                posY: 145,
                                fotograma: 0,
                                direccion: 'xs',
                                onMove: false,
                                layer: 0,
                                jumping: false,
                                graviti: true
                            }
                        } else {
                            propsImage.items[0].posX = value === '+' ? 1 : 299
                            setStateImage({
                                ...stateImage,
                                posX: level ? -1 : propsImage.refreshData ? -1 : value === '-' ? (((((propsImage.posX - .5) / 30).toFixed()) * 1) - 1) === 0 ? -1 : (((((propsImage.posX - .5) / 30).toFixed()) * 1) - 1) : ((((propsImage.posX + .5) / 30).toFixed()) * 1) === 0 ? -1 : (((propsImage.posX + .5) / 30).toFixed()) * 1
                            })
                        }
                    }
                }
            }

        }
    }
    useEffect(() => {
        if (off) {
            jump = new Audio('/audio/jump.mp3');
            jump.volume = 0.2;
            off = false
            let isMobile = new MobileDetect(navigator.userAgent)
            document.addEventListener("contextmenu", function (e) {
                e.preventDefault();
            }, false);
            if ((isMobile.is('iPhone') || isMobile.is('Android') || isMobile.tablet() !== null || isMobile.phone() !== null || isMobile.mobile() !== null)) {
                setOnMobil(true)
            }
/*             initApp()
 */        }
    }, [off])
    return (
        <>
            <div className="IDiv-main column bgGame relativeCanvasContainer ">
                <div className={gameStart ? "hide" : 'game-opt'}>
                    <BotonesJuego funtion={setLevelDificulty} value={playerVidas} id='vidas' name='Vidas' setValue={setPlayerVidas} />
                    {<BotonesJuego funtion={setLevelDificulty} setValue={setPlayerStage} value={playerStage} id='stage' name='Stage' />}
                    <BotonesJuego funtion={setLevelDificulty} value={player} id='level' name='Nivel' />
                    <BotonesJuego funtion={setLevelDificulty} value={dificulty} id='dificulty' name='Velocidad' />


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
                        id='gameTrack'
                        autoPlay
                        loop
                        controls={false}
                        className='hide'
                    /> : null}
                    <div className="game-info">
                        <span>STAGE:{playerStage.stage}</span>
                        <span>NIVEL:{player.level}</span>
                        <span>VIDAS:{playerVidas.vidas}</span>
                        <span>TIEMPO:{playerTime.time}</span>
                        <button
                            className={onMobil ? "" : 'hide'}
                            onClick={(e) => {
                                e.preventDefault();
                                setFullScreen(!fullScreen);
                                requestFullScreen()
                            }}>{fullScreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN'}</button>
                        <div></div>
                    </div>
                    <div className={playerGo.go ? "action action-go" : 'action action-wait'}>
                        {playerGo.go ? "Go" : 'Wait'}
                    </div>
                    <div className={!onMobil ? "botonesCanvas" : 'hide'} >
                        <button onClick={(e) => {
                            e.preventDefault();
                            stopStart()
                        }}>{stateImage.onMove === false ?
                            'MOVER' : 'PARAR'}</button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            darDireccion()
                        }}>{stateImage.direccion === 'xf' ?
                            ' Derecha' : ' Izquierda'}</button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            stateImage.direccion === 'xf' ?
                                moverCanvas() : moverCanvas()
                        }}>{stateImage.direccion === 'xf' ?
                            'Mover a la Derecha' : 'Mover a la Izquierda'}</button>
                    </div>
                    <div className={!onMobil ? 'hide' : "botonesCanvasInteractivos"}>
                        <button
                            onTouchEnd={() => {
                                setTimeout(() => {
                                    propsAction.graviti = true
                                }, 30);
                            }}
                            onTouchStart={!propsAction.jumping ? (e) => {
                                setsalto(setSaltoFunt());
                                brincar()
                            } : (e) => {
                                setsalto(setSaltoFunt())
                            }}>{salto.graviti ? 'G' : '!G'}{salto.jumping ? 'J' : '!J'}{salto.posX}{salto.myActive ? 'Y' : '!Y'}</button>
                        <div>
                            <button
                                onTouchEnd={(e) => {
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
                                }}
                                onTouchStart={(e) => {
                                    mxActive = true
                                    dibujarMouseOn('-', true)
                                    propsImage = {
                                        ...propsImage,
                                        direccion: 'xb'
                                    }
                                }}></button>
                            <button
                                onTouchEnd={(e) => {
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
                                }}
                                onTouchStart={(e) => {
                                    mxActive = true
                                    dibujarMouseOn('+', true)
                                    propsImage = {
                                        ...propsImage,
                                        direccion: 'xf'
                                    }
                                }}></button>
                        </div>
                    </div>
                    <canvas className={`${onMobil ? 'bgUrlmobil' : 'bgUrl'}-${(playerStage.stage + 1)} lienzo-${stateImage.posX} lienzoW-${parseInt(stateImage.width)} ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-Pp">
                    </canvas>
                    <canvas className={`bgcolor-${nowStage.color} lienzo-final-${parseInt(stateImage.height)} ${onMobil ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-Fn">
                    </canvas>
                    <canvas className={`lienzo-items ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-It">
                    </canvas>
                    <canvas className={`lienzo-items ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-ItObj">
                    </canvas>


                </div>
            </div>

        </>
    )
}
export default Test2