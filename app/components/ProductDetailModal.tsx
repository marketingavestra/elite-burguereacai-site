"use client";

import { useState } from "react";
import Image from "next/image";
import type { MenuItem } from "@/lib/menu";

interface Props {
  item: MenuItem | null;
  quantity: number;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
}

export default function ProductDetailModal({ item, quantity, onClose, onAdd, onRemove }: Props) {
  const [obs, setObs] = useState("");

  if (!item) return null;

  const localQty = quantity === 0 ? 1 : quantity;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 90,
      backgroundColor: "var(--bg)",
      transform: "translateX(0)",
      display: "flex", flexDirection: "column",
      maxWidth: 480, margin: "0 auto",
      overflowY: "auto",
    }}>
      {/* Hero photo */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", flexShrink: 0 }}>
        <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="480px" priority />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 35%, rgba(12,12,12,0.7) 100%)",
        }} />

        {/* Back btn */}
        <button onClick={onClose} style={{
          position: "absolute", top: 14, left: 14,
          width: 38, height: 38, borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.12)",
          cursor: "pointer", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 700,
        }}>←</button>

        {/* Share btn */}
        <button style={{
          position: "absolute", top: 14, right: 14,
          width: 38, height: 38, borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.12)",
          cursor: "pointer", color: "rgba(255,255,255,0.75)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15,
        }}>↑</button>

        {item.badge && (
          <span style={{
            position: "absolute", bottom: 14, left: 14,
            background: "linear-gradient(135deg, #E8390E, #FF6B35)",
            color: "#fff", fontSize: 11, fontWeight: 700,
            padding: "4px 12px", borderRadius: 99,
            boxShadow: "var(--shadow-brand)",
          }}>{item.badge}</span>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "22px 18px 140px" }}>
        <h2 style={{
          fontSize: 22, fontWeight: 800, color: "var(--text-1)",
          letterSpacing: "-0.5px", lineHeight: 1.25, marginBottom: 8,
        }}>{item.name}</h2>

        <p style={{
          fontSize: 14, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 16,
        }}>{item.description}</p>

        <p style={{
          fontSize: 22, fontWeight: 800, color: "var(--text-1)",
          letterSpacing: "-0.5px", marginBottom: 28,
        }}>R$ {item.price.toFixed(2).replace(".", ",")}</p>

        {/* Observações */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", marginBottom: 10, letterSpacing: "-0.1px" }}>
            Observações?
          </p>
          <textarea
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            placeholder="Observações sobre o produto"
            rows={3}
            style={{
              width: "100%",
              padding: "13px 15px",
              borderRadius: 12,
              border: "1px solid var(--border-strong)",
              backgroundColor: "var(--surface)",
              fontSize: 14,
              color: "var(--text-1)",
              resize: "none",
              outline: "none",
              lineHeight: 1.5,
            }}
          />
        </div>
      </div>

      {/* Pinned footer */}
      <div style={{
        position: "fixed", bottom: 0,
        left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480,
        backgroundColor: "rgba(12,12,12,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid var(--border)",
        padding: "14px 18px 28px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        {/* Qty controls */}
        <div style={{
          display: "flex", alignItems: "center", gap: 0,
          border: "1px solid var(--border-strong)",
          borderRadius: 99, overflow: "hidden",
          backgroundColor: "var(--surface)",
        }}>
          <button
            onClick={() => quantity > 0 && onRemove(item.id)}
            style={{
              width: 42, height: 42,
              border: "none", background: "none",
              color: quantity > 0 ? "var(--brand)" : "var(--text-3)",
              fontSize: 22, cursor: quantity > 0 ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 300,
            }}
          >−</button>
          <span style={{
            fontSize: 15, fontWeight: 800, minWidth: 24,
            textAlign: "center", color: "var(--text-1)",
          }}>{localQty}</span>
          <button
            onClick={() => onAdd(item)}
            style={{
              width: 42, height: 42,
              border: "none", background: "none",
              color: "var(--brand)", fontSize: 22,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 300,
            }}
          >+</button>
        </div>

        {/* Add button */}
        <button
          onClick={() => { onAdd(item); onClose(); }}
          style={{
            flex: 1, padding: "14px 0",
            borderRadius: 99, border: "none",
            background: "linear-gradient(135deg, #E8390E, #FF6B35)",
            color: "#fff", fontSize: 15, fontWeight: 800,
            cursor: "pointer", letterSpacing: "-0.2px",
            boxShadow: "var(--shadow-brand)",
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Adicionar · R$ {(item.price * localQty).toFixed(2).replace(".", ",")}
        </button>
      </div>
    </div>
  );
}
