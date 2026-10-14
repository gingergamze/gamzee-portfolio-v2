import { notFound } from 'next/navigation';
import { works, getWorkBySlug } from '../../lib/works';
import SiteNav from '../../SiteNav';
import ClientInfoButton from './ClientInfoButton';
import CaseStudyTimeline from './CaseStudyTimeline';
import PrototypeFrame from './PrototypeFrame';
import CaseStudyMenu from './CaseStudyMenu';
import HeroTour from './HeroTour';
import HeroNote from './HeroNote';
import CaseStudyFooter from './CaseStudyFooter';

// Shared type system for the case study text — one label style, one body
// style, one meta style, so every section reads the same.
const T = {
  label: {
    fontFamily: 'var(--font-display)', fontWeight: 700,
    fontSize: 'clamp(24px,2.4vw,32px)', lineHeight: 1.1, letterSpacing: '-0.02em',
    color: '#1C1917',
  },
  body: {
    fontFamily: 'var(--font-work-sans)', fontOpticalSizing: 'auto', fontWeight: 400,
    fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.7, letterSpacing: '-0.005em',
    color: '#554E48', margin: 0,
  },
  metaLabel: {
    fontFamily: 'var(--font-work-sans)', fontWeight: 700, fontSize: '16px',
    lineHeight: 1, color: '#1C1917', marginBottom: '10px',
  },
  metaValue: {
    fontFamily: 'var(--font-work-sans)', fontSize: '16px', lineHeight: 1.5, color: '#3D3631',
  },
};

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
      <CaseStudyMenu
        prev={(() => { const w = works[(works.findIndex((x) => x.slug === work.slug) + works.length - 1) % works.length]; return { href: `/work/${w.slug}`, label: w.navLabel || w.title }; })()}
        next={(() => { const w = works[(works.findIndex((x) => x.slug === work.slug) + 1) % works.length]; return { href: `/work/${w.slug}`, label: w.navLabel || w.title }; })()}
      />

      {/* HERO — Lucid Motors-style: a full-width dark section with the
          title and one-line tagline centered above a single large framed
          photo, instead of a full-bleed photo with the title overlaid. */}
      <div style={{
        width: '100%', background: work.client === 'ASML' ? '#0F238C' : '#1C1917',
        padding: 'clamp(56px,9vh,104px) var(--cs-x) clamp(64px,10vh,120px)',
        textAlign: 'center',
      }}>
        {work.confidential && (
          <p style={{
            fontFamily: 'var(--font-work-sans)', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)', margin: '0 0 20px',
          }}>
            Confidential
          </p>
        )}
        {work.client === 'ASML' && work.logo ? (
          <h1 style={{ margin: '0 0 20px' }}>
            <img
              src={work.logo}
              alt={work.title}
              style={{
                height: 'clamp(36px,5.2vw,56px)', width: 'auto', display: 'inline-block',
                // Logo ships as navy-on-transparent — force it white so it
                // reads against the ASML blue hero instead of nearly
                // disappearing into it.
                filter: 'brightness(0) invert(1)',
              }}
            />
          </h1>
        ) : (
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
        )}
        <p style={{
          fontFamily: 'var(--font-work-sans)', fontSize: 'clamp(18px,2vw,20px)', lineHeight: 1.5,
          letterSpacing: '-0.005em', maxWidth: '56ch',
          color: 'rgba(255,255,255,0.78)', margin: '0 auto clamp(40px,6vh,64px)',
        }}>
          {work.tagline}
        </p>

        {/* Hero photo placeholder — empty until a real cover image is set
            via `heroImage` in works.js. The overview photo lower down
            (after the About text) is separate and already has an image. */}
        {/* A still hero picture gets a little extra header-coloured space above
            and sidebar/page-coloured space below, so its content keeps clear
            of the rounded corners instead of looking squeezed against them. */}
        <div style={{
          position: 'relative', maxWidth: '900px', margin: '0 auto',
          borderRadius: '24px', overflow: 'hidden',
          ...(work.heroImage && work.type !== 'video'
            ? {
                padding: '20px 0',
                background: 'linear-gradient(#2539D6, #2539D6) top / 100% 30px no-repeat, linear-gradient(90deg, #FFFFFF 17.1%, #EEEFF8 17.1%) bottom / 100% 30px no-repeat, #EEEFF8',
              }
            : { aspectRatio: work.heroAspect || '16 / 10' }),
          boxShadow: work.heroImage ? '0 0 0 1px rgba(255,255,255,0.28), 0 16px 40px rgba(4,8,60,0.45)' : 'none',
        }}>
          {work.heroImage ? (
            work.type === 'video' ? (
              <video src={work.heroImage} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              work.heroTour ? (
                <HeroTour src={work.heroTour} poster={work.heroImage} alt={`${work.title} prototype tour`} />
              ) : (
                <img src={work.heroImage} alt={work.title} style={{ display: 'block', width: '100%', height: 'auto', margin: '-0.94% 0', clipPath: 'inset(1.2% 0 1.2% 0)' }} />
              )
            )
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              border: '1.5px dashed rgba(255,255,255,0.3)', borderRadius: '24px',
              background: 'rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-work-sans)', fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
              }}>
                Cover photo placeholder
              </span>
            </div>
          )}
        </div>
        {work.heroNote && <HeroNote text={work.heroNote} />}
      </div>

      {/* INTRO — two columns: the Client/Role/Team/Timeline facts stacked
          vertically on the left, and description + Problem/Solution/Design
          Challenge on the right. (Tags live in the hero.) The facts column
          comes later in the DOM but is pulled left with `order`. */}
      <div id="overview" className="case-columns" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(170px,220px) 1fr',
        gap: 'clamp(32px,5vw,72px)',
        padding: 'clamp(48px,7vh,88px) var(--cs-x) clamp(56px,8vh,96px)',
        maxWidth: '1600px', margin: '0 auto',
      }}>
        {/* Main column — description, then Problem / Solution */}
        <div className="cs-main" style={{ order: 2, display: 'flex', flexDirection: 'column', gap: 'clamp(64px,9vh,112px)' }}>
          <div>
            <div style={{ ...T.label, lineHeight: 1, marginTop: '-0.075em', marginBottom: '18px' }}>
              About
            </div>
            <p className="cs-copy" style={{ ...T.body, maxWidth: '100ch' }}>
              {work.desc}
            </p>
          </div>

          {/* Overview photo — moved down from the hero so it reads as part
              of the story, right after the opening description. */}
          <div className="cs-photo" style={{
            position: 'relative', width: '100%', maxWidth: '90%',
            aspectRatio: '16 / 10', borderRadius: '24px', overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(28,25,23,0.16)',
          }}>
            {work.type === 'video' ? (
              <video src={work.media} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <img src={work.media} alt={work.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>

          {/* Real 3-column grid — problem | arrow | solution — so the arrow
              gets its own dedicated space and can never sit on top of
              either label, however long the label text runs. */}
          <div className="ps-grid" style={{
            display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'start',
            columnGap: 'clamp(28px,5vw,64px)', rowGap: '16px',
          }}>
            <div className="ps-problem-label">
              <div style={T.label}>
                Business problem
              </div>
            </div>
            <div className="ps-solution-label">
              <div style={T.label}>
                And then, what happened?
              </div>
            </div>

            <div className="ps-problem-text">
              <p className="cs-copy" style={{ ...T.body, maxWidth: '38ch' }}>
                {work.problem}
              </p>
            </div>

            <div className="ps-solution-text">
              <p className="cs-copy" style={{ ...T.body, maxWidth: '38ch' }}>
                {work.solution}
              </p>
            </div>

            {/* Second pair — Design Challenge | arrow | Solution — laid out
                exactly like the Business problem / Then, what happened pair
                above it (labels on one row, big text on the next). */}
            <div className="ps-challenge-label">
              <div style={T.label}>
                Reason for a designer
              </div>
            </div>
            <div className="ps-dsolution-label">
              <div style={T.label}>
                Design Solution
              </div>
            </div>

            <div className="ps-challenge-text">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {work.designChallenge.map((para, i) => (
                  <p key={i} className="cs-copy" style={{ ...T.body, maxWidth: '38ch' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="ps-dsolution-text">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {work.designSolution.map((para, i) => (
                  <p key={i} className="cs-copy" style={{ ...T.body, maxWidth: '38ch' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Left column — Client / Role / Team / Timeline, stacked vertically */}
        <div style={{ order: 1, display: 'flex', flexDirection: 'column', gap: '36px' }}>
          <div>
            <div style={T.metaLabel}>
              Client
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={T.metaValue}>
                {work.client}
              </div>
              <ClientInfoButton description={work.clientDescription} />
            </div>
          </div>

          <div>
            <div style={T.metaLabel}>
              Role
            </div>
            <div style={T.metaValue}>
              {work.role}
            </div>
          </div>

          <div>
            <div style={T.metaLabel}>
              Team
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {work.team.map((member) => (
                <div key={member} style={{ fontFamily: 'var(--font-work-sans)', fontSize: '15px', color: '#3D3631' }}>
                  {member}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={T.metaLabel}>
              Timeline
            </div>
            <div style={T.metaValue}>
              {work.timeline}
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS — three big numbers with a short line under each, framed
          by a thin rule above and below. Right after Design Challenge. */}
      <div id="results" style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 var(--cs-x)' }}>
        <div className="case-stats" style={{
          display: 'grid', gridTemplateColumns: `repeat(${work.stats.length}, 1fr)`, gap: 'clamp(24px,4vw,56px)',
          padding: 'clamp(48px,7vh,88px) 0',
          borderTop: '1px solid rgba(28,25,23,0.12)', borderBottom: '1px solid rgba(28,25,23,0.12)',
          textAlign: 'center',
        }}>
          {work.stats.map((s, i) => (
            <div key={i}>
              <div style={{ width: '32px', height: '3px', borderRadius: '2px', background: '#d04d03', margin: '0 auto 20px' }} />
              <div style={{
                fontFamily: 'var(--font-work-sans)', fontWeight: 500, fontSize: 'clamp(15px,1.4vw,20px)',
                lineHeight: 1.5, letterSpacing: '-0.005em', color: '#3D3631', maxWidth: '30ch', margin: '0 auto',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS TIMELINE — interactive block timeline of the
          design process, right under the metrics. */}
      <div id="process" style={{ maxWidth: '1600px', margin: '0 auto', padding: 'clamp(48px,7vh,88px) var(--cs-x) 0' }}>
        <CaseStudyTimeline stages={work.processTimeline.stages} />
      </div>

      {/* HIGHLIGHTS — title + copy on the left, a large image inside a
          rounded card on the right. One block per entry. */}
      {work.highlights.map((h, i) => (
        <div key={i} className="case-columns" style={{
          display: 'grid', gridTemplateColumns: 'minmax(240px,1fr) 2fr', gap: 'clamp(32px,5vw,72px)',
          alignItems: 'start', maxWidth: '1600px', margin: '0 auto',
          padding: 'clamp(48px,7vh,88px) var(--cs-x) 0',
        }}>
          <div>
            <h3 style={{
              ...T.label, lineHeight: 1.15, margin: '0 0 24px',
            }}>
              {h.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {h.text.map((para, j) => (
                <p key={j} style={T.body}>
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div style={{
            background: '#F1EEE8', borderRadius: '24px', padding: 'clamp(20px,3vw,56px)',
          }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', borderRadius: '24px', overflow: 'hidden' }}>
              <img src={h.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      ))}

      {/* PROTOTYPE — shown only when `prototype.src` is set in works.js */}
      {work.prototype?.src && (
        <section id="prototype" style={{ background: work.client === 'ASML' ? '#0F238C' : '#1C1917', marginTop: 'clamp(56px,8vh,104px)' }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', padding: 'clamp(56px,9vh,112px) var(--cs-x)' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <h3 style={{ ...T.label, color: '#FFFFFF', lineHeight: 1.15, margin: '0 0 16px' }}>{work.prototype.title}</h3>
              {work.prototype.description && (
                <p style={{ ...T.body, color: 'rgba(255,255,255,0.7)', maxWidth: '56ch', marginBottom: 'clamp(32px,5vh,56px)' }}>{work.prototype.description}</p>
              )}
              {work.prototype.type === 'video' ? (
                <video src={work.prototype.src} controls playsInline style={{ width: '100%', borderRadius: '24px', background: '#000' }} />
              ) : (
                <PrototypeFrame
                  src={work.prototype.src}
                  type={work.prototype.type}
                  title={`${work.title} prototype`}
                  hotspots={work.prototype.hotspots}
                />
              )}
              {work.prototype.note && <HeroNote text={work.prototype.note} maxWidth="none" />}
            </div>
          </div>
        </section>
      )}

      {/* BACKGROUND — big title and two-column body copy. Only shown for
          projects that have backgroundText; leave it out (or empty) in
          works.js to drop the section for that case study. */}
      {work.backgroundText?.length > 0 && (
        <div id="background" style={{
          maxWidth: '1600px', margin: '0 auto',
          padding: 'clamp(48px,7vh,88px) var(--cs-x)',
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
              <p key={i} style={T.body}>
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Further case study content (Goals / Role & Process / Design Process)
          goes here once that layout is specified. */}

      <CaseStudyFooter />
    </main>
  );
}
