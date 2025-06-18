import { getYoutubeId } from "@/lib/utils";
import { Content } from "@/types";
import { Link } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Button } from "@/Components/ui/button";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function ContentCard({ content, role }: { content: Content, role: string }) {
    const videoId = getYoutubeId(content.external_url ? content.external_url : '');

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: content.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div className="flex gap-3 w-full" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <h1 className="text-lg">{content.order}.</h1>
            <div className="flex items-center gap-3 w-full">
                <div className="w-full rounded-xl space-y-2" key={content.id}>
                    <div className="flex items-center justify-between gap-5">
                        <div className="space-y-2">
                            <h1 className="text-lg">{content.title}</h1>
                            <p className="font-light text-justify pb-1">{content.description}</p>
                        </div>
                        {role === 'teacher' && (
                            <ContentMenu content={content} />
                        )}
                    </div>
                    {content.external_url && (
                        <>
                            {videoId ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title="YouTube video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-xl aspect-video w-full"
                                ></iframe>
                            ) : (
                                <Link href={content.external_url} target="_blank" className="text-blue-500 underline">klik di sini</Link>
                            )}
                        </>
                    )}
                </div>
                {role === 'student' && (
                    <input type="radio" className="cursor-pointer" name={`content - ${content.id}`} id={content.id} />
                )}
            </div>
        </div >
    )
}

function ContentMenu({ content }: { content: Content }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-10" size={'icon'}>
                    <EllipsisVertical className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={`/topics/${content.topic_id}/contents/${content.id}/edit`} className="flex items-center gap-2 cursor-pointer">
                            <Pencil className="w-3 h-3" />Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/topics/${content.topic_id}/contents/${content.id}/delete`} className="flex items-center gap-2 cursor-pointer">
                            <Trash className="w-3 h-3" />Delete
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}