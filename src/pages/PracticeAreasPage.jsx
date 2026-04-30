import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Scale, BookOpen } from 'lucide-react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { publicAPI } from '../utils/api';

// Each area has a dedicated page — every card links there
const AREA_META = {
  'Corporate Law':         { slug: 'corporate-law',        icon: '⚖️', statute: 'CAMA 2020' },
  'Criminal Defense':      { slug: 'criminal-defense',     icon: '🛡️', statute: 'ACJA 2015 · CFRN S.35-36' },
  'Family Law':            { slug: 'family-law',           icon: '👨‍👩‍👧', statute: 'Matrimonial Causes Act · CRA 2003' },
  'Real Estate Law':       { slug: 'real-estate-law',      icon: '🏛️', statute: 'Land Use Act 1978' },
  'Immigration Law':       { slug: 'immigration-law',      icon: '🌍', statute: 'Immigration Act 2015' },
  'Intellectual Property': { slug: 'intellectual-property',icon: '💡', statute: 'TMA Cap. T13 · Patents Act' },
  'Constitutional Law':    { slug: 'constitutional-law',   icon: '📜', statute: 'CFRN 1999 — Chapter IV' },
};

// Fallback static cards if DB has no areas seeded yet
const STATIC_AREAS = [
  { id: 1,  name: 'Constitutional Law',    short_description: 'Fundamental rights enforcement, judicial review, and Chapter IV CFRN litigation before the Supreme Court of Nigeria.' },
  { id: 2,  name: 'Corporate Law',         short_description: 'CAMA 2020 compliance, mergers, acquisitions, SEC filings, and corporate governance for Nigerian and international businesses.' },
  { id: 3,  name: 'Criminal Defense',      short_description: 'EFCC/ICPC defense, pre-charge bail under ACJA 2015, and Fundamental Rights Enforcement applications for detained clients.' },
  { id: 4,  name: 'Family Law',            short_description: 'Divorce under the Matrimonial Causes Act, custody and maintenance under the Child Rights Act, and adoption proceedings.' },
  { id: 5,  name: 'Real Estate Law',       short_description: 'Certificate of Occupancy, Governor\'s Consent under Section 22 LUA, title investigation, and property dispute litigation.' },
  { id: 6,  name: 'Immigration Law',       short_description: 'CERPAC, work permits, STR visas, deportation defense, and citizenship applications under the Immigration Act 2015.' },
  { id: 7,  name: 'Intellectual Property', short_description: 'Trademark and patent registration, copyright enforcement, IP litigation before the Federal High Court.' },
];

const CONSTITUTIONAL_RIGHTS = [
  { section: 'S.33', right: 'Right to Life' },
  { section: 'S.34', right: 'Right to Dignity' },
  { section: 'S.35', right: 'Personal Liberty' },
  { section: 'S.36', right: 'Fair Hearing' },
  { section: 'S.37', right: 'Right to Privacy' },
  { section: 'S.38', right: 'Freedom of Thought' },
  { section: 'S.39', right: 'Freedom of Expression' },
  { section: 'S.40', right: 'Freedom of Association' },
  { section: 'S.41', right: 'Freedom of Movement' },
  { section: 'S.42', right: 'Freedom from Discrimination' },
  { section: 'S.43', right: 'Right to Acquire Property' },
  { section: 'S.46', right: 'Enforcement of Rights' },
];

