<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyCsrfToken
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->method() === 'POST') {
            $token = $request->header('X-CSRF-TOKEN'); 

            if (!$token || $token !== csrf_token()) { // Verifica se o token é válido
                abort(419); // Retorna erro 419 se o token for inválido
            }
        }

        return $next($request);
    }
}
