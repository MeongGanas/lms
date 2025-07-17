import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import {
    RecentStudentCourse,
    RecentTeacherCourse,
} from "@/Components/MyComponent/User/Course/RecentCourse";
import { CreateDialog } from "@/Components/MyComponent/User/Course/CourseDialog";

export default function Index({ auth: { user } }: PageProps) {
    const isTeacher = user?.role === "teacher";
    const isStudent = user?.role === "student";
    return (
        <UserLayout user={user}>
            <Head title="Home" />

            {user && isTeacher && (
                <div
                    id="join-or-create"
                    className="flex items-center justify-center w-full py-20 rounded-xl bg-muted"
                >
                    <CreateDialog />
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
                {user && isStudent && <RecentStudentCourse />}
                {user && isTeacher && <RecentTeacherCourse />}
            </div>
        </UserLayout>
    );
}
