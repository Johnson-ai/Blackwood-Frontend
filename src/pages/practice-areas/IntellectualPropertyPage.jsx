import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, ArrowLeft, Lightbulb } from 'lucide-react';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';

const STATUTES = [
  { name: 'Trade Marks Act Cap. T13, LFN 2004', detail: 'Governs trademark registration, ownership, and infringement proceedings before the FHC.' },
  { name: 'Patents and Designs Act Cap. P2, LFN 2004', detail: 'Governs patent registration at the Commercial Law Department, and design protection.' },
  { name: 'Copyright Act Cap. C28, LFN 2004 (as amended)', detail: 'Protects literary, artistic, musical, film, sound recording, and broadcast works.' },
  { name: 'Standards Organisation of Nigeria Act 2015', detail: 'Governs product standards, certification, and anti-counterfeiting enforcement.' },
  { name: 'CFRN 1999 — Section 44', detail: 'Protects property rights, including intellectual property from compulsory acquisition without compensation.' },
];

const SERVICES = [
  'Trademark registration and prosecution before the TM Registry (Abuja)',
  'Patent filing and prosecution at the Commercial Law Dept. (FMITI)',
  'Design registration and protection',
  'Copyright registration and enforcement (NCC)',
  'IP infringement litigation before the Federal High Court',
  'Anton Piller (search and seizure) orders in IP cases',
  'Passing-off actions under Nigerian common law',
  'Domain name disputes and digital IP protection',
  'Technology licensing and franchise agreements',
  'IP due diligence for M&A transactions',
  'Brand protection and anti-counterfeiting strategies',
  'Software and app licensing agreements under Nigerian law',
];

export default function IntellectualPropertyPage() {
  return (
    <Layout>
      <PageHero subtitle="Practice Area" title="Intellectual Property" description="Protecting your innovations, brands, and creative works under the TMA, Patents Act, and Copyright Act." />
      <section className="py-12 md:py-16 lg:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <Link to="/practice-areas" className="inline-flex items-center gap-2 text-charcoal-500 hover:text-gold-500 text-xs font-body uppercase tracking-widest mb-6 md:mb-10 transition-colors"><ArrowLeft size={13}/> All Practice Areas</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Overview</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <p className="text-charcoal-400 font-body leading-relaxed mb-4">Nigeria's intellectual property regime — governed by the Trade Marks Act, Patents and Designs Act, and Copyright Act — is administered through the Commercial Law Department of the Federal Ministry of Industry, Trade and Investment (FMITI), the Trademarks Registry in Abuja, and enforced via the Federal High Court, which has exclusive jurisdiction over IP matters.</p>
                <p className="text-charcoal-400 font-body leading-relaxed">With Nigeria's growing technology sector and creative industries, robust IP protection is more important than ever. Our IP team registers, licenses, and enforces all forms of intellectual property for Nigerian and international clients.</p>
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">IP Registration Process in Nigeria</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { type: 'Trademark', duration: '18–24 months', body: 'Trademarks Registry, Abuja', classes: '45 Nice Classes' },
                    { type: 'Patent', duration: '2–4 years', body: 'Commercial Law Dept., FMITI', classes: '20-year protection' },
                    { type: 'Copyright', duration: 'Automatic + Registration', body: 'NCC (Nigerian Copyright Commission)', classes: '70 years (author\'s life + 70)' },
                  ].map(r => (
                    <div key={r.type} className="border border-charcoal-900 bg-charcoal-950 p-5 text-center">
                      <h4 className="font-display text-xl text-white font-light mb-3">{r.type}</h4>
                      <p className="text-gold-500 text-xs font-body mb-1">{r.duration}</p>
                      <p className="text-charcoal-500 text-[10px] font-body">{r.body}</p>
                      <p className="text-charcoal-700 text-[10px] font-body mt-1">{r.classes}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Our Services</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <ul className="space-y-3">
                  {SERVICES.map((s, i) => (<li key={i} className="flex items-start gap-3"><Check size={13} className="text-gold-500 mt-1 flex-shrink-0"/><span className="text-charcoal-400 text-sm font-body">{s}</span></li>))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border border-charcoal-900 bg-charcoal-950 p-5">
                <div className="flex items-center gap-2 mb-4"><BookOpen size={15} className="text-gold-500"/><h3 className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body">Governing Legislation</h3></div>
                <div className="space-y-4">
                  {STATUTES.map((s, i) => (<div key={i} className="border-b border-charcoal-900 pb-4 last:border-0 last:pb-0"><p className="text-white text-xs font-body font-semibold mb-1">{s.name}</p><p className="text-charcoal-600 text-[10px] font-body leading-relaxed">{s.detail}</p></div>))}
                </div>
              </div>
              <div className="border border-gold-500/20 bg-gold-500/5 p-6">
                <Lightbulb size={20} className="text-gold-500 mb-3"/>
                <h3 className="font-display text-xl text-white font-light mb-2">Protect Your Brand</h3>
                <p className="text-charcoal-500 text-xs font-body leading-relaxed mb-4">Don't wait until your brand is copied. Register your trademark now — unregistered marks have limited protection in Nigeria.</p>
                <Link to="/book-consultation" className="btn-gold w-full justify-center text-xs py-3">Get IP Advice <ArrowRight size={13}/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
