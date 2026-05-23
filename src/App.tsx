import React, { useState } from "react";
import { 
  GraduationCap, 
  HeartPulse, 
  Briefcase, 
  Leaf, 
  Users, 
  Sprout, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Youtube, 
  Check, 
  Copy, 
  Heart, 
  ShieldCheck, 
  Award, 
  Mail, 
  Phone, 
  ExternalLink, 
  Menu, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Video, 
  Play, 
  MapPin, 
  Calendar, 
  HelpingHand, 
  Info,
  ChevronRight,
  Sparkles,
  BookOpen,
  Award as AwardIcon
} from "lucide-react";

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
import { GicdLogo } from "./components/GicdLogo";
import { GalleryLightbox } from "./components/GalleryLightbox";
import { 
  DonateModal, 
  VolunteerModal, 
  PartnerModal, 
  JobsModal 
} from "./components/GicdModals";

// Define structured real activity items using the uploaded media files
interface ActivityItem {
  id: string;
  title: string;
  tag: "Coexistence Workshops" | "Caregiver Sessions" | "Education Support" | "Sports & Coexistence Matches" | "Staff Onboarding & Surveys" | "Honors & Certificates";
  date: string;
  details: string;
  loc: string;
  images: string[];
  subtitles: string[];
}

const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: "act-coexist",
    title: "Interreligious Life Skills & Peer Coexistence Forum",
    tag: "Coexistence Workshops",
    date: "May 01, 2026",
    details: "Muslim and Christian children came together working as a single collaborative squad. By navigating community challenge tasks side-by-side, these adolescents demonstrate real tolerance, emotional resilience, and constructive group coexistence. Supported by local stakeholders, the forum establishes reliable peer peacebuilding bonds in Jos.",
    loc: "Chwelnyap-Angwan Rukuba, Jos",
    images: [
      "/asset/tik 1.jpg",
      "/asset/tik 2.jpg",
      "/asset/tik 3.jpg",
      "/asset/tik 4.jpg",
      "/asset/tik 5.jpg",
      "/asset/tik 6.jpg"
    ],
    subtitles: [
      "Interreligious adolescent groups collaborating",
      "Youth core teams navigating joint tasks",
      "Life skills lessons in a bright, sunlit space",
      "Creative card-sorting and coordination exercises",
      "Joyful smiles representing unity in Jos",
      "Group celebration of conflict resolution milestones"
    ]
  },
  {
    id: "act-care",
    title: "Caregiver Dialogues & Household Vulnerability Sessions",
    tag: "Caregiver Sessions",
    date: "May 15, 2026",
    details: "Strong households foster safe communities. Our regular Caregiver Forums provide single mothers, widows, and vulnerable grandparents in Jos North with safe spaces to share psychosocial feedback, learn conflict de-escalation, and coordinate peer support networks.",
    loc: "Angwan Rukuba Community, Jos North",
    images: [
      "/asset/care 1.jpg",
      "/asset/care 2.jpg",
      "/asset/care 3.jpg",
      "/asset/care 4.jpg",
      "/asset/care 5.jpg",
      "/asset/care 6.jpg"
    ],
    subtitles: [
      "Caregivers gathering for joint planning",
      "Co-sharing child protection and home safety strategies",
      "Facilitator-led maternal support circle",
      "Mothers exchanging community action points",
      "Vulnerable household delegates discussing resources",
      "Mutual empowerment and trust-building games"
    ]
  },
  {
    id: "act-orph",
    title: "Education Support, Uniforms & sandals Distribution",
    tag: "Education Support",
    date: "May 12, 2026",
    details: "Ensuring zero educational drop-outs on the Plateau. We provided tailored primary school uniforms, sturdy hand-crafted sandals, custom educational canvas bags, notebooks, and writing materials to vulnerable boys and girls from four cluster communities in Jos.",
    loc: "Jos North Primary Clusters, Plateau State",
    images: [
      "/asset/orph 1.jpg",
      "/asset/orph 2.jpg",
      "/asset/orph 3.jpg",
      "/asset/orph 4.jpg",
      "/asset/orph 5.jpg"
    ],
    subtitles: [
      "Scholars receiving custom uniforms with dignity",
      "Durable shoes and books distributed on the field",
      "Excited elementary students holding writing pads",
      "OVC guardians expressing profound appreciation",
      "Primary children representing broad school enrollment"
    ]
  },
  {
    id: "act-match",
    title: "Peaceful Coexistence Football League & Youth Matches",
    tag: "Sports & Coexistence Matches",
    date: "And April 25, 2026",
    details: "Sports as a universal bridge for youth interaction. GICD coordinated inter-community football matches where Christian and Muslim boys formed integrated teams, fostering sportsmanship and building lasting connections across sectarian margins.",
    loc: "Jos South General Playground, Plateau",
    images: [
      "/asset/match 1.jpg",
      "/asset/match 2.jpg",
      "/asset/match 3.jpg",
      "/asset/match 4.jpg",
      "/asset/match 5.jpg",
      "/asset/match 6.jpg"
    ],
    subtitles: [
      "Christian and Muslim players combining forces",
      "High-energy match action promoting sportsmanship",
      "Unifying community spectators celebrating friendship",
      "Teammates coordinating tactics over the ball",
      "Awarding the solidarity certificate to local youths",
      "Post-match peer handshake representing clean play"
    ]
  },
  {
    id: "act-survey",
    title: "Field Onboarding Clinics & Grassroots Household Surveys",
    tag: "Staff Onboarding & Surveys",
    date: "April 10, 2026",
    details: "Scientific and evidence-driven community action. Our specialized programs team conducted thorough door-to-door welfare audits, community focus-group discussions, and delegate onboarding meetings to identify precise educational and health needs.",
    loc: "Mangu & Riyom LGAs, Plateau State",
    images: [
      "/asset/onboard 1.jpg",
      "/asset/onboard 2.jpg",
      "/asset/survey 1.jpg",
      "/asset/survey 2.jpg"
    ],
    subtitles: [
      "Onboarding community focal points in Riyom",
      "Stakeholder sensitization clinic in Mangu district",
      "Data enumerators auditing local household needs",
      "Direct family interviews for rigorous development data"
    ]
  },
  {
    id: "act-honors",
    title: "Safeguarding Seminar & Volunteer Certification Ceremony",
    tag: "Honors & Certificates",
    date: "March 18, 2026",
    details: "Strengthening community child protection protocols. GICD convened community tutors, neighborhood association leaders, and religious focal points for rigorous safeguarding briefings, culminating in honors presented to GICD support champions.",
    loc: "GICD Head Office conference Hall, Jos",
    images: [
      "/asset/hon 1.jpg",
      "/asset/hon 2.jpg",
      "/asset/hon 3.jpg",
      "/asset/hon 4.jpg"
    ],
    subtitles: [
      "Local tutors engaging during safeguarding lectures",
      "Volunteers receiving formal NGO service certifications",
      "Group photo of certified community tutors and monitors",
      "Honors presented for outstanding field leadership"
    ]
  }
];

