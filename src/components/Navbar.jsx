import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale, ChevronDown, Search, LogIn } from 'lucide-react';

const navStructure = [
  {
    label: 'People & Places',
    children: [
      { label: 'Our Attorneys', to: '/team' },
      { label: 'Founding Partner', to: '/about' },
      { label: 'Office Locations', to: '/contact' },
      { label: 'Gallery', to: '/gallery' },
    ],
  },
  {
    label: 'Expertise',
    children: [
      { label: 'All Practice Areas', to: '/practice-areas' },
      { label: 'Constitutional Law', to: '/practice-areas/constitutional-law' },
      { label: 'Corporate Law — CAMA 2020', to: '/practice-areas/corporate-law' },
      { label: 'Criminal Defense — ACJA 2015', to: '/practice-areas/criminal-defense' },
      { label: 'Family Law', to: '/practice-areas/family-law' },
      { label: 'Real Estate & Property', to: '/practice-areas/real-estate-law' },
      { label: 'Immigration Law', to: '/practice-areas/immigration-law' },
      { label: 'Intellectual Property', to: '/practice-areas/intellectual-property' },
    ],
  },
  {
    label: 'Insights',
    children: [
      { label: 'Legal Blog', to: '/blog' },
      { label: 'Legal FAQs', to: '/faq' },
      { label: 'Client Testimonials', to: '/testimonials' },
    ],
  },
  {
    label: 'Briefings',
    to: '/blog',
  },
  {
    label: 'About Us',
    children: [
      { label: 'Firm Overview', to: '/about' },
      { label: 'Mission & Vision', to: '/about#mission' },
      { label: 'Awards & Recognition', to: '/about#awards' },
      { label: 'Our Certifications', to: '/about#awards' },
    ],
  },
  {
    label: 'Careers',
    to: '/contact',
  },
  {
    label: 'Client Portal',
    to: '/book-consultation',
    highlight: true,
  },
];

function DropdownMenu({ items, visible }) {
  return (
    <div className={`absolute top-full left-0 mt-0 w-64 bg-ink border border-charcoal-800 shadow-2xl transition-all duration-200 z-50
      ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
      <div className="h-0.5 bg-gold-500 w-full" />
      {items.map((item) => (
        <Link key={item.label} to={item.to}
          className="block px-5 py-3 text-sm font-body text-charcoal-300 hover:text-gold-500 hover:bg-charcoal-950 border-b border-charcoal-900/50 last:border-0 transition-colors">
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
    setMobileExpanded(null);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  // Simple client-side search — navigate to best match
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const allLinks = navStructure.flatMap(n => n.children || (n.to ? [{ label: n.label, to: n.to }] : []));
      const match = allLinks.find(l => l.label.toLowerCase().includes(q));
      if (match) { window.location.href = match.to; }
      else if (q.includes('efcc') || q.includes('criminal') || q.includes('arrest')) window.location.href = '/practice-areas/criminal-defense';
      else if (q.includes('land') || q.includes('property') || q.includes('cof o')) window.location.href = '/practice-areas/real-estate-law';
      else if (q.includes('company') || q.includes('cama') || q.includes('corporate')) window.location.href = '/practice-areas/corporate-law';
      else if (q.includes('visa') || q.includes('immigr')) window.location.href = '/practice-areas/immigration-law';
      else if (q.includes('divorce') || q.includes('custody') || q.includes('family')) window.location.href = '/practice-areas/family-law';
      else if (q.includes('trademark') || q.includes('patent') || q.includes('copyright')) window.location.href = '/practice-areas/intellectual-property';
      else if (q.includes('constit') || q.includes('rights') || q.includes('cfrn')) window.location.href = '/practice-areas/constitutional-law';
      else if (q.includes('book') || q.includes('consult')) window.location.href = '/book-consultation';
      else if (q.includes('contact') || q.includes('office')) window.location.href = '/contact';
      else if (q.includes('team') || q.includes('attorney') || q.includes('lawyer')) window.location.href = '/team';
      else if (q.includes('blog') || q.includes('insight')) window.location.href = '/blog';
      else if (q.includes('faq')) window.location.href = '/faq';
      else window.location.href = '/practice-areas';
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen ? 'bg-ink border-b border-charcoal-900 shadow-2xl' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-9 h-9 border border-gold-500 flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-300">
                <Scale size={16} className="text-gold-500 group-hover:text-ink transition-colors duration-300" />
              </div>
              <div>
                <div className="font-display text-white text-lg leading-none tracking-wide">Blackwood</div>
                <div className="font-body text-gold-500 text-[9px] tracking-[0.3em] uppercase leading-none mt-0.5">& Associates</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navStructure.map((item) => (
                <div key={item.label} className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}>
                  {item.to && !item.children ? (
                    <Link to={item.to}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-body tracking-wide transition-colors whitespace-nowrap
                        ${item.highlight
                          ? 'border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-ink px-4 ml-3'
                          : 'text-charcoal-300 hover:text-gold-500'
                        }`}>
                      {item.highlight && <LogIn size={12} />}
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={`flex items-center gap-1 px-3.5 py-2 text-sm font-body tracking-wide transition-colors whitespace-nowrap
                        ${openDropdown === item.label ? 'text-gold-500' : 'text-charcoal-300 hover:text-gold-500'}`}>
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180 text-gold-500' : ''}`} />
                    </button>
                  )}
                  {item.children && <DropdownMenu items={item.children} visible={openDropdown === item.label} />}
                </div>
              ))}
              <button onClick={() => setSearchOpen(!searchOpen)}
                className="ml-3 w-9 h-9 border border-charcoal-800 hover:border-gold-500 flex items-center justify-center text-charcoal-400 hover:text-gold-500 transition-colors">
                <Search size={15} />
              </button>
            </div>

            {/* Mobile controls */}
            <div className="xl:hidden flex items-center gap-3">
              <button onClick={() => setSearchOpen(!searchOpen)} className="text-charcoal-400 hover:text-gold-500 transition-colors p-1"><Search size={18} /></button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-500" />
                <input ref={searchRef} type="text" value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search: EFCC defense, Land Use Act, trademark, divorce… (press Enter)"
                  className="w-full bg-charcoal-950 border border-charcoal-800 focus:border-gold-500 pl-11 pr-4 py-3 text-sm font-body text-white placeholder-charcoal-600 outline-none transition-colors" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="xl:hidden bg-ink border-t border-charcoal-900 max-h-[80vh] overflow-y-auto">
            {navStructure.map((item) => (
              <div key={item.label} className="border-b border-charcoal-900">
                {item.to && !item.children ? (
                  <Link to={item.to}
                    className={`flex items-center justify-between px-6 py-5 font-body text-base transition-colors
                      ${item.highlight ? 'text-gold-500 font-medium' : 'text-white hover:text-gold-500'}`}>
                    {item.label}
                    {item.highlight && <LogIn size={16} />}
                  </Link>
                ) : (
                  <>
                    <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between px-6 py-5 text-white hover:text-gold-500 font-body text-base transition-colors">
                      <span>{item.label}</span>
                      <ChevronDown size={16} className={`text-charcoal-500 transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180 text-gold-500' : ''}`} />
                    </button>
                    {mobileExpanded === item.label && item.children && (
                      <div className="bg-charcoal-950 border-t border-charcoal-900">
                        {item.children.map((child) => (
                          <Link key={child.label} to={child.to}
                            className="block px-8 py-3.5 text-sm font-body text-charcoal-400 hover:text-gold-500 border-b border-charcoal-900/40 last:border-0 transition-colors">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
      {openDropdown && <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />}
    </>
  );
}
