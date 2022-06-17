import { useEffect, useState } from "react"
let ending = false
const RelojApp = ({ relojSrc='',winning = false, eltiempo = 0 }) => {

    return (
        <div className='reloj-puente'>
            <span>{parseInt(eltiempo / 60) < 10 ? `0${parseInt(eltiempo / 60)}` : parseInt(eltiempo / 60)}:{((eltiempo) - ((parseInt(eltiempo / 60)) * 60)) < 10 ? `0${((eltiempo) - ((parseInt(eltiempo / 60)) * 60))}` : ((eltiempo) - ((parseInt(eltiempo / 60)) * 60))} </span>
            {winning ? <audio className="hide" controls autoPlay>
                <source src={'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Ffanfare-triumphal.mp3?alt=media&token=86ec38ea-bf88-4656-96aa-148b6ebd7812'} type="audio/mp3" />
            </audio> : <audio className="hide" controls loop autoPlay>
                <source src={relojSrc} type="audio/mp3" />
                <source src={relojSrc} type="audio/mp3" />
            </audio>
            }
        </div>

    )
}
export default RelojApp
