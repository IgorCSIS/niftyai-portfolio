/**
 * Site content.
 *
 * Every word on the homepage that isn't structural lives here. Sections in
 * src/components are thin renderers over these objects, so changing copy,
 * reordering cards, or adding an FAQ is a one-line edit in this file with
 * no markup to touch.
 *
 * Rules that kept this honest and should keep it honest:
 *  - No testimonials, client names, logos, or revenue numbers that didn't
 *    actually happen. Qualitative results only until real ones exist.
 *  - Prices stated here are the prices stated on the page. If one changes,
 *    change it here and both the visible copy and the JSON-LD follow.
 */

export const site = {
  name: "Igor Lima",
  studio: "NiftyAi",
  role: "Python automation for local businesses",
  city: "El Cajon",
  metro: "San Diego",
  region: "California",
  regionCode: "US-CA",
  country: "USA",
  serviceArea: "San Diego County",
  linkedin: "https://www.linkedin.com/in/mrigorlima",
  github: "https://github.com/IgorCSIS",
  /**
   * Public contact email, shown as the fallback when the form does not go
   * through. Publishing it means scrapers will find it, which is the
   * accepted trade for never losing a lead to a broken form. Set to null
   * to pull it off the page entirely; the Contact section adapts.
   */
  email: "niftystudiodesigns@gmail.com" as string | null,
} as const;

export const meta = {
  title: "Igor Lima | Python Automation in El Cajon / San Diego",
  description:
    "Python automation for San Diego businesses. I find the repetitive work eating your team's week and build software that does it instead. Start with a $500 automation audit.",
  keywords: [
    "Python automation San Diego",
    "business automation El Cajon",
    "workflow automation San Diego",
    "data pipeline consultant",
    "internal tools developer",
    "automation audit",
    "contractor software automation",
    "clinic workflow automation",
    "bilingual developer San Diego",
  ],
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "Igor Lima · NiftyAi studio · El Cajon, CA",
  // The line before the accent phrase and the phrase itself are split so
  // the underline draw in Hero.astro can target just the phrase.
  headlinePre: "Stop paying people to",
  headlineAccent: "copy and paste.",
  sub: "I am a Python developer in East County San Diego. I find the repetitive work eating your team's week, then build software that does it instead. Quotes, invoices, job reports, intake forms, the weekly spreadsheet nobody wants to touch.",
  primaryCta: { label: "Book the $500 audit", href: "#contact" },
  secondaryCta: { label: "See the work", href: "#work" },
  // Small proof panel beside the headline. Deliberately factual.
  panel: {
    label: "Start here",
    title: "The $500 automation audit",
    lines: [
      "One week, start to finish",
      "A written map of what is costing you hours",
      "A ranked plan with fixed prices",
      "Credited toward your first build",
    ],
    footnote: "No retainer, no lock-in, no meeting about a meeting.",
  },
} as const;

export const trustStrip = [
  "El Cajon / San Diego",
  "Python automation",
  "Fixed quotes",
  "EN / PT / ES",
] as const;

export const audiences = {
  label: "Who it is for",
  title: "Built for the businesses that run on spreadsheets and paperwork.",
  intro:
    "If a person on your payroll spends hours moving the same information between the same four places, that is the work I take off the table.",
  cards: [
    {
      name: "Contractors and GCs",
      body: "Bids, change orders, daily field reports, photo logs. Turn what your crew sends from the job site into the documents the office needs, without a night of retyping.",
      tags: ["Field reports", "Quotes", "Job costing"],
    },
    {
      name: "Clinics and practices",
      body: "Intake, scheduling, records reconciliation, recurring reports. We scope exactly what data leaves your systems before a line of code gets written.",
      tags: ["Intake", "Scheduling", "Reporting"],
    },
    {
      name: "Manufacturers and shops",
      body: "Production logs, inventory counts, QC sheets, purchase orders. Near Gillespie Field a lot of this still lives on clipboards and one fragile workbook.",
      tags: ["Inventory", "QC logs", "Purchasing"],
    },
    {
      name: "Accountants and professional firms",
      body: "Client document intake, reconciliation passes, the monthly reporting grind. Repetitive, rules-based, high volume. Exactly what software is good at.",
      tags: ["Intake", "Reconciliation", "Monthly close"],
    },
  ],
} as const;

