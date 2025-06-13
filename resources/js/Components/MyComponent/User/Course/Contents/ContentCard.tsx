import { getYoutubeId } from "@/lib/utils";
import { Content } from "@/types";

export default function ContentCard({ content }: { content: Content }) {
    const videoId = getYoutubeId(content.external_url ? content.external_url : '');

    return (
        <div className="flex gap-3">
            <h1 className="text-lg">{content.order}.</h1>
            <div className="flex items-center gap-3">
                <div className="w-full rounded-xl space-y-2" key={content.id}>
                    <h1 className="text-lg">{content.title}</h1>
                    <p className="font-light text-justify pb-1">{content.description}</p>
                    {content.external_url && (
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-xl w-full aspect-video"
                        ></iframe>
                    )}
                </div>
                <input type="radio" className="cursor-pointer" />
            </div>
        </div>
    )
}