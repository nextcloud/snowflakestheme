<?php

declare(strict_types=1);
// SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\SnowflakesTheme\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\Settings\ISettings;
use OCP\Util;
use Psr\Log\LoggerInterface;

class UserSettings implements ISettings {
	/** @var string */
	private $appId;

	public function __construct($appName, LoggerInterface $logger) {
		$this->appId = $appName;
	}

	public function getForm() {
		$params = [];
		Util::addScript($this->appId, 'snowflakestheme-config');
		Util::addStyle($this->appId, 'snowflakestheme-config');
		return new TemplateResponse($this->appId, 'admin', $params);
	}

	public function getSection() {
		// return 'overview';
		return 'additional';
	}

	public function getPriority() {
		return 100;
	}
}
