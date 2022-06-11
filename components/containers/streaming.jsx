import { useCallback, useState, useEffect } from "react"
import VideoStream from "./streamComponent";
import VideoRecorder from "./videoRecorder";

const Streaming = ({ imageSrc = '', getStreming = console.log, userName = '',setmediaAskSelect= console.log, setmediaAsk = console.log, urlVideo = '', inMedia = true, setinMedia = console.log, seturlVideo = console.log, recorded = false, setRecorded = console.log, sendVideo = console.log }) => {
    const [selected, setSelected] = useState(0)
    useEffect(() => {
        console.log(imageSrc);

    }, [imageSrc])

    return (
        <>
            {selected === 0 ?
                <>
                    <button
                        className={selected !== 0 ? 'hide' : 'btn-azteca'}
                        onClick={ (e) => {
                            e.preventDefault(); setSelected(1);
                        } }

                    >Transmitir</button>
                    <button
                        className={selected !== 0 ? 'hide' : 'btn-azteca'}
                        onClick={ (e) => {
                            e.preventDefault(); setSelected(2);
                        } }

                    >Ver</button>

                </>
                :
                selected === 1 ?
                    <VideoRecorder imageSrc={imageSrc} transmiting={true} getStreming={getStreming} userName={userName} setSelected={setSelected} setmediaAsk={setmediaAsk} setmediaAskSelect={setmediaAskSelect} inMedia={inMedia} setinMedia={setinMedia} urlVideo={urlVideo} recorded={recorded} setRecorded={setRecorded} seturlVideo={seturlVideo} sendVideo={sendVideo} />
                    :selected === 2?

                    <VideoStream setSelected={setSelected} setmediaAsk={setmediaAsk} setmediaAskSelect={setmediaAskSelect} imageSrc={imageSrc} />:<></>

            }
        </>
    );
}

export default Streaming;