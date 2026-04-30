import { useEffect, useState } from 'react';
import { ChevronDown, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { publicAPI } from '../utils/api';

const DUMMY_FAQS = [
  { id:1, question:'How do I schedule a consultation?', answer:'You can book online via our booking form, call any of our offices, or email us. Initial consultations are typically 45 minutes. We have offices in Lagos, Abuja, Port Harcourt and Kano, and also offer virtual consultations via Zoom.', category:'General' },
  { id:2, question:'What is a Senior Advocate of Nigeria (SAN)?', answer:'The rank of Senior Advocate of Nigeria is conferred by the Legal Practitioners Privileges Committee under Section 5 of the Legal Practitioners Act Cap. L11, LFN 2004. It is Nigeria\'s equivalent of the Queen\'s Counsel (QC) in England — the highest distinction in the Nigerian legal profession, awarded to practitioners of not less than 10 years\' standing who have demonstrated exceptional advocacy.', category:'General' },
  { id:3, question:'What happens if I am arrested by the EFCC or ICPC?', answer:'Under Section 35 of the CFRN 1999, you have the right to be informed of the reason for your arrest, the right to remain silent, and the right to a legal practitioner of your choice. The ACJA 2015 (Section 293) limits pre-trial detention to 24 hours (or 48 hours on weekends/public holidays) before you must be charged or released on bail. Call our 24-hour duty line immediately: +234 (1) 555-0199.', category:'Criminal Defense' },
  { id:4, question:'What is a Fundamental Rights Enforcement Application?', answer:'Under Order II of the Fundamental Rights (Enforcement Procedure) Rules 2009, made pursuant to Section 46(3) of the CFRN 1999, any person whose rights under Chapter IV have been violated may apply to the Federal or State High Court for enforcement. Reliefs include injunctions, declarations, and damages against the State or its agents. We have filed over 200 such applications successfully.', category:'Constitutional Law' },
  { id:5, question:'How does the Land Use Act affect my property in Nigeria?', answer:'The Land Use Act (LUA) Cap. L5 of 1978 vests all land in each state in the Governor of that state. You do not own land outright — you hold a statutory or customary right of occupancy. Any alienation (sale, mortgage, sublease) of land held under a Certificate of Occupancy (C of O) requires the Governor\'s consent under Section 22 LUA. Transactions made without consent are void ab initio. We advise on all LUA compliance and consent applications.', category:'Property Law' },
  { id:6, question:'What are your legal fees and billing structure?', answer:'Our fees depend on the nature, complexity and jurisdiction of each matter. We offer: (1) Fixed fees for transactional work such as CAMA incorporations and property transfers; (2) Hourly billing for litigation and advisory work, billed in 6-minute units; (3) Conditional fee arrangements (contingency) in select civil matters. Detailed fee estimates are provided at the first consultation. We comply fully with the Legal Practitioners (Remuneration for Legal Documentation and Other Land Matters) Order.', category:'Billing' },
  { id:7, question:'Do you handle matters outside Nigeria?', answer:'Yes. We have reciprocal working relationships with law firms in the UK, USA, Canada, and across West Africa. We regularly advise Nigerian diaspora clients on cross-border matters including UK immigration, dual citizenship, international arbitration (ICC, LCIA, ICSID), and foreign investment structuring into Nigeria under the Nigerian Investment Promotion Commission Act.', category:'General' },
  { id:8, question:'What is the difference between a Magistrate Court and a High Court?', answer:'Under Nigeria\'s court hierarchy: Magistrate Courts handle less serious criminal offences (summary trials) and small civil claims up to prescribed monetary limits (varying by state). State High Courts have unlimited civil jurisdiction and hear serious criminal matters. The Federal High Court handles federal revenue matters, EFCC/ICPC cases, immigration, admiralty, and constitutional originating summons. Appeals lie to the Court of Appeal and ultimately the Supreme Court of Nigeria.', category:'Court Procedure' },
  { id:9, question:'How long does a case typically take in Nigerian courts?', answer:'Timelines vary significantly. Summary trials in Magistrate Courts may conclude in 3–12 months. High Court civil matters typically take 1–4 years depending on complexity and interlocutory applications. Appeals to the Court of Appeal average 2–4 years; Supreme Court appeals 3–7 years. The ACJA 2015 introduced case management reforms to expedite criminal trials, including mandatory filing of proof of evidence within 30 days of arraignment.', category:'Court Procedure' },
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    publicAPI.getFAQs().then(r => { if (r.data?.length > 0) setFaqs(r.data); else setFaqs(DUMMY_FAQS); }).catch(() => setFaqs(DUMMY_FAQS));
  }, []);

  const categories = [...new Set(faqs.map(f => f.category).filter(Boolean))];

  return (
    <Layout>
      <PageHero subtitle="Help Centre" title="Frequently Asked Questions" description="Answers to common questions about Nigerian law, our firm, and how to work with us." />

      {/* Legal reference bar */}
      <div className="bg-black border-b border-charcoal-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {['CFRN 1999', 'ACJA 2015', 'CAMA 2020', 'LPA Cap. L11', 'LUA Cap. L5', 'RPC 2007'].map(ref => (
            <div key={ref} className="flex items-center gap-2">
              <Scale size={9} className="text-gold-500" />
              <span className="text-charcoal-600 text-[9px] font-mono tracking-widest">{ref}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="py-12 md:py-16 lg:py-20 bg-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          {categories.map(cat => (
            <div key={cat} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-charcoal-900" />
                <span className="text-gold-500 text-[10px] font-body tracking-[0.3em] uppercase border border-gold-500/20 px-3 py-1">{cat}</span>
                <div className="h-px flex-1 bg-charcoal-900" />
              </div>
              <div className="space-y-2">
                {faqs.filter(f => f.category === cat).map(faq => (
                  <div key={faq.id} className={`border transition-all duration-200 ${open === faq.id ? 'border-gold-500/30 bg-charcoal-950' : 'border-charcoal-900 bg-charcoal-950 hover:border-charcoal-800'}`}>
                    <button onClick={() => setOpen(open === faq.id ? null : faq.id)}
                      className="w-full flex items-start justify-between px-6 py-5 text-left gap-4">
                      <span className={`font-body text-sm font-medium ${open === faq.id ? 'text-gold-400' : 'text-white'}`}>{faq.question}</span>
                      <ChevronDown size={16} className={`text-gold-500 transition-transform flex-shrink-0 mt-0.5 ${open === faq.id ? 'rotate-180' : ''}`} />
                    </button>
                    {open === faq.id && (
                      <div className="px-6 pb-6 border-t border-charcoal-900 pt-4">
                        <p className="text-charcoal-400 text-sm font-body leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Uncategorised */}
          {faqs.filter(f => !f.category).length > 0 && (
            <div className="space-y-2">
              {faqs.filter(f => !f.category).map(faq => (
                <div key={faq.id} className={`border transition-all ${open === faq.id ? 'border-gold-500/30 bg-charcoal-950' : 'border-charcoal-900 bg-charcoal-950'}`}>
                  <button onClick={() => setOpen(open === faq.id ? null : faq.id)} className="w-full flex items-start justify-between px-6 py-5 text-left gap-4">
                    <span className={`font-body text-sm font-medium ${open === faq.id ? 'text-gold-400' : 'text-white'}`}>{faq.question}</span>
                    <ChevronDown size={16} className={`text-gold-500 transition-transform flex-shrink-0 ${open === faq.id ? 'rotate-180' : ''}`} />
                  </button>
                  {open === faq.id && <div className="px-6 pb-6 border-t border-charcoal-900 pt-4"><p className="text-charcoal-400 text-sm font-body leading-relaxed">{faq.answer}</p></div>}
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 border border-charcoal-900 bg-charcoal-950 p-8 text-center">
            <h3 className="font-display text-2xl text-white font-light mb-2">Still Have Questions?</h3>
            <p className="text-charcoal-500 font-body text-sm mb-6">Our attorneys are happy to address your specific legal situation in a private consultation.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/book-consultation" className="btn-gold text-sm">Book Consultation <ArrowRight size={13} /></Link>
              <Link to="/contact" className="btn-outline-gold text-sm">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
