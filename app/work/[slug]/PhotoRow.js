// Photos under a stage.
//  - default: directly below the description text, in the text column at 85%
//    of its width (one photo, or two side by side). Photos marked `natural`
//    keep their own shape instead of being cropped to 4:3.
//  - wide: below the whole stage content, two across, centered, at 80% of the
//    page width.
export default function PhotoRow({ images, wide = false }) {
  return (
    <div className={wide ? 'ph-wide' : undefined} style={{
      display: 'grid',
      gridTemplateColumns: wide ? 'repeat(2,minmax(0,1fr))' : `repeat(${Math.min(images.length, 2)},minmax(0,1fr))`,
      gap: wide ? 'clamp(24px,3.5vw,56px)' : 'clamp(12px,1.6vw,24px)',
      marginTop: wide ? 'clamp(48px,7vh,80px)' : '56px',
      width: wide ? '80%' : '85%', maxWidth: '100%',
      marginLeft: wide ? 'auto' : undefined, marginRight: wide ? 'auto' : undefined,
    }}>
      {wide && <style>{`@media (max-width:700px){.ph-wide{grid-template-columns:minmax(0,1fr)!important;width:100%!important}}`}</style>}
      {images.map((im) => (
        <img key={im.src} src={im.src} alt={im.alt ?? ''} loading="lazy" style={{
          display: 'block', width: '100%', height: im.natural ? 'auto' : undefined, aspectRatio: im.natural ? undefined : '4 / 3',
          objectFit: 'cover', objectPosition: im.pos ?? 'center',
          borderRadius: '16px', background: '#F1EEE8',
          border: im.natural ? '1px solid rgba(28,25,23,.12)' : undefined,
        }} />
      ))}
    </div>
  );
}
