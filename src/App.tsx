import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  ChevronLeft, 
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
  TRUSTEES_DATA,
  GALLERY_DATA, 
  TESTIMONIALS_DATA, 
  PARTNERS_DATA,
  GalleryItem,
  ProgramItem
} from "./types";
import { StatCounter } from "./components/StatCounter";
import { DonateModal, VolunteerModal, PartnerModal, JobsModal } from "./components/GicdModals";
import { GalleryLightbox } from "./components/GalleryLightbox";
import { GicdLogo } from "./components/GicdLogo";

const CAROUSEL_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    title: "Back-to-School Support",
    description: "Equipping children with books, pens, backpacks, and uniforms for formal schooling."
  },
  {
    url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
    title: "Guided Reading Circles",
    description: "Creating community-based safe environments for early educational exposure."
  },
  {
    url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop",
    title: "Eco Advocacy & Planting",
    description: "Teaching youth community service through tree planting and environmental care."
  },
  {
    url: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?q=80&w=800&auto=format&fit=crop",
    title: "Child Protection Campaign",
    description: "Reinforcing informal protection networks and raising grassroots safety awareness."
  },
  {
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    title: "Empowering Rural Classrooms",
    description: "Providing trained tutors, resources and structural assistance to distant schools."
  }
];

export default function App() {
  // Modal visibility states
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("child_protection");
  
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

  // Team tab visibility state (Board of Trustees vs Operational Officers)
  const [teamTab, setTeamTab] = useState<"trustees" | "officers">("trustees");

  // Program Updates and Resources download states
  const [updatesActiveTab, setUpdatesActiveTab] = useState<"survey" | "feed">("survey");
  const [surveyReportActiveTab, setSurveyReportActiveTab] = useState<"narrative" | "overview" | "risks" | "education" | "support">("narrative");
  const [updateFilter, setUpdateFilter] = useState("All");
  const [updateSearchQuery, setUpdateSearchQuery] = useState("");
  const [selectedUpdate, setSelectedUpdate] = useState<any | null>(null);
  const [downloadingResourceId, setDownloadingResourceId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Contact Form states
  const [contactData, setContactData] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactTicket, setContactTicket] = useState("");

  // Moving Activity Pictures Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  // Auto-slide effect for current activities gallery
  useEffect(() => {
    const slideTimer = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

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
    const sections = ["home", "who-we-are", "what-we-do", "programme-updates", "resources", "work-with-us"];
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

  const openJobs = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsJobsOpen(true);
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
          <a href="#home" className="flex items-center group transition-transform duration-300 hover:scale-[1.02]" aria-label="GICD Home">
            <div className="bg-white px-3.5 py-2 rounded-lg border border-gray-200/40 shadow-sm inline-flex items-center justify-center min-w-[70px]">
              <GicdLogo variant="full" theme="light" height={20} showSubText={false} />
            </div>
          </a>

          {/* Nav links Desktop */}
          <nav className="hidden xl:flex items-center gap-6 text-[11px] font-semibold tracking-wider text-white/90 uppercase">
            {[
              { id: "who-we-are", label: "Who We Are" },
              { id: "what-we-do", label: "What We Do" },
              { id: "programme-updates", label: "Programme Updates" },
              { id: "resources", label: "Resources" },
              { id: "work-with-us", label: "Work With Us" }
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
                  { id: "who-we-are", label: "Who We Are" },
                  { id: "what-we-do", label: "What We Do" },
                  { id: "programme-updates", label: "Programme Updates" },
                  { id: "resources", label: "Resources" },
                  { id: "work-with-us", label: "Work With Us" }
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


      {/* =========================================================
          PILLAR 1 — WHO WE ARE SECTION
          ========================================================= */}
      <section id="who-we-are" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          
          {/* Header Title Block */}
          <div className="space-y-4 max-w-4xl text-left">
            <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest block bg-[#111111] text-white rounded px-2.5 py-1 w-max">
              About Us
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-[#111111] tracking-tight leading-none uppercase">
              The Guardian Initiative for <br className="hidden sm:inline" />Community Development (GICD)
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans max-w-3xl">
              The Guardian Initiative for Community Development (GICD) is a child-focused Nigerian charity that responds to and addresses humanitarian and development challenges affecting children. We strengthen protection systems, advance education and youth development, and improve the resilience of households and communities to achieve sustainable outcomes across both humanitarian and development contexts. We operate at the intersection of child protection, socio-economic empowerment, and the translation of global frameworks into meaningful grassroots outcomes.
            </p>
          </div>

          {/* Row A: Story and Vision Blueprint */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Story Box */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[9px] font-mono text-[#F5C518] uppercase tracking-widest font-black block bg-[#111111] w-max px-2 py-0.5 rounded">
                Our Model
              </span>
              <h3 className="font-sans font-black text-xl sm:text-2xl text-[#111111] uppercase tracking-tight">
                Protection through Exposure
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                <p className="font-semibold text-[#111111] text-sm">
                  Our work is inspired by a persistent and widening gap; between learning and purpose, and between protection and the lived socio-economic realities of children, particularly in underserved communities.
                </p>
                <p className="text-xs sm:text-sm">
                  In these environments, curiosity, resilience, and talent often fade quietly, not from lack of potential, but from lack of intentional nurture and meaningful exposure. Young people follow the expected path through school, yet still arrive at adulthood unprepared; not because they failed, but because the system never fully revealed what was possible.
                </p>

                <div className="p-5 bg-stone-50 border-l-4 border-[#F5C518] rounded-r-xl space-y-3 text-xs text-gray-750">
                  <p className="font-sans font-medium text-gray-700">
                    We exist to intervene early and deliberately; to safeguard children, equip adolescents, and expand the worldview of young people. We see guided exposure as a form of protection, one that broadens perspective, strengthens decision-making, and inspire dreams.
                  </p>
                </div>
              </div>
            </div>

            {/* Blueprint Grid Column */}
            <div className="lg:col-span-5">
              <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl space-y-6">
                
                <h3 className="font-sans font-bold text-base text-[#F5C518] pb-2 border-b border-white/10 uppercase tracking-wider">
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
                      A world where the safety of children, the potentials of youth, and the prosperity of communities is a lived reality.
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
                      To protect children’s rights, drive sustainable development, and build resilient communities through evidence-based approaches.
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
                    <p className="text-[10px] text-[#F5C518] font-extrabold tracking-wider mt-1.5 uppercase leading-none">
                      INTEGRITY | COMPASSION | SUSTAINABILITY | TRUST
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ==========================================
              MOVING PICTURE CAROUSEL (Activities with Children)
              ========================================== */}
          <div className="pt-10 border-t border-gray-100 space-y-8">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest inline-block bg-[#111111] text-white rounded px-2.5 py-1">
                GICD Operational Gallery
              </span>
              <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">
                Our Primary Campaigns in Action
              </h3>
              <p className="text-xs text-gray-500 font-sans max-w-md mx-auto">
                Interactive moving pictures highlighting our recent community intervention deployments, child-centric support events, and educational safety programs.
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full h-[280px] sm:h-[420px] rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-[#111111] group">
              {/* Slider Image wrapper */}
              <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={CAROUSEL_IMAGES[currentSlide].url}
                      alt={CAROUSEL_IMAGES[currentSlide].title}
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                    {/* Shadow overlay gradient to read text clearly */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Left Arrow */}
              <button
                type="button"
                onClick={handlePrevSlide}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-[#F5C518] text-white hover:text-[#111111] border border-white/10 transition-all duration-200 backdrop-blur-sm z-30 cursor-pointer select-none"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Slider Right Arrow */}
              <button
                type="button"
                onClick={handleNextSlide}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-[#F5C518] text-white hover:text-[#111111] border border-white/10 transition-all duration-200 backdrop-blur-sm z-30 cursor-pointer select-none"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Slide Details Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
                <div className="space-y-1 sm:space-y-2 max-w-2xl text-white">
                  <span className="px-2 py-0.5 bg-[#F5C518] text-[#111111] font-black text-[8px] sm:text-[9px] uppercase tracking-widest rounded font-mono inline-block">
                    Plateau Campaign Live Focus
                  </span>
                  <h4 className="font-sans font-black text-lg sm:text-2xl text-white uppercase tracking-tight">
                    {CAROUSEL_IMAGES[currentSlide].title}
                  </h4>
                  <p className="text-xs text-white/95 leading-relaxed font-sans font-medium">
                    {CAROUSEL_IMAGES[currentSlide].description}
                  </p>
                </div>

                {/* Bullet Indicators */}
                <div className="flex gap-1.5 shrink-0">
                  {CAROUSEL_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 sm:h-2 rounded-full cursor-pointer transition-all duration-300 ${
                        idx === currentSlide ? "w-6 sm:w-8 bg-[#F5C518]" : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row B: Governance & Working Team */}
          <div className="space-y-8 pt-10 border-t border-gray-100 text-center">
            
            <div className="space-y-2 max-w-xl mx-auto">
              <h3 className="font-sans font-extrabold text-xl text-[#111111] uppercase tracking-tight">
                Our Team & Governance structure
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans mt-2">
                GICD is governed by a legally registered Board of Trustees who set policy guidelines, and is executed on-ground by dedicated operational management officers.
              </p>
            </div>

            {/* Switchable Tabs Selector */}
            <div className="flex items-center justify-center gap-6 border-b border-gray-100 max-w-md mx-auto pb-0.5">
              <button
                onClick={() => setTeamTab("trustees")}
                className={`pb-3 text-xs uppercase tracking-wider font-extrabold transition-all relative cursor-pointer ${
                  teamTab === "trustees" ? "text-[#111111]" : "text-gray-400 hover:text-gray-655"
                }`}
              >
                Board of Trustees ({TRUSTEES_DATA.length})
                {teamTab === "trustees" && (
                  <motion.div layoutId="teamUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5C518]" />
                )}
              </button>
              <button
                onClick={() => setTeamTab("officers")}
                className={`pb-3 text-xs uppercase tracking-wider font-extrabold transition-all relative cursor-pointer ${
                  teamTab === "officers" ? "text-[#111111]" : "text-gray-400 hover:text-gray-655"
                }`}
              >
                Working Team ({TEAM_DATA.length})
                {teamTab === "officers" && (
                  <motion.div layoutId="teamUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5C518]" />
                )}
              </button>
            </div>

            {/* Swappable Members Grid */}
            <div className="pt-4 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={teamTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.18 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {teamTab === "trustees" ? (
                    TRUSTEES_DATA.map((member) => (
                      <div 
                        key={member.id}
                        className="bg-white rounded-xl p-5 border border-gray-150 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:border-[#F5C518]/30"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F5C518] to-amber-200 border border-[#111111]/10 text-[#111111] flex items-center justify-center font-sans font-black text-xs shadow-sm uppercase shrink-0 select-none">
                              {member.initials}
                            </div>
                            <div>
                              <h4 className="font-sans font-extrabold text-[#111111] text-xs uppercase tracking-tight leading-snug group-hover:text-[#F5C518] transition-colors leading-tight truncate max-w-[150px]">
                                {member.name}
                              </h4>
                              <p className="text-[8px] uppercase font-mono text-gray-400 tracking-wider font-bold">
                                Board Trustee
                              </p>
                            </div>
                          </div>

                          <div className="inline-block px-2 py-0.5 bg-gray-50 text-gray-800 text-[10px] font-sans font-semibold rounded border border-gray-100">
                            {member.role}
                          </div>

                          <p className="text-xs text-gray-500 font-sans leading-relaxed line-clamp-4">
                            {member.bio}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-gray-100 w-full flex items-center justify-between text-[8px] font-mono text-gray-400 uppercase tracking-widest">
                          <span>Verified Governance</span>
                          <span className="text-[#F5C518] font-bold">● GICD BOARD</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    TEAM_DATA.map((member) => (
                      <div 
                        key={member.id}
                        className="bg-white rounded-xl p-5 border border-gray-150 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:border-[#F5C518]/30"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F5C518] to-amber-200 border border-[#111111]/10 text-[#111111] flex items-center justify-center font-sans font-black text-xs shadow-sm uppercase shrink-0 select-none">
                              {member.initials}
                            </div>
                            <div>
                              <h4 className="font-sans font-extrabold text-[#111111] text-xs uppercase tracking-tight leading-snug group-hover:text-[#F5C518] transition-colors leading-tight truncate max-w-[150px]">
                                {member.name}
                              </h4>
                              <p className="text-[8px] uppercase font-mono text-gray-400 tracking-wider font-bold">
                                Operating Officer
                              </p>
                            </div>
                          </div>

                          <div className="inline-block px-2 py-0.5 bg-gray-50 text-gray-800 text-[10px] font-sans font-semibold rounded border border-gray-100">
                            {member.role}
                          </div>

                          <p className="text-xs text-gray-500 font-sans leading-relaxed line-clamp-4">
                            {member.bio}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-gray-100 w-full flex items-center justify-between text-[8px] font-mono text-gray-400 uppercase tracking-widest">
                          <span>Verified Officer</span>
                          <span className="text-[#F5C518] font-bold">● OPERATIONAL</span>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          PILLAR 2 — WHAT WE DO SECTION (Highlight Child Protection & Education)
          ========================================================= */}
      <section id="what-we-do" className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          
          {/* Section Heading */}
          <div className="space-y-3 max-w-2xl mx-auto text-center">
            <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest inline-block bg-white rounded pl-2 border-l-4 border-[#F5C518] py-1 px-3">
              What We Do
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none uppercase">
              Our Primary Pathways & Actions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans max-w-xl mx-auto">
              Our grassroots development is driven by three paramount pathways as detailed below, backed by additional supporting technical interventions.
            </p>
          </div>

          {/* Three Paramount Pillars Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Paramount Pillar A — Child Protection */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm group hover:border-[#F5C518]/55 transition duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono text-gray-400 tracking-wider">PATHWAY ONE</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-[#F5C518] font-bold text-[8px] uppercase tracking-wider rounded border border-[#F5C518]/10">Core focus</span>
                </div>
                
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-[#F5C518]/10 rounded-lg flex items-center justify-center text-[#F5C518]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-black text-xl text-[#111111] tracking-tight uppercase">
                    Child Protection
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    We strengthen child protection through community-based awareness and prevention initiatives, early identification and referral of vulnerable children, and targeted parenting support that promotes family stability. We also work to reinforce informal protection systems within communities, ensuring that children are surrounded by responsive, informed, and supportive structures that can safeguard their well-being.
                  </p>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-150 space-y-1.5 text-xs">
                  <span className="font-bold text-[#111111] text-[9px] uppercase tracking-wider block font-sans">Empirical Actions:</span>
                  <div className="space-y-1 text-gray-600 font-sans text-[11px] leading-snug">
                    <div>● Community awareness and prevention</div>
                    <div>● Early ID and vulnerable referral</div>
                    <div>● Target parenting & stability counseling</div>
                    <div>● Informal systems reinforcement</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openVolunteer()}
                  className="px-3 py-1.5 bg-[#111111] text-white hover:bg-slate-950 font-bold rounded text-[10px] uppercase cursor-pointer"
                >
                  Join Campaign
                </button>
                <button
                  type="button"
                  onClick={() => openDonate()}
                  className="text-[10px] text-[#111111] font-extrabold underline hover:text-[#F5C518]"
                >
                  Fund Shelter & Protection
                </button>
              </div>
            </div>

            {/* Paramount Pillar B — Education */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm group hover:border-[#F5C518]/55 transition duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono text-gray-400 tracking-wider">PATHWAY TWO</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-[#F5C518] font-bold text-[8px] uppercase tracking-wider rounded border border-[#F5C518]/10">Core focus</span>
                </div>
                
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-[#F5C518]/10 rounded-lg flex items-center justify-center text-[#F5C518]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-black text-xl text-[#111111] tracking-tight uppercase">
                    Education
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    We improve access to formal education by addressing barriers that prevent children from enrolling, attending, and staying in school, while promoting learning environments that support their growth, dignity, and long-term development. We also inspire learning through structured exposure that broadens learners’ worldview and gives them a clear sense of purpose to remain in school.
                  </p>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-150 space-y-1.5 text-xs">
                  <span className="font-bold text-[#111111] text-[9px] uppercase tracking-wider block font-sans">Educational Actions:</span>
                  <div className="space-y-1 text-gray-600 font-sans text-[11px] leading-snug">
                    <div>● Address direct enrolment barriers</div>
                    <div>● Support growth with dignity</div>
                    <div>● Inspire via structured child exposure</div>
                    <div>● Worldview and purpose broadening</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openJobs("education_facilitator")}
                  className="px-3 py-1.5 bg-[#111111] text-white hover:bg-slate-950 font-bold rounded text-[10px] uppercase cursor-pointer"
                >
                  Join Classroom
                </button>
                <button
                  type="button"
                  onClick={() => openDonate()}
                  className="text-[10px] text-[#111111] font-extrabold underline hover:text-[#F5C518]"
                >
                  Scholarship Orphans
                </button>
              </div>
            </div>

            {/* Paramount Pillar C — Youth Development & Empowerment */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm group hover:border-[#F5C518]/55 transition duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono text-gray-400 tracking-wider">PATHWAY THREE</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-[#F5C518] font-bold text-[8px] uppercase tracking-wider rounded border border-[#F5C518]/10">Core focus</span>
                </div>
                
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-[#F5C518]/10 rounded-lg flex items-center justify-center text-[#F5C518]">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-black text-xl text-[#111111] tracking-tight uppercase">
                    Youth Dev & Empowerment
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    We equip young people with the tools they need to transition successfully into adulthood by expanding access to education, providing psychosocial support and life-skills development, and creating pathways for vocational training and meaningful economic participation. We deliberately pursue alternative learning pathways that empower and prepare young people for the future workforce and self-sustenance.
                  </p>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-150 space-y-1.5 text-xs">
                  <span className="font-bold text-[#111111] text-[9px] uppercase tracking-wider block font-sans">Empowerment Actions:</span>
                  <div className="space-y-1 text-gray-600 font-sans text-[11px] leading-snug">
                    <div>● Transition successfully to adulthood</div>
                    <div>● Health, life-skills and mental support</div>
                    <div>● Pathways to vocational training</div>
                    <div>● Workforce sustenance tutoring</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openJobs("youth_coordinator")}
                  className="px-3 py-1.5 bg-[#111111] text-white hover:bg-slate-950 font-bold rounded text-[10px] uppercase cursor-pointer"
                >
                  Join Mentors
                </button>
                <button
                  type="button"
                  onClick={() => openDonate()}
                  className="text-[10px] text-[#111111] font-extrabold underline hover:text-[#F5C518]"
                >
                  Fund Vocational Kit
                </button>
              </div>
            </div>

          </div>

          {/* Sub-grid of other Programs */}
          <div className="space-y-6">
            <h4 className="font-sans font-extrabold text-xs text-[#111111] uppercase tracking-widest text-center">
              More Supporting Programs
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Healthcare Outreach", desc: "Setting up sanitary mobile clinics for maternal welfare, pre-natal packs, and clean nutrition tracking.", icon: <HeartPulse className="w-4 h-4 text-[#F5C518]" /> },
                { title: "Sustainable Agriculture", desc: "Bilingual dry-season maize guidebooks and clean high-yield seed distributions to local Plateau unions.", icon: <Sprout className="w-4 h-4 text-[#F5C518]" /> },
                { title: "Youth Advocacy", desc: "Digital capacity skills training, conflict resolution seminars, and enterprise startup kits.", icon: <Users className="w-4 h-4 text-[#F5C518]" /> },
                { title: "Eco-Sustainability", desc: "Tree plantings and erosion safeguards across Jos East & Plateau rural boundaries.", icon: <Leaf className="w-4 h-4 text-[#F5C518]" /> },
              ].map((sub, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-150 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="p-1.5 bg-[#F5C518]/10 rounded w-max">
                      {sub.icon}
                    </div>
                    <h5 className="font-sans font-bold text-xs text-[#111111] uppercase tracking-tight">{sub.title}</h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans">{sub.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats & Real Impact Section integrated within what we do */}
          <div className="bg-[#111111] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden text-center space-y-8 shadow-2xl border border-white/5">
            <div className="absolute inset-0 bg-[#F5C518]/5 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(#F5C518 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            
            <div className="space-y-2 max-w-xl mx-auto relative z-10">
              <span className="text-[9px] font-mono font-bold text-[#F5C518] uppercase tracking-widest inline-block border border-[#F5C518]/25 px-2.5 py-0.5 rounded bg-[#111111]">
                EMPIRICAL VERIFICATION
              </span>
              <h4 className="font-sans font-black text-xl sm:text-2xl text-white tracking-tight leading-none uppercase">
                CHANGING LIVES ACROSS JOS
              </h4>
            </div>

            {/* Stats list */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 relative z-10 pt-4">
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

        </div>
      </section>


      {/* =========================================================
          PILLAR 3 — PROGRAMME UPDATES SECTION (Interactive Feed)
          ========================================================= */}
      <section id="programme-updates" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          
          {/* Header Block and Mindmap context */}
          <div className="space-y-4 max-w-3xl text-left">
            <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest inline-block bg-[#111111] text-white rounded px-2.5 py-1">
              Data-Driven Grassroots Advocacy
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-[#111111] tracking-tight leading-none uppercase">
              Programme Activities & Research
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans max-w-2xl">
              We translate global humanitarian standards into measurable, on-ground outcomes. Switch below to explore GICD’s latest empirical baseline survey findings or search our live field campaign logs.
            </p>
          </div>

          {/* Section Selector Tab Menu */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-y border-stone-200 py-3 gap-4">
            <div className="flex border border-stone-200 p-1 bg-stone-50 rounded-xl relative">
              <button
                type="button"
                onClick={() => setUpdatesActiveTab("survey")}
                className={`py-2 px-4 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  updatesActiveTab === "survey"
                    ? "bg-[#111111] text-[#F5C518] shadow"
                    : "text-gray-500 hover:text-gray-900 bg-transparent"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>📊 Baseline Survey (April 2026)</span>
              </button>
              <button
                type="button"
                onClick={() => setUpdatesActiveTab("feed")}
                className={`py-2 px-4 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  updatesActiveTab === "feed"
                    ? "bg-[#111111] text-[#F5C518] shadow"
                    : "text-gray-500 hover:text-gray-900 bg-transparent"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>📋 Live Activities Feed</span>
              </button>
            </div>

            {/* Render Filters dynamically based on chosen outer tab */}
            {updatesActiveTab === "feed" && (
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 sm:flex-initial">
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={updateSearchQuery}
                    onChange={(e) => setUpdateSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-8 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F5C518] focus:outline-none placeholder-gray-400 font-sans text-gray-750 font-normal"
                  />
                </div>
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 font-sans">
                  {["All", "Education", "Child Protection", "Youth Development"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setUpdateFilter(cat)}
                      className={`px-2.5 py-1 text-[9px] font-extrabold uppercase rounded border tracking-wider transition duration-150 cursor-pointer ${
                        updateFilter === cat
                          ? "bg-[#F5C518] text-[#111111] border-[#F5C518] font-bold"
                          : "border-gray-200 text-gray-500 bg-white hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {updatesActiveTab === "survey" && (
              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-gray-400 block font-bold uppercase tracking-widest">
                  Assessment Focus:
                </span>
                <span className="text-xs font-black text-[#111111] uppercase tracking-tight font-sans">
                  Angwan Rukuba Community, Jos
                </span>
              </div>
            )}
          </div>

          {/* Mode Switch Renderer */}
          {updatesActiveTab === "survey" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left animate-fade-in-up">
              
              {/* Left Column (4/12) - Recreated Report Cover Representation and GICD Dispatch */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Visual Cover Replica */}
                <div className="w-full bg-[#F5C518] border-2 border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow transition duration-200 text-left">
                  <div className="p-6 pb-2 relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center py-1">
                        <GicdLogo variant="badge" theme="dark" height={16} />
                      </div>
                      <span className="font-mono text-[8px] font-bold tracking-widest text-[#111111] bg-white px-2 py-0.5 rounded">
                        OFFICIAL RELEASE
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] font-black uppercase text-gray-900 tracking-widest block font-mono">
                        THE GUARDIAN INITIATIVE FOR COMMUNITY DEVELOPMENT
                      </span>
                      <h4 className="font-sans font-black text-2xl text-[#111111] uppercase leading-none tracking-tight">
                        Child Protection & <br />Adolescence <br />Baseline Survey
                      </h4>
                    </div>
                  </div>
                  
                  {/* Styled middle block representing group photo */}
                  <div className="bg-gradient-to-br from-[#111111] to-[#3a3006] relative h-36 border-y border-[#111111]/10 flex flex-col justify-between p-4 text-white">
                    <div className="absolute inset-0 bg-stone-900/35 mix-blend-multiply" />
                    <div className="relative z-10 flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse shrink-0 mt-0.5" />
                      <p className="text-[10px] text-white/90 leading-snug font-medium font-sans max-w-xs">
                        An empirical study highlighting key protection and school boundaries affecting 54 adolescents in Plateau State.
                      </p>
                    </div>
                    
                    <span className="relative z-10 block w-full py-1 text-center bg-cyan-700 text-white font-black text-[9px] uppercase tracking-wider rounded-md font-sans border border-cyan-600">
                      A community-level child protection assessment
                    </span>
                  </div>

                  <div className="bg-stone-950 p-4 text-white flex items-center justify-between text-[10px] font-mono">
                    <span className="text-stone-400 font-bold">April 2026</span>
                    <span className="text-[#F5C518] hover:underline cursor-pointer select-none font-black tracking-tighter">www.thegicd.com</span>
                  </div>
                </div>

                {/* Facebook Dispatch Box representation */}
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#111111] rounded-full flex items-center justify-center p-1 text-[#F5C518]">
                      <GicdLogo variant="badge" theme="dark" height={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-sans font-black text-xs text-stone-900 uppercase tracking-tight">
                          GICD Nigeria
                        </span>
                        <div className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center p-0.5 text-[8px] font-bold">✓</div>
                      </div>
                      <span className="text-[9px] text-stone-400 font-mono tracking-tight block">
                        Published Official Broadcast
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 font-sans text-stone-750 text-xs leading-relaxed">
                    <div className="p-2.5 bg-red-50 border-l-4 border-red-500 rounded-r-md">
                      <h5 className="font-black text-red-900 font-sans text-[11px] uppercase tracking-wide">
                        New Evidence on Child Protection Risks
                      </h5>
                    </div>
                    
                    <p className="font-medium text-stone-700">
                      The Guardian Initiative for Community Development (GICD) has released findings from our recent child-focused survey, highlighting critical protection and development gaps affecting children in Angwan Rukuba.
                    </p>

                    <div className="bg-stone-50 p-3 rounded-lg border border-stone-150 space-y-1 text-[11px]">
                      <div className="flex items-center gap-1.5"><span className="text-red-500 font-bold">•</span><span><strong>96.9%</strong> face at least one active protection risk</span></div>
                      <div className="flex items-center gap-1.5"><span className="text-red-500 font-bold">•</span><span><strong>65.6%</strong> experience physical violence</span></div>
                      <div className="flex items-center gap-1.5"><span className="text-red-500 font-bold">•</span><span>Only <strong>1 in 6</strong> children can access institutional protection</span></div>
                      <div className="flex items-center gap-1.5"><span className="text-yellow-600 font-bold">•</span><span><strong>88%</strong> of children want to attend school, yet access remains constrained</span></div>
                    </div>

                    <p className="text-stone-600 text-[11px]">
                      These findings point to a high-acuity environment where risks are widespread, reporting systems are weak, and access to essential services is limited despite strong positive aspirations by children in Plateau.
                    </p>

                    <div className="text-[10px] text-blue-600 font-medium tracking-tight">
                      #ChildProtection #DataForDevelopment #NGO #SocialImpact #Safeguarding #EducationAccess #Partnerships
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                    <span>👍 412 Likes</span>
                    <span>💬 84 Comments</span>
                  </div>
                </div>

              </div>
              
              {/* Right Column (8/12) - Interactive Data Explorers */}
              <div className="lg:col-span-8 bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
                
                {/* Sub Tab Navigation */}
                <div className="flex flex-wrap gap-1.5 border-b border-stone-200 pb-3">
                  {[
                    { id: "narrative", label: "0. Foreword & Demographics", icon: <Info className="w-3.5 h-3.5" /> },
                    { id: "overview", label: "1. Executive KPI Dashboard", icon: <Award className="w-3.5 h-3.5" /> },
                    { id: "risks", label: "2. CP Risks & GBV Danger", icon: <AlertCircle className="w-3.5 h-3.5" /> },
                    { id: "education", label: "3. Out-Of-School Barriers", icon: <GraduationCap className="w-3.5 h-3.5" /> },
                    { id: "support", label: "4. Trusted Networks", icon: <Users className="w-3.5 h-3.5" /> }
                  ].map((subtab) => (
                    <button
                      key={subtab.id}
                      type="button"
                      onClick={() => setSurveyReportActiveTab(subtab.id as any)}
                      className={`px-3 py-1.5 text-[10px] font-extrabold uppercase rounded-lg tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        surveyReportActiveTab === subtab.id
                          ? "bg-[#111111] text-white"
                          : "text-stone-500 hover:text-stone-900 hover:bg-stone-200/50"
                      }`}
                    >
                      {subtab.icon}
                      <span>{subtab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab display pane */}
                <div>
                  
                  {/* Narrative Profile View */}
                  {surveyReportActiveTab === "narrative" && (
                    <div className="space-y-6 animate-fade-in text-stone-750">
                      <div className="space-y-3">
                        <h4 className="font-sans font-black text-lg text-stone-900 uppercase">
                          Foreword & Operational Context
                        </h4>
                        <p className="text-xs sm:text-xs leading-relaxed text-stone-600">
                          This report presents the findings of GICD's inaugural child protection and adolescent life skills survey, administered to <strong>54 enrolled adolescents</strong> within GICD's custom Lifeskills program in Angwan Rukuba, Jos, Plateau State. With <strong>32 completed responses</strong> (59.3% rate), this assessment highlights severe safety indices while offering empirical proof to validate our localized hybrid support modeling.
                        </p>
                        <p className="text-xs sm:text-xs leading-relaxed text-stone-600 italic border-l-2 border-[#F5C518]/60 pl-3">
                          "Every number in this report represents a real child in Angwan Rukuba community. GICD is actively conducting a targeted follow-up vulnerability assessment for the 22 non-respondents (40.7%) to ensure they represent an immediate operational priority." — GICD Mission Secretariat
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Demographics Profile - Sex & Age */}
                        <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                          <h5 className="text-[10px] font-black uppercase text-stone-900 tracking-wider">
                            Demographic Distribution (n=32)
                          </h5>
                          
                          {/* Sex Split Ratio */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-stone-600">Gender Representation</span>
                              <span className="font-bold text-stone-900">M 56.2% | F 43.8%</span>
                            </div>
                            <div className="w-full h-3.5 bg-stone-100 rounded-lg overflow-hidden flex">
                              <div className="h-full bg-stone-700" style={{ width: "56.2%" }} title="Male" />
                              <div className="h-full bg-[#F5C518]" style={{ width: "43.8%" }} title="Female" />
                            </div>
                            <div className="flex justify-between text-[9px] font-mono text-stone-400">
                              <span>Male (18 boys)</span>
                              <span>Female (14 girls)</span>
                            </div>
                          </div>

                          {/* Age representation */}
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-stone-600">Age Bracket</span>
                              <span className="font-bold text-[#111111]">13-15 years: ~84.4%</span>
                            </div>
                            
                            <div className="space-y-1.5 text-xs">
                              <div>
                                <div className="flex justify-between text-[11px] mb-0.5">
                                  <span>13–15 Years</span>
                                  <span className="font-bold">84.4% (27)</span>
                                </div>
                                <div className="w-full h-1.5 bg-stone-100 rounded-lg progress-bar-wrap">
                                  <div className="h-full bg-[#111111] rounded-lg" style={{ width: "84.4%" }} />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-[11px] mb-0.5">
                                  <span>16–18 Years</span>
                                  <span className="font-bold">15.6% (5)</span>
                                </div>
                                <div className="w-full h-1.5 bg-stone-100 rounded-lg progress-bar-wrap">
                                  <div className="h-full bg-[#F5C518]" style={{ width: "15.6%" }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Household setups */}
                        <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4 text-xs">
                          <h5 className="text-[10px] font-black uppercase text-stone-900 tracking-wider">
                            Household Arrangement (Vulnerability Anchor)
                          </h5>

                          <div className="space-y-2">
                            {[
                              { label: "Both biological parents", rate: "56.2%", count: "18 children", color: "bg-emerald-600" },
                              { label: "Mother only (Single-Parent)", rate: "25.0%", count: "8 children", color: "bg-amber-500" },
                              { label: "Father only", rate: "9.4%", count: "3 children", color: "bg-stone-500" },
                              { label: "Other relatives", rate: "9.4%", count: "3 children", color: "bg-stone-400" }
                            ].map((item, index) => (
                              <div key={index} className="space-y-1 ">
                                <div className="flex items-center justify-between text-[11px]">
                                  <span className="text-gray-600 font-medium">{item.label}</span>
                                  <span className="font-bold text-stone-900">{item.rate} ({item.count})</span>
                                </div>
                                <div className="w-full h-1.5 bg-stone-100 rounded-lg">
                                  <div className={`h-full ${item.color} rounded-lg`} style={{ width: item.rate }} />
                                </div>
                              </div>
                            ))}
                          </div>
                          <span className="text-[9px] text-[#111111] font-mono leading-relaxed block bg-stone-50 p-2 rounded border border-gray-150 mt-1">
                            ⚠️ <strong>43.8% of children surveyed</strong> do not reside with both biological parents, experiencing increased vulnerability risks for labor exploitation and tracking indicators.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Overview KPIs Dashboard */}
                  {surveyReportActiveTab === "overview" && (
                    <div className="space-y-6 animate-fade-in text-stone-950">
                      <div className="space-y-1">
                        <h4 className="font-sans font-black text-lg text-stone-900 uppercase">
                          Executive Dashboard Indicators
                        </h4>
                        <p className="text-xs text-stone-500">
                          Empirical values representing critical needs and development baselines in Angwan Rukuba.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { val: "96.9%", label: "Protection Risk Exposure", status: "CRITICAL", desc: "Only 1 surveyed child (3.1%) faces zero protection risks.", color: "border-red-500", textBG: "bg-red-50 text-red-700" },
                          { val: "53.1%", label: "Out-Of-School Rate", status: "CRITICAL", desc: "Structural educational abandonment affects over half of children.", color: "border-red-500", textBG: "bg-red-50 text-red-700" },
                          { val: "65.6%", label: "Physical Violence Exposure", status: "IMMEDIATE NEED", desc: "Widespread exposure to abuse within immediate surroundings.", color: "border-red-500", textBG: "bg-red-50 text-red-700" },
                          { val: "43.8%", label: "Labour & Income Pressure", status: "HIGH RISK", desc: "Children engage in labor to subsidize minimal family survival.", color: "border-amber-500", textBG: "bg-amber-50 text-amber-800" },
                          { val: "81.3%", label: "Services Awareness Gap", status: "CRITICAL GAP", desc: "Unawareness of helplines or child-safe protective groups.", color: "border-red-500", textBG: "bg-red-50 text-red-700" },
                          { val: "87.5%", label: "Aspiration to Learn", status: "STRONG SIGNAL", desc: "Children who would attend immediately if fees/materials are subsidized.", color: "border-emerald-500", textBG: "bg-emerald-50 text-emerald-800" }
                        ].map((kpi, idx) => (
                          <div key={idx} className={`bg-white rounded-xl border-l-4 ${kpi.color} p-4 flex flex-col justify-between shadow-xs border border-stone-200/50`}>
                            <div className="space-y-2">
                              <span className={`px-2 py-0.5 rounded font-mono font-bold text-[8px] tracking-wide inline-block ${kpi.textBG}`}>
                                {kpi.status}
                              </span>
                              <h5 className="font-sans font-black text-2xl text-stone-900 leading-none">{kpi.val}</h5>
                              <p className="font-sans font-black text-[10px] text-stone-800 uppercase tracking-tight">{kpi.label}</p>
                            </div>
                            <p className="text-[10px] text-stone-400 mt-2 font-sans leading-relaxed">{kpi.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Child Protection Dangers */}
                  {surveyReportActiveTab === "risks" && (
                    <div className="space-y-6 animate-fade-in text-stone-750">
                      <div className="space-y-2">
                        <h4 className="font-sans font-black text-lg text-stone-900 uppercase">
                          Child Protection Risk prevalence
                        </h4>
                        <p className="text-xs text-stone-600">
                          Prevalence rates of active security, community violence, and domestic exposure threats faced by children in Angwan Rukuba.
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                        {[
                          { name: "Physical Violence Exposure", rate: 65.6, color: "bg-red-600", note: "Immediate need for trauma mitigation and school shelter safe-spaces." },
                          { name: "Kidnapping / Abduction danger", rate: 34.4, color: "bg-orange-500", note: "Reflects macro-level regional insecurity inside Plateau State." },
                          { name: "Peer Gang Involvement", rate: 31.3, color: "bg-amber-500", note: "Driven by absence of mentorship systems and school enrollment." },
                          { name: "Sexual Violence / GBV", rate: 31.3, color: "bg-red-500", note: "GBV Alert: Disproportionally affect girls; requires targeted safe spaces and crisis counselor routing." },
                          { name: "Unsafe Community Areas", rate: 25.0, color: "bg-stone-500", note: "Unregulated localized industrial environments." },
                          { name: "Child Marriage threat", rate: 18.8, color: "bg-stone-600", note: "Practiced as family survival resource strategy; offset by scholarships." }
                        ].map((item, idx) => (
                          <div key={idx} className="space-y-1.5 ">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#111111] uppercase tracking-tight text-[11px]">{item.name}</span>
                              <span className="font-mono font-bold text-red-600">{item.rate}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-stone-100 rounded-lg overflow-hidden">
                              <div className={`h-full ${item.color} rounded-lg`} style={{ width: `${item.rate}%` }} />
                            </div>
                            <p className="text-[10px] text-stone-400 font-sans">{item.note}</p>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl text-xs text-orange-900 flex gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Plateau Insecurity Alignment:</strong> The 34.4% kidnapping threat reflects active socio-communal realities in key Plateau LGAs. Local protection frameworks must incorporate safe-school protocols, emergency alert chains, and close alignment with traditional village chiefs.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Out of school barriers & labor */}
                  {surveyReportActiveTab === "education" && (
                    <div className="space-y-6 animate-fade-in text-stone-750">
                      <div className="space-y-2">
                        <h4 className="font-sans font-black text-lg text-stone-900 uppercase">
                          The Out-Of-School Crisis & Forced Labor
                        </h4>
                        <p className="text-xs text-stone-600">
                          The critical educational gap is structural/economic, not motivational. Out of 32 children, 53.1% are out of school, yet 87.5% would resume immediately if barriers are lifted.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Cost barriers list */}
                        <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                          <h5 className="text-[10px] font-black uppercase text-stone-900 tracking-wider">
                            Primary Barriers to enrollment (n=17)
                          </h5>

                          <div className="space-y-3 text-xs">
                            <div>
                              <div className="flex justify-between mb-0.5">
                                <span>Direct school fee costs</span>
                                <span className="font-bold">56.2%</span>
                              </div>
                              <div className="w-full h-1.5 bg-stone-100 rounded">
                                <div className="h-full bg-[#111111]" style={{ width: "56.2%" }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-0.5">
                                <span>No books / supplies / uniforms</span>
                                <span className="font-bold">25.0%</span>
                              </div>
                              <div className="w-full h-1.5 bg-stone-100 rounded">
                                <div className="h-full bg-stone-600" style={{ width: "25%" }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-0.5">
                                <span>Family reliance on child's labor</span>
                                <span className="font-bold">12.5%</span>
                              </div>
                              <div className="w-full h-1.5 bg-stone-100 rounded">
                                <div className="h-full bg-stone-400" style={{ width: "12.5%" }} />
                              </div>
                            </div>
                          </div>

                          <p className="text-[10px] text-stone-400 font-sans leading-relaxed">
                            💡 Overwhelming evidence: Funding 100% direct scholarship packages (school fees, standard uniforms, writing pads, and footwear) directly bypasses the structural blockers keeping children on the streets.
                          </p>
                        </div>

                        {/* Forced Child labor exploitation details */}
                        <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4 text-xs">
                          <h5 className="text-[10px] font-black uppercase text-stone-900 tracking-wider">
                            Child Labour & Wages Utilisation (43.8% working)
                          </h5>

                          <p className="leading-relaxed text-stone-500 text-[11px]">
                            While 43.8% of surveyed children work to earn money, their earnings are fully routed into basic family survival.
                          </p>

                          <div className="space-y-2">
                            {[
                              { label: "Direct personal expenses", rate: "71.4%", color: "bg-stone-800" },
                              { label: "Subsidizing food for the household", rate: "42.9%", color: "bg-amber-600" },
                              { label: "Direct cash handouts to parents", rate: "28.6%", color: "bg-stone-500" },
                              { label: "Wages used for school fees", rate: "0.0% (Zero Children)", color: "bg-red-400" }
                            ].map((item, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-[10px]">
                                  <span>{item.label}</span>
                                  <span className="font-bold">{item.rate}</span>
                                </div>
                                <div className="w-full h-1 bg-stone-100 rounded">
                                  <div className={`h-full ${item.color} rounded`} style={{ width: item.rate.startsWith("0") ? "0%" : item.rate }} />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-2 bg-red-50 text-red-900 font-mono text-[9px] leading-snug rounded uppercase">
                            <strong>System Conclusion:</strong> Not a single working child can save enough to afford school fees. Subsidies are an absolute unmet baseline.
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Trusted Networks & Services Gap */}
                  {surveyReportActiveTab === "support" && (
                    <div className="space-y-6 animate-fade-in text-stone-750">
                      <div className="space-y-2">
                        <h4 className="font-sans font-black text-lg text-stone-900 uppercase">
                          Helpline Gaps & Community trust capital
                        </h4>
                        <p className="text-xs text-stone-600">
                          Investigating who children trust, and how severe the protection service gap is. 
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Alert Circle Gap card */}
                        <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h5 className="text-[10px] font-black uppercase text-stone-900 tracking-wider">
                              Disclosure & Helpline Awareness Gap
                            </h5>
                            
                            <div className="flex items-center gap-4 py-2">
                              <div className="w-14 h-14 rounded-full border-4 border-red-500/20 border-r-red-500 flex items-center justify-center text-red-600 font-bold font-mono text-xs shrink-0">
                                81.3%
                              </div>
                              <span className="text-xs text-stone-600 font-medium leading-relaxed">
                                <strong>81.3% of surveyed children</strong> are not aware of any organization, helpline, or safe desk to report violence, abuse, or safety risks in Jos.
                              </span>
                            </div>
                          </div>

                          <p className="text-[10px] text-stone-400 font-sans leading-relaxed">
                            This protection paradox is stark; 96.9% face active risk, yet 81.3% are blind to available local protection systems. Establishing readable community report systems is an urgent mandate.
                          </p>
                        </div>

                        {/* Trusted Adults List */}
                        <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3 text-xs">
                          <h5 className="text-[10px] font-black uppercase text-stone-900 tracking-wider">
                            Number of children who name group as trusted (n=32)
                          </h5>

                          <div className="space-y-2.5">
                            {[
                              { label: "Parent / Guardian", count: 32, labelCount: "32 (100%)", color: "bg-emerald-600" },
                              { label: "Community Teacher", count: 10, labelCount: "10 (31.2%)", color: "bg-stone-700" },
                              { label: "GICD NGO Staff Member", count: 7, labelCount: "7 (21.9%)", color: "bg-amber-500" },
                              { label: "Community Religious Leader", count: 7, labelCount: "7 (21.9%)", color: "bg-stone-500" },
                              { label: "No trusted adult", count: 0, labelCount: "0 (0.0%)", color: "" }
                            ].map((item, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-[11px]">
                                  <span className="font-semibold text-stone-700">{item.label}</span>
                                  <span className="font-bold text-stone-900">{item.labelCount}</span>
                                </div>
                                <div className="w-full h-1.5 bg-stone-100 rounded">
                                  <div className={`h-full ${item.color} rounded`} style={{ width: `${(item.count/32)*100}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>

                          <p className="text-[10px] text-[#111111] font-sans bg-stone-50 border border-stone-150 p-2.5 rounded-lg leading-relaxed">
                            💎 <strong>GICD Impact Validation:</strong> Within just a short term on-ground, 21.9% of children already identify GICD staff as a trusted reference. This proves our community integration model has achieved deep localized trust.
                          </p>
                        </div>

                      </div>
                    </div>
                  )}

                </div>

                {/* Call to action for donor or partner to view full report */}
                <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left space-y-0.5">
                    <span className="text-[9px] text-[#F5C518] uppercase tracking-widest block font-black bg-[#111111] w-max px-2 py-0.5 rounded font-mono">
                      Next Milestones:
                    </span>
                    <p className="text-xs text-stone-500 font-sans max-w-md font-medium">
                      Establishing Angwan Rukuba Child Friendly Space, subsidizing tuition for 54 enrolled adolescents, and setting up localized reporting desks.
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openPartner()}
                      className="px-4 py-2 border border-stone-200 hover:bg-[#111111] hover:text-white rounded-lg text-xs uppercase font-extrabold cursor-pointer transition"
                    >
                      Receive Full PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => openDonate()}
                      className="px-4 py-2 bg-[#F5C518] hover:bg-[#F5C518]/90 text-[#111111] rounded-lg text-xs uppercase font-black tracking-wider cursor-pointer shadow-xs transition"
                    >
                      Fund protection kit
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            // Render Live activities feed Grid
            <div className="space-y-10 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
                {[
                  { 
                    id: "act0", 
                    title: "Caregivers Symposium & Mental Support Circle", 
                    tag: "Child Protection", 
                    date: "May 16, 2026", 
                    details: "Every caregivers meeting is a step closer to achieving stronger families. Today's meeting saw GICD organize regular caregiver forums constructively reviewing personal concerns. Unlike previous meetings centered on parent shortcomings, this session experienced an unexpected expression of vulnerability-in-trust. Discussions expanded beyond missing responsibilities to underlying factors, including the loss of spouses and single parenting burdens (most are single mothers, widows, and grandparents). Shared communal experiences immediately sparked empathy, connection, and collaborative action for supportive home environments.", 
                    loc: "Angwan Rukuba Community, Jos",
                    images: [
                      "/src/assets/images/caregivers_meeting_symposium_1779357789025.png",
                      "/src/assets/images/caregivers_sharing_support_1779357808644.png"
                    ],
                    subtitles: [
                      "Caregivers gathering for joint planning",
                      "Caregiver active emotional sharing"
                    ]
                  },
                  { id: "act1", title: "School Uniform & Sandals Distribution", tag: "Education", date: "May 12, 2026", details: "Supplied writing boards, custom canvas bags, uniforms, and sandals to children from 4 local primary clusters in Jos North.", loc: "Jos North, Plateau State" },
                  { 
                    id: "act_may_1", 
                    title: "Interreligious Life Skills & Peer Coexistence Forum", 
                    tag: "Youth Development", 
                    date: "May 01, 2026", 
                    details: "Today was yet another impactful Life Skills session in Chwelnyap-Angwan Rukuba. What made it especially remarkable is Muslim and Christian children coming together, working as a team, navigating complex tasks, and growing side by side. These young people are not just learning social skills, they are demonstrating tolerance, coexistence, and resilience. With support from the Plateau State Ministry of Education, our Life Skills Program now reaches both in-school and out-of-school children, increasing motivation to learning, school enrollment, and access to relevant services.", 
                    loc: "Chwelnyap-Angwan Rukuba, Jos",
                    images: [
                      "/src/assets/images/youth_team_coexistence_workshop_1779358008348.png",
                      "/src/assets/images/adolescents_collaboration_board_1779358032317.png"
                    ],
                    subtitles: [
                      "Adolescent girls representing interreligious community unity",
                      "Youth peer teams cooperating in schoolyard workshop sessions"
                    ]
                  },
                  { id: "act2", title: "Safeguarding Seminar for Rural educators", tag: "Child Protection", date: "Apr 19, 2026", details: "Conducted child safeguarding protocols training for 45 community teachers under CAC-approved guides, addressing mental health safety.", loc: "Mangu LGA, Plateau State" },
                  { id: "act3", title: "Youth Vocational Training Launch", tag: "Youth Development", date: "Mar 28, 2026", details: "Equipped adolescents and young people with vocational materials, life-skills mentoring, and digital literacy tools to transition successfully into self-sustenance.", loc: "Jos South LGA, Plateau" },
                  { id: "act4", title: "Adolescent Life-Skills Mentorship", tag: "Youth Development", date: "Feb 15, 2026", details: "Conducted psychosocial support workshops and alternative learning pathway seminars to inspire and guide secondary students.", loc: "Riyom LGA, Plateau State" }
                ].filter(act => {
                  const matchesCat = updateFilter === "All" || act.tag === updateFilter;
                  const matchesQuery = act.title.toLowerCase().includes(updateSearchQuery.toLowerCase()) || act.details.toLowerCase().includes(updateSearchQuery.toLowerCase());
                  return matchesCat && matchesQuery;
                }).map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-stone-50 border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-[#F5C518] transition text-left"
                  >
                    {item.images && item.images.length > 0 && (
                      <div className="h-40 overflow-hidden relative border-b border-stone-200 bg-stone-100">
                        <img 
                          src={item.images[0]} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#111111] text-[#F5C518] font-bold text-[8px] uppercase tracking-wider rounded">
                          Featured Photo
                        </span>
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[9px] font-mono font-bold">
                          <span className="px-2 py-0.5 bg-white text-gray-800 rounded border border-gray-150">{item.tag}</span>
                          <span className="text-gray-400">{item.date}</span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-sans font-bold text-sm text-[#111111] group-hover:text-[#F5C518] transition duration-200 uppercase line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-mono tracking-tight flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#F5C518] shrink-0" /> {item.loc}
                          </p>
                        </div>

                        <p className="text-xs text-gray-550 leading-relaxed font-sans line-clamp-4">
                          {item.details}
                        </p>
                      </div>

                      <div className="pt-4 mt-6 border-t border-stone-200">
                        <button
                          type="button"
                          onClick={() => setSelectedUpdate(item)}
                          className="text-[10px] uppercase font-bold tracking-wider text-[#111111] flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>Read campaign logs</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

          {/* Interactive Modal for Selected Update */}
          {selectedUpdate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="update-details-modal">
              <div className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 space-y-4 font-sans max-h-[90vh] overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setSelectedUpdate(null)}
                  className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition text-gray-500 cursor-pointer z-10"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2">
                  <span className="px-2 py-0.5 bg-amber-50 text-[#F5C518] text-[9px] uppercase font-bold rounded border border-[#F5C518]/20">{selectedUpdate.tag}</span>
                  <p className="text-[10px] text-gray-400 block font-mono">{selectedUpdate.date} — {selectedUpdate.loc}</p>
                  <h4 className="font-sans font-black text-lg text-[#111111] uppercase leading-tight">{selectedUpdate.title}</h4>
                </div>

                {selectedUpdate.images && selectedUpdate.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {selectedUpdate.images.map((imgUrl: string, imgIdx: number) => (
                      <div key={imgIdx} className="space-y-1">
                        <div className="h-32 rounded-lg overflow-hidden border border-stone-200 bg-stone-50">
                          <img 
                            src={imgUrl} 
                            alt={selectedUpdate.subtitles?.[imgIdx] || selectedUpdate.title}
                            className="w-full h-full object-cover hover:scale-105 transition duration-350"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="text-[9px] font-medium text-stone-500 italic block leading-snug">
                          {selectedUpdate.subtitles?.[imgIdx]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-650 leading-relaxed">
                  {selectedUpdate.details} This program activity is part of our standard on-ground village deployment framework. GICD does not make use of regional intermediaries; instead, our working team handles 100% of material tracking, verified directly by our Board of Trustees during quarterly compliance cycles in Jos.
                </p>

                <div className="p-3.5 bg-yellow-50 rounded-xl border border-yellow-100 text-xs text-gray-750 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#F5C518] shrink-0" />
                  <span>Verified with audited photographic logs on our ledger records.</span>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUpdate(null);
                      openDonate();
                    }}
                    className="w-full py-2 bg-[#F5C518] hover:bg-[#F5C518]/90 text-brand-black font-extrabold text-[#111111] text-xs rounded-lg uppercase tracking-wider"
                  >
                    Donate to similar Campaign
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Core Media Gallery Area (Proof of Real Activities) */}
          <div className="pt-10 border-t border-gray-100 space-y-6 text-center">
            <div className="space-y-2">
              <h3 className="font-sans font-black text-xl text-[#111111] uppercase">Campaign Media Tray</h3>
              <p className="text-xs text-gray-550 max-w-xs mx-auto">Click on any high-resolution campaign banner to view real-life grassroots action.</p>
            </div>

            {/* Gallery tags */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 max-w-md mx-auto">
              {["All", "Education", "Healthcare", "Environment", "Economic"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat === "Healthcare" ? "Healthcare Outreach" : cat === "Economic" ? "Economic Empowerment" : cat)}
                  className={`px-3 py-1 text-[9px] font-bold uppercase rounded border tracking-wider transition-all duration-150 cursor-pointer ${
                    (galleryFilter === "Healthcare Outreach" && cat === "Healthcare") ||
                    (galleryFilter === "Economic Empowerment" && cat === "Economic") ||
                    galleryFilter === cat
                      ? "bg-[#F5C518] text-[#111111] border-[#F5C518]"
                      : "border-gray-200 text-gray-400 bg-white hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery items list */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
              {GALLERY_DATA.filter((item) => galleryFilter === "All" || item.category === galleryFilter).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedGalleryItem(item)}
                  className="group relative h-28 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition border border-gray-150 flex flex-col justify-between p-3.5"
                  style={{ background: item.gradient || "linear-gradient(135deg, #111 0%, #333 100%)" }}
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-[10px] shrink-0 self-end">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[8px] tracking-wider uppercase font-mono text-white/70 block">{item.category}</span>
                    <h5 className="text-[9px] font-sans font-extrabold text-white uppercase leading-snug line-clamp-2 mt-0.5">{item.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
      {/* =========================================================
          PILLAR 4 — RESOURCES CENTER (Technical Handbooks & Integrity Reports)
          ========================================================= */}
      <section id="resources" className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 relative">
          
          {/* Section Heading */}
          <div className="space-y-3 max-w-2xl mx-auto text-center">
            <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest inline-block bg-white rounded pl-2 border-l-4 border-[#F5C518] py-1 px-3">
              Resource Center
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none uppercase">
              Technical Documents & Reports
            </h2>
            <p className="text-xs sm:text-sm text-gray-550 font-sans max-w-md mx-auto text-center">
              Access our public financial statements, environmental risk assessments, and technical facilitator guides.
            </p>
          </div>

          {/* Left Column: Handbooks / Right Column: Public Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Column 1: Technical Handbooks */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Compass className="w-5 h-5 text-[#F5C518]" />
                <h3 className="font-sans font-black text-sm text-brand-black uppercase">
                  Technical Facilitator Manuals
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  { id: "res1", title: "Joint West Africa Child Safeguarding Policy Guidelines", details: "Official, legal-certified 42-page guidance outlining safe shelters and reporting structures.", format: "PDF Manual" },
                  { id: "res2", title: "Community Teacher empowerment Module Book One", details: "Curriculum handbook used to retrain rural instructors across Plateau State schools.", format: "PDF Handbook" },
                  { id: "res3", title: "Dry-Season High-Yield Agronomy Maize handbook", details: "Bilingual English-Hausa handbook detailing crop hydration schedules.", format: "PDF Toolkit" }
                ].map((doc) => (
                  <div key={doc.id} className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-4 font-sans text-left text-left">
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono uppercase bg-white px-1.5 py-0.5 rounded border border-gray-150 text-gray-500 font-bold">{doc.format}</span>
                      <h4 className="font-sans font-extrabold text-xs text-[#111111] uppercase leading-tight">{doc.title}</h4>
                      <p className="text-[10px] text-gray-400 font-sans leading-relaxed">{doc.details}</p>
                    </div>

                    <button
                      onClick={() => {
                        setDownloadingResourceId(doc.id);
                        setTimeout(() => {
                          setDownloadingResourceId(null);
                          setToastMessage(`Downloaded ${doc.title}.pdf`);
                          setTimeout(() => setToastMessage(null), 3000);
                        }, 1200);
                      }}
                      className="p-2 bg-[#111111] text-[#F5C518] hover:bg-slate-900 rounded-lg shrink-0 cursor-pointer disabled:opacity-40"
                      disabled={downloadingResourceId !== null}
                    >
                      {downloadingResourceId === doc.id ? (
                        <Clock className="w-4 h-4 animate-spin text-[#F5C518]" />
                      ) : (
                        <Award className="w-4 h-4 text-[#F5C518]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Public Compliance Reports */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6 font-sans text-left">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100 font-sans">
                <CheckCircle2 className="w-5 h-5 text-[#F5C518]" />
                <h3 className="font-sans font-black text-sm text-[#111111] uppercase">
                  Audits, Charters & Assessments
                </h3>
              </div>

              <div className="space-y-4 font-sans text-left">
                {[
                  { id: "res4", title: "GICD 2025 Annual Financial stewardship Statement", details: "Audited financial breakdown of direct aid flows, certified by certified external public auditors.", format: "Audited Report" },
                  { id: "res5", title: "Plateau State Rural Needs Assessment 2026", details: "Our survey identifying water supply gaps and school abandonments across rural districts.", format: "Field Assessment" },
                  { id: "res6", title: "Joint CAC Anti-Corruption Covenant Certification", details: "Anti-corruption agreement and compliance certificate of the Executive Directorate.", format: "Official Charter" }
                ].map((doc) => (
                  <div key={doc.id} className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-4 font-sans text-left">
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono uppercase bg-white px-1.5 py-0.5 rounded border border-gray-150 text-gray-500 font-bold">{doc.format}</span>
                      <h4 className="font-sans font-extrabold text-xs text-[#111111] uppercase leading-tight">{doc.title}</h4>
                      <p className="text-[10px] text-gray-400 font-sans leading-relaxed">{doc.details}</p>
                    </div>

                    <button
                      onClick={() => {
                        setDownloadingResourceId(doc.id);
                        setTimeout(() => {
                          setDownloadingResourceId(null);
                          setToastMessage(`Downloaded ${doc.title}.pdf`);
                          setTimeout(() => setToastMessage(null), 3000);
                        }, 1200);
                      }}
                      className="p-2 bg-[#111111] text-[#F5C518] hover:bg-slate-900 rounded-lg shrink-0 cursor-pointer disabled:opacity-40"
                      disabled={downloadingResourceId !== null}
                    >
                      {downloadingResourceId === doc.id ? (
                        <Clock className="w-4 h-4 animate-spin text-[#F5C518]" />
                      ) : (
                        <Award className="w-4 h-4 text-[#F5C518]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Toast Notification for simulating resource download success */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-6 right-6 bg-[#111111] border border-[#F5C518] text-white text-xs px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2.5 z-50 font-mono"
              >
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-[8px]">
                  ✓
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase tracking-wide font-medium">Secure Delivery</span>
                  <span>{toastMessage} saved successfully.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>


      {/* =========================================================
          PILLAR 5 — WORK WITH US SECTION (Volunteering, Donation, Partners & Careers)
          ========================================================= */}
      <section id="work-with-us" className="py-20 bg-white border-b border-gray-100 font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          
          {/* Section Heading */}
          <div className="space-y-3 max-w-2xl mx-auto text-center">
            <span className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest inline-block bg-gray-50 rounded pl-2 border-l-4 border-[#F5C518] py-1 px-3 font-sans">
              Work With Us
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none uppercase">
              Join Our Frontiers
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans max-w-md mx-auto text-center">
              Empower our collective. Whether by financial support, local volunteering, high-impact CSR funding, or a dedicated career desk position.
            </p>
          </div>

          {/* Interactive Multi-stream Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans text-left">
            
            {/* Bento Block A: Secure Donation */}
            <div className="lg:col-span-4 bg-[#111111] text-white p-8 rounded-2xl flex flex-col justify-between border border-white/5 shadow-xl">
              <div className="space-y-4">
                <Heart className="w-8 h-8 text-[#F5C518] fill-[#F5C518] animate-pulse" />
                <h3 className="font-sans font-bold text-lg text-[#F5C518] uppercase tracking-tight">Direct Donation</h3>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  Support GICD with secure direct funds. 100% of your funds purchase direct materials (textbooks, uniforms, shelters) immediately without intermediate administration fees.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => openDonate()}
                  className="w-full py-2.5 bg-[#F5C518] hover:bg-yellow-400 text-[#111111] font-extrabold text-xs rounded-lg uppercase tracking-wider cursor-pointer transition text-center"
                >
                  Configure Donation Portal (₦)
                </button>
              </div>
            </div>

            {/* Bento Block B: Partnerships & Ministries */}
            <div className="lg:col-span-4 bg-stone-50 border border-stone-200 p-8 rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <Users className="w-8 h-8 text-[#111111]" />
                <h3 className="font-sans font-bold text-lg text-[#111111] uppercase tracking-tight">Village & CSR Partnership</h3>
                <p className="text-xs leading-relaxed font-sans text-gray-500">
                  GICD works with ministries, international donors, and private trusts to establish schools or run healthcare interventions in Jos communities.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => openPartner()}
                  className="w-full py-2.5 bg-[#111111] text-[#F5C518] hover:bg-[#111111]/90 font-extrabold text-xs rounded-lg uppercase tracking-wider cursor-pointer transition text-center"
                >
                  Submit CSR Partnership
                </button>
              </div>
            </div>

            {/* Bento Block C: Volunteering */}
            <div className="lg:col-span-4 bg-stone-50 border border-stone-200 p-8 rounded-2xl flex flex-col justify-between text-left">
              <div className="space-y-4">
                <Compass className="w-8 h-8 text-[#111111]" />
                <h3 className="font-sans font-bold text-lg text-[#111111] uppercase tracking-tight">Field Volunteering</h3>
                <p className="text-xs leading-relaxed font-sans text-gray-500 font-medium">
                  No experience is required. Register as an on-ground field team worker assisting GICD during campaign distributions and clean-ups.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => openVolunteer()}
                  className="w-full py-2.5 bg-[#111111] text-[#F5C518] hover:bg-[#111111]/90 font-extrabold text-xs rounded-lg uppercase tracking-wider cursor-pointer transition text-center"
                >
                  Register As Volunteer
                </button>
              </div>
            </div>

          </div>

          {/* Open Careers Vacancy Board (Fulfils "Jobs" node of mindmap) */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-[#F5C518]/25 p-6 sm:p-10 rounded-2xl space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#F5C518]/20">
              <div className="space-y-1">
                <span className="px-2 py-0.5 bg-[#111111] text-[#F5C518] font-bold text-[8px] uppercase rounded tracking-wider font-mono">recruitments open</span>
                <h3 className="font-sans font-black text-xl text-brand-black uppercase tracking-tight">
                  GICD Career Openings
                </h3>
                <p className="text-xs text-gray-500">Apply for certified grassroots development jobs inside Plateau State.</p>
              </div>

              <div className="text-xs font-mono text-gray-400">
                Latest updates: May 2026
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              {[
                { id: "child_protection", title: "Child Protection Specialist", loc: "Jos HQ, Plateau State", type: "Full-Time", salary: "₦200,000 / mo" },
                { id: "education_facilitator", title: "Education Development Facilitator", loc: "Rural Plateau Districts", type: "Contract", salary: "₦150,000 / mo" },
                { id: "me_specialist", title: "Monitoring & Evaluation Officer", loc: "Jos / Remote Friendly", type: "Part-Time", salary: "₦120,000 / mo" }
              ].map((job) => (
                <div key={job.id} className="bg-white p-5 rounded-xl border border-gray-150 flex flex-col justify-between shadow-sm hover:shadow transition font-sans">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-sans">
                      <span className="text-[8px] font-mono font-bold uppercase bg-stone-100 text-gray-500 px-1.5 py-0.5 rounded">{job.type}</span>
                      <span className="text-[10px] text-gray-500 font-bold font-sans">{job.salary}</span>
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-sans font-extrabold text-xs text-[#111111] uppercase leading-tight">{job.title}</h4>
                      <p className="text-[10px] text-gray-400 tracking-tight font-mono">{job.loc}</p>
                    </div>

                    <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                      Requires deep familiarity with Plateau cultural norms and direct volunteer field logistics.
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-gray-100">
                    <button
                      onClick={() => openJobs(job.id)}
                      className="w-full py-1.5 bg-[#F5C518] hover:bg-[#F5C518]/90 text-[#111111] font-extrabold text-[10px] rounded uppercase tracking-wide transition cursor-pointer text-center"
                    >
                      Apply for role
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted Partners and Allies Row (Proof of Credibility) */}
          <div className="pt-10 border-t border-gray-150 text-center space-y-6">
            <h4 className="font-sans font-extrabold text-xs text-gray-400 uppercase tracking-widest">
              Aligned Ministries & Alliances
            </h4>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-sans">
              {PARTNERS_DATA.map((p, idx) => (
                <div key={idx} className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono font-bold uppercase text-stone-600">
                  {p.name} ({p.initials})
                </div>
              ))}
            </div>
          </div>

          {/* Beneficiary Testimonials Area (Voices of Plateau State) */}
          <div className="pt-10 border-t border-gray-150 text-center space-y-8">
            <div className="space-y-2">
              <h3 className="font-sans font-black text-xl text-brand-black uppercase animate-fade-in">
                Voices of Plateau Beneficiaries
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto font-sans leading-relaxed text-center">
                Read direct statements from families and partners who experience GICD's integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left font-sans">
              {TESTIMONIALS_DATA.map((test) => (
                <div key={test.id} className="bg-stone-50 border border-stone-200 p-5 rounded-xl flex flex-col justify-between relative shadow-sm">
                  <div className="space-y-4">
                    <div className="w-5 h-5 text-[#F5C518]/25 fill-[#F5C518]/10 text-left">
                      <Quote className="w-5 h-5 text-[#F5C518]" />
                    </div>
                    <p className="text-xs text-gray-655 leading-relaxed font-sans italic text-left">
                      &quot;{test.quote}&quot;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200 text-left">
                    <h5 className="font-sans font-extrabold text-xs text-brand-black uppercase tracking-tight">{test.author}</h5>
                    <p className="text-[10px] text-gray-400 font-sans text-left">{test.role} — <span className="font-mono">{test.location}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Badge Trust Icons */}
          <div className="pt-8 border-t border-[#111111]/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-sans font-extrabold uppercase tracking-wider text-[#111111]/80 font-sans">
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
                  <a href="https://www.facebook.com/share/1BqVaP3TVA/" target="_blank" rel="noreferrer" className="p-2 bg-gray-50 hover:bg-[#F5C518] rounded-full text-gray-500 hover:text-[#111111] transition duration-200" aria-label="GICD Facebook" id="social-fb">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-50 hover:bg-[#F5C518] rounded-full text-gray-500 hover:text-[#111111] transition duration-200" aria-label="GICD Instagram" id="social-ig">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-50 hover:bg-[#F5C518] rounded-full text-gray-500 hover:text-[#111111] transition duration-200" aria-label="GICD Twitter" id="social-tw">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="https://www.linkedin.com/company/thegicd/" target="_blank" rel="noreferrer" className="p-2 bg-gray-50 hover:bg-[#F5C518] rounded-full text-gray-500 hover:text-[#111111] transition duration-200" aria-label="GICD LinkedIn" id="social-li">
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
              <div className="flex items-center pt-1">
                <div className="bg-white px-3.5 py-2 rounded-lg border border-gray-200/40 shadow-sm inline-flex items-center justify-center min-w-[70px]">
                  <GicdLogo variant="full" theme="light" height={20} showSubText={false} />
                </div>
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

              <div className="pt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={openDonate}
                  className="bg-[#F5C518] text-[#111111] text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full cursor-pointer hover:brightness-105 self-start"
                >
                  Direct Support
                </button>
                <div className="flex items-center gap-2 pt-1">
                  <a href="https://www.facebook.com/share/1BqVaP3TVA/" target="_blank" rel="noreferrer" className="p-1.5 bg-white/10 hover:bg-[#F5C518] rounded-full text-white/70 hover:text-[#111111] transition duration-200" aria-label="GICD Facebook" id="footer-social-fb">
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-1.5 bg-white/10 hover:bg-[#F5C518] rounded-full text-white/70 hover:text-[#111111] transition duration-200" aria-label="GICD Instagram" id="footer-social-ig">
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-1.5 bg-white/10 hover:bg-[#F5C518] rounded-full text-white/70 hover:text-[#111111] transition duration-200" aria-label="GICD Twitter" id="footer-social-tw">
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://www.linkedin.com/company/thegicd/" target="_blank" rel="noreferrer" className="p-1.5 bg-white/10 hover:bg-[#F5C518] rounded-full text-white/70 hover:text-[#111111] transition duration-200" aria-label="GICD LinkedIn" id="footer-social-li">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-1.5 bg-white/10 hover:bg-[#F5C518] rounded-full text-white/70 hover:text-[#111111] transition duration-200" aria-label="GICD YouTube" id="footer-social-yt">
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                </div>
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
