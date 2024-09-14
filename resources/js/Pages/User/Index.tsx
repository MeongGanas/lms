import {
    ContinueLearn,
    JoinOrCreateCourseDialog,
    RecentCourse,
} from "@/Components/MyComponent/User/CourseComponent";
import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({ auth }: PageProps) {
    const user = auth ? auth.user : null;

    return (
        <UserLayout user={user}>
            <Head title="Home" />

            <div
                id="join-or-create"
                className="flex items-center justify-center w-full py-20 rounded-xl bg-muted"
            >
                <JoinOrCreateCourseDialog user={user} />
            </div>

            <div id="recent-section">
                {!user && (
                    <div className="pb-10 space-y-4">
                        <h1 className="text-2xl font-bold">
                            Countinue Learning
                        </h1>
                        <p>You must login first to continue your learn.</p>
                    </div>
                )}
                {user && user.role === "student" && <ContinueLearn />}
                {user && user.role === "teacher" && <RecentCourse />}
            </div>
        </UserLayout>
    );
}
