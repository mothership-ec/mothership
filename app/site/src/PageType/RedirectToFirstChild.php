<?php

namespace Mothership\Site\PageType;

use Message\Mothership\CMS\PageType\PageTypeInterface;

use Message\Mothership\FileManager\File;
use Message\Cog\Field\Factory as FieldFactory;

class RedirectToFirstChild implements PageTypeInterface
{
	public function getName()
	{
		return 'redirect_to_first_child';
	}

	public function getDisplayName()
	{
		return 'Redirect to First Child';
	}

	public function getDescription()
	{
		return 'This page has no content and will never be seen. Requesting this page will always just redirect the user to the first available page inside of this page.';
	}

	public function allowChildren()
	{
		return true;
	}

	public function getViewReference()
	{
		return null;
	}

	public function setFields(FieldFactory $factory)
	{
	}
}