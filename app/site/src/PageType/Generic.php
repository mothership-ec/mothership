<?php

namespace Mothership\Site\PageType;

use Message\Mothership\CMS\PageType\PageTypeInterface;
use Message\Cog\Field\Factory as FieldFactory;

use Symfony\Component\Validator\Constraints;

class Generic implements PageTypeInterface
{
	public function getName()
	{
		return 'generic';
	}

	public function getDisplayName()
	{
		return 'Generic';
	}

	public function getDescription()
	{
		return 'A generic content page';
	}

	public function allowChildren()
	{
		return true;
	}

	public function getViewReference()
	{
		return 'Mothership:Site::page_type:generic';
	}

	public function setFields(FieldFactory $factory)
	{
		$factory->add($factory->getField('richtext', 'content', 'Content')->setFieldOptions([
				'constraints' => new Constraints\NotBlank,
			]));
	}
}