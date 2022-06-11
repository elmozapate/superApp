import { useEffect, useState } from "react"
const Align = ({ compomentStyle={
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
},setStyle = console.log, sectionin = {
    position: 0,
    state: false,
    value: {},
    stage: 0,
    editSectionNumber: 0,
    i: 0,
    array: []
}, texto = {
    name: '',
    color: 'negro',
    sectionNew: '',
    sectionNewDescription: '',
    logo: '',
    arraySection: [],
    comerce: false
}, classN = '', wth = '100', selectAlign = console.log, reset = console.log }) => {
    const modes = ['flex-start', 'center', 'flex-end', 'space-around', 'space-evenly']
    const directiom = ['column', 'row', 'column-reverse', 'row-reverse']
    const orient = ['justify-content', 'align-items']
    const [action, setAction] = useState('')
    const [gap, setGap] = useState(compomentStyle.align.gap ? compomentStyle.align.gap : 0)
    const [action2, setAction2] = useState('')
    const [values, setvalues] = useState(compomentStyle.align)
    const [takeColor, setTakeColor] = useState(true)
    const [ready, setready] = useState(false)
    const quitGap = (value = gap) => {
        setGap(gap - 1)
        setvalues({
            ...values,
            gap: value - 1
        })
        selectAlign({
            direction: values.direction,
            justify: values.justify,
            align: values.align,
            gap: value - 1
        })
    }
    const putGap = (value = gap) => {
        setGap(value + 1)
        setvalues({
            ...values,
            gap: value + 1
        })
        selectAlign({
            direction: values.direction,
            justify: values.justify,
            align: values.align,
            gap: value + 1
        })
    }
    const directionSelect = (value) => {
        setvalues({
            ...values,
            direction: value
        })
        selectAlign({
            direction: value,
            justify: values.justify,
            align: values.align,
            gap: values.gap
        })
        selectAlign({
            direction: value,
            justify: values.justify,
            gap: values.gap,
            align: values.align,
        })
        setAction('')

    }
    const orientSelect = (value) => {
        if (value === 'justify-content') {
            setAction2('justify')
        }
        else {
            setAction2('align')
        }
        setAction('Modos')
    }


    const valueSelection = (value) => {
        if (action2 === 'justify') {
            setvalues({
                ...values,
                justify: value
            })
            selectAlign({
                direction: values.direction,
                justify: value,
                align: values.align,
                gap: values.gap
            })
            selectAlign({
                direction: values.direction,
                justify: value,
                gap: values.gap,
                align: values.align,
            })
        }
        else {
            setvalues({
                ...values,
                align: value
            })

            selectAlign({
                direction: values.direction,
                justify: values.justify,
                align: value,
                gap: values.gap
            })
            selectAlign({
                direction: values.direction,
                justify: values.justify,
                align: value,
                gap: values.gap
            })
        }
        setAction('')
        /* setready(true)
        setTakeColor(true)
         */
    }
    useEffect(() => {
        setGap(compomentStyle.align.gap ? compomentStyle.align.gap : 0)
        setvalues(compomentStyle.paddings)
    }, [compomentStyle.position])

    return (
        <>
            <button onClick={(e) => { e.preventDefault(); setAction('Dirección') }}>
                Dirección
            </button>
            <button onClick={(e) => { e.preventDefault(); setAction('Orientación') }}>
                Orientación
            </button>

            {action === 'Modos' ? <div className={`AlignGrid ${classN} ${wth}`}>
                {modes.map((key,i) => {
                    return (
                        <button
                         id={`align-component-${i}`} key={`align-component-${i}`}
                            onClick={(e) => { e.preventDefault(); valueSelection(key)/* ; setColor(key); */ }}
                            className={'alineadores'}>{key}</button>)
                })
                }
                <br />
            </div> : null}
            {action === 'Orientación' ? <div className={`AlignGrid ${classN} ${wth}`}>
                {orient.map((key,i) => {
                    return (
                        <button
                        id={`orient-component-${i}`} key={`orient-component-${i}`}
                            onClick={(e) => { e.preventDefault(); orientSelect(key);/* ; setColor(key); */ }}
                            className={'alineadores'}>{key}</button>)
                })
                }
                <br />
            </div>
                : null}
            {action === 'Dirección' ? <div className={`AlignGrid ${classN} ${wth}`}>
                {directiom.map((key,i) => {
                    return (
                        <button
                        id={`direction-component-${i}`} key={`direction-component-${i}`}

                            onClick={(e) => { e.preventDefault(); directionSelect(key)/* ; setColor(key); */ }}
                            className={'alineadores'}>{key}</button>)
                })
                }
                <br />
            </div>
                : null}
            <br />
            <button onClick={(e) => { e.preventDefault(); putGap(); }}>
                separacion entre items +
            </button>
            <button
                className={gap > 0 ? '' : 'hide'}
                onClick={(e) => { e.preventDefault(); quitGap(); }}>
                separacion entre items -
            </button>
            {gap > 0 ?
                `Separacion Actual ${gap}` : null
            }
            <button onClick={(e) => { e.preventDefault(); setStyle(values, 'align'); }}>
                ver resultado
            </button>
        </>

    )
}
export default Align