import { notFound } from 'next/navigation';
import { works, getWorkBySlug } from '../../lib/works';
import SiteNav from '../../SiteNav';

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  const fullTitle = work ? [work.title, work.titleSuffix].filter(Boolean).join(' - ') : '';
  return { title: work ? `${fullTitle} — Gamze Bozkurt` : 'Case study' };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <main style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <SiteNav variant="static" backHref="/#selected-work" />

      {/* HERO — Lucid Motors-style: a full-width dark section with the
          title and one-line tagline centered above a single large framed
          photo, instead of a full-bleed photo with the title overlaid. */}
      <div style={{
        width: '100%', background: '#1C1917',
        padding: 'clamp(56px,9vh,104px) clamp(24px,5vw,72px) clamp(64px,10vh,120px)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontOpticalSizing: 'auto', fontWeight: 700,
          fontSize: 'clamp(36px,6vw,64px)', lineHeight: 1.05, letterSpacing: '-0.02em',
          color: '#FFFFFF', margin: '0 0 20px',
        }}>
          {work.title}
          {work.titleSuffix && (
            <span style={{ fontWeight: 400, fontSize: '0.55em', color: 'rgba(255,255,255,0.72)' }}>
              {' - '}{work.titleSuffix}
            </span>
          )}
        </h1>
        <p style={{
          fontFamily: 'var(--font-work-sans)', fontSize: 'clamp(16px,1.8vw,20px)',
          color: 'rgba(255,255,255,0.72)', margin: '0 0 clamp(40px,6vh,64px)',
        }}>
          {work.tagline}
        </p>

        {/* Tags as pills, centered right under the tagline */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', margin: '-8px 0 clamp(40px,6vh,64px)' }}>
          {work.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: 'var(--font-work-sans)', fontSize: '14px', fontWeight: 500,
              color: '#FFFFFF', background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.18)',
              padding: '10px 18px', borderRadius: '999px', whiteSpace: 'nowrap',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{
          position: 'relative', maxWidth: '1100px', margin: '0 auto',
          aspectRatio: '16 / 10', borderRadius: '24px', overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
        }}>
          {work.type === 'video' ? (
            <video src={work.media} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <img src={work.media} alt={work.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>
      </div>

      {/* INTRO — two columns: the Client/Role/Team/Timeline facts stacked
          vertically on the left, and description + Problem/Solution/Design
          Challenge on the right. (Tags live in the hero.) The facts column
          comes later in the DOM but is pulled left with `order`. */}
      <div className="case-columns" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(170px,220px) 1fr',
        gap: 'clamp(32px,5vw,72px)',
        padding: 'clamp(48px,7vh,88px) clamp(24px,5vw,72px) clamp(56px,8vh,96px)',
        maxWidth: '1600px', margin: '0 auto',
      }}>
        {/* Main column — description, then Problem / Solution */}
        <div style={{ order: 2, display: 'flex', flexDirection: 'column', gap: 'clamp(64px,9vh,112px)' }}>
          <p style={{
            fontFamily: 'var(--font-work-sans)', fontWeight: 500, fontSize: 'clamp(18px,1.7vw,22px)',
            lineHeight: 1.5, color: '#1C1917', margin: 0, maxWidth: '58ch',
          }}>
            {work.desc}
          </p>

          {/* Real 3-column grid — problem | arrow | solution — so the arrow
              gets its own dedicated space and can never sit on top of
              either label, however long the label text runs. */}
          <div className="ps-grid" style={{
            display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'start',
            columnGap: 'clamp(28px,5vw,64px)', rowGap: '20px',
          }}>
            <div className="ps-problem-label">
              <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 500, fontSize: '16px', color: '#1C1917' }}>
                Business problem
              </div>
            </div>
            <svg className="ps-arrow" viewBox="0 0 90 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 22C30 6 55 6 76 13" stroke="#d04d03" strokeWidth="6" strokeLinecap="round"/>
              <path d="M60 2L86 15L62 29" stroke="#d04d03" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="ps-solution-label">
              <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 500, fontSize: '16px', color: '#1C1917' }}>
                Then, what happened
              </div>
            </div>

            <div className="ps-problem-text">
              <p style={{
                fontFamily: 'var(--font-work-sans)', fontOpticalSizing: 'auto', fontWeight: 600,
                fontSize: 'clamp(24px,2.4vw,32px)', lineHeight: 1.3, letterSpacing: '-0.01em',
                color: '#1C1917', margin: 0, maxWidth: '20ch',
              }}>
                {work.problem}
              </p>
            </div>

            <div className="ps-solution-text">
              <p style={{
                fontFamily: 'var(--font-work-sans)', fontOpticalSizing: 'auto', fontWeight: 600,
                fontSize: 'clamp(24px,2.4vw,32px)', lineHeight: 1.3, letterSpacing: '-0.01em',
                color: '#1C1917', margin: 0, maxWidth: '20ch',
              }}>
                {work.solution}
              </p>
            </div>

            {/* Same arrow, now on the right side pointing down-left from
                "Then, what" into the Design Challenge section below */}
            <svg className="ps-arrow ps-arrow-down" viewBox="0 0 90 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 22C30 6 55 6 76 13" stroke="#d04d03" strokeWidth="6" strokeLinecap="round"/>
              <path d="M60 2L86 15L62 29" stroke="#d04d03" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Second pair — Design Challenge | arrow | Solution — laid out
                exactly like the Business problem / Then, what happened pair
                above it (labels on one row, big text on the next). */}
            <div className="ps-challenge-label">
              <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 500, fontSize: '16px', color: '#1C1917' }}>
                Design Challenge
              </div>
            </div>
            <svg className="ps-arrow ps-arrow-2" viewBox="0 0 90 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 22C30 6 55 6 76 13" stroke="#d04d03" strokeWidth="6" strokeLinecap="round"/>
              <path d="M60 2L86 15L62 29" stroke="#d04d03" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="ps-dsolution-label">
              <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 500, fontSize: '16px', color: '#1C1917' }}>
                Solution
              </div>
            </div>

            <div className="ps-challenge-text">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {work.designChallenge.map((para, i) => (
                  <p key={i} style={{
                    fontFamily: 'var(--font-work-sans)', fontOpticalSizing: 'auto', fontWeight: 600,
                    fontSize: 'clamp(24px,2.4vw,32px)', lineHeight: 1.3, letterSpacing: '-0.01em',
                    color: '#1C1917', margin: 0, maxWidth: '20ch',
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="ps-dsolution-text">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {work.designSolution.map((para, i) => (
                  <p key={i} style={{
                    fontFamily: 'var(--font-work-sans)', fontOpticalSizing: 'auto', fontWeight: 600,
                    fontSize: 'clamp(24px,2.4vw,32px)', lineHeight: 1.3, letterSpacing: '-0.01em',
                    color: '#1C1917', margin: 0, maxWidth: '20ch',
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Left column — Client / Role / Team / Timeline, stacked vertically */}
        <div style={{ order: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 700, fontSize: '16px', color: '#1C1917', marginBottom: '8px' }}>
              Client
            </div>
            <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: '15px', color: '#3D3631' }}>
              {work.client}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 700, fontSize: '16px', color: '#1C1917', marginBottom: '8px' }}>
              Role
            </div>
            <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: '15px', color: '#3D3631' }}>
              {work.role}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 700, fontSize: '16px', color: '#1C1917', marginBottom: '8px' }}>
              Team
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {work.team.map((member) => (
                <div key={member} style={{ fontFamily: 'var(--font-work-sans)', fontSize: '15px', color: '#3D3631' }}>
                  {member}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 700, fontSize: '16px', color: '#1C1917', marginBottom: '8px' }}>
              Timeline
            </div>
            <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: '15px', color: '#3D3631' }}>
              {work.timeline}
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS — three big numbers with a short line under each, framed
          by a thin rule above and below. Right after Design Challenge. */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 clamp(24px,5vw,72px)' }}>
        <div className="case-stats" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(24px,4vw,56px)',
          padding: 'clamp(48px,7vh,88px) 0',
          borderTop: '1px solid rgba(28,25,23,0.12)', borderBottom: '1px solid rgba(28,25,23,0.12)',
          textAlign: 'center',
        }}>
          {work.stats.map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(40px,5.5vw,76px)', lineHeight: 1.05, letterSpacing: '-0.01em',
                color: '#1C1917', marginBottom: '16px',
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-work-sans)', fontWeight: 500, fontSize: 'clamp(15px,1.4vw,20px)',
                lineHeight: 1.4, color: '#1C1917', maxWidth: '30ch', margin: '0 auto',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HIGHLIGHTS — title + copy on the left, a large image inside a
          rounded card on the right. One block per entry. */}
      {work.highlights.map((h, i) => (
        <div key={i} className="case-columns" style={{
          display: 'grid', gridTemplateColumns: 'minmax(240px,1fr) 2fr', gap: 'clamp(32px,5vw,72px)',
          alignItems: 'start', maxWidth: '1600px', margin: '0 auto',
          padding: 'clamp(48px,7vh,88px) clamp(24px,5vw,72px) 0',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-work-sans)', fontWeight: 600,
              fontSize: 'clamp(24px,2.4vw,32px)', lineHeight: 1.2, letterSpacing: '-0.01em',
              color: '#1C1917', margin: '0 0 28px',
            }}>
              {h.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {h.text.map((para, j) => (
                <p key={j} style={{ fontFamily: 'var(--font-work-sans)', fontSize: '16px', lineHeight: 1.7, color: '#1C1917', margin: 0 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div style={{
            background: '#F1EEE8', borderRadius: '24px', padding: 'clamp(20px,3vw,56px)',
          }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', borderRadius: '12px', overflow: 'hidden' }}>
              <img src={h.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      ))}

      {/* BACKGROUND — big title and two-column body copy. Only shown for
          projects that have backgroundText; leave it out (or empty) in
          works.js to drop the section for that case study. */}
      {work.backgroundText?.length > 0 && (
        <div style={{
          maxWidth: '1600px', margin: '0 auto',
          padding: 'clamp(48px,7vh,88px) clamp(24px,5vw,72px)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(32px,6vw,64px)', letterSpacing: '-0.01em', lineHeight: 1.05,
            color: '#1C1917', margin: '0 0 40px',
          }}>
            Background
          </h2>
          <div className="case-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,64px)' }}>
            {work.backgroundText.map((para, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-work-sans)', fontSize: '15px', lineHeight: 1.7, color: '#3D3631', margin: 0 }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Further case study content (Goals / Role & Process / Design Process)
          goes here once that layout is specified. */}
    </main>
  );
}
