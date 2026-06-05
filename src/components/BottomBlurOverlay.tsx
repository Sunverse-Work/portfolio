"use client";

export default function BottomBlurOverlay() {
  const layers = [
    { blur: 0.25, mask: "0% 12.5% 25% 37.5%" },
    { blur: 0.5,  mask: "12.5% 25% 37.5% 50%" },
    { blur: 1,    mask: "25% 37.5% 50% 62.5%" },
    { blur: 2,    mask: "37.5% 50% 62.5% 75%" },
    { blur: 4,    mask: "50% 62.5% 75% 87.5%" },
    { blur: 8,    mask: "62.5% 75% 87.5% 100%" },
    { blur: 16,   mask: "75% 87.5% 100% 100%" },
    { blur: 32,   mask: "87.5% 100% 100% 100%" },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 200,
        zIndex: 40,
        pointerEvents: "none",
      }}
    >
      {layers.map((l, i) => {
        const [a, b, c, d] = l.mask.split(" ");
        const gradient = `linear-gradient(to bottom, rgba(0,0,0,0) ${a}, rgb(0,0,0) ${b}, rgb(0,0,0) ${c}, rgba(0,0,0,0) ${d})`;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: i + 1,
              backdropFilter: `blur(${l.blur}px)`,
              WebkitBackdropFilter: `blur(${l.blur}px)`,
              maskImage: gradient,
              WebkitMaskImage: gradient,
            }}
          />
        );
      })}
    </div>
  );
}
