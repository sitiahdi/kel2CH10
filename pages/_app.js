import '../styles/globals.css'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'



SwiperCore.use([Navigation, Pagination, Autoplay])



function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
