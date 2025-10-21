"use client";

import React, { CSSProperties } from "react";

type Position = "top" | "bottom" | "left" | "right";
type Curve = "linear" | "ease-in" | "ease-out" | "ease-in-out" | "bezier";

interface GradualBlurProps {
    target?: "parent" | "children";
    position?: Position;
    height?: string;
    width?: string;
    strength?: number;
    divCount?: number;
    curve?: Curve;
    exponential?: boolean;
    opacity?: number;
    sticky?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const GradualBlur: React.FC<GradualBlurProps> = ({ target = "parent", position = "bottom", height = "4rem", width = "100%", strength = 1.5, divCount = 1, curve = "ease-out", exponential = false, opacity = 1, sticky = false, className = "", children }) => {
    const isVertical = position === "top" || position === "bottom";
    const dimension = isVertical ? height : width;

    const getCurveFunction = (curve: Curve): ((t: number) => number) => {
        switch (curve) {
            case "linear":
                return (t) => t;
            case "ease-in":
                return (t) => t * t;
            case "ease-out":
                return (t) => t * (2 - t);
            case "ease-in-out":
                return (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
            case "bezier":
                return (t) => t * t * (3 - 2 * t);
            default:
                return (t) => t;
        }
    };

    const curveFunction = getCurveFunction(curve);

    const generateBlurLayers = () => {
        const layers = [] as React.ReactNode[]

        // Single high-quality layer with gradient mask for performance
        if (divCount <= 1) {
            const blurPx = strength * 12
            const maskDir = isVertical
                ? position === "top"
                    ? "to bottom"
                    : "to top"
                : position === "left"
                    ? "to right"
                    : "to left"

            const layerStyle: CSSProperties = {
                position: sticky && position === "top" ? "sticky" : "absolute",
                pointerEvents: "none",
                backdropFilter: `blur(${blurPx}px)`,
                WebkitBackdropFilter: `blur(${blurPx}px)`,
                opacity,
                maskImage: `linear-gradient(${maskDir}, rgba(0,0,0,1), rgba(0,0,0,0))`,
                WebkitMaskImage: `linear-gradient(${maskDir}, rgba(0,0,0,1), rgba(0,0,0,0))`,
                zIndex: 2,
            }

            if (isVertical) {
                layerStyle.width = "100%"
                layerStyle.height = dimension
                if (position === "bottom") layerStyle.bottom = 0
                if (position === "top") layerStyle.top = 0
            } else {
                layerStyle.height = "100%"
                layerStyle.width = dimension
                if (position === "right") layerStyle.right = 0
                if (position === "left") layerStyle.left = 0
            }

            // sticky only makes sense for top; browsers have limited bottom-sticky support
            if (sticky && position === "top") layerStyle.top = 0

            layers.push(<div key="blur-mask" style={layerStyle} className="gradual-blur-layer" />)
            return layers
        }

        // Multi-layer fallback (legacy)
        for (let i = 0; i < divCount; i++) {
            const progress = (i + 1) / divCount
            const curvedProgress = exponential ? Math.pow(curveFunction(progress), 2) : curveFunction(progress)
            const blurValue = curvedProgress * strength * 10
            const opacityValue = curvedProgress * opacity

            const layerStyle: CSSProperties = {
                position: "absolute",
                pointerEvents: "none",
                backdropFilter: `blur(${blurValue}px)`,
                WebkitBackdropFilter: `blur(${blurValue}px)`,
                opacity: opacityValue,
                zIndex: divCount - i,
            }

            if (isVertical) {
                layerStyle.width = "100%"
                layerStyle.height = `calc(${dimension} / ${divCount})`
                if (position === "bottom") {
                    layerStyle.bottom = `calc(${dimension} / ${divCount} * ${divCount - i - 1})`
                } else {
                    layerStyle.top = `calc(${dimension} / ${divCount} * ${divCount - i - 1})`
                }
            } else {
                layerStyle.height = "100%"
                layerStyle.width = `calc(${dimension} / ${divCount})`
                if (position === "right") {
                    layerStyle.right = `calc(${dimension} / ${divCount} * ${divCount - i - 1})`
                } else {
                    layerStyle.left = `calc(${dimension} / ${divCount} * ${divCount - i - 1})`
                }
            }

            layers.push(<div key={i} style={layerStyle} className="gradual-blur-layer" />)
        }
        return layers
    }

    if (target === "parent") {
        return (
            <div
                className={`gradual-blur-container ${className}`}
                style={{
                    position: sticky && position === "top" ? "sticky" : "absolute",
                    pointerEvents: "none",
                    ...(position === "top" && { top: 0 }),
                    ...(position === "bottom" && { bottom: 0 }),
                    ...(position === "left" && { left: 0 }),
                    ...(position === "right" && { right: 0 }),
                    ...(isVertical && { width: "100%", height: dimension }),
                    ...(!isVertical && { height: "100%", width: dimension }),
                    zIndex: 1,
                }}
            >
                {generateBlurLayers()}
            </div>
        );
    }

    return (
        <div className={`gradual-blur-wrapper ${className}`} style={{ position: "relative", overflow: "hidden" }}>
            {children}
            <div
                className="gradual-blur-container"
                style={{
                    position: sticky && position === "top" ? "sticky" : "absolute",
                    pointerEvents: "none",
                    ...(position === "top" && { top: 0 }),
                    ...(position === "bottom" && { bottom: 0 }),
                    ...(position === "left" && { left: 0 }),
                    ...(position === "right" && { right: 0 }),
                    ...(isVertical && { width: "100%", height: dimension }),
                    ...(!isVertical && { height: "100%", width: dimension }),
                    zIndex: 1,
                }}
            >
                {generateBlurLayers()}
            </div>
        </div>
    );
};

export default GradualBlur;
