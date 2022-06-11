import { CompomentStyle } from "../../../components/iComponents/ObjDfeault"
import PaletaColores from "./paletaColores"
const Index = () => {
  
    return <></>
}
export default Index
export const BorderAdder = ({ props }) => {
    const { setValueBorders= console.log,  borderColorSet = console.log, radiusSet = console.log, borderSet = console.log, compomentStyle = CompomentStyle } = props
    return (<>
        <div>
            Redondeo Actual {compomentStyle.border.radius.value}
            <br />
            <input type="number" min={0} max={50} defaultValue={compomentStyle.border.radius.value}
                onChange={radiusSet} />
            <br />
            Borde {compomentStyle.border.active ? compomentStyle.border.size + ' color ' + compomentStyle.border.color : 'Sin borde'}
            <br />
            <input type="number" min={0} max={5} defaultValue={compomentStyle.border.size}
                onChange={borderSet} />
            <br />
            Color
            <PaletaColores selectColor={borderColorSet} />
        <br />
        <button onClick={(e) => { e.preventDefault(); setValueBorders() }}
                >Salvar</button>
        </div>

    </>)
}