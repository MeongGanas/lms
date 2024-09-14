import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function LibraryIndex({ auth }: PageProps) {
    const user = auth ? auth.user : null;

    return (
        <UserLayout user={user}>
            <Head title="Library" />
            <h1>Library</h1>
        </UserLayout>
    );
}
