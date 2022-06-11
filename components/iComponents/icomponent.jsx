import { ObjContent, CompomentStyle, AlignValues, PaddingValues, BorderValues } from "./ObjDfeault";

const objContent = ObjContent
const IComponent = ({ sectionHelp = -1, errasing = false, deleteComponent = console.log, borderValues = BorderValues, previewMode = false, itemSelected = false, paddingValues = PaddingValues, alignValues = AlignValues, section = false, row = false, compomentStyle = CompomentStyle, contains = objContent, editMode = false, inComponent = false, editReturn = console.log, newtext = console.log, editSectionNumber = -1, styleObjEditIn = console.log, editActive = false, zIndexI = 0, inStage = 0, componentPos = -1 }) => {
    console.log(contains, 'eoeoe');
    return (
        <>
            {
                contains.map((obj, i) => {
                    return (
                        <>
                            {
                                obj.type === 'contenedor' || obj.type === 'elemento' ?
                                    <>
                                        <button
                                            id={`component-${obj.position}`} key={`component-${obj.position}`}
                                            onClick={(e) => { e.preventDefault(); deleteComponent(obj, sectionHelp) }}
                                            className={editMode && errasing ? 'delete' : 'hide'}>Eliminar</button>
                                        <div
                                            onClick={(e) => { e.preventDefault(); obj.position === componentPos ? console.log : obj.stage === inStage + 1 && obj.stage === 2 ? editReturn(obj, i, editSectionNumber, obj.position, true) : inStage !== obj.stage - 2 || inStage < 2 ? console.log('noo') : editReturn(obj, i, editSectionNumber, obj.position, false); }}
                                            className={`relative icomponent bgcolor-${obj.bgColor}${alignValues.gap ? ` Igap-${alignValues.gap}` : ''} 
                                        ${borderValues.active ? ` Iborder-${borderValues.size}-${borderValues.color}` : ''}
                                        ${borderValues.radius.active ? ` IborderRadius-${borderValues.radius.value}` : ''}
                                        ${alignValues.direction ? ` I-${alignValues.direction}` : ''}${alignValues.justify ? ` Ij-${alignValues.justify}` : ''}${alignValues.align ? ` Ia-${alignValues.align}` : ''} ${paddingValues.top ? ` Ipdt-${paddingValues.top}` : ''} ${paddingValues.left ? ` Ipdl-${paddingValues.left}` : ''}${paddingValues.rigth ? ` Ipdr-${paddingValues.rigth}` : ''}${paddingValues.bottom ? ` Ipdb-${paddingValues.bottom}` : ''}   ${row ? `wdt-100 ` : ''} ${obj.especificWidth ? `wdt-${obj.width} ` : ''} ${obj.column ? 'column ' : ''}${previewMode && itemSelected === obj.position ? ' previewBorder' : ''} ${editMode && !obj.childrenContain ? "Ihgt-30" : ''} ${editMode ? !obj.childrenContain ? 'forEdit ' : borderValues.active ? '' : 'borderEdit' : ''} ${obj.aditionalCss ? ' ' : ''} ${obj.width === '50' && editActive ? `hgtI-2 ` : ''} ${obj.width === '33' && editActive ? `hgtI-3 ` : ''} ${obj.position === componentPos ? `zInd-0` : 'zInd-600'} ${obj.aditionalCss ? obj.aditionalCss : ''} ${obj.paddings.top && !paddingValues.top ? ` pdt-${obj.paddings.top}` : ''}${obj.paddings.left && !paddingValues.left ? ` pdl-${obj.paddings.left}` : ''}${obj.paddings.rigth && !paddingValues.rigth ? ` pdr-${obj.paddings.rigth}` : ''}${obj.paddings.bottom && !paddingValues.bottom ? ` pdb-${obj.paddings.bottom}` : ''} ${!borderValues.active && obj.border.active ? ` border-${obj.border.size}-${obj.border.color}` : ''}
                                        ${!borderValues.radius.active && obj.border.radius.active ? ` borderRadius-${obj.border.radius.value}` : ''}${obj.align.direction && !alignValues.direction ? ` n-${obj.align.direction}` : ''}${obj.align.justify && !alignValues.justify ? ` nj-${obj.align.justify}` : ''}${obj.align.gap && !alignValues.gap ? ` ngap-${obj.align.gap}` : ''}  ${obj.align.align && !alignValues.align ? ` na-${obj.align.align}` : ''}  ${obj.margins ? obj.margins : ''} ${inComponent ? '' : ''}`}>

                                            {!obj.childrenContain ? <p className={editMode ? "hoverAdd borderEdit zInd-900" : 'hide'}>+</p> : obj.position === componentPos ? null : (obj.stage === inStage + 1 || obj.stage === inStage + 2) && obj.stage !== 3 ? <p className={editMode ? obj.border.active ? `editHover ${obj.border.radius.active ? ` borderRadius-${obj.border.radius.value}` : ''} border-${obj.border.size}-${obj.border.color} zInd-900 ` : "editHover borderEdit zInd-900" : 'hide'}>Editar</p> : <p className={editMode ? "hide" : 'hide'}>Editar</p>

                                            }

                                            {/*  <div className={ editMode && !obj.children.contain ? `forEdit zInd-${obj.zIndexValue+10}` : `hide`}
                                            onClick={(e) => { e.preventDefault(); editReturn(obj, i, editSectionNumber)  }}
                                        ></div> */}
                                            <IComponent
                                                errasing={errasing}
                                                deleteComponent={deleteComponent}
                                                compomentStyle={compomentStyle}
                                                styleObjEditIn={styleObjEditIn}
                                                inComponent
                                                editReturn={editReturn}
                                                componentPos={componentPos}
                                                inStage={inStage}
                                                zIndexI={zIndexI}
                                                editMode={editMode}
                                                contains={obj.children} />
                                        </div></> :
                                    <>
                                        {
                                            obj.type === 'input' ?
                                                <input
                                                    id={`component-${obj.position}`} key={`component-${obj.position}`}

                                                    onClick={inComponent ?
                                                        (e) => { e.preventDefault(); styleObjEditIn(obj.type, i, inStage, obj.position) } :
                                                        (e) => { e.preventDefault(); console.log }
                                                    }
                                                    placeholder={obj.text}
                                                    className={`icomponent ${borderValues.active ? ` Iborder-${borderValues.size}-${borderValues.color}` : ''}
                                        ${borderValues.radius.active ? ` IborderRadius-${borderValues.radius.value}` : ''}  ${obj.border.radius.active ? ` borderRadius-${obj.border.radius.value}` : ''} border-${obj.border.size}-${obj.border.color}   bgcolor-${obj.bgColor} ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${obj.especificWidth ? `wdt-${obj.width}` : ''} ${inComponent ? 'nopadding' : ''} ${compomentStyle.active ? ` bgcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`}>
                                                </input> : null}
                                        {
                                            obj.type === 'boton' ?
                                                <button
                                                    id={`component-${obj.position}`} key={`component-${obj.position}`}

                                                    onClick={inComponent ?
                                                        (e) => { e.preventDefault(); styleObjEditIn(obj.type, i, inStage, obj.position) } :
                                                        (e) => { e.preventDefault(); console.log }
                                                    }
                                                    className={`icomponent ${borderValues.active ? ` Iborder-${borderValues.size}-${borderValues.color}` : ''}
                                        ${borderValues.radius.active ? ` IborderRadius-${borderValues.radius.value}` : ''}  ${obj.border.radius.active ? ` borderRadius-${obj.border.radius.value}` : ''} border-${obj.border.size}-${obj.border.color}    bgcolor-${obj.bgColor} ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${obj.especificWidth ? `wdt-${obj.width}` : ''} ${inComponent ? 'nopadding' : ''} ${compomentStyle.active ? ` bgcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`}>{obj.text}
                                                </button> : null}
                                        {
                                            obj.type === 'text' ?
                                                <> {compomentStyle.active ?
                                                    <>
                                                        <br />
                                                        <h1>Agrega o elimina el texto</h1>
                                                        <br />
                                                        <textarea
                                                            id={`component-${obj.position}`} key={`component-${obj.position}`}

                                                            onChange={newtext}
                                                            className={` ${borderValues.active ? ` Iborder-${borderValues.size}-${borderValues.color}` : ''}
                                                            ${borderValues.radius.active ? ` IborderRadius-${borderValues.radius.value}` : ''}  ${obj.border.radius.active ? ` borderRadius-${obj.border.radius.value}` : ''} border-${obj.border.size}-${obj.border.color}  ${obj.aditionalCss ? obj.aditionalCss : ''}${` textAreafit  fontSizeI-${compomentStyle.fontSize}`} ${compomentStyle.active ? ` fontcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`} defaultValue={obj.text}></textarea>
                                                        <br />
                                                    </> :
                                                    <p
                                                    id={`component-${obj.position}`} key={`component-${obj.position}`}

                                                        onClick={inComponent ?
                                                            (e) => { e.preventDefault(); styleObjEditIn(obj.type, i, inStage, obj.position) } :
                                                            (e) => { e.preventDefault(); console.log }
                                                        }
                                                        className={`icomponent ${borderValues.active ? ` Iborder-${borderValues.size}-${borderValues.color}` : ''}
                                        ${borderValues.radius.active ? ` IborderRadius-${borderValues.radius.value}` : ''}  ${obj.border.radius.active ? ` borderRadius-${obj.border.radius.value}` : ''} border-${obj.border.size}-${obj.border.color}    ${obj.fontSize ? `fontSize-${obj.fontSize}` : ''}  ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${inComponent ? 'nopadding' : ''} ${compomentStyle.active ? `fontcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`}>
                                                        {obj.text}
                                                    </p>} </> : null}
                                        {obj.type === 'title' ?
                                            <h1
                                            id={`component-${obj.position}`} key={`component-${obj.position}`}

                                                onClick={inComponent ?
                                                    (e) => { e.preventDefault(); styleObjEditIn(obj.type, i, inStage, obj.position) } :
                                                    (e) => { e.preventDefault(); console.log }
                                                }
                                                className={`icomponent ${borderValues.active ? ` Iborder-${borderValues.size}-${borderValues.color}` : ''}
                                        ${borderValues.radius.active ? ` IborderRadius-${borderValues.radius.value}` : ''}  ${obj.border.radius.active ? ` borderRadius-${obj.border.radius.value}` : ''} border-${obj.border.size}-${obj.border.color}   colort-${obj.color} ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${inComponent ? 'nopadding' : ''} ${compomentStyle.active ? ` bgcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`}>
                                                {obj.text}
                                            </h1> : null}
                                        {obj.type === 'img' ?
                                            <img
                                            id={`component-${obj.position}`} key={`component-${obj.position}`}

                                                onClick={inComponent ?
                                                    (e) => { e.preventDefault(); styleObjEditIn(obj.type, i, inStage, obj.position) } :
                                                    (e) => { e.preventDefault(); console.log }
                                                }
                                                src={obj.text} alt="" className={`icomponent ${borderValues.active ? ` Iborder-${borderValues.size}-${borderValues.color}` : ''}
                                        ${borderValues.radius.active ? ` IborderRadius-${borderValues.radius.value}` : ''}  ${obj.border.radius.active ? ` borderRadius-${obj.border.radius.value}` : ''} border-${obj.border.size}-${obj.border.color}   ${obj.especificWidth ? `wdt-${obj.width}` : ''} ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${inComponent ? 'nopadding' : ''} ${compomentStyle.active ? ` bgcolorInedit-${compomentStyle.color} wdtI-${compomentStyle.size}` : ''}`} /> : null}
                                        {obj.type === 'elemento' ?
                                            <div
                                            id={`component-${obj.position}`} key={`component-${obj.position}`}

                                                onClick={inComponent ?
                                                    (e) => { e.preventDefault(); styleObjEditIn(obj.type, i, inStage, obj.position) } :
                                                    (e) => { e.preventDefault(); console.log }
                                                }
                                                className={`icomponent ${borderValues.active ? ` Iborder-${borderValues.size}-${borderValues.color}` : ''}
                                        ${borderValues.radius.active ? ` IborderRadius-${borderValues.radius.value}` : ''}  ${obj.border.radius.active ? ` borderRadius-${obj.border.radius.value}` : ''} border-${obj.border.size}-${obj.border.color}    bgcolor-${obj.bgColor} ${obj.margins ? obj.margins : ''} ${obj.aditionalCss ? obj.aditionalCss : ''} ${obj.especificWidth ? `wdt-${obj.width}  ` : ''} ${inComponent ? 'nopadding' : ''}`}>
                                            </div> : null}
                                    </>
                            }
                        </>
                    )
                })
            }
        </>
    )
}
export default IComponent