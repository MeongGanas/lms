import { Course } from "@/types";
import axios from "axios";
import { useQuery } from "react-query";
import { PublicCourseCard } from "./CourseCard";
import { PublicCourseSkeleton } from "./CourseSkeleton";

export function AllCourses({ user_id }: { user_id: string }) {
    const { data, isLoading } = useQuery({
        queryKey: ['all-courses'],
        queryFn: async () => {
            const response = await axios.get("/getAllCourses");
            return (await response.data.courses) as Course[];
        },
    });

    return (
        <>
            {isLoading ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    <PublicCourseSkeleton />
                    <PublicCourseSkeleton />
                    <PublicCourseSkeleton />
                    <PublicCourseSkeleton />
                </div>
            ) : (
                data && data.length > 0 && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {data.map((course) => (
                            <PublicCourseCard course={course} key={course.id} user_id={user_id} />
                        ))}
                    </div>
                )
            )}

        </>
    );
}
