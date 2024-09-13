import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import { Course } from "@/types";
import { Link } from "@inertiajs/react";

export default function CourseCard({ course }: { course?: Course }) {
    return (
        <Link href="">
            <Card className="shadow-sm border-neutral-50 rounded-xl">
                <CardHeader className="p-3">
                    <img
                        src="/asset/course_placeholder.png"
                        className="rounded-xl"
                        alt="placeholder"
                    />
                </CardHeader>
                <CardContent className="px-3 py-1">
                    <CardTitle className="mb-3 text-lg">
                        Beginner&apos;s Guide to becoming a professional
                        frontend developer
                    </CardTitle>
                    <Progress value={80} />
                </CardContent>
                <CardFooter className="p-3">
                    <h4 className="text-sm">Prashant Kumar singh</h4>
                </CardFooter>
            </Card>
        </Link>
    );
}
