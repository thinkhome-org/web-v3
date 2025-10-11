import Link from "next/link";
const underlineClass = "relative w-fit hover:text-white hover:transition hover:duration-200 after:bg-sky-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-200 hover:after:w-full";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white py-8 border-t border-neutral-600">
            <div className="container mx-auto px-4 flex flex-col gap-4">
                <div className="flex flex-row gap-4 text-center justify-center items-center">
                    <p className="font-bold">ThinkHome</p>
                </div>
                <div className="flex flex-row justify-between items-start">
                    <div className="flex flex-col gap-4 text-left">
                        <p className="font-bold">Kontakt</p>
                        <p>mailto:info@thinkhome.org</p>
                        <p>tel:+420910129289</p>
                    </div>
                    <div className="flex flex-col gap-4 text-right">
                        <div>
                            <p className="font-bold">GitHub</p>
                            <p>github.com/thinkhome</p>
                        </div>
                        <div>
                            <p className="font-bold">© 2025 ThinkHome. Všechna práva vyhrazena.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
