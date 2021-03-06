import { useState } from "react"
import Head from 'next/head'
import TabletaParticipantes from "./millonario/tabletaParticipantes"

const Millonario = (props) => {
    const [ip, setIp] = useState(props.ip || false)
    const [fromPage, setfromPage] = useState(props.page )


    return (
        <>
        <Head>
              <title>SE MILLONARIO</title>
              <meta name="description" content="gamesApp app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
        <div className="body bgcolor-black">
            <TabletaParticipantes  fromPage={props.page} ip={ip} />

        </div>
        </>
    )


}
export async function getServerSideProps({ req, query }) {
    const querytext = query.page || ''
    const forwarded = req.headers["x-forwarded-for"]
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    let min = 1111111110
    let max = 9000000000
    return {
        props: {
            ip: Math.floor(Math.random() * (max - min)) + min,
            page: querytext
        },
    }
}
export default Millonario