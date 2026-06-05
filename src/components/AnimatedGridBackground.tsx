"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedGridBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
            {/* Subtle perspective grid */}
            <motion.div
                className="absolute inset-[0%] w-full h-full opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                    transformOrigin: "top center",
                }}
                animate={{
                    x: (mousePosition.x - (typeof window !== "undefined" ? window.innerWidth : 0) / 2) * -0.02,
                    y: (mousePosition.y - (typeof window !== "undefined" ? window.innerHeight : 0) / 2) * -0.02,
                }}
                transition={{ type: "tween", ease: "linear", duration: 0.2 }}
            />

            {/* Radial overlay to make edges blend to black */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-100" />

        </div>
    );
}
