import { useCallback, useState, useEffect } from "react"

const VideoStream = ( {imageSrc='', setSelected=console.log,setmediaAskSelect=console.log, setmediaAsk = console.log,}) => {

useEffect(() => {
    console.log(imageSrc);

}, [imageSrc])

    return (
        <>
            <div className="flex-row min-width align-center justify-center  column">
            <button
                                                        className={ 'btn-azteca pointer' }
                                                        onClick={(e) => {
                                                            e.preventDefault(); setmediaAskSelect(0);
                                                            setmediaAsk(false);setSelected(0)
                                                        }}

                                                    >volver</button>
            <img className='chat-stream'  src={imageSrc} alt="" />
                
            </div>
        </>
    );
}

export default VideoStream;