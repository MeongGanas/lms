import {
    CourseCard,
    JoinOrCreateCourseDialog,
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
                    <JoinOrCreateCourseDialog user={user} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
            </div>
        </UserLayout>
    );
}