export const process = {
  label: "How it works",
  title: "Three steps. You can stop after any of them.",
  intro:
    "Most people start with the audit, do one build, and decide about the retainer later. That order exists so you find out whether I am any good before you spend real money.",
  steps: [
    {
      step: "01",
      name: "Audit",
      price: "$500",
      duration: "About one week",
      body: "I sit with you and your team, watch how the work actually gets done, and write it down. You get a map of every repetitive workflow, an honest estimate of the hours it burns, and a ranked list of what to automate first with a fixed price on each item.",
      bullets: [
        "Written deliverable you keep, whatever you decide next",
        "Fixed prices on every recommendation",
        "Credited toward your first build",
      ],
      featured: false,
    },
    {
      step: "02",
      name: "Build",
      price: "$2,000 to $5,000",
      duration: "Usually two to four weeks",
      body: "Pick an item off the audit and I build it. Fixed quote agreed before I start, so the number does not move. You see working software every week, not a status update. At handover you get the code, the documentation, and a walkthrough.",
      bullets: [
        "Fixed price agreed before work starts",
        "Working software demoed weekly",
        "You own the code and the repository",
      ],
      featured: true,
    },
    {
      step: "03",
      name: "Retainer",
      price: "Optional, monthly",
      duration: "Month to month",
      body: "Some clients want someone on call once automations are running the business. Monitoring, small changes, the next thing off the list. Priced per client after the first build, cancel whenever. Plenty of people never need this and that is fine.",
      bullets: [
        "Monitoring and fixes on what is already live",
        "A steady queue for the next items",
        "Month to month, cancel anytime",
      ],
      featured: false,
    },
  ],
} as const;

