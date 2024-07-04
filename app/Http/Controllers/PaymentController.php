<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::all();
        return response()->json($payments);
    }

    public function show(Payment $payment)
    {
        return response()->json($payment);
    }

    public function update(Request $request, Payment $payment)
    {
        $payment->update(['paid_date' => now()]);

        return response()->json(['message' => 'Pagamento confirmado com sucesso', 'payment' => $payment]);
    }
}
