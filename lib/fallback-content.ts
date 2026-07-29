import type {
  BlogPost,
  EventItem,
  Milestone,
  Page,
  Program,
  SiteSettings,
  Sponsor,
  Stat,
} from "@/types/content";

/*
 * Complete content of blueteamvillage.org, ported from the original
 * WordPress site. Served when Contentful is not configured (local dev
 * without secrets, CI builds) and used as the seed source for the CMS.
 * Once Contentful is live, edits happen there — not here.
 */

export const fallbackSettings: SiteSettings = {
  siteName: "Blue Team Village",
  tagline: "Welcome to the other side of the hacking mirror.",
  navigation: [
    {
      label: "Programs",
      href: "/programs",
      children: [
        { label: "Project Obsidian", href: "/programs/project-obsidian" },
        { label: "Meet-a-Mentor", href: "/programs/meet-a-mentor" },
      ],
    },
    {
      label: "Events",
      href: "/events",
      children: [
        { label: "BTV at DEF CON 34", href: "/events/def-con-34" },
        { label: "BTV at DEF CON 33", href: "/events/def-con-33" },
        { label: "BTV at DEF CON 32", href: "/events/def-con-32" },
        { label: "BTV at DEF CON 31", href: "/events/def-con-31" },
        { label: "BTV at DEF CON 30", href: "/events/def-con-30" },
      ],
    },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    {
      label: "Support",
      href: "/support",
      children: [
        { label: "Donate", href: "/donate" },
        {
          label: "Shop",
          href: "https://blueteamvillage.myspreadshop.com/",
          external: true,
        },
      ],
    },
    { label: "CTF", href: "https://ctf.blueteamvillage.org/", external: true },
  ],
  discordUrl: "https://discord.gg/blueteamvillage",
  shopUrl: "https://blueteamvillage.myspreadshop.com/",
  ctfUrl: "https://ctf.blueteamvillage.org/",
  scheduleUrl: "https://schedule.blueteamvillage.org/",
  paypalButtonId: "5UGACQKR8RRYY",
  legalBlock: [
    "Association of Blue Team Villages",
    "A Pennsylvania domestic nonprofit corporation and 501(c)(3) public charity. Donations are tax-deductible. EIN 83-3529393.",
    "1657 The Fairway 1150, Jenkintown, PA 19046",
  ],
};

/*
 * Blurbs match the copy running on ctf.blueteamvillage.org for the sponsors
 * both sites carry, so a sponsor reads the same either place they land.
 */
const blurbs: Record<string, string> = {
  Graylog:
    "Log management and SIEM built for defenders — centralize, search, and alert on the telemetry that matters.",
  "Hack The Box":
    "Equip threat-ready cyber teams for an AI-accelerated landscape with hands-on labs, assessments, and pathways that build top performing teams.",
  "Detection Engineering Weekly":
    "The latest news and how-tos in detection engineering, delivered weekly to practitioners in the field.",
  Expel:
    "Agentic MDR means AI speed, without tradeoffs. Tech makes you fast. Humans make you accurate. You keep your tools, your visibility, and your control.",
  DeepTempo:
    "Helps security teams identify modern attacks earlier using AI-powered behavioral detection — catching attacker intent that rules and signatures miss.",
  TryHackMe:
    "Hands-on cyber security training through real-world scenarios — making learning to defend accessible for everyone, everywhere.",
  FRSecure:
    "Information security experts on a mission to fix a broken industry — consulting, training, and CISSP education for defenders.",
  FLARE: "Continuous threat exposure management across the clear and dark web.",
  ACyberGurus:
    "Cybersecurity training and advisory services for teams building defensive capability.",
};

function sponsor(name: string, tier: Sponsor["tier"], url: string): Sponsor {
  return { name, tier, url, blurb: blurbs[name] };
}

const dc34Sponsors: Sponsor[] = [
  sponsor("Graylog", "Blue", "https://graylog.org"),
  sponsor("Hack The Box", "Platinum", "https://hackthebox.com"),
  sponsor(
    "Detection Engineering Weekly",
    "Gold",
    "https://detectionengineering.net",
  ),
  sponsor("Expel", "Gold", "https://expel.com"),
  sponsor("DeepTempo", "Gold", "https://deeptempo.ai"),
  sponsor("FRSecure", "Gold", "https://frsecure.com"),
  sponsor("TryHackMe", "Gold", "https://tryhackme.com"),
];

