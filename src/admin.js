/**
 * SPDX-FileCopyrightText: 2023 Christian Wolf <github@christianwolf.email>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp } from 'vue'
import Settings from './components/AdminSettings/Settings.vue'

const app = createApp(Settings)
app.mixin({ methods: { t, n } })
app.mount('#config-snowflakestheme')
