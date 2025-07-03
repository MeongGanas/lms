import { Skeleton } from "@/Components/ui/skeleton";

export function RecentStudentCourseSkeleton() {
    return (
        <div className="shadow-sm border-neutral-100 rounded-xl p-3 space-y-4">
            <Skeleton className="w-full h-24 rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-[100px]" />
                <Skeleton className="h-4 w-full max-w-[150px]" />
                <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-4 w-full max-w-[120px]" />
        </div>
    )
}

export function RecentTeacherCourseSkeleton() {
    return (
        <div className="shadow-sm border-neutral-100 rounded-xl p-3 space-y-4">
            <Skeleton className="w-full h-24 rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-[150px]" />
                <Skeleton className="h-4 w-full max-w-[120px]" />
            </div>
        </div>
    )
}

export function PublicCourseSkeleton() {
    return (
        <div className="shadow-sm border-neutral-100 rounded-xl p-3 space-y-4">
            <Skeleton className="w-full h-24 rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-[100px]" />
                <Skeleton className="h-4 w-full max-w-[200px]" />
            </div>
            <Skeleton className="h-9 w-full rounded-md" />
        </div>
    )
}

export function TopicSkeleton({ role }: { role: string }) {
    return (
        <div className="flex flex-col space-y-3 w-full">
            <Skeleton className="h-4 w-full max-w-[250px]" />
            {role === 'teacher' && (
                <Skeleton className="h-9 w-full rounded-md" />
            )}
            <div className="space-y-2">
                <ContentSkeleton />
            </div>
        </div >
    )
}

export function ContentSkeleton() {
    return (
        <div className="p-2 flex gap-2">
            <Skeleton className="h-4 w-full max-w-[17px]" />
            <div className="w-full flex items-center gap-2">
                <div className="w-full space-y-4">
                    <Skeleton className="h-4 w-full max-w-[400px]" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full max-w-[500px]" />
                    </div>
                    <Skeleton className="aspect-video w-full max-h-[300px] rounded-xl" />
                </div>
                <Skeleton className="h-4 w-full max-w-[17px]" />
            </div>
        </div>
    )
}

export function ParticipantSkeleton({ isTeacher }: { isTeacher: boolean }) {
    return (
        <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Skeleton className="rounded-full w-10 h-10" />
                <Skeleton className="w-20 h-4" />
            </div>
            {isTeacher && (
                <Skeleton className="w-10 h-10" />
            )}
        </li>
    )
}