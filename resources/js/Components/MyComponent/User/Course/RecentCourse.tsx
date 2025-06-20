import axios from "axios";
import { StudentCourseLists, TeacherCourseLists } from "./CourseLists";
import { Course, StudentCourse } from "@/types";
import { useQuery } from "react-query";

export function RecentTeacherCourse() {
    const { data, isLoading } = useQuery({
        queryKey: ['recent-teacher-courses'],
        queryFn: async () => {
            const response = await axios.get("/teacher/getRecentCourses");
            return (await response.data.courses) as Course[];
        },
    });

    return (
        <div className="pb-10 space-y-4">
            <h1 className="text-2xl font-bold">Recent Course</h1>
            {isLoading && <h1>Loading...</h1>}
            {data && <TeacherCourseLists data={data} />}
        </div>
    );
}

export function RecentStudentCourse() {
    const { data, isLoading } = useQuery({
        queryKey: ['recent-student-courses'],
        queryFn: async () => {
            const response = await axios.get("/student/getRecentCourses");
            console.log((await response.data.courses))
            return (await response.data.courses) as StudentCourse[];
        },
    });

    return (
        <div className="pb-10 space-y-4">
            <h1 className="text-2xl font-bold">Continue Learning</h1>
            {isLoading && <h1>Loading...</h1>}
            {data && <StudentCourseLists data={data} />}
        </div>
    );
}
