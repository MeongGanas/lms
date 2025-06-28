import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Content } from "@/types";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { ArrowDown, ArrowUp, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

export default
    function ContentMenu({
        max_content,
        content,
        index
    }: {
        max_content: number;
        content: Content;
        index: number
    }) {
    const queryClient = useQueryClient();

    const moveToTop = () => {
        const promise = axios.put(`/courses/${content.course_id}/contents/${content.id}/move-to-top`)
        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
                queryClient.invalidateQueries([`${content.topic_id}-contents`])
                return res.data.message;
            },
            error: (err) => {
                console.log(err);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    }

    const moveToBottom = () => {
        const promise = axios.put(`/courses/${content.course_id}/contents/${content.id}/move-to-bottom`)
        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
                queryClient.invalidateQueries([`${content.topic_id}-contents`])
                return res.data.message;
            },
            error: (err) => {
                console.log(err);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    }

    const deleteContent = (e: SyntheticEvent) => {
        e.preventDefault();
        const promise = axios.delete(`/courses/${content.course_id}/contents/${content.id}/delete`)
        toast.promise(promise, {
            loading: "Deleting...",
            success: (res) => {
                queryClient.invalidateQueries([`${content.topic_id}-contents`])
                return res.data.message;
            },
            error: (err) => {
                console.log(err);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-10" size={'icon'}>
                    <EllipsisVertical className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild disabled={index + 1 === 1}>
                        <button onClick={moveToTop} className="flex items-center gap-2 cursor-pointer w-full">
                            <ArrowUp className="w-3 h-3" />Move to top
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled={index + 1 === max_content}>
                        <button onClick={moveToBottom} className="flex items-center gap-2 cursor-pointer w-full">
                            <ArrowDown className="w-3 h-3" />Move to bottom
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/courses/${content.course_id}/topics/${content.topic_id}/contents/${content.id}/edit`} className="flex items-center gap-2 cursor-pointer">
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