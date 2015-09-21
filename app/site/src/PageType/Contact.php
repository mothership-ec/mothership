<?php

namespace Mothership\Site\PageType;

use Message\Mothership\CMS\PageType\PageTypeInterface;
use Message\Cog\Field\Factory as FieldFactory;

use Symfony\Component\Validator\Constraints;

class Contact implements PageTypeInterface
{
	public function getName()
	{
		return 'contact';
	}

	public function getDisplayName()
	{
		return 'Contact';
	}

	public function getDescription()
	{
		return 'A contact page';
	}

	public function allowChildren()
	{
		return true;
	}

	public function getViewReference()
	{
		return 'Mothership:Site::page_type:contact';
	}

	public function setFields(FieldFactory $factory)
	{
		$factory->add($factory->getField('richtext', 'content', 'Content')->setFieldOptions([
				'constraints' => new Constraints\NotBlank,
			]));
	}
}