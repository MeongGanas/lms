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
import CourseCard from "./CourseCard";

export function JoinOrCreateCourse({ user }: { user: User }) {
    return (
        <div className="flex items-center justify-center w-full py-20 rounded-xl bg-muted">
            {(user && user.role === "student") || (!user && <JoinDialog />)}
            {user && user.role === "teacher" && <CreateDialog />}
        </div>
    );
}

function JoinDialog() {
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

function CreateDialog() {
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
