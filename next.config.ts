import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'src')],
	},
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve(__dirname, 'src');
		return config;
	},
};

export default nextConfig;
