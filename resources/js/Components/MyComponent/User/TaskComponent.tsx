import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { Link } from "@inertiajs/react";

export function TaskCard({ index }: { index: number }) {
    return (
        <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="text-xl font-bold text-left hover:no-underline">
                Beginner&apos;s Guide to becoming a professional frontend
                developer
            </AccordionTrigger>
            <AccordionContent className="pl-4">
                <ul className="space-y-3 list-disc">
                    <li>
                        <div className="flex justify-between">
                            <Link href="" className="hover:underline">
                                Membuat website dengan tema peduli lingkungan.
                            </Link>
                            <p className="text-end">Due: Tomorrow</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex justify-between">
                            <Link href="" className="hover:underline">
                                Membuat website dengan tema peduli lingkungan.
                            </Link>
                            <p className="text-end">Due: Tomorrow</p>
                        </div>
                    </li>
                </ul>
            </AccordionContent>
        </AccordionItem>
    );
}
