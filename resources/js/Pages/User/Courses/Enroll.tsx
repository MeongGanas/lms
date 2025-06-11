import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import UserLayout from "@/Layouts/UserLayout";
import { Course, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";

export default function EnrollCourse({
    auth: { user },
    course,
}: PageProps<{ course: Course }>) {
    const [enrollkey, setEnrollkey] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (enrollkey !== course.enrollment_key) {
            toast.error("Enrollment key wrong!");
            setIsSubmitted(false);
            return
        }

        const promise = axios.post(`/courses/${course.id}/enroll`);
        toast.promise(promise, {
            loading: "Enroll the course...",
            success: (res) => {
                setIsSubmitted(false);
                window.location.replace(`/courses/${course.id}`);
                return "Successfully enroll the course";
            },
            error: (err) => {
                console.log(err);
                setIsSubmitted(false);
                return (
                    err?.response?.data?.message || "Something went wrong"
                );
            },
        });
    };

    return (
        <UserLayout user={user}>
            <Head title={course.title} />
            <div className="w-full max-w-screen-sm mx-auto space-y-4">
                <img
                    src="/asset/course_placeholder.png"
                    className="w-full rounded-xl"
                    alt="placeholder"
                />
                <h1 className="text-2xl font-bold sm:text-2xl md:text-3xl">
                    Join {course.title}
                </h1>
                <form onSubmit={submit} className="space-y-4">
                    <Input
                        placeholder="Enrollment key"
                        id="enrollment_key"
                        onChange={(e) => setEnrollkey(e.target.value)}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitted}
                        className="w-full"
                    >
                        Enroll now
                    </Button>
                </form>
            </div>
        </UserLayout>
    );
}
