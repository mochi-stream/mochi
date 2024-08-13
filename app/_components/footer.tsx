import Link from "next/link";

export default function Footer() {
    return <footer className="px-4 lg:px-12 py-6 select-none space-y-6 border-t border-white/5 mt-6">
        <div className="w-full flex justify-between">
            <div className="flex items-center gap-4 text-sm">
                <Link href="/" className="font-semibold text-lg">Mochi.</Link>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/bug" className="text-muted-foreground hover:text-primary transition-colors">Report Bug</Link>
            </div>
            <div className="text-end w-96">
                <p className="text-sm text-muted-foreground"><b>Disclaimer:</b> No files are retained on our servers; we merely link to media content hosted by external services.</p>
            </div>
        </div>
    </footer>;
}