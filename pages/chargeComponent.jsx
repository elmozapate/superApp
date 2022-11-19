import { useEffect, useState } from "react"
import { aCargar2, charguingItemEstructura, charguingItemEstructuraFalse } from "./chargingItems"
let armasImg, armas, playerImg, killsImg, itemsImg = {}
let off, notlog, sinEmpezar = false
let newEntry = true
let getedOut = false
let notlog2 = 0
let restarting = true
let proyectilesImg = { malos: [], balas: [] }
let onHitImg = []
let malosImg = []
let obst = []
let items = 0
let itemsImgNum = 0
let itemsImgAudio = 0
let mapeadas = 0
let allPhotos = []
let allAudios = []
let erroresCarga = []
let funciona = console.log
let chargesCopy = console.log
const ChargeComponent = (props) => {
    const { returnCharge = console.log, getOut = false } = props
    const [charged, setCharged] = useState(false)
    const [many, setMany] = useState(0)
    const [manyImg, setManyImg] = useState(0)
    const [manyAudio, setManyAudio] = useState(0)
    const [manyNeed, setManyNeed] = useState(0)
    const [imgNeed, setimgNeed] = useState(0)
    const toChargue = aCargar2
    const bodyToCharge = toChargue.imagenes.body
    const playerToCharge = toChargue.imagenes.player
    const armasToCharge = toChargue.imagenes.armas
    const obstaculosToCharge = toChargue.imagenes.obstaculos
    const accionesToCharge = toChargue.imagenes.acciones
    const powerUpsToCharge = toChargue.imagenes.powerUps
    const itemsToCharge = toChargue.imagenes.items
    const enemigosToCharge = toChargue.imagenes.enemigos
    const proyectilesToCharge = toChargue.imagenes.proyectiles
    const onHitToCharge = toChargue.imagenes.onHit
    const killsToCharge = toChargue.imagenes.kills
    const sfxToCharge = toChargue.sonidos.sfx
    const [randomImg, setrandomImg] = useState('/items/patineta/img/btn.png')
    let largoImg = Object.values(toChargue)[0]
    let largoImgMap = Object.values(largoImg)
    let largoImgFinal = 0
    largoImgMap.map((key, i) => {
        key.map((keyIn, iIn) => {
            keyIn.estructura.map((keyEst, iEst) => {
                largoImgFinal = largoImgFinal + keyEst.sprites
            })
        })
    })
    const restart = () => {
        if (!getedOut && !getOut) {
            armasImg = {}
            armas = {}
            playerImg = {}
            killsImg = {}
            itemsImg = {}
            notlog = false
            sinEmpezar = false
            notlog2 = 0
            proyectilesImg = { malos: [], balas: [] }
            onHitImg = []
            malosImg = []
            obst = []
            items = 0
            itemsImgNum = 0
            itemsImgAudio = 0
            mapeadas = 0
            allPhotos = []
            allAudios = []
            erroresCarga = []
            setCharged(false)
            setMany(0)
            setManyImg(0)
            setManyAudio(0)
            setManyNeed(0)
            setimgNeed(0)
            setTimeout(() => {
                chargesCopy()
            }, 500);
        }

    }
    const sumarMas = () => {
        setMany(items + 1)
        setManyImg(itemsImgNum + 1)
        itemsImgNum = itemsImgNum + 1
        items = items + 1
    }
    const newImg = () => {
        let randmooo = 0
        randmooo = parseInt(Math.floor(Math.random() * (allPhotos.length - 1)))
        if (randmooo >= 0 && randmooo < allPhotos.length && allPhotos.length > 0) {
            let randomImgAux = allPhotos[randmooo].img
            let randomsSrc = funciona(randomImgAux)
            setrandomImg(randomsSrc)
        }
        setTimeout(() => {
            newImg()
        }, 1500);
    }
    useEffect(() => {
        if (getOut) {
            getedOut = true
        }
    }, [getOut])

    useEffect(() => {
        if (!off && !getedOut && !getOut) {
            const charges = (charguingItem) => {
                if (!getOut && !getedOut) {
                    charguingItem.sfxToCharge.load && sfxToCharge.map((key, i) => {
                        const elAudio = new Audio(key.url)
                        mapeadas = mapeadas + 1
                        elAudio.addEventListener('loadeddata', () => {
                            if (elAudio.readyState >= 2) {
                                setMany(items + 1)
                                setManyAudio(itemsImgAudio + 1)
                                itemsImgAudio = itemsImgAudio + 1
                                allAudios.push({ tipo: key.tipo, nombre: key.nombre, archivo: elAudio, url: `${key.url}` })
                            }
                        });
                    })
                    charguingItem.Init.load && armasToCharge.map((key, i) => {
                        armas = {
                            ...armas,
                            [key.nombre]: {
                                onHit: false,
                                damage: 2,
                                sound: [],
                                type: 'strike',
                                speed: 1,
                                state: false,
                                fotograma: 0,
                                layer: 0,
                                onEnd: false,
                                kills: [],
                                body: [],
                                imagenes: []
                            }
                        }
                    })
                    charguingItem.armasToCharge.load && armasToCharge.map((key, i) => {
                        if ((!charguingItem.armasToCharge.restart) || (charguingItem.armasToCharge.restart && i === 0)) {
                            const iI = charguingItem.armasToCharge.restart ? charguingItem.armasToCharge.key.i : i
                            const Chargekey = charguingItem.armasToCharge.restart ? charguingItem.armasToCharge.key : key
                            const nombreToCharge = charguingItem.armasToCharge.restart ? charguingItem.armasToCharge.key.key.nombre : key.nombre
                            const theKey = charguingItem.armasToCharge.restart ? charguingItem.armasToCharge.key.key : key
                            const estructura = charguingItem.armasToCharge.restart ? charguingItem.armasToCharge.key.key.estructura : key.estructura
                            estructura.map((keyEst, iEst) => {
                                if ((!charguingItem.armasToCharge.restart) || (charguingItem.armasToCharge.restart && iEst === 0)) {
                                    const KeyEst = charguingItem.armasToCharge.restart ? charguingItem.armasToCharge.key.keyEst : keyEst
                                    const IEst = charguingItem.armasToCharge.restart ? charguingItem.armasToCharge.key.iEst : iEst
                                    let howIndex = charguingItem.armasToCharge.restart ? charguingItem.armasToCharge.key.index : 0
                                    const howMuch = charguingItem.armasToCharge.restart ? howIndexAux + 1 : keyEst.sprites
                                    const keyEstNombre = charguingItem.armasToCharge.restart ? charguingItem.armasToCharge.key.keyEst.nombre : keyEst.nombre
                                    for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {
                                        let oImgW, oImgH = 0
                                        let element = new Image
                                        element.src = `/armas/${nombreToCharge}/img/bat-${howIndexAux}-${keyEstNombre}.png`
                                        element.onerror = ((error) => {
                                            let esquema = charguingItemEstructuraFalse
                                            esquema.Init.load = false
                                            mapeadas = mapeadas - 1
                                            esquema.armasToCharge.restart = true
                                            esquema.armasToCharge.load = true
                                            esquema.armasToCharge.key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                                            reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema })
                                        })
                                        mapeadas = mapeadas + 1
                                        element.onload = (() => {
                                            sumarMas()
                                            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${howIndexAux}` })
                                            oImgW = element.naturalWidth
                                            oImgH = element.naturalHeight
                                            armas[nombreToCharge].imagenes.push({
                                                direccion: keyEstNombre,
                                                id: howIndexAux,
                                                imagen: element,
                                                widthX: oImgW / 10,
                                                heightY: oImgH / 10,
                                            })
                                        })
                                    }
                                }
                            })
                        }
                    })
                    charguingItem.bodyToCharge.load && bodyToCharge.map((key, i) => {
                        if ((!charguingItem.bodyToCharge.restart) || (charguingItem.bodyToCharge.restart && i === 0)) {
                            const iI = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key.i : i
                            const Chargekey = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key : key
                            const nombreToCharge = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key.key.nombre : key.nombre
                            const tipoToCharge = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key.key.tipo : key.tipo
                            const theKey = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key.key : key
                            const estructura = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key.key.estructura : key.estructura
                            estructura.map((keyEst, iEst) => {
                                if ((!charguingItem.bodyToCharge.restart) || (charguingItem.bodyToCharge.restart && iEst === 0)) {
                                    const KeyEst = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key.keyEst : keyEst
                                    const IEst = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key.iEst : iEst
                                    let howIndex = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key.index : 0
                                    const howMuch = charguingItem.bodyToCharge.restart ? howIndexAux + 1 : keyEst.sprites
                                    const keyEstNombre = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key.keyEst.nombre : keyEst.nombre
                                    for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {
                                        let element = new Image
                                        element.src = `/armas/${nombreToCharge}/${tipoToCharge}/body.png`
                                        element.onerror = ((error) => {
                                            let esquema = charguingItemEstructuraFalse
                                            esquema.Init.load = false
                                            mapeadas = mapeadas - 1
                                            esquema.bodyToCharge.restart = true
                                            esquema.bodyToCharge.load = true
                                            esquema.bodyToCharge.key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                                            reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema })
                                        })
                                        mapeadas = mapeadas + 1
                                        element.onload = (() => {
                                            sumarMas()
                                            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${IEst}` })
                                            armas[nombreToCharge].body = (element)
                                        })
                                    }
                                }
                            })
                        }
                    })
                    charguingItem.playerToCharge.load && playerToCharge.map((key, i) => {
                        if ((!charguingItem.playerToCharge.restart) || (charguingItem.playerToCharge.restart && i === 0)) {
                            const iI = charguingItem.playerToCharge.restart ? charguingItem.playerToCharge.key.i : i
                            const nombreToCharge = charguingItem.playerToCharge.restart ? charguingItem.playerToCharge.key.key.nombre : key.nombre
                            const theKey = charguingItem.playerToCharge.restart ? charguingItem.playerToCharge.key.key : key
                            const estructura = charguingItem.playerToCharge.restart ? charguingItem.playerToCharge.key.key.estructura : key.estructura
                            estructura.map((keyEst, iEst) => {
                                if ((!charguingItem.playerToCharge.restart) || (charguingItem.playerToCharge.restart && iEst === 0)) {
                                    const KeyEst = charguingItem.playerToCharge.restart ? charguingItem.playerToCharge.key.keyEst : keyEst
                                    const IEst = charguingItem.playerToCharge.restart ? charguingItem.playerToCharge.key.iEst : iEst
                                    let howIndex = charguingItem.playerToCharge.restart ? charguingItem.playerToCharge.key.index : 0
                                    const howMuch = charguingItem.playerToCharge.restart ? howIndexAux + 1 : keyEst.sprites
                                    const keyEstNombre = charguingItem.playerToCharge.restart ? charguingItem.playerToCharge.key.keyEst.nombre : keyEst.nombre
                                    for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {
                                        let element = new Image
                                        element.src = `/img/body/${nombreToCharge}-${nombreToCharge}-${keyEstNombre}-${howIndexAux}.png`
                                        element.onerror = ((error) => {
                                            let esquema = charguingItemEstructuraFalse
                                            esquema.Init.load = false
                                            mapeadas = mapeadas - 1
                                            esquema.playerToCharge.restart = true
                                            esquema.playerToCharge.load = true
                                            esquema.playerToCharge.key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                                            reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema })
                                        })
                                        mapeadas = mapeadas + 1
                                        element.onload = (() => {
                                            sumarMas()
                                            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${iI}` })
                                            playerImg = {
                                                ...playerImg,
                                                [`${nombreToCharge}_${keyEstNombre}_${howIndexAux}`]: element
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                    charguingItem.enemigosToCharge.load && enemigosToCharge.map((key, i) => {
                        if ((!charguingItem.enemigosToCharge.restart) || (charguingItem.enemigosToCharge.restart && i === 0)) {
                            const iI = charguingItem.enemigosToCharge.restart ? charguingItem.enemigosToCharge.key.i : i
                            const Chargekey = charguingItem.enemigosToCharge.restart ? charguingItem.enemigosToCharge.key : key
                            const nombreToCharge = charguingItem.enemigosToCharge.restart ? charguingItem.enemigosToCharge.key.key.nombre : key.nombre
                            const tipoToCharge = charguingItem.enemigosToCharge.restart ? charguingItem.enemigosToCharge.key.key.tipo : key.tipo
                            const theKey = charguingItem.enemigosToCharge.restart ? charguingItem.enemigosToCharge.key.key : key
                            const estructura = charguingItem.enemigosToCharge.restart ? charguingItem.enemigosToCharge.key.key.estructura : key.estructura
                            estructura.map((keyEst, iEst) => {
                                if ((!charguingItem.enemigosToCharge.restart) || (charguingItem.enemigosToCharge.restart && iEst === 0)) {
                                    const KeyEst = charguingItem.enemigosToCharge.restart ? charguingItem.enemigosToCharge.key.keyEst : keyEst
                                    const IEst = charguingItem.enemigosToCharge.restart ? charguingItem.enemigosToCharge.key.iEst : iEst
                                    let howIndex = charguingItem.enemigosToCharge.restart ? charguingItem.enemigosToCharge.key.index : 0
                                    const howMuch = charguingItem.enemigosToCharge.restart ? howIndexAux + 1 : keyEst.sprites
                                    const keyEstNombre = charguingItem.enemigosToCharge.restart ? charguingItem.enemigosToCharge.key.keyEst.nombre : keyEst.nombre
                                    for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {
                                        let element = new Image
                                        element.src = `/enemigos/${nombreToCharge}/${nombreToCharge}-${tipoToCharge}-${keyEstNombre}-${howIndexAux}.png`
                                        element.onerror = ((error) => {
                                            let esquema = charguingItemEstructuraFalse
                                            esquema.Init.load = false
                                            mapeadas = mapeadas - 1
                                            esquema.enemigosToCharge.restart = true
                                            esquema.enemigosToCharge.load = true
                                            esquema.enemigosToCharge.key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                                            reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema })
                                        })
                                        mapeadas = mapeadas + 1
                                        element.onload = (() => {
                                            charguingItem.enemigosToCharge.restart && console.log('mas una', `${nombreToCharge}-${keyEstNombre}-${IEst}`);
                                            sumarMas()
                                            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${IEst}` })
                                            malosImg.push({
                                                direccion: `${tipoToCharge}_${keyEstNombre}_${howIndexAux}`,
                                                imagen: element
                                            })
                                        })
                                    }
                                }
                            })
                        }
                        if (charguingItem.enemigosToCharge.restart) {
                            return
                        }

                    })
                    charguingItem.proyectilesToCharge.load && proyectilesToCharge.map((key, i) => {
                        if ((!charguingItem.proyectilesToCharge.restart) || (charguingItem.proyectilesToCharge.restart && i === 0)) {
                            const iI = charguingItem.proyectilesToCharge.restart ? charguingItem.proyectilesToCharge.key.i : i
                            const Chargekey = charguingItem.proyectilesToCharge.restart ? charguingItem.proyectilesToCharge.key : key
                            const nombreToCharge = charguingItem.proyectilesToCharge.restart ? charguingItem.proyectilesToCharge.key.key.nombre : key.nombre
                            const tipoToCharge = charguingItem.proyectilesToCharge.restart ? charguingItem.proyectilesToCharge.key.key.tipo : key.tipo
                            const theKey = charguingItem.proyectilesToCharge.restart ? charguingItem.proyectilesToCharge.key.key : key
                            const estructura = charguingItem.proyectilesToCharge.restart ? charguingItem.proyectilesToCharge.key.key.estructura : key.estructura
                            estructura.map((keyEst, iEst) => {
                                if ((!charguingItem.proyectilesToCharge.restart) || (charguingItem.proyectilesToCharge.restart && iEst === 0)) {
                                    const KeyEst = charguingItem.proyectilesToCharge.restart ? charguingItem.proyectilesToCharge.key.keyEst : keyEst
                                    const IEst = charguingItem.proyectilesToCharge.restart ? charguingItem.proyectilesToCharge.key.iEst : iEst
                                    let howIndex = charguingItem.proyectilesToCharge.restart ? charguingItem.proyectilesToCharge.key.index : 0
                                    const howMuch = charguingItem.proyectilesToCharge.restart ? howIndexAux + 1 : keyEst.sprites
                                    const keyEstNombre = charguingItem.proyectilesToCharge.restart ? charguingItem.proyectilesToCharge.key.keyEst.nombre : keyEst.nombre
                                    for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {
                                        let element = new Image
                                        element.src = `/proyectiles/${tipoToCharge}-${nombreToCharge}-${keyEstNombre}-${howIndexAux}.png`
                                        element.onerror = ((error) => {
                                            let esquema = charguingItemEstructuraFalse
                                            esquema.Init.load = false
                                            mapeadas = mapeadas - 1
                                            esquema.proyectilesToCharge.restart = true
                                            esquema.proyectilesToCharge.load = true
                                            esquema.proyectilesToCharge.key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                                            reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema })
                                        })
                                        mapeadas = mapeadas + 1
                                        element.onload = (() => {
                                            sumarMas()
                                            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${iI}` })
                                            proyectilesImg[tipoToCharge].push(element)
                                        })
                                    }
                                }
                            })
                        }
                    })
                    charguingItem.onHitToCharge.load && onHitToCharge.map((key, i) => {
                        if ((!charguingItem.onHitToCharge.restart) || (charguingItem.onHitToCharge.restart && i === 0)) {
                            const iI = charguingItem.onHitToCharge.restart ? charguingItem.onHitToCharge.key.i : i
                            const Chargekey = charguingItem.onHitToCharge.restart ? charguingItem.onHitToCharge.key : key
                            const nombreToCharge = charguingItem.onHitToCharge.restart ? charguingItem.onHitToCharge.key.key.nombre : key.nombre
                            const tipoToCharge = charguingItem.onHitToCharge.restart ? charguingItem.onHitToCharge.key.key.tipo : key.tipo
                            const theKey = charguingItem.onHitToCharge.restart ? charguingItem.onHitToCharge.key.key : key
                            const estructura = charguingItem.onHitToCharge.restart ? charguingItem.onHitToCharge.key.key.estructura : key.estructura
                            estructura.map((keyEst, iEst) => {
                                if ((!charguingItem.onHitToCharge.restart) || (charguingItem.onHitToCharge.restart && iEst === 0)) {
                                    const KeyEst = charguingItem.onHitToCharge.restart ? charguingItem.onHitToCharge.key.keyEst : keyEst
                                    const IEst = charguingItem.onHitToCharge.restart ? charguingItem.onHitToCharge.key.iEst : iEst
                                    let howIndex = charguingItem.onHitToCharge.restart ? charguingItem.onHitToCharge.key.index : 0
                                    const howMuch = charguingItem.onHitToCharge.restart ? howIndexAux + 1 : keyEst.sprites
                                    const keyEstNombre = charguingItem.onHitToCharge.restart ? charguingItem.onHitToCharge.key.keyEst.nombre : keyEst.nombre
                                    for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {
                                        let element = new Image
                                        element.src = `/onHit/${nombreToCharge}/${nombreToCharge}-${tipoToCharge}-${keyEstNombre}-${howIndexAux}.png`
                                        element.onerror = ((error) => {
                                            let esquema = charguingItemEstructuraFalse
                                            esquema.Init.load = false
                                            mapeadas = mapeadas - 1
                                            esquema.onHitToCharge.restart = true
                                            esquema.onHitToCharge.load = true
                                            esquema.onHitToCharge.key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                                            reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema })
                                        })
                                        mapeadas = mapeadas + 1
                                        element.onload = (() => {
                                            sumarMas()
                                            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${iI}` })
                                            onHitImg.push({ imagen: element, id: howIndexAux, direccion: keyEstNombre })
                                        })
                                    }
                                }
                            })
                        }
                    })
                    charguingItem.killsToCharge.load && killsToCharge.map((key, i) => {
                        if ((!charguingItem.killsToCharge.restart) || (charguingItem.killsToCharge.restart && i === 0)) {
                            const iI = charguingItem.killsToCharge.restart ? charguingItem.killsToCharge.key.i : i
                            const Chargekey = charguingItem.killsToCharge.restart ? charguingItem.killsToCharge.key : key
                            const nombreToCharge = charguingItem.killsToCharge.restart ? charguingItem.killsToCharge.key.key.nombre : key.nombre
                            const tipoToCharge = charguingItem.killsToCharge.restart ? charguingItem.killsToCharge.key.key.tipo : key.tipo
                            const theKey = charguingItem.killsToCharge.restart ? charguingItem.killsToCharge.key.key : key
                            const estructura = charguingItem.killsToCharge.restart ? charguingItem.killsToCharge.key.key.estructura : key.estructura
                            estructura.map((keyEst, iEst) => {
                                if ((!charguingItem.killsToCharge.restart) || (charguingItem.killsToCharge.restart && iEst === 0)) {
                                    const KeyEst = charguingItem.killsToCharge.restart ? charguingItem.killsToCharge.key.keyEst : keyEst
                                    const IEst = charguingItem.killsToCharge.restart ? charguingItem.killsToCharge.key.iEst : iEst
                                    let howIndex = charguingItem.killsToCharge.restart ? charguingItem.killsToCharge.key.index : 0
                                    const howMuch = charguingItem.killsToCharge.restart ? howIndexAux + 1 : keyEst.sprites
                                    const keyEstNombre = charguingItem.killsToCharge.restart ? charguingItem.killsToCharge.key.keyEst.nombre : keyEst.nombre
                                    for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {
                                        let element = new Image
                                        element.src = `/kills/${nombreToCharge}/${tipoToCharge}-${nombreToCharge}-${keyEstNombre}-${howIndexAux}.png`
                                        element.onerror = ((error) => {
                                            let esquema = charguingItemEstructuraFalse
                                            esquema.Init.load = false
                                            mapeadas = mapeadas - 1
                                            esquema.killsToCharge.restart = true
                                            esquema.killsToCharge.load = true
                                            esquema.killsToCharge.key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                                            reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema })
                                        })
                                        mapeadas = mapeadas + 1
                                        element.onload = (() => {
                                            sumarMas()
                                            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${iI}` })
                                            killsImg = {
                                                ...killsImg,
                                                [`${tipoToCharge}_${keyEstNombre}_${howIndexAux}`]: element
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                    charguingItem.accionesToCharge.load && accionesToCharge.map((key, i) => {
                        if ((!charguingItem.accionesToCharge.restart) || (charguingItem.accionesToCharge.restart && i === 0)) {
                            const iI = charguingItem.accionesToCharge.restart ? charguingItem.accionesToCharge.key.i : i
                            const Chargekey = charguingItem.accionesToCharge.restart ? charguingItem.accionesToCharge.key : key
                            const nombreToCharge = charguingItem.accionesToCharge.restart ? charguingItem.accionesToCharge.key.key.nombre : key.nombre
                            const theKey = charguingItem.accionesToCharge.restart ? charguingItem.accionesToCharge.key.key : key
                            const estructura = charguingItem.accionesToCharge.restart ? charguingItem.accionesToCharge.key.key.estructura : key.estructura
                            estructura.map((keyEst, iEst) => {
                                if ((!charguingItem.accionesToCharge.restart) || (charguingItem.accionesToCharge.restart && iEst === 0)) {
                                    const KeyEst = charguingItem.accionesToCharge.restart ? charguingItem.accionesToCharge.key.keyEst : keyEst
                                    const IEst = charguingItem.accionesToCharge.restart ? charguingItem.accionesToCharge.key.iEst : iEst
                                    let howIndex = charguingItem.accionesToCharge.restart ? charguingItem.accionesToCharge.key.index : 0
                                    const howMuch = charguingItem.accionesToCharge.restart ? howIndexAux + 1 : keyEst.sprites
                                    const keyEstNombre = charguingItem.accionesToCharge.restart ? charguingItem.accionesToCharge.key.keyEst.nombre : keyEst.nombre
                                    for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {
                                        let element = new Image
                                        element.src = `/img/body/body-${nombreToCharge}-${keyEstNombre}-${howIndexAux}.png`
                                        element.onerror = ((error) => {
                                            let esquema = charguingItemEstructuraFalse
                                            esquema.Init.load = false
                                            mapeadas = mapeadas - 1
                                            esquema.accionesToCharge.restart = true
                                            esquema.accionesToCharge.load = true
                                            esquema.accionesToCharge.key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                                            reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema })
                                        })
                                        mapeadas = mapeadas + 1
                                        element.onload = (() => {
                                            sumarMas()
                                            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${iI}` })
                                            playerImg = {
                                                ...playerImg,
                                                [`${nombreToCharge}_${keyEstNombre}_${howIndexAux}`]: element
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                    charguingItem.powerUpsToCharge.load && powerUpsToCharge.map((key, i) => {
                        if ((!charguingItem.powerUpsToCharge.restart) || (charguingItem.powerUpsToCharge.restart && i === 0)) {
                            const iI = charguingItem.powerUpsToCharge.restart ? charguingItem.powerUpsToCharge.key.i : i
                            const Chargekey = charguingItem.powerUpsToCharge.restart ? charguingItem.powerUpsToCharge.key : key
                            const nombreToCharge = charguingItem.powerUpsToCharge.restart ? charguingItem.powerUpsToCharge.key.key.nombre : key.nombre
                            const tipoToCharge = charguingItem.powerUpsToCharge.restart ? charguingItem.powerUpsToCharge.key.key.tipo : key.tipo
                            const theKey = charguingItem.powerUpsToCharge.restart ? charguingItem.powerUpsToCharge.key.key : key
                            const estructura = charguingItem.powerUpsToCharge.restart ? charguingItem.powerUpsToCharge.key.key.estructura : key.estructura
                            estructura.map((keyEst, iEst) => {
                                if ((!charguingItem.powerUpsToCharge.restart) || (charguingItem.powerUpsToCharge.restart && iEst === 0)) {
                                    const KeyEst = charguingItem.powerUpsToCharge.restart ? charguingItem.powerUpsToCharge.key.keyEst : keyEst
                                    const IEst = charguingItem.powerUpsToCharge.restart ? charguingItem.powerUpsToCharge.key.iEst : iEst
                                    let howIndex = charguingItem.powerUpsToCharge.restart ? charguingItem.powerUpsToCharge.key.index : 0
                                    const howMuch = charguingItem.powerUpsToCharge.restart ? howIndexAux + 1 : keyEst.sprites
                                    const keyEstNombre = charguingItem.powerUpsToCharge.restart ? charguingItem.powerUpsToCharge.key.keyEst.nombre : keyEst.nombre
                                    for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {
                                        let element = new Image
                                        element.src = `/powerUps/${nombreToCharge}/img/${tipoToCharge}-${nombreToCharge}-${keyEstNombre}-${howIndexAux}.png`
                                        element.onerror = ((error) => {
                                            let esquema = charguingItemEstructuraFalse
                                            esquema.Init.load = false
                                            mapeadas = mapeadas - 1
                                            esquema.powerUpsToCharge.restart = true
                                            esquema.powerUpsToCharge.load = true
                                            esquema.powerUpsToCharge.key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                                            reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema })
                                        })
                                        mapeadas = mapeadas + 1
                                        element.onload = (() => {
                                            sumarMas()
                                            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${iI}` })
                                            playerImg = {
                                                ...playerImg,
                                                [`${nombreToCharge}_${keyEstNombre}_${howIndexAux}`]: element
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                    charguingItem.itemsToCharge.load && itemsToCharge.map((key, i) => {
                        charguingItem.Init.load ? itemsImg = {
                            ...itemsImg,
                            [key.nombre]: []
                        } : null

                        if ((!charguingItem.itemsToCharge.restart) || (charguingItem.itemsToCharge.restart && i === 0)) {
                            const iI = charguingItem.itemsToCharge.restart ? charguingItem.itemsToCharge.key.i : i
                            const Chargekey = charguingItem.itemsToCharge.restart ? charguingItem.itemsToCharge.key : key
                            const nombreToCharge = charguingItem.itemsToCharge.restart ? charguingItem.itemsToCharge.key.key.nombre : key.nombre
                            const tipoToCharge = charguingItem.itemsToCharge.restart ? charguingItem.itemsToCharge.key.key.tipo : key.tipo
                            const theKey = charguingItem.itemsToCharge.restart ? charguingItem.itemsToCharge.key.key : key
                            const estructura = charguingItem.itemsToCharge.restart ? charguingItem.itemsToCharge.key.key.estructura : key.estructura
                            estructura.map((keyEst, iEst) => {
                                if ((!charguingItem.itemsToCharge.restart) || (charguingItem.itemsToCharge.restart && iEst === 0)) {
                                    const KeyEst = charguingItem.itemsToCharge.restart ? charguingItem.itemsToCharge.key.keyEst : keyEst
                                    const IEst = charguingItem.itemsToCharge.restart ? charguingItem.itemsToCharge.key.iEst : iEst
                                    let howIndex = charguingItem.itemsToCharge.restart ? charguingItem.itemsToCharge.key.index : 0
                                    const howMuch = charguingItem.itemsToCharge.restart ? howIndexAux + 1 : keyEst.sprites
                                    const keyEstNombre = charguingItem.itemsToCharge.restart ? charguingItem.itemsToCharge.key.keyEst.nombre : keyEst.nombre
                                    for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {

                                        let element = new Image
                                        element.src = `/items/${nombreToCharge}/img/${nombreToCharge}-${tipoToCharge}-${keyEstNombre}-${howIndexAux}.png`
                                        element.onerror = ((error) => {
                                            let esquema = charguingItemEstructuraFalse
                                            esquema.Init.load = false
                                            mapeadas = mapeadas - 1
                                            esquema.itemsToCharge.restart = true
                                            esquema.itemsToCharge.load = true
                                            esquema.itemsToCharge.key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                                            reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema })
                                        })
                                        mapeadas = mapeadas + 1
                                        element.onload = (() => {
                                            sumarMas()
                                            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${iI}` })
                                            itemsImg[nombreToCharge].push({ direccion: keyEstNombre, estado: tipoToCharge, layer: howIndexAux, nombre: `${nombreToCharge}-${tipoToCharge}-${keyEstNombre}-${howIndexAux}`, imagen: element })
                                        })
                                    }
                                }
                            })
                        }
                    })
                    charguingItem.obstaculosToCharge.load && obstaculosToCharge.map((key, i) => {
                        key.estructura.map((keyEst, iEst) => {
                            let otraImagen = new Image()
                            const keyEstNombre = keyEst.nombre;
                            otraImagen.src = `/img/obstaculos/${keyEstNombre}.png`
                            otraImagen.onerror = ((error) => {
                                erroresCarga.push({ msg: `${key.nombre}-${i}-${keyEstNombre}-${iEst}`, error: error })
                            })
                            mapeadas = mapeadas + 1
                            otraImagen.onload = (() => {
                                sumarMas()
                                allPhotos.push({ img: otraImagen, id: `${key.nombre}-${keyEstNombre}-${i}` })
                                obst.push(otraImagen)
                            })
                        }
                        )
                    })
                    if (charguingItem.Init.load) {
                        setManyNeed(largoImgFinal + sfxToCharge.length)
                        setimgNeed(largoImgFinal)
                        const getBase64Image = (img) => {
                            let canvas = document.createElement("canvas");
                            canvas.width = img.width;
                            canvas.height = img.height;
                            let ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0);
                            let dataURL = canvas.toDataURL("image/png");
                            return dataURL
                        }
                        charguingItem.Init.load ? funciona = getBase64Image : null
                    }
                }
            }
            if (!off && newEntry && !getedOut) {
                newEntry = false
                chargesCopy = charges
                chargesCopy(charguingItemEstructura)
                off = true

            }
        }



        if ((parseInt((100 / (sfxToCharge.length + imgNeed)) * (manyImg + manyAudio)) === 100) && !notlog) {
            notlog = true
            setTimeout(() => {
                setTimeout(() => {
                    let allSend = {
                        sfx: allAudios, armas: armas, malosImg: malosImg, playerImg: playerImg, onHitImg: onHitImg, killsImg: killsImg, itemsImg: itemsImg, proyectilesImg: proyectilesImg, obst: obst
                    }
                    returnCharge(allSend)
                }, 2000);
                setCharged(true)
            }, 1000);
        }

        if (allAudios.length > 0 && allPhotos.length > 0 && !sinEmpezar && !getedOut) {
            sinEmpezar = true
            newImg()

        }
    })
    const reTry = (key) => {
        setTimeout(() => {
            if (key && key.esquema) {
                chargesCopy(key.esquema)
                console.log('entrando');
            }
        }, 2000)
        console.log('trata');
    }
  

    /*         console.log(erroresCarga[notlog2 - 1], 'encarga');
    */
    /* if (off && !getedOut) {
        setTimeout(() => {
            if (!getedOut && !getOut && off && mapeadas > 0 && mapeadas >= largoImgFinal + sfxToCharge.length && (parseInt((100 / (sfxToCharge.length + largoImgFinal)) * (manyImg + manyAudio)) !== 100 && parseInt((100 / (sfxToCharge.length + largoImgFinal)) * (manyImg + manyAudio)) > 10)) {
                off = false
                console.log('eyyyy');
                restart()
            }
        }, 10000);
    } */

    return (
        <>
            {getOut ? <></>
                :
                <>{charged ? <>  <div className="IDiv-main column align-center justify-center">
                    <h1>
                        READY                </h1>
                    <img
                        src={randomImg}
                        width='auto'
                        height={'500px'}
                        id={'randomImg'}
                        alt={`loading`}
                    />
                </div> </> :
                    <div className="IDiv-main column ">
                        <h1>
                            Total carga : {charged ? '100%' : parseInt((100 / (sfxToCharge.length + imgNeed)) * (manyImg + manyAudio)) > 0 ? parseInt((100 / (sfxToCharge.length + imgNeed)) * (manyImg + manyAudio)) : 0}%
                            <br />
                            Carga Imagenes:{parseInt((100 / imgNeed) * manyImg) > 0 ? parseInt((100 / imgNeed) * manyImg) : 0}% --- {manyImg} de {imgNeed}

                            <br />
                            Carga Audio:{parseInt((100 / sfxToCharge.length) * manyAudio) > 0 ? parseInt((100 / sfxToCharge.length) * manyAudio) : 0}%--- {manyAudio} de {sfxToCharge.length}
                            <br />
                        </h1>
                        <img
                            src={randomImg}
                            width='auto'
                            height={'500px'}
                            id={'randomImg'}
                            alt={`loading`}
                        />
                    </div>
                }

                </>
            }
        </>

    )
}
export default ChargeComponent