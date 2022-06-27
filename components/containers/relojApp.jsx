import { useEffect, useState } from "react"
import AudioTool from "./audioTool"
let ending = false

const RelojApp = ({ inMillonario = false, lastMin = false, lostGame = false, jail = false, winning = false, eltiempo = 0 }) => {
    const [relojSrc, setrelojSrc] = useState([{
        url: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20Reloj%20Minutero%20%20Efecto%20de%20Sonidolento.mp3?alt=media&token=aa3d406f-6724-4f87-9715-475f865f282e',
        type: 'audio/mp3'
    }])

    const enjaular = () => {
        window.location.replace('vww://aztecasecreto.vww/@78688#jail')
    }
    useEffect(() => {
        if (eltiempo < (inMillonario ? 15 : 60)) {
            setrelojSrc([{
                url: "https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20sonido%20de%20reloj%20tic%20tic.mp3?alt=media&token=b870b388-39e0-4cd7-9e52-cac388629217",
                type: 'audio/mp3'
            }])
        }
        else {
            setrelojSrc([{
                url: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20Reloj%20Minutero%20%20Efecto%20de%20Sonidolento.mp3?alt=media&token=aa3d406f-6724-4f87-9715-475f865f282e',
                type: 'audio/mp3'
            }])
        }
    }, [eltiempo])
    useEffect(() => {
        if (winning) {
            setrelojSrc([{
                url: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Ffanfare-triumphal.mp3?alt=media&token=86ec38ea-bf88-4656-96aa-148b6ebd7812',
                type: 'audio/mp3'
            }])
        }
    }, [winning])
    useEffect(() => {
        if (lastMin === true) {
            console.log('last2');
            setrelojSrc([{
                url: "https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20sonido%20de%20reloj%20tic%20tic.mp3?alt=media&token=b870b388-39e0-4cd7-9e52-cac388629217",
                type: 'audio/mp3'
            }])
        }
    }, [lastMin])
    useEffect(() => {
        if (lostGame) {
            setrelojSrc([{
                url: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fperder-incorrecto-no-valido.mp3?alt=media&token=1b2bf8a6-782f-442b-adcb-08a100877997',
                type: 'audio/mp3'
            }, {
                url: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/millonario%2FCrowdBooYeahIntroS%20PE950201_preview.mp3?alt=media&token=8f521927-4ede-47df-ac4b-40643a58fed6',
                type: 'audio/mp3'
            }])
        }
    }, [lostGame])
    useEffect(() => {
        if (jail) {
            setrelojSrc([{
                url: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fperder-incorrecto-no-valido.mp3?alt=media&token=1b2bf8a6-782f-442b-adcb-08a100877997',
                type: 'audio/mp3'
            },])
            setTimeout(enjaular, 5000)
        }
    }, [jail])

    return (
        <div className={inMillonario ? 'reloj-millonario ' : 'reloj-puente '}>
            {winning ? <div className="complete">
                <span >PASS </span>
                <span className="passtime">{'_'}{parseInt(eltiempo / 60) < 10 ? `0${parseInt(eltiempo / 60)}` : parseInt(eltiempo / 60)}:{((eltiempo) - ((parseInt(eltiempo / 60)) * 60)) < 10 ? `0${((eltiempo) - ((parseInt(eltiempo / 60)) * 60))}` : ((eltiempo) - ((parseInt(eltiempo / 60)) * 60))} </span>
                <audio className='hide' controls autoPlay>
                    <source src={'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Ffanfare-triumphal.mp3?alt=media&token=86ec38ea-bf88-4656-96aa-148b6ebd7812'
                    } type="audio/mp3" />
                    <source src={'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/millonario%2Faplausos.mp3?alt=media&token=77a0f516-4400-4be7-9e72-970a85e431fc'
                    } type="audio/mp3" />
                </audio>
            </div> :
                eltiempo > 0 ? <span>{parseInt(eltiempo / 60) < 10 ? `0${parseInt(eltiempo / 60)}` : parseInt(eltiempo / 60)}:{((eltiempo) - ((parseInt(eltiempo / 60)) * 60)) < 10 ? `0${((eltiempo) - ((parseInt(eltiempo / 60)) * 60))}` : ((eltiempo) - ((parseInt(eltiempo / 60)) * 60))} </span>
                    : <><span>FAIL</span>
                    </>
            }
            {!winning && (lastMin || (eltiempo < (inMillonario ? 15 : 60))) && !lostGame && eltiempo > 0 ?
                <AudioTool classNames='hide' srcIn={[{
                    url: "https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20sonido%20de%20reloj%20tic%20tic.mp3?alt=media&token=b870b388-39e0-4cd7-9e52-cac388629217",
                    type: 'audio/mp3'
                }]} controls loop autoPlay />

                : <></>}
            {!winning && !lastMin && !lostGame && eltiempo > (inMillonario ? 15 : 60) ?
                <AudioTool classNames='hide' srcIn={[{
                    url: 'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fy2mate.com%20-%20Reloj%20Minutero%20%20Efecto%20de%20Sonidolento.mp3?alt=media&token=aa3d406f-6724-4f87-9715-475f865f282e',
                    type: 'audio/mp3'
                }]} controls loop autoPlay />
                : <></>}
            {!winning && lostGame ?
                <>
                    <audio className='hide' controls autoPlay >
                        <source src={'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/calamaraudios%2Fperder-incorrecto-no-valido.mp3?alt=media&token=1b2bf8a6-782f-442b-adcb-08a100877997'
                        } type="audio/mp3" />
                    </audio>
                    <audio className='hide' controls autoPlay loop>

                        <source src={'https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/millonario%2FCrowdBooYeahIntroS%20PE950201_preview.mp3?alt=media&token=8f521927-4ede-47df-ac4b-40643a58fed6'
                        } type="audio/mp3" />
                    </audio>
                </>
                : <></>}
        </div>

    )
}
export default RelojApp
