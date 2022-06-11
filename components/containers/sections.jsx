import IComponent from "../iComponents/icomponent"
import ProductGrid from "./gridProductos"

const Secciones = ({ props }) => {
    const { changeSize = false, title = '', description = '', sales = false, salesArray = [], content = false, objContent = [] } = props
    if (sales) {
        return (
            <>
                <ProductGrid props={
                    {
                        array: salesArray
                    }
                } />
            </>
        )
    }
    return (
        <>
            <div className={changeSize ? "seccion-pagfull pt-50" : "seccion-pag pt-50"}>
                <div className="topFill"></div>
                {/* <h1>{title}</h1>
                <p>{description}</p> */}
                <>
                    {
                        content ?
                            <IComponent contains={objContent} /> : null
                    }
                </>

            </div>
        </>
    )
}
export default Secciones