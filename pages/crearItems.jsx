export const CrearItems = (newArray) => {

    return ([{
        displayneed: true,
        layerOnDisplay: 3,
        imagen: newArray,
        type: 'hpc',
        posX: 0,
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
export const CrearItemsWorld = (newArray, level,distanceRange) => {
    const minDistance = (value, value2) => {
        if ((value2 - value) <  20) {
            return value2 + 20
        } else {
            return value2

        }

    }
    let array = []
    for (let index = 0; index < 11; index++) {
        console.log(Math.floor(Math.random() * (level - 1)) + 1, level, 'level');
        let objDistances = []
        let objCant = /* index === 0 ? 1 : Math.floor(Math.random() * (level - 1)) + 1 */level
        let distanceRange =index===0?170: (280 / objCant)
        let ejeX = 0
       
        for (let index2 = 0; index2 < objCant; index2++) {
            if (index2 === 0) {
                ejeX = index === 0 ? Math.floor(Math.random() * (300 - 150)) + 150 : index2 === 0 ? Math.floor(Math.random() * (((distanceRange * index2) + distanceRange) - (distanceRange * index2))) + (distanceRange * index2) + 30 :( Math.floor(Math.random() * (((distanceRange * index2) + distanceRange) - (distanceRange * index2))) + (distanceRange * index2)+20)
                objDistances.push(ejeX)

            } else {
                ejeX = minDistance(objDistances[index2 - 1],Math.floor(Math.random() * (((distanceRange * index2) + distanceRange) - (distanceRange * index2))) + (distanceRange * index2),distanceRange)
            }
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
export default CrearItems