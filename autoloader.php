<?php

$namespaceOverrides = __DIR__ . '/namespaces.php';
$autoloader         = require_once (file_exists($namespaceOverrides))
	? $namespaceOverrides
	: __DIR__ . '/vendor/autoload.php';

return $autoloader;