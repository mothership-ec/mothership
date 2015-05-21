<?php

namespace Mothership\Site\PageType;

use Message\Mothership\CMS\PageType\AbstractBlog;
use Message\Cog\Field\Factory as FieldFactory;

class BlogPost extends AbstractBlog
{
	public function getViewReference()
	{
		return 'Mothership:Site::page_type:blog_post';
	}

	public function setFields(FieldFactory $factory)
	{
		parent::setFields($factory);

		$group = $factory->getGroup('supergroup');
		$group->add(
			$factory->addField('text', 'test')
		);

		$factory->add($group);
	}
}