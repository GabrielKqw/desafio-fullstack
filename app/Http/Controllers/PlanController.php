<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index()
    {
        $plans = Plan::all();
        return response()->json($plans);
    }

    public function show($id)
    {
        $plan = Plan::findOrFail($id);
        return response()->json($plan);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'quota' => 'required|integer',
            'storage' => 'required|integer',
        ]);

        $plan = Plan::create($request->all());

        return response()->json($plan, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'string',
            'price' => 'numeric',
            'quota' => 'integer',
            'storage' => 'integer',
        ]);

        $plan = Plan::findOrFail($id);
        $plan->update($request->all());

        return response()->json($plan, 200);
    }

    public function destroy($id)
    {
        $plan = Plan::findOrFail($id);
        $plan->delete();

        return response()->json(null, 204);
    }
}
