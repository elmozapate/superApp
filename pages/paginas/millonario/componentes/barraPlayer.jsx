const BarraPlayer = (props) => {
    const { playerData = {
        name: '',
        ip: ''
    },actualPlayer={
        name: '',
        ip: ''
    },nowInlevel=0 } = props
    return (
        <>
            <div className={" fontcolorInedit-white wdt-100 Ia-center Ij-center"}>
            {playerData.name!==''?<>{`JUGADOR : ${playerData.name} --- `}</>:<></>} 
               JUGANDO : {actualPlayer.name} en el nivel: {nowInlevel}
            </div>

        </>
    )
}
export default BarraPlayer