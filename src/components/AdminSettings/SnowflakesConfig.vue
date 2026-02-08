<!--
SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div>
		<NcCheckboxRadioSwitch
			:model-value="value.enabled"
			:type="'switch'"
			@update:model-value="toggleEnable">
			{{ t('snowflakestheme', 'Enable the snowflakes globally') }}
		</NcCheckboxRadioSwitch>
		<NcCheckboxRadioSwitch
			:model-value="value.enabledPublicly"
			:type="'switch'"
			@update:model-value="toggleEnablePublicly">
			{{ t('snowflakestheme', 'Enable the snowflakes on public pages') }}
		</NcCheckboxRadioSwitch>
		<div class="settings">
			<div class="label">
				{{ t('snowflakestheme', 'Number of flakes') }}
			</div>
			<NumericInput
				:value="value.numFlakes"
				:float="false"
				:min="5"
				:max="100"
				@update:value="setNumFlakes" />
			<template v-for="(col, idx) in value.color" :key="'label' + idx">
				<div class="label">
					{{
						t('snowflakestheme', 'Color number {number}', {
							number: idx,
						})
					}}
				</div>
				<ColorSelector
					:value="col"
					:palette="colorPalette"
					:num-colors="value.color.length"
					@drop-color="removeColor(idx)"
					@update:value="setColor(idx, $event)" />
			</template>
			<div class="label" />
			<NcButton @click="addColor">
				{{ t('snowflakestheme', 'Add color') }}
				<template #icon>
					<PlusIcon :size="25" />
				</template>
			</NcButton>
			<div class="label">
				{{ t('snowflakestheme', 'Speed of flakes') }}
			</div>
			<NumericInput
				:value="value.speed"
				:float="true"
				:min="0.1"
				:max="5"
				@update:value="setSpeed" />
			<div class="label">
				{{ t('snowflakestheme', 'Minimum size') }}
			</div>
			<NumericInput
				:value="value.size.min"
				:float="false"
				:min="1"
				:max="value.size.max"
				@update:value="setMinSize" />
			<div class="label">
				{{ t('snowflakestheme', 'Maximum size') }}
			</div>
			<NumericInput
				:value="value.size.max"
				:float="false"
				:min="value.size.min"
				:max="150"
				@update:value="setMaxSize" />
			<div class="label">
				{{ t('snowflakestheme', 'Refresh interval') }}
			</div>
			<NumericInput
				:value="value.refresh"
				:float="false"
				:min="5"
				:max="50"
				@update:value="setRefresh" />
			<div class="label">
				{{ t('snowflakestheme', 'Amount of left/right movement') }}
			</div>
			<NumericInput
				:value="value.lrMultiplicator"
				:float="false"
				:min="5"
				:max="100"
				@update:value="setMultiplier" />
			<div class="label">
				{{ t('snowflakestheme', 'Speed of left/right movement') }}
			</div>
			<NumericInput
				:value="value.lrDivider"
				:float="false"
				:min="5"
				:max="100"
				@update:value="setDivider" />
		</div>
	</div>
</template>

<script>
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcButton from '@nextcloud/vue/components/NcButton'

import ColorSelector from './ColorSelector.vue'

import PlusIcon from 'vue-material-design-icons/Plus.vue'

import NumericInput from '../NumericInput.vue'

export default {
	name: 'SnowflakesConfig',
	components: {
		NcCheckboxRadioSwitch,
		NcButton,
		PlusIcon,
		NumericInput,
		ColorSelector,
	},
	props: {
		value: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	emits: ['update:value', 'update:color'],
	data() {
		return {
			colorPalette: [
				'#FFFFFF',
				'#EEEEEE',
				'#DDDDDD',
				'#CCCCCC',
				'#BBBBBB',
				'#AAAAAA',
			],
		}
	},
	methods: {
		toggleEnable() {
			const ret = this.value
			ret.enabled = !ret.enabled
			this.$emit('update:value', ret)
		},
		toggleEnablePublicly() {
			const ret = this.value
			ret.enabledPublicly = !ret.enabledPublicly
			this.$emit('update:value', ret)
		},
		setNumFlakes(ev) {
			const ret = this.value
			ret.numFlakes = ev
			this.$emit('update:value', ret)
		},
		setColor(idx, ev) {
			const ret = this.value.color
			ret[idx] = ev
			this.$emit('update:color', ret)
		},
		addColor() {
			const ret = this.value.color
			ret.push('#FFF')
			this.$emit('update:color', ret)
		},
		removeColor(idx) {
			const ret = this.value.color
			ret.splice(idx, 1)
			this.$emit('update:color', ret)
		},
		setSpeed(ev) {
			const ret = this.value
			ret.speed = ev
			this.$emit('update:value', ret)
		},
		setMinSize(ev) {
			const ret = this.value
			ret.size.min = ev
			this.$emit('update:value', ret)
		},
		setMaxSize(ev) {
			const ret = this.value
			ret.size.max = ev
			this.$emit('update:value', ret)
		},
		setRefresh(ev) {
			const ret = this.value
			ret.refresh = ev
			this.$emit('update:value', ret)
		},
		setMultiplier(ev) {
			const ret = this.value
			ret.lrMultiplicator = ev
			this.$emit('update:value', ret)
		},
		setDivider(ev) {
			const ret = this.value
			ret.lrDivider = ev
			this.$emit('update:value', ret)
		},
	},
}
</script>

<style lang="scss" scoped>
.color-preview {
	border: solid black 2px;
	display: inline;
	border-radius: 50%;
	width: 35px;
	height: 35px;
	margin: 5px;
}

.settings {
	.label {
		display: flex;
		margin: 8px 0px 0px;
	}

	@media screen and (min-width: 1000px) {
		display: grid;
		grid-template-columns: 1fr 3fr;
		row-gap: 5px;
	}
}

.color-row {
	display: flex;
	align-items: center;
}
</style>
