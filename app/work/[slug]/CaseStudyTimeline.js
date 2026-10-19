"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CaseStudyTimeline.module.css";
import StoryBlock from "./StoryBlock";
import PhotoRow from "./PhotoRow";

// Horizontal process timeline: one linear row, each part as long as its
// `weight` (default 1). Give a stage a bigger weight in works.js to make it a
// longer chunk. Click (or hover) a label to read its description below.
export default function CaseStudyTimeline({
  stages,
  defaultStageId,
  ariaLabel = "Project timeline",
  renderAside,
}) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(defaultStageId ?? stages[0]?.id);
  // Hovering (or focusing) a stage selects it and it stays selected when the
  // pointer moves down to read, so no click is needed.
  const activeId = selectedId;

  useEffect(() => {
    // Watch the stage bar itself (not the whole section, which can be taller
    // than a phone screen and would never reach the visibility threshold).
    const el = barRef.current;
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = stages.find((s) => s.id === activeId) ?? stages[0];
  const blockCols = stages.map((s) => `${s.weight ?? 1}fr`).join(" ");

  return (
    <div ref={rootRef} className={`${styles.root} ${visible ? styles.visible : ""}`}>
      <div ref={barRef} className={styles.scroller}>
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
                onMouseEnter={() => setSelectedId(st.id)}
                onFocus={() => setSelectedId(st.id)}
              >
                <span className={styles.segment} />
                <span className={styles.blockLabel}>{st.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.detailWrap}>
        <div className={styles.detail} aria-live="polite">
          {(() => {
            const paras = active.summary.split('\n\n');
            // `imagesAfter: n` puts the stage's photos after the n-th paragraph
            // (default: after the text and the bullets).
            const at = active.images?.length && !active.imagesWide && active.imagesAfter ? active.imagesAfter : 0;
            return paras.map((para, k) => (
              <div key={k}>
                <p className={styles.detailSummary} style={k ? { marginTop: at && k === at ? '56px' : '1.1em' } : undefined}>
                  {para.split(/\*\*(.+?)\*\*/g).map((part, i) =>
                    i % 2 ? <strong key={i}>{part}</strong> : part
                  )}
                </p>
                {at && k === at - 1 ? <PhotoRow images={active.images} /> : null}
              </div>
            ));
          })()}
          {active.bullets?.length ? (
            <ul className={styles.bullets}>
              {active.bullets.map((b) => (
                <li key={b}>
                  {b.split(/\*\*(.+?)\*\*/g).map((part, i) =>
                    i % 2 ? <strong key={i}>{part}</strong> : part
                  )}
                </li>
              ))}
            </ul>
          ) : null}
          {active.outputs?.length ? (
            <ul className={styles.outputs}>
              {active.outputs.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          ) : null}
          {active.images?.length && !active.imagesWide && !active.imagesAfter ? <PhotoRow images={active.images} /> : null}
        </div>
        {renderAside ? <div className={styles.aside}>{renderAside(active)}</div> : null}
      </div>
      {active.images?.length && active.imagesWide ? <PhotoRow images={active.images} wide /> : null}
      {active.story ? <StoryBlock story={active.story} /> : null}
    </div>
  );
}
