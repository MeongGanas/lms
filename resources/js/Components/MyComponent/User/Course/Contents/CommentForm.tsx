import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import axios from "axios";
import { Send } from "lucide-react";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

export function CommentForm({ content_id, user_id }: { content_id: string; user_id: string }) {
    const [body, setBody] = useState('');
    const queryClient = useQueryClient();

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        const promise = axios.post(`/contents/${content_id}/comment`, {
            user_id, body
        })
        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
                queryClient.invalidateQueries([`${content_id}-comments`])
                setBody('')
                return res.data.message;
            },
            error: (err) => {
                console.log(err);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    }

    return (
        <form onSubmit={submit} className="relative">
            <Textarea value={body} placeholder="Write your question or suggestion." className="h-32" onChange={(e) => setBody(e.target.value)} required />
            <Button type="submit" className="absolute right-2 bottom-2" size={'icon'}><Send className="w-4 h-4" /></Button>
        </form>
    )
}