export const work = {
  label: "Selected work",
  title: "Things I built and shipped.",
  intro:
    "Live work you can click. Contractor lead systems and automation tools, plus a couple of side projects that show how I build.",
  // Said once, under the intro, so nobody has to guess which of these had a
  // paying client behind it. None of them did, and pretending otherwise is
  // the fastest way to lose the one person who checks.
  note: "The contractor pieces are portfolio demos built for East County trades, not client case studies. TrustLens and NiftyStats show other build patterns.",
  projects: [
    {
      name: "Instant Lead Response",
      tagline: "Instant customer reply and owner SMS notify for trades",
      status: "Demo",
      tone: "demo",
      problem:
        "The lead comes in while the contractor is twelve feet up a ladder in Santee. By the time anyone calls back that evening the homeowner has already booked whoever answered first.",
      build:
        "A click-through demo paced to the real clock. The lead lands, the customer gets a text back at eight seconds that names the job and asks one qualifying question, and the owner's phone buzzes at twelve with the name, the job, the city and how urgent it is. It sits next to Jobber or Housecall Pro rather than replacing either. Both paths are there: a web form, and a missed call where all you have is the number.",
      result:
        "A proof an East County contractor can click on their phone in under a minute. The page is labelled a demo in a header that never scrolls away, and it sends nothing. The done-for-you install behind it is the actual product.",
      links: [
        { label: "Open the demo", href: "https://igorcsis.github.io/instant-lead-response/", external: true },
        { label: "Read the code", href: "https://github.com/IgorCSIS/instant-lead-response", external: true },
      ],
      stack: ["Automation", "Lead response", "Static demo", "East County"],
      featured: true,
    },
    {
      name: "Lead Follow-up",
      tagline: "Same-day text and email drafts for contractor leads",
      status: "Live tool",
      tone: "live",
      problem:
        "Website leads sit unanswered for a day or two. Whoever replies first gets the walkthrough, and it is almost never the person still finishing a job at six.",
      build:
        "A free browser tool that turns a CSV of leads into a ready-to-send text and an email for each one, urgent leads first, with a copy button on every draft. No account, no API key, and the list never leaves the device. A Python command line version mirrors it exactly for anyone who would rather run it from a terminal.",
      result:
        "Paste-ready drafts for today's leads, sorted by who needs a reply today. Open it on a link and try it with the sample data before deciding anything.",
      links: [
        { label: "Open the tool", href: "https://igorcsis.github.io/lead-followup/", external: true },
        { label: "Read the code", href: "https://github.com/IgorCSIS/lead-followup", external: true },
      ],
      stack: ["TypeScript", "Vite", "Browser only", "Contractors"],
      featured: false,
    },
    {
      name: "Ridgeview Remodeling",
      tagline: "Lead-capture site for an East County remodeler",
      status: "Demo brand",
      tone: "demo",
      problem:
        "A weak contractor website loses the quote request before anyone finishes reading. No prices, no process, and no obvious way to ask for a number.",
      build:
        "A full marketing site for an invented brand: kitchens, baths and ADUs, the process spelled out step by step, honest price ranges instead of call for pricing, an FAQ, and a quote form that actually delivers. The sample reviews are labelled as samples on the page itself.",
      result:
        "A live demo of the kind of site I build for local trades, and the front end of the same lead loop the other two projects pick up.",
      links: [
        { label: "Open the demo", href: "https://igorcsis.github.io/ridgeview-remodeling-demo/", external: true },
        { label: "Read the code", href: "https://github.com/IgorCSIS/ridgeview-remodeling-demo", external: true },
      ],
      stack: ["Astro", "Tailwind", "Lead capture", "Demo brand"],
      featured: false,
    },
    {
      name: "TrustLens",
      tagline: "Contract safety scanner and triage",
      status: "Live beta on Base",
      tone: "live",
      problem:
        "Raw contract scanners flag everything. Point one at a proxy contract and it screams about the same handful of patterns on every upgradeable token, so the real risks drown in noise nobody reads.",
      build:
        "A Python and TypeScript scanner that understands proxy patterns and triages findings by what actually matters for the contract in front of it, then explains each finding in plain language instead of a severity badge.",
      result:
        "Live in beta on Base. The triage layer re-judges every finding a raw scan produces and marks most of them false alarms, so what is left to read is a short list rather than a wall. Ongoing project, still being tuned.",
      links: [
        { label: "Open the live app", href: "https://trustlens-web.niftyai.workers.dev", external: true },
        { label: "Read the code", href: "https://github.com/IgorCSIS/trustlens-backend", external: true },
      ],
      stack: ["Python", "TypeScript", "LLM triage", "Cloudflare Workers"],
      featured: false,
    },
    {
      name: "NiftyStats",
      tagline: "Statistics in the browser, no install",
      status: "Live",
      tone: "live",
      problem:
        "Anyone who wants to run a quick statistical test on a CSV has to install Python, pick packages, and fight an environment first. Most people give up and go back to the spreadsheet.",
      build:
        "Pyodide running real Python in the browser tab. Load a file, run the test, read the output. Nothing gets uploaded anywhere because nothing leaves the machine. Static hosting, no backend to pay for.",
      result:
        "A working stats tool anyone can open on a link. It is also the clearest demo I have of a pattern clients ask for: real computation, no install, no server bill.",
      links: [
        { label: "Open NiftyStats", href: "https://igorcsis.github.io/niftystats/", external: true },
      ],
      stack: ["Python", "Pyodide", "Pandas", "Static hosting"],
      featured: false,
    },
  ],
  // Smaller side projects. Listed, not sold.
  also: {
    title: "Also built",
    items: [
      { name: "NiftyVid", note: "Video generation tooling and pipelines" },
      { name: "MASTER Prompt Library", note: "A working library of prompts I use in client builds" },
      { name: "PolicyGuard", note: "Defensive log classifier compiled into a DFA" },
    ],
  },
} as const;

