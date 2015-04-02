<?php

namespace Mothership\Site\EventListener;

use Message\Mothership\CMS\Page;

use Message\Cog\Event\SubscriberInterface;
use Message\Cog\Event\EventListener as BaseListener;
use Message\Cog\HTTP\RedirectResponse;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;

class Frontend extends BaseListener implements SubscriberInterface
{
	static public function getSubscribedEvents()
	{
		return [
			Page\Event\Event::RENDER_SET_RESPONSE => [
				['redirectToFirstChild']
			],
			KernelEvents::EXCEPTION => [
				['renderErrorPage', -9999], // Low priority
			],
		];
	}

	public function redirectToFirstChild(Page\Event\SetResponseForRenderEvent $event)
	{
		// Skip if the page type isn't "redirect to first child"
		if ('redirect_to_first_child' !== $event->getPage()->getType()->getName()) {
			return;
		}

		$auth = $this->get('cms.page.authorisation');

		// Find the first child of the current page
		$children = $this->get('cms.page.loader')->getChildren($event->getPage());

		if (!$children) {
			throw new NotFoundHttpException('Unable to redirect to first child page as it does not exist.');
		}

		// Set the first child that's published and visible
		foreach ($children as $page) {
			if ($auth->isViewable($page) && $auth->isPublished($page)) {
				$event->setResponse(new RedirectResponse($page->slug->getFull(), 303)); // 303 = See other
				break;
			}
		}
	}

	public function renderErrorPage(GetResponseForExceptionEvent $event)
	{
		static $handling = false;

		// Don't run in local env
		 if ('local' === $this->get('env')) {
		 	return;
		 }

		// Stops infinite loop if exception is thrown during render of exception error page
		if ($handling) {
			return false;
		}

		$request = $event->getRequest()->duplicate(null, null, [
			'_controller' => 'Mothership\\Site\\Controller\\Error::exception',
			'_format'     => $event->getRequest()->getRequestFormat(),
			'exception'   => $event->getException(),
		]);

		$request->setMethod('GET');

		$handling = true;
		$response = $event->getKernel()->handle($request, HttpKernelInterface::SUB_REQUEST, true);

		$event->setResponse($response);
	}
}