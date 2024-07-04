<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        $user = User::create($validatedData);

        return response()->json(['message' => 'Usuário criado com sucesso', 'user' => $user], 201);
    }

    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update($validatedData);

        return response()->json(['message' => 'Usuário atualizado com sucesso', 'user' => $user]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'Usuário excluído com sucesso']);
    }

    public function getActiveContract(User $user)
    {
        $contract = $user->contracts()->where('active', true)->first();
        return response()->json($contract);
    }
}
