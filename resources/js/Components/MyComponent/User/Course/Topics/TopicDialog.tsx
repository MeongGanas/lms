import { SyntheticEvent, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateTopic({ course_id }: { course_id: string }) {
    const [title, setTitle] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        const data = { title, course_id };
        const promise = axios.post(`/course/topics/create`, data);
        toast.promise(promise, {
            loading: "Create the course...",
            success: (res) => {
                setIsSubmitted(false);
                window.location.replace(`/courses/${course_id}`);
                return "Create topic successfully";
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
                <Button className="w-full text-center bg-transparent border-black border text-black hover:bg-black/10">Add Topic</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Create a new topic
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Fill the topic name below to create a new topic.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="pb-4">
                        <Input
                            id="key"
                            placeholder="Topic name"
                            required
                            min={2}
                            max={255}
                            onChange={(e) => setTitle(e.target.value)}
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
    )
}