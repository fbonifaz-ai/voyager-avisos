"use client";

/**
 * HistorialModal — preview de variantes
 * Modal de historial de compras del usuario.
 * Se abre desde "Historial ›" en la zona del usuario.
 *
 * Dimensiones canónicas: 530 × auto px (crece con ítems, scroll al superar ~480px)
 *
 * Estados dinámicos:
 *   · empty   → "Sin registro de compras"
 *   · few     → 1-3 ítems (altura fija)
 *   · many    → 4+ ítems (scroll interno)
 *
 * Mapeo de close variants — 1:1 con AG / NM / IM:
 *   AG-B / NM-I  / IM-I   →  HM-I   · Header inline X
 *   AG-C / NM-II / IM-II  →  HM-II  · Handle + hint
 *   AG-D / NM-III/ IM-III →  HM-III · Ghost link "Cerrar"
 *   AG-E / NM-IV / IM-IV  →  HM-IV  · Botón "Cerrar" footer
 *   AG-F / NM-V  / IM-V   →  HM-V   · X gradient ring
 */

import { useState } from "react";
import type { JSX } from "react";

const CSS = `
  /* ── Base card ── */
  .hm-card {
    width: 530px;
    border-radius: var(--vmc-radius-lg);
    background: var(--vmc-color-base-white);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  /* ── Header (título + brackets naranja) ── */
  .hm-header {
    padding: 28px 24px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-shrink: 0;
  }
  .hm-title-wrap {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;
  }
  .hm-bracket {
    color: var(--vmc-color-orange-600);
    font-size: 16px;
    line-height: 1;
    font-weight: 700;
    opacity: 0.85;
    user-select: none;
  }
  .hm-title {
    font-family: var(--vmc-font-display);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--vmc-color-vault-700);
    margin: 0;
  }

  /* ── Tabs OFERTA / FECHA ── */
  .hm-tabs {
    display: flex;
    flex-shrink: 0;
    border-bottom: none;
  }
  .hm-tab {
    flex: 1;
    height: 48px;
    border: none;
    cursor: pointer;
    font-family: var(--vmc-font-display);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--vmc-color-base-white);
    background: var(--vmc-color-vault-700);
    transition: background 0.15s ease;
  }
  .hm-tab:first-child {
    border-right: 1px solid rgb(100% 100% 100% / 0.12);
  }
  .hm-tab.active {
    background: var(--vmc-color-vault-600);
  }
  .hm-tab:hover:not(.active) {
    background: var(--vmc-color-vault-800);
  }

  /* ── Lista de ítems ── */
  .hm-list {
    flex: 1;
    overflow-y: auto;
    /* scroll suave, ocultar scrollbar en webkit */
    scrollbar-width: thin;
    scrollbar-color: var(--vmc-color-neutral-400) transparent;
  }
  .hm-list::-webkit-scrollbar { width: 4px; }
  .hm-list::-webkit-scrollbar-track { background: transparent; }
  .hm-list::-webkit-scrollbar-thumb { background: var(--vmc-color-neutral-400); border-radius: 2px; }

  .hm-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px;
    cursor: pointer;
    transition: background 0.1s ease;
    border-bottom: 1px solid var(--vmc-color-neutral-200);
  }
  .hm-item:last-child { border-bottom: none; }
  .hm-item:nth-child(odd)  { background: var(--vmc-color-base-white); }
  .hm-item:nth-child(even) { background: var(--vmc-color-neutral-100); }
  .hm-item:hover { background: var(--vmc-color-vault-100); }

  .hm-item-left { display: flex; flex-direction: column; gap: 2px; }
  .hm-item-vehicle {
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--vmc-color-vault-700);
    line-height: 1.3;
  }
  .hm-item-company {
    font-family: var(--vmc-font-display);
    font-size: 12px;
    font-weight: 400;
    color: var(--vmc-color-neutral-700);
    line-height: 1;
  }
  .hm-item-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .hm-item-date {
    font-family: 'Roboto Mono', monospace;
    font-size: 13px;
    font-weight: 400;
    font-variant-numeric: tabular-nums;
    color: var(--vmc-color-neutral-800);
    white-space: nowrap;
  }
  .hm-item-arrow {
    color: var(--vmc-color-orange-600);
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
  }

  /* ── Estado vacío ── */
  .hm-empty {
    padding: 40px 24px;
    text-align: center;
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 400;
    color: var(--vmc-color-neutral-700);
    background: var(--vmc-color-neutral-100);
  }

  /* ── Altura máxima para scroll (estado "many") ── */
  .hm-list.scrollable { max-height: 360px; }

  /* ─────────────────────────────────────────────
     CLOSE VARIANTS — mismos patrones que AG/NM/IM
  ───────────────────────────────────────────── */

  /* HM-I ↔ AG-B · X inline neutral */
  .hm-x-inline {
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
    z-index: 2;
  }
  .hm-x-inline:hover { background: var(--vmc-color-vault-100); color: var(--vmc-color-vault-600); }

  /* HM-II ↔ AG-C · Handle + hint */
  .hm-handle {
    width: 36px; height: 4px;
    border-radius: 9999px;
    background: var(--vmc-color-neutral-400);
    margin: 0 auto 4px;
    cursor: grab; flex-shrink: 0;
  }
  .hm-close-hint {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 500;
    color: var(--vmc-color-neutral-600);
    padding: 10px 0 14px;
    display: flex; align-items: center; justify-content: center; gap: 4px;
    flex-shrink: 0;
    border-top: 1px solid var(--vmc-color-neutral-200);
  }

  /* HM-III ↔ AG-D · Ghost link */
  .hm-close-link {
    font-family: var(--vmc-font-display);
    font-size: 13px; font-weight: 500;
    color: var(--vmc-color-vault-600);
    background: none; border: none;
    cursor: pointer;
    padding: 12px 24px;
    align-self: center;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: var(--vmc-color-vault-300);
    transition: color 0.15s, text-decoration-color 0.15s;
    flex-shrink: 0;
  }
  .hm-close-link:hover { color: var(--vmc-color-vault-800); }

  /* HM-IV ↔ AG-E · Botón footer "Cerrar" */
  .hm-close-btn {
    margin: 0;
    padding: 14px 24px;
    border: none;
    border-top: 1px solid var(--vmc-color-neutral-200);
    background: var(--vmc-color-neutral-100);
    cursor: pointer;
    font-family: var(--vmc-font-display);
    font-size: 13px;
    font-weight: 600;
    color: var(--vmc-color-vault-700);
    letter-spacing: 0.5px;
    text-align: center;
    transition: background 0.15s, color 0.15s;
    flex-shrink: 0;
  }
  .hm-close-btn:hover { background: var(--vmc-color-vault-100); color: var(--vmc-color-vault-900); }

  /* HM-V ↔ AG-F · X gradient ring */
  .hm-x-gradient {
    position: absolute;
    top: 16px; right: 16px;
    width: 28px; height: 28px;
    border-radius: 50%;
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
    transition: box-shadow 0.2s ease, transform 0.15s ease;
  }
  .hm-x-gradient:hover { box-shadow: 0 3px 12px rgb(51.76% 37.65% 89.8% / 0.30); transform: scale(1.08); }

  /* ── Stroke variants ── */
  .hm--clean    { box-shadow: var(--vmc-shadow-md); }
  .hm--vault    { border: 1.5px solid var(--vmc-color-vault-500); box-shadow: var(--vmc-shadow-sm); }
  .hm--gradient {
    border: 2px solid transparent;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: var(--vmc-shadow-sm);
  }
  .hm--vault-dark {
    border: 2px solid var(--vmc-color-vault-700);
    box-shadow: 0 4px 16px rgb(13.33% 0% 36.08% / 0.12);
  }
  .hm--accent-top {
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
  .hm-root {
    min-height: 100vh;
    background: var(--vmc-color-neutral-200);
    padding: 48px 32px 72px;
    display: flex; flex-direction: column; align-items: center;
  }
  .hm-eyebrow {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 700;
    letter-spacing: 1.8px; text-transform: uppercase;
    color: var(--vmc-color-neutral-700); margin-bottom: 6px;
  }
  .hm-page-title {
    font-family: var(--vmc-font-display);
    font-size: 24px; font-weight: 700;
    color: var(--vmc-color-neutral-1100); margin-bottom: 6px;
  }
  .hm-page-sub {
    font-family: var(--vmc-font-display);
    font-size: 13px; color: var(--vmc-color-neutral-700);
    margin-bottom: 48px; text-align: center;
    max-width: 560px; line-height: 1.6;
  }
  .hm-states-row {
    display: flex; gap: 32px; align-items: flex-start;
    margin-bottom: 72px; flex-wrap: wrap; justify-content: center;
  }
  .hm-state-label {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 700;
    letter-spacing: 1.2px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800); margin-top: 10px; text-align: center;
  }
  .hm-state-note {
    font-family: var(--vmc-font-display);
    font-size: 11px; color: var(--vmc-color-neutral-600);
    text-align: center; max-width: 540px; margin-top: 3px;
  }
  .hm-section-label {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800);
    margin-bottom: 40px; align-self: flex-start;
    padding-left: 20px; display: flex; align-items: center; gap: 12px;
  }
  .hm-section-label::after {
    content: ''; height: 1px; width: 200px;
    background: var(--vmc-color-neutral-400); display: inline-block;
  }
  .hm-grid {
    display: grid;
    grid-template-columns: repeat(2, 580px);
    gap: 48px 40px;
    justify-items: center; align-items: start;
    margin-bottom: 72px;
  }
  @media (max-width: 1220px) { .hm-grid { grid-template-columns: 1fr; } }
  .hm-slot { display: flex; flex-direction: column; align-items: center; }
  .hm-slot-wrap { position: relative; padding: 16px; }
  .hm-variant-label {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 700;
    letter-spacing: 1.2px; text-transform: uppercase;
    color: var(--vmc-color-neutral-800); margin-top: 8px; text-align: center;
  }
  .hm-variant-desc {
    font-family: var(--vmc-font-display);
    font-size: 12px; color: var(--vmc-color-neutral-600);
    text-align: center; max-width: 540px; line-height: 1.6; margin-top: 4px;
  }
  .hm-variant-note {
    font-family: var(--vmc-font-display);
    font-size: 11px; font-weight: 600;
    color: var(--vmc-color-vault-600); margin-top: 4px; text-align: center;
  }
  .hm-ag-ref {
    font-family: var(--vmc-font-display);
    font-size: 10px; font-weight: 500;
    color: var(--vmc-color-neutral-500); margin-top: 3px; text-align: center;
  }
`;

