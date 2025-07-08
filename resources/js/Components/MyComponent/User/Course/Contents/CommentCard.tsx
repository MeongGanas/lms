import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Comment } from "@/types";
import axios from "axios";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

export default function CommentCard({ comment, content_id, user_id }: { comment: Comment, content_id: string; user_id: string }) {
    const queryClient = useQueryClient();

    const deleteComment = (e: SyntheticEvent) => {
        e.preventDefault();
        const promise = axios.delete(`/comments/${comment.id}/delete`)
        toast.promise(promise, {
            loading: "Deleting...",
            success: (res) => {
                queryClient.invalidateQueries([`${content_id}-comments`])
                return res.data.message;
            },
            error: (err) => {
                console.log(err);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    }

    return (
        <div className="flex justify-between items-center" key={comment.id}>
            <div className="flex gap-2">
                <Avatar>
                    <AvatarImage src={`/storage/${comment.user.profile_image}`} />
                    <AvatarFallback>{comment.user.firstname[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 w-full">
                    <p className="font-semibold">{comment.user.lastname ? `${comment.user.firstname} ${comment.user.lastname}` : comment.user.firstname}</p>
                    <p className="text-sm sm:text-base">{comment.body}</p>
                    <p className="text-sm text-muted-foreground">{format(comment.created_at, 'HH:mm, dd MMMM yyyy')}</p>
                </div>
            </div>

            {user_id === comment.user_id && (
                <form onSubmit={deleteComment}>
                    <Button size={'icon'} type="submit" variant={"outline"}>
                        <Trash className="w-3 h-3 text-red-600" />
                    </Button>
                </form>
            )}
        </div>
    )
}