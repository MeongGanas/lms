import CommentSection from "./CommentSection";
import { Content, Submission, User } from "@/types";
import GeneralView from "./GeneralView";
import { useQuery } from "react-query";
import axios from "axios";

export default function TeacherView({ content, user }: { content: Content, user: User }) {
    const notMaterial = content.type !== 'material';

    const { data: submissions, isLoading: SubmissionLoading } = useQuery({
        queryKey: [`${content.id}-submissions`],
        queryFn: async () => {
            const response = await axios.get(`/contents/${content.id}/submissions`);
            return (await response.data.submissions) as Submission[];
        },
    });

    const { data: notSubmitters, isLoading: NotSubmittersLoading } = useQuery({
        queryKey: [`${content.id}-notSubmitters`],
        queryFn: async () => {
            const response = await axios.get(`/contents/${content.id}/not-submitters`);
            return (await response.data.not_submitters) as User[];
        },
    });

    return (
        <div className={`grid ${notMaterial ? 'xl:grid-cols-3' : 'xl:grid-cols-1'} gap-5`}>
            <div className="space-y-3 xl:col-span-2">
                <GeneralView content={content} />

                {notMaterial && (
                    <div className="block xl:hidden">
                        <h1>Submissions</h1>
                    </div>
                )}

                <CommentSection content_id={content.id} user_id={user.id} />
            </div>
            {notMaterial && (
                <div className="hidden xl:block space-y-5">
                    <div className="space-y-3">
                        <h3 className="text-lg border-b pb-2">Submitters</h3>
                        <div>
                            {SubmissionLoading ? (
                                <h1>Loading...</h1>
                            ) : (
                                submissions && submissions.map(submission => (
                                    <div key={submission.id}>
                                        <h1 className="text-sm">{submission.student.firstname}</h1>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">

                        <h3 className="text-lg border-b pb-2">Not Submitters</h3>
                        <div>
                            {NotSubmittersLoading ? (
                                <h1>Loading...</h1>
                            ) : (
                                notSubmitters && notSubmitters.map(student => (
                                    <div key={student.id}>
                                        <h1 className="text-sm">{student.firstname}</h1>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}