/* ── Datos de ejemplo ── */
const ITEMS_FEW = [
  { vehicle: "Toyota Hilux",   company: "Pacífico",   date: "02/06/2026" },
  { vehicle: "Toyota Hilux",   company: "Mapfre",     date: "18/05/2026" },
];
const ITEMS_MANY = [
  { vehicle: "Hino Dutro",          company: "BCP",                  date: "14/08/2025" },
  { vehicle: "Hyundai H100",        company: "Empresa de Retail",    date: "31/10/2024" },
  { vehicle: "Hyundai H-100 Truck", company: "World Visión Peru",    date: "18/09/2023" },
  { vehicle: "Honda XL 200",        company: "World Visión Peru",    date: "06/09/2023" },
  { vehicle: "DFSK K 01 Minitruck", company: "Universidad Peruana",  date: "10/04/2023" },
  { vehicle: "Baw INCAPOWER DC42",  company: "Empresa de Retail",    date: "06/07/2022" },
  { vehicle: "Toyota Hilux",        company: "Master Drilling Perú", date: "16/08/2018" },
  { vehicle: "Nissan Frontier",     company: "Empresa Industrial",   date: "15/08/2018" },
];

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

/* ── Tabs ── */
function Tabs(): JSX.Element {
  const [active, setActive] = useState<"oferta" | "fecha">("oferta");
  return (
    <div className="hm-tabs">
      <button
        type="button"
        className={active === "oferta" ? "hm-tab active" : "hm-tab"}
        onClick={function handleOferta() { setActive("oferta"); }}
      >
        Oferta
      </button>
      <button
        type="button"
        className={active === "fecha" ? "hm-tab active" : "hm-tab"}
        onClick={function handleFecha() { setActive("fecha"); }}
      >
        Fecha
      </button>
    </div>
  );
}

