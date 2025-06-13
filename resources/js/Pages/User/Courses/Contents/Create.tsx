import { DateInput, FormInput, FormTextarea, SelectInput } from "@/Components/MyComponent/FormInput";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import UserLayout from "@/Layouts/UserLayout";
import { Course, PageProps, Topic } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const contentSchema = z.object({
    title: z.string(),
    type: z.string(),
    file: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "File must be less than 5MB",
        })
        .refine((file) => ["application/pdf", "image/png", "image/jpeg"].includes(file.type), {
            message: "Only PDF, PNG, or JPEG files are allowed",
        })
        .optional(),
    deadline: z.date().optional()
})

type ContentSchema = z.infer<typeof contentSchema>

export default function Create({ auth: { user }, course, topic }: PageProps<{ course: Course, topic: Topic }>) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ContentSchema>({
        resolver: zodResolver(contentSchema),
        defaultValues: {
            title: "",
            type: "",
        }
    });

    const { handleSubmit, control } = form;

    const submit = handleSubmit((values) => {
        setIsSubmitted(true);
        // const promise = axios.post(`/topics/${topic.id}/contents`, values);
        // toast.promise(promise, {
        //     loading: "Creating content...",
        //     success: (res) => {
        //         setIsSubmitted(false);
        //         return "Content created successfully";
        //     },
        //     error: (err) => {
        //         setIsSubmitted(false);
        //         return err?.response?.data?.message || "Something went wrong";
        //     },
        // });
    });

    return (
        <UserLayout user={user}>
            <Head title={"Create Content"} />

            <Form {...form}>
                <form
                    onSubmit={submit}
                    className="grid gap-5"
                >
                    <div className="grid gap-2">
                        <h1 className="text-2xl font-bold">Create Content for topic name</h1>
                        <p className="text-balance text-muted-foreground">
                            Fill the form below to create a new content.
                        </p>
                    </div>

                    <FormInput control={control} name="title" label="Title" type="title" placeholder="Enter your content title" required />

                    <FormInput control={control} name="file" label="Attachment" type="file" />

                    <div className="grid md:grid-cols-2 gap-5">
                        <DateInput control={control} name="deadline" label="Deadline" />
                        <SelectInput control={control} name="type" label="Type" placeholder="Select type" required selectItems={[
                            { value: "assignment", label: "Assignment" },
                            { value: "quiz", label: "Quiz" },
                            { value: "material", label: "Material" },
                        ]} />
                    </div>

                    <FormTextarea control={control} name="description" label="Description" placeholder="Enter your content description" />

                    <div className="flex gap-2">
                        <Button type="button" disabled={isSubmitted} className="w-fit border-black border bg-transparent text-black hover:bg-black/10" onClick={() => router.replace(`/courses/${course.id}`)}>
                            Back
                        </Button>
                        <Button type="submit" disabled={isSubmitted} className="w-fit">
                            {isSubmitted ? "Logging in..." : "Create Content"}
                        </Button>
                    </div>
                </form>
            </Form>
        </UserLayout>
    )
}