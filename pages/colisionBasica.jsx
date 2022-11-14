import Colisonador from "./colisionador";
import ProtoPlataforma from "./prototiposSprites/protoPlataforma";

const ColisionBasica = async (player = [], levelFalses = [], propsImage = { direccion: '' }, aux = false, malosFalses = [], proyectilesFalses = [], plataformas = [], ctx, isShoting, inLayer) => {
    let objeto1 = []
    let yArray = []
    let returns = { array: [], state: false }
    if (aux) {
        for (let ind = propsImage.direccion === 'xd' ? parseInt(propsImage.heightY / 2) : 0; ind < parseInt(propsImage.heightY); ind++) {
            yArray.push(propsImage.direccion === 'xd' ? parseInt(propsImage.posY + ind) + parseInt(propsImage.heightY / 2) : parseInt(propsImage.posY + ind))
        }
        let maxWidth = isShoting ? parseInt(propsImage.widthX + (propsImage.widthX / 2.5)) : parseInt(propsImage.widthX)
        for (let index = 0; index < maxWidth; index++) {
            const element = {
                posX: isShoting ? (propsImage.direccion === 'xb' ? parseInt(index + player.posX - (propsImage.widthX / 2.5)) : parseInt(index + player.posX)) : parseInt(index + player.posX),
                posY: parseInt(propsImage.posY),
                yArray: yArray,
                widthX: maxWidth,
                heightY: propsImage.heightY,
                posYmax: parseInt(propsImage.posY) + propsImage.heightY,
                id: 'player',
                pos: 'player'
            };
            objeto1.push(element)
        }
    } else {
        player.map((key, iss) => {
            for (let ind = 0; ind < key.heightY; ind++) {
                yArray.push(parseInt(key.posY + ind))
            }
            for (let index = 0; index < key.widthX; index++) {
                const element = {
                    posX: parseInt(index + key.posX),
                    posY: parseInt(key.posY),
                    posYmax: parseInt(key.posY) + key.heightY,
                    widthX: key.widthX,
                    yArray: yArray,
                    heightY: key.heightY,
                    id: key.id,
                    pos: iss
                };
                objeto1.push(element)
            }
        })
    }
    let objetoPlataforma = []
    let objetoPlataformaAux = []
    plataformas.map((key, iss) => {
        objetoPlataformaAux.push(key)
    })
    objetoPlataformaAux.map((key, iss) => {
        if ((objeto1[0].posX + propsImage.widthX > key.posX && objeto1[0].posX < key.posX) ||
            (objeto1[0].posX < key.posX + key.widthX && objeto1[0].posX > key.posX)) {
            key.falses.map((key2, i2) => {
                objetoPlataforma.push(key2)
            })
        }
    })
    let isplatform = false
    let sinChoke = false
    objeto1.map((key) => {
        objetoPlataforma.map((key2, iMalos) => {
            if (parseInt(key2.posX) === parseInt(key.posX) && !sinChoke) {
                if (key2.posY > parseInt(key.posY) && key2.posY < parseInt(key.posY) + key.heightY && !returns.state) {
                    /*  ctx.fillStyle = "#ff2626"; // Color rojo
                     ctx.beginPath(); // Iniciar trazo
                     ctx.arc(key2.posX, key2.posY, 1, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
                     ctx.fill(); */
                    returns.state = true
                    isplatform = true
                    returns.array.push({ a: 'plataforma', b: key2.colision, c: false })
                    sinChoke = true
                    return returns
                }
            }
        })
    })
    objeto1.map((key) => {
        if (!isplatform) {
            objetoPlataforma.map((key2, iMalos) => {
                if (parseInt(key2.posX) === key.posX + parseInt(key.widthX) && !isplatform) {
                    if (key2.posY > parseInt(key.posY) && key2.posY < parseInt(key.posY) + key.heightY && !returns.state) {
                        returns.state = true
                        isplatform = true
                        returns.array.push({ a: 'plataforma', b: key2.colision, c: false })
                    }
                }
            })
        }

    })
    let objeto2 = []
    let objeto3 = []
    let yArray2 = []
    levelFalses.map((key, iss) => {
        for (let ind = 0; ind < key.heightY; ind++) {
            yArray2.push(parseInt(parseInt(key.posY) + ind))
        }
        for (let index = 0; index < key.widthX; index++) {
            const element = {
                randomNumber: key.randomNumber || 0,
                posX: parseInt(index + key.posX),
                posY: parseInt(key.posY),
                posYmax: parseInt(key.posY) + key.heightY,
                yArray: yArray2,
                id: key.id,
                widthX: key.widthX,
                heightY: key.heightY,
                pos: iss
            };
            objeto2.push(element)
        }
    })
    let yArray4 = []
    malosFalses.map((key, iss) => {
        if (parseInt(key.layerOnDisplay) === parseInt(inLayer)) {
            for (let ind = 0; ind < key.heightY; ind++) {
                yArray4.push(parseInt(key.posY + ind))
            }
            for (let index = 0; index < key.widthX; index++) {
                const element = {
                    posX: parseInt(index + key.posX),
                    posY: parseInt(key.posY),
                    posYmax: parseInt(key.posY) + key.heightY,
                    yArray: yArray4,
                    id: key.id,
                    pos: iss,
                    widthX: key.widthX,
                    heightY: key.heightY,

                };
                objeto2.push(element)
            }
        }

    })

    
    let yArray5 = []
    let npcAmo = 0
    let playerAmo = 0
    proyectilesFalses.map((key, iss) => {
        for (let ind = 0; ind < key.heightY; ind++) {
            yArray5.push(parseInt(key.posY + ind))
        }
        for (let index = 0; index < key.widthX; index++) {
            const element = {
                damageFor: key.damageFor,
                posX: parseInt(index + key.posX),
                posY: parseInt(key.posY),
                posYmax: parseInt(key.posY) + key.heightY,
                yArray: yArray5,
                id: key.id,
                widthX: key.widthX,
                heightY: key.heightY,
                pos: iss
            };
            if (key.damageFor === 'player') {
                objeto2.push(element)
                npcAmo = npcAmo + 1
            } else {
                objeto3.push(element)
                playerAmo = playerAmo + 1

            }
        }
    })
    let idsIn = []
    let checking = false
    let checkingPp = false
    objeto1.map((key) => {
        objeto2.map((key2, iMalos) => {
            checkingPp = false
            idsIn.map((key) => {
                if (key === key2.id) {
                    checkingPp = true
                }
            })
            if (!checkingPp && parseInt(key2.posX) === parseInt(key.posX)) {
                key.yArray.map((posA) => {
                    key2.yArray.map((posB) => {
                        checking = false
                        idsIn.map((key) => {
                            if (key === key2.id) {
                                checking = true
                            }
                        })
                        if (parseInt(posA) === parseInt(posB) && !checking) {
                            idsIn.push(key2.id)
                            returns.array.push({ a: key, b: key2, c: false })
                            returns.state = true
                            return returns
                        }
                    })
                })
            }
        })
    })
    if (playerAmo > 0) {
        let objMalosFalses = []
        let newYArray = []
        malosFalses.map((key, iss) => {
            for (let ind = 0; ind < key.heightY; ind++) {
                newYArray.push(parseInt(key.posY + ind))
            }
            for (let index = 0; index < key.widthX; index++) {
                const element = {
                    posX: parseInt(index + key.posX),
                    posY: parseInt(key.posY),
                    posYmax: parseInt(key.posY) + key.heightY,
                    widthX: key.widthX,
                    yArray: newYArray,
                    heightY: key.heightY,
                    id: key.id,
                    pos: iss
                };
                objMalosFalses.push(element)
            }
        })
        objMalosFalses.map((key) => {
            objeto3.map((key2, iMalos) => {
                checkingPp = false
                idsIn.map((key) => {
                    if (key === key2.id) {
                        checkingPp = true
                    }
                })
                if (!checkingPp && parseInt(key2.posX) === parseInt(key.posX)) {
                    key.yArray.map((posA) => {
                        key2.yArray.map((posB) => {
                            checking = false
                            idsIn.map((key) => {
                                if (key === key2.id) {
                                    checking = true
                                }
                            })
                            if (parseInt(posA) === parseInt(posB) && !checking) {
                                idsIn.push(key2.id)
                                returns.array.push({ a: key2, b: key, c: true })
                                returns.state = true
                            }
                        })
                    })
                }
            })
        })
    }
    if (npcAmo > 0) {
        objeto1.map((key) => {
            objeto2.map((key2, iMalos) => {
                if (key2.damageFor === 'player') {
                    checkingPp = false
                    idsIn.map((key) => {
                        if (key === key2.id) {
                            checkingPp = true
                        }
                    })
                    if (!checkingPp && parseInt(key2.posX) === parseInt(key.posX)) {
                        key.yArray.map((posA) => {
                            key2.yArray.map((posB) => {
                                checking = false
                                idsIn.map((key) => {
                                    if (key === key2.id) {
                                        checking = true
                                    }
                                })
                                if (parseInt(posA) === parseInt(posB) && !checking) {
                                    idsIn.push(key2.id)
                                    returns.array.push({ a: key, b: key2, c: false })
                                    returns.state = true
                                }
                            })
                        })
                    }
                }
            })
        })
    }

    return returns
}
export default ColisionBasica