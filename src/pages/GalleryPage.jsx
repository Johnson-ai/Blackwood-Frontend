import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { publicAPI } from '../utils/api';

const DEMO = [
  { id:1, title:'Lagos Head Office — Reception', category:'Office', image_url:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { id:2, title:'Supreme Court of Nigeria — Abuja', category:'Courts', image_url:'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80' },
  { id:3, title:'Partner Meeting — Victoria Island', category:'Office', image_url:'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80' },
  { id:4, title:'Legal Team Retreat 2023', category:'Events', image_url:'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80' },
  { id:5, title:'Abuja FCT Office — Boardroom', category:'Office', image_url:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80' },
  { id:6, title:'Client Appreciation Dinner — Lagos', category:'Events', image_url:'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&q=80' },
  { id:7, title:'Pro Bono Clinic — Surulere', category:'Community', image_url:'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80' },
  { id:8, title:'NBA Annual Conference — Abuja 2023', category:'Events', image_url:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id:9, title:'Port Harcourt Office Opening', category:'Office', image_url:'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80' },
];

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    publicAPI.getGallery().then(r => { if (r.data?.length > 0) setGallery(r.data); else setGallery(DEMO); }).catch(() => setGallery(DEMO));
  }, []);

  const categories = ['All', ...new Set(gallery.map(g => g.category).filter(Boolean))];
  const filtered = active === 'All' ? gallery : gallery.filter(g => g.category === active);

  return (
    <Layout>
      <PageHero subtitle="Our World" title="Gallery" description="A window into our offices, courtrooms, community work, and firm culture across Nigeria." />

      {/* Category filter */}
      <div className="bg-charcoal-950 border-b border-charcoal-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-wrap gap-2 justify-start">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-5 py-1.5 text-[10px] font-body tracking-widest uppercase border transition-colors ${active === cat ? 'border-gold-500 bg-gold-500 text-ink' : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-gold-500'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="py-12 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map(item => (
              <div key={item.id} className="break-inside-avoid cursor-pointer group relative overflow-hidden bg-charcoal-900"
                onClick={() => setLightbox(item)}>
                <img src={item.image_url} alt={item.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <p className="text-white font-body text-sm font-semibold">{item.title}</p>
                    <p className="text-gold-400 text-[10px] font-body tracking-wider uppercase mt-0.5">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 w-10 h-10 border border-charcoal-700 flex items-center justify-center text-white hover:border-gold-500 hover:text-gold-500 transition-colors" onClick={() => setLightbox(null)}>
            <X size={18} />
          </button>
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.image_url} alt={lightbox.title} className="w-full max-h-[80vh] object-contain" />
            <div className="text-center mt-5">
              <p className="text-white font-body font-semibold">{lightbox.title}</p>
              <p className="text-gold-400 text-[10px] font-body tracking-widest uppercase mt-1">{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
