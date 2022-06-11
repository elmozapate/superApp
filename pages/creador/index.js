import Head from 'next/head'
import { setCookies, removeCookies } from 'cookies-next';
import RequestCreateOne from '../../request/requestCreateOne';
import { useState, useEffect } from 'react'
import Checkbox from '../../components/commons/checkbox';
import CrearProductos from '../../components/containers/creadorProductos';
import EmptyPage from './componentes/emptyPage';
import PagePreview from './componentes/pagePreviewPage';
import { HistorialArray } from '../../components/iComponents/ObjDfeault';
import PutHistorial from '../../request/reqPutHistorial';
import GetHistorial from '../../request/reqGetHistorial';
let msjNumber = 0
let ex = 2
let space = 1
let whileArray = []
let sectionArrayAux = [{
    name: '',
    valueIn: 'creador',
    description: ''
}]
const Creator = () => {
    const [newPage, setnewPage] = useState(false)
    const [change, setChange] = useState(false)
    const [newClient, setnewClient] = useState(true)
    const [sectionEditing, setsectionEditing] = useState([{
        'components': 0,
        'name': '',
        'description': '',
        'sales': false,
        'content': false,
        'objContent': []
    }])

    const [positionActual, setPositionActual] = useState(-1)
    const [arrayInWait, setArrayInWait] = useState([])
    const [text, setText] = useState('Bienvenidos')
    const [newItem, setnewItem] = useState(false)
    const [ready, setready] = useState(false)
    const [newItemComerce, setnewItemComerce] = useState(false)
    const [newItemComerceReady, setnewItemComerceReady] = useState(false)
    const [action, setaction] = useState(false)
    const [historialArray, setHistorialArray] = useState({
        positiionIn: 1,
        maxChanges: 0,
        array: [{
            'components': 0,
            'name': '',
            'description': '',
            'sales': false,
            'content': false,
            'objContent': []
        }]
    })
    const [update, setupdate] = useState(false)

    const [historialValue, sethistorialValue] = useState({
        value: 0,
        action: false
    })
    const historialPrint = async (value) => {
        const res = await GetHistorial()
        if (res) {
            console.log('res', res);
            console.log(historialArray, 'borra', res.array[res.array.length - ex]);
            sethistorialValue({
                value: value,
                action: !historialValue.action
            })

            setPositionActual(-1)
            setPositionActual(whileArray)

            if (value === '-') {
                console.log('-');
                setsectionEditing(res.array[res.array.length - ex])
                setaction(!action)
                ex = ex + 1
                setHistorialArray({
                    ...historialArray,
                    positiionIn: historialArray.positiionIn - 1
                })
            }

            if (value === '+') {
                ex = ex - 1
                setsectionEditing(res.array[res.array.length - (ex - 1)])
                setaction(!action)
                setHistorialArray({
                    ...historialArray,
                    positiionIn: historialArray.positiionIn + 1
                })
                console.log('+');
            }
            console.log(whileArray);
        }

    }

    const [texto, setTexto] = useState({
        name: '',
        password: '',
        passwordRepeat: '',
        color: '',
        logo: '',
        sectionNew: '',
        sectionNewDescription: '',
        arraySection: [],
        comerce: false

    })
    const [firstpage, setFirstpage] = useState(false)
    const [nofull, setNofull] = useState({
        state: false,
        message: 'ss'
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
        setaction(!action)
    }
    const colorSelect = (data) => {
        setTexto({
            ...texto, color: `bgcolor-${data}`
        })
    }
    const [requesti, setRequesting] = useState(false)
    const [requestingType, setRequestingType] = useState(false)
    const sended = (value) => {
        setnewPage(true)
    }
    const nextProduct = () => {
        setready(false)
    }
    const sended2 = async () => {
        setArrayInWait(sectionEditing)
        setRequesting(false)
        setText(texto.name + ' ' + texto.color)

        const respond = await RequestCreateOne(texto, sectionEditing)
        if (respond) {

            respond.status === '201' ? setText('dio bien') : respond.status === '401'
                ? setText('Ya existe') : setText('algo no dio')
        }
    }

    const reboot = () => {
        setRequesting(false)
        setRequestingType(false)
        msjNumber = 1
        setTexto({
            name: '',
            color: 'negro',
            sectionNew: '',
            sectionNewDescription: '',
            logo: '',
            arraySection: [],
            comerce: false
        })
        next()
        setArrayInWait([])
        setnewItem(false)
        setready(false)
        setnewItemComerce(false)
        setnewItemComerceReady(false)

    }
    const newSection = () => {
        setnewItem(true)
    }
    const sendSection = (array = []) => {
        let newSection = {
            name: texto.sectionNew,
            valueIn: 'ocupado',
            description: texto.sectionNewDescription,
            products: array,
            sales: array.length > 0 ? true : false
        }
        let vector = arrayInWait
        vector.push(newSection)
        when = true
        setArrayInWait(vector)
        setnewItem(false)
        setTexto({
            ...texto,
            sectionNew: '',
            sectionNewDescription: ''
        })
    }
    const reset = () => {
        setTexto({
            ...texto,
            ready: false,
        })
    }
    const sended3 = () => {
        setnewItemComerce(true)
    }
    const sendProducts = (array) => {
        setnewItemComerce(false)
        setnewItemComerceReady(false)
        setready(true)
        setnewItem(false)
        setTimeout(nextProduct, 3400)
        sendSection(array)
    }
    /*   useEffect(() => {
          if (when) {
              setArrayInWait(sectionArrayAux)
              when = false
          }
      }, [when]) */
    const addPage = (name, description) => {
        const newSection = {
            'components': 0,
            'name': name,
            'description': 'description',
            'sales': false,
            'content': false,
            'objContent': {}
        }
        let sections = []
        if (sectionEditing[0].name === '') {
            sections.push(newSection)
        } else {
            sections = sectionEditing
            sections.push(newSection)
        }
        setChange(!change)
        setsectionEditing(sections)
    }
    const goSection = (i) => {
        setPositionActual(i)
    }
    const setData = (data) => {
        setTexto(data)
    }
    const sendingSection = async (array, i) => {
        console.log('salvolahp');

        let a = []
        let b = []
        let elements = array.components
        let newElements = 0
        let sections = sectionEditing
        sections[i].content = true


        if (sections[i].objContent.length > 0) {
            let vect = []
            a = array.array
            a.map((key, i) => {
                const values = {
                    editingValues: {
                        color: 'transparent',
                        size: 100,
                        baseWidth: 100,
                        position: elements + 1 + i,
                        active: false,
                        text: '',
                        fontSize: 16,
                        align: {
                            direction: false,
                            justify: false,
                            align: false,
                            gap: false
                        },
                        border: {
                            active: false,
                            size: 0,
                            color: '',
                            radius: {
                                active: false,
                                value: 0
                            }
                        },
                        paddings: {
                            top: false,
                            bottom: false,
                            left: false,
                            rigth: false,
                        }
                    },
                    fontSize: 16,
                    align: {
                        direction: false,
                        justify: false,
                        align: false,
                        gap: false
                    },
                    border: {
                        active: false,
                        size: 0,
                        color: '',
                        radius: {
                            active: false,
                            value: 0
                        }
                    },
                    paddings: {
                        top: false,
                        bottom: false,
                        left: false,
                        rigth: false,
                    },

                    newSection: false,
                    aditionalCss: 'Ij-space-around',
                    basePosition: 0,
                    bgColor: "transparent",
                    children: key,
                    childrenContain: true,
                    color: "white",
                    column: false,
                    especificWidth: '100',
                    fatherId: 0,
                    position: elements + 1 + i,
                    stage: 0,
                    text: "",
                    type: "contenedor",
                    width: "",
                    zIndex: false,
                    zIndexValue: 0,

                }
                newElements++
                vect.push(values)
            })
            sections[i].components = elements + newElements
            sections[i].objContent = vect
            let news = sectionEditing
            news[i].components = elements + newElements
            news[i].objContent = vect
            news[i].content = true
            let olds = historialArray
            olds.positiionIn = historialArray.positiionIn + 1
            olds.maxChanges = historialArray.maxChanges + 1
            let oldArray = olds.array
            oldArray.push(news)
            olds.array = oldArray
            whileArray = i
            setsectionEditing(sections)
            if (historialArray.positiionIn - 1 !== historialArray.maxChanges) {
                ex = 2
                olds.positiionIn = olds.maxChanges + 1
                setupdate(!update)
                console.log('noultimo');

            } else {
                console.log('ultimo');
            }
            setHistorialArray(olds)
            const res = await PutHistorial(sections)
            if (res) {
                console.log('si')
            }
            console.log(whileArray, 'salva1', sections, news);
        } else {
            a = array.array
            let vect = []
            a.map((key) => {
                const values = {
                    editingValues: {
                        color: 'transparent',
                        size: 100,
                        baseWidth: 100,
                        position: elements + 1 + i,
                        active: false,
                        text: '',
                        fontSize: 16,
                        align: {
                            direction: false,
                            justify: false,
                            align: false,
                            gap: false
                        },
                        border: {
                            active: false,
                            size: 0,
                            color: '',
                            radius: {
                                active: false,
                                value: 0
                            }
                        },
                        paddings: {
                            top: false,
                            bottom: false,
                            left: false,
                            rigth: false,
                        }
                    },
                    fontSize: 16,
                    align: {
                        direction: false,
                        justify: false,
                        align: false,
                        gap: false
                    },
                    paddings: {
                        top: false,
                        bottom: false,
                        left: false,
                        rigth: false,
                    },
                    border: {
                        active: false,
                        size: 0,
                        color: '',
                        radius: {
                            active: false,
                            value: 0
                        }
                    },
                    newSection: false,
                    aditionalCss: 'Ij-space-around',
                    basePosition: 0,
                    bgColor: "transparent",
                    children: key,
                    childrenContain: true,
                    color: "white",
                    column: false,
                    especificWidth: '100',
                    fatherId: 0,
                    position: elements + 1 + i,
                    stage: 0,
                    text: "",
                    type: "contenedor",
                    width: "",
                    zIndex: false,
                    zIndexValue: 0,
                }
                newElements++
                vect.push(values)
            })
            sections[i].components = elements + newElements
            sections[i].objContent = vect
            let news = sectionEditing
            news[i].components = elements + newElements
            news[i].objContent = vect
            news[i].content = true
            let olds = historialArray
            olds.positiionIn = historialArray.positiionIn + 1
            olds.maxChanges = historialArray.maxChanges + 1
            let oldArray = olds.array
            oldArray.push(news)
            olds.array = oldArray
            whileArray = i
            if (historialArray.positiionIn - 1 !== historialArray.maxChanges) {
                ex = 2
                setupdate(!update)
                olds.positiionIn = olds.maxChanges + 1
                console.log('noultimo');
            } else {
                console.log('ultimo');
            }
            setHistorialArray(olds)
            setsectionEditing(sections)
            const res = await PutHistorial(sections)
            if (res) {
                console.log('si')
            }

            console.log(whileArray, 'salva2', sections, news);
        }

    }
    const restartPage = () => {
        setnewPage(false)
    }
    const setClient = (array) => {
        setsectionEditing(array)
        setnewPage(true)
    }
    const oldCLient = (array) => {
        setnewClient(false)
    }
    const continueEditing = (data) => {
        setTexto({
            ...texto,
            name: data.nombre,
            password: data.password,
            passwordRepeat: data.password,
            color: data.color,
            logo: data.logo,
        })
        const token = {
            nombre: data.nombre,
            logo: data.logo,
            color: data.color,
            password: data.password,

        }
        removeCookies('token');
        setCookies('token', JSON.stringify({ token }), {
            maxAge: 60 * 60 * 12,
            sameSite: 'strict',
            path: '/'
            /* httpOnly: true, */
            // secure: true
        })
        setnewPage(true)
        console.log('cambiotexto');
        console.log(data, texto, 'esto');
    }
    useEffect(() => {
        setsectionEditing(sectionEditing)
    }, [change])
    useEffect(() => {
        setNofull({
            state: false,
            message: 'Correcto'
        })
        if (texto.password.length >= 6 && texto.password === texto.passwordRepeat && texto.password !== '') {
            setFirstpage(true)
            setNofull({
                state: true,
                message: 'Correcto'
            })
        }
        if (texto.password.length < 6 && texto.password === texto.passwordRepeat && texto.password !== '') {
            setFirstpage(false)
            setNofull({
                state: true,
                message: 'Minimo 6 caracteres'
            })
        }
        if (texto.password.length >= 6 && texto.passwordRepeat.length >= 6 && texto.password !== texto.passwordRepeat && texto.password !== '') {
            setFirstpage(false)
            setNofull({
                state: true,
                message: 'NO son iguales'
            })
        }
    }, [texto, action])
    return (
        <>
            <Head>
                <title>creador</title>
                <meta name="description" content="FullStack app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                {
                    !newPage ?
                        newClient ? <EmptyPage props={{
                            colorSelect: colorSelect,
                            handleLogin,
                            sended,
                            texto,
                            reset,
                            setData,
                            nofull: nofull,
                            firstpage: firstpage,
                            setClient,
                            oldCLient,
                            newCli: newClient,
                            res: 1

                        }}
                        /> : <EmptyPage props={{
                            colorSelect: colorSelect,
                            handleLogin,
                            sended,
                            texto,
                            reset,
                            nofull: nofull,
                            firstpage: firstpage,
                            setClient,
                            oldCLient,
                            newCli: newClient,
                            res: 2,
                            continueEditing
                        }}
                        /> : <PagePreview
                            update={update}
                            action={action}
                            historialPrint={historialPrint}
                            historialArray={historialArray}
                            historialValue={historialValue}
                            pageValues={texto}
                            restartPage={restartPage}
                            sectionEditing={sectionEditing}
                            position={positionActual}
                            newPage={addPage}
                            change
                            goSection={goSection}
                            sendSection={sendingSection}
                            sendedPage={sended2}
                        />}

            </body>


        </>

    )
}
export default Creator