"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloNextAppProvider, NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
    const httpLink = new HttpLink({
        // https://studio.apollographql.com/public/spacex-l4uc6p/
        uri: "http://localhost:8080/query",
        credentials: "include",
    });

    const authLink = setContext((_, { headers }) => {
        const accessToken = localStorage.getItem("access_token") ?? "";
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${accessToken}`,
            },
        };
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      authLink.concat(httpLink),
                  ])
                : authLink.concat(httpLink),
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
