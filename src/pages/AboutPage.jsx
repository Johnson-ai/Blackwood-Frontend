import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Award, BookOpen, Users, Shield, Check, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { publicAPI } from '../utils/api';

const NIGERIAN_VALUES = [
  {
    icon: <Scale size={22} />,
    title: 'Rule of Law',
    desc: 'We anchor every matter in the Constitution of the Federal Republic of Nigeria, 1999, the Legal Practitioners Act, and binding Supreme Court authorities.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Fundamental Rights',
    desc: 'We have prosecuted and defended hundreds of applications under Chapter IV of the CFRN — Sections 33 to 46 — enforcing rights to life, dignity, fair hearing, and freedom.',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Legal Scholarship',
    desc: 'Our attorneys regularly contribute to Nigerian legal journals, appear as amicus curiae before appellate courts, and mentor the next generation of Nigerian lawyers.',
  },
  {
    icon: <Award size={22} />,
    title: 'Excellence',
    desc: 'Consistently rated among Nigeria\'s top-tier firms by Chambers Africa, Legal 500, and the Nigerian Legal Awards since 2008.',
  },
];

const NIGERIAN_COURTS = [
  { court: 'Supreme Court of Nigeria', abbr: 'SCN', desc: 'Final court of appeal. We have appeared in over 80 SCN matters, including landmark constitutional cases.' },
  { court: 'Court of Appeal', abbr: 'CAP', desc: 'Intermediate appellate jurisdiction. Our panel litigation team handles appeals from all divisions nationally.' },
  { court: 'Federal High Court', abbr: 'FHC', desc: 'Revenue, immigration, admiralty, EFCC prosecutions, and constitutional originating summons.' },
  { court: 'National Industrial Court', abbr: 'NIC', desc: 'Labour, employment, and trade union matters under Section 254C CFRN 1999 (Third Alteration).' },
  { court: 'State High Courts', abbr: 'SHC', desc: 'Civil and criminal jurisdiction across all 36 states and FCT with registered practitioners.' },
  { court: 'Customary & Sharia Courts', abbr: 'CCA/SCA', desc: 'Matters involving native law and custom, Sharia family law, and Northern Nigerian inheritance disputes.' },
];

