import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
