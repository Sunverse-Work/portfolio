"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Instant motion values for exact Windows-like tracking
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring for smooth size animations
    const size = useSpring(24, { stiffness: 400, damping: 25 });

    useEffect(() => {
        // Expand circle on hover
        size.set(isHovering ? 36 : 24);
    }, [isHovering, size]);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Detect clickable elements even with cursor:none globally
            const isClickable = !!target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
            setIsHovering(isClickable);
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (typeof window === "undefined") return null;

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full border flex items-center justify-center transition-colors duration-300"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
                width: size,
                height: size,
                opacity: isVisible ? 1 : 0,
                borderColor: isHovering ? "rgba(168, 85, 247, 0.8)" : "rgba(168, 85, 247, 0.4)",
                backgroundColor: isHovering ? "rgba(168, 85, 247, 0.1)" : "transparent",
                filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.8))",
                boxShadow: isHovering ? "0 0 10px rgba(168, 85, 247, 0.2)" : "none",
            }}
        >
            {/* Tiny center dot for precise pointing, disappears on hover */}
            <motion.div 
                className="w-1 h-1 rounded-full bg-purple-400"
                animate={{ scale: isHovering ? 0 : 1, opacity: isHovering ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            />
        </motion.div>
    );
}
