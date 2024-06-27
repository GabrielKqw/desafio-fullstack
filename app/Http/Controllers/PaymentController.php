<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contract;
use App\Models\Payment;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::all();
        return response()->json($payments);
    }

    public function show($id)
    {
        $payment = Payment::findOrFail($id);
        return response()->json($payment);
    }

    public function store(Request $request)
    {
        $request->validate([
            'contract_id' => 'required|exists:contracts,id',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
            // outras validações necessárias
        ]);

        $contract = Contract::findOrFail($request->contract_id);

        // Criar novo pagamento
        $payment = Payment::create([
            'contract_id' => $contract->id,
            'amount' => $request->amount,
            'payment_date' => $request->payment_date,
        ]);

        return response()->json($payment, 201);
    }

    public function update(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);

        $request->validate([
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
        ]);

        $payment->update([
            'amount' => $request->amount,
            'payment_date' => $request->payment_date,
        ]);

        return response()->json($payment, 200);
    }

    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json(null, 204);
    }
}
