<?php

namespace App\Http\Livewire;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Livewire\Component;

class LoginRegister extends Component
{
    public $users, $email, $password, $fName, $lName, $rememberMe;
    public $registerForm = false;
    public $loading = false;
    public $login = false;
    public $signup = false;

    public function render()
    {
        return view('livewire.login-register');
    }

    public function resetInputFields() {
        $this->resetErrorBag();
        $this->resetValidation();
        $this->fName = '';
        $this->lName = '';
        $this->email = '';
        $this->password = '';
        $this->signup = false;
    }

    public function login()
    {
        $validatedDate = $this->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if(Auth::attempt(array('email' => $validatedDate['email'], 'password' =>$validatedDate['password']))) {
            $this->loading = true;
            $this->login = true;

            $user = Auth::user();

            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->token;
            if ($this->rememberMe)
                $token->expires_at = Carbon::now()->addWeeks(1);
            $affected = DB::table('users')
                ->where('id', $user->id)
                ->update(['api_token' => substr($tokenResult->accessToken, 0, 80), 'expires_at' => $token->expires_at]);
            $token->save();
            session()->flash('message', 'You are logged in successfully!');
            return redirect()->to('/dashboard');
        } else {
            $this->login = false;
            session()->flash('error', 'Email or Password are Invalid');
        }
    }

    public function register() {
        $this->resetInputFields();
        $this->registerForm = !$this->registerForm;
    }

    public function registerStore() {
        $validatedDate = $this->validate([
            'lName' => 'required',
            'fName' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $validatedDate['password'] = Hash::make($validatedDate['password']);
        User::create(['name' => $validatedDate['fName'].' '.$validatedDate['lName'], 'email' => $validatedDate['email'], 'password' => $validatedDate['password']]);

        session()->flash('message', 'Registration Successful!, ! :-)');
        Auth::attempt(array('email' => $validatedDate['email'], 'password' =>$validatedDate['password']));
        $this->resetInputFields();
        $this->redirect('/login');
    }

    public function forgotPassword() {

    }

}
