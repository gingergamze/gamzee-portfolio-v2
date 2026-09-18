// Shared "Selected Work" data — used by the homepage rail and by each
// case study detail page (app/work/[slug]/page.js).
export const works = [
  {
    slug: 'asml-risk-assessment',
    title: 'ASML',
   
    tagline: 'REDESIGNED A WORKFLOW TOOL THAT REDUCES PRODUCTION MISTAKES',
    role: 'Product Designer & UX Researcher',
    year: '2024',
    domain: 'Internal workflow management tool',
    desc: 'This project was about reducing production mistakes through an internal tool for ASML workers, but the tool struggled to gain adoption.',
    tags: ['Internal Workflow Tool', 'Enterprise UX', 'Operational Tool'],
    type: 'image',
    media: '/ASML_Cleanroom_Testlab_July2021-65 2.png',
    client: 'ASML',
    deliverables: ['Data design system', 'Interaction design', 'Prototype'],
    timeline: '2022-2024',
    team: ['Business Analyst', 'Process Engineer ',  'Project Manager ','Change Manager ', 'Developer'],
    problem: 'ASML started to get complains from clients because of production mistakes ',
    solution: 'An internal tool was built to reduce production mistakes, but adoption remained low.',
    designChallenge: [
      'First going deeper about what exactly is the challenge? Increasing adoption rate.',
    ],
    designSolution: [
      'I focused on implifying the tool language, reducing task steps and improving navigation.',
    ],
    stats: [
      { value: '100%', label: 'Reduced language complexity ' },
      { value: '35s → 15s', label: 'Improved time to find information to start operation' },
      { value: '50% ', label: 'Reduced steps to complete a task ' },
    ],
    highlights: [
      {
        title: 'Title of this section',
        text: [
          'First paragraph explaining this part of the work.',
          'Second paragraph, if needed.',
        ],
        image: '/asmltest.jpg',
      },
    ],
    challenge: [
      'Platform engineers relied on a dense, hard-to-read TIBCO Spotfire tool to compare component similarity — slowing down every review cycle.',
      'ASML asked me to turn this into a modern decision app that surfaces the right comparison at the right time, without engineers having to dig for it.',
    ],
    impact: [
      'Engineers now get to the right comparison in a fraction of the clicks it used to take, cutting review cycles and freeing up time for the judgment calls that actually need a person.',
      'The new decision app has become the default way platform engineers explore component similarity, replacing the old Spotfire workflow entirely.',
    ],
    // No Background section on this case study.
  },
  {
    slug: 'Commonality',
    title: 'ASML',
    
    tagline: 'Building a tool that finds efficient ways to make chip machines',
    role: 'Role',
    year: '2022-2024',
    domain: 'internal tool',
    desc: 'A short description of the project — the problem, what you designed, and the outcome.',
    tags: ['Tag one', 'Tag two'],
    type: 'image',
    media: '/asmltest.jpg',
    client: 'ASML',
  
    timeline: '2022-2024',
    team: ['Developers', 'Business Analyst', 'Product Owner', 'Data Analyst', 'Change Manager'],
    problem: 'A short statement of the problem.',
    solution: 'A short statement of the solution.',
    designChallenge: [
      'A short statement of the design challenge.',
    ],
    designSolution: [
      'A short statement of how the design solved it.',
    ],
    stats: [
      { value: '25%', label: 'Short line describing this result' },
      { value: '1 week', label: 'Short line describing this result' },
      { value: '>95%', label: 'Short line describing this result' },
    ],
    highlights: [
      {
        title: 'Title of this section',
        text: [
          'First paragraph explaining this part of the work.',
          'Second paragraph, if needed.',
        ],
        image: '/asmltest.jpg',
      },
    ],
    challenge: [
      'A short paragraph describing the problem the client came to you with, and why it mattered.',
    ],
    impact: [
      'A short paragraph on the measurable outcome — what changed for the business or the users after this shipped.',
    ],
    backgroundImages: [
      { src: '/project-three.png', caption: 'A short caption describing what this photo shows.' },
      { src: '/project-three.png', caption: 'A short caption describing what this second photo shows.' },
    ],
    backgroundText: [
      'A short paragraph setting the scene — what the team or product looked like before this project started.',
      'Another short paragraph on how the work began and who was involved in shaping the initial direction.',
    ],
  },
  {
    slug: 'sintek-procurement-platform',
    title: 'Sintek BV',
   
    tagline: 'Building an tailor made Internal workflow tool for procurement and HR.',
    role: 'Lead Product Designer',
    year: '2024- Ongoing',
    domain: 'Enterprise',
    desc: 'An enterprise-grade internal procurement and supply-chain platform. Consolidated fragmented vendor data into one operational source of truth.',
    tags: ['Enterprise', 'Supply chain', 'Internal tooling'],
    type: 'image',
    media: '/project-three-robotics.jpg',
    client: 'Sintek',
    deliverables: ['Product design', 'Design system', 'UX research'],
    timeline: '2024- Current',
    team: ['Full Stack Developer', 'Construction Project  Engineer'],
    problem: 'Fragmented vendor data and no single source of truth.',
    solution: 'One procurement platform and a design system built for daily use.',
    designChallenge: [
      'A short statement of the design challenge.',
    ],
    designSolution: [
      'A short statement of how the design solved it.',
    ],
    stats: [
      { value: '25%', label: 'Short line describing this result' },
      { value: '1 week', label: 'Short line describing this result' },
      { value: '>95%', label: 'Short line describing this result' },
    ],
    highlights: [
      {
        title: 'Title of this section',
        text: [
          'First paragraph explaining this part of the work.',
          'Second paragraph, if needed.',
        ],
        image: '/asmltest.jpg',
      },
    ],
    challenge: [
      'Sintek’s procurement teams were working across a patchwork of spreadsheets and legacy tools, with no single source of truth for vendor data.',
      'They asked me to consolidate this into one platform — giving procurement, finance and supply-chain teams a shared, reliable operational view.',
    ],
    impact: [
      'The new platform gave procurement, finance and supply-chain teams one shared source of truth for the first time — cutting the back-and-forth that used to happen just to agree on which numbers were correct.',
      'Vendor onboarding time dropped, and the design system it introduced is now the reference every new internal tool at Sintek is built against.',
    ],
    backgroundImages: [
      { src: '/asmltest.jpg', caption: 'On-site with the procurement team, working through how the new platform needed to fit their daily process.' },
      { src: '/asmltest.jpg', caption: 'Walking the warehouse floor to see how vendor deliveries were actually tracked before the new system.' },
    ],
    backgroundText: [
      'Before I joined, procurement data lived across a scatter of spreadsheets, emails and one legacy tool that hadn’t been updated in years. Every stakeholder — procurement, finance, supply chain — trusted a different version of the truth.',
      'I started by mapping how each team actually worked day to day, then worked closely with engineering to define a shared data model the whole platform could stand on before a single screen was designed.',
    ],
  },
];

export function getWorkBySlug(slug) {
  return works.find((w) => w.slug === slug);
}
