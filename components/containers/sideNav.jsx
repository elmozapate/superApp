import { useState } from "react"
const SideNav = ({ props }) => {
    const { changeSize = console.log,classN = 'seccionesLi', funtions = console.log,funtions2= console.log, sections = [], imgSrc = '',
        navColor = 'blanco' } = props
    const [size, setSize] = useState('sideNavBar')
    let seccionesArray = [] 
        seccionesArray = sections.secciones ||{ secciones: [] }
    const close = () => {
        changeSize()
        size === 'sideNavBar' ? setSize('sideNavClose') : setSize('sideNavBar')


    }
    return (
        <div className={`${size} ${size === 'sideNavBar' ? navColor : 'transparente'}`}>
            <img src={`/img/btn-home.png`}
                alt=""
                className={` ${size === 'sideNavBar' ? 'btn-home' : 'btn-home-close'}`}
                width={'50px'}
                onClick={(e) => { e.preventDefault(); close() }}
            />
            {
                imgSrc !== '' ? <img className={size === 'sideNavBar' ? '' : 'hide'} src={imgSrc} alt="" width={'50px'} /> : null
            }
            <li className={size === 'sideNavBar' ? "lasSecciones" : 'hide'}>Menú</li>
            <div className={size === 'sideNavBar' ? "lasSecciones" : 'hide'}>
                {seccionesArray.map((key, i) => {
                    return <li id={`sidenav-li-${i}`} key={`sidenav-li-${i}`}
                        className={size === 'sideNavBar' ? classN : 'hide'}
                        onClick={(e) => { e.preventDefault(); funtions2(e,i) }}
                    >
                        {key.name}
                    </li>
                })}
            </div>
        </div>
    )
}
export default SideNav