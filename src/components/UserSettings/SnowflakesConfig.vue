<!--
SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div>
		<NcCheckboxRadioSwitch
			:checked="value.disabledForUser"
			:type="'switch'"
			@update:checked="toggleDisabled">
			{{ t('snowflakestheme', 'Disable the app for the current user') }}
		</NcCheckboxRadioSwitch>
	</div>
</template>

<script>
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'

export default {
	name: 'SnowflakesConfig',
	components: {
		NcCheckboxRadioSwitch,
	},
	props: {
		value: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	methods: {
		toggleDisabled() {
			const ret = this.value
			ret.disabledForUser = !ret.disabledForUser
			this.$emit('update:value', ret)
		},
	},
}
</script>

<style lang="scss" scoped></style>
