export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 16px 100px", textAlign: "center", backgroundColor: "var(--bg-card)" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <p style={{ fontSize: 22, marginBottom: 8 }}>🍔🍇</p>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>Elite Burguer & Açaí</p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Seg–Sex: 11h–23h · Sáb–Dom: 11h–00h
        </p>
        <a href="https://www.instagram.com/elite_burguereacai/" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 10, fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}>
          @elite_burguereacai
        </a>
      </div>
    </footer>
  );
}
