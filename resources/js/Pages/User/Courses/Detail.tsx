import UserLayout from "@/Layouts/UserLayout";
import { Course, PageProps, Topic } from "@/types";
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
import CreateTopic from "@/Components/MyComponent/User/Course/Topics/TopicDialog";
import TopicCard from "@/Components/MyComponent/User/Course/Topics/TopicCard";
import { useQuery } from "react-query";
import { TopicSkeleton } from "@/Components/MyComponent/User/Course/CourseSkeleton";

export default function CourseDetail({
    auth: { user },
    course,
}: PageProps<{ course: Course }>) {
    const pathname = window.location.pathname.split('/').slice(1, -1);

    const { data: topics, isLoading } = useQuery({
        queryKey: [`${course.id}-topics`],
        queryFn: async () => {
            const response = await axios.get(`/courses/${course.id}/topics`);
            console.log(`${course.id}-topics`)
            return (await response.data.topics) as Topic[];
        },
    });

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

            {user.role === 'teacher' && (
                <CreateTopic course_id={course.id} />
            )}

            {topics && topics.length > 0 && !isLoading ? (
                topics.map((topic, i) => (
                    <TopicCard topic={topic} user={user} key={topic.id} index={i} max_topic={topics.length} />
                ))
            ) : (
                <div className="mt-5 space-y-5">
                    <TopicSkeleton role={user.role} />
                    <TopicSkeleton role={user.role} />
                    <TopicSkeleton role={user.role} />
                </div>
            )}
        </UserLayout >
    );
}