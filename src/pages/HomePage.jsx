import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Scale, BookOpen, Shield, ChevronDown, Check } from 'lucide-react';
import Layout from '../components/Layout';
import { publicAPI } from '../utils/api';

// Nigerian constitutional provisions used prominently
const CONSTITUTIONAL_PILLARS = [
  {
    ref: 'Section 6(6)(b)',
    title: 'Access to Justice',
    text: 'The Constitution of the Federal Republic of Nigeria, 1999 guarantees that no citizen shall be denied the right to seek judicial redress — we are that right made manifest.',
  },
  {
    ref: 'Section 36',
    title: 'Fair Hearing',
    text: 'Every person charged with a criminal offence shall be entitled to a fair hearing in public within a reasonable time. We ensure every client receives exactly that.',
  },
  {
    ref: 'Section 17(2)(e)',
    title: 'Equal Rights',
    text: 'The State shall direct its policy towards ensuring that all citizens, without discrimination on any group whatsoever, have the opportunity for securing adequate means of livelihood.',
  },
  {
    ref: 'Section 46',
    title: 'Enforcement of Rights',
    text: 'Any person who alleges that any of the provisions of Chapter IV has been, is being, or is likely to be contravened may apply to a High Court for redress. We take you there.',
  },
];

const NIGERIAN_PRACTICE = [
  { icon: '⚖️', name: 'Constitutional Law & CFRN Litigation', ref: 'CFRN 1999' },
  { icon: '🏛️', name: 'Supreme Court Appeals & FHC Practice', ref: 'SCN/FHC' },
  { icon: '💼', name: 'CAMA 2020 Corporate Compliance', ref: 'CAMA 2020' },
  { icon: '🛡️', name: 'Criminal Defense — ACJA 2015', ref: 'ACJA 2015' },
  { icon: '🌍', name: 'Immigration & NIS Matters', ref: 'IDA Cap. I1' },
  { icon: '🏠', name: 'Land Use Act & Property Rights', ref: 'LUA 1978' },
  { icon: '💡', name: 'Trademarks & Patents Registry', ref: 'TMA Cap. T13' },
  { icon: '👨‍👩‍👧', name: 'Matrimonial Causes & Child Rights', ref: 'CRA 2003' },
];

const LEGAL_MILESTONES = [
  { year: '1992', event: 'Firm founded in Lagos, Nigeria by Chief Adewale Blackwood, SAN' },
  { year: '1999', event: 'Pivotal role in constitutional transition from military to democratic rule' },
  { year: '2004', event: 'Landmark Supreme Court victory in Blackwood v. NNPC on oil community rights' },
  { year: '2010', event: 'Expanded to Abuja, Port Harcourt and Kano, establishing full national coverage' },
  { year: '2015', event: 'Instrumental in shaping ACJA 2015 reform legislation through amicus briefs' },
  { year: '2020', event: 'Led pro bono team defending over 200 #EndSARS detainees at Judicial Panels' },
  { year: '2024', event: 'Recognized as Nigeria\'s top-tier firm by Legal 500 and Chambers Africa' },
];

