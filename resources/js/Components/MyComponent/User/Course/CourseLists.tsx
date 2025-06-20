import { Course, StudentCourse } from "@/types";
import { StudentCourseCard, TeacherCourseCard } from "./CourseCard";
import { Link } from "@inertiajs/react";

export function TeacherCourseLists({ data }: { data: Course[] }) {
    return (
        <>
            {data.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {data.map((course) => (
                        <TeacherCourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : <h1>You are not have any course.</h1>}
        </>
    );
}

export function StudentCourseLists({ data }: { data: StudentCourse[] }) {
    return (
        <>
            {data.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {data.map((course) => (
                        <StudentCourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : <h1>You are not in any course. Please <Link href="/courses" className="underline">join</Link> a course.</h1>}
        </>
    );
}
