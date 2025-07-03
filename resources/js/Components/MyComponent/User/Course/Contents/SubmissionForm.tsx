import { Button } from "@/Components/ui/button"

export function SubmissionForm() {
    const submit = () => {
        console.log("submit submission")
    }

    const uploadFile = () => {
        console.log("upload file")
    }

    return (
        <form onSubmit={submit} className="space-y-3">
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-fit py-5 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
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