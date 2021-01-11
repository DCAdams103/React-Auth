import '../styles/globals.css'
import {Provider} from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    /* Provider component allows instances of useSession() to share
    session objects across components. */
    <Provider session={pageProps.sessions}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
