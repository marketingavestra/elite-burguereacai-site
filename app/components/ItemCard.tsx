"use client";

import Image from "next/image";
import type { MenuItem } from "@/lib/menu";

interface Props {
  item: MenuItem;
  quantity: number;
  onClick: (item: MenuItem) => void;
}

export default function ItemCard({ item, quantity, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(item)}
      style={{
        width: "100%", textAlign: "left", background: "none",
        border: "none", borderBottom: "1px solid var(--border)",
        padding: "16px", cursor: "pointer",
        display: "flex", gap: 14, alignItems: "flex-start",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--surface)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {item.badge && (
          <span style={{
            display: "inline-block", marginBottom: 6,
            background: "var(--brand-muted)",
            color: "var(--brand)",
            fontSize: 10, fontWeight: 700,
            padding: "3px 9px", borderRadius: 99,
            letterSpacing: "0.3px",
          }}>{item.badge}</span>
        )}
        <h3 style={{
          fontSize: 14, fontWeight: 700,
          color: "var(--text-1)", lineHeight: 1.35,
          marginBottom: 5, letterSpacing: "-0.2px",
        }}>{item.name}</h3>
        <p style={{
          fontSize: 12, color: "var(--text-2)",
          lineHeight: 1.55, marginBottom: 10,
          display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{item.description}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.3px" }}>
            R$ {item.price.toFixed(2).replace(".", ",")}
          </span>
          {quantity > 0 && (
            <span style={{
              background: "linear-gradient(135deg, #E8390E, #FF6B35)",
              color: "#fff", borderRadius: 99,
              width: 22, height: 22,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 800,
              boxShadow: "var(--shadow-brand)",
            }}>{quantity}</span>
          )}
        </div>
      </div>

      {/* Photo */}
      <div style={{
        position: "relative", width: 88, height: 88,
        borderRadius: 12, overflow: "hidden",
        flexShrink: 0, backgroundColor: "var(--surface-raised)",
      }}>
        <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="88px" />
        {quantity > 0 && (
          <>
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(232,57,14,0.25)" }} />
            <div style={{
              position: "absolute", bottom: 5, right: 5,
              background: "linear-gradient(135deg, #E8390E, #FF6B35)",
              color: "#fff", borderRadius: "50%",
              width: 24, height: 24,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800,
              boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}>✓</div>
          </>
        )}
      </div>
    </button>
  );
}