/* ── Lista de ítems ── */
interface HistorialItem { vehicle: string; company: string; date: string; }
function ItemList({ items, scrollable = false }: { items: HistorialItem[]; scrollable?: boolean }): JSX.Element {
  return (
    <div className={scrollable ? "hm-list scrollable" : "hm-list"}>
      {items.map(function renderItem(item, i) {
        return (
          <div key={`${item.vehicle}-${i}`} className="hm-item">
            <div className="hm-item-left">
              <span className="hm-item-vehicle">{item.vehicle}</span>
              <span className="hm-item-company">{item.company}</span>
            </div>
            <div className="hm-item-right">
              <span className="hm-item-date">{item.date}</span>
              <span className="hm-item-arrow" aria-hidden>›</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Header del modal ── */
function ModalHeader(): JSX.Element {
  return (
    <div className="hm-header">
      <div className="hm-title-wrap">
        <span className="hm-bracket" aria-hidden>┌</span>
        <p className="hm-title">Tu historial</p>
        <span className="hm-bracket" aria-hidden>┘</span>
      </div>
    </div>
  );
}

/* ── Estados de datos — Sección 0 ── */
function StateShowcase(): JSX.Element {
  return (
    <div className="hm-states-row">
      {/* Estado: vacío */}
      <div className="hm-slot">
        <div className="hm-slot-wrap">
          <div className="hm-card hm--clean">
            <button type="button" className="hm-x-inline" aria-label="Cerrar"><IconX size={10} /></button>
            <ModalHeader />
            <Tabs />
            <div className="hm-empty">Sin registro de compras</div>
          </div>
        </div>
        <p className="hm-state-label">Estado vacío</p>
        <p className="hm-state-note">Sin ofertas registradas</p>
      </div>

      {/* Estado: pocos ítems */}
      <div className="hm-slot">
        <div className="hm-slot-wrap">
          <div className="hm-card hm--clean">
            <button type="button" className="hm-x-inline" aria-label="Cerrar"><IconX size={10} /></button>
            <ModalHeader />
            <Tabs />
            <ItemList items={ITEMS_FEW} />
          </div>
        </div>
        <p className="hm-state-label">1–3 ofertas</p>
        <p className="hm-state-note">Altura compacta sin scroll</p>
      </div>

      {/* Estado: muchos ítems */}
      <div className="hm-slot">
        <div className="hm-slot-wrap">
          <div className="hm-card hm--clean">
            <button type="button" className="hm-x-inline" aria-label="Cerrar"><IconX size={10} /></button>
            <ModalHeader />
            <Tabs />
            <ItemList items={ITEMS_MANY} scrollable />
          </div>
        </div>
        <p className="hm-state-label">4+ ofertas</p>
        <p className="hm-state-note">Scroll interno · max-height 360px</p>
      </div>
    </div>
  );
}

/* ── Stroke variants ── */
const STROKE_VARIANTS = [
  { cls: "hm--clean",     label: "A · Clean shadow",    desc: "Shadow-md sin borde. El overlay delimita el modal.", note: "Máxima ligereza" },
  { cls: "hm--vault",     label: "B · Vault stroke",    desc: "Borde sólido vault-500 1.5px. Lenguaje ghost/secondary.", note: "Sobrio · coherente" },
  { cls: "hm--gradient",  label: "C · Gradient border", desc: "Borde 2px naranja→vault. Mismo patrón AG / NM / IM.", note: "↑ Recomendado · sistema unificado" },
  { cls: "hm--vault-dark",label: "D · Vault dark",      desc: "Borde vault-700 2px + sombra tintada. Más autoritativo.", note: "Peso visual mayor" },
  { cls: "hm--accent-top",label: "E · Top accent",      desc: "Línea superior 3px naranja→vault. Estilo alerta institucional.", note: "Sutil · sin borde completo" },
];

/* ── Close variants ── */
interface CloseVar {
  label: string; desc: string; note: string; agRef: string;
  closeSlot: "inline" | "gradient" | "link" | "btn" | "handle";
}
const CLOSE_VARIANTS: CloseVar[] = [
  { label: "I · Header inline X",    desc: "X círculo neutral 28px top-right. Sin texto. Mismo patrón AG-B / NM-I / IM-I.",      note: "Sin overflow · aria-label", agRef: "≡ AG-B · NM-I · IM-I"   },
  { label: "II · Handle + hint",      desc: "Barra de arrastre top + hint al pie. Mismo patrón AG-C / NM-II / IM-II.",            note: "↑ Mobile-first · gesto",     agRef: "≡ AG-C · NM-II · IM-II"  },
  { label: "III · Ghost link",        desc: '"Cerrar" como link vault al pie de la lista. Mismo patrón AG-D / NM-III / IM-III.',   note: "↑ Mínima fricción",          agRef: "≡ AG-D · NM-III · IM-III" },
  { label: "IV · Footer 'Cerrar'",    desc: 'Franja de cierre al pie, separada de la lista. Coherente con el header de tabs.',     note: "↑ Cierre explícito · limpio",agRef: "≡ AG-E · NM-IV · IM-IV"  },
  { label: "V · X gradient ring",     desc: "X con borde naranja→vault, espeja el card. Hover: scale + glow. Mismo patrón AG-F.", note: "↑ Máxima cohesión DS",       agRef: "≡ AG-F · NM-V · IM-V"    },
];

function buildCloseVariant(v: CloseVar): JSX.Element {
  const isHandle = v.closeSlot === "handle";
  return (
    <div className="hm-card hm--gradient">
      {v.closeSlot === "inline"   && <button type="button" className="hm-x-inline"   aria-label="Cerrar"><IconX size={10} /></button>}
      {v.closeSlot === "gradient" && <button type="button" className="hm-x-gradient" aria-label="Cerrar"><IconX size={10} /></button>}
      {isHandle && <div style={{ padding: "12px 0 0" }}><div className="hm-handle" role="presentation" /></div>}
      <ModalHeader />
      <Tabs />
      <ItemList items={ITEMS_FEW} />
      {v.closeSlot === "link"   && <button type="button" className="hm-close-link">Cerrar</button>}
      {v.closeSlot === "btn"    && <button type="button" className="hm-close-btn">Cerrar</button>}
      {isHandle && <div className="hm-close-hint"><IconTap />&nbsp;Toca afuera para cerrar</div>}
    </div>
  );
}

export default function HistorialModalPage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hm-root">

        <p className="hm-eyebrow">HistorialModal</p>
        <p className="hm-page-title">Variantes de stroke, cierre y estados</p>
        <p className="hm-page-sub">
          Modal de historial de compras · 530px × auto · Crece dinámicamente con las ofertas del user.
          Scroll interno al superar 4+ ítems. Close variants alineadas 1:1 con AG / NM / IM.
        </p>

        {/* ── Sección 0: Estados dinámicos ── */}
        <p className="hm-section-label">00 — Estados dinámicos</p>
        <StateShowcase />

        {/* ── Sección 1: Stroke variants ── */}
        <p className="hm-section-label">01 — Variantes de stroke</p>
        <div className="hm-grid" style={{ marginBottom: "80px" }}>
          {STROKE_VARIANTS.map(function renderStroke(v) {
            return (
              <div key={v.cls} className="hm-slot">
                <div className="hm-slot-wrap">
                  <div className={`hm-card ${v.cls}`}>
                    <button type="button" className="hm-x-inline" aria-label="Cerrar"><IconX size={10} /></button>
                    <ModalHeader />
                    <Tabs />
                    <ItemList items={ITEMS_FEW} />
                  </div>
                </div>
                <p className="hm-variant-label">{v.label}</p>
                <p className="hm-variant-desc">{v.desc}</p>
                <p className="hm-variant-note">{v.note}</p>
              </div>
            );
          })}
        </div>

        {/* ── Sección 2: Close variants ── */}
        <p className="hm-section-label">02 — Variantes de cierre (stroke C · gradient)</p>
        <div className="hm-grid">
          {CLOSE_VARIANTS.map(function renderClose(v) {
            return (
              <div key={v.label} className="hm-slot">
                <div className="hm-slot-wrap">
                  {buildCloseVariant(v)}
                </div>
                <p className="hm-variant-label">{v.label}</p>
                <p className="hm-variant-desc">{v.desc}</p>
                <p className="hm-variant-note">{v.note}</p>
                <p className="hm-ag-ref">{v.agRef}</p>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}
