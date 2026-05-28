import type { MenuItem } from "./menu";

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export function cartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
}

export function cartCount(cart: CartItem[]): number {
  return cart.reduce((sum, c) => sum + c.quantity, 0);
}

export function addToCart(cart: CartItem[], item: MenuItem): CartItem[] {
  const existing = cart.find((c) => c.item.id === item.id);
  if (existing) {
    return cart.map((c) =>
      c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
    );
  }
  return [...cart, { item, quantity: 1 }];
}

export function removeFromCart(cart: CartItem[], itemId: string): CartItem[] {
  return cart
    .map((c) => (c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c))
    .filter((c) => c.quantity > 0);
}

// Mock PIX EMV payload
export function buildPixPayload(total: number): string {
  const valor = total.toFixed(2);
  return `00020126360014BR.GOV.BCB.PIX0114+55119999999995204000053039865406${valor}5802BR5921Elite Burguer e Acai6009SAO PAULO62070503***6304ABCD`;
}

// Mock Stone checkout link
export const STONE_PAYMENT_URL = "https://link.stone.com.br/pay/elite-burguer-mock";
