<?php
namespace Mothership\Site\Shop;

use Message\Mothership\CMS\Page;

class ProductPageLoader
{
	/**
	 * @var \Message\Mothership\CMS\Page\Loader
	 */
	protected $_loader;

	/**
	 * @var \Message\Mothership\CMS\Page\ContentLoader
	 */
	protected $_contentLoader;
	/**
	 * @var array
	 */
	protected $_pages = [];

	const PRODUCT_PAGE_TYPE = 'product';

	public function __construct(Page\Loader $loader, Page\ContentLoader $contentLoader)
	{
		$this->_loader = $loader;
		$this->_contentLoader = $contentLoader;
	}

	public function getProductPages(Page\Page $page, $sort = true)
	{
		$this->_pages = [];
		$this->_setProductPages($page);

		if ($sort) {
			$this->_sortPages();
		}

		return $this->_pages;
	}

	protected function _setProductPages(Page\Page $parent)
	{
		$children = $this->_loader->getChildren($parent);

		foreach ($children as $child) {
			if ($child->type->getName() === self::PRODUCT_PAGE_TYPE) {
				$this->_pages[] = $child;
			}

			$this->_setProductPages($child);
		}
	}

	protected function _sortPages()
	{
		$sorted = [];

		foreach ($this->_pages as $page) {
			$content = $this->_contentLoader->load($page);
			$product = $content->product->product->getProduct();
			$option  = $content->product->option->getValue();
			$option  = array_key_exists('value', $option) ? $option['value'] : '';

			$sort = $product->sortName .
				$product->name .
				$option .
				$page->id;

			$sorted[$sort] = $page;
		}

		ksort($sorted);

		$this->_pages = array_values($sorted);
	}
}