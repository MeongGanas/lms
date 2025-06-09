// components/FormInput.tsx
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";

export function FormInput({ control, name, label, type = "text", placeholder, required = false }: {
    control: any;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="grid gap-2">
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                id={name}
                                type={type}
                                placeholder={placeholder}
                                required={required}
                                {...field}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function PasswordInputWithToggle({ field, id }: { field: any; id: string }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <FormControl>
            <div className="relative">
                <Input
                    id="password"
                    placeholder="******"
                    type={showPassword ? "text" : "password"}
                    required
                    {...field}
                />
                <Button type="button" size={'sm'} className="bg-transparent hover:bg-black/10 flex items-center justify-center absolute right-0 top-0" onClick={toggleShowPassword}>
                    {showPassword ? (
                        <EyeOff className="w-4 h-4 text-black" />
                    ) : (
                        <Eye className="w-4 h-4 text-black" />
                    )}
                </Button>
            </div>
        </FormControl>
    );
}
