export default function PageHero({ subtitle, title, description }) {
  return (
    <section className="relative pt-28 pb-16 bg-charcoal-950 overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 39px, #C9A84C 39px, #C9A84C 40px)` }} />
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-gold-500 to-transparent opacity-30" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-12">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-px w-8 bg-gold-500 flex-shrink-0" />
          <span className="section-subtitle">{subtitle}</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-light leading-tight mb-5">{title}</h1>
        {description && (
          <p className="text-charcoal-400 text-base sm:text-lg font-body max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
