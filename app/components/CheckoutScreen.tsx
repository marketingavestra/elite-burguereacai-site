"use client";

import { useState } from "react";
import Image from "next/image";
import type { CartItem } from "@/lib/cart";
import { cartTotal, buildPixPayload } from "@/lib/cart";

type Step = "address" | "payment" | "confirmed";
type PayMethod = "pix" | "stone" | null;

interface Props {
  cart: CartItem[];
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DOTS_STEP: Record<Step, number> = { address: 1, payment: 2, confirmed: 3 };
const MOCK_ADDR = { street: "Rua das Acácias, 143", neighborhood: "Centro", city: "São Paulo - SP", zip: "01234-000" };

/* ── Stone inline card form ────────────────────── */
function StoneCardForm({ total, onConfirm }: { total: number; onConfirm: () => void }) {
  const [cardNum, setCardNum] = useState("");
  const [holder, setHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [installment, setInstallment] = useState("1");

  const fmt = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExp = (v: string) =>
    v.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");

  const ready = cardNum.replace(/\s/g, "").length === 16 && holder.length > 2 && expiry.length === 5 && cvv.length >= 3;

  return (
    <div style={{ backgroundColor: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden" }}>
      {/* Stone header */}
      <div style={{
        background: "linear-gradient(135deg, #00A868 0%, #00d084 100%)",
        padding: "14px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>💳</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Stone</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>Checkout seguro</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>Total</p>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "-0.4px" }}>
            R$ {total.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>

      {/* Card visual */}
      <div style={{
        margin: "16px 16px 0",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        borderRadius: 12, padding: "18px 18px 14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -30, left: -10, width: 140, height: 140, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.03)" }} />
        <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "1.5px", marginBottom: 16 }}>CARTÃO DE CRÉDITO/DÉBITO</p>
        <p style={{ fontSize: 19, fontWeight: 700, color: "#fff", letterSpacing: "3px", marginBottom: 16, fontVariantNumeric: "tabular-nums" }}>
          {cardNum || "•••• •••• •••• ••••"}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: 2 }}>TITULAR</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>
              {holder || "SEU NOME"}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: 2 }}>VALIDADE</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{expiry || "MM/AA"}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>
            Número do cartão
          </label>
          <input
            inputMode="numeric"
            placeholder="0000 0000 0000 0000"
            value={cardNum}
            onChange={(e) => setCardNum(fmt(e.target.value))}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border-strong)", backgroundColor: "var(--surface-raised)", fontSize: 15, color: "var(--text-1)", outline: "none", letterSpacing: "2px", fontVariantNumeric: "tabular-nums" }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>
            Nome no cartão
          </label>
          <input
            placeholder="Como aparece no cartão"
            value={holder}
            onChange={(e) => setHolder(e.target.value.toUpperCase())}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border-strong)", backgroundColor: "var(--surface-raised)", fontSize: 14, color: "var(--text-1)", outline: "none", textTransform: "uppercase", letterSpacing: "0.5px" }}
          />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Validade</label>
            <input
              inputMode="numeric"
              placeholder="MM/AA"
              value={expiry}
              onChange={(e) => setExpiry(fmtExp(e.target.value))}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border-strong)", backgroundColor: "var(--surface-raised)", fontSize: 14, color: "var(--text-1)", outline: "none", letterSpacing: "1px" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>CVV</label>
            <input
              inputMode="numeric"
              placeholder="•••"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border-strong)", backgroundColor: "var(--surface-raised)", fontSize: 14, color: "var(--text-1)", outline: "none", letterSpacing: "3px" }}
            />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Parcelamento</label>
          <select
            value={installment}
            onChange={(e) => setInstallment(e.target.value)}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border-strong)", backgroundColor: "var(--surface-raised)", fontSize: 14, color: "var(--text-1)", outline: "none", cursor: "pointer" }}
          >
            <option value="1">1× de R$ {total.toFixed(2).replace(".", ",")} (sem juros)</option>
            <option value="2">2× de R$ {(total / 2).toFixed(2).replace(".", ",")} (sem juros)</option>
            <option value="3">3× de R$ {(total / 3).toFixed(2).replace(".", ",")} (sem juros)</option>
          </select>
        </div>
      </div>

      {/* Confirm */}
      <div style={{ padding: "14px 16px 18px" }}>
        <button
          onClick={onConfirm}
          disabled={!ready}
          style={{
            width: "100%", padding: "15px 0", borderRadius: 99, border: "none",
            background: ready ? "linear-gradient(135deg, #00A868, #00d084)" : "var(--surface-border)",
            color: "#fff", fontSize: 15, fontWeight: 800,
            cursor: ready ? "pointer" : "not-allowed",
            letterSpacing: "-0.2px",
            boxShadow: ready ? "0 4px 20px rgba(0,168,104,0.4)" : "none",
            transition: "all 0.2s ease",
          }}
        >
          {ready ? `Confirmar pagamento · R$ ${total.toFixed(2).replace(".", ",")}` : "Preencha os dados do cartão"}
        </button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 10 }}>
          <span style={{ fontSize: 12 }}>🔒</span>
          <span style={{ fontSize: 11, color: "var(--text-3)" }}>Pagamento 100% seguro via Stone</span>
        </div>
      </div>
    </div>
  );
}

function NavBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 10,
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      backgroundColor: "rgba(12,12,12,0.9)",
      borderBottom: "1px solid var(--border)",
      padding: "14px 16px",
      display: "flex", alignItems: "center",
    }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--success)", fontWeight: 700, marginRight: 12 }}>←</button>
      <h2 style={{ flex: 1, textAlign: "center", fontSize: 17, fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.3px" }}>{title}</h2>
      <div style={{ width: 32 }} />
    </div>
  );
}

function Dots({ step }: { step: Step }) {
  const current = DOTS_STEP[step];
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
      {[0,1,2,3].map((i) => (
        <div key={i} style={{
          height: 8, borderRadius: 99,
          width: i === current ? 22 : 8,
          backgroundColor: i <= current ? "var(--success)" : "var(--surface-border)",
          transition: "all 0.25s ease",
        }} />
      ))}
    </div>
  );
}

function Input({ placeholder, value, onChange, type = "text" }: { placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%", padding: "13px 15px",
        borderRadius: 12, border: "1px solid var(--border-strong)",
        backgroundColor: "var(--surface-raised)",
        fontSize: 14, color: "var(--text-1)", outline: "none",
      }}
    />
  );
}

export default function CheckoutScreen({ cart, open, onClose, onConfirm }: Props) {
  const [step, setStep] = useState<Step>("address");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<PayMethod>(null);

  const total = cartTotal(cart);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=12&data=${encodeURIComponent(buildPixPayload(total))}`;

  function goBack() {
    if (step === "address") onClose();
    else if (step === "payment") setStep("address");
    else { onConfirm(); setStep("address"); setMethod(null); setName(""); setPhone(""); }
  }

  function handleConfirm() {
    setStep("confirmed");
    setTimeout(() => { onConfirm(); setStep("address"); setMethod(null); setName(""); setPhone(""); }, 3500);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 85,
      backgroundColor: "var(--bg)",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
      overflowY: "auto", display: "flex", flexDirection: "column",
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* ── ADDRESS ── */}
        {step === "address" && (
          <>
            <NavBar title="Endereço de entrega" onBack={goBack} />
            <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 4 }}>Selecione o endereço de entrega</p>

              {/* Add new */}
              <button style={{
                width: "100%", padding: "14px 16px", borderRadius: 14,
                border: "1.5px dashed var(--success)",
                background: "var(--success-muted)",
                color: "var(--success)", fontSize: 14, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>📍 Adicionar novo endereço</button>

              {/* Saved address */}
              <div style={{
                backgroundColor: "var(--surface)",
                border: "1.5px solid var(--success)",
                borderRadius: 14, padding: "14px 16px",
                display: "flex", alignItems: "flex-start", justifyContent: "space-between",
              }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)", marginBottom: 3 }}>{MOCK_ADDR.street}</p>
                  <p style={{ fontSize: 13, color: "var(--text-2)" }}>{MOCK_ADDR.neighborhood}</p>
                  <p style={{ fontSize: 13, color: "var(--text-2)" }}>{MOCK_ADDR.city}</p>
                  <p style={{ fontSize: 13, color: "var(--text-2)" }}>{MOCK_ADDR.zip}</p>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                  border: "2px solid var(--success)", backgroundColor: "var(--success)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#fff" }} />
                </div>
              </div>

              {/* Customer data */}
              <div style={{ backgroundColor: "var(--surface)", borderRadius: 14, padding: "16px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.6px" }}>Seus dados</p>
                <Input placeholder="Seu nome" value={name} onChange={setName} />
                <Input placeholder="WhatsApp (DDD + número)" value={phone} onChange={setPhone} type="tel" />
              </div>
            </div>

            <div style={{ position: "sticky", bottom: 0, backdropFilter: "blur(20px)", backgroundColor: "rgba(12,12,12,0.95)", borderTop: "1px solid var(--border)", padding: "12px 16px 28px" }}>
              <Dots step="address" />
              <button onClick={() => setStep("payment")} disabled={!name || !phone} style={{
                width: "100%", padding: "16px 0", borderRadius: 99, border: "none",
                background: name && phone ? "linear-gradient(135deg, var(--success), #00b85e)" : "var(--surface-border)",
                color: "#fff", fontSize: 16, fontWeight: 800, letterSpacing: "-0.3px",
                cursor: name && phone ? "pointer" : "not-allowed",
                boxShadow: name && phone ? "var(--shadow-success)" : "none",
              }}>Continuar para Pagamento</button>
            </div>
          </>
        )}

        {/* ── PAYMENT ── */}
        {step === "payment" && (
          <>
            <NavBar title="Forma de pagamento" onBack={goBack} />
            <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Order summary */}
              <div style={{ backgroundColor: "var(--surface)", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 10 }}>Resumo</p>
                {cart.map(({ item, quantity }) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: "var(--text-2)" }}>{quantity}× {item.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>R$ {(item.price * quantity).toFixed(2).replace(".", ",")}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 10, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)" }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "var(--brand)", letterSpacing: "-0.4px" }}>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>

              {/* Method selector */}
              <div style={{ display: "flex", gap: 10 }}>
                {([["pix", "💠", "PIX", "Instantâneo · sem taxas"], ["stone", "💳", "Cartão", "Stone · débito ou crédito"]] as const).map(([id, icon, label, sub]) => (
                  <button key={id} onClick={() => setMethod(id)} style={{
                    flex: 1, padding: "16px 8px", borderRadius: 14,
                    border: `1.5px solid ${method === id ? "var(--brand)" : "var(--border-strong)"}`,
                    background: method === id ? "var(--brand-muted)" : "var(--surface)",
                    cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                    transition: "all 0.15s ease",
                  }}>
                    <span style={{ fontSize: 26 }}>{icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: method === id ? "var(--brand)" : "var(--text-1)", letterSpacing: "-0.2px" }}>{label}</span>
                    <span style={{ fontSize: 11, color: "var(--text-2)", textAlign: "center" }}>{sub}</span>
                  </button>
                ))}
              </div>

              {/* PIX panel */}
              {method === "pix" && (
                <div style={{ backgroundColor: "var(--surface)", borderRadius: 14, padding: "20px 16px", border: "1px solid var(--border)", textAlign: "center" }}>
                  <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 16 }}>Escaneie o QR Code ou copie a chave</p>
                  <div style={{ display: "inline-block", padding: 10, backgroundColor: "#fff", borderRadius: 14, marginBottom: 14, boxShadow: "var(--shadow-md)" }}>
                    <Image src={qrUrl} alt="QR PIX" width={176} height={176} style={{ display: "block" }} />
                  </div>
                  <div style={{
                    backgroundColor: "var(--surface-raised)", borderRadius: 10,
                    padding: "10px 12px", display: "flex", alignItems: "center",
                    justifyContent: "space-between", gap: 8, marginBottom: 14,
                    border: "1px solid var(--border-strong)",
                  }}>
                    <span style={{ fontSize: 12, color: "var(--text-2)", wordBreak: "break-all", textAlign: "left" }}>elite.burguereacai@stone</span>
                    <button onClick={() => navigator.clipboard?.writeText("elite.burguereacai@stone")} style={{
                      flexShrink: 0, background: "linear-gradient(135deg, #E8390E, #FF6B35)",
                      color: "#fff", border: "none", borderRadius: 8,
                      padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer",
                    }}>Copiar</button>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "var(--brand)", marginBottom: 14, letterSpacing: "-0.3px" }}>
                    R$ {total.toFixed(2).replace(".", ",")}
                  </p>
                  <button onClick={handleConfirm} style={{
                    width: "100%", padding: "15px 0", borderRadius: 99, border: "none",
                    background: "linear-gradient(135deg, var(--success), #00b85e)",
                    color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer",
                    letterSpacing: "-0.2px", boxShadow: "var(--shadow-success)",
                  }}>✅ Já paguei — confirmar</button>
                </div>
              )}

              {/* Stone panel — inline card form */}
              {method === "stone" && (
                <StoneCardForm total={total} onConfirm={handleConfirm} />
              )}

              {!method && (
                <p style={{ textAlign: "center", color: "var(--text-3)", fontSize: 13, padding: "8px 0" }}>
                  Selecione uma forma de pagamento acima
                </p>
              )}
            </div>

            <div style={{ position: "sticky", bottom: 0, backdropFilter: "blur(20px)", backgroundColor: "rgba(12,12,12,0.95)", borderTop: "1px solid var(--border)", padding: "12px 16px 28px" }}>
              <Dots step="payment" />
            </div>
          </>
        )}

        {/* ── CONFIRMED ── */}
        {step === "confirmed" && (
          <>
            <NavBar title="Pedido confirmado!" onBack={goBack} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", gap: 18 }}>
              <div style={{
                width: 90, height: 90, borderRadius: "50%",
                background: "var(--success-muted)",
                border: "2px solid var(--success)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 44,
                boxShadow: "var(--shadow-success)",
              }}>🎉</div>
              <div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.6px", marginBottom: 8 }}>Pedido recebido!</h2>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>
                  Em breve entraremos em contato pelo WhatsApp para confirmar seu pedido.
                </p>
              </div>
              <div style={{
                backgroundColor: "var(--surface)", borderRadius: 16, padding: "20px 28px",
                border: "1px solid var(--border)", width: "100%",
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 6 }}>Número do pedido</p>
                <p style={{ fontSize: 32, fontWeight: 800, color: "var(--brand)", letterSpacing: "-1px" }}>
                  #{Math.floor(Math.random() * 9000) + 1000}
                </p>
              </div>
              <Dots step="confirmed" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