const dc33Sponsors: Sponsor[] = [
  sponsor("Graylog", "Blue", "https://graylog.org"),
  sponsor("Hack The Box", "Platinum", "https://hackthebox.com"),
  sponsor("FLARE", "Gold", "https://flare.io"),
  sponsor("TryHackMe", "Gold", "https://tryhackme.com"),
  sponsor("DeepTempo", "Gold", "https://deeptempo.ai"),
  sponsor("ACyberGurus", "Gold", "https://acybergurus.com"),
];

const sixTracks = [
  "Incident Response",
  "Forensics",
  "Cyber Threat Hunting",
  "Detection Engineering",
  "Operational Technology",
  "Insider Threat/Risk",
];

export const fallbackEvents: EventItem[] = [
  {
    title: "BTV at DEF CON 34",
    slug: "def-con-34",
    year: 2026,
    dateRange: "August 6–9, 2026 · Las Vegas, NV",
    tagline: "Our 9th year at DEF CON.",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Blue Team Village returns to DEF CON for our 9th year. Join defenders from around the world for talks, hands-on content, contests, and community across six content tracks.",
        },
        { type: "heading", text: "BTV Content" },
        {
          type: "paragraph",
          text: "Content lineup to be announced. Watch this page and the BTV Discord for updates.",
        },
        { type: "heading", text: "Contests" },
        {
          type: "paragraph",
          text: "Contest details to be announced, including the BTV CTF at ctf.blueteamvillage.org.",
        },
        { type: "heading", text: "Gatherings & Events" },
        {
          type: "paragraph",
          text: "Gatherings and events to be announced.",
        },
      ],
    },
    tracks: sixTracks,
    sponsors: dc34Sponsors,
    scheduleUrl: "https://schedule.blueteamvillage.org/",
    isCurrent: true,
  },
  {
    title: "BTV at DEF CON 33",
    slug: "def-con-33",
    year: 2025,
    dateRange: "August 7–10, 2025 · Las Vegas, NV",
    tagline: "Our 8th year at DEF CON.",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Blue Team Village's 8th year at DEF CON featured content across six tracks, CTF challenges, and community gatherings.",
        },
        { type: "heading", text: "Movie Night and Mixer" },
        {
          type: "paragraph",
          text: "Saturday, August 9, 7–10 PM PDT at the Las Vegas Convention Center (W216–218). Free with a DEF CON badge.",
        },
        { type: "heading", text: "CTF" },
        {
          type: "paragraph",
          text: "CTF challenges were available at ctf.blueteamvillage.org/challenges.",
        },
      ],
    },
    tracks: sixTracks,
    sponsors: dc33Sponsors,
    scheduleUrl: "https://schedule.blueteamvillage.org/",
    isCurrent: false,
  },
  {
    title: "BTV at DEF CON 32",
    slug: "def-con-32",
    year: 2024,
    dateRange: "August 8–11, 2024 · Las Vegas, NV",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Blue Team Village's 7th year at DEF CON, featuring defender talks, hands-on workshops, the BTV CTF, and a village puzzle.",
        },
      ],
    },
    tracks: [],
    sponsors: [],
    isCurrent: false,
  },
  {
    title: "BTV at DEF CON 31",
    slug: "def-con-31",
    year: 2023,
    dateRange: "August 10–13, 2023 · Las Vegas, NV",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Blue Team Village's 6th year at DEF CON featured Project Obsidian content, the BTV CTF, and the Venator Aurum challenge.",
        },
      ],
    },
    tracks: [],
    sponsors: [],
    isCurrent: false,
  },
  {
    title: "BTV at DEF CON 30",
    slug: "def-con-30",
    year: 2022,
    dateRange: "August 11–14, 2022 · Las Vegas, NV",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Blue Team Village's 5th year at DEF CON, back in person with defender talks, workshops, and the BTV CTF.",
        },
      ],
    },
    tracks: [],
    sponsors: [],
    isCurrent: false,
  },
];