export const about = {
  label: "About",
  title: "I ran stores before I wrote software. It shows.",
  paragraphs: [
    "I spent years operating mattress stores. Payroll, inventory, vendors, the daily reports, the month that goes sideways because one number was typed wrong on a Tuesday. I know what busywork costs a small business because I paid for it.",
    "Now I build the software that removes it. Python for the automation, TypeScript and React when something needs a face, Supabase when it needs to remember, Claude and OpenAI APIs when the work needs judgment rather than rules. I study Applied AI at Grossmont and I am based in El Cajon.",
    "I work with people directly. No account manager, no handoff to a junior you never met. You talk to the person building it, which is why the quotes are fixed and the timelines are short.",
  ],
  facts: [
    { k: "Based in", v: "El Cajon, California" },
    { k: "Languages", v: "English, Portuguese, Spanish" },
    { k: "Studying", v: "Applied AI at Grossmont College" },
    { k: "Works with", v: "Local SMBs and remote US clients" },
  ],
  stack: [
    "Python",
    "TypeScript",
    "React",
    "Astro",
    "Supabase",
    "Pandas",
    "Claude API",
    "OpenAI API",
  ],
} as const;

export const faq = {
  label: "Questions",
  title: "The things people ask before they book.",
  items: [
    {
      q: "How fast does this move?",
      a: "The audit takes about a week from our first conversation to the written deliverable. Most builds run two to four weeks after that. If something is genuinely urgent, say so in your message and I will tell you honestly whether I can hit your date.",
    },
    {
      q: "What do you need from me?",
      a: "Roughly two hours total during the audit. One walkthrough of how the work gets done today, a handful of real sample files, and access to whatever systems are involved. After that I work on my own and come back with something to look at.",
    },
    {
      q: "Who is this not for?",
      a: "Companies that want a full ERP replacement, a ten person team, or an enterprise rollout with a procurement process. I am one person who ships focused tools fast. If you need a vendor with a sales department, I am the wrong call and I will say so on the first conversation.",
    },
    {
      q: "What is not included?",
      a: "Third party costs stay yours: API usage, software licenses, hosting, any vendor fees the build depends on. I tell you what those run before you commit. Hardware and ongoing staff training beyond the handover session are also outside the quote.",
    },
    {
      q: "Do I own what you build?",
      a: "Yes. Code, repository, documentation, all of it transfers to you at handover. No license to keep paying, and nothing that stops you from hiring someone else to extend it later.",
    },
    {
      q: "What about sensitive or client data?",
      a: "We scope exactly what data the automation touches and what leaves your systems before anything gets written, and plenty of these builds never send data outside your own infrastructure at all. I sign NDAs. If your industry has specific compliance requirements, bring them to the first call so they shape the design instead of breaking it later.",
    },
  ],
} as const;

export const contact = {
  label: "Contact",
  title: "Tell me what is eating your week.",
  intro:
    "A short note is enough. I read everything myself and reply within one business day. If it looks like a fit, the next step is a 30 minute call and then the audit.",
  // Options in the "what do you need" select. Kept in sync with the offer.
  needs: [
    "The $500 automation audit",
    "A specific build I already have in mind",
    "Not sure yet, want to talk it through",
  ],
  steps: [
    { n: "01", text: "You send a short note. I read it within one business day." },
    { n: "02", text: "We do a 30 minute call to see whether this is worth your money." },
    { n: "03", text: "You book the audit. One week later you have a plan with prices on it." },
  ],
  promises: [
    "Fixed quotes, agreed before work starts",
    "You own the code and the repository",
    "Straight answer if I am not the right fit",
  ],
  /**
   * The "Elsewhere" card. These are the links worth a click after someone
   * has read the page, ordered by what actually builds trust: the person,
   * then the thing they shipped, then the code. `primary: true` gets the
   * full-width prominent treatment; everything else sits in the row below.
   */
  elsewhere: [
    {
      label: "LinkedIn",
      note: "The background, in full",
      href: "https://www.linkedin.com/in/mrigorlima",
      primary: true,
    },
    {
      label: "TrustLens",
      note: "Something I built, running live",
      href: "https://trustlens-web.niftyai.workers.dev",
      primary: true,
    },
    {
      label: "GitHub",
      note: "The code",
      href: "https://github.com/IgorCSIS",
      primary: false,
    },
  ],
} as const;
