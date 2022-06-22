const ComponenteLista = ({ won = false, participants = [], participantsturn = -1 }) => {

    return (<div className='flex-row column Ia-flex-start bgcolor-black componente-lista'>
        {won?
        <>
            <li className="flex-row Ia-center li-listaReady" key={`participante-${'won'}`}>GANADOR<span className={ 'li-listaReady fontcolorInedit-green'}>{`➟    `}</span> <span className={ 'li-listaReady fontcolorInedit-green' }>{participants[participantsturn].user}</span> <span className='isturn fontcolorInedit-green' > {` ➟  GO`} </span> </li></>: 
        participants.map((key, i) => {
            return <li className="flex-row Ia-center li-listaReady" key={`participante-${i}`}><span className={participantsturn === i ? 'li-listaReady fontcolorInedit-green' : participantsturn > i ? 'li-listaReady fontcolorInedit-red' : "li-listaReady"}> {i + 1}</span><span className={participantsturn === i ? 'li-listaReady fontcolorInedit-green' : participantsturn > i ? 'li-listaReady fontcolorInedit-red' : "li-listaReady"}>{`➟    `}</span> <span className={participantsturn === i ? 'li-listaReady fontcolorInedit-green' : participantsturn > i ? 'li-listaReady fontcolorInedit-red' : "li-listaReady"}>{key.user}</span>{participantsturn === i ? <span className='isturn fontcolorInedit-green' > {` ➟  GO`} </span> : participantsturn > i ? <span className='isturn fontcolorInedit-red'>{` ➟  DIE`}</span> : <></>} </li>
        })
        }
    </div>)
}

export default ComponenteLista