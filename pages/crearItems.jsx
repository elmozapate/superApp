export const CrearItems = (newArray, posX) => {

    return ([{
        displayneed: true,
        layerOnDisplay: 3,
        imagen: newArray,
        type: 'hpc',
        posX: posX,
        posY: 145,
        widthX: 19,
        heightY: 60,
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
export const CrearItemsWorld = (newArray, level, imagen) => {
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
            const element = {
                displayneed: true,
                layerOnDisplay: index,
                imagen: newArray,
                type: 'obj',
                posX: ejeX,
                posY: 150,
                widthX: 10,
                heightY: 30,
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
                    },

                },
                actions: {
                    inCurse: false
                }
            }
            let randomDireccion = (Math.random() * 2)
            if (index2 === 0 || index2 === 2) {
                const malo = {
                    displayneed: true,
                    layerOnDisplay: index,
                    imagen: imagen,
                    type: 'npc',
                    posX: objCant > 1 ? index2 === 0 ? (Math.random() * 95) + 50 : (Math.random() * 110) + 150 : (Math.random() * 250) + 30,
                    posY: 160,
                    widthX: imagen[0].imagen.naturalWidth / 22,
                    heightY: imagen[0].imagen.naturalHeight / 27,
                    canMove: {
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
                        },
                        shot: {
                            posibility: true,
                            state: false,
                            type: 'basic',
                            interval: parseInt((Math.random() * 2000) + 1000),
                            inInterval: 0,
                            speed: (Math.random() * .5) + .5
                        }
                    },
                    actions: {
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
    direccion: 'xs',
    onMove: false,
    id: 0,
    layer: 0,
    jumping: false,
    gravity: true,
    items: [{
        displayneed: true,
        layerOnDisplay: 3,
        imagen: [],
        type: 'hpc',
        posX: 0,
        posY: 0,
        widthX: 0,
        heightY: 0,
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