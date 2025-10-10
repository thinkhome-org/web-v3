import FeatureCard from "./feature-card";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BlurFade } from "@/components/ui/blur-fade";
import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
    const testimonials = [
        {
            quote: "S ThinkHome máme konečně partnera, který zvládá i noční incidenty. SLA drží do puntíku a pravidelné reporty nás vždy připraví na audit.",
            name: "Lucie Vránová",
            title: "COO • FinPro účetnictví",
        },
        {
            quote: "Díky automatizovanému onboarding procesu máme připravené účty pro každého pracovníka během pár minut. Bezpečnost i dostupnost konečně odpovídá realitě na stavbách.",
            name: "Roman Petr",
            title: "Technický ředitel • StavInovace",
        },
        {
            quote: "ThinkHome dodal kompletní řešení chytré domácnosti, které funguje stabilně a je snadno spravovatelné. Oceňuji rychlé reakce na každou změnu i transparentní komunikaci.",
            name: "Petr Malý",
            title: "Majitel rezidenčního domu • Privátní klient",
        },
    ];

    return (
        <div className="space-y-24 pb-16">
            {/* Value Propositions */}
            <div className="max-w-6xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                        <BlurFade>
                            <h3 className="text-xl font-bold">Transparentní správa</h3>
                        </BlurFade>
                        <BlurFade>
                            <p className="text-muted-foreground">Každý zásah logujeme a měsíc uzavíráme společným reportem.</p>
                        </BlurFade>
                    </div>
                    <div className="space-y-3">
                        <BlurFade>
                            <h3 className="text-xl font-bold">Proaktivní monitoring</h3>
                        </BlurFade>
                        <BlurFade>
                            <p className="text-muted-foreground">Incidenty řešíme dříve, než je pocítí uživatelé – od sítí po cloud.</p>
                        </BlurFade>
                    </div>
                    <div className="space-y-3">
                        <BlurFade>
                            <h3 className="text-xl font-bold">Partnerství, ne vendor</h3>
                        </BlurFade>
                        <BlurFade>
                            <p className="text-muted-foreground">Sdílíme roadmapu i doporučení, aby IT rostlo spolu s vámi.</p>
                        </BlurFade>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="max-w-6xl mx-auto px-8 space-y-8">
                <div className="text-center space-y-4">
                    <BlurFade delay={0.1}>
                        <h2 className="text-4xl font-bold">S čím pomáháme</h2>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                        <p className="text-lg text-muted-foreground">Od návrhu po nonstop provoz. Vyberte si jednotlivé služby nebo kompletní balíček. Vždy víte, co a proč implementujeme.</p>
                    </BlurFade>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <BlurFade delay={0.3}>
                        <FeatureCard title="Turn-key IT" description="Kompletní správa sítě, serverů i koncových stanic s 24/7 dohledem." />
                    </BlurFade>
                    <BlurFade delay={0.4}>
                        <FeatureCard title="Chytrá domácnost" description="Home Assistant, automatizace, kamerové systémy a vzdálená správa." />
                    </BlurFade>
                    <BlurFade delay={0.5}>
                        <FeatureCard title="Cloud & identita" description="Microsoft 365, Azure, Vercel a automatizované nasazení s Terraformem." />
                    </BlurFade>
                </div>
            </div>

            {/* Projects Section */}
            <div className="max-w-6xl mx-auto px-8 space-y-8">
                <div className="text-center space-y-4">
                    <BlurFade delay={0.1}>
                        <h2 className="text-4xl font-bold">Naše projekty</h2>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                        <p className="text-lg text-muted-foreground">Reálné výsledky, žádné demo. Od chytrých domácností po hybridní cloud. Každý projekt má jasná měřitelná čísla.</p>
                    </BlurFade>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BlurFade delay={0.3}>
                        <div className="space-y-4 p-6 rounded-xl border border-border bg-card">
                            <div className="space-y-2">
                                <div className="text-sm text-muted-foreground">Vzdělávání</div>
                                <h3 className="text-xl font-bold">Wi-Fi kampus pro střední školu</h3>
                                <p className="text-sm text-muted-foreground">Komplexní redesign školního Wi-Fi kampusu s důrazem na bezpečnost a dohled.</p>
                            </div>
                            <div className="text-sm text-muted-foreground">Střední polytechnická škola</div>
                            <div className="flex gap-2">
                                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">networking</span>
                                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">security</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <div className="text-2xl font-bold">12</div>
                                    <div className="text-xs text-muted-foreground">budov pokrytých</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">2</div>
                                    <div className="text-xs text-muted-foreground">záložní linky</div>
                                </div>
                            </div>
                        </div>
                    </BlurFade>

                    <BlurFade delay={0.4}>
                        <div className="space-y-4 p-6 rounded-xl border border-border bg-card">
                            <div className="space-y-2">
                                <div className="text-sm text-muted-foreground">Finance</div>
                                <h3 className="text-xl font-bold">Nonstop IT support pro SMB</h3>
                                <p className="text-sm text-muted-foreground">Správa IT pro účetní firmu s důrazem na SLA a bezpečnost identit.</p>
                            </div>
                            <div className="text-sm text-muted-foreground">Středně velká účetní firma</div>
                            <div className="flex gap-2">
                                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">managed-services</span>
                                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">security</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <div className="text-2xl font-bold">2 h</div>
                                    <div className="text-xs text-muted-foreground">SLA reakce</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">96%</div>
                                    <div className="text-xs text-muted-foreground">vyřešené incidenty</div>
                                </div>
                            </div>
                        </div>
                    </BlurFade>

                    <BlurFade delay={0.5}>
                        <div className="space-y-4 p-6 rounded-xl border border-border bg-card">
                            <div className="space-y-2">
                                <div className="text-sm text-muted-foreground">Rezidenční</div>
                                <h3 className="text-xl font-bold">Chytrá vila Brandýs</h3>
                                <p className="text-sm text-muted-foreground">Kompletní integrace chytré domácnosti včetně bezpečnostních kamer a vzdálené správy.</p>
                            </div>
                            <div className="text-sm text-muted-foreground">Soukromý investor</div>
                            <div className="flex gap-2">
                                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">home-automation</span>
                                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">networking</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <div className="text-2xl font-bold">2 h</div>
                                    <div className="text-xs text-muted-foreground">reakční doba</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">18%</div>
                                    <div className="text-xs text-muted-foreground">úspora energie</div>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Testimonials */}
            <div className="w-full space-y-8">
                <div className="text-center">
                    <BlurFade>
                        <h2 className="text-4xl font-bold">Zpětná vazba</h2>
                    </BlurFade>
                    <BlurFade>
                        <p className="text-lg text-muted-foreground mt-4">Klienti, kteří se k nám vrací</p>
                    </BlurFade>
                </div>
                <div className="flex items-center justify-center w-full">
                    <BlurFade>
                        <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
                    </BlurFade>
                </div>
            </div>

            {/* Contact Section */}
            <div className="max-w-4xl mx-auto px-8 space-y-8">
                <div className="text-center space-y-4">
                    <BlurFade>
                        <h2 className="text-4xl font-bold">Potkejme se</h2>
                    </BlurFade>
                    <BlurFade>
                        <p className="text-lg text-muted-foreground">Ozvěte se, ozveme se do 24 hodin. Probereme vaše potřeby, ukážeme relevantní case studies a navrhneme první kroky. Bez závazku.</p>
                    </BlurFade>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <BlurFade>
                                <div className="font-semibold">E-mail</div>
                            </BlurFade>
                            <BlurFade>
                                <a href="mailto:info@thinkhome.org" className="text-primary hover:underline">
                                    info@thinkhome.org
                                </a>
                            </BlurFade>
                        </div>
                        <div className="space-y-2">
                            <BlurFade>
                                <div className="font-semibold">Telefon</div>
                            </BlurFade>
                            <BlurFade>
                                <a href="tel:+420910129289" className="text-primary hover:underline">
                                    +420 910 129 289
                                </a>
                            </BlurFade>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <BlurFade>
                                <div className="font-semibold">Adresa</div>
                            </BlurFade>
                            <BlurFade>
                                <p className="text-muted-foreground">Rytířova 777/3, Praha 12, 143 00</p>
                            </BlurFade>
                        </div>
                        <div className="space-y-2">
                            <BlurFade>
                                <div className="font-semibold">GitHub</div>
                            </BlurFade>
                            <BlurFade>
                                <a href="https://github.com/thinkhome" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    github.com/thinkhome
                                </a>
                            </BlurFade>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
