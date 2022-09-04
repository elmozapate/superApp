import MobileDetect from "mobile-detect";
import { useEffect, useState } from "react";
import BotonesJuego from "./botonesJuego";
import Colisonador from "./colisionador";
import ColisionBasica from "./colisionBasica";
import CrearItems, { CrearItemsWorld, LosFondos, PropsImage } from "./crearItems";
import GamePad from "./gamePad";
import BebeXf, { BebeXb } from "./prototiposSprites/protoBaby";
import BodyXf from "./prototiposSprites/protoBody";
import SierraXf from "./prototiposSprites/protoSierra";

let off = true, yaWey = true, colisioned = {
    state: false,
    item: 0,
    result: 'live'
}, obst = [], dolor = true, sierra = true, timeOfgame = 0, actualFloor = 150, lastDireccion = 'xf', armas = {
    bat: {
        onHit: false,
        damage: 7,
        sound: true,
        body: true,
        type: 'strike',
        speed: 1,
        state: false,
        fotograma: 0,
        layer: 0,
        onEnd: false,
        kills: [],
        imagenes: []
    },
}, WeaponAudio = [true, true], audioPlaying = 0, jump, obtenerOrientacion = console.log, pass, audioPp, actualVidas = 5, mxActive = false, myActive = false, fantasmas = [], dibujarMalos = {
    die: false, last: [], new: []
}, mxDirection = { left: false, right: false }, portraitAudio, auxnow = 0, gameStage = 1, proyectiles = [], malosFalses = [{ posX: 150, posY: 0, widthX: 0, heightY: 0, }], levelFalses = [{ posX: 150, posY: 0, widthX: 0, heightY: 0, }], proyectilesFalses = [], risabebe, llantobebe, muertebebe, joshisound, joshisound2, joshisound3 = [true, true, true, true], pow, proyectilesImg = [], imagenesSrc = [`/img/finales/foto-de-anime-4.png`, `/img/finales/foto-de-anime-3.png`, `/img/finales/foto-de-anime-2.png`, `/img/finales/foto-de-anime-1.png`, `/img/finales/foto-de-anime-0.png`], fondos = LosFondos, inLayer = 0, propsImage = PropsImage, propsAction = { jumping: false, gravity: true }, canvas, levelGo = 1, ctx, imgArray = [],
    imagenA, canvasC, ctxC, canvasB, ctxB, canvasD, ctxD, canvasE, ctxE, imagenes = [{ onMove: false }], worldItems = [], timeRestart = false, levelDificulty = 20
