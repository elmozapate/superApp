import { useEffect, useState } from "react";
import DragItem from "./dragItem";


const DragContainer = (props) => {
    const { array = { array: [] }, setContainers = console.log, changeArray = console.log, contenedor = { id: -1 }, hasWin = false } = props
    const [contenedorArrayDone, setContenedorArrayDone] = useState({ array: array.array[contenedor.id] })
    useEffect(() => {
        console.log('cambioacasiiiiiiiiiiascciii', array);
        setContenedorArrayDone({
            ...contenedorArrayDone,
            array: array.array[contenedor.id]
        })

    }, [array])


    return (
        <DragItem
            contenedorArrayDones={contenedorArrayDone} contenedor={contenedor} changeArray={changeArray} hasWin={hasWin}
        />
    )
}
export default DragContainer