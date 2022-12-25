<template>
	<div>
		abc ({{ value }})
	</div>
</template>

<script>
export default {
	name: 'SnowflakesConfig',
	props: {
		value: {
			type: Object,
			default() {
				return {
				}
			},
		},
	},
}
</script>

<style>

</style>
