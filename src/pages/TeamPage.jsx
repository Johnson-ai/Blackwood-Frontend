import { useEffect, useState } from 'react';
import { Mail, Linkedin, Users, Scale, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { publicAPI } from '../utils/api';

const DUMMY = [
  { id:1, name:'Chief Victoria A. Blackwood, SAN', title:'Founding Partner & CEO', specialization:'Constitutional Law & Corporate Litigation', bio:'Over 32 years before the Supreme Court of Nigeria. Led landmark cases reshaping Nigerian corporate and constitutional jurisprudence.', education:'LLB (Hons) University of Lagos | LLM Harvard Law School | Called to Bar 1992', email:'victoria@blackwoodlaw.com.ng', linkedin:'' },
  { id:2, name:'James R. Thornton, Esq.', title:'Senior Partner', specialization:'CAMA 2020 Corporate & M&A', bio:'20+ years structuring mergers, acquisitions and corporate governance matters under CAMA 2020 and SEC regulations.', education:'LLB University of Ibadan | BL Nigerian Law School', email:'james@blackwoodlaw.com.ng' },
  { id:3, name:'Dr. Amara Osei', title:'Partner', specialization:'International Law & Human Rights', bio:'Appeared before ECOWAS Community Court of Justice and international arbitration tribunals on behalf of Nigerian state and corporate clients.', education:'LLB (Hons) | Ph.D International Law, University of Lagos', email:'amara@blackwoodlaw.com.ng' },
  { id:4, name:'Barr. Fatima Al-Hassan', title:'Partner', specialization:'Criminal Defense — ACJA 2015 & EFCC', bio:'Lead defense counsel in high-profile EFCC prosecutions. Specialist in ACJA 2015 pre-trial detention rights and fundamental rights enforcement.', education:'LLB ABU Zaria | BL Nigerian Law School | LLM Criminal Justice', email:'fatima@blackwoodlaw.com.ng' },
  { id:5, name:'Chukwuemeka Obi', title:'Associate Attorney', specialization:'Land Use Act & Real Property', bio:'Handles C of O applications, Governor\'s consent, and LUA revocation challenges across Lagos, Abuja and Enugu.', education:'LLB University of Nigeria Nsukka | BL Nigerian Law School', email:'emeka@blackwoodlaw.com.ng' },
  { id:6, name:'Adaeze Nwosu', title:'Associate Attorney', specialization:'Family Law — Matrimonial Causes Act', bio:'Specialist in divorce, custody, and child rights matters under the MCA and Child Rights Act 2003.', education:'LLB (Hons) UNILAG | BL Nigerian Law School | LLM Family Law', email:'adaeze@blackwoodlaw.com.ng' },
];

export default function TeamPage() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    publicAPI.getTeam().then(r => { if (r.data?.length > 0) setTeam(r.data); else setTeam(DUMMY); }).catch(() => setTeam(DUMMY));
  }, []);

  return (
    <Layout>
      <PageHero subtitle="Our Legal Minds" title="The Team" description="Senior Advocates, Partners and Associates enrolled before every tier of Nigeria's judicial hierarchy." />

      {/* NBA / SAN note */}
      <div className="bg-black border-b border-charcoal-900 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-wrap items-center justify-center gap-6">
          {['Nigerian Bar Association (NBA)', 'Supreme Court of Nigeria Roll', 'Federal High Court Roll', 'Nigerian Law School (BL)', 'ICSAN Members'].map(b => (
            <div key={b} className="flex items-center gap-2">
              <Scale size={10} className="text-gold-500" />
              <span className="text-charcoal-500 text-[10px] font-body tracking-widest uppercase">{b}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="py-14 md:py-20 lg:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {team.map(member => (
              <div key={member.id} className="group border border-charcoal-900 hover:border-gold-500/20 bg-charcoal-950 transition-all duration-300">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-charcoal-900">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-charcoal-900 to-charcoal-950">
                      <Users size={48} className="text-charcoal-800" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {/* Hover links */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="w-10 h-10 border border-gold-500 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-ink transition-colors"><Mail size={15} /></a>
                    )}
                    {member.linkedin && member.linkedin !== '#' && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 border border-gold-500 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-ink transition-colors"><Linkedin size={15} /></a>
                    )}
                  </div>
                </div>
                {/* Details */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-white font-light group-hover:text-gold-400 transition-colors leading-snug">{member.name}</h3>
                  <p className="text-gold-500 text-[10px] font-body tracking-[0.2em] uppercase mt-1 mb-1">{member.title}</p>
                  <p className="text-charcoal-500 text-xs font-body mb-3">{member.specialization}</p>
                  <p className="text-charcoal-500 text-xs font-body leading-relaxed mb-4">{member.bio}</p>
                  {member.education && (
                    <div className="flex items-start gap-2 border-t border-charcoal-900 pt-4">
                      <BookOpen size={11} className="text-gold-500 mt-0.5 flex-shrink-0" />
                      <p className="text-charcoal-700 text-[10px] font-body leading-relaxed">{member.education}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the team CTA */}
      <section className="py-16 bg-charcoal-950 border-t border-charcoal-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="section-subtitle mb-4 block">Careers</span>
          <h2 className="font-display text-4xl text-white font-light mb-4">Join Our Legal Team</h2>
          <p className="text-charcoal-500 font-body text-sm leading-relaxed mb-8">We recruit talented Nigerian Law School graduates and experienced counsel who share our commitment to excellence, integrity, and justice. Send your CV and cover letter to <span className="text-gold-400">careers@blackwoodlaw.com.ng</span></p>
          <Link to="/contact" className="btn-outline-gold text-sm">Get in Touch</Link>
        </div>
      </section>
    </Layout>
  );
}
