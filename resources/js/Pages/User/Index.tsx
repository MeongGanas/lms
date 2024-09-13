import {
    ContinueLearn,
    JoinOrCreateCourse,
} from "@/Components/MyComponent/User/IndexComponent";
import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({ auth }: PageProps) {
    return (
        <UserLayout user={auth.user}>
            <Head title="Home" />
            <JoinOrCreateCourse user={auth.user} />
            <ContinueLearn />
        </UserLayout>
    );
}