export const fallbackPrograms: Program[] = [
  {
    name: "Project Obsidian",
    slug: "project-obsidian",
    summary:
      "A free, immersive, defensive cybersecurity learning experience — workshops, videos, reading materials, and labs, year-round.",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Project Obsidian is a free, immersive, defensive cybersecurity learning experience. Its goal is to remove the barrier to entry for cybersecurity training through workshops, videos, reading materials, and labs available year-round.",
        },
        { type: "heading", text: "Core disciplines" },
        {
          type: "list",
          items: [
            "Incident Response (IR)",
            "Digital Forensics (DF)",
            "Reverse Engineering Malware (REM)",
            "Cyber Threat Intelligence (CTI)",
            "Cyber Threat Hunting (CTH) — working with platforms like Splunk, Elastic, and Graylog, mapped to MITRE ATT&CK, with an on-ramp into detection engineering",
          ],
        },
        {
          type: "paragraph",
          text: "Additional focus areas in development include Detection Engineering and Operational Technology.",
        },
        { type: "heading", text: "Get involved" },
        {
          type: "paragraph",
          text: "Project Obsidian is built by volunteers. Join the BTV Discord to participate, or sign up through the volunteer intake form.",
        },
      ],
    },
    disciplines: ["IR", "DF", "REM", "CTI", "CTH"],
    intakeFormUrl: "https://forms.gle/U1WZF4Tq6EGqhDVx7",
    order: 1,
  },
  {
    name: "Meet-a-Mentor",
    slug: "meet-a-mentor",
    summary:
      "One-on-one mentorship pairing experienced security professionals with mentees based on shared interests.",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Meet-a-Mentor pairs experienced security professionals with mentees based on shared interests, to develop career goals and skills.",
        },
        { type: "heading", text: "How it works" },
        {
          type: "list",
          items: [
            "One-on-one pairings typically last 3–6 months",
            "Mentors are vetted by BTV staff and existing mentors",
            "The matching waitlist can run 6–9 months — a community-participant tier is available without a pairing",
            "Monthly meetups feature panels, lightning talks, and BTV content",
            "Program content lives on the BTV Discord in role-restricted sections",
          ],
        },
        {
          type: "paragraph",
          text: "All participants agree to the DEF CON Code of Conduct.",
        },
        { type: "heading", text: "Join the program" },
        {
          type: "paragraph",
          text: "Sign up through the intake form, or share your experience through the feedback form. Program details are available in the Meet-a-Mentor information folder.",
        },
      ],
    },
    disciplines: [],
    intakeFormUrl: "https://forms.gle/zUA64NVtDWezyUoB6",
    order: 2,
  },
];

