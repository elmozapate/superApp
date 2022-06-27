import { useEffect, useState } from "react"
import TiempoPreguntas from "./tiempoPreguntas"
let uno = 0
let dos = 0
let tres = 0
let cuatro = 0
const HelpsComponent = (props) => {
    const { helpsCome = [], helpTime = 0 } = props

    const [valuesShow, setValuesShow] = useState({
        a: uno,
        b: dos,
        c: tres,
        d: cuatro
    })



    useEffect(() => {
        uno = 0
        dos = 0
        tres = 0
        cuatro = 0
        helpsCome.map((key, i) => {
            if (key == 0) {
                uno = uno + 1
            }
            if (key == 1) {
                dos = dos + 1
            }
            if (key == 2) {
                tres = tres + 1
            }
            if (key == 3) {
                cuatro = cuatro + 1
            }
            setValuesShow({
                a: uno,
                b: dos,
                c: tres,
                d: cuatro
            })

        })
    }, [helpsCome])

    return (
        <div className="percentPublic fontcolorInedit-white wdt-100 Ia-flex-end Ij-center">
            <div className={`hgSize-${parseInt((100 * valuesShow.a) / helpsCome.length)}`}>a : {parseInt((100 * valuesShow.a) / helpsCome.length) === NaN ? 0 : parseInt((100 * valuesShow.a) / helpsCome.length)}%</div>
            <div className={`hgSize-${parseInt((100 * valuesShow.b) / helpsCome.length)}`}>b : {parseInt((100 * valuesShow.b) / helpsCome.length) === NaN ? 0 : parseInt((100 * valuesShow.b) / helpsCome.length)}%</div>
            <div className={`hgSize-${parseInt((100 * valuesShow.c) / helpsCome.length)}`}>c : {parseInt((100 * valuesShow.c) / helpsCome.length) === NaN ? 0 : parseInt((100 * valuesShow.c) / helpsCome.length)}%</div>
            <div className={`hgSize-${parseInt((100 * valuesShow.d) / helpsCome.length)}`}>d : {parseInt((100 * valuesShow.d) / helpsCome.length) === NaN ? 0 : parseInt((100 * valuesShow.d) / helpsCome.length)}%</div>
            <TiempoPreguntas eltiempo={helpTime} />
        </div>
    )
}
export default HelpsComponent