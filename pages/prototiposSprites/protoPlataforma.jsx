const ProtoPlataforma = async (props = { heightY: 0, widthX: 0, posX: 0, posY: 0 }) => {
    let plataformaProto = []
    for (let index = 0; index < parseInt(props.heightY); index++) {
        for (let index2 = 0; index2 < parseInt(props.widthX); index2++) {
            if (index === 0 || index2 === 0 || (index2 === parseInt(props.widthX) - 1) || (index === parseInt(props.heightY) - 1)) {
                plataformaProto.push({
                    colision: index2 === 0 && index !== 0 && index !== (index === parseInt(props.heightY) - 1) ? 'x-xb' : (index2 === parseInt(props.widthX) - 1) && index !== 0 && index !== (index === parseInt(props.heightY) - 1) ? 'x-xf' : index === 0 ? 'y-xs' : 'y-xd',
                    posX: index2 + props.posX,
                    posY: props.posY + index,
                    id: props.id,
                    heightY: props.heightY,
                    widthX: props.widthX,
                    fatherPosX: props.posX,
                    fatherPosY: props.posY
                })
            }
        }
    }
    return (plataformaProto)

}
export default ProtoPlataforma