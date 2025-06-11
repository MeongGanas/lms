import UserLayout from "@/Layouts/UserLayout";
import { Course, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
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

export default function CourseDetail({
    auth: { user },
    course,
}: PageProps<{ course: Course }>) {
    const pathname = window.location.pathname.split('/').slice(1, -1);

    useEffect(() => {
        axios.post("/setRecentCourse", { course_id: course.id });
    }, [course]);

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


        </UserLayout>
    );
}
