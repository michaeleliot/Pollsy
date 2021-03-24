import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../../lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
