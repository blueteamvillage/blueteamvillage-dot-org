"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavItem } from "@/types/content";

function NavLink({
  item,
  onNavigate,
  className = "",
}: {
  item: NavItem;
  onNavigate?: () => void;
  className?: string;
}) {
  if (item.external || item.href.startsWith("http")) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {item.label}
        <span aria-hidden="true" className="text-mist"> ↗</span>
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export function Nav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav aria-label="Main">
      {/* Desktop */}
      <ul className="hidden md:flex items-center gap-1">
        {items.map((item) => (
          <li key={item.label} className="relative group">
            <NavLink
              item={item}
              className="inline-block rounded px-3 py-2 text-sm font-bold text-foam hover:text-mint"
            />
            {item.children && (
              <ul className="absolute left-0 top-full z-50 hidden min-w-56 rounded-md border border-teal bg-abyss p-1 shadow-xl group-hover:block group-focus-within:block">
                {item.children.map((child) => (
                  <li key={child.label}>
                    <NavLink
                      item={child}
                      className="block rounded px-3 py-2 text-sm text-foam hover:bg-navy hover:text-mint"
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <button
        type="button"
        className="md:hidden rounded border border-teal px-3 py-2 text-sm font-bold text-foam"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "close nav" : "open nav"}
      </button>
      {open && (
        <ul
          id="mobile-nav"
          className="absolute left-0 right-0 top-full z-50 border-b border-teal bg-abyss p-4 md:hidden"
        >
          {items.map((item) => (
            <li key={item.label} className="py-1">
              <NavLink
                item={item}
                onNavigate={close}
                className="block rounded px-2 py-2 font-bold text-foam hover:text-mint"
              />
              {item.children && (
                <ul className="ml-4 border-l border-teal pl-2">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <NavLink
                        item={child}
                        onNavigate={close}
                        className="block rounded px-2 py-2 text-sm text-mist hover:text-mint"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
