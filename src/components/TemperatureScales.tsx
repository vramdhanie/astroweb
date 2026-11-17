'use client';

import { useState } from 'react';

// Aligned K / °C / °F scales over 0–36 °C, built to answer one question
// fast: when someone says "it's in the 80s", what does that feel like in
// Celsius? The °F side carries shaded decade bands ("60s", "70s", …) so a
// spoken decade reads straight across to the °C scale and the comfort band.

const C_MIN = 0;
const C_MAX = 36;

// Layout (SVG user units)
const W = 420;
const TOP = 26;
const PLOT_H = 620;
const BOTTOM = TOP + PLOT_H;
const BAND_X = 150; // comfort band
const BAND_W = 92;
const K_X = 96; // kelvin tick column (right-aligned labels)
const C_X = 140; // celsius ticks, left of band
const F_X = 252; // fahrenheit ticks, right of band
const DECADE_X = 310; // °F decade shading column
const DECADE_W = 86;

const y = (c: number) => TOP + ((C_MAX - c) / (C_MAX - C_MIN)) * PLOT_H;
const fToC = (f: number) => ((f - 32) * 5) / 9;
const cToF = (c: number) => (c * 9) / 5 + 32;
const cToK = (c: number) => c + 273.15;

const COMFORT = [
  { from: 0, to: 10, label: 'cold', color: '#3b82f6' },
  { from: 10, to: 18, label: 'cool', color: '#14b8a6' },
  { from: 18, to: 24, label: 'mild', color: '#22c55e' },
  { from: 24, to: 30, label: 'warm', color: '#f59e0b' },
  { from: 30, to: 36, label: 'hot', color: '#ef4444' },
];

const comfortAt = (c: number) =>
  c <= 0 ? 'freezing' : (COMFORT.find((b) => c < b.to) ?? COMFORT[COMFORT.length - 1]).label;

const DECADES = [40, 50, 60, 70, 80, 90];

export default function TemperatureScales() {
  const [cursor, setCursor] = useState<number | null>(null);

  const muted = 'var(--muted-foreground)';
  const fg = 'var(--foreground)';
  const border = 'var(--border)';

  const track = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const yy = ((e.clientY - rect.top) / rect.height) * (BOTTOM + 40);
    const c = C_MAX - ((yy - TOP) / PLOT_H) * (C_MAX - C_MIN);
    setCursor(Math.max(C_MIN, Math.min(C_MAX, c)));
  };

  const readout = cursor == null ? null : {
    c: cursor.toFixed(1),
    f: cToF(cursor).toFixed(1),
    k: cToK(cursor).toFixed(1),
    word: comfortAt(cursor),
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Readout / standing hint */}
      <p className="mb-2 h-6 text-center text-sm" style={{ color: muted }} aria-live="polite">
        {readout ? (
          <>
            <b style={{ color: fg }}>{readout.c} °C</b> = {readout.f} °F = {readout.k} K ·{' '}
            {readout.word}
          </>
        ) : (
          <>&ldquo;in the 80s&rdquo; °F ≈ 27–32 °C — warm to hot</>
        )}
      </p>

      <svg
        viewBox={`0 0 ${W} ${BOTTOM + 40}`}
        className="w-full touch-none select-none"
        onPointerMove={track}
        onPointerDown={track}
        onPointerLeave={() => setCursor(null)}
        role="img"
        aria-label="Aligned Kelvin, Celsius and Fahrenheit scales from 0 to 36 degrees Celsius with comfort bands"
      >
        {/* Column headers */}
        <text x={K_X} y={TOP - 10} textAnchor="end" fontSize="13" fontWeight="600" fill={fg}>K</text>
        <text x={C_X - 8} y={TOP - 10} textAnchor="end" fontSize="13" fontWeight="600" fill={fg}>°C</text>
        <text x={F_X + 8} y={TOP - 10} textAnchor="start" fontSize="13" fontWeight="600" fill={fg}>°F</text>
        <text x={DECADE_X + DECADE_W / 2} y={TOP - 10} textAnchor="middle" fontSize="11" fill={muted}>
          spoken °F
        </text>

        {/* Comfort bands */}
        {COMFORT.map((b) => (
          <g key={b.label}>
            <rect
              x={BAND_X}
              y={y(b.to)}
              width={BAND_W}
              height={y(b.from) - y(b.to)}
              fill={b.color}
              opacity={0.9}
            />
            <text
              x={BAND_X + BAND_W / 2}
              y={(y(b.from) + y(b.to)) / 2 + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="#fff"
              style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              {b.label}
            </text>
          </g>
        ))}
        <rect x={BAND_X} y={TOP} width={BAND_W} height={PLOT_H} fill="none" stroke={border} rx="4" />

        {/* Celsius ticks: minor every 1, labelled every 5 */}
        {Array.from({ length: C_MAX + 1 }, (_, c) => (
          <g key={`c${c}`}>
            <line
              x1={c % 5 === 0 ? C_X - 14 : C_X - 7}
              x2={C_X}
              y1={y(c)}
              y2={y(c)}
              stroke={c % 5 === 0 ? fg : border}
              strokeWidth={c % 5 === 0 ? 1.5 : 1}
            />
            {c % 5 === 0 && (
              <text x={C_X - 18} y={y(c) + 4} textAnchor="end" fontSize="12" fill={fg}>
                {c}
              </text>
            )}
          </g>
        ))}

        {/* Kelvin: labelled every 5 K */}
        {[275, 280, 285, 290, 295, 300, 305].map((k) => (
          <g key={`k${k}`}>
            <line x1={K_X - 10} x2={K_X} y1={y(k - 273.15)} y2={y(k - 273.15)} stroke={muted} strokeWidth={1} />
            <text x={K_X - 14} y={y(k - 273.15) + 4} textAnchor="end" fontSize="11" fill={muted}>
              {k}
            </text>
          </g>
        ))}

        {/* Fahrenheit ticks: minor every 2 °F, labelled every 10 (and 32) */}
        {Array.from({ length: 33 }, (_, i) => 32 + i * 2).map((f) => {
          const c = fToC(f);
          if (c > C_MAX) return null;
          const major = f % 10 === 0 || f === 32;
          return (
            <g key={`f${f}`}>
              <line
                x1={F_X}
                x2={major ? F_X + 14 : F_X + 7}
                y1={y(c)}
                y2={y(c)}
                stroke={major ? fg : border}
                strokeWidth={major ? 1.5 : 1}
              />
              {major && (
                <text x={F_X + 18} y={y(c) + 4} textAnchor="start" fontSize="12" fill={fg}>
                  {f}
                </text>
              )}
            </g>
          );
        })}

        {/* °F decade bands — the "temp in the 80s" answer */}
        {DECADES.map((d, i) => {
          const from = Math.max(fToC(d), C_MIN);
          const to = Math.min(fToC(d + 10), C_MAX);
          if (to <= from) return null;
          return (
            <g key={`d${d}`}>
              <rect
                x={DECADE_X}
                y={y(to)}
                width={DECADE_W}
                height={y(from) - y(to)}
                fill={fg}
                opacity={i % 2 === 0 ? 0.1 : 0.04}
              />
              <text
                x={DECADE_X + DECADE_W / 2}
                y={(y(from) + y(to)) / 2 + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={fg}
              >
                {d}s
              </text>
            </g>
          );
        })}

        {/* Reference lines */}
        {[
          { c: 0, label: 'water freezes · 32 °F' },
          { c: 21, label: 'room · 70 °F' },
        ].map((r) => (
          <g key={r.label}>
            <line x1={BAND_X - 4} x2={DECADE_X + DECADE_W} y1={y(r.c)} y2={y(r.c)} stroke={fg} strokeWidth={1} strokeDasharray="4 4" opacity={0.55} />
            <text x={DECADE_X + DECADE_W} y={y(r.c) - 5} textAnchor="end" fontSize="10" fill={muted}>
              {r.label}
            </text>
          </g>
        ))}

        {/* Cursor crosshair */}
        {cursor != null && (
          <line
            x1={K_X - 10}
            x2={DECADE_X + DECADE_W}
            y1={y(cursor)}
            y2={y(cursor)}
            stroke={fg}
            strokeWidth={1.5}
            opacity={0.8}
          />
        )}
      </svg>

      {/* Full-range overview: 0 K to boiling, with the detail window marked */}
      <Overview />
    </div>
  );
}

