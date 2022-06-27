import { useEffect, useState } from "react"
import ComponentePreguntas from "./componentePreguntas"
import GitPopOut from "./gitPopOut"
import TiempoPreguntas from "./tiempoPreguntas"
import TransitionComponent from "./transitionComponent"
let cont = 0
const ComponenteClasificatorio = (props) => {
    const [ip, setIp] = useState(props.ip || false)
    const [puntuationFinal, setpuntuationFinal] = useState(0)

    const { playerData = { name: '' }, userResults = [], ClasificDone = false, sendPuntuation = console.log, arrayClassificatorio = [], clasificationArray = [], inClasification = false, gameActive = false } = props
    const [pregunta, setpregunta] = useState('')
    const [resultados, setresultados] = useState({
        buenas: 0,
        malas: 0,
        preguntas: []
    })
    const [areYouReady, setAreYouReady] = useState(false)
    const [lastMin, setlastMin] = useState(false)
    const [lostGame, setlostGame] = useState(false)
    const [winning, setwinning] = useState(false)
    const [eltiempo, seteltiempo] = useState(0)
    const [correcta, setcorrecta] = useState(-1)
    const [respuestas, setrespuestas] = useState([])
    const [enPregunta, setenPregunta] = useState(0)
    const [classifiqued, setclassifiqued] = useState(false)
    const escogerEsta = (i) => {
        console.log('escogio');
        if (correcta === i) {
            let resultadosAux = resultados.preguntas
            resultadosAux.push({
                estado: 'correcta',
                numeroDePregunta: (enPregunta + 1)
            })
            setresultados({
                ...resultados,
                buenas: (resultados.buenas + 1),
                preguntas: resultadosAux
            })
        } else {
            let resultadosAux = resultados.preguntas
            resultadosAux.push({
                estado: 'incorrecta',
                numeroDePregunta: (enPregunta + 1)
            })
            setresultados({
                ...resultados,
                malas: (resultados.malas + 1),
                preguntas: resultadosAux
            })
        }
        if (enPregunta + 1 < arrayClassificatorio.length) {
            setenPregunta(enPregunta + 1)
        } else {
            sendPuntuation(resultados.preguntas, eltiempo)
            setclassifiqued(true)
            cont = 10
        }
    }

    let timeGame = 15
    const minutes = () => {
        timeGame = timeGame + 1
        if (cont === 10) {
            setwinning(true)
            cont = 0
        }
        else {
            if (timeGame === 60) {
                setlastMin(true)
            }
            seteltiempo(timeGame)
            setTimeout(minutes, 1000)
        }
    }
    const minutesReverse = () => {
        timeGame = timeGame - 1
        if (timeGame === 0) {
            startCLass()
            cont = 0
        }
        else {
            seteltiempo(timeGame)
            setTimeout(minutesReverse, 1000)
        }
    }
    const startCLass = () => {
        console.log('siiiii');
        setAreYouReady(true)
        minutes()
        setlastMin(false)
        setlostGame(false)
        setwinning(false)
        seteltiempo(0)
    }
    useEffect(() => {
        minutesReverse()
    }, [])

    useEffect(() => {
        if (arrayClassificatorio.length > 0) {
            console.log(arrayClassificatorio[enPregunta].respuestas, 'arrayClassificatorio', enPregunta);
            setpregunta(arrayClassificatorio[enPregunta].pregunta)
            setrespuestas(arrayClassificatorio[enPregunta].respuestas)
            setcorrecta(arrayClassificatorio[enPregunta].correcta)
        }
        console.log(clasificationArray, 'clasificationArray');
        let buenas = 0
        userResults.map((key, i) => {
            if (key.estado === 'correcta') {
                buenas = buenas + 1
            }
        })
        setpuntuationFinal(buenas)
    }, [arrayClassificatorio, enPregunta, clasificationArray, userResults])
    return (
        <div className="column fontcolorInedit-white wdt-100 Ia-center Ij-center">{classifiqued || ClasificDone ? <>{`${playerData.name}  estos son tus resultados : `}
            {userResults.map((key, i) => {
                return <li key={`resultado-${i}`}><span>{key.numeroDePregunta}</span>--<span>{key.estado}</span></li>
            })}
            Puntuacion:{puntuationFinal}/{userResults.length}
        </> : <>{
            areYouReady ?
                <>
                    <TiempoPreguntas lastMin={lastMin} lostGame={lostGame} winning={winning} eltiempo={eltiempo} />
                    <ComponentePreguntas pregunta={pregunta} playerType={'jugando'} sendHelp={escogerEsta} escogerEsta={escogerEsta} respuestas={arrayClassificatorio[enPregunta].respuestas} ip={ip} />
                </>
                :
                <>
                    <>
                        <TransitionComponent clasifiquing startCLass={startCLass} time={eltiempo} initing={true} />

                    </>
                </>
        }
        </>
        }
        </div>
    )
}
export default ComponenteClasificatorio