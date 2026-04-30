import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, ArrowLeft, Heart } from 'lucide-react';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';

const STATUTES = [
  { name: 'Matrimonial Causes Act Cap. M7, LFN 2004', detail: 'The principal statute governing divorce, nullity, separation, and ancillary relief in Nigeria.' },
  { name: 'Child Rights Act 2003 (CRA)', detail: 'Protects children\'s rights including custody, maintenance, adoption, and protection from abuse.' },
  { name: 'Marriage Act Cap. M6, LFN 2004', detail: 'Governs the celebration of statutory marriages in Nigeria (registry marriages).' },
  { name: 'Customary Law — State Courts (customary)', detail: 'Native law and custom governs marriages celebrated under customary rites across Nigeria.' },
  { name: 'Evidence Act 2011 (Sections on Family Proceedings)', detail: 'Governs admissibility of evidence in matrimonial and custody proceedings.' },
  { name: 'CFRN 1999 — Section 43 (Right to Property)', detail: 'Protects the right of both spouses to own and acquire property.' },
];

const SERVICES = [
  'Divorce petitions under the 5 grounds in the Matrimonial Causes Act',
  'Nullity of marriage (statutory and customary)',
  'Judicial separation orders',
  'Child custody, access, and guardianship under the Child Rights Act',
  'Child maintenance orders and enforcement',
  'Adoption proceedings before the Family Court',
  'Division of matrimonial property and financial settlements',
  'Spousal maintenance and alimony applications',
  'Domestic violence injunctions and protection orders',
  'Prenuptial and postnuptial agreements',
  'International child abduction and Hague Convention matters',
  'Estate planning for married couples and dependants',
];

const DIVORCE_GROUNDS = [
  { ground: 'Adultery', detail: 'The respondent has committed adultery and the petitioner finds it intolerable to live with the respondent — Section 15(2)(a) MCA.' },
  { ground: 'Unreasonable Behaviour', detail: 'The respondent has behaved in such a way that the petitioner cannot reasonably be expected to live with the respondent — Section 15(2)(b) MCA.' },
  { ground: 'Desertion', detail: 'The respondent has deserted the petitioner for a continuous period of at least one year — Section 15(2)(c) MCA.' },
  { ground: 'Separation (2 years)', detail: 'The parties have lived apart for at least two years and both consent to the divorce — Section 15(2)(d) MCA.' },
  { ground: 'Separation (3 years)', detail: 'The parties have lived apart for at least three years (consent not required) — Section 15(2)(e) MCA.' },
];

export default function FamilyLawPage() {
  return (
    <Layout>
      <PageHero subtitle="Practice Area" title="Family Law" description="Compassionate, discreet legal counsel for life's most sensitive matters — grounded in the Matrimonial Causes Act and the Child Rights Act 2003." />
      <section className="py-12 md:py-16 lg:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <Link to="/practice-areas" className="inline-flex items-center gap-2 text-charcoal-500 hover:text-gold-500 text-xs font-body uppercase tracking-widest mb-6 md:mb-10 transition-colors"><ArrowLeft size={13}/> All Practice Areas</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Overview</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <p className="text-charcoal-400 font-body leading-relaxed mb-4">Family law in Nigeria is governed by a complex interplay of statutory law (the Matrimonial Causes Act), customary law, and Islamic personal law (in the Northern states). Our family law team provides sensitive, strictly confidential guidance to navigate divorce, custody disputes, and family property matters with minimum conflict and maximum dignity.</p>
                <p className="text-charcoal-400 font-body leading-relaxed">We represent clients before the High Court (Family Division), the Sharia Court of Appeal in Northern states, and Customary Courts of Appeal — ensuring every client receives the full protection of Nigerian law regardless of the type of marriage celebrated.</p>
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Grounds for Divorce in Nigeria</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <p className="text-charcoal-500 text-xs font-body italic mb-5">Under Section 15(2) Matrimonial Causes Act Cap. M7, the sole ground for divorce is irretrievable breakdown, established by one of five facts:</p>
                <div className="space-y-4">
                  {DIVORCE_GROUNDS.map((g, i) => (
                    <div key={i} className="border border-charcoal-900 bg-charcoal-950 p-5">
                      <div className="flex items-center gap-3 mb-2"><span className="font-mono text-gold-500 text-xs border border-gold-500/30 px-2 py-0.5">{String(i+1).padStart(2,'0')}</span><p className="text-white font-body text-sm font-semibold">{g.ground}</p></div>
                      <p className="text-charcoal-400 text-xs font-body leading-relaxed">{g.detail}</p>
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
              <div className="border border-charcoal-900 bg-charcoal-950 p-5">
                <Heart size={20} className="text-gold-500 mb-3"/>
                <h3 className="font-display text-xl text-white font-light mb-2">Sensitive & Confidential</h3>
                <p className="text-charcoal-500 text-xs font-body leading-relaxed mb-4">All family matters are handled with absolute discretion. Our consultations are strictly private and fully protected by legal professional privilege.</p>
                <Link to="/book-consultation" className="btn-gold w-full justify-center text-xs py-3">Book Private Consultation <ArrowRight size={13}/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
