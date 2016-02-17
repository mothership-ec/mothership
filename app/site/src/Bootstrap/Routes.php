<?php

namespace Mothership\Site\Bootstrap;

use Message\Cog\Bootstrap\RoutesInterface;
use Message\Cog\Service\ContainerInterface;
use Message\Cog\Service\ContainerAwareInterface;

class Routes implements RoutesInterface, ContainerAwareInterface
{
	protected $_services;

	/**
	 * {@inheritDoc}
	 */
	public function setContainer(ContainerInterface $container)
	{
		$this->_services = $container;
	}

	public function registerRoutes($router)
	{
		// Call $this->enableSSL($router) here if the live site has an SSL certificate

		$router->add('app.subscribe.action', '/mailing-list/subscribe', 'Mothership:Site::Controller:Module:Subscribe#subscribeAction')
			->setMethod('POST')
		;

		$router->add('app.blog.listing', '/blog-listing/{page}/{filters}', 'Mothership:Site::Controller:Module:Blog#blogListing')
			->setMethod('GET')
		;
	}

	public function enableSSL($router)
	{
		// Skip if not in live or dev environment
		if (!in_array($this->_services['environment']->get(), ['live'])) {
			return false;
		}

		$httpKeys = ['ms.cp'];

		foreach ($router as $key => $collection) {
			if (!in_array($key, $httpKeys)) {
				$router[$key]->setSchemes(['https']);
			} else {
				$router[$key]->setSchemes(['http']);
			}
		}
	}
}