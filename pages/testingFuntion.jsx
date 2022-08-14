export const TestFunt = (valor) => {


    let res = (valor.cosa3 === '+' ? (valor.cosa1) + (valor.cosa2) : valor.cosa3 === '-' ? (valor.cosa1) - (valor.cosa2) : valor.cosa3 === '*' ? (valor.cosa1) * (valor.cosa2) : (valor.cosa1) / (valor.cosa2))
    console.log(res, 'dentro');
    if (valor.cosa1 === 0 && valor.cosa2 === 0 && valor.cosa3 === '/') {
        return { cosa5: '0 para los normales, los matematicos te pegarían' }
    }
    return { cosa5: res }
}
export default TestFunt