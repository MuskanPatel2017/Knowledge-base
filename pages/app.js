
import Layout from '../components/Layout';
// import '../styles/globals.css';

//  Wraps every page with a layout (Next.js custom App)
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
