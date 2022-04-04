import '../styles/globals.css';
import { MoralisProvider } from 'react-moralis';
import Layout from '../components/Layout';
import ProgressBar from '@badrap/bar-of-progress';
import Router, { useRouter } from 'next/router';

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const isServerInfo = Boolean(APP_ID && SERVER_URL);

const progress = new ProgressBar({
  size: 3,
  color: '#7645D9',
  className: 'z-50',
  delay: 30,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <Layout>
        <Component
          {...pageProps}
          isServerInfo={isServerInfo}
          key={router.asPath}
        />
      </Layout>
    </MoralisProvider>
  );
}

export default MyApp;
