import { Skeleton } from "@/Components/ui/skeleton"
import { Content, TempFile } from "@/types"
import axios from "axios"
import { FileIcon, X } from "lucide-react"
import { SyntheticEvent } from "react"
import toast from "react-hot-toast"
import { useQueryClient } from "react-query"

export function UploadedFileCard({ tempFile, content, user_id }: { tempFile: TempFile, content: Content; user_id: string }) {
    const queryClient = useQueryClient();

    const deleteTempFiles = (e: SyntheticEvent, tempFile: TempFile) => {
        e.preventDefault()

        const promise = axios.delete(`/submission/temp_files/${tempFile.id}/delete`)

        toast.promise(promise, {
            loading: "Deleting...",
            success: (res) => {
                queryClient.invalidateQueries([`${content.id}-${user_id}-temp_files`])
                return res.data.message;
            },
            error: (err) => {
                console.log(err);
                return err?.response?.data?.message || "Something went wrong";
            },
        })
    }

    return (
        <div className="flex justify-between border rounded-md p-4">
            <a target="_blank" href={`/storage/${tempFile.file_path}`} className="text-blue-600 underline flex items-center gap-2"><FileIcon className="w-5 h-5" />{tempFile.file_name}</a>
            <button className="group" onClick={(e) => deleteTempFiles(e, tempFile)}>
                <X className="w-4 h-4 group-hover:text-red-600 transition" />
            </button>
        </div>
    )
}

export function UploadedFileCardSkeleton() {
    return (
        <div className="flex justify-between border rounded-md p-4">
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 bg-gray-200 rounded-full" />
                <Skeleton className="h-4 w-[150px] bg-gray-200 rounded-full" />
            </div>
            <Skeleton className="h-4 w-4 bg-gray-200 rounded-full" />
        </div>
    )
}