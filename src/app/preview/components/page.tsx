import type { JSX } from "react";
import Link from "next/link";

/**
 * /preview/components — Landing de componentes Voyager DS
 * Índice de variantes de modales y avisos construidos.
 */

const CSS = `
  @property --lp-angle  { syntax: '<angle>'; inherits: false; initial-value: 135deg; }
  @property --lp-stop-a { syntax: '<color>'; inherits: false; initial-value: oklch(0.72 0.16 55); }
  @property --lp-stop-b { syntax: '<color>'; inherits: false; initial-value: oklch(0.55 0.22 285); }

  /* ── Page ── */
  .lp-root {
    min-height: 100vh;
    background: var(--vmc-color-neutral-200);
    display: flex;
    flex-direction: column;
  }

  /* ── Hero ── */
  .lp-hero {
    background: linear-gradient(135deg, var(--vmc-color-vault-900) 0%, var(--vmc-color-vault-700) 100%);
    padding: 56px 48px 52px;
    position: relative;
    overflow: hidden;
  }
  .lp-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 600px 400px at 80% 50%, oklch(0.65 0.18 195 / 0.08) 0%, transparent 70%),
      radial-gradient(ellipse 400px 300px at 10% 80%, oklch(0.72 0.16 55 / 0.10) 0%, transparent 60%);
    pointer-events: none;
  }
  .lp-hero-eyebrow {
    font-family: var(--vmc-font-display);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgb(100% 100% 100% / 0.45);
    margin: 0 0 12px;
  }
  .lp-hero-title {
    font-family: var(--vmc-font-display);
    font-size: 36px;
    font-weight: 700;
    color: var(--vmc-color-base-white);
    margin: 0 0 10px;
    line-height: 1.15;
  }
  .lp-hero-title span {
    background: linear-gradient(90deg, var(--vmc-color-orange-500) 0%, var(--vmc-color-cyan-400) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .lp-hero-sub {
    font-family: var(--vmc-font-display);
    font-size: 15px;
    font-weight: 400;
    color: rgb(100% 100% 100% / 0.60);
    margin: 0 0 32px;
    max-width: 520px;
    line-height: 1.6;
  }
  .lp-hero-pills {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .lp-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 28px;
    padding: 0 12px;
    border-radius: var(--vmc-radius-full);
    border: 1px solid rgb(100% 100% 100% / 0.18);
    background: rgb(100% 100% 100% / 0.08);
    font-family: var(--vmc-font-display);
    font-size: 11px;
    font-weight: 600;
    color: rgb(100% 100% 100% / 0.70);
    white-space: nowrap;
  }
  .lp-pill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  /* ── Main ── */
  .lp-main {
    flex: 1;
    padding: 52px 48px 72px;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .lp-section-eyebrow {
    font-family: var(--vmc-font-display);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: var(--vmc-color-neutral-700);
    margin-bottom: 6px;
  }
  .lp-section-title {
    font-family: var(--vmc-font-display);
    font-size: 22px;
    font-weight: 700;
    color: var(--vmc-color-neutral-1100);
    margin-bottom: 32px;
  }

  /* ── Grid de cards ── */
  .lp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  @media (max-width: 1100px) { .lp-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 700px)  { .lp-grid { grid-template-columns: 1fr; } }

  /* ── Component card ── */
  .lp-card {
    border-radius: var(--vmc-radius-lg);
    background: var(--vmc-color-base-white);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 2px solid transparent;
    background-image:
      linear-gradient(var(--vmc-color-base-white), var(--vmc-color-base-white)),
      linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-vault-500) 100%);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow: var(--vmc-shadow-sm);
    transition: box-shadow 0.2s ease, transform 0.15s ease;
    text-decoration: none;
  }
  .lp-card:hover {
    box-shadow: var(--vmc-shadow-md), 0 0 0 1px var(--vmc-color-vault-400);
    transform: translateY(-2px);
  }

  /* Franja top de color por flujo */
  .lp-card-stripe {
    height: 4px;
    width: 100%;
    flex-shrink: 0;
  }

  .lp-card-body {
    padding: 24px 24px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .lp-card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 4px;
  }
  .lp-card-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--vmc-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
  }
  .lp-card-name {
    font-family: var(--vmc-font-display);
    font-size: 16px;
    font-weight: 700;
    color: var(--vmc-color-vault-800);
    margin: 0;
    line-height: 1.2;
  }
  .lp-card-trigger {
    font-family: var(--vmc-font-display);
    font-size: 11px;
    font-weight: 500;
    color: var(--vmc-color-neutral-600);
    margin: 0;
    line-height: 1.3;
  }
  .lp-card-desc {
    font-family: var(--vmc-font-display);
    font-size: 13px;
    font-weight: 400;
    color: var(--vmc-color-neutral-800);
    line-height: 1.6;
    margin: 0;
    flex: 1;
  }
  .lp-card-footer {
    padding: 14px 24px;
    border-top: 1px solid var(--vmc-color-neutral-200);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--vmc-color-neutral-100);
    flex-shrink: 0;
  }
  .lp-card-meta {
    display: flex;
    gap: 16px;
  }
  .lp-meta-item {
    font-family: var(--vmc-font-display);
    font-size: 11px;
    font-weight: 600;
    color: var(--vmc-color-neutral-700);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .lp-meta-num {
    font-size: 13px;
    font-weight: 700;
    color: var(--vmc-color-vault-700);
  }
  .lp-card-cta {
    font-family: var(--vmc-font-display);
    font-size: 12px;
    font-weight: 700;
    color: var(--vmc-color-vault-600);
    display: flex;
    align-items: center;
    gap: 4px;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  /* ── Tags de flujo ── */
  .lp-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .lp-tag {
    display: inline-flex;
    align-items: center;
    height: 20px;
    padding: 0 8px;
    border-radius: var(--vmc-radius-full);
    font-family: var(--vmc-font-display);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }
  .lp-tag-orange { background: rgb(92.94% 53.73% 21.18% / 0.12); color: var(--vmc-color-orange-700); }
  .lp-tag-vault  { background: rgb(51.76% 37.65% 89.8% / 0.12); color: var(--vmc-color-vault-600); }
  .lp-tag-cyan   { background: rgb(0% 79.22% 80.78% / 0.12); color: var(--vmc-color-cyan-800); }
  .lp-tag-neutral{ background: var(--vmc-color-neutral-300); color: var(--vmc-color-neutral-800); }
  .lp-tag-red    { background: rgb(93.73% 26.67% 26.67% / 0.10); color: var(--vmc-color-red-600); }
`;

