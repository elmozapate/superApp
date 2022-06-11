import { useState } from "react"

const SizeEditor = ({ compomentStyle = {
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
    }, border: {
        active: false,
        size: 0,
        color: '',
        radius: {
            active: false,
            value: 0
        }
    },
}, selectSize = console.log, actSize = 100 }) => {
    const [values, setValues] = useState({
        wth: '',
        hgt: ''
    })
    const size = parseInt(((compomentStyle.size / compomentStyle.baseWidth) * 100).toFixed()) || 100;

    const [barValue, setBarValue] = useState(size)
    const valueBarArray = []
    for (let index = 0; index < 101; index++) {
        const element = {
            value: index
        }
        valueBarArray.push(element)
    }
    const [ready, setready] = useState(true)
    const setValue = (i) => {
        setBarValue(i)
        selectSize(i, 'wdt')
    }
    return (
        <div className="barValue">
            {valueBarArray.map((key, i) => {
                return <button
                    id={`percent-component-${i}`} key={`percent-component-${i}`}
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
export default SizeEditor