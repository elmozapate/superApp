export const ClassAdds = (obj, alignValues, editMode, row, inComponent, componentPos, compomentStyle, editActive) => {
    const Classes = `relative icomponent bgcolor-${obj.bgColor}${alignValues.direction ? ` I-${alignValues.direction}` : ''}${alignValues.justify ? ` Ij-${alignValues.justify}` : ''}${alignValues.align ? ` Ia-${alignValues.align}` : ''} ${row ? ` wdt-100` : ''} ${obj.especificWidth ? ` wdt-${obj.width}` : ''} ${obj.column ? ` column` : ''} ${editMode ? !obj.childrenContain ? ' forEdit' : ` borderEdit` : ''} ${obj.aditionalCss ? ' ' : ''} ${obj.width === '50' && editActive ? ` hgtI-2 ` : ''} ${obj.width === '33' && editActive ? ` hgtI-3` : ''} ${obj.position === componentPos ? ` zInd-0` : ' zInd-600'} ${obj.aditionalCss ? obj.aditionalCss : ''}  ${obj.align.direction && !alignValues.direction ? ` n-${obj.align.direction}` : ''}${obj.align.justify && !alignValues.justify ? ` nj-${obj.align.justify}` : ''}  ${obj.align.align && !alignValues.align ? ` na-${obj.align.align}` : ''}  ${obj.margins ? obj.margins : ''} ${/* inComponent ? 'nopadding' : '' */''}`
    return Classes
}

const InputClasses = ({ props }) => {
    const { obj, alignValues, editMode, row, inComponent, componentPos, compomentStyle, editActive } = props
    let a = (`icomponent bgcolor-${obj.bgColor} ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${obj.especificWidth ? `wdt-${obj.width}` : ''} ${inComponent ? 'nopadding' : ''} ${compomentStyle.active ? ` bgcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`)

    return <>{a}</>
}
export default InputClasses
export const ButtonClasses = (obj, alignValues, editMode, row, inComponent, componentPos, compomentStyle, editActive) => {
    const Classes = `icomponent bgcolor-${obj.bgColor} ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${obj.especificWidth ? `wdt-${obj.width}` : ''} ${inComponent ? 'nopadding' : ''} ${compomentStyle.active ? ` bgcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`
    return Classes
}


export const TextAreaClasses = (obj, alignValues, editMode, row, inComponent, componentPos, compomentStyle, editActive) => {
    const Classes = `${obj.aditionalCss ? obj.aditionalCss : ''}${` textAreafit  fontSizeI-${compomentStyle.fontSize}`} ${compomentStyle.active ? ` fontcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`
    return Classes
}


export const TextClasses = (obj, alignValues, editMode, row, inComponent, componentPos, compomentStyle, editActive) => {
    const Classes = `icomponent  ${obj.fontSize ? `fontSize-${obj.fontSize}` : ''}  ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${inComponent ? 'nopadding' : ''} ${compomentStyle.active ? `fontcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`
    return Classes
}



export const TittleClasses = (obj, alignValues, editMode, row, inComponent, componentPos, compomentStyle, editActive) => {
    const Classes = `icomponent colort-${obj.color} ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${inComponent ? 'nopadding' : ''} ${compomentStyle.active ? ` bgcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`
}


export const ImgClasses = (obj, alignValues, editMode, row, inComponent, componentPos, compomentStyle, editActive) => {
    const Classes = `icomponent ${obj.especificWidth ? `wdt-${obj.width}` : ''} ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${inComponent ? 'nopadding' : ''} ${compomentStyle.active ? ` bgcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`
}


export const ElementClasses = (obj, alignValues, editMode, row, inComponent, componentPos, compomentStyle, editActive) => { `icomponent  bgcolor-${obj.bgColor} ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${obj.especificWidth ? `wdt-${obj.width}  ` : ''} ${inComponent ? 'nopadding' : ''}` }