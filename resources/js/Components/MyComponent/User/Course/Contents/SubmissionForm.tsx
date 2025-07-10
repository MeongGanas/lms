import { Button } from "@/Components/ui/button"
import { Content, TempFile } from "@/types";
import axios from "axios";
import { X } from "lucide-react";
import { ChangeEvent, SyntheticEvent } from "react"
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query"

export function SubmissionForm({ content, user_id }: { content: Content; user_id: string }) {
    const { data: tempFiles, isLoading } = useQuery({
        queryKey: [`${content.id}-temp_files`],
        queryFn: async () => {
            const response = await axios.get(`/contents/${content.id}/submission/temp_files`);
            return (await response.data.files) as TempFile[];
        },
    });

    const queryClient = useQueryClient();

    const submit = () => {
        console.log("submit submission")
    }

    const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files && files?.length > 0) {
            const filesArray = Array.from(files)
            const formData = new FormData();

            formData.append('user_id', user_id);

            filesArray.forEach((file) => {
                formData.append('files[]', file);
            });

            sendToTempFiles(formData)
        }
    }

    const sendToTempFiles = (files: FormData) => {
        const promise = axios.post(`/contents/${content.id}/submission/temp_files`, files, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        toast.promise(promise, {
            loading: "Uploading...",
            success: (res) => {
                queryClient.invalidateQueries([`${content.id}-temp_files`])
                return res.data.message;
            },
            error: (err) => {
                console.log(err);
                return err?.response?.data?.message || "Something went wrong";
            },
        })
    }

    const deleteTempFiles = (e: SyntheticEvent, tempFile: TempFile) => {
        e.preventDefault()

        const promise = axios.delete(`/submission/temp_files/${tempFile.id}/delete`)

        toast.promise(promise, {
            loading: "Deleting...",
            success: (res) => {
                console.log(res.data)
                queryClient.invalidateQueries([`${content.id}-temp_files`])
                return res.data.message;
            },
            error: (err) => {
                console.log(err);
                return err?.response?.data?.message || "Something went wrong";
            },
        })
    }

    return (
        <form onSubmit={submit} className="space-y-3">
            <div className="space-y-2">
                {tempFiles && tempFiles.length > 0 && (
                    tempFiles.map((tempFile, i) => (
                        <div key={i} className="flex justify-between">
                            <a target="_blank" href={`/storage/${tempFile.file_path}`} className="text-blue-600 underline">{tempFile.file_name}</a>
                            <button className="group" onClick={(e) => deleteTempFiles(e, tempFile)}>
                                <X className="w-4 h-4 group-hover:text-red-600 transition" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-fit py-5 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPEG, JPG, XLS, XLSX, CSV</p>
                        </div>
                    </div>
                    <input id="dropzone-file" type="file" multiple className="hidden" accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, jpeg, png, image/jpeg, image/png" onChange={uploadFile} />
                </label>
            </div>

            <Button type="submit" className="w-full">Submit</Button>
        </form>
    )
}