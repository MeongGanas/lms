import { Button } from "@/Components/ui/button";
import { Topic, User } from "@/types";
import { Link } from "@inertiajs/react";
import ContentCard from "../Contents/ContentCard";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from "react";

export default function TopicCard({ user, topic }: { user: User, topic: Topic }) {
    const [items, setItems] = useState(topic.contents);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over?.id);

            const newItems = arrayMove(items, oldIndex, newIndex);

            setItems(newItems);
        }
    }


    return (
        <div className="w-full space-y-4 border-t pt-6 pb-8 p-2">
            <h1 className="text-xl font-semibold">{topic.title}</h1>
            {user.role === "teacher" && (
                <Button asChild className="w-full text-center bg-transparent border-black/10 border text-black hover:bg-black/10">
                    <Link href={`/topics/${topic.id}/contents/create`}>Add Content</Link>
                </Button>
            )
            }
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((content) => (
                        <ContentCard content={content} key={content.id} role={user.role} />
                    ))}
                </SortableContext>
            </DndContext>
        </div >
    )
}