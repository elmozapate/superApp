const GitPopOut = (props) => {
    const { setAreYouReady = console.log, gifPop = {
        state: false,
        msg: 'welcome',
        audio: ''
    }, buttonActive = false, playerData = {
        name: ''
    }, startCLass = console.log } = props
    if (buttonActive) {
        return (
            <div className={' opating absolute'}>
                <div className={'  '}>
                    <img src={'https://i.pinimg.com/originals/d0/49/1d/d0491d3d235d3c6770014825af0d2961.gif'} className="warning_popout-gif" />
                    <button className='btn-azteca pointer bgcolorInedit-red absolute top-50' onCLick={(e) => {
                        e.preventDefault(); setAreYouReady(true); console.log('siiiii');
                        ; startCLass()
                    }}> INICIAR LA CLASIFICACION <br />Suerte... </button>

                </div>
            </div>
        )
    }
    return (
        <div className={gifPop.state ? 'opating absolute' : 'hide'}>
            <div className={gifPop.state ? '' : 'hide'}>
                <img src={gifPop.msg} className="warning_popout-gif" />
                <audio src={gifPop.audio} className={'hide'} controls autoPlay >
                </audio>
            </div>
        </div>
    )
}
export default GitPopOut