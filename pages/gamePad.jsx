
const GamePad = (props) => {
    const { propsAction = { jumping: false }, setSaltoFunt = console.log, brincar = console.log, setsalto = console.log, dibujarMouseOn = console.log, setProps = console.log, armas = { bat: { state: false } } } = props

    return (
        <>
            <div className={"botonesCanvasInteractivos"}>
                <div className="controlGame-direccion">
                    <div className="div-row">
                        <div className="arrow xs-xb">
                            <button
                            ></button>
                        </div>
                        <div className="arrow xs xs-2">
                            <button
                                onTouchEnd={() => {
                                    setTimeout(() => {
                                        setProps('propsAction', 'gravity', true)
                                    }, 30);
                                }}
                                onTouchStart={!propsAction.jumping ? (e) => {
                                    setsalto(setSaltoFunt());
                                    brincar()
                                } : (e) => {
                                    setsalto(setSaltoFunt())
                                }}></button>
                        </div>
                        <div className="arrow xs-xf">
                            <button
                                onTouchEnd={() => {
                                    setTimeout(() => {
                                        setProps('propsAction', 'gravity', true)
                                    }, 30);
                                }}
                                onTouchStart={!propsAction.jumping ? (e) => {
                                    setsalto(setSaltoFunt());
                                    brincar()
                                } : (e) => {
                                    setsalto(setSaltoFunt())
                                }}></button>
                        </div>
                    </div>
                    <div className="div-row">
                        <div className="arrow xb xb-2">
                            <button
                                onTouchEnd={(e) => {

                                    setProps('mxActive', null, false);
                                    setProps('propsImage', 'direccion', 'xs')
                                    setProps('mxDirection', 'all', 'false')


                                }}
                                onTouchStart={(e) => {
                                    setProps('mxActive', null, true);
                                    dibujarMouseOn('-', true)
                                    setProps('propsImage', 'direccion', 'xb')
                                    setProps('lastDireccion', null, 'xb');

                                }}></button>
                        </div>
                        <div className="arrow">
                            <button>o</button>
                        </div >
                        <div className="arrow xf xf-2" >
                            <button
                                onTouchEnd={(e) => {
                                    setProps('propsImage', 'direccion', 'xs');
                                    setProps('mxDirection', 'all', false);
                                    setProps('mxActive', null, false);
                                }}
                                onTouchStart={(e) => {
                                    setProps('mxActive', null, true);
                                    dibujarMouseOn('+', true)
                                    setProps('propsImage', 'direccion', 'xf');
                                    setProps('lastDireccion', null, 'xf');
                                }}></button>
                        </div>
                    </div>
                    <div className="div-row">
                        <div className="arrow xd-xb">
                            <button
                            ></button>
                        </div>
                        <div className="arrow xd xd-2">
                            <button
                                className="down"
                                onTouchEnd={(e) => {
                                    setProps('mxActive', null, false);
                                    setProps('propsImage', 'direccion', 'xs');

                                }}
                                onTouchStart={(e) => {
                                    setProps('propsImage', 'direccion', 'xd');
                                    setProps('mxDirection', 'all', false);
                                    setProps('mxActive', null, true);
                                }}></button>
                        </div>
                        <div className="arrow xd-xf">
                            <button></button>
                        </div>
                    </div>
                </div>
                <div className="controlGame-accion">
                    <div className="btn-a">
                        <button
                            onTouchStart={!armas.bat.state ? (e) => {
                                setProps('armas', 'state', true);
                            } : (e) => {
                                setProps('armas', 'state', true);

                            }}></button>
                    </div>
                    <div className="btn-b">
                        <button
                            onTouchEnd={() => {
                                setTimeout(() => {
                                    setProps('propsAction', 'gravity', true);
                                }, 30);
                            }}
                            onTouchStart={!propsAction.jumping ? (e) => {
                                setsalto(setSaltoFunt());
                                brincar()
                            } : (e) => {
                                setsalto(setSaltoFunt())
                                brincar()

                            }}></button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default GamePad