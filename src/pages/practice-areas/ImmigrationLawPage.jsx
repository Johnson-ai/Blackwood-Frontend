import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, ArrowLeft, Globe } from 'lucide-react';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';

const STATUTES = [
  { name: 'Immigration Act 2015 (IA 2015)', detail: 'The principal statute governing entry, residence, deportation, and citizenship in Nigeria.' },
  { name: 'Nigerian Immigration Service Regulations', detail: 'Subsidiary regulations on visa categories, CERPAC cards, work permits, and business permits.' },
  { name: 'CFRN 1999 — Section 41 (Freedom of Movement)', detail: 'Every citizen is entitled to move freely throughout Nigeria and to reside in any part thereof.' },
  { name: 'CFRN 1999 — Section 25–32 (Citizenship)', detail: 'Provisions on citizenship by birth, descent, registration, and naturalisation.' },
  { name: 'Trafficking in Persons (Prohibition) Enforcement Act 2015', detail: 'Prohibits human trafficking; governs NAPTIP prosecutions and victim protections.' },
  { name: 'Citizenship and Leadership Training Centre Act', detail: 'Governs naturalisation procedures and citizenship revocation.' },
];

const SERVICES = [
  'Business visa and entry permit applications (NIS)',
  'CERPAC (Combined Expatriate Residence Permit and Aliens Card) processing',
  'Subject to Regularisation (STR) visa applications',
  'Work permit and expatriate quota applications (DPR/FMI)',
  'Regularisation of illegal stay and overstay remediation',
  'Citizenship by birth, descent, registration, and naturalisation (S.25–32 CFRN)',
  'Renunciation of citizenship proceedings',
  'Deportation order appeals before the Immigration Tribunal',
  'NAPTIP defense and anti-trafficking proceedings',
  'Refugee status determination and UNHCR liaison',
  'Nigerian diaspora return and dual citizenship advice',
  'Corporate expatriate quota and compliance management',
];

export default function ImmigrationLawPage() {
  return (
    <Layout>
      <PageHero subtitle="Practice Area" title="Immigration Law" description="Full NIS representation — visas, CERPAC, work permits, deportation defense, and citizenship matters under the Immigration Act 2015." />
      <section className="py-12 md:py-16 lg:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <Link to="/practice-areas" className="inline-flex items-center gap-2 text-charcoal-500 hover:text-gold-500 text-xs font-body uppercase tracking-widest mb-6 md:mb-10 transition-colors"><ArrowLeft size={13}/> All Practice Areas</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Overview</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <p className="text-charcoal-400 font-body leading-relaxed mb-4">Nigeria's immigration framework — primarily governed by the Immigration Act 2015 and administered by the Nigerian Immigration Service (NIS) — regulates the entry, stay, and exit of all non-Nigerian nationals. Compliance failures can result in detention, deportation, or criminal prosecution. Our immigration team provides end-to-end representation before the NIS, Federal High Court, and immigration tribunals.</p>
                <p className="text-charcoal-400 font-body leading-relaxed">We also advise Nigerian citizens on citizenship rights under Sections 25–32 of the CFRN, including dual citizenship, renunciation, and naturalisation, as well as diaspora return facilitation.</p>
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Citizenship Under the CFRN 1999</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <div className="space-y-4">
                  {[
                    { s: 'S.25 — By Birth', d: 'A person born in Nigeria either of whose parents is a citizen of Nigeria, or born outside Nigeria either of whose parents is a citizen of Nigeria, is a citizen by birth.' },
                    { s: 'S.26 — By Registration', d: 'A woman who has been married to a citizen of Nigeria for at least 3 years may apply to be registered as a citizen, subject to the President\'s discretion.' },
                    { s: 'S.27 — By Naturalisation', d: 'The President may grant a certificate of naturalisation to a person who has resided in Nigeria for 15 continuous years and satisfies the statutory requirements.' },
                    { s: 'S.28 — Dual Citizenship', d: 'A citizen of Nigeria who is also a citizen of another country may renounce Nigerian citizenship, but Nigeria does not expressly prohibit dual nationality for citizens by birth.' },
                  ].map((item, i) => (
                    <div key={i} className="border border-charcoal-900 bg-charcoal-950 p-5">
                      <p className="font-mono text-gold-500 text-xs mb-2">{item.s}</p>
                      <p className="text-charcoal-400 text-sm font-body leading-relaxed">{item.d}</p>
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
                <Globe size={20} className="text-gold-500 mb-3"/>
                <h3 className="font-display text-xl text-white font-light mb-2">Immigration Assistance</h3>
                <p className="text-charcoal-500 text-xs font-body leading-relaxed mb-4">Facing deportation or visa issues? Our team provides same-day emergency immigration advice.</p>
                <Link to="/book-consultation" className="btn-gold w-full justify-center text-xs py-3">Book Consultation <ArrowRight size={13}/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