const Test2 = () => {
    const [ejes, setEjes] = useState({ alpha: 0, beta: 0, gamma: 0 })
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
    const [playerVidas, setPlayerVidas] = useState({ vidas: 5, maxHealth: 50, health: 50 })
    const [playerTime, setPlayertime] = useState({ time: 0, timeRestart: false })
    const [player, setPlayer] = useState({
        pause: false,
        level: 0,
    })
    const [onMobil, setOnMobil] = useState(false)
    const [salto, setsalto] = useState({
        gravity: true,
        jumping: false,
        posY: actualFloor,
        myActive: false
    })
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
        proyectiles = []
        levelFalses = []
        malosFalses = []
        fantasmas = [],
            dibujarMalos.new = []
        dibujarMalos.die = true
        malosFalses = []
        proyectilesFalses = []
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

            setTimeout(() => {
                propsImage.posX = 0
                propsImage.items[0].posX = 0
                propsImage.posY = (actualFloor - propsImage.heightY)
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
                dibujarMalos.new = []
                dibujarMalos.die = false
                ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                makeStage()
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

                dibujar('go', propsImage)
                propsImage.alive = true
                armas.bat.onHit = false
            }, 5000);
        } else {
            laFunt(propsImage, propsImage.items[0].posX)
            setTimeout(() => { reboot() }, 6000);
        }
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
        proyectilesImg = [];
        imagenesSrc = [`/img/finales/foto-de-anime-4.png`, `/img/finales/foto-de-anime-3.png`, `/img/finales/foto-de-anime-2.png`, `/img/finales/foto-de-anime-1.png`, `/img/finales/foto-de-anime-0.png`];
        fondos = LosFondos;
        inLayer = 0;
        propsImage = PropsImage;
        propsAction = { jumping: false, gravity: true };
        levelGo = 1;
        imgArray = [];
        imagenes = [{ onMove: false }];
        worldItems = [];
        timeRestart = false;
        levelDificulty = 10


    }
    const darVida = (theLevel, value2) => {
        setTimeout(() => {
            propsImage.posX = 0
            propsImage.items[0].posX = 0
            let toChange = propsImage.items[0]
            actualVidas = 5
            levelGo = theLevel
            propsImage.alive = false
            worldItems = CrearItemsWorld([], theLevel, imgArray, actualFloor, obst[0])
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
        if (colisioned.state) {
            if (colisioned.result === 'die') {
                let itsMalo = false
                let indexHere = 0
                let position = { malo: 0, body: 0 }
                dibujarMalos.new.map((key, i) => {
                    if (colisioned.item === key.id) {
                        key.imagen.map((key2, ia) => {
                            if (key2.direccion === `joshi-evil-${key.posX < propsImage.items[0].posX ? 'xf' : 'xb'}-${key.killLayer}`) {
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
                    ctxE.drawImage(dibujarMalos.new[indexHere].imagen[position.malo].imagen, dibujarMalos.new[indexHere].posX, dibujarMalos.new[indexHere].posY - 2, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalWidth / 22, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalHeight / 27)
                    let aDibujar = propsImage.imagen[`${dibujarMalos.new[indexHere].posX > propsImage.items[0].posX ? 'xb' : 'xf'}_die`]
                    ctxC.drawImage(aDibujar, dibujarMalos.new[indexHere].posX < propsImage.items[0].posX ? dibujarMalos.new[indexHere].posX + dibujarMalos.new[indexHere].widthX - 5 : dibujarMalos.new[indexHere].posX - Props.widthX + 5, dibujarMalos.new[indexHere].posY, Props.widthX, Props.heightY)

                    setTimeout(() => {
                        ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                        ctxC.clearRect(0, 0, canvas.width, canvas.height)
                        dibujar('go', props)

                    }, 5);

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
                        setTimeout(() => {
                            ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                            ctxC.clearRect(0, 0, canvas.width, canvas.height)
                            dibujar('go', props)
                        }, 5);
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
                            ctxD.drawImage(obstacule.killImagen, posXuse, posYuse, obstacule.killImagen.naturalWidth / 14, obstacule.killImagen.naturalHeight / 25)
                            let aDibujar = propsImage.imagen[`cuted_${obstacule.killLayer}`]
                            ctxC.drawImage(aDibujar, posXuse - 5, posYuse - 10, 30, 25)
                            setTimeout(() => {
                                ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                                ctxC.clearRect(0, 0, canvas.width, canvas.height)
                                dibujar('go', props)

                            }, 5);

                        }
                    }
                }
            }
            if (colisioned.result === 'live' || colisioned.result === 'rewind') {
                if (colisioned.result === 'live') {

                    colisioned.result = 'rewind'
                    setTimeout(() => {
                        props.posX = props.posX - 2
                        props.items[0].posX = props.items[0].posX - 20
                        propsImage.posX = propsImage.posX - 2
                        propsImage.items[0].posX = propsImage.items[0].posX - 20
                        imagenes[0].onMove = true
                        colisioned.state = false
                        colisioned.result = 'live'
                        makeStage('+', true)
                        audioPp.play()
                    }, 3000);
                }
                let itsMalo = false
                let indexHere = 0
                let position = { malo: 0, body: 0 }
                dibujarMalos.new.map((key, i) => {
                    if (colisioned.item === key.id) {
                        key.imagen.map((key2, ia) => {
                            if (key2.direccion === `joshi-onHit-${key.posX < propsImage.items[0].posX ? 'xf' : 'xb'}-${key.killLayer}`) {
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
                    ctxE.drawImage(dibujarMalos.new[indexHere].imagen[position.malo].imagen, dibujarMalos.new[indexHere].posX, dibujarMalos.new[indexHere].posY, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalWidth / 22, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalHeight / 27)
                    let aDibujar = propsImage.imagen[`${dibujarMalos.new[indexHere].posX > propsImage.items[0].posX ? 'xf' : 'xb'}_die`]
                    ctxC.drawImage(aDibujar, dibujarMalos.new[indexHere].posX < propsImage.items[0].posX ? dibujarMalos.new[indexHere].posX + dibujarMalos.new[indexHere].widthX - 5 : dibujarMalos.new[indexHere].posX - Props.widthX + 5, dibujarMalos.new[indexHere].posY - (dibujarMalos.new[indexHere].killLayer < 2 ? (dibujarMalos.new[indexHere].heightY / 2) : (dibujarMalos.new[indexHere].heightY / 4)), Props.widthX, Props.heightY)

                    setTimeout(() => {
                        ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                        ctxC.clearRect(0, 0, canvas.width, canvas.height)
                        dibujar('go', props)

                    }, 5);

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
                        setTimeout(() => {
                            ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                            ctxC.clearRect(0, 0, canvas.width, canvas.height)
                            dibujar('go', props)
                        }, 5);
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
                            ctxD.drawImage(obstacule.killImagen, posXuse, posYuse, obstacule.killImagen.naturalWidth / 14, obstacule.killImagen.naturalHeight / 25)
                            let aDibujar = propsImage.imagen[`cuted_${obstacule.killLayer}`]
                            ctxC.drawImage(aDibujar, posXuse - 5, posYuse - 10, 30, 25)
                            setTimeout(() => {
                                ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                                ctxC.clearRect(0, 0, canvas.width, canvas.height)
                                dibujar('go', props)

                            }, 5);

                        }
                    }
                }
                /* {
                  imagenes[0].onMove = false
                  props.posX = props.posX - 5
                  props.items[0].posX = props.items[0].posX - 50
                  propsImage.posX = propsImage.posX - 5
                  propsImage.items[0].posX = propsImage.items[0].posX - 50
                  colisioned.result = 'rewind'
                  ctxC.clearRect(0, 0, canvas.width, canvas.height)
                  setTimeout(() => {
                      imagenes[0].onMove = true
                      colisioned.state = false
                      colisioned.result = 'live'
                      audioPp.play()
      
                      dibujar('go', props)
                  }, 3000);} */
            }
        } else {
            if (values === 'go' && props.posX <= (341 - 0.5) && imagenes[0].onMove) {
                let aDibujar = armas.bat.state ? armas.bat.body : (props.imagen[`${propsImage.direccion === 'xs' && props.posY + props.heightY < actualFloor ? 'xj' : propsImage.direccion}_${propsAction.gravity && props.posY < actualFloor ? parseInt(props.layer / (8 * 4)) < 2 ? parseInt(props.layer / (8 * 4)) + 2 : parseInt(props.layer / (8 * 4)) : !propsAction.gravity && props.posY < actualFloor ? parseInt(props.layer / (8 * 4)) > 1 ? parseInt(props.layer / (8 * 4)) - 2 : parseInt(props.layer / (8 * 4)) : parseInt(props.layer / (8 * 4))}`])
                let psx = 0, Itemss = propsImage.items
                const chokeObj = Colisonador(malosFalses, levelFalses, propsImage)
                if (chokeObj.choke) {
                    dibujarMalos.new[chokeObj.pos].canMove.direccion = dibujarMalos.new[chokeObj.pos].canMove.direccion === 'xf' ? 'xb' : 'xf'
                }
                const chokePlayer = await ColisionBasica(propsImage.items[0], levelFalses, props, true, malosFalses, proyectilesFalses)
                if (chokePlayer.state) {
                    let hiter = (chokePlayer.array[0].b.id.split('-')[chokePlayer.array[0].b.id.split('-').length - 1])
                    if (hiter === ('malo') || hiter === ('proy') || hiter === ('obst')) {
                        const chokeInminente = Colisonador(propsImage.items[0], hiter === ('malo') ? malosFalses : hiter === ('proy') ? proyectiles : levelFalses, props, true, true, ctxD, hiter)
                        if (chokeInminente.state) {
                            switch (chokeInminente.array[0].b.id.split('-')[chokeInminente.array[0].b.id.split('-').length - 1]) {
                                case 'malo':
                                    if (dibujarMalos.new[chokePlayer.array[0].b.pos].state !== 'die' && dibujarMalos.new[chokePlayer.array[0].b.pos].state !== 'spirit' && dibujarMalos.new[chokePlayer.array[0].b.pos].state !== 'onDie') {
                                        yaWey.play()
                                        joshisound.play()
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
                                            joshisound3[3].play()
                                        }
                                    }
                                    break;
                                case 'proy':
                                    llantobebe.play()
                                    yaWey.play()
                                    pow.play()
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
                                    dolor.play()
                                    colisioned.state = true
                                    colisioned.item = levelFalses[chokePlayer.array[0].b.pos].id
                                    propsImage.items[0].health.nivel = propsImage.items[0].health.nivel - levelFalses[chokePlayer.array[0].b.pos].damage
                                    setPlayerVidas({
                                        ...playerVidas,
                                        vidas: actualVidas,
                                        health: propsImage.items[0].health.nivel
                                    })
                                    sierra.play()
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
                            if (armas.bat.state) {
                                if (hiter === ('proy')) {
                                    audioPlaying = audioPlaying > 1 ? audioPlaying + 1 : 0
                                    WeaponAudio[audioPlaying].play()
                                    setTimeout(() => {
                                        setTimeout(() => {
                                            armas.bat.onHit = false

                                        }, 500)
                                        muertebebe.play()
                                    }, 500);
                                    if (proyectiles[chokePlayer.array[0].b.pos].state !== 'onDie') {
                                        proyectiles[chokePlayer.array[0].b.pos].state = 'hit';
                                        proyectiles[chokePlayer.array[0].b.pos].hitdirection = proyectiles[chokePlayer.array[0].b.pos].direccion === 'xf' ? (lastDireccion === 'xf' ? 'xf' : 'xb') : (lastDireccion === 'xb' ? 'xb' : 'xf')
                                        if (!armas.bat.onHit) {
                                            proyectiles[chokePlayer.array[0].b.pos].hitDamage = (Math.random() * 4);
                                            proyectiles[chokePlayer.array[0].b.pos].health = armas.bat.onHit ? proyectiles[chokePlayer.array[0].b.pos].health : proyectiles[chokePlayer.array[0].b.pos].health - (proyectiles[chokePlayer.array[0].b.pos].health * (Math.random() * armas.bat.damage - 3) + 3)
                                            armas.bat.onHit = true
                                        }
                                        if (proyectiles[chokePlayer.array[0].b.pos].health < 0) {
                                            proyectiles[chokePlayer.array[0].b.pos].state = 'die';
                                        }
                                    }
                                }
                                if (hiter === ('malo')) {
                                    if (dibujarMalos.new[chokePlayer.array[0].b.pos].state !== 'die' && dibujarMalos.new[chokePlayer.array[0].b.pos].state !== 'spirit' && dibujarMalos.new[chokePlayer.array[0].b.pos].state !== 'onDie') {
                                        dibujarMalos.new[chokePlayer.array[0].b.pos].state = 'hit'
                                        if (!armas.bat.onHit) {
                                            dibujarMalos.new[chokePlayer.array[0].b.pos].health = dibujarMalos.new[chokePlayer.array[0].b.pos].health - (armas.bat.damage * parseInt(Math.random() * 3) + 1)
                                            joshisound2.play()
                                            if (dibujarMalos.new[chokePlayer.array[0].b.pos].health < 0) {
                                                pow.play()
                                                armas.bat.onHit = true
                                                joshisound3[2].play()
                                                dibujarMalos.new[chokePlayer.array[0].b.pos].state = 'onDie'
                                                setTimeout(() => {
                                                    armas.bat.onHit = false
                                                }, 1000);

                                            } else {
                                                pow.play()
                                                armas.bat.onHit = true
                                                setTimeout(() => {
                                                    armas.bat.onHit = false

                                                }, 1000);
                                                joshisound3[parseInt(Math.random() * 2)].play()
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
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
                        propsImage.items[0].health.estado = 'inmortal'
                    }
                    dibujar('go', propsImage)

                } else {
                    psx = Itemss[0].posX
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
                        if (!colisioned.state) {
                            ctxC.clearRect(0, 0, canvas.width, canvas.height)

                            let newModel = props
                            if (newModel.layer < (24 * 4)) {
                                newModel.layer = newModel.layer + 1
                            } else { newModel.layer = 0 } if (propsImage.direccion === 'xf') {
                                newModel.direccion = 'xf'
                            } else {
                                newModel.direccion = propsImage.direccion
                            }
                            if ((newModel.direccion === 'xf' && newModel.posX < 342) || ((newModel.direccion === 'xs' || newModel.direccion === 'xd') && newModel.posX < 355) || (newModel.direccion === 'xb' && newModel.posX > 0)) {
                                Itemss[0].posX = propsImage.refreshData ? psx : propsImage.levelPass ? psx : props.direccion === 'xf' && propsImage.direccion === 'xf' ? propsAction.jumping || newModel.posY < actualFloor ? Itemss[0].posX + ((1.25 / (40 * (1 / (levelDificulty))))) : Itemss[0].posX + ((1.25 / (40 * (1 / (levelDificulty))))) : props.direccion === 'xb' && propsImage.direccion === 'xb' ? propsAction.jumping || newModel.posY < actualFloor ? Itemss[0].posX - ((1.25 / (40 * (1 / (levelDificulty))))) : Itemss[0].posX - ((1.25 / (40 * (1 / (levelDificulty))))) : Itemss[0].posX
                                newModel = {
                                    ...newModel,
                                    posY: propsAction.jumping && newModel.posY <= (actualFloor - newModel.heightY) ? newModel.posY === (actualFloor - newModel.heightY) && propsAction.jumping && propsAction.gravity ? (actualFloor - newModel.heightY) : !propsAction.gravity ? newModel.posY - 1.10 : propsAction.jumping && propsAction.gravity ? newModel.posY + 1.10 : newModel.posY === 50 ? (actualFloor - newModel.heightY) : (actualFloor - newModel.heightY) : (actualFloor - newModel.heightY),
                                    posX: propsImage.refreshData ? props.posX : propsImage.levelPass ? props.posX : !propsImage.alive ? 0 : props.direccion === 'xf' && propsImage.direccion === 'xf' ? propsAction.jumping || newModel.posY < actualFloor ? newModel.posX + ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX + ((0.125 / (40 * (1 / (levelDificulty))))) : props.direccion === 'xb' && propsImage.direccion === 'xb' ? propsAction.jumping || newModel.posY < actualFloor ? newModel.posX - ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX - ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX,
                                    items: propsImage.levelPass || !propsImage.alive ? props.items : Itemss,
                                    fotograma: newModel.fotograma + 1,
                                }
                                propsImage = {
                                    ...propsImage,
                                    posX: propsImage.refreshData ? 0 : propsImage.levelPass ? props.posX : !propsImage.alive ? 0 : props.direccion === 'xf' && propsImage.direccion === 'xf' ? propsAction.jumping || newModel.posY < actualFloor ? newModel.posX + ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX + ((0.125 / (40 * (1 / (levelDificulty))))) : props.direccion === 'xb' && propsImage.direccion === 'xb' ? propsAction.jumping || newModel.posY < actualFloor ? newModel.posX - ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX - ((0.125 / (40 * (1 / (levelDificulty))))) : newModel.posX,
                                    posY: propsAction.jumping && propsImage.posY <= (actualFloor - propsImage.heightY) ? newModel.posY === (actualFloor - propsImage.heightY) && propsAction.jumping && propsAction.gravity ? (actualFloor - propsImage.heightY) : propsAction.jumping && !propsAction.gravity ? propsImage.posY - 1.10 : propsAction.jumping && propsAction.gravity ? propsImage.posY + 1.10 : propsImage.posY === (actualFloor - propsImage.heightY) ? (actualFloor - propsImage.heightY) : (actualFloor - propsImage.heightY) : (actualFloor - propsImage.heightY),
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
                            ctxE.clearRect(0, 0, canvasD.width, canvasD.height)



                            let malosFalsesAux = []
                            dibujarMalos.new.map((key, i) => {
                                if (key.state !== 'die' && key.state !== 'spirit' && key.state !== 'onDie') {
                                    if (key.canMove.jumps.state && key.posY >= (actualFloor - key.heightY) && key.canMove.jumps.gravity) {
                                        dibujarMalos.new[i].canMove.jumps.gravity = false
                                        dibujarMalos.new[i].canMove.jumps.state = false
                                        dibujarMalos.new[i].posY = (actualFloor - key.heightY)
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
                                        risabebe.play()
                                        dibujarMalos.new[i].actions.shot.state = true
                                        setTimeout(() => {
                                            try {
                                                dibujarMalos.new[i].actions.shot.state = false
                                                armas.bat.onHit = false

                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }, 1000);
                                        let imgUsed = proyectilesImg
                                        let efectRandom = parseInt(Math.random() * 2)
                                        proyectiles.push({
                                            id: `${dibujarMalos.new[i].id.split('-')[0]}-${parseInt(Math.random() * 500)}-proy`,
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
                                        die: 0,
                                        hit: {
                                            left: 0,
                                            right: 0
                                        },
                                    }
                                    key.imagen.map((key2, i) => {
                                        if (key2.direccion === 'spirit') { position.spirit = i }
                                        if (key2.direccion === 'die') { position.die = i }
                                        if (key2.direccion === `hit-xf`) { position.hit.right = i }
                                        if (key2.direccion === `hit-xb`) { position.hit.left = i }
                                    })
                                    let imagenready = key.state === 'onDie' ? key.imagen[position.die].imagen : key.state === 'hit' ? key.imagen[key.canMove.direccion === 'xf' ? position.hit.right : position.hit.left].imagen : key.imagen[key.canMove.direccion === 'xb' ? 1 : 0].imagen

                                    if (key.state === 'onDie') {
                                        if (key.explotionTime > 100) {
                                            dibujarMalos.new[i].state = 'spirit'
                                        } else {
                                            dibujarMalos.new[i].explotionTime = dibujarMalos.new[i].explotionTime + 1

                                        }
                                        ctxE.drawImage(armas.bat.kills[0].imagen, key.posX, key.posY - (key.explotionTime / 10), (armas.bat.kills[0].imagen.naturalWidth / 22) + (key.explotionTime / 10), (armas.bat.kills[0].imagen.naturalHeight / 27) + (key.explotionTime / 10))
                                    } else {
                                        ctxE.drawImage(imagenready, key.posX, key.posY, imagenready.naturalWidth / 22, imagenready.naturalHeight / 27)
                                    }
                                    if (dibujarMalos.new[i].posX < (stateImage.posX === -1 ? 35 : 1) || dibujarMalos.new[i].posX > 299) {
                                        dibujarMalos.new[i].canMove.direccion = dibujarMalos.new[i].posX < (stateImage.posX === -1 ? 35 : 1) ? 'xf' : 'xb'
                                    }
                                    dibujarMalos.new[i].posY = dibujarMalos.new[i].posY + dibujarMalos.new[i].heightY > (actualFloor) ? (actualFloor - dibujarMalos.new[i].heightY) : (key.state === 'onDie' || key.state === 'spirit') ? dibujarMalos.new[i].posY : !dibujarMalos.new[i].canMove.jumps.posibility ? dibujarMalos.new[i].posY : dibujarMalos.new[i].canMove.jumps.state ? (!dibujarMalos.new[i].canMove.jumps.gravity ? dibujarMalos.new[i].posY + dibujarMalos.new[i].heightY <= (actualFloor) ? dibujarMalos.new[i].posY - (.250 + dibujarMalos.new[i].canMove.jumps.speed) : (actualFloor - dibujarMalos.new[i].heightY) : dibujarMalos.new[i].posY + .250) : dibujarMalos.new[i].posY
                                    dibujarMalos.new[i].posX = (key.state === 'onDie' || key.state === 'spirit') ? dibujarMalos.new[i].posX : !dibujarMalos.new[i].canMove.walks.posibility ? dibujarMalos.new[i].posX : dibujarMalos.new[i].actions.shot.state || dibujarMalos.new[i].canMove.jumps.state ? dibujarMalos.new[i].posX : dibujarMalos.new[i].canMove.direccion === 'xf' ? dibujarMalos.new[i].posX + (.25 * dibujarMalos.new[i].canMove.walks.speed) : dibujarMalos.new[i].posX - (.25 * dibujarMalos.new[i].canMove.walks.speed)

                                } else {

                                    let position = {
                                        die: 0,
                                        hit: {
                                            left: 0,
                                            right: 0
                                        },
                                    }
                                    key.imagen.map((key2, i) => {
                                        if (key2.direccion === 'spirit') { position.spirit = i }
                                        if (key2.direccion === 'die') { position.die = i }
                                        if (key2.direccion === `hit-xf`) { position.hit.right = i }
                                        if (key2.direccion === `hit-xb`) { position.hit.left = i }
                                    })
                                    fantasmas.map((keySpirit, iGhost) => {
                                        if (keySpirit.posY > 0) {
                                            if (fantasmas[iGhost].posY > 0) {
                                                fantasmas[iGhost].posY = fantasmas[iGhost].posY - (1.25 / 3)
                                                ctxE.drawImage(key.imagen[position.spirit].imagen, key.posX, keySpirit.posY, key.imagen[position.spirit].imagen.naturalWidth / 22, key.imagen[position.spirit].imagen.naturalHeight / 27)
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
                                            dibujarMalos.new[i].state = 'die'
                                        }
                                        ctxE.drawImage(key.imagen[position.spirit].imagen, key.posX, key.posY, key.imagen[position.spirit].imagen.naturalWidth / 22, key.imagen[position.spirit].imagen.naturalHeight / 27)
                                    } else {
                                        let position = {
                                            die: 0,
                                            hit: {
                                                left: 0,
                                                right: 0
                                            },
                                        }
                                        dibujarMalos.new.map((key, i) => {
                                            key.imagen.map((key2, ia) => {
                                                if (key2.direccion === 'spirit') { position.spirit = ia }
                                                if (key2.direccion === 'die') { position.die = ia }
                                                if (key2.direccion === `hit-xf`) { position.hit.right = ia }
                                                if (key2.direccion === `hit-xb`) { position.hit.left = ia }
                                            })
                                            ctxE.drawImage(key.imagen[position.die].imagen, key.posX, key.posY, key.imagen[position.die].imagen.naturalWidth / 22, key.imagen[position.die].imagen.naturalHeight / 27)
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
                                        heightY: key.heightY,
                                    })
                                }
                            })
                            malosFalses = malosFalsesAux
                            proyectilesFalses = []
                            let existingProyectiles = []
                            proyectiles.map((key, i) => {
                                ctxE.drawImage(key.imagen[key.direccion === 'xf' ? 1 : 0], key.posX, key.posY, key.widthX, key.heightY)
                                proyectiles[i].posX = key.state !== 'hit' ? (key.direccion === 'xf' ? key.posX + (.25 * key.speed) : key.posX - (.25 * key.speed)) : (key.hitdirection === 'xb' ? key.posX - (.25 * (key.speed * 2.5)) : key.posX + (.25 * (key.speed * 2.5)))
                                proyectiles[i].posY = key.state === 'hit' ? key.efectDirection === 'up' ? proyectiles[i].posY - (.6 * key.speed * key.hitDamage) : proyectiles[i].posY + (.6 * key.speed * key.hitDamage) : proyectiles[i].posY
                                if ((key.state !== 'die' && key.state !== 'onDie' && key.state !== 'spirit') && (key.posX < 300 && (key.posX + key.widthX) > 0) && (key.posY > 0 && key.posY > 0)) {
                                    proyectilesFalses.push({
                                        ...key,
                                        id: key.id,
                                        state: key.posX,
                                        posX: key.posX,
                                        posY: key.posY,
                                        widthX: key.widthX,
                                        heightY: key.heightY,
                                        health: key.health,
                                        damage: key.damage
                                    })
                                    existingProyectiles.push(key)
                                }
                            })
                            proyectiles = existingProyectiles
                            if (armas.bat.state) {
                                let indexFor = armas.bat.fotograma
                                if (armas.bat.layer < 13) {
                                    if (armas.bat.layer === 12) {
                                        armas.bat.onEnd = true
                                        setTimeout(() => {
                                            armas.bat.layer = 0
                                            armas.bat.state = false
                                        }, 600);
                                    }
                                    if (indexFor < armas.bat.speed) {
                                        indexFor = indexFor + 1
                                        armas.bat.fotograma = indexFor
                                    } else {
                                        indexFor = 0
                                        armas.bat.fotograma = indexFor
                                        armas.bat.layer = armas.bat.layer + 1
                                    }
                                    let posLayer = 0
                                    armas.bat.imagenes.map((key2, i) => {
                                        if (key2.id === armas.bat.layer && key2.direccion === lastDireccion) {
                                            posLayer = i
                                        }
                                    })
                                    ctxE.drawImage(armas.bat.imagenes[posLayer].imagen, psx - 15, props.posY - (props.heightY / 2), armas.bat.imagenes[posLayer].widthX, armas.bat.imagenes[posLayer].heightY);
                                } else {
                                    let posLayer = 0
                                    armas.bat.imagenes.map((key2, i) => {
                                        if (key2.id === 13 && key2.direccion === lastDireccion) {
                                            posLayer = i
                                        }
                                    })
                                    ctxE.drawImage(armas.bat.imagenes[posLayer].imagen, psx - 15, props.posY - (props.heightY / 2), armas.bat.imagenes[posLayer].widthX, armas.bat.imagenes[posLayer].heightY);
                                }
                            }
                            ctxC.drawImage(aDibujar, propsImage.levelPass ? psx : propsImage.refreshData ? 10 : !propsImage.alive ? 0 : psx, propsImage.direccion === 'xd' ? props.posY + (props.heightY / 2) : props.posY, props.widthX, propsImage.direccion === 'xd' ? (props.heightY / 2) : props.heightY)
                        } else {
                            ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                            ctxC.clearRect(0, 0, canvas.width, canvas.height)
                            let position = { malo: 0, body: 0 }
                            dibujarMalos.new.map((key, i) => {
                                if (colisioned.item === key.id) {
                                    key.imagen.map((key2, ia) => {
                                        if (key2.direccion === `joshi-evil-${propsImage.direccion}-${key.killLayer}`) {
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
                            let aDibujar = propsImage.imagen[`${propsImage.direccion}_die`]
                            ctxC.drawImage(aDibujar, psx, props.posY, props.widthX, props.heightY)
                        }
                    }
                }
            } else {
                propsimage.items[0].posX = 10
            }
        }
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
        let aDibujar = (props.imagen[`${propsImage.direccion === 'xs' && props.posY < actualFloor ? 'xj' : propsImage.direccion}_${propsAction.gravity && props.posY < actualFloor ? parseInt(props.layer / (8 * 4)) < 2 ? parseInt(props.layer / (8 * 4)) + 2 : parseInt(props.layer / (8 * 4)) : !propsAction.gravity && props.posY < actualFloor ? parseInt(props.layer / (8 * 4)) > 1 ? parseInt(props.layer / (8 * 4)) - 2 : parseInt(props.layer / (8 * 4)) : parseInt(props.layer / (8 * 4))}`])
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
        timeOfgame = 0
        let kills = new Image
        kills.src = `/armas/bat/img/kills/explocion.png`
        kills.onload = (() => {
            oImgW = kills.naturalWidth
            oImgH = kills.naturalHeight
            armas.bat.kills.push({
                id: Math.floor(Math.random() * 25555555555555),
                imagen: kills,
                widthX: oImgW / 10,
                heightY: oImgH / 10,
            })
        })
        obtenerOrientacion()
        setStateImage({
            ...stateImage,
            width: window.screen.width,
            height: window.screen.height
        })
        let proyectil1 = new Image()
        proyectil1.src = '/proyectiles/bebe-0.png'
        proyectil1.onload = (() => {
            proyectilesImg.push(proyectil1)
            let proyectil2 = new Image()
            proyectil2.src = '/proyectiles/bebe-1.png'
            proyectil2.onload = (() => {
                proyectilesImg.push(proyectil2)
            })
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
        canvas = document.getElementById('canvas-Pp')
        ctx = canvas.getContext('2d')
        aparecer(levelGo)

        for (let index = 0; index < 14; index++) {
            let element = new Image
            element.src = `/armas/bat/img/bat-${index}-xf.png`
            element.onload = (() => {
                oImgW = element.naturalWidth
                oImgH = element.naturalHeight
                armas.bat.imagenes.push({
                    direccion: 'xf',
                    id: index,
                    imagen: element,
                    widthX: oImgW / 10,
                    heightY: oImgH / 10,
                })
            })
        }
        for (let index = 0; index < 14; index++) {
            let element = new Image
            element.src = `/armas/bat/img/bat-${index}-xb.png`
            element.onload = (() => {
                oImgW = element.naturalWidth
                oImgH = element.naturalHeight
                armas.bat.imagenes.push({
                    direccion: 'xb',
                    id: index,
                    imagen: element,
                    widthX: oImgW / 10,
                    heightY: oImgH / 10,
                })
            })
        }
        let elemento = new Image
        elemento.src = `/armas/bat/body.png`
        elemento.onload = (() => {
            oImgW = elemento.naturalWidth
            oImgH = elemento.naturalHeight
            armas.bat.body = elemento
        })
        let imagesValue = ['xs', 'xf', 'xb', 'xj', 'xd', 'cuted'], newArrayB = {}, oImgW = 0, oImgH = 0
        imagesValue.map((key, i) => {
            for (let index = 0; index < 4; index++) {
                let element = new Image
                element.src = `/img/body/body-${key}-${index}.png`
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
        let imagesValue2 = ['xb', 'xf']
        let oImgW2 = 0
        let oImgH2 = 0
        imagesValue2.map((key, i) => {
            for (let index = 0; index < 2; index++) {
                let element = new Image
                element.src = `/img/body/body-${key}-die.png`
                element.onload = (() => {
                    oImgW2 = element.naturalWidth / 10
                    oImgH2 = element.naturalHeight / 10
                    newArrayB = {
                        ...newArrayB,
                        [`${key}_die`]: element
                    }
                })
            }
        })
        setTimeout(() => {
            imagenes[0] = { imagen: newArrayB, onMove: true }
            propsImage = {
                ...propsImage,
                imagen: newArrayB,
                posY: 145,
                widthX: oImgW,
                heightY: oImgH,
                fotograma: 0,
                direccion: 'xs',
                lastDireccion: 'xf',
                onMove: false,
                id: 0,
                layer: 0,
                jumping: false,
                gravity: true
            }
            let createItems = CrearItems(newArrayB, levelGo > 0 ? 0 : 10, actualFloor)
            let otraImagen2 = new Image()

            otraImagen2.src = `/img/enemigos/joshi/joshi-xf.png`
            otraImagen2.onload = (() => {
                imgArray.push({
                    direccion: 'xf',
                    imagen: otraImagen2
                })

                let otraImagen3 = new Image()
                otraImagen3.src = `/img/enemigos/joshi/joshi-xb.png`
                otraImagen3.onload = (() => {
                    imgArray.push({
                        direccion: 'xb',
                        imagen: otraImagen3
                    })
                    let otraImagen4 = new Image()
                    otraImagen4.src = `/img/enemigos/joshi/joshi-xs.png`
                    otraImagen4.onload = (() => {
                        imgArray.push({
                            direccion: 'xs',
                            imagen: otraImagen4
                        })
                        let otraImagen5 = new Image()
                        otraImagen5.src = `/img/enemigos/joshi/joshi-hit-xb.png`
                        otraImagen5.onload = (() => {
                            imgArray.push({
                                direccion: 'hit-xb',
                                imagen: otraImagen5
                            })
                            let otraImagen5_2 = new Image()

                            otraImagen5_2.src = `/img/enemigos/joshi/joshi-hit-xf.png`
                            otraImagen5_2.onload = (() => {
                                imgArray.push({
                                    direccion: 'hit-xf',
                                    imagen: otraImagen5_2
                                })
                                let otraImagen6 = new Image()
                                otraImagen6.src = `/img/enemigos/joshi/joshi-die.png`
                                otraImagen6.onload = (() => {
                                    imgArray.push({
                                        direccion: 'die',
                                        imagen: otraImagen6
                                    })
                                    let otraImagen7 = new Image()
                                    otraImagen7.src = `/img/enemigos/joshi/joshi-spirit.png`
                                    otraImagen7.onload = (() => {
                                        imgArray.push({
                                            direccion: 'spirit',
                                            imagen: otraImagen7
                                        })
                                        let arrayA = ['xb', 'xf']
                                        for (let index = 0; index < arrayA.length; index++) {
                                            const element = arrayA[index];
                                            for (let indexs = 0; indexs < 2; indexs++) {
                                                for (let indexe = 0; indexe < 5; indexe++) {
                                                    const element2 = new Image()
                                                    element2.src = `/img/enemigos/joshi/joshi-${indexs === 0 ? 'evil' : 'onHit'}-${element}-${indexe}.png`
                                                    element2.onload = (() => {
                                                        imgArray.push({
                                                            direccion: `joshi-${indexs === 0 ? 'evil' : 'onHit'}-${element}-${indexe}`,
                                                            imagen: element2
                                                        })
                                                        if (index === 1 && indexs === 1 && indexe === 4) {
                                                            worldItems = CrearItemsWorld(newArrayB, levelGo, imgArray, actualFloor, obst[0])
                                                            propsImage = {
                                                                ...propsImage,
                                                                items: createItems
                                                            }
                                                            dibujar('go', propsImage);
                                                            document.addEventListener('keydown', async (event) => {
                                                                event.preventDefault();
                                                                let keyValue = event.key;
                                                                if (keyValue === 'ArrowUp') {
                                                                    if (!armas.bat.state) {
                                                                        armas.bat.state = true
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
                                                                        direccion: 'xf',

                                                                    }
                                                                    lastDireccion = 'xf'
                                                                    dibujarMouseOn('+', true)
                                                                } else {
                                                                    if ((keyValue === 'ArrowRight' && mxActive)) {
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
                                                                    mxActive = true
                                                                    dibujarMouseOn('-', true)
                                                                    propsImage = {
                                                                        ...propsImage,
                                                                        direccion: 'xb',
                                                                    }
                                                                    lastDireccion = 'xb'
                                                                } else {
                                                                    if ((keyValue === 'ArrowLeft' && mxActive)) {
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
                                                                            nowJump.gravity = true
                                                                            propsAction = {
                                                                                ...propsAction,
                                                                                ...nowJump
                                                                            }
                                                                        }, 30);
                                                                    }
                                                                } else {
                                                                    if (mxActive && (keyValue === 'ArrowLeft' || keyValue === 'ArrowRight' || keyValue === 'ArrowDown')) {
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
                                                            audioPp = document.getElementById('gameTrack')
                                                            setHalfVolume()
                                                            startTime(0)
                                                            makeStage()
                                                        }
                                                    })
                                                }

                                            }
                                        }

                                    })

                                })
                            })
                        })
                    })
                })
            })


        }, 5000);
    }
    const setHalfVolume = (pista) => {
        audioPp.volume = .2;
        audioPp.src = `/audio/gameSound-${pista ? pista - 1 : playerStage.stage}.mp3`
    }
    const brincar = () => {
        jump.play()
        propsAction = {
            ...propsAction,
            jumping: true,
            gravity: false
        }
        setsalto(setSaltoFunt())
        myActive = true
        setTimeout(() => {
            propsAction = {
                ...propsAction,
                jumping: true,
                gravity: true
            }
            jump.pause();
            jump.currentTime = 0;
            setsalto(setSaltoFunt())
            setTimeout(() => {
                propsAction = {
                    ...propsAction,
                    jumping: false,
                    gravity: false
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

    const makeStage = (value = '+', recharge) => {
        if (recharge) {
            levelFalses = []
            setTimeout(() => {
                for (let index = 0; index < worldItems.length; index++) {
                    const element = worldItems[index];
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
                        }
                    }
                }
            }, 50);

        }
        else {
            propsImage.posY = (actualFloor - propsImage.heightY)
            proyectiles = []
            fantasmas = []
            levelFalses = []
            malosFalses = []
            proyectilesFalses = []
            ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
            dibujarMalos = { last: [], new: [] }
            let otraImagen = new Image()
            otraImagen.src = `/img/obstaculos/obst-0.png`
            obst = []
            otraImagen.onload = (() => {
                obst.push(otraImagen)
                let otraImagen1 = new Image()
                otraImagen1.src = `/img/obstaculos/obst-1.png`
                otraImagen1.onload = (() => {
                    obst.push(otraImagen1)
                    let otraImagen2 = new Image()
                    otraImagen2.src = `/img/obstaculos/sangre.png`
                    otraImagen2.onload = (() => {
                        obst.push(otraImagen2)
                        let otraImagen3 = new Image()
                        otraImagen3.src = `/img/obstaculos/obst-0-onHit.png`
                        otraImagen3.onload = (() => {
                            obst.push(otraImagen3)
                            for (let index = 0; index < worldItems.length; index++) {
                                const element = worldItems[index];
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
                                        /*   ctxD.beginPath();
                                          ctxD.moveTo(element.posX, (element.posY - element.heightY));
                                          ctxD.lineTo(element.posX, (element.posY));
                                          ctxD.lineTo(element.posX + element.widthX, (element.posY));
                                          ctxD.lineTo(element.posX + element.widthX, (element.posY - element.heightY));
                                          ctxD.closePath();
                                          ctxD.fillStyle = 'green';
                                          ctxD.moveTo(0, 0);
                                          ctxD.stroke(); */
                                        ctxD.drawImage(obst[randomNumber], element.posX, element.posY, obst[randomNumber].naturalWidth / 14, obst[randomNumber].naturalHeight / 25)
                                    } else {
                                        if (element.type === 'npc') {
                                            dibujarMalos.last.push(
                                                {
                                                    ...element,
                                                    damage: element.class === 'joshy' ? Math.floor(Math.random() * 10) + 5 : 0
                                                })
                                            dibujarMalos.new.push({
                                                ...element,
                                            })

                                        }
                                    }

                                }
                            }
                            levelFalses.map((key, i) => {
                                dibujarMalos.new.map((key2, i2) => {
                                    if ((key.posX + key.widthX > key2.posX) && (key.posX + key.widthX < key2.posX + key2.widthX) || (key.posX + key.widthX < key2.posX && (key.posX > key2.posX))) {
                                        dibujarMalos.last[i2].posX = dibujarMalos.new[i2].posX - 35
                                        dibujarMalos.new[i2].posX = dibujarMalos.new[i2].posX - 35
                                    }

                                })
                            })

                            myActive = false
                            if (inLayer !== 0) {
                                propsImage.items[0].posY = (actualFloor - propsImage.heightY)
                                setTimeout(() => {
                                    propsImage.items[0].posY = (actualFloor - propsImage.items[0].heightY)
                                    propsImage.posY = (actualFloor - propsImage.heightY)
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
                                }, 10);
                            } else {
                                setPlayerGo({
                                    ...playerGo,
                                    go: true
                                })
                            }
                        })
                    })
                })
            })
        }



        if (!recharge) { }
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
                    audioPp.src = ''
                    pass.play()
                    worldItems = CrearItemsWorld([], levelGo, imgArray, actualFloor, obst[0])
                    levelFalses = []
                    malosFalses = []
                    proyectilesFalses = []
                    if (levelGo === 5) {
                        ctxB.clearRect(0, 0, canvasB.width, canvasB.height)
                        fondos = fondos.slice(1, fondos.length)
                        setTimeout(() => {
                            setPlayer({
                                ...player,
                                level: 0
                            })
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
                            health: playerVidas.maxHealth,
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
                        let otraImagen2 = new Image()
                        otraImagen2.src = `/img/enemigos/joshi/joshi-${parseInt(Math.floor(Math.random() * 3))}.png`
                        otraImagen2.onload = (() => {
                            worldItems = CrearItemsWorld(otraImagen2, levelGo, imgArray, actualFloor, obst[0])
                        })
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
                                gravity: true
                            }
                            levelFalses = []
                            malosFalses = []
                            proyectilesFalses = []
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
    const setProps = (value1, value2, value3) => {
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
                armas.bat[value2] = value3
            }
        }
    }
    useEffect(() => {
        if (off) {
            yaWey = new Audio('/audio/yaWey.mp3');
            portraitAudio = new Audio('/audio/portrait.mp3');
            portraitAudio.onload = (() => {
                portraitAudio.play()

            })
            WeaponAudio[0] = new Audio('/armas/bat/audio/hit.mp3');
            WeaponAudio[1] = new Audio('/armas/bat/audio/hit.mp3');
            function orientacionCambiada() {
                if (window.orientation === 90 || window.orientation === 270) {
                } if (window.orientation === 0 || window.orientation === 180) {
                    portraitAudio.play()
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
            llantobebe = new Audio('/audio/bebe-1.mp3');
            joshisound = new Audio('/audio/joshi-0.mp3');
            joshisound2 = new Audio('/audio/joshi-1.mp3');
            joshisound3 = [new Audio('/audio/joshi-1.mp3'), new Audio('/audio/joshi-2.mp3'), new Audio('/audio/joshi-3.mp3'), new Audio('/audio/joshi-4.mp3')];
            pow = new Audio('/audio/pow-0.mp3');
            sierra = new Audio('/audio/sierra.mp3');
            dolor = new Audio('/audio/dolor.mp3');
            dolor.volume = 0.15
            risabebe = new Audio('/audio/bebe-0.mp3');
            muertebebe = new Audio('/audio/bebe-2.mp3');
            pass = new Audio('/audio/pass.mp3');
            jump = new Audio('/audio/jump.mp3');
            jump.volume = 0.2;
            risabebe.volume = 0.2;
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
            }, 2000);

        }

        /*             initApp()
         */
    }, [off])
    return (
        <>
            <div className={`IDiv-main column bgGame relativeCanvasContainer ${!gameStart ? '' : 'horizontal-mode'}`}>
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
                        <span className={(parseInt(100 / playerVidas.maxHealth) * playerVidas.health) < 30 ? "fontcolor-red" : ((parseInt(100 / playerVidas.maxHealth) * playerVidas.health) > 30) && ((parseInt(100 / playerVidas.maxHealth) * playerVidas.health) < 60) ? 'fontcolor-yellow' : 'fontcolor-green'}>SALUD:{(parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) > 0 ? (parseInt((100 / playerVidas.maxHealth) * playerVidas.health)) : 0}%</span>
                        <span>STAGE:{playerStage.stage}</span>
                        <span>NIVEL:{player.level}</span>
                        <span>VIDAS:{playerVidas.vidas}</span>
                        <span>TIEMPO:{playerTime.time}</span>
                        <button
                            className={onMobil ? "" : 'hide'}
                            onClick={(e) => {
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
                            className={gameStart ? "" : 'hide'}
                            onClick={(e) => {
                                e.preventDefault();
                                reboot();
                                setGameStart(false);
                                if (fullScreen) {
                                    setFullScreen(false)
                                    requestFullScreen()
                                };

                            }}>{'EXIT'}</button>
                        <button
                            className={gameStart ? "" : 'hide'}
                            onClick={!player.pause ? (e) => {
                                e.preventDefault();
                                imagenes[0].onMove = false;
                                setPlayer({
                                    ...player,
                                    pause: true
                                })
                            } : (e) => {
                                e.preventDefault();
                                setPlayer({
                                    ...player,
                                    pause: false
                                })
                                imagenes[0].onMove = true
                                dibujar('go', propsImage)
                            }}>{player.pause ? 'continue' : 'pause'}</button>
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
                    {onMobil ?
                        <GamePad setProps={setProps} propsAction={propsAction} setSaltoFunt={setSaltoFunt} brincar={brincar} setsalto={setsalto} dibujarMouseOn={dibujarMouseOn} /> : <></>
                    }
                    <canvas className={`${onMobil ? 'bgUrlmobil' : 'bgUrl'}-${(playerStage.stage + 1)} lienzo-${stateImage.posX} lienzoW-${parseInt(stateImage.width)} ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-Pp">
                    </canvas>
                    <canvas className={`bgcolor-${nowStage.color} lienzo-final-${parseInt(stateImage.height)} ${onMobil ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-Fn">
                    </canvas>
                    <canvas className={`lienzo-items ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-It">
                    </canvas>
                    <canvas className={`lienzo-items ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-ItObj">
                    </canvas>
                    <canvas className={`lienzo-items ${onMobil ? !fullScreen ? `lienzoHM` : `lienzoH-${parseInt(stateImage.height)}` : `lienzoH-${parseInt(stateImage.height)}`}`} id="canvas-ItMalo">
                    </canvas>


                </div>
            </div>
            <div className={`IDiv-main column bgGame relativeCanvasContainer  ${!gameStart ? '' : 'vertical-mode'}`}>
                <div className="divRotate">

                </div>
            </div>

        </>
    )
}
export default Test2