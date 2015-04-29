<?php

namespace Mothership\Site\PageType;

use Message\Mothership\Ecommerce\PageType\AbstractProductListing;
use Message\Mothership\CMS\PageType\PageTypeInterface;
use Message\Cog\Field\Factory as FieldFactory;

class ProductListing extends AbstractProductListing
{
	public function getName()
	{
		return 'product_listing';
	}

	public function getDisplayName()
	{
		return 'Product listing';
	}

	public function getDescription()
	{
		return 'A page for listing products';
	}

	public function allowChildren()
	{
		return true;
	}

	public function getViewReference()
	{
		return 'Mothership:Site::page_type:product_listing';
	}

	public function setFields(FieldFactory $factory)
	{}
}