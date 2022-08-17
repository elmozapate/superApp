import { useEffect, useState } from "react";
let off = true
let mxActive = false
let myActive = false

let propsImage = {
    imagen: [],
    posX: 0,
    posY: 0,
    widthX: 0,
    heightY: 0,
    fotograma: 0,
    direccion: 'xf',
    onMove: false,
    id: 0,
    layer: 0,
    jumping: false,
    graviti: true
}
let propsAction = {
    jumping: false,
    graviti: true
}
let canvas
let ctx
let imagenA
let imagenes = []
const Test2 = () => {
    const [stateImage, setStateImage] = useState({
        onMove: false,
        direccion: 'xf',
        posX: 1
    })
    const dibujar = async (props, value) => {
        ctx.drawImage(props.imagen[props.layer], props.posX, props.posY, props.widthX, props.heightY)
        if (!value && props.posX < 290 && props.posX > 1 && propsImage.direccion === 'xf' && (((props.posX) === (1 || 0) || (props.posX / 34.5) === (1)) || ((props.posX / 78.5) === (1)) || ((props.posX / 122.5) === (1)) || ((props.posX / 166.5) === (1)) || ((props.posX / 210.5) === (1)) || ((props.posX / 254.5) === (1)) || ((props.posX / 280) === (1)))) {
            setStateImage({
                ...stateImage,
                direccion: propsImage.direccion
            })
            moverCanvas(propsImage.direccion === 'xf' ? '+' : '-')
        }
        if (!value && props.posX < 300 && props.posX > 1 && propsImage.direccion === 'xb' && (((props.posX) === (1 || 0) || (props.posX / 20) === (1)) || ((props.posX / 64) === (1)) || ((props.posX / 108) === (1)) || ((props.posX / 152) === (1)) || ((props.posX / 196) === (1)) || ((props.posX / 240) === (1)) || ((props.posX / 277) === (1)))) {
            moverCanvas(propsImage.direccion === 'xf' ? '+' : '-')

        }

        if (imagenes[0].onMove) {
            let newModel = props

            if (propsImage.direccion === 'xf') {
                newModel.direccion = 'xf'
            } else {
                newModel.direccion = propsImage.direccion
            }
            if ((newModel.direccion === 'xf' && newModel.posX < 295) || (newModel.direccion === 'xs' && newModel.posX < 295) || (newModel.direccion === 'xb' && newModel.posX > 0)) {
                if (imagenes[0].onMove) {
                    newModel = {
                        ...newModel,
                        posY: propsAction.jumping ? propsAction.jumping && !propsAction.graviti ? newModel.posY - 0.50 : propsAction.jumping && propsAction.graviti ? newModel.posY + 0.50 : newModel.posY === 120 ? 120 : 120 : 120,
                        posX: props.direccion === 'xf' && propsImage.direccion === 'xf' ? newModel.posX + 0.125 : props.direccion === 'xb' && propsImage.direccion === 'xb' ? newModel.posX - 0.125 : newModel.posX,
                        fotograma: newModel.fotograma + 1,
                    }
                    propsImage = {
                        ...propsImage,
                        posY: propsAction.jumping ? propsAction.jumping && !propsAction.graviti ? propsImage.posY - 0.50 : propsAction.jumping && propsAction.graviti ? propsImage.posY + 0.50 : propsImage.posY === 120 ? 120 : 120 : 120,
                    }
                }

                if ((parseInt(newModel.fotograma / 2) * 2) === (parseInt(newModel.fotograma / 2) * 2)) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(newModel.imagen[newModel.layer], newModel.posX, newModel.posY, newModel.widthX, newModel.heightY)
                    if (newModel.fotograma === 10 && ((newModel.layer < 3 && propsImage.direccion === 'xf') || (newModel.layer > 0 && propsImage.direccion === 'xb'))) {
                        newModel = {
                            ...newModel,
                            fotograma: 0,
                            /*layer: 0  props.direccion === 'xf' && propsImage.direccion === 'xf' ? (newModel.layer + 1) : (newModel.layer - 1),
                         */}
                    }
                    if (propsAction.jumping) {
                        newModel = {
                            ...newModel,
                            layer: 3
                        }
                    } else {
                        if (propsImage.direccion === 'xs') {
                            newModel = {
                                ...newModel,
                                layer: 1
                            }

                        } if (propsImage.direccion === 'xf') {
                            newModel = {
                                ...newModel,
                                layer: 0
                            }

                        }
                        if (propsImage.direccion === 'xb') {
                            newModel = {
                                ...newModel,
                                layer: 2
                            }
                        }
                    }

                }
                setTimeout(() => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    const propsImageLast = propsImage
                    propsImage = {
                        ...newModel,
                        onMove: propsImageLast.onMove,
                        direccion: propsImageLast.direccion
                    }
                    dibujar(newModel)
                }, 5);
            }
            else {
                if (newModel.direccion === 'xf' && newModel.posX >= 295) {
                    propsImage.direccion = 'xb'
                    newModel = {
                        ...newModel,
                        direccion: 'xs',
                        posX: 294,
                        layer: 2,
                        fotograma: 0,
                    }
                    setStateImage({
                        ...stateImage,
                        onMove: false,
                        direccion: 'xs',
                    })
                    stopStart(true, setTimeout(() => {
                        dibujar({
                            ...newModel,
                            direccion: 'xs',
                            posX: 294,
                            layer: 2,
                            fotograma: 0,
                        }, true)
                    }, 15)
                    )
                } else
                    if (newModel.direccion === 'xb' && newModel.posX <= 0) {
                        propsImage.direccion = 'xs'
                        newModel = {
                            ...newModel,
                            direccion: 'xs',
                            posX: 1,
                            layer: 0,
                            fotograma: 0,
                        }
                        setStateImage({
                            ...stateImage,
                            onMove: false,
                            direccion: 'xs',
                        })
                        stopStart(true, setTimeout(() => {
                            dibujar({
                                ...newModel,
                                direccion: 'xs',
                                posX: 1,
                                layer: 0,
                                fotograma: 0
                            }, true)
                        }, 15)
                        )
                    }



            }
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(props.imagen[props.layer], props.posX, props.posY, props.widthX, props.heightY)

        }
    }

    const initApp = () => {
        let inPos = 0
        imagenA = new Image()
        imagenA.src = `/img/joshi-${inPos}.png`
        let otraImagen = new Image()
        otraImagen.src = `/img/foto-de-anime.png`

        /*     imagenA.style.width='200px'
            imagenA.style.height='200px' */
        let canvasB = document.getElementById('canvas-Fn')
        let ctxB = canvasB.getContext('2d')
        canvas = document.getElementById('canvas-Pp')
        ctx = canvas.getContext('2d')
        otraImagen.onload = (() => {
            ctxB.save();
            ctxB.translate(10, 100);
            ctxB.rotate(Math.PI / 2);
            ctxB.textAlign = 'right';
            ctxB.font = "30px Arial";
            ctxB.fillStyle = "blue";
            ctxB.strokeStyle = 'white';
            ctxB.fillText('INICIO', 1, 10)
            ctxB.strokeText('INICIO', 1, 10)
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
        imagenA.onload = (() => {
            imagenes[0] = { imagen: newArray, onMove: false }
            inPos++
            let newArray = propsImage.imagen
            newArray.push(imagenA)
            propsImage = {
                ...propsImage,
                imagen: newArray,
                posX: 1,
                posY: 120,
                widthX: 10,
                heightY: 35,
                fotograma: 0,
                direccion: 'xf',
                onMove: false,
                id: 0,
                layer: 0,
                jumping: false,
                graviti: true
            }
            let imagenB = new Image()
            imagenB.src = `/img/joshi-${inPos}.png`
            imagenB.onload = (() => {
                inPos++
                newArray.push(imagenB)
                propsImage = {
                    ...propsImage,
                    imagen: newArray,
                }
                let imagenC = new Image()
                imagenC.src = `/img/joshi-${inPos}.png`
                imagenC.onload = (() => {
                    inPos++
                    newArray.push(imagenC)
                    propsImage = {
                        ...propsImage,
                        imagen: newArray,
                    }
                    let imagenD = new Image()
                    imagenD.src = `/img/joshi-${inPos}.png`
                    imagenD.onload = (() => {
                        newArray.push(imagenD)
                        propsImage = {
                            ...propsImage,
                            imagen: newArray,
                        }
                        imagenes[0] = { imagen: newArray, onMove: false }
                        dibujar(propsImage);
                        document.addEventListener('keydown', async (event) => {
                            event.preventDefault();
                            var keyValue = event.key;
                            var codeValue = event.code;
                            if (keyValue === 'ArrowRight' && !mxActive) {
                                setStateImage({
                                    ...stateImage,
                                    onMove: true
                                })
                                mxActive = true
                                imagenes[0].onMove = true
                                dibujarMouseOn('+', true)
                            }
                            if (keyValue === 'ArrowRight' && mxActive) {
                                propsImage = {
                                    ...propsImage,
                                    direccion: 'xf'
                                }
                            }
                            if (keyValue === 'ArrowLeft' && !mxActive) {
                                setStateImage({
                                    ...stateImage,
                                    onMove: true
                                })
                                mxActive = true
                                imagenes[0].onMove = true
                                dibujarMouseOn('-', true)
                            }
                            if (keyValue === 'ArrowLeft' && mxActive) {
                                propsImage = {
                                    ...propsImage,
                                    direccion: 'xb'
                                }
                            }
                            if (keyValue === ' ' && !myActive) {
                                setStateImage({
                                    ...stateImage,
                                    onMove: true
                                })
                                myActive = true
                                imagenes[0].onMove = true
                                dibujarMouseOn('up', true)
                            }
                        }, false);
                        document.addEventListener('keyup', (event) => {
                            event.preventDefault()
                            var keyValue = event.key;
                            var codeValue = event.code;
                            if (keyValue === ' ') {
                            } else {
                                mxActive = false

                                if (propsImage.posX === 295 || propsImage.posX === 0 || propsImage.posX === 1) {
                                } else {
                                    if (myActive) {
                                        propsImage = {
                                            ...propsImage,
                                            direccion: 'xs'
                                        }
                                    } else {

                                        if (!mxActive) {
                                            stopStart();
                                        }
                                    }
                                }
                            }

                        }, false);
                    });

                });

            });

        });
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
                if (propsImage.direccion === 'xs') {
                    stopStart(true)
                }
                myActive = false
            }, 750);
        }, 750);

    }
    const stopStart = (aux, dibuja) => {
        if (aux) {
            imagenes[propsImage.id].onMove = !imagenes[propsImage.id].onMove;
            dibuja
        } else {
            imagenes[propsImage.id].onMove = !imagenes[propsImage.id].onMove;
            let auxChange = propsImage
            auxChange.onMove = !propsImage.onMove
            propsImage = auxChange
            setStateImage({
                ...stateImage,
                onMove: auxChange.onMove
            })
            if ((propsImage.direccion === 'xf' && propsImage.posX <= 0) || (propsImage.direccion === 'xb' && propsImage.posX >= 299)) {
                if (propsImage.direccion === 'xf' && propsImage.posX <= 0) {

                } else if (propsImage.direccion === 'xb' && propsImage.posX >= 299) {

                }

            }
            dibujar(propsImage);

        }


    }
    const darDireccion = () => {
        if (!imagenes[0].onMove && ((propsImage.direccion === 'xf' && propsImage.posX >= 1) || (propsImage.direccion === 'xb' && propsImage.posX >= 299))) {
            if ((propsImage.direccion === 'xb' && propsImage.posX >= 299)) {
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
            setStateImage({
                ...stateImage,
                direccion: auxChange.direccion
            })
        } else {
            let auxChange = propsImage
            auxChange.direccion = propsImage.direccion === 'xf' ? 'xb' : 'xf',
                auxChange.layer = propsImage.direccion === 'xf' ? 0 : 2
            propsImage = auxChange
            setStateImage({
                ...stateImage,
                direccion: auxChange.direccion
            })
            dibujar(propsImage)
        }


    }
    const dibujarMouseOn = (value, secondValue) => {
        if (value === 'up') {

            brincar()
            if (!propsImage.onMove && !imagenes[0].onMove) {
                propsImage = {
                    ...propsImage,
                    direccion: 'xs'
                }
                dibujar(propsImage)
            }

        }
        if (value === '+') {
            propsImage = {
                ...propsImage,
                onMove: true,
                direccion: 'xf'
            }
            setStateImage({
                ...stateImage,
                direccion: 'xf'
            })
            if (secondValue) {
                dibujar(propsImage)

            } else {
                stopStart()

            }
        } else {
            if (value === '-') {
                propsImage = {
                    ...propsImage,
                    onMove: true,
                    direccion: 'xb'
                }
                setStateImage({
                    ...stateImage,
                    direccion: 'xn'
                })
                if (secondValue) {
                    dibujar(propsImage)

                } else {
                    stopStart()
                }
            }

        }
    }
    const moverCanvas = (value) => {
        let auxChange = stateImage
        if (auxChange.posX <= 1 && auxChange.posX >= -100) {
            /*     if (value === '+' && auxChange.posX >= -100) {
                    auxChange.posX = (-100 / (300 / propsImage.posX));
                } else {
                    if (auxChange.posX > -20 && auxChange.posX < 1) {
                        auxChange.posX = 1
    
                    }
                }
                if (value === '-' && auxChange.posX < 1 && auxChange.posX >= -100) {
                    auxChange.posX = (-100 / (300 / propsImage.posX));
                } */
            auxChange.posX = parseInt((-100 / parseInt(300 / propsImage.posX)).toFixed()) === -7.1 || parseInt((-100 / (300 / propsImage.posX)).toFixed()) === -0 || 0 == propsImage.posX ? 1 : value === '+' ? parseInt((-100 / (300 / propsImage.posX)).toFixed()) === -7.1 ? parseInt((-100 / (300 / propsImage.posX)).toFixed()) : (parseInt((-100 / (300 / propsImage.posX)).toFixed())) : propsImage.posX === 277 ? -80 : propsImage.posX === 20 ? 1 : parseInt((-100 / (300 / (propsImage.posX - 44))).toFixed());


            setStateImage({
                ...stateImage,
                posX: auxChange.posX
            })
        }

    }
    useEffect(() => {
        if (off) {
            off = false
            initApp()
        }
    }, [off])

    return (
        <>
            <div className="IDiv-main column bgcolor-purple relativeCanvasContainer ">
                <div className="botonesCanvas" >
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
                            moverCanvas('+') : moverCanvas('-')
                    }}>{stateImage.direccion === 'xf' ?
                        'Mover a la Derecha' : 'Mover a la Izquierda'}</button>
                </div>
                <div className="botonesCanvasInteractivos" >
                    <div
                        onMouseLeave={(e) => {
                            e.preventDefault(); propsImage.posX === 0 || propsImage.posX === 1 ? console.log(propsImage, 'stop') : stopStart();
                        }}
                        onMouseEnter={(e) => {
                            e.preventDefault(); dibujarMouseOn('-')
                        }}>{`<=`}</div>
                    <div
                        onMouseLeave={(e) => {
                            e.preventDefault(); propsImage.posX === 295 ? console.log(propsImage, 'stop') : stopStart();
                        }}
                        onMouseEnter={(e) => {
                            e.preventDefault(); dibujarMouseOn('+')
                        }}>{`=>`}</div>
                </div>

                <canvas className={`lienzo-${stateImage.posX}`} id="canvas-Pp">

                </canvas>
                <canvas className={`lienzo-final`} id="canvas-Fn">

                </canvas>
            </div>
        </>
    )
}
export default Test2