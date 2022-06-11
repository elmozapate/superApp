import { useState } from 'react'

const CrearProductos = ({ funtions = console.log }) => {
    const [arrayInWait, setArrayInWait] = useState([])
    const [newItem, setnewItem] = useState(false)  
    const [texto, setTexto] = useState({
        productPhoto: '',
        productDescription: '',
        productName: '',

    })
    const handleLogin = (e) => {
        e.preventDefault()
        if (e.target.id === 'comerce') {
            const id = e.target.id; const value = e.target.checked
            setTexto({ ...texto, [id]: value })
        } else {
            const id = e.target.id; const value = e.target.value
            setTexto({ ...texto, [id]: value })
        }

    }
    const newSection = () => {
        setnewItem(true)
    }
    const sendSection = () => {
        let newSection = {
            photo: texto.productPhoto,
            name: texto.productName,
            valueIn: 'ocupado',
            description: texto.productDescription,
        }
        let vector = arrayInWait
        vector.push(newSection)
        setArrayInWait(vector)
        setnewItem(false)
        setTexto({
            ...texto,
            productPhoto: '',
            productDescription: '',
            productName: ''
        })


    }
    const seeSection = () => {
        console.log(arrayInWait, 'estolleva');
    }
    return (
        <div className='absolutedialog'>
            <div className='absolutedialog_popout'>
                {!newItem ?
                    <button
                        onClick={(e) => { e.preventDefault(); newSection() }}
                    >Agregar Nueva porducto</button> : null}
                {
                    arrayInWait.map((key, i) => {
                        return (
                            <>
                                {key.valueIn === 'ocupado' ? <li id={`product-add-${i}`} key={`product-add-${i}`}>{key.name}</li> : null}

                            </>
                        )
                    })
                }
                {newItem ? <>
                    <input
                        placeholder='Nombre de la seccion'
                        id='productName'
                        value={texto.productName}
                        onChange={handleLogin}></input>
                    <input
                        placeholder='Foto'
                        id='productPhoto'
                        value={texto.productPhoto}
                        onChange={handleLogin}></input>
                    <textarea
                        id='productDescription'
                        value={texto.productDescription}
                        rows='8'
                        onChange={handleLogin}
                        placeholder='agrege una descripcion'></textarea>
                    <button
                        onClick={(e) => { e.preventDefault(); sendSection() }}
                    >

                        Guardar
                    </button>
                </> : null}
                <button
                    onClick={(e) => { e.preventDefault(); funtions(arrayInWait) }}
                >

                    Enviar
                </button>
            </div>

        </div>

    )
}
export default CrearProductos