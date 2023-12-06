export const EnvM = () => {
    /*
     MODOS  Front/back
    1 => locallocal
    2 => localDev
    3 => Devlocal
    4 => DevDev
     */
    const mode=4  /* COLOCAR EL NUMERO DEL MODO */
    const ambiente = mode === 1 ? 'locallocal' : mode === 2 ? 'localDev' : mode === 3 ? 'Devlocal' : mode === 4 ? 'DevDev' : 'bad'
    const HostBack = ambiente === 'locallocal' ? 'http://localhost:3002/' : ambiente === 'localDev' ? "https://full-bingo.onrender.com/" : ambiente === 'Devlocal' ? 'http://localhost:3002/' : ambiente === 'DevDev' ? "https://full-bingo.onrender.com/" : 'bad'
    const HostBackEnd = ambiente === 'locallocal' ? 'http://localhost:3001' : ambiente === 'localDev' ? "https://serverproto.herokuapp.com" : ambiente === 'Devlocal' ? 'http://localhost:3001' : ambiente === 'DevDev' ? "https://serverproto.herokuapp.com" : 'bad'
    const HostFront = ambiente === 'locallocal' ? 'http://localhost:3000/' : ambiente === 'localDev' ? 'http://localhost:3000/' : ambiente === 'Devlocal' ? 'https://super-app-liard.vercel.app/' : ambiente === 'DevDev' ? "https://super-app-liard.vercel.app/" : 'bad'
    const envMachete = {
        hostBack: HostBack,
        hostFront: HostFront,
        hostBackProto:HostBackEnd
    }
    return envMachete
}
