"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CaseStudyTimeline.module.css";

// Horizontal process timeline: one linear row, each part as long as its
// `weight` (default 1). Give a stage a bigger weight in works.js to make it a
// longer chunk. Click (or hover) a label to read its description below.
export default function CaseStudyTimeline({
  stages,
  defaultStageId,
  ariaLabel = "Project timeline",
}) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(defaultStageId ?? stages[0]?.id);
  const [hoverId, setHoverId] = useState(null);
  const activeId = hoverId ?? selectedId;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = stages.find((s) => s.id === activeId) ?? stages[0];
  const blockCols = stages.map((s) => `${s.weight ?? 1}fr`).join(" ");

  return (
    <div ref={rootRef} className={`${styles.root} ${visible ? styles.visible : ""}`}>
      <div className={styles.scroller}>
        <div className={styles.canvas} role="group" aria-label={ariaLabel}>
          <div className={styles.track} style={{ gridTemplateColumns: blockCols }}>
            {stages.map((st, i) => (
              <button
                key={st.id}
                type="button"
                className={`${styles.block} ${st.id === active.id ? styles.blockActive : ""}`}
                style={{ transitionDelay: visible ? `${i * 0.07}s` : "0s" }}
                aria-pressed={st.id === selectedId}
                onClick={() => setSelectedId(st.id)}
                onMouseEnter={() => setHoverId(st.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(st.id)}
                onBlur={() => setHoverId(null)}
              >
                <span className={styles.segment} />
                <span className={styles.blockLabel}>{st.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.detail} aria-live="polite">
        <h3 className={styles.detailTitle}>{active.label}</h3>
        <p className={styles.detailSummary}>{active.summary}</p>
        {active.outputs?.length ? (
          <ul className={styles.outputs}>
            {active.outputs.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
