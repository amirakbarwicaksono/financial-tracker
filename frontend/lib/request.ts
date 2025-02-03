import { createClient } from "@/utils/supabase/server";
import { DocumentNode } from "graphql";

export const request = async (
	query: DocumentNode,
	variables?: object,
	cache?: RequestCache,
	tags?: string[],
) => {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.access_token}`,
		},
		body: JSON.stringify({ query: query.loc?.source.body, variables }),
		cache,
		next: {
			tags,
		},
	});

	if (!response.ok) {
		throw new Error("Error in response");
	}

	const responseData = await response.json();
	return responseData;
};
