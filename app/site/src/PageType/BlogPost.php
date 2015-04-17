<?php

namespace Mothership\Site\PageType;

use Message\Mothership\CMS\PageType\AbstractBlog;

class BlogPost extends AbstractBlog
{
	public function getViewReference()
	{
		return 'Mothership:Site::page_type:blog_post';
	}
}