import UserLayout from "@/Layouts/UserLayout";
import { Course, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect } from "react";

export default function CourseDetail({
    auth,
    course,
}: PageProps<{ course: Course }>) {
    const user = auth ? auth.user : null;

    useEffect(() => {
        axios.post("/setRecentCourse", { course_id: course.id });
    }, [course]);

    return (
        <UserLayout user={user}>
            <Head title={course.title} />
            <h1>{course.title}</h1>
        </UserLayout>
    );
}
