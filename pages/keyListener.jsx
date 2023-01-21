const KeyListener = (document) => {
    document.addEventListener('keydown', async (event) => {
        event.preventDefault();
        let keyValue = event.key;
        console.log('keydown',keyValue);
        /* 
        
        if (keyValue === 'ArrowUp') {
            if (!armas[armasGet.enUso].state) {
                armas[armasGet.enUso].state = true
            }
        }
        if (keyValue === 'j') {
            setObject('items-jetPack', itemsGet.enUso === 'jetPack' ? false : true, 'items', 'key')
            refreshValue()

        }
        if (keyValue === 'k') {
            setObject('items-patineta', itemsGet.enUso === 'patineta' ? false : true, 'items', 'key')
            refreshValue()

        }
        if (keyValue === 'g') {
            if (!inShot) {
                inShot = true
                disparar()
                setTimeout(() => {
                    inShot = false
                }, 300);
            }


        }
        if (keyValue === '1' || keyValue === '2' || keyValue === '3' || keyValue === '4') {
            switch (keyValue) {
                case '1':
                    setObject(`armas-desArmado`, armasGet.enUso === 'desArmado' ? false : true, 'items', 'key')
                    break;
                case '2':
                    setObject(`armas-bat`, armasGet.enUso === 'bat' ? false : true, 'items', 'key')
                    break;
                case '3':
                    setObject(`armas-otroBat`, armasGet.enUso === 'otroBat' ? false : true, 'items', 'key')
                    break;
                case '4':
                    setObject(`armas-lata`, armasGet.enUso === 'lata' ? false : true, 'items', 'key')
                    break;

                default:
                    break;
            }

            refreshValue()

        }
        if (keyValue === 'm') {
            if (!muted) {
                muted = true
                efectVolumen(false, 'mute')
                volumenSet('mute')
            }
            else {
                muted = false

                efectVolumen(false, '+')
                volumenSet('+')

            }

        }
        if (keyValue === '+') {
            if (!soundToch) {
                soundToch = true
                if (soundLevels.sfx < 10) {
                    efectVolumen(false, '+', true)
                }
                if (soundLevels.music < 10) {
                    volumenSet('+', true)
                }
            }
        }
        if (keyValue === '-') {
            if (!soundToch) {
                soundToch = true
                if (soundLevels.sfx > 0) {
                    efectVolumen(false, '-', true)
                }
                if (soundLevels.music > 0) {
                    volumenSet('-', true)
                }
            }
        }
        if (keyValue === 'p') {
            if (!inPausetouch) {
                inPausetouch = true
                inPause = !inPause
                setProps('imagenes', 'onMove', !inPause);
                setmenuActive(inPause)
            }

        }
        if (keyValue === 's') {
            setObject('powerUps-inmortal', propsImage.items[0].health.estado !== 'normal' ? 'normal' : 'inmortal', 'powerUps', 'key')
            refreshValue()

        }
        if (keyValue === 'w') {
            setObject('powerUps-fumado', propsAction.strikeLevel === 1 ? 'normal' : 'fumado', 'powerUps', 'key')
            refreshValue()

        }
        if (keyValue === 'e') {

            if (propsAction.onDrop) {
                try {
                    propsAction.eating = propsAction.eating ? false : true
                } catch (error) {
                    console.log(error);
                }
            }

        }
        if (keyValue === 'ArrowDown') {
            mxActive = true
            mxDirection = {
                ...mxDirection,
                left: false,
                right: false
            }
            propsImage = {
                ...propsImage,
                direccion: 'xd',
            }
            propsAction = {
                ...propsAction,
                gravityLevel: 2.5,
            }
        }
        if (keyValue === 'ArrowRight' && !mxActive && !mxDirection.left) {
            if (itemsGet.enUso === 'patineta' && charged) {
                sfxObject.itemsSound[1].play()
            }
            mxActive = true
            mxDirection = {
                ...mxDirection,
                left: false,
                right: true
            }
            propsImage = {
                ...propsImage,
                direccion: 'xf',
            }
            lastDireccion = 'xf'
            dibujarMouseOn('+', true)
        } else {
            if ((keyValue === 'ArrowRight' && mxActive)) {
                if (itemsGet.enUso === 'patineta') {
                    sfxObject.itemsSound[1].play()
                }
                propsImage = {
                    ...propsImage,
                    direccion: 'xf',
                }
                lastDireccion = 'xf'
                mxDirection = {
                    ...mxDirection,
                    left: false,
                    right: true
                }
            } else
                if ((keyValue === 'ArrowRight' && mxActive && mxDirection.left)) {
                    if (itemsGet.enUso === 'patineta' && charged) {
                        sfxObject.itemsSound[1].play()
                    }
                    propsImage = {
                        ...propsImage,
                        direccion: 'xf',
                    }

                    lastDireccion = 'xf'
                    mxDirection = {
                        ...mxDirection,
                        left: false,
                        right: true
                    }
                }
        }
        if (keyValue === 'ArrowLeft' && !mxActive) {
            if (itemsGet.enUso === 'patineta' && charged) {
                sfxObject.itemsSound[1].play()
            }
            mxActive = true
            dibujarMouseOn('-', true)
            propsImage = {
                ...propsImage,
                direccion: 'xb',
            }
            lastDireccion = 'xb'
        } else {
            if ((keyValue === 'ArrowLeft' && mxActive)) {
                if (itemsGet.enUso === 'patineta' && charged) {
                    sfxObject.itemsSound[1].play()
                }
                propsImage = {
                    ...propsImage,
                    direccion: 'xb',
                }
                lastDireccion = 'xb'
                mxDirection = {
                    ...mxDirection,
                    left: true,
                    right: false
                }
            } else
                if ((keyValue === 'ArrowLeft' && mxActive && mxDirection.left)) {
                    if (itemsGet.enUso === 'patineta' && charged) {
                        sfxObject.itemsSound[1].play()
                    }
                    propsImage = {
                        ...propsImage,
                        direccion: 'xb',

                    }
                    lastDireccion = 'xb'
                    mxDirection = {
                        ...mxDirection,
                        left: true,
                        right: false
                    }
                }
        }
        if (keyValue === ' ' && !myActive) {
            if (itemsGet.enUso === 'jetPack') {
                actualFloorLimit.y = mapFloor
                actualFloorLimit.state = false
                propsAction.jumping = true
                propsAction.onPlataform = false
                actualFloor = mapFloor
            }
            myActive = true
            brincar()
        }
    */ }, false);
    document.addEventListener('keyup', (event) => {
        event.preventDefault();
        let keyValue = event.key;
        console.log('keyup',keyValue);
        /* 
        event.preventDefault()
        let keyValue = event.key;
        if (keyValue === 'p') {
            if (inPausetouch) {
                inPausetouch = false
            }

        }
        if (keyValue === '+') {
            if (soundToch) {
                soundToch = false
            }
        }
        if (keyValue === '-') {
            if (soundToch) {
                soundToch = false
            }
        }
        if (keyValue === 'g') {
            sfxObject.balaSound.volume = 0
        }
        if (keyValue === ' ') {
            if (itemsGet.enUso === 'jetPack' && charged) {
                actualFloorLimit.y = mapFloor
                actualFloorLimit.state = false
                propsAction.gravity = true
                propsAction.jumping = true
                propsAction.onPlataform = false
                sfxObject.itemsSound[0].pause()
                myActive = false

            }

        } else {
            if (mxActive && (keyValue === 'ArrowLeft' || keyValue === 'ArrowRight' || keyValue === 'ArrowDown')) {
                if (itemsGet.enUso === 'patineta' && charged) {
                    sfxObject.itemsSound[1].pause()
                }
                if (keyValue === 'ArrowDown') {
                    propsImage = {
                        ...propsImage,
                        direccion: 'xs'
                    }
                    mxDirection = {
                        ...mxDirection,
                        left: false,
                        right: false
                    }
                    mxActive = false
                    propsAction = {
                        ...propsAction,
                        gravityLevel: 1.10,
                    }
                }
                if ((!mxDirection.right && keyValue === 'ArrowLeft')) {
                    mxActive = false
                    propsImage = {
                        ...propsImage,
                        direccion: 'xs'
                    }
                    mxDirection = {
                        ...mxDirection,
                        left: false,
                        right: false
                    }
                    mxActive = false
                }
                if ((!mxDirection.left && keyValue === 'ArrowRight')) {
                    mxActive = false
                    propsImage = {
                        ...propsImage,
                        direccion: 'xs'
                    }
                    mxDirection = {
                        ...mxDirection,
                        left: false,
                        right: false
                    }
                    mxActive = false
                }
                if ((mxDirection.right && keyValue === 'ArrowLeft')) {
                    propsImage = {
                        ...propsImage,
                        direccion: 'xf',
                    }
                    mxDirection = {
                        ...mxDirection,
                        left: false,
                        right: true
                    }
                }
                if ((mxDirection.left && keyValue === 'ArrowRight')) {
                    propsImage = {
                        ...propsImage,
                        direccion: 'xb',
                        lastDireccion: 'xb'
                    }
                    mxDirection = {
                        ...mxDirection,
                        left: true,
                        right: false
                    }
                }
                else if ((mxDirection.left && keyValue === 'ArrowRight')) {
                    propsImage = {
                        ...propsImage,
                        direccion: 'xb',
                    }
                    mxDirection = {
                        ...mxDirection,
                        left: true,
                        right: false
                    }
                }
            }
        }
     */}, false);
}
export default KeyListener