import type {
  BlogPost,
  EventItem,
  Page,
  Program,
  SiteSettings,
  SocialLink,
  Sponsor,
  Stat,
} from "@/types/content";

/*
 * Complete content of blueteamvillage.org, ported from the original
 * WordPress site. Served when Contentful is not configured (local dev
 * without secrets, CI builds) and used as the seed source for the CMS.
 * Once Contentful is live, edits happen there — not here.
 */

/*
 * BTV's accounts. Mastodon carries rel="me" so defcon.social can verify this
 * site as the account's own — that verification only works from a link the
 * account holder controls, which is this footer.
 */
export const fallbackSocialLinks: SocialLink[] = [
  {
    label: "X / Twitter",
    href: "https://x.com/blueteamvillage",
    handle: "@blueteamvillage",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/the-blue-team-village",
    handle: "the-blue-team-village",
  },
  {
    label: "Mastodon",
    href: "https://defcon.social/@blueteamvillage",
    handle: "@blueteamvillage@defcon.social",
    verifiable: true,
  },
];

export const fallbackSettings: SiteSettings = {
  siteName: "Blue Team Village",
  tagline: "Welcome to the other side of the hacking mirror.",
  navigation: [
    {
      label: "Programs",
      href: "/programs",
      children: [
        { label: "Project Obsidian", href: "/programs/project-obsidian" },
        { label: "Venator Aurum", href: "/programs/venator-aurum" },
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
  socialLinks: fallbackSocialLinks,
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

const ASSETS = "https://images.ctfassets.net/mgfsp0s6h7v2";

/*
 * The DEF CON 34 roster, mirroring the Contentful "sponsor" entries that
 * ctf.blueteamvillage.org also reads — names, tiers, blurbs, and logo assets
 * are copied from there verbatim. Contentful is authoritative; this exists so
 * local dev and CI render the real thing without secrets. There is no Blue
 * sponsor for DC34, which is why the home page shows the Blue-tier pitch.
 */
export const fallbackCurrentSponsors: Sponsor[] = [
  {
    name: "Hack The Box",
    tier: "Platinum",
    url: "https://www.hackthebox.com/",
    logoUrl: `${ASSETS}/6mxNhdwA95hwceRpnRhmGA/e5a06bee47e3510f485005e797527c55/Hack_The_Box_Logo_2.png`,
    blurb:
      "Equip threat-ready cyber teams for an AI-accelerated landscape with hands-on labs, assessments, and pathways that build top performing teams.",
  },
  {
    name: "DeepTempo",
    tier: "Gold",
    url: "https://www.deeptempo.ai/",
    logoUrl: `${ASSETS}/yA1vIIjgc7cXjDum3uLiL/0e801561ea38b7be2c73a20be763ba6a/image.png`,
    blurb:
      "DeepTempo helps security teams identify modern attacks earlier using AI-powered behavioral detection. Built to work alongside existing SIEM, NDR, and telemetry environments, DeepTempo detects attacker intent and suspicious behavioral patterns that traditional rules, signatures, and static baselines often miss.",
  },
  {
    name: "Detection Engineering Weekly",
    tier: "Gold",
    url: "https://www.detectionengineering.net/",
    logoUrl: `${ASSETS}/7hdWHGpOSrzt0290ZUvFde/e17d97bfbaedfc7358fb810fbfeae725/image.png`,
    blurb: "The latest news and how-tos in detection engineering",
  },
  {
    name: "Expel",
    tier: "Gold",
    url: "https://expel.com/",
    logoUrl: `${ASSETS}/75AbHB4jIG9ZTjLNaJchpg/27d162a856b26f36884f9ea294213114/image.png`,
    blurb:
      "Agentic MDR means AI speed, without tradeoffs. Tech makes you fast. Humans make you accurate. You keep your tools, your visibility, and your control.",
  },
  {
    name: "FRSecure",
    tier: "Gold",
    url: "https://frsecure.com/",
    logoUrl: `${ASSETS}/5iDMu1wnjyjEVSALKrP6LV/7e3f7396f47c93f497b70bde4e573efd/image.png`,
    blurb:
      "Information Security Experts on a Mission, To Fix A Broken Industry",
  },
  {
    name: "TryHackMe",
    tier: "Gold",
    url: "https://tryhackme.com/",
    logoUrl: `${ASSETS}/3LAThx0ryfYlWHsslU7JJa/837a486a56b60271bfda7b2d94188fc9/image.png`,
    blurb: "Hands-on cyber security training through real-world scenarios",
  },
];

/* Historical rosters, kept as the per-year record. */
const dc33Sponsors: Sponsor[] = [
  { name: "Graylog", tier: "Blue", url: "https://graylog.org" },
  { name: "Hack The Box", tier: "Platinum", url: "https://hackthebox.com" },
  { name: "FLARE", tier: "Gold", url: "https://flare.io" },
  { name: "TryHackMe", tier: "Gold", url: "https://tryhackme.com" },
  { name: "DeepTempo", tier: "Gold", url: "https://deeptempo.ai" },
  { name: "ACyberGurus", tier: "Gold", url: "https://acybergurus.com" },
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
    dateRange: "August 7–9, 2026 · Las Vegas, NV",
    tagline: "Our 9th year at DEF CON.",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "We are excited to bring Blue Team Village (BTV) to DEF CON 34 for a ninth year. Join defenders from around the world for talks, hands-on content, contests, and community.",
        },
        {
          type: "paragraph",
          text: "The session tracks include the following topics: Incident Response, Forensics, Cyber Threat Hunting, Detection Engineering, Operational Technology, and Insider Threat/Risk.",
        },
        { type: "heading", text: "BTV Content" },
        {
          type: "paragraph",
          text: "The full schedule is published at schedule.blueteamvillage.org. Watch this page and the BTV Discord for lineup announcements.",
        },
        { type: "heading", text: "Contests at Blue Team Village" },
        {
          type: "paragraph",
          text: "The BTV Capture the Flag returns with Project Obsidian — a forensic investigation of malware in containerized environments. Details and setup steps are at ctf.blueteamvillage.org.",
        },
        { type: "heading", text: "Gatherings & Events" },
        {
          type: "paragraph",
          text: "Gatherings and events to be announced. Join the BTV Discord so you don't miss anything.",
        },
      ],
    },
    tracks: sixTracks,
    sponsors: fallbackCurrentSponsors,
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
          text: "We were excited to bring Blue Team Village (BTV) to DEF CON 33 for an eighth year.",
        },
        {
          type: "paragraph",
          text: "The session tracks included the following topics: Incident Response, Forensics, Cyber Threat Hunting, Detection Engineering, Operational Technology, and Insider Threat/Risk.",
        },
        { type: "heading", text: "BTV Content" },
        {
          type: "paragraph",
          text: "The full schedule was published at schedule.blueteamvillage.org.",
        },
        { type: "heading", text: "Contests at Blue Team Village" },
        {
          type: "paragraph",
          text: "CTF challenges were available at ctf.blueteamvillage.org/challenges.",
        },
        { type: "heading", text: "Gatherings & Events" },
        {
          type: "list",
          items: [
            "Movie Night and Mixer — Saturday, August 9, 7–10 PM PDT",
            "Las Vegas Convention Center, W216–218",
            "Free admission with a DEF CON badge",
          ],
        },
        { type: "heading", text: "BTV Sponsors" },
        {
          type: "paragraph",
          text: "Thank you to our sponsors! Their support enables all the things we do for the community.",
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
    tagline: "Our 7th year at DEF CON.",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "We were excited to bring Blue Team Village (BTV) to DEF CON 32 for a seventh year.",
        },
        {
          type: "paragraph",
          text: "The session tracks included the following topics: Incident Response, Forensics, Cyber Threat Hunting, Detection Engineering, Operational Technology, and Insider Threat/Risk.",
        },
        { type: "heading", text: "BTV Presentations and Workshops" },
        {
          type: "paragraph",
          text: "BTV was located inside the Las Vegas Convention Center West Hall, 3rd Floor. The schedule was published at schedule.blueteamvillage.org and in the Hacker Tracker app.",
        },
        { type: "heading", text: "BTV Badge" },
        {
          type: "paragraph",
          text: "The BTV camera badge was available at camerabadge.blueteamvillage.org.",
        },
        { type: "heading", text: "BTV Capture the Flag" },
        {
          type: "paragraph",
          text: "The BTV CTF ran at ctf.blueteamvillage.org, alongside a village puzzle contest.",
        },
        { type: "heading", text: "Gatherings & Events" },
        {
          type: "list",
          items: [
            "AI Village and Blue Team Village Pool Party, featuring Dunk-A-Fed",
            "Saturday, August 10 at 8 PM — Sahara AZILO Pool",
            "Tacos and a cash bar",
          ],
        },
      ],
    },
    tracks: sixTracks,
    /* No per-sponsor records survive for DC32, so the body deliberately omits
       a sponsors heading rather than leaving one orphaned. */
    sponsors: [],
    scheduleUrl: "https://schedule.blueteamvillage.org/",
    isCurrent: false,
  },
  {
    title: "BTV at DEF CON 31",
    slug: "def-con-31",
    year: 2023,
    dateRange: "August 10–13, 2023 · Las Vegas, NV",
    tagline: "Our 6th year at DEF CON.",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "We were excited to bring Blue Team Village (BTV) to DEF CON 31. Our sixth year included a 101 session track, a kill chain/workshop track, panel discussions, two contests, and more.",
        },
        {
          type: "paragraph",
          text: "The session tracks included the following topics: Incident Response, Forensics, Cyber Threat Hunting, Detection Engineering, Operational Technology, and Insider Threat/Risk.",
        },
        { type: "heading", text: "Location" },
        {
          type: "paragraph",
          text: "BTV was located inside the Flamingo's Scenic room.",
        },
        { type: "heading", text: "Contests" },
        {
          type: "list",
          items: [
            "Blue Team Village CTF",
            "Venator Aurum — a village-wide puzzle hunt",
          ],
        },
        { type: "heading", text: "BTV Schedule" },
        {
          type: "paragraph",
          text: "The BTV schedule was published in the Hacker Tracker app and at cfc.blueteamvillage.org/dc31/schedule.",
        },
        { type: "heading", text: "Thank You" },
        {
          type: "paragraph",
          text: "Thank you to all of the Project Obsidian volunteers who started planning and working on content back in December and January. The Security Engineering (SecEng) crew put a ton of work into setting up infrastructure, implementing requests from the various teams, and getting everything in place for CTF participants. This would not be possible without our SecEng crew and the rest of our volunteers.",
        },
      ],
    },
    tracks: sixTracks,
    sponsors: [],
    isCurrent: false,
  },
  {
    title: "BTV at DEF CON 30",
    slug: "def-con-30",
    year: 2022,
    dateRange: "August 11–14, 2022 · Las Vegas, NV",
    tagline: "Blue Team Village turns 5!",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Blue Team Village returned for our fifth DEF CON, and our first back in person. We offered a packed in-person schedule alongside a full virtual schedule of talks and workshops running at the same time.",
        },
        { type: "heading", text: "In Person" },
        {
          type: "paragraph",
          text: "BTV was located in the Savoy Room at the Flamingo — the same location we were in for DEF CON 27 in 2019. BTV showcased Project Obsidian, an immersive defensive cybersecurity learning experience, with interactive stations and live in-person walkthroughs, plus a number of panels covering a range of subjects.",
        },
        { type: "heading", text: "Virtual" },
        {
          type: "paragraph",
          text: "Alongside the in-person content we ran a full schedule of virtual talks and interactive workshops for those who couldn't be with us in person. Talks were streamed on the Blue Team Village Twitch channel, with speakers available in the Blue Team Village channel on the DEF CON Discord during their sessions. Recordings were released on the Blue Team Village YouTube channel after DEF CON.",
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
      "A free, immersive, defensive cybersecurity learning experience — workshops, labs, and BTV's Capture the Flag, year-round.",
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
        { type: "heading", text: "Capture the Flag" },
        {
          type: "paragraph",
          text: "BTV's Capture the Flag is Project Obsidian played as a competition — the same disciplines and the same defender's-seat telemetry, scored. It runs at DEF CON and lives at ctf.blueteamvillage.org, where you'll find this year's event, the setup instructions, and the archive of past challenges.",
        },
        { type: "heading", text: "Get involved" },
        {
          type: "paragraph",
          text: "Project Obsidian is built by volunteers. Join the BTV Discord to take part — at DEF CON and year-round.",
        },
      ],
    },
    disciplines: ["IR", "DF", "REM", "CTI", "CTH"],
    order: 1,
  },
  {
    name: "Venator Aurum",
    slug: "venator-aurum",
    summary:
      "A puzzle-driven CTF adventure where every cipher, puzzle, and anomaly is a thread in one overarching meta-puzzle.",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Venator Aurum is a puzzle-driven CTF adventure where your mind is your greatest weapon and every challenge tests the limits of your cybersecurity knowledge and critical thinking skills.",
        },
        {
          type: "paragraph",
          text: "Each cipher you decrypt, each puzzle you solve, each anomaly you uncover is part of a larger design. Hidden threads weave through the challenges, forming an overarching meta-puzzle, a carefully constructed labyrinth that only the most observant and clever hackers can escape. The deeper you go, the clearer the pattern becomes, until suddenly, everything connects.",
        },
      ],
    },
    disciplines: [],
    order: 3,
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
    heroSubheading:
      "Respectful, inclusive debate that advances knowledge and understanding.",
    body: {
      kind: "blocks",
      blocks: [
        {
          type: "paragraph",
          text: "Blue Team Village values respectful and inclusive debate that advances knowledge and understanding. However we will not tolerate disrespectful, threatening, or demeaning language or actions that make any member of the community feel unwelcome or threatened.",
        },
        {
          type: "paragraph",
          text: "We are devoted to creating a safe, friendly, and welcoming environment. We expect your behaviors to contribute to this. It's not about what you look like but what's in your mind and how you present yourself that counts.",
        },
        { type: "heading", text: "Harassment" },
        {
          type: "paragraph",
          text: "We do not condone harassment against any participant, for any reason. Harassment includes deliberate intimidation and targeting individuals in a manner that makes them feel uncomfortable, unwelcome, or afraid.",
        },
        {
          type: "paragraph",
          text: "Participants asked to stop any harassing behavior are expected to comply immediately. We reserve the right to respond to harassment in the manner we deem appropriate, including but not limited to expulsion from the community and referral to the relevant authorities.",
        },
        { type: "heading", text: "General guidelines" },
        {
          type: "paragraph",
          text: "We have set out the following general guidelines to help ensure that members of our community feel safe and welcome:",
        },
        {
          type: "list",
          items: [
            "Be kind and courteous to others, and use welcoming and inclusive language. Show empathy for others, and be respectful of different viewpoints and opinions.",
            "Trolling, spamming, flaming, etc. will not be permitted.",
            "Keep differences of opinion structured, constructive, and where they are wanted. Likewise accept differing opinions gracefully and with consideration for others. Remember that we all walk different paths.",
            "Differing ideas are welcome, but attacks are never acceptable.",
            "Hate speech such as racism, sexism, homophobia, transphobia, ableism, etc. is completely unacceptable and will not be tolerated.",
            "Private harassment, including the above, will also not be tolerated. If you feel this is happening to you, please reach out to one of the BTV organizers. We want this community to feel safe for its participants.",
            "Selling of anything is prohibited.",
          ],
        },
        { type: "heading", text: "Who this applies to" },
        {
          type: "paragraph",
          text: "This Code of Conduct applies to everyone participating in the BTV community, including attendees, exhibitors, speakers, press, volunteers, and anyone else that participates in our community.",
        },
        { type: "heading", text: "Reporting a concern" },
        {
          type: "paragraph",
          text: "These are standards and moderation guidelines, and as such are followed in spirit, not by letter. If you feel these are being violated, or someone is otherwise making the community unsafe, unwelcome, or uncomfortable, we encourage you to contact one of the BTV organizers.",
        },
        { type: "heading", text: "About the organization" },
        {
          type: "paragraph",
          text: "The Association of Blue Team Villages (aka. Blue Team Village) is a Domestic Nonprofit Corporation formed in Pennsylvania, USA and is classified as a public charity exempt from federal income tax under IRC 501(c)(3). EIN: 83-3529393.",
        },
        {
          type: "paragraph",
          text: "Association of Blue Team Villages, 1657 The Fairway 1150, Jenkintown, PA, 19046.",
        },
      ],
    },
    seoDescription:
      "Blue Team Village's Code of Conduct — the behavior expected of everyone in the BTV community, our harassment policy, and how to report a concern.",
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
          text: "The Association of Blue Team Villages is a Pennsylvania domestic nonprofit corporation and a federally tax-exempt 501(c)(3) public charity. Your donation is tax-deductible and directly funds free defender education, Project Obsidian, and BTV's presence at DEF CON.",
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
          text: "Blue Team Village partners with organizations that want to support the defender community. Sponsorship funds free training, hands-on labs, and our village at DEF CON.",
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

/* Home-page stat row. */
export const fallbackStats: Stat[] = [
  { value: "9", label: "Years at DEF CON" },
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
