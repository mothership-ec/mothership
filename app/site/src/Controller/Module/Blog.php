<?php

namespace Mothership\Site\Controller\Module;

use Message\ImageResize\Controller;
use Message\Mothership\CMS\Page;

class Blog extends Controller
{
	public function blogListing(Page\Page $page)
	{
		$pageLoader = $this->get('cms.page.loader');
		$pageLoader
			->includeDeleted(false)
			->includeUnpublished(false)
			->orderBy(Page\PageOrder::CREATED_DATE_REVERSE)
		;

		$adapter  = $this->get('pagination.adapter.array');
		$pages = $pageLoader->getChildren($page);
		$adapter->setArray($this->_sortPages($pages));

		$pagination = $this->get('pagination')->setAdapter($adapter);

		$pagination->setCurrentPage($this->get('http.request.master')->query->get('list-page', 1));
		$pagination->setMaxPerPage(3);

		$pages = $pageLoader->getChildren($page);

		return $this->render('Mothership:Site::module:blog:blog_listing', [
			'pages'      => $pagination->getCurrentPageResults(),
			'pagination' => $pagination,
		]);
	}

	protected function _sortPages($pages, $sort = null)
	{
		// Pre-load content to prevent errors with data changing in usort() call
		foreach ($pages as $page) {
			$page->getContent();
		}

		if ($sort === null) {
			usort($pages, function($a, $b) {
				if (!$a instanceof Page\Page || !$b instanceof Page\Page) {
					throw new \InvalidArgumentException('Cannot sort blog posts of non-pages!');
				}

				if ($a->hasTag('pinned')) {
					return 1;
				}

				if ($b->hasTag('pinned')) {
					return -1;
				}

				// If we don't have dates on the pages
				if (null === $a->getContent()->date) {
					$a = $a->publishDateRange->getStart();
				} else {
					$a = $a->getContent()->date->getValue() ?: $a->publishDateRange->getStart();
				}

				if (null === $b->getContent()->date) {
					$b = $b->publishDateRange->getStart();
				} else {
					$b = $b->getContent()->date->getValue() ?: $b->publishDateRange->getStart();
				}

				return $b->getTimestamp() - $a->getTimestamp();
			});
		} else {
			usort($pages, $sort);
		}

		return $pages;
	}
}