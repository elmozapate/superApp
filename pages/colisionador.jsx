import BebeXf, { BebeXb } from "./prototiposSprites/protoBaby";
import BodyXf, { BodyXb, BodyXs } from "./prototiposSprites/protoBody";
import JoshiXf, { JoshiXb } from "./prototiposSprites/protoJoshi";
import SierraXf from "./prototiposSprites/protoSierra";

const Colisonador = async (Objeto1, Objeto2, Objeto3, aux, comprobe, ctx, type, inLayer) => {
    let objeto1 = []
    let bodyEmpty = []
    let objeto2 = []
    let regletaNull = []
    let returns = { array: [], state: false }
    let empty = false
    let choko = false
    let keyCopied
    let maloCopied
    if (aux && type === 'plataforma') {
        let objetoPlataforma = []
        /*  for (let index = 0; index < Objeto3.widthX; index++) {
             const element = {
                 posX: Objeto3.items[0].posX + index,
                 posY: Objeto3.posY,
                 widthX: Objeto3.widthX,
                 heightY: Objeto3.heightY,
                 id: `cabeza-${index}`,
                 pos: index
             };
             const element2 = {
                 posX: Objeto3.items[0].posX + index,
                 posY: Objeto3.posY + parseInt(Objeto3.heightY),
                 widthX: Objeto3.widthX,
                 heightY: Objeto3.heightY,
                 id: `pies-${index}`,
                 pos: index
             };
             objeto1.push(element)
             objeto1.push(element2)
         } */
        let objetoPlataformaAux = []
        Objeto2.map((key, iss) => {
            objetoPlataformaAux.push(key)
        })
        objetoPlataformaAux.map((key, iss) => {
            if ((parseInt(Objeto3.items[0].posX + Objeto3.widthX) > parseInt(key.posX) && parseInt(Objeto3.items[0].posX) < parseInt(key.posX)) ||
                parseInt(Objeto3.items[0].posX) < parseInt(key.posX + key.widthX) && parseInt(Objeto3.items[0].posX) > parseInt(key.posX)) {
                key.falses.map((key2, i2) => {
                    objetoPlataforma.push(key2)
                })
            }
        })
        const puntosNulosBody = BodyXs()
        for (let i = 0; i < 2; i++) {
            for (let index = 3; index < Objeto3.widthX - 3; index++) {
                const element = {
                    posX: parseInt(index + Objeto1.posX),
                    posY: i === 0 ? parseInt(Objeto3.posY) : parseInt(Objeto3.posY + Objeto3.heightY),
                    colisionaEn: 'y',
                    id: 'player',
                    pos: 'player',
                    widthX: parseInt(Objeto3.widthX),
                    heightY: parseInt(Objeto3.heightY),
                };
                objeto1.push(element)
            }
        }
        for (let i = 0; i < puntosNulosBody.length; i++) {
            const bodyNull = puntosNulosBody[i]

            for (let index = 0; index < parseInt(Objeto3.widthX); index++) {
                const element = {
                    colisionaEn: i === 0 || i === parseInt(Objeto3.heightY) - 1 ? 'y' : 'x',
                    posX: parseInt(index + Objeto1.posX),
                    posY: parseInt(Objeto3.posY + i),
                    id: 'player',
                    pos: 'player',
                    widthX: parseInt(Objeto3.widthX),
                    heightY: parseInt(Objeto3.heightY),
                };
                if (bodyNull.length === 3) {
                    if (((index < bodyNull[2][1]) && (index > bodyNull[2][0])) || index < bodyNull[0] || index > parseInt(Objeto3.widthX) - bodyNull[1]) {
                        bodyEmpty.push(element)
                    } else {
                        objeto1.push(element)
                    }
                } else
                    if (index < bodyNull[0] || index > parseInt(Objeto3.widthX) - bodyNull[1]) {
                        bodyEmpty.push(element)
                    } else {
                        objeto1.push(element)
                    }
            }
        }

        objeto1.map((key) => {
            if (!choko) {
                objetoPlataforma.map((key2, iMalos) => {
                    if (parseInt(key2.posX) === parseInt(key.posX) && parseInt(key2.posY) === parseInt(key.posY) && !choko) {
                        choko = true
                        returns.array.push({ a: key, b: key2 })
                        return (returns)
                    }
                })
            }

        })
        if (choko) {
            returns.state = false
            let point = (returns.array[0].b.colision).split('-')
            if (point[0] === 'y') {
                if (returns.array[0].a.colisionaEn === 'y') {
                    returns.state = true
                }
            }
            if (point[0] === 'x') {
                returns.state = true
            }
            return (returns)
        } else {
            returns.state = false
            return (returns)
        }
    }

    if (type !== 'plataforma') {
        if (aux && comprobe) {
            if (Objeto3.direccion === 'xd') {
                for (let i = parseInt(Objeto3.heightY / 2); i < Objeto3.heightY; i++) {
                    for (let index = 0; index < Objeto3.widthX; index++) {
                        const element = {
                            posX: parseInt(index + Objeto1.posX),
                            posY: parseInt(Objeto3.posY + i) + parseInt(Objeto3.heightY / 2),
                            id: 'player',
                            pos: 'player'
                        };
                        objeto1.push(element)
                    }
                }
            } else {
                const puntosNulosBody = Objeto3.direccion === 'xf' ? BodyXf() : Objeto3.direccion === 'xb' ? BodyXb() : BodyXf()
                for (let i = 0; i < puntosNulosBody.length - 1; i++) {
                    const bodyNull = puntosNulosBody[i]
                    for (let index = 0; index < parseInt(Objeto3.widthX); index++) {
                        const element = {
                            posX: parseInt(index + Objeto1.posX),
                            posY: parseInt(Objeto3.posY + i),
                            id: 'player',
                            pos: 'player'
                        };
                        if (bodyNull.length === 3) {
                            if (((index < bodyNull[2][1]) && (index > bodyNull[2][0])) || index < bodyNull[0] || index > parseInt(Objeto3.widthX) - bodyNull[1]) {
                                bodyEmpty.push(element)
                            } else {
                                objeto1.push(element)
                            }
                        } else
                            if (index < bodyNull[0] || index > parseInt(Objeto3.widthX) - bodyNull[1]) {
                                bodyEmpty.push(element)
                            } else {
                                objeto1.push(element)
                            }
                    }
                }
            }

        } else {
            Objeto1.map((key, iss) => {
                if (parseInt(key.layerOnDisplay)===parseInt(inLayer)) {
                    for (let i = 0; i < parseInt(key.heightY); i++) {
                        for (let index = 0; index < parseInt(key.widthX); index++) {
                            const element = {
                                posX: parseInt(index + key.posX),
                                posY: parseInt(key.posY + i),
                                id: key.id,
                                pos: iss
                            };
                            objeto1.push(element)
                        }
                    } 
                }
                
            })
        }

        if (comprobe) {
            const puntosNulos = type === 'malo' ? (Objeto2[0].canMove.direccion === 'xf' ? JoshiXf() : JoshiXb()) : type === 'proy' ?
                (Objeto2[0].direccion === 'xf' ? BebeXf() : BebeXb()) : SierraXf();
            Objeto2.map((key, iss) => {
                for (let i = 0; i < puntosNulos.length; i++) {
                    const lugarNull = puntosNulos[i]
                    for (let index = 0; index < parseInt(key.widthX); index++) {
                        const element = {
                            posX: parseInt(index + key.posX),
                            posY: parseInt(key.posY + i),
                            id: key.id,
                            pos: iss
                        };
                        if (lugarNull.length === 3) {
                            if (((index < lugarNull[2][1]) && (index > lugarNull[2][0])) || index < lugarNull[0] || index > parseInt(key.widthX) - lugarNull[1]) {
                                regletaNull.push(element)
                            } else {
                                objeto2.push(element)

                            }
                        } else
                            if (index < lugarNull[0] || index > parseInt(key.widthX) - lugarNull[1]) {
                                regletaNull.push(element)
                            } else {
                                objeto2.push(element)
                            }
                    }
                }
            })
        } else {
            Objeto2.map((key, iss) => {
                for (let i = 0; i < key.heightY; i++) {
                    for (let index = 0; index < key.widthX; index++) {
                        const element = {
                            posX: parseInt(index + key.posX),
                            posY: parseInt(key.posY + i),
                            id: key.id,
                            pos: iss
                        };
                        objeto2.push(element)
                    }
                }
            })
        }

        /* objeto1.map((key) => {
            regletaNull.map((key2, iMalos) => {
                if (key2.posX === key.posX && key2.posY === key.posY && !empty) {
                    empty = true
                    keyCopied = key
                    maloCopied = key2
                    ctx.fillStyle = "#ff2626"; // Color rojo
                    ctx.beginPath(); // Iniciar trazo
                    ctx.arc(key2.posX, key2.posY, 1, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
                    ctx.fill();
                }
            })
        }) */
        if (!empty && comprobe) {
            objeto1.map((key) => {
                if (!empty && !choko) {
                    objeto2.map((key2, iMalos) => {
                        if (key2.state !== 'die' && key2.state !== 'spirit' && key2.state !== 'onDie' && key2.posX === key.posX && key2.posY === key.posY && !empty && !choko) {
                            choko = true
                            empty = true
                            returns.state = true
                            returns.array.push({ a: key, b: key2 })
                            return
                        }
                    })
                }

            })
        } else {
            objeto1.map((key) => {
                if (!choko) {
                    objeto2.map((key2, iMalos) => {
                        if (key2.posX === key.posX && key2.posY === key.posY && !choko) {
                            choko = true
                            keyCopied = key
                            return
                        }
                    })
                }
            })
        }
        if (comprobe) {
            if (empty) {
                return (returns)
            } else {
                returns.state = false
                return (returns)
            }
        }
        else
            if (choko) {
                if (aux) {
                    return ({ pos: maloCopied.pos, choke: true, empty: false })

                } else {
                    return ({ pos: keyCopied.pos, choke: true })
                }

            } else {
                return ({ pos: NaN, i: NaN, choke: false, empty: false })

            }
    }


}
export default Colisonador
