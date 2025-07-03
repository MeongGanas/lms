import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { User } from "lucide-react";

export default function ParticipantDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'icon'} variant={'outline'}>
                    <User className="w-3 h-3" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Participants
                    </DialogTitle>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )
}