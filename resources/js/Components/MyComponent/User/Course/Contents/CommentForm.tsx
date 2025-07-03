import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Send } from "lucide-react";

export function CommentForm() {
    const submit = () => {
        console.log("submit comment")
    }

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold">Comments (0)</h2>
            <form onSubmit={submit}>
                <div className="relative">
                    <Textarea placeholder="Write your question or suggestion." className="h-32" />
                    <Button type="submit" className="absolute right-2 bottom-2" size={'icon'}><Send className="w-4 h-4" /></Button>
                </div>
            </form>
        </div>
    )
}
