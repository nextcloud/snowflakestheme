<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Christian Wolf <github@christianwolf.email>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\SnowflakesTheme\Controller;

use OCA\SnowflakesTheme\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IConfig;
use OCP\IRequest;

class SettingsController extends Controller {

    /** @var IConfig */
    private $config;

    public function __construct(IConfig $config, IRequest $request) {
        $this->config = $config;
        $this->request = $request;
    }

    public function getAppConfig(): JSONResponse {
        $default = [
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
        $defaultJson = json_encode($default);
        $settings = $this->config->getAppValue(Application::APP_ID, 'settings', $defaultJson);
        return new JSONResponse(json_decode($settings, true));
    }

    public function setAppConfig(): JSONResponse {
        $value = $this->request->getParam('value', null);
        if($value === null) {
            return new JSONResponse('Invalid request structure.', Http::STATUS_BAD_REQUEST);
        } else {
            $this->config->setAppValue(Application::APP_ID, 'settings', json_encode($value));
            return new JSONResponse('OK', Http::STATUS_NO_CONTENT);
        }
    }
}
