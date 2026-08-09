export const siteConfig = {
  name: "Tahajib Munna",
  shortName: "Munna",
  title: "Full-Stack Web Developer",
  subtitle: "Building Modern Web Applications",
  bio: "Full-Stack Web Developer specializing in building modern, responsive, and scalable web applications. Passionate about creating clean user interfaces and robust backend systems using React, Next.js, TypeScript, Node.js, and modern web technologies.",
  location: "Bangladesh",
  email: "tahajibmunna@gmail.com",
  phone: "+880 1962-864801",
  socialLinks: {
    github: "https://github.com/devleet4305",
    linkedin: "https://www.linkedin.com/in/tahajib-munna-9a3986358/",
    whatsapp: "https://wa.me/8801962864801",
  },
  profileImage: "/profile.jpg",

  projects: [
    {
      _id: "project-1",
      title: "Property Rental & Booking Platform",
      category: "Full Stack",
      shortDescription: "A full-stack property rental and booking platform that allows users to explore properties, manage rental-related activities, and interact with a complete booking system.",
      detailedDescription: "Built with React, Next.js, Node.js, Express, and MongoDB. Features secure JWT authentication, user role management, interactive property search and filtering, real-time booking status, host property management dashboard, and responsive glassmorphic UI.",
      technologies: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "Tailwind CSS", "JWT"],
      liveLink: "https://client-wine-beta.vercel.app",
      githubClient: "https://github.com/RAYHAN-HEXA/Property-Rental-Booking-Platform",
      githubServer: "https://github.com/RAYHAN-HEXA/Property-Rental-Booking-Platform-server",
      coverImage: "/image/property rental.jpeg",
      featured: true,
      status: "completed" as const,
    },
    {
      _id: "project-2",
      title: "Pet Adoption Platform",
      category: "Full Stack",
      shortDescription: "A modern pet adoption platform designed to help users explore available pets and manage the adoption process through an organized web interface.",
      detailedDescription: "A full-stack pet adoption platform providing users with a seamless experience to browse and adopt pets. Built using React, Next.js, Node.js, Express, and MongoDB. Includes pet catalog with filters, detailed pet profiles, adoption management system, user authentication, and responsive dashboard.",
      technologies: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
      liveLink: "https://client-five-ivory-99.vercel.app/",
      githubClient: "https://github.com/RAYHAN-HEXA/pet-adopt-client",
      githubServer: "https://github.com/RAYHAN-HEXA/Pet-Adopt-Shop-Server",
      coverImage: "/image/pet adoption.jpeg",
      featured: true,
      status: "completed" as const,
    },
    {
      _id: "project-3",
      title: "Summer Cart Shop",
      category: "Full Stack",
      shortDescription: "A modern e-commerce shopping platform designed to provide users with a clean and convenient online shopping experience.",
      detailedDescription: "Summer Cart Shop is a modern e-commerce platform providing users with a seamless shopping experience. Built with React, Next.js, Node.js, Express, and MongoDB. Features product catalog with category filters, shopping cart functionality, secure checkout process, order management, and responsive design.",
      technologies: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
      liveLink: "https://summer-cart-essential-store.vercel.app/",
      githubClient: "https://github.com/RAYHAN-HEXA/Summer-Cart-Shop",
      githubServer: "",
      coverImage: "/image/summercart.jpeg",
      featured: true,
      status: "completed" as const,
    },
  ],

  sampleBlogs: [
    {
      _id: "blog-1",
      title: "Mastering Next.js App Router & React 19 for Production",
      slug: "mastering-nextjs-app-router-react-19",
      summary: "A practical guide for developers on building fast, SEO-friendly full-stack web applications using the Next.js App Router architecture and server components.",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      tags: ["Next.js", "React", "Frontend"],
      createdAt: "2026-02-15T00:00:00.000Z",
      content: `### Building Modern Applications with Next.js

The Next.js App Router provides a powerful paradigm for building web applications with Server Components, dynamic routing, and optimized layout trees.

#### Key Takeaways:
- **Server Components**: Render heavy components on the server to reduce JavaScript bundle sizes.
- **API Routes**: Create robust backend micro-endpoints within the same codebase.
- **SEO Optimization**: Seamlessly configure dynamic metadata and OpenGraph social previews.

Understanding these concepts helps bridge the gap between client-side interfaces and server architecture.`,
    },
    {
      _id: "blog-2",
      title: "Designing Scalable REST APIs with Express.js & MongoDB",
      slug: "designing-scalable-rest-apis-express-mongodb",
      summary: "Learn best practices for structuring MERN stack backends, implementing JWT authentication, Mongoose schemas, and clean controller patterns.",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      tags: ["Node.js", "Express", "MongoDB", "Backend"],
      createdAt: "2026-01-28T00:00:00.000Z",
      content: `### Architectural Best Practices for MERN Backends

When developing backend API services for production web apps, maintainability and security are critical.

#### Crucial Considerations:
1. **Mongoose Schema Validation**: Enforce strict data types and validation rules at the model layer.
2. **Stateless JWT Auth**: Use HTTP-only cookies or bearer tokens for secure user sessions.
3. **Centralized Error Handling**: Implement middleware to capture and log uncaught exceptions cleanly.`,
    },
    {
      _id: "blog-3",
      title: "Why TypeScript Elevates your Frontend Development Workflow",
      slug: "why-typescript-elevates-frontend-development",
      summary: "Discover how strict type safety, auto-completion, and refactoring tools help prevent runtime bugs and improve code quality.",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
      tags: ["TypeScript", "JavaScript", "Developer Journey"],
      createdAt: "2026-01-10T00:00:00.000Z",
      content: `### Transitioning from JavaScript to TypeScript

Adopting TypeScript early in a developer's career instills strong habits regarding data structure design and defensive programming.

#### Benefits:
- Compile-time error catching
- Explicit prop interfaces for React components
- Enhanced IDE intellisense and quick refactoring`,
    },
  ],
};
