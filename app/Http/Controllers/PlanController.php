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

    public function show(Plan $plan)
    {
        return response()->json($plan);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'quotas' => 'required|integer|min:0',
            'storage' => 'required|integer|min:0',
        ]);

        $plan = Plan::create($validatedData);

        return response()->json(['message' => 'Plano criado com sucesso', 'plan' => $plan], 201);
    }

    public function update(Request $request, Plan $plan)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'price' => 'numeric|min:0',
            'quotas' => 'integer|min:0',
            'storage' => 'integer|min:0',
        ]);

        $plan->update($validatedData);

        return response()->json(['message' => 'Plano atualizado com sucesso', 'plan' => $plan]);
    }

    public function destroy(Plan $plan)
    {
        if ($plan->contracts()->where('active', true)->exists()) {
            return response()->json(['message' => 'Não é possível excluir um plano que está sendo usado em um contrato ativo'], 400);
        }

        $plan->delete();

        return response()->json(['message' => 'Plano excluído com sucesso']);
    }
}
