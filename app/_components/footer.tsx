import Link from "next/link";

export default function Footer() {
    return <footer className="flex justify-center items-center px-4 lg:px-8 py-6 select-none text-center">
        <p className="text-sm text-muted-foreground w-[80%]"><b>Disclaimer:</b> No files are retained on our servers; we merely link to media content hosted by external services. <Link href="https://github.com/mochi-stream/mochi" className="underline-offset-2 hover:underline" target="_blank">View on Github</Link></p>
    </footer>;
}
