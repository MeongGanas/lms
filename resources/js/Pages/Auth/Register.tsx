import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/Components/ui/form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { FormInput, PasswordInputWithToggle } from "@/Components/MyComponent/FormInput";

const loginSchema = z
    .object({
        firstname: z.string(),
        lastname: z.string().optional(),
        email: z.string().email("Email must be a valid email."),
        password: z.string(),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Password and confirm password don't match",
        path: ["password_confirmation"],
    });

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const { handleSubmit, control } = form;

    const submit = handleSubmit((values) => {
        setIsSubmitted(true);

        const promise = axios.post("/register", values);

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                setIsSubmitted(false);
                window.location.replace("/login");
                return "Register Success!";
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
                <div className="sticky top-0 py-12">
                    <img
                        src="/asset/register.svg"
                        className="h-[80vh] rounded-md mx-auto"
                        alt="register image"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center px-5 py-12">
                <Form {...form}>
                    <form onSubmit={submit} className="grid gap-6 mx-auto">
                        <div className="grid gap-2">
                            <h1 className="text-4xl font-bold">Sign up</h1>
                            <p className="text-muted-foreground">
                                Let&apos;s get you all set up so you can access
                                your personal account.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput control={control} name="firstname" label="First Name" required={true} placeholder="Your First Name" />
                            <FormInput control={control} name="lastname" label="Last Name" placeholder="Your Last Name" />
                        </div>
                        <FormInput control={control} name="email" label="Email" required={true} placeholder="Your Email" type="email" />
                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <PasswordInputWithToggle field={field} id="password" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormInput control={control} name="password_confirmation" label="Confirm Password" required={true} placeholder="Confirm Password" type="password" />
                        <div className="grid gap-2">
                            <Button
                                type="submit"
                                disabled={isSubmitted}
                                className="w-full"
                            >
                                Register
                            </Button>
                        </div>
                        <div className="mt-4 text-sm text-center">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Login
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
