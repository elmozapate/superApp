const PreguntaActiva = (props) => {
    const { pregunta = '', respuestas = [], sendHelp = console.log, helpRequired = false } = props

    return (
        <>
            <h1 className="fnt-larger">{pregunta}</h1>
        </>
    )
}
export default PreguntaActiva