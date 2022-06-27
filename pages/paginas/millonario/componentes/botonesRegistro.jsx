import { useState } from "react"
import FormularioRegistro from "./formularioRegistro"

const BotonesRegistro = (props) => {
    const { onlyPublic = console.log, sendPlayer = console.log, changeMode = false  } = props
    const [ip, setIp] = useState(props.ip || false)
    const [activeNow, setactive] = useState(false)

    return (
        <>
            {
                !activeNow ?
                    <div className=" wdt-100 Ia-center Ij-center hgtI-100">
                        <button className='btn-azteca pointer' onClick={(e) => {
                            e.preventDefault();
                                setactive(true)
                        }}>REGISTRARSE</button>
                        <button className={changeMode ? 'hide' : 'btn-azteca pointer'} onClick={(e) => {
                            e.preventDefault();
                                onlyPublic()
                        }}>SOLO SER PUBLICO</button>
                    </div>
                    :
                    <div>
                        <FormularioRegistro sendPlayer={sendPlayer} ip={ip} />
                    </div>
            }
        </>
    )
}
export default BotonesRegistro