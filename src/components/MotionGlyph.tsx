type MotionGlyphVariant = "loop" | "bars" | "tree" | "target" | "formula" | "check";
type MotionGlyphAccent = "cyan" | "orange" | "blue" | "violet" | "lime";

const accentClass: Record<MotionGlyphAccent, string> = {
  cyan: "text-cyan",
  orange: "text-orange",
  blue: "text-blue",
  violet: "text-violet",
  lime: "text-lime",
};

export function MotionGlyph({
  label,
  variant = "loop",
  accent = "cyan",
  className = "",
}: {
  label: string;
  variant?: MotionGlyphVariant;
  accent?: MotionGlyphAccent;
  className?: string;
}) {
  return (
    <span className={`motion-glyph ${accentClass[accent]} ${className}`} aria-label={`${label} animated micro-visual`} role="img">
      <svg viewBox="0 0 72 44" aria-hidden="true">
        <rect className="motion-glyph-bg" x="3" y="3" width="66" height="38" rx="13" />
        {variant === "bars" ? <Bars /> : null}
        {variant === "tree" ? <Tree /> : null}
        {variant === "target" ? <Target /> : null}
        {variant === "formula" ? <Formula /> : null}
        {variant === "check" ? <Check /> : null}
        {variant === "loop" ? <Loop /> : null}
      </svg>
    </span>
  );
}

function Loop() {
  return (
    <>
      <path className="motion-glyph-path" d="M18 24 C18 12 32 10 38 17 C46 26 56 20 55 12" />
      <circle className="motion-glyph-dot motion-glyph-dot-a" cx="18" cy="24" r="3.2" />
      <circle className="motion-glyph-dot motion-glyph-dot-b" cx="38" cy="17" r="3.2" />
      <circle className="motion-glyph-dot motion-glyph-dot-c" cx="55" cy="12" r="3.2" />
    </>
  );
}

function Bars() {
  return (
    <>
      {[0, 1, 2, 3].map((index) => <rect key={index} className="motion-glyph-bar" x={18 + index * 10} y={24 - index * 3} width="6" height={9 + index * 5} rx="3" />)}
      <path className="motion-glyph-path" d="M15 31 C26 29 36 23 50 12" />
    </>
  );
}

function Tree() {
  return (
    <>
      <path className="motion-glyph-path" d="M18 27 C27 14 35 14 43 22 C49 27 55 25 59 18" />
      <path className="motion-glyph-branch" d="M36 20 C41 13 46 11 53 10" />
      <path className="motion-glyph-branch" d="M36 20 C44 30 51 33 59 32" />
      <circle className="motion-glyph-dot motion-glyph-dot-a" cx="18" cy="27" r="3.2" />
      <circle className="motion-glyph-dot motion-glyph-dot-b" cx="43" cy="22" r="3.2" />
      <circle className="motion-glyph-dot motion-glyph-dot-c" cx="59" cy="18" r="3.2" />
    </>
  );
}

function Target() {
  return (
    <>
      <circle className="motion-glyph-ring" cx="36" cy="22" r="13" />
      <circle className="motion-glyph-ring motion-glyph-ring-b" cx="36" cy="22" r="7" />
      <path className="motion-glyph-path" d="M16 34 L56 10" />
      <circle className="motion-glyph-dot motion-glyph-dot-b" cx="36" cy="22" r="3.5" />
    </>
  );
}

function Formula() {
  return (
    <>
      <path className="motion-glyph-path" d="M15 27 L25 17 L34 27 L46 15 L57 27" />
      <circle className="motion-glyph-dot motion-glyph-dot-a" cx="25" cy="17" r="3.2" />
      <circle className="motion-glyph-dot motion-glyph-dot-b" cx="46" cy="15" r="3.2" />
      <path className="motion-glyph-branch" d="M17 34 H55" />
    </>
  );
}

function Check() {
  return (
    <>
      <path className="motion-glyph-path" d="M18 24 L29 33 L54 12" />
      <circle className="motion-glyph-ring" cx="36" cy="22" r="14" />
      <circle className="motion-glyph-dot motion-glyph-dot-c" cx="54" cy="12" r="3.2" />
    </>
  );
}
