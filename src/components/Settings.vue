<template>
	<div class="section">
		<NcSettingsSection :title="t('snowflakestheme', 'Snowflakes Theme configuration')">
			<SnowflakesConfig :value="config"
				@update:value="updateConfig($event, true)"
				@update:color="updateColor($event, true)" />
			{{ config }}
		</NcSettingsSection>
	</div>
</template>

<script>

import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection'

import SnowflakesConfig from './SnowflakesConfig.vue'
import axios from '@nextcloud/axios'
import {generateUrl} from '@nextcloud/router'

export default {
	name: 'Settings',
	components: {
		NcSettingsSection,
		SnowflakesConfig,
	},
	data() {
		return {
			config: {
				enabled: true,
				enabledPublicly: true,
				numFlakes: 35,
				color: ['#DDD', '#EEE'],
				speed: 0.75,
				size: {
					min: 5,
					max: 20,
				},
				refresh: 15,
				lrMultiplicator: 10,
				lrDivider: 20,
			},
		}
	},
	beforeMount() {
		const url = generateUrl('/apps/snowflakestheme/globalSettings')
		axios.get(url).then((rcv) => {
			this.updateConfig(rcv.data, false)
		})
	},
	methods: {
		updateConfig(ev, store) {
			const oldColors = this.config.color
			this.config = ev
			this.updateColor(oldColors, false)
			if (store) {
				this.storeData()
			}
		},
		updateColor(colors, store) {
			this.config.color.splice(0, Infinity, ...colors)
			if (store) {
				this.storeData()
			}
		},
		storeData() {
			console.log('Storing of config data to backend')
			const url = generateUrl('/apps/snowflakestheme/globalSettings')
			const data = {
				value: this.config,
			}
			axios.post(url, data)
		},
	},
}
</script>

<style lang="sass" scoped>
</style>
