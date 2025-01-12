import { ApolloWrapper } from "@/lib/apollo-wrapper";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return <ApolloWrapper>{children}</ApolloWrapper>;
};

export default Layout;
