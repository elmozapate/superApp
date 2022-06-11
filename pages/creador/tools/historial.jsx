const Index = () => {
  
    return <></>
}
export default Index
export const Historial = ({ props }) => {
    const { historialPrint = console.log, historial = {
        positiionIn: 0,
        maxChanges: 0,
        array: []
    } } = props
    return (
        <>
            <div className="history">
                {
                    historial.maxChanges > 0 && historial.positiionIn!==1? <button onClick={(e) => { e.preventDefault(); historialPrint('-') }}> atras </button> : <></>
                }
                {
                    historial.positiionIn < historial.maxChanges + 1 ?
                        <button onClick={(e) => { e.preventDefault(); historialPrint('+') }}> adelante</button> : <></>
                }
            </div>
        </>
    )
}