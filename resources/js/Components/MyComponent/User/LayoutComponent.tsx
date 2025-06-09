import { LucideIcon, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { ReactNode } from "react";
import { Link } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { User } from "@/types";

export function SearchBar() {
    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search courses..."
                className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3"
            />
        </div>
    );
}

export function NavLink({
    name,
    href,
    Icon,
    isActive,
    children,
}: {
    name: string;
    href: string;
    Icon: LucideIcon;
    isActive: boolean;
    children?: ReactNode;
}) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary ${
                isActive ? "text-primary bg-muted" : "text-muted-foreground"
            }`}
        >
            <Icon className="w-4 h-4" />
            {name}
            {children}
        </Link>
    );
}

export function UserDropdown({ user }: { user: User | null }) {
    const fullname = user
        ? `${user.firstname} ${user.lastname !== null ? user.lastname : ""}`
        : "";

    return (
        <>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>{fullname}</DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href={route("logout")} method="post">
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            )}
        </>
    );
}
