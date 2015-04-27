<?php

namespace Mothership\Site\PageType;

use Message\Mothership\CMS\PageType\PageTypeInterface;
use Message\Cog\Field\Factory as FieldFactory;

use Message\Mothership\FileManager\File;
use Symfony\Component\Validator\Constraints;

class Home implements PageTypeInterface
{
	public function getName()
	{
		return 'home';
	}

	public function getDisplayName()
	{
		return 'Home';
	}

	public function getDescription()
	{
		return 'The home page';
	}

	public function allowChildren()
	{
		return true;
	}

	public function getViewReference()
	{
		return 'Mothership:Site::page_type:home';
	}

	public function setFields(FieldFactory $factory)
	{
		$factory->addGroup('carousel', 'Carousel')
			->setRepeatable()
			->add($factory->getField('file', 'image', 'Image')->setAllowedTypes(File\Type::IMAGE)->setFieldOptions([
				'constraints' => [
					new Constraints\NotBlank
				]
			]))
			->add($factory->getField('text', 'header', 'Header'))
			->add($factory->getField('text', 'subheader', 'Sub-header'))
			->add($factory->getField('choice', 'overlay_pos', 'Overlay Position')->setFieldOptions([
				'constraints' => [
					new Constraints\NotBlank,
				],
				'choices' => [
					'left'  => 'Left',
					'right' => 'Right',
				],
			]))
			->add($factory->getField('link', 'link', 'Link')->setScope('cms'))
		;

		$factory->addGroup('promos', 'Promos')
			->setRepeatable()
			->add($factory->getField('file', 'image', 'Image')->setAllowedTypes(File\Type::IMAGE)->setFieldOptions([
				'constraints' => [
					new Constraints\NotBlank
				]
			]))
			->add($factory->getField('text', 'header', 'Header')->setFieldOptions([
				'constraints' => [
					new Constraints\NotBlank
				]
			]))
			->add($factory->getField('text', 'subheader', 'Sub-header'))
			->add($factory->getField('link', 'link', 'Link')->setScope('cms'))
		;

		$factory->addGroup('content', 'Content')
			->add($factory->getField('richtext', 'content', 'Content')->setFieldOptions([
				'constraints' => [
					new Constraints\NotBlank
				]
			]))
			->add($factory->getField('link', 'link', 'Link')->setScope('cms'));
		;

	}
}