export const fallbackPages: Page[] = [
  {
    title: "About",
    slug: "about",
    heroHeading: "Built for and by defenders",
    body: {
      kind: "blocks",
      blocks: [
        { type: "heading", text: "Our history" },
        {
          type: "paragraph",
          text: "Blue Team Village started in early 2018, born from Twitter discussions about creating a defense-focused village at DEF CON. The founders recruited volunteers, and BTV debuted at DEF CON 26 in Las Vegas.",
        },
        {
          type: "paragraph",
          text: "Founders and early organizers include munin, ttheveii0x, devnull, V3rbaal, and H4r0ld.",
        },
        { type: "heading", text: "Mission" },
        {
          type: "paragraph",
          text: "To curate content and create global, safe, and inclusive spaces designed to foster sharing, learning, community, support and encouragement for all cyber defenders regardless of skill level.",
        },
        { type: "heading", text: "Vision" },
        {
          type: "paragraph",
          text: "To be the premier organization supporting the cyber defender community.",
        },
        { type: "heading", text: "Values" },
        {
          type: "list",
          items: [
            "Excellence",
            "Inclusion",
            "Transparency",
            "Integrity",
            "Community",
            "Education",
            "Mentoring",
            "Support",
            "Encouragement",
          ],
        },
        { type: "heading", text: "The organization" },
        {
          type: "paragraph",
          text: "The Association of Blue Team Villages is a Pennsylvania domestic nonprofit corporation and a federally tax-exempt 501(c)(3) public charity. EIN 83-3529393. 1657 The Fairway 1150, Jenkintown, PA 19046.",
        },
      ],
    },
    seoDescription:
      "Blue Team Village's history, mission, vision, and values — a 501(c)(3) community built for and by cyber defenders since DEF CON 26.",
  },
  {
    title: "Code of Conduct",
    slug: "code-of-conduct",
    heroHeading: "Code of Conduct",
    body: {
      kind: "blocks",
      blocks: [
        { type: "heading", text: "Core values" },
        {
          type: "paragraph",
          text: "Blue Team Village is dedicated to providing a safe and inclusive experience for everyone. We expect every participant to embody our values: excellence, inclusion, transparency, integrity, community, education, mentoring, support, and encouragement.",
        },
        { type: "heading", text: "Harassment policy" },
        {
          type: "paragraph",
          text: "BTV has zero tolerance for harassment. Participants violating this policy may be expelled from BTV spaces and events.",
        },
        { type: "heading", text: "Community guidelines" },
        {
          type: "list",
          items: [
            "Be kind and inclusive",
            "No harassment or deliberate intimidation",
            "No trolling, spamming, or flaming",
            "No hate speech — racism, sexism, homophobia, transphobia, and ableism are not tolerated",
            "Selling anything in BTV spaces is prohibited",
            "Disagreement is fine; personal attacks never are",
          ],
        },
        { type: "heading", text: "Scope" },
        {
          type: "paragraph",
          text: "This Code of Conduct applies to all attendees, exhibitors, speakers, volunteers, and community members in every BTV space, online and in person.",
        },
        { type: "heading", text: "Reporting" },
        {
          type: "paragraph",
          text: "To report a violation, reach out to any BTV organizer. Association of Blue Team Villages, 1657 The Fairway 1150, Jenkintown, PA 19046.",
        },
      ],
    },
    seoDescription:
      "Blue Team Village's Code of Conduct: core values, harassment policy, community guidelines, scope, and reporting.",
  },
  {
    title: "Support BTV",
    slug: "support",
    heroHeading: "Support the village",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Participation within the community is the most valuable asset Blue Team Village has. There are three great ways to support us.",
        },
        { type: "heading", text: "Join the community" },
        {
          type: "paragraph",
          text: "The heart of BTV is our Discord. Join defenders from around the world to learn, share, and build together.",
        },
        { type: "heading", text: "Donate" },
        {
          type: "paragraph",
          text: "The Association of Blue Team Villages is a 501(c)(3) public charity — donations are tax-deductible. EIN 83-3529393.",
        },
        { type: "heading", text: "Get the merch" },
        {
          type: "paragraph",
          text: "Rep the village. Every purchase from our Spreadshop supports BTV programs.",
        },
      ],
    },
    seoDescription:
      "Support Blue Team Village: join the Discord community, make a tax-deductible donation, or grab merch from the BTV shop.",
  },
  {
    title: "Donate",
    slug: "donate",
    heroHeading: "Fund the defenders",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "The Association of Blue Team Villages is a Pennsylvania domestic nonprofit corporation and a federally tax-exempt 501(c)(3) public charity. Your donation is tax-deductible and directly funds free defender education, Project Obsidian, Meet-a-Mentor, and BTV's presence at DEF CON.",
        },
        {
          type: "paragraph",
          text: "EIN 83-3529393 · 1657 The Fairway 1150, Jenkintown, PA 19046",
        },
      ],
    },
    seoDescription:
      "Make a tax-deductible donation to Blue Team Village, a 501(c)(3) public charity supporting the cyber defender community.",
  },
  {
    title: "Sponsorship Prospectus",
    slug: "prospectus",
    heroHeading: "Sponsor Blue Team Village",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Blue Team Village partners with organizations that want to support the defender community. Sponsorship funds free training, hands-on labs, mentorship, and our village at DEF CON.",
        },
        {
          type: "paragraph",
          text: "For the current sponsorship prospectus and tier details, contact the BTV organizers through Discord or reach out to the Association of Blue Team Villages.",
        },
      ],
    },
    seoDescription:
      "Sponsor Blue Team Village — support free defender education and BTV's village at DEF CON.",
  },
  {
    title: "Capture the Flag",
    slug: "ctf",
    heroHeading: "Capture the Flag",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Blue Team Village presents defensive Capture the Flag events at DEF CON — investigate realistic intrusions, hunt threats, and work cases the way real defenders do.",
        },
        {
          type: "paragraph",
          text: "Play at ctf.blueteamvillage.org.",
        },
      ],
    },
    seoDescription:
      "Blue Team Village's defensive Capture the Flag events at DEF CON.",
  },
];

