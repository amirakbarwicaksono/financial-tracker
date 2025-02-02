/** @type {import('next').NextConfig} */
const nextConfig = {
	// webpack: (config, { isServer }) => {
	// 	if (!isServer) {
	// 		config.externals.push({
	// 			bufferutil: "bufferutil",
	// 			"utf-8-validate": "utf-8-validate",
	// 			"supports-color": "supports-color",
	// 		});
	// 	}
	// 	config.module.rules.push({
	// 		test: /\.(graphql|gql)$/,
	// 		exclude: /node_modules/,
	// 		use: [
	// 			{
	// 				loader: "graphql-tag/loader",
	// 			},
	// 		],
	// 	});

	// 	return config;
	// },
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/a/**",
			},
		],
	},
};

module.exports = nextConfig;
