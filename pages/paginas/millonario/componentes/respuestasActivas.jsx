import { useEffect, useState } from "react"

const RespuestasActivas = ({ sethelpPreStream=console.log, helpRes=false, helpPreStream =false,acceptHelp = console.log, gameChoose = -1, primeraEleccion = -1, playerChoose = -1, pregunta = '', helpRequired = false, playerType = 'publico', respuestas = [], inChoosing = console.log, escogerEsta = console.log, sendHelp = console.log }) => {
    const [warningPreStream, setwarningPreStream] = useState(false)
    const [choosed, setchoosed] = useState(-1)
    const choose = (i) => {
        if (helpRequired) {
            if (i === -1) {
                setchoosed(i)
            } else {
                setwarningPreStream(true)
                setchoosed(i)
            }
        } else {
            if (i === -1) {
                setchoosed(i)
                inChoosing(i)
            } else {
                setwarningPreStream(true)
                setchoosed(i)
                inChoosing(i)
            }
        }


    }
    const choosePlayer = () => {
        escogerEsta(choosed);
        setwarningPreStream(false)
    }
    const choosePublic = () => {
        sendHelp(choosed);
        setwarningPreStream(false)
    }
    useEffect(() => {
        if (helpRequired) {
            sethelpPreStream(true)
        }

    }, [helpRequired])

    return (
        <>
            < >
                {respuestas.map((key, i) => {
                    return (
                        <div
                            className={gameChoose == i ? 'wdt-50 fnt-larger border-3-green Ia-center Ij-center hgtI-40 flex-row bgcolor-green' : (gameChoose == i || primeraEleccion == i) && primeraEleccion == gameChoose ? 'wdt-50 fnt-larger border-3-green Ia-center Ij-center hgtI-40 flex-row bgcolor-green' : primeraEleccion == i ? primeraEleccion != gameChoose && gameChoose != -1 ? 'wdt-45 fnt-larger border-3-green Ia-center Ij-center hgtI-40 flex-row bgcolor-red' : 'wdt-45 fnt-larger border-3-green Ia-center Ij-center hgtI-40 flex-row bgcolor-blue' : helpRequired ? choosed === i || i === playerChoose ? 'wdt-45 fnt-larger border-3-green Ia-center Ij-center hgtI-40 flex-row' : `wdt-45 fnt-larger ${key !== '' ? 'border-3-white' : ''} Ia-center Ij-center hgtI-40 flex-row` : i === playerChoose || i === choosed ? 'wdt-45 fnt-larger border-3-green Ia-center Ij-center hgtI-40 flex-row' : `wdt-45 fnt-larger ${key !== '' ? 'border-3-white' : ''} Ia-center Ij-center hgtI-40 flex-row`}
                            onClick={playerType !== 'jugando' && playerType === 'publico' && playerType === 'jugador' ? (e) => { e.preventDefault(); console.log } : gameChoose == -1 ? playerType === 'publico' || playerType === 'jugador' ? helpRequired ? (e) => { e.preventDefault(); choose(i) } :
                                (e) => { e.preventDefault(); console.log } :
                                (e) => { e.preventDefault(); choose(i) } : (e) => { e.preventDefault(); console.log }}>
                            {key}
                        </div>
                    )
                })}
            </>
            <div className={warningPreStream ? 'warning_pop' : 'hide'}>
                <div className={warningPreStream ? 'warning_popout' : 'hide'}>
                    <p className='warning_tittle'>Estas Seguro</p>
                    <div className='warning_msg'>
                        <>Para: <span>{pregunta} </span></>
                    </div>
                    <div className='warning_msg'>
                        <>Escojiste:<span>{respuestas[choosed]} </span></>
                    </div>
                    ÚLTIMA PALABRA?
                    <div className='accept_pop'>
                        <div className='accept_red' onClick={(e) => {
                            e.preventDefault(); setwarningPreStream(false); inChoosing(-1); choose(-1)
                        }}>
                            <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' className='svg-inline--fa fa-times fa-w-11 fa-9x'><path fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z' className='' /></svg> <span>Cambiare</span>
                        </div>
                        <button className='accept_green' onClick={playerType === 'jugando' ? (e) => {
                            e.preventDefault(); choosePlayer();
                        } : (e) => {
                            e.preventDefault();  choosePublic();
                        }}>
                            <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='check' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='svg-inline--fa fa-check fa-w-16 fa-9x'><path fill='currentColor' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z' className='' /></svg><span>Ver</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={helpPreStream ? 'warning_pop' : 'hide'}>
                <div className={helpPreStream ? 'warning_popout' : 'hide'}>
                    <p className='warning_tittle'>DESEAS AYUDAR</p>
                    <div className='warning_msg'>
                        <><span>ALGUIEN</span></>
                    </div>
                    <div className='warning_msg'>
                        <>Te<span>NECESITA </span></>
                    </div>

                    <div className='accept_pop'>
                        <div className='accept_red' onClick={(e) => {
                            e.preventDefault(); sethelpPreStream(false);
                        }}>
                            <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' className='svg-inline--fa fa-times fa-w-11 fa-9x'><path fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z' className='' /></svg> <span>Cambiare</span>
                        </div>
                        <button className='accept_green' onClick={(e) => {
                            e.preventDefault(); sethelpPreStream(false);acceptHelp();
                        }}>
                            <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='check' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='svg-inline--fa fa-check fa-w-16 fa-9x'><path fill='currentColor' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z' className='' /></svg><span>Ver</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RespuestasActivas