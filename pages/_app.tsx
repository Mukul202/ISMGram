import '../styles/globals.css'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import {Provider} from 'react-redux';
import store from '../store/index';
import { StrictMode } from 'react';

function MyApp({ Component, pageProps:{session,...pageProps} }: any) {
  return (
    // <StrictMode>
      <Provider store={store}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Provider>
    // </StrictMode>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
  switch(metric.name){
    case 'FCP':
      break;
    case 'CLS':
      break;
    case 'LCP':
      break;
    case 'Next.js-hydration':
      break;
    default :
      break;
  }
}

export default MyApp
