import { useEffect, useState } from "react"
import Draglist from "./dragList"
let arrayInCook = []
let makingNew = []

const Drag = () => {
    const [contenedorArrayDone, setContenedorArrayDone] = useState({
        array: []

    }
    )
    const [hasWin, sethasWin] = useState(false)
    const [change, setchange] = useState(true)
    const setContainers = (value) => {
        console.log(value);
    }
    const changeArray = (value) => {
        let changingArray = contenedorArrayDone.array
        const numbers = value.drop.id.split('-')
        const newNumbers = value.contenedor.split('-')
        const oldObjet = changingArray[numbers[0]][numbers[3]].object
        changingArray[parseInt(numbers[0])][parseInt(numbers[3])].object = 'empty'
        changingArray[parseInt(newNumbers[0])][parseInt(newNumbers[1])].object = oldObjet
        setContenedorArrayDone({
            ...contenedorArrayDone,
            array: arrayInCook
        })
        arrayInCook = changingArray
        actualize()
    }
    const makeGame = (level, data) => {

        makingNew = []
        for (let indexo = 0; indexo < 2; indexo++) {
            let contenedorArray = []
            for (let index = 0; index < 9; index++) {
                const element = {
                    object: indexo === 1 ? `/img/puzzle${level}-${index}.png` : 'empty',
                    id: `${indexo}-${index}`
                };
                contenedorArray.push(element)
            }
            if (indexo === 1) {
                let dersorderArray = contenedorArray.sort(function (a, b) { return (Math.random() - 0.5) })
                makingNew.push(dersorderArray)

            } else {
                makingNew.push(contenedorArray)

            }

        }
        arrayInCook = makingNew
        setContenedorArrayDone({
            ...contenedorArrayDone,
            array: arrayInCook
        })
        if (data) {
            setchange(true)
            sethasWin(true)
            setTimeout(() => {
                sethasWin(false)
            }, 2000);
        } else {
            setchange(true)
            sethasWin(false)
        }
    }
    useEffect(() => {
        makeGame(0)
    }, [])
    const checkwin = (array) => {
        console.log(array, 'checking');
        let winned = true
        array.map((key, i) => {
            let valueAt = key.object
            if (valueAt !== 'empty') {
                valueAt = key.object.split('-')[1].split('.')[0]
                console.log(valueAt, 'parseInt(valueAt)');
                if (parseInt(valueAt) !== i || key.object === 'empty') {
                    winned = false
                }
            } else {
                winned = false

            }

        })
        return winned
    }
    const actualize = () => {
        console.log('cambioNuevo', arrayInCook);
        const checked = checkwin(arrayInCook[0])
        console.log(checked);
        if (checked) {
            sethasWin('true')
            setTimeout(() => {
                makeGame(1, true)

            }, 10000);
        } else {
            if (hasWin !== 'true') {
                setchange(true)
                setContenedorArrayDone({
                    ...contenedorArrayDone,
                    array: arrayInCook
                }
                )
            }
        }

    }
    useEffect(() => {
        if (change) {
            console.log('changeapretado');

            console.log('cambioNuevo');
            setContenedorArrayDone({
                ...contenedorArrayDone,
                array: arrayInCook
            })
            setchange(false)
        }

    }, [change])
    return (
        <>
                <Draglist setContainers={setContainers} changeArray={changeArray} contenedorArrayDone={contenedorArrayDone} hasWin={hasWin} />
       


        </>
    )
}
export default Drag