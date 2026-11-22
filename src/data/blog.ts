// Blog posts: single source for the /blog list and /blog/[slug] pages.
// `content` is trusted, hand-written HTML.

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // display date, e.g. "Nov 2026"
  longDate: string; // e.g. "November 2026"
  readTime: string;
  category: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'every-agent-needs-a-computer',
    title: 'Every AI agent needs its own computer',
    excerpt:
      'Chat-only assistants hit a wall the moment real work starts. Here is why I gave every bot in CrewForge its own Linux machine, and why the rest of the industry is landing in the same place.',
    date: 'Nov 2026',
    longDate: 'November 2026',
    readTime: '7 min read',
    category: 'Agentic AI',
    image: '/blog/own-computer.webp',
    content: `
      <p>When I started building CrewForge, I gave the bots what every agent framework gives you by default: a model, a system prompt, and a few function calls. They could talk well. They could not <em>do</em> much. The moment a task needed a file, a browser, or a command to run, the agent either pretended or asked me to do it.</p>

      <p>So I stopped treating an agent like a chat window and started treating it like a coworker. A coworker gets a desk and a laptop. In CrewForge, every bot gets its own computer.</p>

      <h2>What "its own computer" means</h2>
      <p>Each bot owns a dedicated Daytona cloud sandbox: a full Linux desktop with a browser, a terminal, and a file system. The agent drives it through eleven tools: shell commands, reading, writing and listing files, mouse clicks, moves and scrolls, keyboard input, and screenshots. A noVNC panel next to the chat lets you watch it work live.</p>
      <p>The bot's long-term memory lives on that machine too, as a plain <code>MEMORY.md</code> file. Because all of a bot's chats share the same sandbox, something you tell it in a private chat is still there when it shows up in a group chat.</p>

      <h2>The industry is converging on the same idea</h2>
      <p>This isn't just my hunch. In April 2026 OpenAI added native sandbox execution to its Agents SDK, so agents can run inside controlled environments with the files and tools they need. Sandboxes are quickly becoming a standard layer of the agent stack rather than a niche add-on.</p>

      <h2>Always available is not the same as always on</h2>
      <p>The naive version of "every agent has a computer" is expensive: machines idling 24/7 for bots nobody is talking to. CrewForge's sandboxes auto-stop after five quiet minutes and archive after a day. The next message wakes the machine automatically, with every file and memory intact. To the user the bot feels always-on; on the bill, idle bots cost close to nothing.</p>
      <p>A cron job meters every running sandbox each minute from the provider's own state, so usage limits are enforced on what actually ran, not on what the app thinks happened.</p>

      <h2>The agent loop has to be durable</h2>
      <p>Computer use is slow. A single reply might click, wait, screenshot, and type for minutes. That does not fit inside a web request. Every CrewForge reply runs as a durable Trigger.dev task with the Vercel AI SDK: streaming tokens to the UI, calling tools, stopping at a 30-step cap or when the user's token budget runs out, and surviving restarts instead of dying with the request.</p>

      <h2>What I'd tell anyone building agents now</h2>
      <ul>
        <li><strong>Give agents a real environment.</strong> Tools beat pretending, and a sandbox is the safest place for tools.</li>
        <li><strong>Isolate by default.</strong> My bots can't see each other's files or screens. Collaboration happens through conversation and explicit handoffs.</li>
        <li><strong>Make idle free.</strong> Stop and archive aggressively, and wake on demand.</li>
        <li><strong>Cap everything.</strong> Steps, tokens, handoffs. Autonomy without limits is just a bill.</li>
      </ul>

      <h2>Sources</h2>
      <ul>
        <li><a href="https://openai.com/index/the-next-evolution-of-the-agents-sdk/" target="_blank" rel="noopener noreferrer">OpenAI: The next evolution of the Agents SDK</a></li>
      </ul>
    `,
  },
  {
    slug: 'agents-can-attack-now',
    title: 'Agents can attack now. Build like it.',
    excerpt:
      'A US government report this week found AI agents carrying out cyberattacks with minimal human input. The same autonomy I build with is now on the other side, so here is how I design agent systems defensively.',
    date: 'Nov 2026',
    longDate: 'November 2026',
    readTime: '6 min read',
    category: 'Security',
    image: '/blog/agent-security.webp',
    content: `
      <p>This week the US Government Accountability Office reported that autonomous AI agents have begun carrying out cyberattacks with minimal human direction, and that officials have no agreed way to certify defensive AI tools yet. If you build agents, read that twice. The capabilities we celebrate in demos, planning, tool use and persistence, work just as well for an attacker.</p>

      <p>I build agents that run shell commands and control a desktop. That forces a security mindset from day one. Here's the checklist I actually use.</p>

      <h2>1. Assume the agent will be tricked</h2>
      <p>Prompt injection isn't a bug you patch once. Any web page, file, or email an agent reads can contain instructions. Design so that a fully compromised agent can still only do limited damage.</p>

      <h2>2. Sandbox everything that executes</h2>
      <p>In CrewForge every bot runs in its own isolated cloud sandbox. It can't see another bot's files, screen, or processes, and it never runs on the machine that serves the app. If something goes wrong, the blast radius is one disposable computer.</p>

      <h2>3. Keep credentials out of the model's reach</h2>
      <p>The model should never see a raw secret. Tools that need credentials should inject them on the server side at call time, scoped to the single action. Tool gateways that govern credentials and access for agent tool calls are becoming a product category for exactly this reason.</p>

      <h2>4. Put hard limits on autonomy</h2>
      <p>Every agent loop I ship has a step cap, a token budget, and loop prevention. In CrewForge a reply stops at 30 steps or when the budget runs out, and a task can only be handed between bots a capped number of times, never back to a bot that already held it. Limits turn a runaway agent into a stopped one.</p>

      <h2>5. Log like an auditor will read it</h2>
      <p>Record every tool call with its inputs and outputs, attributed to a user and a run. When something odd happens, you need the timeline, not a guess.</p>

      <h2>6. Keep a human on irreversible actions</h2>
      <p>Sending money, deleting data, emailing customers: these deserve an approval step. Human-in-the-loop isn't a weakness of an agent product; it's what makes people trust it with more.</p>

      <h2>The takeaway</h2>
      <p>Agents are now powerful enough to be dangerous in the wrong hands, which means they are powerful enough to need real engineering discipline in ours. Sandboxes, scoped credentials, limits, logs, and approvals aren't overhead. They're the product.</p>

      <h2>Sources</h2>
      <ul>
        <li><a href="https://washingtontimes.com/news/2026/nov/20/ai-agents-carrying-cyberattacks-minimal-human-input" target="_blank" rel="noopener noreferrer">The Washington Times: AI agents now carrying out cyberattacks with minimal human input</a></li>
      </ul>
    `,
  },
  {
    slug: 'mcp-grew-up',
    title: 'MCP grew up. What changes for agent builders',
    excerpt:
      'The Model Context Protocol went from a neat idea to the default way agents reach tools. With a new home at the Linux Foundation and a major spec revision this July, here is what I am changing in how I build.',
    date: 'Oct 2026',
    longDate: 'October 2026',
    readTime: '6 min read',
    category: 'AI Infrastructure',
    image: '/blog/mcp-stateless.webp',
    content: `
      <p>Two years ago, connecting an AI model to a tool meant writing bespoke glue for every model and every API. The Model Context Protocol (MCP) set out to be the USB-C port for AI: one standard way for any model to discover and call any tool. In 2026 it stopped being an experiment.</p>

      <h2>From a vendor project to shared infrastructure</h2>
      <p>Stewardship of MCP moved to the Linux Foundation's Agentic AI Foundation, and every major model provider now supports it. When a protocol has neutral governance and everyone on board, building on it stops being a bet.</p>

      <h2>The July 2026 revision</h2>
      <p>The spec revision dated 2026-07-28 is the biggest change since authorization landed: it pushes MCP toward being stateless at the protocol layer. For builders that's good news. Stateless servers are easier to scale horizontally, easier to put behind a load balancer, and easier to run on serverless platforms, which is exactly where most tool servers want to live.</p>

      <h2>MCP for tools, agent-to-agent for delegation</h2>
      <p>A pattern I'm seeing, and using, is splitting responsibilities: MCP for how an agent reaches tools and data, and agent-to-agent protocols for how agents hand work to each other. In CrewForge, handoffs between bots are their own protocol, with context notes, loop prevention and a capped transfer depth, because delegating to a peer is a different problem from calling a function.</p>

      <h2>The catch: security</h2>
      <p>Popularity attracts attackers. The list of security advisories that mention MCP keeps growing, and plenty of public servers ship with exploitable flaws. An MCP server is an API that a language model will call on behalf of whoever is prompting it. Treat it with at least the care you'd give a public REST endpoint.</p>

      <h2>What I'm doing differently</h2>
      <ul>
        <li><strong>Expose tools through MCP by default</strong> instead of one-off integrations, so any model can use them.</li>
        <li><strong>Design servers stateless-first,</strong> keeping session state in my own store rather than in the connection.</li>
        <li><strong>Scope every tool narrowly</strong> and validate inputs as if they came from an attacker, because sometimes they do.</li>
        <li><strong>Pin and review third-party servers</strong> like any other dependency.</li>
      </ul>

      <h2>Sources</h2>
      <ul>
        <li><a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol: official site and specification</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Model_Context_Protocol" target="_blank" rel="noopener noreferrer">Wikipedia: Model Context Protocol</a></li>
      </ul>
    `,
  },
  {
    slug: 'event-driven-telemetry',
    title: 'What tracking 70+ satellites taught me about event-driven systems',
    excerpt:
      'Satellite telemetry does not wait for your service to be ready. Lessons from leading DATS on message queues, backpressure, and designing for the pass you cannot miss.',
    date: 'Sep 2026',
    longDate: 'September 2026',
    readTime: '8 min read',
    category: 'Distributed Systems',
    image: '/blog/satellite-telemetry.webp',
    content: `
      <p>Most web systems get to choose their pace. If the database is slow, the request waits and the user retries. Satellite telemetry doesn't work that way. A satellite passes over a ground station for a few minutes, the data arrives at the rate the hardware sends it, and if you drop it, it's gone.</p>

      <p>Leading DATS, our ground-station telemetry platform at FalconX, means designing for that reality across 70+ satellites. These are the lessons that changed how I build any system. (The specifics of the platform are confidential; the principles aren't.)</p>

      <h2>1. Decouple the producer from everything else</h2>
      <p>The component closest to the radio should do one job: receive, frame, and hand off as fast as possible. Decoding, conversion, alarms, storage, dashboards all live downstream of a message broker. In DATS that backbone is RabbitMQ. If the dashboard stalls, ingestion doesn't notice.</p>

      <h2>2. Make backpressure explicit</h2>
      <p>Every queue is a promise about how much you can absorb. Decide what happens when it fills: buffer to disk, shed low-priority work, or scale consumers. "It never fills up" is not a strategy.</p>

      <h2>3. Separate the hot path from the archive</h2>
      <p>Operators need the latest values now; analysts need everything, eventually. Those are different consumers with different latency budgets. Splitting them means a slow archive write never delays a health alarm.</p>

      <h2>4. Push heavy compute to where it belongs</h2>
      <p>Signal processing like Reed–Solomon and Viterbi decoding belongs in native code, and bulk telemetry math belongs on the GPU. Keeping that work in dedicated services means the rest of the system can stay in languages that are fast to change.</p>

      <h2>5. Health is a first-class stream</h2>
      <p>Subsystem health isn't a log line; it's data. We publish it through the same event-driven layer as telemetry, so alerting and monitoring use the same reliable path as everything else.</p>

      <h2>6. Define contracts before code</h2>
      <p>With a team, the most valuable thing I did early was define service boundaries and API contracts for ingestion, monitoring, and archival. Clear contracts let four people build in parallel without stepping on each other, and they let us add ground-station subsystems later without a rewrite.</p>

      <h2>The general lesson</h2>
      <p>Design as if data will arrive whether you're ready or not, because in the real world it usually does. Queues, explicit backpressure, and clear contracts aren't space-industry luxuries; they're how any system stays calm under load.</p>
    `,
  },
  {
    slug: 'student-to-software-lead',
    title: 'From student to Software Lead: what actually mattered',
    excerpt:
      'Four years ago I wrote my first real program. This year I was made Software Lead before graduating. No shortcuts, just the few habits that compounded.',
    date: 'Jul 2026',
    longDate: 'July 2026',
    readTime: '6 min read',
    category: 'Career',
    image: '/blog/student-to-lead.webp',
    content: `
      <p>In December 2022 I started my B.Tech at MVJ College of Engineering and wrote my first real program. In June 2026, before I had even graduated, FalconX made me Software Lead for DATS, our satellite telemetry platform. People ask what the trick was. There wasn't one. There were a few habits I refused to break.</p>

      <h2>1. Build something every day</h2>
      <p>Not "study". Build. My public GitHub went from 36 contributions in 2023 to 724 in 2024. Most of those were small: a fix, a feature, a clone of an app I liked. Small things done daily beat big plans done never.</p>

      <h2>2. Fundamentals first, then volume</h2>
      <p>2023 was data structures and algorithms every day until 500+ problems were behind me, 400+ on LeetCode. It felt slow at the time. It's why I can reason about a queue backing up at 2 a.m. today.</p>

      <h2>3. Compete to find your edges</h2>
      <p>Hackathons were where I found out what I didn't know. 1st in Web Development out of 30+ teams, 1st at ML NOVA with a voice agent that had memory, 1st at Vertex 2.0, 3rd in an 8-hour national hackathon. Deadlines expose weak spots faster than any tutorial.</p>

      <h2>4. Take production work early</h2>
      <p>While still a student I joined RoborosX and designed the clinic backend behind SaveMe.life, now handling 2,000+ consultations a day. Real users teach you things side projects never will: on-call nerves, data you can't lose, performance that is someone's waiting time.</p>

      <h2>5. Earn trust, then ask for scope</h2>
      <p>At FalconX I started on a distributed system tracking space objects in real time. I didn't ask to lead. I shipped, owned problems end to end, and made the people around me faster. Leadership was offered because the work was already happening.</p>

      <h2>6. Teach what you learn</h2>
      <p>Mentoring 300+ students at the Software Development Club forced me to understand things properly. You can't explain what you only half know.</p>

      <h2>If you're in your second year right now</h2>
      <p>You don't need a perfect plan. You need a habit you keep on bad days. Pick something to build, ship it publicly, and do it again tomorrow. Four years goes faster than you think.</p>
    `,
  },
  {
    slug: 'saveme-45-percent-faster',
    title: 'How we made SaveMe.life 45% faster',
    excerpt:
      'A live clinic platform handling 2,000+ consultations a day was getting slow. What I changed in queries, routing and controllers, and why performance is a patient-facing feature.',
    date: 'Aug 2025',
    longDate: 'August 2025',
    readTime: '7 min read',
    category: 'Engineering',
    image: '/blog/saveme-scale.webp',
    content: `
      <p>When I joined RoborosX, I was handed the Clinic Management module for SaveMe.life v2: a live healthcare platform where slowness isn't just annoying. A sluggish booking flow means a patient gives up; a lagging dashboard means a doctor waits instead of consulting.</p>

      <h2>Measure before touching anything</h2>
      <p>The temptation is to guess. Instead I measured the slowest pages and endpoints first, and the work that followed went into three areas: database queries, routing, and controller logic.</p>

      <h2>1. Queries</h2>
      <p>The rules I worked by:</p>
      <ul>
        <li><strong>Watch for N+1 patterns</strong> and load related data up front instead of one row at a time.</li>
        <li><strong>Index for the queries you actually run,</strong> not the ones you imagine.</li>
        <li><strong>Select only what you render.</strong> Pulling whole records to show three fields wastes memory and time.</li>
      </ul>

      <h2>2. Routing</h2>
      <p>Every request pays for routing and middleware. Keeping routes clean and middleware scoped to the paths that need it trims overhead from every call.</p>

      <h2>3. Controllers</h2>
      <p>A controller should do the work its page needs and nothing else. Moving logic into focused services made requests lighter and the code easier to change.</p>

      <h2>The result</h2>
      <p>System load time dropped by 45% for daily active users, on a platform now handling 2,000+ consultations a day. Nothing exotic: careful measurement, then fixing the obvious things properly.</p>

      <h2>The lesson I kept</h2>
      <p>Performance isn't a technical metric; it's a user experience variable. In healthcare that variable is a person waiting. That mindset now shapes everything I build, from clinic software to satellite telemetry.</p>
    `,
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
