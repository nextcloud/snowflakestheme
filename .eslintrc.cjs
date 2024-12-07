// SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
// SPDX-License-Identifier: AGPL-3.0-or-later
module.exports = {
	extends: [
		'@nextcloud',
		"prettier" // < this needs to be the last one to override all previous
	],
	"overrides": [
		{
			"files": ["**/*.vue"],
			"rules": {
				"vue/first-attribute-linebreak": "off"
			}
		}
	]
}
