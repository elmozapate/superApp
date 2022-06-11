import '../styles/styles.scss'
import { useRouter } from 'next/router'
import reqGetCompanies from '../request/reqGetCompanies'
let ins = true

function MyApp(props) {
  const router = useRouter()
  const url = props.router.asPath
  const { Component, pageProps } = props
  const pageCheck = async (key) => {
    router.push(`/paginas?page=${key.nombre}`)

  }
  const pageCheckFalse = async () => {
    router.push(`/`)
  }
  if (props.props) {
    const prop = props.props.names.array
/*     console.log(prop,'array2');
 */    prop.map((key, i) => {
      if (url === '/' + key.nombre && url !== '/') {
        pageCheck(key)
      
      }
    })
  }


  return <Component {...pageProps} />
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
