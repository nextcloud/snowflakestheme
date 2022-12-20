// SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
// SPDX-License-Identifier: AGPL-3.0-or-later
const webpackConfig = require('@nextcloud/webpack-vue-config');
const webpackMerge = require('webpack-merge');
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = webpackMerge.merge(webpackConfig, {
    entry: {
        snow: './snow.js',
    },
    context: path.join(__dirname, 'src'),
    plugins: [
        new CleanWebpackPlugin(),
    ],
});
