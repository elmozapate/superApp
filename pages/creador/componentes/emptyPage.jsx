import { useState, useEffect } from "react"
import PaletaColores from "../tools/paletaColores"
import { setCookies, getCookie } from 'cookies-next';
import reqGetCompanies from "../../../request/reqGetCompanies"
const EmptyPage = ({ props }) => {
    const { continueEditing = console.log, setData = console.log, res = 0, newCli = false, oldCLient = console.log, nofull = {
        state: true,
        message: ''
    }, firstpage = false, colorSelect = console.log, texto = {
        name: '',
        password: '',
        passwordRepeat: '',
        color: 'negro',
        sectionNew: '',
        sectionNewDescription: '',
        logo: '',
        arraySection: [],
        comerce: false
    }, handleLogin = console.log, setready = console.log, reset = console.log,
        sended = console.log, setClient = console.log } = props
    const [starting, setStarting] = useState(true)
    const [badUser, setbadUser] = useState(false)
    const [changelogo, setChangelogo] = useState(true)
    const [newClient, setnewClient] = useState(false)
    const [changeColor, setChangeColor] = useState(true)
    const [data, setDatas] = useState({
        name: '',
        password: '',
        passwordRepeat: '',
        color: 'negro',
        logo: '',
        sectionNew: '',
        sectionNewDescription: '',
        arraySection: [],
        comerce: false

    })
    const haveCookie = getCookie('token');
    console.log(newCli, res, haveCookie);
    const getPage = async () => {
        const response = await reqGetCompanies()
        console.log(response);
        let thePage = {
            nombre: '',
            password: '',
            position: NaN
        }
        let aux = false
        if (response) {
            console.log(response);
            response.array.map((key, i) => {
                if (texto.name === key.nombre) {
                    aux = true
                    thePage = {
                        nombre: key.nombre,
                        password: key.password,
                        logo: key.logo,
                        color: key.color,
                        array: key.secciones
                    }
                }
            })
            if (thePage.password === texto.password && aux) {
                const status = response.status
                const token = {
                    nombre: thePage.nombre,
                    logo: thePage.logo,
                    color: thePage.color,
                    password: thePage.password,

                }
                setData({
                    name: thePage.nombre,
                    password: thePage.password,
                    passwordRepeat: thePage.password,
                    color: thePage.color,
                    logo: thePage.logo,
                    sectionNew: '',
                    sectionNewDescription: '',
                    arraySection: [],
                    comerce: false
                })
                console.log(response, 'datillos');
                setCookies('token', JSON.stringify({ token }), {
                    maxAge: 60 * 60 * 12,
                    sameSite: 'strict',
                    path: '/'
                    /* httpOnly: true, */
                    // secure: true
                })
                oldCLient(true)
                setClient(thePage.array)
            } else {
                oldCLient(false)
                setbadUser(true)
            }
        }
    }
    const colorSelectTwo = (value) => {
        setChangeColor(true);
        console.log(value, 'color');
           setDatas({
               ...data, color: `bgcolor-${value}`
           })
           let aux=data
           aux.color=`bgcolor-${value}`
           setData(aux)
    }
    useEffect(() => {
        if (!newCli) {
            setStarting(false)
            setnewClient(false)
        }
        if (haveCookie) {
            console.log('sicooie');
            setDatas(JSON.parse(haveCookie).token)
            setData(data)
            console.log(texto, data);
        }
    }, [])
    return (
        <>
            {
                starting ? <div className="fill">
                    <p>No tengo página</p>
                    <button onClick={(e) => { e.preventDefault(); setStarting(false) }}>Crear</button>
                    <br />
                    <br />
                    <p>Ya tengo página</p>
                    <button onClick={(e) => { e.preventDefault(); setStarting(false); setnewClient(true); }}>INGRESAR</button></div> :
                    <>
                        {newClient ?
                            <div className="fill">
                                Porfa indicanos el nombre de tu pagina
                                <br />
                                <input
                                    id='name'
                                    value={texto.name}
                                    onChange={handleLogin}></input>
                                <br />
                                {nofull.state ? <p>
                                    {nofull.message}
                                </p> : null}
                                <br />
                                Ingresa tu password
                                <br />
                                <input
                                    type='password'
                                    id='password'
                                    value={texto.password}
                                    onChange={handleLogin}></input>
                                <br />
                                {badUser ? <p>DATOS INVALIDOS</p> : <></>}
                                <button
                                    className={texto.name !== '' && texto.password !== '' ? '' : 'hide'}
                                    onClick={(e) => { e.preventDefault(); getPage() }}>Ingresar</button>
                                <br />
                                <p>No tengo página</p>
                                <button onClick={(e) => { e.preventDefault(); setStarting(false); setnewClient(false); }}>Crear</button>
                                <br />
                            </div>
                            : <div className="fill">
                                <p> Bienvenido al creador de tu pagina                </p>
                                <br />
                                Porfa indicanos el nombre de tu pagina
                                <br />
                                {
                                    res !== 2 ? <input
                                        id='name'
                                        value={texto.name}
                                        onChange={handleLogin}></input> : <p>{data.nombre}</p>
                                }

                                <br />
                                {nofull.state ? <p>
                                    {nofull.message}
                                </p> : null}
                                <br />
                                {
                                    res !== 2 ? <>
                                        Ponle seguridad , agrega un password
                                        <br />
                                        <input
                                            type='password'
                                            id='password'
                                            value={texto.password}
                                            onChange={handleLogin}></input>
                                        <br />
                                        Repita el password
                                        <br />
                                        <input
                                            type='password'
                                            id='passwordRepeat'
                                            value={texto.passwordRepeat}
                                            onChange={handleLogin}></input>
                                        <br />
                                    </>
                                        : <></>
                                }


                                {
                                    res !== 2 ?
                                        <>
                                            Si tienes logo pon aca el enlace
                                            <input
                                                id='logo'
                                                value={texto.logo}
                                                onChange={handleLogin}></input>
                                        </> :
                                        <>
                                            {changelogo ?
                                                <>
                                                    Este es tu logo actual
                                                    <img src={data.logo} height='45px' />
                                                    <br />
                                                    <button onClick={(e) => { e.preventDefault(); setChangelogo(false); }}>
                                                        Cambialo</button>
                                                </> :
                                                <>
                                                    <input
                                                        id='logo'
                                                        value={texto.logo}
                                                        onChange={handleLogin}></input>
                                                    <button onClick={(e) => { e.preventDefault(); setChangelogo(true); setDatas({ ...data, logo: texto.logo }) }}>
                                                        Listo</button>
                                                </>
                                            }

                                        </>
                                }

                                <br />
                                {
                                    res !== 2 ?
                                        <PaletaColores
                                            reset
                                            texto
                                            selectColor={colorSelect}
                                            classN="mt--50" />
                                        :
                                        <>
                                            {changeColor ?
                                                <>

                                                    <div className={`${data.color}`}>
                                                        Color actual es:
                                                        <br />
                                                        <p className={`fontcolor-white`}>{data.color.split('-')[1]}</p>
                                                    </div>
                                                    <br />
                                                    <button onClick={(e) => { e.preventDefault(); setChangeColor(false); }}>
                                                        Cambialo</button>
                                                </> : <PaletaColores
                                                    reset
                                                    texto
                                                    selectColor={colorSelectTwo}
                                                    classN="mt--50" />}
                                        </>
                                }
                                {
                                    res !== 2 ? <>
                                        <button
                                            className={firstpage ? '' : 'hide'}
                                            onClick={(e) => { e.preventDefault(); sended(texto) }}>Enviar</button>
                                        <br />
                                        <br />
                                        <p>Ya tengo página</p>
                                        <button onClick={(e) => { e.preventDefault(); setStarting(false);; setnewClient(true); }}>INGRESAR</button>
                                    </> : <>
                                        <br />
                                        <button onClick={(e) => { e.preventDefault(); continueEditing(data); }}>Listo!!!</button>
                                    </>}
                            </div>
                        }

                    </>
            }
        </>
    )
}
export default EmptyPage