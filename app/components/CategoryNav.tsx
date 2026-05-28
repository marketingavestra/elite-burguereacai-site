"use client";

import type { Category } from "@/lib/menu";

interface Props {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryNav({ categories, active, onChange }: Props) {
  return (
    <nav style={{
      position: "sticky", top: 68, zIndex: 40,
      backgroundColor: "rgba(12,12,12,0.92)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div className="hide-scrollbar" style={{
        maxWidth: 480, margin: "0 auto",
        overflowX: "auto",
        display: "flex", gap: 6, padding: "10px 14px",
      }}>
        {categories.map((cat) => {
          const isActive = cat.id === active;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              style={{
                flexShrink: 0,
                padding: "7px 16px",
                borderRadius: 99,
                border: isActive ? "1px solid var(--brand)" : "1px solid var(--border-strong)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                background: isActive
                  ? "linear-gradient(135deg, #E8390E, #FF6B35)"
                  : "var(--surface)",
                color: isActive ? "#fff" : "var(--text-2)",
                letterSpacing: isActive ? "-0.2px" : 0,
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
                boxShadow: isActive ? "var(--shadow-brand)" : "none",
              }}
            >
              {cat.emoji} {cat.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
