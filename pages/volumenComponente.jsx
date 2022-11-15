const VolumenComponent = (props) => {
    const{volumenSet=console.log,volumenLevel={},volumenEfectsLevel={},efectVolumen=console.log,inKey=false,inMenu=false}=props
    return (
        <>
            <div className="game-sound">
                <span>
                    {`Música = ${volumenLevel.mute ? 'Muted' : volumenLevel.value * 10}%`}
                </span>
                <span>
                    <button
                        className={` ${!(volumenLevel.value > 0) ? ' ocult' : 'bgcolor-green'}`}
                        onClick={(e) => { e.preventDefault(); volumenSet('-',inKey,inMenu) }}
                    >{inMenu?'-':'-'}</button>
                    <button
                        className={`mute ${volumenLevel.mute || volumenLevel.value === 0 ? ' bgcolorInedit-red' : inMenu?'bgcolorInedit-blue':'bgcolorInedit-green'}`}
                        onClick={(e) => { e.preventDefault(); volumenSet('mute',inKey,inMenu) }}
                    >Mute</button>
                    <button
                        className={` ${!(volumenLevel.value < 10) ? ' ocult' : 'bgcolor-green'}`}

                        onClick={(e) => { e.preventDefault(); volumenSet('+',inKey,inMenu) }}
                    >+</button>

                </span>

            </div>
            <div className="game-sound">
                <span>
                    {`Efectos = ${volumenEfectsLevel.mute ? 'MUTED' : volumenEfectsLevel.value * 10}%`}
                </span>
                <span>
                    <button
                        className={` ${!(volumenEfectsLevel.value > 0) ? ' ocult' : 'bgcolor-green'}`}
                        onClick={(e) => { e.preventDefault(); efectVolumen(false, '-') }}
                    >{inMenu?'-':'-'}</button>
                    <button
                        className={`mute ${volumenEfectsLevel.mute || volumenEfectsLevel.value === 0 ? ' bgcolorInedit-red' : inMenu?'bgcolorInedit-blue':'bgcolorInedit-green'}`}
                        onClick={(e) => { e.preventDefault(); efectVolumen(false, 'mute') }}
                    >Mute</button>
                    <button
                        className={` ${!(volumenEfectsLevel.value < 10) ? ' ocult' : 'bgcolor-green'}`}

                        onClick={(e) => { e.preventDefault(); efectVolumen(false, '+') }}
                    >+</button>

                </span>

            </div>
        </>
    )
}
export default VolumenComponent