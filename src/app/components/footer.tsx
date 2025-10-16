import Link from "next/link";

export default function Footer() {
    return (
        <footer role="contentinfo" aria-label="Patička" className="bg-neutral-900 text-white border-t border-neutral-700/60">
            {/* Lower bar */}
            <div className="border-t border-neutral-700/60">
                <div className="mx-auto w-full max-w-screen-xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/60">© 2025 ThinkHome. Všechna práva vyhrazena.</p>
                    <ul className="flex items-center gap-6 text-xs text-white/70">
                        <li>
                            <Link href="/" className="hover:text-white">Domů</Link>
                        </li>
                        <li>
                            <Link href="/sluzby" className="hover:text-white">Služby</Link>
                        </li>
                        <li>
                            <Link href="/o-nas" className="hover:text-white">O nás</Link>
                        </li>
                        <li>
                            <Link href="https://github.com/thinkhome" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                GitHub
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
