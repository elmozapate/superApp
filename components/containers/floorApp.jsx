import { useState, useEffect } from 'react';
import io from "socket.io-client"
const socket = io("http://localhost:3002/")

const FloorApp = ({ nowPlaying=false,userIn = 0, changeArray = console.log, floorMap = [] }) => {


    return (<>
        <div className="calamar-puente">
            {
                floorMap.slice(0).reverse().map((key, i) => {
                    return <div onClick={ (userIn) === key.number && nowPlaying?(e) => { e.preventDefault(); changeArray(key) }:(e) => { e.preventDefault(); console.log }} className={key.state ? ' calamar-piso-broke' : (userIn ) !== key.number ? (userIn ) > key.number ?"calamar-piso-passed" :"calamar-piso" :!nowPlaying?'calamar-piso': "calamar-piso-accecible"}></div>
                })
            }


        </div>



    </>)
}
export default FloorApp
