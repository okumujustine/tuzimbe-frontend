import '../styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <ToastContainer />
  </>
}

export default MyApp
