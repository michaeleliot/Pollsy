import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { useApollo } from '../../lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
      <Head>
        <title>Pollsy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
