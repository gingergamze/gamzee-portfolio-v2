"use client";

import { useEffect, useRef, useState } from "react";

// Shows a prototype on a desktop-sized screen. The prototype is
// rendered at a fixed desktop-width size and scaled to fit the page width, so it
// always appears full size with no scrollbar beside it.
const DESKTOP_W = 1440;
// Tall enough that the prototype's pages show in full, so no inner scrolling.
const DESKTOP_H = 1120;

// The prototype is same-origin, so its own scrollbars can be hidden (it still
// scrolls with the wheel / trackpad).
function hideScrollbars(frame) {
  try {
    const doc = frame?.contentDocument;
    if (!doc || doc.getElementById("hide-sb")) return;
    const st = doc.createElement("style");
    st.id = "hide-sb";
    st.textContent = "*{scrollbar-width:none}*::-webkit-scrollbar{display:none}";
    doc.head.appendChild(st);
  } catch {}
}

// Palette icon used on the "design decision" markers.
function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "block", margin: "0 auto" }}>
      <path d="M12 21a9 9 0 0 1 0-18c4.97 0 9 3.582 9 8 0 1.06-.474 2.078-1.318 2.828-.844.75-1.989 1.172-3.182 1.172h-2.5a2 2 0 0 0-1 3.75A1.3 1.3 0 0 1 12 21" />
      <circle cx="7.5" cy="10.5" r=".5" />
      <circle cx="12" cy="7.5" r=".5" />
      <circle cx="16.5" cy="10.5" r=".5" />
    </svg>
  );
}

export default function PrototypeFrame({ src, title, type = "embed", hotspots = [], height = DESKTOP_H }) {
  const boxRef = useRef(null);
  const frameRef = useRef(null);
  const [scale, setScale] = useState(0.6);
  const [openIdx, setOpenIdx] = useState(null);
  const [narrow, setNarrow] = useState(false);
  const [zoomSrc, setZoomSrc] = useState(null);
  const open = openIdx === null ? null : hotspots[openIdx];

  // The iframe can finish loading before React hydrates, so onLoad may be
  // missed — apply once on mount as well.
  useEffect(() => {
    const f = frameRef.current;
    if (f && f.contentDocument?.readyState === "complete") hideScrollbars(f);
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => { setScale(el.clientWidth / DESKTOP_W); setNarrow(el.clientWidth < 700); };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const frameSrc =
    type === "figma"
      ? `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(src)}`
      : src;

  return (
    <div
      ref={boxRef}
      style={{
        position: "relative", width: "100%", height: `${height * scale}px`,
        overflow: "hidden", borderRadius: "24px", isolation: "isolate",
        // Matches the prototype's own header and page colours, so no white
        // shows at the rounded corners or sub-pixel edges.
        background: `linear-gradient(180deg, #2538D6 ${60 * scale}px, #EEF1F8 ${60 * scale}px)`,
      }}
    >
      {hotspots.map((h, i) => (
        <button
          key={h.title}
          type="button"
          aria-label={`Design decision: ${h.title}`}
          onClick={() => setOpenIdx(openIdx === i ? null : i)}
          className="proto-dot"
          style={{
            position: "absolute", zIndex: 2, width: 28, height: 28, marginLeft: -14, marginTop: -14,
            left: `${(h.x / DESKTOP_W) * 100}%`, top: `${h.y * scale}px`,
            borderRadius: "50%", border: "2px solid #fff", cursor: "pointer",
            background: openIdx === i ? "#1C1917" : "#d04d03", color: "#fff",
            fontFamily: "var(--font-work-sans)", fontWeight: 700, fontSize: 13, padding: 0,
            boxShadow: "0 3px 12px rgba(0,0,0,.35)",
          }}
        >
          <DotIcon />
        </button>
      ))}
      <style>{`@keyframes protoPulse{0%{box-shadow:0 0 0 0 rgba(208,77,3,.55)}100%{box-shadow:0 0 0 14px rgba(208,77,3,0)}}.proto-dot{animation:protoPulse 1.8s ease-out infinite}`}</style>
      {open && (
        <div
          role="dialog"
          aria-label={open.title}
          style={{
            position: narrow ? "fixed" : "absolute", zIndex: 60, cursor: "default",
            width: narrow ? "calc(100vw - 24px)" : open.wide ? "min(820px, 88%)" : "min(380px, 46%)",
            ...(narrow
              ? { left: 12, bottom: 84 }
              : open.wide
              ? { top: 12, left: "50%", transform: "translateX(-50%)" }
              : {
                  top: Math.max(12, Math.min(open.y * scale - 20, height * scale - 24)),
                  ...(open.x > DESKTOP_W / 2 ? { right: `${(1 - open.x / DESKTOP_W) * 100 + 3}%` } : { left: `${(open.x / DESKTOP_W) * 100 + 3}%` }),
                }),
            maxHeight: narrow ? "60vh" : "calc(100% - 24px)", overflowY: "auto",
            background: "#FCF7EB", color: "#1C1917", borderRadius: 18, padding: 22,
            boxShadow: "0 18px 50px rgba(0,0,0,.35)", fontFamily: "var(--font-work-sans)",
          }}
        >
          <button type="button" aria-label="Close" onClick={() => setOpenIdx(null)} style={{
            position: "absolute", top: 10, right: 12, border: 0, background: "none", cursor: "pointer",
            fontSize: 22, lineHeight: 1, color: "#7c756e",
          }}>×</button>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#d04d03", marginBottom: 6 }}>
            Design decision
          </div>
          <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.02em", paddingRight: 20 }}>
            {open.title}
          </h3>
          <p style={{ margin: "0 0 14px", fontSize: 15, lineHeight: 1.6, color: "#554E48" }}>{open.why}</p>
          {open.before !== undefined && (
            <figure style={{ margin: 0 }}>
              {open.before ? (
                <img src={open.before} alt={`Old design: ${open.title}`} onClick={() => setZoomSrc(open.before)} title="Click to enlarge" style={{ display: "block", width: "100%", borderRadius: 10, border: "1px solid rgba(28,25,23,.12)", cursor: "zoom-in" }} />
              ) : (
                <div style={{
                  height: 90, borderRadius: 10, border: "1.5px dashed rgba(28,25,23,.3)", display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: 13, color: "#7c756e",
                }}>Old design image goes here</div>
              )}
              <figcaption style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: "#7c756e" }}>Old design</figcaption>
            </figure>
          )}
        </div>
      )}
      {zoomSrc && (
        <div
          onClick={() => setZoomSrc(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 100, background: "rgba(10,10,20,.85)", cursor: "zoom-out",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          }}
        >
          <img src={zoomSrc} alt="Old design, enlarged" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 12 }} />
        </div>
      )}
      <iframe
        ref={frameRef}
        src={frameSrc}
        title={title}
        allowFullScreen
        scrolling="no"
        onLoad={(e) => hideScrollbars(e.currentTarget)}
        style={{
          position: "absolute", top: 0, left: 0, border: 0,
          width: `${DESKTOP_W}px`, height: `${height}px`,
          transform: `scale(${scale})`, transformOrigin: "top left",
        }}
      />
    </div>
  );
}
