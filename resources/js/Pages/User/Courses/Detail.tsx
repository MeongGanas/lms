import UserLayout from "@/Layouts/UserLayout";
import { Breadcrumbs, Course, PageProps, Topic } from "@/types";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect } from "react";
import { CreateTopic } from "@/Components/MyComponent/User/Course/Topics/TopicDialog";
import TopicCard from "@/Components/MyComponent/User/Course/Topics/TopicCard";
import { useQuery } from "react-query";
import { TopicSkeleton } from "@/Components/MyComponent/User/Course/CourseSkeleton";
import CourseMenu from "@/Components/MyComponent/User/Course/CourseMenu";
import CourseLayout from "@/Layouts/CourseLayout";
import ParticipantDialog from "@/Components/MyComponent/User/Course/ParticipantDialog";

export default function CourseDetail({
    auth: { user },
    course,
    breadcrumbs
}: PageProps<{ course: Course; breadcrumbs: Breadcrumbs[] }>) {
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

            <CourseLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-5 col-span-3">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-3xl">{course.title}</h1>
                        {user.role === 'teacher' && (
                            <div className="flex items-center gap-2">
                                <ParticipantDialog />
                                <CreateTopic course_id={course.id} />
                                <CourseMenu course={course} />
                            </div>
                        )}
                    </div>

                    {!isLoading ? (
                        topics && topics.length > 0 && topics.map((topic, i) => (
                            <TopicCard topic={topic} user={user} key={topic.id} index={i} max_topic={topics.length} />
                        ))
                    ) : (
                        <div className="mt-5 space-y-5">
                            <TopicSkeleton role={user.role} />
                            <TopicSkeleton role={user.role} />
                            <TopicSkeleton role={user.role} />
                        </div>
                    )}
                </div>
            </CourseLayout>
        </UserLayout >
    );
}