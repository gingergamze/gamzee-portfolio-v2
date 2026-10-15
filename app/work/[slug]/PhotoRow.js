// Photos under a stage.
//  - default: directly below the description text, in the text column
//    (one photo fills the column, two sit side by side).
//  - wide: full width below the whole stage content, two across.
export default function PhotoRow({ images, wide = false }) {
  return (
    <div className={wide ? 'ph-wide' : undefined} style={{
      display: 'grid',
      gridTemplateColumns: wide ? 'repeat(2,minmax(0,1fr))' : `repeat(${Math.min(images.length, 2)},minmax(0,1fr))`,
      gap: wide ? 'clamp(24px,3.5vw,56px)' : 'clamp(12px,1.6vw,24px)',
      marginTop: wide ? 'clamp(48px,7vh,80px)' : '56px',
    }}>
      {wide && <style>{`@media (max-width:700px){.ph-wide{grid-template-columns:minmax(0,1fr)!important}}`}</style>}
      {images.map((im) => (
        <img key={im.src} src={im.src} alt={im.alt ?? ''} loading="lazy" style={{
          display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', objectPosition: im.pos ?? 'center',
          borderRadius: '16px', background: '#F1EEE8',
        }} />
      ))}
    </div>
  );
}
