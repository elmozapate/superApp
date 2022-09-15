export const CrearItems = (newArray, posX, floor) => {

    return ([{
        displayneed: true,
        layerOnDisplay: 'all',
        imagen: [],
        type: 'hpc',
        posX: 0,
        posY: 0,
        widthX: 0,
        heightY: 0,
        status: 'live',
        health: {
/*             resistencia:0,
 */            blindaje: 0,
            estado: 'inmortal',
            nivel: 50
        },
        canMove: {
            state: true,
            colision: true,
            direccion: 'auto',
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
    }])
}
export const CrearItemsWorld = (newArray, level, imagen, floor) => {
    const maxDistance = () => {
        return (300) / (level < 3 ? 1 : level < 5 ? 2 : 3)
    }
    let array = []
    for (let index = 0; index < 11; index++) {
        let objCant = index === 0 ? (3 > level ? 1 : 2) : level < 3 ? 1 : level < 5 ? 2 : 3
        const distanceRange = maxDistance()
        let ejeX = 0
        for (let index2 = 0; index2 < objCant; index2++) {
            const max = ((300) / (level < 3 ? 1 : level < 5 ? 2 : 3)) - 20;
            const min = 20;
            const range = max - min + 1;
            const trys = (distanceRange * index2) + (Math.random() * range) + min;
            ejeX = index === 0 ? trys + 60 : trys
            const randomNumber = parseInt(Math.floor(Math.random() * 2))
            const element = {
                id: `${parseInt(Math.random() * 988888888)}-obst`,
                displayneed: true,
                layerOnDisplay: index,
                randomNumber: randomNumber,
                damage: randomNumber === 0 ? 25 : 45,
                type: 'obj',
                posX: ejeX,
                class: randomNumber === 0 ? 'cactus' : 'motosierra',
                posY: (floor - 20),
                widthX: newArray.xs_0.naturalWidth / 14,
                heightY: newArray.xs_0.naturalWidth / 14,
                canMove: {
                    state: true,
                    colision: true,
                    direccion: 'off',
                    jumps: {
                        posibility: false,
                        interval: 0,
                        speed: 0,
                        maxJump: 'gravity'
                    },
                    walks: {
                        posibility: false,
                        interval: 0,
                        speed: 0,
                        maxArea: 'all'
                    },

                },
                actions: {
                    inCurse: false,

                }
            }
            let randomDireccion = parseInt(Math.random() * 2)
            if (index2 === 0 || index2 === 2) {
                const malo = {
                    id: `${parseInt(Math.random() * 988888888)}-malo`,
                    hitDamage: 0,
                    state: 'live',
                    lazy: { state: false, counter: 0, fotograma: 0, layer: 0 },
                    displayneed: true,
                    layerOnDisplay: index,
                    imagen: imagen,
                    type: 'npc',
                    class: 'johsi',
                    damage: (Math.random() * 25) + 15,
                    posX: objCant > 1 ? index2 === 0 ? (Math.random() * 95) + 50 : (Math.random() * 110) + 150 : (Math.random() * 250) + 30,
                    posY: (floor - (imagen[0].imagen.naturalHeight / 27)),
                    widthX: imagen[0].imagen.naturalWidth / 22,
                    heightY: imagen[0].imagen.naturalHeight / 27,
                    health: 30,
                    spiritPosY: floor - imagen[0].imagen.naturalHeight / 27,
                    explotionTime: 0,
                    killLayer: 0,
                    killFotograma: 0,
                    canMove: {
                        lastChoke: 201,
                        state: true,
                        colision: true,
                        direccion: randomDireccion === 0 ? 'xb' : 'xf',
                        jumps: {
                            posibility: true,
                            state: false,
                            gravity: true,
                            interval: parseInt((Math.random() * 2000) + 1000),
                            inInterval: 0,
                            speed: (Math.random() * .5) + .5,
                            maxJump: (Math.random() * 70) + 60,
                        },
                        walks: {
                            posibility: true,
                            interval: 1,
                            speed: (Math.random() * .5) + .5,
                            maxArea: 'all'
                        }
                    },
                    actions: {
                        shot: {
                            posibility: true,
                            state: false,
                            type: 'basic',
                            interval: parseInt((Math.random() * (1000 / level)) + 500),
                            inInterval: 0,
                            speed: (Math.random() * .5) + .5,
                            damage: (Math.random() * 8) + 25

                        },
                        onDie: {
                            efect: 'basic',
                            dropItem: {
                                state: false,
                                startTaking: false,
                                finishTaking: false,
                                done: false,
                                item: ''
                            },
                            comible: {
                                state: true,
                                done: false,
                                efect: parseInt(Math.random() * 2) === 1 ? true : false,
                                startTaking: false,
                                finishTaking: false,
                                cantidad: parseInt(Math.random() * 30) + parseInt(Math.random() * 20),
                            }
                        },
                        inCurse: true
                    }
                }
                array.push(malo)
            }
            array.push(element)
        }


    }
    return (array)

}
export const PropsImage = {
    refreshData: false,
    levelPass: false,
    alive: true,
    worldSectionIn: 0,
    imagen: [],
    posX: 0,
    posY: 0,
    widthX: 0,
    heightY: 0,
    fotograma: 0,
    lastDireccion: 'xf',
    direccion: 'xs',
    onMove: false,
    id: 0,
    layer: 0,
    jumping: false,
    gravity: true,
    items: [{
        displayneed: true,
        layerOnDisplay: 0,
        imagen: [],
        type: 'hpc',
        posX: 0,
        posY: 0,
        widthX: 0,
        heightY: 0,
        status: 'live',
        health: {
/*             resistencia:0,
 */            blindaje: 0,
            estado: 'inmortal',
            nivel: 50
        },
        canMove: {
            state: true,
            colision: true,
            direccion: 'auto',
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
export const LosFondos = ['green', 'purple', 'black', 'red']
export default CrearItems
export const Plataforma = (floor) => {
    let Plataformas = []
    for (let index = 0; index < 3; index++) {
        let heightY = parseInt(Math.random() * 10) + 5
        const element = {
            id: `${parseInt(Math.random() * 988888888)}-platform`,
            displayneed: true,
            layerOnDisplay: (index * 3) + parseInt(Math.random() * 3),
            type: 'platform',
            posX: parseInt(Math.random() * 150) + 50,
            posY: floor - (parseInt(Math.random() * 10) + 20) - heightY,
            widthX: parseInt(Math.random() * 50) + 50,
            heightY: heightY
        };
        Plataformas.push(element)
    }

    return Plataformas
}