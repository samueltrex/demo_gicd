export interface ProgramItem {
  id: string;
  iconName: string; // From Lucide icons
  title: string;
  description: string;
}

export interface StatItem {
  id: string;
  number: number;
  suffix: string;
  label: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  gradient: string; // CSS Gradient String for visually pleasing placeholders
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: "edu",
    iconName: "GraduationCap",
    title: "Education & Scholarships",
    description: "Providing access to quality education, writing materials, uniforms, and primary/secondary scholarships for underprivileged children and youths in Jos."
  },
  {
    id: "health",
    iconName: "HeartPulse",
    title: "Healthcare Outreach",
    description: "Organizing free medical camps, distributing essential maternal health kits, and conducting health education and sanitization programs to underserved rural communities."
  },
  {
    id: "econ",
    iconName: "Briefcase",
    title: "Economic Empowerment",
    description: "Fostering economic self-reliance through skills acquisition workshops, microfinance support, sewing machine grants, and vocational training for women and local youth."
  },
  {
    id: "env",
    iconName: "Leaf",
    title: "Environmental Sustainability",
    description: "Promoting green living and fighting deforestation on the Plateau with community tree planting events, plastic recycling drives, and ecological workshops."
  },
  {
    id: "youth",
    iconName: "Users",
    title: "Youth Development",
    description: "Nurturing tomorrow's Nigerian leaders through formal mentorship networks, civic advocacy bootcamps, IT literacy workshops, and sports initiatives."
  },
  {
    id: "farm",
    iconName: "Sprout",
    title: "Food Security & Agriculture",
    description: "Training smallholder urban and rural farmers in sustainable dry-season techniques, providing high-yield seedlings, and supplying food aid to vulnerable elders."
  }
];

export const STATS_DATA: StatItem[] = [
  { id: "lives", number: 5000, suffix: "+", label: "Lives Impacted" },
  { id: "comm", number: 12, suffix: "", label: "Communities Reached" },
  { id: "vols", number: 300, suffix: "+", label: "Volunteers & Partners" },
  { id: "years", number: 8, suffix: "", label: "Years of Service" }
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: "director",
    name: "Dr. Emmanuel Gyang",
    role: "Executive Director",
    bio: "A passionate public health advocate and community development specialist with over 15 years of grassroots experience in Plateau State and across Northern Nigeria.",
    initials: "EG"
  },
  {
    id: "manager",
    name: "Blessing Pam",
    role: "Programs Manager",
    bio: "Exquisite project coordinator specialized in educational advocacy and gender development. Blessing works directly with community chiefs and youth heads.",
    initials: "BP"
  },
  {
    id: "comms",
    name: "Tariq Ibrahim",
    role: "Communications Lead",
    bio: "Storyteller and media campaign strategist. Tariq captures live field impact stories to keep global partners, donors, and the public deeply engaged.",
    initials: "TI"
  },
  {
    id: "finance",
    name: "Chidi Okafor",
    role: "Finance & Operations",
    bio: "Chartered accountant ensuring maximum accountability of GICD assets. Chidi manages financial reporting systems with absolute integrity and transparency.",
    initials: "CO"
  }
];

