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
            direction: 'auto',
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
export const CrearItemsWorld = (newArray, level, distanceRange) => {
    const maxDistance = () => {
        return (300) / level
    }
    const minDistance = (value, value2) => {
        if ((value2 - value) < 20) {
            return value2 + 20
        } else {
            return value2

        }

    }
    let array = []
    for (let index = 0; index < 11; index++) {
        let objDistances = []
        let objCant = index === 0 ? (3 > level ? 1 : 2) : level
        const distanceRange = maxDistance()
        let ejeX = 0

        for (let index2 = 0; index2 < objCant; index2++) {
            const max = ((300) / level) - 20;
            const min = 20;
            const range = max - min + 1;
            const trys = (distanceRange * index2) + (Math.random() * range) + min;
            ejeX = index === 0 ? trys + 60 : trys
            /* Math.floor(Math.random() * (((distanceRange * (index2 + 1))) - ((((distanceRange * (index2 + 1))) - ((distanceRange * (index2)))) + 20))) + (((distanceRange * (index2 + 1))) - ((distanceRange * (index2)) + 20))
            objDistances.push(ejeX) */

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
                    direction: 'auto',
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
    graviti: true,
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
            direction: 'auto',
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