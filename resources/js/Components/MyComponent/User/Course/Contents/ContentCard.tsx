import { getYoutubeId } from "@/lib/utils";
import { Content } from "@/types";
import ContentMenu from "@/Components/MyComponent/User/Course/Contents/ContentMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";

export default function ContentCard({
    content,
    role,
    user_id,
    index,
    max_content
}: {
    content: Content;
    role: string;
    user_id: string;
    index: number,
    max_content: number
}) {
    const videoId = getYoutubeId(content.external_url ? content.external_url : '');

    const queryClient = useQueryClient();

    const setProgressDone = () => {
        const promise = axios.put(`/courses/${content.course_id}/contents/${content.id}/set-progress-done`)
        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
                queryClient.invalidateQueries([`${content.topic_id}-contents`])
                return res.data.message;
            },
            error: (err) => {
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
                            <Link href={`/courses/${content.course_id}/topics/${content.topic_id}/contents/${content.id}`} className="text-lg underline cursor-pointer">{content.title}</Link>
                            {content.type !== 'material' && (
                                <>
                                    {content.deadline ? (
                                        <p className="font-light text-justify pb-1 text-sm">Deadline: {format(content.deadline, 'HH:mm, dd MMMM yyyy')}</p>
                                    ) : (
                                        <p className="font-light text-justify pb-1 text-sm">No deadline.</p>
                                    )}
                                </>
                            )}
                            <p className="font-light text-justify pb-1">{content.description}</p>
                        </div>
                        {role === 'teacher' && (
                            <ContentMenu content={content} index={index} max_content={max_content} />
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
                                <a href={content.external_url} target="_blank" className="text-blue-500 underline">Klik di sini</a>
                            )}
                        </>
                    )}
                    {content.file_path && (
                        <>
                            {content.file_path.endsWith('.pdf') && (
                                <embed
                                    src={`/storage/${content.file_path}`}
                                    width="100%"
                                    height="500px"
                                    type="application/pdf"
                                />
                            )}

                            {content.file_path.endsWith('.jpg') || content.file_path.endsWith('.jpeg') || content.file_path.endsWith('.png') && (
                                <img src={`/storage/${content.file_path}`} alt="Preview" className="max-w-full h-auto rounded" />
                            )}
                        </>
                    )}
                </div>
                {role === 'student' && (
                    <input type="radio" checked={content.progresses.some((progress) => progress.student_id === user_id)} className="cursor-pointer checked:bg-black" name={`content - ${content.id}`} id={content.id} onChange={setProgressDone} />
                )}
            </div>
        </div >
    )
}
