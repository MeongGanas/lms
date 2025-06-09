import { Course } from "@/types";
import axios from "axios";
import { useQuery } from "react-query";
import { PublicCourseCard } from "./CourseCard";

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
            {isLoading && <h1>Loading...</h1>}
            {data ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {data.map((course) => (
                        <PublicCourseCard course={course} key={course.id} user_id={user_id} />
                    ))}
                </div>
            ) : (
                <h1>No classes created yet </h1>
            )}
        </>
    );
}
