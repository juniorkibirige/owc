@extends('layouts.app')
{{--@if($registerForm)--}}
{{--    @section('title', config('app.name', 'FMS') . '- Register')--}}
{{--@else--}}
@section('title', config('app.name', 'FMS') . ' - Login')
{{--@endif--}}
@section('sidebar')
    @parent
@endsection
@section('content')
    <div class="row justify-content-center bg-gray-50">
        <div class="col-md-12">
            <livewire:login-register/>
        </div>
    </div>
@endsection
