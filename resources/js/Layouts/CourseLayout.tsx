import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { Breadcrumbs } from "@/types";
import { Link } from "@inertiajs/react";
import React, { ReactNode } from "react";

export default function CourseLayout({ children, breadcrumbs }: { children: ReactNode, breadcrumbs: Breadcrumbs[] }) {
    return (
        <div className="space-y-5">
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbs.slice(0, -1).map((breadcrumb, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <Link href={`${breadcrumb.url}`} className="capitalize">{breadcrumb.title}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage>{breadcrumbs[breadcrumbs.length - 1].title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {children}
        </div>
    )
}