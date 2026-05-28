"use client";

import { useState } from "react";
import { menu } from "@/lib/menu";
import { addToCart, removeFromCart, cartCount, cartTotal, type CartItem } from "@/lib/cart";
import type { MenuItem } from "@/lib/menu";
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import ItemCard from "./components/ItemCard";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutScreen from "./components/CheckoutScreen";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(menu[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const currentCategory = menu.find((c) => c.id === activeCategory) ?? menu[0];
  const count = cartCount(cart);
  const total = cartTotal(cart);

  const handleAdd = (item: MenuItem) => setCart((p) => addToCart(p, item));
  const handleRemove = (id: string) => setCart((p) => removeFromCart(p, id));
  const handleConfirm = () => { setCart([]); setCheckoutOpen(false); setCartOpen(false); };

  return (
    <main style={{ minHeight: "100dvh", backgroundColor: "var(--bg)" }}>
      <Header />
      <CategoryNav categories={menu} active={activeCategory} onChange={setActiveCategory} />

      {/* ── Hero ── */}
      <div style={{
        maxWidth: 480, margin: "0 auto",
        padding: "20px 16px 16px",
        background: "linear-gradient(180deg, rgba(232,57,14,0.06) 0%, transparent 100%)",
      }}>
        <div style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16, overflow: "hidden",
          padding: "20px",
          backgroundImage: "radial-gradient(ellipse at 80% 0%, rgba(232,57,14,0.12) 0%, transparent 60%)",
        }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "1.5px",
            color: "var(--brand)", textTransform: "uppercase", marginBottom: 8,
          }}>PEDIDO ONLINE · SEM FILA</p>
          <h2 style={{
            fontSize: 24, fontWeight: 800, color: "var(--text-1)",
            lineHeight: 1.2, letterSpacing: "-0.6px", marginBottom: 6,
          }}>
            Escolha, peça
            <br />
            <span style={{
              background: "linear-gradient(90deg, #E8390E, #FF6B35)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>e receba em casa.</span>
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>
            PIX, crédito ou débito. Rápido, fácil e seguro.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            {[["🍔", "Burguers artesanais"], ["🍇", "Açaí cremoso"], ["⚡", "Entrega rápida"]].map(([icon, label]) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 5,
                backgroundColor: "var(--surface-raised)",
                border: "1px solid var(--border)",
                borderRadius: 99, padding: "5px 10px",
              }}>
                <span style={{ fontSize: 12 }}>{icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-2)", whiteSpace: "nowrap" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Menu list ── */}
      <div style={{
        maxWidth: 480, margin: "8px auto 0",
        paddingBottom: count > 0 ? 100 : 32,
      }}>
        <div style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ padding: "12px 16px 6px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.6px" }}>
              {currentCategory.emoji} {currentCategory.name}
            </h3>
          </div>
          {currentCategory.items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              quantity={cart.find((c) => c.item.id === item.id)?.quantity ?? 0}
              onClick={setSelectedItem}
            />
          ))}
        </div>

        {/* Footer inline */}
        <div style={{ padding: "28px 16px", textAlign: "center" }}>
          <p style={{ fontSize: 22, marginBottom: 6 }}>🍔🍇</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)", marginBottom: 2 }}>Elite Burguer & Açaí</p>
          <p style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.6 }}>Seg–Sex: 11h–23h · Sáb–Dom: 11h–00h</p>
          <a href="https://www.instagram.com/elite_burguereacai/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: 8, fontSize: 12, color: "var(--text-3)", textDecoration: "none" }}>
            @elite_burguereacai
          </a>
        </div>
      </div>

      {/* ── Floating cart ── */}
      {count > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          style={{
            position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
            zIndex: 50,
            background: "linear-gradient(135deg, #E8390E, #FF6B35)",
            color: "#fff", border: "none", borderRadius: 99,
            padding: "14px 24px",
            fontSize: 15, fontWeight: 800, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: "var(--shadow-brand), 0 8px 32px rgba(0,0,0,0.4)",
            whiteSpace: "nowrap", letterSpacing: "-0.2px",
          }}
        >
          <span style={{
            backgroundColor: "rgba(255,255,255,0.25)",
            borderRadius: "50%", width: 26, height: 26,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, backdropFilter: "blur(4px)",
          }}>{count}</span>
          Ver sacola
          <span style={{ opacity: 0.85, fontSize: 14 }}>· R$ {total.toFixed(2).replace(".", ",")}</span>
        </button>
      )}

      <ProductDetailModal
        item={selectedItem}
        quantity={cart.find((c) => c.item.id === selectedItem?.id)?.quantity ?? 0}
        onClose={() => setSelectedItem(null)}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />

      <CartDrawer
        cart={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      <CheckoutScreen
        cart={cart}
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onConfirm={handleConfirm}
      />
    </main>
  );
}
