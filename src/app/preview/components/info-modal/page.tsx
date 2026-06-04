"use client";

/**
 * InfoModal — preview de variantes
 * Modal informativo disparado por icono (i).
 * Caso canónico: explicación de Puntos VMC.
 * Tamaño canónico: 480 × auto px
 *
 * Sin CTA de acción — solo contenido + cierre.
 * Mapeo de close variants — 1:1 con ActionGate y NegotiateModal:
 *   AG-B / NM-I  →  IM-I   · Header inline X
 *   AG-C / NM-II →  IM-II  · Handle + hint
 *   AG-D / NM-III→  IM-III · Ghost link "Cerrar"
 *   AG-E / NM-IV →  IM-IV  · Botón primario "Entendido" (footer — sin split porque no hay acción secundaria)
 *   AG-F / NM-V  →  IM-V   · X gradient ring
 */

import type { JSX } from "react";

const CSS = `
  /* ── Base card ── */
  .im-card {
    width: 350px;
    min-height: 320px;
    border-radius: var(--vmc-radius-lg);
    background: var(--vmc-color-base-white);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 28px 28px 24px;
    box-sizing: border-box;
    position: relative;
  }

  /* ── Título ── */
  .im-title {
    font-family: var(--vmc-font-display);
    font-size: 18px;
    font-weight: 700;
    color: var(--vmc-color-vault-700);
    text-align: center;
    margin: 0 0 24px;
    line-height: 1.3;
  }
  .im-title.with-handle { margin-top: 12px; }

  /* ── Lista de ítems ── */
  .im-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .im-item {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .im-item-icon {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .im-item-text {
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 400;
    color: var(--vmc-color-neutral-900);
    line-height: 1.5;
  }
  .im-item-text strong {
    font-weight: 700;
    color: var(--vmc-color-vault-900);
  }

  /* ── Botón "Entendido" (variante IM-IV) ── */
  @property --im-angle  { syntax: '<angle>';  inherits: false; initial-value: 135deg; }
  @property --im-stop-a { syntax: '<color>';  inherits: false; initial-value: oklch(0.72 0.16 55); }
  @property --im-stop-b { syntax: '<color>';  inherits: false; initial-value: oklch(0.55 0.22 285); }

  .im-cta {
    --im-stop-a: var(--vmc-color-orange-600);
    --im-stop-b: var(--vmc-color-vault-500);
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
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.22);
    background-image:
      linear-gradient(var(--im-angle), var(--im-stop-a) 0%, var(--im-stop-a) 40%, var(--im-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-base-white) 0%,
        var(--vmc-color-orange-400) 25%,
        var(--vmc-color-vault-400) 75%,
        var(--vmc-color-base-white) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 2px 8px rgb(92.94% 53.73% 21.18% / 0.30);
    transition:
      --im-angle  0.4s  cubic-bezier(0.25, 0.8, 0.25, 1),
      --im-stop-a 0.35s ease,
      --im-stop-b 0.35s ease,
      transform   0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow  0.25s ease;
    transform: translateZ(0);
    margin-top: 24px;
  }
  .im-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.17) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
  }
  .im-cta:hover {
    --im-angle:  220deg;
    --im-stop-a: var(--vmc-color-orange-400);
    --im-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-1px) scale(1.01);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.18),
      0 6px 20px rgb(51.76% 37.65% 89.8% / 0.28),
      0 3px 10px rgb(92.94% 53.73% 21.18% / 0.35);
  }
  .im-cta:active {
    --im-stop-a: var(--vmc-color-orange-700);
    --im-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.20), 0 1px 3px rgb(0% 0% 0% / 0.10);
  }

  /* ─────────────────────────────────────────────
     CLOSE VARIANTS — mismos patrones que AG y NM
  ───────────────────────────────────────────── */

  /* IM-I ↔ AG-B · Header inline X */
  .im-x-inline {
    position: absolute;
    top: 16px;
    right: 16px;
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
  .im-x-inline:hover { background: var(--vmc-color-vault-100); color: var(--vmc-color-vault-600); }

  /* IM-II ↔ AG-C · Handle + hint */
  .im-handle {
    width: 36px;
    height: 4px;
    border-radius: 9999px;
    background: var(--vmc-color-neutral-400);
    margin: 0 auto 16px;
    cursor: grab;
    flex-shrink: 0;
    align-self: center;
  }
  .im-close-hint {
    font-family: var(--vmc-font-display);
    font-size: 11px;
    font-weight: 500;
    color: var(--vmc-color-neutral-600);
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  /* IM-III ↔ AG-D · Ghost link */
  .im-close-link {
    font-family: var(--vmc-font-display);
    font-size: 13px;
    font-weight: 500;
    color: var(--vmc-color-vault-600);
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: var(--vmc-radius-sm);
    margin-top: 20px;
    align-self: center;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: var(--vmc-color-vault-300);
    transition: color 0.15s, text-decoration-color 0.15s;
  }
  .im-close-link:hover { color: var(--vmc-color-vault-800); text-decoration-color: var(--vmc-color-vault-500); }

  /* IM-V ↔ AG-F · X gradient ring */
  .im-x-gradient {
    position: absolute;
    top: 16px;
    right: 16px;
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
  .im-x-gradient:hover { box-shadow: 0 3px 12px rgb(51.76% 37.65% 89.8% / 0.30); transform: scale(1.08); }

  /* ── Stroke variants ── */
  .im--clean    { box-shadow: var(--vmc-shadow-md); }
  .im--vault    { border: 1.5px solid var(--vmc-color-vault-500); box-shadow: var(--vmc-shadow-sm); }
  .im--gradient {
    border: 2px solid transparent;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: var(--vmc-shadow-sm);
  }
  .im--vault-solid {
    border: 2px solid var(--vmc-color-vault-700);
    box-shadow: 0 4px 16px rgb(13.33% 0% 36.08% / 0.12);
  }
  .im--accent-top {
    border-top: 3px solid transparent;
    border-left: none; border-right: none; border-bottom: none;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(90deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: var(--vmc-shadow-md);
    padding-top: 28px;
  }

  /* ── Layout página ── */
  .im-root {
    min-height: 100vh;
    background: var(--vmc-color-neutral-200);
    padding: 48px 32px 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .im-eyebrow {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 700;
    letter-spacing: 1.8px; text-transform: uppercase;
    color: var(--vmc-color-neutral-700); margin-bottom: 6px;
  }
  .im-page-title {
    font-family: var(--vmc-font-display);
    font-size: 24px; font-weight: 700;
    color: var(--vmc-color-neutral-1100); margin-bottom: 6px;
  }
  .im-page-sub {
    font-family: var(--vmc-font-display);
    font-size: 13px; color: var(--vmc-color-neutral-700);
    margin-bottom: 56px; text-align: center;
    max-width: 500px; line-height: 1.6;
  }
  .im-section-label {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800);
    margin-bottom: 40px; align-self: flex-start;
    padding-left: 20px; display: flex; align-items: center; gap: 12px;
  }
  .im-section-label::after {
    content: ''; height: 1px; width: 200px;
    background: var(--vmc-color-neutral-400); display: inline-block;
  }
  .im-grid {
    display: grid;
    grid-template-columns: repeat(3, 410px);
    gap: 48px 32px;
    justify-items: center;
    align-items: start;
    margin-bottom: 72px;
  }
  @media (max-width: 1280px) { .im-grid { grid-template-columns: repeat(2, 410px); } }
  @media (max-width: 860px)  { .im-grid { grid-template-columns: 1fr; } }

  .im-slot { display: flex; flex-direction: column; align-items: center; }
  .im-slot-wrap { position: relative; padding: 16px; }
  .im-variant-label {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 700;
    letter-spacing: 1.2px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800);
    margin-top: 10px; text-align: center;
  }
  .im-variant-desc {
    font-family: var(--vmc-font-display);
    font-size: 12px; color: var(--vmc-color-neutral-600);
    text-align: center; max-width: 360px;
    line-height: 1.6; margin-top: 4px;
  }
  .im-variant-note {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 600;
    color: var(--vmc-color-vault-600);
    margin-top: 4px; text-align: center;
  }
  .im-ag-ref {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 500;
    color: var(--vmc-color-neutral-500);
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

/* ── Estrella SVG ── */
function StarIcon({ color }: { color: string }): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
  );
}

/* ── Contenido informativo ── */
const ITEMS = [
  { color: "var(--vmc-color-red-500)",   label: "Riesgo alto:",      desc: "Todo puntaje negativo." },
  { color: "var(--vmc-color-neutral-500)", label: "Riesgo regular:", desc: "De 0 a 149 puntos." },
  { color: "var(--vmc-color-vault-700)", label: "Riesgo bajo:",      desc: "De 150 a 299 puntos." },
  { color: "var(--vmc-color-green-500)", label: "Riesgo muy bajo:",  desc: "De 300 a más puntos." },
];

function InfoList(): JSX.Element {
  return (
    <ul className="im-list" role="list">
      {ITEMS.map(function renderItem(item) {
        return (
          <li key={item.label} className="im-item">
            <span className="im-item-icon">
              <StarIcon color={item.color} />
            </span>
            <span className="im-item-text">
              <strong>{item.label}</strong>{" "}{item.desc}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ── Stroke variants ── */
const STROKE_VARIANTS = [
  { cls: "im--clean",      label: "A · Clean shadow",    desc: "Solo shadow-md. Sin borde. El overlay separa el modal.", note: "Máxima ligereza" },
  { cls: "im--vault",      label: "B · Vault stroke",    desc: "Borde sólido vault-500 1.5px. Lenguaje ghost/secondary.", note: "Sobrio · coherente" },
  { cls: "im--gradient",   label: "C · Gradient border", desc: "Borde 2px naranja→vault. Mismo patrón que AG y NM.", note: "↑ Recomendado · consistente" },
  { cls: "im--vault-solid",label: "D · Vault dark",      desc: "Borde vault-700 2px + sombra tintada. Más autoritativo.", note: "Peso visual mayor" },
  { cls: "im--accent-top", label: "E · Top accent",      desc: "Línea superior 3px naranja→vault, resto limpio. Estilo alerta institucional.", note: "Alerta sutil · sin borde completo" },
];

/* ── Close variants ── */
interface CloseVar {
  label: string; desc: string; note: string; agRef: string;
  prependSlot?: JSX.Element;
  appendSlot?: JSX.Element;
}

const CLOSE_VARIANTS: CloseVar[] = [
  {
    label: "I · Header inline X",
    desc:  "X círculo neutral 28px top-right dentro del card. Sin texto. Mismo patrón que AG-B / NM-I.",
    note:  "Sin overflow · aria-label accesible",
    agRef: "≡ ActionGate B · NegotiateModal I",
    prependSlot: (
      <button type="button" className="im-x-inline" aria-label="Cerrar">
        <IconX size={10} />
      </button>
    ),
  },
  {
    label: "II · Handle + hint",
    desc:  "Barra de arrastre top-center + 'Toca afuera para cerrar'. Mismo patrón que AG-C / NM-II.",
    note:  "↑ Mobile-first · gesto natural",
    agRef: "≡ ActionGate C · NegotiateModal II",
    prependSlot: <div className="im-handle" role="presentation" />,
    appendSlot:  <span className="im-close-hint"><IconTap />&nbsp;Toca afuera para cerrar</span>,
  },
  {
    label: "III · Ghost link 'Cerrar'",
    desc:  '"Cerrar" como texto-link centrado al pie. Jerarquía natural: info primero, escape al final. Mismo patrón que AG-D / NM-III.',
    note:  "↑ Patrón conocido · menor fricción",
    agRef: "≡ ActionGate D · NegotiateModal III",
    appendSlot: <button type="button" className="im-close-link">Cerrar</button>,
  },
  {
    label: "IV · Botón 'Entendido'",
    desc:  'CTA full-width "Entendido" — reemplaza el split porque no hay acción secundaria. Confirma lectura activa.',
    note:  "Confirmación explícita · sensación de progreso",
    agRef: "≡ ActionGate E · adaptado (sin acción secundaria)",
    appendSlot: <button type="button" className="im-cta">Entendido</button>,
  },
  {
    label: "V · X gradient ring",
    desc:  "X con borde naranja→vault, espeja el card. Hover: scale(1.08) + glow vault. Mismo patrón que AG-F / NM-V.",
    note:  "↑ Máxima cohesión DS · premium",
    agRef: "≡ ActionGate F · NegotiateModal V",
    prependSlot: (
      <button type="button" className="im-x-gradient" aria-label="Cerrar">
        <IconX size={10} />
      </button>
    ),
  },
];

export default function InfoModalPage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="im-root">

        <p className="im-eyebrow">InfoModal</p>
        <p className="im-page-title">Variantes de stroke y cierre</p>
        <p className="im-page-sub">
          Modal informativo disparado por icono (i). Caso canónico: Puntos VMC.
          Sin CTA de acción — solo información + cierre. Close variants alineadas con ActionGate y NegotiateModal.
        </p>

        {/* ── Sección 1: Stroke ── */}
        <p className="im-section-label">01 — Variantes de stroke</p>
        <div className="im-grid" style={{ marginBottom: "80px" }}>
          {STROKE_VARIANTS.map(function renderStroke(v) {
            return (
              <div key={v.cls} className="im-slot">
                <div className="im-slot-wrap">
                  <div className={`im-card ${v.cls}`}>
                    <button type="button" className="im-x-inline" aria-label="Cerrar">
                      <IconX size={10} />
                    </button>
                    <p className="im-title">Puntos VMC</p>
                    <InfoList />
                  </div>
                </div>
                <p className="im-variant-label">{v.label}</p>
                <p className="im-variant-desc">{v.desc}</p>
                <p className="im-variant-note">{v.note}</p>
              </div>
            );
          })}
        </div>

        {/* ── Sección 2: Close variants ── */}
        <p className="im-section-label">02 — Variantes de cierre (stroke C · gradient)</p>
        <div className="im-grid">
          {CLOSE_VARIANTS.map(function renderClose(v) {
            return (
              <div key={v.label} className="im-slot">
                <div className="im-slot-wrap">
                  <div className="im-card im--gradient">
                    {v.prependSlot}
                    <p className={v.prependSlot ? "im-title" : "im-title with-handle"}>Puntos VMC</p>
                    <InfoList />
                    {v.appendSlot}
                  </div>
                </div>
                <p className="im-variant-label">{v.label}</p>
                <p className="im-variant-desc">{v.desc}</p>
                <p className="im-variant-note">{v.note}</p>
                <p className="im-ag-ref">{v.agRef}</p>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}
