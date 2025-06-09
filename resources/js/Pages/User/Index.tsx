import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import {
    RecentStudentCourse,
    RecentTeacherCourse,
} from "@/Components/MyComponent/User/Course/RecentCourse";
import { CreateDialog } from "@/Components/MyComponent/User/Course/CourseDialog";

export default function Index({ auth: { user } }: PageProps) {
    return (
        <UserLayout user={user}>
            <Head title="Home" />

            {user && user.role === "teacher" && (
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
                {user && user.role === "student" && <RecentStudentCourse />}
                {user && user.role === "teacher" && <RecentTeacherCourse />}
            </div>
        </UserLayout>
    );
}
