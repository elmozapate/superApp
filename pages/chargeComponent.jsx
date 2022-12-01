import ImageN from "next/image";
import { useEffect, useState } from "react"
import { ArmasEstInit } from "./armasEst";
import { aCargar2, charguingItemEstructura, charguingItemEstructuraFalse } from "./chargingItems"
let armasImg, armas, playerImg, killsImg, itemsImg = {}, returnCharge = console.log, getOut = false
let off, notlog, sinEmpezar = false; let newEntry = true; let inWork = true; let getedOut = false; let notlog2 = 0
let restarting = true; let proyectilesImg = { malos: [], balas: [] }; let onHitImg = []; let malosImg = []
let obst = []; let items = 0; let itemsImgNum = 0; let itemsImgAudio = 0; let mapeadas = 0; let itemNumber = -1; let AudioNumber = -1; let allPhotos = []
let allAudios = []; let erroresCarga = []; let funciona = console.log; let chargesCopy = console.log; let objToCharge = {
    bodyToCharge: [], playerToCharge: [], armasToCharge: [], obstaculosToCharge: [], accionesToCharge: [], powerUpsToCharge: [], itemsToCharge: [], enemigosToCharge: [], proyectilesToCharge: [], onHitToCharge: [], killsToCharge: [], sfxToCharge: []
}
const ChargeComponent = (props) => {
    const { returnCharge = console.log, getOut = false } = props
    const [charged, setCharged] = useState(false)
    const [many, setMany] = useState(0)
    const [manyImg, setManyImg] = useState(0)
    const [manyAudio, setManyAudio] = useState(0)
    const [manyNeed, setManyNeed] = useState(0)
    const [imgNeed, setimgNeed] = useState(0)
    const [randomImg, setrandomImg] = useState('/items/patineta/img/btn.png')

    const toChargue = aCargar2
    const willChargeImg = [
        'armas', 'obstaculos', 'body', 'player', 'acciones', 'powerUps', 'items', 'enemigos', 'proyectiles', 'onHit', 'kills',]
    const willChargeSound = [
        'sfx']


    objToCharge.bodyToCharge = toChargue.imagenes.body
    objToCharge.playerToCharge = toChargue.imagenes.player
    objToCharge.armasToCharge = toChargue.imagenes.armas
    objToCharge.obstaculosToCharge = toChargue.imagenes.obstaculos
    objToCharge.accionesToCharge = toChargue.imagenes.acciones
    objToCharge.powerUpsToCharge = toChargue.imagenes.powerUps
    objToCharge.itemsToCharge = toChargue.imagenes.items
    objToCharge.enemigosToCharge = toChargue.imagenes.enemigos
    objToCharge.proyectilesToCharge = toChargue.imagenes.proyectiles
    objToCharge.onHitToCharge = toChargue.imagenes.onHit
    objToCharge.killsToCharge = toChargue.imagenes.kills
    objToCharge.sfxToCharge = toChargue.sonidos.sfx
    let largoImg = Object.values(toChargue)[0]
    let largoImgMap = Object.values(largoImg)
    let largoImgFinal = 0
    let checkObj = {}
    if (inWork) {
        objToCharge.sfxToCharge.map((key, i) => {
            let nameis = `audio-${i}`
            checkObj = {
                ...checkObj,
                [nameis]: {
                    revisado: false,
                    correcto: false
                }
            }
        }
        )

        largoImgMap.map((key, i) => {
            key.map((keyIn, iIn) => {
                keyIn.estructura.map((keyEst, iEst) => {
                    for (let index = 0; index < keyEst.sprites; index++) {
                        let nameis = `item-${largoImgFinal}`
                        checkObj = {
                            ...checkObj,
                            [nameis]: {
                                revisado: false,
                                correcto: false
                            }
                        }
                        largoImgFinal = largoImgFinal + 1

                    }
                })
            })
        })
        const sumarMas = (elemento, ele2) => {
            setMany(items + 1)
            setManyImg(itemsImgNum + 1)
            itemsImgNum = itemsImgNum + 1
            items = items + 1

        }
        const newImg = () => {
            if (!getedOut && !getedOut && !getOut) {
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

        }
        const correctLoad = (key, iI, Chargekey, nombreToCharge, theKey, estructura, KeyEst, IEst, howMuch, keyEstNombre, howIndex, howIndexAux, tipoToCharge, element, suId) => {
            const nameis = `item-${suId}`
            sumarMas(suId, nombreToCharge)
            allPhotos.push({ img: element, id: `${nombreToCharge}-${keyEstNombre}-${howIndexAux}` })
            let oImgW = element.naturalWidth
            let oImgH = element.naturalHeight
            switch (key) {
                case 'armas':
                    armas[nombreToCharge].imagenes.push({
                        direccion: keyEstNombre,
                        id: howIndexAux,
                        imagen: element,
                        widthX: oImgW / 10,
                        heightY: oImgH / 10,
                    })
                    break;
                case 'obstaculos':
                    obst.push(element)
                    break;
                case 'body':
                    armas[nombreToCharge].body = (element)
                    break;
                case 'player':
                    playerImg = {
                        ...playerImg,
                        [`${nombreToCharge}_${keyEstNombre}_${howIndexAux}`]: element
                    }
                    break;
                case 'acciones':
                    playerImg = {
                        ...playerImg,
                        [`${nombreToCharge}_${keyEstNombre}_${howIndexAux}`]: element
                    }
                    break;
                case 'powerUps':
                    playerImg = {
                        ...playerImg,
                        [`${nombreToCharge}_${keyEstNombre}_${howIndexAux}`]: element
                    }
                    break;
                case 'items':
                    itemsImg[nombreToCharge].push({ direccion: keyEstNombre, estado: tipoToCharge, layer: howIndexAux, nombre: `${nombreToCharge}-${tipoToCharge}-${keyEstNombre}-${howIndexAux}`, imagen: element })
                    break;
                case 'enemigos':
                    malosImg.push({
                        direccion: `${tipoToCharge}_${keyEstNombre}_${howIndexAux}`,
                        imagen: element
                    })
                    break;
                case 'proyectiles':
                    proyectilesImg[tipoToCharge].push(element)

                    break;
                case 'onHit':
                    onHitImg.push({ imagen: element, id: howIndexAux, direccion: keyEstNombre })

                    break;
                case 'kills':
                    killsImg = {
                        ...killsImg,
                        [`${tipoToCharge}_${keyEstNombre}_${howIndexAux}`]: element
                    }
                    break;
                default:
                    break;
            }
        }
        const introImg = (firstKey, theName, charguingItem, iI, Chargekey, nombreToCharge, theKey, estructura, KeyEst, IEst, howMuch, keyEstNombre, howIndex, howIndexAux, tipoToCharge, suId) => {
            const SuId = suId
            const nameis = `item-${SuId}`
            if (!charguingItem[theName].restart) {
                itemNumber = itemNumber + 1
                checkObj[nameis].revisado = true
            }
            let element = new Image
            if (!checkObj[nameis].correcto) {
                switch (firstKey) {
                    case 'armas':
                        element.src = `/armas/${nombreToCharge}/img/bat-${howIndexAux}-${keyEstNombre}.png`
                        break;
                    case 'obstaculos':
                        element.src = `/img/obstaculos/${keyEstNombre}.png`

                        break;
                    case 'body':
                        element.src = `/armas/${nombreToCharge}/${tipoToCharge}/body.png`

                        break;
                    case 'player':
                        element.src = `/img/body/${nombreToCharge}-${nombreToCharge}-${keyEstNombre}-${howIndexAux}.png`

                        break;
                    case 'acciones':
                        element.src = `/img/body/body-${nombreToCharge}-${keyEstNombre}-${howIndexAux}.png`

                        break;
                    case 'powerUps':
                        element.src = `/powerUps/${nombreToCharge}/img/${tipoToCharge}-${nombreToCharge}-${keyEstNombre}-${howIndexAux}.png`
                        break;
                    case 'items':
                        element.src = `/items/${nombreToCharge}/img/${nombreToCharge}-${tipoToCharge}-${keyEstNombre}-${howIndexAux}.png`
                        break;
                    case 'enemigos':
                        element.src = `/enemigos/${nombreToCharge}/${nombreToCharge}-${tipoToCharge}-${keyEstNombre}-${howIndexAux}.png`
                        break;
                    case 'proyectiles':
                        element.src = `/proyectiles/${tipoToCharge}-${nombreToCharge}-${keyEstNombre}-${howIndexAux}.png`

                        break;
                    case 'onHit':
                        element.src = `/onHit/${nombreToCharge}/${nombreToCharge}-${tipoToCharge}-${keyEstNombre}-${howIndexAux}.png`
                        break;
                    case 'kills':
                        element.src = `/kills/${nombreToCharge}/${tipoToCharge}-${nombreToCharge}-${keyEstNombre}-${howIndexAux}.png`
                        break;
                    default:
                        break;
                }

            }
            if (element.src !== 'null' && !getedOut && !getOut) {
                element.onerror = ((error) => {
                    let esquema = charguingItemEstructuraFalse
                    esquema.Init.load = false
                    mapeadas = mapeadas - 1
                    esquema[theName].restart = true
                    esquema[theName].load = true
                    esquema[theName].key = { key: theKey, i: iI, keyEst: KeyEst, iEst: IEst, index: howIndexAux }
                    if (!checkObj[nameis].correcto) {
                        setTimeout(() => {
                            if (!checkObj[nameis].correcto) {

                                reTry({ msg: `${nombreToCharge}-${iI}-${keyEstNombre}-${IEst}`, error: error, esquema: esquema, itemNumber: SuId, firstKey: firstKey, theName: theName, charguingItem: charguingItem, iI: iI, Chargekey: Chargekey, nombreToCharge: nombreToCharge, theKey: theKey, estructura: estructura, KeyEst: KeyEst, IEst: IEst, howMuch: howMuch, keyEstNombre: keyEstNombre, howIndex: howIndex, howIndexAux: howIndexAux, tipoToCharge: tipoToCharge, suId: suId, })
                            }
                        }, 2000)
                    }
                })
                mapeadas = mapeadas + 1
                element.onload = (() => {
                    if (!checkObj[nameis].correcto) {
                        checkObj[nameis].correcto = true
                        correctLoad(firstKey, iI, Chargekey, nombreToCharge, theKey, estructura, KeyEst, IEst, howMuch, keyEstNombre, howIndex, howIndexAux, tipoToCharge, element, SuId)
                    }

                })
            }

        }
        const reTry = (key) => {
            const theRealKey = key
            const nameis = `item-${theRealKey.itemNumber}`
            if (theRealKey && theRealKey.esquema && !checkObj[nameis].correcto && !getedOut && !getOut) {
                const suId = theRealKey.itemNumber
                introImg(theRealKey.firstKey, theRealKey.theName, theRealKey.charguingItem, theRealKey.iI, theRealKey.Chargekey, theRealKey.nombreToCharge, theRealKey.theKey, theRealKey.estructura, theRealKey.KeyEst, theRealKey.IEst, theRealKey.howMuch, theRealKey.keyEstNombre, theRealKey.howIndex, theRealKey.howIndexAux, theRealKey.tipoToCharge, suId)
            }
        }
        useEffect(() => {
            const ac = new AbortController();
            if (inWork) {



                const loadAudio = (key, suId) => {
                    mapeadas = mapeadas + 1
                    const SuId = suId
                    const nameis = `audio-${SuId}`
                    if (!checkObj[nameis].correcto && !getedOut && !getOut) {
                        let trusted = false
                        const elAudio = new Audio(key.url)
                        const reDo = (event, key2, suIdRea, suNameReal) => {
                            console.log(1 < 0 ? event : ''), setTimeout(() => {
                                if (!checkObj[suNameReal].correcto) {
                                    mapeadas = mapeadas - 1
                                    loadAudio(key2, suIdRea)
                                }
                            }, 2000);
                        }
                        elAudio.addEventListener('loadeddata', () => {
                            trusted = true
                            if (elAudio.readyState >= 2) {
                                if (!checkObj[nameis].correcto) {
                                    checkObj[nameis].correcto = true
                                    setMany(items + 1)
                                    setManyAudio(itemsImgAudio + 1)
                                    itemsImgAudio = itemsImgAudio + 1
                                    allAudios.push({ tipo: key.tipo, nombre: key.nombre, archivo: elAudio, url: `${key.url}` })
                                }
                            } else {
                                if (!checkObj[nameis].correcto) {
                                    checkObj[nameis].correcto = true
    /*                             reDo('oooo', key, SuId)
     */                        }
                            }
                        })
                        elAudio.addEventListener('error', (event) => {
                            if (!checkObj[nameis].correcto) {
                                trusted = true
                                reDo(event, key, SuId, nameis)
                            }
                        });
                        setTimeout(() => {
                            if (!trusted && !checkObj[nameis].correcto) {
                                const suRealId = SuId
                                const reKey = key
                                trusted = true
                                reDo('oooo', reKey, suRealId, nameis)
                            }
                        }, 3000);
                    }

                }
                const charges = (charguingItem, theItemNumber) => {
                    if (!getOut && !getedOut) {

                        charguingItem.Init.load && objToCharge.armasToCharge.map((key, i) => {
                            armas = {
                                ...armas,
                                [key.nombre]: ArmasEstInit()
                            }
                        })
                        charguingItem.Init.load && objToCharge.itemsToCharge.map((key, i) => {
                            itemsImg = {
                                ...itemsImg,
                                [key.nombre]: []
                            }
                        })
                        willChargeSound.map((firstKey, FirstI) => {
                            charguingItem[`${firstKey}ToCharge`].load && objToCharge[`${firstKey}ToCharge`].map((key, i) => {
                                const theName = `${firstKey}ToCharge`
                                const suId = AudioNumber + 1
                                const nameis = `audio-${suId}`
                                if (!charguingItem[theName].restart) {
                                    AudioNumber = AudioNumber + 1
                                    if (!checkObj[nameis].revisado) {
                                        checkObj[nameis].revisado = true
                                        loadAudio(key, suId)
                                    }
                                }
                            })
                        })

                        willChargeImg.map((firstKey, FirstI) => {
                            const theName = `${firstKey}ToCharge`
                            charguingItem[theName].load && objToCharge[theName].map((key, i) => {
                                if ((!charguingItem[theName].restart) || (charguingItem[theName].restart && i === 0)) {
                                    const iI = charguingItem[theName].restart ? charguingItem[theName].key.i : i
                                    const Chargekey = charguingItem[theName].restart ? charguingItem[theName].key : key
                                    const nombreToCharge = charguingItem[theName].restart ? charguingItem[theName].key.key.nombre : key.nombre
                                    const theKey = charguingItem[theName].restart ? charguingItem[theName].key.key : key
                                    const estructura = charguingItem[theName].restart ? charguingItem[theName].key.key.estructura : key.estructura
                                    const tipoToCharge = charguingItem.bodyToCharge.restart ? charguingItem.bodyToCharge.key.key.tipo : key.tipo
                                    estructura.map((keyEst, iEst) => {
                                        if ((!charguingItem[theName].restart) || (charguingItem[theName].restart && iEst === 0)) {
                                            const KeyEst = charguingItem[theName].restart ? charguingItem[theName].key.keyEst : keyEst
                                            const IEst = charguingItem[theName].restart ? charguingItem[theName].key.iEst : iEst
                                            const howIndex = charguingItem[theName].restart ? charguingItem[theName].key.index : 0
                                            const howMuch = charguingItem[theName].restart ? howIndex + 1 : keyEst.sprites
                                            const keyEstNombre = charguingItem[theName].restart ? charguingItem[theName].key.keyEst.nombre : keyEst.nombre
                                            for (let howIndexAux = howIndex; howIndexAux < howMuch; howIndexAux++) {
                                                const suId = charguingItem[theName].restart ? theItemNumber : itemNumber + 1
                                                introImg(firstKey, theName, charguingItem, iI, Chargekey, nombreToCharge, theKey, estructura, KeyEst, IEst, howMuch, keyEstNombre, howIndex, howIndexAux, tipoToCharge, suId)
                                            }
                                        }
                                    })
                                }
                            })


                        })


                    }
                    if (charguingItem.Init.load && !getedOut && !getOut) {
                        setManyNeed(largoImgFinal + objToCharge.sfxToCharge.length)
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
                if (!off && newEntry && !getedOut) {
                    newEntry = false
                    chargesCopy = charges
                    chargesCopy(charguingItemEstructura)
                    off = true

                }
                if ((parseInt((100 / (objToCharge.sfxToCharge.length + imgNeed)) * (manyImg + manyAudio)) === 100) && !notlog && !getedOut) {
                    notlog = true
                    setTimeout(() => {
                        setTimeout(() => {
                            let allSend = {
                                sfx: allAudios, armas: armas, malosImg: malosImg, playerImg: playerImg, onHitImg: onHitImg, killsImg: killsImg, itemsImg: itemsImg, proyectilesImg: proyectilesImg, obst: obst
                            }
                            returnCharge(allSend)
                            return () => { ac.abort(); inWork = false };
                        }, 10);
                        setCharged(true)
                    }, 10);
                }
                if (allPhotos.length > 0 && !sinEmpezar && !getedOut) {
                    sinEmpezar = true
                    newImg()

                }
            }
        })
    }


    return (

        <>{charged ? <>  <div className="IDiv-main column align-center justify-center">
            <h1>
                READY                </h1>
            <ImageN
                src={randomImg}
                width={'500px'}
                height={'500px'}
                id={'randomImg'}
                alt={`loading`}

            />
        </div> </> :
            <div className="IDiv-main column ">
                <h1>
                    Total carga : {charged ? '100%' : parseInt((100 / (objToCharge.sfxToCharge.length + imgNeed)) * (manyImg + manyAudio)) > 0 ? parseInt((100 / (objToCharge.sfxToCharge.length + imgNeed)) * (manyImg + manyAudio)) : 0}%
                    <br />                            Carga Imagenes:{parseInt((100 / imgNeed) * manyImg) > 0 ? parseInt((100 / imgNeed) * manyImg) : 0}% --- {manyImg} de {imgNeed}

                    <br />
                    Carga Audio:{parseInt((100 / objToCharge.sfxToCharge.length) * manyAudio) > 0 ? parseInt((100 / objToCharge.sfxToCharge.length) * manyAudio) : 0}%--- {manyAudio} de {objToCharge.sfxToCharge.length}
                    <br />
                </h1>
                <ImageN
                    src={randomImg}
                    width={'500px'}
                    height={'500px'}
                    id={'randomImg'}
                    alt={`loading`}
                />
            </div>
        }

        </>

    )



}
export default ChargeComponent