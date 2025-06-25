import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Course } from "@/types";
import { Link } from "@inertiajs/react";
import { Pencil, Settings, Trash } from "lucide-react";
import { SyntheticEvent } from "react";

export default function CourseMenu({
    course,
}: {
    course: Course;
}) {
    const deleteContent = (e: SyntheticEvent) => {
        e.preventDefault();
        // const promise = axios.delete(`/topic/${topic.id}/delete`)
        // toast.promise(promise, {
        //     loading: "Deleting...",
        //     success: (res) => {
        //         return res.data.message;
        //     },
        //     error: (err) => {
        //         console.log(err);
        //         return err?.response?.data?.message || "Something went wrong";
        //     },
        // });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-10" size={'icon'}>
                    <Settings className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={``} className="flex items-center gap-2 cursor-pointer">
                            <Pencil className="w-3 h-3" />Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <form onSubmit={deleteContent}>
                            <button type="submit" className="flex items-center gap-2 cursor-pointer w-full">
                                <Trash className="w-3 h-3" />Delete
                            </button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}