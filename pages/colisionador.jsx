import BebeXf, { BebeXb } from "./prototiposSprites/protoBaby";
import BodyXf, { BodyXb } from "./prototiposSprites/protoBody";
import JoshiXf, { JoshiXb } from "./prototiposSprites/protoJoshi";
import SierraXf from "./prototiposSprites/protoSierra";

const Colisonador = (Objeto1, Objeto2, Objeto3, aux, comprobe, ctx, type) => {
    let objeto1 = []
    let bodyEmpty = []
    if (aux) {
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
            for (let i = 0; i < parseInt(Objeto3.heightY); i++) {
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
        })
    }
    let objeto2 = []
    let regletaNull = []
    if (comprobe) {
        const puntosNulos = type === 'malo' ? (Objeto2[0].canMove.direccion === 'xf' ? JoshiXf() : JoshiXb()) : type === 'proy' ?
            (Objeto2[0].direccion === 'xf' ? BebeXf() : BebeXb()) : SierraXf();
        Objeto2.map((key, iss) => {
            for (let i = 0; i < parseInt(key.heightY); i++) {
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
    let returns = { array: [], state: false }
    let empty = false
    let choko = false
    let keyCopied
    let maloCopied
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
            objeto2.map((key2, iMalos) => {
                if (key2.state !== 'die' && key2.state !== 'spirit' && key2.state !== 'onDie' && key2.posX === key.posX && key2.posY === key.posY && !empty) {
                    choko = true
                    empty = true
                    returns.state = true
                    returns.array.push({ a: key, b: key2 })
                   /*  ctx.fillStyle = "#ff2626";
                    ctx.beginPath();
                    ctx.arc(key2.posX, key2.posY, 2.5, 0, Math.PI * 2, true); 
                    ctx.fill(); */
                }
            })
        })
    }else{
        objeto1.map((key) => {
            objeto2.map((key2, iMalos) => {
                if ( key2.posX === key.posX && key2.posY === key.posY ) {
                    choko = true
                    keyCopied = key
                }
            })
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
export default Colisonador