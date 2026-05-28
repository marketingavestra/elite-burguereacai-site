export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
}

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000";

export const menu: Category[] = [
  {
    id: "burguers",
    name: "Hambúrgueres",
    emoji: "🍔",
    items: [
      {
        id: "smash-classic",
        name: "Smash Classic",
        description: "Blend angus 180g no pão brioche, queijo americano, alface, tomate, picles e molho especial da casa",
        price: 29.90,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
        badge: "Mais Pedido",
      },
      {
        id: "smash-bacon",
        name: "Smash Bacon",
        description: "Blend angus 180g, bacon crocante, queijo cheddar derretido, cebola caramelizada e aioli defumado",
        price: 34.90,
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80",
      },
      {
        id: "elite-especial",
        name: "Elite Especial",
        description: "Dois blends angus 120g, queijo duplo, bacon crocante, cogumelos salteados e molho trufado",
        price: 42.90,
        image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80",
        badge: "Destaque",
      },
      {
        id: "frango-crocante",
        name: "Elite Chicken",
        description: "Frango empanado crocante, queijo prato derretido, alface americana e mayo de ervas finas",
        price: 28.90,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80",
      },
    ],
  },
  {
    id: "acai",
    name: "Açaí",
    emoji: "🍇",
    items: [
      {
        id: "acai-tigela-300",
        name: "Tigela de Açaí 300ml",
        description: "Açaí cremoso batido na hora com granola crocante, banana fatiada, leite condensado e mel",
        price: 18.90,
        image: "https://images.unsplash.com/photo-1684403620650-81dc661a69db?w=400&q=80",
        badge: "Favorito",
      },
      {
        id: "acai-tigela-500",
        name: "Tigela de Açaí 500ml",
        description: "Açaí cremoso com granola, morango fresco, banana, leite condensado, mel e paçoca por cima",
        price: 24.90,
        image: "https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?w=400&q=80",
      },
      {
        id: "acai-tigela-700",
        name: "Tigela de Açaí 700ml",
        description: "Açaí na tigela grande, mix de frutas da estação, granola premium, leite condensado e Nutella",
        price: 32.90,
        image: "https://images.unsplash.com/photo-1684403731883-67a71a793d2d?w=400&q=80",
        badge: "Leva mais",
      },
      {
        id: "acai-copo-300",
        name: "Copão de Açaí 300ml",
        description: "Para levar! Açaí cremoso no copo com granola crocante e banana. Simples e delicioso",
        price: 14.90,
        image: "https://images.unsplash.com/photo-1610441009633-b6ca9c6d4be2?w=400&q=80",
      },
    ],
  },
  {
    id: "sorvetes",
    name: "Sorvetes",
    emoji: "🍦",
    items: [
      {
        id: "casquinha",
        name: "Casquinha Dupla",
        description: "Duas bolas de sorvete na casquinha crocante. Sabores: chocolate, baunilha, morango ou creme",
        price: 9.90,
        image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80",
      },
      {
        id: "milkshake",
        name: "Milk Shake 400ml",
        description: "Sorvete cremoso batido no copo. Sabores: chocolate belga, morango, baunilha ou Oreo",
        price: 18.90,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80",
        badge: "Delícia",
      },
      {
        id: "sundae",
        name: "Sundae Especial",
        description: "Sorvete de creme com calda quente de chocolate ou morango, granola e cereja",
        price: 14.90,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
      },
    ],
  },
  {
    id: "acompanhamentos",
    name: "Acompanhs.",
    emoji: "🍟",
    items: [
      {
        id: "batata-frita",
        name: "Batata Frita Crocante",
        description: "Batata palito frita na hora, crocante por fora e macia por dentro. Acompanha molho da casa",
        price: 14.90,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
        badge: "Clássico",
      },
      {
        id: "batata-cheddar-bacon",
        name: "Batata com Cheddar & Bacon",
        description: "Batata frita crocante coberta com cheddar cremoso derretido e bacon em pedaços",
        price: 21.90,
        image: "https://images.unsplash.com/photo-1585257025867-2c56001c37b9?w=400&q=80",
      },
      {
        id: "onion-rings",
        name: "Onion Rings",
        description: "Anéis de cebola empanados no panko, fritos até dourar. Crocantes e irresistíveis",
        price: 16.90,
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80",
      },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    emoji: "🥤",
    items: [
      {
        id: "refri-lata",
        name: "Refrigerante Lata 350ml",
        description: "Coca-Cola, Guaraná Antarctica, Sprite, Fanta Laranja ou Laranja Zero",
        price: 7.00,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80",
      },
      {
        id: "suco-natural",
        name: "Suco Natural 500ml",
        description: "Feito na hora. Laranja, limão, maracujá, abacaxi com hortelã ou morango",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80",
      },
      {
        id: "agua",
        name: "Água Mineral 500ml",
        description: "Água mineral natural com ou sem gás",
        price: 4.00,
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80",
      },
    ],
  },
];
