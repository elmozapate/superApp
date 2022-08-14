import { useEffect, useState } from "react";
import IComponent from "../components/iComponents/icomponent";
import { TestFunt } from "./testingFuntion";

const objContent = [{
    type: 'contenedor',
    column: false,
    bgColor: 'white',
    especificWidth: true,
    width: '100',
    color: 'white',
    text: '',
    children: {
        contain: false,
        array: [{
            type: 'contenedor',
            column: false,
            bgColor: 'blue',
            especificWidth: false,
            width: '25',
            color: 'white',
            text: '',
            children: {
                contain: true,
                array: [{
                    type: 'title',
                    column: false,
                    bgColor: 'blue',
                    especificWidth: false,
                    width: '25',
                    color: 'yellow',
                    text: 'foto1',
                    children: {
                        contain: false,
                        array: []
                    }
                }]
            }
        }, {
            type: 'contenedor',
            column: false,
            bgColor: 'red',
            especificWidth: true,
            width: '25',
            color: 'white',
            text: '',
            children: {
                contain: true,
                array: [{
                    type: 'title',
                    column: false,
                    bgColor: 'red',
                    especificWidth: false,
                    width: '25',
                    color: 'black',
                    text: 'foto 2',
                    children: {
                        contain: false,
                        array: []
                    }
                }]
            }
        }, {
            type: 'contenedor',
            column: false,
            bgColor: 'black',
            especificWidth: true,
            width: '40',
            color: 'white',
            text: '',
            children: {
                contain: true,
                array: [{
                    type: 'title',
                    column: false,
                    bgColor: 'red',
                    especificWidth: false,
                    width: '25',
                    color: 'white',
                    text: 'foto 3',
                    children: {
                        contain: false,
                        array: []
                    }
                }]
            }
        }]
    }
}]

const Test = () => {
    const [resultado, setResultado] = useState({
        cosa1: 0,
        cosa2: 0,
        cosa3: '+',
        cosa5: 0,

    })
    let objD = {
        a: 'a', b: 'b', c: 'c', d: 'd'
    }
    let objD2 = {
        a: 'a', b: 'b', c: 'c', d: 'd'
    }
    let { cosa1 = 0,
        cosa2 = 0,
        cosa5 = 0 } = resultado

    const handleLogin = (e) => {
        e.preventDefault()
        const id = e.target.id;
        const value = e.target.value
        console.log('handle', id, value);
        setResultado({
            ...resultado,
            [id]: parseFloat(value)
        })
        const autoOperate = {
            ...resultado,
            [id]: parseFloat(value)
        }
        operar(autoOperate)
    }

    const operar = (value, callBack = (values) => {
        console.log(values || value, 'callBack');
    }) => {
        callBack()
        callBack(TestFunt(value))
        setResultado({
            ...value,
            ...TestFunt(value)
        })
    }
    useEffect(() => {
        const devolver = () => {
            return {
                a: 'a1', b: 'b2', c: 'c3'
            }
        }
        const ress = devolver()
        objD = {
            ...objD,
            ...ress
        }
        console.log(objD, 'objD2', ress);
    }, [])

    return (
        <>
            <div className="IDiv-main column bgcolor-purple">

                AutoCalculadora
                <br />

                <input id="cosa1" value={resultado.cosa1} onChange={handleLogin} type={'number'} />
                <br />
                <input id="cosa2" value={resultado.cosa2} onChange={handleLogin} type={'number'} />
                <br />
                <h3>{`${resultado.cosa1} ${resultado.cosa3} ${resultado.cosa2}`} </h3>


                <br />
                <h1> {resultado.cosa5 === 'NaN'  ? '∞' : resultado.cosa5}
                </h1>

                <br />

                <button
                    className={resultado.cosa3 === "+" ? 'bgcolor-green' : 'bgcolor-red'}
                    onClick={(e) => {
                        e.preventDefault(); setResultado(() => {
                            return { ...resultado, ...operar({ ...resultado, cosa3: '+' }), cosa3: '+' }
                        })
                    }}
                >
                    SUMA
                </button>
                <br />
                <button
                    className={resultado.cosa3 === "-" ? 'bgcolor-green' : 'bgcolor-red'}
                    onClick={(e) => {
                        e.preventDefault(); setResultado(() => {
                            return { ...resultado, ...operar({ ...resultado, cosa3: '-' }), cosa3: '-' }
                        })
                    }}
                >
                    RESTA
                </button>
                <br />
                <button
                    className={resultado.cosa3 === "*" ? 'bgcolor-green' : 'bgcolor-red'}
                    onClick={(e) => {
                        e.preventDefault(); setResultado(() => {
                            return { ...resultado, ...operar({ ...resultado, cosa3: '*' }), cosa3: '*' }
                        })
                    }}
                >
                    MULTIPLICACION
                </button>
                <br />
                <button
                    className={resultado.cosa3 === "/" ? 'bgcolor-green' : 'bgcolor-red'}
                    onClick={(e) => {
                        e.preventDefault(); setResultado(() => {
                            return { ...resultado, ...operar({ ...resultado, cosa3: '/' }), cosa3: '/' }
                        })
                    }}
                >
                    DIVISION
                </button>
                <br />

                {/*                 <IComponent contains={objContent} />
 */}
            </div>
        </>
    )
}
export default Test