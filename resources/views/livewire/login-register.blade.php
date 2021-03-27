<div>
    <div class="md:grid md:grid-cols-1 md-gap-6">
        @if($registerForm)
            <div class="md:mt-0 md:col-span-2">
                <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div class="max-w-md w-full space-y-8">
                        <form action="#" method="POST">
                            @csrf
                            <div class="shadow overflow-hidden sm:rounded-md">
                                <div class="px-4 py-5 bg-white sm:p-6">
                                    <div>
                                        <img class="mx-auto h-12 w-auto"
                                             src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                             alt="Workflow">
                                        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                            Create your OWC account
                                        </h2>
                                        <p class="mt-2 text-center text-sm text-gray-600">
                                            Or
                                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
                                               wire:click.prevent="register">
                                                Login
                                            </a>
                                        </p>
                                    </div>
                                    @if(session()->has('message'))
                                        <p class="mt-2 text-sm text-red-600">
                                            {{session('message')}}
                                        </p>
                                    @endif
                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="first_name" class="block text-sm font-medium text-gray-700">First
                                                name</label>
                                            <input type="text" wire:model="fName" name="first_name" id="first_name"
                                                   autocomplete="given-name"
                                                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm {{$errors->first('fName') == null ? 'border border-gray-300' : 'border-red-300'}} rounded-md">
                                            @error('fName')
                                            <span
                                                class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {{$errors->first('fName')}}
		</span>@enderror
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="last_name" class="block text-sm font-medium text-gray-700">Last
                                                name</label>
                                            <input type="text" wire:model="lName" name="last_name" id="last_name"
                                                   autocomplete="family-name"
                                                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm {{$errors->first('lName') == null ? 'border border-gray-300' : 'border-red-300'}} rounded-md">

                                            @error('lName')
                                            <span
                                                class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {{$errors->first('lName')}}
		</span>@enderror
                                        </div>

                                        <div class="col-span-6 sm:col-span-12 lg:col-span-6 md:col-span-6">
                                            <label for="email_address"
                                                   class="block text-sm font-medium text-gray-700">Email
                                                address</label>
                                            <input type="text" wire:model="email" name="email" id="email_address"
                                                   autocomplete="email"
                                                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm {{$errors->first('email') == null ? 'border border-gray-300' : 'border-red-300'}} rounded-md">

                                            @error('email')
                                            <span
                                                class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {{$errors->first('email')}}
		</span>@enderror
                                        </div>

                                        {{--                                <div class="col-span-6 sm:col-span-3">--}}
                                        {{--                                    <label for="country" class="block text-sm font-medium text-gray-700">Country /--}}
                                        {{--                                        Region</label>--}}
                                        {{--                                    <select id="country" name="country" autocomplete="country"--}}
                                        {{--                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">--}}
                                        {{--                                        <option>United States</option>--}}
                                        {{--                                        <option>Canada</option>--}}
                                        {{--                                        <option>Mexico</option>--}}
                                        {{--                                    </select>--}}
                                        {{--                                </div>--}}

                                        {{--                                <div class="col-span-6">--}}
                                        {{--                                    <label for="street_address" class="block text-sm font-medium text-gray-700">Street--}}
                                        {{--                                        address</label>--}}
                                        {{--                                    <input type="text" name="street_address" id="street_address"--}}
                                        {{--                                           autocomplete="street-address"--}}
                                        {{--                                           class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">--}}
                                        {{--                                </div>--}}

                                        {{--                                <div class="col-span-6 sm:col-span-6 lg:col-span-2">--}}
                                        {{--                                    <label for="city" class="block text-sm font-medium text-gray-700">City</label>--}}
                                        {{--                                    <input type="text" name="city" id="city"--}}
                                        {{--                                           class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">--}}
                                        {{--                                </div>--}}

                                        <div class="col-span-2 sm:col-span-12  lg:col-span-6 md:col-span-6">
                                            <label for="password" class="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input type="password" name="password" id="password" wire:model="password"
                                                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm {{$errors->first('password') == null ? 'border border-gray-300' : 'border-red-300'}} rounded-md">

                                            @error('password')
                                            <span
                                                class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {{$errors->first('password')}}
		</span>@enderror
                                        </div>
                                    </div>
                                </div>
                                <div class="px-4 py-3 bg-gray-50 sm:px-6">
                                    <button
                                        wire:click.prevent="registerStore" type="submit"
                                        class=" w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        @else
            <div class="md:mt-0 md:col-span-2">
                <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div class="max-w-md w-full space-y-8">
                        <div>
                            <img class="mx-auto h-12 w-auto"
                                 src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
                            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Sign in to your OWC account
                            </h2>
                        </div>
                        <form class="mt-8 space-y-6" action="#" method="POST">
                            @csrf
                            <input type="hidden" name="remember" value="true">
                            <div class="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label for="email-address" class="sr-only">Email address</label>
                                    <input id="email-address" name="email" type="email" autocomplete="email" required
                                           wire:model="email"
                                           class="{{$errors->first('email') == null ? 'border border-gray-300' : 'border-red-300'}} appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                           placeholder="Email address">
                                    @error('email')
                                    <span
                                        class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {{$errors->first('email')}}
		</span>@enderror
                                </div>
                                <div class="{{$email == null ? 'hidden' : ''}}">
                                    <label for="password" class="sr-only">Password</label>
                                    <input id="password" name="password" type="password" autocomplete="current-password"
                                           wire:model="password"
                                           required
                                           class="appearance-none rounded-none relative block w-full px-3 py-2 {{$errors->first('password') == null ? 'border border-gray-300' : 'border-red-300'}} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                           placeholder="Password">
                                    @error('password')
                                    <span
                                        class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {{$errors->first('password')}}
		</span>@enderror
                                </div>
                            </div>

                            @if (session()->has('message'))
                                <p class="mt-2 text-sm text-green-600">
                                    {{session('message')}}
                                </p>
                            @endif
                            @if (session()->has('error'))

                                <p class="mt-2 text-sm text-red-600">
                                    {{session('error')}}
                                </p>
                            @endif

                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    {{--                                    <input id="remember_me" name="remember_me" type="checkbox" wire:model="rememberMe"--}}
                                    {{--                                           class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">--}}
                                    {{--                                    <label for="remember_me" class="ml-2 block text-sm text-gray-900">--}}
                                    {{--                                        Remember me--}}
                                    {{--                                    </label>--}}
                                </div>

                                <div class="text-sm">
                                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
                                       wire:click.prevent="forgotPassword">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button type="submit" wire:click.prevent="login"
                                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            @if(!$loading)
                  <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"/>
            </svg>
              @else
                  <i class="fas fa-sync fa-spin"></i> {{$loading}}
              @endif
          </span>
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <div class="mt-3">
                            <div class="relative">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-gray-300"></div>
                                </div>
                                <div class="relative flex justify-center text-sm">
                                    <span class="px-2 bg-gray-50 text-gray-500">Don't have an account?</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3">
                            <button href="#"
                                    class="group relative block w-full text-center py-2 px-3 border border-gray-300 rounded-md text-gray-900 font-medium hover:border-gray-400 focus:outline-none focus:border-gray-400 sm:text-sm bg-blue-100"
                                    wire:click.prevent="register">
                                Create your account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        @endif
    </div>
</div>

<script>

</script>
