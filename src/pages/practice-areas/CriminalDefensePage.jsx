import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, Shield, ArrowLeft, Phone } from 'lucide-react';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';

const STATUTES = [
  { name: 'Administration of Criminal Justice Act (ACJA) 2015', detail: 'Governs criminal procedure in federal courts — bail, arraignment, trial timelines, and custodial rights.' },
  { name: 'EFCC (Establishment) Act 2004', detail: 'Establishes the EFCC and its powers to investigate and prosecute financial crimes.' },
  { name: 'ICPC Act 2000', detail: 'Establishes ICPC, grants powers to investigate and prosecute corruption and related offences.' },
  { name: 'Criminal Code Act Cap. C38, LFN 2004', detail: 'Codifies criminal offences applicable in Southern Nigeria.' },
  { name: 'Penal Code (Northern States) Federal Provisions Act', detail: 'Criminal code applicable in the 19 Northern states of Nigeria.' },
  { name: 'CFRN 1999 — Sections 35 & 36', detail: 'Guarantees right to personal liberty, fair hearing, and freedom from unlawful detention.' },
  { name: 'Cybercrime (Prohibition, Prevention etc.) Act 2015', detail: 'Governs cybercrime offences including fraud, identity theft, and cyberstalking.' },
  { name: 'Terrorism (Prevention and Prohibition) Act 2022', detail: 'Defines terrorist acts and provides for prosecution before the Federal High Court.' },
];

const SERVICES = [
  'Defense in EFCC and ICPC prosecutions (money laundering, fraud, corruption)',
  'Pre-charge bail applications under Sections 158–188 ACJA 2015',
  'Fundamental Rights Enforcement — unlawful arrest & detention (S.35–36 CFRN)',
  'Criminal appeals to Court of Appeal and Supreme Court of Nigeria',
  'Cybercrime defense under the CYBA 2015',
  'Armed robbery, kidnapping, and terrorism defense under FHC jurisdiction',
  'Drug trafficking defense — NDLEA Act proceedings',
  'Police brutality and human rights complaints',
  'Asset tracing and anti-forfeiture proceedings',
  'White-collar crime defense — tax fraud, money laundering, Advance Fee Fraud Act',
];

const RIGHTS = [
  { section: 'S.35(1)', right: 'Every person is entitled to personal liberty and no person shall be deprived of such liberty except as follows…' },
  { section: 'S.35(3)', right: 'Any person who is arrested or detained shall be informed in writing within 24 hours (and in a language he understands) of the facts and grounds for his arrest or detention.' },
  { section: 'S.35(4)', right: 'Any person who is arrested or detained in accordance with subsection (1)(c) of this section shall be brought before a court of law within a reasonable time.' },
  { section: 'S.35(5)', right: 'If not tried within 2 months (remanded) or 1 day (bailed), the accused shall without prejudice be released unconditionally or on such conditions as are reasonably necessary to ensure appearance for trial.' },
  { section: 'S.36(1)', right: 'Every person is entitled to a fair hearing within a reasonable time by a court or other tribunal established by law and constituted in such manner as to secure its independence and impartiality.' },
  { section: 'S.36(5)', right: 'Every person who is charged with a criminal offence shall be presumed to be innocent until he is proved guilty.' },
  { section: 'S.36(6)(b)', right: 'Every person who is charged with a criminal offence shall be entitled to be given adequate time and facilities for the preparation of his defense.' },
  { section: 'S.36(6)(c)', right: 'Every person charged shall be entitled to defend himself in person or by legal practitioners of his own choice.' },
];

export default function CriminalDefensePage() {
  return (
    <Layout>
      <PageHero subtitle="Practice Area" title="Criminal Defense" description="Aggressive, principled defense grounded in the CFRN 1999, ACJA 2015, and every tool the law provides to protect your freedom." />
      <section className="py-12 md:py-16 lg:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <Link to="/practice-areas" className="inline-flex items-center gap-2 text-charcoal-500 hover:text-gold-500 text-xs font-body uppercase tracking-widest mb-6 md:mb-10 transition-colors"><ArrowLeft size={13}/> All Practice Areas</Link>

          {/* Emergency banner */}
          <div className="border border-red-700 bg-red-900/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3"><Shield size={18} className="text-red-400 flex-shrink-0 mt-0.5"/><div><p className="text-red-300 text-sm font-body font-semibold">Arrested or Detained?</p><p className="text-charcoal-400 text-xs font-body mt-0.5">You have the right to legal counsel from the moment of arrest — CFRN 1999 Section 36(6)(c). Call our 24-hour duty line immediately.</p></div></div>
            <a href="tel:+2341555-0199" className="flex-shrink-0 flex items-center gap-2 border border-red-600 text-red-300 px-5 py-2.5 text-sm font-body hover:bg-red-900/30 transition-colors whitespace-nowrap"><Phone size={14}/> +234 (1) 555-0199</a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Overview</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <p className="text-charcoal-400 font-body leading-relaxed mb-4">The ACJA 2015 transformed criminal procedure in Nigeria, introducing strict timelines for arraignment and trial, mandatory proof of evidence disclosure within 30 days, and enhanced bail rights. Our criminal defense team exploits every protection the law affords — from pre-charge bail to Supreme Court appeals.</p>
                <p className="text-charcoal-400 font-body leading-relaxed">We have successfully defended clients in EFCC prosecutions, ICPC investigations, NDLEA drug trials, and high-profile cybercrime cases. We also prosecute Fundamental Rights Enforcement applications where law enforcement has exceeded its powers.</p>
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Our Services</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <ul className="space-y-3">
                  {SERVICES.map((s, i) => (<li key={i} className="flex items-start gap-3"><Check size={13} className="text-gold-500 mt-1 flex-shrink-0"/><span className="text-charcoal-400 text-sm font-body">{s}</span></li>))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Your Constitutional Rights</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <p className="text-charcoal-500 text-xs font-body mb-4 italic">Constitution of the Federal Republic of Nigeria, 1999 — Chapter IV (Fundamental Rights)</p>
                <div className="space-y-4">
                  {RIGHTS.map((r, i) => (
                    <div key={i} className="border-l-2 border-gold-500/30 pl-4">
                      <span className="font-mono text-gold-500 text-[10px] tracking-widest">{r.section}</span>
                      <p className="text-charcoal-400 text-sm font-body leading-relaxed mt-1 italic">"{r.right}"</p>
                    </div>
                  ))}
                </div>
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
                <h3 className="font-display text-xl text-white font-light mb-3">Urgent Legal Help</h3>
                <p className="text-charcoal-500 text-xs font-body leading-relaxed mb-4">Criminal matters require immediate action. Contact us now.</p>
                <Link to="/book-consultation" className="btn-gold w-full justify-center text-xs py-3 mb-3">Book Consultation <ArrowRight size={13}/></Link>
                <a href="tel:+2341555-0199" className="btn-outline-gold w-full justify-center text-xs py-3">24hr Duty Line</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
