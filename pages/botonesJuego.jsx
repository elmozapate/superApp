import VolumenComponent from "./volumenComponente";

const BotonesJuego = (props) => {
    const { id = '', value = {
        [id]: ''
    }, name = '', setValue = console.log, funtion = console.log, inSound = false, volumenSet = console.log, volumenLevel = console.log, volumenEfectsLevel = { muted: false, value: 2 }, efectVolumen = { muted: false, value: 2 } } = props
    return (<>
        <span className={inSound ? 'menu-cont' : "button-game"}>
            {inSound ? <>                    <VolumenComponent volumenSet={volumenSet} volumenLevel={volumenLevel} volumenEfectsLevel={volumenEfectsLevel} efectVolumen={efectVolumen} inMenu />
            </> : <>
                <span className="flex">
                    <span>{name}</span>
                    <span className="number">{id === 'dificulty' ? (value < 40 ? value / 10 : (value / 40 + 2)) : ` ${value[id]} `} </span>
                </span>
                <div className="btn-plus">
                    <button
                        className={`flex-start ${id === 'dificulty' && value > 10 ? '' : id === 'level' ? (id === 'level' && value[id] > 0 ? "" : 'hided') : id === 'stage' ? (value[id] > (0) ? '' : 'hided') : value[id] > 1 ? '' : 'hided'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            funtion(id, id === 'level' || id === 'dificulty' ? '-' : value[id] - 1);
                            setValue({
                                ...value,
                                [id]: value[id] - 1
                            })
                        }}
                    >-</button>
                    <button
                        className={`flex-end ${id === 'dificulty' && value < 80 ? '' : id === 'level' ? (id === 'level' && value[id] < 10 ? "" : 'hided') : id === 'stage' ? (value[id] < (4) ? '' : 'hided') : value[id] < (8) ? '' : 'hided'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            funtion(id, id === 'level' || id === 'dificulty' ? '+' : value[id] + 1);
                            setValue({
                                ...value,
                                [id]: value[id] + 1
                            })
                        }}
                    >+</button>
                </div></>
            }
        </span>
    </>)
}
export default BotonesJuego