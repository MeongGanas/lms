import { Link } from "@inertiajs/react";
import {
    Book,
    Calendar,
    File,
    GraduationCap,
    Home,
    Menu,
    School,
} from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { User } from "@/types";
import { ReactNode } from "react";
import {
    NavLink,
    SearchBar,
    UserDropdown,
} from "@/Components/MyComponent/User/LayoutComponent";

export default function UserLayout({
    user,
    children,
}: {
    user: User | null;
    children: ReactNode;
}) {
    const current_route = window.location.href;

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r md:block">
                <div className="sticky top-0 flex flex-col h-full max-h-screen gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold"
                        >
                            <School className="w-4 h-4" />
                            <span className="">MyLMS</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <NavLink
                                name="Home"
                                Icon={Home}
                                isActive={
                                    current_route === "http://127.0.0.1:8000/"
                                }
                                href="/"
                            />
                            <NavLink
                                name="Courses"
                                Icon={GraduationCap}
                                isActive={current_route.includes("/courses")}
                                href="/courses"
                            />
                            <NavLink
                                name="Tasks"
                                Icon={File}
                                isActive={current_route.includes("/tasks")}
                                href="/tasks"
                            >
                                <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
                                    6
                                </Badge>
                            </NavLink>
                            <NavLink
                                name="Calendar"
                                Icon={Calendar}
                                isActive={current_route.includes("/calendar")}
                                href="/calendar"
                            />
                            <NavLink
                                name="Library"
                                Icon={Book}
                                isActive={current_route.includes("/library")}
                                href="/library/"
                            />
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6 sticky top-0 bg-white border-b">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="w-5 h-5" />
                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 px-3 mb-3 font-semibold"
                                >
                                    <School className="w-4 h-4" />
                                    <span className="">MyLMS</span>
                                </Link>
                                <NavLink
                                    name="Home"
                                    Icon={Home}
                                    isActive={
                                        current_route ===
                                        "http://127.0.0.1:8000/"
                                    }
                                    href="/"
                                />
                                <NavLink
                                    name="Courses"
                                    Icon={GraduationCap}
                                    isActive={current_route.includes(
                                        "/courses"
                                    )}
                                    href="/courses"
                                />
                                <NavLink
                                    name="Tasks"
                                    Icon={File}
                                    isActive={current_route.includes("/tasks")}
                                    href="/tasks"
                                >
                                    <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
                                        6
                                    </Badge>
                                </NavLink>
                                <NavLink
                                    name="Calendar"
                                    Icon={Calendar}
                                    isActive={current_route.includes(
                                        "/calendar"
                                    )}
                                    href="/calendar"
                                />
                                <NavLink
                                    name="Library"
                                    Icon={Book}
                                    isActive={current_route.includes(
                                        "/library"
                                    )}
                                    href="/library/"
                                />
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="flex-1 w-full">
                        <SearchBar />
                    </div>
                    <UserDropdown user={user} />
                </header>
                <main className="flex flex-col flex-1 gap-4 p-4 max-w-screen-2xl lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
