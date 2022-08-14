import '../styles/styles.scss'
import { useRouter } from 'next/router'
import reqGetCompanies from '../request/reqGetCompanies'
import { Auth0Provider } from '@auth0/auth0-react'
import { EnvM } from '../envMachetero'
const envM=EnvM()
let ins = true

function MyApp(props) {
  const router = useRouter()
  const url = router.basePath !== '/' && router.basePath !== '' && router.basePath !== ' '? router.basePath : `${envM.hostFront}paginas/millonario`
  const { Component, pageProps } = props
 

  return (
    <Auth0Provider
      domain='dev-67b884j2.us.auth0.com'
      clientId='0BC3jx3OISe4l336ZJC1ipVt4UilzdC8'
      redirectUri={url}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}
MyApp.getInitialProps = async ({ Component, ctx }) => {
  const response = await reqGetCompanies()
  if (response) {
/*     console.log(response,'res');
 */    return {
      props: { names: response }, // will be passed to the page component as props
    }
    /* response.array.map((key, i) => {
      if (url === '/' + key.nombre && url !== '/' ) {

                router.push(`/paginas?page=${ key.nombre}`)
      }
    }) */
  }

  return {
    props: { names: [] }, // will be passed to the page component as props
  }
}
export default MyApp
