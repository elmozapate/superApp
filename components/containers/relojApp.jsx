import { useEffect, useState } from "react"
let ending = false
const RelojApp = ({ jail = false, winning = false, eltiempo = 0 }) => {
    const [relojSrc, setrelojSrc] = useState('https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20Reloj%20Minutero%20%20Efecto%20de%20Sonidolento.mp3?alt=media&token=aa3d406f-6724-4f87-9715-475f865f282e')
    const enjaular = () => {
        window.location.replace('vww://aztecasecreto.vww/@78688#jail')
    }
    useEffect(() => {
        if (eltiempo) {
            if (eltiempo < 60) {
                                setrelojSrc("https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20sonido%20de%20reloj%20tic%20tic.mp3?alt=media&token=b870b388-39e0-4cd7-9e52-cac388629217")
            }
        }
            }, [eltiempo])
    useEffect(() => {
        
        if (winning) {
            setrelojSrc('https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Ffanfare-triumphal.mp3?alt=media&token=86ec38ea-bf88-4656-96aa-148b6ebd7812')
            
        }
    }, [winning])
    useEffect(() => {
        if (jail) {
            setrelojSrc('https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fperder-incorrecto-no-valido.mp3?alt=media&token=1b2bf8a6-782f-442b-adcb-08a100877997')
            setTimeout(enjaular, 5000)
        }
    }, [jail])

    return (
        <div className='reloj-puente '>
            {winning ? <div className="complete">
                <span >PASS </span>
                    <span className="passtime">{ '_'}{parseInt(eltiempo / 60) < 10 ? `0${parseInt(eltiempo / 60)}` : parseInt(eltiempo / 60)}:{((eltiempo) - ((parseInt(eltiempo / 60)) * 60)) < 10 ? `0${((eltiempo) - ((parseInt(eltiempo / 60)) * 60))}` : ((eltiempo) - ((parseInt(eltiempo / 60)) * 60))} </span>
                    <audio className='hide' controls autoPlay>
                    <source src={'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Ffanfare-triumphal.mp3?alt=media&token=86ec38ea-bf88-4656-96aa-148b6ebd7812'
                    } type="audio/mp3" />
                </audio>
            </div> :
                eltiempo > 0 ? <span>{parseInt(eltiempo / 60) < 10 ? `0${parseInt(eltiempo / 60)}` : parseInt(eltiempo / 60)}:{((eltiempo) - ((parseInt(eltiempo / 60)) * 60)) < 10 ? `0${((eltiempo) - ((parseInt(eltiempo / 60)) * 60))}` : ((eltiempo) - ((parseInt(eltiempo / 60)) * 60))} </span>
                    : <><span>FAIL</span>
                    </>
            }
            {!winning ? eltiempo > 60 ? <audio className='hide' controls loop autoPlay>
                <source src={'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20Reloj%20Minutero%20%20Efecto%20de%20Sonidolento.mp3?alt=media&token=aa3d406f-6724-4f87-9715-475f865f282e'} type="audio/mp3" />
            </audio> : <audio className='hide' controls loop autoPlay>
                <source src={'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20Reloj%20Minutero%20%20Efecto%20de%20Sonidolento.mp3?alt=media&token=aa3d406f-6724-4f87-9715-475f865f282e'} type="audio/mp3" />
            </audio>
                : <></>}
        </div>

    )
}
export default RelojApp
