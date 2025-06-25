import { Content, Topic, User } from "@/types";
import ContentCard from "../Contents/ContentCard";
import { useQuery } from "react-query";
import axios from "axios";
import { ContentSkeleton } from "../CourseSkeleton";
import TopicMenu from "./TopicMenu";

export default function TopicCard({ user, topic, index, max_topic }: { user: User, topic: Topic, max_topic: number, index: number }) {
    const { data: contents, isLoading } = useQuery({
        queryKey: [`${topic.id}-contents`],
        queryFn: async () => {
            const response = await axios.get(`/topics/${topic.id}/contents`);
            return (await response.data.contents) as Content[];
        },
    });

    return (
        <div className="w-full space-y-4 border-t pt-6 pb-8 p-2">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">{topic.title}</h1>
                {user.role === "teacher" && (
                    <TopicMenu topic={topic} index={index} max_topic={max_topic} />
                )}
            </div>
            {contents && !isLoading ? contents.map((content, i) => (
                <ContentCard content={content} key={content.id} role={user.role} index={i} user_id={user.id} max_content={contents.length} />
            )) : (
                <div className="space-y-5">
                    <ContentSkeleton />
                    <ContentSkeleton />
                    <ContentSkeleton />
                </div>
            )}
        </div >
    )
}