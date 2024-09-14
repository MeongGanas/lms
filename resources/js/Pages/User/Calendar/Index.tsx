import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function CalendarIndex({ auth }: PageProps) {
    const user = auth ? auth.user : null;

    return (
        <UserLayout user={user}>
            <Head title="Calendar" />
            <h1>Calendar</h1>
        </UserLayout>
    );
}