export const TRUSTEES_DATA: TeamMember[] = [
  {
    id: "trust1",
    name: "Rev Fr Hilary Naankot Longs",
    role: "Catholic Priest & Episcopal Vicar",
    bio: "Catholic priest, Cathedral Administrator and Episcopal vicar, Director of Pontifical Mission Societies, advancing youth development, faith-based leadership and community-centered pastoral engagement.",
    initials: "HL"
  },
  {
    id: "trust2",
    name: "Ejilayomi Omokorede Damoeroem",
    role: "PhD Science Educator & Lecturer",
    bio: "PhD Science educator and University lecturer at Adeyemi Federal University of Education, advancing STEM education, teacher development and evidence-based learning strategies in Nigeria.",
    initials: "ED"
  },
  {
    id: "trust3",
    name: "Abdulrazak Ishola",
    role: "Child Protection & Humanitarian Leader",
    bio: "Child protection and humanitarian leader with 10+ years of experience, currently serving as Child Protector Sub-Cluster Coordinator in Afghanistan, managing multi-million dollar donor portfolios and integrated protection programs.",
    initials: "AI"
  },
  {
    id: "trust4",
    name: "Iliya John Dayok",
    role: "Licensed Human Resources Professional",
    bio: "A licensed HR professional with CIPM, specializing in HR and organizational management with 10+ years of experience in systems strengthening, people management, and operational effectiveness across humanitarian and development settings.",
    initials: "ID"
  },
  {
    id: "trust5",
    name: "Atihong Lois Yengoet",
    role: "Economist & Director General",
    bio: "Economist and Director General, Plateau State Debt Management Department, providing government leadership in fiscal responsibility, debt strategy, risk management, and transparent public financial governance.",
    initials: "AY"
  },
  {
    id: "trust6",
    name: "Dr. Terna Abege (PhD)",
    role: "Head of MHPSS & Mental Health Specialist",
    bio: "Head of MHPSS at Action Against Hunger, global mental health specialist, leading donor-funded psychosocial programs aligned with WHO, IASC, and Sphere standards.",
    initials: "TA"
  },
  {
    id: "trust7",
    name: "Dorcas Bello (Sheffy)",
    role: "Award-winning Journalist & Founder",
    bio: "Award-winning multimedia journalist and founder of Unzipped Stories Africa, media strategist and youth mentor who has trained 3,700+ young Africans in digital storytelling and entrepreneurship.",
    initials: "DB"
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal1",
    title: "Medical outreach camp, Rural Jos",
    category: "Health Outreach",
    gradient: "linear-gradient(135deg, #111111 0%, #F5C518 100%)"
  },
  {
    id: "gal2",
    title: "Youth leadership training session",
    category: "Youth Development",
    gradient: "linear-gradient(135deg, #1d1d1d 0%, #f7d042 100%)"
  },
  {
    id: "gal3",
    title: "Tree planting initiative, Plateau State",
    category: "Environment",
    gradient: "linear-gradient(135deg, #0f1c10 0%, #F5C518 100%)"
  },
  {
    id: "gal4",
    title: "Women empowerment workshop",
    category: "Economic Empowerment",
    gradient: "linear-gradient(135deg, #221401 0%, #fcd23 a 100%)"
  },
  {
    id: "gal5",
    title: "Back-to-school support distribution",
    category: "Education",
    gradient: "linear-gradient(135deg, #09131a 0%, #F5C518 100%)"
  },
  {
    id: "gal6",
    title: "Community clean-up drive",
    category: "Environment",
    gradient: "linear-gradient(135deg, #15001f 0%, #e0b00b 100%)"
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test1",
    quote: "GICD changed my daughter's life. Because of their writing materials and high school scholarship, she is now the first child in our family to study at the University of Jos. We are forever grateful.",
    author: "Mama Ngozi",
    role: "Beneficiary Parent",
    location: "Angwan Rogo, Jos"
  },
  {
    id: "test2",
    quote: "Volunteering with the GICD medical outreach in Plateau communities opened my eyes to the real challenges in our neighborhood. The leadership's structure and absolute execution are truly transformational.",
    author: "Ibrahim Musa",
    role: "Volunteer Pharmacist",
    location: "Rayfield, Jos"
  },
  {
    id: "test3",
    quote: "As an international development auditor, we value rigorous compliance and clear progress data. GICD's financial stewardship and grassroots reach represent a shining model for West African NGOs.",
    author: "Grace Adebayo",
    role: "Partner Organization Representative",
    location: "Abuja Office"
  }
];

export const PARTNERS_DATA = [
  { name: "Plateau State Ministry of Health", initials: "PSMH" },
  { name: "Jos North Local Council", initials: "JNLC" },
  { name: "Anglican Health Initiative", initials: "AHI" },
  { name: "Plateau Youth Council", initials: "PYC" },
  { name: "Green Earth Africa Trust", initials: "GEAT" },
  { name: "West Africa NGO Network", initials: "WANN" },
  { name: "Jos business coalition", initials: "JBC" }
];
