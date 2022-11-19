const ChargingItems = () => {
    const aCargar = {
        imagenes: {
            armas: [{ estructura: [{ nombre: 'xf', sprites: 14 }, { nombre: 'xb', sprites: 14 }], nombre: 'desArmado' }, { estructura: [{ nombre: 'xf', sprites: 14 }, { nombre: 'xb', sprites: 14 }], nombre: 'bat' }, { estructura: [{ nombre: 'xf', sprites: 14 }, { nombre: 'xb', sprites: 14 }], nombre: 'lata' }, { estructura: [{ nombre: 'xf', sprites: 14 }, { nombre: 'xb', sprites: 14 }], nombre: 'lata' }, { estructura: [{ nombre: 'xf', sprites: 14 }, { nombre: 'xb', sprites: 14 }], nombre: 'otroBat' }],
            items: ['jetpack', 'patineta'],
            guns: [],
            powerUps: ['inmortal', 'fumado'],
            proyectiles: ['bebe', 'bala'],
            enemigos: ['joshi'],
            acciones: ['die', 'eat'],
            efectos: ['rata',],
            player: ['body',],
            obstaculos: ['obstaculos']
        },
        sonidos: {
            sfx: [],
            music: []
        },
    }
    return (<>
    </>)
}
const devolver = () => {
    let aDevolver = [{ nombre: 'itemsSound_0', tipo: 'sfx', url: ('/items/jetPack/sound.mp3') }, { nombre: 'itemsSound_1', tipo: 'sfx', url: ('/items/patineta/sound.mp3') }, { nombre: 'yaWey', tipo: 'sfx', url: ('/audio/yaWey.mp3') }, { nombre: 'portraitAudio', tipo: 'sfx', url: ('/audio/portrait.mp3') }, { nombre: 'llantobebe', tipo: 'sfx', url: ('/audio/bebe-1.mp3') }, { nombre: 'joshisound', tipo: 'sfx', url: ('/audio/joshi-0.mp3') }, { nombre: 'joshisound2', tipo: 'sfx', url: ('/audio/joshi-1.mp3') }, { nombre: 'balaSound', tipo: 'sfx', url: ('/audio/bala.mp3') }, { nombre: 'pow', tipo: 'sfx', url: ('/audio/pow-0.mp3') }, { nombre: 'sierra', tipo: 'sfx', url: ('/audio/sierra.mp3') }, { nombre: 'dolor', tipo: 'sfx', url: ('/audio/dolor.mp3') }, { nombre: 'risabebe', tipo: 'sfx', url: ('/audio/bebe-0.mp3') }, { nombre: 'muertebebe', tipo: 'sfx', url: ('/audio/bebe-2.mp3') }, { nombre: 'pass', tipo: 'sfx', url: ('/audio/pass.mp3') }, { nombre: 'jump', tipo: 'sfx', url: ('/audio/jump.mp3') }, { nombre: 'onHitSound', tipo: 'sfx', url: ('/audio/onHit.mp3') }, { tipo: 'sfx', url: '/audio/joshi-1.mp3', nombre: 'joshisound3_0' }, { tipo: 'sfx', url: '/audio/joshi-1.mp3', nombre: 'joshisound3_1' }, { tipo: 'sfx', url: '/audio/joshi-2.mp3', nombre: 'joshisound3_2' }, { tipo: 'sfx', url: '/audio/joshi-3.mp3', nombre: 'joshisound3_3' }, { tipo: 'sfx', url: '/audio/joshi-4.mp3', nombre: 'joshisound3_4' }, { tipo: 'sfx', url: '/armas/bat/audio/hit-0.mp3', nombre: 'WeaponAudio_0' }, { tipo: 'sfx', url: '/armas/bat/audio/hit-1.mp3', nombre: 'WeaponAudio_1' }];
    const soundDatas = ['bat', 'otroBat', 'desArmado', 'lata']
    soundDatas.map((key, i) => {
        for (let index = 0; index < 3; index++) {
            const element = { tipo: 'armas', url: (`/armas/${key}/audio/hit-${index}.mp3`), nombre: `${key}_${index}` };
            aDevolver.push(element)
        }

    })
    console.log(aDevolver.length);
    return aDevolver

}
const devuellto = devolver()
export const aCargar2 = {
    imagenes: {
        body: [{ estructura: [{ nombre: 'body', sprites: 1 }], tipo: 'body', nombre: 'desArmado' },
        { estructura: [{ nombre: 'body', sprites: 1 }], tipo: 'body', nombre: 'bat' },
        { estructura: [{ nombre: 'body', sprites: 1 }], tipo: 'body', nombre: 'lata' },
        { estructura: [{ nombre: 'body', sprites: 1 }], tipo: 'body', nombre: 'otroBat' },],
        armas: [{ estructura: [{ nombre: 'xf', sprites: 14 }, { nombre: 'xb', sprites: 14 }], nombre: 'desArmado' }, { estructura: [{ nombre: 'xf', sprites: 14 }, { nombre: 'xb', sprites: 14 }], nombre: 'bat' }, { estructura: [{ nombre: 'xf', sprites: 14 }, { nombre: 'xb', sprites: 14 }], nombre: 'lata' }, { estructura: [{ nombre: 'xf', sprites: 14 }, { nombre: 'xb', sprites: 14 }], nombre: 'otroBat' }],
        items: [{ nombre: 'patineta', tipo: 'on', estructura: [{ nombre: 'xb', sprites: 2 }, { nombre: 'xf', sprites: 2 }, { nombre: 'xs', sprites: 2 }] }, { nombre: 'patineta', tipo: 'off', estructura: [{ nombre: 'xb', sprites: 1 }, { nombre: 'xf', sprites: 1 }, { nombre: 'xs', sprites: 1 }] }, { nombre: 'jetPack', tipo: 'on', estructura: [{ nombre: 'xb', sprites: 2 }, { nombre: 'xf', sprites: 2 }, { nombre: 'xs', sprites: 2 }] }, { nombre: 'jetPack', tipo: 'off', estructura: [{ nombre: 'xb', sprites: 1 }, { nombre: 'xf', sprites: 1 }, { nombre: 'xs', sprites: 1 }] }, { nombre: 'botas', tipo: 'on', estructura: [{ nombre: 'xb', sprites: 2 }, { nombre: 'xf', sprites: 2 }, { nombre: 'xs', sprites: 2 }] }, { nombre: 'botas', tipo: 'off', estructura: [{ nombre: 'xb', sprites: 1 }, { nombre: 'xf', sprites: 1 }, { nombre: 'xs', sprites: 1 }] }],
        /*  guns: [{ nombre: 'bebe', tipo: 'bebe', estructura: [{ nombre: 'xb', sprites: 1 }, { nombre: 'xf', sprites: 1 }] }, { nombre: 'bala', tipo: 'bala', estructura: [{ nombre: 'xb', sprites: 1 }, { nombre: 'xf', sprites: 1 }] }], */
        powerUps: [{ nombre: 'inmortal', tipo: 'body', estructura: [{ nombre: 'ki', sprites: 2 }, { nombre: 'xb', sprites: 2 }, { nombre: 'xf', sprites: 2 }] }, { nombre: 'fumado', tipo: 'body', estructura: [{ nombre: 'xb', sprites: 1 }, { nombre: 'xf', sprites: 1 }, { nombre: 'xs', sprites: 1 }] }],
        proyectiles: [{ nombre: 'bebe', tipo: 'malos', estructura: [{ nombre: 'xb', sprites: 1 }, { nombre: 'xf', sprites: 1 }] }, { nombre: 'bala', tipo: 'balas', estructura: [{ nombre: 'xb', sprites: 1 }, { nombre: 'xf', sprites: 1 }] }],
        onHit: [{ nombre: 'rata', tipo: 'onHit', estructura: [{ nombre: 'xb', sprites: 5 }, { nombre: 'xf', sprites: 5 }] }],
        kills: [{ nombre: 'explocion', tipo: 'explocion', estructura: [{ nombre: 'xf', sprites: 1 }] }],
        onHit: [{ nombre: 'rata', tipo: 'onHit', estructura: [{ nombre: 'xb', sprites: 5 }, { nombre: 'xf', sprites: 5 }] }],
        enemigos: [{ tipo: 'joshi', nombre: 'joshi', estructura: [{ nombre: 'xf', sprites: 1 }, { nombre: 'xb', sprites: 1 }, { nombre: 'xs', sprites: 1 }] }, { tipo: 'die', nombre: 'joshi', estructura: [{ nombre: 'xf', sprites: 1 }, { nombre: 'xb', sprites: 1 }] }, { tipo: 'spirit', nombre: 'joshi', estructura: [{ nombre: 'xf', sprites: 1 }, { nombre: 'xb', sprites: 1 }] }, { tipo: 'hit', nombre: 'joshi', estructura: [{ nombre: 'xf', sprites: 1 }, { nombre: 'xb', sprites: 1 }] }, { tipo: 'evil', nombre: 'joshi', estructura: [{ nombre: 'xf', sprites: 5 }, { nombre: 'xb', sprites: 5 }] }, { tipo: 'onHit', nombre: 'joshi', estructura: [{ nombre: 'xf', sprites: 5 }, { nombre: 'xb', sprites: 5 }] }],
        acciones: [{ nombre: 'die', estructura: [{ nombre: 'xf', sprites: 1 }, { nombre: 'xb', sprites: 1 }] }, { nombre: 'eat', estructura: [{ nombre: 'xf', sprites: 4 }, { nombre: 'xb', sprites: 4 }] }, { nombre: 'cuted', estructura: [{ nombre: 'xf', sprites: 4 }, { nombre: 'xb', sprites: 4 }] }],
        player: [{ nombre: 'body', tipo: 'body', estructura: [{ nombre: 'xs', sprites: 4 }, { nombre: 'ki', sprites: 2 }, { nombre: 'xf', sprites: 4 }, { nombre: 'xb', sprites: 4 }, { nombre: 'xj', sprites: 4 }, { nombre: 'xd', sprites: 4 }] }],
        obstaculos: [{ nombre: 'obstaculos',tipo: 'obstaculos', estructura: [{ nombre: 'obst-0', sprites: 1 }, { nombre: 'obst-1', sprites: 1 }, { nombre: 'sangre', sprites: 1 }, { nombre: 'obst-0-onHit', sprites: 1 }] }]
    },
    sonidos: {
        sfx: devuellto,
        music: []
    },
}
export default ChargingItems
export const charguingItemEstructura = {
    Init:{ load: true, restart: false, key: {} },
    sfxToCharge: { load: true, restart: false, key: {} },
    armasToCharge: { load: true, restart: false, key: {} },
    armasToCharge: { load: true, restart: false, key: {} },
    bodyToCharge: { load: true, restart: false, key: {} },
    playerToCharge: { load: true, restart: false, key: {} },
    enemigosToCharge: { load: true, restart: false, key: {} },
    proyectilesToCharge: { load: true, restart: false, key: {} },
    onHitToCharge: { load: true, restart: false, key: {} },
    killsToCharge: { load: true, restart: false, key: {} },
    accionesToCharge: { load: true, restart: false, key: {} },
    powerUpsToCharge: { load: true, restart: false, key: {} },
    itemsToCharge: { load: true, restart: false, key: {} },
    obstaculosToCharge: { load: true, restart: false, key: {} }
}
export const charguingItemEstructuraFalse = {
    Init:{ load: false, restart: true, key: {} },
    sfxToCharge: { load: false, restart: false, key: {} },
    armasToCharge: { load: false, restart: false, key: {} },
    armasToCharge: { load: false, restart: false, key: {} },
    bodyToCharge: { load: false, restart: false, key: {} },
    playerToCharge: { load: false, restart: false, key: {} },
    enemigosToCharge: { load: false, restart: false, key: {} },
    proyectilesToCharge: { load: false, restart: false, key: {} },
    onHitToCharge: { load: false, restart: false, key: {} },
    killsToCharge: { load: false, restart: false, key: {} },
    accionesToCharge: { load: false, restart: false, key: {} },
    powerUpsToCharge: { load: false, restart: false, key: {} },
    itemsToCharge: { load: false, restart: false, key: {} },
    obstaculosToCharge: { load: false, restart: false, key: {} }
}

/* 
 */

