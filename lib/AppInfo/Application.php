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
use OCP\IConfig;
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
		/** @var IConfig $config */
		$config = $context->getAppContainer()->get(IConfig::class);
		
		$defaultSettings = [
			'numFlakes' => 35,
			'color' => ["#DDD", "#EEE"],
			'speed' => 0.75,
			'size' => [5, 20],
			'refresh' => 15,
			'lrMultiplicator' => 10,
			'lrDivider' => 20,
		];

		$cfg = $config->getAppValue(self::APP_ID, 'settings', $defaultSettings);
		$state->provideInitialState('settings', $cfg);
		// $logger->error('Test Message');
	}
}
