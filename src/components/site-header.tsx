'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { mainNav } from '@/lib/nav';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Allgäu Wings Startseite">
          <Image src="/logo.png" alt="Allgäu Wings" width={62} height={36} priority className="h-9 w-auto" />
          <span className="font-heading text-lg font-bold tracking-wide">ALLGÄU WINGS</span>
        </Link>

        {/* Desktop-Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {mainNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/90 transition-colors hover:text-white"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5" aria-hidden />}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full min-w-56 rounded-md border border-border bg-card p-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded px-3 py-2 text-sm text-card-foreground hover:bg-secondary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="accent" size="sm">
            <Link href="/rundfluege/">Jetzt buchen</Link>
          </Button>
        </div>

        {/* Mobile-Toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 lg:hidden"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile-Drawer */}
      <div className={cn('lg:hidden', open ? 'block' : 'hidden')}>
        <nav
          className="max-h-[calc(100dvh-4rem)] space-y-1 overflow-y-auto overscroll-contain border-t border-white/10 bg-primary px-4 pb-6 pt-2"
          aria-label="Mobile Navigation"
        >
          {mainNav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block rounded px-3 py-2 text-base font-medium text-primary-foreground/90 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-3 border-l border-white/15 pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded px-3 py-1.5 text-sm text-primary-foreground/70 hover:bg-white/10"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button asChild variant="accent" className="mt-3 w-full">
            <Link href="/rundfluege/" onClick={() => setOpen(false)}>
              Jetzt buchen
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
