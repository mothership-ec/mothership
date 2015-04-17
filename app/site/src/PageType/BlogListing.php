<?php

namespace Mothership\Site\PageType;

use Message\Mothership\CMS\PageType\AbstractBlogListing;

class BlogListing extends AbstractBlogListing
{
	public function getViewReference()
	{
		return 'Mothership:Site::page_type:blog_listing';
	}
}