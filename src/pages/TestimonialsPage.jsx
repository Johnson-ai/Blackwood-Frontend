import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { publicAPI } from '../utils/api';

const DUMMY = [
  { id:1, client_name:'Alhaji Musa Garba', case_type:'EFCC Defense', rating:5, review:'When the EFCC froze my accounts and filed a 47-count charge, I thought my business was over. Blackwood & Associates secured a stay of proceedings, and within 8 months, all charges were struck out. Their knowledge of the ACJA 2015 is unmatched.' },
  { id:2, client_name:'Mrs. Ngozi Okonkwo', case_type:'Land Use Act Dispute', rating:5, review:'After 11 years of a C of O dispute with a property developer, Blackwood got us a favourable ruling at the Lagos State High Court. They knew the Land Use Act inside-out and every argument was watertight.' },
  { id:3, client_name:'Olumide & Associates Ltd.', case_type:'CAMA 2020 Corporate Restructuring', rating:5, review:'Our company had complex merger compliance issues under CAMA 2020 and SEC regulations. The corporate team handled everything seamlessly — filings, regulatory approvals, and shareholder agreements — in under 3 months.' },
  { id:4, client_name:'Dr. Aisha Bello', case_type:'Fundamental Rights Enforcement', rating:5, review:'My Section 35 rights were violated when I was detained without charge for 9 days. Blackwood filed a Fundamental Rights Enforcement application and secured my release plus substantial damages from the State Government within 6 weeks.' },
  { id:5, client_name:'Chief Emeka Uzor', case_type:'Family Law — Matrimonial Causes', rating:5, review:'A very difficult divorce and custody battle. The team was professional, discreet, and handled everything under the Matrimonial Causes Act with precision. My children are now safe and I have proper custody orders.' },
  { id:6, client_name:'TechNaija Solutions Ltd.', case_type:'Intellectual Property — Trademark', rating:5, review:'Our trademark was being infringed by a competitor in Lagos. Blackwood filed an Anton Piller order ex parte and obtained damages at the Federal High Court within 4 months. Exceptional IP litigation expertise.' },
];

export default function TestimonialsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    publicAPI.getTestimonials().then(r => { if (r.data?.length > 0) setItems(r.data); else setItems(DUMMY); }).catch(() => setItems(DUMMY));
  }, []);

  return (
    <Layout>
      <PageHero subtitle="Client Voices" title="Testimonials" description="Real outcomes for real Nigerians — from EFCC defense to constitutional enforcement, these are the cases that define us." />

      {/* Stats band */}
      <div className="bg-black border-b border-charcoal-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['98%', 'Client Satisfaction Rate'], ['5,200+', 'Cases Resolved'], ['32+', 'Years of Practice'], ['4', 'National Offices']].map(([v, l]) => (
              <div key={l}><div className="font-display text-4xl text-gold-500 font-light">{v}</div><div className="text-charcoal-600 text-[10px] font-body tracking-widest uppercase mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-14 md:py-20 lg:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(t => (
              <div key={t.id} className="border border-charcoal-900 hover:border-gold-500/20 bg-charcoal-950 p-8 relative group transition-all">
                <div className="absolute top-5 right-6 font-display text-6xl text-gold-500/10 leading-none select-none">"</div>
                <div className="flex text-gold-500 text-sm mb-4">{'★'.repeat(t.rating || 5)}</div>
                <p className="text-charcoal-300 font-body leading-relaxed text-sm mb-6">{t.review}</p>
                <div className="border-t border-charcoal-900 pt-4">
                  <p className="text-white font-body text-sm font-semibold">{t.client_name}</p>
                  <p className="text-gold-500/60 text-[10px] font-body tracking-wider uppercase mt-0.5">{t.case_type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-charcoal-950 border-t border-charcoal-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-charcoal-700 text-xs font-body leading-relaxed italic">
            Client identities have been anonymised or used with express permission in compliance with the Rules of Professional Conduct for Legal Practitioners (RPC 2007) and applicable privacy regulations. Past results do not guarantee future outcomes.
          </p>
          <div className="mt-8">
            <Link to="/book-consultation" className="btn-gold text-sm">Begin Your Case <ArrowRight size={13} /></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
