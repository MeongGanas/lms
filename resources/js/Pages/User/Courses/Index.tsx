import {
    CreateCourseDialog,
    TeacherCourses,
} from "@/Components/MyComponent/User/CourseComponent";
import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function CoursesIndex({ auth }: PageProps) {
    const user = auth ? auth.user : null;
    return (
        <UserLayout user={auth.user}>
            <Head title="Course" />
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">My Courses</h1>
                    {user && user.role === "teacher" && <CreateCourseDialog />}
                </div>
                {user && user.role === "teacher" && <TeacherCourses />}
            </div>
        </UserLayout>
    );
}
