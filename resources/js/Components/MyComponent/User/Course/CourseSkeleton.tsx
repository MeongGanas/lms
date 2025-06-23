import { Skeleton } from "@/Components/ui/skeleton";

export function TopicSkeleton() {
    return (
        <div className="flex flex-col space-y-7 w-full">
            <Skeleton className="h-4 w-full max-w-[250px]" />
            <ContentSkeleton />
            <ContentSkeleton />
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