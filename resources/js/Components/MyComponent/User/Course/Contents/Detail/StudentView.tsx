import { SubmissionForm } from "../SubmissionForm";
import CommentSection from "./CommentSection";
import { Content, Submission, User } from "@/types";
import GeneralView from "./GeneralView";
import { useQuery } from "react-query";
import axios from "axios";
import { UploadedFileCard } from "../UploadedFileCard";
import { Button } from "@/Components/ui/button";

export default function StudentView({ content, user }: { content: Content, user: User }) {
    const notMaterial = content.type !== 'material';

    const { data: submission, isLoading } = useQuery({
        queryKey: [`${content.id}-${user.id}-submission`],
        queryFn: async () => {
            const response = await axios.get(`/contents/${content.id}/submissions/${user.id}`);
            return (await response.data.submission[0]) as Submission;
        },
    });

    return (
        <div className={`grid ${notMaterial ? 'xl:grid-cols-3' : 'xl:grid-cols-1'} gap-5`}>
            <div className="space-y-3 xl:col-span-2">
                <GeneralView content={content} />

                {notMaterial && (
                    <div className="block xl:hidden">
                        {isLoading ? (
                            <h1>Loading...</h1>
                        ) : (
                            submission ? (
                                <SubmissionDetail submission={submission} />
                            ) : (
                                <SubmissionForm content={content} user_id={user.id} />
                            )
                        )}
                    </div>
                )}

                <CommentSection content_id={content.id} user_id={user.id} />
            </div>
            {notMaterial && (
                <div className="hidden xl:block">
                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        submission ? (
                            <SubmissionDetail submission={submission} />
                        ) : (
                            <SubmissionForm content={content} user_id={user.id} />
                        )
                    )}
                </div>
            )}
        </div>
    )
}

function SubmissionDetail({ submission }: { submission: Submission }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="font-bold">Status: <span className={`${submission.status === 'late' ? 'text-red-500' : 'text-green-500'} capitalize`}>{submission.status}</span></p>
                <p className="font-bold">{submission.score ? submission.score : '-'}/100</p>
            </div>
            <div className="space-y-2">
                {submission.files.map(file => (
                    <UploadedFileCard key={file.id} tempFile={file} />
                ))}
            </div>
            <Button type="button" className="w-full">Unsubmit</Button>
        </div>
    )
}