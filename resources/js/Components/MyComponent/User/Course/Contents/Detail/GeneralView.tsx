import { getYoutubeId } from "@/lib/utils";
import { Content } from "@/types";
import { format } from "date-fns";

export default function GeneralView({ content }: { content: Content }) {
    const videoId = getYoutubeId(content.external_url ? content.external_url : '');

    return (
        <>
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
        </>
    )
} 