<!--
SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div class="section">
		<NcSettingsSection :title="t('snowflakestheme', 'Snowflakes Theme configuration')">
			<div class="all-config">
				<SnowflakesConfig :value="config"
					:style="{ opacity: showLoading ? 0.25 : 1 }"
					@update:value="updateConfig($event, true)"
					@update:color="updateColor($event, true)" />
				<div v-if="showLoading"
					class="overlay">
					<NcLoadingIcon :size="100" />
				</div>
			</div>
		</NcSettingsSection>
	</div>
</template>

<script>

import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

import SnowflakesConfig from './SnowflakesConfig.vue'

export default {
	name: 'Settings',
	components: {
		NcSettingsSection,
		NcLoadingIcon,
		SnowflakesConfig,
	},
	data() {
		return {
			config: {
				disabledForUser: false,
			},
			showLoading: true,
		}
	},
	beforeMount() {
		this.showLoading = true
		const url = generateUrl('/apps/snowflakestheme/userSettings')
		axios.get(url).then((rcv) => {
			this.updateConfig(rcv.data, false)
			this.showLoading = false
		})
	},
	methods: {
		updateConfig(ev, store) {
			this.config = ev
			if (store) {
				this.storeData()
			}
		},
		storeData() {
			const url = generateUrl('/apps/snowflakestheme/userSettings')
			const data = {
				value: this.config,
			}
			axios.post(url, data)
		},
	},
}
</script>

<style lang="scss" scoped>
.all-config {
	position: relative;

	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
	}
}
</style>
