<!--
SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div>
		<NcCheckboxRadioSwitch
			:model-value="value.disabledForUser"
			:type="'switch'"
			@update:model-value="toggleDisabled">
			{{ t('snowflakestheme', 'Disable the app for the current user') }}
		</NcCheckboxRadioSwitch>
	</div>
</template>

<script>
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

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
	emits: ['update:value'],
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
