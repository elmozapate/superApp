const RelojApp = ({ eltiempo = 0}) => {


    return (
        <div className='reloj-puente'>
                <span>{parseInt(eltiempo / 60)<10?`0${parseInt(eltiempo / 60)}`:parseInt(eltiempo / 60)}:{((eltiempo)-((parseInt(eltiempo / 60))*60))<10?`0${((eltiempo)-((parseInt(eltiempo / 60))*60))}`:((eltiempo)-((parseInt(eltiempo / 60))*60))} </span>
            </div>

   )
}
export default RelojApp
