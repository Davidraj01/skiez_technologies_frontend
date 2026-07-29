"use client";
import React from "react";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Design",
    description:
      "The design phase focuses on understanding the problem, the users, and the goals of the product. It involves user research, requirement analysis, wireframing, and creating intuitive UI/UX designs. This phase ensures the application is visually appealing, easy to use, accessible, and aligned with user expectations before moving into development.",
    content: (
      <img
        src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
        alt="Design phase"
        className="h-full w-full object-cover rounded-xl"
      />
    ),
  },
  {
    title: "Development",
    description:
      "During the development phase, the approved designs are transformed into a functional application using modern technologies and best coding practices. Developers build features, integrate APIs, manage databases, and ensure performance, security, and scalability. This phase is all about turning ideas into reliable, maintainable, and efficient software.",
    content: (
      <img
        src="https://media.istockphoto.com/id/2202071517/photo/computer-programming.jpg?s=612x612&w=0&k=20&c=axtPMj1s0KdXa7y9_s9ngcmFG3riDsVf4XOIFjT9CQQ="
        alt="Development phase"
        className="h-full w-full object-cover rounded-xl"
      />
    ),
  },
  {
    title: "Testing",
    description:
      "The testing phase ensures the application works correctly and meets quality standards. It includes unit testing, integration testing, system testing, and user acceptance testing. Bugs, performance issues, and edge cases are identified and resolved to guarantee a stable, secure, and smooth user experience before release.",
    content: (
      <img
        src="https://media.istockphoto.com/id/952729630/photo/test-pushing-keyboard-with-finger-3d-illustration.jpg?s=612x612&w=0&k=20&c=y6zIqQjHBkqN1LPQ8xXJD8qFLwWwRVanFLhhhppczNE="
        alt="Testing phase"
        className="h-full w-full object-cover rounded-xl"
      />
    ),
  },
  {
    title: "Deployment",
    description:
      "Deployment is the final phase where the application is released to production. This includes configuring servers, setting up CI/CD pipelines, deploying builds, and monitoring system performance. The goal is to ensure a smooth launch, minimal downtime, and continuous availability while supporting future updates and improvements.",
    content: (
      <img
        src="https://images.unsplash.com/photo-1667422380246-3bed910ffae1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwc2l0ZSUyMGRlcGxveW1lbnR8ZW58MHx8MHx8fDA%3D"
        alt="Deployment phase"
        className="h-full w-full object-cover rounded-xl"
      />
    ),
  },
];


export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
