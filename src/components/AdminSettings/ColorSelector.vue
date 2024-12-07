<!--
SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div class="color-picker">
		<NcColorPicker
			:model-value="value"
			:palette="palette"
			:advanced-fields="false"
			@update:model-value="$emit('value:update', $event)">
			<div class="color-row">
				<div class="color-preview" :style="{ 'background-color': value }" />
				<NcButton>{{ t('snowflakestheme', 'Change color') }}</NcButton>
			</div>
		</NcColorPicker>
		<NcButton
			class="color-removal"
			type="tertiary"
			:disabled="numColors <= 1"
			@click="$emit('drop-color')">
			{{ t('snowflakestheme', 'Drop color') }}
			<template #icon>
				<DeleteIcon :size="25" />
			</template>
		</NcButton>
	</div>
</template>

<script>
import NcColorPicker from '@nextcloud/vue/dist/Components/NcColorPicker.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

export default {
	name: 'ColorSelector',
	props: ['value', 'palette', 'numColors'],
	emits: ['value:update', 'drop-color'],
	components: {
		NcButton,
		NcColorPicker,
		DeleteIcon,
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

.color-picker {
	display: flex;

	.color-removal {
		margin: 0px 5px;
	}
}

.color-row {
	display: flex;
	align-items: center;
}
</style>
