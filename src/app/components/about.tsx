import FeatureCard from "./feature-card";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BlurFade } from "@/components/ui/blur-fade";
import ScrollReveal from "@/components/ScrollReveal";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import TiltedCard from "@/components/TiltedCard";

export default function About() {
    const testimonials = [
        {
            quote: "S ThinkHome máme konečně partnera, který zvládá i noční incidenty. SLA drží do puntíku a pravidelné reporty nás vždy připraví na audit.",
            name: "Samuel Palubinský",
            title: "COO • FinPro účetnictví",
        },
        {
            quote: "Díky automatizovanému onboarding procesu máme připravené účty pro každého pracovníka během pár minut. Bezpečnost i dostupnost konečně odpovídá realitě na stavbách.",
            name: "Ondrej Janík",
            title: "Technický ředitel • StavInovace",
        },
        {
            quote: "ThinkHome dodal kompletní řešení chytré domácnosti, které funguje stabilně a je snadno spravovatelné. Oceňuji rychlé reakce na každou změnu i transparentní komunikaci.",
            name: "Erdinc Daskicky",
            title: "Majitel rezidenčního domu • Privátní klient",
        },
    ];

    return (
        <div className="space-y-24 pb-16">
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
                        <CardContainer className="inter-var">
                            <CardBody className="bg-card relative group/card hover:shadow-2xl border-border w-full h-auto rounded-xl p-6 border">
                                <CardItem translateZ="50" className="text-xl font-bold">
                                    Turn-key IT
                                </CardItem>
                                <CardItem as="p" translateZ="60" className="text-sm text-muted-foreground mt-3">
                                    Kompletní správa sítě, serverů i koncových stanic s 24/7 dohledem.
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    </BlurFade>
                    <BlurFade delay={0.4}>
                        <CardContainer className="inter-var">
                            <CardBody className="bg-card relative group/card hover:shadow-2xl border-border w-full h-auto rounded-xl p-6 border">
                                <CardItem translateZ="50" className="text-xl font-bold">
                                    Chytrá domácnost
                                </CardItem>
                                <CardItem as="p" translateZ="60" className="text-sm text-muted-foreground mt-3">
                                    Home Assistant, automatizace, kamerové systémy a vzdálená správa.
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    </BlurFade>
                    <BlurFade delay={0.5}>
                        <CardContainer className="inter-var">
                            <CardBody className="bg-card relative group/card hover:shadow-2xl border-border w-full h-auto rounded-xl p-6 border">
                                <CardItem translateZ="50" className="text-xl font-bold">
                                    Cloud & identita
                                </CardItem>
                                <CardItem as="p" translateZ="60" className="text-sm text-muted-foreground mt-3">
                                    Microsoft 365, Azure, Vercel a automatizované nasazení s Terraformem.
                                </CardItem>
                            </CardBody>
                        </CardContainer>
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
