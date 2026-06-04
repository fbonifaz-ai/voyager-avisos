"use client";

/**
 * ActionGate — variantes de dismiss/cierre
 * Componente: aviso de consentimiento previo a acción (ej: "Participa")
 * Tamaño canónico: 384 × 268 px
 */

import type { JSX } from "react";

/* ─── CSS ──────────────────────────────────────────────────────────────────── */
const CSS = `
  @property --ag-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 135deg;
  }
  @property --ag-stop-a {
    syntax: '<color>';
    inherits: false;
    initial-value: oklch(0.72 0.16 55);
  }
  @property --ag-stop-b {
    syntax: '<color>';
    inherits: false;
    initial-value: oklch(0.55 0.22 285);
  }

  /* ── Base card ── */
  .ag-card {
    width: 384px;
    min-height: 268px;
    border-radius: var(--vmc-radius-lg);
    background: var(--vmc-color-base-white);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 28px 28px;
    box-sizing: border-box;
    position: relative;
    /* Gradient border — idéntico a .pvbtn */
    border: 2px solid transparent;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(135deg,
        var(--vmc-color-orange-600) 0%,
        var(--vmc-color-vault-500) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: var(--vmc-shadow-sm);
  }

  /* ── Contenido ── */
  .ag-title {
    font-family: var(--vmc-font-display);
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    margin: 0 0 16px;
    line-height: 1.3;
    background: linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ag-body {
    font-family: var(--vmc-font-display);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.6;
    text-align: center;
    color: var(--vmc-color-vault-700);
    margin: 0 0 20px;
  }

  /* ── CTA button ── */
  .ag-cta {
    --ag-stop-a: var(--vmc-color-orange-600);
    --ag-stop-b: var(--vmc-color-vault-500);
    width: 100%;
    height: 48px;
    border-radius: var(--vmc-radius-full);
    border: 2.5px solid transparent;
    cursor: pointer;
    font-family: var(--vmc-font-display);
    font-size: 15px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.22);
    background-image:
      linear-gradient(var(--ag-angle), var(--ag-stop-a) 0%, var(--ag-stop-a) 40%, var(--ag-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-base-white) 0%,
        var(--vmc-color-orange-400) 25%,
        var(--vmc-color-vault-400) 75%,
        var(--vmc-color-base-white) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: inset 0 1px 0 rgb(100% 100% 100% / 0.22), 0 2px 8px rgb(92.94% 53.73% 21.18% / 0.35);
    transition:
      --ag-angle  0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
      --ag-stop-a 0.35s ease,
      --ag-stop-b 0.35s ease,
      transform   0.2s  cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow  0.25s ease;
    transform: translateZ(0);
  }
  .ag-cta:hover {
    --ag-angle:  220deg;
    --ag-stop-a: var(--vmc-color-orange-400);
    --ag-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-1px) scale(1.01);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.18),
      0 6px 20px rgb(51.76% 37.65% 89.8% / 0.30),
      0 3px 10px rgb(92.94% 53.73% 21.18% / 0.38);
  }
  .ag-cta:active {
    --ag-stop-a: var(--vmc-color-orange-700);
    --ag-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.20), 0 1px 3px rgb(0% 0% 0% / 0.10);
  }

  /* ── Ghost dismiss link ── */
  .ag-dismiss-link {
    font-family: var(--vmc-font-display);
    font-size: 13px;
    font-weight: 500;
    color: var(--vmc-color-neutral-700);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: var(--vmc-radius-sm);
    transition: color 0.15s ease;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: var(--vmc-color-neutral-400);
  }
  .ag-dismiss-link:hover {
    color: var(--vmc-color-vault-600);
    text-decoration-color: var(--vmc-color-vault-400);
  }

  /* ── Ghost dismiss button (split footer) ── */
  .ag-ghost-btn {
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
    transition: background 0.15s ease, color 0.15s ease;
  }
  .ag-ghost-btn:hover {
    background: var(--vmc-color-vault-100);
  }

  /* ─────────────────────────────────────────────────────────────
     VARIANTE A — Corner Overlay (referencia)
     X fuera del card, top-right, circle vault.
     El backdrop/overlay lo contiene.
  ───────────────────────────────────────────────────────────── */
  .ag-x-outer {
    position: absolute;
    top: -14px;
    right: -14px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--vmc-color-base-white);
    border: 1.5px solid var(--vmc-color-neutral-400);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--vmc-color-neutral-800);
    box-shadow: 0 2px 6px rgb(0% 0% 0% / 0.10);
    transition: border-color 0.15s, color 0.15s, box-shadow 0.15s;
    z-index: 10;
  }
  .ag-x-outer:hover {
    border-color: var(--vmc-color-vault-500);
    color: var(--vmc-color-vault-600);
    box-shadow: 0 2px 10px rgb(51.76% 37.65% 89.8% / 0.22);
  }

  /* ─────────────────────────────────────────────────────────────
     VARIANTE B — Header inline
     Título y X en la misma fila dentro del card.
     Más compacto, sin salir de los bordes.
  ───────────────────────────────────────────────────────────── */
  .ag-header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
    margin-bottom: 12px;
  }
  .ag-header-row .ag-title {
    margin: 0;
    text-align: left;
    flex: 1;
    font-size: 16px;
  }
  .ag-x-inline {
    flex-shrink: 0;
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
    margin-top: 2px;
  }
  .ag-x-inline:hover {
    background: var(--vmc-color-vault-100);
    color: var(--vmc-color-vault-600);
  }

  /* ─────────────────────────────────────────────────────────────
     VARIANTE C — Handle + tap-outside
     Barra de arrastre top-center (bottom-sheet pattern).
     Sin X explícita — el handle implica "cerrable".
     Badge "Toca afuera para cerrar" como hint.
  ───────────────────────────────────────────────────────────── */
  .ag-handle {
    width: 36px;
    height: 4px;
    border-radius: 9999px;
    background: var(--vmc-color-neutral-400);
    margin: 0 auto 20px;
    cursor: grab;
  }
  .ag-close-hint {
    font-family: var(--vmc-font-display);
    font-size: 11px;
    font-weight: 500;
    color: var(--vmc-color-neutral-600);
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* ─────────────────────────────────────────────────────────────
     VARIANTE D — Ghost pill debajo del CTA
     Texto "No, cancelar" como link secundario.
     Jerarquía clara: acción principal arriba, escape abajo.
  ───────────────────────────────────────────────────────────── */
  /* usa .ag-dismiss-link */

  /* ─────────────────────────────────────────────────────────────
     VARIANTE E — Split footer 50/50
     "Cancelar" (ghost vault) + "Acepto" (primary gradient)
     side by side. Elección explícita, sin X.
  ───────────────────────────────────────────────────────────── */
  .ag-split-footer {
    display: flex;
    gap: 12px;
    width: 100%;
    margin-top: 4px;
  }
  .ag-split-footer .ag-cta {
    flex: 1;
    width: auto;
  }

  /* ─────────────────────────────────────────────────────────────
     VARIANTE F — X con gradient ring
     Borde degradado naranja→vault, espejea el card border.
     Premium, cohesivo.
  ───────────────────────────────────────────────────────────── */
  .ag-x-gradient {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid transparent;
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
    box-shadow: 0 2px 8px rgb(51.76% 37.65% 89.8% / 0.20);
    transition: box-shadow 0.2s ease, transform 0.15s ease;
    z-index: 10;
  }
  .ag-x-gradient:hover {
    box-shadow: 0 4px 14px rgb(51.76% 37.65% 89.8% / 0.35);
    transform: scale(1.08);
  }

  /* ── Layout de la página ── */
  .ag-root {
    min-height: 100vh;
    background: var(--vmc-color-neutral-200);
    padding: 48px 32px 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ag-page-eyebrow {
    font-family: var(--vmc-font-display);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: var(--vmc-color-neutral-700);
    margin-bottom: 6px;
  }
  .ag-page-title {
    font-family: var(--vmc-font-display);
    font-size: 24px;
    font-weight: 700;
    color: var(--vmc-color-neutral-1100);
    margin-bottom: 8px;
  }
  .ag-page-sub {
    font-family: var(--vmc-font-display);
    font-size: 13px;
    color: var(--vmc-color-neutral-700);
    margin-bottom: 52px;
    text-align: center;
    max-width: 480px;
    line-height: 1.6;
  }
  .ag-grid {
    display: grid;
    grid-template-columns: repeat(3, 440px);
    gap: 56px 40px;
    justify-items: center;
    align-items: start;
  }
  @media (max-width: 1380px) { .ag-grid { grid-template-columns: repeat(2, 440px); } }
  @media (max-width: 930px)  { .ag-grid { grid-template-columns: 1fr; } }

  .ag-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ag-slot-wrap {
    position: relative;
    /* padding extra para que el X overflow no quede cortado */
    padding: 16px;
  }
  .ag-variant-label {
    font-family: var(--vmc-font-display);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--vmc-color-neutral-800);
    margin-top: 12px;
    text-align: center;
  }
  .ag-variant-desc {
    font-family: var(--vmc-font-display);
    font-size: 12px;
    font-weight: 400;
    color: var(--vmc-color-neutral-600);
    text-align: center;
    max-width: 360px;
    line-height: 1.6;
    margin-top: 4px;
  }
  .ag-variant-ux {
    font-family: var(--vmc-font-display);
    font-size: 11px;
    font-weight: 600;
    color: var(--vmc-color-vault-600);
    margin-top: 6px;
    text-align: center;
  }
`;

