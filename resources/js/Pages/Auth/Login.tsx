import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Head, Link } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
    email: z.string().email("Email must be a valid email."),
    password: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { handleSubmit, control } = form;

    const submit = handleSubmit((values) => {
        setIsSubmitted(true);

        const promise = axios.post("/login", values);

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                setIsSubmitted(false);
                window.location.replace("/");
                return "Login Success!";
            },
            error: (err) => {
                console.log(err);
                setIsSubmitted(false);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    });

    return (
        <div className="w-full h-screen lg:grid lg:grid-cols-2">
            <Head title="Login" />
            <div className="hidden lg:block">
                <div className="sticky top-0">
                    <img
                        src="/asset/login.jpg"
                        alt="Login image"
                        className="max-w-full max-h-screen mx-auto"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center py-12">
                <Form {...form}>
                    <form
                        onSubmit={submit}
                        className="mx-auto grid w-[350px] gap-6"
                    >
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Login</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email below to login to your account
                            </p>
                        </div>
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Link
                                            href="/forgot-password"
                                            className="inline-block ml-auto text-sm underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            placeholder="******"
                                            type="password"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid gap-2">
                            <Button
                                type="submit"
                                disabled={isSubmitted}
                                className="w-full"
                            >
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-sm text-center">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
