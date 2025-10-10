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
    className?: string;
    children?: React.ReactNode;
}

const GradualBlur: React.FC<GradualBlurProps> = ({ target = "parent", position = "bottom", height = "4rem", width = "100%", strength = 1, divCount = 5, curve = "ease-out", exponential = false, opacity = 1, className = "", children }) => {
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
        const layers = [];
        for (let i = 0; i < divCount; i++) {
            const progress = (i + 1) / divCount;
            const curvedProgress = exponential ? Math.pow(curveFunction(progress), 2) : curveFunction(progress);
            const blurValue = curvedProgress * strength * 10;
            const opacityValue = curvedProgress * opacity;

            const layerStyle: CSSProperties = {
                position: "absolute",
                pointerEvents: "none",
                backdropFilter: `blur(${blurValue}px)`,
                WebkitBackdropFilter: `blur(${blurValue}px)`,
                opacity: opacityValue,
                zIndex: divCount - i,
            };

            if (isVertical) {
                layerStyle.width = "100%";
                layerStyle.height = `calc(${dimension} / ${divCount})`;
                if (position === "bottom") {
                    layerStyle.bottom = `calc(${dimension} / ${divCount} * ${divCount - i - 1})`;
                } else {
                    layerStyle.top = `calc(${dimension} / ${divCount} * ${divCount - i - 1})`;
                }
            } else {
                layerStyle.height = "100%";
                layerStyle.width = `calc(${dimension} / ${divCount})`;
                if (position === "right") {
                    layerStyle.right = `calc(${dimension} / ${divCount} * ${divCount - i - 1})`;
                } else {
                    layerStyle.left = `calc(${dimension} / ${divCount} * ${divCount - i - 1})`;
                }
            }

            layers.push(<div key={i} style={layerStyle} className="gradual-blur-layer" />);
        }
        return layers;
    };

    if (target === "parent") {
        return (
            <div
                className={`gradual-blur-container ${className}`}
                style={{
                    position: "absolute",
                    pointerEvents: "none",
                    ...(position === "top" && { top: 0 }),
                    ...(position === "bottom" && { bottom: 0 }),
                    ...(position === "left" && { left: 0 }),
                    ...(position === "right" && { right: 0 }),
                    ...(isVertical && { width: "100%", height: dimension }),
                    ...(!isVertical && { height: "100%", width: dimension }),
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
                    position: "absolute",
                    pointerEvents: "none",
                    ...(position === "top" && { top: 0 }),
                    ...(position === "bottom" && { bottom: 0 }),
                    ...(position === "left" && { left: 0 }),
                    ...(position === "right" && { right: 0 }),
                    ...(isVertical && { width: "100%", height: dimension }),
                    ...(!isVertical && { height: "100%", width: dimension }),
                }}
            >
                {generateBlurLayers()}
            </div>
        </div>
    );
};

export default GradualBlur;
