import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Content, Topic } from "@/types";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { ArrowDown, ArrowUp, EllipsisVertical, Pencil, Plus, Trash } from "lucide-react";
import { SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

export default
    function TopicMenu({
        max_topic,
        topic,
        index
    }: {
        max_topic: number;
        topic: Topic;
        index: number
    }) {
    const queryClient = useQueryClient();

    const moveToTop = () => {
        const promise = axios.put(`/topics/${topic.id}/move-to-top`)
        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
                return res.data.message;
            },
            error: (err) => {
                console.log(err);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    }

    const moveToBottom = () => {
        const promise = axios.put(`/topics/${topic.id}/move-to-bottom`)
        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
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
        const promise = axios.delete(`/topic/${topic.id}/delete`)
        toast.promise(promise, {
            loading: "Deleting...",
            success: (res) => {
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
                    <DropdownMenuItem asChild disabled={index + 1 === max_topic}>
                        <button onClick={moveToBottom} className="flex items-center gap-2 cursor-pointer w-full">
                            <ArrowDown className="w-3 h-3" />Move to bottom
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/courses/${topic.course_id}/topics/${topic.id}/contents/create`} className="flex items-center gap-2 cursor-pointer">
                            <Plus className="w-3 h-3" />Add Content
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/topics/${topic.id}/edit`} className="flex items-center gap-2 cursor-pointer">
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