function CounterStat({ end, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(end / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(start);
        }, 25);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-6xl text-gold-500 font-light tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-charcoal-500 text-xs tracking-[0.25em] uppercase font-body mt-2">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [hero, setHero] = useState({
    headline: 'Nigeria\'s Foremost Advocates for Justice & Rights',
    subheadline: 'Grounded in the Constitution of the Federal Republic of Nigeria, 1999 — relentless in every court, at every level.',
    cta_primary: 'Book a Consultation',
    cta_secondary: 'Explore Our Practice Areas',
  });
  const [ceo, setCeo] = useState(null);
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    publicAPI.getHero().then(r => { if (r.data?.headline) setHero(r.data); }).catch(() => {});
    publicAPI.getCEO().then(r => setCeo(r.data)).catch(() => {});
    publicAPI.getPracticeAreas().then(r => setPracticeAreas(r.data.slice(0, 8))).catch(() => {});
    publicAPI.getTestimonials().then(r => setTestimonials(r.data.slice(0, 3))).catch(() => {});
    publicAPI.getCertifications().then(r => setCertifications(r.data)).catch(() => {});
    publicAPI.getTeam().then(r => setTeam(r.data.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <Layout>

      {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#080808] to-charcoal-950" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 59px,#C9A84C 59px,#C9A84C 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,#C9A84C 59px,#C9A84C 60px)` }} />
        {/* Vertical accent lines */}
        <div className="absolute top-0 left-16 w-px h-full bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute top-0 right-16 w-px h-full bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-28 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Constitutional citation badge */}
              <div className="inline-flex items-center gap-3 border border-gold-500/30 bg-gold-500/5 px-5 py-2.5 mb-8">
                <Scale size={14} className="text-gold-500 flex-shrink-0" />
                <span className="text-gold-400 text-xs font-body tracking-[0.2em] uppercase">
                  CFRN 1999 · Section 6 · Lagos · Abuja · Port Harcourt
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light leading-[1.05] mb-7">
                {hero.headline}
              </h1>

              <div className="h-px w-20 bg-gold-500 mb-7" />

              <p className="text-charcoal-400 text-lg font-body font-light leading-relaxed max-w-xl mb-10">
                {hero.subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-14">
                <Link to="/book-consultation" className="btn-gold text-sm px-8 py-4">
                  {hero.cta_primary} <ArrowRight size={15} />
                </Link>
                <Link to="/practice-areas" className="btn-outline-gold text-sm px-8 py-4">
                  {hero.cta_secondary}
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {['NBA Accredited', 'Supreme Court', 'FHC Enrolled', 'SCUML Compliant'].map(tag => (
                  <div key={tag} className="flex items-center gap-2">
                    <Check size={12} className="text-gold-500" />
                    <span className="text-charcoal-500 text-xs font-body tracking-wider">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats panel */}
            <div className="lg:col-span-5">
              <div className="border border-charcoal-900 bg-charcoal-950/80 backdrop-blur p-8">
                <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-8" />
                <div className="grid grid-cols-2 gap-6">
                  <CounterStat end={32} suffix="+" label="Years in Practice" />
                  <CounterStat end={5200} suffix="+" label="Cases Handled" />
                  <CounterStat end={98} suffix="%" label="Client Success Rate" />
                  <CounterStat end={47} label="Senior Counsel" />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-8 mb-6" />
                <div className="text-center">
                  <p className="text-charcoal-600 text-[10px] font-body tracking-[0.3em] uppercase">
                    NBA · ICSAN · NIIA · AAA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#constitution" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-charcoal-600 hover:text-gold-500 transition-colors animate-bounce">
          <ChevronDown size={22} />
        </a>
      </section>

      {/* ═══ CONSTITUTIONAL PILLARS ════════════════════════════════════════════ */}
      <section id="constitution" className="py-20 bg-black border-y border-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="section-subtitle mb-3 block">Our Legal Foundation</span>
            <h2 className="font-display text-4xl text-white font-light">
              Rooted in the Constitution of the Federal Republic of Nigeria, 1999
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONSTITUTIONAL_PILLARS.map((p) => (
              <div key={p.ref} className="relative border border-charcoal-900 hover:border-gold-500/30 p-6 transition-all duration-300 group bg-charcoal-950/50">
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-500" />
                <div className="inline-block border border-gold-500/40 text-gold-500 text-[10px] font-mono tracking-widest px-2 py-1 mb-4">
                  {p.ref}
                </div>
                <h3 className="font-display text-xl text-white font-light mb-3">{p.title}</h3>
                <p className="text-charcoal-500 text-xs font-body leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-charcoal-700 text-xs font-body tracking-widest italic">
              "The judiciary shall be maintained as a viable institution capable of performing its constitutional responsibilities." — CFRN 1999, Section 17(2)(e)
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CEO PROFILE ════════════════════════════════════════════════════════ */}
      {ceo && (
        <section className="py-28 bg-charcoal-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-8 md:gap-12 lg:gap-16 items-start md:items-center">
              {/* Image with decorative frame */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -top-5 -left-5 w-3/4 h-3/4 border border-gold-500/15" />
                <div className="absolute -bottom-5 -right-5 w-1/2 h-1/2 border border-gold-500/10" />
                <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden bg-charcoal-900">
                  {ceo.image ? (
                    <img src={ceo.image} alt={ceo.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-charcoal-800 to-charcoal-950 flex flex-col items-center justify-center">
                      <div className="w-28 h-28 rounded-full border-2 border-gold-500/30 bg-gold-500/10 flex items-center justify-center mb-4">
                        <Users size={44} className="text-gold-500/40" />
                      </div>
                      <p className="text-charcoal-600 text-xs font-body">Portrait Coming Soon</p>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                  {/* Credential badge */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="border border-gold-500/30 bg-black/60 backdrop-blur px-4 py-2">
                      <p className="text-gold-400 text-[10px] tracking-[0.2em] uppercase font-body">Senior Advocate of Nigeria (SAN)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px w-8 bg-gold-500" />
                  <span className="section-subtitle">Founding Partner</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-2">
                  {ceo.name}
                </h2>
                <p className="text-gold-500 font-body text-sm tracking-[0.2em] uppercase mb-8">{ceo.title}</p>

                {ceo.quote && (
                  <blockquote className="border-l-2 border-gold-500 pl-6 mb-8">
                    <p className="font-display text-2xl text-white/75 italic leading-relaxed font-light">
                      {ceo.quote}
                    </p>
                  </blockquote>
                )}

                <p className="text-charcoal-400 font-body leading-relaxed text-[15px] mb-8">{ceo.bio}</p>

                <div className="space-y-3 mb-8">
                  {ceo.education && (
                    <div className="flex items-start gap-3">
                      <BookOpen size={14} className="text-gold-500 mt-1 flex-shrink-0" />
                      <p className="text-charcoal-400 text-sm font-body">{ceo.education}</p>
                    </div>
                  )}
                  {ceo.bar_admissions && (
                    <div className="flex items-start gap-3">
                      <Scale size={14} className="text-gold-500 mt-1 flex-shrink-0" />
                      <p className="text-charcoal-400 text-sm font-body">{ceo.bar_admissions}</p>
                    </div>
                  )}
                </div>

                <Link to="/about" className="btn-outline-gold text-sm">
                  Full Biography <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ NIGERIAN PRACTICE AREAS ════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 lg:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center text-center mb-14">
            <span className="section-subtitle mb-4">Areas of Expertise</span>
            <h2 className="section-title mb-4">Our Practice Areas</h2>
            <p className="text-charcoal-500 font-body max-w-xl text-sm leading-relaxed">
              Comprehensive legal services rooted in Nigerian statutes, case law and the Constitution of the Federal Republic of Nigeria, 1999.
            </p>
            <div className="h-px w-20 bg-gold-500 mt-6" />
          </div>

          {/* Use DB data if available, else use Nigerian-specific static */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(practiceAreas.length > 0 ? practiceAreas : NIGERIAN_PRACTICE).map((area, i) => (
              <Link key={area.id || i} to={area.slug ? `/practice-areas/${area.slug}` : '/practice-areas'}
                className="group border border-charcoal-900 hover:border-gold-500/40 bg-charcoal-950/50 p-6 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-gold-500 group-hover:w-full transition-all duration-500" />
                <div className="text-3xl mb-4">{area.icon}</div>
                <h3 className="font-display text-xl text-white group-hover:text-gold-400 transition-colors leading-snug mb-2">
                  {area.name}
                </h3>
                {(area.ref || area.short_description) && (
                  <p className="text-charcoal-600 text-[10px] font-mono tracking-wider mt-2">
                    {area.ref || ''}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-5 text-gold-500/0 group-hover:text-gold-500 transition-colors text-xs font-body tracking-widest uppercase">
                  Learn More <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/practice-areas" className="btn-outline-gold text-sm">
              Full Practice Area Overview
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FIRM MILESTONES ════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 lg:py-24 bg-charcoal-950 border-y border-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            <div>
              <span className="section-subtitle mb-4 block">Three Decades of Excellence</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light leading-tight mb-6">
                A Legacy Built in Nigerian Courtrooms
              </h2>
              <p className="text-charcoal-400 font-body leading-relaxed mb-8">
                From the sweeping constitutional transitions of 1999 to landmark Supreme Court victories, Blackwood & Associates has been at the forefront of Nigerian jurisprudence. We do not merely practice law — we shape it.
              </p>
              <div className="border-l border-gold-500/30 pl-6 space-y-1">
                <p className="text-charcoal-600 text-xs font-body italic">
                  "The rule of law is the bedrock upon which Nigeria's democracy rests. We exist to defend that bedrock."
                </p>
                <p className="text-gold-500 text-xs font-body tracking-widest uppercase mt-2">— Chief Adewale Blackwood, SAN</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {LEGAL_MILESTONES.map((m, i) => (
                <div key={m.year} className="flex gap-5 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border border-gold-500/40 group-hover:border-gold-500 bg-charcoal-950 flex items-center justify-center transition-colors flex-shrink-0">
                      <span className="text-gold-500 text-[10px] font-mono font-bold">{m.year.slice(2)}</span>
                    </div>
                    {i < LEGAL_MILESTONES.length - 1 && (
                      <div className="w-px flex-1 bg-charcoal-900 group-hover:bg-gold-500/20 transition-colors my-1" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-gold-500 text-xs font-mono tracking-widest mb-1">{m.year}</p>
                    <p className="text-charcoal-400 text-sm font-body leading-relaxed group-hover:text-charcoal-300 transition-colors">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS & RECOGNITION ══════════════════════════════════════ */}
      {certifications.length > 0 && (
        <section className="py-16 bg-black border-b border-charcoal-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <p className="text-center text-charcoal-600 text-[10px] tracking-[0.4em] uppercase font-body mb-10">
              Awards & Recognition
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map(cert => (
                <div key={cert.id} className="text-center group cursor-default">
                  <div className="w-14 h-14 mx-auto mb-3 border border-charcoal-800 group-hover:border-gold-500/50 flex items-center justify-center transition-colors">
                    <Award size={22} className="text-charcoal-600 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <h4 className="text-white text-sm font-body font-semibold mb-0.5">{cert.name}</h4>
                  <p className="text-charcoal-600 text-xs font-body">{cert.issuing_body}</p>
                  <p className="text-gold-500/60 text-[10px] font-body mt-0.5">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ TEAM PREVIEW ═══════════════════════════════════════════════════════ */}
      {team.length > 0 && (
        <section className="py-14 md:py-20 lg:py-24 bg-ink">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-14">
              <span className="section-subtitle mb-4">Legal Minds</span>
              <h2 className="section-title mb-4">Meet Our Attorneys</h2>
              <div className="h-px w-20 bg-gold-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map(member => (
                <div key={member.id} className="group text-center">
                  <div className="relative mb-5 overflow-hidden mx-auto w-44 h-52 bg-charcoal-900">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users size={36} className="text-charcoal-700" />
                      </div>
                    )}
                    <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/40 transition-all duration-300" />
                  </div>
                  <h3 className="font-display text-xl text-white group-hover:text-gold-400 transition-colors">{member.name}</h3>
                  <p className="text-gold-500 text-[10px] font-body tracking-[0.2em] uppercase mt-1">{member.title}</p>
                  <p className="text-charcoal-600 text-xs font-body mt-2">{member.specialization}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/team" className="btn-outline-gold text-sm">View Full Legal Team</Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ TESTIMONIALS ═══════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="py-14 md:py-20 lg:py-24 bg-charcoal-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-14">
              <span className="section-subtitle mb-4">Client Voices</span>
              <h2 className="section-title mb-4">What Our Clients Say</h2>
              <div className="h-px w-20 bg-gold-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <div key={t.id} className="border border-charcoal-900 bg-black p-8 relative group hover:border-gold-500/20 transition-colors">
                  <div className="absolute top-5 right-6 font-display text-7xl text-gold-500/10 leading-none select-none">"</div>
                  <div className="flex text-gold-500 text-sm mb-5">{'★'.repeat(t.rating || 5)}</div>
                  <p className="text-charcoal-300 font-body leading-relaxed text-sm mb-6">{t.review}</p>
                  <div className="border-t border-charcoal-900 pt-5">
                    <p className="text-white font-body text-sm font-semibold">{t.client_name}</p>
                    <p className="text-gold-500/60 text-xs font-body tracking-wider mt-0.5">{t.case_type}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/testimonials" className="btn-outline-gold text-sm">Read All Testimonials</Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ NIGERIAN LAW DISCLAIMER BAND ═══════════════════════════════════════ */}
      <section className="py-10 bg-charcoal-950 border-y border-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              'Nigerian Bar Association Member',
              'Supreme Court of Nigeria — Enrolled',
              'Federal High Court Practitioners',
              'EFCC & ICPC Defense Specialists',
              'NIS / Immigration Law Practice',
              'SCUML Anti-Money Laundering Compliant',
            ].map(item => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gold-500 rounded-full" />
                <span className="text-charcoal-500 text-[10px] font-body tracking-widest uppercase">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-700 via-gold-500 to-gold-600" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 19px, #000 19px, #000 20px)` }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 border border-ink/20 bg-ink/10 px-5 py-2 mb-6">
            <Shield size={13} className="text-ink/70" />
            <span className="text-ink/70 text-xs font-body tracking-[0.2em] uppercase">Confidential Consultations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink font-light mb-5 leading-tight">
            Your Rights Deserve the Strongest Defence
          </h2>
          <p className="font-body text-ink/70 text-lg mb-10 max-w-2xl mx-auto">
            Whether it is a constitutional matter before the Supreme Court or a family dispute in the High Court, our attorneys are ready to fight for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/book-consultation"
              className="bg-ink text-white px-10 py-4 font-body font-semibold text-sm tracking-[0.15em] uppercase hover:bg-charcoal-950 transition-colors flex items-center gap-2">
              Book Free Consultation <ArrowRight size={14} />
            </Link>
            <Link to="/contact"
              className="border-2 border-ink text-ink px-10 py-4 font-body font-semibold text-sm tracking-[0.15em] uppercase hover:bg-ink hover:text-white transition-colors">
              Contact Our Offices
            </Link>
          </div>
          <p className="text-ink/40 text-xs font-body mt-6">
            Attorney-client privilege applies from first contact — CFRN 1999, Legal Practitioners Act Cap. L11
          </p>
        </div>
      </section>
    </Layout>
  );
}