// Structural field videos recorded in Jos
interface VideoItem {
  id: string;
  url: string;
  title: string;
  desc: string;
  duration: string;
}

const VIDEOS_DATA: VideoItem[] = [
  { id: "vid1", url: "/asset/vid 1.mp4", title: "Youth Leadership Workshop Highlights", desc: "Peer conflict management and life-skills exercises in Jos North.", duration: "0:45" },
  { id: "vid2", url: "/asset/vid 2.mp4", title: "Caregivers Circle Live Exchange", desc: "In-session sharing of single parenting challenges and community child support.", duration: "1:12" },
  { id: "vid3", url: "/asset/vid 3.mp4", title: "Back-to-School Distribution Joy", desc: "Children holding custom canvas bags, uniforms, and shoes with pride.", duration: "0:56" },
  { id: "vid4", url: "/asset/vid 4.mp4", title: "Coexistence Football Tournament Final", desc: "Youth penalty shootout action representing neighborhood team unity.", duration: "1:04" },
  { id: "vid5", url: "/asset/vid 5.mp4", title: "Stakeholder Assessment Field Dialogue", desc: "Direct feedback session with community elders and GICD directors.", duration: "0:48" }
];

// Helper to map placeholder image paths to high-resolution, relevant context photos
const resolveMedia = (src: string) => {
  const unsplashMapping: Record<string, string> = {
    "/asset/logo.jpg": "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=150", 
    "/asset/cover.jpg": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600", 
    "/asset/1.jpg": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", 
    "/asset/2.jpg": "https://images.unsplash.com/photo-1531983412531-1f49a365f698?auto=format&fit=crop&q=80&w=800", 
    "/asset/3.jpg": "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800", 
  };

  if (unsplashMapping[src]) {
    return unsplashMapping[src];
  }

  const num = parseInt(src.replace(/[^0-9]/g, "")) || 1;

  if (src.includes("tik")) {
    const ids = [
      "photo-1517048676732-d65bc937f952", 
      "photo-1523240795612-9a054b0db644", 
      "photo-1517245386807-bb43f82c33c4", 
      "photo-1544717305-2782549b5136", 
      "photo-1531545514256-b1400bc00f31", 
      "photo-1522202176988-66273c2fd55f", 
      "photo-1509062522246-3755977927d7"
    ];
    return `https://images.unsplash.com/${ids[num % ids.length]}?auto=format&fit=crop&q=80&w=800`;
  }

  if (src.includes("care")) {
    const ids = [
      "photo-1488521787991-ed7bbaae773c", 
      "photo-1509099836639-18ba1795216d", 
      "photo-1531983412531-1f49a365f698", 
      "photo-1513258496099-48168024addd", 
      "photo-1573497019940-1c28c88b4f3e", 
      "photo-1582213782179-e0d53f98f2ca"
    ];
    return `https://images.unsplash.com/${ids[num % ids.length]}?auto=format&fit=crop&q=80&w=800`;
  }

  if (src.includes("orph")) {
    const ids = [
      "photo-1503676260728-1c00da094a0b", 
      "photo-1577896851231-70ef18881754", 
      "photo-1427504494785-3a9ca7044f45", 
      "photo-1544717305-2782549b5136", 
      "photo-1588072405354-bcfa7b5e04a8"
    ];
    return `https://images.unsplash.com/${ids[num % ids.length]}?auto=format&fit=crop&q=80&w=800`;
  }

  if (src.includes("match")) {
    const ids = [
      "photo-1517649763962-0c623066013b", 
      "photo-1516567727145-63b9941a5ca6", 
      "photo-1508098682722-e99c43a406b2", 
      "photo-1544698310-74ea9d1c8258", 
      "photo-1574629810360-7efbbe195018", 
      "photo-1569512441013-057cbcb2f35d"
    ];
    return `https://images.unsplash.com/${ids[num % ids.length]}?auto=format&fit=crop&q=80&w=800`;
  }

  if (src.includes("onboard") || src.includes("survey")) {
    const ids = [
      "photo-1454165804606-c3d57bc86b40", 
      "photo-1551836022-d5d88e9218df", 
      "photo-1531482615713-2afd69097998", 
      "photo-1450133064473-71024230f91b"
    ];
    return `https://images.unsplash.com/${ids[num % ids.length]}?auto=format&fit=crop&q=80&w=800`;
  }

  if (src.includes("hon")) {
    const ids = [
      "photo-1516321318423-f06f85e504b3", 
      "photo-1427504494785-3a9ca7044f45", 
      "photo-1523240795612-9a054b0db644", 
      "photo-1507679799987-c73779587ccf"
    ];
    return `https://images.unsplash.com/${ids[num % ids.length]}?auto=format&fit=crop&q=80&w=800`;
  }

  return src;
};

