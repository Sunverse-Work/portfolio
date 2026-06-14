"use client";

import React from "react";
import buttonBg from "@/assets/button-gradient.jpg";

const WHATSAPP_NUMBER = "5571982905172";
const WHATSAPP_MESSAGE = encodeURIComponent("Olá! Vim pelo site da Sunverse e gostaria de saber mais sobre os serviços de vocês. Podemos conversar?");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

interface CtaButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function CtaButton({
  label = "QUERO ACESSAR O FURION AGORA",
  onClick,
  disabled = false,
}: CtaButtonProps) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "18px 32px",
        width: "100%",
        maxWidth: "420px",
        borderRadius: "100px",
        border: "1px solid rgba(160, 80, 255, 0.3)",
        backgroundImage: `url(${buttonBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -10px 20px -10px rgba(160, 80, 255, 0.3)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        overflow: "hidden",
        userSelect: "none",
        zIndex: 10,
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -30px 40px -10px rgba(160, 80, 255, 0.8)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -10px 20px -10px rgba(160, 80, 255, 0.3)";
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0px) scale(0.99)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px) scale(1)";
      }}
    >
      {/* Shimmer overlay */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)",
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />
      {/* Texto */}
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </a>
  );
}

