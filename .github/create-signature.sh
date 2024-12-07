#!/bin/bash

# SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
# SPDX-License-Identifier: AGPL-3.0-or-later

composer install --no-dev
npm run build
make appstore
openssl dgst -sha512 -sign ~/.nextcloud/certificates/snowflakestheme/snowflakestheme.key build/artifacts/appstore/snowflakestheme.tar.gz | openssl base64
