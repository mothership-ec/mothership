<?php

namespace Mothership\Site\Controller;

use Message\Cog\Controller\Controller;

use Symfony\Component\HttpKernel\Exception\HttpException;

class Error extends Controller
{
	protected $_supportedHttpCodes = array(
		500,
		404,
		403,
	);

	public function exception(\Exception $exception)
	{
		$statusCode = 500;

		if ($exception instanceof HttpException
			&& in_array($exception->getStatusCode(), $this->_supportedHttpCodes)) {
			$statusCode = $exception->getStatusCode();
		}

		// Log the exception
		$this->get('log.errors')->error(sprintf('%s error on website frontend', $statusCode), array(
			'exception' => $exception,
		));

		return $this->render('Mothership:Site::error:' . $statusCode, [
			'exception' => $exception,
		]);
	}
}