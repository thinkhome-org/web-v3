import Link from "next/link";
const underlineClass = "relative w-fit hover:text-white hover:transition hover:duration-200 after:bg-sky-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-200 hover:after:w-full";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">ThinkHome</h3>

                        <div className="space-y-4">
                            <Link href="/" className={underlineClass}>
                                Domů
                            </Link>
                            <Link href="/o-nas" className={underlineClass}>
                                O nás
                            </Link>
                            <Link href="/nas-tym" className={underlineClass}>
                                Náš tým
                            </Link>
                            <Link href="/sluzby" className={underlineClass}>
                                Služby
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4">Kontakt</h3>

                        <div className="space-y-4">
                            <Link href="/contact" className={underlineClass}>
                                Kontakt
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
