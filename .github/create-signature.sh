#!/bin/bash

composer install --no-dev
make appstore
openssl dgst -sha512 -sign ~/.nextcloud/certificates/snowflakestheme/snowflakestheme.key build/artifacts/appstore/snowflakestheme.tar.gz | openssl base64
