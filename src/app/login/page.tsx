'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false); // State for sign-up modal

    const router = useRouter();

    const forgotPasswordRef = useRef<HTMLDivElement>(null); // Ensure this is typed as HTMLDivElement
    const signUpRef = useRef<HTMLDivElement>(null); // Ensure this is typed as HTMLDivElement

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data.code);

            if (data.code != 200) {
                setError(data.message || 'Login failed. Please try again.');
            } else {
                localStorage.setItem('accessToken', data.data.token);
                router.push('/'); // This redirects to http://localhost:3000/
                console.log('Token saved to localStorage:', data.data.token);
            }
        } catch (err) {
            setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
            console.error('Error during login:', err);
        } finally {
            setLoading(false);
        }
    };


    const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const emailInput = form.email.value;

        console.log('Forgot Password Email submitted:', emailInput);

        setShowForgotPassword(false);
    };
    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;

        // Access form input values
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const retypePassword = (form.elements.namedItem('retypePassword') as HTMLInputElement).value;

        if (password !== retypePassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, retypePassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || 'Registration failed. Please try again.');
            } else {
                alert('Registration successful! Please login.');
                setShowSignUp(false);
            }
        } catch (err) {
            console.error('Error during registration:', err);
            alert('An error occurred. Please try again later.');
        }
    };


    // Fix for the 'contains' issue
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Ensure the refs are correctly typed to HTMLDivElement
            if (forgotPasswordRef.current && !forgotPasswordRef.current.contains(event.target as Node)) {
                setShowForgotPassword(false);
            }
            if (signUpRef.current && !signUpRef.current.contains(event.target as Node)) {
                setShowSignUp(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
            <img
                alt="Background Image"
                className="absolute inset-0 w-full h-full object-cover"
                src="https://storage.googleapis.com/a1aa/image/v2EZ0adAU0quLNKTQLNQQxuueMuUQcstPPEe2CG0IMzv4h7TA.jpg"
            />
            <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md mx-auto w-full">
                <h1 className="text-4xl font-bold text-red-700 text-center mb-4">QUERY HUB</h1>
                <p className="text-center text-gray-600 mb-6">
                    Một nơi để chia sẻ kiến thức và hiểu thế giới này một cách tốt hơn
                </p>
                <div className="mb-4">
                    <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <i className="fab fa-google mr-2"></i>
                        Tiếp tục với Google
                    </button>
                </div>
                <div className="mb-4">
                    <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <i className="fab fa-facebook-f mr-2"></i>
                        Tiếp tục với Facebook
                    </button>
                </div>
                <div className="text-center text-sm text-gray-500 mb-4">
                    <a className="hover:underline" onClick={() => setShowSignUp(true)}>
                        Đăng ký với email
                    </a>
                </div>
                <div className="border-t border-gray-300 pt-4">
                    <h2 className="text-lg font-medium text-gray-700 mb-4">Đăng nhập</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="email"
                                type="email"
                                placeholder="Email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Mật khẩu
                            </label>
                            <input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="password"
                                type="password"
                                placeholder="Mật khẩu của bạn"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex items-center justify-between mb-4">
                            <a className="text-sm text-blue-600 hover:underline"
                                onClick={() => setShowForgotPassword(true)}
                            >
                                Quên mật khẩu?
                            </a>
                        </div>
                        <button
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            type="submit"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>

            {showForgotPassword && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div ref={forgotPasswordRef} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                        <div className="flex justify-end">
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowForgotPassword(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Tìm tài khoản của bạn</h2>
                        <p className="mb-6">Vui lòng nhập email của bạn để đặt lại mật khẩu.</p>
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <div className="mb-4">
                                <input
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Email của bạn"
                                    type="email"
                                    name="email"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <div className="flex items-center">
                                    <input className="mr-2" id="recaptcha" type="checkbox" required />
                                    <label className="text-gray-700" htmlFor="recaptcha">Tôi không phải là robot</label>
                                </div>
                                <img alt="reCAPTCHA verification" className="mt-2" height="50" src="https://storage.googleapis.com/a1aa/image/di5wIyV4hvYWONf0T4GQZA6eaTL7Lk3OMexBNtfdAeoocScfE.jpg" width="100" />
                            </div>
                            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">
                                Gửi
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showSignUp && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div ref={signUpRef} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                        <div className="flex justify-end">
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowSignUp(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Đăng ký</h2>
                        <form onSubmit={handleSignUpSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Bạn muốn được gọi là gì?"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email của bạn"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nhập lại mật khẩu</label>
                                <input
                                    type="password"
                                    name="retypePassword"
                                    placeholder="Nhập lại mật khẩu"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <button
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                type="submit"
                            >
                                Đăng ký
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default LoginPage;
