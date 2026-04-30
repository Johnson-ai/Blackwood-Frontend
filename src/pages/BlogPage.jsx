import { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { publicAPI } from '../utils/api';

const DUMMY_POSTS = [
  { id:1, title:'Understanding the EFCC Act 2004: Your Rights During Investigation', excerpt:'An EFCC investigation can be terrifying. This guide explains what the EFCC can and cannot do, your rights under the ACJA 2015 and CFRN 1999, and what to do the moment you receive a letter of invitation.', category:'Criminal Law', published_at:'2024-10-15', author:'Barr. Fatima Al-Hassan' },
  { id:2, title:'CAMA 2020: Key Changes Every Nigerian Business Owner Must Know', excerpt:'The Companies and Allied Matters Act 2020 overhauled Nigerian corporate law. From single-member companies to electronic AGMs, we break down the changes that affect your business immediately.', category:'Corporate Law', published_at:'2024-09-28', author:'James R. Thornton, Esq.' },
  { id:3, title:'Obtaining Governor\'s Consent Under the Land Use Act: A Step-by-Step Guide', excerpt:'The Land Use Act 1978 requires Governor\'s consent for any alienation of land. Without it, your transaction is void. Here is exactly how to obtain consent and how long it takes in Lagos and Abuja.', category:'Property Law', published_at:'2024-09-10', author:'Chukwuemeka Obi' },
  { id:4, title:'Section 36 CFRN 1999: The Right to Fair Hearing in Nigerian Courts', excerpt:'Section 36 of the Constitution guarantees every citizen the right to a fair hearing. We examine how Nigerian courts have interpreted this provision and when it can be used to challenge government action.', category:'Constitutional Law', published_at:'2024-08-22', author:'Chief Victoria A. Blackwood, SAN' },
  { id:5, title:'The Matrimonial Causes Act and Divorce in Nigeria: Everything You Need to Know', excerpt:'Nigeria\'s Matrimonial Causes Act sets out specific grounds for divorce. We explain the five grounds, the process in the High Court, and how custody, maintenance, and property are settled.', category:'Family Law', published_at:'2024-08-05', author:'Adaeze Nwosu' },
  { id:6, title:'Trademark Registration in Nigeria: Protecting Your Brand Under the TMA', excerpt:'Many Nigerian businesses operate with unregistered trademarks, leaving them vulnerable to infringement. This post explains how to register under the Trade Marks Act and what protection it gives you.', category:'Intellectual Property', published_at:'2024-07-18', author:'Dr. Amara Osei' },
];

const CATEGORY_COLORS = {
  'Criminal Law': 'text-red-400 border-red-800',
  'Corporate Law': 'text-blue-400 border-blue-800',
  'Property Law': 'text-green-400 border-green-800',
  'Constitutional Law': 'text-gold-500 border-gold-500/30',
  'Family Law': 'text-purple-400 border-purple-800',
  'Intellectual Property': 'text-cyan-400 border-cyan-800',
};

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    publicAPI.getBlog().then(r => { if (r.data?.length > 0) setPosts(r.data); else setPosts(DUMMY_POSTS); }).catch(() => setPosts(DUMMY_POSTS));
  }, []);

  const categories = ['All', ...new Set(posts.map(p => p.category).filter(Boolean))];
  const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter);
  const [featured, ...rest] = filtered;

  return (
    <Layout>
      <PageHero subtitle="Legal Insights" title="Our Blog" description="Expert commentary on Nigerian law, landmark cases, and legal developments from our attorneys." />

      {/* Category filters */}
      <div className="bg-charcoal-950 border-b border-charcoal-900 py-4 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-[10px] font-body tracking-widest uppercase border transition-colors ${filter === cat ? 'border-gold-500 bg-gold-500 text-ink' : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-gold-500'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Featured post */}
          {featured && (
            <div className="border border-charcoal-900 hover:border-gold-500/20 bg-charcoal-950 p-8 mb-10 group transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[10px] font-body tracking-widest uppercase border px-2 py-0.5 ${CATEGORY_COLORS[featured.category] || 'text-gold-500 border-gold-500/30'}`}>{featured.category}</span>
                    <span className="text-charcoal-600 text-[10px] font-body">Featured</span>
                  </div>
                  <h2 className="font-display text-3xl text-white font-light group-hover:text-gold-400 transition-colors leading-snug mb-4">{featured.title}</h2>
                  <p className="text-charcoal-400 font-body text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-charcoal-600 text-[10px] font-body uppercase tracking-wider">
                    {featured.author && <span className="flex items-center gap-1.5"><User size={10} />{featured.author}</span>}
                    {featured.published_at && <span className="flex items-center gap-1.5"><Calendar size={10} />{new Date(featured.published_at).toLocaleDateString('en-NG', { day:'numeric', month:'long', year:'numeric' })}</span>}
                  </div>
                </div>
                {featured.image ? (
                  <div className="overflow-hidden aspect-video bg-charcoal-900">
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                ) : (
                  <div className="aspect-video bg-charcoal-900 border border-charcoal-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-display text-6xl text-charcoal-800 font-light">{featured.category?.[0]}</div>
                      <p className="text-charcoal-700 text-xs font-body mt-2">{featured.category}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(post => (
                <article key={post.id} className="group border border-charcoal-900 hover:border-gold-500/20 bg-charcoal-950 transition-all">
                  {post.image && (
                    <div className="overflow-hidden aspect-video">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  <div className="p-6">
                    <span className={`text-[10px] font-body tracking-widest uppercase border px-2 py-0.5 mb-3 inline-block ${CATEGORY_COLORS[post.category] || 'text-gold-500 border-gold-500/30'}`}>{post.category}</span>
                    <h3 className="font-display text-xl text-white font-light group-hover:text-gold-400 transition-colors leading-snug mb-3">{post.title}</h3>
                    <p className="text-charcoal-500 text-xs font-body leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-charcoal-700 text-[10px] font-body border-t border-charcoal-900 pt-4 mt-auto">
                      {post.author && <span className="flex items-center gap-1"><User size={9} />{post.author}</span>}
                      {post.published_at && <span className="flex items-center gap-1 ml-auto"><Calendar size={9} />{new Date(post.published_at).toLocaleDateString('en-NG', { month:'short', day:'numeric', year:'numeric' })}</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 border border-charcoal-900 bg-charcoal-950">
              <p className="text-charcoal-600 font-body">No posts in this category yet.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 border border-charcoal-900 bg-charcoal-950 p-8 text-center">
            <h3 className="font-display text-3xl text-white font-light mb-2">Need Legal Advice?</h3>
            <p className="text-charcoal-500 font-body text-sm mb-6 leading-relaxed">Our attorneys are available for consultations on any of the matters discussed in these articles. Book a confidential session today.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/book-consultation" className="btn-gold text-sm">Book Consultation <ArrowRight size={13} /></Link>
              <Link to="/contact" className="btn-outline-gold text-sm">Contact Our Offices</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
