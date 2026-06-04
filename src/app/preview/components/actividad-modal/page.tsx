"use client";

/**
 * ActividadModal — preview de variantes
 * Modal de actividad del usuario en zona personal.
 * Se abre al picar en cada ítem de "Tu Actividad".
 *
 * Dimensiones canónicas: 370 × auto px
 * Comportamiento de altura:
 *   · 1–3 ítems → crece libremente (sin scroll)
 *   · 4+ ítems  → max-height en lista + overflow-y scroll
 *                  el último ítem queda cortado = hint visual de scroll
 *
 * 4 tipos de actividad:
 *   · Consignaciones   → imagen + nombre + "Ver Detalle"
 *   · Ganadas          → imagen + [nombre | HASTA fecha] + "Ver Detalle"
 *   · Proceso de compra→ imagen + [nombre | HASTA fecha] + "Ver Detalle"
 *   · Rechazadas       → imagen + fila estado error + "Ver Detalle"
 *
 * Close variants — 1:1 con AG / NM / IM / HM:
 *   AM-I   ≡ AG-B · X inline neutral
 *   AM-II  ≡ AG-C · Handle + hint
 *   AM-III ≡ AG-D · Ghost link
 *   AM-IV  ≡ AG-E · Footer button
 *   AM-V   ≡ AG-F · X gradient ring
 */

import type { JSX } from "react";

