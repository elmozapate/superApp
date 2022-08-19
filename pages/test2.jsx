import MobileDetect from "mobile-detect";
import { useEffect, useState } from "react";
import CrearItems, { CrearItemsWorld } from "./crearItems";
let off = true
let mxActive = false
let myActive = false
let mxDirection = {
    left: false,
    right: false
}
let levelFalses = [{
    posX: 0,
    posY: 0,
    widthX: 0,
    heightY: 0,
}]
let inLayer = 0
let propsImage = {
    alive: true,
    worldSectionIn: 0,
    imagen: [],
    posX: 0,
    posY: 0,
    widthX: 0,
    heightY: 0,
    fotograma: 0,
    direccion: 'xs',
    onMove: false,
    id: 0,
    layer: 0,
    jumping: false,
    graviti: true,
    items: [{
        displayneed: true,
        layerOnDisplay: 3,
        imagen: [],
        type: 'hpc',
        posX: 0,
        posY: 0,
        widthX: 0,
        heightY: 0,
        canMove: {
            state: true,
            colision: true,
            direction: 'auto',
            jumps: {
                posibility: true,
                interval: 0,
                speed: 0,
                maxJump: 'gravity'
            },
            walks: {
                posibility: true,
                interval: 0,
                speed: 0,
                maxArea: 'all'
            }
        },
        actions: {
            inCurse: false
        }
    }]
}
let propsAction = {
    jumping: false,
    graviti: true
}
let canvas
let levelGo = 1
let ctx
let imagenA
let canvasC
let ctxC
let canvasD
let ctxD
let imagenes = [{ onMove: false }]
let worldItems = []
const Test2 = () => {
    const [stateImage, setStateImage] = useState({
        onMove: false,
        direccion: 'xf',
        posX: -1,
        width: 1080,
        height: 720,
        level: 1,
        onMobil: false
    })
    const [onMobil, setOnMobil] = useState(false)
    const dibujar = async (values, props, value) => {
        if (values === 'go') {
            let aDibujar = (props.imagen[`${propsImage.direccion === 'xs' && props.posY < 120 ? 'xj' : propsImage.direccion}_${propsAction.graviti && props.posY < 120 ? parseInt(props.layer / (8 * 4)) < 2 ? parseInt(props.layer / (8 * 4)) + 2 : parseInt(props.layer / (8 * 4)) : !propsAction.graviti && props.posY < 120 ? parseInt(props.layer / (8 * 4)) > 1 ? parseInt(props.layer / (8 * 4)) - 2 : parseInt(props.layer / (8 * 4)) : parseInt(props.layer / (8 * 4))}`])
            let psx = 0
            let colisioned = false
            let Itemss = propsImage.items
            levelFalses.map((key, i) => {
                if (((key.posX + key.widthX) < (propsImage.items[0].posX + 10)) && (key.posX + key.widthX) > (propsImage.items[0].posX) && props.posY > 100) {
                    colisioned = true
                }
            })

            if (colisioned) {
                psx = Itemss[0].posX
                morir()
                Itemss[0].posX = 0

            } else {
                psx = Itemss[0].posX
            }
            if (!value && props.posX < 355 && props.posX > -1 && propsImage.direccion === 'xf' && (((props.posX / (31 - 0.5)) === (1)) || ((props.posX / (61 - 0.5)) === (1)) || ((props.posX / (91 - 0.5)) === (1)) || ((props.posX / (121 - 0.5)) === (1)) || ((props.posX / (151 - 0.5)) === (1)) || ((props.posX / (181 - 0.5)) === (1)) || ((props.posX / (211 - 0.5)) === (1)) || ((props.posX / (241 - 0.5)) === (1)) || ((props.posX / (271 - 0.5)) === (1)) || ((props.posX / (301 - 0.5)) === (1)) || ((props.posX / (331 - 0.5)) === (1)) || (((props.posX / (341 - 0.5)) === (1))))) {
                if (((props.posX / (341 - 0.5)) === (1))) {
                    ganar()

                } else {
                    moverCanvas()
                }
            }
            if (!value && props.posX < 351 && props.posX > 28 && propsImage.direccion === 'xb' && (((props.posX / (29 - 0.5)) === (1)) || ((props.posX / (59 - 0.5)) === (1)) ||
                ((props.posX / (89 + 0.5)) === (1)) || ((props.posX / (119 + 0.5)) === (1)) || ((props.posX / (149 + 0.5)) === (1)) || ((props.posX / (179 + 0.5)) === (1)) || ((props.posX / (209 + 0.5)) === (1)) || ((props.posX / (239 + 0.5)) === (1)) || ((props.posX / (269 + 0.5)) === (1)) || ((props.posX / (299 + 0.5)) === (1)) || ((props.posX / (319 + 0.5)) === (1)))) {
                moverCanvas()
            }
            if (imagenes[0].onMove) {
                ctxC.clearRect(0, 0, canvas.width, canvas.height)
                let newModel = props
                if (newModel.layer < (24 * 4)) {
                    newModel.layer = newModel.layer + 1
                } else {
                    newModel.layer = 0
                }

                if (propsImage.direccion === 'xf') {
                    newModel.direccion = 'xf'

                } else {
                    newModel.direccion = propsImage.direccion
                }
                if ((newModel.direccion === 'xf' && newModel.posX < 355) || (newModel.direccion === 'xs' && newModel.posX < 355) || (newModel.direccion === 'xb' && newModel.posX > 0)) {
                    if (imagenes[0].onMove) {
                        Itemss[0].posX = props.direccion === 'xf' && propsImage.direccion === 'xf' ? Itemss[0].posX + (1.25 / 2) : props.direccion === 'xb' && propsImage.direccion === 'xb' ? Itemss[0].posX - (1.25 / 2) : Itemss[0].posX,
                            newModel = {
                                ...newModel,
                                posY: propsAction.jumping && newModel.posY <= 120 ? newModel.posY === 120 && propsAction.jumping && propsAction.graviti ? 120 : !propsAction.graviti ? newModel.posY - 1.10 : propsAction.jumping && propsAction.graviti ? newModel.posY + 1.10 : newModel.posY === 50 ? 120 : 120 : 120,
                                posX: !propsImage.alive ? 0 : props.direccion === 'xf' && propsImage.direccion === 'xf' ? newModel.posX + (0.125 / 2) : props.direccion === 'xb' && propsImage.direccion === 'xb' ? newModel.posX - (0.125 / 2) : newModel.posX,
                                items: Itemss,
                                fotograma: newModel.fotograma + 1,
                            }
                        propsImage = {
                            ...propsImage,
                            posY: propsAction.jumping && propsImage.posY <= 120 ? newModel.posY === 120 && propsAction.jumping && propsAction.graviti ? 120 : propsAction.jumping && !propsAction.graviti ? propsImage.posY - 1.10 : propsAction.jumping && propsAction.graviti ? propsImage.posY + 1.10 : propsImage.posY === 120 ? 120 : 120 : 120,
                        }
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
                }, 5);
                ctxC.drawImage(aDibujar, !propsImage.alive ? 0 : psx, props.posY, props.widthX, props.heightY)
            }
        }
    }
    const morir = () => {
        levelGo = 1
        propsImage.alive = false
        worldItems = CrearItemsWorld([], levelGo)
        let toChange = propsImage.items[0]
        let whileAux = []
        whileAux.push(toChange)
        whileAux.push(worldItems)
        propsImage = {
            ...propsImage,
            items: whileAux
        }
        moverCanvas(true)
        setTimeout(() => {
            propsImage.alive = true
        }, 2500);
    }
    const ganar = () => {
        propsImage.alive = false
        worldItems = CrearItemsWorld([], (levelGo + 1))
        let canvasB = document.getElementById('canvas-Fn')
        let ctxB = canvasB.getContext('2d')
        ctxB.clearRect(0, 0, canvasB.width, canvasB.height)
        let otraImagen = new Image()
        otraImagen.src = `/img/foto-de-anime.png`
        otraImagen.onload = (() => {
            ctxB.save();
            ctxB.translate(15, 110);
            ctxB.rotate(Math.PI / 2);
            ctxB.textAlign = 'right';
            ctxB.font = "20px Arial";
            ctxB.fillStyle = "blue";
            ctxB.strokeStyle = 'white';
            ctxB.fillText(`INICIO   Lv-${levelGo}`, 12, 8)
            ctxB.strokeText(`INICIO   Lv-${levelGo}`, 12, 8)
            ctxB.restore();
            ctxB.stroke()
            ctxB.font = "50px Arial";
            ctxB.fillStyle = "red";
            ctxB.strokeStyle = 'purple';
            ctxB.fillText('FIN', 210, 60)
            ctxB.drawImage(otraImagen, 155, 50, 100, 100)
            ctxB.strokeText('FIN', 210, 60)
            ctxB.stroke()
        })
        setTimeout(() => {
            propsImage.posX = 0
            let toChange = propsImage.items[0]
            toChange.posX = 0
            let whileAux = []
            whileAux.push(toChange)
            whileAux.push(worldItems)
            propsImage = {
                ...propsImage,
                items: whileAux
            }
            levelGo = levelGo + 1
            moverCanvas(true, levelGo)
            propsImage.alive = true
        }, 2500);
    }
    const initApp = () => {
        setStateImage({
            ...stateImage,
            width: window.screen.width,
            height: window.screen.height
        })
        imagenA = new Image()
        imagenA.src = '/img/body-x-fs-0.png'
        let otraImagen = new Image()
        otraImagen.src = `/img/foto-de-anime.png`
        let canvasB = document.getElementById('canvas-Fn')
        let ctxB = canvasB.getContext('2d')
        canvasC = document.getElementById('canvas-It')
        ctxC = canvasC.getContext('2d')
        canvasD = document.getElementById('canvas-ItObj')
        ctxD = canvasD.getContext('2d')
        canvas = document.getElementById('canvas-Pp')
        ctx = canvas.getContext('2d')
        otraImagen.onload = (() => {
            ctxB.save();
            ctxB.translate(15, 110);
            ctxB.rotate(Math.PI / 2);
            ctxB.textAlign = 'right';
            ctxB.font = "20px Arial";
            ctxB.fillStyle = "blue";
            ctxB.strokeStyle = 'white';
            ctxB.fillText(`INICIO   Lv-${levelGo}`, 12, 8)
            ctxB.strokeText(`INICIO   Lv-${levelGo}`, 12, 8)
            ctxB.restore();
            ctxB.stroke()
            ctxB.font = "50px Arial";
            ctxB.fillStyle = "red";
            ctxB.strokeStyle = 'purple';
            ctxB.fillText('FIN', 210, 60)
            ctxB.drawImage(otraImagen, 155, 50, 100, 100)
            ctxB.strokeText('FIN', 210, 60)
            ctxB.stroke()
        })
        let imagesValue = ['xs', 'xf', 'xb', 'xj']
        let newArrayB = {}
        let oImgW = 0
        let oImgH = 0
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
            imagenes[0] = { imagen: newArrayB, onMove: false }
            propsImage = {
                ...propsImage,
                imagen: newArrayB,
                posX: 0,
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
            let createItems = CrearItems(newArrayB)
            worldItems = CrearItemsWorld(newArrayB, 1)
            propsImage = {
                ...propsImage,
                items: createItems
            }
            imagenes[0] = { imagen: newArrayB, onMove: true }
            dibujar('go', propsImage);
            document.addEventListener('keydown', async (event) => {
                event.preventDefault();
                let keyValue = event.key;
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
                    imagenes[0].onMove = true
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
                    imagenes[0].onMove = true
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
            makeStage()
        }, 5000);

    }
    const brincar = () => {
        propsAction = {
            ...propsAction,
            jumping: true,
            graviti: false
        }
        setTimeout(() => {
            propsAction = {
                ...propsAction,
                jumping: true,
                graviti: true
            }

            setTimeout(() => {
                propsAction = {
                    ...propsAction,
                    jumping: false,
                    graviti: false
                }
                myActive = false
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
                } d
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
    const makeStage = () => {
        for (let index = 0; index < worldItems.length; index++) {
            const element = worldItems[index];
            if (element.layerOnDisplay === inLayer && element.displayneed
            ) {
                levelFalses.push({
                    posX: element.posX,
                    posY: element.posY,
                    widthX: element.widthX,
                    heightY: element.heightY,
                })
                ctxD.beginPath();
                ctxD.moveTo(element.posX, (element.posY - element.heightY));
                ctxD.lineTo(element.posX, (element.posY));
                ctxD.lineTo(element.posX + element.widthX, (element.posY));
                ctxD.lineTo(element.posX + element.widthX, (element.posY - element.heightY));
                ctxD.closePath();
                ctxD.fillStyle = 'green';
                ctxD.moveTo(0, 0);
                ctxD.stroke();
            }
        }
    }
    const moverCanvas = (die, level) => {
        let value = '?'
        if (((propsImage.posX) - (propsImage.posX.toFixed()) / 30) - ((propsImage.posX) - (propsImage.posX.toFixed()) / 30).toFixed() > 0) {
            value = '+'
        } else {
            value = '-'
        }
        if (die) {
            inLayer = 0
        } else {
            inLayer = value === '-' ? (((((propsImage.posX - .5) / 30).toFixed()) * 1) - 1) : ((((propsImage.posX + .5) / 30).toFixed()) * 1) === 0 ? -1 : (((propsImage.posX + .5) / 30).toFixed()) * 1
        }
        console.log(inLayer);


        let theItem = propsImage.items
        theItem[0].posX = value === '+' ? 1 : 299
        propsImage = {
            ...propsImage,
            items: theItem
        }
        if (value === '+' || value === '-') {
            ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
            levelFalses = []
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
                setStateImage({
                    ...stateImage,
                    posX: value === '-' ? (((((propsImage.posX - .5) / 30).toFixed()) * 1) - 1) === 0 ? -1 : (((((propsImage.posX - .5) / 30).toFixed()) * 1) - 1) : ((((propsImage.posX + .5) / 30).toFixed()) * 1) === 0 ? -1 : (((propsImage.posX + .5) / 30).toFixed()) * 1
                })
            }
            makeStage()

        }
    }
    useEffect(() => {
        if (off) {
            off = false
            let isMobile = new MobileDetect(navigator.userAgent)
            console.log(navigator.userAgent);
            if ((isMobile.is('iPhone') || isMobile.is('Android') || isMobile.tablet() !== null || isMobile.phone() !== null || isMobile.mobile() !== null)) {
                console.log('mobil');
                setOnMobil(true)
            }

            initApp()
        }
    }, [off])

    return (
        <>
            <div className="IDiv-main column bgcolor-purple relativeCanvasContainer ">
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
                                imagenes[0].onMove = true
                                dibujarMouseOn('-', true)
                                propsImage = {
                                    ...propsImage,
                                    direccion: 'xb'
                                }
                            }}>{`<=`}</button>

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
                                console.log('mueve');
                                mxActive = true
                                imagenes[0].onMove = true
                                dibujarMouseOn('+', true)
                                propsImage = {
                                    ...propsImage,
                                    direccion: 'xf'
                                }
                            }}>{`=>`}</button>
                    </div>
                    <button
                        onTouchEnd={ () => {
                            setTimeout(() => {
                                let nowJump = propsAction
                                nowJump.graviti = true
                                propsAction = {
                                    ...propsAction,
                                    ...nowJump
                                }
                            }, 30);
                        } }
                        onTouchStart={!propsAction.jumping ? (e) => {
                            brincar()
                        } : null}>{`BRINCA`}</button>
                </div>

                <canvas className={`lienzo-${stateImage.posX} lienzoW-${parseInt(stateImage.width)} lienzoH-${parseInt(stateImage.height)}`} id="canvas-Pp">

                </canvas>
                <canvas className={`lienzo-final-${parseInt(stateImage.height)}`} id="canvas-Fn">

                </canvas>
                <canvas className={`lienzo-items`} id="canvas-It">

                </canvas>
                <canvas className={`lienzo-items`} id="canvas-ItObj">

                </canvas>
            </div>
        </>
    )
}
export default Test2