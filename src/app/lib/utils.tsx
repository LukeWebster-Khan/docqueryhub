import clsx, { ClassValue } from "clsx";
// clsx helps resolve conflicts eg.order of bg-green-500 and bg-red-500, green will be the bg color as it is first  
import { twMerge } from "tailwind-merge";
// tw merge is a custom function that merges tailwind classes eg: py-2 px-2 is the same a p-2

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}