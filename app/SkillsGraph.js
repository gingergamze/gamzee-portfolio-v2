'use client';

import { useEffect, useState } from 'react';
import SkillsMap from './SkillsMap';
import SkillsTree from './SkillsTree';

// Phones and touch tablets get the SVG tree; computers keep the wide map.
const TOUCH = '(max-width: 700px), (hover: none) and (pointer: coarse) and (max-width: 1100px)';

export default function SkillsGraph() {
  // the wide map is only started on computers
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(TOUCH);
    const apply = () => setWide(!mq.matches);
    apply();
    if (mq.addEventListener) mq.addEventListener('change', apply); else mq.addListener(apply);
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', apply); else mq.removeListener(apply); };
  }, []);

  return (
    <>
      <div className="skills-touch"><SkillsTree /></div>
      <div className="skills-wide">
        <div className="what-map" style={{ position: 'relative', width: '100%', margin: '0 auto', height: 'clamp(470px, 38vw, 560px)' }}>
          {wide && <SkillsMap height="100%" wideFrom={600} fontSize={14} spanDeg={88} sideMargin={190} />}
        </div>
      </div>
      <style>{`.skills-touch{display:none}@media ${TOUCH}{.skills-touch{display:block}.skills-wide{display:none}}`}</style>
    </>
  );
}
