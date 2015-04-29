<?php

namespace Mothership\Site\Controller\Module;

use Message\Mothership\CMS\Page\Page;
use Message\Cog\Controller\Controller;

class Menu extends Controller
{
	const FOOTER_TAG = 'footer';
	const HEADER_TAG = 'header';

	protected $_active = [];

	public function menu(Page $currentPage = null, Page $page = null, array $active = null)
	{
		$pages = $this->get('cms.page.loader')
			->includeDeleted(false)
			->includeUnpublished(false)
			->getChildren($page);
		$pages = ($pages) ? (array) $pages : [];

		if ($currentPage && (null === $active)) {
			$this->_setActiveItems($currentPage);
		}
		elseif ($currentPage) {
			$this->_active = $active;
		}

		return $this->render('Mothership:Site::module:menu:menu', [
			'pages'       => $pages,
			'active'      => $this->_active,
			'currentPage' => $currentPage,
		]);
	}

	public function footer()
	{
		$pages = $this->get('cms.page.loader')->getByTag(self::FOOTER_TAG);
		$pages = ($pages) ? (array) $pages : [];

		$children = [];

		foreach ($pages as $page) {
			$children[$page->id] = $this->get('cms.page.loader')->getChildren($page);
		}

		return $this->render('Mothership:Site::module:menu:footer', [
			'pages'    => $pages,
			'children' => $children,
		]);
	}

	protected function _setActiveItems(Page $page)
	{
		$this->_active[] = $page->id;

		$parent = $this->get('cms.page.loader')->getParent($page);

		if ($parent instanceof Page) {
			$this->_setActiveItems($parent);
		}
	}
}