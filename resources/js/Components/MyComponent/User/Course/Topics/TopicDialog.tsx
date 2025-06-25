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
import { useQueryClient } from "react-query";
import { Pencil, Plus } from "lucide-react";
import { Topic } from "@/types";

export function CreateTopic({ course_id }: { course_id: string }) {
    const [title, setTitle] = useState("")
    const [open, setOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const queryClient = useQueryClient();

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        const data = { title, course_id };
        const promise = axios.post(`/topic/create`, data);
        toast.promise(promise, {
            loading: "Creating...",
            success: (res) => {
                setIsSubmitted(false);
                setOpen(false);
                queryClient.invalidateQueries([`${course_id}-topics`]);
                return res.data.message;
            },
            error: (err) => {
                setIsSubmitted(false);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'icon'} variant={'outline'}>
                    <Plus className="w-3 h-3" />
                </Button>
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
                            id="title"
                            placeholder="Topic name"
                            required
                            min={2}
                            max={255}
                            value={title}
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

export function EditTopic({ topic }: { topic: Topic }) {
    const [title, setTitle] = useState(topic.title)
    const [open, setOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const queryClient = useQueryClient();

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        const data = { title };
        const promise = axios.put(`/topics/${topic.id}/edit`, data);
        toast.promise(promise, {
            loading: "Editing...",
            success: (res) => {
                setIsSubmitted(false);
                setOpen(false);
                queryClient.invalidateQueries([`${topic.course_id}-topics`]);
                return res.data.message;
            },
            error: (err) => {
                setIsSubmitted(false);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="w-full text-left hover:bg-black/5 rounded-sm p-2 text-sm flex items-center gap-2">
                    <Pencil className="w-3 h-3" />Edit
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Change {topic.title} name
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Fill the topic name below to change the topic name.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="pb-4">
                        <Input
                            id="title"
                            placeholder="Topic name"
                            required
                            min={2}
                            max={255}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button disabled={isSubmitted} type="submit">
                            Change Now
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}