export default function PracticeAreasPage() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    publicAPI.getPracticeAreas()
      .then(r => setAreas(r.data?.length > 0 ? r.data : STATIC_AREAS))
      .catch(() => setAreas(STATIC_AREAS));
  }, []);

  function getSlug(name) {
    return AREA_META[name]?.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  function getIcon(area) {
    return area.icon || AREA_META[area.name]?.icon || '⚖️';
  }
  function getStatute(name) {
    return AREA_META[name]?.statute || '';
  }

  return (
    <Layout>
      <PageHero
        subtitle="Areas of Expertise"
        title="Practice Areas"
        description="Full-spectrum legal services grounded in Nigerian statutes, case law, and the Constitution of the Federal Republic of Nigeria, 1999."
      />

      {/* Chapter IV reference bar */}
      <section className="py-12 bg-black border-b border-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-gold-500" />
            <span className="section-subtitle">Fundamental Rights — Chapter IV, CFRN 1999</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {CONSTITUTIONAL_RIGHTS.map(r => (
              <Link key={r.section} to="/practice-areas/constitutional-law"
                className="border border-charcoal-900 hover:border-gold-500/40 bg-charcoal-950 px-3 py-2.5 group transition-colors">
                <p className="font-mono text-gold-500 text-[9px] tracking-widest mb-1">{r.section}</p>
                <p className="text-white text-[11px] font-body group-hover:text-gold-400 transition-colors leading-tight">{r.right}</p>
              </Link>
            ))}
          </div>
          <p className="text-charcoal-700 text-[10px] font-body mt-4 italic">
            Enforceable via Fundamental Rights Enforcement Summons — Order II, FR (Enforcement Procedure) Rules 2009.{' '}
            <Link to="/practice-areas/constitutional-law" className="text-gold-500/60 hover:text-gold-500 transition-colors">Learn more →</Link>
          </p>
        </div>
      </section>

      {/* Practice area cards — each links to its own page */}
      <section className="py-12 md:py-16 lg:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => {
              const slug = getSlug(area.name);
              const statute = getStatute(area.name);
              return (
                <Link key={area.id} to={`/practice-areas/${slug}`}
                  className="group border border-charcoal-900 hover:border-gold-500/40 bg-charcoal-950 p-7 transition-all duration-300 relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-gold-500 group-hover:w-full transition-all duration-500" />

                  <div className="text-4xl mb-4">{getIcon(area)}</div>
                  <h3 className="font-display text-2xl text-white group-hover:text-gold-400 transition-colors font-light mb-2">
                    {area.name}
                  </h3>
                  {statute && (
                    <p className="font-mono text-gold-500/50 text-[9px] tracking-widest mb-3">{statute}</p>
                  )}
                  <p className="text-charcoal-500 text-sm font-body leading-relaxed mb-6 flex-1">
                    {area.short_description}
                  </p>
                  <div className="flex items-center gap-2 text-gold-500 text-[10px] font-body tracking-[0.2em] uppercase mt-auto
                    group-hover:gap-3 transition-all">
                    Explore Practice Area <ArrowRight size={11} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed breakdown — each area with statutes, now with real links */}
      <section className="py-16 bg-charcoal-950 border-t border-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="section-subtitle mb-3 block">Governing Nigerian Legislation</span>
            <h2 className="font-display text-4xl text-white font-light">Statutes We Practice Under</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { area: 'Corporate Law', slug: 'corporate-law', laws: ['CAMA 2020', 'ISA 2007', 'SEC Act 2007', 'FCCP Act 2018', 'NIPC Act'] },
              { area: 'Criminal Defense', slug: 'criminal-defense', laws: ['ACJA 2015', 'EFCC Act 2004', 'ICPC Act 2000', 'CYBA 2015', 'Criminal Code Cap. C38'] },
              { area: 'Constitutional Law', slug: 'constitutional-law', laws: ['CFRN 1999', 'FR Enforcement Rules 2009', 'Electoral Act 2022', 'FOI Act 2011', 'Police Act 2020'] },
              { area: 'Family Law', slug: 'family-law', laws: ['Matrimonial Causes Act Cap. M7', 'Child Rights Act 2003', 'Marriage Act Cap. M6', 'Evidence Act 2011'] },
              { area: 'Real Estate Law', slug: 'real-estate-law', laws: ['Land Use Act Cap. L5 (1978)', 'Mortgage Institutions Act', 'Registration of Titles Law', 'CFRN S.43 & S.44'] },
              { area: 'Immigration Law', slug: 'immigration-law', laws: ['Immigration Act 2015', 'NIS Regulations', 'CFRN S.25–32 (Citizenship)', 'NAPTIP Act 2015'] },
              { area: 'Intellectual Property', slug: 'intellectual-property', laws: ['Trade Marks Act Cap. T13', 'Patents & Designs Act Cap. P2', 'Copyright Act Cap. C28', 'SON Act 2015'] },
            ].map(item => (
              <Link key={item.area} to={`/practice-areas/${item.slug}`}
                className="border border-charcoal-900 hover:border-gold-500/20 bg-black p-5 group transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-body text-white text-sm font-semibold group-hover:text-gold-400 transition-colors">{item.area}</h4>
                  <ArrowRight size={13} className="text-charcoal-700 group-hover:text-gold-500 transition-colors" />
                </div>
                <div className="space-y-1.5">
                  {item.laws.map(law => (
                    <div key={law} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gold-500/40 rounded-full flex-shrink-0" />
                      <span className="text-charcoal-600 text-[10px] font-body">{law}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nigerian court hierarchy */}
      <section className="py-12 bg-black border-y border-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <p className="text-charcoal-600 text-[9px] font-body tracking-[0.4em] uppercase mb-6">Nigeria's Judicial Hierarchy — We Practice at Every Level</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Supreme Court of Nigeria', 'Court of Appeal', 'Federal High Court', 'State High Courts', 'National Industrial Court', 'Magistrate Courts', 'Customary Courts', 'Sharia Courts'].map((court, i, arr) => (
              <span key={court} className="flex items-center gap-2">
                <span className="text-charcoal-500 text-xs font-body border border-charcoal-900 px-3 py-1.5 hover:border-gold-500/30 hover:text-charcoal-300 transition-colors">{court}</span>
                {i < arr.length - 1 && <span className="text-gold-500/20 text-lg">›</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20 bg-charcoal-950">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl text-white font-light mb-4">Not Sure Which Area Applies?</h2>
          <p className="text-charcoal-500 font-body mb-8 text-sm leading-relaxed">
            Book a free 30-minute case assessment and our team will identify the right practice area and assign a specialist attorney.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/book-consultation" className="btn-gold text-sm">Free Case Assessment <ArrowRight size={13} /></Link>
            <Link to="/contact" className="btn-outline-gold text-sm">Call Our Offices</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
