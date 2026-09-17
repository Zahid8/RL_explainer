import type { GlyphKind } from "@/lib/paper";

function bars(values: number[], color = "var(--cyan)") {
  return values.map((v, i) => (
    <rect key={i} x={70 + i * 42} y={150 - v * 90} width="24" height={v * 90} rx="5" fill={color} opacity={0.28 + v * 0.65} />
  ));
}

export function TermGlyph({ kind, accent = "cyan" }: { kind: GlyphKind; accent?: string }) {
  const c = `var(--${accent})`;
  const base = "var(--line)";
  return (
    <svg viewBox="0 0 320 200" className="w-full" role="img" aria-label={`${kind} glyph`}>
      <rect x="1" y="1" width="318" height="198" rx="18" fill="var(--panel-2)" opacity="0.6" />
      {kind === "policy" && (
        <g>
          <line x1="58" y1="150" x2="260" y2="150" stroke={base} />
          {bars([0.45, 0.72, 0.2, 0.58], c)}
          <text x="160" y="178" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">probabilities sum to 1</text>
        </g>
      )}
      {kind === "reward" && (
        <g>
          <circle cx="160" cy="92" r="42" fill={c} opacity="0.14" />
          <path d="M130 96 L153 119 L195 70" fill="none" stroke={c} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <text x="160" y="162" textAnchor="middle" className="mono" fontSize="12" fill="var(--dim)">one scalar feedback</text>
        </g>
      )}
      {kind === "value" && (
        <g>
          <path d="M48 146 C86 120 103 133 130 95 C156 58 190 80 230 42" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" />
          <circle cx="230" cy="42" r="8" fill={c} />
          <text x="78" y="168" className="mono" fontSize="11" fill="var(--dim)">long-run score</text>
        </g>
      )}
      {kind === "model" || kind === "transition" ? (
        <g fill="none" strokeWidth="3" strokeLinecap="round">
          <circle cx="82" cy="98" r="25" stroke={c} />
          <circle cx="238" cy="62" r="25" stroke="var(--blue)" />
          <circle cx="230" cy="142" r="25" stroke="var(--orange)" />
          <path d="M110 91 C145 72 172 60 207 61" stroke={c} />
          <path d="M109 108 C144 128 171 141 199 142" stroke={c} opacity="0.55" />
          <text x="160" y="35" className="mono" fontSize="11" fill="var(--dim)" textAnchor="middle">p(s&apos;, r | s, a)</text>
        </g>
      ) : null}
      {kind === "return" && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={62 + i * 42} y={70 + i * 8} width="26" height={70 - i * 9} rx="5" fill={c} opacity={0.82 - i * 0.1} />)}
          <path d="M53 160 H267" stroke={base} />
          <text x="160" y="38" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">future rewards added</text>
        </g>
      )}
      {kind === "discount" && (
        <g>{bars([1, 0.75, 0.55, 0.38, 0.25], c)}<text x="160" y="42" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">geometric shrink</text></g>
      )}
      {kind === "bellman" && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="52" y="62" width="76" height="76" rx="14" stroke={c} strokeWidth="3" />
          <rect x="192" y="38" width="76" height="52" rx="14" stroke="var(--blue)" strokeWidth="3" />
          <rect x="192" y="112" width="76" height="52" rx="14" stroke="var(--orange)" strokeWidth="3" />
          <path d="M132 88 H185" stroke={c} strokeWidth="4" />
          <path d="M132 112 H185" stroke={c} strokeWidth="4" opacity="0.55" />
          <text x="90" y="105" textAnchor="middle" className="mono" fontSize="13" fill="var(--ink)">now</text>
          <text x="230" y="69" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">reward</text>
          <text x="230" y="145" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">next V</text>
        </g>
      )}
      {kind === "epsilon" && (
        <g>
          {bars([0.78, 0.12, 0.12, 0.12], c)}
          <circle cx="237" cy="68" r="15" fill="var(--orange)" opacity="0.85" />
          <text x="237" y="73" textAnchor="middle" className="mono" fontSize="13" fill="#fff">?</text>
        </g>
      )}
      {kind === "ucb" && (
        <g>
          {[0.42, 0.55, 0.37, 0.7].map((v, i) => <rect key={i} x={64 + i * 48} y={150 - v * 85} width="24" height={v * 85} fill={c} opacity="0.55" rx="5" />)}
          {[0.3, 0.52, 0.7, 0.2].map((v, i) => <line key={i} x1={76 + i * 48} x2={76 + i * 48} y1={150 - (v + 0.28) * 85} y2={150 - v * 85} stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" />)}
          <text x="160" y="34" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">value + uncertainty</text>
        </g>
      )}
      {kind === "importance" && (
        <g>
          <rect x="84" y="58" width="152" height="28" rx="8" fill="var(--violet)" opacity="0.72" />
          <rect x="84" y="112" width="98" height="28" rx="8" fill={c} opacity="0.72" />
          <line x1="84" y1="100" x2="236" y2="100" stroke={base} />
          <text x="160" y="101" textAnchor="middle" className="mono" fontSize="13" fill="var(--dim)">÷</text>
        </g>
      )}
      {kind === "td" && (
        <g>
          <line x1="64" y1="126" x2="256" y2="126" stroke={base} strokeWidth="2" />
          <circle cx="110" cy="126" r="10" fill="var(--blue)" />
          <circle cx="220" cy="84" r="10" fill={c} />
          <path d="M121 123 C150 108 179 92 209 86" stroke="var(--orange)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <text x="160" y="163" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">prediction error</text>
        </g>
      )}
      {kind === "lambda" || kind === "trace" ? (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={68 + i * 36} cy="101" r={18 - i * 2.2} fill={c} opacity={0.85 - i * 0.1} />)}
          <text x="160" y="154" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">fading credit</text>
        </g>
      ) : null}
      {kind === "gradient" && (
        <g>
          <path d="M70 148 C110 115 128 78 170 102 C205 122 214 70 250 49" stroke={base} strokeWidth="2" fill="none" />
          <path d="M118 132 L202 72" stroke={c} strokeWidth="6" strokeLinecap="round" />
          <path d="M202 72 l-6 21 l22 -8 z" fill={c} />
          <text x="160" y="166" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">direction of change</text>
        </g>
      )}
      {kind === "weights" && (
        <g>{[0, 1, 2].map((i) => <g key={i}><circle cx={92 + i * 68} cy="76" r="16" fill={c} opacity="0.75" /><circle cx={92 + i * 68} cy="124" r="16" fill="var(--violet)" opacity="0.55" /><line x1={92 + i * 68} y1="92" x2={92 + i * 68} y2="108" stroke={base} /></g>)}<text x="160" y="166" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">adjustable knobs</text></g>
      )}
      {kind === "expectation" && (
        <g>
          {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => <circle key={i} cx={80 + (i%4)*38} cy={60 + Math.floor(i/4)*32} r="5" fill={c} opacity="0.22" />)}
          <circle cx="220" cy="104" r="12" fill={c} />
          <path d="M180 104 H204" stroke={base} strokeWidth="3" />
          <text x="220" y="146" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">mean</text>
        </g>
      )}
      {kind === "agent" && (
        <g>
          <circle cx="105" cy="100" r="32" fill={c} opacity="0.18" stroke={c} strokeWidth="3" />
          <rect x="190" y="67" width="60" height="66" rx="12" fill="var(--panel)" stroke="var(--line)" />
          <path d="M137 91 H183" stroke={c} strokeWidth="4" /><path d="M183 110 H137" stroke="var(--orange)" strokeWidth="4" />
          <text x="105" y="106" textAnchor="middle" className="mono" fontSize="12" fill="var(--ink)">agent</text>
          <text x="220" y="105" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">world</text>
        </g>
      )}
      {kind === "option" && (
        <g>
          <rect x="54" y="82" width="56" height="42" rx="10" fill={c} opacity="0.75" /><rect x="132" y="64" width="56" height="42" rx="10" fill="var(--violet)" opacity="0.65" /><rect x="210" y="82" width="56" height="42" rx="10" fill="var(--orange)" opacity="0.7" />
          <path d="M111 102 H130 M189 86 H208" stroke="var(--line)" strokeWidth="4" />
          <text x="160" y="153" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">start · skill · stop</text>
        </g>
      )}
      {kind === "average" && (
        <g>
          <path d="M54 120 C78 84 103 148 128 112 S179 94 203 122 S241 94 267 112" fill="none" stroke={c} strokeWidth="4" />
          <line x1="54" y1="112" x2="267" y2="112" stroke="var(--orange)" strokeWidth="3" strokeDasharray="6 8" />
          <text x="160" y="158" textAnchor="middle" className="mono" fontSize="11" fill="var(--dim)">long-run rate</text>
        </g>
      )}
    </svg>
  );
}