export default function AboutPage() {
  const [about, setAbout] = useState({});
  const [ceo, setCeo] = useState({});
  const [certifications, setCertifications] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    publicAPI.getAbout().then(r => setAbout(r.data)).catch(() => {});
    publicAPI.getCEO().then(r => setCeo(r.data)).catch(() => {});
    publicAPI.getCertifications().then(r => setCertifications(r.data)).catch(() => {});
    publicAPI.getTeam().then(r => setTeam(r.data)).catch(() => {});
  }, []);

  return (
    <Layout>
      <PageHero
        subtitle="Who We Are"
        title="About the Firm"
        description="Established in Lagos, 1992. Serving Nigeria and the diaspora across all courts and jurisdictions for over three decades."
      />

      {/* ═══ FIRM OVERVIEW ══════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 lg:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-8 md:gap-12 lg:gap-16 items-start md:items-center">
            <div>
              <span className="section-subtitle mb-4 block">Our Story</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light mb-3">{about.firm_name || 'Blackwood & Associates'}</h2>
              <p className="font-display text-2xl text-gold-400/60 italic font-light mb-6">{about.tagline || 'Justice. Integrity. Excellence.'}</p>
              <p className="text-charcoal-400 font-body leading-relaxed mb-6 text-[15px]">
                {about.description ||
                  'Founded in 1992 in Lagos, Nigeria, Blackwood & Associates was established with a singular mandate: to provide world-class legal advocacy rooted in the principles of Nigerian constitutional law. Over three decades, we have grown from a boutique Lagos firm to one of Nigeria\'s most formidable full-service legal practices, with offices in Abuja, Port Harcourt, and Kano.'}
              </p>
              {about.mission ? (
                <div className="border-l-2 border-gold-500 pl-6 mb-6">
                  <p className="text-gold-500 text-xs tracking-widest uppercase font-body mb-1">Our Mission</p>
                  <p className="text-charcoal-300 font-body leading-relaxed">{about.mission}</p>
                </div>
              ) : (
                <div className="border-l-2 border-gold-500 pl-6 mb-6">
                  <p className="text-gold-500 text-xs tracking-widest uppercase font-body mb-1">Our Mission</p>
                  <p className="text-charcoal-300 font-body leading-relaxed">
                    To deliver fearless, principled legal representation to every client — individual, corporate, or governmental — in strict accordance with the Constitution of the Federal Republic of Nigeria, 1999, the Legal Practitioners Act, and the highest standards of professional ethics.
                  </p>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 max-w-16 bg-gold-500/30" />
                <p className="text-charcoal-600 text-[10px] font-mono tracking-widest">NBA · SCN · ICSAN · NIIA · NIA</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {[
                { value: about.founded_year || '1992', label: 'Year Founded', icon: <Scale size={20} /> },
                { value: about.lawyers_count || '47+', label: 'Enrolled Attorneys', icon: <Users size={20} /> },
                { value: about.cases_won || '5,200+', label: 'Cases Handled', icon: <Award size={20} /> },
                { value: about.years_experience || '32+', label: 'Years Experience', icon: <BookOpen size={20} /> },
              ].map(s => (
                <div key={s.label} className="border border-charcoal-900 hover:border-gold-500/30 bg-charcoal-950 p-6 text-center transition-colors group">
                  <div className="text-gold-500/50 group-hover:text-gold-500 mb-3 flex justify-center transition-colors">{s.icon}</div>
                  <div className="font-display text-4xl text-white font-light mb-1">{s.value}</div>
                  <div className="text-charcoal-600 text-xs tracking-widest uppercase font-body">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CORE VALUES ════════════════════════════════════════════════════════ */}
      <section id="mission" className="py-20 bg-black border-y border-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="section-subtitle mb-3 block">What Drives Us</span>
            <h2 className="font-display text-4xl text-white font-light">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NIGERIAN_VALUES.map(v => (
              <div key={v.title} className="border border-charcoal-900 hover:border-gold-500/30 bg-charcoal-950 p-7 transition-all group">
                <div className="text-gold-500 mb-4">{v.icon}</div>
                <h3 className="font-display text-2xl text-white font-light mb-3 group-hover:text-gold-400 transition-colors">{v.title}</h3>
                <p className="text-charcoal-500 text-sm font-body leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CEO FULL BIO ════════════════════════════════════════════════════════ */}
      {ceo?.name && (
        <section id="ceo" className="py-14 md:py-20 lg:py-24 bg-charcoal-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div>
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-full h-full border border-gold-500/15" />
                  <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-900">
                    {ceo.image ? (
                      <img src={ceo.image} alt={ceo.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-charcoal-900">
                        <Users size={60} className="text-charcoal-700" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="border border-gold-500/20 bg-gold-500/5 px-4 py-2.5">
                    <p className="text-gold-400 text-[10px] tracking-[0.25em] uppercase font-body">Enrolled — Supreme Court of Nigeria</p>
                  </div>
                  {ceo.email && (
                    <div>
                      <p className="text-charcoal-600 text-[10px] font-body uppercase tracking-widest">Direct Line</p>
                      <a href={`mailto:${ceo.email}`} className="text-charcoal-300 text-sm font-body hover:text-gold-400 transition-colors">{ceo.email}</a>
                    </div>
                  )}
                  {ceo.linkedin && (
                    <a href={ceo.linkedin} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 text-gold-500 text-xs font-body uppercase tracking-widest hover:underline">
                      LinkedIn Profile <ArrowRight size={11} />
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <span className="section-subtitle mb-3 block">Founding Partner & CEO</span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light mb-2">{ceo.name}</h2>
                <p className="text-gold-500 font-body text-sm tracking-[0.15em] uppercase mb-6">{ceo.title}</p>

                {ceo.quote && (
                  <blockquote className="border-l-2 border-gold-500 pl-6 mb-8 py-1">
                    <p className="font-display text-2xl text-white/70 italic leading-relaxed font-light">{ceo.quote}</p>
                  </blockquote>
                )}

                <p className="text-charcoal-400 font-body leading-relaxed mb-8 text-[15px]">{ceo.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ceo.education && (
                    <div className="border border-charcoal-900 bg-black p-4">
                      <p className="text-gold-500 text-[10px] tracking-widest uppercase font-body mb-2">Education</p>
                      <p className="text-charcoal-300 font-body text-sm">{ceo.education}</p>
                    </div>
                  )}
                  {ceo.bar_admissions && (
                    <div className="border border-charcoal-900 bg-black p-4">
                      <p className="text-gold-500 text-[10px] tracking-widest uppercase font-body mb-2">Bar Admissions</p>
                      <p className="text-charcoal-300 font-body text-sm">{ceo.bar_admissions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ COURTS WE PRACTICE IN ══════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 lg:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="section-subtitle mb-3 block">National Coverage</span>
            <h2 className="font-display text-4xl text-white font-light mb-4">Courts We Appear In</h2>
            <p className="text-charcoal-500 font-body max-w-xl mx-auto text-sm">
              Our attorneys are enrolled practitioners before every tier of Nigeria's judicial hierarchy — from customary courts to the apex court of the land.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {NIGERIAN_COURTS.map(c => (
              <div key={c.abbr} className="border border-charcoal-900 hover:border-gold-500/30 bg-charcoal-950 p-6 group transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-gold-500 text-xs border border-gold-500/30 px-2 py-1">{c.abbr}</span>
                  <h3 className="font-body text-white text-sm font-semibold group-hover:text-gold-400 transition-colors">{c.court}</h3>
                </div>
                <p className="text-charcoal-500 text-xs font-body leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AWARDS ════════════════════════════════════════════════════════════ */}
      {certifications.length > 0 && (
        <section id="awards" className="py-12 md:py-16 lg:py-20 bg-charcoal-950 border-t border-charcoal-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <span className="section-subtitle mb-3 block">Recognition</span>
              <h2 className="font-display text-4xl text-white font-light">Awards & Certifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {certifications.map(cert => (
                <div key={cert.id} className="border border-charcoal-900 hover:border-gold-500/30 bg-black p-6 text-center group transition-all">
                  <div className="w-14 h-14 mx-auto mb-4 border border-gold-500/30 group-hover:border-gold-500 flex items-center justify-center transition-colors">
                    <Award size={24} className="text-gold-500/60 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <h4 className="font-body text-white font-semibold mb-1 text-sm">{cert.name}</h4>
                  <p className="text-gold-500/70 text-xs font-body">{cert.issuing_body}</p>
                  <p className="text-charcoal-700 text-[10px] font-body mt-1">{cert.year}</p>
                  {cert.description && <p className="text-charcoal-600 text-xs font-body mt-3 leading-relaxed">{cert.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ NIGERIAN CONSTITUTION REFERENCE ═══════════════════════════════════ */}
      <section className="py-16 bg-black border-y border-charcoal-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block border border-gold-500/20 px-5 py-2 mb-6">
            <Scale size={14} className="text-gold-500 inline mr-2" />
            <span className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-body">Constitutional Reference</span>
          </div>
          <blockquote className="font-display text-3xl text-white/60 italic font-light leading-relaxed mb-4">
            "In exercising its jurisdiction the Court shall apply the Constitution of the Federal Republic of Nigeria and subject thereto, every other law in force in Nigeria."
          </blockquote>
          <p className="text-charcoal-600 text-xs font-body tracking-widest">
            — Federal High Court Act, Cap. F12, Laws of the Federation of Nigeria, 2004
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20 bg-charcoal-950">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl text-white font-light mb-4">Begin Your Legal Journey</h2>
          <p className="text-charcoal-500 font-body mb-8 text-sm">
            Our attorneys are ready to review your case — whether before a customary court or the Supreme Court of Nigeria.
          </p>
          <Link to="/book-consultation" className="btn-gold">
            Schedule a Consultation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
