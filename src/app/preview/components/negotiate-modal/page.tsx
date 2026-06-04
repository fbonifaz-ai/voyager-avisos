"use client";

/**
 * NegotiateModal — preview de variantes
 * Modal de propuesta de compra — flujo "Negociar" desde logged in.
 * Tamaño canónico: 320 × 310 px
 *
 * Mapeo de close variants — 1:1 con ActionGate:
 *   AG-B (header inline)  →  NM-I
 *   AG-C (handle + hint)  →  NM-II
 *   AG-D (ghost link)     →  NM-III
 *   AG-E (split footer)   →  NM-IV
 *   AG-F (gradient ring)  →  NM-V
 *
 * AG-A (corner overlay) no aplica — el close SIEMPRE está adherido al card.
 */

import type { JSX } from "react";

const CSS = `
  /* ── Animación gradiente — mismo @property que pvbtn ── */
  @property --nm-angle  { syntax: '<angle>';  inherits: false; initial-value: 135deg; }
  @property --nm-stop-a { syntax: '<color>';  inherits: false; initial-value: oklch(0.65 0.18 195); }
  @property --nm-stop-b { syntax: '<color>';  inherits: false; initial-value: oklch(0.55 0.22 285); }

  /* ── Base card ── */
  .nm-card {
    width: 320px;
    min-height: 310px;
    border-radius: var(--vmc-radius-lg);
    background: var(--vmc-color-base-white);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px 24px 24px;
    box-sizing: border-box;
    position: relative;
  }

  /* ── Badge "Propuesta X/5" ── */
  .nm-badge-wrap {
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  .nm-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 32px;
    padding: 0 14px 0 10px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    box-shadow: 0 2px 8px rgb(92.94% 53.73% 21.18% / 0.35);
    font-family: var(--vmc-font-display);
    font-size: 12px;
    font-weight: 700;
    color: var(--vmc-color-base-white);
    white-space: nowrap;
    letter-spacing: 0.2px;
  }
  .nm-dots { display: flex; gap: 3px; align-items: center; }
  .nm-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgb(100% 100% 100% / 0.35);
  }
  .nm-dot.used { background: var(--vmc-color-base-white); }

  /* ── Título y subtítulo ── */
  .nm-title {
    font-family: var(--vmc-font-display);
    font-size: 16px;
    font-weight: 700;
    line-height: 1.35;
    text-align: center;
    color: var(--vmc-color-status-negotiable);
    margin: 20px 0 4px;
  }
  .nm-subtitle {
    font-family: var(--vmc-font-display);
    font-size: 13px;
    font-weight: 400;
    color: var(--vmc-color-vault-700);
    text-align: center;
    margin: 0 0 20px;
    line-height: 1.5;
  }

  /* ── Campo de monto ── */
  .nm-input-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    width: 100%;
    border-bottom: 2px solid var(--vmc-color-status-negotiable);
    padding-bottom: 6px;
    margin-bottom: 24px;
  }
  .nm-currency {
    font-family: var(--vmc-font-display);
    font-size: 20px;
    font-weight: 700;
    color: var(--vmc-color-vault-700);
    flex-shrink: 0;
  }
  .nm-amount {
    font-family: 'Roboto Mono', monospace;
    font-size: 28px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--vmc-color-neutral-400);
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    min-width: 0;
    letter-spacing: -0.5px;
  }
  .nm-amount::placeholder { color: var(--vmc-color-neutral-400); }

  /* ── Botón "Proponer" — idéntico a pvbtn-neg ── */
  .nm-cta {
    --nm-stop-a: oklch(0.65 0.18 195);
    --nm-stop-b: var(--vmc-color-vault-500);
    width: 100%;
    height: 48px;
    border-radius: var(--vmc-radius-full);
    border: 2.5px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: var(--vmc-font-display);
    font-size: 15px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.25);
    background-image:
      linear-gradient(var(--nm-angle), var(--nm-stop-a) 0%, var(--nm-stop-a) 40%, var(--nm-stop-b) 100%),
      linear-gradient(135deg,
        oklch(1 0 0)          0%,
        oklch(0.82 0.12 195)  25%,
        oklch(0.52 0.22 285)  75%,
        oklch(1 0 0)          100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.28),
      0 2px 6px oklch(0.65 0.18 195 / 0.35);
    transition:
      --nm-angle  0.4s  cubic-bezier(0.25, 0.8, 0.25, 1),
      --nm-stop-a 0.35s ease,
      --nm-stop-b 0.35s ease,
      transform   0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow  0.25s ease;
    transform: translateZ(0);
    flex-shrink: 0;
  }
  .nm-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.17) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .nm-cta::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, oklch(0.65 0.18 195), var(--vmc-color-vault-500));
    filter: blur(14px);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .nm-cta:hover {
    --nm-angle:  220deg;
    --nm-stop-a: oklch(0.76 0.14 195);
    --nm-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-1px) scale(1.01);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px oklch(0.52 0.22 285 / 0.35),
      0 4px 10px oklch(0.65 0.18 195 / 0.40);
  }
  .nm-cta:hover::after { opacity: 0.45; filter: blur(18px); }
  .nm-cta:active {
    --nm-stop-a: oklch(0.55 0.20 195);
    --nm-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.22), 0 1px 3px rgb(0% 0% 0% / 0.12);
  }
  .nm-cta:active::after { opacity: 0; }
  .nm-cta:focus-visible {
    outline: 3px solid transparent;
    outline-offset: 4px;
    transform: scale(0.98);
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px oklch(0.65 0.18 195),
      0 8px 16px -4px oklch(0.65 0.18 195 / 0.30);
  }

  /* ── Ghost button (split footer) ── */
  .nm-ghost-btn {
    flex: 1;
    height: 48px;
    border-radius: var(--vmc-radius-full);
    border: 1.5px solid var(--vmc-color-vault-500);
    background: transparent;
    cursor: pointer;
    font-family: var(--vmc-font-display);
    font-size: 15px;
    font-weight: 600;
    color: var(--vmc-color-vault-600);
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }
  .nm-ghost-btn:hover { background: var(--vmc-color-vault-100); }

  /* ─────────────────────────────────────────────────
     CLOSE VARIANTS — alineadas con ActionGate
  ───────────────────────────────────────────────── */

  /* NM-I ↔ AG-B · Header inline X (neutral circle) */
  .nm-x-inline {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--vmc-color-neutral-200);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--vmc-color-neutral-800);
    transition: background 0.15s, color 0.15s;
  }
  .nm-x-inline:hover { background: var(--vmc-color-vault-100); color: var(--vmc-color-vault-600); }

  /* NM-II ↔ AG-C · Handle + hint */
  .nm-handle {
    width: 36px;
    height: 4px;
    border-radius: 9999px;
    background: var(--vmc-color-neutral-400);
    margin: 0 auto 16px;
    cursor: grab;
    flex-shrink: 0;
    align-self: center;
  }
  .nm-close-hint {
    font-family: var(--vmc-font-display);
    font-size: 11px;
    font-weight: 500;
    color: var(--vmc-color-neutral-600);
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* NM-III ↔ AG-D · Ghost link "Cerrar" */
  .nm-close-link {
    font-family: var(--vmc-font-display);
    font-size: 13px;
    font-weight: 500;
    color: var(--vmc-color-status-negotiable);
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: var(--vmc-radius-sm);
    margin-top: 10px;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: rgb(0% 79.22% 80.78% / 0.35);
    transition: color 0.15s, text-decoration-color 0.15s;
  }
  .nm-close-link:hover { color: var(--vmc-color-cyan-800); text-decoration-color: var(--vmc-color-cyan-700); }

  /* NM-IV ↔ AG-E · Split footer */
  .nm-split {
    display: flex;
    gap: 10px;
    width: 100%;
  }
  .nm-split .nm-cta { flex: 1; width: auto; }

  /* NM-V ↔ AG-F · X con gradient ring */
  .nm-x-gradient {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid transparent;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--vmc-color-vault-600);
    box-shadow: 0 1px 6px rgb(51.76% 37.65% 89.8% / 0.18);
    transition: box-shadow 0.2s ease, transform 0.15s ease;
  }
  .nm-x-gradient:hover { box-shadow: 0 3px 12px rgb(51.76% 37.65% 89.8% / 0.30); transform: scale(1.08); }

  /* ── Stroke variants ── */
  .nm--clean    { box-shadow: var(--vmc-shadow-md); }
  .nm--vault    { border: 1.5px solid var(--vmc-color-vault-500); box-shadow: var(--vmc-shadow-sm); }
  .nm--gradient {
    border: 2px solid transparent;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: var(--vmc-shadow-sm);
  }
  .nm--cyan {
    border: 2px solid var(--vmc-color-status-negotiable);
    box-shadow: 0 4px 16px rgb(0% 79.22% 80.78% / 0.18);
  }
  .nm--accent {
    border-top: 2px solid transparent;
    border-left: none; border-right: none;
    border-bottom: 3px solid var(--vmc-color-status-negotiable);
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(90deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: var(--vmc-shadow-sm), 0 3px 10px rgb(0% 79.22% 80.78% / 0.15);
  }

  /* ── Layout ── */
  .nm-root {
    min-height: 100vh;
    background: var(--vmc-color-neutral-200);
    padding: 48px 32px 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nm-eyebrow {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 700;
    letter-spacing: 1.8px; text-transform: uppercase;
    color: var(--vmc-color-neutral-700); margin-bottom: 6px;
  }
  .nm-page-title {
    font-family: var(--vmc-font-display);
    font-size: 24px; font-weight: 700;
    color: var(--vmc-color-neutral-1100); margin-bottom: 6px;
  }
  .nm-page-sub {
    font-family: var(--vmc-font-display);
    font-size: 13px; color: var(--vmc-color-neutral-700);
    margin-bottom: 56px; text-align: center;
    max-width: 520px; line-height: 1.6;
  }
  .nm-section-label {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800);
    margin-bottom: 40px; align-self: flex-start;
    padding-left: 20px; display: flex; align-items: center; gap: 12px;
  }
  .nm-section-label::after {
    content: ''; height: 1px; width: 200px;
    background: var(--vmc-color-neutral-400); display: inline-block;
  }
  .nm-grid {
    display: grid;
    grid-template-columns: repeat(3, 380px);
    gap: 56px 32px;
    justify-items: center;
    align-items: start;
    margin-bottom: 72px;
  }
  @media (max-width: 1200px) { .nm-grid { grid-template-columns: repeat(2, 380px); } }
  @media (max-width: 800px)  { .nm-grid { grid-template-columns: 1fr; } }

  .nm-slot { display: flex; flex-direction: column; align-items: center; }
  .nm-slot-wrap { position: relative; padding: 24px 16px 12px; }
  .nm-variant-label {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 700;
    letter-spacing: 1.2px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800);
    margin-top: 8px; text-align: center;
  }
  .nm-variant-desc {
    font-family: var(--vmc-font-display);
    font-size: 12px; color: var(--vmc-color-neutral-600);
    text-align: center; max-width: 320px;
    line-height: 1.6; margin-top: 4px;
  }
  .nm-variant-note {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 600;
    color: var(--vmc-color-vault-600);
    margin-top: 4px; text-align: center;
  }
  .nm-ag-ref {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 500;
    color: var(--vmc-color-neutral-600);
    margin-top: 3px; text-align: center;
    letter-spacing: 0.5px;
  }
`;

