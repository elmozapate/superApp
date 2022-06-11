import { useState, useEffect } from 'react';
let aux =['.', '.', '.', '.', '.']
const Index = () => {
  
    return <></>
}
export default Index
export const SelectedNumber = ({ arrayHere = [], pos = 0 }) => {
    const [selectedNumbers, setSelectedNumbers] = useState(['.', '.', '.', '.', '.'])
   
   const doing=()=>{
    aux[pos] = arrayHere[pos]
    setSelectedNumbers(aux)
   }
    useEffect(() => {
        doing()
        console.log(selectedNumbers);
        setSelectedNumbers(aux)
    }, [arrayHere, pos,aux])
  
    return (
        <>{arrayHere.map((key, i) => {
            return <><span onClick={(e) => { e.preventDefault(); }} className={'bingo-number activenum bigball'} id={i} key={i}>{key}</span> </>
        })}</>
    )
}