function Overview() {
  const muted = 'var(--muted-foreground)';
  const fg = 'var(--foreground)';
  const MIN = -273.15;
  const MAX = 100;
  const OW = 420;
  const PAD = 14;
  const x = (c: number) => PAD + ((c - MIN) / (MAX - MIN)) * (OW - 2 * PAD);
  const marks = [
    { c: -273.15, top: '0 K', bottom: 'absolute zero', above: false },
    { c: -40, top: '−40', bottom: '°C = °F', above: true },
    { c: 0, top: '0 °C', bottom: '32 °F', above: false },
    { c: 37, top: '37 °C', bottom: 'body · 98.6 °F', above: true },
    { c: 100, top: '100 °C', bottom: 'boils · 212 °F', above: false },
  ];
  return (
    <svg viewBox={`0 0 ${OW} 108`} className="mt-6 w-full" role="img" aria-label="Overview from absolute zero to boiling water">
      <defs>
        <linearGradient id="tempspan" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="68%" stopColor="#3b82f6" />
          <stop offset="78%" stopColor="#22c55e" />
          <stop offset="84%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>
      <rect x={PAD} y={48} width={OW - 2 * PAD} height={16} rx={8} fill="url(#tempspan)" opacity={0.9} />
      {/* detail window 0–36 °C */}
      <rect x={x(0)} y={44} width={x(36) - x(0)} height={24} fill="none" stroke={fg} strokeWidth={1.5} rx={4} />
      <text x={x(18)} y={12} textAnchor="middle" fontSize="10" fill={muted}>
        scale above
      </text>
      <line x1={x(18)} x2={x(18)} y1={15} y2={42} stroke={muted} strokeWidth={1} strokeDasharray="2 3" />
      {marks.map((m) => {
        const anchor = m.c === MIN ? 'start' : m.c === MAX ? 'end' : 'middle';
        return (
          <g key={m.top}>
            {m.above ? (
              <>
                <line x1={x(m.c)} x2={x(m.c)} y1={38} y2={46} stroke={muted} strokeWidth={1} />
                <text x={x(m.c)} y={34} textAnchor={anchor} fontSize="10" fill={fg}>{m.top}</text>
                <text x={x(m.c)} y={23} textAnchor={anchor} fontSize="9" fill={muted}>{m.bottom}</text>
              </>
            ) : (
              <>
                <line x1={x(m.c)} x2={x(m.c)} y1={66} y2={74} stroke={muted} strokeWidth={1} />
                <text x={x(m.c)} y={88} textAnchor={anchor} fontSize="10" fill={fg}>{m.top}</text>
                <text x={x(m.c)} y={101} textAnchor={anchor} fontSize="9" fill={muted}>{m.bottom}</text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
