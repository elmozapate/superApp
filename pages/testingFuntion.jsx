export const TestFunt = (valor) => {


    let res = (valor.cosa3 === '+' ? (valor.cosa1) + (valor.cosa2) : valor.cosa3 === '-' ? (valor.cosa1) - (valor.cosa2) : valor.cosa3 === '*' ? (valor.cosa1) * (valor.cosa2) : (valor.cosa1) / (valor.cosa2))
    console.log(res, 'dentro');
    if (valor.cosa1 === 0 && valor.cosa2 === 0 && valor.cosa3 === '/') {
        return { cosa5: '0 para los normales, los matematicos te pegarían' }
    }
    return { cosa5: res }
}
export const TestFunt2 = (valor = [{
    name: '',
    value: 0,
    type: 'number'
}]) => {
    let res
    valor.map((key, i) => {
        res = {
            ...res,
            ...valor,
            [key.name]: (key.value)
        }

        return
    })
    valor.map((key, i) => {
        if (key.type === 'funtion' && key.setFuntion) {
            console.log(res);
            res = {
                ...res,
                [`setFuntion${key.name}`]: (key.setFuntion)
            }

        }

        return
    })
    valor.map((key, i) => {
        if (key.type === 'funtion' && key.usage === 'log') {

            res[key.name](key.intoContain.map((key) => { return key }))

        }
        if (key.type === 'funtion' && key.usage === 'setConst') {
            console.log(res[key.name], res[key.intoContain[0]], res[key.intoContain[1]]);/* res[key.intoContain[0]],res[key.intoContain[1]] */
            /*             res[key.name](res.setFuntion())
             */
            const forGO = res[`setFuntion${key.name}`](key.intoContain.map((key) => { return res[key] }))
            console.log(forGO, 'goooooooooooooooooo');
            key.value([forGO])
        }

        return
    })
    return {  res }
}
export default TestFunt