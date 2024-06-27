<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function index()
    {
        $contracts = Contract::all();
        return response()->json($contracts);
    }

    public function show($id)
    {
        $contract = Contract::findOrFail($id);
        return response()->json($contract);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'plan_id' => 'required|exists:plans,id',
            'start_date' => 'required|date',
        ]);

        $user = User::findOrFail($request->user_id);
        $plan = Plan::findOrFail($request->plan_id);

        $user->contracts()->update(['active' => false]);

        $contract = Contract::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'start_date' => $request->start_date,
            'active' => true,
        ]);

        return response()->json($contract, 201);
    }

    public function update(Request $request, $id)
    {
        $contract = Contract::findOrFail($id);

        $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'start_date' => 'required|date',
        ]);

        $plan = Plan::findOrFail($request->plan_id);
        $contract->update([
            'plan_id' => $plan->id,
            'start_date' => $request->start_date,
        ]);

        return response()->json($contract, 200);
    }

    public function destroy($id)
    {
        $contract = Contract::findOrFail($id);
        $contract->delete();

        return response()->json(null, 204);
    }
}
