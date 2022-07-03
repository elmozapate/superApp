import AudioTool from "../../../../components/containers/audioTool"

const TransitionComponent = (props) => {
    const { initing = false, clasifiquing = false, startCLass = console.log,time=30 } = props
    return (
        <div className="bgColor-black col-12 hg100vh relative">
            <div className={!clasifiquing ? 'hide' : 'opating'}>
                <div className={''}>
                    <img src={'https://i.pinimg.com/originals/d0/49/1d/d0491d3d235d3c6770014825af0d2961.gif'} className="warning_popout-gif" />
                    <button onClick={(e) => {
                        e.preventDefault();
                        ; startCLass()
                    }} className='btn-azteca pointer bgcolorInedit-red absolute top-50' > INICIARA LA CLASIFICACION EN: <br />{time}</button>

                </div>
            </div>
            {
                initing ?
                    <>
                        <AudioTool classNames='hide' srcIn={[{
                            url: "https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/millonario%2Fquien-quiere-ser-millonario-millionaire-slumdog.mp3?alt=media&token=0a708e8d-99ea-4b4f-9496-3f9735a961af",
                            type: 'audio/mp3'
                        }]} controls loop autoPlay />
                    </>
                    :
                    <>
                        <AudioTool classNames='hide' srcIn={[{
                            url: "https://firebasestorage.googleapis.com/v0/b/avatarupload-5ed8b.appspot.com/o/millonario%2F000217993_prev.mp3?alt=media&token=9af2bb2c-1d74-46f3-91a1-89b14c222eab",
                            type: 'audio/mp3'
                        }]} controls loop autoPlay />
                    </>
            }
            <img src={'https://thumbs.gfycat.com/AcidicFatherlyBluebottle-size_restricted.gif'} className="aboslutefuulimg" />
        </div>
    )
}
export default TransitionComponent