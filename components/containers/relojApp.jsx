const RelojApp = ({ eltiempo = 0}) => {


    return (
        <div className='reloj-puente'>
                <span>{parseInt(eltiempo / 60)<10?`0${parseInt(eltiempo / 60)}`:parseInt(eltiempo / 60)}:{((eltiempo)-((parseInt(eltiempo / 60))*60))<10?`0${((eltiempo)-((parseInt(eltiempo / 60))*60))}`:((eltiempo)-((parseInt(eltiempo / 60))*60))} </span>
                {eltiempo > 60 ? <><audio  className="hide" controls loop autoPlay>
                    <source src="https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fhousehold045.mp3?alt=media&token=defd2868-7e64-4280-8dd9-1339212302bb" type="audio/mp3" />
                    <source src="https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fhousehold045.mp3?alt=media&token=defd2868-7e64-4280-8dd9-1339212302bb" type="audio/mp3" />
                </audio></> : <><audio className="hide" controls loop autoPlay>
                    <source src="https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fmisc198.mp3?alt=media&token=3be8cd3f-9b18-4479-b0bc-d828c8197b21" type="audio/mp3" />
                    <source src="https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fmisc198.mp3?alt=media&token=3be8cd3f-9b18-4479-b0bc-d828c8197b21" type="audio/mp3" />
                </audio></>

                }
            </div>

   )
}
export default RelojApp
