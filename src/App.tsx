import React, { useState, useEffect } from "react";
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
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Award as AwardIcon
} from "lucide-react";

import { 
  PROGRAMS_DATA, 
  STATS_DATA, 
  TRUSTEES_DATA,
  GALLERY_DATA, 
  TESTIMONIALS_DATA, 
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
  tag: "Coexistence Workshops" | "Caregiver Sessions" | "Education Support" | "Sports & Coexistence Matches" | "Staff Onboarding & Surveys" | "Honors & Certificates" | "Child Protection & Safeguarding" | "Volunteer Opportunities" | "Media & Press Coverage";
  date: string;
  details: string;
  loc: string;
  images: string[];
  subtitles: string[];
  videos?: string[];
  videoSubtitles?: string[];
  externalLink?: {
    label: string;
    url: string;
  };
}

const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: "act-youth-lifeskills-june-2026",
    title: "✨ Adversity to Agency: Cultivating Peer Lifeskills and Coping Mastery",
    tag: "Child Protection & Safeguarding",
    date: "June 12, 2026",
    details: "Children often possess the innate ability to push through and overcome challenges, setbacks, and localized adversity.\n\nAll they need is the right support structure and a foundational skill set of resilience, self-regulation, and positive coping mechanisms. Through our continuing adolescent curriculum under the Safe Futures Project in Angwan Rukuba, GICD is training children with peer lifeskills to confidently face risks, help their friends, and navigate trauma safely.\n\nOur interactive workshops empower them with confidence and psychosocial tools, confirming that when children are active drivers of protection, whole neighborhoods thrive.\n\n#lifeskills #YouthResilience #ChildProtection #GICD #SocialImpact #PsychosocialSupport",
    loc: "Angwan Rukuba, Jos, Plateau State",
    images: [],
    subtitles: [],
    videos: [
      "/asset/social vid.mp4"
    ],
    videoSubtitles: [
      "Adolescent peer lifeskills active workshops and cooperative coping exercises in Angwan Rukuba"
    ]
  },
  {
    id: "act-children-lead-june-2026",
    title: "🗺️ Children Lead: Mapping Risks, Protective Factors & Driving Change in Angwan Rukuba",
    tag: "Child Protection & Safeguarding",
    date: "June 5, 2026",
    details: "When children understand the nature of their community, then they are one step ahead in protecting themselves and contribute to making it safer for others.\n\nToday's workshop focused on mapping the community and identifying the risk and protective factors. These include the places, institutions present or absent, situations, and challenges they face, and the areas where they believe they can drive change Within their sphere of influence.\n\nFindings from today's community mapping will directly fit into the children's community action project coming soon.\n\n#YouthResilience #ChildProtection #CommunityDevelopment #PsychosocialSupport",
    loc: "Angwan Rukuba, Jos, Plateau State",
    images: [
      "/asset/lead 1.jpg",
      "/asset/lead 2.jpg",
      "/asset/lead 3.jpg",
      "/asset/lead 4.jpg",
      "/asset/lead 5.jpg",
      "/asset/lead 6.jpg",
      "/asset/lead 7.jpg",
      "/asset/lead 8.jpg"
    ],
    subtitles: [
      "Youth taking the lead in mapping their community, highlighting key safety and infrastructure aspects",
      "Adolescents identifying child-centric risk factors, dangerous paths, and protective havens in Angwan Rukuba",
      "Collaborative drawing of localized resource maps pointing to educational and recreational opportunities",
      "Young participants presenting their environmental surveys to peer groups and community mentors",
      "Brainstorming institutions, service access points, and critical gaps in protection infrastructure",
      "Analyzing spheres of influence to identify actions adolescents can actively take to support safety",
      "Documenting the primary challenges and community pathways to feed into the upcoming Action Project",
      "Celebrating agency, creative teamwork, and the power of young leadership in community child protection"
    ]
  },
  {
    id: "act-wellbeing-distress-may-2026",
    title: "🧠 Navigating Stress: Adolescents Uncovering Wellbeing and Distress in Angwan Rukuba",
    tag: "Child Protection & Safeguarding",
    date: "May 30, 2026",
    details: "Stress is one of the leading threats to the safety, mental health and development of young people, and living in a community affected by poverty, conflict, and multiple protection risks makes the burden heavier.\n\nAdolescents in GICD's Youth Resilience Programme are now understanding Wellbeing and Distress through structured exercises designed to help them identify the signs and root causes of distress.\n\nUnsafe home environments, family separation and bereavement, heartbreaks, religious unrest, lack of adequate food, decent clothing, corporal and humiliating punishment, and inadequate access to basic services among others, have emerged as everyday sources of stress among young people in  Angwan Rukuba.\n\nGICD continues to support young people to develop safe, effective stress management strategies and thrive.\n\n#ChildProtection #PsychosocialSupport #YouthResilience #PlateauState",
    loc: "Angwan Rukuba Community, Jos, Plateau State",
    images: [
      "/asset/stress 1.jpg",
      "/asset/stress 2.jpg",
      "/asset/stress 3.jpg",
      "/asset/stress 4.jpg",
      "/asset/stress 5.jpg",
      "/asset/stress 6.jpg",
      "/asset/stress 7.jpg"
    ],
    subtitles: [
      "Adolescents gathering for a structured session on understanding mental health, stress, and wellbeing factors",
      "Group breakout discussions mapping localized sources of adolescent psychological distress",
      "Young participants listing common stressors including bereavement, family separation, and economic hardships",
      "GICD community mentors encouraging open, safe expressions of vulnerability regarding mental health",
      "Interactive activities to distinguish healthy coping mechanisms from harmful stress responses",
      "Learning mindfulness, self-soothing, and localized community support-seeking strategies",
      "Youth celebrating the safe spaces built to support their resilience and peer emotional connection"
    ]
  },
  {
    id: "act-childrens-day-walk-may-2026",
    title: "🖤 National Children's Day 2026: A Walk of Reflections, Not Celebration",
    tag: "Child Protection & Safeguarding",
    date: "May 29, 2026",
    details: "NATIONAL CHILDREN'S DAY 2026, A WALK OF REFLECTIONS, NOT CELEBRATION\n\n• Angwan Rukuba, Jos North LGA, 28 March 2025: Gunmen attacked the community, killing no fewer than 30 people, including children. (Channels Television)\n• Bokkos LGA, April 2025: Armed attackers struck communities in Bokkos, killing many people including children and entire families. (Amnesty International)\n• Kwall District, Bassa LGA, April 2025: At least 51 people were killed, including women, children, and the elderly. Homes were razed and properties destroyed. (Punch)\n• Kebbi and Niger States, 18 to 21 November 2025: Hundreds of schoolchildren were kidnapped by armed men, with the government failing to disclose perpetrators or confirm any prosecutions following the releases. (Human Rights Watch)\n• Lokoja, Kogi State, 27 April 2026: Gunmen raided an orphanage and abducted at least 23 children. Fifteen were rescued but eight remained missing. (Al Jazeera)\n\nTo all duty bearers: this is our score card.\n\nWe call on government at executive legislative and judicial arms, the security forces, humanitarian & development partners, and communities to refuse to normalise a reality in which a child in Bokkos, Bassa, or Angwan Rukuba has less right to safety than any child anywhere in the world.\n\n#SaveThePlateauChild | #ChildrensDay2026 | #ChildProtectionNetworkNigeria\n\nChild Protection Network CPN - Plateau State\n\nSources: Amnesty International (May 2025; December 2025); Human Rights Watch World Report 2026; Channels Television (22 April 2026); Al Jazeera (27 April 2026); Plateau State Government Fact-Finding Committee Report (May 2025).",
    loc: "Plateau State, Nigeria",
    images: [
      "/asset/day 1.jpg",
      "/asset/day 2.jpg",
      "/asset/day 3.jpg",
      "/asset/day 4.jpg",
      "/asset/day 5.jpg"
    ],
    subtitles: [
      "Staff and advocates gathering for the solemn walk of reflection, demanding safety first for every Nigerian child",
      "Carrying advocacy banners pointing to the critical security score cards and school safety requirements",
      "GICD team members joining hands with the Child Protection Network (CPN) Plateau State during the street march",
      "Community leaders listening and pledging to refuse normalizing security threats against children",
      "A collective call to duty bearers for immediate active security measures in vulnerable community settings"
    ]
  },
  {
    title: "Capacity Development Programme for Non-Profits",
    tag: "Honors & Certificates",
    date: "",
    details: "The Guardian Initiative for Community Development (GICD) is honored to be invited to participate in a two-phased capacity development programme which includes intensive training and mentorship for non-profits, led by Nigeria Network of NGOs with support from TY Danjuma Foundation.\n\nThe program targets non-profit founders, Executives and Senior Managers in Plateau State. Fortunately for us, this opportunity aligns strongly with our organizational capacity development needs and aspirations to strengthen leadership, governance and accountability systems for greater community impact.\n\nWe appreciate the TY Danjuma Foundation for funding this initiative and the Nigeria Network of NGOs for delivering such a valuable learning experience.",
    loc: "",
    images: [
      "/asset/hon 1.jpg",
      "/asset/hon 2.jpg",
      "/asset/hon 3.jpg",
      "/asset/hon 4.jpg",
      "/asset/hon 5.jpg",
      "/asset/hon 6.jpg",
      "/asset/hon 7.jpg"
    ],
    subtitles: [
      "GICD representatives participating in the Nigeria Network of NGOs capacity building kickoff",
      "Intensive workshop on non-profit leadership, governance, and organizational planning",
      "Deep-dive session focusing on transparent financial accountability systems",
      "Mentorship circle connecting Plateau State NGO executives with domain specialists",
      "GICD team leads reviewing strategic guidelines funded by the TY Danjuma Foundation",
      "Distinguished delegates and non-profit founders sharing developmental best practices",
      "Group photo of cohort participants in Plateau State eager for community-driven impact"
    ]
  },
  {
    id: "act-lifeline-exercises-may-2026",
    title: "🌱 Nurturing Strengths: Lifeline and Support-Mapping Exercises in Angwan Rukuba",
    tag: "Child Protection & Safeguarding",
    date: "May 22, 2026",
    details: "As part of GICD’s Safe Futures Project supporting resilience building and wellbeing among adolescents in Angwan Rukuba through life skills and psychosocial support, young participants engaged in two foundational activities: the “Lifeline” and “Who Matters in My Life?” exercises.\n\nThrough the Lifeline activity, adolescents reflected on both difficult and positive moments in their personal journeys and identified the coping strategies that have helped them navigate challenges. For many, the session created a new awareness of their own strengths, resilience, and ability to overcome adversity.\n\nParticipants also mapped their social support systems, identifying trusted individuals they can turn to for guidance, encouragement, and support. The exercise strengthened their understanding of the important role healthy relationships play in emotional wellbeing and resilience.\n\n#YouthResilience #LifeSkills #PsychosocialSupport #AngwanRukuba #GICD #AdolescentDevelopment #JosNigeria",
    loc: "Angwan Rukuba, Jos, Plateau State",
    images: [
      "/asset/future 1.jpg",
      "/asset/future 2.jpg",
      "/asset/future 3.jpg",
      "/asset/future 4.jpg",
      "/asset/future 5.jpg",
      "/asset/future 6.jpg"
    ],
    subtitles: [
      "Adolescents carefully mapping their unique life journeys and key milestones in the Lifeline exercise",
      "Young participants sharing and reflecting on positive coping strategies for adversity",
      "Exploring personal strengths, protective habits, and emotional resilience techniques",
      "Mapping social support circles to identify trusted guidance figures and helpful community members",
      "Adolescents discussing the critical role healthy, supportive connections play in wellbeing",
      "A group showing their completed journey maps, celebrating self-awareness and unity in Angwan Rukuba"
    ]
  },
  
  {
    id: "act-caregivers-meeting-may-2026",
    title: "🗣️ Vulnerability & Connection: Caregivers Strengthening Families",
    tag: "Caregiver Sessions",
    date: "May 16, 2026",
    details: "Every caregivers meeting is a step closer to achieving stronger families.\n\nAs children participating in our life skills and psychosocial support programme share personal concerns and challenges, GICD organizes regular caregivers meetings where these issues are discussed constructively with parents and caregivers. The goal is not only awareness, but collaborative action toward safer, healthier, and more supportive home environments.\n\nTodays meeting was a significant shift from pointing out parents inability to meet children's needs, to an unexpected expression of vulnerability-in-trust among parents themselves. Discussions expanded beyond merely missing out on responsibilities to the underlying factors including the loss of spouses and the burden of single parenting. (Most are single mothers, widows, and grand parents caring for children of their children.) Realizing this community-wide vulnerability shared by many immediately sparked empathy and stronger feeling of connection among the parents and caregivers in the room.\n\nSupporting children to build resilience and wellbeing also requires strengthening the emotional wellbeing, communication capacity, and support networks of the adults who care for them.\n\n#PsychosocialSupport #ChildProtection #StrongerFamilies #CommunityDevelopment #GICD",
    loc: "Angwan Rukuba Community, Jos, Plateau State",
    images: [
      "/asset/step 1.jpg",
      "/asset/step 2.jpg",
      "/asset/step 3.jpg",
      "/asset/step 4.jpg",
      "/asset/step 5.jpg"
    ],
    subtitles: [
      "Caregivers gathering to discuss child psychosocial support and challenges",
      "Parents sharing honest personal and financial caregiving experiences",
      "Expressing vulnerability and emotional trust in a supportive group circle",
      "Single mothers and grandparents bonding over shared household challenges",
      "Strengthening direct communication, resilience networks, and peer support systems"
    ]
  },
  
  
  {
    id: "act-womens-day-mar-2026",
    title: "💜 Celebrating our Leaders: International Women's Day at GICD",
    tag: "Child Protection & Safeguarding",
    date: "March 8, 2026",
    details: "Today, on International Women's Day, we celebrate the remarkable women whose leadership, professionalism, and commitment strengthen the work of GICD. From governance and management to finance and frontline programming, their contributions help ensure that the children we serve are safer, better supported, and exposed to opportunities that shape their future.\n\n#GivetoGain",
    loc: "GICD Head Office, Jos, Plateau State",
    images: [],
    subtitles: [],
    videos: [
      "/asset/vid 5.mp4"
    ],
    videoSubtitles: [
      "Honoring the power, guidance, and expertise of the women leading GICD's programs"
    ]
  },
  {
    id: "act-conclude-consultation-mar-2026",
    title: "🏫 Strategic Integration: Safe Futures Project Approved for GSS Chwelnyap",
    tag: "Education Support",
    date: "March 4, 2026",
    details: "Today The Guardian Initiative for Community Development -GICD concluded over a month of consultations with school leadership and senior officials of the Plateau State Ministry of Education and secured government approval to commence implementation of the Safe Futures Project at Government Secondary School Chwelnyap.\n\nThis milestone strengthens GICDs partnership with government and positions GICDs program within the formal education setting, making it more central, accessible, and serving as a convergent point for both students and out-of-school children in the community. This provides greater opportunities for identification and referral for enrollment into formal learning, while making life skills education possible for all children.\n\n#ChildProtection\n#YouthDevelopment\n#AccessToEducation",
    loc: "GSS Chwelnyap, Jos, Plateau State",
    images: [
      "/asset/conclude 1.jpg",
      "/asset/conclude 2.jpg",
      "/asset/conclude 3.jpg",
      "/asset/conclude 4.jpg"
    ],
    subtitles: [
      "GICD team members concluding formal consultations with Chwelnyap school leadership",
      "Securing administrative and infrastructural approval to initiate localized Safe Futures programs",
      "Aligning student and community-focused child protection and youth development curriculum goals",
      "Engaging Plateau State Ministry of Education school officials and management on project strategies"
    ]
  },
  {
    id: "act-safe-futures-survey-mar-2026",
    title: "📝 Evidence for Action: Safe Futures Adolescent Perspective Survey",
    tag: "Child Protection & Safeguarding",
    date: "March 2, 2026",
    details: "Today, The Guardian Initiative for Community Development -GICD engaged adolescents enrolled in our Safe Futures Project in Angwan Rukuba Community, in a structured survey designed to better understand their lived realities, aspirations, and challenges.\n\nThis survey is part of GICDs commitment to improved programme design and ensuring that adolescent perspectives directly influence our interventions. We are grateful to the brave young participants who shared openly and responsibly their realities. Their experiences matter.\n\nResults and key insights shortly.\n\n#DataForImpact \n#evidencebasedprogramming \n#ChildProtection\n#ParticipatoryApproach\n#plateaustate",
    loc: "Angwan Rukuba Community, Jos, Plateau State",
    images: [
      "/asset/survey 1.jpg",
      "/asset/survey 2.jpg",
      "/asset/survey 3.jpg",
      "/asset/survey 4.jpg"
    ],
    subtitles: [
      "Adolescent participants in Angwan Rukuba carefully filling out the GICD Safe Futures survey",
      "GICD session leaders introducing the purpose of the structured survey to adolescent group",
      "Fostering transparent, comfortable, and responsive spaces for children to voice their perspectives",
      "Safe Futures participants actively detailing their educational support and community safety views"
    ],
    videos: [
      "/asset/vid 4.mp4"
    ],
    videoSubtitles: [
      "Safe Futures video: Adolescent engagement and field insights in motion"
    ]
  },
  {
    id: "act-board-induction-feb-2026",
    title: "🏛️ Expansion & Official Induction of the GICD Board of Trustees",
    tag: "Staff Onboarding & Surveys",
    date: "February 22, 2026",
    details: "Yesterday The Guardian Initiative for Community Development -GICD concluded the Induction of the Board of Trustees of The Guardian Initiative for Community Development. This milestone marks the expansion of our Board from 3 to 7 Trustees, strengthening our institutional leadership and governance framework.\n\nThe Trustees diverse expertise across humanitarian work, organizational management, and community development positions GICD for stronger oversight and sustainable growth. We look forward to the collective leadership that will guide our mission to protect and empower vulnerable children and adolescents.\n\nWelcome on Board, Ladies and Gentlemen.\n\nAssociated Networks & Foundations:\n• Nigeria Network of NGOs\n• TY Danjuma Foundation",
    loc: "GICD Head Office, Jos, Plateau State",
    images: [
      "/asset/a.jpg",
      "/asset/b.jpg",
      "/asset/c.jpg",
      "/asset/d.jpg",
      "/asset/e.jpg",
      "/asset/f.jpg",
      "/asset/g.jpg"
    ],
    subtitles: [
      "The newly-inducted GICD Board of Trustees alongside key leadership team members",
      "Official presentation of the trustee leadership portfolio, highlighting core objectives",
      "Reviewing and strengthening GICD's long-term community outreach governance framework",
      "Collaborative strategy session emphasizing robust monitoring and public trust accountability",
      "Discussions on child safety, safeguarding policies, and adolescent development targets",
      "Executive board members charting institutional pathways for sustainable impact in Plateau State",
      "Committing to collective leadership of GICD to better serve vulnerable youth populations"
    ]
  },
  {
    id: "act-caregiver-meetings-feb",
    title: "🗣️ Reflective Caregiver & Parent Dialogues on Adolescent Connection",
    tag: "Caregiver Sessions",
    date: "February 11, 2026",
    details: "Caregiver meetings remain one of the most critical components of our program. Today, we learned from caregivers and parents point of view, the factors behind the widening gap in parental connection with children, especially adolescents. Caregiver commitment, environmental influences and compounding economic pressures dominated the discussion, emerging as key forces pulling parents and children apart.\n\nSome parents also shared honest reflections about how they perceive the bonding opportunities our programs provide. While they see the immediate outcome and benefits, they are simultaneously navigating concerns about values, identity, and new behaviors that can feel unfamiliar or misaligned with long standing norms.\n\nThrough these meetings we understand that sustainable change can happen when parents are not relegated to bystanders in the growth and development of the child, but engaged beyond their current understanding and aspirations for the child. This is what makes the opportunities we provide to children translate into growth, not tension.\n\n#GICD #ParentEngagement #ChildDevelopment #CommunityImpact",
    loc: "Angwan Rukuba Community, Jos, Plateau State",
    images: [
      "/asset/care 1.jpg",
      "/asset/care 2.jpg",
      "/asset/care 3.jpg",
      "/asset/care 4.jpg",
      "/asset/care 5.jpg",
      "/asset/care 6.jpg"
    ],
    subtitles: [
      "Caregivers and GICD mentors gathering to explore root challenges in parent-child connections",
      "GICD facilitator leading an open, supportive dialogue with local mothers and fathers",
      "A caregiver sharing personal reflections on guiding adolescents through changing modern values",
      "Engaging training session focused on positive parenting techniques and active listening",
      "Community parents actively discussing solutions for environmental and economic pressures",
      "Collaborative support circle reinforcing the integrated adolescent protection model"
    ]
  },
  
  {
    id: "act-football-tech-highlights",
    title: "⚽💻 Goals for Skills: Football Meets Tech Official Highlights",
    tag: "Sports & Coexistence Matches",
    date: "January 10, 2027",
    details: "A beautiful and energetic highlight of the Joint Goals for Skills: Football Meets Tech initiative.\n\nSuccessfully supported and certified by GICD, Kavod Relief Initiative, and the Plateau State Ministry of Women Affairs and Social Development, the outreach brought unmatched joy, inspiration, and technological curiosity to our adolescent group.\n\nThe fun...\nThe excitement...\nThe learning...\n\nWatch our official field and classroom highlight reel below to see their path to the digital future!",
    loc: "Mees Palace Academy, Jos, Plateau State",
    images: [],
    subtitles: [],
    videos: [
      "/asset/vid 3.mp4"
    ],
    videoSubtitles: [
      "Official highlight video: Joy, excitement, and learning in motion"
    ]
  },
  {
    id: "act-media-brief",
    title: "Media Brief: GICD & Kavod Relief Strategic Partnership Featured on Vanguard",
    tag: "Media & Press Coverage",
    date: "December 24, 2026",
    details: "The Guardian Initiative for Community Development -GICD and Kavod Relief Initiative held a comprehensive Media Briefing to share the vision, strategic milestones, and expected community impacts of our joint 'Goals for Skills: Football Meets Tech' initiative.\n\nThis media briefing highlights our collaborative dedication to boosting child protection, digital literacy, and sustainable development pathways for local adolescents in Angwan Rukuba and wider Plateau State.\n\nRead more details in the official press release.",
    loc: "Jos, Plateau State",
    images: [],
    subtitles: [],
    videos: [
      "/asset/vid 2.mp4"
    ],
    videoSubtitles: [
      "Official GICD and Kavod Relief Initiative joint media brief highlight video"
    ],
    externalLink: {
      label: "Vanguard News Coverage",
      url: "https://www.vanguardngr.com"
    }
  },
  {
    id: "act-mou-announcement",
    title: "Partnership Announcement: Strategic MoU Signed Between GICD & Kavod Relief",
    tag: "Media & Press Coverage",
    date: "December 23, 2025",
    details: "We are proud to announce the signing of a Memorandum of Understanding (MoU) between Kavod Relief Initiative and The Guardian Initiative for Community Development -GICD formalizing a strategic collaboration aimed at expanding access to protection, skills development, and opportunity for adolescents in Plateau State.\n\nThis partnership anchors the implementation of Goals for Skills: Football Meets Tech, an integrated programme that combines sport-based engagement with digital skills training, mentorship, and employability pathways for adolescents. The initiative responds to critical child protection and youth unemployment challenges by providing safe spaces, relevant skills, and structured pathways toward sustainable futures.\n\nAs we close the year, this MoU represents more than a partnership; it reflects strong governance, shared accountability, and a joint commitment to measurable impact. It positions both organizations to effectively leverage resources, strengthen community systems, and deliver scalable, youth-centered interventions in the year ahead.\n\nWe are ending the year with renewed momentum and a clear focus on results.\n\n#StrategicPartnership #YouthDevelopment #ChildProtection #GoalsForSkills #FootballMeetsTech #DonorReady #CollectiveImpact #NGOCollaboration #PlateauStateNGOs",
    loc: "GICD Head Office, Jos, Plateau State",
    images: [
      "/asset/partners.jpg"
    ],
    subtitles: [
      "The official signing of the strategic MoU between the Kavod Relief Initiative and GICD teams for sustainable youth empowerment pathways."
    ]
  },
  {
    id: "act-goals-for-skills-match",
    title: "⚽💻 Goals for Skills: Football Meets Tech Phase 1 & 2 in Angwan Rukuba",
    tag: "Sports & Coexistence Matches",
    date: "December 21, 2026",
    details: "In Angwan Rukuba, where children especially adolescents face the risks of abuse, exploitation, neglect, and the resort to wide adoption of harmful coping mechanisms, The Guardian Initiative for Community Development -GICD in partnership with Kavod Relief Initiative is implementing the Goals for Skills- Football Meets Tech initiative that not only addresses the prevailing challenges but offers sustainable protection and prosperity for children and the community.\n\nIn this phase, the initiative engaged adolescents aged 12 to 18 using football as a gateway to digital skills and career pathways. The energy discipline and talent displayed by the young participants reaffirmed our belief that when given the right opportunities children can truly thrive.\n\nWe are now ready to implement the second phase of the initiative which includes fully funded tech scholarships for the winning team of 11 players, the award of laptops to three outstanding players, and the placement of beneficiaries into ICT mentorship and internship opportunities to deepen their skills and exposure.\n\nWe extend our sincere appreciation to Mees Palace Football Academy for generously offering a trial session to the best player who is set to resume at the academy in January, a remarkable step toward nurturing professional football talent. We also acknowledge the Plateau State Ministry of Women Affairs and Social Development and #TerryEnvohFoundation whose support and partnership contributed greatly to the success of this phase.\n\nWatch the outreach video here: https://drive.google.com/file/d/1ocJlx7kenQvdDi7tAFYd-62C_7G_g0W6/view",
    loc: "Angwan Rukuba Community & Mees Palace, Jos, Plateau State",
    images: [
      "/asset/match 1.jpg",
      "/asset/match 2.jpg",
      "/asset/match 3.jpg",
      "/asset/match 4.jpg",
      "/asset/match 5.jpg",
      "/asset/match 6.jpg",
      "/asset/match 7.jpg",
      "/asset/match 8.jpg",
      "/asset/match 9.jpg",
      "/asset/match 10.jpg",
      "/asset/match 11.jpg",
      "/asset/match 12.jpg",
      "/asset/match 13.jpg",
      "/asset/match 14.jpg",
      "/asset/match 15.jpg",
      "/asset/match 16.jpg",
      "/asset/match 17.jpg",
      "/asset/match 18.jpg",
      "/asset/match 19.jpg",
      "/asset/match 20.jpg",
      "/asset/match 21.jpg",
      "/asset/match 22.jpg",
      "/asset/match 23.jpg"
    ],
    subtitles: [
      "Adolescents from Angwan Rukuba take the pitch for the Football Meets Tech initiative",
      "Warmups and team strategy talks under the guidance of joint GICD and Kavod Relief coaches",
      "Spectators and community members gathering to cheer on the youth players",
      "Exciting match moments showcasing great energy, discipline, and athletic talent",
      "Players demonstrating sportsmanship and teamwork on the Mees Palace pitch",
      "GICD facilitator introducing digital skills and tech scholarship opportunities at halftime",
      "Winning match moments representing hope and sustainable protection for the community's youth",
      "Dynamic defensive play as teams compete passionately for the championship title",
      "Offensive coordination highlighting structured skill development and confidence-building",
      "Coaching staff from Mees Palace Academy monitoring the trial session contenders",
      "Excited players celebrating a hard-earned goal together with immense team spirit",
      "GICD organizers explaining phase two: fully-funded hardware and ICT mentorship awards",
      "Adolescent girls sharing in the active sports-meets-digital-empowerment curriculum",
      "Interactive workshop segment illustrating tech careers compatible with young sports enthusiasts",
      "High-fives and mutual respect between rivals at the final whistle of the tournament",
      "Spectators showing community ownership and local backing for the safe youth pathways",
      "The outstanding player selected for the exclusive Mees Palace Football Academy trial session",
      "Organizers awarding tournament medals and presenting symbolic laptop gifts to MVP standouts",
      "Ministry of Women Affairs & Social Development representatives affirming child protection policies",
      "Kavod Relief Initiative and GICD teams delivering post-match care and motivational speeches",
      "The elite eleven players who earned full technology and digital skills scholarships",
      "Teachers and community mentors standing proud alongside the resilient student athletes",
      "Unified group portrait of the Angwan Rukuba cohort advancing toward professional futures"
    ],
    externalLink: {
      label: "Watch Drive Video",
      url: "https://drive.google.com/file/d/1ocJlx7kenQvdDi7tAFYd-62C_7G_g0W6/view"
    }
  },
  {
    id: "act-onboarding-mentors",
    title: "Onboarding & Training of GICD Community Mentors on Youth Resilience",
    tag: "Staff Onboarding & Surveys",
    date: "December 18, 2025",
    details: "Today we concluded the onboarding and training of our Community Mentors for adolescent children, using the Save the Children Youth Resilience Program- Psychosocial Support in-and-Out of School. An eight-themed framework that supports adolescents to build resilience by learning and applying context relevant skills including decision making, managing emotions, building interpersonal relationships, effective communication skills etc which enables them to thrive especially in troubled times. With the youth resilience program, we are moving our initiative to a more structured support that establishes safety net for adolescents in Angwan Rukuba community where great negative influences tend to affect the healthy development of children.\n\nThe program is also reinforced by a series of parents/caregiver engagements, that ensures all the skills and resilience acquired by the children is supported by positive parenting at home. The Guardian Initiative for Community Development -GICD is committed to strengthening community-led protection approaches that provides lasting stability for all children.\n\n#YouthResilience #ChildProtection #communitydevelopment #PositiveChange",
    loc: "Angwan Rukuba Community, Jos, Plateau State",
    images: [
      "/asset/onboard 1.jpg",
      "/asset/onboard 2.jpg",
      "/asset/onboard 3.jpg",
      "/asset/onboard 4.jpg",
      "/asset/onboard 5.jpg",
      "/asset/onboard 6.jpg"
    ],
    subtitles: [
      "Onboarding session with GICD Community Mentors on Psychosocial Support strategies",
      "Interactive group exercises utilizing the eight-themed Youth Resilience Program framework",
      "Mentors collaborating and discussing context-relevant skills for adolescent guidance",
      "Comprehensive training on building safety nets for adolescents in troubled times",
      "Presenting community-led child protection approaches to local mentors and leaders",
      "The newly trained cohort of GICD Community Mentors set to empower local youth"
    ]
  },
  {
    id: "act-football-meets-tech",
    title: "⚽💻 Football Meets Tech: Goals for Skills Outreach at Mees Palace",
    tag: "Sports & Coexistence Matches",
    date: "December 16, 2025",
    details: "We’re excited to invite you to witness an inspiring blend of sports and technology as adolescents from Angwan Rukuba Community take the field and step into the digital future.\n\nEvent Details:\n📅 Date: Saturday, 20th December 2025\n🏟️ Venue: Mees Palace Academy, Jos – Plateau State\n⏰ Time: 09:00 am\n\nKindly join us and cheer them on!\n\n#FootballMeetsTech #GoalsForSkills #YouthEmpowerment #DigitalLiteracy #CommunityDevelopment #GICD #KAVODRelief",
    loc: "Mees Palace Academy, Jos, Plateau State",
    images: [],
    subtitles: [],
    videos: [
      "/asset/vid 1.mp4"
    ],
    videoSubtitles: [
      "Inspiring GICD sports and digital skills hybrid outreach at Mees Palace Academy"
    ]
  },
  {
    id: "act-donor-orphanages",
    title: "Courtesy of a Donor: Supporting Orphanages & Educational Scholarships",
    tag: "Education Support",
    date: "December 20, 2025",
    details: "Today we spotlight the action of a generous donor, on whose request we visited two orphanages in Jos East and Jos North to extend care, promote dignity of life and encouragement to the children.\n\nOn the donors goodwill we delivered food items that ensured the children could go to bed with warm stomachs, strengthened bodies, and a renewed sense of dignity. For many of them, having enough to eat is not just about nutrition, it is about feeling cared for.\n\nWAEC and JAMB registrations of 16 boys and girls, were also covered, removing a major financial barrier that often limits the chances of children from low income backgrounds to beat illiteracy. This scholarship allows them to complete their secondary education and places then on the vantage position to pursue higher learning.\n\n\"Aunty, we are speechless… we won’t fail you.” they said.",
    loc: "Jos East & Jos North, Plateau State",
    images: [
      "/asset/orph 1.jpg",
      "/asset/orph 2.jpg",
      "/asset/orph 3.jpg",
      "/asset/orph 4.jpg",
      "/asset/orph 5.jpg"
    ],
    subtitles: [
      "Orphanage children receiving essential food items and resources on behalf of the donor",
      "Scholars of the WAEC & JAMB enrollment scholarship program celebrating educational support",
      "GICD team unloading nutritious food provisions to ensure healthy meals for the kids",
      "Interactive session extending words of encouragement and child rights information",
      "Caregivers and community stakeholders posing with sponsored children to express deep gratitude"
    ]
  },
  {
    id: "act-gssfobur",
    title: "Impact Moments: SGBV and Reproductive Health Session at GSS Fobur",
    tag: "Child Protection & Safeguarding",
    date: "December 19, 2025",
    details: "Impact Moments.\n\nIt was wrapt attention at GSS Fobur as The Guardian Initiative for Community Development -GICD, on the invitation of the First Lady, Jos East Local Government Area, engaged adolescent girls from both host and invited schools in a high impact learning session focused on strengthening awareness of sexual and gender-based violence (SGBV) and reproductive health. These are silent topics in the rural communities often characterised by misconceptions. Unfortunately, these are not taught in schools but on this day, over 150 adolescents were reached, with myths dismantled through essential, life-shaping information designed to protect, empower, and guide them.\n\nThe session exposed the girls to their rights, their worth, and the importance of personal safety. This will help them navigate challenges, make informed choices, and stand up for themselves and ourselves with confidence. We appreciate the first lady for the collaborative space to contribute meaningfully to the protection and development of young people as we advance our mission of reaching especially girls and boys in rural communities to whom this knowledge matters and makes a difference.\n\nTogether, we continue to create safer, informed, and empowered communities.\n\n#GICD #GrassrootsImpact #ChildProtection #ReproductiveHealth #SGBVPrevention #YouthEmpowerment #CommunityDevelopment #plateaustatengos",
    loc: "GSS Fobur, Jos East LGA, Plateau State",
    images: [
      "/asset/gss 1.jpg",
      "/asset/gss 2.jpg",
      "/asset/gss 3.jpg"
    ],
    subtitles: [
      "Adolescent girls at GSS Fobur listening with rapt attention during the GICD SGBV awareness session",
      "Facilitator addressing common reproductive health myths and leading discussions on bodily safety",
      "First Lady of Jos East LGA and school management partnering with the GICD delegation to protect and empower rural students"
    ]
  },
  {
    id: "act-countdown-yearend",
    title: "Tik... Tak... Countdown to Year-End: Grassroots Reproductive Health & SGBV School Outreach",
    tag: "Child Protection & Safeguarding",
    date: "December 18, 2025",
    details: "Tik... Tak... Countdown to Year-End.\n\nAs we reflect on our journey so far, we are proud to highlight one of our most impactful grassroots engagements.\n\nIn this activity, we engaged 167 girls and boys from United Faith Tabernacle School, Jarawan Kogi, and Government Secondary School, Federe, Angware, discussing their points of view and equipping them with essential reproductive health information and raising awareness on sexual and gender-based violence.\n\nThe engagement strengthened the children’s understanding of their bodies, their rights, and how to seek help or support when needed. The knowledge they gained will empower them to make safer decisions, protect themselves, speak up confidently, and support one another.\n\nThe confidence and eagerness these students showed reaffirm our belief that informed children are better protected and better prepared for the future.\n\nWe deeply appreciate the warm acceptance of this initiative and the remarkable cooperation of the teachers and school management. Their openness and support played a major role in making this outreach a success.\n\nTogether, we continue to build safer, informed, and empowered communities.\n\n#GICD #GrassrootsImpact #ChildProtection #ReproductiveHealth #SGBVPrevention #CommunityDevelopment #YouthEmpowerment #PlateauState #theguardianinitiativeforcommunitydevelopment",
    loc: "Jarawan Kogi & Angware, Plateau State",
    images: [
      "/asset/tik 1.jpg",
      "/asset/tik 2.jpg",
      "/asset/tik 3.jpg",
      "/asset/tik 4.jpg",
      "/asset/tik 5.jpg",
      "/asset/tik 6.jpg",
      "/asset/tik 7.jpg"
    ],
    subtitles: [
      "Interactive learning session with United Faith Tabernacle School students in Jarawan Kogi",
      "Adolescent SGBV awareness and reproductive health empowerment circle",
      "Students actively engaging in peer discussions on bodily autonomy and rights",
      "Dedicated teachers collaborating with GICD facilitators to support the outreach",
      "Lively Q&A segment reflecting the high curiosity and confidence of the students",
      "Sharing SGBV advocacy materials and outlining critical care referral channels",
      "Group keepsake emphasizing our shared commitment to safer, informed, and resilient futures"
    ]
  },
  {
    id: "act-parents-safeguarding",
    title: "Safe Futures Project: Safeguarding Engagement with Parents & Caregivers",
    tag: "Caregiver Sessions",
    date: "December 14, 2025",
    details: "On Friday, The Guardian Initiative for Community Development conducted a safeguarding-focused engagement with parents and caregivers in Angwan Rukuba community as part of the Safe Futures Project, reinforcing our commitment to informed consent and child protection. We engaged caregivers to clearly explain the purpose of the project, planned activities, expected benefits, and potential risks. Caregivers asked critical questions about our organizational practices and safety measures, which were openly addressed, helping to allay concerns and build trust. Participation was emphasized as voluntary, with transparency and respect guiding the process.\n\nAs an outcome of the engagement, GICD secured the full consent of all caregivers present to work with their children, strengthening our program acceptance and fostering community ownership. This aligns with our ongoing commitment to ethical practice, accountability, and building safer families and resilient communities through the Safe Futures Project.\n\n#ChildProtection #SafeguardingChildren #CommunityEngagement #EthicalPractice #SafeFuturesProject #plateaustatengos",
    loc: "Angwan Rukuba Community, Jos, Plateau State",
    images: [
      "/asset/parent 1.jpg",
      "/asset/parent 2.jpg",
      "/asset/parent 3.jpg",
      "/asset/parent 4.jpg",
      "/asset/parent 5.jpg"
    ],
    subtitles: [
      "GICD team facilitating the safeguarding-focused dialogue with Angwan Rukuba parents",
      "Caregivers actively participating and discussing child rights, consent, and safety measures",
      "Reviewing the Safe Futures Project objectives and transparently outlining proposed activities",
      "Addressing caregivers' questions on organizational ethics and community safeguarding workflows",
      "Securing formal caregiver consent forms to establish mutual collaboration and local ownership"
    ]
  },
  
  {
    id: "act-womensaffairs",
    title: "Research Protocol Approved by Plateau State Ministry of Women Affairs",
    tag: "Child Protection & Safeguarding",
    date: "June 12, 2026",
    details: "Laughs at Last! We are happy to complete a series of engagement with the Honorable Commissioner, Plateau State Ministry of Women Affairs and Social Development, as part of our preparatory activities for the launch of GICD’s Child Protection Assessment in select communities within Jos North. The Commissioner’s signing and approval of the Research Protocol signifies that the assessment will spotlight the critical knowledge gaps in the situation of children in these communities and serve as the corner stone for designing effective, evidence-based child protection interventions in the State. As a community-driven organization, GICD remains committed to advancing locally grounded research that amplifies the voices of children, families, and communities, ensuring that development initiatives are not only context-specific, but ethically responsive to the real situations on the ground. #ChildProtection #CommunityDevelopment #EvidenceBasedIntervention",
    loc: "Ministry of Women Affairs, Jos",
    images: [
      "/asset/part a 1.jpg",
      "/asset/part a 2.jpg"
    ],
    subtitles: [
      "Honorable Commissioner signing the Research Protocol for the Child Protection Assessment",
      "GICD delegates presenting preparatory roadmap and strategic milestones inside the state ministry"
    ]
  },
  {
    id: "act-speaksout",
    title: "GICD Speaks Out: Media Feature on Substance Abuse Crisis",
    tag: "Media & Press Coverage",
    date: "June 12, 2026",
    details: "GICD Speaks Out! Our recent media feature exposes the alarming rise of substance abuse among adolescents in local schools and communities. A silent crisis demanding urgent attention. At GICD, we are committed to building safe communities for every child. #ChildProtection #YouthResilience #CommunityDevelopment",
    loc: "Plateau State, Nigeria",
    images: [],
    subtitles: [],
    externalLink: {
      label: "Red alert: Young people hooked on hard drugs | ThisNigeria",
      url: "https://thisnigeria.com"
    }
  },
  {
    id: "act-tudunwada",
    title: "Safe Futures Project Design & Consultation with Tudun Wada Community",
    tag: "Child Protection & Safeguarding",
    date: "June 11, 2026",
    details: "Protection for Every Child; Empowerment for Every Youth; Resilience for Every Community. Today, The Guardian Initiative for Community Development (GICD) is excited to share an inspiring step in our mission to protect and empower children and young people. Earlier today, we sat with the Sarkin Tudun Wada and his community leaders to consult and incorporate their insights into the design of The GICD Safe Futures Project, an initiative to engage and work with children and youth on their rights, support them to develop positive coping skills and the resilience to overcome socio-economic pressures leading to the twin menace of drug abuse & teenage pregnancy, as well as strengthen family and community support systems. The meeting was deeply interactive as community leaders raised critical questions on the legal status of GICD as an organization, the projects implementation approach, and the rationale for target group selection, while offering suggestions to project activities timing, effective ways to mobilize and engage community members, as well as expressed optimism on the success of the initiative. The communities openness to ask and discuss the tough questions today assures of readiness and commitment to take ownership and lead a change. Hope is not just rising, it is taking root in Tudun Wada. #GICD #SafeFuturesProject #ChildProtection #YouthEmpowerment #CommunityDevelopment",
    loc: "Tudun Wada Community, Jos North",
    images: [
      "/asset/part b 1.jpg",
      "/asset/part b 2.jpg",
      "/asset/part b 3.jpg",
      "/asset/part b 4.jpg",
      "/asset/part b 5.jpg"
    ],
    subtitles: [
      "Consultation circle with Sarkin Tudun Wada and senior community elders",
      "Dialogue addressing organizational compliance of GICD as a registered NGO",
      "Briefing community delegates on the youth drug prevention agenda",
      "Tudun Wada leaders offering tactical scheduling suggestions for adolescent mobilization",
      "Mutual commitment and handshake representing local project ownership and grassroots buy-in"
    ]
  },
  {
    id: "act-safeschools",
    title: "Advocacy Alert: Urgent Call for School Protection and Safety",
    tag: "Child Protection & Safeguarding",
    date: "November 21, 2025",
    details: "47 Unity schools closed Nation wide as Government Junior Model Secondary Schools (GJMSSs) are set to close effective Saturday, 22 November 2025 while Primary and Day Schools close effective Monday, 24 November 2025 in Plateau State. Insecurity is denying many Nigerian children their right to safe and quality education. We call on the government to take urgent preventative action to protect schools and ensure children can learn without fear. Our children deserve safe classrooms, not crises. #SafeSchoolsNow #ProtectOurChildren #RightToEducation",
    loc: "Plateau State, Nigeria",
    images: [
      "/asset/part c 1.jpg"
    ],
    subtitles: [
      "Advocacy representation emphasizing classroom security and the fundamental right to education"
    ]
  },
  {
    id: "act-volunteers",
    title: "Call for Volunteers: Community Child & Adolescent Mentors",
    tag: "Volunteer Opportunities",
    date: "October 15, 2025",
    details: "CALL FOR VOLUNTEERS! Are you passionate about Children and Community Development? The Guardian Initiative for Community Development (GICD) is looking for dedicated individuals to serve as Mentors to children and adolescents. Requirements: Prospective Volunteers must hold a BSc, HND, or ND certificate; must reside in the community; and must be of proven character and integrity verifiable by the community. No experience? No problem, training will be provided! Deadline: Thursday, 23rd October 2025. Apply via: info@thegicd.org or submit a hard-copy application letter at GICD Office: No 28A, Tafawa Balewa Street, Opp. United Baptist Church, Jos. Let's build a brighter future, together. #VolunteerOpportunity #GICD #AngwanRukuba #CommunityDevelopment #LifeSkills #Resilience #ChildProtection",
    loc: "Angwan Rukuba Community, Jos North",
    images: [
      "/asset/vol 1.jpg",
      "/asset/vol 2.jpg",
      "/asset/vol 3.jpg"
    ],
    subtitles: [
      "Mentors during the previous orientation and training sessions",
      "Interactive focus group on adolescent trauma-informed guardianship",
      "GICD team leads detailing field assignments in Jos"
    ]
  },
  {
    id: "act-safefutures",
    title: "Safe Futures Project Launch & Ministry Sensitization",
    tag: "Child Protection & Safeguarding",
    date: "June 10, 2026",
    details: "Hope is Rising in Angwan Rukuba Community! The Guardian Initiative for Community Development (GICD) is thrilled to share a new chapter in our mission to protect and empower young people. This week, we engaged with the Plateau State Ministry of Women Affairs and Social Development and key community stakeholders in Angwan Rukuba to set the stage for the launch of our Safe Futures Project, a bold initiative aimed at supporting adolescent boys and girls break free from drug use, prevent teenage pregnancy, and strengthen community and family support for every child. This collaboration is not just a meeting, it is the building blocks for safer, stronger, and more resilient communities across Plateau State. #GICD #SafeFuturesProject #ChildProtection #CommunityDevelopment",
    loc: "Angwan Rukuba Community, Jos North",
    images: [
      "/asset/start 1.jpg",
      "/asset/start 2.jpg",
      "/asset/start 3.jpg"
    ],
    subtitles: [
      "Sensitization meeting with ministry representatives and advisors",
      "GICD management detailing Safe Futures core initiatives in Jos",
      "Angwan Rukuba community delegates pledging strategic support"
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
  {
    id: "social_vid",
    url: "/asset/social vid.mp4",
    title: "Resilience & Skill Set",
    desc: "Children often possess the ability to push through and overcome challenges and setbacks.\n\nAll they need is the skill set.",
    duration: "0:28"  
  },
{
    id: "vid2",
    url: "/asset/vid 2.mp4",
    title: "Media Brief",
    desc: "The Guardian Initiative for Community Development -GICD and Kavod Relief Initiative Media Brief.",
    duration: "1:12"
  },
{
    id: "vid4",
    url: "/asset/vid 4.mp4",
    title: "Safe Futures Project Survey",
    desc: "Engaged adolescents enrolled in our Safe Futures Project in Angwan Rukuba Community, in a structured survey designed to better understand their lived realities, aspirations, and challenges.",
    duration: "1:04"
  },
{
    id: "vid5",
    url: "/asset/vid 5.mp4",
    title: "International Women's Day Celebration",
    desc: "On International Women's Day, we celebrate the remarkable women whose leadership, professionalism, and commitment strengthen the work of GICD.",
    duration: "0:48"
  }
];

interface HeroSlideItem {
  img: string;
  tag: string;
  title: string;
  desc: string;
}

export default function App() {
  // View/Tab control: home, about, programs, activities, media, trustees, contact, annual-report
  const [view, setView] = useState<"home" | "about" | "programs" | "activities" | "media" | "trustees" | "contact" | "annual-report">("home");

  // Hero Carousel Index State and automated transitions
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [
    "/asset/cover.jpg",
    "/asset/match 18.jpg",
    "/asset/new 1.jpg",
    "/asset/future 2.jpg",
    "/asset/hon 5.jpg"
  ];
    // Mobile Touch Swipe Trackers for carousel
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(e.targetTouches[0].clientX); // initialize to avoid undefined behavior
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const diffX = touchStartX - touchEndX;
    const minSwipeDistance = 40; // minimum distance to register a swipe in pixels
    if (diffX > minSwipeDistance) {
      // Swiped left -> Next slide
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    } else if (diffX < -minSwipeDistance) {
      // Swiped right -> Prev slide
      setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };
useEffect(() => {
    if (view !== "home") return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 5);
    }, 6000); // Auto-slide every 6 seconds
    return () => clearInterval(interval);
  }, [view]);
  
  
  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active page for the 2025 Annual Results Report
  const [reportPage, setReportPage] = useState<number>(0);

  // Modal control states
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("child_protection");

  // Filter states
  const [activeActivityTag, setActiveActivityTag] = useState<string>("All");
  const [galleryFilter, setGalleryFilter] = useState<string>("All");
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

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

  const scrollToProgramUpdates = () => {
    if (view !== "home") {
      setView("home");
    }
    setTimeout(() => {
      const el = document.getElementById("activities");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };
  const [contactData, setContactData] = useState({ name: "", email: "", phone: "", message: "" });
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `GICD Contact: Message from ${contactData.name}`;
    const body = `Hello GICD Admin,\n\nYou have received a new contact submission from your website:\n\nName: ${contactData.name}\nEmail: ${contactData.email}\nPhone: ${contactData.phone || "N/A"}\n\nMessage:\n${contactData.message}\n\nRegards.`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@thegicd.org&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
    triggerToast("Thank you! Opening Gmail to send this message to info@thegicd.org");
    setContactData({ name: "", email: "", phone: "", message: "" });
  };

  const activityTags = [
    "All", 
    "Media & Press Coverage",
    "Volunteer Opportunities",
    "Child Protection & Safeguarding",
    "Coexistence Workshops", 
    "Caregiver Sessions", 
    "Education Support", 
    "Sports & Coexistence Matches", 
    "Staff Onboarding & Surveys", 
    "Honors & Certificates"
  ];

  return (
    <div className="min-h-screen bg-white transition duration-300 relative font-sans flex flex-col antialiased" id="gicd-app-root">
      
      {/* SECTION 2 — DOCKABLE NAVIGATION HEADER */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100 shadow-sm px-6 py-3.5 flex justify-between items-center transition duration-200" id="gicd-navbar">
        <button onClick={() => setView("home")} className="flex items-center gap-3 active:scale-98 transition text-left cursor-pointer bg-transparent border-0">
          <img src="/asset/logo.jpg" alt="GICD Logo" className="w-10 h-10 rounded-full bg-slate-50 border border-brand-yellow/30" />
          <div className="flex flex-col text-left">
            <span className="font-sans font-black tracking-tight text-brand-black text-xl leading-none uppercase">GUARDIAN INITIATIVE</span>
            <span className="text-[9px] text-brand-black font-mono tracking-wide uppercase mt-0.5">FOR COMMUNITY DEVELOPMENT</span>
          </div>
        </button>

        {/* Desktop Menu links */}
        <div className="hidden lg:flex items-center gap-6 text-[#111111] font-sans font-semibold text-xs py-1">
          <button onClick={() => setView("home")} className={`hover:text-amber-600 transition tracking-wide uppercase cursor-pointer bg-transparent border-none ${view === "home" ? "text-amber-600 font-black border-b-2 border-brand-yellow pb-1 px-1" : ""}`}>Home</button>
          <button onClick={() => setView("about")} className={`hover:text-amber-600 transition tracking-wide uppercase cursor-pointer bg-transparent border-none ${view === "about" ? "text-amber-600 font-black border-b-2 border-brand-yellow pb-1 px-1" : ""}`}>About Us</button>
          <button onClick={() => setView("programs")} className={`hover:text-amber-600 transition tracking-wide uppercase cursor-pointer bg-transparent border-none ${view === "programs" ? "text-amber-600 font-black border-b-2 border-brand-yellow pb-1 px-1" : ""}`}>Core Programs</button>
          <button onClick={scrollToProgramUpdates} className={`hover:text-amber-600 transition tracking-wide uppercase cursor-pointer bg-transparent border-none ${view === "activities" ? "text-amber-600 font-black border-b-2 border-brand-yellow pb-1 px-1" : ""}`}>Program Update</button>
          <button onClick={() => setView("annual-report")} className={`hover:text-amber-600 transition tracking-wide uppercase cursor-pointer bg-transparent border-none ${view === "annual-report" ? "text-amber-600 font-black border-b-2 border-brand-yellow pb-1 px-1" : ""}`}>Reports & Resources</button>
          <button onClick={() => setView("media")} className={`hover:text-amber-600 transition tracking-wide uppercase cursor-pointer bg-transparent border-none ${view === "media" ? "text-amber-600 font-black border-b-2 border-brand-yellow pb-1 px-1" : ""}`}>Media Center</button>
          <button onClick={() => setView("trustees")} className={`hover:text-amber-600 transition tracking-wide uppercase cursor-pointer bg-transparent border-none ${view === "trustees" ? "text-amber-600 font-black border-b-2 border-brand-yellow pb-1 px-1" : ""}`}>Board of Trustees</button>
        </div>

        {/* Call to action */}
        <div className="hidden sm:flex items-center gap-3">
          <button 
            type="button"
            onClick={openDonate}
            className="px-5 py-2 bg-brand-yellow text-brand-black font-sans font-black text-xs uppercase tracking-wider rounded-full hover:brightness-105 transition active:scale-95 shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
            id="nav-donate-cta"
          >
            <span>Direct Support</span>
            <Heart className="w-3.5 h-3.5 fill-brand-black" />
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="lg:hidden p-2 rounded-lg text-brand-black hover:bg-gray-100 transition focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
          id="nav-mobile-hamburger"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile menu overlay panel */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-150 p-6 flex flex-col gap-4 shadow-xl z-50 lg:hidden animate-fade-in" id="mobile-menu-dropdown">
            <button 
              onClick={() => { setView("home"); setMobileMenuOpen(false); }}
              className={`text-sm font-bold py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider cursor-pointer bg-transparent border-none ${view === "home" ? "text-amber-600" : "text-brand-black"}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setView("about"); setMobileMenuOpen(false); }}
              className={`text-sm font-bold py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider cursor-pointer bg-transparent border-none ${view === "about" ? "text-amber-600" : "text-brand-black"}`}
            >
              Who We Are
            </button>
            <button 
              onClick={() => { setView("programs"); setMobileMenuOpen(false); }}
              className={`text-sm font-bold py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider cursor-pointer bg-transparent border-none ${view === "programs" ? "text-amber-600" : "text-brand-black"}`}
            >
              Core Programs
            </button>
            <button 
              onClick={() => { scrollToProgramUpdates(); setMobileMenuOpen(false); }}
              className={`text-sm font-bold py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider flex items-center justify-between cursor-pointer bg-transparent border-none ${view === "activities" ? "text-amber-600" : "text-brand-black"}`}
            >
              <span>Program Update</span>
              <span className="px-2 py-0.5 bg-[#F5C518] text-brand-black text-[9px] font-black rounded">NEW</span>
            </button>
            <button 
              onClick={() => { setView("annual-report"); setMobileMenuOpen(false); }}
              className={`text-sm font-bold py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider flex items-center justify-between cursor-pointer bg-transparent border-none ${view === "annual-report" ? "text-amber-600" : "text-brand-black"}`}
            >
              <span>Reports & Resources</span>
              <span className="px-2 py-0.5 bg-brand-yellow text-brand-black text-[9px] font-black rounded font-bold">DOCS</span>
            </button>
            <button 
              onClick={() => { setView("trustees"); setMobileMenuOpen(false); }}
              className={`text-sm font-bold py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider cursor-pointer bg-transparent border-none ${view === "trustees" ? "text-amber-600" : "text-brand-black"}`}
            >
              Board of Trustees
            </button>
            <button 
              onClick={() => { setView("media"); setMobileMenuOpen(false); }}
              className={`text-sm font-bold py-1.5 border-b border-gray-50 text-left uppercase font-mono tracking-wider cursor-pointer bg-transparent border-none ${view === "media" ? "text-amber-600" : "text-brand-black"}`}
            >
              Media Center
            </button>
                        
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

                {/* SECTION 3 — HERO STAGE WITH IMAGE CAROUSEL BACKDROP */}
      {view === "home" && (
        <>
          <section 
            className="relative min-h-[460px] sm:min-h-[550px] lg:min-h-[660px] flex items-center bg-brand-black text-white select-none overflow-hidden group touch-pan-y"
            id="home-hero"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carousel images backdrop with smooth crossfade */}
            <div className="absolute inset-0 z-0">
              {heroImages.map((img, idx) => (
                <div
                  key={img}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === heroIndex ? "opacity-80" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={img}
                    alt={`GICD Hero Slide ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
              {/* Overlay shading to guarantee highly legible text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/35 to-brand-black/25 z-[1]" />
            </div>

            {/* Prev/Next arrows with subtle styling (Hidden on cellular mobile view to bypass overlapping) */}
            <button
              type="button"
              onClick={() => setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-black/50 hover:bg-[#F5C518] hover:text-brand-black text-white hidden sm:flex items-center justify-center transition border border-white/10 cursor-pointer z-25 opacity-0 group-hover:opacity-100 sm:opacity-75 focus:opacity-100"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>            
                  <button
              type="button"
              onClick={() => setHeroIndex((prev) => (prev + 1) % heroImages.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-black/50 hover:bg-[#F5C518] hover:text-brand-black text-white hidden sm:flex items-center justify-center transition border border-white/10 cursor-pointer z-25 opacity-0 group-hover:opacity-100 sm:opacity-75 focus:opacity-100"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 w-full py-12 sm:py-20 lg:py-32 text-center flex flex-col items-center justify-center">

              <div className="space-y-5 sm:space-y-8 flex flex-col items-center max-w-3xl">
                                
                <h1 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight uppercase font-extrabold text-center px-2">
                  GUARDIAN INITIATIVE <span className="text-white sm:block sm:mt-1">FOR COMMUNITY DEVELOPMENT</span>
                </h1>
                
                <p className="text-xs sm:text-base text-gray-300 tracking-wide font-sans leading-relaxed text-center max-w-2xl px-3">
                  Guardian Initiative for Community Development (GICD) is a frontline NGO in Jos, Nigeria dedicated to Community development, Child protection, Education and sustainable Youth Development & Empowerment.
                </p>
              </div>
           {/* Slider indicator dots */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
                {heroImages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setHeroIndex(dotIdx)}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all cursor-pointer border-0 p-0 ${
                      dotIdx === heroIndex ? "bg-[#F5C518] w-5 sm:w-7" : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4 — STAT COUNTERS STRIP */}
          <section className="bg-brand-black py-6 sm:py-10 border-y border-gray-900 select-none" id="gicd-quick-impact-stats">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
              {STATS_DATA.map((st) => (
                <StatCounter 
                  key={st.id} 
                  targetNumber={st.number} 
                  textValue={st.textValue}
                  suffix={st.suffix} 
                  label={st.label} 
                />
              ))}
            </div>
          </section>

          {/* HOME VIEW: focused, concise and modern */}
          <div className="space-y-16 py-16 bg-white animate-fade-in" id="gicd-home-content">
            {/* Core intro */}
            <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6">
                  <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black block">WELCOME TO GICD</span>
                  <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight leading-tight">
                    BUILDING SECURE AND RESILIENT <span className="text-[#F5C518]">COMMUNITIES</span>
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed max-w-3xl mx-auto">
                    We intervene early and deliberately to safeguard child rights, expand the worldview of young people on the Plateau, and empower caregivers through grassroots, evidence-driven initiatives. By translating global protection frameworks into meaningful local action, GICD ensures vulnerable children and families find sustainable safety, proper education support, and peer coexistence opportunities directly inside Angwan Rukuba and wider Jos North communities.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button 
                      onClick={() => setView("about")} 
                      className="px-5 py-2.5 bg-brand-black text-[#F5C518] rounded-xl font-sans font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-97 cursor-pointer border-none"
                    >
                      Read Our Whole Story
                    </button>
                    <button 
                      onClick={() => setView("programs")} 
                      className="px-5 py-2.5 bg-slate-100 text-brand-black rounded-xl font-sans font-bold text-xs uppercase tracking-wider hover:bg-slate-200 active:scale-97 cursor-pointer border border-slate-200"
                    >
                      Explore Programs
                    </button>
                </div>
            </div>

            {/* Micro Highlight section: Back-to-School or Child protective focus */}
            <div className="bg-brand-black text-white relative py-12 select-none overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/asset/orph 5.jpg')" }} />
              <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
                <span className="text-[10px] font-mono text-[#F5C518] tracking-widest uppercase font-bold px-2 py-0.5 bg-[#F5C518]/10 rounded border border-[#F5C518]/20">CURRENT HIGH-IMPACT DRIVE</span>
                <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-white leading-tight">Support Safe Futures in Jos North</h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
                  We are actively engaging communities to build child protection systems, provide life-skills education, and prepare essential back-to-school materials for vulnerable boys and girls. Help us sustain safer futures.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={openDonate}
                    className="px-6 py-2 bg-brand-yellow text-brand-black font-sans font-black text-xs uppercase tracking-wider rounded-full hover:brightness-105 active:scale-95 shadow-md flex items-center gap-1.5 mx-auto cursor-pointer border-none"
                  >
                    <span>Support This Drive</span>
                    <Heart className="w-3.5 h-3.5 fill-brand-black" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* COMPACT PAGE HEADER STRIP FOR SUB-PAGES */}
      {view !== "home" && (
        <div className="bg-brand-black text-white py-12 border-b border-gray-900 select-none relative overflow-hidden" id="gicd-page-header">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#F5C518] tracking-widest uppercase font-black">
                Guardian Initiative For Community Development
              </span>
              <h1 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1 leading-none">
                {view === "about" && "Who We Are"}
                {view === "programs" && "GICD Core Programs"}
                {view === "activities" && "Program Update"}
                {view === "media" && "Media Center"}
                {view === "trustees" && "Board & Trustees"}
                {view === "annual-report" && "Reports & Resources"}
              </h1>
            </div>
            <div className="text-left">
              <button 
                onClick={() => setView("home")}
                className="px-4 py-2 bg-[#F5C518] hover:bg-[#F5C518]/90 text-[#111111] font-sans font-black text-[10px] uppercase tracking-wider rounded-lg border-none transition cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <span>← Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5 — CHRONOLOGY & FOCUS VALUES */}
      {view === "about" && (
        <section className="py-20 bg-white shadow-sm" id="about">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            
           <div className="max-w-3xl mx-auto space-y-8 text-left">
              
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

          </div>
        </section>
      )}

      {/* SECTION 6 — CORE TRANSFORMATIVE PROGRAMS */}
      {view === "programs" && (
        <section className="py-20 bg-gray-50 border-y border-gray-100 shadow-sm animate-fade-in" id="programs">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black">WHAT WE DO</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight">
                GICD CORE PROGRAMS
              </h2>
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
                    className="bg-white p-6 rounded-2xl transition duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                    id={`program-card-${prog.id}`}
                  >
                    <div className="space-y-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
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
                        className="text-amber-600 hover:text-amber-700 font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 transition bg-transparent border-0"
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
      )}

      {/* SECTION 7 — INTERACTIVE RECENT FIELD ACTIVITIES AND LIVE PHOTOS */}
      {(view === "home" || view === "activities") && (
        <section className="py-20 bg-white shadow-sm animate-fade-in border-t border-gray-100" id="activities">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black">PROGRAM UPDATES</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight">
                LATEST PROGRAM UPDATES
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-sans max-w-lg mx-auto leading-relaxed">
                Stay updated with the real-time outcomes and field photographs from our community programs in Plateau State. Click on any program title to expand and read the full update.
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
                      ? "bg-brand-black text-[#F5C518] border-none shadow-md" 
                      : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Activities List */}
            <div className="space-y-12 text-left pt-6 max-w-5xl mx-auto">
              {filteredActivities.map((rawAct) => {
                const act = {
                  ...rawAct,
                  title: rawAct.title.replace(/^[\s✨🗺️🧠🖤🎈🌱📊🗣️🤝🔍💜🏫📝🏛️⚽💻]+/gu, "").trim(),
                  details: rawAct.details.replace(/#[\w\d]+/g, "").replace(/[\s|•·\-*]+$/g, "").trim()
                };
                const isExpanded = !!expandedPosts[act.id];
                return (
                  <div 
                    key={act.id}
                    className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-6 hover:shadow-md transition duration-300 shadow-sm"
                    id={`activity-feed-${act.id}`}
                  >
                    {/* Header meta parameters */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2">
                      <div>
                        <span className="px-2.5 py-0.5 bg-[#F5C518]/20 border border-[#F5C518]/30 rounded text-amber-700 font-mono text-[9px] uppercase tracking-wider font-extrabold mr-2">
                          {act.tag}
                        </span>
                   </div>
                  </div>
                    {/* Interactive Clickable Title */}
                    <h3 
                      onClick={() => setExpandedPosts(prev => ({ ...prev, [act.id]: !isExpanded }))}
                      className="font-sans font-black text-base sm:text-lg text-brand-black leading-tight uppercase font-extrabold text-left cursor-pointer hover:text-amber-600 transition flex items-center justify-between gap-4 select-none group"
                    >
                      <span className="group-hover:underline">{act.title}</span>
                      <span className="shrink-0 text-amber-500 bg-white shadow-xs p-1.5 rounded-full flex items-center justify-center">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </h3>

                    {/* COLLAPSED VIEW: Title and exactly one picture */}
                    {!isExpanded && (
                    <div className="space-y-4 animate-fade-in">
                        {act.images && act.images.length > 0 && (
                          <div 
                            onClick={() => setExpandedPosts(prev => ({ ...prev, [act.id]: true }))}
                            className="relative h-48 sm:h-64 md:h-80 w-full rounded-xl overflow-hidden cursor-pointer shadow-sm group bg-slate-100"
                          >
                            <img 
                              src={act.images[0]} 
                              alt={act.title} 
                              className="w-full h-full object-cover group-hover:scale-[1.01] transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                            <div className="absolute bottom-4 right-4 bg-brand-black/90 text-[#F5C518] px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 transition group-hover:brightness-110">
                              <span>Read Full Update</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                            </div>
                        )}
                        <p className="text-xs text-gray-500 font-sans italic">
                          Click on the title or image to read the full update and view more photos.
                        </p>
                      </div>
                    )}

                    {/* EXPANDED VIEW: Details text, at most 3 images, videos */}
                    {isExpanded && (
                      <div className="space-y-6 animate-fade-in">
                  <p className="text-xs text-gray-600 sm:text-sm font-sans leading-relaxed tracking-wide">
                    {act.details}
                  </p>

                  {/* Press External Source Button if present */}
                  {act.externalLink && (
                    <div className="pt-1">
                      <a 
                        href={act.externalLink.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-brand-yellow/40 hover:border-brand-yellow hover:bg-amber-100/50 text-amber-800 text-xs font-semibold rounded-xl transition duration-200"
                        id={`external-link-${act.id}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-sans tracking-tight">
                          Press Source: <span className="underline decoration-amber-500/50 hover:decoration-amber-600">{act.externalLink.label}</span>
                        </span>
                      </a>
                    </div>
                  )}

                  {/* Grid of actual photographs representing this event - AT MOST THREE */}
                        {act.images && act.images.length > 0 && (
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase mb-3 text-left">
                              Verified Field Photos (At Most 3 - Click to Enlarge)
                            </span>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {act.images.slice(0, 3).map((imgSrc, imgIdx) => {
                                const caption = act.subtitles[imgIdx] || `Field photo of ${act.title}`;
                                return (
                                  <div
                                    key={imgSrc}
                                    onClick={() => setExpandedImage({ src: imgSrc, caption: caption })}
                                    className="group h-44 sm:h-48 rounded-xl overflow-hidden shadow-sm cursor-pointer relative bg-slate-100"
                                  >
                              <img 
                                src={imgSrc} 
                                alt={caption} 
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-[10px] font-mono border border-white/40 px-2.5 py-1 rounded bg-black/40">
                                        Enlarge
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Videos representing this event if any */}
                  {act.videos && act.videos.length > 0 && (
                    <div className="mt-4">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase mb-3 text-left">
                        Verified Field Video
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {act.videos.map((vidSrc, vidIdx) => {
                          const caption = act.videoSubtitles?.[vidIdx] || `Field video of ${act.title}`;
                          return (
                                  <div key={vidSrc} className="rounded-xl overflow-hidden shadow-sm bg-black max-w-lg">
                                    <video  
                                src={vidSrc} 
                                controls 
                                className="w-full h-auto aspect-video object-cover"
                                preload="metadata"
                                playsInline
                              />
                              <div className="p-2.5 bg-white">
                                <p className="text-[11px] text-slate-500 font-sans italic text-left leading-normal">
                                  {caption}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                            {/* Collapse footer button */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-150">
                          <button
                            onClick={() => setExpandedPosts(prev => ({ ...prev, [act.id]: false }))}
                            className="text-[10px] font-mono font-bold text-amber-700 hover:text-amber-800 transition uppercase tracking-wider flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span>Collapse Update</span>
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* SECTION 8 — REAL FIELD VIDEOS AND CAMPAIGNS CENTER */}
      {view === "media" && (
        <section className="py-20 bg-brand-black border-y border-gray-950 text-white relative animate-fade-in" id="video-hub">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-mono text-[#F5C518] tracking-widest uppercase font-bold">MEDIA HUB</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                FIELD VIDEO RECORDS
              </h2>
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
                    <p className="text-[11px] text-gray-400 leading-relaxed whitespace-pre-line pr-2">{video.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* SECTION 9 — BOARD TRUSTEES & LEADERS DIRECTORY */}
      {view === "trustees" && (
        <section className="py-20 bg-white shadow-sm animate-fade-in" id="trustees">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-16">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black">STRENGTH IN STRUCTURE</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight">
                TRUSTEES & BOARD
              </h2>
            </div>

            {/* Grid of Trustees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
              {TRUSTEES_DATA.map((tr) => (
                <div 
                  key={tr.id}
                  className="p-5 bg-gray-50 border border-slate-100 rounded-2xl hover:bg-slate-100 hover:border-amber-200 hover:shadow-md transition duration-300 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-4">
                        {tr.image ? (
                          <div 
                        onClick={() => setExpandedImage({ src: tr.image, caption: `${tr.name} — ${tr.role}` })}
                        className="w-full h-44 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 cursor-pointer group relative border border-slate-200"
                        title="Click to expand biography"
                      >
                        <img 
                          src={tr.image} 
                          alt={tr.name} 
                          className="w-full h-full object-cover group-hover:scale-[1.05] transition duration-300" 
                          referrerPolicy="no-referrer"
                        />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 text-[10px] font-mono border border-white/40 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm shadow-lg">
                            Click to Enlarge
                          </span>
                        </div>
                      </div>
                        ) : (
                      <div className="w-full h-44 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                        <span className="font-sans font-black text-brand-yellow text-3xl">{tr.initials}</span>
                       </div>
                      )}
                      <div>
                        <h4 className="font-sans font-bold text-sm uppercase text-brand-black leading-tight">{tr.name}</h4>
                      <p className="text-[10px] text-amber-600 font-mono font-semibold mt-1">{tr.role}</p>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans line-clamp-4 hover:line-clamp-none transition duration-300">{tr.bio}</p>
                  </div>
                  
                  <div className="pt-3 mt-4 text-[9px] font-mono text-amber-700 uppercase tracking-wider font-bold border-t border-slate-200">
                    {tr.name.includes("Dayok") ? "Board Chairman" : tr.name.includes("Atihong") ? "Board Secretary" : "Board Trustee"}
                  </div>
                </div>
              ))}
            </div>
      {/* Executive Implementation section removed on request */}
          
          </div>
        </section>
      )}

      {/* SECTION 11 — TESTIMONIALS */}
      {view === "about" && (
        <section className="py-20 bg-white shadow-sm animate-fade-in" id="testimonials">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black">TESTIMONIES</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black uppercase tracking-tight text-center leading-none">
                VOICES FROM THE COMMUNITIES
              </h2>
            </div>

           <div className="max-w-3xl mx-auto text-left">
              {TESTIMONIALS_DATA.map((test) => (
                <div 
                  key={test.id}
                  className="p-6 sm:p-10 bg-gray-50 border border-gray-150 rounded-2xl flex flex-col justify-between space-y-6 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute -top-2 -right-2 text-gray-200/40 text-8xl font-serif pointer-events-none select-none">“</div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-sans whitespace-pre-line">
                    {test.quote}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t border-gray-200/60 pt-5">
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm uppercase text-brand-black tracking-wide">{test.author}</h5>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-mono mt-0.5">{test.role}</p>
                    </div>
                    <span className="self-start sm:self-center text-[10px] sm:text-xs text-[#F5C518] bg-brand-black px-3 py-1 font-bold font-mono rounded">
                      {test.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}
            
      {/* SECTION 13.7 — INTERACTIVE ANNUAL REPORT VIEWER */}
      {view === "annual-report" && (
        <section className="py-10 sm:py-16 bg-white min-h-[500px] animate-fade-in" id="annual-report-view">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            
            {/* Narrative Intro */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <span className="text-xs font-mono text-amber-600 tracking-widest uppercase font-black px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200 inline-block mb-3">
                Official Repository & Technical Publications
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-4xl text-brand-black uppercase tracking-tight">
                REPORTS & TECHNICAL RESOURCES
              </h2>
              <p className="text-[11px] sm:text-sm text-gray-500 font-sans leading-relaxed mt-2">
                Access GICD's annual impact reports, technical policy frameworks, research publications, child protection guidelines, and strategic development resources.
              </p>
            </div>

            {/* Main interactive window */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Left column: Sidebar Pagination Index */}
              <div className="lg:col-span-4 space-y-4 order-2 lg:order-1 select-none w-full">
                <div className="p-3 sm:p-4 bg-slate-50 border border-gray-150 rounded-2xl">
                  <h4 className="font-sans font-bold text-[10px] sm:text-xs text-brand-black uppercase tracking-wider mb-2.5 pb-2 border-b border-gray-200 text-left hidden lg:block">
                    REPORT SECTIONS
                  </h4>
                  
                  {/* Horizontally scrollable on mobile, vertical stack on desktop */}
                  <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 pb-2 lg:pb-0 scrollbar-none snap-x text-left">
                    {[
                      { label: "0. Cover", fullLabel: "0. Annual Report Cover", id: 0 },
                      { label: "1. Summary", fullLabel: "1. Executive Summary", id: 1 },
                      { label: "2. Protection", fullLabel: "2. Child Protection", id: 2 },
                      { label: "3. Skills", fullLabel: "3. Skills Development", id: 3 },
                      { label: "4. Support", fullLabel: "4. Scholarship Support", id: 4 },
                      { label: "5. Safe Spaces", fullLabel: "5. GBV & Reproductive Health", id: 5 },
                      { label: "6. Alliances", fullLabel: "6. Strategic Partnerships", id: 6 },
                      { label: "7. Financials", fullLabel: "7. Financial Snapshot", id: 7 }
                    ].map((page) => (
                      <button
                        key={page.id}
                        onClick={() => setReportPage(page.id)}
                        className={`snap-start shrink-0 text-center lg:text-left px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl font-sans text-xs transition flex items-center justify-between cursor-pointer border-none bg-transparent whitespace-nowrap lg:whitespace-normal ${
                          reportPage === page.id
                            ? "bg-[#F5C518] text-brand-black font-black font-extrabold shadow-sm"
                            : "text-gray-650 hover:bg-gray-100 hover:text-brand-black font-medium bg-gray-100 lg:bg-transparent"
                        }`}
                      >
                        <span className="hidden lg:inline">{page.fullLabel}</span>
                        <span className="inline lg:hidden">{page.label}</span>
                        {reportPage === page.id && <span className="w-1.5 h-1.5 rounded-full bg-brand-black shrink-0 ml-1.5 hidden lg:inline-block" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: Interactive slide preview and text description */}
              <div className="lg:col-span-8 space-y-4 sm:space-y-6 order-1 lg:order-2 w-full">
                
                {/* Slide Deck Area */}
                <div className="bg-white border border-gray-150 p-0.5 sm:p-2 rounded-2xl sm:rounded-3xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[410px]">
                  
                  {/* Slide Body Wrapper */}
                  <div className="flex-1 p-2 sm:p-6 flex flex-col justify-center">
                    {reportPage === 0 && (
                      <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5 py-4 sm:py-6 bg-amber-500/5 border border-[#F5C518]/25 rounded-2xl p-3 sm:p-6 relative">
                        <span className="text-[9px] font-mono text-amber-605 text-amber-600 tracking-widest uppercase font-black px-2 py-0.5 bg-amber-50 rounded-full border border-amber-200 font-bold">
                          Maiden Edition Report
                        </span>
                        <div className="space-y-1.5 sm:space-y-2">
                          <p className="font-mono text-[9px] text-[#111111] font-black tracking-widest bg-[#F5C518] px-2.5 py-0.5 inline-block rounded">
                            EST. 2025 ANNUAL REPORT
                          </p>
                          <h3 className="font-sans font-black text-lg sm:text-3xl lg:text-4xl text-brand-black uppercase tracking-tight mt-1 sm:mt-2 leading-tight">
                            GUARDIAN INITIATIVE FOR <span className="text-amber-600">COMMUNITY DEVELOPMENT</span>
                          </h3>
                          <p className="text-[10px] sm:text-xs text-gray-400 font-sans tracking-wide mt-1 uppercase font-bold">
                            JOS, PLATEAU STATE, NIGERIA
                          </p>
                        </div>
                        <div className="pt-2 sm:pt-4 flex flex-wrap gap-2 sm:gap-3 items-center justify-center">
                          <div className="text-center px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-150 rounded-xl min-w-[85px] sm:min-w-[100px] shadow-sm">
                            <span className="font-mono font-black text-sm sm:text-lg text-brand-black">613</span>
                            <p className="text-[8px] sm:text-[9px] font-mono text-gray-400 uppercase tracking-tight mt-0.5 font-bold">Kids Reached</p>
                          </div>
                          <div className="text-center px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-150 rounded-xl min-w-[85px] sm:min-w-[100px] shadow-sm">
                            <span className="font-mono font-black text-sm sm:text-lg text-brand-black">32</span>
                            <p className="text-[8px] sm:text-[9px] font-mono text-gray-400 uppercase tracking-tight mt-0.5 font-bold">Households</p>
                          </div>
                          <div className="text-center px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-150 rounded-xl min-w-[85px] sm:min-w-[100px] shadow-sm">
                            <span className="font-mono font-black text-sm sm:text-lg text-brand-black">$4,046</span>
                            <p className="text-[8px] sm:text-[9px] font-mono text-gray-400 uppercase tracking-tight mt-0.5 font-bold">Mobilized</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {reportPage === 1 && (
                      <div className="space-y-4 sm:space-y-5 text-left bg-gray-50 border border-gray-150 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="font-sans font-black text-sm sm:text-base text-brand-black uppercase tracking-tight flex items-center gap-2">
                            <span className="w-1.5 h-4 sm:h-5 bg-[#F5C518] rounded-full inline-block" />
                            Executive Summary & Strategy
                          </h3>
                          <p className="text-[11px] sm:text-xs text-gray-700 font-sans leading-relaxed">
                            In 2025, GICD delivered robust community-based protection safeguards, back-to-school support, public health education, and alternative technical pathways.
                          </p>
                          <p className="text-[11px] sm:text-xs text-brand-black font-sans leading-relaxed font-semibold">
                            Direct focus resolved critical vulnerability benchmarks for <strong>613 children</strong> (340 girls and 273 boys).
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-gray-200">
                          <div className="p-2 sm:p-3 bg-white border border-gray-150 rounded-xl">
                            <span className="text-[7px] sm:text-[8px] font-mono text-amber-600 block uppercase font-bold">RESOURCES MOBILIZED</span>
                            <span className="font-mono font-black text-xs sm:text-sm text-brand-black mt-0.5 sm:mt-1 block">$4,046 USD</span>
                            <span className="text-[8px] sm:text-[9px] text-gray-400 block leading-tight mt-0.5">1 Partner / 3 Private Donors</span>
                          </div>
                          <div className="p-2 sm:p-3 bg-white border border-gray-150 rounded-xl">
                            <span className="text-[7px] sm:text-[8px] font-mono text-amber-600 block uppercase font-bold">POPULATION REACH</span>
                            <span className="font-mono font-black text-xs sm:text-sm text-brand-black mt-0.5 sm:mt-1 block">613 children</span>
                            <span className="text-[8px] sm:text-[9px] text-gray-400 block leading-tight mt-0.5">340 Girls / 273 Boys</span>
                          </div>
                          <div className="p-2 sm:p-3 bg-white border border-gray-150 rounded-xl">
                            <span className="text-[7px] sm:text-[8px] font-mono text-amber-600 block uppercase font-bold">2026 PROJECTIONS</span>
                            <span className="font-mono font-black text-xs sm:text-sm text-rose-700 mt-0.5 sm:mt-1 block">$28,324 USD</span>
                            <span className="text-[8px] sm:text-[9px] text-gray-400 block leading-tight mt-0.5">Scope: 4,292 Vulnerable Kids</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {reportPage === 2 && (
                      <div className="space-y-3 sm:space-y-4 text-left bg-slate-50 border border-gray-150 rounded-2xl p-4 sm:p-6">
                        <span className="px-2 py-0.5 bg-[#F5C518]/10 text-amber-750 text-[9px] font-mono rounded border border-[#F5C518]/30 uppercase font-black inline-block">
                          Household Engagement
                        </span>
                        <h3 className="font-sans font-black text-base sm:text-lg text-brand-black uppercase tracking-tight">
                          Child Protection & Caregiver Safeguards
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-700 font-sans leading-relaxed">
                          We successfully mobilized caregivers from <strong>32 target households</strong> in high-density suburbs, facilitating interactive training sessions to recognize and preempt abuse risks.
                        </p>
                        <div className="p-2.5 sm:p-3.5 bg-white border border-gray-150 rounded-xl flex items-start gap-2.5 sm:gap-3">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-amber-50 flex items-center justify-center shrink-0 border border-brand-yellow/30 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-sans font-bold text-[11px] sm:text-xs text-brand-black uppercase">Sustainable Parenting Practices</h4>
                            <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-snug">
                              Caregivers reported a direct transition from aggressive physical responses to communicative household guidance, fostering highly protective local environments.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {reportPage === 3 && (
                      <div className="space-y-3 sm:space-y-4 text-left bg-emerald-500/5 border border-emerald-150 rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-mono rounded border border-emerald-200 uppercase font-black">
                            Skills Framework
                          </span>
                          <span className="text-[8px] text-emerald-800 font-bold uppercase tracking-wider">Plateau State</span>
                        </div>
                        <h3 className="font-sans font-black text-base sm:text-lg text-brand-black uppercase tracking-tight">
                          Skills Development: Football Meets Tech
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-700 font-sans leading-relaxed">
                          GICD, in coordination with the <strong>Kavod Relief Initiative</strong>, pioneered digital skills and sports integration through "Goals for Skills" in Angwan Rukuba, engaging <strong>54 adolescents</strong> (23 girls, 31 boys).
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-1">
                          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-emerald-100 flex flex-col justify-between">
                            <span className="font-mono text-xs sm:text-sm lg:text-base font-black text-emerald-700 block text-left">13 Beneficiaries</span>
                            <span className="text-[10px] text-gray-500 font-sans mt-0.5 leading-snug font-medium text-left">Graduated into advanced ICT mentorship and corporate internships.</span>
                          </div>
                          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-emerald-100 flex flex-col justify-between">
                            <span className="font-mono text-xs sm:text-sm lg:text-base font-black text-emerald-700 block text-left">1 Professional Trial</span>
                            <span className="text-[10px] text-gray-500 font-sans mt-0.5 leading-snug font-medium text-left">One outstanding candidate secured a formal professional athletic career entry.</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {reportPage === 4 && (
                      <div className="space-y-3 sm:space-y-4 text-left bg-teal-500/5 border border-teal-155 rounded-2xl p-4 sm:p-6">
                        <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[9px] font-mono rounded border border-teal-200 uppercase font-black inline-block">
                          High School Continuation
                        </span>
                        <h3 className="font-sans font-black text-base sm:text-lg text-brand-black uppercase tracking-tight">
                          Education: WAEC & JAMB Sponsorships
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-700 font-sans leading-relaxed">
                          With support from an esteemed private donor, GICD secured access to uninterrupted learning for <strong>16 orphans</strong> (11 girls, 5 boys) from vulnerable regional orphanages in Jos North and Jos East.
                        </p>
                        <div className="p-2.5 sm:p-3.5 bg-white border border-teal-100 rounded-xl">
                          <span className="text-[10px] sm:text-[10.5px] font-mono text-teal-650 font-bold block mb-1 uppercase tracking-wide">Breaking Financial Dropout Cycles</span>
                          <p className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed font-sans mt-1">
                            Full tuition coverage, curriculum materials, WAEC Exam clearances, and JAMB registration completed. Safeguarding secondary graduation and university pathways.
                          </p>
                        </div>
                      </div>
                    )}

                    {reportPage === 5 && (
                      <div className="space-y-3 sm:space-y-4 text-left bg-rose-500/5 border border-rose-150 rounded-2xl p-4 sm:p-6">
                        <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[9px] font-mono rounded border border-rose-200 uppercase font-black inline-block">
                          Adolescent Safe Spaces
                        </span>
                        <h3 className="font-sans font-black text-base sm:text-lg text-brand-black uppercase tracking-tight">
                          Reproductive Health & SGBV Prevention
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-700 font-sans leading-relaxed">
                           Strengthened school protection and confidence by providing rights education and sexual-violence prevention strategies to <strong>543 children</strong> (306 girls, 237 boys).
                        </p>
                        <div className="p-2.5 sm:p-3.5 bg-white border border-rose-100 rounded-xl flex items-center justify-between">
                          <div className="text-left">
                            <span className="text-[8px] sm:text-[9px] font-mono text-gray-400 block tracking-tight font-bold">INTERVENE POPULATION</span>
                            <span className="font-mono font-bold text-rose-700 text-xs sm:text-sm">543 High Schoolers</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] sm:text-[10px] text-gray-500 block font-mono">306 Girls (56.3%)</span>
                            <span className="text-[9px] sm:text-[10px] text-gray-500 block font-mono">237 Boys (43.7%)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {reportPage === 6 && (
                      <div className="space-y-3 sm:space-y-4 text-left bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-6 relative overflow-hidden">
                        <span className="px-2 py-0.5 bg-amber-400/15 text-[#F5C518] text-[9px] font-mono rounded border border-[#F5C518]/30 uppercase font-black inline-block">
                          Strategic Alliance
                        </span>
                        <h3 className="font-sans font-black text-base sm:text-lg text-white uppercase tracking-tight mt-1">
                          Formalizing Bilateral Agreements
                        </h3>
                        <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-sans">
                           GICD executed a formal strategic partnership with <strong>Kavod Relief Initiative</strong>, scaling sport-driven digital training and mentoring modules.
                        </p>
                        <div className="p-2.5 sm:p-3.5 bg-white/5 border border-white/10 rounded-xl text-xs space-y-1 sm:space-y-1.5 text-left">
                          <span className="text-[8px] sm:text-[9px] text-[#F5C518] font-mono uppercase font-bold block">TARGET BLUEPRINT</span>
                          <p className="text-slate-300 leading-relaxed text-[10px] sm:text-[11px] font-sans">
                            Expanding access to high-impact software literacy, sports-focused protective tracking, and employment options for over <strong>300 children</strong> in Plateau state.
                          </p>
                        </div>
                      </div>
                    )}

                    {reportPage === 7 && (
                      <div className="space-y-3 sm:space-y-4 text-left bg-gray-50 border border-gray-150 rounded-2xl p-4 sm:p-6">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-750 text-[9px] font-mono rounded border border-gray-205 uppercase font-black inline-block font-sans">
                          Consolidated Ledger
                        </span>
                        <h3 className="font-sans font-black text-sm sm:text-base text-brand-black uppercase tracking-tight">
                          Stewardship Snapshot & Core Contacts
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-650 font-sans">
                           GICD practices rigorous, localized funds integration across our operational pathways.
                        </p>
                        
                        <div className="bg-white rounded-xl border border-gray-150 p-2.5 sm:p-3.5 space-y-1 sm:space-y-1.5 font-mono text-[9.5px] sm:text-[10.5px]">
                          <div className="flex justify-between border-b border-gray-100 pb-1 sm:pb-1.5">
                            <span className="text-gray-400">Total Funds Mobilized:</span>
                            <span className="text-brand-black font-bold">$4,046 USD</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-1 sm:pb-1.5">
                            <span className="text-gray-400 font-sans">Education & Orphan Support:</span>
                            <span className="text-emerald-700 font-bold">$1,630 USD</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-1 sm:pb-1.5">
                            <span className="text-gray-400 font-sans">Sports & ICT Tech Mentorship:</span>
                            <span className="text-emerald-700 font-bold">$1,206 USD</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 font-sans">SGBV School Prevention Outreach:</span>
                            <span className="text-emerald-700 font-bold">$1,210 USD</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Slide Navigation footer */}
                  <div className="bg-slate-50 border-t border-gray-150 px-3 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between rounded-b-2xl select-none">
                    <button
                      disabled={reportPage === 0}
                      onClick={() => setReportPage((prev) => Math.max(0, prev - 1))}
                      className={`flex items-center gap-1 sm:gap-1.5 font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-wider py-1.5 px-2.5 sm:px-3 rounded-lg border-0 transition ${
                        reportPage === 0
                          ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                          : "text-brand-black bg-white hover:bg-gray-100 cursor-pointer shadow-sm"
                      }`}
                    >
                      <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Prev</span>
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <button
                          key={num}
                          onClick={() => setReportPage(num)}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full cursor-pointer border-none p-0 transition-all ${
                            reportPage === num ? "bg-[#F5C518] w-4 sm:w-5" : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      disabled={reportPage === 7}
                      onClick={() => setReportPage((prev) => Math.min(7, prev + 1))}
                      className={`flex items-center gap-1 sm:gap-1.5 font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-wider py-1.5 px-2.5 sm:px-3 rounded-lg border-0 transition ${
                        reportPage === 7
                          ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                          : "text-brand-black bg-white hover:bg-gray-100 cursor-pointer shadow-sm"
                      }`}
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>

                </div>

                {/* Qualitative Narrative description column */}
                <div className="p-4 sm:p-6 bg-slate-50 border border-gray-150 rounded-2xl text-left space-y-3 sm:space-y-4 animate-fade-in">
                  <h4 className="font-sans font-extrabold text-[11px] sm:text-xs uppercase text-brand-black tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span>Qualitative Impact & Strategic Narrative</span>
                  </h4>
                  
                  <div className="text-[11px] sm:text-xs text-gray-650 leading-relaxed space-y-2.5 sm:space-y-3 font-sans">
                    {reportPage === 0 && (
                      <>
                        <p>
                          This snapshot documents the foundational reach of the Guardian Initiative for Community Development (GICD) during our Maiden Edition 2025 results summary. Operating in the Angwan Rukuba sectors of Jos, Plateau State, we have prioritized localized interventions.
                        </p>
                        <p>
                          Each milestone listed has been validated through on-the-ground volunteer coordination, ensuring secondary risk mitigation for youngsters in high-density suburban communities.
                        </p>
                      </>
                    )}
                    {reportPage === 1 && (
                      <>
                        <p>
                          The 2025 financial period was characterized by deep economic transition across Northern Nigeria. High inflation and currency adjustment made schooling and youth basic support pathways increasingly volatile.
                        </p>
                        <p>
                          By engaging caregivers inside communities, we maintained safe containment circles, preventing high school dropout and vulnerable adolescent vagrancy through our tailored activity streams.
                        </p>
                      </>
                    )}
                    {reportPage === 2 && (
                      <>
                        <p>
                          Child safeguarding in high-density urban suburbs is traditionally limited by severe systemic isolation. Caregivers facing extreme household pressure are assisted through interactive focal parenting meetings.
                        </p>
                        <p>
                          GICD led training for parents across 32 key households to act as localized protective networks, tracking and mitigating threats such as child labor, exploitation, and street vulnerabilities.
                        </p>
                      </>
                    )}
                    {reportPage === 3 && (
                      <>
                        <p>
                          Our focal digital skills program, Goals for Skills - Football Meets Tech, successfully engaged 54 teenagers who were previously exposed to regional vagrancy. Modern technical skills were successfully introduced through this program.
                        </p>
                        <p>
                          Thirteen participants demonstrated high proficiency and advanced to specialized ICT mentoring tracks, locking in local internships that provide sustainable pathways to digital employment.
                        </p>
                      </>
                    )}
                    {reportPage === 4 && (
                      <>
                        <p>
                          Educational interruption amongst orphans typically happens due to high tertiary entry costs or final secondary registration fees.
                        </p>
                        <p>
                          By covering tuition, WAEC examination fees, and JAMB registration for 16 orphans, we safeguarded secondary graduation and university pathways for gifted young minds in Plateau State schools.
                        </p>
                      </>
                    )}
                    {reportPage === 5 && (
                      <>
                        <p>
                          Gender-Based Violence (SGBV) within peri-urban schools is catalyzed by deep cultural taboos. Adolescent girls are heavily exposed to reproductive health risks due to silence on body safety.
                        </p>
                        <p>
                          By conducting school-wide learning events, GICD dismantled deep myths for 543 boys and girls, building confidence and providing direct, safe reporting hotlines to report harassment.
                        </p>
                      </>
                    )}
                    {reportPage === 6 && (
                      <>
                        <p>
                          Our bilateral partnership with Kavod Relief Initiative serves as a shining template for collaborative impact. Sports discipline coupled with computer training enables rapid community integration.
                        </p>
                        <p>
                          GICD delivers on-the-ground volunteer networks, local language facility, and validated child-welfare checks to maximize the value of each resource.
                        </p>
                      </>
                    )}
                    {reportPage === 7 && (
                      <>
                        <p>
                          GICD maintains a rigorous zero-administrative-waste operational principle. Over 92% of mobilised resource contributions go directly to field assets, tuition, and school materials.
                        </p>
                        <p>
                           For full audited ledgers, video checks, and partnership proposals for the 2026 phase ($28,324 budget target), please submit an official request to our admin team.
                        </p>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>
        {/* TECHNICAL DOCUMENTS & POLICY RESOURCES REPOSITORY */}
            <div className="mt-16 pt-12 border-t border-gray-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 text-left">
                <div>
                  <span className="text-[10px] font-mono text-amber-600 tracking-widest uppercase font-black px-2 py-0.5 bg-amber-50 rounded border border-amber-200">
                    Technical Library & Publications
                  </span>
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-brand-black uppercase tracking-tight mt-1.5">
                    POLICY FRAMEWORKS & TECHNICAL RESOURCES
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    Browse technical manuals, research reports, policy briefs, and community development frameworks.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                {[
                  {
                    title: "2025 Annual Results & Impact Report",
                    category: "Annual Report",
                    tag: "PDF / Presentation",
                    date: "January 2026",
                    desc: "Comprehensive results breakdown covering community child protection, technical education partnerships, reproductive safety, and financial stewardship.",
                    fileSize: "4.2 MB",
                    action: "Interactive Deck Above"
                  },
                  {
                    title: "Child Safeguarding & Protection Policy Framework",
                    category: "Policy & Governance",
                    tag: "Technical Policy",
                    date: "Updated 2026",
                    desc: "Operational guidelines and reporting mechanisms for community tutors, neighborhood association leaders, and religious focal points.",
                    fileSize: "1.8 MB",
                    action: "Request Technical Doc"
                  },
                  {
                    title: "Community Baseline Needs Assessment: Jos North",
                    category: "Research & Survey",
                    tag: "Field Study",
                    date: "Late 2025",
                    desc: "Socioeconomic survey data, vulnerability mapping, and household analysis across Angwan Rukuba and peri-urban sectors of Plateau State.",
                    fileSize: "3.1 MB",
                    action: "Request Technical Doc"
                  },
                  {
                    title: "GICD Strategic Plan 2026–2028",
                    category: "Strategy & Roadmap",
                    tag: "Multi-Year Strategy",
                    date: "2026–2028",
                    desc: "Strategic roadmap detailing multi-year goals, resource allocation targets, partnership expansion models, and regional impact projections.",
                    fileSize: "2.5 MB",
                    action: "Request Technical Doc"
                  },
                  {
                    title: "SGBV Prevention & Reproductive Health Manual",
                    category: "Training Manual",
                    tag: "Facilitator Guide",
                    date: "2025 Edition",
                    desc: "Facilitator handbook for conducting adolescent rights education, body safety awareness, and gender-based violence prevention workshops.",
                    fileSize: "2.0 MB",
                    action: "Request Technical Doc"
                  },
                  {
                    title: "Goals for Skills: ICT & Tech Mentorship Syllabus",
                    category: "Curriculum & Skills",
                    tag: "Training Module",
                    date: "2025/2026",
                    desc: "Integrated digital literacy and technical mentorship curriculum designed for vulnerable adolescents combining sports discipline and ICT skills.",
                    fileSize: "1.5 MB",
                    action: "Request Technical Doc"
                  }
                ].map((doc, i) => (
                  <div key={i} className="p-5 bg-slate-50 border border-gray-150 rounded-2xl flex flex-col justify-between hover:border-amber-400 hover:shadow-sm transition duration-200">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 bg-amber-100/80 text-amber-800 text-[9px] font-mono font-bold rounded uppercase">
                          {doc.category}
                        </span>
                        <span className="text-[9px] font-mono text-gray-400">{doc.date}</span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-brand-black leading-snug">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                        {doc.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-400">{doc.fileSize} • {doc.tag}</span>
                      <button
                        onClick={openPartner}
                        className="px-3 py-1.5 bg-white border border-gray-200 hover:border-brand-yellow hover:bg-amber-50 text-brand-black font-sans font-bold text-[10px] uppercase tracking-wider rounded-lg transition cursor-pointer"
                      >
                        {doc.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </section>
      )}

      {/* SECTION 14 — CONTACT & FOOTER BASE */}
      <footer className="bg-brand-black text-white pt-16 pb-8 border-t-4 border-[#F5C518] mt-auto select-none" id="contact">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left pb-12 border-b border-gray-900">
            
            {/* Logo description */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <img src="/asset/logo.jpg" alt="Logo" className="w-11 h-11 rounded-full bg-white text-brand-black border border-[#F5C518]" />
                <div className="flex flex-col">
                  <span className="font-sans font-black text-base text-[#F5C518] leading-none uppercase tracking-tight">GUARDIAN INITIATIVE</span>
                  <span className="text-[8px] text-gray-500 font-mono uppercase tracking-widest mt-1">FOR COMMUNITY DEVELOPMENT</span>
                </div>
              </div>
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
                <p>Office: <span className="text-white">No 28A. Tafawa Balewa Street, opposite United Baptist Church, Jos, Plateau State, Nigeria</span></p>
                <p>Email: <span className="text-white"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@thegicd.org" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow underline">info@thegicd.org</a></span></p>
                <p>Mobile: <span className="text-white">+2349030199199</span></p>

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
            <p>© 2025 Guardian Initiative for Community Development (GICD). Registered under laws of Nigeria.</p>
            <p>No 28A. Tafawa Balewa Street, opposite United Baptist Church, Jos, Plateau State, Nigeria</p>
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
