const AudioTool = ({classNames = 'hide', srcIn = [], controls = false, loop = false, autoPlay = false}) => {
    return (<>
        <audio className={classNames} controls={controls} autoPlay={autoPlay} loop={loop}>
            {
                srcIn.map((key, i) => {
                    return <source src={key.url} type={key.type} />
                })

            }
        </audio>
    </>)
}
export default AudioTool