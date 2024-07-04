<?php

return [
    'paths' => ['/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    'allowed_origins' => ['http://localhost:3000', 'http://localhost:5173'], // Permite requisições de múltiplas origens
    'allowed_headers' => ['Content-Type', 'Authorization'], // Cabeçalhos específicos permitidos
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];