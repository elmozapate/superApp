const BarraPlayer = (props) => {
    const {playerType='publico', playerData = {
        name: '',
        ip: ''
    },actualPlayer={
        name: '',
        ip: ''
    },nowInlevel=0 } = props
    return (
        <>
            <div className={" fontcolorInedit-white wdt-100 Ia-center Ij-center column invisbleinmobil"}>
          <span> {playerData.name!==''?<>{`TU ERES : ${playerData.name} --- `}</>:<></>} ...Y ESTA JUGANDO : {actualPlayer.name} en el nivel: {nowInlevel}</span> 
         <br className="invisbleinmobil"/>
          <span>  {playerType !== 'jugando' ? <>ESTAS AYUDAS LE QUEDAN A {actualPlayer.name}</> : <>USA LAS AYUDAS VERDES</>}</span> 
          <br />

            </div>

        </>
    )
}
export default BarraPlayer