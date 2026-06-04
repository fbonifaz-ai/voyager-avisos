"use client";

/**
 * ActividadModal — preview de variantes
 * Modal de actividad del usuario en zona personal.
 * Se abre al picar en cada ítem de "Tu Actividad".
 *
 * Dimensiones canónicas: 430 × auto px
 *
 * Variantes de contenido (estados del negocio):
 *   · consignacion   → imagen + nombre + "Ver Detalle"
 *   · proceso-compra → imagen + [nombre | HASTA fecha] + "Ver Detalle"
 *   · rechazada      → imagen + nombre + badge "Rechazada" + "Ver Detalle"
 *
 * Mapeo de close variants — 1:1 con AG / NM / IM / HM:
 *   AG-B → AM-I   · Header inline X
 *   AG-C → AM-II  · Handle + hint
 *   AG-D → AM-III · Ghost link "Cerrar"
 *   AG-E → AM-IV  · Footer "Cerrar"
 *   AG-F → AM-V   · X gradient ring
 */

import type { JSX } from "react";

const CSS = `
  /* ── Base card ── */
  .am-card {
    width: 430px;
    border-radius: var(--vmc-radius-lg);
    background: var(--vmc-color-base-white);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  /* ── Header: badge + título + X ── */
  .am-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 20px 16px;
    flex-shrink: 0;
    position: relative;
  }
  .am-badge {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--vmc-color-orange-600);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: var(--vmc-font-display);
    font-size: 13px;
    font-weight: 700;
    color: var(--vmc-color-base-white);
    line-height: 1;
  }
  .am-category {
    font-family: var(--vmc-font-display);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--vmc-color-vault-700);
    margin: 0;
    flex: 1;
  }

  /* ── Imagen vehículo ── */
  .am-image-wrap {
    width: 100%;
    height: 230px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    background: var(--vmc-color-neutral-200);
  }
  .am-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  /* Placeholder cuando no hay imagen real */
  .am-image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--vmc-color-neutral-200) 0%, var(--vmc-color-neutral-300) 100%);
  }
  /* Borde inferior naranja (live/orange signature) */
  .am-image-wrap::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--vmc-color-orange-600);
  }

  /* ── Fila info — tipo "consignación": solo nombre ── */
  .am-info-simple {
    padding: 14px 16px;
    flex-shrink: 0;
  }
  .am-vehicle-name {
    font-family: var(--vmc-font-display);
    font-size: 18px;
    font-weight: 700;
    color: var(--vmc-color-vault-700);
    line-height: 1.25;
    margin: 0;
  }

  /* ── Fila info — tipo "proceso de compra": nombre | HASTA fecha ── */
  .am-info-split {
    display: flex;
    align-items: stretch;
    border-top: 1px solid var(--vmc-color-neutral-200);
    flex-shrink: 0;
  }
  .am-info-left {
    flex: 1;
    padding: 14px 16px;
    border-right: 1px solid var(--vmc-color-neutral-200);
    display: flex;
    align-items: center;
  }
  .am-info-right {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    flex-shrink: 0;
  }
  .am-hasta-label {
    font-family: var(--vmc-font-display);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--vmc-color-vault-700);
    line-height: 1;
    margin-bottom: 2px;
  }
  .am-hasta-date {
    font-family: 'Roboto Mono', monospace;
    font-size: 16px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--vmc-color-vault-700);
    line-height: 1;
  }

  /* ── Badge "Rechazada" ── */
  .am-rejected-row {
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgb(93.73% 26.67% 26.67% / 0.06);
    flex-shrink: 0;
  }
  .am-rejected-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--vmc-color-status-error);
    flex-shrink: 0;
  }
  .am-rejected-label {
    font-family: var(--vmc-font-display);
    font-size: 12px;
    font-weight: 600;
    color: var(--vmc-color-status-error);
    letter-spacing: 0.5px;
  }
  .am-rejected-name {
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--vmc-color-vault-700);
    margin-left: auto;
  }

  /* ── CTA "Ver Detalle" — vault sólido ── */
  .am-cta {
    width: 100%;
    height: 52px;
    border: none;
    cursor: pointer;
    font-family: var(--vmc-font-display);
    font-size: 15px;
    font-weight: 600;
    color: var(--vmc-color-base-white);
    background: var(--vmc-color-vault-700);
    transition: background 0.15s ease, transform 0.15s ease;
    flex-shrink: 0;
    letter-spacing: 0.3px;
  }
  .am-cta:hover { background: var(--vmc-color-vault-600); }
  .am-cta:active { background: var(--vmc-color-vault-800); transform: scale(0.99); }

  /* ── Footer "Cerrar" (variante HM-IV) ── */
  .am-close-btn {
    width: 100%; height: 44px;
    border: none; border-top: 1px solid var(--vmc-color-neutral-200);
    background: var(--vmc-color-neutral-100);
    cursor: pointer;
    font-family: var(--vmc-font-display);
    font-size: 13px; font-weight: 600;
    color: var(--vmc-color-vault-700);
    transition: background 0.15s; flex-shrink: 0;
  }
  .am-close-btn:hover { background: var(--vmc-color-vault-100); }

  /* ── Ghost link "Cerrar" (variante HM-III) ── */
  .am-close-link {
    font-family: var(--vmc-font-display);
    font-size: 13px; font-weight: 500;
    color: var(--vmc-color-vault-600);
    background: none; border: none;
    cursor: pointer;
    padding: 12px 0;
    align-self: center;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: var(--vmc-color-vault-300);
    transition: color 0.15s;
    flex-shrink: 0;
  }
  .am-close-link:hover { color: var(--vmc-color-vault-900); }

  /* ── Handle + hint (variante HM-II) ── */
  .am-handle {
    width: 36px; height: 4px;
    border-radius: 9999px;
    background: var(--vmc-color-neutral-400);
    margin: 12px auto 4px;
    cursor: grab; flex-shrink: 0;
  }
  .am-close-hint {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 500;
    color: var(--vmc-color-neutral-600);
    padding: 10px 0 14px;
    display: flex; align-items: center; justify-content: center; gap: 4px;
    flex-shrink: 0; border-top: 1px solid var(--vmc-color-neutral-200);
  }

  /* ── X inline neutral (HM-I) ── */
  .am-x-inline {
    position: absolute; top: 16px; right: 16px;
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--vmc-color-neutral-200);
    border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--vmc-color-neutral-800);
    transition: background 0.15s, color 0.15s; z-index: 2;
  }
  .am-x-inline:hover { background: var(--vmc-color-vault-100); color: var(--vmc-color-vault-600); }

  /* ── X gradient ring (HM-V) ── */
  .am-x-gradient {
    position: absolute; top: 16px; right: 16px;
    width: 28px; height: 28px; border-radius: 50%;
    border: 1.5px solid transparent;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; z-index: 2;
    color: var(--vmc-color-vault-600);
    box-shadow: 0 1px 6px rgb(51.76% 37.65% 89.8% / 0.18);
    transition: box-shadow 0.2s, transform 0.15s;
  }
  .am-x-gradient:hover { box-shadow: 0 3px 12px rgb(51.76% 37.65% 89.8% / 0.30); transform: scale(1.08); }

  /* ── Stroke variants ── */
  .am--clean     { box-shadow: var(--vmc-shadow-md); }
  .am--vault     { border: 1.5px solid var(--vmc-color-vault-500); box-shadow: var(--vmc-shadow-sm); }
  .am--gradient  {
    border: 2px solid transparent;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: var(--vmc-shadow-sm);
  }
  .am--vault-dark { border: 2px solid var(--vmc-color-vault-700); box-shadow: 0 4px 16px rgb(13.33% 0% 36.08% / 0.12); }
  .am--accent-top {
    border-top: 3px solid transparent;
    border-left: none; border-right: none; border-bottom: none;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(90deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: var(--vmc-shadow-md);
  }

  /* ── Layout página ── */
  .am-root {
    min-height: 100vh;
    background: var(--vmc-color-neutral-200);
    padding: 48px 32px 72px;
    display: flex; flex-direction: column; align-items: center;
  }
  .am-eyebrow {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 700;
    letter-spacing: 1.8px; text-transform: uppercase;
    color: var(--vmc-color-neutral-700); margin-bottom: 6px;
  }
  .am-page-title {
    font-family: var(--vmc-font-display);
    font-size: 24px; font-weight: 700;
    color: var(--vmc-color-neutral-1100); margin-bottom: 6px;
  }
  .am-page-sub {
    font-family: var(--vmc-font-display);
    font-size: 13px; color: var(--vmc-color-neutral-700);
    margin-bottom: 48px; text-align: center;
    max-width: 560px; line-height: 1.6;
  }
  .am-section-label {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800);
    margin-bottom: 40px; align-self: flex-start;
    padding-left: 20px; display: flex; align-items: center; gap: 12px;
  }
  .am-section-label::after {
    content: ''; height: 1px; width: 200px;
    background: var(--vmc-color-neutral-400); display: inline-block;
  }
  .am-grid {
    display: grid;
    grid-template-columns: repeat(3, 470px);
    gap: 48px 32px;
    justify-items: center; align-items: start;
    margin-bottom: 72px;
  }
  @media (max-width: 1460px) { .am-grid { grid-template-columns: repeat(2, 470px); } }
  @media (max-width: 980px)  { .am-grid { grid-template-columns: 1fr; } }
  .am-slot { display: flex; flex-direction: column; align-items: center; }
  .am-slot-wrap { position: relative; padding: 16px; }
  .am-variant-label {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 700;
    letter-spacing: 1.2px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800); margin-top: 8px; text-align: center;
  }
  .am-variant-desc {
    font-family: var(--vmc-font-display);
    font-size: 12px; color: var(--vmc-color-neutral-600);
    text-align: center; max-width: 440px; line-height: 1.6; margin-top: 4px;
  }
  .am-variant-note {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 600;
    color: var(--vmc-color-vault-600); margin-top: 4px; text-align: center;
  }
  .am-ag-ref {
    font-family: var(--vmc-font-display);
    font-size: 10px; color: var(--vmc-color-neutral-500);
    margin-top: 3px; text-align: center;
  }

  /* ── Imagen placeholder SVG ── */
  .am-img-svg { opacity: 0.18; }
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
function IconCar(): JSX.Element {
  return (
    <svg width="80" height="50" viewBox="0 0 80 50" fill="none" className="am-img-svg" aria-hidden>
      <rect x="10" y="20" width="60" height="20" rx="4" fill="currentColor"/>
      <rect x="20" y="10" width="35" height="14" rx="3" fill="currentColor"/>
      <circle cx="22" cy="40" r="7" fill="currentColor"/>
      <circle cx="58" cy="40" r="7" fill="currentColor"/>
      <rect x="5" y="24" width="8" height="6" rx="1" fill="currentColor"/>
      <rect x="67" y="24" width="8" height="6" rx="1" fill="currentColor"/>
    </svg>
  );
}

/* ── Header del modal ── */
function ModalHeader({ count, category }: { count: number; category: string }): JSX.Element {
  return (
    <div className="am-header">
      <span className="am-badge" aria-label={`${count} ${category}`}>{count}</span>
      <p className="am-category">{category}</p>
    </div>
  );
}

/* ── Imagen vehículo ── */
function VehicleImage(): JSX.Element {
  return (
    <div className="am-image-wrap">
      <div className="am-image-placeholder">
        <IconCar />
      </div>
    </div>
  );
}

/* ── Variantes de contenido (negocio) ── */

function ContentConsignacion(): JSX.Element {
  return (
    <>
      <ModalHeader count={1} category="Consignaciones" />
      <VehicleImage />
      <div className="am-info-simple">
        <p className="am-vehicle-name">Carreta remolque</p>
      </div>
      <button type="button" className="am-cta">Ver Detalle</button>
    </>
  );
}

function ContentProcesoCompra(): JSX.Element {
  return (
    <>
      <ModalHeader count={1} category="Proceso de compra" />
      <VehicleImage />
      <div className="am-info-split">
        <div className="am-info-left">
          <p className="am-vehicle-name">Carreta remolque</p>
        </div>
        <div className="am-info-right">
          <span className="am-hasta-label">Hasta</span>
          <span className="am-hasta-date">04/06/26</span>
        </div>
      </div>
      <button type="button" className="am-cta">Ver Detalle</button>
    </>
  );
}

function ContentRechazada(): JSX.Element {
  return (
    <>
      <ModalHeader count={2} category="Rechazadas" />
      <VehicleImage />
      <div className="am-rejected-row">
        <span className="am-rejected-dot" aria-hidden />
        <span className="am-rejected-label">Oferta rechazada</span>
        <span className="am-rejected-name">Carreta remolque</span>
      </div>
      <button type="button" className="am-cta">Ver Detalle</button>
    </>
  );
}

/* ── Sección 00: Estados de contenido (variantes de negocio) ── */
const CONTENT_STATES = [
  { label: "Consignaciones",    note: "Sin fila adicional — nombre directo bajo imagen.",                             Component: ContentConsignacion  },
  { label: "Proceso de compra", note: "Fila split: nombre izq | HASTA fecha der. Info de deadline visible.",          Component: ContentProcesoCompra },
  { label: "Rechazada",         note: "Fila de estado con dot rojo + label + nombre. Mismo CTA para ver detalle.",    Component: ContentRechazada     },
];

/* ── Stroke variants ── */
const STROKE_VARIANTS = [
  { cls: "am--clean",      label: "A · Clean shadow",    desc: "Shadow-md sin borde. El overlay delimita el modal.",            note: "Máxima ligereza" },
  { cls: "am--vault",      label: "B · Vault stroke",    desc: "Borde sólido vault-500 1.5px. Lenguaje ghost/secondary DS.",    note: "Sobrio · coherente" },
  { cls: "am--gradient",   label: "C · Gradient border", desc: "Borde 2px naranja→vault. Consistente con todo el sistema.",    note: "↑ Recomendado · sistema unificado" },
  { cls: "am--vault-dark", label: "D · Vault dark",      desc: "Borde vault-700 2px + sombra tintada. Mayor autoridad.",       note: "Peso visual mayor" },
  { cls: "am--accent-top", label: "E · Top accent",      desc: "Línea top 3px naranja→vault. Alerta institucional sutil.",     note: "Sin borde completo" },
];

/* ── Close variants ── */
type CloseType = "inline" | "handle" | "link" | "footer" | "gradient";
interface CloseVar { label: string; desc: string; note: string; agRef: string; closeType: CloseType; }
const CLOSE_VARIANTS: CloseVar[] = [
  { label: "I · Header inline X",   desc: "X neutral 28px top-right. Patrón AG-B / NM-I / IM-I / HM-I.",          note: "Sin overflow · aria-label",      agRef: "≡ AG-B · NM-I · IM-I · HM-I",   closeType: "inline"   },
  { label: "II · Handle + hint",    desc: "Barra arrastre top + hint pie. Patrón AG-C / NM-II / IM-II / HM-II.",   note: "↑ Mobile-first · gesto natural", agRef: "≡ AG-C · NM-II · IM-II · HM-II", closeType: "handle"   },
  { label: "III · Ghost link",      desc: "\"Cerrar\" vault link al pie. Patrón AG-D / NM-III / IM-III / HM-III.", note: "↑ Mínima fricción",              agRef: "≡ AG-D · NM-III · IM-III · HM-III", closeType: "link"  },
  { label: "IV · Footer 'Cerrar'",  desc: "Franja pie separada del CTA. Patrón AG-E / NM-IV / IM-IV / HM-IV.",    note: "Cierre explícito · limpio",      agRef: "≡ AG-E · NM-IV · IM-IV · HM-IV", closeType: "footer"   },
  { label: "V · X gradient ring",   desc: "X borde naranja→vault espeja el card. Patrón AG-F / NM-V / IM-V / HM-V.", note: "↑ Máxima cohesión DS",        agRef: "≡ AG-F · NM-V · IM-V · HM-V",   closeType: "gradient" },
];

function buildClose(t: CloseType): JSX.Element | null {
  if (t === "inline")   { return <button type="button" className="am-x-inline"   aria-label="Cerrar"><IconX size={10} /></button>; }
  if (t === "gradient") { return <button type="button" className="am-x-gradient" aria-label="Cerrar"><IconX size={10} /></button>; }
  return null;
}
function buildAppend(t: CloseType): JSX.Element | null {
  if (t === "link")   { return <button type="button" className="am-close-link">Cerrar</button>; }
  if (t === "footer") { return <button type="button" className="am-close-btn">Cerrar</button>; }
  if (t === "handle") {
    return <div className="am-close-hint"><IconTap />&nbsp;Toca afuera para cerrar</div>;
  }
  return null;
}
function buildPrepend(t: CloseType): JSX.Element | null {
  if (t === "handle") { return <div className="am-handle" role="presentation" />; }
  return null;
}

export default function ActividadModalPage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="am-root">

        <p className="am-eyebrow">ActividadModal</p>
        <p className="am-page-title">Variantes de contenido, stroke y cierre</p>
        <p className="am-page-sub">
          Modal de actividad del usuario · 430px × auto · Se abre desde "Tu Actividad" en la zona personal.
          El contenido varía según el tipo de actividad (consignación, proceso de compra, rechazada).
        </p>

        {/* ── 00: Estados de contenido ── */}
        <p className="am-section-label">00 — Estados de contenido (variantes de negocio)</p>
        <div className="am-grid" style={{ marginBottom: "80px" }}>
          {CONTENT_STATES.map(function renderState(s) {
            return (
              <div key={s.label} className="am-slot">
                <div className="am-slot-wrap">
                  <div className="am-card am--clean">
                    <button type="button" className="am-x-inline" aria-label="Cerrar"><IconX size={10} /></button>
                    <s.Component />
                  </div>
                </div>
                <p className="am-variant-label">{s.label}</p>
                <p className="am-variant-desc">{s.note}</p>
              </div>
            );
          })}
        </div>

        {/* ── 01: Stroke variants ── */}
        <p className="am-section-label">01 — Variantes de stroke</p>
        <div className="am-grid" style={{ marginBottom: "80px" }}>
          {STROKE_VARIANTS.map(function renderStroke(v) {
            return (
              <div key={v.cls} className="am-slot">
                <div className="am-slot-wrap">
                  <div className={`am-card ${v.cls}`}>
                    <button type="button" className="am-x-inline" aria-label="Cerrar"><IconX size={10} /></button>
                    <ContentProcesoCompra />
                  </div>
                </div>
                <p className="am-variant-label">{v.label}</p>
                <p className="am-variant-desc">{v.desc}</p>
                <p className="am-variant-note">{v.note}</p>
              </div>
            );
          })}
        </div>

        {/* ── 02: Close variants ── */}
        <p className="am-section-label">02 — Variantes de cierre (stroke C · gradient)</p>
        <div className="am-grid">
          {CLOSE_VARIANTS.map(function renderClose(v) {
            const prependClose = buildClose(v.closeType);
            const prependHandle = buildPrepend(v.closeType);
            const append = buildAppend(v.closeType);
            return (
              <div key={v.label} className="am-slot">
                <div className="am-slot-wrap">
                  <div className="am-card am--gradient">
                    {prependClose}
                    {prependHandle}
                    <ContentConsignacion />
                    {append}
                  </div>
                </div>
                <p className="am-variant-label">{v.label}</p>
                <p className="am-variant-desc">{v.desc}</p>
                <p className="am-variant-note">{v.note}</p>
                <p className="am-ag-ref">{v.agRef}</p>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}
