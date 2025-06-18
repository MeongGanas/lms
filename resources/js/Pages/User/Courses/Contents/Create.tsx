import { DateInput, FormInput, FormTextarea, SelectInput } from "@/Components/MyComponent/FormInput";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import UserLayout from "@/Layouts/UserLayout";
import { contentSchema } from "@/lib/validation/schemas";
import { PageProps, Topic } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type ContentSchema = z.infer<typeof contentSchema>

export default function Create({ auth: { user }, topic }: PageProps<{ topic: Topic }>) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ContentSchema>({
        resolver: zodResolver(contentSchema),
        defaultValues: {
            title: "",
        }
    });

    const { handleSubmit, control } = form;

    const submit = handleSubmit((values) => {
        console.log(values)
        setIsSubmitted(true);
        const promise = axios.post(`/topics/contents/create`, { ...values, topic_id: topic.id });
        toast.promise(promise, {
            loading: "Creating content...",
            success: (res) => {
                setIsSubmitted(false);
                window.history.back();
                return "Content created successfully";
            },
            error: (err) => {
                setIsSubmitted(false);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
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
                        <h1 className="text-2xl font-bold">Create Content for {topic.title}</h1>
                        <p className="text-balance text-muted-foreground">
                            Fill the form below to create a new content.
                        </p>
                    </div>

                    <FormInput control={control} name="title" label="Title" type="title" placeholder="Enter your content title" required />

                    <FormInput control={control} name="file_path" label="File Attachment" type="file" />

                    <FormInput control={control} name="external_url" label="Attachment Link" type="external_url" placeholder="Enter your attachment link like youtube etc" />

                    <div className="grid sm:grid-cols-2 gap-5">
                        <DateInput control={control} name="deadline" label="Deadline" />
                        <SelectInput control={control} name="type" label="Type" placeholder="Select type" required={true} selectItems={[
                            { value: "assignment", label: "Assignment" },
                            { value: "quiz", label: "Quiz" },
                            { value: "material", label: "Material" },
                        ]} />
                    </div>

                    <FormTextarea control={control} name="description" label="Description" placeholder="Enter your content description" />

                    <div className="flex gap-2">
                        <Button type="button" disabled={isSubmitted} className="w-fit border-black/10 border bg-transparent text-black hover:bg-black/10" onClick={() => window.history.back()}>
                            Back
                        </Button>
                        <Button type="submit" disabled={isSubmitted} className="w-fit">
                            {isSubmitted ? "Creating..." : "Create Content"}
                        </Button>
                    </div>
                </form>
            </Form>
        </UserLayout>
    )
}