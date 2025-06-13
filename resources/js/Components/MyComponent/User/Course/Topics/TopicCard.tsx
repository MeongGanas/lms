import { Button } from "@/Components/ui/button";
import { Topic, User } from "@/types";
import { Link } from "@inertiajs/react";
import ContentCard from "../Contents/ContentCard";

export default function TopicCard({ user, topic }: { user: User, topic: Topic }) {
    return (
        <div className="w-full space-y-4 border-t pb-8 p-5">
            <h1 className="text-xl font-semibold">{topic.title}</h1>
            {user.role === "teacher" && (
                <Button asChild className="w-full text-center bg-transparent border-black/10 border text-black hover:bg-black/10">
                    <Link href={`/topics/${topic.id}/contents/create`}>Add Content</Link>
                </Button>
            )}
            {topic.contents.map((content) => (
                <ContentCard content={content} key={content.id} />
            ))}
        </div>
    )
}