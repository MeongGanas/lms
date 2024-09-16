import { Course } from "@/types";
import { StudentCourseCard, TeacherCourseCard } from "./CourseCard";

export function TeacherCourseLists({ data }: { data: Course[] }) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {data &&
                data.map((course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                ))}
        </div>
    );
}

export function StudentCourseLists({ data }: { data: Course[] }) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {data &&
                data.map((course) => (
                    <StudentCourseCard key={course.id} course={course} />
                ))}
        </div>
    );
}
