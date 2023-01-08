<template>
	<div class="section">
		<NcSettingsSection :title="t('snowflakestheme', 'Snowflakes Theme configuration')">
			<SnowflakesConfig :value="config"
				@update:value="updateConfig"
				@update:color="updateColor($event, true)" />
			{{ config }}
		</NcSettingsSection>
	</div>
</template>

<script>

import SnowflakesConfig from './SnowflakesConfig.vue'

import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection'

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
	methods: {
		updateConfig(ev) {
			const oldColors = this.config.color
			this.config = ev
			this.updateColor(oldColors, false)
			this.storeData()
		},
		updateColor(colors, store) {
			this.config.color.splice(0, Infinity, ...colors)
			if (store) {
				this.storeData()
			}
		},
		storeData() {
			console.log('Storing of config data to backend')
		},
	},
}
</script>

<style lang="sass" scoped>
</style>
