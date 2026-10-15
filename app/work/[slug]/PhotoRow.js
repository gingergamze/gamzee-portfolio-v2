// Two photos under a stage, full width, with room around and between them.
export default function PhotoRow({ images }) {
  return (
    <div className="ph-row" style={{
      display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
      gap: 'clamp(24px,3.5vw,56px)', marginTop: 'clamp(96px,15vh,168px)',
    }}>
      <style>{`@media (max-width:700px){.ph-row{grid-template-columns:minmax(0,1fr)!important}}`}</style>
      {images.map((im) => (
        <img key={im.src} src={im.src} alt={im.alt ?? ''} loading="lazy" style={{
          display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover',
          borderRadius: '16px', background: '#F1EEE8',
        }} />
      ))}
    </div>
  );
}
