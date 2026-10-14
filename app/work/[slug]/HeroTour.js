"use client";

import { useEffect, useRef, useState } from "react";

// A hero visual that plays like a screen recording: the prototype runs inside a
// non-interactive frame while a fake cursor clicks through a short tour, then
// loops. The still `poster` shows until the prototype is ready (and stays for
// people who prefer reduced motion).
const W = 1440;
const H = 1120;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function HeroTour({ src, poster, alt }) {
  const boxRef = useRef(null);
  const frameRef = useRef(null);
  const cursorRef = useRef(null);
  const rippleRef = useRef(null);
  const [scale, setScale] = useState(0.6);
  const [ready, setReady] = useState(false);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!motionOk) return;
    const frame = frameRef.current;
    const box = boxRef.current;
    if (!frame || !box) return;

    let cancelled = false;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.15 });
    io.observe(box);

    // Pause the tour while the visual is off screen or the tab is hidden.
    const whenVisible = async () => {
      while (!cancelled && (!visible || document.hidden)) await sleep(300);
    };
    const wait = async (ms) => {
      const step = 100;
      for (let t = 0; t < ms && !cancelled; t += step) { await whenVisible(); await sleep(step); }
    };

    const doc = () => frame.contentDocument;
    const find = (test) =>
      [...(doc()?.querySelectorAll("button") || [])].find((b) => test((b.innerText || "").replace(/\s+/g, " ").trim()));

    const hideScrollbars = () => {
      const d = doc();
      if (!d || d.getElementById("hide-sb")) return;
      const st = d.createElement("style");
      st.id = "hide-sb";
      st.textContent = "*{scrollbar-width:none}*::-webkit-scrollbar{display:none}";
      d.head.appendChild(st);
    };

    const cursor = cursorRef.current;
    const ripple = rippleRef.current;
    const place = (x, y, ms) => {
      cursor.style.transition = `transform ${ms}ms cubic-bezier(.45,.05,.25,1), opacity .3s`;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
    };
    const moveTo = async (el, fx = 0.5, fy = 0.55) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const s = box.clientWidth / W;
      cursor.style.opacity = "1";
      place((r.left + r.width * fx) * s, (r.top + r.height * fy) * s, 900);
      await wait(1000);
    };
    const click = async (el) => {
      if (!el) return;
      const s = box.clientWidth / W;
      const r = el.getBoundingClientRect();
      ripple.style.transition = "none";
      ripple.style.transform = `translate(${(r.left + r.width * 0.5) * s}px, ${(r.top + r.height * 0.55) * s}px) scale(.2)`;
      ripple.style.opacity = "0.7";
      void ripple.offsetWidth;
      ripple.style.transition = "transform .5s ease-out, opacity .5s ease-out";
      ripple.style.transform = ripple.style.transform.replace("scale(.2)", "scale(1.4)");
      ripple.style.opacity = "0";
      el.click();
      await wait(350);
    };
    const nav = (label) => find((t) => t.startsWith(label));

    const tour = async () => {
      try {
        while (!cancelled) {
          await whenVisible();
          await click(nav("Dashboard"));
          cursor.style.opacity = "0";
          await wait(2800);

          await moveTo(nav("Saved Products"));
          await click(nav("Saved Products"));
          await wait(2800);

          const bell = find((t) => t === "4");
          await moveTo(bell);
          await click(bell);
          await wait(2600);
          await click(bell);
          await wait(500);

          await moveTo(nav("Quality Checks"));
          await click(nav("Quality Checks"));
          await wait(2200);

          const proceed = find((t) => t.startsWith("Proceed to scoring"));
          await moveTo(proceed);
          await click(proceed);
          await wait(2400);

          const review = find((t) => t.startsWith("Review & agreement"));
          await moveTo(review);
          await click(review);
          await wait(2400);

          await moveTo(nav("Dashboard"));
        }
      } catch {
        /* the prototype was unloaded; stop quietly */
      }
    };

    let started = false;
    const start = () => {
      if (started || cancelled) return;
      const d = doc();
      if (!d || d.readyState !== "complete") return;
      // Wait for the prototype's own runtime to render its menu.
      const poll = setInterval(() => {
        if (cancelled) return clearInterval(poll);
        if (nav("Saved Products")) {
          clearInterval(poll);
          started = true;
          hideScrollbars();
          setReady(true);
          tour();
        }
      }, 200);
    };
    frame.addEventListener("load", start);
    start();

    return () => {
      cancelled = true;
      io.disconnect();
      frame.removeEventListener("load", start);
    };
  }, [motionOk]);

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={alt}
      style={{
        position: "relative", width: "100%", aspectRatio: `${W} / ${H}`, overflow: "hidden",
        // Same blue as the prototype header, so no light edge can show at the top.
        background: "#2538D6",
      }}
    >
      <img src={poster} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: ready ? 0 : 1, transition: "opacity .5s ease" }} />
      {motionOk && (
        <>
          <iframe
            ref={frameRef}
            src={src}
            title={alt}
            tabIndex={-1}
            aria-hidden="true"
            scrolling="no"
            style={{
              position: "absolute", top: 0, left: 0, border: 0, width: `${W}px`, height: `${H}px`,
              transform: `scale(${scale})`, transformOrigin: "top left", pointerEvents: "none",
              opacity: ready ? 1 : 0, transition: "opacity .5s ease",
            }}
          />
          <div
            ref={rippleRef}
            aria-hidden="true"
            style={{
              position: "absolute", left: -14, top: -14, width: 28, height: 28, borderRadius: "50%",
              background: "rgba(37,56,214,.5)", opacity: 0, pointerEvents: "none",
            }}
          />
          <svg
            ref={cursorRef}
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            style={{ position: "absolute", left: 0, top: 0, opacity: 0, pointerEvents: "none", filter: "drop-shadow(0 2px 3px rgba(0,0,0,.35))" }}
          >
            <path d="M5 3l14 8-6 1.5L10.5 19 5 3z" fill="#1C1917" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </>
      )}
    </div>
  );
}
