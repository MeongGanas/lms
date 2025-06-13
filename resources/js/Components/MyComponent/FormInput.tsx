// components/FormInput.tsx
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";

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


export function DateInput({ control, name, label, required = false }: {
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
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                required={required}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                captionLayout="dropdown"
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function SelectInput({ control, name, label, placeholder, required = false, selectItems }: {
    control: any;
    name: string;
    label: string;
    placeholder: string;
    required?: boolean;
    selectItems: { value: string; label: string }[];
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} required={required}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {selectItems.map((item) => (
                                <SelectItem value={item.value}>{item.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function FormTextarea({ control, name, label, placeholder, required = false }: {
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
                        <Textarea
                            required={required}
                            placeholder={placeholder}
                            className="resize-none h-32"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
