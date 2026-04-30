import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const publicAPI = {
  getHero: () => api.get('/api/public/hero'),
  getAbout: () => api.get('/api/public/about'),
  getCEO: () => api.get('/api/public/ceo'),
  getTeam: () => api.get('/api/public/team'),
  getPracticeAreas: () => api.get('/api/public/practice-areas'),
  getCertifications: () => api.get('/api/public/certifications'),
  getTestimonials: () => api.get('/api/public/testimonials'),
  getGallery: () => api.get('/api/public/gallery'),
  getFAQs: () => api.get('/api/public/faqs'),
  getContactInfo: () => api.get('/api/public/contact-info'),
  getSiteSettings: () => api.get('/api/public/site-settings'),
  getBlog: () => api.get('/api/public/blog'),
  submitContact: (data) => api.post('/api/public/contact', data),
  submitBooking: (data) => api.post('/api/public/booking', data),
};

export const adminAPI = {
  login: (data) => api.post('/api/admin/login', data),
  logout: () => api.post('/api/admin/logout'),
  changePassword: (data) => api.post('/api/admin/change-password', data),
  getDashboard: () => api.get('/api/admin/dashboard'),
  getActivityLog: (params) => api.get('/api/admin/activity-log', { params }),
  getSessions: () => api.get('/api/admin/sessions'),
  getSiteSettings: () => api.get('/api/admin/site-settings'),
  updateSiteSettings: (data) => api.put('/api/admin/site-settings', data),
  updateHero: (data) => api.put('/api/admin/hero', data),
  updateAbout: (data) => api.put('/api/admin/about', data),
  updateCEO: (data) => api.put('/api/admin/ceo', data),
  getTeam: () => api.get('/api/admin/team'),
  createTeamMember: (data) => api.post('/api/admin/team', data),
  updateTeamMember: (id, data) => api.put(`/api/admin/team/${id}`, data),
  deleteTeamMember: (id) => api.delete(`/api/admin/team/${id}`),
  getPracticeAreas: () => api.get('/api/admin/practice-areas'),
  createPracticeArea: (data) => api.post('/api/admin/practice-areas', data),
  updatePracticeArea: (id, data) => api.put(`/api/admin/practice-areas/${id}`, data),
  deletePracticeArea: (id) => api.delete(`/api/admin/practice-areas/${id}`),
  getCertifications: () => api.get('/api/admin/certifications'),
  createCertification: (data) => api.post('/api/admin/certifications', data),
  updateCertification: (id, data) => api.put(`/api/admin/certifications/${id}`, data),
  deleteCertification: (id) => api.delete(`/api/admin/certifications/${id}`),
  getTestimonials: () => api.get('/api/admin/testimonials'),
  createTestimonial: (data) => api.post('/api/admin/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/api/admin/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/api/admin/testimonials/${id}`),
  getGallery: () => api.get('/api/admin/gallery'),
  createGalleryItem: (data) => api.post('/api/admin/gallery', data),
  updateGalleryItem: (id, data) => api.put(`/api/admin/gallery/${id}`, data),
  deleteGalleryItem: (id) => api.delete(`/api/admin/gallery/${id}`),
  getBookings: (params) => api.get('/api/admin/bookings', { params }),
  updateBooking: (id, data) => api.put(`/api/admin/bookings/${id}`, data),
  deleteBooking: (id) => api.delete(`/api/admin/bookings/${id}`),
  clearBookings: (data) => api.delete('/api/admin/bookings/bulk/clear', { data }),
  getContacts: (params) => api.get('/api/admin/contacts', { params }),
  updateContact: (id, data) => api.put(`/api/admin/contacts/${id}`, data),
  deleteContact: (id) => api.delete(`/api/admin/contacts/${id}`),
  clearContacts: () => api.delete('/api/admin/contacts/bulk/clear'),
  getFAQs: () => api.get('/api/admin/faqs'),
  createFAQ: (data) => api.post('/api/admin/faqs', data),
  updateFAQ: (id, data) => api.put(`/api/admin/faqs/${id}`, data),
  deleteFAQ: (id) => api.delete(`/api/admin/faqs/${id}`),
  updateContactInfo: (data) => api.put('/api/admin/contact-info', data),
  getBlog: () => api.get('/api/admin/blog'),
  createBlogPost: (data) => api.post('/api/admin/blog', data),
  updateBlogPost: (id, data) => api.put(`/api/admin/blog/${id}`, data),
  deleteBlogPost: (id) => api.delete(`/api/admin/blog/${id}`),
  uploadFile: (formData) => api.post('/api/admin/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getUsers: () => api.get('/api/admin/users'),
  createUser: (data) => api.post('/api/admin/users', data),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
};
