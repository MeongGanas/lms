import CourseCard from "@/Components/MyComponent/User/CourseCard";
import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";

export default function Courses({ auth }: PageProps) {
    return (
        <UserLayout user={auth.user}>
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">My Courses</h1>
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
