'use client';

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
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const image = (form.elements.namedItem("image") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
            image,
        });

        if (error) {
            toast.error(error.message || "Registration failed");
            return;
        }

        toast.success("Register successfully!");
        router.push("/");
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

            <Card className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-2xl p-8">

                <div className="space-y-2 text-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Create Account
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400">
                        Join SkillBridge AI and start your learning journey.
                    </p>
                </div>

                <Form
                    className="flex flex-col gap-5"
                    onSubmit={onSubmit}
                >
                    <TextField
                        isRequired
                        name="name"
                        type="text"
                    >
                        <Label>Name</Label>
                        <Input
                            placeholder="Enter your name"
                            className="w-full"
                        />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="image"
                        type="text"
                    >
                        <Label>Image URL</Label>
                        <Input
                            placeholder="https://example.com/profile.jpg"
                        />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
                            ) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input
                            placeholder="john@example.com"
                        />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }

                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain an uppercase letter";
                            }

                            if (!/[a-z]/.test(value)) {
                                return "Password must contain a lowercase letter";
                            }

                            if (!/[0-9]/.test(value)) {
                                return "Password must contain a number";
                            }

                            return null;
                        }}
                    >
                        <Label>Password</Label>

                        <Input
                            placeholder="Enter your password"
                        />

                        <Description>
                            At least 8 characters with uppercase, lowercase and number.
                        </Description>

                        <FieldError />
                    </TextField>

                    <div className="flex gap-3 pt-2">

                        <Button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
                        >
                            <Check />
                            Register
                        </Button>

                        <Button
                            type="reset"
                            variant="outline"
                            className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                        >
                            Reset
                        </Button>

                    </div>
                </Form>

                <div className="mt-8 space-y-4">

                    <p className="text-center text-slate-600 dark:text-slate-400">
                        Already have an account?
                        <Link
                            href="/login"
                            className="ml-1 font-semibold text-indigo-600 hover:text-cyan-500 transition-colors"
                        >
                            Login
                        </Link>
                    </p>

                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700"></div>

                        <span className="text-sm text-slate-500">
                            OR
                        </span>

                        <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700"></div>
                    </div>

                    <Button
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="w-full border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-300"
                    >
                        <FcGoogle className="text-xl" />
                        Register with Google
                    </Button>

                </div>

            </Card>
        </div>
    );
};

export default RegisterPage;