/* ── Datos de componentes ── */
interface ComponentCard {
  name: string;
  trigger: string;
  desc: string;
  href: string;
  stripeColor: string;
  iconBg: string;
  icon: string;
  tags: { label: string; cls: string }[];
  strokes: number;
  closes: number;
  states?: number;
}

const COMPONENTS: ComponentCard[] = [
  {
    name:        "ActionGate",
    trigger:     "Botón → Participa (flujo subasta en vivo)",
    desc:        "Aviso de consentimiento y consignación previo a participar en una subasta en vivo. El user acepta el compromiso antes de ingresar.",
    href:        "/preview/components/action-gate",
    stripeColor: "linear-gradient(90deg, var(--vmc-color-orange-600), var(--vmc-color-vault-500))",
    iconBg:      "rgb(92.94% 53.73% 21.18% / 0.12)",
    icon:        "⚡",
    tags:        [{ label: "Subasta en vivo", cls: "lp-tag-orange" }, { label: "Consentimiento", cls: "lp-tag-neutral" }],
    strokes:     5,
    closes:      6,
  },
  {
    name:        "NegotiateModal",
    trigger:     "Botón → Negociar (flujo negociable)",
    desc:        "Modal de propuesta de compra en ofertas con negociación disponible. El user digita el monto — hasta 5 propuestas intercaladas con contra-propuestas.",
    href:        "/preview/components/negotiate-modal",
    stripeColor: "linear-gradient(90deg, var(--vmc-color-cyan-600), var(--vmc-color-vault-500))",
    iconBg:      "rgb(0% 79.22% 80.78% / 0.12)",
    icon:        "💬",
    tags:        [{ label: "Negociable", cls: "lp-tag-cyan" }, { label: "Input de monto", cls: "lp-tag-neutral" }, { label: "Propuesta 0/5", cls: "lp-tag-vault" }],
    strokes:     5,
    closes:      5,
  },
  {
    name:        "InfoModal",
    trigger:     "Ícono (i) → Puntos VMC",
    desc:        "Modal informativo de solo lectura. Caso canónico: explicación del sistema de Puntos VMC y niveles de riesgo. Sin CTA de acción.",
    href:        "/preview/components/info-modal",
    stripeColor: "linear-gradient(90deg, var(--vmc-color-vault-600), var(--vmc-color-vault-400))",
    iconBg:      "rgb(51.76% 37.65% 89.8% / 0.12)",
    icon:        "ℹ️",
    tags:        [{ label: "Informativo", cls: "lp-tag-vault" }, { label: "Solo lectura", cls: "lp-tag-neutral" }],
    strokes:     5,
    closes:      5,
  },
  {
    name:        "HistorialModal",
    trigger:     "Link → Historial (zona del usuario)",
    desc:        "Modal de historial de compras. Contenido dinámico: vacío, pocos ítems o scroll con muchos registros. Tabs Oferta / Fecha.",
    href:        "/preview/components/historial-modal",
    stripeColor: "linear-gradient(90deg, var(--vmc-color-vault-700), var(--vmc-color-orange-600))",
    iconBg:      "rgb(13.33% 0% 36.08% / 0.10)",
    icon:        "📋",
    tags:        [{ label: "Lista dinámica", cls: "lp-tag-vault" }, { label: "Tabs", cls: "lp-tag-neutral" }, { label: "Scroll", cls: "lp-tag-neutral" }],
    strokes:     5,
    closes:      5,
    states:      3,
  },
  {
    name:        "ActividadModal",
    trigger:     "Items → Tu Actividad (zona del usuario)",
    desc:        "Modal de detalle de actividad. Varía según el tipo: consignaciones activas, procesos de compra con deadline, u ofertas rechazadas.",
    href:        "/preview/components/actividad-modal",
    stripeColor: "linear-gradient(90deg, var(--vmc-color-orange-600), var(--vmc-color-red-500))",
    iconBg:      "rgb(92.94% 53.73% 21.18% / 0.12)",
    icon:        "🔔",
    tags:        [{ label: "Consignación", cls: "lp-tag-orange" }, { label: "Proceso compra", cls: "lp-tag-vault" }, { label: "Rechazada", cls: "lp-tag-red" }],
    strokes:     5,
    closes:      5,
    states:      3,
  },
];

