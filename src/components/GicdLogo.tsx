import React from "react";

interface GicdLogoProps {
  className?: string; // Custom container styling
  variant?: "full" | "icon" | "inline"; // kept for prop backward compatibility
  theme?: "dark" | "light" | "auto"; // dark theme (for dark background), light (for white background), auto (uses currentColor)
  height?: number | string; // Height of the fish icon SVG
  showSubText?: boolean; // kept for prop backward compatibility
}

export const GicdLogo: React.FC<GicdLogoProps> = ({
  className = "",
  variant = "full",
  theme = "auto",
  height,
  showSubText = false,
}) => {
  // Map theme values to outline/text colors
  const outlineColor = 
    theme === "dark" 
      ? "#FFFFFF" 
      : theme === "light" 
      ? "#111111" 
      : "currentColor";

  const fishYellow = "#F5C518";

  // Vertical stacked layout: fish on top, GICD text below it. No subtext.
  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Fish Icon */}
      <svg
        viewBox="0 0 120 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        style={{ height: height || "28px", width: "auto" }}
      >
        {/* Black/White Outline (Stroke Sandwich) */}
        <g stroke={outlineColor} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 16,32 C 40,4 80,4 104,56" />
          <path d="M 16,32 C 40,60 80,60 104,8" />
        </g>
        {/* Yellow Fill Inner Band */}
        <g stroke={fishYellow} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 16,32 C 40,4 80,4 104,56" />
          <path d="M 16,32 C 40,60 80,60 104,8" />
        </g>
      </svg>

      {/* GICD Text below logo */}
      <span 
        className="font-sans font-black tracking-[0.08em] uppercase leading-none mt-1"
        style={{ 
          color: outlineColor === "currentColor" ? "inherit" : outlineColor,
          fontSize: "12px"
        }}
      >
        GICD
      </span>
    </div>
  );
};

