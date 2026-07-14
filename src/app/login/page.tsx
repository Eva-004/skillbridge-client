"use client";

import React, { useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { HiLightningBolt } from "react-icons/hi";
import { toast } from "react-toastify";

const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const redirect = searchParams.get('redirect') || '/';

    
    const formRef = useRef<HTMLFormElement>(null);
       
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { error } = await authClient.signIn.email({
            email: email,
            password: password,
            rememberMe: true,
            callbackURL: redirect,
        });

        if (error) {
            toast.error(error.message || "Invalid credentials, please try again.");
        } else {
            toast.success("Login successfully!");
            router.push(redirect);
            router.refresh();
        }
    };
        
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: redirect,
        });
    };

   
    const handleDemoLogin = () => {
        if (!formRef.current) return;
        
        const emailInput = formRef.current.elements.namedItem("email") as HTMLInputElement;
        const passwordInput = formRef.current.elements.namedItem("password") as HTMLInputElement;

        
        emailInput.value = "demo@skillbridge.ai";
        passwordInput.value = "Demo1234#";
        
        toast.info("Autofilled Demo credentials!");

        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

            <Card className="w-full max-w-md bg-slate-900/60 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative z-10">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Welcome <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Back</span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-2">Sign in to continue your personalized roadmap</p>
                </div>

                
                <div className="mb-6">
                    <Button
                        type="button"
                        onClick={handleDemoLogin}
                        className="w-full font-semibold bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400 hover:text-white hover:from-cyan-500 hover:to-indigo-500 rounded-xl py-6 transition-all duration-300 shadow-md group"
                    >
                        <HiLightningBolt className="text-base group-hover:scale-110 transition-transform mr-1" />
                        Explore with Demo Account
                    </Button>
                </div>

                <Form ref={formRef} className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="w-full"
                        validate={(value: string) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-slate-300 font-medium text-sm mb-1">Email Address</Label>
                        <Input 
                            className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl placeholder:text-slate-600 focus:border-cyan-500 transition-colors" 
                            placeholder="john@example.com" 
                        />
                        <FieldError className="text-rose-500 text-xs mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        className="w-full"
                        validate={(value: string) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one lowercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <Label className="text-slate-300 font-medium text-sm">Password</Label>
                            <Link href="/forget-password" className="text-xs text-cyan-400 hover:underline transition-all">
                                Forgot password?
                            </Link>
                        </div>
                        <Input 
                            className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl placeholder:text-slate-600 focus:border-cyan-500 transition-colors" 
                            placeholder="Enter your password" 
                        />
                        <Description className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                            Must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number
                        </Description>
                        <FieldError className="text-rose-500 text-xs mt-1" />
                    </TextField>

                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <Button 
                            type="submit" 
                            className="flex-1 font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl transition-all duration-300 py-6 shadow-lg shadow-indigo-600/20"
                        >
                            <Check className="mr-1" /> Login
                        </Button>
                        <Button 
                            type="reset" 
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors py-6 font-medium"
                        >
                            Reset
                        </Button>
                    </div>
                </Form>

                <div className="relative my-6 flex items-center justify-center">
                    <div className="border-t border-white/10 w-full" />
                    <span className="absolute bg-slate-900 px-3 text-xs uppercase tracking-wider text-slate-500 font-medium">
                        OR
                    </span>
                </div>

                <Button 
                    onClick={handleGoogleSignIn} 
                    className="w-full bg-slate-950 hover:bg-slate-900 border border-white/10 hover:border-white/20 text-slate-200 rounded-xl py-6 font-semibold flex items-center justify-center gap-2 transition-all shadow-inner"
                >
                    <FcGoogle className="text-xl" /> Sign in with Google
                </Button>

                <p className="text-center text-slate-400 mt-6 text-sm">
                    Don`t have an account?{" "}
                    <Link href="/register" className="text-cyan-400 hover:underline font-medium transition-all">
                        Register
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default LoginPage;