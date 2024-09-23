/**
 * SPDX-FileCopyrightText: 2023 Christian Wolf <github@christianwolf.email>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue from 'vue'
import Settings from './components/UserSettings/Settings.vue'

Vue.mixin({ methods: { t, n } })

export default new Vue({
	el: '#config-snowflakestheme',
	render: h => h(Settings),
})
