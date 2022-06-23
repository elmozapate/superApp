import { useState, useEffect } from 'react';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")

const FloorApp = ({ nowPlaying=false,userIn = 0, changeArray = console.log, floorMap = [] }) => {


    return (<>
        <div className="calamar-puente">
            {
                floorMap.slice(0).reverse().map((key, i) => {
                    return <div key={`ìii-${i}`} onClick={ (userIn) === key.number && nowPlaying?(e) => { e.preventDefault(); changeArray(key) }:(e) => { e.preventDefault(); console.log }} className={key.state ? ' calamar-piso-broke' : (userIn ) !== key.number ? (userIn ) > key.number ?"calamar-piso-passed" :"calamar-piso" :!nowPlaying?'calamar-piso': "calamar-piso-accecible"}></div>
                })
            }


        </div>



    </>)
}
export default FloorApp
