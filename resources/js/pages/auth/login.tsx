import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex">
            <Head title="Log in" />


            {/* Login Form Side */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
                <div className="w-full max-w-sm">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            PRABLI
                            <span className="text-blue-500">.</span>
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Enter your details to continue.
                            </p>
                        </div>

                        {status && (
                            <div className="text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded-md">
                                {status}
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={submit}>
                            <div>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onClick={() => setData('remember', !data.remember)}
                                        tabIndex={3}
                                        className="rounded"
                                    />
                                    <Label htmlFor="remember" className="text-sm text-gray-700">
                                        Keep Me Logged in
                                    </Label>
                                </div>

                                {canResetPassword && (
                                    <TextLink
                                        href={route('password.request')}
                                        className="text-sm text-blue-600 hover:text-blue-500"
                                        tabIndex={5}
                                    >
                                        Forgot Password?
                                    </TextLink>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                LOGIN
                            </Button>

                            <div className="text-center">
                                <span className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                </span>
                                <TextLink
                                    href={route('register')}
                                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                                    tabIndex={6}
                                >
                                    Create Account
                                </TextLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* Background Image */}
            <div
                className="hidden lg:flex lg:w-1/2 xl:w-2/3 relative bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('images/bali1.png')"
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-15"></div>

                {/* Logo */}
                <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 z-10">
                    <h1 className="text-6xl font-bold text-white tracking-wide">
                        PRABLI
                        <span className="text-blue-400">.</span>
                    </h1>
                </div>
            </div>
        </div>
    );
}