/* ─── Contenido ─────────────────────────────────────────────────────────── */
const TITLE = "Consignación: >S< 60 ó US$ 180";
const BODY  = 'Al consignar, aceptas conectarte a la sala "En vivo" y a enviar por lo menos un bid válido durante el proceso.';

/* Icono X */
function IconX({ size = 12 }: { size?: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

/* Icono tap-outside */
function IconTap(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
      <path d="M6.5 4V6.5L8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Variantes ─────────────────────────────────────────────────────────── */
export default function ActionGatePage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ag-root">
        <p className="ag-page-eyebrow">ActionGate</p>
        <p className="ag-page-title">Variantes de cierre / dismiss</p>
        <p className="ag-page-sub">
          Todos los cards usan el borde degradado naranja→vault (variante C ganadora).
          Lo que cambia es cómo el usuario identifica que puede cerrar el aviso.
        </p>

        <div className="ag-grid">

          {/* ── A: Corner Overlay (referencia) ── */}
          <div className="ag-slot">
            <div className="ag-slot-wrap">
              <div className="ag-card">
                <button type="button" className="ag-x-outer" aria-label="Cerrar">
                  <IconX size={11} />
                </button>
                <p className="ag-title">{TITLE}</p>
                <p className="ag-body">{BODY}</p>
                <button type="button" className="ag-cta">Acepto</button>
              </div>
            </div>
            <p className="ag-variant-label">A · Corner overlay</p>
            <p className="ag-variant-desc">X circular fuera del card, top-right. Referencia directa del diseño actual. El backdrop lo rodea.</p>
            <p className="ag-variant-ux">↑ Alta visibilidad · patrón conocido</p>
          </div>

          {/* ── B: Header inline ── */}
          <div className="ag-slot">
            <div className="ag-slot-wrap">
              <div className="ag-card" style={{ alignItems: "flex-start" }}>
                <div className="ag-header-row">
                  <p className="ag-title">{TITLE}</p>
                  <button type="button" className="ag-x-inline" aria-label="Cerrar">
                    <IconX size={10} />
                  </button>
                </div>
                <p className="ag-body" style={{ textAlign: "left" }}>{BODY}</p>
                <button type="button" className="ag-cta">Acepto</button>
              </div>
            </div>
            <p className="ag-variant-label">B · Header inline</p>
            <p className="ag-variant-desc">Título y X en la misma fila dentro del padding del card. Sin overflow. Compacto.</p>
            <p className="ag-variant-ux">↑ Sin overflow · texto alineado izq.</p>
          </div>

          {/* ── C: Handle + tap-outside ── */}
          <div className="ag-slot">
            <div className="ag-slot-wrap">
              <div className="ag-card">
                <div className="ag-handle" role="presentation" />
                <p className="ag-title">{TITLE}</p>
                <p className="ag-body">{BODY}</p>
                <button type="button" className="ag-cta">Acepto</button>
                <span className="ag-close-hint">
                  <IconTap />&nbsp;Toca afuera para cerrar
                </span>
              </div>
            </div>
            <p className="ag-variant-label">C · Handle + hint</p>
            <p className="ag-variant-desc">Barra de arrastre top-center (bottom-sheet). Hint de texto al pie. Sin X explícita.</p>
            <p className="ag-variant-ux">↑ Mobile-first · gesto natural</p>
          </div>

          {/* ── D: Ghost pill debajo ── */}
          <div className="ag-slot">
            <div className="ag-slot-wrap">
              <div className="ag-card">
                <p className="ag-title">{TITLE}</p>
                <p className="ag-body">{BODY}</p>
                <button type="button" className="ag-cta">Acepto</button>
                <button type="button" className="ag-dismiss-link">No, cancelar</button>
              </div>
            </div>
            <p className="ag-variant-label">D · Ghost link debajo</p>
            <p className="ag-variant-desc">El escape es un texto-link bajo el CTA. Jerarquía clara: acción principal arriba, escape abajo.</p>
            <p className="ag-variant-ux">↑ Reduce friction · dismiss deliberado</p>
          </div>

          {/* ── E: Split footer 50/50 ── */}
          <div className="ag-slot">
            <div className="ag-slot-wrap">
              <div className="ag-card">
                <p className="ag-title">{TITLE}</p>
                <p className="ag-body">{BODY}</p>
                <div className="ag-split-footer">
                  <button type="button" className="ag-ghost-btn">Cancelar</button>
                  <button type="button" className="ag-cta">Acepto</button>
                </div>
              </div>
            </div>
            <p className="ag-variant-label">E · Split footer 50/50</p>
            <p className="ag-variant-desc">Cancelar (ghost vault) + Acepto (primary) lado a lado. Sin X. Elección explícita y simétrica.</p>
            <p className="ag-variant-ux">↑ Mayor peso a la decisión · sin ambigüedad</p>
          </div>

          {/* ── F: X con gradient ring ── */}
          <div className="ag-slot">
            <div className="ag-slot-wrap">
              <div className="ag-card">
                <button type="button" className="ag-x-gradient" aria-label="Cerrar">
                  <IconX size={11} />
                </button>
                <p className="ag-title">{TITLE}</p>
                <p className="ag-body">{BODY}</p>
                <button type="button" className="ag-cta">Acepto</button>
              </div>
            </div>
            <p className="ag-variant-label">F · X gradient ring</p>
            <p className="ag-variant-desc">X con borde degradado naranja→vault, igual que el card. Cohesivo, premium. Hover: scale + glow.</p>
            <p className="ag-variant-ux">↑ Máxima coherencia visual · premium</p>
          </div>

        </div>
      </div>
    </>
  );
}
