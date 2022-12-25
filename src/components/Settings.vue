<template>
	<div class="section">
		<h2 class="inlineblock">Snowflakes Theme configuration</h2>
		<SnowflakesConfig :value.sync="config" />
	</div>
</template>

<script>

// import './SnowflakesConfig.vue'
import SnowflakesConfig from './SnowflakesConfig.vue'

export default {
	name: 'Settings',
	components: {
		SnowflakesConfig,
	},
	data() {
		return {
			config: {
				a: 'ab',
			},
		}
	},
}
</script>

<style lang="sass" scoped>
</style>
