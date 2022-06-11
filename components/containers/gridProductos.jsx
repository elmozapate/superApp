const ProductGrid = ({ props }) => {
    const { array = [] } = props
    return (
        <>
            <div className="gridTemplate">
                {array.map((key,i) => {
                    return (
                        <div id={`product-grid-${i}`} key={`product-grid-${i}`} className="gridCard">
                            <div className="gridPhoto">
                                <img src={key.photo} alt="" />
                            </div>
                            <div className="gridPhotoInfo">
                                <p>{key.name}</p>
                                <p>{key.description}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}
export default ProductGrid