/*
 * Home-page timeline. Ported from the btv2 redesign mockup, with the
 * anniversary framing kept forward-looking: DEF CON 34 (2026) is BTV's 9th
 * year, so the 10th anniversary lands at DEF CON 35.
 */
export const fallbackMilestones: Milestone[] = [
  {
    year: "2018",
    title: "A village is born",
    body: "BTV forms through conversations that started on Twitter — a small group of defenders imagining what a defense-focused DEF CON village could look like. In weeks it was organizing itself and recruiting volunteers.",
  },
  {
    year: "2018 · DEF CON 26",
    title: "First DEF CON appearance",
    body: "BTV debuts in Las Vegas with founding organizers munin, ttheveii0x, devnull, V3rbaal, and H4r0ld at the helm.",
  },
  {
    year: "2019 · DEF CON 27",
    title: "Growing the community",
    body: "Year two brings expanded programming, more hands-on content, and a rapidly growing global community of cyber defenders.",
  },
  {
    year: "2020 · DEF CON Safe Mode",
    title: "Going virtual",
    body: "BTV pivots to a fully online format, reaching defenders worldwide during the pandemic — proving the community transcends any single venue.",
  },
  {
    year: "2021",
    title: "Nonprofit status",
    body: "The Association of Blue Team Villages is a Pennsylvania domestic nonprofit corporation, classified as a public charity exempt from federal income tax under IRC 501(c)(3).",
  },
  {
    year: "2022 · DEF CON 30",
    title: "Project Obsidian launches",
    body: "BTV introduces Project Obsidian — free, immersive defensive training spanning incident response, forensics, malware analysis, threat intel, and threat hunting.",
  },
  {
    year: "2023 · DEF CON 31",
    title: "Meet-a-Mentor begins",
    body: "Meet-a-Mentor pairs aspiring defenders with experienced practitioners, extending BTV's mission far beyond the conference floor.",
  },
  {
    year: "2024–2025 · DEF CON 32–33",
    title: "Six tracks, record attendance",
    body: "Content settles into six tracks — IR, forensics, threat hunting, detection engineering, OT, and insider risk — alongside the CTF and community gatherings.",
  },
  {
    year: "2026 · DEF CON 34",
    title: "Our 9th year",
    body: "BTV returns to Las Vegas August 6–9 with talks, workshops, contests, and the Project Obsidian CTF.",
  },
  {
    year: "2027 · DEF CON 35",
    title: "10th anniversary",
    body: "A decade of defending, teaching, and building one of security's most welcoming communities. Save the date.",
  },
];

/* Home-page stat row. */
export const fallbackStats: Stat[] = [
  { value: "9", label: "Years at DEF CON" },
  { value: "6", label: "Content tracks" },
  { value: "10k", suffix: "+", label: "Discord members" },
  { value: "501(c)(3)", label: "Nonprofit charity" },
];

export const fallbackPosts: BlogPost[] = [
  {
    title: "Thank you, Project Obsidian Cr3w",
    slug: "thank-you-project-obsidian-cr3w",
    publishDate: "2023-05-15",
    excerpt:
      "A thank-you to the volunteers who make Project Obsidian's free defender training possible.",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Project Obsidian exists because of its volunteers — the Cr3w. Thank you to everyone who wrote content, built labs, recorded videos, and showed up for defenders learning IR, forensics, malware analysis, threat intel, and threat hunting.",
        },
        {
          type: "paragraph",
          text: "If you want to be part of the next iteration, join us on Discord and raise your hand in the Project Obsidian channels.",
        },
      ],
    },
  },
];