/* ── Ícono flecha ── */
function IconArrow(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M2.5 6.5H10.5M7 3L10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ComponentsIndexPage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="lp-root">

        {/* ── Hero ── */}
        <header className="lp-hero">
          <p className="lp-hero-eyebrow">Voyager Design System · VMC Subastas</p>
          <h1 className="lp-hero-title">
            Avisos y <span>Modales</span>
          </h1>
          <p className="lp-hero-sub">
            Componentes de interacción transaccional para los flujos de usuario en VMC Subastas.
            Cada componente incluye variantes de stroke y cierre estandarizadas.
          </p>
          <div className="lp-hero-pills">
            <span className="lp-pill">
              <span className="lp-pill-dot" style={{ background: "var(--vmc-color-orange-500)" }} />
              5 componentes
            </span>
            <span className="lp-pill">
              <span className="lp-pill-dot" style={{ background: "var(--vmc-color-cyan-400)" }} />
              5 variantes de stroke c/u
            </span>
            <span className="lp-pill">
              <span className="lp-pill-dot" style={{ background: "var(--vmc-color-vault-400)" }} />
              Close variants I–V alineadas
            </span>
            <span className="lp-pill">
              <span className="lp-pill-dot" style={{ background: "var(--vmc-color-green-500)" }} />
              Plus Jakarta Sans · tokens vmc-*
            </span>
          </div>
        </header>

        {/* ── Grid ── */}
        <main className="lp-main">
          <p className="lp-section-eyebrow">Componentes</p>
          <h2 className="lp-section-title">Seleccioná un componente para ver sus variantes</h2>

          <div className="lp-grid">
            {COMPONENTS.map(function renderCard(c) {
              return (
                <Link key={c.href} href={c.href} className="lp-card">
                  <div className="lp-card-stripe" style={{ background: c.stripeColor }} />
                  <div className="lp-card-body">
                    <div className="lp-card-header">
                      <div className="lp-card-icon" style={{ background: c.iconBg }}>
                        {c.icon}
                      </div>
                      <div>
                        <p className="lp-card-name">{c.name}</p>
                        <p className="lp-card-trigger">{c.trigger}</p>
                      </div>
                    </div>
                    <p className="lp-card-desc">{c.desc}</p>
                    <div className="lp-tags">
                      {c.tags.map(function renderTag(t) {
                        return <span key={t.label} className={`lp-tag ${t.cls}`}>{t.label}</span>;
                      })}
                    </div>
                  </div>
                  <div className="lp-card-footer">
                    <div className="lp-card-meta">
                      <span className="lp-meta-item">
                        <span className="lp-meta-num">{c.strokes}</span> strokes
                      </span>
                      <span className="lp-meta-item">
                        <span className="lp-meta-num">{c.closes}</span> cierres
                      </span>
                      {c.states !== undefined && (
                        <span className="lp-meta-item">
                          <span className="lp-meta-num">{c.states}</span> estados
                        </span>
                      )}
                    </div>
                    <span className="lp-card-cta">
                      Ver variantes <IconArrow />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>

      </div>
    </>
  );
}
