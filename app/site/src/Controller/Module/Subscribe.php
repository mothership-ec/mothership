<?php

namespace Mothership\Site\Controller\Module;

use Message\Cog\Controller\Controller;

class Subscribe extends Controller
{
	public function subscribe()
	{
		$form = $this->createForm(
			$this->get('app.form.subscribe'),
			null,
			['action' => $this->generateUrl('app.subscribe.action')]
		);

		return $this->render('Mothership:Site::module:subscribe:subscribe', [
			'form' => $form,
		]);
	}

	public function subscribeAction()
	{
		$form = $this->createForm($this->get('app.form.subscribe'));

		$form->handleRequest();

		if ($form->isValid()) {
			$data = $form->getData();

			$this->get('mailing.subscription.edit')->subscribe($data['email_address']);
			$this->addFlash('success', $this->trans('ms.mailing.subscribe.feedback.success'));
		}

		return $this->redirectToReferer();
	}
}