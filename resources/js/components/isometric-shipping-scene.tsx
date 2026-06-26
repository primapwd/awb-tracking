import React, { useRef } from 'react';

export default function IsometricShippingScene({
    className = '',
}: {
    className?: string;
}) {
    const innerRef = useRef<HTMLDivElement>(null);

    function applyTilt(xAngle: number, yAngle: number) {
        const inner = innerRef.current;

        if (!inner) {
            return;
        }

        inner.style.transform = `rotateX(${xAngle}deg) rotateY(${yAngle}deg) scale3d(1.01, 1.01, 1.01)`;
    }

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const box = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - box.left - box.width / 2;
        const y = e.clientY - box.top - box.height / 2;

        // Soft tilt angles (max 5 degrees). Mutate the node directly so the
        // image layer does not re-render on every pointer move.
        applyTilt(-(y / (box.height / 2)) * 5, (x / (box.width / 2)) * 5);
    }

    function handleMouseLeave() {
        applyTilt(0, 0);
    }

    return (
        <div
            className={`relative flex items-center justify-center select-none ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
        >
            <div
                ref={innerRef}
                className="flex h-full w-full items-center justify-center"
                style={{
                    transform:
                        'rotateX(0deg) rotateY(0deg) scale3d(1.01, 1.01, 1.01)',
                    transformStyle: 'preserve-3d',
                    transition:
                        'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
            >
                {/* mix-blend-multiply blends the image's off-white background into
                    the white page so the art reads as if it has no backdrop. */}
                <img
                    src="/isometric.png"
                    alt="Isometric logistics network: port crane, cargo ship, container yard, freight train, delivery truck, and cargo plane"
                    className="h-full w-full object-contain mix-blend-multiply"
                    width={600}
                    height={600}
                    fetchPriority="high"
                    draggable={false}
                />
            </div>
        </div>
    );
}
