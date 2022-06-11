const Loading = () => {
    return (
        <div className='loader-body'>
            {/*  <img
          src='logoSkayenz.png'
          className='logoBig'
          alt='logo empresa'
        /> */}
            <h1 >CONECTANDOSE AL SERVIDOR</h1>
            <br />
            <div className='loader-container'>
                <div className='loader'></div>
                <div className='loader2'></div>

            </div>
        </div>
    )
}
export default Loading
