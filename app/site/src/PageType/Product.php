<?php

namespace Mothership\Site\PageType;

use Message\Mothership\CMS\PageType\PageTypeInterface;
use Message\Cog\Field\Factory as FieldFactory;
use Message\Mothership\Ecommerce\PageType\AbstractProduct;

use Message\Mothership\FileManager\File;
use Symfony\Component\Validator\Constraints;

class Product extends AbstractProduct
{
	public function getViewReference()
	{
		return 'Mothership:Site::page_type:product';
	}
}