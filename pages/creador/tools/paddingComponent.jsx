import { useEffect, useState } from "react"

const PaddingComponent = ({ compomentStyle = {
    color: 'white',
    size: '100',
    position: 0,
    active: false,
    text: '',
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
    border:{
        active:false,
        size:0,
        color:'',
        radius:{
            active:false,
            value:0
        }
    },
}, sectionin = {
    position: 0,
    state: false,
    value: {},
    stage: 0,
    editSectionNumber: 0,
    i: 0,
    array: []
}, selectSize = console.log, setPaddings = console.log }) => {
    const [values, setValues] = useState(compomentStyle.paddings)
    const [paddingType, setpaddingType] = useState(false)
    const [paddingAdd, setpaddingAdd] = useState(false)
    const valueBarArray = []
    for (let index = 5; index < 81; index++) {
        const element = {
            value: index
        }
        valueBarArray.push(element)
    }
    const [ready, setready] = useState(true)
    const setValue = (i) => {
        setpaddingType(i)
        setpaddingAdd(true)
    }
    const setValuePlus = () => {
        setValues({
            ...values,
            [paddingType]: !values[paddingType] ? 1 : values[paddingType] + 1
        })
        selectSize(values, 'paddings')
    }
    const setValueMinus = () => {
        setValues({
            ...values,
            [paddingType]: values[paddingType] - 1
        })
        selectSize(values, 'paddings')
    }
    const handelInput = (e) => {
        e.preventDefault()
        let aux = values
        const value = parseInt(e.target.value)
        const type = e.target.id
        const val = document.getElementById(type).value
        setValues({
            ...values,
            [type]: value
        })
        aux[type] = value
        selectSize(aux, 'paddings')
    }
    /*     useEffect(() => {
            setValues(compomentStyle.compomentStyle.paddings)
        }, []) */
    useEffect(() => {
        setValues(compomentStyle.paddings)
    }, [compomentStyle.position])
    return (
        <div className="paddingComponent">
            {
                paddingType === 'top' ? <div className="align-center"><button
                    className={paddingAdd && values[paddingType] > 0 && paddingType ? 'paddingComponent-value mrl-50' : 'hide'}
                    onClick={(e) => { e.preventDefault(); setValueMinus() }}
                >
                    -
                </button><input
                        type="number"
                        id="top"
                        onChange={handelInput}
                        className={paddingType === 'top' || paddingType === 'y' ? 'paddingComponent-Y' : 'paddingComponent-Y-inactive'}
                        value={values.top ? values.top : 0} /><button
                            className={paddingAdd && paddingType ? 'paddingComponent-value mrr-50' : 'hide'}
                            onClick={(e) => { e.preventDefault(); setValuePlus() }}
                        >
                        +
                    </button></div> :
                    <button
                        className={paddingType === 'top' || paddingType === 'y' ? 'paddingComponent-Y' : 'paddingComponent-Y-inactive'}
                        onClick={(e) => { e.preventDefault(); setValue('top') }}
                    >
                        {values.top ? values.top : 0}
                    </button>
            }
            {
                paddingType === 'left' ? <div className="align-center"><button
                    className={paddingAdd && values[paddingType] > 0 && paddingType ? 'paddingComponent-value' : 'hide'}
                    onClick={(e) => { e.preventDefault(); setValueMinus() }}
                >
                    -
                </button><input
                        type="number"
                        id="left"
                        onChange={handelInput}
                        className={paddingType === 'left' || paddingType === 'x' ? 'paddingComponent-X' : 'paddingComponent-X-inactive'}
                        value={values.left ? values.left : 0} /><button
                            className={paddingAdd && paddingType ? 'paddingComponent-value' : 'hide'}
                            onClick={(e) => { e.preventDefault(); setValuePlus() }}
                        >
                        +
                    </button></div> :
                    <button
                        className={paddingType === 'left' || paddingType === 'x' ? 'paddingComponent-X' : 'paddingComponent-X-inactive'}
                        onClick={(e) => { e.preventDefault(); setValue('left') }}
                    >
                        {values.left ? values.left : 0}
                    </button>}
            {
                paddingType === 'rigth' ? <div className="align-center"><button
                    className={paddingAdd && values[paddingType] > 0 && paddingType ? 'paddingComponent-value' : 'hide'}
                    onClick={(e) => { e.preventDefault(); setValueMinus() }}
                >
                    -
                </button><input
                        type="number"
                        id="rigth"
                        onChange={handelInput}
                        className={paddingType === 'rigth' || paddingType === 'x' ? 'paddingComponent-X' : 'paddingComponent-X-inactive'}
                        value={values.rigth ? values.rigth : 0} /><button
                            className={paddingAdd && paddingType ? 'paddingComponent-value' : 'hide'}
                            onClick={(e) => { e.preventDefault(); setValuePlus() }}
                        >
                        +
                    </button></div> :
                    <button
                        className={paddingType === 'rigth' || paddingType === 'x' ? 'paddingComponent-X' : 'paddingComponent-X-inactive'}
                        onClick={(e) => { e.preventDefault(); setValue('rigth') }}
                    >
                        {values.rigth ? values.rigth : 0}
                    </button>
            }
            {
                paddingType === 'bottom' ? <div className="align-center"><button
                    className={paddingAdd && values[paddingType] > 0 && paddingType ? 'paddingComponent-value mrl-50' : 'hide'}
                    onClick={(e) => { e.preventDefault(); setValueMinus() }}
                >
                    -
                </button><input
                        type="number"
                        id="bottom"
                        onChange={handelInput}
                        className={paddingType === 'bottom' || paddingType === 'y' ? 'paddingComponent-Y' : 'paddingComponent-Y-inactive'}
                        value={values.bottom ? values.bottom : 0} /><button
                            className={paddingAdd && paddingType ? 'paddingComponent-value mrr-50' : 'hide'}
                            onClick={(e) => { e.preventDefault(); setValuePlus() }}
                        >
                        +
                    </button></div> : <button
                        className={paddingType === 'bottom' || paddingType === 'y' ? 'paddingComponent-Y' : 'paddingComponent-Y-inactive'}
                        onClick={(e) => { e.preventDefault(); setValue('bottom') }}
                    >
                    {values.bottom ? values.bottom : 0}
                </button>}
            <br />
            <br />

            <button
                onClick={(e) => { e.preventDefault(); setPaddings(values, 'style') }}
            >
                ver cambios
            </button>
        </div>
    )
}
export default PaddingComponent