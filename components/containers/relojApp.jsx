import { useEffect, useState } from "react"
let ending = false
const RelojApp = ({ winning=winning,eltiempo = 0 }) => {
    const [relojSrc, setrelojSrc] = useState('https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20Reloj%20Minutero%20%20Efecto%20de%20Sonidolento.mp3?alt=media&token=aa3d406f-6724-4f87-9715-475f865f282e')

    useEffect(() => {
        if (ending) {
            (eltiempo < 60)
            {
                setrelojSrc("https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20sonido%20de%20reloj%20tic%20tic.mp3?alt=media&token=b870b388-39e0-4cd7-9e52-cac388629217")
            }
            ending = true
        }
    }, [eltiempo])

    return (
        <div className='reloj-puente'>
            <span>{parseInt(eltiempo / 60) < 10 ? `0${parseInt(eltiempo / 60)}` : parseInt(eltiempo / 60)}:{((eltiempo) - ((parseInt(eltiempo / 60)) * 60)) < 10 ? `0${((eltiempo) - ((parseInt(eltiempo / 60)) * 60))}` : ((eltiempo) - ((parseInt(eltiempo / 60)) * 60))} </span>
            {winning ?<audio className="hide" controls  autoPlay>
                <source src={'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Ffanfare-triumphal.mp3?alt=media&token=86ec38ea-bf88-4656-96aa-148b6ebd7812'} type="audio/mp3" />
            </audio> :<audio className="hide" controls loop autoPlay>
                <source src={relojSrc} type="audio/mp3" />
                <source src={relojSrc} type="audio/mp3" />
            </audio>
            }
        </div>

    )
}
export default RelojApp
