/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Server, 
  Network, 
  Cpu, 
  Cctv, 
  RefreshCw, 
  Monitor, 
  Headset, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Users, 
  Globe, 
  Layers,
  ChevronRight,
  Menu,
  X,
  Factory,
  Building2,
  GraduationCap,
  Zap,
  Microscope,
  Briefcase
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { ChatWidget } from './components/ChatWidget';
import { 
  COMPANY_INFO, 
  SERVICES, 
  VERTICALS, 
  WHY_CHOOSE_US, 
  ALLIANCES, 
  CLIENT_GROUPS 
} from './constants';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-4xl font-display font-bold mb-4 ${light ? 'text-white' : 'text-brand-900'}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`max-w-2xl mx-auto text-lg ${light ? 'text-brand-200' : 'text-slate-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      className={`h-1 mx-auto mt-6 rounded-full ${light ? 'bg-white' : 'bg-brand-500'}`}
    />
  </div>
);

// Reusable logo component that can use an uploaded logo.png/logo.svg file or fallback to the Cpu icon
const BrandLogo = ({ className = "w-7 h-7 text-white" }: { className?: string }) => {
  const [useFallback, setUseFallback] = useState(false);
  
  return useFallback ? (
    <Cpu className={className} />
  ) : (
    <img 
      src="/logo.png" 
      alt="NDS Logo" 
      className={`${className.replace(/text-\w+-\d+/g, '')} object-contain max-h-full max-w-full`} 
      onError={() => setUseFallback(true)} 
    />
  );
};

const Navbar = ({ onOpenCorporateOverview }: { onOpenCorporateOverview: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Corporate Overview', onClick: onOpenCorporateOverview },
    { name: 'Services', href: '#services' },
    { name: 'Sectors', href: '#sectors' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center group cursor-pointer">
          <div className="flex flex-col" style={{ fontFamily: '"Trebuchet MS", sans-serif' }}>
            <div className="text-xl md:text-2xl font-bold lowercase tracking-normal leading-none flex items-center flex-wrap gap-x-1.5">
              <span className="bg-brand-500 text-white px-2.5 py-1 rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.35)]" style={{ textShadow: '0 1px 2px rgba(4, 120, 87, 0.4)' }}>
                nilgiri
              </span>
              <span className="text-brand-500 font-extrabold">
                data systems pvt. ltd.
              </span>
            </div>
            <span className={`text-[10px] md:text-xs font-bold tracking-wider mt-1 transition-colors duration-300 pl-0.5 ${isScrolled ? 'text-brand-600' : 'text-brand-300'}`}>
              delivering intelligence...
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            link.onClick ? (
              <button 
                key={link.name} 
                onClick={link.onClick}
                className={`text-sm font-medium transition-colors hover:text-brand-500 cursor-pointer ${isScrolled ? 'text-slate-700' : 'text-white'}`}
              >
                {link.name}
              </button>
            ) : (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-500 ${isScrolled ? 'text-slate-700' : 'text-white'}`}
              >
                {link.name}
              </a>
            )
          ))}
          <a 
            href="#contact" 
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${isScrolled ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-white text-brand-900 hover:bg-brand-50'}`}
          >
            Get Expert Consultation
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-brand-900' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-brand-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                link.onClick ? (
                  <button 
                    key={link.name} 
                    onClick={() => { link.onClick!(); setIsMobileMenuOpen(false); }}
                    className="text-lg font-medium text-slate-700 text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-slate-700"
                  >
                    {link.name}
                  </a>
                )
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-600 text-white px-6 py-3 rounded-lg text-center font-semibold"
              >
                Contact Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const getIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('computing')) return <Cpu className="w-6 h-6" />;
  if (t.includes('server')) return <Server className="w-6 h-6" />;
  if (t.includes('network')) return <Network className="w-6 h-6" />;
  if (t.includes('cyber')) return <ShieldCheck className="w-6 h-6" />;
  if (t.includes('surveillance')) return <Cctv className="w-6 h-6" />;
  if (t.includes('digital')) return <RefreshCw className="w-6 h-6" />;
  if (t.includes('managed')) return <Headset className="w-6 h-6" />;
  if (t.includes('visual')) return <Monitor className="w-6 h-6" />;
  return <Layers className="w-6 h-6" />;
};

const getVerticalIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('mining')) return <Factory className="w-6 h-6" />;
  if (n.includes('government')) return <Building2 className="w-6 h-6" />;
  if (n.includes('educational')) return <GraduationCap className="w-6 h-6" />;
  if (n.includes('power')) return <Zap className="w-6 h-6" />;
  if (n.includes('corporate')) return <Briefcase className="w-6 h-6" />;
  if (n.includes('research')) return <Microscope className="w-6 h-6" />;
  return <Globe className="w-6 h-6" />;
};

export default function App() {
  const [selectedSector, setSelectedSector] = useState<null | typeof VERTICALS[0]>(null);
  const [isCorporateOverviewOpen, setIsCorporateOverviewOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenCorporateOverview={() => setIsCorporateOverviewOpen(true)} />
      <AnimatePresence>
        {isCorporateOverviewOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCorporateOverviewOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3.5rem] shadow-2xl overflow-hidden"
            >
              <div className="bg-brand-900 p-10 text-white relative">
                <button 
                  onClick={() => setIsCorporateOverviewOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="relative z-10">
                  <div className="text-brand-400 font-black uppercase tracking-widest text-[10px] mb-2">Company Information</div>
                  <h3 className="text-4xl font-display font-black leading-tight mb-4">Corporate Overview</h3>
                  <div className="flex gap-4">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">ISO Certified</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">GeM Registered</span>
                  </div>
                </div>
              </div>
              
              <div className="p-1 gap-1 bg-slate-50 grid md:grid-cols-2 max-h-[60vh] overflow-y-auto">
                {[
                  { label: 'Company Name', value: 'Nilgiri Data Systems Pvt. Ltd. (NDSPL)' },
                  { label: 'Industry', value: 'Information Technology & System Integration' },
                  { label: 'Business Type', value: 'IT Solutions & Services Provider' },
                  { label: 'Headquarters', value: 'Kolkata, West Bengal' },
                  { label: 'Operational Presence', value: 'PAN India' },
                  { label: 'Core Expertise', value: 'IT Infrastructure, Networking, Cybersecurity, Managed Services, Digital Solutions' },
                  { label: 'Client Segments', value: 'Government, PSU, Education, Mining, Energy, Enterprise' },
                  { label: 'Registrations', value: 'MSME, NSIC, GeM Registered Enterprise' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group hover:bg-brand-50 transition-colors">
                     <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                     <span className="text-sm font-bold text-slate-700 text-right">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setIsCorporateOverviewOpen(false)}
                  className="px-8 py-3 bg-brand-900 text-white rounded-full font-bold shadow-lg shadow-brand-900/20 hover:scale-105 transition-transform"
                >
                  Close Overview
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {selectedSector && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSector(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="bg-brand-900 p-10 text-white relative">
                 <div className="absolute top-0 right-0 p-12 -mr-16 -mt-16 opacity-10 rotate-12">
                   {getVerticalIcon(selectedSector.name)}
                 </div>
                 <button 
                  onClick={() => setSelectedSector(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                 >
                   <X className="w-6 h-6" />
                 </button>
                 <div className="relative z-10">
                   <div className="text-brand-400 font-black uppercase tracking-widest text-[10px] mb-2">Sector Insights</div>
                   <h3 className="text-4xl font-display font-black leading-tight mb-4">{selectedSector.name}</h3>
                   <p className="text-brand-100 text-lg leading-relaxed">{selectedSector.description}</p>
                 </div>
              </div>
              <div className="p-10">
                <div className="mb-8">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Detailed Overview</h4>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">
                    {selectedSector.longDescription}
                  </p>
                </div>
                <div>
                   <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Core Focus Areas</h4>
                   <div className="grid sm:grid-cols-2 gap-4">
                      {selectedSector.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-brand-300 transition-all">
                           <div className="w-2 h-2 rounded-full bg-brand-500" />
                           <span className="text-sm font-bold text-slate-700">{feature}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
                 <button 
                  onClick={() => setSelectedSector(null)}
                  className="px-8 py-3 bg-brand-900 text-white rounded-full font-bold shadow-lg shadow-brand-900/20 hover:scale-105 transition-transform"
                 >
                   Close Insights
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-950">
        {/* Modern Background with high-tech image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2074&auto=format&fit=crop" 
            alt="Data Center" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-b from-brand-950/40 via-brand-950/80 to-brand-950" />
        </div>

        {/* Animated Orbs */}
        <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.4, 1],
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-brand-500/20 blur-[140px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, -80, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-brand-400/10 blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-3/5 text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-brand-300 text-sm font-bold tracking-wider uppercase"
              >
                <div className="w-2 h-2 rounded-full bg-brand-400 mr-3 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Next-Gen IT Infrastructure
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[0.95] mb-8"
              >
                <span className="text-gradient">Intelligent</span><br />
                Technology Solutions
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-wrap gap-5"
              >
                <a href="#services" className="group px-10 py-5 bg-brand-500 hover:bg-brand-400 text-brand-950 rounded-full font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.3)]">
                  Our Capabilities
                </a>
                <a href="#contact" className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-lg border border-white/20 backdrop-blur-md transition-all transform hover:scale-105">
                  Let's Connect
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, type: 'spring' }}
              className="lg:w-2/5 w-full max-w-md lg:max-w-none"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-brand-500 to-brand-400 rounded-5xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass-dark rounded-5xl p-10 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 -mr-16 -mt-16 opacity-5 rotate-12">
                    <Cpu className="w-64 h-64 text-white" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 relative z-10">
                    {[
                      { icon: <ShieldCheck className="w-8 h-8 text-brand-400" />, label: 'Military-Grade Security' },
                      { icon: <Zap className="w-8 h-8 text-yellow-400" />, label: 'Ultra-Fast Deployment' },
                      { icon: <Globe className="w-8 h-8 text-brand-300" />, label: 'PAN India Network' },
                      { icon: <Users className="w-8 h-8 text-brand-200" />, label: 'Expert Technical Support' }
                    ].map((feat, idx) => (
                      <div key={idx} className="p-6 bg-white/5 rounded-3xl border border-white/5 group-hover:bg-white/10 transition-colors flex flex-col items-start gap-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">{feat.icon}</div>
                        <span className="text-white/90 text-sm font-bold leading-tight uppercase tracking-tight">{feat.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-10 border-t border-white/10 relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                       <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/30">
                         Live Network Status: Operational
                       </span>
                    </div>
                    <div className="text-3xl font-display font-black text-white group-hover:text-brand-300 transition-colors">
                      Transform Your Ops.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-brand-600 font-black tracking-widest uppercase mb-4 text-sm">About The Company</div>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-8 leading-tight">Transforming Businesses Through <span className="text-brand-600">Intelligent</span> Technology</h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-6">
                <strong>Nilgiri Data Systems Pvt. Ltd. (NDSPL)</strong> is a professionally managed Information Technology solutions and services organization delivering enterprise-grade technology infrastructure, digital transformation solutions, cybersecurity services, and managed IT operations across India.
              </p>
              <p className="text-lg text-slate-500 mb-6 leading-relaxed">
                Headquartered in Kolkata with a strong operational presence in Eastern India, NDSPL has established itself as a trusted technology partner for Government Organizations, Public Sector Undertakings (PSUs), Educational Institutions, Mining Companies, Energy & Power Sector Enterprises, Research Organizations, and Corporate Businesses.
              </p>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                With years of industry experience and a customer-centric approach, NDSPL delivers scalable, secure, innovative, and future-ready technology solutions designed to improve operational efficiency, business continuity, productivity, and digital growth.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-brand-300 transition-all">
                  <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="text-slate-900 font-bold text-xl mb-3">Our Mission</div>
                  <p className="text-slate-500 leading-relaxed text-sm">To provide innovative, scalable, and secure technology solutions that empower organizations to excel in a digital-first world.</p>
                </div>
                <div className="p-8 bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-brand-300 transition-all">
                  <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-slate-900 font-bold text-xl mb-3">Commitment</div>
                  <p className="text-slate-500 leading-relaxed text-sm">Strategic consulting and certified expertise helping organizations modernize their IT ecosystem for sustainable outcomes.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand-500/10 rounded-5xl -rotate-2 -translate-y-4" />
              <div className="absolute inset-0 bg-slate-900/5 rounded-5xl rotate-2 translate-y-4" />
              <div className="relative bg-brand-900 rounded-5xl p-12 text-white shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop" 
                  alt="Values Background" 
                  className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
                />
                <h3 className="text-3xl font-display font-bold mb-12 flex items-center relative z-10">
                   Our Core Values
                </h3>
                <div className="space-y-10 relative z-10">
                  {[
                    { title: 'Integrity', desc: 'Transparency and ethical business practices.' },
                    { title: 'Innovation', desc: 'Smarter and more efficient digital solutions.' },
                    { title: 'Customer Commitment', desc: 'Decisions centered around client success.' },
                    { title: 'Excellence', desc: 'Execution focused on measurable business value.' }
                  ].map((val) => (
                    <div key={val.title} className="flex group">
                      <div className="mr-6">
                        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brand-300 group-hover:bg-brand-500 group-hover:text-white transition-all transform group-hover:rotate-12">
                           <CheckCircle2 className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1 opacity-100">{val.title}</h4>
                        <p className="text-brand-200 text-sm leading-relaxed">{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Comprehensive enterprise technologies for mission-critical industrial environments.">
            Core Business Capabilities
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 hover:border-brand-200 transition-all duration-500 cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-10 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-lg">
                  {getIcon(service.title)}
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 leading-tight h-16 flex items-end">{service.title}</h3>
                <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">{service.description}</p>
                <div className="space-y-3">
                  {service.items.slice(0, 5).map((item, i) => (
                    <div key={i} className="flex items-center text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider group-hover:text-brand-700 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mr-3 group-hover:bg-brand-400 transition-colors" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Background Image */}
      <section className="relative py-40 bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1510511459019-5dee99c48fc8?q=80&w=2070&auto=format&fit=crop" 
             alt="Servers" 
             className="w-full h-full object-cover opacity-10"
           />
           <div className="absolute inset-0 bg-linear-to-r from-brand-950 via-brand-950/90 to-brand-950/40" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
               <div className="text-brand-400 font-black tracking-widest uppercase mb-4 text-sm italic">Edge Differentiation</div>
               <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-12 leading-[1.05]">Why Market Leaders Choose Us.</h2>
               
               <div className="space-y-12">
                 {WHY_CHOOSE_US.map((reason, idx) => (
                   <motion.div 
                     key={reason.title}
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="flex items-start space-x-8 group"
                   >
                     <div className="w-20 h-20 flex-shrink-0 rounded-3xl glass-dark flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all transform group-hover:scale-110 group-hover:rotate-6">
                        {idx === 0 && <Layers className="w-8 h-8" />}
                        {idx === 1 && <Globe className="w-8 h-8" />}
                        {idx === 2 && <Users className="w-8 h-8" />}
                        {idx === 3 && <MapPin className="w-8 h-8" />}
                        {idx === 4 && <Zap className="w-8 h-8" />}
                     </div>
                     <div>
                       <h4 className="text-2xl font-bold mb-2 group-hover:text-brand-300 transition-colors uppercase tracking-tight">{reason.title}</h4>
                       <p className="text-slate-400 text-lg lg:max-w-md leading-relaxed">{reason.description}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="glass rounded-[3.5rem] p-16 shadow-2xl relative overflow-hidden backdrop-blur-3xl border-white/10 group">
                <div className="absolute top-0 right-0 p-24 -mr-32 -mt-32 opacity-10">
                  <ShieldCheck className="w-96 h-96 text-white" />
                </div>
                
                <h3 className="text-4xl font-display font-black mb-16 relative z-10 flex items-center text-gradient">
                   Excellence & Compliance
                </h3>
                
                <div className="grid gap-x-12 gap-y-10 relative z-10">
                  {[
                    'Enterprise-Grade IT Infrastructure',
                    'Strategic PSU & Government Experience',
                    'Proven High Client Retention',
                    'Certified Technical Engineering Force',
                    'PAN India 24/7 Operations',
                    'ISO 9001:2015 Quality Commitment'
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-6 border-b border-white/5 pb-4 group/item">
                      <div className="w-3 h-3 rounded-full bg-brand-500 group-hover/item:scale-150 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      <span className="text-xl font-medium text-slate-100 opacity-90">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-20 flex flex-wrap gap-8 justify-around items-center opacity-80 filter grayscale hover:grayscale-0 transition-all">
                   <div className="text-center">
                     <div className="text-4xl font-display font-black">9001:2015</div>
                     <div className="text-[10px] uppercase font-bold tracking-[0.2em] mt-2 text-brand-300">ISO Standard</div>
                   </div>
                   <div className="w-px h-12 bg-white/10" />
                   <div className="text-center">
                     <div className="text-4xl font-display font-black">MSME</div>
                     <div className="text-[10px] uppercase font-bold tracking-[0.2em] mt-2 text-brand-300">Registered Reg.</div>
                   </div>
                   <div className="w-px h-12 bg-white/10" />
                   <div className="text-center">
                     <div className="text-4xl font-display font-black">GeM</div>
                     <div className="text-[10px] uppercase font-bold tracking-[0.2em] mt-2 text-brand-300">Gov. Marketplace</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section id="sectors" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Tailored technology deployments for specialized industry verticals and unique industrial challenges.">
             Target Verticals & Sectors
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {VERTICALS.map((vertical) => (
              <motion.div 
                key={vertical.name}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedSector(vertical)}
                className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col items-start gap-8 transition-all hover:shadow-2xl hover:shadow-slate-200 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-3xl bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all">
                  {getVerticalIcon(vertical.name)}
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-slate-900 mb-4">{vertical.name}</h4>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium">{vertical.description}</p>
                </div>
                <div className="mt-auto w-full pt-6 border-t border-slate-200 flex items-center text-brand-600 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
                  Sector Insights <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Alliances */}
      <div className="py-32 bg-slate-900 overflow-hidden relative">
         <div className="absolute inset-0 opacity-10 flex border-y border-white/5 pointer-events-none">
            <div className="w-1/2 border-r border-white/5" />
         </div>
         <div className="container mx-auto px-6 mb-24 relative z-10">
           <SectionHeading light subtitle="Collaborating with global OEMs to deliver superior industrial computing performance.">
             Global Strategic Alliances
           </SectionHeading>
         </div>

          <div className="relative group cursor-pointer">
            <div className="flex animate-marquee whitespace-nowrap gap-16 py-8 items-center">
               {ALLIANCES.flatMap(cat => cat.brands).map((brand, idx) => {
                 const domainMap: Record<string, string> = {
                   "HP": "hp.com", "Dell": "dell.com", "Lenovo": "lenovo.com", "Acer": "acer.com",
                   "Apple": "apple.com", "Samsung": "samsung.com", "LG": "lg.com", "HCL": "hcltech.com",
                   "EMC2": "dell.com", "Oracle": "oracle.com", "Microsoft": "microsoft.com", "Fujitsu": "fujitsu.com",
                   "Schneider Electric": "se.com", "Emerson": "emerson.com", "Numeric": "numericups.com",
                   "Cisco": "cisco.com", "Juniper": "juniper.net", "D-Link": "dlink.com", "Motorola": "motorola.com",
                   "Cyberoam": "sophos.com", "Extreme Networks": "extremenetworks.com", "Avaya": "avaya.com",
                   "Siemens": "siemens.com", "Alcatel-Lucent": "alcatel-lucent.com", "Bosch": "bosch.com",
                   "Sony": "sony.com", "Dahua": "dahuasecurity.com", "Hikvision": "hikvision.com",
                   "Canon": "canon.com", "Toshiba": "toshiba.com", "Lexmark": "lexmark.com", "Adobe": "adobe.com",
                   "Symantec": "broadcom.com", "McAfee": "mcafee.com", "Quick Heal": "quickheal.com", "eScan": "escanav.com"
                 };
                 const domain = domainMap[brand] || `${brand.toLowerCase().replace(/\s+/g, '')}.com`;
                 return (
                   <div key={idx} className="flex flex-col items-center gap-3 group/logo translate-y-0 hover:-translate-y-2 transition-transform duration-500">
                     <div className="w-28 h-12 flex items-center justify-center p-2 bg-white rounded-xl border border-white hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all duration-500">
                        <img 
                          src={`https://logo.clearbit.com/${domain}`} 
                          alt={brand}
                          className="max-w-full max-h-full transition-all duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/${brand.toLowerCase().replace(/\s+/g, '-')}`;
                          }}
                        />
                     </div>
                   </div>
                 );
               })}
               {/* 2nd set for loop */}
               {ALLIANCES.flatMap(cat => cat.brands).map((brand, idx) => {
                 const domainMap: Record<string, string> = {
                   "HP": "hp.com", "Dell": "dell.com", "Lenovo": "lenovo.com", "Acer": "acer.com",
                   "Apple": "apple.com", "Samsung": "samsung.com", "LG": "lg.com", "HCL": "hcltech.com",
                   "EMC2": "dell.com", "Oracle": "oracle.com", "Microsoft": "microsoft.com", "Fujitsu": "fujitsu.com",
                   "Schneider Electric": "se.com", "Emerson": "emerson.com", "Numeric": "numericups.com",
                   "Cisco": "cisco.com", "Juniper": "juniper.net", "D-Link": "dlink.com", "Motorola": "motorola.com",
                   "Cyberoam": "sophos.com", "Extreme Networks": "extremenetworks.com", "Avaya": "avaya.com",
                   "Siemens": "siemens.com", "Alcatel-Lucent": "alcatel-lucent.com", "Bosch": "bosch.com",
                   "Sony": "sony.com", "Dahua": "dahuasecurity.com", "Hikvision": "hikvision.com",
                   "Canon": "canon.com", "Toshiba": "toshiba.com", "Lexmark": "lexmark.com", "Adobe": "adobe.com",
                   "Symantec": "broadcom.com", "McAfee": "mcafee.com", "Quick Heal": "quickheal.com", "eScan": "escanav.com"
                 };
                 const domain = domainMap[brand] || `${brand.toLowerCase().replace(/\s+/g, '')}.com`;
                 return (
                   <div key={`dup-${idx}`} className="flex flex-col items-center gap-3">
                     <div className="w-28 h-12 flex items-center justify-center p-2 bg-white rounded-xl border border-white">
                        <img 
                          src={`https://logo.clearbit.com/${domain}`} 
                          alt={brand}
                          className="max-w-full max-h-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/${brand.toLowerCase().replace(/\s+/g, '-')}`;
                          }}
                        />
                     </div>
                   </div>
                 );
               })}
            </div>
         </div>

         <div className="container mx-auto px-6 mt-32 relative z-10">
            <div className="max-w-6xl mx-auto glass rounded-[4rem] p-12 md:p-20 shadow-2xl relative border border-white/10">
              <div className="mb-16">
                 <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-6 uppercase tracking-tighter">Prestigious Clientele</h3>
                 <p className="text-brand-300 text-lg max-w-2xl font-medium">Trusted by India's most critical public sector enterprises, government organizations, and elite research institutions.</p>
              </div>

              <div className="space-y-16">
                {CLIENT_GROUPS.map((group, gIdx) => (
                  <div key={gIdx}>
                    <h4 className="text-xs font-black text-brand-500 uppercase tracking-[0.4em] mb-10 pl-4 border-l-2 border-brand-500">{group.category}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {group.clients.map((client) => {
                        const clientDomains: Record<string, string> = {
                          "Coal India Limited (CIL)": "coalindia.in",
                          "Bharat Coking Coal Limited (BCCL)": "bcclweb.in",
                          "Eastern Coalfields Limited (ECL)": "easterncoal.gov.in",
                          "Central Coalfields Limited (CCL)": "centralcoalfields.in",
                          "Northern Coalfields Limited (NCL)": "nclcil.in",
                          "CMPF": "cmpfo.gov.in",
                          "BRBNMPL": "brbnmpl.co.in",
                          "NTPC": "ntpc.co.in",
                          "NHPC": "nhpcindia.com",
                          "Webel": "webel.in",
                          "IICM": "iicm.ac.in",
                          "IITs": "iitkgp.ac.in",
                          "CSIR": "csir.res.in",
                          "Universities & Technical Institutions": "ugc.gov.in"
                        };
                        const domain = clientDomains[client];
                        
                        return (
                          <div key={client} className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white transition-all group/client duration-500 hover:shadow-2xl">
                            <div className="w-16 h-16 flex items-center justify-center p-2 rounded-2xl bg-white/10 group-hover/client:bg-white transition-colors overflow-hidden">
                              {domain ? (
                                <img 
                                  src={`https://logo.clearbit.com/${domain}`} 
                                  alt={client}
                                  className="max-w-full max-h-full transition-all duration-500 grayscale opacity-60 group-hover/client:grayscale-0 group-hover/client:opacity-100 scale-90 group-hover/client:scale-100"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/googlecloud/ffffff`; // Minimal fallback
                                    const parent = (e.target as HTMLElement).parentElement;
                                    if (parent) {
                                       const label = document.createElement('div');
                                       label.className = "text-brand-500 font-black text-xl";
                                       label.innerText = client.substring(0, 1);
                                       parent.innerHTML = '';
                                       parent.appendChild(label);
                                    }
                                  }}
                                />
                              ) : (
                                <div className="text-brand-500 font-black text-xl">{client.substring(0, 1)}</div>
                              )}
                            </div>
                            <span className="text-[10px] font-black text-brand-200 uppercase tracking-widest text-center group-hover/client:text-slate-900 leading-tight transition-colors">
                              {client}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
         </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[5rem] overflow-hidden flex flex-col xl:flex-row shadow-2xl p-4 sm:p-8 xl:p-0">
            <div className="xl:w-2/5 p-16 md:p-24 text-white relative">
               <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-5" />
               <h2 className="text-5xl font-display font-bold mb-16 relative">Start Your Modernization.</h2>
               <div className="space-y-12 relative">
                  <div className="flex items-center space-x-8 group cursor-pointer">
                    <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-brand-400 mb-1 leading-none">Emergency Tech Support</div>
                      <div className="text-2xl font-bold">{COMPANY_INFO.contact.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8 group cursor-pointer">
                    <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <Mail className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-brand-400 mb-1 leading-none">Service Inquiries</div>
                      <div className="text-2xl font-bold break-all opacity-90">{COMPANY_INFO.contact.email}</div>
                      {COMPANY_INFO.contact.email2 && (
                        <div className="text-xl font-bold break-all opacity-90 mt-1 text-brand-300 group-hover:text-white transition-colors">{COMPANY_INFO.contact.email2}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-8 group">
                    <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all flex-shrink-0">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-brand-400 mb-1 leading-none">Corporate HQ India</div>
                      <p className="text-lg opacity-80 font-medium leading-relaxed">{COMPANY_INFO.contact.headOffice.address}</p>
                    </div>
                  </div>
               </div>
               
               <div className="mt-20 pt-12 border-t border-white/5">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-brand-300 mb-2">Regional Hub</div>
                  <p className="text-slate-400 text-sm font-bold uppercase">{COMPANY_INFO.contact.branchOffice.address}</p>
               </div>
            </div>

            <div className="xl:w-3/5 bg-white xl:rounded-[5rem] p-16 md:p-24 shadow-inner">
               <div className="max-w-2xl mx-auto">
                 <h3 className="text-4xl font-display font-black text-slate-900 mb-4 tracking-tighter">Request Expert Consultation.</h3>
                 <p className="text-slate-500 mb-12 text-lg font-medium leading-relaxed">Our certified solution architects will respond within 4 business hours to discuss your infrastructure requirements.</p>

                 <form className="space-y-8">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Business Name</label>
                        <input type="text" className="w-full px-10 py-6 rounded-4xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:bg-white focus:border-brand-500 transition-all font-bold text-slate-900 shadow-sm" placeholder="Enterprise Systems Ltd." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Your Professional Email</label>
                        <input type="email" className="w-full px-10 py-6 rounded-4xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:bg-white focus:border-brand-500 transition-all font-bold text-slate-900 shadow-sm" placeholder="arch@domain.com" />
                      </div>
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Solution Interested In</label>
                     <div className="relative">
                       <select className="w-full px-10 py-6 rounded-4xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:bg-white focus:border-brand-500 transition-all font-black text-slate-900 shadow-sm appearance-none cursor-pointer uppercase tracking-widest text-xs">
                          {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                          <option>Other Specialized Services</option>
                       </select>
                       <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                         <ChevronRight className="w-6 h-6 rotate-90" />
                       </div>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Project Brief</label>
                     <textarea rows={5} className="w-full px-10 py-8 rounded-4xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:bg-white focus:border-brand-500 transition-all font-bold text-slate-900 resize-none shadow-sm" placeholder="Describe your data center, networking, or security goals..."></textarea>
                   </div>

                   <button type="submit" className="w-full py-8 bg-brand-600 hover:bg-brand-500 text-white rounded-4xl font-black text-xl shadow-[0_20px_50px_rgba(16,185,129,0.35)] transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.2em] flex items-center justify-center">
                     Dispatched Inquiry <ChevronRight className="w-7 h-7 ml-4" />
                   </button>
                 </form>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Certifications & Registrations</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { name: 'ISO 9001:2015', label: 'Quality Management', icon: <ShieldCheck className="w-8 h-8" /> },
                { name: 'MSME', label: 'Registered Enterprise', icon: <Building2 className="w-8 h-8" /> },
                { name: 'NSIC', label: 'Government Registered', icon: <CheckCircle2 className="w-8 h-8" /> },
                { name: 'GeM', label: 'e-Marketplace Seller', icon: <Globe className="w-8 h-8" /> },
              ].map((cert, idx) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center group cursor-default"
                >
                  <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-brand-600 mb-4 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 border border-slate-100">
                    {cert.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-display font-black text-slate-900 group-hover:text-brand-600 transition-colors">{cert.name}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cert.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-slate-950 border-t border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="text-center md:text-left">
              <div className="flex flex-col items-center md:items-start group cursor-default">
                <div className="flex flex-col animate-fadeIn" style={{ fontFamily: '"Trebuchet MS", sans-serif' }}>
                  <div className="text-2xl md:text-3xl font-bold lowercase tracking-normal leading-none flex items-center flex-wrap gap-x-2 justify-center md:justify-start">
                    <span className="bg-brand-500 text-white px-3 py-1 rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.35)]" style={{ textShadow: '0 1px 2px rgba(4, 120, 87, 0.4)' }}>
                      nilgiri
                    </span>
                    <span className="text-brand-500 font-extrabold">
                      data systems pvt. ltd.
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-bold tracking-wider mt-1.5 text-brand-400 pl-0.5 text-center md:text-left">
                    delivering intelligence...
                  </span>
                </div>
              </div>
              <p className="text-slate-500 text-[10px] mt-8 font-black uppercase tracking-[0.4em]">© {new Date().getFullYear()} {COMPANY_INFO.name}</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-16 border-x border-white/10 px-16">
              <div className="text-center">
                 <div className="text-4xl font-display font-black text-white">2026</div>
                 <div className="text-[10px] uppercase tracking-[0.3em] text-brand-400 font-bold mt-2">Baseline</div>
              </div>
              <div className="text-center">
                 <div className="text-4xl font-display font-black text-white uppercase">PAN</div>
                 <div className="text-[10px] uppercase tracking-[0.3em] text-brand-400 font-bold mt-2">India Operations</div>
              </div>
            </div>

            <div className="text-xs text-slate-500 max-w-xs leading-relaxed text-center md:text-right font-medium italic">
              "Transforming businesses through intelligent technology. A professionally managed IT solutions and services organization dedicated to global tech standards."
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </div>
  );
}
