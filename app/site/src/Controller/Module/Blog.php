<?php

namespace Mothership\Site\Controller\Module;

use Message\Cog\Filter\FilterCollection;
use Message\Cog\Pagination\Pagination;
use Message\ImageResize\Controller;
use Message\Mothership\CMS\Page;

class Blog extends Controller
{
	const POSTS_PER_PAGE = 3;

	/**
	 * Render the blog listing page
	 *
	 * @param Page\Page | int $page
	 * @param string | FilterCollection | null $filters
	 *
	 * @return \Message\Cog\HTTP\Response
	 */
	public function blogListing($page, $filters = null)
	{
		if (!$page instanceof Page\Page && !is_numeric($page)) {
			throw new \InvalidArgumentException('First parameter must be either be an instance of Page or a page ID');
		} elseif (!$page instanceof Page\Page) {
			$page = $this->get('cms.page.loader')->getByID($page);
		}

		$pagination = $this->_getPagination();

		$pageLoader = $this->get('cms.page.loader');
		$pageLoader
			->includeDeleted(false)
			->includeUnpublished(false)
			->setPagination($pagination)
			->orderBy(Page\PageOrder::CREATED_DATE_REVERSE)
		;

		$data = [];

		if (null !== $filters) {
			$filters = $this->_getFilters($filters, $page);
			$form = $this->_getFiltersForm($filters);

			if ($form->isValid()) {
				$data = $form->getData();
				$filters = $this->get('filter.data_binder')->bindData($data, $filters);
				$pageLoader->applyFilters($filters);
			}
		}

		return $this->render('Mothership:Site::module:blog:blog_listing', [
			'pages'      => $pageLoader->getChildren($page),
			'pagination' => $pagination,
			'data'       => $data,
		]);
	}

	/**
	 * Validate the $filters variable and if it is a service name, load it from the service container
	 *
	 * @param string | FilterCollection $filters
	 *
	 * @return FilterCollection
	 */
	private function _getFilters($filters, Page\Page $page)
	{
		if (!is_string($filters) && !$filters instanceof FilterCollection) {
			throw new \InvalidArgumentException('Parameter to render filter form must be either the service name of the filter collection or an instance of \\Message\\Cog\\Filter\\FilterCollection');
		} elseif (is_string($filters)) {

			$filterCollection = $this->get($filters);

			if (!$filterCollection instanceof FilterCollection) {
				throw new \LogicException('Service with name `' . $filters . '` must be an instance of \\Message\\Cog\\Filter\\FilterCollection');
			}

			$filters = $filterCollection;

			foreach ($filters as $filter) {
				if ($filter instanceof Page\Filter\TagFilter) {
					$tags = $this->get('cms.page.tag.loader')->getTagsFromChildren($page);
					$filter->setOptions([
						'choices' => array_combine($tags, $tags)
					]);
				}
			}
		}

		return $filters;
	}

	/**
	 * Build the filter form from the filter collection and handle the request
	 *
	 * @param FilterCollection $filters
	 *
	 * @return \Message\Cog\Filter\FilterForm
	 */
	private function _getFiltersForm(FilterCollection $filters)
	{
		$form = $this->get('filter.form_factory')->getForm($filters);
		$form = $this->createForm($form);
		$form->handleRequest();

		return $form;
	}

	/**
	 * Get the paginator from the service container and set the current page, and set the max items
	 * per page
	 *
	 * @return Pagination
	 */
	private function _getPagination()
	{
		// Set pagination to 1
		if ($this->get('request')->server->has('HTTP_X_REQUESTED_WITH') &&
			strtolower($this->get('request')->server->get('HTTP_X_REQUESTED_WITH')) == 'xmlhttprequest') {
			$listPage = 1;
		} else {
			$listPage = $this->get('http.request.master')->query->get('list-page', 1);
		}

		$pagination = $this->get('pagination');
		$pagination->setCurrentPage($listPage);
		$pagination->setMaxPerPage(self::POSTS_PER_PAGE);

		return $pagination;
	}
}