import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { Breadcrumbs } from "@/types";
import React, { ReactNode } from "react";

export default function CourseLayout({ children, breadcrumbs }: { children: ReactNode, breadcrumbs: Breadcrumbs[] }) {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbs.slice(0, -1).map((breadcrumb, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`${breadcrumb.url}`} className="capitalize">{breadcrumb.title}
                                </BreadcrumbLink>
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
        </>
    )
}