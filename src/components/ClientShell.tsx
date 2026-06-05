"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const AnimatedGridBackground = dynamic(() => import("@/components/AnimatedGridBackground"), { ssr: false });
const BottomBlurOverlay = dynamic(() => import("@/components/BottomBlurOverlay"), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AnimatedGridBackground />
            <CustomCursor />
            {children}
            <BottomBlurOverlay />
        </>
    );
}
