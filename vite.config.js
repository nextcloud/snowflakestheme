// SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
// SPDX-License-Identifier: AGPL-3.0-or-later

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
		},
	}
)