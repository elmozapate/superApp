import RelojApp from "../../../../components/containers/relojApp"

const TiempoPreguntas = (props) => {
    const { lastMin = false, lostGame = false, winning = false, eltiempo = -1 } = props
    return (
        <div className="fontcolorInedit-white wdt-30 column Ia-center Ij-center hgtI-15">
            <RelojApp lastMin={lastMin} lostGame={lostGame} winning={winning} eltiempo={eltiempo} inMillonario={true} />
        </div>
    )
}
export default TiempoPreguntas