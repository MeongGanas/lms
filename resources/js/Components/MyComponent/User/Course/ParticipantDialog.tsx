import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Skeleton } from "@/Components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip";
import { Participants } from "@/types";
import axios from "axios";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { ParticipantSkeleton } from "./CourseSkeleton";

export default function ParticipantDialog({ course_id, isTeacher }: { course_id: string; isTeacher: boolean }) {
    const { data: participants = [], isLoading } = useQuery({
        queryKey: [`${course_id}-participants`],
        queryFn: async () => {
            const response = await axios.get(`/courses/${course_id}/enrollments`);
            return (await response.data.participants) as Participants[];
        },
    });

    const queryClient = useQueryClient();

    const kickParticipant = (participant_id: string, course_id: string) => {
        const promise = axios.post(`/courses/${course_id}/enrollments/${participant_id}/kick`, {});
        toast.promise(promise, {
            loading: "Kicking...",
            success: (res) => {
                queryClient.invalidateQueries([`${course_id}-participants`]);
                return res.data.message;
            },
            error: (err) => {
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    }

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button size={'icon'} variant={'outline'}>
                            <User className="w-3 h-3" />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Participants</p>
                </TooltipContent>
            </Tooltip>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Participants ({participants.length})
                    </DialogTitle>
                </DialogHeader>
                <ul className="space-y-3">
                    {isLoading ? (
                        <>
                            <ParticipantSkeleton isTeacher={isTeacher} />
                            <ParticipantSkeleton isTeacher={isTeacher} />
                            <ParticipantSkeleton isTeacher={isTeacher} />
                        </>
                    ) : (
                        <>
                            {participants.length > 0 && participants.map((participant) => (
                                <li className="flex items-center justify-between" key={participant.id}>
                                    <div className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarImage src={`/storage/${participant.student.profile_image}`} />
                                            <AvatarFallback>{participant.student.firstname[0]}</AvatarFallback>
                                        </Avatar>
                                        <span>{participant.student.lastname ? participant.student.firstname + " " + participant.student.lastname : participant.student.firstname}</span>
                                    </div>
                                    {isTeacher && (
                                        <AlertDialog>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <AlertDialogTrigger asChild>
                                                        <Button size={'icon'} variant={'outline'}>
                                                            <LogOut className="w-3 h-3 text-red-600" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Kick</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently kick {participant.student.lastname ? participant.student.firstname + " " + participant.student.lastname : participant.student.firstname}.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-red-600 hover:bg-red-600/90" onClick={() => kickParticipant(participant.id, participant.course_id)}>Kick</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    )}
                                </li>
                            ))}
                        </>
                    )}

                </ul>
            </DialogContent>
        </Dialog>
    )
}