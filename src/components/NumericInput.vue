<!--
SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div>
		<NcTextField :value.sync="currentValue" :error="error" @change="onChange" />
	</div>
</template>

<script>
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'

export default {
	name: 'NumericInput',
	components: {
		NcTextField,
	},
	props: {
		value: {
			type: Number,
			default() {
				return 35
			},
		},
		min: {
			type: Number,
			default() {
				return 5
			},
		},
		max: {
			type: Number,
			default() {
				return 100
			},
		},
		float: {
			type: Boolean,
			default() {
				return false
			},
		},
	},
	data() {
		return {
			currentValue: '0',
		}
	},
	computed: {
		validNumber() {
			let re
			if (this.float) {
				re = /^\s*[0-9]+(\.[0-9]*)?\s*$/
			} else {
				re = /^\s*[0-9]+\s*$/
			}
			return this.currentValue.match(re) != null
		},
		numericValue() {
			if (this.float) {
				return parseFloat(this.currentValue)
			} else {
				return parseInt(this.currentValue)
			}
		},
		valid() {
			return (
				this.validNumber &&
				this.numericValue >= this.min &&
				this.numericValue <= this.max
			)
		},
		error() {
			return !this.valid
		},
	},
	watch: {
		value(val, oldVal) {
			this.currentValue = String(val)
		},
	},
	beforeMount() {
		this.currentValue = String(this.value)
	},
	methods: {
		onChange() {
			if (!this.error) {
				this.$emit('update:value', this.numericValue)
			}
		},
	},
}
</script>
