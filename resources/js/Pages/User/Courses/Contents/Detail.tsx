import UserLayout from "@/Layouts/UserLayout";
import { Breadcrumbs, Content, Course, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import CourseLayout from "@/Layouts/CourseLayout";
import StudentView from "@/Components/MyComponent/User/Course/Contents/Detail/StudentView";
import TeacherView from "@/Components/MyComponent/User/Course/Contents/Detail/TeacherView";

export default function ContentDetail({
    auth: { user },
    course,
    content,
    breadcrumbs
}: PageProps<{ course: Course; content: Content; breadcrumbs: Breadcrumbs[] }>) {
    const isTeacher = course.teacher_id === user.id

    return (
        <UserLayout user={user}>
            <Head title={content.title} />

            <CourseLayout breadcrumbs={breadcrumbs}>
                {isTeacher ? (
                    <TeacherView content={content} user={user} />
                ) : (
                    <StudentView content={content} user={user} />
                )}
            </CourseLayout>
        </UserLayout >
    );
}