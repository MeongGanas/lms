import { DateInput, FormInput, FormTextarea, SelectInput } from "@/Components/MyComponent/FormInput";
import { Button } from "@/Components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import UserLayout from "@/Layouts/UserLayout";
import { getYoutubeId } from "@/lib/utils";
import { contentSchema } from "@/lib/validation/schemas";
import { Content, PageProps, Topic } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { z } from "zod";

type ContentSchema = z.infer<typeof contentSchema>

export default function Edit({ auth: { user }, content, topic }: PageProps<{ content: Content; topic: Topic }>) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const queryClient = useQueryClient();

    const form = useForm<ContentSchema>({
        resolver: zodResolver(contentSchema),
        defaultValues: {
            title: content.title,
            external_url: content.external_url ? content.external_url : undefined,
            description: content.description ? content.description : undefined,
            deadline: content.deadline ? new Date(content.deadline) : undefined,
            type: content.type,
        }
    });

    const { handleSubmit, control } = form;

    const fileRef = form.register("file_path");

    const externalUrl = form.watch('external_url');
    const type = form.watch('type');

    const submit = handleSubmit((values) => {
        setIsSubmitted(true);
        const data = new FormData();
        data.append('_method', 'PUT');
        data.append('topic_id', topic.id);
        data.append('title', values.title);
        data.append('type', values.type);

        if (values.external_url) {
            data.append('external_url', values.external_url);
        }

        if (values.description) {
            data.append('description', values.description);
        }

        if (values.deadline) {
            data.append('deadline', values.deadline.toString());
        }

        if (values.file_path && values.file_path.length > 0) {
            data.append('file_path', values.file_path[0]);
        }

        console.log(values.title)

        const promise = axios.post(`/contents/${content.id}/edit`, data);
        toast.promise(promise, {
            loading: "Editing content...",
            success: (res) => {
                setIsSubmitted(false);
                queryClient.invalidateQueries([`${content.topic_id}-contents`]);
                router.replace(`/courses/${topic.course_id}`);
                return res.data.message;
            },
            error: (err) => {
                setIsSubmitted(false);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    });

    return (
        <UserLayout user={user}>
            <Head title={"Edit Content"} />

            <Form {...form}>
                <form
                    onSubmit={submit}
                    className="grid gap-5"
                >
                    <div className="grid gap-2">
                        <h1 className="text-2xl font-bold">Edit {content.title} content</h1>
                        <p className="text-balance text-muted-foreground">
                            Fill the form below to edit the content.
                        </p>
                    </div>

                    <FormInput control={control} name="title" label="Title" type="title" placeholder="Enter your content title" required />

                    <div className="grid sm:grid-cols-2 gap-5">
                        <div className={`${type === 'assignment' || type === 'quiz' ? 'col-span-1' : 'col-span-2'}`}>
                            < SelectInput control={control} name="type" label="Type" placeholder="Select type" required={true} selectItems={[
                                { value: "assignment", label: "Assignment" },
                                { value: "quiz", label: "Quiz" },
                                { value: "material", label: "Material" },
                            ]} />
                        </div>

                        {type === 'assignment' || type === 'quiz' && (
                            <DateInput control={control} name="deadline" label="Deadline" />
                        )}
                    </div>

                    <FormField
                        control={control}
                        name="file_path"
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel htmlFor="file_path">
                                    <span className="mr-1">Attachment File</span> <span className="text-gray-500/90 text-sm">( optional )</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            id="file_path"
                                            type="file"
                                            {...fileRef}
                                            accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, jpeg, png, image/jpeg, image/png"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormInput control={control} name="external_url" label="Attachment Link" type="external_url" placeholder="Enter your attachment link like youtube etc" />

                    {externalUrl && (externalUrl.includes('youtu.be') || externalUrl.includes('youtube.com')) && (
                        <iframe
                            src={`https://www.youtube.com/embed/${getYoutubeId(externalUrl)}`}
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-xl aspect-video w-full"
                        ></iframe>
                    )}

                    <FormTextarea control={control} name="description" label="Description" placeholder="Enter your content description" />

                    <div className="flex gap-2">
                        <Button type="button" disabled={isSubmitted} className="w-fit border-black/10 border bg-transparent text-black hover:bg-black/10" onClick={() => window.history.back()}>
                            Back
                        </Button>
                        <Button type="submit" disabled={isSubmitted} className="w-fit">
                            {isSubmitted ? "Updating..." : "Update Content"}
                        </Button>
                    </div>
                </form>
            </Form>
        </UserLayout>
    )
}