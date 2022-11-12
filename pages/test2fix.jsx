const dibujar = async (  value) => {
    requestAnimationFrame(dibujar)
    console.log('entra- ', enen);
    enen = enen + 1
    if (colisioned.state) {
        if (colisioned.result === 'die') {
            let itsMalo = false
            let indexHere = 0
            let position = { malo: 0, body: 0 }
            dibujarMalos.new.map((key, i) => {
                if (colisioned.item === key.id) {
                    key.imagen.map((key2, ia) => {
                        if (key2.direccion === `joshi-evil-${key.posX < propsImage.items[0].posX ? 'xf' : 'xb'}-${key.killLayer}`) {
                            itsMalo = true
                            indexHere = i
                            position.malo = ia;
                            dibujarMalos.new[i].killFotograma = dibujarMalos.new[i].killFotograma + 1;
                            if (dibujarMalos.new[i].killFotograma === 30) {
                                dibujarMalos.new[i].killLayer = dibujarMalos.new[i].killLayer + 1
                                dibujarMalos.new[i].killFotograma = 0
                            }
                            if (dibujarMalos.new[i].killLayer === 4) {
                                dibujarMalos.new[i].killLayer = 1
                            }
                        }
                    })
                }
            })
            if (itsMalo) {
                ctxE.drawImage(dibujarMalos.new[indexHere].imagen[position.malo].imagen, dibujarMalos.new[indexHere].posX, dibujarMalos.new[indexHere].posY - 2, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalWidth / 22, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalHeight / 27)
                let aDibujar = propsImage.imagen[`${dibujarMalos.new[indexHere].posX > propsImage.items[0].posX ? 'xb' : 'xf'}_die`]
                ctxC.drawImage(aDibujar, dibujarMalos.new[indexHere].posX < propsImage.items[0].posX ? dibujarMalos.new[indexHere].posX + dibujarMalos.new[indexHere].widthX - 5 : dibujarMalos.new[indexHere].posX - propsImage.widthX + 5, dibujarMalos.new[indexHere].posY, propsImage.widthX, parseInt(propsImage.heightY))

                /*   setTimeout(() => {
                      ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                      ctxC.clearRect(0, 0, canvas.width, canvas.height)
                      dibujar('go', propsImage)

                  }, 5); */

            } else {
                let isProy = false
                let proy = 'no es proyectil'
                proyectiles.map((key, i) => {
                    if (colisioned.item === key.id) {
                        proy = key
                        isProy = true
                    }
                })
                if (isProy) {
                    /*  setTimeout(() => {
                         
                         ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                         ctxC.clearRect(0, 0, canvas.width, canvas.height)
                         dibujar('go', propsImage)
                     }, 5); */
                } else {
                    let posObst = 0
                    let isObst = false
                    let obstacule = 'no es obstaculo'
                    levelFalses.map((key, i) => {
                        if (colisioned.item === key.id) {
                            obstacule = key
                            posObst = i
                            isObst = true
                        }
                    })
                    if (isObst) {
                        if (levelFalses[posObst].fotograma === 7) {
                            if (levelFalses[posObst].killLayer < 3) {
                                levelFalses[posObst].killLayer = obstacule.killLayer + 1
                            } else {
                                levelFalses[posObst].killLayer = 0
                            }
                            levelFalses[posObst].fotograma = 0
                        } else {
                            levelFalses[posObst].fotograma = levelFalses[posObst].fotograma + 1
                        }

                        let posXuse = levelFalses[posObst].killLayer === 2 || levelFalses[posObst].killLayer === 3 ? levelFalses[posObst].posX + 2 : levelFalses[posObst].posX
                        let posYuse = levelFalses[posObst].killLayer === 1 || levelFalses[posObst].killLayer === 2 ? levelFalses[posObst].posY - 2 : levelFalses[posObst].posY
                        if (levelFalses[posObst].killLayer === 3) {
                            ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                            ctxE.drawImage(obst[2], posXuse + ((Math.random() * 10) - 10), posYuse + ((Math.random() * 2) - 2) - 12.5, obst[2].naturalWidth / 20, obst[2].naturalHeight / 32)
                        }
                        ctxD.drawImage(obstacule.killImagen, posXuse, posYuse, obstacule.killImagen.naturalWidth / 14, obstacule.killImagen.naturalHeight / 25)
                        let aDibujar = propsImage.imagen[`cuted_${obstacule.killLayer}`]
                        ctxC.drawImage(aDibujar, posXuse - 5, posYuse - 10, 30, 25)
                    /*     setTimeout(() => {
                            
                            ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                            ctxC.clearRect(0, 0, canvas.width, canvas.height)
                            dibujar('go', propsImage)
                        }, 5); */if (propsImage.posX > (341 - 0.5)) {
                            setTimeout(() => {
                                propsImage.posX = 0
                                moverCanvas(false)
                            }, 4000);
                        }
                    }
                }
            }
        }
        if (colisioned.result === 'live' || colisioned.result === 'rewind') {
            if (colisioned.result === 'live') {
                colisioned.result = 'rewind'
                setTimeout(() => {
                    propsImage.posX = propsImage.posX - 2
                    propsImage.items[0].posX = propsImage.items[0].posX - 20
                    propsImage.posX = propsImage.posX - 2
                    propsImage.items[0].posX = propsImage.items[0].posX - 20
                    imagenes[0].onMove = true
                    colisioned.state = false
                    colisioned.result = 'live'
                    makeStage(false, true)
                    audioPp.play()
                }, 3000);
            }
            let itsMalo = false
            let indexHere = 0
            let position = { malo: 0, body: 0 }
            dibujarMalos.new.map((key, i) => {
                if (colisioned.item === key.id) {
                    key.imagen.map((key2, ia) => {
                        if (key2.direccion === `joshi-onHit-${key.posX < propsImage.items[0].posX ? 'xf' : 'xb'}-${key.killLayer}`) {
                            itsMalo = true
                            indexHere = i
                            position.malo = ia;
                            dibujarMalos.new[i].killFotograma = dibujarMalos.new[i].killFotograma + 1;
                            if (dibujarMalos.new[i].killFotograma === 30) {
                                dibujarMalos.new[i].killLayer = dibujarMalos.new[i].killLayer + 1
                                dibujarMalos.new[i].killFotograma = 0
                            }
                            if (dibujarMalos.new[i].killLayer === 4) {
                                dibujarMalos.new[i].killLayer = 1
                            }
                        }
                    })
                }
            })
            if (itsMalo) {
                ctxE.drawImage(dibujarMalos.new[indexHere].imagen[position.malo].imagen, dibujarMalos.new[indexHere].posX, dibujarMalos.new[indexHere].posY, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalWidth / 22, dibujarMalos.new[indexHere].imagen[position.malo].imagen.naturalHeight / 27)
                let aDibujar = propsImage.imagen[`${dibujarMalos.new[indexHere].posX > propsImage.items[0].posX ? 'xf' : 'xb'}_die`]
                ctxC.drawImage(aDibujar, dibujarMalos.new[indexHere].posX < propsImage.items[0].posX ? dibujarMalos.new[indexHere].posX + dibujarMalos.new[indexHere].widthX - 5 : dibujarMalos.new[indexHere].posX - propsImage.widthX + 5, dibujarMalos.new[indexHere].posY - (dibujarMalos.new[indexHere].killLayer < 2 ? (parseInt(dibujarMalos.new[indexHere].heightY) / 2) : (parseInt(dibujarMalos.new[indexHere].heightY) / 4)), propsImage.widthX, parseInt(propsImage.heightY))
                /*   setTimeout(() => {
                      
                      ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                      ctxC.clearRect(0, 0, canvas.width, canvas.height)
                      dibujar('go', propsImage)
                  }, 5); */
            } else {
                let isProy = false
                let proy = 'no es proyectil'
                proyectiles.map((key, i) => {
                    if (colisioned.item === key.id) {
                        proy = key
                        isProy = true
                    }
                })
                if (isProy) {
                    /*  setTimeout(() => {
                         ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                         ctxC.clearRect(0, 0, canvas.width, canvas.height)
                         dibujar('go', propsImage)
                     }, 5); */
                } else {
                    let posObst = 0
                    let isObst = false
                    let obstacule = 'no es obstaculo'
                    levelFalses.map((key, i) => {
                        if (colisioned.item === key.id) {
                            obstacule = key
                            posObst = i
                            isObst = true
                        }
                    })
                    if (isObst) {
                        if (levelFalses[posObst].fotograma === 7) {
                            if (levelFalses[posObst].killLayer < 3) {
                                levelFalses[posObst].killLayer = obstacule.killLayer + 1
                            } else {
                                levelFalses[posObst].killLayer = 0
                            }
                            levelFalses[posObst].fotograma = 0
                        } else {
                            levelFalses[posObst].fotograma = levelFalses[posObst].fotograma + 1
                        }
                        let posXuse = levelFalses[posObst].killLayer === 2 || levelFalses[posObst].killLayer === 3 ? levelFalses[posObst].posX + 2 : levelFalses[posObst].posX
                        let posYuse = levelFalses[posObst].killLayer === 1 || levelFalses[posObst].killLayer === 2 ? levelFalses[posObst].posY - 2 : levelFalses[posObst].posY
                        if (levelFalses[posObst].killLayer === 3) {
                            ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                            ctxE.drawImage(obst[2], posXuse + ((Math.random() * 10) - 10), posYuse + ((Math.random() * 2) - 2) - 12.5, obst[2].naturalWidth / 20, obst[2].naturalHeight / 32)
                        }
                        ctxD.drawImage(obstacule.killImagen, posXuse, posYuse, obstacule.killImagen.naturalWidth / 14, obstacule.killImagen.naturalHeight / 25)
                        let aDibujar = propsImage.imagen[`cuted_${obstacule.killLayer}`]
                        ctxC.drawImage(aDibujar, posXuse - 5, posYuse - 10, 30, 25)
                        /* setTimeout(() => {
                            ctxD.clearRect(0, 0, canvasD.width, canvasD.height)
                            ctxC.clearRect(0, 0, canvas.width, canvas.height)
                            dibujar('go', propsImage)
                        }, 5); */
                    }
                }
            }
            /* {
              imagenes[0].onMove = false
              propsImage.posX = propsImage.posX - 5
              propsImage.items[0].posX = propsImage.items[0].posX - 50
              propsImage.posX = propsImage.posX - 5
              propsImage.items[0].posX = propsImage.items[0].posX - 50
              colisioned.result = 'rewind'
              ctxC.clearRect(0, 0, canvas.width, canvas.height)
              setTimeout(() => {
                  imagenes[0].onMove = true
                  colisioned.state = false
                  colisioned.result = 'live'
                  audioPp.play()
  
                  dibujar('go', propsImage)
              }, 3000);} */
        }
    } else {
        if ( propsImage.posX <= (341 - 0.5) && imagenes[0].onMove) {
            if (propsImage.posY + parseInt(propsImage.heightY) < actualFloor && !propsAction.jumping) {
                propsAction = {
                    ...propsAction,
                    gravity: true,
                    jumping: true
                }
            }
            if (actualFloorLimit.state) {
                if ((propsImage.items[0].posX + propsImage.widthX < actualFloorLimit.x1 + 1.1) && (actualFloorLimit.x2 > propsImage.items[0].posX)) {
                    actualFloor = mapFloor
                    actualFloorLimit.state = false
                    propsAction = {
                        ...propsAction,
                        gravity: true,
                        jumping: true
                    }
                }
                if ((actualFloorLimit.x1 < propsImage.items[0].posX) && actualFloorLimit.x2 < propsImage.items[0].posX) {
                    actualFloor = mapFloor
                    actualFloorLimit.state = false
                    propsAction = {
                        ...propsAction,
                        gravity: true,
                        jumping: true
                    }
                }
            }
            let aDibujar = propsAction.eating ? propsImage.imagen[`${propsImage.direccion === 'xf' || propsImage.direccion === 'xb' ? propsImage.direccion : 'xf'}_eat_${parseInt(propsImage.layer / (8 * 4)) < 2 ? parseInt(propsImage.layer / (8 * 4)) + 2 : parseInt(propsImage.layer / (8 * 4))}`] : armas[armasGet.enUso].state ? armas[armasGet.enUso].body : (propsImage.imagen[`${propsImage.direccion === 'xs' && propsImage.posY + parseInt(propsImage.heightY) < actualFloor ? 'xj' : propsImage.direccion}_${propsAction.gravity && propsImage.posY < actualFloor ? parseInt(propsImage.layer / (8 * 4)) < 2 ? parseInt(propsImage.layer / (8 * 4)) + 2 : parseInt(propsImage.layer / (8 * 4)) : !propsAction.gravity && propsImage.posY < actualFloor ? parseInt(propsImage.layer / (8 * 4)) > 1 ? parseInt(propsImage.layer / (8 * 4)) - 2 : parseInt(propsImage.layer / (8 * 4)) : parseInt(propsImage.layer / (8 * 4))}`])
            let psx = 0, Itemss = propsImage.items
            const chokeObj = Colisonador(malosFalses, levelFalses, propsImage)
            if (chokeObj.choke) {
                if (dibujarMalos.new[chokeObj.pos].canMove.lastChoke < 200) {
                    dibujarMalos.new[chokeObj.pos].canMove.direccion === 'xf' && dibujarMalos.new[chokeObj.pos].posX < 280 ? dibujarMalos.new[chokeObj.pos].posX + 30 : dibujarMalos.new[chokeObj.pos].posX > 30 ? dibujarMalos.new[chokeObj.pos].posX - 30 : dibujarMalos.new[chokeObj.pos].posX + 30
                } else {
                    dibujarMalos.new[chokeObj.pos].canMove.direccion = dibujarMalos.new[chokeObj.pos].canMove.direccion === 'xf' ? 'xb' : 'xf'
                    dibujarMalos.new[chokeObj.pos].canMove.lastChoke = 0
                }
            }
            let isArmed = armas[armasGet.enUso].state
            const chokePlayer = await ColisionBasica(propsImage.items[0], levelFalses, propsImage, true, malosFalses, proyectilesFalses, plataformaFalses, ctxF, isArmed)
            let plataformaColision = { eje: '', state: false, valor: '' }
            if (chokePlayer) {
                if (chokePlayer.state) {
                    for (let indd = 0; indd < chokePlayer.array.length; indd++) {
                        if (chokePlayer.array[indd].a === 'plataforma') {
                            mxDirection.right = false
                            mxDirection.left = false
                            mxActive = false
                            const colisionPlataforma = Colisonador(propsImage.items[0], plataformaFalses, propsImage, true, true, ctxD, chokePlayer.array[indd].a)
                            if (colisionPlataforma.state) {
                                let point = (colisionPlataforma.array[0].b.colision).split('-')
                                if (point[0] === 'x') {
                                    if (point[1] === 'xb') {
                                        if (propsImage.direccion === 'xf' || propsImage.direccion === 'xf') {
                                            propsImage.items[0].posX = propsImage.items[0].posX - ((1.25 / (40 * (1 / (levelDificulty)))))
                                            propsImage.posX = propsImage.posX - ((0.125 / (40 * (1 / (levelDificulty)))))
                                        }
                                        plataformaColision = { eje: 'x', state: true, valor: 'xb' }
                                    } else {
                                        if (propsImage.direccion === 'xb' || propsImage.direccion === 'xb') {
                                            propsImage.items[0].posX = propsImage.items[0].posX + ((1.25 / (40 * (1 / (levelDificulty)))))
                                            propsImage.posX = propsImage.posX + ((0.125 / (40 * (1 / (levelDificulty)))))
                                        }
                                        plataformaColision = { eje: 'x', state: true, valor: 'xf' }
                                    }
                                }
                                if (point[0] === 'y') {
                                    if (point[1] === 'xd') {
                                        plataformaColision = { eje: 'y', state: true, valor: 'xd' }
                                        propsAction.gravity = true
                                    }
                                    if (point[1] === 'xs') {
                                        imagenes[0].onMove = false
                                        let thePos = (
                                            colisionPlataforma.array[0].b.fatherPosY
                                        )
                                        actualFloorLimit = { state: true, x1: colisionPlataforma.array[0].b.fatherPosX + (propsImage.widthX / 2), x2: colisionPlataforma.array[0].b.fatherPosX + colisionPlataforma.array[0].b.widthX - (propsImage.widthX / 2) }
                                        actualFloor = thePos
                                        propsImage.items[0].posY = colisionPlataforma.array[0].b.fatherPosY - parseInt(propsImage.heightY) - propsAction.jumpLevel
                                        propsImage.posY = colisionPlataforma.array[0].b.fatherPosY - parseInt(propsImage.heightY) - propsAction.jumpLevel
                                        propsImage.posY = colisionPlataforma.array[0].b.fatherPosY - parseInt(propsImage.heightY) - propsAction.jumpLevel
                                        propsImage.items[0].posY = colisionPlataforma.array[0].b.fatherPosY - parseInt(propsImage.heightY) - propsAction.jumpLevel
                                        imagenes[0].onMove = true
                                    }
                                }
                            }
                        } else {
                            let hiter = (chokePlayer.array[indd].b.id.split('-')[chokePlayer.array[indd].b.id.split('-').length - 1])
                            if (hiter === ('malo') || hiter === ('proy') || hiter === ('obst')) {
                                if (hiter === 'obst') {
                                    hiter = chokePlayer.array[indd].b.randomNumber === 0 ? 'obstA' : 'obstB'
                                }
                                const chokeInminente = Colisonador(propsImage.items[0], hiter === ('malo') ? malosFalses : hiter === ('proy') ? proyectiles : levelFalses, propsImage, true, true, ctxD, hiter)
                                if (chokeInminente.state && hiter === 'malo' && propsImage.items[0].health.estado === 'inmortal') {
                                    if (dibujarMalos.new[chokePlayer.array[indd].b.pos].state === 'die' && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.state && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                        if (!propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                            setplayerOnDrop({
                                                ...playerOnDrop,
                                                state: true
                                            })

                                        }
                                        if (propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking) {
                                            dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking = true
                                        }
                                        if (propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad > 0 && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                            dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad = dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad - .05
                                            let healtRes = .05 * (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.efect ? 1 : -1)
                                            setPlayerVidas({
                                                ...playerVidas,
                                                health: propsImage.items[0].health.nivel + healtRes
                                            })
                                            propsImage.items[0].health.nivel = propsImage.items[0].health.nivel + healtRes
                                            if (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad <= 0) {
                                                dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking = true
                                                propsAction.eating = false
                                            }

                                        }

                                        if (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                            dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done = true
                                            propsAction.eating = false
                                            setplayerOnDrop({
                                                state: false
                                            })

                                        }
                                    }
                                }
                                if (chokeInminente.state && hiter === 'malo' && propsImage.items[0].health.estado === 'inmortal') {
                                    if (dibujarMalos.new[chokePlayer.array[indd].b.pos].state === 'die' && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.state && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                        if (!propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                            setplayerOnDrop({
                                                ...playerOnDrop,
                                                state: true
                                            })
                                        }
                                        if (propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking) {
                                            dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking = true
                                        }
                                        if (propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad > 0 && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                            dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad = dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad - .05
                                            let healtRes = .05 * (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.efect ? 1 : -1)
                                            setPlayerVidas({
                                                ...playerVidas,
                                                health: propsImage.items[0].health.nivel + healtRes
                                            })
                                            propsImage.items[0].health.nivel = propsImage.items[0].health.nivel + healtRes
                                            if (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad <= 0) {
                                                dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking = true
                                                propsAction.eating = false
                                            }
                                        }
                                        if (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                            dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done = true
                                            propsAction.eating = false
                                            setplayerOnDrop({
                                                state: false
                                            })
                                        }
                                    }
                                }
                                if (chokeInminente.state && propsImage.items[0].health.estado !== 'inmortal') {
                                    switch (chokeInminente.array[0].b.id.split('-')[chokeInminente.array[0].b.id.split('-').length - 1]) {
                                        case 'malo':
                                            if (dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'die' && dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'spirit' && dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'onDie') {
                                                yaWey.play()
                                                joshisound.play()
                                                colisioned.state = true
                                                colisioned.item = dibujarMalos.new[chokeInminente.array[0].b.pos].id
                                                propsImage.items[0].health.nivel = propsImage.items[0].health.nivel - dibujarMalos.new[chokeInminente.array[0].b.pos].damage
                                                setPlayerVidas({
                                                    ...playerVidas,
                                                    vidas: actualVidas,
                                                    health: propsImage.items[0].health.nivel
                                                })
                                                if (propsImage.items[0].health.nivel < 0) {
                                                    colisioned.result = 'die'
                                                    dibujarMalos.die = true
                                                    ctxD.save();
                                                    ctxD.font = "40px Arial";
                                                    ctxD.fillStyle = "red";
                                                    ctxD.strokeStyle = 'white';
                                                    ctxD.fillText(actualVidas > 1 ? `JOSHI TE ` : 'GAME OVER', 30, 50)
                                                    ctxD.strokeText(actualVidas > 1 ? `JOSHI TE ` : 'GAME OVER', 30, 50)
                                                    ctxD.fillText(actualVidas > 1 ? ` CULEO` : '', 30, 90)
                                                    ctxD.strokeText(actualVidas > 1 ? ` CULEO` : '', 30, 90)
                                                    ctxD.restore();
                                                    ctxD.stroke()
                                                    malosFalses = []
                                                } else {
                                                    joshisound3[3].play()
                                                }
                                            } else {
                                                if (dibujarMalos.new[chokePlayer.array[indd].b.pos].state === 'die' && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.state && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                                    if (!propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done) {
                                                        setplayerOnDrop({
                                                            ...playerOnDrop,
                                                            state: true
                                                        })

                                                    }
                                                    if (propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking) {
                                                        dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking = true
                                                    }
                                                    if (propsAction.eating && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.startTaking && dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad > 0 && !dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                                        dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad = dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad - .05
                                                        let healtRes = .05 * (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.efect ? 1 : -1)
                                                        setPlayerVidas({
                                                            ...playerVidas,
                                                            health: propsImage.items[0].health.nivel + healtRes
                                                        })
                                                        propsImage.items[0].health.nivel = propsImage.items[0].health.nivel + healtRes
                                                        if (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.cantidad <= 0) {
                                                            dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking = true
                                                            propsAction.eating = false
                                                        }

                                                    }

                                                    if (dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.finishTaking) {
                                                        dibujarMalos.new[chokePlayer.array[indd].b.pos].actions.onDie.comible.done = true
                                                        propsAction.eating = false
                                                        setplayerOnDrop({
                                                            state: false
                                                        })

                                                    }
                                                }

                                            }
                                            break;
                                        case 'proy':
                                            llantobebe.play()
                                            yaWey.play()
                                            pow.play()
                                            colisioned.state = true
                                            colisioned.item = proyectiles[chokeInminente.array[0].b.pos].id
                                            propsImage.items[0].health.nivel = propsImage.items[0].health.nivel - proyectiles[chokeInminente.array[0].b.pos].damage
                                            setPlayerVidas({
                                                ...playerVidas,
                                                vidas: actualVidas,
                                                health: propsImage.items[0].health.nivel
                                            })
                                            if (propsImage.items[0].health.nivel < 0) {
                                                colisioned.result = 'die'
                                                proyectilesFalses = []
                                                dibujarMalos.die = true
                                                ctxD.save();
                                                ctxD.fillText(actualVidas > 1 ? `TRAGASTE ` : 'GAME OVER', 30, 50)
                                                ctxD.fillText(actualVidas > 1 ? `TRAGASTE ` : 'GAME OVER', 30, 50)
                                                ctxD.fillText(actualVidas > 1 ? ` PAÑAL` : 'GAME OVER', 30, 100)
                                                ctxD.strokeText(actualVidas > 1 ? ` PAÑAL` : 'GAME OVER', 30, 100)
                                                ctxD.restore();
                                                ctxD.stroke()
                                            }
                                            break;
                                        case 'obst':
                                            dolor.play()
                                            colisioned.state = true
                                            colisioned.item = levelFalses[chokePlayer.array[indd].b.pos].id
                                            propsImage.items[0].health.nivel = propsImage.items[0].health.nivel - levelFalses[chokePlayer.array[indd].b.pos].damage
                                            setPlayerVidas({
                                                ...playerVidas,
                                                vidas: actualVidas,
                                                health: propsImage.items[0].health.nivel
                                            })
                                            sierra.play()
                                            if (propsImage.items[0].health.nivel < 0) {
                                                colisioned.result = 'die'
                                                ctxD.save();
                                                ctxD.fillText(actualVidas > 1 ? `MUERTISIMO` : 'GAME OVER', 30, 50)
                                                ctxD.strokeText(actualVidas > 1 ? `MUERTISIMO` : 'GAME OVER', 30, 50)
                                                ctxD.restore();
                                                ctxD.stroke()
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                } else {
                                    if ((hiter === ('obst') || hiter === ('obstA') || hiter === ('obstB')) && (chokeInminente.state && propsImage.items[0].health.estado === 'inmortal')) {
                                        if (propsImage.direccion === 'xb' || propsImage.direccion === 'xb') {
                                            propsImage.items[0].posX = propsImage.items[0].posX + ((1.25 / (40 * (1 / (levelDificulty)))))
                                            propsImage.posX = propsImage.posX + ((0.125 / (40 * (1 / (levelDificulty)))))
                                        }
                                        if (propsImage.direccion === 'xf' || propsImage.direccion === 'xf') {
                                            propsImage.items[0].posX = propsImage.items[0].posX - ((1.25 / (40 * (1 / (levelDificulty)))))
                                            propsImage.posX = propsImage.posX - ((0.125 / (40 * (1 / (levelDificulty)))))
                                        }
                                    }
                                    if (armas[armasGet.enUso].state) {
                                        if (hiter === ('proy')) {
                                            audioPlaying = audioPlaying > 1 ? audioPlaying + 1 : 0
                                            WeaponAudio[audioPlaying].play()
                                            setTimeout(() => {
                                                setTimeout(() => {
                                                    armas[armasGet.enUso].onHit = false

                                                }, 500)
                                                muertebebe.play()
                                            }, 500);
                                            if (proyectiles[chokePlayer.array[indd].b.pos].state !== 'onDie') {
                                                proyectiles[chokePlayer.array[indd].b.pos].state = 'hit';
                                                proyectiles[chokePlayer.array[indd].b.pos].hitdirection = proyectiles[chokePlayer.array[indd].b.pos].direccion === 'xf' ? (lastDireccion === 'xf' ? 'xf' : 'xb') : (lastDireccion === 'xb' ? 'xb' : 'xf')
                                                if (!armas[armasGet.enUso].onHit) {
                                                    proyectiles[chokePlayer.array[indd].b.pos].hitDamage = (Math.random() * 4);
                                                    proyectiles[chokePlayer.array[indd].b.pos].health = armas[armasGet.enUso].onHit ? proyectiles[chokePlayer.array[indd].b.pos].health : proyectiles[chokePlayer.array[indd].b.pos].health - ((proyectiles[chokePlayer.array[indd].b.pos].health * (Math.random() * armas[armasGet.enUso].damage - 3) + 3) * propsAction.strikeLevel)
                                                    armas[armasGet.enUso].onHit = true
                                                }
                                                if (proyectiles[chokePlayer.array[indd].b.pos].health < 0) {
                                                    proyectiles[chokePlayer.array[indd].b.pos].state = 'die';
                                                }
                                            }
                                        }
                                        if (hiter === ('malo')) {
                                            if (!onHitSoundNow) {
                                                onHitSoundNow = true
                                                console.log(parseInt(Math.random() * 3));
                                                armas[armasGet.enUso].sound[parseInt(Math.random() * 3)].play()
                                                setTimeout(() => {
                                                    onHitSoundNow = false
                                                }, 5000);
                                            }
                                            /* onHitSound.play() */
                                            if (dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'die' && dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'spirit' && dibujarMalos.new[chokePlayer.array[indd].b.pos].state !== 'onDie') {
                                                dibujarMalos.new[chokePlayer.array[indd].b.pos].state = 'hit'
                                                if (!armas[armasGet.enUso].onHit) {
                                                    dibujarMalos.new[chokePlayer.array[indd].b.pos].health = dibujarMalos.new[chokePlayer.array[indd].b.pos].health - ((armas[armasGet.enUso].damage * parseInt(Math.random() * 3) + 1) * propsAction.strikeLevel)
                                                    dibujarMalos.new[chokePlayer.array[indd].b.pos].lazy = { state: true, counter: 0 }
                                                    joshisound2.play()
                                                    if (dibujarMalos.new[chokePlayer.array[indd].b.pos].health < 0) {
                                                        pow.play()
                                                        armas[armasGet.enUso].onHit = true
                                                        joshisound3[2].play()
                                                        dibujarMalos.new[chokePlayer.array[indd].b.pos].state = 'onDie'
                                                        setTimeout(() => {
                                                            armas[armasGet.enUso].onHit = false
                                                        }, 1000);
                                                    } else {
                                                        pow.play()
                                                        armas[armasGet.enUso].onHit = true
                                                        setTimeout(() => {
                                                            armas[armasGet.enUso].onHit = false
                                                        }, 1000);
                                                        joshisound3[parseInt(Math.random() * 2)].play()
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    setplayerOnDrop({
                        ...playerOnDrop,
                        state: false
                    })
                }
                if (colisioned.state) {
                    if (colisioned.result === 'die') {
                        audioPp.src = '/audio/die.mp3'
                        setTimeout(() => {
                            ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                            ctxC.clearRect(0, 0, canvas.width, canvas.height)
                            psx = Itemss[0].posX
                            morir()
                            colisioned.state = false
                            Itemss[0].posX = 0
                        }, 5000);
                    } else {
                        audioPp.pause()
                        propsImage.items[0].health.estado = 'normal'
                    }
/*                         dibujar('go', propsImage)
*/                    } else {
                    psx = Itemss[0].posX
                    if ( propsImage.posX <= (341 - 0.5) && propsImage.posX > -1 && propsImage.direccion === 'xf' && (((propsImage.posX / (31 - 0.5)) === (1)) || ((propsImage.posX / (61 - 0.5)) === (1)) || ((propsImage.posX / (91 - 0.5)) === (1)) || ((propsImage.posX / (121 - 0.5)) === (1)) || ((propsImage.posX / (151 - 0.5)) === (1)) || ((propsImage.posX / (181 - 0.5)) === (1)) || ((propsImage.posX / (211 - 0.5)) === (1)) || ((propsImage.posX / (241 - 0.5)) === (1)) || ((propsImage.posX / (271 - 0.5)) === (1)) || ((propsImage.posX / (301 - 0.5)) === (1)) || ((propsImage.posX / (331 - 0.5)) === (1)) || (((propsImage.posX / (341 - 0.5)) === (1)))) && propsImage.alive && !propsImage.levelPass) {
                        moverCanvas(false)
                    }
                    if ( propsImage.posX < 351 && propsImage.posX > 28 && propsImage.direccion === 'xb' && (((propsImage.posX / (29 - 0.5)) === (1)) || ((propsImage.posX / (59 - 0.5)) === (1)) ||
                        ((propsImage.posX / (89 + 0.5)) === (1)) || ((propsImage.posX / (119 + 0.5)) === (1)) || ((propsImage.posX / (149 + 0.5)) === (1)) || ((propsImage.posX / (179 + 0.5)) === (1)) || ((propsImage.posX / (209 + 0.5)) === (1)) || ((propsImage.posX / (239 + 0.5)) === (1)) || ((propsImage.posX / (269 + 0.5)) === (1)) || ((propsImage.posX / (299 + 0.5)) === (1)) || ((propsImage.posX / (319 + 0.5)) === (1)))) {
                        moverCanvas(false)
                    }
                    else {
                        console.log
                    }
                    if (imagenes[0].onMove || !colisioned.state) {
                        if (!colisioned.state) {
                            ctxC.clearRect(0, 0, canvas.width, canvas.height)
                            if (propsImage.layer < (24 * 4)) {
                                propsImage.layer = propsImage.layer + 1
                            } else { propsImage.layer = 0 } if (propsImage.direccion === 'xf') {
                                propsImage.direccion = 'xf'
                            } else {
                                propsImage.direccion = propsImage.direccion
                            }
                            if ((propsImage.direccion === 'xf' && propsImage.posX < 342) || ((propsImage.direccion === 'xs' || propsImage.direccion === 'xd') && propsImage.posX < 355) || (propsImage.direccion === 'xb' && propsImage.posX > 0)) {
                                Itemss[0].posX = propsImage.refreshData ? psx : propsImage.levelPass ? psx : propsImage.direccion === 'xf' && propsImage.direccion === 'xf' ? propsAction.jumping || propsImage.posY < actualFloor ? Itemss[0].posX + ((1.25 / (40 * (1 / (levelDificulty))))) : Itemss[0].posX + ((1.25 / (40 * (1 / (levelDificulty))))) : propsImage.direccion === 'xb' && propsImage.direccion === 'xb' ? propsAction.jumping || propsImage.posY < actualFloor ? Itemss[0].posX - ((1.25 / (40 * (1 / (levelDificulty))))) : Itemss[0].posX - ((1.25 / (40 * (1 / (levelDificulty))))) : Itemss[0].posX
                                propsImage = {
                                    ...propsImage,
                                    posY: propsAction.jumping && propsImage.posY <= (actualFloor - parseInt(propsImage.heightY)) ? propsImage.posY === (actualFloor - parseInt(propsImage.heightY)) && propsAction.jumping && propsAction.gravity ? (actualFloor - parseInt(propsImage.heightY)) : !propsAction.gravity ? propsImage.posY - propsAction.jumpLevel : propsAction.jumping && propsAction.gravity ? propsImage.posY + propsAction.gravityLevel : propsImage.posY === 50 ? (actualFloor - parseInt(propsImage.heightY)) : (actualFloor - parseInt(propsImage.heightY)) : (actualFloor - parseInt(propsImage.heightY)),
                                    posX: propsImage.refreshData ? propsImage.posX : propsImage.levelPass ? propsImage.posX : !propsImage.alive ? 0 : propsImage.direccion === 'xf' && propsImage.direccion === 'xf' ? propsAction.jumping || propsImage.posY < actualFloor ? propsImage.posX + ((0.125 / (40 * (1 / (levelDificulty))))) : propsImage.posX + ((0.125 / (40 * (1 / (levelDificulty))))) : propsImage.direccion === 'xb' && propsImage.direccion === 'xb' ? propsAction.jumping || propsImage.posY < actualFloor ? propsImage.posX - ((0.125 / (40 * (1 / (levelDificulty))))) : propsImage.posX - ((0.125 / (40 * (1 / (levelDificulty))))) : propsImage.posX,
                                    items: propsImage.levelPass || !propsImage.alive ? propsImage.items : Itemss,
                                    fotograma: propsImage.fotograma + 1,
                                }
                               
                            }
                            const propsImageLast = propsImage
                            propsImage = {
                                ...propsImage,
                                onMove: propsImageLast.onMove,
                                direccion: propsImageLast.direccion,
                            }
                            if (propsImage.posX > (341 - 0.5)) {
                                setTimeout(() => {
                                    propsImage.posX = 0
                                    moverCanvas(false)
                                }, 4000);
                            }
                            /*  setTimeout(() => {
                                 const propsImageLast = propsImage
                                 propsImage = {
                                     ...propsImage,
                                     onMove: propsImageLast.onMove,
                                     direccion: propsImageLast.direccion,
                                 }
                                 dibujar('go', propsImage)
                                 if (propsImage.posX > (341 - 0.5)) {
                                     setTimeout(() => {
                                         propsImage.posX = 0
                                         moverCanvas(false)
                                     }, 4000);
                                 }
                             }, 5);
                             ctxE.clearRect(0, 0, canvasD.width, canvasD.height) */
                            let malosFalsesAux = []
                            dibujarMalos.new.map((key, i) => {
                                dibujarMalos.new[i].canMove.lastChoke = dibujarMalos.new[i].canMove.lastChoke + 1
                                if (key.state !== 'die' && key.state !== 'spirit' && key.state !== 'onDie') {
                                    if (key.canMove.jumps.state && key.posY >= (mapFloor - parseInt(key.heightY)) && key.canMove.jumps.gravity) {
                                        dibujarMalos.new[i].canMove.jumps.gravity = false
                                        dibujarMalos.new[i].canMove.jumps.state = false
                                        dibujarMalos.new[i].posY = (mapFloor - parseInt(key.heightY))
                                        dibujarMalos.new[i].canMove.jumps.inInterval = 0
                                    }
                                    if (key.posY < key.canMove.jumps.maxJump) {
                                        dibujarMalos.new[i].canMove.jumps.gravity = true
                                    }
                                    if (key.actions.shot.posibility && !key.actions.shot.state) {
                                        dibujarMalos.new[i].actions.shot.inInterval = key.actions.shot.inInterval + 1
                                    }
                                    if (key.actions.shot.posibility && key.actions.shot.state) {
                                        dibujarMalos.new[i].actions.shot.inInterval = 0
                                    }
                                    if (key.state !== 'onDie' && key.state !== 'die' && key.state !== 'onDie' && key.actions.shot.posibility && !key.actions.shot.state && key.actions.shot.inInterval === key.actions.shot.interval) {
                                        risabebe.play()
                                        dibujarMalos.new[i].actions.shot.state = true
                                        setTimeout(() => {
                                            try {
                                                dibujarMalos.new[i].actions.shot.state = false
                                                armas[armasGet.enUso].onHit = false
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }, 1000);
                                        let imgUsed = proyectilesImg
                                        let efectRandom = parseInt(Math.random() * 2)
                                        proyectiles.push({
                                            id: `${dibujarMalos.new[i].id.split('-')[0]}-${parseInt(Math.random() * 500)}-proy`,
                                            health: 22,
                                            hitdirection: 'xf',
                                            hitDamage: 0,
                                            state: 'live',
                                            imagen: imgUsed,
                                            type: key.actions.shot.type,
                                            posX: !key.canMove.direccion === 'xf' ? key.posX - 60 : key.posX + 10,
                                            posY: (key.posY) + ((Math.random() * 30) - 15),
                                            widthX: imgUsed[0].naturalWidth / 30,
                                            heightY: imgUsed[0].naturalHeight / 30,
                                            direccion: key.canMove.direccion,
                                            speed: key.actions.shot.speed,
                                            efectDirection: efectRandom === 0 ? 'up' : 'down',
                                            damage: key.actions.shot.damage,
                                        })
                                    }
                                    if (key.canMove.jumps.posibility && !key.canMove.jumps.state) {
                                        dibujarMalos.new[i].canMove.jumps.inInterval = key.canMove.jumps.inInterval + 1
                                    }
                                    if (key.canMove.jumps.posibility && !key.canMove.jumps.state && key.canMove.jumps.inInterval === key.canMove.jumps.interval) {
                                        dibujarMalos.new[i].canMove.jumps.state = true
                                        dibujarMalos.new[i].canMove.jumps.gravity = false
                                    }
                                    let position = {
                                        die: 0,
                                        hit: {
                                            left: 0,
                                            right: 0
                                        },
                                    }
                                    key.imagen.map((key2, i) => {
                                        if (key2.direccion === 'spirit') { position.spirit = i }
                                        if (key2.direccion === 'die') { position.die = i }
                                        if (key2.direccion === `hit-xf`) { position.hit.right = i }
                                        if (key2.direccion === `hit-xb`) { position.hit.left = i }
                                    })
                                    let imagenready = key.state === 'onDie' ? key.imagen[position.die].imagen : key.state === 'hit' ? key.imagen[key.canMove.direccion === 'xf' ? position.hit.right : position.hit.left].imagen : key.imagen[key.canMove.direccion === 'xb' ? 1 : 0].imagen
                                    if (key.state === 'onDie') {
                                        if (key.explotionTime > 100) {
                                            dibujarMalos.new[i].state = 'spirit'
                                        } else {
                                            dibujarMalos.new[i].explotionTime = dibujarMalos.new[i].explotionTime + 1
                                        }
                                        ctxE.drawImage(armas[armasGet.enUso].kills[0].imagen, key.posX, key.posY - (key.explotionTime / 10), (armas[armasGet.enUso].kills[0].imagen.naturalWidth / 22) + (key.explotionTime / 10), (armas[armasGet.enUso].kills[0].imagen.naturalHeight / 27) + (key.explotionTime / 10))
                                    } else {
                                        if (key.lazy.state) {
                                            if (key.lazy.fotograma < 23) {
                                                dibujarMalos.new[i].lazy.fotograma = dibujarMalos.new[i].lazy.fotograma + 1
                                            } else {
                                                dibujarMalos.new[i].lazy.fotograma = 0
                                                if (dibujarMalos.new[i].lazy.layer < 4) {
                                                    dibujarMalos.new[i].lazy.layer = dibujarMalos.new[i].lazy.layer + 1
                                                } else {
                                                    dibujarMalos.new[i].lazy.layer = 0
                                                }
                                            }
                                            let posLayer = 0
                                            lazyImg.map((keyLazy, iLazy) => {
                                                if (parseInt(keyLazy.id) === key.lazy.layer) {
                                                    posLayer = iLazy
                                                }
                                            })
                                            let imagenready2 = lazyImg[posLayer].imagen
                                            ctxE.drawImage(imagenready2, (key.canMove.direccion === 'xb' ? key.posX - (imagenready2.naturalWidth / 44) : key.posX + (imagenready2.naturalWidth / 44)), key.posY - (imagenready2.naturalHeight / 27), imagenready2.naturalWidth / 22, imagenready2.naturalHeight / 27)
                                        }
                                        ctxE.drawImage(imagenready, key.posX, key.posY, imagenready.naturalWidth / 22, imagenready.naturalHeight / 27)
                                    }
                                    if (dibujarMalos.new[i].posX < (stateImage.posX === -1 ? 35 : 1) || dibujarMalos.new[i].posX > 299) {
                                        dibujarMalos.new[i].canMove.direccion = dibujarMalos.new[i].posX < (stateImage.posX === -1 ? 35 : 1) ? 'xf' : 'xb'
                                    }
                                    dibujarMalos.new[i].posY = dibujarMalos.new[i].posY + parseInt(dibujarMalos.new[i].heightY) > (mapFloor) ? (mapFloor - parseInt(dibujarMalos.new[i].heightY)) : (key.state === 'onDie' || key.state === 'spirit') ? dibujarMalos.new[i].posY : !dibujarMalos.new[i].canMove.jumps.posibility ? dibujarMalos.new[i].posY : dibujarMalos.new[i].canMove.jumps.state ? (!dibujarMalos.new[i].canMove.jumps.gravity ? dibujarMalos.new[i].posY + parseInt(dibujarMalos.new[i].heightY) <= (mapFloor) ? dibujarMalos.new[i].posY - (.250 + dibujarMalos.new[i].canMove.jumps.speed) : (mapFloor - parseInt(dibujarMalos.new[i].heightY)) : dibujarMalos.new[i].posY + .250) : dibujarMalos.new[i].posY
                                    dibujarMalos.new[i].posX = (key.state === 'onDie' || key.state === 'spirit') ? dibujarMalos.new[i].posX : !dibujarMalos.new[i].canMove.walks.posibility ? dibujarMalos.new[i].posX : dibujarMalos.new[i].actions.shot.state || dibujarMalos.new[i].canMove.jumps.state ? dibujarMalos.new[i].posX : dibujarMalos.new[i].canMove.direccion === 'xf' ? dibujarMalos.new[i].posX + ((dibujarMalos.new[i].lazy.state ? .05 : .25) * dibujarMalos.new[i].canMove.walks.speed) : dibujarMalos.new[i].posX - ((dibujarMalos.new[i].lazy.state ? .05 : .25) * dibujarMalos.new[i].canMove.walks.speed)
                                    if (dibujarMalos.new[i].lazy.state) {
                                        dibujarMalos.new[i].lazy.counter < 1000 ? dibujarMalos.new[i].lazy.counter = dibujarMalos.new[i].lazy.counter + 1 : dibujarMalos.new[i].lazy = { counter: 0, state: false, fotograma: 0, layer: 0 }
                                    }
                                } else {
                                    let position = {
                                        die: 0,
                                        hit: {
                                            left: 0,
                                            right: 0
                                        },
                                    }
                                    key.imagen.map((key2, i) => {
                                        if (key2.direccion === 'spirit') { position.spirit = i }
                                        if (key2.direccion === 'die') { position.die = i }
                                        if (key2.direccion === `hit-xf`) { position.hit.right = i }
                                        if (key2.direccion === `hit-xb`) { position.hit.left = i }
                                    })
                                    fantasmas.map((keySpirit, iGhost) => {
                                        if (keySpirit.posY > 0) {
                                            if (fantasmas[iGhost].posY > 0) {
                                                fantasmas[iGhost].posY = fantasmas[iGhost].posY - (1.25 / 3)
                                                ctxE.drawImage(key.imagen[position.spirit].imagen, key.posX, keySpirit.posY, key.imagen[position.spirit].imagen.naturalWidth / 22, key.imagen[position.spirit].imagen.naturalHeight / 27)
                                            }
                                        }
                                    })
                                    if (key.state === 'spirit' || key.state === 'onDie') {
                                        let isDead = false
                                        fantasmas.map((kkk, xi) => {
                                            if (kkk.id === key.id) {
                                                isDead = true
                                            }
                                        })
                                        if (!isDead) {
                                            fantasmas.push({
                                                id: key.id,
                                                posX: key.posX,
                                                posY: key.posY,
                                            })
                                            dibujarMalos.new[i].state = 'die'
                                        }
                                        ctxE.drawImage(key.imagen[position.spirit].imagen, key.posX, key.posY, key.imagen[position.spirit].imagen.naturalWidth / 22, key.imagen[position.spirit].imagen.naturalHeight / 27)
                                    } else {
                                        let position = {
                                            die: 0,
                                            hit: {
                                                left: 0,
                                                right: 0
                                            },
                                        }
                                        dibujarMalos.new.map((key, i) => {
                                            key.imagen.map((key2, ia) => {
                                                if (key2.direccion === 'spirit') { position.spirit = ia }
                                                if (key2.direccion === 'die') { position.die = ia }
                                                if (key2.direccion === `hit-xf`) { position.hit.right = ia }
                                                if (key2.direccion === `hit-xb`) { position.hit.left = ia }
                                            })
                                            ctxE.drawImage(key.imagen[position.die].imagen, key.posX, key.posY, key.imagen[position.die].imagen.naturalWidth / 22, key.imagen[position.die].imagen.naturalHeight / 27)
                                        })
                                    }
                                }
                                if (key.state !== 'onDie' && key.state !== 'spirit') {
                                    malosFalsesAux.push({
                                        ...key,
                                        id: key.id,
                                        posX: key.posX,
                                        posY: key.posY,
                                        widthX: key.widthX,
                                        heightY: parseInt(key.heightY),
                                    })
                                }
                            })
                            malosFalses = malosFalsesAux
                            proyectilesFalses = []
                            let existingProyectiles = []
                            proyectiles.map((key, i) => {
                                ctxE.drawImage(key.imagen[key.direccion === 'xf' ? 1 : 0], key.posX, key.posY, key.widthX, parseInt(key.heightY))
                                proyectiles[i].posX = key.state !== 'hit' ? (key.direccion === 'xf' ? key.posX + (.25 * key.speed) : key.posX - (.25 * key.speed)) : (key.hitdirection === 'xb' ? key.posX - (.25 * (key.speed * 2.5)) : key.posX + (.25 * (key.speed * 2.5)))
                                proyectiles[i].posY = key.state === 'hit' ? key.efectDirection === 'up' ? proyectiles[i].posY - (.6 * key.speed * key.hitDamage) : proyectiles[i].posY + (.6 * key.speed * key.hitDamage) : proyectiles[i].posY
                                if ((key.state !== 'die' && key.state !== 'onDie' && key.state !== 'spirit') && (key.posX < 300 && (key.posX + key.widthX) > 0) && (key.posY > 0 && key.posY > 0)) {
                                    proyectilesFalses.push({
                                        ...key,
                                        id: key.id,
                                        state: key.posX,
                                        posX: key.posX,
                                        posY: key.posY,
                                        widthX: key.widthX,
                                        heightY: parseInt(key.heightY),
                                        health: key.health,
                                        damage: key.damage
                                    })
                                    existingProyectiles.push(key)
                                }
                            })
                            proyectiles = existingProyectiles
                            if (armas[armasGet.enUso].state) {
                                let indexFor = armas[armasGet.enUso].fotograma
                                if (armas[armasGet.enUso].layer < 13) {
                                    if (armas[armasGet.enUso].layer === 12) {
                                        armas[armasGet.enUso].onEnd = true
                                        setTimeout(() => {
                                            armas[armasGet.enUso].layer = 0
                                            armas[armasGet.enUso].state = false
                                        }, 600);
                                    }
                                    if (indexFor < armas[armasGet.enUso].speed) {
                                        indexFor = indexFor + 1
                                        armas[armasGet.enUso].fotograma = indexFor
                                    } else {
                                        indexFor = 0
                                        armas[armasGet.enUso].fotograma = indexFor
                                        armas[armasGet.enUso].layer = armas[armasGet.enUso].layer + 1
                                    }
                                    let posLayer = 0
                                    let cualLayer
                                    armas[armasGet.enUso].imagenes.map((key2, i) => {
                                        if (armas[armasGet.enUso].layer === 13 && !armas[armasGet.enUso].onHit) {
                                            cualLayer = 11

                                        } else {
                                            cualLayer = armas[armasGet.enUso].layer
                                        }
                                        if (key2.id === cualLayer && key2.direccion === lastDireccion) {
                                            posLayer = i
                                        }
                                    })
                                    ctxE.drawImage(armas[armasGet.enUso].imagenes[posLayer].imagen, psx - 15, propsImage.posY - (parseInt(propsImage.heightY) / 2), armas[armasGet.enUso].imagenes[posLayer].widthX, armas[armasGet.enUso].imagenes[posLayer].heightY);
                                } else {
                                    let posLayer = 0
                                    let cualLayer = 0
                                    armas[armasGet.enUso].imagenes.map((key2, i) => {
                                        if (armas[armasGet.enUso].layer === 13 && !armas[armasGet.enUso].onHit) {
                                            cualLayer = 12

                                        } else {
                                            cualLayer = armas[armasGet.enUso].layer
                                        }

                                        if (key2.id === cualLayer && key2.direccion === lastDireccion) {
                                            posLayer = i
                                        }
                                    })
                                    ctxE.drawImage(armas[armasGet.enUso].imagenes[posLayer].imagen, psx - 15, propsImage.posY - (parseInt(propsImage.heightY) / 2), armas[armasGet.enUso].imagenes[posLayer].widthX, armas[armasGet.enUso].imagenes[posLayer].heightY);
                                }
                            }
                            if (propsImage.items[0].health.estado === 'inmortal') {
                                let playerClothes = propsImage.imagen[`body_ki_${parseInt((Math.random() * 2))}`]
                                ctxC.drawImage(playerClothes, propsImage.levelPass ? psx : propsImage.refreshData ? 10 : !propsImage.alive ? 0 : psx - 8, propsImage.direccion === 'xd' ? propsImage.posY + (parseInt(propsImage.heightY) / 2) : propsImage.posY - 7, propsImage.widthX + 16, propsImage.direccion === 'xd' ? (parseInt(propsImage.heightY) / 2) : parseInt(propsImage.heightY) + 14)
                            }
                            if (propsAction.strikeLevel > 1) {
                                let playerClothes = itemsImageAux[`body_fumado_${((propsImage.direccion !== 'xf' && propsImage.direccion !== 'xb' || armas[armasGet.enUso].state) ? 'xs' : propsImage.direccion)}`]
                                ctxC.drawImage(playerClothes, propsImage.levelPass ? psx : propsImage.refreshData ? 10 : !propsImage.alive ? 0 : psx - 8, propsImage.direccion === 'xd' ? propsImage.posY + (parseInt(propsImage.heightY) / 2) : propsImage.posY - 7, propsImage.widthX + 16, propsImage.direccion === 'xd' ? (parseInt(propsImage.heightY) / 2) : parseInt(propsImage.heightY) + 14)
                            }
                            if (propsAction.jumpLevel > 1.10) {
                                let playerClothes = itemsImage[0].imagen
                                let estado = !propsAction.gravity

                                let ladireccion = armas[armasGet.enUso].state || (propsImage.direccion === 'xj' || propsImage.direccion === 'xd') ? 'xs' : propsImage.direccion
                                let rand = parseInt((Math.random() * 2))
                                if (estado) {
                                    itemsImage[0].map((key, i) => {
                                        if (key.direccion === ladireccion && key.layer === rand && key.estado === 'on') {
                                            playerClothes = key.imagen
                                        }
                                    })

                                } else {
                                    itemsImage[0].map((key, i) => {
                                        if (key.direccion === ladireccion && key.estado === 'off') {
                                            playerClothes = key.imagen
                                        }
                                    })
                                }
                                ctxC.drawImage(playerClothes, propsImage.levelPass ? psx : propsImage.refreshData ? 10 : !propsImage.alive ? 0 : psx - 8, propsImage.direccion === 'xd' ? propsImage.posY + (parseInt(propsImage.heightY) / 2) : propsImage.posY - 7, propsImage.widthX + 16, propsImage.direccion === 'xd' ? (parseInt(propsImage.heightY) / 2) : parseInt(propsImage.heightY) + 14)
                            }
                            ctxC.drawImage(aDibujar, propsImage.levelPass ? psx : propsImage.refreshData ? 10 : !propsImage.alive ? 0 : psx, propsImage.direccion === 'xd' ? propsImage.posY + (parseInt(propsImage.heightY) / 2) : propsImage.posY, propsImage.widthX, propsImage.direccion === 'xd' ? (parseInt(propsImage.heightY) / 2) : parseInt(propsImage.heightY))
                            if (propsImage.items[0].health.estado === 'inmortal') {
                                let playerClothes = propsImage.imagen[`inmortal_${armas[armasGet.enUso].state ? 'xf' : propsImage.direccion === 'xf' ? 'xb' : propsImage.direccion === 'xb' ? 'xf' : 'xb'}_${parseInt((Math.random() * 2))}`]
                                ctxC.drawImage(playerClothes, psx + (armas[armasGet.enUso].state ? -2 : propsImage.direccion === 'xb' ? -4 + (1 * (propsImage.widthX / 2)) : propsImage.direccion === 'xf' ? -17 : -12),
                                    propsImage.direccion === 'xd' ? propsImage.posY + (parseInt(propsImage.heightY) / 2) - 8 : propsImage.posY - 10.5, 30, 15)
                            }
                        } else {
                            ctxE.clearRect(0, 0, canvasE.width, canvasE.height)
                            ctxC.clearRect(0, 0, canvas.width, canvas.height)
                            let position = { malo: 0, body: 0 }
                            dibujarMalos.new.map((key, i) => {
                                if (colisioned.item === key.id) {
                                    key.imagen.map((key2, ia) => {
                                        if (key2.direccion === `joshi-evil-${propsImage.direccion}-${key.killLayer}`) {
                                            position = ia;
                                            dibujarMalos.new[i].killFotograma = dibujarMalos.new[i].killFotograma + 1;
                                            if (dibujarMalos.new[i].killFotograma === 50) {
                                                dibujarMalos.new[i].killLayer = dibujarMalos.new[i].killLayer + 1
                                            }
                                            if (dibujarMalos.new[i].killLayer === 4) {
                                                dibujarMalos.new[i].killLayer = 0
                                            }
                                        }
                                        ctxE.drawImage(key.imagen[position.malo].imagen, key.posX, key.posY, key.imagen[position.malo].imagen.naturalWidth / 22, key.imagen[position.malo].imagen.naturalHeight / 27)
                                    })
                                }
                            })
                            let aDibujar = propsImage.imagen[`${propsImage.direccion}_die`]
                            ctxC.drawImage(aDibujar, psx, propsImage.posY, propsImage.widthX, parseInt(propsImage.heightY))
                        }
                    }
                }
            }
        } else {
            console.log
        }
    }

}