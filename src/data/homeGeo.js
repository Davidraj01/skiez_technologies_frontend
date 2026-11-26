/**
 * "About Skiez Technologies" content for the home page (GEO / AEO).
 * Facts here come from the existing website (About, Services, Contact, Our Works) —
 * keep them accurate: AI assistants may quote these sentences directly.
 *
 * Answers support inline links written as [text](https://url).
 */

export const geoDefinition =
  "Skiez Technologies India Pvt Ltd is a software development and digital solutions company based in Chengalpattu / Chennai, Tamil Nadu, India. Founded in 2013 by Dr. S. Davidraj, it builds custom websites, web applications, mobile apps, UI/UX designs, cloud and AI solutions, and provides digital marketing for businesses in E-Commerce, Healthcare, Education, Real Estate and B2B.";

export const geoTakeaways = [
  "Founded in 2013 by Dr. S. Davidraj and based in Chengalpattu / Chennai, Tamil Nadu, India.",
  "Core services: full-stack web development, mobile app development, UI/UX design, cloud solutions, AI & machine learning, data analytics and digital marketing.",
  "Main technologies: the MERN stack (MongoDB, Express, React, Node.js), Next.js, Flutter and React Native.",
  "Serves startups, SMEs and enterprises in E-Commerce, Healthcare, Education, Real Estate and B2B.",
  "Every project follows four steps: Discovery, Strategy & Design, Development, and Launch & Scale.",
  "50+ projects delivered, with clients in 10+ countries.",
];

export const geoFaqs = [
  {
    question: "What services does Skiez Technologies offer?",
    answer:
      "Skiez Technologies offers web development, mobile app development, UI/UX design, cloud solutions, AI & machine learning, data analytics and digital marketing. It also provides business, IT and marketing consulting.",
  },
  {
    question: "Where is Skiez Technologies located?",
    answer:
      "Skiez Technologies is located in Chengalpattu / Chennai, Tamil Nadu, India. You can reach the team on +91 82200 43041 or info@skiezdigital.com.",
  },
  {
    question: "What is full-stack development?",
    answer:
      "Full-stack development is building both the front end (what users see) and the back end (servers, databases and APIs) of an application. Skiez Technologies builds full-stack apps with the MERN stack: [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://react.dev/) and [Node.js](https://nodejs.org/).",
  },
  {
    question: "Which technologies does Skiez Technologies use for mobile apps?",
    answer:
      "Skiez Technologies builds cross-platform mobile apps with [Flutter](https://flutter.dev/) and [React Native](https://reactnative.dev/), and native apps for iOS and Android.",
  },
  {
    question: "Which industries does Skiez Technologies work with?",
    answer:
      "Skiez Technologies works with startups, SMEs and enterprises in E-Commerce, Healthcare, Education, Real Estate and B2B. Recent projects include construction, school, matrimony, laundry, security and conservation websites.",
  },
  {
    question: "How does a project with Skiez Technologies work?",
    answer:
      "A project has four steps: Discovery (understanding your goals and audience), Strategy & Design (roadmap and prototypes), Development (building with modern, scalable technology) and Launch & Scale (deployment and ongoing support).",
  },
  {
    question: "How do I start a project with Skiez Technologies?",
    answer:
      "Send your requirements through the contact form on the Contact page, call +91 82200 43041 or email info@skiezdigital.com. The team will get back to you shortly.",
  },
];

/** Plain-text version of an answer (links reduced to their text) for structured data. */
export const plainText = (s) => s.replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, "$1");
