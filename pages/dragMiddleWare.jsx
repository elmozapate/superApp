import { useEffect, useState } from "react"
import DragContainer from "./dragContainer"

const DragMiddleWare = (props) => {
    const { contenedorArrayDone = { array: [] }, setContainers = console.log, changeArray = console.log, hasWin = false } = props
    const [contenedorArrayDoneFor, setcontenedorArrayDone] = useState({
        array: contenedorArrayDone.array
    })
    useEffect(() => {
        console.log('cambioacasiiiiiiiiiiiii2', contenedorArrayDone);

        if (contenedorArrayDone.array.length > 0) {
            console.log('cambioacasiiiiiiiiiiiii2', contenedorArrayDone);
            setcontenedorArrayDone({
                ...contenedorArrayDoneFor,
                array: contenedorArrayDone.array
            })
        }


    }, [contenedorArrayDone.array])

    return (
        <div className="drag-boxes">
            {
                contenedorArrayDone.array.map((key, i) => {
                    return <DragContainer
                        hasWin={hasWin}
                        array={key}
                        setContainers={setContainers}
                        changeArray={changeArray}
                        contenedor={{ id: i }}

                    />
                })
            }


        </div>
    )
}
export default DragMiddleWare