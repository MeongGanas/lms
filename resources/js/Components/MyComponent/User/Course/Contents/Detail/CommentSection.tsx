import axios from "axios";
import { useQuery } from "react-query";
import CommentCard from "../CommentCard";
import { CommentForm } from "../CommentForm";
import { Comment } from "@/types";

export default function CommentSection({ content_id, user_id }: { content_id: string; user_id: string }) {
    const { data: comments, isLoading } = useQuery({
        queryKey: [`${content_id}-comments`],
        queryFn: async () => {
            const response = await axios.get(`/contents/${content_id}/comments`);
            return (await response.data.comments) as Comment[];
        },
    });

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold">Comments ({comments ? comments.length : 0})</h2>
            {isLoading ? (
                <h1>Loading</h1>
            ) : (
                <div className={`space-y-5 py-3 ${comments && comments.length > 0 ? 'block' : 'hidden'}`}>
                    {comments?.map((comment) => (
                        <CommentCard key={comment.id} user_id={user_id} comment={comment} content_id={content_id} />
                    ))}
                </div>
            )}
            <CommentForm content_id={content_id} user_id={user_id} />
        </div>
    )
}