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
        cosa5: 0
    })
    const handleLogin = (e) => {
        e.preventDefault()
        const id = e.target.id;
        const value = e.target.value
        console.log('handle', id, value);
        setResultado({
            ...resultado,
            [id]: value
        })
    }
    const operar = (value1) => {
        const res = TestFunt(value1.cosa1, value1.cosa2)
        console.log(res);
        setResultado({
            ...resultado,
            cosa5: res
        })
    }

    return (
        <>
            <div className="IDiv-main column bgcolor-purple">

                testingPage
                <br />

                {resultado.cosa1}
                <br />
                {resultado.cosa2}

                <br />
                <input id="cosa1" value={resultado.cosa1} onChange={handleLogin} type={'number'} />
                <br />
                <input id="cosa2" value={resultado.cosa2} onChange={handleLogin} type={'number'} />
                <br />
                {resultado.cosa5}

                <br />

                <button
                    onClick={(e) => { e.preventDefault(); operar(resultado) }}
                >
                    OPERACION
                </button>

                {/*                 <IComponent contains={objContent} />
 */}
            </div>
        </>
    )
}
export default Test