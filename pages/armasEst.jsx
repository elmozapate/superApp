export const armasEst = (caso) => {
    switch (caso) {
        case 'bat':
            return {
                onHit: false,
                damage: 10,
                type: 'strike',
                speed: 1,
                state: false,
                fotograma: 0,
                layer: 0,
                onEnd: false,
            }
        case 'otroBat':
            return {
                onHit: false,
                damage: 25,
                type: 'strike',
                speed: 1,
                state: false,
                fotograma: 0,
                layer: 0,
                onEnd: false,
            }
        case 'desArmado':
            return {
                onHit: false,
                damage: 2,
                type: 'strike',
                speed: 1,
                state: false,
                fotograma: 0,
                layer: 0,
                onEnd: false,
            }
        case 'lata':
            return {
                onHit: false,
                damage: 5,
                type: 'strike',
                speed: 1,
                state: false,
                fotograma: 0,
                layer: 0,
                onEnd: false,
            }
        default:
            return false;
    }
}
export default armasEst