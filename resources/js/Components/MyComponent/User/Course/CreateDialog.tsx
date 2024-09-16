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
import { Course } from "@/types";
import axios from "axios";
import { Plus } from "lucide-react";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";

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
                window.location.replace(`/courses/${course.id}`);
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
                <Button className="flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:block">Create Course</span>
                </Button>
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
