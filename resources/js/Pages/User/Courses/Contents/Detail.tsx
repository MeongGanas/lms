import UserLayout from "@/Layouts/UserLayout";
import { Breadcrumbs, Content, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import CourseLayout from "@/Layouts/CourseLayout";
import { getYoutubeId } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { SubmissionForm } from "@/Components/MyComponent/User/Course/Contents/SubmissionForm";
import { CommentForm } from "@/Components/MyComponent/User/Course/Contents/CommentForm";

export default function ContentDetail({
    auth: { user },
    content,
    breadcrumbs
}: PageProps<{ content: Content; breadcrumbs: Breadcrumbs[] }>) {
    const videoId = getYoutubeId(content.external_url ? content.external_url : '');

    // const { data: topics, isLoading } = useQuery({
    //     queryKey: [`${course.id}-topics`],
    //     queryFn: async () => {
    //         const response = await axios.get(`/courses/${course.id}/topics`);
    //         console.log(`${course.id}-topics`)
    //         return (await response.data.topics) as Topic[];
    //     },
    // });

    return (
        <UserLayout user={user}>
            <Head title={content.title} />

            <CourseLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-3">
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
                        <p className="font-light text-justify pb-1">{content.description}</p>
                    )}

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

                    {content.type !== 'material' && (
                        <SubmissionForm />
                    )}
                </div>


                <CommentForm />

                <Link href={`/courses/${content.course_id}`} className="flex items-center gap-2 w-fit"><ArrowLeft className="w-4 h-4 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />Back</Link>
            </CourseLayout>
        </UserLayout >
    );
}