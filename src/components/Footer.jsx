import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-charcoal-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 border border-gold-500 flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                <Scale size={16} className="text-gold-500 group-hover:text-ink transition-colors" />
              </div>
              <div>
                <div className="font-display text-white text-lg leading-none">Blackwood</div>
                <div className="font-body text-gold-500 text-[9px] tracking-[0.3em] uppercase leading-none mt-0.5">& Associates</div>
              </div>
            </Link>
            <p className="text-charcoal-600 text-xs font-body leading-relaxed mb-4">
              Nigeria's foremost full-service law firm. Practitioners before the Supreme Court of Nigeria since 1992.
            </p>
            <div className="border border-gold-500/20 bg-gold-500/5 px-3 py-2 mb-5">
              <p className="text-gold-500 text-[9px] font-body tracking-widest uppercase">NBA Accredited · SCN Enrolled · SCUML Compliant</p>
            </div>
            <div className="flex gap-2">
              {[
                { abbr: 'Li', label: 'LinkedIn',  href: 'https://linkedin.com' },
                { abbr: 'Tw', label: 'Twitter/X', href: 'https://x.com' },
                { abbr: 'Fb', label: 'Facebook',  href: 'https://facebook.com' },
                { abbr: 'Ig', label: 'Instagram', href: 'https://instagram.com' },
              ].map(({ abbr, label, href }) => (
                <a key={abbr} href={href} target="_blank" rel="noreferrer" title={label}
                  className="w-8 h-8 border border-charcoal-800 hover:border-gold-500 flex items-center justify-center transition-colors text-charcoal-600 hover:text-gold-500 text-[9px] font-body uppercase">
                  {abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-body text-white text-[10px] tracking-[0.25em] uppercase mb-5">Practice Areas</h4>
            <ul className="space-y-2.5">
              {['Constitutional Law (CFRN 1999)', 'Corporate Law — CAMA 2020', 'Criminal Defense — ACJA 2015', 'EFCC / ICPC Defense', 'Land Use Act & Property', 'Matrimonial Causes Act', 'Immigration — NIS / IDA 2015', 'Intellectual Property'].map(area => (
                <li key={area}>
                  <Link to="/practice-areas" className="text-charcoal-600 hover:text-gold-500 text-xs font-body transition-colors leading-relaxed">{area}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-white text-[10px] tracking-[0.25em] uppercase mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[['About the Firm', '/about'], ['Our Legal Team', '/team'], ['Firm Gallery', '/gallery'], ['Legal Insights', '/blog'], ['FAQs', '/faq'], ['Testimonials', '/testimonials'], ['Book Consultation', '/book-consultation'], ['Contact Us', '/contact']].map(([label, to]) => (
                <li key={label}><Link to={to} className="text-charcoal-600 hover:text-gold-500 text-xs font-body transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="font-body text-white text-[10px] tracking-[0.25em] uppercase mb-5">Our Offices</h4>
            <div className="space-y-4">
              {[
                { city: 'Lagos (HQ)', addr: '15 Adeola Odeku St, Victoria Island', phone: '+234 (1) 555-0198' },
                { city: 'Abuja', addr: 'Plot 1072, Maitama District', phone: '+234 (9) 555-0201' },
                { city: 'Port Harcourt', addr: 'UTC Building, Moscow Road', phone: '+234 (84) 555-0215' },
                { city: 'Kano', addr: '12 Bompai Road, Nassarawa GRA', phone: '+234 (64) 555-0230' },
              ].map(o => (
                <div key={o.city} className="border-b border-charcoal-900/50 pb-3 last:border-0">
                  <p className="text-gold-500 text-[9px] font-body tracking-widest uppercase mb-1">{o.city}</p>
                  <div className="flex items-start gap-1.5 mb-1">
                    <MapPin size={9} className="text-charcoal-700 mt-0.5 flex-shrink-0" />
                    <p className="text-charcoal-600 text-[10px] font-body leading-snug">{o.addr}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone size={9} className="text-charcoal-700 flex-shrink-0" />
                    <a href={`tel:${o.phone}`} className="text-charcoal-600 text-[10px] font-body hover:text-gold-500 transition-colors">{o.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-charcoal-800 to-transparent mb-6" />
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-3 md:gap-4 text-center md:text-left">
          <p className="text-charcoal-700 text-[10px] font-body">© {new Date().getFullYear()} Blackwood & Associates Law Firm. All rights reserved. RC 112345.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5 text-charcoal-700 text-[10px] font-body">
            {['Privacy Policy', 'Terms of Use', 'Legal Disclaimer', 'Cookie Policy'].map(item => (
              <span key={item} className="hover:text-gold-500 cursor-pointer transition-colors">{item}</span>
            ))}
            <Link to="/admin" className="text-charcoal-800 hover:text-gold-500 transition-colors">Admin</Link>
          </div>
        </div>
        <p className="text-charcoal-800 text-[9px] font-body text-center mt-4 leading-relaxed">
          Blackwood & Associates is regulated by the Nigerian Bar Association (NBA). This website is for informational purposes only and does not constitute legal advice. Communications via this website do not create a solicitor-client relationship. RC: 112345 | SCUML Reg: SCM/2008/00234
        </p>
      </div>
    </footer>
  );
}
