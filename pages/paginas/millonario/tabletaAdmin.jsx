import { useEffect, useState } from "react"

const TabletaAdmin = (props) => {
    const { usersInRegister = [], endGame = console.log, gameActive = false, createClasification = console.log, changeQuestion = false, setchangeQuestion = console.log, ClasificDone = false, usersResults = [], startMillonario = console.log, sendPregunta = console.log, ipChoosed = '', selectingIp = false } = props
    const [playerData, setPlayerData] = useState({
        ip: '',
    })
    const [playerQuiz, setPlayerQuiz] = useState({
        pregunta: '',
        respuesta1: '',
        respuesta2: '',
        respuesta3: '',
        respuesta4: '',
        correcta: ''
    })
    const handlePlayer = (e) => {
        let value = e.target.value
        setPlayerData({
            ...playerData,
            ip: value
        })
    }
    const handleQuiz = (e) => {
        let value = e.target.value
        let id = e.target.id
        setPlayerQuiz({
            ...playerQuiz,
            [id]: value
        })
    }
    useEffect(() => {
        if (ClasificDone && changeQuestion) {
            setchangeQuestion(false)
        }

    }, [changeQuestion])
    return (
        <div className="column fontcolorInedit-white wdt-100 Ia-center Ij-center">
            {!gameActive && usersInRegister.length !== 0 ? <>{usersResults.length === 0 ? 'NO HAY CALSIFICADOS' : <></>}</> : 'NO HAY JUGADORES'}
            <button className={!gameActive && usersInRegister.length > 0 && !ClasificDone ? 'btn-azteca pointer' : 'hide'} onClick={(e) => { e.preventDefault(); createClasification() }}>createClasification</button>

            <button className={gameActive ? 'btn-azteca pointer' : 'hide'} onClick={(e) => { e.preventDefault(); endGame() }}>TERMINAR UEGO</button>

            {
                ClasificDone ? <> <br />
                    <br />
                    <br />
                    <br />
                    CLASIFICACION AL MOMENTO
                    {
                        usersResults.map((key, i) => {
                            let many = 0
                            key.array.map((key) => {
                                if (key.estado === 'correcta') {
                                    many = many + 1
                                }
                            })
                            return <li className={!gameActive ? "pointer fontcolorInedit-blue" : 'hide'} onClick={(e) => { e.preventDefault(); startMillonario(key.playerData) }} key={`resultados-${i}`}><span>{key.playerData.name}</span>--<span>{key.playerData.ip}</span>--<span>{many}/{key.array.length}</span>--<span>{'en: '}{key.time}{' segundos. '}</span></li>
                        })
                    }</> : <></>
            }

            {(ClasificDone && <> {!selectingIp ? <>

                <input id={'player'} onChange={handlePlayer} value={playerData.ip} className={'bingo-name-small'} placeholder='ip DEL JUGADOR' />

                <button className={playerData.ip.length > 2 ? 'btn-azteca pointer' : 'hide'} onClick={(e) => { e.preventDefault(); startMillonario(playerData) }}>ESCOGER JUGADOR</button>

            </> : <>
                <input id={'pregunta'} onChange={handleQuiz} value={playerQuiz.pregunta} className={'bingo-name-small'} placeholder='pregunta' />
                <input id={'respuesta1'} onChange={handleQuiz} value={playerQuiz.respuesta1} className={'bingo-name-small'} placeholder='respuesta1' />
                <input id={'respuesta2'} onChange={handleQuiz} value={playerQuiz.respuesta2} className={'bingo-name-small'} placeholder='respuesta2' />
                <input id={'respuesta3'} onChange={handleQuiz} value={playerQuiz.respuesta3} className={'bingo-name-small'} placeholder='respuesta3' />
                <input id={'respuesta4'} onChange={handleQuiz} value={playerQuiz.respuesta4} className={'bingo-name-small'} placeholder='respuesta4' />
                <input id={'correcta'} onChange={handleQuiz} value={playerQuiz.correcta} className={'bingo-name-small'} placeholder='correcta' type={'number'} max={3} min={0} />
                <button className={playerQuiz.pregunta.length > 2 &&
                    playerQuiz.pregunta.length > 2 &&
                    playerQuiz.respuesta1.length > 2 &&
                    playerQuiz.respuesta2.length > 2 &&
                    playerQuiz.respuesta3.length > 2 &&
                    playerQuiz.respuesta4.length > 2 &&
                    playerQuiz.correcta < 4 && playerQuiz.correcta >= 0 ? 'btn-azteca pointer' : 'hide'} onClick={(e) => { e.preventDefault(); sendPregunta(playerQuiz) }}>ENVIAR PREGUNTA</button>

            </>
            }</>)}
            <>
                {usersInRegister.length > 0 ? <>
                    {usersInRegister.map((key, i) => {
                        return <li key={`userInGame-${i}`} >{key.name}--{key.ip}</li>
                    })

                    }</> : <></>}
            </>
        </div>
    )
}
export default TabletaAdmin