const CSS = `
  /* ── Base card ── */
  .am-card {
    width: 370px;
    border-radius: var(--vmc-radius-lg);
    background: var(--vmc-color-base-white);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  /* ── Header fijo ── */
  .am-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 18px 20px 14px;
    flex-shrink: 0;
    position: relative;
    background: var(--vmc-color-base-white);
    z-index: 2;
  }
  .am-badge {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--vmc-color-orange-600);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-family: var(--vmc-font-display);
    font-size: 13px; font-weight: 700;
    color: var(--vmc-color-base-white); line-height: 1;
  }
  .am-category {
    font-family: var(--vmc-font-display);
    font-size: 13px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase;
    color: var(--vmc-color-vault-700);
    margin: 0; flex: 1;
  }

  /* ── Lista de ítems — crece libremente hasta el scroll trigger ── */
  .am-items {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--vmc-color-neutral-400) transparent;
  }
  .am-items::-webkit-scrollbar { width: 4px; }
  .am-items::-webkit-scrollbar-track { background: transparent; }
  .am-items::-webkit-scrollbar-thumb { background: var(--vmc-color-neutral-400); border-radius: 2px; }

  /* Con scroll: altura máxima = 2.7 ítems → el 3ro se corta = hint */
  .am-items.scroll { max-height: 720px; }

  /* Separador entre ítems — el fondo neutro hace visible el gap */
  .am-items {
    gap: 0;
    padding: 0;
    background: var(--vmc-color-neutral-200);
  }
  .am-item-wrap {
    background: var(--vmc-color-base-white);
    margin-bottom: 12px;
  }
  .am-item-wrap:last-child { margin-bottom: 0; }

  /* ── Bloque de ítem ── */
  .am-image-wrap {
    width: 100%; height: 180px;
    position: relative; overflow: hidden;
    flex-shrink: 0; background: var(--vmc-color-neutral-200);
  }
  .am-image-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, var(--vmc-color-neutral-200) 0%, var(--vmc-color-neutral-300) 100%);
  }
  /* Borde inferior naranja — signature */
  .am-image-wrap::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 4px; background: var(--vmc-color-orange-600);
  }
  .am-img-svg { opacity: 0.15; }

  /* Fila info simple (solo nombre) */
  .am-info-simple {
    padding: 12px 16px; flex-shrink: 0;
    background: var(--vmc-color-base-white);
  }
  .am-vehicle-name {
    font-family: var(--vmc-font-display);
    font-size: 17px; font-weight: 700;
    color: var(--vmc-color-vault-700); line-height: 1.25; margin: 0;
  }

  /* Fila info split (nombre | HASTA fecha) */
  .am-info-split {
    display: flex; align-items: stretch;
    border-top: 1px solid var(--vmc-color-neutral-200);
    flex-shrink: 0; background: var(--vmc-color-base-white);
  }
  .am-info-left {
    flex: 1; padding: 12px 16px;
    border-right: 1px solid var(--vmc-color-neutral-200);
    display: flex; align-items: center;
  }
  .am-info-right {
    padding: 12px 16px;
    display: flex; flex-direction: column;
    align-items: flex-end; justify-content: center; flex-shrink: 0;
  }
  .am-hasta-label {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.8px; text-transform: uppercase;
    color: var(--vmc-color-vault-700); line-height: 1; margin-bottom: 2px;
  }
  .am-hasta-date {
    font-family: 'Roboto Mono', monospace;
    font-size: 15px; font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--vmc-color-vault-700); line-height: 1;
  }

  /* Fila estado rechazada */
  .am-rejected-row {
    padding: 10px 16px;
    display: flex; align-items: center; gap: 8px;
    background: rgb(93.73% 26.67% 26.67% / 0.06);
    flex-shrink: 0;
  }
  .am-rejected-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--vmc-color-status-error); flex-shrink: 0;
  }
  .am-rejected-label {
    font-family: var(--vmc-font-display);
    font-size: 12px; font-weight: 600;
    color: var(--vmc-color-status-error);
  }
  .am-rejected-name {
    font-family: var(--vmc-font-display);
    font-size: 13px; font-weight: 700;
    color: var(--vmc-color-vault-700); margin-left: auto;
  }

  /* CTA "Ver Detalle" — vault sólido */
  .am-cta {
    width: 100%; height: 50px; border: none;
    cursor: pointer;
    font-family: var(--vmc-font-display);
    font-size: 15px; font-weight: 600;
    color: var(--vmc-color-base-white);
    background: var(--vmc-color-vault-700);
    transition: background 0.15s ease; flex-shrink: 0;
    letter-spacing: 0.3px;
  }
  .am-cta:hover { background: var(--vmc-color-vault-600); }
  .am-cta:active { background: var(--vmc-color-vault-800); }

  /* ── CLOSE VARIANTS ── */
  .am-x-inline {
    position: absolute; top: 14px; right: 16px;
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--vmc-color-neutral-200); border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--vmc-color-neutral-800);
    transition: background 0.15s, color 0.15s; z-index: 3;
  }
  .am-x-inline:hover { background: var(--vmc-color-vault-100); color: var(--vmc-color-vault-600); }

  .am-x-gradient {
    position: absolute; top: 14px; right: 16px;
    width: 28px; height: 28px; border-radius: 50%;
    border: 1.5px solid transparent;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; z-index: 3;
    color: var(--vmc-color-vault-600);
    box-shadow: 0 1px 6px rgb(51.76% 37.65% 89.8% / 0.18);
    transition: box-shadow 0.2s, transform 0.15s;
  }
  .am-x-gradient:hover { box-shadow: 0 3px 12px rgb(51.76% 37.65% 89.8% / 0.30); transform: scale(1.08); }

  .am-handle {
    width: 36px; height: 4px; border-radius: 9999px;
    background: var(--vmc-color-neutral-400);
    margin: 12px auto 4px; cursor: grab; flex-shrink: 0;
  }
  .am-close-hint {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 500; color: var(--vmc-color-neutral-600);
    padding: 10px 0 12px;
    display: flex; align-items: center; justify-content: center; gap: 4px;
    flex-shrink: 0; border-top: 1px solid var(--vmc-color-neutral-200);
  }
  .am-close-link {
    font-family: var(--vmc-font-display);
    font-size: 13px; font-weight: 500; color: var(--vmc-color-vault-600);
    background: none; border: none; cursor: pointer;
    padding: 12px 0; align-self: center;
    text-decoration: underline; text-underline-offset: 3px;
    text-decoration-color: var(--vmc-color-vault-300);
    transition: color 0.15s; flex-shrink: 0;
  }
  .am-close-link:hover { color: var(--vmc-color-vault-900); }
  .am-close-btn {
    width: 100%; height: 44px; border: none;
    border-top: 1px solid var(--vmc-color-neutral-200);
    background: var(--vmc-color-neutral-100);
    cursor: pointer;
    font-family: var(--vmc-font-display);
    font-size: 13px; font-weight: 600; color: var(--vmc-color-vault-700);
    transition: background 0.15s; flex-shrink: 0;
  }
  .am-close-btn:hover { background: var(--vmc-color-vault-100); }

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
    min-height: 100vh; background: var(--vmc-color-neutral-200);
    padding: 48px 32px 72px;
    display: flex; flex-direction: column; align-items: center;
  }
  .am-eyebrow {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 700; letter-spacing: 1.8px;
    text-transform: uppercase; color: var(--vmc-color-neutral-700); margin-bottom: 6px;
  }
  .am-page-title {
    font-family: var(--vmc-font-display);
    font-size: 24px; font-weight: 700; color: var(--vmc-color-neutral-1100); margin-bottom: 6px;
  }
  .am-page-sub {
    font-family: var(--vmc-font-display);
    font-size: 13px; color: var(--vmc-color-neutral-700);
    margin-bottom: 48px; text-align: center; max-width: 580px; line-height: 1.6;
  }
  .am-section-label {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800); margin-bottom: 40px;
    align-self: flex-start; padding-left: 20px;
    display: flex; align-items: center; gap: 12px;
  }
  .am-section-label::after {
    content: ''; height: 1px; width: 200px;
    background: var(--vmc-color-neutral-400); display: inline-block;
  }
  .am-grid {
    display: grid;
    grid-template-columns: repeat(4, 410px);
    gap: 48px 24px;
    justify-items: center; align-items: start;
    margin-bottom: 72px;
  }
  @media (max-width: 1700px) { .am-grid { grid-template-columns: repeat(3, 410px); } }
  @media (max-width: 1300px) { .am-grid { grid-template-columns: repeat(2, 410px); } }
  @media (max-width: 880px)  { .am-grid { grid-template-columns: 1fr; } }

  .am-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 410px);
    gap: 48px 24px;
    justify-items: center; align-items: start;
    margin-bottom: 72px;
  }
  @media (max-width: 1280px) { .am-grid-3 { grid-template-columns: repeat(2, 410px); } }
  @media (max-width: 880px)  { .am-grid-3 { grid-template-columns: 1fr; } }

  .am-slot { display: flex; flex-direction: column; align-items: center; }
  .am-slot-wrap { position: relative; padding: 16px; }
  .am-variant-label {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800); margin-top: 8px; text-align: center;
  }
  .am-variant-desc {
    font-family: var(--vmc-font-display);
    font-size: 12px; color: var(--vmc-color-neutral-600);
    text-align: center; max-width: 380px; line-height: 1.6; margin-top: 4px;
  }
  .am-variant-note {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 600; color: var(--vmc-color-vault-600);
    margin-top: 4px; text-align: center;
  }
  .am-ag-ref {
    font-family: var(--vmc-font-display);
    font-size: 10px; color: var(--vmc-color-neutral-500);
    margin-top: 3px; text-align: center;
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
function IconCar(): JSX.Element {
  return (
    <svg width="72" height="44" viewBox="0 0 72 44" fill="none" className="am-img-svg" aria-hidden>
      <rect x="8" y="18" width="56" height="18" rx="4" fill="currentColor"/>
      <rect x="18" y="8" width="32" height="14" rx="3" fill="currentColor"/>
      <circle cx="20" cy="36" r="6" fill="currentColor"/>
      <circle cx="52" cy="36" r="6" fill="currentColor"/>
    </svg>
  );
}

/* ── Imagen placeholder ── */
function VehicleImage(): JSX.Element {
  return (
    <div className="am-image-wrap">
      <div className="am-image-placeholder">
        <IconCar />
      </div>
    </div>
  );
}

/* ── Header del modal ── */
function ModalHeader({ count, category }: { count: number; category: string }): JSX.Element {
  return (
    <div className="am-header">
      <span className="am-badge">{count}</span>
      <p className="am-category">{category}</p>
    </div>
  );
}

/* ── Ítems por tipo ── */
interface ItemData { name: string; date?: string; }

function ItemConsignacion({ item }: { item: ItemData }): JSX.Element {
  return (
    <div className="am-item-wrap">
      <VehicleImage />
      <div className="am-info-simple">
        <p className="am-vehicle-name">{item.name}</p>
      </div>
      <button type="button" className="am-cta">Ver Detalle</button>
    </div>
  );
}

function ItemConFecha({ item }: { item: ItemData }): JSX.Element {
  return (
    <div className="am-item-wrap">
      <VehicleImage />
      <div className="am-info-split">
        <div className="am-info-left">
          <p className="am-vehicle-name">{item.name}</p>
        </div>
        <div className="am-info-right">
          <span className="am-hasta-label">Hasta</span>
          <span className="am-hasta-date">{item.date ?? "17/06/26"}</span>
        </div>
      </div>
      <button type="button" className="am-cta">Ver Detalle</button>
    </div>
  );
}

function ItemRechazada({ item }: { item: ItemData }): JSX.Element {
  return (
    <div className="am-item-wrap">
      <VehicleImage />
      <div className="am-rejected-row">
        <span className="am-rejected-dot" aria-hidden />
        <span className="am-rejected-label">Oferta rechazada</span>
        <span className="am-rejected-name">{item.name}</span>
      </div>
      <button type="button" className="am-cta">Ver Detalle</button>
    </div>
  );
}

/* ── Datos de ejemplo ── */
const VEHICLE_DEFAULT: ItemData = { name: "Kia Soluto", date: "17/06/26" };
const VEHICLES_1: ItemData[] = [VEHICLE_DEFAULT];
const VEHICLES_3: ItemData[] = [
  { name: "Kia Soluto",     date: "17/06/26" },
  { name: "Kia Sportage",   date: "17/06/26" },
  { name: "Mazda 6",        date: "12/06/26" },
];
const VEHICLES_4: ItemData[] = [
  { name: "Kia Soluto",     date: "17/06/26" },
  { name: "Kia Sportage",   date: "17/06/26" },
  { name: "Mazda 6",        date: "12/06/26" },
  { name: "Toyota Hilux",   date: "08/06/26" },
];

/* ── Sección 00: Tipos de actividad ── */
interface ActivityType {
  category: string;
  count: number;
  items: ItemData[];
  desc: string;
  note: string;
  renderItem: (item: ItemData, i: number) => JSX.Element;
}
const ACTIVITY_TYPES: ActivityType[] = [
  {
    category: "Consignaciones", count: 1, items: VEHICLES_1,
    desc: "Imagen + nombre vehículo + 'Ver Detalle'. Sin fecha de deadline.",
    note: "Subasta en vivo activa",
    renderItem: function renderConsignacion(item, i) { return <ItemConsignacion key={i} item={item} />; },
  },
  {
    category: "Ganadas", count: 3, items: VEHICLES_3,
    desc: "Ítems apilados · imagen + [nombre | HASTA fecha] + 'Ver Detalle'. 3 ítems llenan casi la pantalla.",
    note: "Subastas ganadas con deadline de pago",
    renderItem: function renderGanada(item, i) { return <ItemConFecha key={i} item={item} />; },
  },
  {
    category: "Proceso de compra", count: 1, items: VEHICLES_1,
    desc: "Imagen + fila split [nombre | HASTA fecha] + 'Ver Detalle'. Deadline visible.",
    note: "Ofertas en proceso de pago",
    renderItem: function renderProceso(item, i) { return <ItemConFecha key={i} item={item} />; },
  },
  {
    category: "Rechazadas", count: 1, items: VEHICLES_1,
    desc: "Imagen + fila de estado error + 'Ver Detalle'. Fondo rojo sutil en la fila.",
    note: "Ofertas rechazadas",
    renderItem: function renderRechazada(item, i) { return <ItemRechazada key={i} item={item} />; },
  },
];

/* ── Sección 01: Comportamiento de scroll ── */
interface ScrollState { label: string; items: ItemData[]; scroll: boolean; desc: string; note: string; }
const SCROLL_STATES: ScrollState[] = [
  { label: "1 ítem",         items: VEHICLES_1, scroll: false, desc: "Altura mínima. El modal es compacto.",                                         note: "Sin scroll" },
  { label: "3 ítems",        items: VEHICLES_3, scroll: false, desc: "3 ítems apilados. Ocupa casi todo el viewport. Aún sin scroll.",                note: "Casi full height" },
  { label: "4+ ítems (scroll)", items: VEHICLES_4, scroll: true,  desc: "El 4to ítem queda cortado → hint visual de scroll. max-height activado.",   note: "↑ Overflow-y scroll visible" },
];

/* ── Stroke variants ── */
const STROKE_VARIANTS = [
  { cls: "am--clean",      label: "A · Clean shadow",    desc: "Shadow-md sin borde. Overlay delimita.",                      note: "Máxima ligereza" },
  { cls: "am--vault",      label: "B · Vault stroke",    desc: "Borde vault-500 1.5px. Lenguaje ghost/secondary DS.",         note: "Sobrio · coherente" },
  { cls: "am--gradient",   label: "C · Gradient border", desc: "Borde 2px naranja→vault. Consistente con todo el sistema.",  note: "↑ Recomendado" },
  { cls: "am--vault-dark", label: "D · Vault dark",      desc: "Borde vault-700 2px + sombra tintada. Mayor peso visual.",   note: "Autoridad" },
  { cls: "am--accent-top", label: "E · Top accent",      desc: "Línea superior naranja→vault. Sin borde completo.",          note: "Institucional" },
];

/* ── Close variants ── */
type CloseType = "inline" | "handle" | "link" | "footer" | "gradient";
interface CloseVar { label: string; desc: string; note: string; agRef: string; closeType: CloseType; }
const CLOSE_VARIANTS: CloseVar[] = [
  { label: "I · X inline neutral",  closeType: "inline",   desc: "X neutral 28px top-right. Mismo patrón AG-B / NM-I / IM-I / HM-I.",          note: "Sin overflow · aria-label",  agRef: "≡ AG-B · NM-I · IM-I · HM-I"    },
  { label: "II · Handle + hint",    closeType: "handle",   desc: "Barra arrastre + hint al pie. Mismo patrón AG-C / NM-II / IM-II / HM-II.",    note: "↑ Mobile-first · gesto",     agRef: "≡ AG-C · NM-II · IM-II · HM-II"  },
  { label: "III · Ghost link",      closeType: "link",     desc: '"Cerrar" link vault al pie. Mismo patrón AG-D / NM-III / IM-III / HM-III.',   note: "Mínima fricción",            agRef: "≡ AG-D · NM-III · IM-III · HM-III" },
  { label: "IV · Footer 'Cerrar'",  closeType: "footer",   desc: "Franja pie separada. Mismo patrón AG-E / NM-IV / IM-IV / HM-IV.",            note: "Cierre explícito",           agRef: "≡ AG-E · NM-IV · IM-IV · HM-IV"  },
  { label: "V · X gradient ring",   closeType: "gradient", desc: "X borde naranja→vault espeja el card. Mismo patrón AG-F / NM-V / IM-V / HM-V.", note: "↑ Máxima cohesión DS",     agRef: "≡ AG-F · NM-V · IM-V · HM-V"    },
];

function buildCloseX(t: CloseType): JSX.Element | null {
  if (t === "inline")   { return <button type="button" className="am-x-inline"   aria-label="Cerrar"><IconX size={10} /></button>; }
  if (t === "gradient") { return <button type="button" className="am-x-gradient" aria-label="Cerrar"><IconX size={10} /></button>; }
  return null;
}
function buildAppend(t: CloseType): JSX.Element | null {
  if (t === "link")   { return <button type="button" className="am-close-link">Cerrar</button>; }
  if (t === "footer") { return <button type="button" className="am-close-btn">Cerrar</button>; }
  if (t === "handle") { return <div className="am-close-hint"><IconTap />&nbsp;Toca afuera para cerrar</div>; }
  return null;
}
function buildHandleTop(t: CloseType): JSX.Element | null {
  if (t === "handle") { return <div style={{ padding: "10px 0 0" }}><div className="am-handle" role="presentation" /></div>; }
  return null;
}

export default function ActividadModalPage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="am-root">

        <p className="am-eyebrow">ActividadModal</p>
        <p className="am-page-title">Tipos, scroll y variantes de stroke/cierre</p>
        <p className="am-page-sub">
          370px × auto · 4 tipos de actividad · Los ítems se apilan verticalmente.
          Con 4+ ítems el modal activa scroll y el último queda cortado como hint visual.
        </p>

        {/* ── 00: Tipos de actividad ── */}
        <p className="am-section-label">00 — 4 tipos de actividad</p>
        <div className="am-grid" style={{ marginBottom: "80px" }}>
          {ACTIVITY_TYPES.map(function renderType(t) {
            return (
              <div key={t.category} className="am-slot">
                <div className="am-slot-wrap">
                  <div className="am-card am--clean">
                    <button type="button" className="am-x-inline" aria-label="Cerrar"><IconX size={10} /></button>
                    <ModalHeader count={t.count} category={t.category} />
                    <div className="am-items">
                      {t.items.map(t.renderItem)}
                    </div>
                  </div>
                </div>
                <p className="am-variant-label">{t.category}</p>
                <p className="am-variant-desc">{t.desc}</p>
                <p className="am-variant-note">{t.note}</p>
              </div>
            );
          })}
        </div>

        {/* ── 01: Comportamiento de scroll ── */}
        <p className="am-section-label">01 — Comportamiento de altura y scroll</p>
        <div className="am-grid-3" style={{ marginBottom: "80px" }}>
          {SCROLL_STATES.map(function renderScroll(s) {
            return (
              <div key={s.label} className="am-slot">
                <div className="am-slot-wrap">
                  <div className="am-card am--gradient">
                    <button type="button" className="am-x-inline" aria-label="Cerrar"><IconX size={10} /></button>
                    <ModalHeader count={s.items.length} category="Ganadas" />
                    <div className={s.scroll ? "am-items scroll" : "am-items"}>
                      {s.items.map(function renderItem(item, i) {
                        return <ItemConFecha key={i} item={item} />;
                      })}
                    </div>
                  </div>
                </div>
                <p className="am-variant-label">{s.label}</p>
                <p className="am-variant-desc">{s.desc}</p>
                <p className="am-variant-note">{s.note}</p>
              </div>
            );
          })}
        </div>

        {/* ── 02: Stroke variants ── */}
        <p className="am-section-label">02 — Variantes de stroke</p>
        <div className="am-grid-3" style={{ marginBottom: "80px" }}>
          {STROKE_VARIANTS.map(function renderStroke(v) {
            return (
              <div key={v.cls} className="am-slot">
                <div className="am-slot-wrap">
                  <div className={`am-card ${v.cls}`}>
                    <button type="button" className="am-x-inline" aria-label="Cerrar"><IconX size={10} /></button>
                    <ModalHeader count={1} category="Proceso de compra" />
                    <div className="am-items">
                      <ItemConFecha item={VEHICLE_DEFAULT} />
                    </div>
                  </div>
                </div>
                <p className="am-variant-label">{v.label}</p>
                <p className="am-variant-desc">{v.desc}</p>
                <p className="am-variant-note">{v.note}</p>
              </div>
            );
          })}
        </div>

        {/* ── 03: Close variants ── */}
        <p className="am-section-label">03 — Variantes de cierre (stroke C · gradient)</p>
        <div className="am-grid-3">
          {CLOSE_VARIANTS.map(function renderClose(v) {
            const closeX    = buildCloseX(v.closeType);
            const handleTop = buildHandleTop(v.closeType);
            const append    = buildAppend(v.closeType);
            return (
              <div key={v.label} className="am-slot">
                <div className="am-slot-wrap">
                  <div className="am-card am--gradient">
                    {closeX}
                    {handleTop}
                    <ModalHeader count={1} category="Consignaciones" />
                    <div className="am-items">
                      <ItemConsignacion item={VEHICLE_DEFAULT} />
                    </div>
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
