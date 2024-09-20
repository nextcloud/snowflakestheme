import { createAppConfig } from '@nextcloud/vite-config'
import { join, resolve } from 'path'
import cleanPlugin from 'vite-plugin-clean'

export default createAppConfig(
	{
        snow: resolve(join('src', 'snow.js')),
		admin: resolve(join('src', 'admin.js')),
		config: resolve(join('src', 'config.js')),
	}, {
		createEmptyCSSEntryPoints: true,
		extractLicenseInformation: true,
		thirdPartyLicense: false,
		config: {
            plugins: [
                cleanPlugin,
            ],
		// 	resolve: {
		// 		alias: {
		// 			cookbook: resolve(__dirname, 'src'),
		// 			icons: resolve(
		// 				__dirname,
		// 				'node_modules/vue-material-design-icons'
		// 			),
		// 		},
		// 	},
		},
	}
)