import { LucideIcon, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { ReactNode, useState } from "react";
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
import { Course, User } from "@/types";
import axios from "axios";
import { debounce } from 'lodash';

export function SearchBar() {
    const [results, setResults] = useState([]);

    const handleSearchDebounced = debounce((searchTerm: string) => {
        axios
            .get(`/course/search?query=${searchTerm}`)
            .then((res) => {
                setResults(res.data.courses);
            })
            .catch((err) => {
                console.log(err);
            });
    }, 500);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        handleSearchDebounced(searchTerm);
    }

    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-[11.5px] h-4 w-4 text-muted-foreground z-[99]" />
            <Input
                type="search"
                placeholder="Search courses..."
                className={`w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 relative focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black ${results.length > 0 ? "rounded-b-none" : "border-b rounded-b"}`}
                onChange={handleSearch}
            />
            <div className={`result w-full h-fit md:w-2/3 bg-white border border-t-0 absolute rounded-b ${results.length > 0 ? "block" : "hidden"}`}>
                {results.map((course: Course) => (
                    <Link key={course.id} href={`/courses/${course.id}`} className="p-3 flex justify-between items-center [&:not(:last-child)]:border-b hover:bg-black/10 transition">
                        <span className="font-semibold">Basic Programming</span>
                        <span className="text-sm text-muted-foreground">{course.teacher.lastname ? `${course.teacher.firstname + course.teacher.lastname}` : course.teacher.firstname}</span>
                    </Link>
                ))}
            </div>
        </div >
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
            className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary ${isActive ? "text-primary bg-muted" : "text-muted-foreground"
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
