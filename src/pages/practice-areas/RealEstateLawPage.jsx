import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, ArrowLeft, Home } from 'lucide-react';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';

const STATUTES = [
  { name: 'Land Use Act (LUA) Cap. L5, LFN 1978', detail: 'Vests all land in each state in the Governor. Statutory & customary rights of occupancy are the primary land titles.' },
  { name: 'Land Tenure Law (Northern States)', detail: 'Governs land holding in the 19 Northern states and FCT, complementing the federal LUA.' },
  { name: 'Registration of Titles Law (Lagos State) 2004', detail: 'Governs title registration in Lagos State, the largest property market in Nigeria.' },
  { name: 'Mortgage Institutions Act Cap. M19, LFN 2004', detail: 'Regulates primary mortgage institutions, Federal Mortgage Bank, and housing finance.' },
  { name: 'State Environmental Impact Assessment Laws', detail: 'State-level laws governing development permits, building plans, and environmental compliance.' },
  { name: 'CFRN 1999 — Section 43 & 44', detail: 'Section 43 guarantees the right to acquire and own property; Section 44 restricts compulsory acquisition without prompt compensation.' },
];

const SERVICES = [
  'Certificate of Occupancy (C of O) applications and processing',
  'Governor\'s Consent applications under Section 22 LUA (mandatory for all alienations)',
  'Statutory and customary Right of Occupancy disputes',
  'Land purchase agreements and deed of assignment drafting',
  'Mortgage financing documentation and perfection',
  'Revocation of Right of Occupancy challenges before State High Courts',
  'Trespass to land and ejectment proceedings',
  'Property development joint venture agreements',
  'Commercial lease and tenancy agreement drafting',
  'Title investigation and due diligence reports',
  'Compulsory acquisition compensation claims under Section 44 CFRN',
  'Registration of titles and deeds at Lands Registry',
];

const C_O_STEPS = [
  { step: '01', title: 'Survey Plan', desc: 'Obtain a certified survey plan from a licensed surveyor, showing the property coordinates and area.' },
  { step: '02', title: 'Application', desc: 'File application at the State Lands Bureau with proof of payment, survey plan, and supporting documents.' },
  { step: '03', title: 'Assessment', desc: 'State assesses ground rent and other fees payable before processing the C of O application.' },
  { step: '04', title: 'Governor\'s Signature', desc: 'The C of O is signed by the Governor (or authorised delegate) and sealed by the Commissioner for Lands.' },
];

export default function RealEstateLawPage() {
  return (
    <Layout>
      <PageHero subtitle="Practice Area" title="Real Estate & Property Law" description="Expert guidance on land transactions, title perfection, and LUA compliance across all 36 states and FCT." />
      <section className="py-12 md:py-16 lg:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <Link to="/practice-areas" className="inline-flex items-center gap-2 text-charcoal-500 hover:text-gold-500 text-xs font-body uppercase tracking-widest mb-6 md:mb-10 transition-colors"><ArrowLeft size={13}/> All Practice Areas</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Overview</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <p className="text-charcoal-400 font-body leading-relaxed mb-4">The Land Use Act 1978 is the cornerstone of Nigerian land law — it vests all land in each state Governor and makes a Certificate of Occupancy (C of O) the primary evidence of title. Any alienation of land — sale, mortgage, sublease — without the Governor's Consent under Section 22 LUA is void ab initio.</p>
                <p className="text-charcoal-400 font-body leading-relaxed">Our property team advises on all aspects of Nigerian real estate — from C of O applications and title investigations to large-scale commercial property developments and compulsory acquisition compensation claims.</p>
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">How to Obtain a Certificate of Occupancy</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {C_O_STEPS.map(s => (
                    <div key={s.step} className="border border-charcoal-900 bg-charcoal-950 p-5">
                      <span className="font-mono text-gold-500/40 text-3xl font-bold">{s.step}</span>
                      <h4 className="text-white font-body text-sm font-semibold mt-2 mb-1">{s.title}</h4>
                      <p className="text-charcoal-500 text-xs font-body leading-relaxed">{s.desc}</p>
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
                <Home size={20} className="text-gold-500 mb-3"/>
                <h3 className="font-display text-xl text-white font-light mb-2">Property Legal Advice</h3>
                <p className="text-charcoal-500 text-xs font-body leading-relaxed mb-4">Always investigate title before any land transaction. Never pay without a valid C of O and Governor's Consent.</p>
                <Link to="/book-consultation" className="btn-gold w-full justify-center text-xs py-3">Get Property Advice <ArrowRight size={13}/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
