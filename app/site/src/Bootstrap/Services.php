<?php

namespace Mothership\Site\Bootstrap;

use Mothership\Site\PageType;

use Message\Cog\Bootstrap\ServicesInterface;
use Message\Mothership\Commerce\Product;
use Message\Mothership\OrderReturn;

class Services implements ServicesInterface
{
	public function registerServices($services)
	{
		$services->extend('cms.page.types', function($collection, $c) {
			$collection
				->add(new PageType\Home)
				->add(new PageType\Generic)
				->add(new PageType\Product)
				->add(new PageType\ProductListing)
				->add(new PageType\BlogListing)
				->add(new PageType\BlogPost($c['user.groups']))
				->add(new PageType\Contact)
				->add(new PageType\RedirectToFirstChild)
			;

			return $collection;
		});

		// Commerce
		$services['product.types'] = function($c) {
			return new Product\Type\Collection([
				new Product\Type\ApparelProductType($c['db.query']),
			]);
		};

		$services->extend('product.image.types', function($types) {

			return $types;
		});

		$services->extend('stock.locations', function($locations) {
			$locations->add(new Product\Stock\Location\Location('web',  'Web'));
			$locations->add(new Product\Stock\Location\Location('bin',  'Bin'));
			$locations->add(new Product\Stock\Location\Location('hold', 'Hold'));

			$locations->setRoleLocation($locations::SELL_ROLE, 'web');
			$locations->setRoleLocation($locations::BIN_ROLE,  'bin');
			$locations->setRoleLocation($locations::HOLD_ROLE, 'hold');

			return $locations;
		});

		$services['app.form.subscribe'] = function($c) {
			return new \Mothership\Site\Form\Subscribe;
		};

		$services->extend('shipping.methods', function($methods) {
			$methods->add(new \Mothership\Site\ShippingMethod\Uk);

			return $methods;
		});

		$services->extend('order.dispatch.methods', function($methods) {
			$methods->add(new \Mothership\Site\DispatchMethod\Manual);

			return $methods;
		});

		$services->extend('order.dispatch.method.selector', function($selector) {
			$selector->setFunction(function($order) {
				return 'manual';
			});

			return $selector;
		});

		// Extend reasons collection
		$services->extend('return.reasons', function($c) {
			return new OrderReturn\Collection\Collection(array(
				new OrderReturn\Collection\Item('wrong-colour', 'Wrong colour'),
				new OrderReturn\Collection\Item('doesnt-suit-me', 'Doesn\'t suit me'),
				new OrderReturn\Collection\Item('wrong-item-sent', 'Wrong item sent'),
				new OrderReturn\Collection\Item('ordered-two-sizes-for-fit-returning-one', 'Ordered two sizes for fit, returning one'),
				new OrderReturn\Collection\Item('doesnt-fit-me', 'Doesn\'t fit me'),
				new OrderReturn\Collection\Item('not-as-expected', 'Not as expected'),
			));
		});

		// CMS

		$services['app.shop.product_page_loader'] = function($c) {
			return new \Mothership\Site\Shop\ProductPageLoader($c['cms.page.loader'], $c['cms.page.content_loader']);
		};
	}
}