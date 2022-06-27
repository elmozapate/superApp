import { useState } from "react";
import BarraPlayer from "./barraPlayer.jsx";
import HelpsComponent from "./helpsCompomemt";

const BarraInfo = (props) => {
    const { inHelping=false,warningPreStreamNeedingHelp=false, setwarningPreStreamNeedingHelp=console.log, usersInRegister = [], usersResults = [], nowInlevel = 0, playerData = {
        name: '',
        ip: ''
    }, actualPlayer = {
        name: '',
        ip: ''
    },
    helpTime=0 } = props
    const [friend, setFriend] = useState({
        name: '',
        ip: ''
    })

/*     
 */    const { helpsCome = [], helpsPlayer = {
        help1: true,
        help2: true,
        help3: true,
        help4: true,
    }, gameChoose = -1, playerType = 'jugador', helpNeed = console.log } = props
    console.log(playerType, 'playerType');
    return (
        <div className="fontcolorInedit-white wdt-70 column Ia-center Ij-center hgtI-15">
            {
                helpsCome.length > 0 || inHelping ? <HelpsComponent helpTime={helpTime}  helpsCome={helpsCome} /> :
                    <>
                        <BarraPlayer nowInlevel={nowInlevel} actualPlayer={actualPlayer} playerData={playerData} />
                        <div className={helpsCome.length === 0 && playerType !== 'jugando' ? 'hide' : gameChoose === -1 && playerType === 'jugando' ? " fontcolorInedit-white wdt-100 Ia-center Ij-center" : 'hide'}>
                            <button className={helpsPlayer.help1 ? 'btn-azteca pointer' : 'hide'} onClick={playerType === 'jugando' ? (e) => {
                                e.preventDefault(); helpNeed(1); /* helpNeed(); */
                            } : (e) => {
                                e.preventDefault();/*  console.log(playerType); choosePublic(); */
                            }}>50/50</button>
                            <button className={helpsPlayer.help2 ? 'btn-azteca pointer' : 'hide'} onClick={playerType === 'jugando' ? (e) => {
                                e.preventDefault(); setwarningPreStreamNeedingHelp(true); /* choosePlayer(); */
                            } : (e) => {
                                e.preventDefault(); /* console.log(playerType); choosePublic(); */
                            }}>AYUDA DE AMIGO</button>
                            <button className={helpsPlayer.help3 ? 'btn-azteca pointer' : 'hide'} onClick={playerType === 'jugando' ? (e) => {
                                e.preventDefault(); helpNeed(3); /* choosePlayer(); */
                            } : (e) => {
                                e.preventDefault(); /* console.log(playerType); choosePublic(); */
                            }}>AYUDA DE PUBLICO</button>
                            <button className={helpsPlayer.help4 ? 'btn-azteca pointer' : 'hide'} onClick={playerType === 'jugando' ? (e) => {
                                e.preventDefault(); helpNeed(4);/* choosePlayer(); */
                            } : (e) => {
                                e.preventDefault(); /* console.log(playerType); choosePublic(); */
                            }}>CAMBIO DE PREGUNTA</button>
                        </div >
                    </>
            }
            <div className={warningPreStreamNeedingHelp ? 'warning_pop' : 'hide'}>
                <div className={warningPreStreamNeedingHelp ? 'warning_popout' : 'hide'}>
                    <p className='warning_tittle'>ESCOJE TU AMIGO</p>
                    <div className='warning_msg'>
                        {usersInRegister.map((key, i) => {

                            return <li className={playerData.name !== key.name ? 'pointer fontcolorInedit-blue' : 'hide'} onClick={(e) => {
                                e.preventDefault(); setFriend(key);
                            }} key={`resultadosr-${i}`}><span className='pointer fontcolorInedit-blue'>{key.name}</span></li>
                        })}                    </div>
                    <div className='warning_msg'>
                        <>Escojiste:<span>{friend.name} </span></>
                    </div>
                    ÚLTIMA PALABRA?
                    <div className='accept_pop'>
                        <div className='accept_red' onClick={(e) => {
                            e.preventDefault(); setwarningPreStreamNeedingHelp(false);
                        }}>
                            <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' className='svg-inline--fa fa-times fa-w-11 fa-9x'><path fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z' className='' /></svg> <span>NO CONFIO</span>
                        </div>
                        <button className='accept_green' onClick={(e) => { e.preventDefault(); helpNeed({ state: true, friend }) }}>
                            <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='check' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='svg-inline--fa fa-check fa-w-16 fa-9x'><path fill='currentColor' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z' className='' /></svg><span>PEDIR AYUDA</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BarraInfo