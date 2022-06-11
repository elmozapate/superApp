import { useCallback, useState, useEffect, useRef } from "react"
import firebase from 'firebase'
import { firebaseConfig } from '../../firebase_setting/settings'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
let percentArray = []
if (percentArray.length < 101) {
    for (let index = 0; index < 101; index++) {
        const element = index
        percentArray.push(element)
    }
}
let grabationTime = 0
let cont = 0
let myFile
let ip = ''
let min = 1111111110
let max = 9000000000
const storage = firebase.storage()
const VidRecorder = ({ userName = '',setmediaAsk = console.log, urlAudio = '', inMedia = false, setinMedia = console.log, seturlAudio = console.log, setrecordingVoice = console.log, recordingVoice = false, setRecorded = console.log, sendVideo = console.log }) => {
    const [recCss, setrecCss] = useState(false)
    const [videoIntime, setVideoIntime] = useState(0)
    const [startrecordingVoice, setstartrecordingVoice] = useState(false)
    const [finishRecordingVoice, setfinishRecordingVoice] = useState(false)
    const [mediaRecorderState, setmediaRecorderState] = useState('')

    const minutes = () => {
        if (cont === 10 || cont === 20) {
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
        } else {
            grabationTime++;
            setVideoIntime(grabationTime)

            setTimeout(minutes, 1000)
        }
    }
    let audioIN = { audio: true ,video:true};
    //  audio is true, for recording

    // Access the permission for use
    // the microphone

    let audio
    // Start record
    let start
    let listenAudio
    // Stop record
    let stop

    // 2nd audio tag for play the audio
    let playAudio

    // This is the main thing to recorded
    // the audio 'MediaRecorder' API
    let mediaRecorder =
    {
        state: false
    }
    // Pass the audio stream

    // Start event
    /*   const onStop = useCallback((blob, blobUrl) => {
          const File = async () => {
              let auxAudio
              const resp = await fetch(blobUrl)
                  .then(response => response.blob());
              if (resp) {
  
                  auxAudio = new File(
                      [resp],
                      "demo2.mp4",
                      { type: 'video/mp4' }
                  );
                  return auxAudio;
              }
  
          }
          if (File) {
              console.log('bien');
              myFile = File
          }
  
  
          console.log('convertida');
          seturlAudio(blobUrl);
          cont = 10
  
  
      }, []);
      const onStop2 = useCallback((blob, blobUrl) => {
          cont = 10
          seturlAudio("");
          setrecordingVoice(false);
          setinMedia(0)
          setmediaAsk(false)
      }, []); */

    const [percent, setPercent] = useState(0)
    let urlObtain
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
                urlObtain = storage.ref(`/chat/Video/${userName}`).child(`${action ? 'test' : `${ip}`}.mp3`).getDownloadURL().then(url => {
                    console.log(url, 'url')
                    seturlAudio(url);
                    if (!action) {
                        sendVideo(url)
                        setrecordingVoice(false);
                        setstartrecordingVoice(false);
                        setfinishRecordingVoice(false);
                        setinMedia(0);
                        setPercent(0)
                    }

                })
            }
        )
    }
    useEffect(() => {
        if (inMedia === 0 || inMedia !== 1) {
            cont = 10
        } else {
            cont = 0
            minutes()
        }
    }, [inMedia])
    let er = 1
    useEffect(() => {

        if (recordingVoice) {
            let dataArray = [];

            navigator.mediaDevices.getUserMedia(audioIN)

                .then(function (mediaStreamObj) {
                    setmediaRecorderState(mediaRecorder.state)

                    audio = document.getElementById('audioPlay');
                    if ("srcObject" in video) {
                        audio.srcObject = mediaStreamObj;
                        console.log(audio.srcObject,'audio.srcObject');
                    }
                    else {
                        audio.src = window.URL
                            .createObjectURL(mediaStreamObj);
                            console.log(audio.srcObject,'');

                    }
                    start = document.getElementById('btnStart');
                    playAudio = document.getElementById('audioPlay');
                    listenAudio = document.getElementById('audioSave');
                    stop = document.getElementById('btnStop');
                    mediaRecorder = new MediaRecorder(mediaStreamObj);
                    start.addEventListener('click', function (ev) {
                        audio.play()
                        setstartrecordingVoice(true)
                        mediaRecorder.start();

                    })
                    stop.addEventListener('click', function (ev) {
                        setstartrecordingVoice(false)
                        setfinishRecordingVoice(true)
                        audio.pause()
                        mediaRecorder.stop();
                    });
                    mediaRecorder.ondataavailable = function (ev) {
                        dataArray.push(ev.data);
                        setmediaRecorderState(mediaRecorder.state)
                        console.log('ev.data',ev.data);

                    }
                    mediaRecorder.onstop = function (ev) {
                        let audioSr2 = URL.createObjectURL(dataArray[0]);
                        console.log(audioSr2, 'asacascnsachsajcbjs');

                        myFile = new Blob(dataArray,
                            { 'type': 'video/mp4;' });
                        ip = Math.floor(Math.random() * (max - min)) + min
                        dataArray = [];
                        listenAudio.src = window.URL
                            .createObjectURL(myFile);
                    }
                })
                .catch(function (err) {
                    console.log(err.name, err.message);
                });
        }

    }, [recordingVoice])

    /*     const { startRecording, stopRecording, register, status } = useRecorder(); */
    const restetCont = () => {
        setVideoIntime(0)
        grabationTime = 0
        cont = 10

    }
    return (
        <div className={inMedia !== 0 && inMedia !== 1 ? 'hide' : 'flex-row min-width align-center justify-center column'}>
            <div className="flex-row min-width align-center justify-center">
                {recordingVoice ?
                    <>
                        {'idle' === 'idle' ?
                            <>
                                {percentArray.map((key) => {
                                    return <div className={percent !== 0 ? `percentNum ${percent < key ? 'rojo' : 'verde'}` : 'hide'}></div>
                                })}
                                <div className="flex-row min-width align-center justify-center">
                                    <button
                                        className={percent !== 0 ? 'hide' : !finishRecordingVoice ? 'hide' : 'bgcolorInedit-green btn-azteca pointer '}
                                        onClick={(e) => {
                                            e.preventDefault(); Upload(); console.log(!recordingVoice ? 'Pause' : 'Grabar');
                                        }}
                                    >Enviar</button>
                                    <button
                                        className={percent !== 0 ? 'hide' : !finishRecordingVoice ? 'hide' : 'btn-azteca pointer'}

                                        id='btnRestart'
                                    >
                                        Reiniciar
                                    </button>
                                    <button
                                        className={percent !== 0 ? 'hide' : !finishRecordingVoice ? 'hide' : 'btn-azteca pointer bgcolorInedit-red'}
                                        id='btnContinue'

                                    >
                                        Seguir

                                    </button>
                                    <button
                                        className={percent !== 0 ? 'hide' : !finishRecordingVoice ? 'hide' : 'btn-azteca pointer bgcolorInedit-red'}
                                        id='btnCancel'

                                    >
                                        Cancelar

                                    </button>
                                </div>
                            </> :
                            <>
                                <button
                                    className={percent !== 0 ? 'hide' : startrecordingVoice ? 'hide' : 'btn-azteca pointer bgcolorInedit-red'}

                                    id='btnCancel3'
                                >
                                    Cancelar
                                </button>
                            </>
                        } </> : <></>
                }
                <div className="flex-row min-width align-center justify-center">
                    <button
                        className={recordingVoice/*  || status === 'recording' */ ? 'hide' : 'btn-azteca pointer'}
                        onClick={(e) => {
                            e.preventDefault(); /* startRecording(); */
                            setrecordingVoice(true); setinMedia(1);
                        }}
                    >Nota de voz</button>
                    <button
                        id='btnStart'
                        className={recordingVoice ? mediaRecorder.state !== 'inactive' && finishRecordingVoice || (startrecordingVoice || finishRecordingVoice) ? 'hide' : 'btn-azteca  bgcolorInedit-green' : 'hide'}
/*                         onClick={stopRecording(onStop)}
 */                    >Grabar</button>
                    <button
                        id='btnStop'
                        className={recordingVoice ? (mediaRecorder.state === 'inactive') || (!startrecordingVoice || finishRecordingVoice) ? 'hide' : 'btn-azteca  bgcolorInedit-red' : 'hide'}
/*                         onClick={stopRecording(onStop)}
 */                    >Pausa</button>
                </div>
            </div>
            <div className="flex-row min-width align-center justify-center column ">
                <div className={startrecordingVoice || finishRecordingVoice ? 'chat-user mrl-20 flex-row nj-center na-center' : 'hide'}

                >

                    {startrecordingVoice ? <>
                        <div className="rec-img"                    >
                            <img
                                className={recCss ? "rec-img" : 'hide'}
                                src="https://cutewallpaper.org/24/camera-recording-png/recording-icon-modern-bold-full-loopable-effect-footagecrate-free-fx-archives.png" />
                        </div>
                        <video  id="videoPlay" autoPlay></video>
                        <p className="nj-center na-center ht-ftc">
                             Tiempo de grabación:   {videoIntime}
                        </p>

                    </> :
                        <p>Tiempo de grabación: {videoIntime}</p>}

                </div>
                
                {/* {urlAudio && status === 'idle' && ( */}
                <div className="flex-row I-column min-width align-center mrl-20 justify-center">
                    <video  id="audioSave" controls />
                    <h1 className={finishRecordingVoice ? 'chat-user mrl-20' : 'hide'}>Escuchar mensaje</h1>
                </div>
                {/*                 )}
 */}
            </div>


        </div>
    );
}

export default VidRecorder;