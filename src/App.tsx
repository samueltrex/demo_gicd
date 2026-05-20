import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  HeartPulse, 
  Briefcase, 
  Leaf, 
  Users, 
  Sprout, 
  Menu, 
  X, 
  ArrowRight, 
  Quote, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  Clock, 
  Compass, 
  Info, 
  AlertCircle,
  Eye
} from "lucide-react";

// Local imports
import { 
  PROGRAMS_DATA, 
  STATS_DATA, 
  TEAM_DATA, 
  GALLERY_DATA, 
  TESTIMONIALS_DATA, 
  PARTNERS_DATA,
  GalleryItem,
  ProgramItem
} from "./types";
import { StatCounter } from "./components/StatCounter";
import { DonateModal, VolunteerModal, PartnerModal } from "./components/GicdModals";
import { GalleryLightbox } from "./components/GalleryLightbox";

export default function App() {
  // Modal visibility states
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  
  // Gallery Lightbox states
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>("All");

  // Selected program for quick focus modal
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  // Scroll and Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Full About narrative state
  const [showFullStory, setShowFullStory] = useState(false);

  // Jos Local Time Clock (West Africa Time, UTC+1)
  const [josTime, setJosTime] = useState("");

  // Contact Form states
  const [contactData, setContactData] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactTicket, setContactTicket] = useState("");

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Africa/Lagos",
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
        hour12: true
      };
      setJosTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Active Nav highlight on scroll
  useEffect(() => {
    const sections = ["home", "about", "programs", "impact", "team", "gallery", "partners", "testimonials", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px", // Trigger when section fills mid-screen area
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Trigger modal helper
  const openDonate = () => {
    setIsDonateOpen(true);
    setIsMobileMenuOpen(false);
  };

  const openVolunteer = () => {
    setIsVolunteerOpen(true);
    setIsMobileMenuOpen(false);
  };

  const openPartner = () => {
    setIsPartnerOpen(true);
    setIsMobileMenuOpen(false);
  };

  // Lightbox index navigation helper
  const handleNextGallery = () => {
    if (!selectedGalleryItem) return;
    const filtered = galleryFilter === "All" 
      ? GALLERY_DATA 
      : GALLERY_DATA.filter(item => item.category === galleryFilter);
    const currentIndex = filtered.findIndex((i) => i.id === selectedGalleryItem.id);
    const nextIndex = (currentIndex + 1) % filtered.length;
    setSelectedGalleryItem(filtered[nextIndex]);
  };

  const handlePrevGallery = () => {
    if (!selectedGalleryItem) return;
    const filtered = galleryFilter === "All" 
      ? GALLERY_DATA 
      : GALLERY_DATA.filter(item => item.category === galleryFilter);
    const currentIndex = filtered.findIndex((i) => i.id === selectedGalleryItem.id);
    const prevIndex = (currentIndex - 1 + filtered.length) % filtered.length;
    setSelectedGalleryItem(filtered[prevIndex]);
  };

  // Icon dynamic rendering mapper for Programs grid
  const renderProgramIcon = (name: string) => {
    const cls = "w-10 h-10 text-brand-yellow stroke-[1.8] group-hover:scale-110 transition duration-300";
    switch (name) {
      case "GraduationCap": return <GraduationCap className={cls} />;
      case "HeartPulse": return <HeartPulse className={cls} />;
      case "Briefcase": return <Briefcase className={cls} />;
      case "Leaf": return <Leaf className={cls} />;
      case "Users": return <Users className={cls} />;
      case "Sprout": return <Sprout className={cls} />;
      default: return <Compass className={cls} />;
    }
  };

  // Action for Contact submit Simulation
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email) return;
    setContactStatus("sending");
    
    setTimeout(() => {
      setContactTicket(`GICD-MSG-${Math.floor(1000 + Math.random() * 9000)}`);
      setContactStatus("success");
    }, 1200);
  };

  // Gallery Categories extraction for tabs
  const categories = ["All", "Education", "Health Outreach", "Economic Empowerment", "Environment", "Youth Development"];

  // Filter gallery items
  const filteredGallery = galleryFilter === "All" 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === galleryFilter);

  return (
    <div className="min-h-screen bg-white selection:bg-brand-yellow selection:text-brand-black flex flex-col font-sans" id="gicd-app-root">
      
      {/* SECTION 1 — NAVIGATION & FLOATING BAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#111111]/95 backdrop-blur-md py-3 shadow-lg border-b border-brand-yellow/10" 
            : "bg-[#111111] py-4"
        }`}
        id="navigation-header"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          
          {/* Top Logo */}
          <a href="#home" className="flex flex-col group justify-center" aria-label="GICD Home">
            <span className="text-[#F5C518] font-bold text-2xl leading-none tracking-tighter transition-transform duration-300 group-hover:scale-[1.03]">GICD</span>
            <span className="text-[8px] uppercase tracking-widest text-white/70 font-bold mt-0.5">Guardian Initiative for Community Development</span>
          </a>

          {/* Nav links Desktop */}
          <nav className="hidden xl:flex items-center gap-6 text-[11px] font-semibold tracking-wider text-white/90 uppercase">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "programs", label: "Programs" },
              { id: "impact", label: "Impact" },
              { id: "team", label: "Team" },
              { id: "gallery", label: "Gallery" },
              { id: "partners", label: "Partners" },
              { id: "testimonials", label: "Voices" },
              { id: "contact", label: "Contact" }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`py-1.5 transition duration-200 border-b-2 hover:text-[#F5C518] ${
                  activeSection === link.id 
                    ? "text-[#F5C518] border-[#F5C518]" 
                    : "border-transparent text-white/80 hover:border-white/20"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right items: Donate button & local clock */}
          <div className="hidden xl:flex items-center gap-5">
            {/* Live Local WAT Time clock */}
            <div className="flex items-center gap-1.5 text-white/50 font-mono text-[9px] bg-black/40 border border-white/10 px-3 py-1.5 rounded-full select-none">
              <Clock className="w-3.5 h-3.5 text-[#F5C518] animate-spin-slow" />
              <span>JOS TIME:</span>
              <span className="text-white font-bold">{josTime || "WAT Local"}</span>
            </div>

            <button
              onClick={openDonate}
              className="bg-[#F5C518] text-[#111111] px-5 py-2 rounded-full text-xs font-bold uppercase hover:brightness-110 transition-all cursor-pointer"
              id="nav-donate-btn"
            >
              Donate Now
            </button>
          </div>

          {/* Mobile Right items & Hamburger */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              onClick={openDonate}
              className="bg-[#F5C518] text-[#111111] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase hover:brightness-110 transition-all"
              id="nav-mobile-donate-btn"
            >
              Donate
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile-hamburger-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#F5C518]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>

        {/* SECTION 1.5 — MOBILE DRAWER SLIDE OUT */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-[60px] z-30 bg-[#111111] flex flex-col justify-between p-6 border-t border-white/10 animate-fade-in sm:left-1/3 xl:hidden shadow-3xl">
            <div className="space-y-6">
              <p className="text-[10px] text-[#F5C518]/80 uppercase font-mono tracking-widest">
                Navigation Directory
              </p>
              
              <nav className="flex flex-col gap-4 text-sm font-bold tracking-widest text-[#ffffff]/80 uppercase">
                {[
                  { id: "home", label: "Home — Top" },
                  { id: "about", label: "About GICD" },
                  { id: "programs", label: "What We Do" },
                  { id: "impact", label: "Our Real Impact" },
                  { id: "team", label: "Meet the Team" },
                  { id: "gallery", label: "Work Archive" },
                  { id: "partners", label: "Supporters & Allies" },
                  { id: "testimonials", label: "Beneficiary Voices" },
                  { id: "contact", label: "Reach Out to Jos" }
                ].map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-1 border-l-2 pl-3 transition ${
                      activeSection === link.id
                        ? "text-[#F5C518] border-[#F5C518] bg-white/5"
                        : "border-transparent hover:border-[#F5C518] text-white/60"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              {/* WAT local time widget inside drawer */}
              <div className="flex items-center gap-2 text-xs font-mono text-gray-450">
                <Clock className="w-4 h-4 text-[#F5C518]" />
                <span>Plateau Standard Time:</span>
                <span className="text-white font-bold">{josTime || "WAT"}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={openVolunteer}
                  className="w-full py-2.5 bg-white/5 border border-white/10 text-[#F5C518] rounded-full text-xs font-bold uppercase tracking-wider text-center"
                >
                  Volunteer
                </button>
                <button
                  onClick={openPartner}
                  className="w-full py-2.5 bg-[#F5C518] text-[#111111] rounded-full text-xs font-bold uppercase tracking-wider text-center"
                >
                  CSR Partner
                </button>
              </div>
            </div>
          </div>
        )}
      </header>


      {/* SECTION 2 — HERO */}
      <section 
        id="home" 
        className="relative min-h-[92vh] flex items-center pt-28 pb-16 bg-[#111111] overflow-hidden"
        style={{ background: "linear-gradient(to top, #1a1000 0%, #333 100%)" }}
      >
        {/* Transparent global decoration with minimalist dot pattern */}
        <div className="absolute inset-0 bg-[#F5C518]/10 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(#F5C518 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#F5C518]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-8 space-y-6 text-left animate-slide-up">
            
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] text-[#F5C518] border border-[#F5C518]/30 font-mono text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
              <span className="ping-dot w-2 h-2 rounded-full bg-[#F5C518] animate-ping inline-block" />
              <span>Frontline Grassroots Action in Plateau State</span>
            </span>

            <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-[52px] text-white tracking-tight leading-tight uppercase">
              Building Stronger <span className="text-[#F5C518]">Communities</span>,<br className="hidden sm:inline" />
              One Life at a Time
            </h1>

            <p className="text-white/80 text-sm max-w-lg leading-relaxed font-sans">
              GICD is a frontline NGO dedicated to transforming lives in Jos, Nigeria through sustainable community development programs.
            </p>

            {/* Quick trust metrics panel */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-white/50 font-mono">
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-[#F5C518]" />
                <span>100% NGO Accountability</span>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-[#F5C518]" />
                <span>Plateau State Endorsed</span>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-[#F5C518]" />
                <span>CAC Reg No: CAC/IT/182736</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={openDonate}
                className="bg-[#F5C518] text-[#111111] px-6 py-3 rounded-lg font-bold uppercase text-sm hover:brightness-110 shadow-lg cursor-pointer transition-all"
              >
                Donate Now
              </button>
              
              <a
                href="#about"
                className="border border-white/30 hover:border-[#F5C518] text-white hover:text-[#F5C518] px-6 py-3 rounded-lg font-bold uppercase text-sm transition-all text-center"
              >
                Learn About Us
              </a>
            </div>

          </div>

          {/* Hero right side graphic - Jos Community Slate Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-[#111111]/90 rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden group hover:border-[#F5C518]/30 transition-all duration-300">
              <div className="absolute right-0 top-0 w-24 h-24 bg-[#F5C518]/5 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-1 text-[10px] font-mono text-white/40">
                  <span className="w-2 h-2 rounded-full bg-green-500 block animate-pulse" />
                  <span>COMMUNITY FEEDBACK</span>
                </div>
                <Users className="w-4 h-4 text-[#F5C518]" />
              </div>

              <div className="py-6 space-y-4">
                <Quote className="w-8 h-8 text-[#F5C518]/30" />
                <p className="text-xs text-white/80 italic font-sans leading-relaxed">
                  &quot;GICD came straight to Angwan Rogo when other bodies stayed on the main road. They provided our kids textbooks, uniforms, and registered my third son for WAEC.&quot;
                </p>
                <div>
                  <h4 className="font-bold text-xs text-white">Adamu Jibril</h4>
                  <p className="text-[10px] text-white/40">Elderly Leader, Jos North Area</p>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/80 font-sans font-medium">Join 300+ Local Champions</span>
                <button 
                  onClick={openVolunteer}
                  className="text-[#F5C518] font-bold flex items-center gap-1 hover:underline text-xs"
                >
                  <span>Volunteer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Thin yellow bottom divider line with custom shadow highlight */}
        <div className="h-1 w-full bg-[#F5C518] absolute bottom-0 left-0 shadow-[0_-4px_15px_rgba(245,197,24,0.3)] z-10"></div>
      </section>


      {/* SECTION 3 — ABOUT US */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left column content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest block bg-gray-50 rounded pl-2 border-l-4 border-[#F5C518] py-1 w-max">
                  Who We Are
                </span>
                <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none uppercase">
                  Guardian Initiative for Community Development
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                <p className="font-medium text-[#111111]">
                  Founded with a burning passion to serve the underserved on the Plateau, GICD has been at the direct forefront of community transformation in Plateau State and across Nigeria. 
                </p>
                <p>
                  We firmly believe every community possesses the potential to flourish sustainably when provided the right tools, materials, technical training, and collaborative support structures. We operate transparently on-ground, bypassing bloated bureaucratic middlemen to deliver projects directly inside villages.
                </p>

                {/* Inline Full Story Expander */}
                {showFullStory && (
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-3 pt-4 text-xs animate-scale-up text-gray-700">
                    <h4 className="font-bold text-[#111111] text-sm">Our Inception & Legacy in Jos</h4>
                    <p>
                      GICD was officially registered years ago following a massive community assessment conducted by young professionals in Jos who saw critical healthcare gaps and educational abandonment in distant settlements. Starting with simple local reading circles, we grew into multi-sectoral projects including rural sanitary clinics, high-yield agrarian distribution setups, and massive youth IT courses. 
                    </p>
                    <p>
                      Today, GICD is supervised by structural trustees who publish periodic auditing metrics, giving international sponsors security in knowing that 100% of their donor capital represents tangible direct aid on-site.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowFullStory(!showFullStory)}
                  className="font-sans font-extrabold text-xs text-[#111111] hover:text-[#F5C518] tracking-wider uppercase transition-colors flex items-center gap-1 border-b-2 border-[#F5C518]/60 pb-1 cursor-pointer"
                >
                  <span>{showFullStory ? "Collapse Story" : "Our Full Story →"}</span>
                </button>
              </div>

            </div>

            {/* Right column: vision, mission, core values cards */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="bg-[#111111] text-white p-6 rounded-2xl border border-white/10 shadow-xl space-y-6">
                
                <h3 className="font-sans font-bold text-lg text-[#F5C518] pb-2 border-b border-white/10 uppercase tracking-tight">
                  Our Structural Blueprint
                </h3>

                {/* Vision row */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#F5C518]/10 rounded-lg text-[#F5C518] shrink-0 border border-[#F5C518]/20">
                    <Compass className="w-5 h-5 text-[#F5C518]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-[#F5C518] tracking-wider">Vision</h4>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed">
                      A Nigeria where every community is fully empowered with resources and education to develop cleanly and sustainably from the grassroots.
                    </p>
                  </div>
                </div>

                {/* Mission row */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#F5C518]/10 rounded-lg text-[#F5C518] shrink-0 border border-[#F5C518]/20">
                    <CheckCircle2 className="w-5 h-5 text-[#F5C518]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-[#F5C518] tracking-wider">Mission Statement</h4>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed">
                      To design, implement, and track grassroots intervention programs in education, clean maternal healthcare, economic trade workshops, and climate advocacy that tangibly improve lives.
                    </p>
                  </div>
                </div>

                {/* Values row */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#F5C518]/10 rounded-lg text-[#F5C518] shrink-0 border border-[#F5C518]/20">
                    <Award className="w-5 h-5 text-[#F5C518]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-[#F5C518] tracking-wider">Core Values</h4>
                    <p className="text-xs text-[#F5C518] font-extrabold tracking-wider mt-1">
                      INTEGRITY | COMPASSION | SUSTAINABILITY | COMMUNITY-FIRST
                    </p>
                  </div>
                </div>

              </div>
              
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 4 — PROGRAMS & FOCUS AREAS */}
      <section id="programs" className="py-20 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest inline-block bg-white rounded pl-2 border-l-4 border-[#F5C518] py-1 px-3">
              What We Do
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none uppercase">
              Our Programs
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans max-w-md mx-auto">
              Accredited grassroots focus areas designed to support local families in Jos safely and transparently.
            </p>
          </div>

          {/* 6 Grid layout (3x2 Desktop, 2x3 Tablet, 1x6 Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {PROGRAMS_DATA.map((prog) => (
              <div 
                key={prog.id}
                className="bg-white p-5 rounded-xl border border-gray-150 border-t-2 border-t-[#F5C518] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-[#F5C518]/10 rounded flex items-center justify-center p-2 text-[#F5C518]">
                    {renderProgramIcon(prog.iconName)}
                  </div>
                  <h3 className="font-sans font-bold text-base text-[#111111] leading-snug uppercase">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100/60">
                  <button
                    onClick={() => setSelectedProgram(prog)}
                    className="font-sans font-extrabold text-[10px] sm:text-xs text-[#111111] hover:text-[#F5C518] tracking-wider uppercase transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#F5C518]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* SECTION 4.5 — CUSTOM QUICK PROGRAM MODAL PANEL */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="program-focus-modal">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative border border-gray-100 space-y-4">
            
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition text-gray-500"
              aria-label="Close"
              id="close-program-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow">
                {renderProgramIcon(selectedProgram.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-400 block tracking-widest uppercase">GICD CORES</span>
                <h4 className="font-sans font-black text-base text-brand-black">{selectedProgram.title}</h4>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed pt-2">
              Our <span className="font-bold text-brand-black">{selectedProgram.title}</span> program represents years of field design. In Jos and Plateau environments, we recruit local guides, purchase bulk supplies directly, and invite regional elders and traditional chiefs to observe our campaign milestones, ensuring extreme transparency.
            </p>

            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-[11px] text-gray-750">
              <span className="font-bold text-brand-black block mb-1">Direct Field Milestones:</span>
              <ul className="space-y-1 list-disc pl-3">
                <li>Bi-weekly progress auditing records</li>
                <li>Zero administrative expense deduction</li>
                <li>Accredited personnel & Plateau safety protocols</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedProgram(null);
                  openDonate();
                }}
                className="w-full py-2 bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 font-extrabold rounded-lg text-xs uppercase"
              >
                Donate Direct support
              </button>
              <button
                onClick={() => {
                  setSelectedProgram(null);
                  openVolunteer();
                }}
                className="w-full py-2 bg-brand-black text-brand-yellow hover:bg-slate-900 font-bold rounded-lg text-xs uppercase"
              >
                Volunteer Spot
              </button>
            </div>

          </div>
        </div>
      )}


      {/* SECTION 5 — IMPACT NUMBERS (Stats Counter) */}
      <section id="impact" className="py-20 bg-[#111111] text-white relative overflow-hidden">
        {/* Transparent global decoration with minimalist dot pattern */}
        <div className="absolute inset-0 bg-[#F5C518]/5 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(#F5C518 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full z-10 text-center space-y-12">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold text-[#F5C518] uppercase tracking-widest inline-block border border-[#F5C518]/25 px-3 py-1 rounded-full bg-[#111111]">
              OUR IMPACT IN ACTION
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-none uppercase">
              CHANGING LIVES ACROSS JOS
            </h2>
            <p className="text-xs text-white/70 max-w-sm mx-auto font-sans leading-relaxed">
              We stand prepared with clear empirical verification. These metrics are dynamically logged, and audited in our public annual state reviews.
            </p>
          </div>

          {/* Stats Counter Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {STATS_DATA.map((val) => (
              <StatCounter
                key={val.id}
                targetNumber={val.number}
                suffix={val.suffix}
                label={val.label}
              />
            ))}
          </div>

        </div>

        {/* Thick yellow decorative visual underline below stats */}
        <div className="h-1 w-full bg-[#F5C518] absolute bottom-0 left-0 shadow-[0_-4px_15px_rgba(245,197,24,0.3)] z-10"></div>
      </section>


      {/* SECTION 6 — TEAM */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest inline-block bg-gray-50 rounded pl-2 border-l-4 border-[#F5C518] py-1 px-3">
              THE PEOPLE BEHIND GICD
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none uppercase">
              Meet Our Board & Officers
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Plateau indigenes, health professionals, and advocacy specialists working around the clock.
            </p>
          </div>

          {/* Responsive team cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {TEAM_DATA.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-xl p-6 border border-gray-150 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Yellow circle Initials avatar as placeholder */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#F5C518] to-amber-200 border border-[#111111]/10 text-[#111111] flex items-center justify-center font-sans font-black text-xl shadow-sm uppercase select-none">
                  {member.initials}
                </div>

                <div className="mt-5 space-y-1">
                  <h4 className="font-sans font-extrabold text-sm text-[#111111] uppercase tracking-tight">{member.name}</h4>
                  <p className="text-[10px] uppercase font-mono text-[#F5C518] tracking-widest font-bold">{member.role}</p>
                </div>

                <p className="text-xs text-gray-500 mt-3 font-sans leading-relaxed text-center px-1">
                  {member.bio}
                </p>

                <div className="mt-5 pt-3 border-t border-gray-100 w-full flex justify-center gap-3">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Verified Officer</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* SECTION 7 — GALLERY / MEDIA */}
      <section id="gallery" className="py-20 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest inline-block bg-white rounded pl-2 border-l-4 border-[#F5C518] py-1 px-3">
              OUR WORK IN ACTION
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none uppercase">
              Media Archive
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans">
              Live captures of health operations, back-to-school distributions, and eco advocacy in Plateau communities.
            </p>

            {/* Filtering category tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase border transition cursor-pointer ${
                    galleryFilter === cat
                      ? "bg-[#111111] text-[#F5C518] border-[#111111] shadow-sm"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#F5C518] hover:text-[#111111]"
                  }`}
                >
                  {cat === "All" ? "All Projects" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* 6 Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className="group relative h-64 rounded-2xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer shadow-md transition-transform duration-300 hover:scale-[1.02]"
                style={{ background: item.gradient }}
              >
                {/* Visual subtle dotted panel overlay */}
                <div className="absolute inset-0 bg-[#111111]/30 group-hover:bg-brand-black/90 transition duration-300 flex flex-col justify-end p-6 z-10" />

                {/* Micro eye action and interactive banner */}
                <div className="absolute top-4 right-4 p-2 bg-brand-black/80 rounded-full border border-gray-800 opacity-0 group-hover:opacity-100 transition duration-300 z-20 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-brand-yellow" />
                </div>

                <div className="relative z-10 text-left space-y-1.5 text-white">
                  <span className="inline-block text-[9px] font-mono text-brand-yellow uppercase tracking-widest font-black">
                    {item.category}
                  </span>
                  <h4 className="font-sans font-extrabold text-sm sm:text-base tracking-tight line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 group-hover:block hidden font-sans" id={`view-story-label-${item.id}`}>
                    Click to browse archives and notes →
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* RENDER GALLERY LIGHTBOX VIEW */}
      {selectedGalleryItem && (
        <GalleryLightbox
          item={selectedGalleryItem}
          onClose={() => setSelectedGalleryItem(null)}
          onNext={handleNextGallery}
          onPrev={handlePrevGallery}
        />
      )}


      {/* SECTION 8 — PARTNERS & DONORS */}
      <section id="partners" className="py-16 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-8">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
              TRUSTED COLLABORATORS
            </span>
            <h3 className="font-sans font-black text-2xl text-[#111111] tracking-tight leading-none uppercase">
              Audited & Authorized Partnerships
            </h3>
            <p className="text-xs text-gray-500 max-w-xl mx-auto font-sans leading-relaxed">
              We are blessed with strong cooperation networks with state ministries, private donors, and local town unions, making Plateau transformations a truly structured effort.
            </p>
          </div>

          {/* Endless horizontal scrolling logo strip (CSS scrolling marquee) */}
          <div className="relative w-full py-6 bg-gray-50 border-y border-gray-100 rounded-2xl overflow-hidden flex items-center">
            
            {/* Visual fade-out overlays on flanks to give rich depth */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Marquee Ticker Block */}
            <div className="flex gap-6 animate-pulse-soft overflow-x-auto scrollbar-hide py-2 flex-nowrap w-full justify-center">
              {PARTNERS_DATA.map((partner, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-150 flex items-center gap-2 shrink-0 select-none shadow-sm hover:border-[#F5C518]/30 transition duration-300"
                >
                  <div className="w-8 h-8 rounded bg-[#111111] text-[#F5C518] font-mono font-black text-xs flex items-center justify-center">
                    {partner.initials}
                  </div>
                  <span className="text-xs font-bold text-gray-700 font-sans">{partner.name}</span>
                </div>
              ))}
            </div>

          </div>

          <div className="pt-2 flex flex-col items-center gap-3">
            <button
              onClick={openPartner}
              className="font-sans font-black text-xs text-[#111111] hover:text-[#F5C518] transition-colors border-b-2 border-[#F5C518] pb-0.5 uppercase tracking-wider cursor-pointer"
              id="become-partner-btn"
            >
              Become a Technical Partner →
            </button>
          </div>

        </div>
      </section>


      {/* SECTION 9 — TESTIMONIALS */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest inline-block bg-white rounded pl-2 border-l-4 border-[#F5C518] py-1 px-3">
              VOICES FROM THE COMMUNITY
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none uppercase">
              Grassroots Testimonials
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans">
              Nothing stands as solid as stories of transformation directly from our beneficiaries in Nigeria.
            </p>
          </div>

          {/* 3 Testimonials layout grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            {TESTIMONIALS_DATA.map((test) => (
              <div 
                key={test.id}
                className="bg-white rounded-xl p-6 border-l-4 border-[#F5C518] border-y border-r border-gray-150 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300"
              >
                <div className="space-y-4">
                  {/* Yellow quote decoration */}
                  <Quote className="w-8 h-8 text-[#F5C518] fill-[#F5C518]/10" />
                  <p className="text-xs sm:text-sm text-gray-600 italic font-sans leading-relaxed">
                    &quot;{test.quote}&quot;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-xs text-[#111111]">{test.author}</h4>
                  <p className="text-[10px] text-gray-500 font-sans mt-0.5">{test.role} • {test.location}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* SECTION 10 — DONATE / CTA */}
      <section className="relative py-16 bg-[#F5C518] text-[#111111] overflow-hidden">
        
        {/* visual background circle lines */}
        <div className="absolute left-0 bottom-0 transform translate-y-12 w-64 h-64 bg-black/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-0 top-0 transform -translate-y-12 w-64 h-64 bg-black/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8 z-10">
          
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none uppercase">
            Your Support Can Transform a Life Today.
          </h2>
          
          <p className="text-sm text-[#111111]/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Every single naira or dollar donated goes directly on the ground to empower vulnerable Nigerian families. Partner with GICD volunteers to drive real educational, healthcare, and economic support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={openDonate}
              className="px-8 py-3 bg-[#111111] hover:bg-[#111111]/90 text-white font-sans font-bold text-xs tracking-widest uppercase rounded-full shadow-lg transition duration-300 text-center w-full sm:w-auto cursor-pointer"
              id="cta-donate-btn"
            >
              Donate Now
            </button>
            <button
              onClick={openVolunteer}
              className="px-8 py-3 border border-[#111111] hover:bg-[#111111]/5 text-[#111111] font-sans font-bold text-xs tracking-widest uppercase rounded-full transition duration-300 text-center w-full sm:w-auto cursor-pointer"
              id="cta-volunteer-btn"
            >
              Volunteer With Us
            </button>
          </div>

          {/* Golden Badge Trust Icons */}
          <div className="pt-8 border-t border-[#111111]/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-sans font-extrabold uppercase tracking-wider text-[#111111]/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-[#111111]" />
              <span>100% Transparent Audits</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-5 h-5 text-[#111111]" />
              <span>CAC Registered NGO</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-[#111111]" />
              <span>Community-Verified</span>
            </span>
          </div>

        </div>
      </section>


      {/* SECTION 11 — CONTACT */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest block bg-gray-50 rounded pl-2 border-l-4 border-[#F5C518] py-1 w-max">
                  Reach Out
                </span>
                <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none uppercase">
                  Contact Us
                </h2>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  Have questions, grant proposals, or in-kind donations? Drop by our administrative center or write us. Our crew responds within a day.
                </p>
              </div>

              {/* Real Local Address/Tel list */}
              <div className="space-y-4 pt-2">
                
                {/* MapPin address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F5C518]/10 rounded-lg text-[#F5C518] shrink-0 border border-[#F5C518]/25">
                    <MapPin className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111111] uppercase tracking-wider">Main Operations Base</h5>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-sans">
                      Jos, Plateau State, Nigeria
                    </p>
                  </div>
                </div>

                {/* Email address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F5C518]/10 rounded-lg text-[#F5C518] shrink-0 border border-[#F5C518]/25">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111111] uppercase tracking-wider">Official Inquiries</h5>
                    <a 
                      href="mailto:info@gicdnigeria.org" 
                      className="text-xs text-[#111111] font-semibold mt-0.5 hover:text-[#F5C518] font-sans underline"
                      id="contact-email-link"
                    >
                      info@gicdnigeria.org
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F5C518]/10 rounded-lg text-[#F5C518] shrink-0 border border-[#F5C518]/25">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111111] uppercase tracking-wider">Contact Support Direct</h5>
                    <a 
                      href="tel:+2348000000000" 
                      className="text-xs text-[#111111] font-semibold mt-0.5 hover:text-[#F5C518] font-sans font-semibold tracking-wider block"
                      id="contact-phone-link"
                    >
                      +234 (0) 800 000 0000
                    </a>
                  </div>
                </div>

              </div>

              {/* Social Networking Links */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-bold">
                  Connect on Social Media
                </span>
                <div className="flex items-center gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-50 hover:bg-[#F5C518] rounded-full text-gray-500 hover:text-[#111111] transition duration-200" aria-label="GICD Facebook" id="social-fb">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-50 hover:bg-[#F5C518] rounded-full text-gray-500 hover:text-[#111111] transition duration-200" aria-label="GICD Instagram" id="social-ig">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-50 hover:bg-[#F5C518] rounded-full text-gray-500 hover:text-[#111111] transition duration-200" aria-label="GICD Twitter" id="social-tw">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-50 hover:bg-[#F5C518] rounded-full text-gray-500 hover:text-[#111111] transition duration-200" aria-label="GICD LinkedIn" id="social-li">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-50 hover:bg-[#F5C518] rounded-full text-gray-500 hover:text-[#111111] transition duration-200" aria-label="GICD YouTube" id="social-yt">
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-150">
              
              {contactStatus !== "success" ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Fatima Yusuf"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#F5C518] focus:border-[#F5C518] focus:outline-none bg-white font-sans text-[#111111]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="fatima@email.com"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#F5C518] focus:border-[#F5C518] focus:outline-none bg-white font-sans text-[#111111]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Subject of Inquiry *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Donor query, School scholarship, Partnership details..."
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#F5C518] focus:border-[#F5C518] focus:outline-none bg-white font-sans text-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Detailed Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Type your questions or proposal here..."
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#F5C518] focus:border-[#F5C518] focus:outline-none bg-white font-sans text-[#111111] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactStatus === "sending"}
                    className="w-full bg-[#111111] hover:bg-[#111111]/90 active:scale-[0.98] transition font-sans font-bold text-xs text-white py-3 rounded-lg shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    id="submit-contact-btn"
                  >
                    {contactStatus === "sending" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <>
                        <span>Send Message to GICD</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F5C518]" />
                      </>
                    )}
                  </button>

                </form>
              ) : (
                /* Interactive Success Display card */
                <div className="text-center py-8 space-y-4" id="contact-success-container">
                  <div className="w-14 h-14 bg-green-50 rounded-full border border-green-200 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7 text-green-600 stroke-[3]" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h4 className="font-sans font-bold text-lg text-[#111111]">Message Dispatched!</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                      Thank you <span className="font-bold text-[#111111]">{contactData.name}</span>. Our Plateau Desk officer has logged your dispatch entry successfully under Reference ID: <span className="font-mono font-bold text-[#111111]">{contactTicket}</span>.
                    </p>
                  </div>

                  <div className="pt-4 max-w-sm mx-auto">
                    <button
                      onClick={() => {
                        setContactStatus("idle");
                        setContactData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="px-6 py-2 bg-[#111111] text-[#F5C518] hover:bg-black transition rounded-full text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                      id="reset-contact-btn"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>


      {/* SECTION 12 — FOOTER */}
      <footer className="bg-[#111111] text-white pt-16 pb-8 border-t-4 border-[#F5C518]" id="gicd-footer-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            
            {/* Column 1 - GICD Brand summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[#F5C518] font-bold text-2xl leading-none tracking-tighter">GICD</span>
                <span className="font-sans font-medium text-white/50 text-xs uppercase tracking-widest pl-1 border-l border-white/20">Guardian Initiative</span>
              </div>
              <p className="text-xs text-white/70 font-sans leading-relaxed max-w-sm">
                Empowering Plateau State communities with education pipelines, free medical outreach camps, youth advocacy bootcamps, and food security initiatives. Transparently certified and driven.
              </p>
              
              <div className="pt-2 text-[10px] font-mono text-white/40">
                <span>Registrations: </span>
                <span className="text-[#F5C518]">CAC/IT/182736 • Plateau State NGO Accord</span>
              </div>
            </div>

            {/* Column 2 - Quick links */}
            <div className="lg:col-span-2 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-widest text-[#F5C518]">
                Quick Links
              </h5>
              <ul className="space-y-2 text-xs text-white/60 font-sans">
                <li><a href="#home" className="hover:text-[#F5C518] transition">Home — Top</a></li>
                <li><a href="#about" className="hover:text-[#F5C518] transition">About Us</a></li>
                <li><a href="#impact" className="hover:text-[#F5C518] transition">Our Impact</a></li>
                <li><a href="#team" className="hover:text-[#F5C518] transition">Meet Our Team</a></li>
                <li><a href="#gallery" className="hover:text-[#F5C518] transition">Visual Gallery</a></li>
                <li><a href="#contact" className="hover:text-[#F5C518] transition">Contact & Map</a></li>
              </ul>
            </div>

            {/* Column 3 - Our Cores */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-widest text-[#F5C518]">
                Our Programs
              </h5>
              <ul className="space-y-2 text-xs text-white/60 font-sans">
                <li><a href="#programs" className="hover:text-[#F5C518] transition">Education & Scholarships</a></li>
                <li><a href="#programs" className="hover:text-[#F5C518] transition">Healthcare Outreach</a></li>
                <li><a href="#programs" className="hover:text-[#F5C518] transition">Economic Empowerment</a></li>
                <li><a href="#programs" className="hover:text-[#F5C518] transition">Environmental Protection</a></li>
                <li><a href="#programs" className="hover:text-[#F5C518] transition">Youth Advocacy Camps</a></li>
                <li><a href="#programs" className="hover:text-[#F5C518] transition">Food Security Schemes</a></li>
              </ul>
            </div>

            {/* Column 4 - Connect With Us details */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-widest text-[#F5C518]">
                Connect With Us
              </h5>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Address: Jos, Plateau State, Nigeria
              </p>
              <div className="space-y-1 text-xs text-white/60 font-sans">
                <p>Email: <a href="mailto:info@gicdnigeria.org" className="text-[#F5C518] hover:underline">info@gicdnigeria.org</a></p>
                <p>Phone: <span className="text-white">+234 (0) 800 000 0000</span></p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={openDonate}
                  className="bg-[#F5C518] text-[#111111] text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full cursor-pointer hover:brightness-105"
                >
                  Direct Support
                </button>
              </div>
            </div>

          </div>

          {/* Bottom regulatory visual bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 font-sans gap-4 text-center">
            <div>
              © 2026 Guardian Initiative for Community Development. All rights reserved. Registered NGO in Nigeria.
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] font-mono tracking-wider">
              <span>● AUDITED</span>
              <span>● COMPLIANT</span>
              <span>● CAC CERTIFIED</span>
            </div>
          </div>

        </div>
      </footer>


      {/* GLOBAL MODALS POPUP TRIGGER OUTLET */}
      <DonateModal 
        isOpen={isDonateOpen} 
        onClose={() => setIsDonateOpen(false)} 
      />

      <VolunteerModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
      />

      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />

    </div>
  );
}
