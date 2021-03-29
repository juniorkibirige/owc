<?php

namespace App\Http\Middleware;

use App\Models\Permission;
use App\Models\Role;
use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param Role $role
     * @param null $permission
     * @return mixed
     */
    public function handle(Request $request, Closure $next, Role $role, $permission = null)
    {
        if(!$request->user()->hasRole($role)) {
            abort(403);
        }
        if($permission !== null && !$request->user()->can($permission)){
            abort(403);
        }

        return $next($request);
    }
}
