import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { User } from "@/types";
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
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export function CreateCourseDialog() {
    const [title, setTitle] = useState("");
    const [key, setKey] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        const data = { title, enrollment_key: key };
        const promise = axios.post("/courses/create", data);
        toast.promise(promise, {
            loading: "Create the course...",
            success: (res) => {
                setIsSubmitted(false);
                const course = res.data.course as Course;
                window.location.replace(`/course/${course.id}`);
                return "Course created successfully";
            },
            error: (err) => {
                setIsSubmitted(false);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Course</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Create a course
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Fill the course name below to create a new course.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="pb-4">
                        <Input
                            id="name"
                            placeholder="Course name"
                            required
                            min={2}
                            max={255}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="pb-4">
                        <Input
                            id="key"
                            placeholder="Enrollment key"
                            required
                            min={2}
                            max={255}
                            onChange={(e) => setKey(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button disabled={isSubmitted} type="submit">
                            Create Now
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function ContinueLearn() {
    return (
        <div className="pb-10 space-y-4">
            <h1 className="text-2xl font-bold">Countinue Learning</h1>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {/* <CourseCard />
                <CourseCard />
                <CourseCard /> */}
            </div>
        </div>
    );
}

export function RecentCourse() {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const response = await axios.get("/getAllCourses");
            return (await response.data.courses) as Course[];
        },
    });

    return (
        <div className="pb-10 space-y-4">
            <h1 className="text-2xl font-bold">Recent Course</h1>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {isLoading && <h1>Loading...</h1>}
                {data &&
                    data.map((course) => (
                        <TeacherCourseCard key={course.id} course={course} />
                    ))}
            </div>
        </div>
    );
}

export function TeacherCourses() {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const response = await axios.get("/getAllCourses");
            return (await response.data.courses) as Course[];
        },
    });

    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {isLoading && <h1>Loading...</h1>}
            {data &&
                data.map((course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                ))}
        </div>
    );
}

export function StudentCourseCard({ course }: { course: Course }) {
    return (
        <Link href="">
            <Card className="shadow-sm border-neutral-50 rounded-xl">
                <CardHeader className="p-3">
                    <img
                        src="/asset/course_placeholder.png"
                        className="rounded-xl"
                        alt="placeholder"
                    />
                </CardHeader>
                <CardContent className="px-3 py-1">
                    <CardTitle className="mb-3 text-lg">
                        Beginner&apos;s Guide to becoming a professional
                        frontend developer
                    </CardTitle>
                    <Progress value={80} />
                </CardContent>
                <CardFooter className="p-3">
                    <h4 className="text-sm">Prashant Kumar singh</h4>
                </CardFooter>
            </Card>
        </Link>
    );
}

export function TeacherCourseCard({ course }: { course: Course }) {
    return (
        <Link href={`/course/${course.id}`}>
            <Card className="shadow-sm border-neutral-50 rounded-xl">
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
