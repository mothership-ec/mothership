<?php

namespace Mothership\Site\Controller\Module;

use Message\ImageResize\Controller;
use Message\Mothership\CMS\Page;

class Blog extends Controller
{
	public function blogListing(Page\Page $page)
	{
		$pageLoader = $this->get('cms.page.loader');
		$pagination = $this->get('pagination');

		$pageLoader
			// ->setPagination($pagination)
			->includeDeleted(false)
			->includeUnpublished(false)
			// ->orderBy(Page\PageOrder::CREATED_DATE)
		;

		$pages = $pageLoader->getChildren($page);

		return $this->render('Mothership:Site::module:blog:blog_listing', [
			'pages'      => $pages,
			'pagination' => $pagination,
		]);
	}
}