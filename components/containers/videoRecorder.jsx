import { useCallback, useState, useEffect } from "react"
import useRecorder from "react-hook-recorder";
import firebase from 'firebase'
import { firebaseConfig } from '../../firebase_setting/settings'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
let sended = 0
let grabationTime = 0
let cont = 0
let myFile
let ip
let percentArray = []
var localstream
var stratstream = false
const storage = firebase.storage()

const VideoRecorder = ({ setmediaAsk = console.log,
    setSelected = console.log, transmiting = false, getStreming = console.log, userName = '', setmediaAskSelect = console.log, urlVideo = '', inMedia = true, setinMedia = console.log, seturlVideo = console.log, recorded = false, setRecorded = console.log, sendVideo = console.log }) => {
    if (percentArray.length < 101) {
        for (let index = 0; index < 101; index++) {
            const element = index
            percentArray.push(element)
        }
    }
    let cssTime = 0
    const cssEffect = () => {
        if (cssTime === 1) {
            setrecCss(false)
        }
        if (cssTime === 2) {
            setrecCss(true)
            cssTime = 0
        }
        cssTime++
        console.log('ress', cssTime);

    }
    const Upload = (action) => {
        ip = Math.floor(Math.random() * (max - min)) + min
        /*         const files = inputEl.current./* files */
        const u = storage.ref(`/chat/Video/${userName}/${action ? 'test' : `${ip}`}.mp4`).put(myFile)
        u.on(
            'state_changed',
            function progress(snapshot) {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setPercent(percentage)
            },
            function error(e) {
                window.alert('error uploading file')
            },
            function complete(e) {
                urlObtain = storage.ref(`/chat/Video/${userName}`).child(`${action ? 'test' : `${ip}`}.mp4`).getDownloadURL().then(url => {
                    console.log(url, 'url')
                    if (action) {
                        seturlVideo(url);
                        setmediaAsk(false)
                        sendVideo(url)
                        setstartrecordingVoice(false);
                        setfinishRecordingVoice(false);
                        setinMedia(0);
                        setRecorded(false);
                        setPercent(0)
                    }

                })
            }
        )
    }

    let min = 1111111110
    let max = 9000000000
    let video

    const [videoIntime, setVideoIntime] = useState(0)
    const [startrecordingVoice, setstartrecordingVoice] = useState(false)
    const [finishRecordingVoice, setfinishRecordingVoice] = useState(false)
    const [imageSrc, setimageSrc] = useState('false')
    const [recCss, setrecCss] = useState(false)
    const minutes = (restart) => {
        if (restart) {
            cont = 20

        }
        if (cont === 10 || cont === 20 || cont === 30) {
            if (cont === 10) {
                cont = 0
                grabationTime = 0
                setVideoIntime(grabationTime)
            }
            if (cont === 20) {
                cont = 0
                grabationTime = 0
                setVideoIntime(grabationTime)
                minutes()
            }
            if (cont === 30) {
                cont = 0
            }
        }
        else {
            grabationTime++;
            setVideoIntime(grabationTime)
            cssEffect()
            if (transmiting && sended === 0) {
                snapShot(true)
            }
            setTimeout(minutes, 1000)
        }
    }
    const restetCont = () => {
        setVideoIntime(0)
        grabationTime = 0
        cont = 10
        sended = 0
    }
    const { startRecording, stopRecording, register, status } = useRecorder();
    const onStop = useCallback((blob, blobUrl) => {
        setstartrecordingVoice(false);
        setfinishRecordingVoice(true);

        seturlVideo(blobUrl);
        ip = Math.floor(Math.random() * (max - min)) + min

        myFile = new File([blob], `${ip}.mp4`, {
            type: blob.type,
        });
        console.log('convertida', myFile);
        setRecorded(true)
        cont = 30
        if (localstream) {
            localstream.getTracks()[0].stop()
        }
    }, []);
    const onStop2 = useCallback((blob, blobUrl) => {
        if (localstream) {
            localstream.getTracks()[0].stop()
        }
        setSelected(0)
        setinMedia(0);
        setmediaAskSelect(0)
        setmediaAsk(false)
        seturlVideo("");
        setRecorded(false);
        cont = 10
    }, []);
    const [percent, setPercent] = useState(0)
    let urlObtain



    useEffect(() => {

        if (inMedia === 0 || inMedia !== 1) {
            cont = 10
        } else {
            cont = 0
        }
    }, [inMedia])
    useEffect(() => {
        if (recorded) {

            if (navigator.mediaDevices.getUserMedia !== null && inMedia === 1) {
                var options = {
                    video: true,
                    audio: true
                };
                navigator.webkitGetUserMedia(options, function (stream) {
                    video = document.getElementById('videoPlay');
                    if ("srcObject" in video && !stratstream) {
                        stratstream = true
                        video.srcObject = stream;
                        console.log(video.srcObject, 'video.srcObject');
                    }
                    localstream = stream;
                    console.log(stream, 'streamUrl');

                    console.log("streaming");
                }, function (e) {
                    console.log("background error : " + e.name);
                });
            }
        }

    }, [inMedia, recorded])
    let snapShot = () => {
        let canvas = document.createElement('canvas');
        let video2 = document.getElementById('videoPlay');

        canvas.width = 1920;
        canvas.height = 1080;

        let ctx = canvas.getContext('2d');
        try {
            ctx.drawImage(video2, 0, 0, canvas.width, canvas.height);
            let image = canvas.toDataURL('image/jpeg');
            console.log(image);
            getStreming(image);
            setimageSrc(image)
            if (cont === 0) {
                setTimeout(snapShot, 330)
            }
            sended++
        } catch (error) {
            console.log(error);
        }


    }
    return (
        <div className={inMedia !== 0 && inMedia !== 1 ? 'hide' : 'flex-row min-width align-center justify-center column'}>
            <div className="flex-row min-width align-center justify-center ">

                {recorded ?
                    <>
                        {status === 'idle' && inMedia === 1 ?
                            <>
                                {percent !== 0 ?
                                    <>
                                        {percentArray.map((key) => {
                                            return <div className={`percentNum ${percent < key ? 'rojo' : 'verde'}`}></div>
                                        })}</>
                                    : <div className="flex-row min-width align-center justify-center">
                                        <button
                                            className={'btn-azteca pointer bgcolorInedit-green'}
                                            onClick={(e) => {
                                                e.preventDefault(); setPercent(1); Upload(true)
                                                    ; console.log(!recorded ? 'Pause' : 'Grabar');
                                            }}
                                        >Enviar</button>
                                        <button
                                            className={'btn-azteca pointer'}

                                            onClick={(e) => {
                                                e.preventDefault(); seturlVideo(""); restetCont(); startRecording(); setRecorded(true); setstartrecordingVoice(true)
                                                setfinishRecordingVoice(false);
                                                minutes(true)
                                            }}
                                        >
                                            Volver a grabar
                                        </button>
                                        <button
                                            className={'btn-azteca pointer'}

                                            onClick={(e) => {
                                                e.preventDefault();
                                                seturlVideo("");
                                                setRecorded(false);
                                                setinMedia(0);
                                                restetCont()
                                                setmediaAsk(false)
                                                setSelected(0)
                                                cont = 10
                                            }}
                                        >
                                            Cancelar

                                        </button>
                                    </div>}
                            </>
                            :
                            <>
                                <button
                                    className={'btn-azteca pointer'}

                                    onClick={stopRecording(onStop2)}
                                >
                                    Cancelar
                                </button>
                            </>
                        }
                    </> : <></>
                }
                <div className="flex-row min-width align-center justify-center">
                    <button
                        className={recorded ? 'hide' : 'btn-azteca pointer'}
                        onClick={(e) => {
                            e.preventDefault(); startRecording(); setRecorded(true); setinMedia(1); setstartrecordingVoice(true);
                            minutes(true)
                        }}
                    >Video</button>
                    <button
                        className={status !== "init" && status === "recording" ? ' bgcolorInedit-green btn-azteca pointer' : 'hide'}
                        onClick={stopRecording(onStop)}
                    >LISTO</button>
                </div>
            </div>
            <div className="flex-row column min-width column align-center justify-center">
                {startrecordingVoice ? <>
                    <div className="rec-img"                    >
                        <img
                            className={recCss ? "rec-img" : 'hide'}
                            src="https://cutewallpaper.org/24/camera-recording-png/recording-icon-modern-bold-full-loopable-effect-footagecrate-free-fx-archives.png" />
                    </div>
                    <p className="nj-center na-center ht-ftc">
                        Tiempo de grabación:   {videoIntime - 1}
                    </p>

                </> :
                    <p>Tiempo de grabación: {videoIntime - 1}</p>}
                {/*  <video className={status === 'recording' && recorded ? 'chat-video' : 'hide'}
                    id={videoPlay} ref={register} autoPlay muted playsInline /> */}
                {urlVideo && status === 'idle' && (
                    <>
                        <video
                            className={urlVideo && status === 'idle' ? 'chat-video' : 'hide'}
                            controls src={urlVideo} />
                    </>
                )}
                <video className={status === 'recording' && recorded ? 'chat-video' : 'hide'}
                    id={'videoPlay'} ref={register} autoPlay muted playsInline />
                <img className={status === 'recording' && recorded ? 'chat-stream' : 'hide'} src={imageSrc} alt="" />
            </div>

        </div >
    );
}

export default VideoRecorder;