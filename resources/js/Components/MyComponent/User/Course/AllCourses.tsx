import { Course } from "@/types";
import axios from "axios";
import { useQuery } from "react-query";
import { TeacherCourseLists } from "./CourseLists";

export function TeacherCourses() {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const response = await axios.get("/getAllCourses");
            return (await response.data.courses) as Course[];
        },
    });

    return (
        <>
            {isLoading && <h1>Loading...</h1>}
            {data && <TeacherCourseLists data={data} />}
        </>
    );
}
