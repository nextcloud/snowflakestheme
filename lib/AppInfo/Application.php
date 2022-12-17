<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\SnowflakesTheme\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Services\IInitialState;
use OCP\IAppConfig;
use OCP\Util;
use Psr\Log\LoggerInterface;

class Application extends App implements IBootstrap {
	public const APP_ID = 'snowflakestheme';

	public function __construct() {
		parent::__construct(self::APP_ID);
		Util::addScript(self::APP_ID, 'snowflakestheme-snow');
		// $state->provideInitialState('foo', 123);
		// $log->info('Test logger');
	}

	public function register(IRegistrationContext $context): void
	{}

	public function boot(IBootContext $context): void {
		/** @var IInitialState $state */
		$state = $context->getAppContainer()->get(IInitialState::class);
		$config = $context->getAppContainer()->get(IAppConfig::class);

		$cfg = [
			'a' => 123,
			'b' => 'bar',
		];
		$state->provideInitialState('settings', $cfg);
		// $logger->error('Test Message');
	}
}
