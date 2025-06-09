import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { CreateCourseDialog } from "@/Components/MyComponent/User/Course/CreateDialog";
import {
    RecentStudentCourse,
    RecentTeacherCourse,
} from "@/Components/MyComponent/User/Course/RecentCourse";

export default function Index({ auth }: PageProps) {
    const user = auth ? auth.user : null;

    return (
        <UserLayout user={user}>
            <Head title="Home" />

            {user && user.role === "teacher" && (
                <div
                    id="join-or-create"
                    className="flex items-center justify-center w-full py-20 rounded-xl bg-muted"
                >
                    <CreateCourseDialog />
                </div>
            )}

            <div id="recent-section">
                {!user && (
                    <div className="pb-10 space-y-4">
                        <h1 className="text-2xl font-bold">
                            Countinue Learning
                        </h1>
                        <p>You must login first to continue your learn.</p>
                    </div>
                )}
                {user && user.role === "student" && <RecentStudentCourse />}
                {user && user.role === "teacher" && <RecentTeacherCourse />}
            </div>
        </UserLayout>
    );
}
