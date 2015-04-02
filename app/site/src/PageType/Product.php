<?php

namespace Mothership\Site\PageType;

use Message\Mothership\CMS\PageType\PageTypeInterface;
use Message\Cog\Field\Factory as FieldFactory;

use Message\Mothership\FileManager\File;
use Symfony\Component\Validator\Constraints;

class Product implements PageTypeInterface
{
	public function getName()
	{
		return 'product';
	}

	public function getDisplayName()
	{
		return 'Product';
	}

	public function getDescription()
	{
		return 'A page for selling a product';
	}

	public function allowChildren()
	{
		return false;
	}

	public function getViewReference()
	{
		return 'Mothership:Site::page_type:product';
	}

	public function setFields(FieldFactory $factory)
	{
		$factory->addGroup('product', 'Product to sell')
			->add($factory->getField('product', 'product')->setFieldOptions([
				'constraints' => [
					new Constraints\NotBlank,
				],
				'label' => 'Product to sell',
			]))
			->add($factory->getField('productoption', 'option', 'Option requirement'))
		;

		$factory->add($factory->getField('richtext', 'details')->setFieldOptions([
			'attr' => [
				'data-help-key' => 'page.product.details.help'
			],
			'label' => 'Details (defaults to product description)',
		]));

		$factory->add($factory->getField('richtext', 'shipping', 'Shipping & Returns'));

		$factory->addGroup('gallery', 'Image Gallery')
			->setRepeatable(true, 0, 15)
			->add($factory->getField('file', 'image', 'Image')
				->setAllowedTypes(File\Type::IMAGE)->setFieldOptions([
					'constraints' => [
						new Constraints\NotBlank,
					]
				]))
		;

		$factory->addGroup('cross_sell', 'Cross Sell Products')
			->setRepeatable(true, 0, 3)
			->add($factory->getField('product', 'product', 'Product to sell'))
			->add($factory->getField('productoption', 'option', 'Option requirement'))
		;
	}
}