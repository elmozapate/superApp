import { useEffect, useState } from "react"
import { MesesDeuda } from "./deudatotal"
import Liqui from "./liquid"
import LiquiM from "./liquidM"
let nownow = true

const format = {
    deuda: 100,
    interes: 0,
    actual: 0,
    mes: -1,
    historial: [],
    valorAbono: 0,
    abonoCapital: 0,
    interesDeuda: 0,
    simulacion: false,
    deudaString: '0',
    actualString: '0',
    interesDeudaString: '0.00',
    valorAbonoString: '0',
    incurse: true,
    historyReverse: []
}
const Liquidador = (props) => {

    let elemto1 = true
    let elemto2 = true
    const [deuda, setDeuda] = useState(format)
    const [changing, setChanging] = useState(false)
    const [inPesos, setInPesos] = useState({ state: true })
    const [deudaAcumuled, setdDeudaAcumuled] = useState({ valor: 0, mesesDeDeuda: 0 })

    const crearCredito = () => {
        const newHstorial = [{
            tipo: 'Inicio Prestamo',
            actual: parseFloat(parseFloat(deuda.deuda)) + (parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)),
            valorAbono: 0,
            actualString: !isNaN(parseFloat(parseFloat(parseFloat(deuda.deuda)) + (parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)))) && parseFloat(parseFloat(parseFloat(deuda.deuda)) + (parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes))) >= 0 ? formatoMiles(parseFloat(parseFloat(parseFloat(deuda.deuda)) + (parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)))) : 0,
            interesDeudaString: !isNaN(parseFloat((parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)))) && parseFloat((parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes))) >= 0 ? formatoMiles(parseFloat((parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)))) : 0,
            interesDeuda: (parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)),
        }]
        setDeuda({
            ...deuda,
            incurse: true,
            actual: parseFloat(parseFloat(deuda.deuda)) + (parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)),
            mes: deuda.mes + 1,
            interesDeuda: (parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)),
            historial: newHstorial,
            interesDeudaString: !isNaN(parseFloat((parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)))) && parseFloat((parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes))) >= 0 ? formatoMiles(parseFloat((parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)))) : 0,
            actualString: !isNaN(parseFloat(parseFloat(parseFloat(deuda.deuda)) + (parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)))) && parseFloat(parseFloat(parseFloat(deuda.deuda)) + (parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes))) >= 0 ? formatoMiles(parseFloat(parseFloat(parseFloat(deuda.deuda)) + (parseFloat(deuda.deuda / 100) * parseFloat(deuda.interes)))) : 0,
        })

    }
    const mesSiguente = () => {
        elemto1 = document.getElementById('elemto1')
        elemto2 = document.getElementById('elemto2')
        const newDeuda = parseFloat(parseFloat(deuda.actual)) + (parseFloat(deuda.actual / 100) * parseFloat(deuda.interes))
        let newHstorial = deuda.historial

        const newDAta = {
            valorAbono: 0,
            tipo: 'Mes nuevo',
            actual: newDeuda > 0 ? newDeuda : 0,
            mes: deuda.mes + 1,
            interesDeuda: (parseFloat(deuda.actual / 100) * parseFloat(deuda.interes)),
            interesDeudaString: !isNaN(parseFloat((parseFloat(deuda.actual / 100) * parseFloat(deuda.interes)))) && parseFloat((parseFloat(deuda.actual / 100) * parseFloat(deuda.interes))) >= 0 ? formatoMiles(parseFloat((parseFloat(deuda.actual / 100) * parseFloat(deuda.interes)))) : 0,
            actualString: !isNaN(parseFloat(newDeuda > 0 ? newDeuda : 0)) && parseFloat(newDeuda > 0 ? newDeuda : 0) >= 0 ? formatoMiles(parseFloat(newDeuda > 0 ? newDeuda : 0)) : 0,
        }
        /* let newHstorialR = [newDAta]
        let reversed=newHstorial
        reversed.reverse()
        reversed.map((key)=>{
            newHstorialR.push(key)
        }) */
        newHstorial.push(newDAta)
        setDeuda({
            ...deuda,
            actual: newDeuda > 0 ? newDeuda : 0,
            actualString: !isNaN(parseFloat(newDeuda > 0 ? newDeuda : 0)) && parseFloat(newDeuda > 0 ? newDeuda : 0) >= 0 ? formatoMiles(parseFloat(newDeuda > 0 ? newDeuda : 0)) : 0,
            mes: deuda.mes + 1,
            interesDeuda: (parseFloat(deuda.actual / 100) * parseFloat(deuda.interes)),
            interesDeudaString: !isNaN(parseFloat((parseFloat(deuda.actual / 100) * parseFloat(deuda.interes)))) && parseFloat((parseFloat(deuda.actual / 100) * parseFloat(deuda.interes))) >= 0 ? formatoMiles(parseFloat((parseFloat(deuda.actual / 100) * parseFloat(deuda.interes)))) : 0,
            historial: newHstorial,
/*             historyReverse:newHstorialR
 */        })
        if (deuda.simulacion) {

            setTimeout(() => {
                try {
                    elemto2.click()

                } catch (error) {
                    console.log('listo');
                    window.alert('Finalizado')
                    setDeuda({
                        ...deuda,
                        incurse: false,
                    })
                }
            }, 300);
        }
    }
    const formatoMiles = (number) => {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        let arr = !isNaN(number) ? parseFloat(number).toFixed(inPesos.state ? 0 : 2).toString().split('.') : number.toString().split('.');
        arr[0] = arr[0].replace(exp, rep);
        return arr[1] ? arr.join('.') : arr[0];
    }
    let inChange = false
    const reChange = () => {
        setTimeout(() => {
            setChanging(false); inChange = false
        }, 1);
    }
    const handle = (e) => {
        inChange ? console.log : e.preventDefault();
        console.log(e);
        const id = e.target.id
        const value = e.target.value
        if (id === 'deuda' || id === 'actual' || id === 'interesDeuda' || id === 'valorAbono') {
            setDeuda({
                ...deuda,
                [id]: !isNaN(parseFloat(value)) ? id === 'valorAbono' ? parseFloat(value).toFixed(inPesos.state ? 0 : 2) : id === 'deuda' ? parseFloat(value) : parseFloat(value) >= (inPesos.state ? 49 : 1) ? parseFloat(value).toFixed(inPesos.state ? 0 : 2) : 0 : 0,
                [`${id}String`]: !isNaN(parseFloat(value)) && parseFloat(value) >= (inPesos.state ? 0 : 0) ? formatoMiles(parseFloat(value)) : 0
            })
        } else {
            setDeuda({
                ...deuda,
                [id]: id === 'interes' ? parseFloat(value).toFixed(2) : !isNaN(parseFloat(value)) && parseFloat(value) >= 0 ? parseFloat(value) : 0,
            })
        }

    }
    const abonoCapital = () => {
        let newHstorial = deuda.historial
        elemto1 = document.getElementById('elemto1')
        elemto2 = document.getElementById('elemto2')
        const newDAta = {
            tipo: 'Abono',
            mes: deuda.mes,
            actual: parseFloat(deuda.actual) - deuda.valorAbono,
            interesDeuda: (deuda.interesDeuda),
            valorAbono: (deuda.valorAbono),
            actualString: !isNaN(parseFloat(parseFloat(deuda.actual - deuda.valorAbono))) && parseFloat(parseFloat(deuda.actual - deuda.valorAbono)) >= 0 ? formatoMiles(parseFloat(parseFloat(deuda.actual - deuda.valorAbono))) : 0,
            interesDeudaString: !isNaN(parseFloat((parseFloat(deuda.actual / 100) * parseFloat(deuda.interes)))) && parseFloat((parseFloat(deuda.actual / 100) * parseFloat(deuda.interes))) >= 0 ? formatoMiles(parseFloat((parseFloat(deuda.actual / 100) * parseFloat(deuda.interes)))) : 0,
            valorAbonoString: formatoMiles(deuda.valorAbono)
        }
        /*    let newHstorialR = [newDAta]
           let reversed=newHstorial
           reversed.reverse()
           reversed.map((key)=>{
               newHstorialR.push(key)
           }) */
        newHstorial.push(newDAta)
        setDeuda({
            ...deuda,
            actual: parseFloat(deuda.actual - deuda.valorAbono),
            actualString: !isNaN(parseFloat(parseFloat(deuda.actual - deuda.valorAbono))) && parseFloat(parseFloat(deuda.actual - deuda.valorAbono)) >= 0 ? formatoMiles(parseFloat(parseFloat(deuda.actual - deuda.valorAbono))) : 0,
            valorAbono: deuda.simulacion ? parseInt(MesesDeuda[parseInt(deuda.mes / 12)][(deuda.mes - (parseInt(deuda.mes / 12) * 12))])!== 1 ? MesesDeuda[parseInt(deuda.mes / 12)][(deuda.mes - (parseInt(deuda.mes / 12) * 12))] : parseInt(deuda.interesDeudaString.replace(',','')) : 0,
            historial: newHstorial
        })
        const deudaConst = deudaAcumuled
            deuda.simulacion && parseInt(MesesDeuda[parseInt(deuda.mes / 12)][(deuda.mes - (parseInt(deuda.mes / 12) * 12))]) === 1 && setdDeudaAcumuled({
                valor: deudaConst.valor + parseInt(deuda.interesDeudaString.replace(',','')), mesesDeDeuda: deudaConst.mesesDeDeuda + 1
            })
        if (deuda.simulacion) {
            setTimeout(() => {
                try {
                    if (nownow) {
                        elemto1.click()
                    }


                } catch (error) {
                    console.log('listo');
                    window.alert('Finalizado')
                    setDeuda({
                        ...deuda,
                        incurse: false,
                    })
                }
            }, 300);
        }



    }
    const changeDen = () => {
        const newpesos = inPesos.state
        setInPesos({ ...inPesos, state: !inPesos.state })
        setChanging(true)
        inChange = true
        setTimeout(() => {
            if (newpesos) {
                setDeuda({
                    ...deuda,
                    deudaString: `${parseFloat(deuda.deuda).toFixed(2)}    `,
                    actualString: `${parseFloat(deuda.actual).toFixed(2)}  `,
                    valorAbonoString: `${deuda.valorAbono}  `,
                    deuda: parseInt(deuda.deuda).toFixed(2)

                })

                /* handle({
                    target: {
                        id: 'deuda', value: deuda.actual
                    }
                }) */
                inChange ? reChange() : console.log;

            } else {
                setDeuda({
                    ...deuda,
                    deudaString: `${parseInt((deuda.deuda / 100) * 100 < deuda.deuda ? (deuda.deuda / 100) * 100 : deuda.deuda)}`,
                    actualString: `${parseInt((deuda.actual / 100) * 100 < deuda.actual ? (deuda.actual / 100) * 100 : deuda.actual)}`,
                    valorAbonoString: `${parseInt((deuda.valorAbono / 100) * 100 < deuda.valorAbono ? (deuda.valorAbono / 100) * 100 : deuda.valorAbono)}`,
                    deuda: parseInt(deuda.deuda).toFixed(0)
                })
                /*  handle({
                     target: {
                         id: 'deuda', value: (deuda.deuda / 100) * 100 < deuda.deuda ? (deuda.deuda / 100) * 100 : deuda.deuda
                     }
                 }) */
                /* 
                 handle({
                     target: {
                         id: 'actual', value: (deuda.actual / 100) * 100 < deuda.actual ? (deuda.actual / 100) * 100 : deuda.actual
                     }
                 })
                 handle({
                     target: {
                         id: 'valorAbono', value: (deuda.valorAbono / 100) * 100 < deuda.valorAbono ? (deuda.valorAbono / 100) * 100 : deuda.valorAbono
                     }
                 }) */
                inChange ? reChange() : console.log;

            }
        }, 1);
    }
    const simulacion = () => {
        setDeuda({
            ...deuda,
            valorAbono: deuda.simulacion ? parseInt(MesesDeuda[parseInt(deuda.mes / 12)][(deuda.mes - (parseInt(deuda.mes / 12) * 12))])!== 1 ? MesesDeuda[parseInt(deuda.mes / 12)][(deuda.mes - (parseInt(deuda.mes / 12) * 12))] : parseInt(deuda.interesDeudaString.replace(',','')) : 0,
        })
        parseInt(MesesDeuda[parseInt(deuda.mes / 12)][(deuda.mes - (parseInt(deuda.mes / 12) * 12))]) === 1 && setdDeudaAcumuled({
            valor: deudaConst.valor + parseInt(deuda.interesDeudaString.replace(',','')), mesesDeDeuda: deudaConst.mesesDeDeuda + 1
        })
        elemto2 = document.getElementById('elemto2')
        let oldValue = deuda
        if (oldValue.simulacion) {

        } else {
            oldValue.simulacion = true

        }
        setDeuda(oldValue)
        nownow = true
        elemto2.click()
    }
    /*     useEffect(() => {
            if ((parseInt(deuda.mes / 12) * 12) === deuda.mes && nownow) {
    
    
                nownow = false
            }
        }, [deuda.mes]) */
    return (
        <>
            {props.page === 'mobil' ? <>            {!changing && <LiquiM deuda={deuda} setDeuda={setDeuda} changeDen={changeDen} inPesos={inPesos} setInPesos={setInPesos} abonoCapital={abonoCapital} mesSiguente={mesSiguente} simulacion={simulacion} crearCredito={crearCredito} handle={handle} />}
            </> : <>            {!changing && <Liqui deudaAcumuled={deudaAcumuled} deuda={deuda} setDeuda={setDeuda} changeDen={changeDen} inPesos={inPesos} setInPesos={setInPesos} abonoCapital={abonoCapital} mesSiguente={mesSiguente} simulacion={simulacion} crearCredito={crearCredito} handle={handle} />}
            </>}
        </>
    )


}
export async function getServerSideProps({ req, query }) {
    const querytext = query.page || ''
    console.log(querytext);
    const forwarded = req.headers["x-forwarded-for"]
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    let min = 1111111110
    let max = 9000000000
    return {
        props: {
            ip: /* Math.floor(Math.random() * (max - min)) + min */ ip,
            page: querytext
        },
    }
}
export default Liquidador