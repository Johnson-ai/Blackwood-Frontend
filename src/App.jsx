import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import PracticeAreasPage from './pages/PracticeAreasPage';
import GalleryPage from './pages/GalleryPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import FAQPage from './pages/FAQPage';

// Practice area sub-pages
import CorporateLawPage from './pages/practice-areas/CorporateLawPage';
import CriminalDefensePage from './pages/practice-areas/CriminalDefensePage';
import FamilyLawPage from './pages/practice-areas/FamilyLawPage';
import RealEstateLawPage from './pages/practice-areas/RealEstateLawPage';
import ImmigrationLawPage from './pages/practice-areas/ImmigrationLawPage';
import IntellectualPropertyPage from './pages/practice-areas/IntellectualPropertyPage';
import ConstitutionalLawPage from './pages/practice-areas/ConstitutionalLawPage';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHero from './pages/admin/AdminHero';
import AdminAbout from './pages/admin/AdminAbout';
import AdminCEO from './pages/admin/AdminCEO';
import AdminTeam from './pages/admin/AdminTeam';
import AdminPracticeAreas from './pages/admin/AdminPracticeAreas';
import AdminCertifications from './pages/admin/AdminCertifications';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminGallery from './pages/admin/AdminGallery';
import AdminBookings from './pages/admin/AdminBookings';
import AdminContacts from './pages/admin/AdminContacts';
import AdminFAQs from './pages/admin/AdminFAQs';
import AdminBlog from './pages/admin/AdminBlog';
import AdminContactInfo from './pages/admin/AdminContactInfo';
import AdminSiteSettings from './pages/admin/AdminSiteSettings';
import AdminActivityLog from './pages/admin/AdminActivityLog';
import AdminUsers from './pages/admin/AdminUsers';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="h-screen bg-ink flex items-center justify-center text-gold-500 font-body text-sm tracking-widest">Loading…</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3500} theme="dark"
          toastStyle={{ background: '#111', border: '1px solid #2a2a2a', color: '#fff', fontFamily: 'Jost, sans-serif', fontSize: '13px' }} />
        <Routes>
          {/* ── Public ── */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book-consultation" element={<BookingPage />} />

          {/* ── Practice Areas ── */}
          <Route path="/practice-areas" element={<PracticeAreasPage />} />
          <Route path="/practice-areas/corporate-law" element={<CorporateLawPage />} />
          <Route path="/practice-areas/criminal-defense" element={<CriminalDefensePage />} />
          <Route path="/practice-areas/family-law" element={<FamilyLawPage />} />
          <Route path="/practice-areas/real-estate-law" element={<RealEstateLawPage />} />
          <Route path="/practice-areas/immigration-law" element={<ImmigrationLawPage />} />
          <Route path="/practice-areas/intellectual-property" element={<IntellectualPropertyPage />} />
          <Route path="/practice-areas/constitutional-law" element={<ConstitutionalLawPage />} />

          {/* ── Admin ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="hero" element={<AdminHero />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="ceo" element={<AdminCEO />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="practice-areas" element={<AdminPracticeAreas />} />
            <Route path="certifications" element={<AdminCertifications />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="faqs" element={<AdminFAQs />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="contact-info" element={<AdminContactInfo />} />
            <Route path="settings" element={<AdminSiteSettings />} />
            <Route path="activity-log" element={<AdminActivityLog />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
