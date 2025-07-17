import CommentSection from "./CommentSection";
import { Content, Submission, User } from "@/types";
import GeneralView from "./GeneralView";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

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
                    <div className="block xl:hidden space-y-5">
                        <div className="space-y-3">
                            <h3 className="text-lg border-b pb-2">Submitters</h3>
                            {SubmissionLoading ? (
                                <h1>Loading...</h1>
                            ) : (
                                submissions && submissions.map(submission => (
                                    <SubmittersCard submission={submission} key={submission.id} />
                                ))
                            )}
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg border-b pb-2">Not Submitters</h3>
                            <div>
                                {NotSubmittersLoading ? (
                                    <h1>Loading...</h1>
                                ) : (
                                    notSubmitters && notSubmitters.map(student => (
                                        <NotSubmittersCard key={student.id} student={student} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <CommentSection content_id={content.id} user_id={user.id} />
            </div>
            {notMaterial && (
                <div className="hidden xl:block space-y-5">
                    <div className="space-y-3">
                        <h3 className="text-lg border-b pb-2">Submitters</h3>
                        {SubmissionLoading ? (
                            <h1>Loading...</h1>
                        ) : (
                            submissions && submissions.map(submission => (
                                <SubmittersCard submission={submission} key={submission.id} />
                            ))
                        )}
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg border-b pb-2">Not Submitters</h3>
                        <div>
                            {NotSubmittersLoading ? (
                                <h1>Loading...</h1>
                            ) : (
                                notSubmitters && notSubmitters.map(student => (
                                    <NotSubmittersCard key={student.id} student={student} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function SubmittersCard({ submission }: { submission: Submission }) {
    const [score, setScore] = useState(submission.score ? submission.score : 0);
    return (
        <div className="flex justify-between">
            <h1>{submission.student.firstname}</h1>
            <div className="flex items-center gap-1">
                <input type="number" className="border-l-0 border-t-0  border-r-0 w-7 p-0 text-center focus:outline-none focus:ring-0" value={score} onChange={(e) => setScore(parseInt(e.target.value))} />
                <span>/</span>
                <span>100</span>
            </div>
        </div>
    )
}

function NotSubmittersCard({ student }: { student: User }) {
    return (
        <div>
            <h1 className="text-sm">{student.firstname}</h1>
        </div>
    )
}