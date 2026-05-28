import type { MenuItem } from "./menu";

export function buildWhatsAppUrl(phone: string, item?: MenuItem): string {
  const base = `https://wa.me/${phone.replace(/\D/g, "")}`;
  const text = item
    ? `Olá! Quero pedir: *${item.name}* - R$${item.price.toFixed(2).replace(".", ",")}. Pode confirmar disponibilidade?`
    : "Olá! Quero fazer um pedido. Pode me ajudar?";
  return `${base}?text=${encodeURIComponent(text)}`;
}
