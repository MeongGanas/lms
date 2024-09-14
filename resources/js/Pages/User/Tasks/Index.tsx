import { TaskCard } from "@/Components/MyComponent/User/TaskComponent";
import { Accordion } from "@/Components/ui/accordion";
import UserLayout from "@/Layouts/UserLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function TasksIndex({ auth }: PageProps) {
    const user = auth ? auth.user : null;

    return (
        <UserLayout user={user}>
            <Head title="Tasks" />
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">My Tasks</h1>
                <Accordion type="multiple" className="w-full">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TaskCard index={i} />
                    ))}
                </Accordion>
            </div>
        </UserLayout>
    );
}
