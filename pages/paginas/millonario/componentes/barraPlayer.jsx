import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const BarraPlayer = (props) => {
    const [cookies, setcookie] = useState(getCookie('gameType') || false)

    const { playerType = 'publico', playerData = {
        name: '',
        ip: ''
    }, actualPlayer = {
        name: '',
        ip: ''
    }, nowInlevel = 0 } = props
    useEffect(() => {
        setcookie(getCookie('gameType') || false)
    }, [nowInlevel])
    return (
        <>
            <div className={" fontcolorInedit-white wdt-100 Ia-center Ij-center column invisbleinmobil"}>
                <span> {playerData.name !== '' ? <>{`TU ERES : ${playerData.name} --- `}</> : <></>} ...Y ESTA JUGANDO : {actualPlayer.name} en el nivel: {cookies === 'singlePayer' ? nowInlevel + 1 : nowInlevel}</span>
                <br className="invisbleinmobil" />
                <span>  {playerType !== 'jugando' ? <>ESTAS AYUDAS LE QUEDAN A {actualPlayer.name}</> : <>USA LAS AYUDAS VERDES</>}</span>
                <br />

            </div>

        </>
    )
}
export default BarraPlayer