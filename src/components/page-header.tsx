export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="border-b border-border bg-gradient-to-br from-primary to-[#0d2a4a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="max-w-3xl font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-white/80">{lead}</p>}
      </div>
    </section>
  );
}
