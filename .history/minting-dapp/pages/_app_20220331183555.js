import '../styles/globals.css';
import { MoralisProvider } from 'react-moralis';
import Layout from '../components/Layout';
import ProgressBar from '@badrap/bar-of-progress';
import Router, { useRouter } from 'next/router';

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const isServerInfo = Boolean(APP_ID && SERVER_URL);

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <Layout>
        <Component {...pageProps} isServerInfo={isServerInfo} />
      </Layout>
    </MoralisProvider>
  );
}

export default MyApp;
