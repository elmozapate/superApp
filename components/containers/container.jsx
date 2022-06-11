import BtnComp from "../commons/btn";
import HeadTitle from "./headTitle";
import Secciones from "./sections";
import SideNav from "./sideNav";
import { useState } from "react";

const Container = ({ props }) => {
    const { arrayIN = [], classN = 'blanco', title = '',
        dispocition = '', chidren = '', funtions = console.log,
        sideNavImg = '', sideNavfuntions = console.log,
        titleSectionColor = 'blanco', positionIn = NaN
    } = props
    const [sectionNumber, setsectionNumber] = useState(0)
    const [size, setSize] = useState(false)
    const changeSection = (e, i) => {
        setsectionNumber(i)
    }
    const changeSize = () => {
        setSize(!size)
    }
    return (
        <>
            <div className={classN}>
                <SideNav props={
                    {
                        sections: arrayIN,
                        classN: 'sidenav',
                        changeSize: changeSize,
                        funtions: (e) => {
                            e.preventDefault();
                            sideNavfuntions(e)
                        },
                        funtions2: (e, i) => {
                            e.preventDefault();
                            changeSection(e, i)
                        },
                        imgSrc: { sideNavImg }
                    }
                } />
                <HeadTitle props={{
                    pageName: title,
                    imgSrc: arrayIN,
                    classN: 'barraTitulo ' + titleSectionColor
                }} />
                <BtnComp
                    props={{
                        funtions: (e) => {
                            e.preventDefault();
                            funtions(e)
                        },
                        classN: 'btn-logout',
                        text: 'Volver'
                    }}>
                </BtnComp>
                <Secciones props={{
                    changeSize: size,
                    title: sectionNumber !== NaN && arrayIN.secciones.length !== 0 ? arrayIN.secciones[sectionNumber].name : 'Inicio',
                    description: sectionNumber !== NaN && arrayIN.secciones.length !== 0 ? arrayIN.secciones[sectionNumber].description : 'mo hay nada',
                    sales: sectionNumber !== NaN && arrayIN.secciones.length !== 0 ? arrayIN.secciones[sectionNumber].sales : false,
                    salesArray: sectionNumber !== NaN && arrayIN.secciones.length !== 0 && arrayIN.secciones[sectionNumber].sales ? arrayIN.secciones[sectionNumber].products : [],
                    content: sectionNumber !== NaN && arrayIN.secciones.length !== 0 ? arrayIN.secciones[sectionNumber].content : false,
                    objContent: sectionNumber !== NaN && arrayIN.secciones.length !== 0 && arrayIN.secciones[sectionNumber].content ? arrayIN.secciones[sectionNumber].objContent : {}
                }} />
            </div>
        </>
    )

}
export default Container