// Portfolio Configuration - Customize everything from this single file
export const portfolioConfig = {
  // Personal Information
  personal: {
    name: "Aryan",
    title: "Full-Stack Developer & Cloud DevOps Engineer",
    tagline: "Hello, I'm Aryan, a full-stack developer and cloud DevOps engineer specializing in scalable digital solutions. I craft robust web applications and architect cloud infrastructure that powers modern businesses.",
    email: "aryandw2010@gmail.com",
    location: "India",
    avatar: "/src/assets/aegis.png"
  },

  // SEO & Meta
  seo: {
    title: "Aryan - Full-Stack Developer & Cloud DevOps Engineer",
    description: "Full-Stack Developer and Cloud DevOps Engineer creating scalable applications and cloud infrastructure. View my portfolio showcasing projects and technical expertise.",
    keywords: ["full-stack developer", "cloud devops", "react", "node.js", "python", "docker", "kubernetes", "aws", "terraform"],
    ogImage: "/og-image.png"
  },

  // Theme & Design - AMOLED Black + White Only
  theme: {
    primaryColor: "0 0% 100%", // White
    accentColor: "0 0% 100%", // White
    backgroundColor: "0 0% 0%", // AMOLED black
    terminalColors: {
      window: "0 0% 3%",
      border: "0 0% 12%",
      header: "0 0% 5%"
    },
    animations: {
      typingSpeed: 45,
      staggerDelay: 0.08,
      transitionDuration: 280,
      hoverScale: 1.04
    }
  },

  // Navigation
  navigation: {
    showScrollProgress: true,
    smoothScroll: true,
    sections: ["about", "skills", "projects", "contact"]
  },

  // Skills Configuration
  skills: [
    { name: "React", category: "Frontend", level: 95 },
    { name: "TypeScript", category: "Language", level: 92 },
    { name: "Node.js", category: "Backend", level: 88 },
    { name: "Python", category: "Language", level: 85 },
    { name: "Docker", category: "DevOps", level: 90 },
    { name: "AWS", category: "Cloud", level: 82 },
    { name: "Kubernetes", category: "DevOps", level: 78 },
    { name: "Terraform", category: "IaC", level: 75 }
  ],

  // Projects Configuration
  projects: [
    {
      name: "IndiCloud",
      year: "2025",
      description: "Cloud infrastructure platform providing scalable hosting, container orchestration, and automated deployment pipelines for modern applications.",
      tags: ["Docker", "Kubernetes", "Terraform", "AWS"],
      status: "production",
      featured: true,
      links: {
        github: "https://github.com/YUKIHANA-REALMS",
        live: "https://indicloud.xyz"
      }
    },
    {
      name: "DevOps Toolkit",
      year: "2025", 
      description: "A comprehensive suite of automation scripts, CI/CD pipelines, and infrastructure-as-code templates for streamlining development workflows.",
      tags: ["Python", "Bash", "GitHub Actions", "ArgoCD"],
      status: "production",
      featured: true,
      links: {
        github: "https://github.com/YUKIHANA-REALMS",
        live: "https://indicloud.xyz"
      }
    },
    {
      name: "CloudWatch Dashboard",
      year: "2025",
      description: "Real-time monitoring and analytics dashboard with custom metrics, alerting, and cost optimization insights for multi-cloud environments.",
      tags: ["React", "TypeScript", "Node.js", "Grafana"],
      status: "production",
      featured: true,
      links: {
        github: "https://github.com/YUKIHANA-REALMS",
        live: "https://indicloud.xyz"
      }
    },
    {
      name: "InfraProvisioner",
      year: "2025",
      description: "Automated infrastructure provisioning tool with declarative configuration, drift detection, and compliance guardrails.",
      tags: ["Go", "Terraform", "AWS", "Azure"],
      status: "coming soon",
      featured: false,
      links: {
        github: "https://github.com/YUKIHANA-REALMS",
        live: "https://indicloud.xyz"
      }
    },
    {
      name: "ContainerForge",
      year: "2025",
      description: "Container optimization platform that analyzes, builds, and hardens Docker images with security scanning and cost analysis.",
      tags: ["Python", "Docker", "Trivy", "Prometheus"],
      status: "coming soon",
      featured: false,
      links: {
        github: "https://github.com/YUKIHANA-REALMS",
        live: "https://indicloud.xyz"
      }
    }
  ],

  // Social Links
  social: {
    github: "https://github.com/YUKIHANA-REALMS",
    linkedin: "https://linkedin.com/in/aryan",
    twitter: "https://twitter.com/aryan",
    youtube: "",
    email: "mailto:aryandw2010@gmail.com"
  },

  // Content Sections
  content: {
    about: {
      title: "About Me",
      paragraphs: [
        "I am a full-stack developer and cloud DevOps engineer with deep expertise in building scalable web applications and architecting robust cloud infrastructure. I focus on delivering high-performance solutions that are secure, maintainable, and cost-efficient.",
        "From containerizing microservices to building CI/CD pipelines and managing multi-cloud deployments, I bridge the gap between development and operations. I am passionate about automation, infrastructure as code, and continuous improvement."
      ],
      availability: "Currently available for new projects"
    },
    contact: {
      title: "Get In Touch",
      description: "I am always interested in discussing new opportunities, cloud architecture challenges, and innovative projects. Feel free to reach out to explore how we can work together.",
      cta: "Thank you for visiting my portfolio!"
    }
  },

  // Feature Flags
  features: {
    particles: true,
    matrixRain: true,
    soundEffects: false,
    darkMode: true,
    analytics: false,
    showCodeButtons: false
  }
};
