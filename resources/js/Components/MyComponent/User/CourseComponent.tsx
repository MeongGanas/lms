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

export function JoinOrCreateCourseDialog({ user }: { user: User | null }) {
    return (
        <>
            {((user && user.role === "student") || !user) && (
                <JoinCourseDialog />
            )}
            {user && user.role === "teacher" && <CreateCourseDialog />}
        </>
    );
}

function JoinCourseDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Join Course</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Join a course
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Fill the course name below to joining course.
                    </DialogDescription>
                </DialogHeader>
                <form action="">
                    <div className="pb-4">
                        <Input id="code" placeholder="Course code" />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Join Now</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function CreateCourseDialog() {
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
                <form action="">
                    <div className="pb-4">
                        <Input id="name" placeholder="Course name" />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Now</Button>
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
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
        </div>
    );
}

export function RecentCourse() {
    return (
        <div className="pb-10 space-y-4">
            <h1 className="text-2xl font-bold">Recent Course</h1>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
        </div>
    );
}

export function CourseCard({ course }: { course?: Course }) {
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
