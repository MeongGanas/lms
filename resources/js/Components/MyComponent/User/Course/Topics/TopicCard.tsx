import { Button } from "@/Components/ui/button";
import { Content, Topic, User } from "@/types";
import { Link } from "@inertiajs/react";
import ContentCard from "../Contents/ContentCard";
import { useState } from "react";

export default function TopicCard({ user, topic }: { user: User, topic: Topic }) {
    const [contents, setContents] = useState<Content[]>(topic.contents);

    return (
        <div className="w-full space-y-4 border-t pt-6 pb-8 p-2">
            <h1 className="text-xl font-semibold">{topic.title}</h1>
            {user.role === "teacher" && (
                <Button asChild className="w-full text-center bg-transparent border-black/10 border text-black hover:bg-black/10">
                    <Link href={`/topics/${topic.id}/contents/create`}>Add Content</Link>
                </Button>
            )}
            {contents.map((content, i) => (
                <ContentCard content={content} key={content.id} role={user.role} setContents={setContents} contents={contents} index={i} />
            ))}
        </div >
    )
}