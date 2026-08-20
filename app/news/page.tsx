import type { Metadata } from 'next';
import { StubPage } from '@/components/stub-page';

export const metadata: Metadata = {
  title: 'News & Aktionen',
  description: 'Neuigkeiten und Aktionen von Allgäu Wings.',
  alternates: { canonical: '/news/' },
};

export default function NewsPage() {
  return <StubPage title="News & Aktionen" note="News folgen in Phase 5 (Quelle: extract/html/news-und-aktionen.html)." />;
}