export default function App() {
  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal control states
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("child_protection");

  // Filter states
  const [activeActivityTag, setActiveActivityTag] = useState<string>("All");
  const [galleryFilter, setGalleryFilter] = useState<string>("All");

  // Interaction Lightboxes
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [expandedImage, setExpandedImage] = useState<{ src: string; caption: string } | null>(null);

  // Quick donation box in Home Hero
  const [quickAmount, setQuickAmount] = useState<string>("10000");

  // Floating Alert Toast for Form submissions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Custom Video Player controls state
  const [activePlayVideo, setActivePlayVideo] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleQuickDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDonateOpen(true);
  };

  const handleActivityClick = (tag: string) => {
    setActiveActivityTag(tag);
  };

  const openDonate = () => setIsDonateOpen(true);
  const openVolunteer = () => setIsVolunteerOpen(true);
  const openPartner = () => setIsPartnerOpen(true);
  
  const openJobs = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsJobsOpen(true);
  };

  const filteredActivities = activeActivityTag === "All" 
    ? ACTIVITIES_DATA 
    : ACTIVITIES_DATA.filter(act => act.tag === activeActivityTag);

  // Lightbox index navigation helper for the Gallery tab
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

  const [contactData, setContactData] = useState({ name: "", email: "", phone: "", message: "" });
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Thank you! Your message has been routed to GICD Relations office in Jos.");
    setContactData({ name: "", email: "", phone: "", message: "" });
  };

  const activityTags = [
    "All", 
    "Coexistence Workshops", 
    "Caregiver Sessions", 
    "Education Support", 
    "Sports & Coexistence Matches", 
    "Staff Onboarding & Surveys", 
    "Honors & Certificates"
  ];

  return (
    <div className="min-h-screen bg-white transition duration-300 relative font-sans flex flex-col antialiased" id="gicd-app-root">
      
      {/* SECTION 1 — TOP HEADER / FLOATING ADVOCACY STRIP */}
      <div className="bg-brand-black text-[#F5C518] text-[11px] font-mono py-2 px-4 flex justify-between items-center z-40 border-b border-gray-900 select-none" id="gicd-top-info-banner">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#F5C518] animate-pulse"></span>
          <span>Plateau CAC Reg NO: CAC/IT/NO/141566</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>Head Office: Rayfield, Jos, Nigeria</span>
          <span>•</span>
          <span>Email: info@gicdnigeria.org</span>
        </div>
      </div>

      {/* SECTION 2 — DOCKABLE NAVIGATION HEADER */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100 shadow-sm px-6 py-3.5 flex justify-between items-center transition duration-200" id="gicd-navbar">
        <a href="#gicd-app-root" className="flex items-center gap-3 active:scale-98 transition">
          <img src={resolveMedia("/asset/logo.jpg")} alt="GICD Logo" className="w-10 h-10 rounded-full bg-slate-50 border border-brand-yellow/30" />
          <div className="flex flex-col text-left">
            <span className="font-sans font-black tracking-tight text-brand-black text-xl leading-none uppercase">GUARDIAN INITIATIVE</span>
            <span className="text-[9px] text-gray-400 font-mono tracking-wide uppercase mt-0.5">FOR COMMUNITY DEVELOPMENT</span>
          </div>
        </a>

        {/* Desktop Menu links */}
        <div className="hidden lg:flex items-center gap-7 text-[#111111] font-sans font-semibold text-xs py-1">
          <a href="#about" className="hover:text-amber-600 transition tracking-wide uppercase">About Us</a>
          <a href="#programs" className="hover:text-amber-600 transition tracking-wide uppercase">Core Programs</a>
          <a href="#activities" className="hover:text-amber-600 transition tracking-wide uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
            <span>Field Activities</span>
          </a>
          <a href="#trustees" className="hover:text-amber-600 transition tracking-wide uppercase">Trustees & Team</a>
          <a href="#video-hub" className="hover:text-amber-600 transition tracking-wide uppercase text-slate-800">Media Center</a>
          <a href="#careers" className="hover:text-amber-600 transition tracking-wide uppercase">Careers</a>
          <a href="#contact" className="hover:text-amber-600 transition tracking-wide uppercase text-slate-500">Contact</a>
        </div>

        {/* Call to action */}
        <div className="hidden sm:flex items-center gap-3">
          <button 
            type="button"
            onClick={openDonate}
            className="px-5 py-2 bg-brand-yellow text-brand-black font-sans font-black text-xs uppercase tracking-wider rounded-full hover:brightness-105 transition active:scale-95 shadow-sm inline-flex items-center gap-1.5"
            id="nav-donate-cta"
          >
            <span>Direct Support</span>
            <Heart className="w-3.5 h-3.5 fill-brand-black" />
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="lg:hidden p-2 rounded-lg text-brand-black hover:bg-gray-100 transition focus:outline-none"
          aria-label="Toggle navigation menu"
          id="nav-mobile-hamburger"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile menu overlay panel */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-150 p-6 flex flex-col gap-4 shadow-xl z-50 lg:hidden animate-fade-in" id="mobile-menu-dropdown">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-black hover:text-amber-600 py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider"
            >
              Who We Are
            </a>
            <a 
              href="#programs" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-black hover:text-amber-600 py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider"
            >
              Core Programs
            </a>
            <a 
              href="#activities" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-black hover:text-amber-600 py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider flex items-center justify-between"
            >
              <span>Field Activities</span>
              <span className="px-2 py-0.5 bg-[#F5C518] text-brand-black text-[9px] font-black rounded">NEW</span>
            </a>
            <a 
              href="#trustees" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-black hover:text-amber-600 py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider"
            >
              Trustees & Team
            </a>
            <a 
              href="#video-hub" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-black hover:text-amber-600 py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider"
            >
              Media Center
            </a>
            <a 
              href="#careers" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-black hover:text-amber-600 py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider"
            >
              Careers
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-black hover:text-amber-600 py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider"
            >
              Contact Office
            </a>

            <div className="grid grid-cols-2 gap-3 pt-3">
              <button 
                onClick={() => { setMobileMenuOpen(false); openDonate(); }}
                className="py-3 bg-brand-yellow text-brand-black font-sans font-black text-xs uppercase tracking-wider rounded-full text-center hover:brightness-105 active:scale-97 flex items-center justify-center gap-1.5"
              >
                <span>Donate</span>
                <Heart className="w-3.5 h-3.5 fill-brand-black" />
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); openVolunteer(); }}
                className="py-3 bg-brand-black text-[#F5C518] font-sans font-black text-xs uppercase tracking-wider rounded-full text-center hover:brightness-110 active:scale-97"
              >
                Volunteer
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* SECTION 3 — HERO STAGE WITH PARALLAX ACTION BACKDROP */}
      <section 
        className="relative min-h-[550px] lg:min-h-[660px] flex items-center bg-brand-black text-white relative select-none"
        id="home-hero"
      >
        {/* Real photo background with subtle dark lens crop */}
        <div className="absolute inset-0 z-0">
          <img 
            src={resolveMedia("/asset/cover.jpg")} 
            alt="GICD Volunteer Field Outreach" 
            className="w-full h-full object-cover object-top opacity-35"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-0 bg-brand-black/45" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 w-full py-20 lg:py-32 text-center flex flex-col items-center justify-center">
          
          <div className="space-y-8 flex flex-col items-center max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5C518]/10 border border-[#F5C518]/30 rounded-full text-[#F5C518] font-mono text-xs tracking-widest uppercase font-black">
              <span className="w-2 h-2 rounded-full bg-[#F5C518] animate-ping"></span>
              Grassroots Impact in Plateau State
            </span>
            
            <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight uppercase font-extrabold text-center">
              Empowering <span className="text-[#F5C518] block mt-1">Plateau Youths & Children</span>
            </h1>
            
            <p className="text-sm sm:text-base text-gray-300 tracking-wide font-sans leading-relaxed text-center max-w-2xl">
              Guardian Initiative for Community Development (GICD) is a frontline NGO in Jos, Nigeria dedicated to sustainable community development, child protection, education, public health, and interreligious youth peacebuilding.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <button
                type="button"
                onClick={openDonate}
                className="px-7 py-3.5 bg-brand-yellow hover:bg-brand-yellow/90 active:scale-95 transition font-sans font-black text-brand-black text-xs uppercase tracking-widest rounded-full shadow-lg cursor-pointer flex items-center gap-2"
                id="hero-donate-btn"
              >
                <span>SUPPORT OUR CAUSE</span>
                <Heart className="w-4 h-4 fill-brand-black" />
              </button>
              
              <button
                type="button"
                onClick={openVolunteer}
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 active:scale-95 transition font-sans font-black text-white text-xs uppercase tracking-widest rounded-full border border-white/20 cursor-pointer flex items-center gap-2"
                id="hero-volunteer-btn"
              >
                <span>JOIN AS A VOLUNTEER</span>
                <HelpingHand className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4 — STAT COUNTERS STRIP */}
      <section className="bg-brand-black py-10 border-y border-gray-900 select-none" id="gicd-quick-impact-stats">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((st) => (
            <StatCounter 
              key={st.id} 
              targetNumber={st.number} 
              suffix={st.suffix} 
              label={st.label} 
            />
          ))}
        </div>
      </section>

      {/* SECTION 5 — CHRONOLOGY & FOCUS VALUES */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7 space-y-8 text-left">
              <div>
                <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black block mb-2">ABOUT US</span>
                <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight leading-tight mb-4">
                  GUARDIAN INITIATIVE FOR <span className="text-brand-yellow block mt-1">COMMUNITY DEVELOPMENT</span>
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
                  <p>
                    The Guardian Initiative for Community Development (GICD) is a child-focused Nigerian charity that responds to and addresses humanitarian and development challenges affecting children. We strengthen protection systems, advance education and youth development, and improve the resilience of households and communities to achieve sustainable outcomes across both humanitarian and development contexts. We operate at the intersection of child protection, socio-economic empowerment, and the translation of global frameworks into meaningful grassroots outcomes.
                  </p>
                </div>
              </div>

              {/* Our Model Callout Block */}
              <div className="p-5 sm:p-6 bg-slate-50 border-l-4 border-brand-yellow rounded-r-2xl space-y-2.5">
                <span className="text-[10px] font-mono text-amber-700 tracking-widest uppercase font-bold block">OUR MODEL</span>
                <h3 className="font-sans font-extrabold text-sm uppercase text-brand-black tracking-tight">
                  Protection through Exposure
                </h3>
                <p className="text-xs text-gray-650 leading-relaxed font-sans">
                  Our work is inspired by a persistent and widening gap; between learning and purpose, and between protection and the lived socio-economic realities of children, particularly in underserved communities. In these environments, curiosity, resilience, and talent often fade quietly, not from lack of potential, but from lack of intentional nurture and meaningful exposure. Young people follow the expected path through school, yet still arrive at adulthood unprepared; not because they failed, but because the system never fully revealed what was possible.
                </p>
                <p className="text-xs text-brand-black font-semibold leading-relaxed font-sans pt-1">
                  We exist to intervene early and deliberately; to safeguard children, equip adolescents, and expand the worldview of young people. We see guided exposure as a form of protection, one that broadens perspective, strengthens decision-making, and inspire dreams.
                </p>
              </div>

              {/* Vision and Mission Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-brand-black to-slate-900 text-white rounded-xl space-y-2 relative overflow-hidden border border-gray-900 shadow-md">
                  <div className="absolute right-0 top-0 w-20 h-20 bg-brand-yellow/5 rounded-full filter blur-xl pointer-events-none" />
                  <div className="flex items-center gap-2 text-brand-yellow">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <h4 className="font-bold text-xs uppercase tracking-wider">VISION</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    A world where the safety of children, the potentials of youth, and the prosperity of communities is a lived reality.
                  </p>
                </div>

                <div className="p-5 bg-gradient-to-br from-brand-black to-slate-900 text-white rounded-xl space-y-2 relative overflow-hidden border border-gray-900 shadow-md">
                  <div className="absolute right-0 top-0 w-20 h-20 bg-brand-yellow/5 rounded-full filter blur-xl pointer-events-none" />
                  <div className="flex items-center gap-2 text-brand-yellow">
                    <Award className="w-4 h-4 shrink-0" />
                    <h4 className="font-bold text-xs uppercase tracking-wider">MISSION</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    To protect children’s rights, drive sustainable development, and build resilient communities through evidence-based approaches.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium action photos layout from the uploaded files */}
            <div className="lg:col-span-5 grid grid-cols-12 gap-4">
              <div className="col-span-7 space-y-4">
                <div 
                  className="h-56 rounded-2xl overflow-hidden shadow-md border border-gray-150 cursor-pointer group relative"
                  onClick={() => setExpandedImage({ src: resolveMedia("/asset/1.jpg"), caption: "GICD fieldwork and adolescent life support forum" })}
                >
                  <img src={resolveMedia("/asset/1.jpg")} alt="Field session" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-left">
                    <span className="text-[10px] text-brand-yellow font-mono block">Field Session</span>
                    <p className="text-[11px] text-white font-semibold line-clamp-1">Peer peacebuilding and coexistence workshops</p>
                  </div>
                </div>

                <div 
                  className="h-44 rounded-2xl overflow-hidden shadow-md border border-gray-150 cursor-pointer group relative"
                  onClick={() => setExpandedImage({ src: resolveMedia("/asset/2.jpg"), caption: "Direct maternal outreach and parent meetings" })}
                >
                  <img src={resolveMedia("/asset/2.jpg")} alt="Staff dialogue" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-left">
                    <span className="text-[10px] text-brand-yellow font-mono block">Outreach</span>
                    <p className="text-[11px] text-white font-semibold line-clamp-1">Direct community engagement meetings</p>
                  </div>
                </div>
              </div>

              <div className="col-span-5 flex flex-col justify-between">
                <div 
                  className="h-44 rounded-2xl overflow-hidden shadow-md border border-gray-150 cursor-pointer group relative"
                  onClick={() => setExpandedImage({ src: resolveMedia("/asset/3.jpg"), caption: "Educator safety and child shielding audits" })}
                >
                  <img src={resolveMedia("/asset/3.jpg")} alt="Children support" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-left">
                    <span className="text-[10px] text-brand-yellow font-mono block">Interviews</span>
                    <p className="text-[11px] text-white font-semibold line-clamp-1">NGO staff consulting stakeholders</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-black to-slate-900 rounded-2xl p-4 text-left border border-brand-yellow/30 shadow-md">
                  <Award className="w-7 h-7 text-[#F5C518]" />
                  <h4 className="font-bold text-white text-xs mt-3 uppercase">CAC Registered</h4>
                  <p className="text-[10px] text-gray-400 mt-1 leading-snug">
                    Operating on robust frameworks approved by the Plateau state ministry of education.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6 — CORE TRANSFORMATIVE PROGRAMS */}
      <section className="py-20 bg-gray-50 border-y border-gray-100" id="programs">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black">WHAT WE DO</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight">
              GICD CORE PROGRAMS MATRIX
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans max-w-lg mx-auto leading-relaxed">
              We align our activities with global developmental criteria and standard national guidelines to ensure audited progress of each donor contribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {PROGRAMS_DATA.map((prog) => {
              // Map icon string dynamically
              const IconComp = (() => {
                switch(prog.iconName) {
                  case "ShieldCheck": return ShieldCheck;
                  case "GraduationCap": return GraduationCap;
                  case "HeartPulse": return HeartPulse;
                  case "Briefcase": return Briefcase;
                  case "Leaf": return Leaf;
                  case "Users": return Users;
                  case "Sprout": return Sprout;
                  default: return Info;
                }
              })();

              return (
                <div 
                  key={prog.id}
                  className="bg-white p-6 rounded-2xl border border-gray-150 hover:border-brand-yellow transition duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                  id={`program-card-${prog.id}`}
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-brand-yellow/30">
                      <IconComp className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-sans font-extrabold text-sm uppercase text-brand-black tracking-tight">{prog.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed mt-2">{prog.description}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-400">Target: Jos District</span>
                    <button 
                      onClick={openDonate}
                      className="text-amber-600 hover:text-amber-700 font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 transition"
                    >
                      <span>Support</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 7 — INTERACTIVE RECENT FIELD ACTIVITIES AND LIVE PHOTOS */}
      <section className="py-20 bg-white" id="activities">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black">LIVE CHRONICLES</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight">
              FIELD CHRONICLES & LIVE PHOTOS
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans max-w-lg mx-auto leading-relaxed">
              Below are the actual, un-edited photographs from our recent campaigns in Jos. Filter the activities to audit direct field photos and notes.
            </p>
          </div>

          {/* Tab filtration tags */}
          <div className="flex flex-wrap justify-center items-center gap-1.5 pt-2 select-none">
            {activityTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleActivityClick(tag)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider font-mono uppercase border transition cursor-pointer ${
                  activeActivityTag === tag 
                    ? "bg-brand-black text-[#F5C518] border-brand-black shadow-md" 
                    : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Activities List */}
          <div className="space-y-12 text-left pt-6 max-w-5xl mx-auto">
            {filteredActivities.map((act) => (
              <div 
                key={act.id}
                className="bg-gray-50 rounded-2xl border border-gray-150 p-6 sm:p-8 space-y-6 hover:shadow-md transition duration-300"
                id={`activity-feed-${act.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-200/60 pb-4">
                  <div>
                    <span className="px-2.5 py-0.5 bg-[#F5C518]/20 border border-[#F5C518]/30 rounded text-amber-700 font-mono text-[9px] uppercase tracking-wider font-extrabold mr-2">
                      {act.tag}
                    </span>
                    <h3 className="font-sans font-black text-base sm:text-lg text-brand-black mt-2 leading-tight uppercase font-extrabold">
                      {act.title}
                    </h3>
                  </div>
                  <div className="flex flex-col text-slate-500 font-mono text-[10px] sm:text-right shrink-0">
                    <span className="flex items-center sm:justify-end gap-1 font-semibold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                      {act.loc}
                    </span>
                    <span className="flex items-center sm:justify-end gap-1 mt-1 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {act.date}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 sm:text-sm font-sans leading-relaxed tracking-wide">
                  {act.details}
                </p>

                {/* Grid of actual photographs representing this event */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase mb-3">
                    Verified Field Photos (Click to Enlarge)
                  </span>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {act.images.map((imgSrc, imgIdx) => {
                      const caption = act.subtitles[imgIdx] || `Field photo of ${act.title}`;
                      return (
                        <div
                          key={imgSrc}
                          onClick={() => setExpandedImage({ src: resolveMedia(imgSrc), caption: caption })}
                          className="group h-24 sm:h-28 rounded-xl overflow-hidden shadow-sm border border-gray-150 cursor-pointer relative bg-slate-100"
                        >
                          <img 
                            src={resolveMedia(imgSrc)} 
                            alt={caption} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 text-[10px] font-mono border border-white/40 px-2 py-1 rounded bg-black/40">
                              View
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8 — REAL FIELD VIDEOS AND CAMPAIGNS CENTER */}
      <section className="py-20 bg-brand-black border-y border-gray-950 text-white relative" id="video-hub">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-[#F5C518] tracking-widest uppercase font-bold">MEDIA HUB</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              FIELD VIDEO RECORDS
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans max-w-lg mx-auto leading-relaxed">
              Nothing provides audits better than live records. Play clips of GICD project workshops and distributions compiled directly by our field communication leads in Jos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
            {VIDEOS_DATA.map((video) => (
              <div 
                key={video.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-brand-yellow/30 transition"
              >
                {/* HTML5 video wrapper */}
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video border border-white/5 flex items-center justify-center shadow-lg group">
                  <video 
                    id={`player-${video.id}`}
                    src={video.url} 
                    className="w-full h-full object-cover"
                    controls
                    preload="none"
                    onPlay={() => setActivePlayVideo(video.id)}
                    onPause={() => { if (activePlayVideo === video.id) setActivePlayVideo(null); }}
                  />
                  {activePlayVideo !== video.id && (
                    <div 
                      onClick={() => {
                        const vElem = document.getElementById(`player-${video.id}`) as HTMLVideoElement;
                        if (vElem) vElem.play();
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer hover:bg-black/50 transition duration-300"
                    >
                      <span className="w-12 h-12 bg-brand-yellow text-brand-black rounded-full flex items-center justify-center shadow-md border-2 border-white hover:scale-105 active:scale-95 transition">
                        <Play className="w-5 h-5 fill-brand-black" />
                      </span>
                    </div>
                  )}

                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-brand-black/80 font-mono text-[9px] text-gray-300 rounded border border-white/10">
                    {video.duration} Mins
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[#F5C518] font-mono text-[8px] uppercase tracking-widest font-black">
                    <Video className="w-3.5 h-3.5 text-[#F5C518]" />
                    Live Record
                  </span>
                  <h4 className="font-sans font-bold text-xs uppercase text-white mt-1 leading-snug">{video.title}</h4>
                  <p className="text-[11px] text-gray-400 leading-normal line-clamp-2 pr-2">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9 — BOARD TRUSTEES & LEADERS DIRECTORY */}
      <section className="py-20 bg-white" id="trustees">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-16">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black">STRENGTH IN STRUCTURE</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight">
              TRUSTEES & BOARD COUNCIL
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans max-w-lg mx-auto leading-relaxed">
              A highly qualified board of specialists, journalists, religious delegates, and debt management directors ensuring high accountability.
            </p>
          </div>

          {/* Grid of Trustees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
            {TRUSTEES_DATA.map((tr) => (
              <div 
                key={tr.id}
                className="p-5 bg-gray-50 border border-gray-150 rounded-2xl hover:border-brand-yellow transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-black text-brand-yellow rounded-xl flex items-center justify-center font-sans font-black text-xs border border-brand-yellow/30">
                      {tr.initials}
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs uppercase text-brand-black leading-tight line-clamp-1">{tr.name}</h4>
                      <p className="text-[10px] text-amber-600 font-mono font-semibold mt-0.5">{tr.role}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-sans line-clamp-4">{tr.bio}</p>
                </div>
                
                <div className="pt-3 mt-4 border-t border-gray-200/60 text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                  Board Trustee
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-100 max-w-2xl mx-auto" />

          {/* Management leaders strip */}
          <div className="space-y-8">
            <h3 className="font-sans font-black text-lg text-brand-black uppercase tracking-tight">
              EXECUTIVE IMPLEMENTATION TEAM
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {TEAM_DATA.map((tm) => (
                <div 
                  key={tm.id}
                  className="p-5 bg-[#111111] text-white border border-gray-900 rounded-2xl relative overflow-hidden"
                >
                  <div className="absolute right-0 top-0 opacity-10 font-bold font-sans text-xl text-brand-yellow mt-2 mr-2">
                    GICD
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#F5C518] text-[#111111] rounded-lg flex items-center justify-center font-black text-xs">
                        {tm.initials}
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-xs uppercase text-white leading-tight">{tm.name}</h4>
                        <p className="text-[9px] text-[#F5C518] font-mono uppercase font-black">{tm.role}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 font-sans leading-relaxed line-clamp-3">{tm.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10 — PORTFOLIO GALLERY ARCHIVE GRID */}
      <section className="py-20 bg-gray-50 border-y border-gray-100" id="gallery">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black">PHOTO ARCHIVE</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight">
              PORTFOLIO ARCHIVE & TILES
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans max-w-lg mx-auto leading-relaxed">
              Explore past program events structured in gradients representing the photographic collections of medical outreach, trees, and youth counseling.
            </p>
          </div>

          {/* Gallery categories tabs */}
          <div className="flex flex-wrap justify-center items-center gap-1.5 pt-2 select-none">
            {["All", "Education", "Health Outreach", "Economic Empowerment", "Environment", "Youth Development"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setGalleryFilter(cat)}
                className={`px-3 py-1 bg-white hover:bg-gray-50 text-[10px] font-semibold tracking-wider font-mono uppercase border rounded-md transition cursor-pointer ${
                  galleryFilter === cat 
                    ? "border-brand-black text-brand-black bg-slate-100" 
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grids */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
            {GALLERY_DATA.filter((item) => galleryFilter === "All" || item.category === galleryFilter).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className="group relative h-28 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition border border-gray-150 flex flex-col justify-between p-3.5"
                style={{ background: item.gradient || "linear-gradient(135deg, #111 0%, #333 100%)" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] opacity-60 pointer-events-none" />
                
                <span className="text-[8px] font-mono text-brand-yellow tracking-wider font-bold uppercase bg-brand-black/45 px-1.5 py-0.5 rounded self-start">
                  {item.category}
                </span>

                <div>
                  <h4 className="text-white font-sans font-bold text-[11px] leading-snug tracking-tight line-clamp-2 drop-shadow-md">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 11 — TESTIMONIALS */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black">TESTIMONIES OF GRACE</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight">
              VOICES FROM THE COMMUNITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            {TESTIMONIALS_DATA.map((test) => (
              <div 
                key={test.id}
                className="p-6 bg-gray-50 border border-gray-150 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <p className="text-xs text-gray-650 leading-relaxed font-sans italic">
                  &quot;{test.quote}&quot;
                </p>
                
                <div className="flex justify-between items-center border-t border-gray-200/60 pt-4">
                  <div>
                    <h5 className="font-bold text-xs uppercase text-brand-black">{test.author}</h5>
                    <p className="text-[10px] text-slate-500 font-mono">{test.role}</p>
                  </div>
                  <span className="text-[9px] text-[#F5C518] bg-brand-black px-1.5 py-0.5 font-bold font-mono rounded">
                    {test.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 12 — CAREERS AND ROLES IN JOS */}
      <section className="py-20 bg-gray-50 border-y border-gray-100" id="careers">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black font-extrabold pb-1 block">CAREERS</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight">
              GICD CAREER INTERNSHIPS
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans max-w-lg mx-auto leading-relaxed">
              We seek certified, dedicated, and community-connected specialists in Jos. Join a verified team that delivers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {[
              { id: "child_protection", title: "Child Protection Program Officer", type: "Full-Time", location: "Jos HQ, Plateau State", pay: "Competitive NGO Scale" },
              { id: "education_facilitator", title: "Education Development Facilitator", type: "Contract", location: "Plateau Rural Districts", pay: "Contract Rate" },
              { id: "me_specialist", title: "Monitoring & Evaluation Specialist", type: "Part-Time", location: "Jos / Remote Friendly", pay: "Pro-Rated Scale" }
            ].map((position) => (
              <div 
                key={position.id}
                className="bg-white p-5 rounded-2xl border border-gray-150 hover:border-brand-yellow/80 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 bg-brand-black text-brand-yellow text-[9px] font-mono rounded font-bold uppercase tracking-wide">
                      {position.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{position.pay}</span>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-brand-black uppercase leading-tight">{position.title}</h3>
                    <p className="text-[10px] text-slate-500 font-mono mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-yellow" />
                      {position.location}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openJobs(position.id)}
                  className="w-full bg-slate-50 hover:bg-brand-yellow hover:text-brand-black transition text-brand-black font-bold uppercase tracking-wider text-[10px] py-2 rounded-lg text-center mt-5 cursor-pointer block border border-gray-150"
                  id={`apply-btn-job-${position.id}`}
                >
                  Quick Apply
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 13 — SYMMETRICAL MARQUEE PARTNERS */}
      <section className="py-12 bg-white" id="partners">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-6">
          <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">SYMMETRICAL COLLABORATORS DIRECTORY</span>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center">
            {PARTNERS_DATA.map((partner, idx) => (
              <div 
                key={idx}
                className="p-3 bg-gray-50 border border-gray-150 rounded-lg text-[10px] font-mono text-gray-600 uppercase tracking-wider font-semibold hover:border-brand-yellow/30 hover:bg-white transition flex items-center justify-center text-center leading-tight min-h-[46px]"
              >
                {partner.name}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 14 — CONTACT & FOOTER BASE */}
      <footer className="bg-brand-black text-white pt-16 pb-8 border-t-4 border-[#F5C518] mt-auto select-none" id="contact">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left pb-12 border-b border-gray-900">
            
            {/* Logo description */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <img src={resolveMedia("/asset/logo.jpg")} alt="Logo" className="w-11 h-11 rounded-full bg-white text-brand-black border border-[#F5C518]" />
                <div className="flex flex-col">
                  <span className="font-sans font-black text-lg text-[#F5C518] leading-none uppercase tracking-tight">GICD NGO</span>
                  <span className="text-[8px] text-gray-500 font-mono uppercase tracking-widest mt-0.5">CAC NO: 141566</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed tracking-wide">
                We are structured, transparent, and persistent in rehabilitating community development metrics across northern sectors of Nigeria. Contact us or visit our headquarters to inspect our live campaign portfolios.
              </p>
              
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-[#F5C518]">
                <span>CONNECT:</span>
                <a href="https://www.facebook.com/share/1BqVaP3TVA/" target="_blank" rel="noreferrer" className="p-1 hover:text-white transition">
                  <Facebook className="w-4 h-4 inline" />
                </a>
                <a href="https://www.linkedin.com/company/thegicd/" target="_blank" rel="noreferrer" className="p-1 hover:text-white transition">
                  <Linkedin className="w-4 h-4 inline" />
                </a>
              </div>
            </div>

            {/* Direct Form */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white">Direct Message Headquarters</h4>
              
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    required 
                    placeholder="Your Name" 
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-transparent font-sans"
                  />
                  <input 
                    type="email" 
                    required 
                    placeholder="Your Email" 
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-transparent font-sans"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="WhatsApp or Direct Phone" 
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-transparent font-sans"
                />
                <textarea 
                  required 
                  rows={2} 
                  placeholder="Message regarding donation, volunteering, or audits..." 
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-transparent font-sans resize-none"
                />
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-brand-yellow hover:bg-brand-yellow/90 font-sans font-black text-brand-black text-[10px] uppercase tracking-wider rounded-lg transition active:scale-95 cursor-pointer block text-center"
                  id="footer-contact-submit"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Direct office Coordinates */}
            <div className="lg:col-span-3 space-y-4 text-xs font-mono text-gray-400">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white">Direct Coordinates</h4>
              
              <div className="space-y-1.5 leading-relaxed text-[11px]">
                <p>Office: <span className="text-white">Directly behind Fed. Gov. College, Rayfield rd, Jos</span></p>
                <p>Email: <span className="text-white">info@gicdnigeria.org / gicdnigeria@gmail.com</span></p>
                <p>Mobile: <span className="text-white">+234 (0) 902 085 0040</span></p>
                <p>Direct Bank: <span className="text-brand-yellow">Zenith Bank PLC / Acc: 1024567890</span></p>
              </div>

              <div className="pt-2">
                <button 
                  onClick={openDonate}
                  className="py-1.5 px-3 bg-[#F5C518] text-[#111111] font-sans font-extrabold text-[9px] uppercase tracking-widest rounded transition active:scale-98 cursor-pointer"
                >
                  AUDIT REPORTS
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-mono gap-4 text-center md:text-left">
            <p>© {new Date().getFullYear()} Guardian Initiative for Community Development (GICD). Registered under laws of Nigeria.</p>
            <p>Rayfield Office, Jos, Plateau State, Nigeria | CAC IT/NO/141566</p>
          </div>

        </div>
      </footer>

      {/* MODAL OVERLAYS */}
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
      <VolunteerModal isOpen={isVolunteerOpen} onClose={() => setIsVolunteerOpen(false)} />
      <PartnerModal isOpen={isPartnerOpen} onClose={() => setIsPartnerOpen(false)} />
      <JobsModal isOpen={isJobsOpen} onClose={() => setIsJobsOpen(false)} selectedJobId={selectedJobId} />

      {/* Portfolio Lightboxes */}
      <GalleryLightbox 
        item={selectedGalleryItem} 
        onClose={() => setSelectedGalleryItem(null)} 
        onNext={handleNextGallery} 
        onPrev={handlePrevGallery} 
      />

      {/* Simple Quick Image Expanded modal */}
      {expandedImage && (
        <div 
          onClick={() => setExpandedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-pointer animate-fade-in"
          id="image-expanded-overlay"
        >
          <div className="relative max-w-4xl bg-brand-black rounded-2xl overflow-hidden p-3 border border-gray-800 space-y-2">
            <img src={expandedImage.src} alt="Expanded visual" className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain" />
            <p className="text-xs text-white/95 font-sans py-1 max-w-md mx-auto">{expandedImage.caption}</p>
            <span className="absolute top-2 right-2 px-2 py-1 bg-black/60 font-mono text-[9px] text-gray-300 rounded hover:bg-black transition">
              Click anywhere to close
            </span>
          </div>
        </div>
      )}

      {/* Floating Alert Toast message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-[#F5C518] border border-brand-yellow/30 px-5 py-4 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-3 animate-slide-in">
          <Check className="w-5 h-5 text-green-500 stroke-[3.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
