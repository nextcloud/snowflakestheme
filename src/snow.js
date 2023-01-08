/**
 * SPDX-FileCopyrightText: 2022 Christian Wolf <github@christianwolf.email>
 * SPDX-License-Identifier: AGPL-3.0-or-later OR MIT
 * SPDX-FileContributor: pilzinsel64.de
 * SPDX-FileContributor: kurisubrooks.com
 */

/* Snow.js - v0.0.4
 * Originally published under MIT license
 * Extracted from https://help.nextcloud.com/t/snowflake-effect-for-your-nextcloud-2022-nc24-nc25/151462
 * Version <=0.0.3 by kurisubrooks.com
 * Version 0.0.4 by pilzinsel64.de
 */

import { loadState } from '@nextcloud/initial-state'

(function() {
	// const val = loadState('myapp', 'user_preference')

	// Provide a fallback value to return when the state is not found
	const defaultSettings = {
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
	}
	const settings = loadState('snowflakestheme', 'settings', defaultSettings)
	window.console.debug('Using setting for the snowflakes', settings)

	// Amount of Snowflakes
	// Recommended: 35
	const snowMax = settings.numFlakes

	// Snowflake Colours
	const snowColor = settings.color

	// Snow Entity
	const snowEntity = '&#x2022;'

	// Falling Velocity
	// Recommended: 0.75
	const snowSpeed = settings.speed

	// Minimum Flake Size
	// Recommended: 8
	const snowMinSize = settings.size.min

	// Maximum Flake Size
	// Recommended: 24
	const snowMaxSize = settings.size.max

	// Refresh Rate (in milliseconds)
	// Recommended: 50
	const snowRefresh = settings.refresh

	// Additional Styles
	const snowStyles = 'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;'

	/*
    // Experimental Configuration
    // ----------------------------------------
    // Do only modify this, if you know what you do. Otherwise keep in mind, that it can break the functionallity.
    */

	// The Z-Index where the snowflakes are leveled. Higher values is more in the front.
	// Increase this value if your snowflakes are not (or only partly) visible.
	// Recommended: 1000
	const snowZIndex = 100100

	// How much the snowflakes should move to left and back to right.
	// Higher Value = More
	// Recommended: 15
	const snowLeftRightMultiplicator = settings.lrMultiplicator

	// How fast the snowflakes should move to left and back to right.
	// Higher Value = Slower
	// Recommended: 10
	const snowLeftRightSpeedDivider = settings.lrDivider

	// The tolerance where the showflakes get despawned.
	// Recommended: 2
	const marginBottmTolerance = 5

	/*
    // End of Configuration
    // ----------------------------------------
    // Do not modify the code below this line
    */

	const snow = []
	const pos = []
	const coords = []
	const lefr = []
	let marginBottom
	let marginRight

	/**
	 *
	 * @param {number} range The (integer) number of possible entries in an array
	 */
	function randomise(range) {
		return Math.floor(range * Math.random())
	}

	/**
	 *
	 */
	function initSnow() {
		const snowSize = snowMaxSize - snowMinSize
		resize()

		for (let i = 0; i <= snowMax; i++) {
			coords[i] = 0
			lefr[i] = Math.random() * snowLeftRightMultiplicator
			pos[i] = 0.03 + Math.random() / snowLeftRightSpeedDivider
			snow[i] = document.getElementById('flake' + i)
			snow[i].style.fontFamily = 'inherit'
			snow[i].size = randomise(snowSize) + snowMinSize
			snow[i].style.fontSize = snow[i].size + 'px'
			snow[i].style.color = snowColor[randomise(snowColor.length)]
			snow[i].style.zIndex = snowZIndex
			snow[i].sink = snowSpeed * snow[i].size / 5
			snow[i].posX = randomise(marginRight - snow[i].size)
			snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size)
			snow[i].style.left = snow[i].posX + 'px'
			snow[i].style.top = snow[i].posY + 'px'
		}

		moveSnow()
	}

	/**
	 *
	 */
	function resize() {
		marginBottom = document.body.scrollHeight - 5
		marginRight = document.body.clientWidth - 15
	}

	/**
	 *
	 */
	function moveSnow() {
		for (let i = 0; i <= snowMax; i++) {
			coords[i] += pos[i]
			snow[i].posY += snow[i].sink
			snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + 'px'
			snow[i].style.top = snow[i].posY + 'px'

			if (snow[i].posY >= marginBottom - marginBottmTolerance * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
				snow[i].posX = randomise(marginRight - snow[i].size)
				snow[i].posY = 0
			}
		}

		window.setTimeout(moveSnow, snowRefresh)
	}

	for (let i = 0; i <= snowMax; i++) {
		const element = document.createElement('span')
		element.id = 'flake' + i
		element.style = snowStyles + 'position:absolute;top:-' + snowMaxSize
		element.innerHTML = snowEntity
		document.body.insertBefore(element, document.body.firstChild)
	}

	initSnow()
	// window.addEventListener('load', initSnow);
	window.addEventListener('resize', resize)
})()