/* ── Iconos ── */
function IconX({ size = 10 }: { size?: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}
function IconTap(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
      <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
function IconBid(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M2 11L5 8M7 2L11 6L7 10L3 6L7 2Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Badge ── */
function Badge({ current = 0, total = 5 }: { current?: number; total?: number }): JSX.Element {
  return (
    <div className="nm-badge-wrap">
      <div className="nm-badge">
        <IconBid />
        Propuesta: {current}/{total}
        <span className="nm-dots" aria-hidden>
          {Array.from({ length: total }).map(function renderDot(_, i) {
            return <span key={i} className={i < current ? "nm-dot used" : "nm-dot"} />;
          })}
        </span>
      </div>
    </div>
  );
}

/* ── Contenido interior del card ── */
interface InnerProps {
  footerSlot: JSX.Element;
  prependSlot?: JSX.Element;
}
function CardInner({ footerSlot, prependSlot }: InnerProps): JSX.Element {
  return (
    <>
      {prependSlot}
      <p className="nm-title">
        Consignación<br />
        &gt;S&lt; 60 ó US$ 180
      </p>
      <p className="nm-subtitle">Digita el monto que quieres proponer</p>
      <div className="nm-input-row">
        <span className="nm-currency">US$</span>
        <input
          className="nm-amount"
          type="text"
          inputMode="numeric"
          placeholder="00,000"
          aria-label="Monto de propuesta"
        />
      </div>
      {footerSlot}
    </>
  );
}

/* ── Stroke variants — Sección 1 ── */
const STROKE_VARIANTS = [
  { cls: "nm--clean",    label: "A · Clean shadow",    desc: "Solo shadow-md. Sin borde. El overlay delimita el modal.",                note: "Máxima ligereza visual" },
  { cls: "nm--vault",   label: "B · Vault stroke",     desc: "Borde sólido vault-500 1.5px. Lenguaje ghost/secondary del DS.",         note: "Sobrio · coherente" },
  { cls: "nm--gradient",label: "C · Gradient border",  desc: "Borde 2px naranja→vault. Doble bg-clip. Mismo patrón que pvbtn.",        note: "↑ Recomendado · consistente con ActionGate" },
  { cls: "nm--cyan",    label: "D · Cyan / negotiable", desc: "Borde 2px cyan-600 + glow. Identidad visual del flujo negociable.",     note: "↑ Contexto de flujo más claro" },
  { cls: "nm--accent",  label: "E · Dual accent",      desc: "Top naranja→vault + bottom cyan 3px. Une ambos lenguajes de color.",    note: "Bridge DS ↔ flujo negociable" },
];

/* ── Close variants — Sección 2 ── */
interface CloseVariant {
  label: string;
  desc: string;
  note: string;
  agRef: string;
  prependSlot?: JSX.Element;
  footerSlot: JSX.Element;
}

const CLOSE_VARIANTS: CloseVariant[] = [
  {
    label:   "I · Header inline X",
    desc:    "X círculo neutral 28px top-right dentro del card. Sin texto. Mismo patrón que ActionGate B.",
    note:    "Sin overflow · aria-label accesible",
    agRef:   "≡ ActionGate B",
    prependSlot: (
      <button type="button" className="nm-x-inline" aria-label="Cerrar">
        <IconX size={10} />
      </button>
    ),
    footerSlot: (
      <button type="button" className="nm-cta">Proponer</button>
    ),
  },
  {
    label:   "II · Handle + hint",
    desc:    "Barra de arrastre top-center + hint 'Toca afuera para cerrar'. Sin X. Mismo patrón que ActionGate C.",
    note:    "↑ Mobile-first · gesto natural",
    agRef:   "≡ ActionGate C",
    prependSlot: <div className="nm-handle" role="presentation" />,
    footerSlot: (
      <>
        <button type="button" className="nm-cta">Proponer</button>
        <span className="nm-close-hint"><IconTap />&nbsp;Toca afuera para cerrar</span>
      </>
    ),
  },
  {
    label:   "III · Ghost link 'Cerrar'",
    desc:    '"Cerrar" en cyan debajo del CTA. Jerarquía clara: acción arriba, escape abajo. Mismo patrón que ActionGate D.',
    note:    "↑ Patrón conocido · referencia screenshot",
    agRef:   "≡ ActionGate D",
    footerSlot: (
      <>
        <button type="button" className="nm-cta">Proponer</button>
        <button type="button" className="nm-close-link">Cerrar</button>
      </>
    ),
  },
  {
    label:   "IV · Split footer 50/50",
    desc:    '"Cancelar" ghost vault + "Proponer" primary lado a lado. Mismo patrón que ActionGate E.',
    note:    "↑ Máximo peso a la decisión",
    agRef:   "≡ ActionGate E",
    footerSlot: (
      <div className="nm-split">
        <button type="button" className="nm-ghost-btn">Cancelar</button>
        <button type="button" className="nm-cta">Proponer</button>
      </div>
    ),
  },
  {
    label:   "V · X gradient ring",
    desc:    "X con borde naranja→vault, espeja el card. Hover: scale(1.08) + glow vault. Mismo patrón que ActionGate F.",
    note:    "↑ Máxima cohesión DS · premium",
    agRef:   "≡ ActionGate F",
    prependSlot: (
      <button type="button" className="nm-x-gradient" aria-label="Cerrar">
        <IconX size={10} />
      </button>
    ),
    footerSlot: (
      <button type="button" className="nm-cta">Proponer</button>
    ),
  },
];

export default function NegotiateModalPage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="nm-root">

        <p className="nm-eyebrow">NegotiateModal</p>
        <p className="nm-page-title">Variantes de stroke y cierre</p>
        <p className="nm-page-sub">
          Botón "Proponer" = pvbtn-neg exacto (cyan → vault). Close variants alineadas 1:1 con ActionGate B→F.
          El close siempre está adherido al card — AG-A (corner overlay) no aplica aquí.
        </p>

        {/* ── Sección 1: Stroke ── */}
        <p className="nm-section-label">01 — Variantes de stroke</p>
        <div className="nm-grid" style={{ marginBottom: "80px" }}>
          {STROKE_VARIANTS.map(function renderStroke(v) {
            return (
              <div key={v.cls} className="nm-slot">
                <div className="nm-slot-wrap">
                  <Badge current={0} total={5} />
                  <div className={`nm-card ${v.cls}`}>
                    <CardInner
                      footerSlot={
                        <>
                          <button type="button" className="nm-cta">Proponer</button>
                          <button type="button" className="nm-close-link">Cerrar</button>
                        </>
                      }
                    />
                  </div>
                </div>
                <p className="nm-variant-label">{v.label}</p>
                <p className="nm-variant-desc">{v.desc}</p>
                <p className="nm-variant-note">{v.note}</p>
              </div>
            );
          })}
        </div>

        {/* ── Sección 2: Close variants ── */}
        <p className="nm-section-label">02 — Variantes de cierre (stroke C · gradient)</p>
        <div className="nm-grid">
          {CLOSE_VARIANTS.map(function renderClose(v) {
            return (
              <div key={v.label} className="nm-slot">
                <div className="nm-slot-wrap">
                  <Badge current={0} total={5} />
                  <div className="nm-card nm--gradient">
                    <CardInner
                      prependSlot={v.prependSlot}
                      footerSlot={v.footerSlot}
                    />
                  </div>
                </div>
                <p className="nm-variant-label">{v.label}</p>
                <p className="nm-variant-desc">{v.desc}</p>
                <p className="nm-variant-note">{v.note}</p>
                <p className="nm-ag-ref">{v.agRef}</p>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}
