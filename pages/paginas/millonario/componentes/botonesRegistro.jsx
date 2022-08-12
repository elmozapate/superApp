import { useState } from "react"
import FormularioRegistro from "./formularioRegistro"
import LoginButton from "./loginBoton"
import LogoutButton from "./logOutBoton"
import { useAuth0 } from "@auth0/auth0-react";

const BotonesRegistro = (props) => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const { checkLogIn = console.log, nameRequire = 'vacio', sendPlayerRegister = console.log, checkNameUser = console.log, setIsRegister = console.log, onlyPublic = console.log, sendPlayer = console.log, changeMode = false } = props
    const [ip, setIp] = useState(props.ip || false)
    const [activeNow, setactive] = useState(false)
    const [willRegister, setwillRegister] = useState(false)
    const [firstChoose, setfirstChoose] = useState(false)
    const [oldUser, setoldUser] = useState(false)
    const setfirstChooses = () => {
        setfirstChoose(false);
        setactive(false)
        setwillRegister(false)
        setoldUser(false)
    }
    return (
        <>
            {!firstChoose ?
                <div className=" wdt-100 Ia-center Ij-center hgtI-100">
                    <button className='btn-azteca pointer' onClick={(e) => {
                        e.preventDefault();
                        setfirstChoose(true);
                        setactive(true)
                        setwillRegister(true)
                    }}>REGISTRARSE</button>
                    <button className='btn-azteca pointer' onClick={(e) => {
                        e.preventDefault();
                        setfirstChoose(true);
                        setactive(true)
                        setwillRegister(true)
                        setoldUser(true)
                    }}>LOGIN</button>
                    
                    <button className={changeMode ? 'hide' : 'btn-azteca pointer'} onClick={(e) => {
                        e.preventDefault();
                        setfirstChoose(true)
                    }}>INVITADO</button>
                </div> :
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
                        <FormularioRegistro setDoing={setfirstChooses} oldUser={oldUser} checkLogIn={checkLogIn} nameRequire={nameRequire} sendPlayerRegister={sendPlayerRegister} checkNameUser={checkNameUser} willRegister={willRegister} sendPlayer={sendPlayer} ip={ip} />
                    </div>
            }
        </>
    )
}
export default BotonesRegistro