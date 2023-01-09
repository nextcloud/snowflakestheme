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
use OCP\IConfig;
use OCP\Util;

class Application extends App implements IBootstrap {
	public const APP_ID = 'snowflakestheme';

	public function __construct() {
		parent::__construct(self::APP_ID);
	}

	public function register(IRegistrationContext $context): void
	{}

	public function boot(IBootContext $context): void {
		/** @var IInitialState $state */
		$state = $context->getAppContainer()->get(IInitialState::class);
		/** @var IConfig $config */
		$config = $context->getAppContainer()->get(IConfig::class);
		/** @var ?string $userId */
		$userId = $context->getAppContainer()->get('userId');
		
		$defaultSettings = [
			'enabled' => true,
			'enabledPublicly' => true,
			'numFlakes' => 35,
			'color' => ["#DDD", "#EEE"],
			'speed' => 0.75,
			'size' => [
				'min' => 5,
				'max' => 20
			],
			'refresh' => 15,
			'lrMultiplicator' => 10,
			'lrDivider' => 20,
		];

		$cfgJson = $config->getAppValue(self::APP_ID, 'settings', json_encode($defaultSettings));
		$cfg = json_decode($cfgJson, true);

		$userLoggedIn = ($userId !== null);

		if ($cfg['enabled'] && ($userLoggedIn || $cfg['enabledPublicly'])) {
			if ($userLoggedIn) {
				$defaultUser = [
					'disabledForUser' => false,
				];
				$userCfgJson = $config->getUserValue($userId, Application::APP_ID, 'config', json_encode($defaultUser));
				$userCfg = json_decode($userCfgJson, true);

				if (! $userCfg['disabledForUser']) {
					$this->addScriptToHeader($state, $cfg);
				}
			} else if($cfg['enabledPublicly']) {
				$this->addScriptToHeader($state, $cfg);
			}
		}
	}
	
	private function addScriptToHeader(IInitialState $state, array $cfg) {
		$state->provideInitialState('settings', $cfg);
		Util::addScript(self::APP_ID, 'snowflakestheme-snow');
	}
}
