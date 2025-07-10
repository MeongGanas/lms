import UserLayout from "@/Layouts/UserLayout";
import { Breadcrumbs, Comment, Content, PageProps, TempFile } from "@/types";
import { Head } from "@inertiajs/react";
import CourseLayout from "@/Layouts/CourseLayout";
import { getYoutubeId } from "@/lib/utils";
import { format } from "date-fns";
import { SubmissionForm } from "@/Components/MyComponent/User/Course/Contents/SubmissionForm";
import { CommentForm } from "@/Components/MyComponent/User/Course/Contents/CommentForm";
import { useQuery } from "react-query";
import axios from "axios";
import CommentCard from "@/Components/MyComponent/User/Course/Contents/CommentCard";

export default function ContentDetail({
    auth: { user },
    content,
    breadcrumbs
}: PageProps<{ content: Content; breadcrumbs: Breadcrumbs[] }>) {
    const videoId = getYoutubeId(content.external_url ? content.external_url : '');

    const notMaterial = content.type !== 'material';

    const { data: comments, isLoading } = useQuery({
        queryKey: [`${content.id}-comments`],
        queryFn: async () => {
            const response = await axios.get(`/contents/${content.id}/comments`);
            return (await response.data.comments) as Comment[];
        },
    });

    return (
        <UserLayout user={user}>
            <Head title={content.title} />

            <CourseLayout breadcrumbs={breadcrumbs}>
                <div className={`grid ${notMaterial ? 'xl:grid-cols-3' : 'xl:grid-cols-1'} gap-5`}>
                    <div className="space-y-3 xl:col-span-2">
                        <div className="flex justify-between w-full items-center flex-wrap space-y-2">
                            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">{content.title}</h1>
                            {content.type !== 'material' && (
                                <>
                                    {content.deadline ? (
                                        <p className="font-light text-justify pb-1 text-sm">Deadline: {format(content.deadline, 'HH:mm, dd MMMM yyyy')}</p>
                                    ) : (
                                        <p className="font-light text-justify pb-1 text-sm">No deadline.</p>
                                    )}
                                </>
                            )}
                        </div>
                        {content.description && (
                            <p className="font-light text-justify border-y py-5">{content.description}</p>
                        )}

                        {content.external_url && (
                            videoId ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title="YouTube video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-xl aspect-video w-full"
                                ></iframe>
                            ) : (
                                <a href={content.external_url} target="_blank" className="text-blue-500 underline">Klik di sini</a>
                            )
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
                        {notMaterial && (
                            <div className="block xl:hidden">
                                <SubmissionForm content={content} user_id={user.id} />
                            </div>
                        )}

                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Comments ({comments ? comments.length : 0})</h2>
                            {isLoading ? (
                                <h1>Loading</h1>
                            ) : (
                                <div className={`space-y-5 py-3 ${comments && comments.length > 0 ? 'block' : 'hidden'}`}>
                                    {comments?.map((comment) => (
                                        <CommentCard key={comment.id} user_id={user.id} comment={comment} content_id={content.id} />
                                    ))}
                                </div>
                            )}
                            <CommentForm content_id={content.id} user_id={user.id} />
                        </div>
                    </div>
                    {notMaterial && (
                        <div className="hidden xl:block">
                            {user.role === 'student' ? (
                                <SubmissionForm content={content} user_id={user.id} />
                            ) : (
                                <div>
                                    <h1>Submissions</h1>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </CourseLayout>
        </UserLayout >
    );
}