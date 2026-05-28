"use client";

import Image from "next/image";
import type { CartItem } from "@/lib/cart";
import { cartTotal } from "@/lib/cart";
import type { MenuItem } from "@/lib/menu";

interface Props {
  cart: CartItem[];
  open: boolean;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

function Btn({ children, onClick, style }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", ...style }}>
      {children}
    </button>
  );
}

export default function CartDrawer({ cart, open, onClose, onAdd, onRemove, onCheckout }: Props) {
  const subtotal = cartTotal(cart);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 80,
      backgroundColor: "var(--bg)",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
      overflowY: "auto", display: "flex", flexDirection: "column",
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(12,12,12,0.9)",
          borderBottom: "1px solid var(--border)",
          padding: "14px 16px",
          display: "flex", alignItems: "center",
        }}>
          <Btn onClick={onClose} style={{ fontSize: 20, color: "var(--success)", fontWeight: 700, marginRight: 12 }}>←</Btn>
          <h2 style={{ flex: 1, textAlign: "center", fontSize: 17, fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.3px" }}>
            Sua sacola
          </h2>
          <Btn onClick={onClose} style={{ fontSize: 13, color: "var(--brand)", fontWeight: 700 }}>Limpar</Btn>
        </div>

        {/* Items */}
        <div style={{ backgroundColor: "var(--surface)", margin: "12px 0 0" }}>
          {cart.map(({ item, quantity }) => (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "13px 16px",
              borderBottom: "1px solid var(--border)",
            }}>
              <div style={{ position: "relative", width: 52, height: 52, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="52px" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", marginBottom: 2, letterSpacing: "-0.2px" }}>{item.name}</p>
                <p style={{ fontSize: 12, color: "var(--text-2)" }}>R$ {item.price.toFixed(2).replace(".", ",")}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <Btn onClick={() => onRemove(item.id)} style={{
                  width: 26, height: 26, borderRadius: 8,
                  backgroundColor: "var(--surface-raised)",
                  border: "1px solid var(--border-strong)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, color: "var(--text-2)",
                }}>🗑</Btn>
                <span style={{ fontSize: 14, fontWeight: 800, color: "var(--text-1)", minWidth: 16, textAlign: "center" }}>{quantity}</span>
                <Btn onClick={() => onAdd(item)} style={{
                  width: 26, height: 26, borderRadius: 8,
                  background: "linear-gradient(135deg, #E8390E, #FF6B35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, color: "#fff", fontWeight: 300,
                }}>+</Btn>
              </div>
            </div>
          ))}
          <Btn onClick={onClose} style={{
            width: "100%", padding: "13px 16px",
            fontSize: 14, fontWeight: 700, color: "var(--success)",
            textAlign: "left",
          }}>+ Adicionar mais itens</Btn>
        </div>

        {/* Benefits */}
        <div style={{ backgroundColor: "var(--surface)", margin: "8px 0 0" }}>
          {[["💰", "Cashback"], ["🏷", "Cupom"]].map(([icon, label]) => (
            <div key={label} style={{
              padding: "14px 16px",
              borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-1)" }}>
                <span>{icon}</span>{label}
              </span>
              <span style={{ fontSize: 13, color: "var(--success)", fontWeight: 700 }}>Adicionar ∨</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div style={{ backgroundColor: "var(--surface)", margin: "8px 0 0", padding: "16px" }}>
          {[
            ["Subtotal", `R$ ${subtotal.toFixed(2).replace(".", ",")}`],
            ["Taxa de entrega", "a ser calculado"],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "var(--text-2)" }}>{label}</span>
              <span style={{ fontSize: 13, color: "var(--text-2)" }}>{value}</span>
            </div>
          ))}
          <div style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>Total</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.4px" }}>
              R$ {subtotal.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        {/* Observations */}
        <div style={{ backgroundColor: "var(--surface)", margin: "8px 0 100px", padding: "16px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", marginBottom: 10 }}>Observações?</p>
          <textarea placeholder="Observações sobre o pedido" rows={3} style={{
            width: "100%", padding: "12px 14px", borderRadius: 10,
            border: "1px solid var(--border-strong)",
            backgroundColor: "var(--surface-raised)",
            fontSize: 13, color: "var(--text-1)", resize: "none", outline: "none", lineHeight: 1.5,
          }} />
        </div>
      </div>

      {/* Pinned footer */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        backgroundColor: "rgba(12,12,12,0.95)",
        borderTop: "1px solid var(--border)",
        padding: "12px 16px 28px",
      }}>
        {/* Step dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
          {[0,1,2,3].map((i) => (
            <div key={i} style={{
              width: i === 0 ? 22 : 8, height: 8, borderRadius: 99,
              backgroundColor: i === 0 ? "var(--success)" : "var(--surface-border)",
              transition: "width 0.2s ease",
            }} />
          ))}
        </div>
        <button onClick={onCheckout} style={{
          width: "100%", padding: "16px 0",
          borderRadius: 99, border: "none",
          background: "linear-gradient(135deg, var(--success), #00b85e)",
          color: "#fff", fontSize: 16, fontWeight: 800,
          cursor: "pointer", letterSpacing: "-0.3px",
          boxShadow: "var(--shadow-success)",
        }}>
          Continuar para Endereço
        </button>
      </div>
    </div>
  );
}
