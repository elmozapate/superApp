import { useState } from "react"

const FontSize = ({ actSize = 16, selectSize = console.log, compomentStyle = {
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
    border: {
        active: false,
        size: 0,
        color: '',
        radius: {
            active: false,
            value: 0
        }
    },
} }) => {
    const [values, setValues] = useState({
        wth: '',
        hgt: ''
    })
    const [barValue, setBarValue] = useState(compomentStyle.fontSize)
    const valueBarArray = []
    for (let index = 5; index < 81; index++) {
        const element = {
            value: index
        }
        valueBarArray.push(element)
    }
    const [ready, setready] = useState(true)
    const setValue = (i) => {
        setBarValue(i)
        selectSize(i, 'fontsize')
    }
    return (
        <div className="barValue">
            Tamaño de fuente
            {valueBarArray.map((key, i) => {
                return <button
                id={`fontSize-component-${i}`} key={`fontSize-component-${i}`}
                className={barValue === key.value ? 'value-active' : 'value-inactive'}
                    onClick={(e) => { e.preventDefault(); setValue(key.value) }}
                >
                    .
                </button>
            })}
            {
                barValue
            }
        </div>
    )
}
export default FontSize