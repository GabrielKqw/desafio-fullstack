<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Plan;
use App\Models\Payment;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ContractController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'plan_id' => 'required|exists:plans,id',
        ]);

        $plan = Plan::findOrFail($validatedData['plan_id']);

        $contract = Contract::create([
            'user_id' => $validatedData['user_id'],
            'plan_id' => $validatedData['plan_id'],
            'start_date' => Carbon::now(),
            'active' => true,
        ]);

        Payment::create([
            'contract_id' => $contract->id,
            'amount' => $plan->price,
            'due_date' => Carbon::now()->addMonth(),
        ]);

        return response()->json(['message' => 'Contrato criado com sucesso', 'contract' => $contract]);
    }

    public function index(Request $request, $userId)
    {
        $contracts = Contract::where('user_id', $userId)->get();
        return response()->json($contracts); 
    }
    public function update(Request $request, Contract $contract)
    {
        $validatedData = $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        $newPlan = Plan::findOrFail($validatedData['plan_id']);

       
        $contract->update([
            'plan_id' => $validatedData['plan_id'],
        ]);

 
        Payment::create([
            'contract_id' => $contract->id, 
            'amount' => $newPlan->price,
            'due_date' => Carbon::now()->addMonth(),
        ]);

        return response()->json(['message' => 'Plano alterado com sucesso', 'contract' => $contract]);
    }
}
