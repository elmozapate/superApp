import { useEffect, useState } from "react"
let contain = [[], []]
let whenDo = false
const DragItem = (props) => {
    const { contenedorArrayDones = { array: [] }, contenedor = { id: -1 }, changeArray = console.log, hasWin = false } = props
    const [contenedorArrayDone, setContenedorArrayDone] = useState({
        array: contenedorArrayDones.array
    })
    const actualize = () => {
        if (contenedorArrayDone.array.length > 0) {
            console.log(contenedorArrayDone.array, 'sdsds');

            contenedorArrayDone.array.map((key, i) => {
                contain[contenedor.id][i] = document.getElementById(`${key.id}-contenedor-${i}`)
                contain[contenedor.id][i].addEventListener('dragenter', e => {
                    /* console.log('dragenter', e); */
                })
                contain[contenedor.id][i].addEventListener('dragstart', e => {
                    e.dataTransfer.setData('value', JSON.stringify({ id: e.target.id, src: e.target.src }))
                    /* console.log('dragstart', e); */
                })
                contain[contenedor.id][i].addEventListener('dragleave', e => {
                    e.target.classList.remove(`bgcolorInedit-green`)

                    e.target.classList.remove(`bgcolorInedit-red`)
                    /* console.log('dragleave', e); */
                })
                contain[contenedor.id][i].addEventListener('dragover', e => {
                    if (contain[contenedor.id][i].children.length === 0) {
                        e.target.classList.add(`bgcolorInedit-green`)
                    } else {
                        e.target.classList.add(`bgcolorInedit-red`)

                    }

                    e.preventDefault()
                    /* console.log('dragover', e); */
                })
                contain[contenedor.id][i].addEventListener('drop', e => {
                    e.preventDefault()
                    e.target.classList.remove(`bgcolorInedit-green`)
                    e.target.classList.remove(`bgcolorInedit-red`)
                    const datas = e.dataTransfer.getData('value')
                    if (datas) {
                        const theData = JSON.parse(datas)
                        console.log('drop ', theData, ' contenedor ', e.target.id);
                        if (contain[contenedor.id][i].children.length === 0) {
                            changeArray({ 'drop': theData, 'contenedor': e.target.id })
                        }
                    } else {
                        console.log('no del juego', e);
                    }

                })
            })
        }
    }
    const killListener = () => {
        for (let i = 0; i < 9; i++) {
            contain[0][i].removeEventListener('dragenter', null)
            contain[0][i].removeEventListener('dragstart', null)
            contain[0][i].removeEventListener('dragleave', null)
            contain[0][i].removeEventListener('dragover', null)
            contain[0][i].removeEventListener('drop', null)
            contain[1][i].removeEventListener('dragenter', null)
            contain[1][i].removeEventListener('dragstart', null)
            contain[1][i].removeEventListener('dragleave', null)
            contain[1][i].removeEventListener('dragover', null)
            contain[1][i].removeEventListener('drop', null)
        }

    }
    useEffect(() => {
        if (whenDo) {
            console.log(contenedorArrayDones.array, 'contenedorArrayDones');

            setContenedorArrayDone({
                ...contenedorArrayDone,
                array: contenedorArrayDones.array
            })
            whenDo = false
        }
    }, [contenedorArrayDones])
    useEffect(() => {
        console.log(hasWin,'haswin');
        if (hasWin && hasWin !== 'true') {
            killListener()

            whenDo = true
        }
        if (whenDo) {
            console.log(contenedorArrayDones.array, 'contenedorArrayDones');
            setContenedorArrayDone({
                ...contenedorArrayDone,
                array: contenedorArrayDones.array
            })
            actualize()
            whenDo = false
        }
    }, [hasWin])
    useEffect(() => {
        actualize()
    }, [])
    return (
        <div className={hasWin === 'true' ? contenedor.id === 1 ? 'hide' : 'drag-box-winned' : "drag-box"} id={`${contenedor.id}-box`}>
            {
                contenedorArrayDone.array.map((key, i) => {
                    return <div key={`${key.id}-contenedor-${i}`} id={`${key.id}-contenedor-${i}`} >
                        <>
                            {key.object === 'empty' ? "" :
                                <img draggable={hasWin === 'true' ? 'false' : 'true'} src={key.object} id={`${key.id}-objeto-${i}`} key={`${key.id}-objeto-${i}`} />
                            }
                        </>
                    </div>
                })
            }
        </div>
    )
}
export default DragItem