import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getYoutubeId(url: string) {
    const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([^&?/]+)/
    );
    return match ? match[1] : null;
}
