import { useRef, useState } from 'react';

interface TiltedCardProps {
  imageSrc: React.ComponentProps<'img'>['src'];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

const springValues = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLElement>(null);
  const scaleRef = useRef<number>(1);
  const stateRef = useRef({ rotateX: 0, rotateY: 0, opacity: 0, x: 0, y: 0, rotateCap: 0 });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    stateRef.current.rotateX = rotationX;
    stateRef.current.rotateY = rotationY;

    stateRef.current.x = e.clientX - rect.left;
    stateRef.current.y = e.clientY - rect.top;

    const velocityY = offsetY - lastY;
    stateRef.current.rotateCap = -velocityY * 0.6;
    setLastY(offsetY);

    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(${stateRef.current.rotateX}deg) rotateY(${stateRef.current.rotateY}deg) scale(${scaleRef.current})`;
    }
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `translate(${stateRef.current.x}px, ${stateRef.current.y}px) rotate(${stateRef.current.rotateCap}deg)`;
    }
  }

  function handleMouseEnter() {
    scaleRef.current = scaleOnHover;
    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(${stateRef.current.rotateX}deg) rotateY(${stateRef.current.rotateY}deg) scale(${scaleRef.current})`;
    }
    if (tooltipRef.current) tooltipRef.current.style.opacity = '1';
  }

  function handleMouseLeave() {
    if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
    scaleRef.current = 1;
    stateRef.current.rotateX = 0;
    stateRef.current.rotateY = 0;
    stateRef.current.rotateCap = 0;
    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    }
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <div
        ref={cardRef}
        className="relative [transform-style:preserve-3d] will-change-transform"
        style={{
          width: imageWidth,
          height: imageHeight,
          transform: 'rotateX(0deg) rotateY(0deg) scale(1)'
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-[15px] [transform:translateZ(0)] will-change-transform"
          style={{
            width: imageWidth,
            height: imageHeight
          }}
        />

        {displayOverlayContent && overlayContent && (
          <div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </div>
        )}
      </div>

      {showTooltip && (
        <figcaption
          ref={tooltipRef as any}
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block will-change-transform"
          style={{
            opacity: 0,
            transform: 'translate(0px, 0px) rotate(0deg)'
          }}
        >
          {captionText}
        </figcaption>
      )}
    </figure>
  );
}
