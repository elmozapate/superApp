import { useState } from "react"

const SectionAdd = ( {newPage = console.log }) => {
    const [name, setname] = useState('')
    const [ready, setready] = useState(true)
    const handleLogin = (e) => {
        e.preventDefault()
        const value = e.target.value
        setname(value)
    }
    return (
        <>
            <h1>SUBPAGINAS</h1>
            {ready ? <button
                onClick={(e) => { e.preventDefault(); setready(false) }}
            >
                Agregar nueva
            </button> :
                <>
                    <input
                        onChange={handleLogin}
                        value={name}
                        type="text" placeholder="Nombre de la Subpágina" />
                <button
                onClick={(e) => { e.preventDefault(); newPage(name) }}
            >
                Agregar 
            </button>
                </>
            }
        </>
    )
}
export default SectionAdd