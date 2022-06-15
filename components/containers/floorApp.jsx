import { useState, useEffect } from 'react';
import io from "socket.io-client"
const socket = io("https://serverazteca.herokuapp.com/")

const FloorApp = ({ userIn = 0, changeArray = console.log, floorMap = [] }) => {


    return (<>
        <div className="calamar-puente">
            {
                floorMap.slice(0).reverse().map((key, i) => {
                    return <div onClick={ (userIn + 1) === key.number ?(e) => { e.preventDefault(); changeArray(key) }:(e) => { e.preventDefault(); console.log }} className={key.state ? ' calamar-piso-broke' : (userIn + 1) !== key.number ? (userIn + 1) > key.number ?"calamar-piso-passed" :"calamar-piso" : "calamar-piso-accecible"}></div>
                })
            }


        </div>



    </>)
}
export default FloorApp
