import { Link } from 'react-router-dom';
import { Check, ArrowRight, Scale, BookOpen, FileText, Users, ArrowLeft } from 'lucide-react';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';

const STATUTES = [
  { name: 'Companies and Allied Matters Act (CAMA) 2020', detail: 'Governs incorporation, corporate governance, winding-up, and insolvency of Nigerian companies.' },
  { name: 'Securities and Exchange Commission Act 2007', detail: 'Regulates the Nigerian capital market, public offers, and investment advisers.' },
  { name: 'Investment and Securities Act (ISA) 2007', detail: 'Governs securities transactions, mergers, takeovers, and SEC-regulated entities.' },
  { name: 'Federal Competition and Consumer Protection Act 2018', detail: 'Prohibits anti-competitive practices and protects consumer rights in Nigeria.' },
  { name: 'Nigerian Investment Promotion Commission Act Cap. N117', detail: 'Regulates foreign investment in Nigeria; restricts certain sectors from foreign ownership.' },
  { name: 'Banks and Other Financial Institutions Act (BOFIA) 2020', detail: 'Regulates banking, microfinance, and financial institutions licensing under CBN supervision.' },
];

const SERVICES = [
  'Company incorporation and CAC registration under CAMA 2020',
  'Mergers, acquisitions, and corporate restructuring',
  'Shareholders agreements and joint venture structuring',
  'Board governance, director duties and liability (Sections 279–295 CAMA)',
  'Share capital restructuring and rights issues (Part F CAMA)',
  'Corporate insolvency and receivership (Parts H & I CAMA)',
  'SEC regulatory compliance and capital market transactions',
  'Foreign investment structuring under NIPC Act',
  'Commercial contract drafting and negotiation',
  'Annual returns, statutory registers, and CAMA compliance audits',
];

const CASES = [
  { citation: 'Innoson Vehicle Mfg Ltd v. GTBank (2019) LPELR-47021', summary: 'Supreme Court affirmed the right of a company to enforce contractual obligations against a financial institution.' },
  { citation: 'Nwaolisah v. Nwabufoh (2011) 14 NWLR (Pt. 1268) 600', summary: 'Court of Appeal on shareholders\' rights to information and proper corporate governance under CAMA.' },
  { citation: 'Bilante International Ltd v. NDIC (2011) LPELR-766(SC)', summary: 'Supreme Court on winding-up petitions and the standing of creditors under CAMA.' },
];

export default function CorporateLawPage() {
  return (
    <Layout>
      <PageHero subtitle="Practice Area" title="Corporate Law" description="Strategic legal counsel for businesses at every stage — from incorporation to exit — governed by CAMA 2020 and Nigeria's full suite of commercial legislation." />
      <section className="py-12 md:py-16 lg:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <Link to="/practice-areas" className="inline-flex items-center gap-2 text-charcoal-500 hover:text-gold-500 text-xs font-body uppercase tracking-widest mb-6 md:mb-10 transition-colors"><ArrowLeft size={13}/> All Practice Areas</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Overview</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <p className="text-charcoal-400 font-body leading-relaxed mb-4">The Companies and Allied Matters Act 2020 overhauled Nigerian corporate law — introducing single-member companies, electronic AGMs, and enhanced minority shareholder protections. Our corporate team advises Nigerian and multinational businesses on every aspect of CAMA 2020 compliance, corporate transactions, and commercial strategy.</p>
                <p className="text-charcoal-400 font-body leading-relaxed">We appear before the Federal High Court, the Corporate Affairs Commission (CAC), the Securities and Exchange Commission (SEC), and the Nigerian Investment Promotion Commission (NIPC) on behalf of our corporate clients.</p>
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Our Services</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <ul className="space-y-3">
                  {SERVICES.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={13} className="text-gold-500 mt-1 flex-shrink-0"/>
                      <span className="text-charcoal-400 text-sm font-body">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Key Case Law</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <div className="space-y-4">
                  {CASES.map((c, i) => (
                    <div key={i} className="border border-charcoal-900 bg-charcoal-950 p-5">
                      <p className="font-mono text-gold-500 text-xs mb-2">{c.citation}</p>
                      <p className="text-charcoal-400 text-sm font-body leading-relaxed">{c.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border border-charcoal-900 bg-charcoal-950 p-5">
                <div className="flex items-center gap-2 mb-4"><BookOpen size={15} className="text-gold-500"/><h3 className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body">Governing Legislation</h3></div>
                <div className="space-y-4">
                  {STATUTES.map((s, i) => (
                    <div key={i} className="border-b border-charcoal-900 pb-4 last:border-0 last:pb-0">
                      <p className="text-white text-xs font-body font-semibold mb-1">{s.name}</p>
                      <p className="text-charcoal-600 text-[10px] font-body leading-relaxed">{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gold-500/20 bg-gold-500/5 p-6">
                <h3 className="font-display text-xl text-white font-light mb-3">Get Corporate Advice</h3>
                <p className="text-charcoal-500 text-xs font-body leading-relaxed mb-4">Our corporate team is available for same-day consultations on urgent commercial matters.</p>
                <Link to="/book-consultation" className="btn-gold w-full justify-center text-xs py-3">Book Consultation <ArrowRight size={13}/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
