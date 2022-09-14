import Colisonador from "./colisionador";
import ProtoPlataforma from "./prototiposSprites/protoPlataforma";

const ColisionBasica = async (Objeto1 = [], Objeto2 = [], Objeto3 = { direccion: '' }, aux = false, Objeto4 = [], Objeto5 = [], plataformas = [], ctx, isShoting) => {
    let objeto1 = []
    let yArray = []
    let returns = { array: [], state: false }
    if (aux) {
        for (let ind = Objeto3.direccion === 'xd' ? parseInt(Objeto3.heightY / 2) : 0; ind < parseInt(Objeto3.heightY); ind++) {
            yArray.push(Objeto3.direccion === 'xd' ? parseInt(Objeto3.posY + ind) + parseInt(Objeto3.heightY / 2) : parseInt(Objeto3.posY + ind))
        }
        let maxWidth = isShoting ? parseInt(Objeto3.widthX + (Objeto3.widthX / 2.5)) : parseInt(Objeto3.widthX)
        for (let index = 0; index < maxWidth; index++) {
            const element = {
                posX: isShoting ? (Objeto3.direccion === 'xb' ? parseInt(index + Objeto1.posX - (Objeto3.widthX / 2.5)) : parseInt(index + Objeto1.posX)) : parseInt(index + Objeto1.posX),
                posY: parseInt(Objeto3.posY),
                yArray: yArray,
                widthX: maxWidth,
                heightY: Objeto3.heightY,
                posYmax: parseInt(Objeto3.posY) + Objeto3.heightY,
                id: 'player',
                pos: 'player'
            };
            objeto1.push(element)
        }
    } else {
        Objeto1.map((key, iss) => {
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
        if ((objeto1[0].posX + Objeto3.widthX > key.posX && objeto1[0].posX < key.posX) ||
            (objeto1[0].posX < key.posX + key.widthX && objeto1[0].posX > key.posX)) {
            key.falses.map((key2, i2) => {
                objetoPlataforma.push(key2)
            })
        }
    })
    let isplatform = false
    objeto1.map((key) => {
        objetoPlataforma.map((key2, iMalos) => {
            if (parseInt(key2.posX) === parseInt(key.posX)) {
                if (key2.posY > parseInt(key.posY) && key2.posY < parseInt(key.posY) + key.heightY && !returns.state) {
                    ctx.fillStyle = "#ff2626"; // Color rojo
                    ctx.beginPath(); // Iniciar trazo
                    ctx.arc(key2.posX, key2.posY, 1, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
                    ctx.fill();
                    returns.state = true
                    isplatform = true
                    returns.array.push({ a: 'plataforma', b: key2.colision })
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
                        returns.array.push({ a: 'plataforma', b: key2.colision })
                    }
                }
            })
        }

    })
    let objeto2 = []
    let yArray2 = []
    Objeto2.map((key, iss) => {
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
    Objeto4.map((key, iss) => {
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
    })
    let yArray5 = []
    Objeto5.map((key, iss) => {
        for (let ind = 0; ind < key.heightY; ind++) {
            yArray5.push(parseInt(key.posY + ind))
        }
        for (let index = 0; index < key.widthX; index++) {
            const element = {
                posX: parseInt(index + key.posX),
                posY: parseInt(key.posY),
                posYmax: parseInt(key.posY) + key.heightY,
                yArray: yArray5,
                id: key.id,
                widthX: key.widthX,
                heightY: key.heightY,
                pos: iss
            };
            objeto2.push(element)
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
            if (key2.posX === key.posX && !checkingPp) {
                key.yArray.map((posA) => {
                    key2.yArray.map((posB) => {
                        checking = false
                        idsIn.map((key) => {
                            if (key === key2.id) {
                                checking = true
                            }
                        })
                        if (posA === posB && !checking) {
                            idsIn.push(key2.id)
                            returns.array.push({ a: key, b: key2 })
                            returns.state = true
                        }
                    })
                })
            }
        })
    })
    return returns
}
export default ColisionBasica