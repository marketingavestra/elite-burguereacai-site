"use client";

export default function Header() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      backgroundColor: "rgba(12,12,12,0.85)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: 480, margin: "0 auto",
        padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "linear-gradient(135deg, #E8390E 0%, #FF6B35 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
          boxShadow: "0 2px 12px rgba(232,57,14,0.5)",
        }}>🍔</div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-1)", lineHeight: 1.2, letterSpacing: "-0.3px" }}>
            Elite Burguer & Açaí
          </h1>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--success)", marginTop: 1 }}>
            ● Aberto agora
          </p>
        </div>

        <div style={{
          backgroundColor: "var(--surface-raised)",
          border: "1px solid var(--border-strong)",
          borderRadius: 99, padding: "5px 11px",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <span style={{ fontSize: 12 }}>⭐</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>4.9</span>
        </div>
      </div>
    </header>
  );
}
