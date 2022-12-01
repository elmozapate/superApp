import { useState } from "react"
import Game from "./game"

const Test2 = () => {
    const [sinCargar, setSinCargar] = useState(true)

    return (
        <>
            <Game sinCargar={sinCargar} setSinCargar={setSinCargar} />
        </>
    )
}
export default Test2