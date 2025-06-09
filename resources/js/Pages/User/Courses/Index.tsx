import { AllCourses } from "@/Components/MyComponent/User/Course/AllCourses";
import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function CoursesIndex({ auth: { user } }: PageProps) {
    return (
        <UserLayout user={user}>
            <Head title="Course" />
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">All Courses</h1>
                <AllCourses user_id={user.id} />
            </div>
        </UserLayout>
    );
}
