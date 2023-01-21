import { useEffect, useState } from "react";

const LiquiM = (props) => {
    const { changeDen = console.log, inPesos = { state: true }, deuda = {
        deuda: 0,
        interes: 0,
        actual: 0,
        mes: 0,
        historial: [],
        valorAbono: 0,
        abonoCapital: 0,
        interesDeuda: 0,
        simulacion: false,
        deudaString: '0.00',
        actualString: '0.00',
        interesDeudaString: '0.00',
        valorAbonoString: '0.00',
        incurse: true,
        historyReverse: []

    }, simulacion = console.log, setDeuda = console.log, mesSiguente = console.log, abonoCapital = console.log, handle = console.log, crearCredito = console.log } = props
    const [table, setTable] = useState({
        array: []
    })
    /*    useEffect(() => {
           let comp = deuda.historial.reverse()
           if (comp !== table.array && false === true) {
               setTable({ ...table, array: deuda.historial.reverse() })
           }
       }, [deuda]) */
    return (
        <>
            {deuda.mes === -1 && <button className="fixed-top" onClick={(e) => { e.preventDefault(); changeDen() }}
            >{inPesos.state ? 'pesos' : 'dollar'}</button>}
            <div className="fill ">
                <div className="rowLMobil">
                    <div className="liquidar">
                        <h4>Deuda : {`$ ${deuda.deudaString}`}</h4>
                        <h4>Deuda Actual : {`$ ${deuda.actualString}`}</h4>
                        <h4>Interes prestamo : {(deuda.interes)} %</h4>
                        <h4>Año- {deuda.mes / 12 >= 1 ? parseInt(deuda.mes / 12) : 0}</h4>
                        <h4>Mes- {deuda.mes - (parseInt(deuda.mes / 12) * 12) + 1}</h4>
                        <h4> Interes Deuda : {`$ ${deuda.interesDeudaString}`} </h4>
                        <h4>Valor abono : {`$ ${deuda.valorAbonoString}`}</h4>
                        {deuda.mes === -1 && <>DEUDA INICIAL<input min={0} type={'number'} placeHolder={'deuda'} value={deuda.deuda} step={inPesos.state ? 50 : 1} onChange={handle} id={'deuda'} /></>}
                        <br />
                        {deuda.mes === -1 && <>PORCENTAJE DE INTERES<input type={'number'} placeHolder={'Interes prestamo'} step={0.1} value={deuda.interes} onChange={handle} id={'interes'} /></>}
                        {deuda.mes > -1 && <>VALOR DEL ABONO<input type={'number'} value={deuda.valorAbono} onChange={handle} id={'valorAbono'} min={deuda.interesDeuda > 0 ? deuda.interesDeuda : 0} defaultValue={deuda.interesDeuda}step={inPesos.state ? 50 : 1} max={deuda.actual} /></>}
                        {deuda.actual > 0 && deuda.mes > -1 && <button id={'elemto2'} onClick={(e) => { e.preventDefault(); abonoCapital() }}>ABONO</button>}
                        {deuda.actual > 0 && deuda.mes > -1 && <button onClick={(e) => {
                            e.preventDefault(); simulacion()
                        }}>{deuda.simulacion ? 'Detener Simulacion' : 'Simulacion'}</button>}
                        {deuda.incurse && <button id={'elemto1'} onClick={(e) => { e.preventDefault(); deuda.actual !== 0 && deuda.mes > -1 ? mesSiguente() : crearCredito() }}>{deuda.mes > -1 ? 'SIGUENTE MES' : 'CREAR PRESTAMO'}</button>}
                        <button onClick={(e) => {
                            e.preventDefault(); setDeuda({
                                deuda: 0,
                                interes: 0,
                                actual: 0,
                                mes: -1,
                                historial: [],
                                valorAbono: 0,
                                abonoCapital: 0,
                                interesDeuda: 0,
                                deudaString: '0.00',
                                actualString: '0.00',
                                interesDeudaString: '0.00',
                                valorAbonoString: '0.00',
                                incurse: true,
                                historyReverse: []
                            })
                        }}>REINICIAR</button>


                    </div>
                    <div className="row-table"> <table>
                        <thead>
                            <tr id={`dataA1-${'1'}`}>
                                <th id={`dataA2-${'2'}`}>{'tipo'}</th>
                                <th id={`dataA2-${'2'}`}>{'mes'}</th>
                                <th id={`dataA3-${'3'}`}>{'actual'}</th>
                                <th id={`dataA4-${'4'}`}>{'interes cuota'}</th>
                                <th id={`dataA4-${'4'}`}>{'Valor Abono'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deuda.historial.map((key, i) => {
                                return (
                                    <>
                                        <tr id={`data1-${i}`}>
                                            <td id={`data2-${i}`}>{key.tipo}</td>
                                            <td id={`data2-${i}`}>{key.mes}</td>
                                            <td id={`data3-${i}`}>{`$ ${key.actualString}`}</td>
                                            <td id={`data4-${i}`}>{`$ ${key.interesDeudaString}`}</td>
                                            <td id={`data4-${i}`}> {key.tipo === 'Abono' ? `$ ${key.valorAbonoString}` : 'no aplica'}</td>

                                        </tr>
                                    </>

                                )
                            })}
                        </tbody>

                    </table></div>
                </div>
            </div>
        </>

    )

}
export default LiquiM