import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import { Course, StudentCourse } from "@/types";
import { Link } from "@inertiajs/react";
import { JoinDialog } from "./CourseDialog";

export function StudentCourseCard({ course }: { course: StudentCourse }) {
    const teacherName = course.teacher.lastname ? `${course.teacher.firstname + course.teacher.lastname}` : course.teacher.firstname;

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
                <CardContent className="px-3 py-1 space-y-1">
                    <h4 className="text-sm text-gray-500">{teacherName}</h4>
                    <CardTitle className="text-lg">
                        {course.title}
                    </CardTitle>
                </CardContent>
                <CardFooter className="px-3 pt-1 block space-y-2">
                    <Progress value={course.progress_percentage} />
                    <h4 className="text-sm text-gray-500">{course.progress_percentage}% complete</h4>
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


export function PublicCourseCard({ user_id, course }: { course: Course; user_id: string }) {
    const teacherName = course.teacher.lastname ? `${course.teacher.firstname + course.teacher.lastname}` : course.teacher.firstname;

    const alreadyEnrolled = course.enrollments.some(
        (enrollment) => enrollment.student_id === user_id
    ) || course.teacher_id === user_id;

    return (
        <Card className="shadow-sm border-neutral-100 rounded-xl">
            <Link href={`/courses/${course.id}`} preserveState>
                <CardHeader className="px-3 pb-2">
                    <img
                        src="/asset/course_placeholder.png"
                        className="rounded-xl"
                        alt="placeholder"
                    />
                </CardHeader>
                <CardContent className="px-3 py-1 space-y-1">
                    <h4 className="text-sm">{teacherName}</h4>
                    <CardTitle className="text-lg">
                        {course.title}
                    </CardTitle>
                </CardContent>
            </Link>
            <CardFooter className="px-3 pt-3">
                {!alreadyEnrolled ? (
                    <JoinDialog course={course} />
                ) : (
                    <Button className="w-full text-center" disabled>Joined</Button>
                )}
            </CardFooter>
        </Card>
    );
}