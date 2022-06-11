import { useState } from "react"
const PaletaColores = ({ sectionin = {
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
}, classN = '', wth = '100', selectColor = console.log, reset = console.log }) => {
    const [color, setColor] = useState('transparent')
    const textos = ['indianred',
        'lightcoral',
        'salmon',
        'darksalmon',
        'lightsalmon',
        'crimson',
        'red',
        'firebrick',
        'darkred',
        'pink',
        'lightpink',
        'hotpink',
        'deeppink',
        'mediumvioletred',
        'palevioletred',
        'lightsalmon',
        'coral',
        'tomato',
        'orangered',
        'darkorange',
        'orange',
        'gold',
        'yellow',
        'lightyellow',
        'lemonchiffon',
        'lightgoldenrodyellow',
        'papayawhip',
        'moccasin',
        'peachpuff',
        'palegoldenrod',
        'khaki',
        'darkkhaki',
        'lavender',
        'thistle',
        'plum',
        'violet',
        'orchid',
        'fuchsia',
        'magenta',
        'mediumorchid',
        'mediumpurple',
        'rebeccapurple',
        'blueviolet',
        'darkviolet',
        'darkorchid',
        'darkmagenta',
        'purple',
        'indigo',
        'slateblue',
        'darkslateblue',
        'mediumslateblue',
        'greenyellow',
        'chartreuse',
        'lawngreen',
        'lime',
        'limegreen',
        'palegreen',
        'lightgreen',
        'mediumspringgreen',
        'springgreen',
        'mediumseagreen',
        'seagreen',
        'forestgreen',
        'green',
        'darkgreen',
        'yellowgreen',
        'olivedrab',
        'olive',
        'darkolivegreen',
        'mediumaquamarine',
        'darkseagreen',
        'lightseagreen',
        'darkcyan',
        'teal',
        'aqua',
        'cyan',
        'lightcyan',
        'paleturquoise',
        'aquamarine',
        'turquoise',
        'mediumturquoise',
        'darkturquoise',
        'cadetblue',
        'steelblue',
        'lightsteelblue',
        'powderblue',
        'lightblue',
        'skyblue',
        'lightskyblue',
        'deepskyblue',
        'dodgerblue',
        'cornflowerblue',
        'mediumslateblue',
        'royalblue',
        'blue',
        'mediumblue',
        'darkblue',
        'navy',
        'midnightblue',
        'cornsilk',
        'blanchedalmond',
        'bisque',
        'navajowhite',
        'wheat',
        'burlywood',
        'tan',
        'rosybrown',
        'sandybrown',
        'goldenrod',
        'darkgoldenrod',
        'peru',
        'chocolate',
        'saddlebrown',
        'sienna',
        'brown',
        'maroon',
        'white',
        'snow',
        'honeydew',
        'mintcream',
        'azure',
        'aliceblue',
        'ghostwhite',
        'whitesmoke',
        'seashell',
        'beige',
        'oldlace',
        'floralwhite',
        'ivory',
        'antiquewhite',
        'linen',
        'lavenderblush',
        'mistyrose',
        'gainsboro',
        'lightgray',
        'silver',
        'darkgray',
        'gray',
        'dimgray',
        'lightslategray',
        'slategray',
        'darkslategray',
        'black']
    const [takeColor, setTakeColor] = useState(true)
    const [ready, setready] = useState(false)


    const colorSelect = (color) => {
        setready(true)
        setTakeColor(true)
        selectColor(color, 'bgColor')
    }


    return (
        <>
            {
                takeColor ?
                    <button onClick={(e) => { e.preventDefault(); setTakeColor(false) }}>
                        {
                            ready ? 'Cambia el color del Fondo' : ' Escoge el color del Fondo'}
                    </button> :
                    <div className={`colorGrid ${classN} ${wth}`}>
                        {textos.map((key, i) => {
                            return (
                                <button
                                    id={`color-component-${i}`} key={`color-component-${i}`}

                                    onClick={(e) => { e.preventDefault(); colorSelect(key); setColor(key); }}
                                    className={`btn-color bgcolor-${key}`}></button>)
                        })

                        }
                        <br />
                        <button
                            onClick={(e) => { e.preventDefault(); colorSelect('transparent'); setColor('transparent'); }}
                            className={`btn-color-transparent bgcolor-white`}>Transparente</button>
                    </div>
            }
            {
                ready ?
                    <>
                        <p>
                            Has selecionado {color}
                        </p>
                        <button onClick={(e) => { e.preventDefault(); reset() }}>

                        </button>
                    </> : null
            }
        </>

    )
}
export default PaletaColores