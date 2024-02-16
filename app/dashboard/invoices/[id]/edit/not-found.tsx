import Link from "next/link"; 
import { FaceFrownIcon } from "@heroicons/react/24/outline"; 
import { Metadata } from "next";

export const metatada: Metadata = {
    title: 'Not Found Invoice',
}; 


export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <FaceFrownIcon className="w-10 text-gray-400"  />
            <h2 className="text-xl foun-semibold">404 Not Found</h2>
            <p>Could not find the requested invoice.</p>

            <Link href="/dashboard/invoices" className="mt-4 rounded-md py-2 px-4 transition-colors bg-blue-500 text-white text-sm hover:bg-blue-400">
                Go Back
            </Link>
        </main>
    )
}