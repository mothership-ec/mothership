<?php

namespace Mothership\Site\Controller\Module;

use Message\Cog\Controller\Controller;
use Message\Mothership\CMS\Page\Page;
use Message\Cog\Field\RepeatableContainer;
use Message\Mothership\Commerce\Product\Product;
use Message\Mothership\Commerce\FieldType\Productoption;

class Shop extends Controller
{
	const PRODUCT_TYPE = 'product';

	public function productBlocks(Page $page)
	{
		return $this->render('Mothership:Site::module:shop:product_blocks', [
			'pages'  => $this->get('app.shop.product_page_loader')->getProductPages($page),
			'perRow' => 4,
		]);
	}

	public function basket()
	{
		$basket = $this->get('basket')->getOrder();
		$totalListPrice = 0;

		foreach ($basket->items as $item) {
			$totalListPrice += $item->listPrice;
		}

		return $this->render('Mothership:Site::module:shop:basket', [
			'basket'         => $basket,
			'totalListPrice' => $totalListPrice,
		]);
	}

	public function crossSell(RepeatableContainer $crossSell)
	{
		$mapper = $this->get('product.page_mapper.option_criteria');

		$mapper->setValidFieldNames([
			'product',

		]);
		$mapper->setValidGroupNames([
			'product',
		]);

		return $this->render('Mothership:Site::module:shop:cross_sell', [
			'mapper'     => $mapper,
			'cross_sell' => $crossSell,
		]);
	}

}