import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import { Course } from "@/types";
import { Link } from "@inertiajs/react";

export function StudentCourseCard({ course }: { course: Course }) {
    const teacherName = `${course.teacher.firstname + course.teacher.lastname}`;
    return (
        <Link href={`/courses/${course.id}`}>
            <Card className="shadow-sm border-neutral-100 rounded-xl">
                <CardHeader className="p-3">
                    <img
                        src="/asset/course_placeholder.png"
                        className="rounded-xl"
                        alt="placeholder"
                    />
                </CardHeader>
                <CardContent className="px-3 py-1">
                    <CardTitle className="mb-3 text-lg">
                        {course.title}
                    </CardTitle>
                    <Progress value={80} />
                </CardContent>
                <CardFooter className="p-3">
                    <h4 className="text-sm">{course.teacher.firstname}</h4>
                </CardFooter>
            </Card>
        </Link>
    );
}

export function TeacherCourseCard({ course }: { course: Course }) {
    return (
        <Link href={`/courses/${course.id}`}>
            <Card className="shadow-sm border-neutral-100 rounded-xl">
                <CardHeader className="p-3">
                    <img
                        src="/asset/course_placeholder.png"
                        className="rounded-xl"
                        alt="placeholder"
                    />
                </CardHeader>
                <CardContent className="px-3 pt-1 pb-3 space-y-3">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <p className="text-sm">
                        Participants: {course.enrollments.length}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
