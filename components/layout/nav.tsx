"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <span aria-hidden="true" className="text-haze"> ↗</span>
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
              className="inline-block rounded-md px-3 py-2 text-sm text-mist transition-colors hover:text-teal-bright"
            />
            {item.children && (
              <ul className="absolute left-0 top-full z-50 hidden min-w-56 rounded-md border border-white/10 bg-navy-card p-1 shadow-xl group-hover:block group-focus-within:block">
                {item.children.map((child) => (
                  <li key={child.label}>
                    <NavLink
                      item={child}
                      className="block rounded-md px-3 py-2 text-sm text-mist transition-colors hover:bg-white/[0.06] hover:text-teal-bright"
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>
      {open && (
        <ul
          id="mobile-nav"
          className="absolute left-0 right-0 top-full z-50 border-b border-white/[0.06] bg-navy-deep p-4 md:hidden"
        >
          {items.map((item) => (
            <li key={item.label} className="py-1">
              <NavLink
                item={item}
                onNavigate={close}
                className="block rounded-md px-2 py-2 font-bold text-fog transition-colors hover:text-teal-bright"
              />
              {item.children && (
                <ul className="ml-4 border-l border-white/10 pl-2">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <NavLink
                        item={child}
                        onNavigate={close}
                        className="block rounded-md px-2 py-2 text-sm text-mist transition-colors hover:text-teal-bright"
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
