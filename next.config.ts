import path from 'path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'src')],
	},
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve(__dirname, 'src');
		return config;
	},
};

export default withNextIntl(nextConfig);
