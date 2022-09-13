const InteractiveBotonCanvas = (props) => {
    const { drop = { posX: 0, posY: 0 }, comer = console.log } = props
    return (
        <>
            <div className="interactivebtnCanvas">
                <div className="btn-layer">
                    <button className={`btn-interactivo btn-interactivo-x-${parseInt(drop.posX)} btn-interactivo-y-${parseInt(drop.posY)}`}
                        onClick={(e) => { e.preventDefault; comer() }
                        }>
                        COMER ?
                    </button>
                </div>
            </div>
        </>
    )

}
export default InteractiveBotonCanvas