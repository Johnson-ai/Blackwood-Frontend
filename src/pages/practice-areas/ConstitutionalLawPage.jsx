import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, ArrowLeft, Scale, Shield } from 'lucide-react';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';

const CHAPTER_IV = [
  { s:'S.33', r:'Right to Life', d:'Every person has a right to life, and no one shall be deprived intentionally of his life, save in execution of the sentence of a court.' },
  { s:'S.34', r:'Dignity of Human Person', d:'Every individual is entitled to respect for the dignity of his person. No person shall be subjected to torture or to inhuman or degrading treatment.' },
  { s:'S.35', r:'Personal Liberty', d:'Every person is entitled to personal liberty and no person shall be deprived of such liberty save in specified lawful circumstances.' },
  { s:'S.36', r:'Fair Hearing', d:'Every person is entitled to a fair hearing within a reasonable time by an independent and impartial tribunal established by law.' },
  { s:'S.37', r:'Private and Family Life', d:'The privacy of citizens, their homes, correspondence, telephone conversations and telegraphic communications is hereby guaranteed and protected.' },
  { s:'S.38', r:'Freedom of Thought', d:'Every person shall be entitled to freedom of thought, conscience and religion, including freedom to change his religion or belief.' },
  { s:'S.39', r:'Freedom of Expression', d:'Every person shall be entitled to freedom of expression, including freedom to hold opinions and to receive and impart ideas and information.' },
  { s:'S.40', r:'Freedom of Association', d:'Every person shall be entitled to assemble freely and associate with other persons, and in particular form or belong to any political party, trade union or other association.' },
  { s:'S.41', r:'Freedom of Movement', d:'Every citizen of Nigeria is entitled to move freely throughout Nigeria and to reside in any part thereof.' },
  { s:'S.42', r:'Freedom from Discrimination', d:'No citizen of Nigeria shall be treated in a disadvantageous manner on account of the circumstances of his birth.' },
  { s:'S.43', r:'Right to Acquire Property', d:'Subject to the provisions of this Constitution, every citizen of Nigeria shall have the right to acquire and own immovable property.' },
  { s:'S.44', r:'Compulsory Acquisition', d:'No moveable property or any interest therein shall be taken possession of compulsorily without prompt payment of compensation.' },
  { s:'S.46', r:'Enforcement of Rights', d:'Any person who alleges that any of the provisions of this Chapter has been, is being or is likely to be contravened may apply to a High Court for redress.' },
];

const SERVICES = [
  'Fundamental Rights Enforcement (Order II, FR Enforcement Procedure Rules 2009)',
  'Constitutional validity challenges under Section 1(3) CFRN',
  'Pre-election and election petition matters (Electoral Act 2022)',
  'Judicial review of government decisions and administrative actions',
  'Human rights litigation before the ECOWAS Community Court of Justice',
  'Legislative drafting advice and constitutional compliance review',
  'Public interest litigation and amicus curiae submissions',
  'Freedom of Information (FOI) Act 2011 applications and enforcement',
  'Police Act 2020 — accountability and brutality claims',
  'Separation of powers disputes and executive overreach challenges',
];

export default function ConstitutionalLawPage() {
  return (
    <Layout>
      <PageHero subtitle="Practice Area" title="Constitutional Law" description="Defenders of Chapter IV rights — enforcing fundamental freedoms before every court in Nigeria, including the ECOWAS Community Court." />
      <section className="py-12 md:py-16 lg:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <Link to="/practice-areas" className="inline-flex items-center gap-2 text-charcoal-500 hover:text-gold-500 text-xs font-body uppercase tracking-widest mb-6 md:mb-10 transition-colors"><ArrowLeft size={13}/> All Practice Areas</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Overview</h2>
                <div className="h-px w-12 bg-gold-500 mb-6"/>
                <p className="text-charcoal-400 font-body leading-relaxed mb-4">The Constitution of the Federal Republic of Nigeria, 1999 (as amended) is the supreme law of the land — Section 1(1) declares it supreme and its provisions shall have binding force on all authorities and persons throughout the Federal Republic of Nigeria. Section 1(3) renders any law inconsistent with the Constitution void to the extent of its inconsistency.</p>
                <p className="text-charcoal-400 font-body leading-relaxed">Our constitutional practice spans fundamental rights enforcement, election disputes, judicial review, and strategic public interest litigation. We have argued constitutional matters before every level of Nigeria's court hierarchy, from State High Courts to the Supreme Court of Nigeria.</p>
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-light mb-4">Chapter IV — Fundamental Rights (CFRN 1999)</h2>
                <div className="h-px w-12 bg-gold-500 mb-2"/>
                <p className="text-charcoal-600 text-[10px] font-body italic mb-6">Enforceable under the Fundamental Rights (Enforcement Procedure) Rules 2009 — Order II</p>
                <div className="space-y-3">
                  {CHAPTER_IV.map((r, i) => (
                    <div key={i} className="border border-charcoal-900 bg-charcoal-950 p-4 group hover:border-gold-500/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-gold-500 text-xs border border-gold-500/20 px-2 py-1 flex-shrink-0">{r.s}</span>
                        <div>
                          <p className="text-white font-body text-sm font-semibold mb-1">{r.r}</p>
                          <p className="text-charcoal-500 text-xs font-body leading-relaxed">{r.d}</p>
                        </div>
                      </div>
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
                <div className="flex items-center gap-2 mb-4"><BookOpen size={15} className="text-gold-500"/><h3 className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body">Key References</h3></div>
                <div className="space-y-3 text-xs font-body">
                  {['CFRN 1999 (as amended)', 'FR Enforcement Procedure Rules 2009', 'Electoral Act 2022', 'Police Act 2020', 'FOI Act 2011', 'Administration of Criminal Justice Act 2015', 'Supreme Court Rules 2014', 'Federal High Court Rules 2019'].map((r, i) => (
                    <div key={i} className="flex items-center gap-2 border-b border-charcoal-900 pb-2 last:border-0"><Scale size={10} className="text-gold-500 flex-shrink-0"/><span className="text-charcoal-400">{r}</span></div>
                  ))}
                </div>
              </div>
              <div className="border border-gold-500/20 bg-gold-500/5 p-6">
                <Shield size={20} className="text-gold-500 mb-3"/>
                <h3 className="font-display text-xl text-white font-light mb-2">Rights Violated?</h3>
                <p className="text-charcoal-500 text-xs font-body leading-relaxed mb-4">We can file a Fundamental Rights Enforcement Application within 24 hours of your brief. Urgent matters handled immediately.</p>
                <Link to="/book-consultation" className="btn-gold w-full justify-center text-xs py-3">Emergency Consultation <ArrowRight size={13}/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
