export const initialQueries = [
  {
    id: "q-101",
    authorName: "Karthik Subramanian",
    authorEmail: "karthik.s@fintechventures.in",
    category: "Web & SaaS Architecture",
    subject: "Tech stack recommendation for high-traffic trading analytics dashboard",
    question: "We are developing a real-time financial market analytics portal requiring sub-100ms websocket price updates and dynamic charting for over 15,000 concurrent users. Would you recommend React with Next.js or a standalone Vite SPA backed by Node.js microservices? How does DigiWorld handle caching and websocket scaling?",
    priority: "high",
    status: "answered",
    createdAt: "2026-09-28T14:32:00.000Z",
    upvotes: 24,
    isPublic: true,
    adminReply: {
      repliedBy: "Dinesh (Technical Lead)",
      repliedAt: "2026-09-28T15:10:00.000Z",
      message: "Hi Karthik! For ultra-low latency websocket dashboards with 15k+ concurrent connections, we recommend a lightweight React + Vite SPA coupled with a decoupled Node.js / Go websocket gateway and Redis Pub/Sub cluster. Next.js SSR adds overhead for purely dynamic live data screens, so client-side rendering with Canvas/WebGL charting (like Lightweight Charts or ECharts) avoids DOM lag. We can also set up Cloudflare Enterprise Edge caching for static bundles and AWS ElastiCache for lightning-fast memory reads. Let's schedule a 20-min technical architecture session!",
      isOfficial: true
    }
  },
  {
    id: "q-102",
    authorName: "Ananya Deshmukh",
    authorEmail: "ananya@healthtechsolutions.com",
    category: "Mobile App Development",
    subject: "HIPAA-compliant cross-platform mobile app timeline & cost",
    question: "We need a telemedicine mobile app for patients and doctors with secure video calling, encrypted prescription uploads, and appointment scheduling. Can this be built in Flutter to keep costs viable while maintaining strict compliance?",
    priority: "medium",
    status: "answered",
    createdAt: "2026-09-27T09:15:00.000Z",
    upvotes: 18,
    isPublic: true,
    adminReply: {
      repliedBy: "Sakthivel (Business Head)",
      repliedAt: "2026-09-27T10:00:00.000Z",
      message: "Hello Ananya! Absolutely. Flutter is exceptionally suited for healthcare apps because it compiles to native ARM code with zero JS bridge vulnerabilities. We implement end-to-end AES-256 encryption for all data-at-rest and TLS 1.3 in-transit, along with WebRTC for peer-to-peer secure video calls and AWS HIPAA-eligible S3 vaults for prescriptions. A complete MVP can be delivered in 4 to 6 weeks. Our package includes full source code handover and App Store/Play Store compliance clearance.",
      isOfficial: true
    }
  },
  {
    id: "q-103",
    authorName: "Vikram Malhotra",
    authorEmail: "v.malhotra@zenithexports.com",
    category: "International SEO & Google Ads",
    subject: "Ranking B2B industrial keywords in USA and European markets",
    question: "We noticed your case study on Prfect Caststeel achieving #1 Google rankings in the UK, USA, Poland, and Egypt for specialized valve keywords. We manufacture industrial heat exchangers. How quickly can we realistically see top 3 rankings on Google.com (US) for competitive terms?",
    priority: "high",
    status: "answered",
    createdAt: "2026-09-26T18:45:00.000Z",
    upvotes: 31,
    isPublic: true,
    adminReply: {
      repliedBy: "Sakthivel (Business Head)",
      repliedAt: "2026-09-26T19:30:00.000Z",
      message: "Hi Vikram! For B2B industrial manufacturing, international SEO works faster than consumer queries because search volumes are laser-focused and intent is high. Through our multi-region hreflang architecture, geo-targeted schema markup, and technical domain authority building, our clients typically see initial first-page movements within 30 to 45 days, and top 3 rankings within 90 days. We can provide a complimentary keyword gap analysis for your heat exchanger product line today.",
      isOfficial: true
    }
  },
  {
    id: "q-104",
    authorName: "Rajeev Nambiar",
    authorEmail: "rajeev@nambiarlogistics.co",
    category: "Enterprise Software & ERP",
    subject: "Custom fleet management and automated billing software",
    question: "We operate 200+ logistics trucks across South India. We want to replace our fragmented Excel and manual spreadsheets with a custom cloud ERP for driver dispatch, fuel tracking, and automated GST billing. Can this be integrated with GPS devices?",
    priority: "medium",
    status: "under_review",
    createdAt: "2026-09-29T08:20:00.000Z",
    upvotes: 12,
    isPublic: true,
    adminReply: {
      repliedBy: "Dinesh (Technical Lead)",
      repliedAt: "2026-09-29T09:40:00.000Z",
      message: "Hi Rajeev! Yes, we have specialized experience integrating IoT and OBD-II / GPS hardware protocols (Teltonika, Concox) into real-time ERP backends. We can build custom geofencing, automated driver settlement, trip mileage verification, and one-click GST e-invoicing. Our technical team is preparing a tailored modular breakdown for your review.",
      isOfficial: true
    }
  },
  {
    id: "q-105",
    authorName: "Divya Ramesh",
    authorEmail: "divya.r@ecoliving.store",
    category: "Pricing & Quotation",
    subject: "Cost for migrating WordPress/WooCommerce store to headless React eCommerce",
    question: "Our current WooCommerce store is suffering from slow page load speeds (4.5s) on mobile, affecting our checkout conversion rate. What is the approximate budget and delivery timeline to rebuild the frontend in React + Tailwind while keeping our existing product catalog?",
    priority: "low",
    status: "pending",
    createdAt: "2026-09-29T10:45:00.000Z",
    upvotes: 9,
    isPublic: true,
    adminReply: null
  }
];
