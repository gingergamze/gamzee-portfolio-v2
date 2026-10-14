// Full-width dark band behind the Impact block. Uses the same blue as the
// prototype section for ASML case studies (dark for the others).
export default function ImpactBand({ bg, children }) {
  return (
    <div className="impact-band" data-dark="true"
      style={{ background: bg, padding: 'clamp(56px,8vh,104px) 0', marginTop: 'clamp(24px,4vh,48px)' }}>
      {children}
    </div>
  );
}
