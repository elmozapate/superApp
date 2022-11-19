
const GamePad = (props) => {
    const { onMobil = false, gunsGet = {enUso:'revolver',array:[]}, itemsGet = [], armasGet = [], powerUpsGet = [], propsAction = { jumping: false }, setSaltoFunt = console.log, brincar = console.log, setsalto = console.log, disparar = console.log, dibujarMouseOn = console.log, setProps = console.log, armas = { bat: { state: false } } } = props
    return (
        <>
            <div className={"botonesCanvasInteractivos"}>
                <div className="controlGame-direccion type0">
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
                                    itemsGet.enUso === 'patineta' ? setProps('itemsSound', itemsGet.enUso, false) : console.log;

                                    setProps('mxDirection', 'all', 'false')


                                }}
                                onTouchStart={(e) => {
                                    setProps('mxActive', null, true);
                                    dibujarMouseOn('-', true)
                                    setProps('propsImage', 'direccion', 'xb')
                                    setProps('lastDireccion', null, 'xb');
                                    itemsGet.enUso === 'patineta' ? setProps('itemsSound', itemsGet.enUso, true) : console.log;
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
                                    itemsGet.enUso === 'patineta' ? setProps('itemsSound', itemsGet.enUso, false) : console.log;
                                }}
                                onTouchStart={(e) => {
                                    setProps('mxActive', null, true);
                                    dibujarMouseOn('+', true)
                                    setProps('propsImage', 'direccion', 'xf');
                                    setProps('lastDireccion', null, 'xf');
                                    itemsGet.enUso === 'patineta' ? setProps('itemsSound', itemsGet.enUso, true) : console.log;
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
                <div className="controlGame-accion ">
                    <div className="btn-gamepad btn-a">
                        <button
                            onTouchStart={!armas.bat.state ? (e) => {
                                setProps('armas', 'state', true);
                            } : (e) => {
                                setProps('armas', 'state', true);

                            }}>
                            <img src={armasGet.enUso !== 'ninguno' && armasGet.enUso !== 'ninguna' ? `/armas/${armasGet.enUso}/img/btn.png` : `/armas/desArmado/img/btn.png`}
                                alt={`armas-${armasGet.enUso}-btn`}
                                width={onMobil ? '60px' : '100px'}
                                height={onMobil ? '60px' : '100px'} />
                        </button>
                    </div>
                    <div className="btn-gamepad btn-b">
                        <button
                            onTouchEnd={() => {
                                setTimeout(() => {
                                    setProps('propsAction', 'gravity', true);
                                    setProps('itemsSound', itemsGet.enUso, false);

                                }, 30);
                            }}
                            onTouchStart={(e) => {
                                setsalto(setSaltoFunt())
                                brincar()

                            }}> <img src={itemsGet.enUso !== 'ninguno' && itemsGet.enUso !== 'ninguna' ? `/items/${itemsGet.enUso}/img/btn.png` : `/items/botas/img/btn.png`}
                                alt={`items-${itemsGet.enUso}-btn`}
                                width={onMobil ? '60px' : '100px'}
                                height={onMobil ? '60px' : '100px'} /></button>
                    </div>
                    <div className={gunsGet.enUso === 'ninguno' || gunsGet.enUso === 'ninguna'?'hide':"btn-gamepad btn-c"}>
                        <button
                            onTouchEnd={() => {
                                setTimeout(() => {
                                    /*    setProps('propsAction', 'gravity', true);
                                       setProps('itemsSound', itemsGet.enUso, false); */

                                }, 30);
                            }}
                            onTouchStart={(e) => {
                                disparar()

                            }}> <img src={gunsGet.enUso === 'ninguno' || gunsGet.enUso === 'ninguna' ? `/guns/revolver/img/btn.png` : `/guns/${gunsGet.enUso}/img/btn.png`}
                                alt={`guns-${gunsGet.enUso}-btn`}
                                width={onMobil ? '60px' : '100px'}
                                height={onMobil ? '60px' : '100px'} /></button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default GamePad