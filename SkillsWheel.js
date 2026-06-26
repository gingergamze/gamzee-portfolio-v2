'use client';

import { useState } from 'react';

const skills = [
  { title: '0→1 Product Design', description: 'From a business problem to a product people actually use.' },
  { title: 'Product Vision, Scope & Prioritization', description: 'Making sure the right problem gets solved — not just the loudest one.' },
  { title: 'Tailored UX Research Strategy', description: 'Finding where users struggle and fixing it before it costs something.' },
  { title: 'Project Management', description: 'Keeping design, development, and business moving in the same direction.' },
  { title: 'Information Architecture', description: 'Redesigning the parts of a process that slow people down or create errors.' },
  { title: 'Data Storytelling', description: 'Turning complex data into clear decisions.' },
  { title: 'AI Interaction Design', description: 'Making AI outputs readable, trustworthy, and actionable for the people who act on them.' },
  { title: 'Concept Development', description: 'Turning a vague problem into a clear direction worth building toward.' },
  { title: 'Service Design', description: 'Looking beyond the screen — at the process, the people, and the system behind it.' },
  { title: 'Workflow Design', description: 'Redesigning the parts of a process that slow people down or create errors.' },
];

export default function SkillsWheel() {
  const [active, setActive] = useState(0);

  return (
    <section className="mb-32 relative">

      {/* Left margin label */}
      <div style={{ position: 'absolute', left: '-170px', top: '-40px' }}>
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f59e0b' }}>Expertise</p>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', minHeight: '420px', display: 'flex', gap: '64px' }}>

        {/* Left: skill list */}
        <div className="flex flex-col gap-4" style={{ width: '50%', flexShrink: 0 }}>
          {skills.map((skill, i) => {
            const distance = Math.abs(i - active);
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.6 : 0.35;
            const blur = distance === 0 ? 0 : distance === 1 ? 0.3 : 1;
            const isActive = i === active;

            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  opacity,
                  filter: `blur(${blur}px)`,
                  transition: 'all 0.35s ease',
                  cursor: 'pointer',
                }}
                className="flex items-center gap-3 group"
              >
                <span
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                    transition: 'all 0.3s ease',
                    color: '#f59e0b',
                    fontSize: '18px',
                    lineHeight: 1,
                    minWidth: '18px',
                  }}
                >
                  →
                </span>
                <span
                  style={{
                    fontSize: isActive ? '20px' : '16px',
                    fontWeight: isActive ? '600' : '400',
                    color: isActive ? '#1c1917' : '#78716c',
                    transition: 'all 0.3s ease',
                    lineHeight: 1.3,
                  }}
                >
                  {skill.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: description box — always fixed at top right */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '42%',
          border: '1.5px solid #f59e0b',
          borderRadius: '16px',
          padding: '32px',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}>
          <p
            key={active}
            style={{
              fontSize: '17px',
              lineHeight: '1.7',
              color: '#292524',
              fontFamily: 'var(--font-inter)',
              fontWeight: '400',
              margin: 0,
              animation: 'slideUp 0.25s ease-out',
            }}
          >
            {skills[active].description}
          </p>
        </div>

      </div>

    </section>
  );
}