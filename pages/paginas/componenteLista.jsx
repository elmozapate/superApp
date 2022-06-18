const ComponenteLista = ({ participants = [], participantsturn = -1 }) => {

    return (<div className='flex-row column Ia-flex-start bgcolor-black'>
        {participants.map((key, i) => {
            return <li className="flex-row Ia-center li-listaReady" key={`participante-${i}`}><span className={participantsturn === i ? 'li-listaReady fontcolorInedit-green':"li-listaReady"}> {i + 1}</span><span className={participantsturn === i ? 'li-listaReady fontcolorInedit-green':"li-listaReady"}>{`➟`}</span> <span className={participantsturn === i ? 'li-listaReady fontcolorInedit-green':"li-listaReady"}>{key.user}</span>{participantsturn === i ? <span className='isturn fontcolorInedit-green' >vas</span> : <></>} </li>
        })}

    </div>)
}

export default ComponenteLista