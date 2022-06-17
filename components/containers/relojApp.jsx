import { useEffect, useState } from "react"
let ending = false
const RelojApp = ({ eltiempo = 0 }) => {
    const [relojSrc, setrelojSrc] = useState(0)

    useEffect(() => {
        if (ending) {
            (eltiempo < 60)
            {
                setrelojSrc("https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fmisc198.mp3?alt=media&token=3be8cd3f-9b18-4479-b0bc-d828c8197b21")
            }
            ending = true
        }
    }, [eltiempo])

    return (
        <div className='reloj-puente'>
            <span>{parseInt(eltiempo / 60) < 10 ? `0${parseInt(eltiempo / 60)}` : parseInt(eltiempo / 60)}:{((eltiempo) - ((parseInt(eltiempo / 60)) * 60)) < 10 ? `0${((eltiempo) - ((parseInt(eltiempo / 60)) * 60))}` : ((eltiempo) - ((parseInt(eltiempo / 60)) * 60))} </span>
            <audio className="hide" controls loop autoPlay>
                <source src={relojSrc} type="audio/mp3" />
                <source src={relojSrc} type="audio/mp3" />
            </audio>
        </div>

    )
}
export default RelojApp
