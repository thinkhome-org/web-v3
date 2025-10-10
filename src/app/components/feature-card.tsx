"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: string;
    image?: string;
    link?: {
        text: string;
        url: string;
    };
    className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, image, link, className = "" }) => {
    return (
        <div className={`feature-card group relative overflow-hidden rounded-xl p-6 border border-border bg-card hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:border-foreground/20 w-full h-[280px] flex flex-col ${className}`}>
            {icon && (
                <div className="feature-icon mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                        <Image src={icon} alt={`${title} icon`} width={20} height={20} className="object-contain" />
                    </div>
                </div>
            )}

            {image && (
                <div className="feature-image w-full h-32 relative mb-4 overflow-hidden rounded-lg">
                    <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
            )}

            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>

            {link && (
                <Link href={link.url} className="text-sm font-medium mt-4 inline-flex items-center text-primary hover:gap-2 gap-1 transition-all">
                    {link.text}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            )}
        </div>
    );
};

export default FeatureCard;
