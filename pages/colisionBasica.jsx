import Colisonador from "./colisionador";

const ColisionBasica = async (Objeto1 = [], Objeto2 = [], Objeto3 = { direccion: '' }, aux = false, Objeto4 = [], Objeto5 = []) => {
    let objeto1 = []
    let yArray = []

    if (aux) {
        for (let ind = Objeto3.direccion === 'xd' ? parseInt(Objeto3.heightY / 2) : 0; ind < parseInt(Objeto3.heightY); ind++) {
            yArray.push(Objeto3.direccion === 'xd' ? parseInt(Objeto3.posY + ind) + parseInt(Objeto3.heightY / 2) : parseInt(Objeto3.posY + ind))
        }
        for (let index = 0; index < Objeto3.widthX; index++) {
            const element = {
                posX: parseInt(index + Objeto1.posX),
                posY: parseInt(Objeto3.posY),
                yArray: yArray,
                widthX: Objeto3.widthX,
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
    let objeto2 = []
    let yArray2 = []
    Objeto2.map((key, iss) => {
        for (let ind = 0; ind < key.heightY; ind++) {
            yArray2.push(parseInt(key.posY + ind))
        }
        for (let index = 0; index < key.widthX; index++) {
            const element = {
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

    let returns = { array: [], state: false }
    objeto1.map((key) => {
        objeto2.map((key2, iMalos) => {
            if (key2.posX === key.posX && !returns.state) {
                key.yArray.map((posA) => {
                    key2.yArray.map((posB) => {
                        if (posA === posB && !returns.state) {
                            returns.state = true
                            returns.array.push({ a: key, b: key2 })
                        }
                    })
                })

            }
        })
    })
    return returns


}
export default ColisionBasica