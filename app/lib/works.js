// Shared "Selected Work" data — used by the homepage rail and by each
// case study detail page (app/work/[slug]/page.js).
export const works = [
  {
    slug: 'asml-risk-assessment',
    navLabel: 'ASML Workflow',
    title: 'ASML',
    confidential: true,
    logo: '/asmllogo.png',
    bgColor: '#0E7C86',
    tagline: 'Redesigned a workflow tool that reduces production mistakes',
    heroImage: '/prototypes/asml-redesign/dashboard.png',
    heroAspect: '2880 / 2240',
    // Plays the prototype as a looping, non-interactive tour in the hero (the
    // still heroImage shows first, and for people who prefer reduced motion).
    heroTour: '/prototypes/asml-redesign/qbtm-navigator.html',
    // Small line under the hero picture (optional).
    heroNote: 'This prototype is confidential work for ASML. None of the data in it is real. All names, numbers and items are made up for demonstration.',
    role: 'Product Designer & UX Researcher',
    year: '2024',
    domain: 'Internal workflow management tool',
    desc: 'Recurring production mistakes and customer complaints became an ongoing challenge. ASML’s solution seemed simple: build an internal tool to help workers reduce production errors. However, the tool struggled to gain adoption because the user experience was overlooked during its development.',
    tags: ['Internal Workflow Tool', 'Enterprise UX', 'Operational Tool'],
    type: 'image',
    media: '/ASML_Cleanroom_Testlab_July2021-65 2.png',
    client: 'ASML',
    clientDescription: 'ASML is a Dutch company and the world\'s leading supplier of photolithography systems used to manufacture computer chips.',
    deliverables: ['Data design system', 'Interaction design', 'Prototype'],
    timeline: '2022-2024',
    team: ['UX Designer', 'Business Analyst', 'Process Engineer', 'Project Manager', 'Change Manager', 'Developer'],
    problem: 'Getting complaints from clients because of production mistakes.',
    solution: 'An internal tool was built to reduce production mistakes, but adoption remained low.',
    designChallenge: [
      'Nobody had designed it for the people using it. ASML needed a designer to turn it into something workers would choose to use.',
    ],
    designSolution: [
      'First finding the real problems, then designing logical workflows and interactions that follow how workers really work and understand.',
    ],
    stats: [
      { value: '100%', trend: 'down', label: 'Reduced language complexity ', note: '90% of workers found the language simpler', big: '90%', text: 'of workers found the language simpler' },
      { value: '35s → 15s', trend: 'up', label: ' Faster access to start operations', note: 'Starting takes 30 sec, down from 90 sec', big: '30 sec', text: 'down from 90 sec' },
      { value: '50% ', trend: 'down', label: 'Reduced steps to complete a task ', note: 'Tasks now need 50% fewer steps', big: '50%', text: 'fewer steps per task' },
    ],
    // Before / after story under the metrics. Add `image` to show a visual.
    impactStory: [
      { stage: 'Before', caption: 'How the work looked before the redesign.', image: '', images: ['', '/masterdata-mock.png', ''] },
      { stage: 'After', caption: 'How it works now.', image: '', images: ['', '/faster-access-after.png', ''], demos: ['', '/faster-access-demo.html', ''] },
    ],
    // Prototype shown on the case study page. Fill in `src` to make the
    // section appear (leave it '' to hide it).
    //   type: 'embed' (a page in /public/prototypes, or any embeddable URL),
    //         'video' (a file in /public, e.g. '/prototype.mp4'),
    //         'figma' (a Figma share link)
    //   hotspots: optional numbered dots that open a "design decision" popup
    //   note: optional small text under the prototype (e.g. confidentiality)
    prototype: {
      title: 'Prototype',
      description: 'Click through the prototype to see how it works.',
      type: 'embed',
      src: '/prototypes/asml-redesign/qbtm-navigator.html',
      // Numbered dots on the prototype. x / y are positions on the 1440 x 1120
      // prototype screen. `before` is an image of the old design (leave it out
      // to hide that part, '' shows an empty slot). `wide: true` makes the
      // popup bigger for large images; clicking the image enlarges it fully.
      hotspots: [
        {
          x: 236, y: 170,
          title: 'Saved Products lives right under Dashboard',
          why: 'Draft text: people kept going back to the same few products, so I put them one click away instead of making them search every time.',
          before: '',
        },
        {
          x: 1247, y: 64,
          title: 'A notification bell that tells you what needs a decision',
          why: 'Draft text: finished quality checks and waiting decisions used to get lost. The bell collects them in one place and opens the product directly.',
          before: '',
        },
        {
          x: 1030, y: 31,
          title: 'One search for items, product codes and context',
          why: 'Draft text: users did not know which field to use, so there is one search box that understands all of them.',
          before: '',
          wide: true,
        },
      ],
      note: 'This prototype is confidential work for ASML. None of the data in it is real. All names, numbers and items are made up for demonstration.',
    },
    highlights: [],
    challenge: [
      'Platform engineers relied on a dense, hard-to-read TIBCO Spotfire tool to compare component similarity — slowing down every review cycle.',
      'ASML asked me to turn this into a modern decision app that surfaces the right comparison at the right time, without engineers having to dig for it.',
    ],
    impact: [
      'Engineers now get to the right comparison in a fraction of the clicks it used to take, cutting review cycles and freeing up time for the judgment calls that actually need a person.',
      'The new decision app has become the default way platform engineers explore component similarity, replacing the old Spotfire workflow entirely.',
    ],
    // No Background section on this case study.
    process: [
      {
        title: 'Is there a real problem?',
        text: 'I sat with the workers using the tool and watched how production mistakes actually happened — not how the complaint tickets described them. The mistakes were costing ASML real time and client trust, so this was worth solving.',
      },
      {
        title: 'Who is this for?',
        text: 'The people actually operating the tool day to day — not the managers who requested it. Their language, their shortcuts, their frustrations became the brief.',
      },
      {
        title: "What's the simplest fix?",
        text: 'Not a redesign of everything — just simplifying the tool\'s language, cutting steps out of the task flow, and making navigation obvious so people could find what they needed without training.',
      },
      {
        title: 'How do we know it worked?',
        text: 'Adoption was the real metric, not usage logs alone. I tracked how much faster people could get to the information they needed and how many fewer steps a task took.',
      },
      {
        title: 'What shipped',
        text: 'A simplified internal tool with a lighter task flow and clearer navigation — cutting language complexity and task steps while making the path to start an operation faster.',
      },
    ],
    // Process timeline blocks. `weight` = how long the block is relative to the
    // others (default 1) — e.g. weight: 3 makes a stage three times longer.
    processTimeline: {
      stages: [
        { id: 'problem-discovery', phase: 'Discovery', label: 'Problem discovery', duration: '2 days', summary: 'Problem discovery took a little longer than expected because the project had already been running for 7 years. There were already too many stories and stakeholders. I collected the pieces to find the right problem. **Not every problem I heard was a real problem.** **I started to cluster the problems and validate them with other parties.** Once I had divided the problems into manageable sizes, I had the proper argument to manage the stakeholders and business owners.', outputs: [], story: {
          heardLabel: 'What I heard',
          quotes: [
            'The tool looks bad, we need to improve it.',
            'We do not actually know who will use it.',
            'The tool is too technical.',
          ],
          notReal: 'None of them were the real problem.',
          real: 'The real problem was simple: the tool had no clear purpose before it was built.',
        },
        images: [
          { src: '/problem-discovery-laptops-2.jpg', alt: 'Working through the problems together on laptops' },
          { src: '/problem-discovery-2.jpg', alt: 'Team workshop clustering problems on sticky notes' },
        ], wentWell: 'The team really wanted a UX designer, because it was a clear missing piece.', challenging: 'The team had never worked with a designer before, so the project was already unnecessarily complex.', weight: 4 },
        { id: 'convincing-stakeholders', phase: 'Discovery', label: 'Convincing stakeholders', duration: '1 day', summary: 'Narrowed the findings into one problem statement and used it to get the stakeholders behind the project.', outputs: ['Problem statement', 'Success metrics'], weight: 3 },
        { id: 'ux-research', phase: 'Discovery', label: 'UX research', duration: '3 days', summary: 'Ran interviews and task observations with operators to understand how they read the language and move through the tool.', outputs: ['Interview insights', 'Task analysis'], weight: 2 },
        { id: 'solution-ideas', phase: 'Discovery', label: 'Solution ideas', duration: '3 days', summary: 'Sketched simplified language and navigation options and tested them with the operators.', outputs: ['Flow sketches', 'Clickable prototype'], weight: 1.5 },
        { id: 'design-test-development', phase: 'Construction', label: 'Design, test & development', duration: '6 weeks', summary: 'Detailed the simplified flows in short design and test loops with the operators, and built the tested flows with engineering in weekly review cycles.', outputs: ['Component specs', 'Test findings', 'Weekly builds'], weight: 3 },
      ],
    },
  },
  {
    slug: 'Commonality',
    navLabel: 'ASML Commonality',
    title: 'ASML',
    confidential: true,
    logo: '/asmllogo.png',
    bgColor: '#F0B429',
    tagline: 'Redesigned an analysis tool that helps engineers to make better chip machines',
    role: 'Role',
    year: '2022-2024',
    domain: 'internal analysis tool',
    desc: 'A short description of the project — the problem, what you designed, and the outcome.',
    tags: ['Internal Analysis Tool', 'Decision Support Tool', 'Data Tool'],
    type: 'image',
    media: '/asmltest.jpg',
    client: 'ASML',
    clientDescription: 'ASML is a Dutch company and the world\'s leading supplier of photolithography systems used to manufacture computer chips.',
  
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
      { value: '25%', trend: 'up', label: 'Improved information hiyearchy' },
      { value: '1 week', trend: 'down', label: 'Reduced cognitive complexity' },
    ],
    // Before / after story under the metrics. Add `image` to show a visual.
    impactStory: [
      { stage: 'Before', caption: 'How the work looked before the redesign.', image: '' },
      { stage: 'After', caption: 'How it works now.', image: '' },
    ],
    // Prototype shown on the case study page. Fill in `src` to make the
    // section appear (leave it '' to hide it).
    //   type: 'embed' (a page in /public/prototypes, or any embeddable URL),
    //         'video' (a file in /public, e.g. '/prototype.mp4'),
    //         'figma' (a Figma share link)
    //   note: optional small text under the prototype (e.g. confidentiality)
    prototype: {
      title: 'Prototype',
      description: 'Click through the prototype to see how it works.',
      type: 'embed',
      src: '',
      note: '',
    },
    highlights: [],
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
    process: [
      { title: 'Is there a real problem?', text: 'A short paragraph on how you confirmed this was worth solving.' },
      { title: 'Who is this for?', text: 'A short paragraph on who the work was actually designed around.' },
      { title: "What's the simplest fix?", text: 'A short paragraph on the approach you chose and why.' },
      { title: 'How do we know it worked?', text: 'A short paragraph on how you measured or validated the outcome.' },
      { title: 'What shipped', text: 'A short paragraph summarizing the final solution.' },
    ],
    processTimeline: {
      stages: [
        { id: 'problem-discovery', phase: 'Discovery', label: 'Problem discovery', duration: '2 days', summary: 'A short paragraph on how you confirmed this was worth solving.', outputs: ['Contextual interviews', 'Current workflow map'] },
        { id: 'problem-definition', phase: 'Discovery', label: 'Problem definition', duration: '1 day', summary: 'A short paragraph on the problem statement and success metrics.', outputs: ['Problem statement', 'Success metrics'] },
        { id: 'solution-discovery', phase: 'Discovery', label: 'Solution discovery', duration: '3 days', summary: 'A short paragraph on the approach you chose and why.', outputs: ['Flow sketches', 'Clickable prototype'] },
        { id: 'concept-validation', phase: 'Discovery', label: 'Concept validation', duration: '2 days', summary: 'A short paragraph on how the concept was validated.', outputs: ['Usability sessions', 'Decision log'] },
        { id: 'design-development', phase: 'Construction', label: 'Design & development', duration: '6 weeks', summary: 'A short paragraph on how the solution was built.', outputs: ['Component specs', 'Weekly builds'], weight: 1.8 },
        { id: 'labs', phase: 'Transition', label: 'Internal & customer labs', duration: '3 weeks', summary: 'A short paragraph on piloting and iterating.', outputs: ['Pilot feedback', 'Fix list'], weight: 1.5 },
        { id: 'availability', phase: 'Adoption', label: 'Commercial availability', duration: 'Ongoing', summary: 'A short paragraph on how you measured or validated the outcome.', outputs: ['Rollout plan', 'Adoption metrics'], weight: 1.2 },
      ],
    },
  },
  {
    slug: 'sintek-procurement-platform',
    navLabel: 'Sintek',
    title: 'Sintek BV',
    confidential: true,
    logo: '/sinteklogo.png',
    logoHeight: '15px',
    bgColor: '#D96B2C',
    tagline: 'Building a tailor made internal workflow tool for procurement',
    role: 'Lead Product Designer',
    year: '2024- Ongoing',
    domain: 'Enterprise',
    desc: 'An enterprise-grade internal procurement and supply-chain platform. Consolidated fragmented vendor data into one operational source of truth.',
    tags: ['Enterprise UX', 'Procurement tool', 'Internal tool', 'Tailor-made software'],
    type: 'image',
    media: '/project-three-robotics.jpg',
    client: 'Sintek',
    clientDescription: 'Sintek BV is a Dutch engineering and construction company delivering industrial and infrastructure projects.',
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
      { value: '25%', trend: 'down', label: 'Improved workflow consistency' },
      { value: '1 week', trend: 'up', label: 'Increased visibility during procurement process' },
      { value: '>95%', trend: 'up', label: ' Fixed old fashioned manuel processes ' },
    ],
    // Before / after story under the metrics. Add `image` to show a visual.
    impactStory: [
      { stage: 'Before', caption: 'How the work looked before the redesign.', image: '' },
      { stage: 'After', caption: 'How it works now.', image: '' },
    ],
    // Prototype shown on the case study page. Fill in `src` to make the
    // section appear (leave it '' to hide it).
    //   type: 'embed' (a page in /public/prototypes, or any embeddable URL),
    //         'video' (a file in /public, e.g. '/prototype.mp4'),
    //         'figma' (a Figma share link)
    //   note: optional small text under the prototype (e.g. confidentiality)
    prototype: {
      title: 'Prototype',
      description: 'Click through the prototype to see how it works.',
      type: 'embed',
      src: '',
      note: '',
    },
    highlights: [],
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
    process: [
      { title: 'Is there a real problem?', text: 'A short paragraph on how you confirmed this was worth solving.' },
      { title: 'Who is this for?', text: 'A short paragraph on who the work was actually designed around.' },
      { title: "What's the simplest fix?", text: 'A short paragraph on the approach you chose and why.' },
      { title: 'How do we know it worked?', text: 'A short paragraph on how you measured or validated the outcome.' },
      { title: 'What shipped', text: 'A short paragraph summarizing the final solution.' },
    ],
    processTimeline: {
      stages: [
        { id: 'problem-discovery', phase: 'Discovery', label: 'Problem discovery', duration: '2 days', summary: 'A short paragraph on how you confirmed this was worth solving.', outputs: ['Contextual interviews', 'Current workflow map'] },
        { id: 'problem-definition', phase: 'Discovery', label: 'Problem definition', duration: '1 day', summary: 'A short paragraph on the problem statement and success metrics.', outputs: ['Problem statement', 'Success metrics'] },
        { id: 'solution-discovery', phase: 'Discovery', label: 'Solution discovery', duration: '3 days', summary: 'A short paragraph on the approach you chose and why.', outputs: ['Flow sketches', 'Clickable prototype'] },
        { id: 'concept-validation', phase: 'Discovery', label: 'Concept validation', duration: '2 days', summary: 'A short paragraph on how the concept was validated.', outputs: ['Usability sessions', 'Decision log'] },
        { id: 'design-development', phase: 'Construction', label: 'Design & development', duration: '6 weeks', summary: 'A short paragraph on how the solution was built.', outputs: ['Component specs', 'Weekly builds'], weight: 1.8 },
        { id: 'labs', phase: 'Transition', label: 'Internal & customer labs', duration: '3 weeks', summary: 'A short paragraph on piloting and iterating.', outputs: ['Pilot feedback', 'Fix list'], weight: 1.5 },
        { id: 'availability', phase: 'Adoption', label: 'Commercial availability', duration: 'Ongoing', summary: 'A short paragraph on how you measured or validated the outcome.', outputs: ['Rollout plan', 'Adoption metrics'], weight: 1.2 },
      ],
    },
  },
];

export function getWorkBySlug(slug) {
  return works.find((w) => w.slug === slug);
}
