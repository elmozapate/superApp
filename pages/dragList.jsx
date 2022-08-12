import { useEffect, useState } from "react"
import DragContainer from "./dragContainer"

const Draglist = (props) => {
    const { contenedorArrayDone = { array: [] }, setContainers = console.log, changeArray = console.log, hasWin = false } = props
    const [contenedorArrayDoneFor, setcontenedorArrayDone] = useState({
        array: contenedorArrayDone.array
    })
    useEffect(() => {
        console.log('cambioacasiiiiiiiiiiiii', contenedorArrayDone);
        setcontenedorArrayDone({
            ...contenedorArrayDoneFor,
            array: contenedorArrayDone.array
        })

    }, [contenedorArrayDone])

    return (
        <div className="drag-boxes">
            {
                contenedorArrayDoneFor.array.map((key, i) => {
                    return <div key={`tabla-${i}`}>
                        <DragContainer
                            hasWin={hasWin}
                            array={contenedorArrayDoneFor}
                            setContainers={setContainers}
                            changeArray={changeArray}
                            contenedor={{ id: i }}
                            extra={key}

                        />
                    </div>
                })
            }


        </div>
    )
}
export default Draglist