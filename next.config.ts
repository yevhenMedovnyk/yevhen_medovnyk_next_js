import path from 'path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	turbopack: {
		rules: {
			'*.hbs': {
				loaders: [path.resolve(__dirname, 'loaders/handlebars-raw-loader.cjs')],
				as: '*.js',
			},
		},
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'src')],
	},
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve(__dirname, 'src');
		config.module.rules.push({
			test: /\.hbs$/,
			type: 'asset/source',
		});
		return config;
	},
};

export default withNextIntl(nextConfig);
