/**
 * SPDX-FileCopyrightText: 2018 John Molakvoæ <skjnldsv@protonmail.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateFilePath } from '@nextcloud/router'

import Vue from 'vue'
import Settings from './components/Settings.vue'

// eslint-disable-next-line
__webpack_public_path__ = generateFilePath(appName, '', 'js/')

// if (__webpack_use_dev_server__ || false) {
// 	// eslint-disable-next-line camelcase,no-undef
// 	__webpack_public_path__ = "http://127.0.0.1:3000/apps/cookbook/js/"
// }

Vue.mixin({ methods: { t, n } })

export default new Vue({
	el: '#config-snowflakestheme',
	render: h => h(Settings),
})
