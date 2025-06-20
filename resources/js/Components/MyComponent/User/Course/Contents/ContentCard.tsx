import { getYoutubeId } from "@/lib/utils";
import { Content } from "@/types";
import { Link } from "@inertiajs/react";
import ContentMenu from "@/Components/MyComponent/User/Course/Contents/ContentMenu";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContentCard({
    contents,
    setContents,
    content,
    role,
    user_id,
    index
}: {
    contents: Content[],
    setContents: (content: Content[]) => void;
    content: Content;
    role: string;
    user_id: string;
    index: number
}) {
    const videoId = getYoutubeId(content.external_url ? content.external_url : '');

    const setProgressDone = () => {
        const promise = axios.put(`/contents/${content.id}/set-progress-done`)
        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
                return res.data.message;
            },
            error: (err) => {
                console.log(err);
                return err?.response?.data?.message || "Something went wrong";
            },
        })
    }

    return (
        <div className="flex gap-3 w-full bg-white">
            <h1 className="text-lg">{index + 1}.</h1>
            <div className="flex items-center gap-3 w-full">
                <div className="w-full rounded-xl space-y-2" key={content.id}>
                    <div className="flex items-center justify-between gap-5">
                        <div className="space-y-2">
                            <h1 className="text-lg">{content.title}</h1>
                            <p className="font-light text-justify pb-1">{content.description}</p>
                        </div>
                        {role === 'teacher' && (
                            <ContentMenu content={content} setContents={setContents} contents={contents} index={index} />
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
                    <input type="radio" checked={content.progresses.some((progress) => progress.student_id === user_id)} className="cursor-pointer" name={`content - ${content.id}`} id={content.id} onChange={setProgressDone} />
                )}
            </div>
        </div >
    )
}
