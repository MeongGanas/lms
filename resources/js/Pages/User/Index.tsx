import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

export default function Index({ auth }: PageProps) {
    console.log(auth);
    return (
        <div>
            <Link href={route("logout")} method="post">
                Logout
            </Link>
        </div>
    );
}
