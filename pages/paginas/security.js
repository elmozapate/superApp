import Head from 'next/head'
import SecureApp from '../creador/tools/secureReturn';

export default function Chat() {
    return (
        <div className='main bgcolor-transparent '>
            <Head>
                <title>Secure</title>
                <meta name="description" content="FullStack app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SecureApp />
        </div >
    )
}