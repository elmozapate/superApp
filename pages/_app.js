import '../styles/styles.scss'
import { useRouter } from 'next/router'
import reqGetCompanies from '../request/reqGetCompanies'
import { Auth0Provider } from '@auth0/auth0-react'
let ins = true

function MyApp(props) {
  const router = useRouter();
  const url = router.basePath !== '/' && router.basePath !== '' && router.basePath !== ' '? router.basePath : 'http://localhost:3000/paginas/millonario'
  console.log(url,'url');
  const { Component, pageProps } = props
  /*  const pageCheck = async (key) => {
     router.push(`/paginas?page=${key.nombre}`)
 
   }
   const pageCheckFalse = async () => {
     router.push(`/`)
   }
   if (props.props) {
     const prop = props.props.names.array
     console.log(prop,'array2');
     prop.map((key, i) => {
       if (url === '/' + key.nombre && url !== '/') {
         pageCheck(key)
 
       }
     })
   } */


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
/* MyApp.getInitialProps = async () => {
  return {
    props: { host: }, // will be passed to the page component as props
  }

} */
export default MyApp
