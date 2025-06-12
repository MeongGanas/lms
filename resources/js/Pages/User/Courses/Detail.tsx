import UserLayout from "@/Layouts/UserLayout";
import { Course, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import CreateTopic from "@/Components/MyComponent/User/Course/Topics/TopicDialog";
import { Button } from "@/Components/ui/button";

export default function CourseDetail({
    auth: { user },
    course,
}: PageProps<{ course: Course }>) {
    const pathname = window.location.pathname.split('/').slice(1, -1);

    useEffect(() => {
        axios.post("/setRecentCourse", { course_id: course.id });
    }, [course]);

    console.log(course);

    return (
        <UserLayout user={user}>
            <Head title={course.title} />
            <Breadcrumb>
                <BreadcrumbList>
                    {pathname.map((path, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/${path}`} className="capitalize">{path}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage>{course.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-bold text-3xl">{course.title}</h1>
            {user.role === 'teacher' && (
                <TeacherView course={course} />
            )}


        </UserLayout>
    );
}

function TeacherView({ course }: { course: Course }) {
    return (
        <>
            <CreateTopic course_id={course.id} />
            {course.topics.length > 0 && (
                course.topics.map((topic) => (
                    <div className="w-full p-5 border shadow-sm rounded-xl space-y-4">
                        <h1 className="font-semibold text-xl">{topic.title}</h1>
                        <Button asChild className="w-full text-center bg-transparent border-black border text-black hover:bg-black/10">
                            <Link href={`/topics/${topic.id}/contents/create`}>Add Content</Link>
                        </Button>
                    </div>
                ))
            )}
        </>
    )
}