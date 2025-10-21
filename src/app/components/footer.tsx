/**
 * Footer
 * - Centers the contact form with supporting contact + GitHub details.
 */
import Contact from "@/app/components/contact";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white py-8 border-t border-neutral-600" style={{ contentVisibility: "auto", containIntrinsicSize: "500px 800px" }}>
            <div className="container mx-auto px-4 flex flex-col gap-4">
                <div className="relative">
                    <div className="flex justify-center">
                        <Contact />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-between items-end text-sm">
                        <div className="flex flex-col gap-2 text-left">
                            <p className="font-bold">Kontakt</p>
                            <p>info@thinkhome.org</p>
                            <p>+420 910 129 289</p>
                        </div>
                        <div className="flex flex-col gap-2 text-right">
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
            </div>
        </footer>
    );
}
