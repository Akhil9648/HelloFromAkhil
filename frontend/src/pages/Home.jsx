import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Loader from "../components/Loader";

// Coding profiles configuration
const codingProfilesConfig = [
  {
    platform: "LeetCode",
    username: "akhilpandey494",
    color: "#FFA116",
    icon: "LC",
    profileUrl: "https://leetcode.com/akhilpandey494/",
  },
  {
    platform: "GeeksforGeeks",
    username: "akhilpandey___",
    color: "#2F8D46",
    icon: "GFG",
    profileUrl: "https://auth.geeksforgeeks.org/user/akhilpandey___/",
  },
  {
    platform: "Codeforces",
    username: "dev_akhil_18",
    color: "#1F8ACB",
    icon: "CF",
    profileUrl: "https://codeforces.com/profile/dev_akhil_18",
  },
];

const achievements = [
  {
    icon: "🏆",
    title: "Solved 1000+ DSA Problems",
    description:
      "Across LeetCode, GFG, and Codeforces with strong consistency & problem-solving depth.",
    link: "https://leetcode.com/akhilpandey494/",
  },
  {
    icon: "💼",
    title: "Built 3 Full-Stack Projects",
    description:
      "Real-world MERN applications with authentication, dashboards, payments & advanced UI/UX.",
    link: "#",
  },
  {
    icon: "🔥",
    title: "Machine Learning",
    description:
      "Got a Certification in Machine Learning from Stanford Online Via Coursera.",
    link:
      "https://www.coursera.org/account/accomplishments/specialization/AGU7UYAXNNQK",
  },
  {
    icon: "🚀",
    title: "Oracle Certificate",
    description:
      "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate.",
    link:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=2C3139F7C75F0C64DEB41AFA2969FC31D4D4161AB3C82323AC1E6205F0ECEB36",
  },
  {
    icon: "©️",
    title: "Research Publication",
    description:
      "Proactive Cybersecurity in the Digital Age: The Role of Big Data Analytics.",
    link: "https://scfa.reapress.com/journal/article/view/55",
  },
  {
    icon: "💌",
    title: "Postman Certified",
    description: "Postman API Fundamentals Student Expert certification.",
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [profiles, setProfiles] = useState([]);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Cursor + Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll, .line-reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [profilesLoading, profiles]);

  // Coding Profiles API fetch
  useEffect(() => {
    async function fetchAllProfiles() {
      setProfilesLoading(true);
      const results = await Promise.all(
        codingProfilesConfig.map(async (profile) => {
          let details = {};
          try {
            if (profile.platform === "LeetCode") {
              const response = await fetch(
                `https://leetcode-stats-api.herokuapp.com/${profile.username}`
              );
              const data = await response.json();
              details = {
                solved: data.totalSolved ?? "N/A",
                easy: data.easySolved ?? "N/A",
                medium: data.mediumSolved ?? "N/A",
                hard: data.hardSolved ?? "N/A",
                rank: data.ranking ?? "N/A",
                rating: "1650+",
              };
            } else if (profile.platform === "GeeksforGeeks") {
              details = {
                solved: "500+",
                rank: "<50",
                rating: "NA",
              };
            } else if (profile.platform === "Codeforces") {
              const response = await fetch(
                `https://codeforces.com/api/user.info?handles=${profile.username}`
              );
              const data = await response.json();
              const info = data.status === "OK" && data.result[0];
              details = {
                solved: "100+",
                rank: info?.rank || "N/A",
                rating: info?.rating || "N/A",
              };
            }
          } catch (err) {
            details = { solved: "N/A", rank: "N/A", rating: "N/A" };
          }
          return { ...profile, ...details };
        })
      );
      setProfiles(results);
      setProfilesLoading(false);
    }
    fetchAllProfiles();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const handleClick = (url) => window.open(url, "_self");

  const projects = [
    {
      title: "WorkFlow",
      description: "A platform to manage teams and the work assigned to them.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image:
        "https://images.stockcake.com/public/8/f/2/8f232cdb-1ba5-42aa-be75-f9fbb33c2f6c_large/corporate-team-meeting-stockcake.jpg",
      link: "https://workfloww-frontend.vercel.app/",
    },
    {
      title: "Zomato with Reels",
      description: "A food delivery platform with Reels.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image:
        "https://blinkx.in/stories/zomato-shares-reach-new-high-as-company-launches-group-ordering-feature/assets/2.jpeg",
      link: "https://zomato-with-reels.vercel.app/user/login",
    },
    {
      title: "Portfolio Dashboard",
      description:
        "Analytics dashboard for tracking portfolio performance with interactive charts.",
      tech: ["Vue.js", "D3.js", "Firebase", "TailwindCSS"],
      image:
        "https://media.istockphoto.com/id/1309878877/photo/business-people-meeting-to-discuss-strategy-and-plan-for-business-and-investment.jpg?s=612x612&w=0&k=20&c=ofs0xOOKqMXSlVWjZS8o0XAmg4_Md5p39owY5dLGQWA=",
      link: "#",
    },
    {
      title: "Bangluru House Price Predictor",
      description:
        "A machine learning model to predict house prices in Bangluru.",
      tech: ["Python", "Scikit-learn", "Pandas", "Flask"],
      image:
        "https://www.quantumrealty.co.in/wp-content/uploads/2019/06/Alta-vista.jpg",
      link: "https://housepriceprediction-iejn7ecsyfmzx6p6ejzc8v.streamlit.app/",
    },
    {
      title: "Whatsapp Chat Analyzer",
      description:
        "A machine learning model to analyze whatsapp chat data.",
      tech: ["Python", "Numpy", "Pandas", "Matplotlib", "Seaborn", "Streamlit","Sklearn"],
      image:
        "https://www.shutterstock.com/shutterstock/photos/1774750085/display_1500/stock-vector-analysis-report-message-chat-icon-vector-1774750085.jpg",
      link: "https://whatsappchatanalyzer-3nb3uvgvmmrgdt5ser7vaz.streamlit.app/",
    }
  ];

  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "UI/UX Design", level: 75 },
    { name: "MongoDB", level: 85 },
  ];

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100%",
      maxWidth: "100%",
      margin: "0",
      background: "#0a0a0a",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    },

    cursor: {
      position: "fixed",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      border: "2px solid #00ffff",
      pointerEvents: "none",
      left: mousePosition.x - 10,
      top: mousePosition.y - 10,
      transition: "all 0.1s ease",
      zIndex: 9999,
      mixBlendMode: "difference",
    },

    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 1000,
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      transition: "all 0.3s ease",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
    },

    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #00ffff, #00ff88)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    navLinks: {
      display: "flex",
      gap: "2rem",
      alignItems: "center",
    },

    navLink: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "0.95rem",
      cursor: "pointer",
      position: "relative",
      padding: "0.5rem 0",
    },

    mobileMenuBtn: {
      display: "none",
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      padding: "0.5rem",
    },

    mobileMenu: {
      position: "fixed",
      top: 0,
      right: isMenuOpen ? 0 : "-100%",
      width: "80%",
      maxWidth: "300px",
      height: "100vh",
      background: "rgba(10,10,10,0.98)",
      backdropFilter: "blur(10px)",
      zIndex: 2000,
      transition: "right 0.3s ease",
      padding: "2rem",
      borderLeft: "1px solid rgba(255,255,255,0.1)",
    },

    mobileNavLink: {
      display: "block",
      padding: "1rem 0",
      color: "white",
      fontSize: "1.2rem",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      cursor: "pointer",
    },

    hero: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      padding: "2rem",
      overflow: "hidden",
      zIndex: 1,
    },

    heroContent: {
      textAlign: "center",
      zIndex: 2,
      maxWidth: "900px",
    },

    heroTitle: {
      fontSize: "clamp(2.5rem, 8vw, 5rem)",
      fontWeight: "bold",
      marginBottom: "1rem",
      lineHeight: 1.2,
    },

    gradient: {
      background: "linear-gradient(135deg, #00ffff, #00ff88, #0088ff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: "gradientMove 3s ease infinite",
      backgroundSize: "200% 200%",
    },

    heroSubtitle: {
      fontSize: "clamp(1rem, 2vw, 1.5rem)",
      color: "#888",
      marginBottom: "2rem",
      lineHeight: 1.6,
    },

    ctaButton: {
      padding: "1rem 2.5rem",
      fontSize: "1.1rem",
      background: "linear-gradient(135deg, #00ffff, #00ff88)",
      border: "none",
      borderRadius: "50px",
      color: "#000",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.3s, box-shadow 0.3s",
      marginRight: "1rem",
      marginBottom: "1rem",
    },

    section: {
      minHeight: "100vh",
      padding: "6rem 2rem",
      position: "relative",
      zIndex: 1,
    },

    sectionTitle: {
      fontSize: "clamp(2rem, 5vw, 3.5rem)",
      fontWeight: "bold",
      marginBottom: "3rem",
      textAlign: "center",
    },

    projectsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },

    projectCard: {
      background: "rgba(255,255,255,0.03)",
      borderRadius: "20px",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.1)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
    },

    projectImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      transition: "transform 0.3s",
    },

    projectContent: {
      padding: "1.5rem",
    },

    projectTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },

    projectDescription: {
      color: "#888",
      marginBottom: "1rem",
      lineHeight: 1.6,
    },

    techTags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginBottom: "1rem",
    },

    techTag: {
      padding: "0.25rem 0.75rem",
      background: "rgba(0,255,255,0.1)",
      border: "1px solid rgba(0,255,255,0.3)",
      borderRadius: "20px",
      fontSize: "0.85rem",
      color: "#00ffff",
    },

    skillsContainer: {
      maxWidth: "800px",
      margin: "0 auto",
    },

    skillItem: {
      marginBottom: "2rem",
    },

    skillName: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.5rem",
      fontSize: "1.1rem",
    },

    skillBar: {
      height: "10px",
      background: "rgba(255,255,255,0.1)",
      borderRadius: "10px",
      overflow: "hidden",
    },

    skillProgress: {
      height: "100%",
      background: "linear-gradient(90deg, #00ffff, #00ff88)",
      borderRadius: "10px",
      transition: "width 1s ease",
    },

    contactContainer: {
      maxWidth: "600px",
      margin: "0 auto",
      textAlign: "center",
    },

    contactLinks: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      marginTop: "3rem",
    },

    socialIcon: {
      width: "60px",
      height: "60px",
      background: "rgba(255,255,255,0.05)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid rgba(255,255,255,0.1)",
      cursor: "pointer",
      transition: "all 0.3s",
    },
  };

  // Background "C" elements
  const bgChars = [
    { id: 1, top: "12%", left: "8%", size: "3.5rem", opacity: 0.04, rotate: -20 },
    { id: 2, top: "30%", left: "75%", size: "4.2rem", opacity: 0.05, rotate: 15 },
    { id: 3, top: "60%", left: "18%", size: "3.8rem", opacity: 0.04, rotate: 10 },
    { id: 4, top: "75%", left: "60%", size: "4.5rem", opacity: 0.05, rotate: -15 },
    { id: 5, top: "40%", left: "45%", size: "3.2rem", opacity: 0.035, rotate: 25 },
  ];

  // Platform icon URLs
  const platformIconUrls = {
    LeetCode:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
    GeeksforGeeks:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg",
    Codeforces:
      "https://sta.codeforces.com/s/59570/images/codeforces-logo-with-telegram.png",
  };

  // Loader gating
  if (loading) return <Loader />;

  return (
    <>
      <style>{`
        @keyframes gradientMove {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,255,255,0.2);
        }
        .project-card:hover img {
          transform: scale(1.1);
        }
        .nav-link:hover { color:#00ffff; }
        .nav-link::after {
          content:'';
          position:absolute;
          bottom:0;
          left:0;
          width:0;
          height:2px;
          background:linear-gradient(90deg,#00ffff,#00ff88);
          transition:width 0.3s;
        }
        .nav-link:hover::after { width:100%; }
        .cta-btn:hover {
          transform:translateY(-3px);
          box-shadow:0 10px 30px rgba(0,255,255,0.4);
        }
        .social-icon:hover {
          background:rgba(0,255,255,0.1);
          border-color:#00ffff;
          transform:translateY(-5px);
        }
        @media (max-width: 768px) {
          .nav-links { display:none; }
          .mobile-menu-btn { display:block; }
        }
        .chevron { animation:float 2s ease-in-out infinite; }

        /* Scroll reveal */
        .reveal-on-scroll {
          opacity:0;
          transform:translateY(20px);
          transition:opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal-on-scroll.visible {
          opacity:1;
          transform:translateY(0);
        }

        /* Coding profile card tilt */
        .cp-card {
          transform-style:preserve-3d;
          transition:transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cp-card:hover {
          transform:perspective(800px) rotateX(-4deg) rotateY(4deg) translateY(-6px);
          box-shadow:0 18px 40px rgba(0,255,255,0.25);
        }

        /* Achievements hover */
        .achievement-card:hover {
          transform:translateY(-6px);
          box-shadow:0 18px 40px rgba(0,255,255,0.18);
        }

        /* Skeleton loading for coding profiles */
        .skeleton-card {
          position:relative;
          overflow:hidden;
          background:rgba(255,255,255,0.03);
          border-radius:18px;
          padding:1.5rem;
          border:1px solid rgba(255,255,255,0.05);
        }
        .skeleton-avatar {
          width:48px;
          height:48px;
          border-radius:50%;
          background:rgba(255,255,255,0.06);
          margin:0 auto 1rem;
        }
        .skeleton-line {
          height:12px;
          background:rgba(255,255,255,0.06);
          border-radius:999px;
          margin-bottom:0.5rem;
        }
        .skeleton-line.short {
          width:40%;
          margin:0.4rem auto;
        }
        .skeleton-line.medium {
          width:60%;
          margin:0.4rem auto;
        }
        .skeleton-line.long {
          width:80%;
          margin:0.4rem auto;
        }
        .skeleton-shimmer {
          position:absolute;
          top:0;
          left:-150%;
          width:50%;
          height:100%;
          background:linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.12),
            transparent
          );
          animation:shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0% { left:-150%; }
          100% { left:150%; }
        }

        /* Global 'C' background effect */
        .bg-char {
          position:fixed;
          font-weight:700;
          font-family:system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color:#00ffff;
          mix-blend-mode:screen;
          pointer-events:none;
          filter:blur(0.5px);
          transition:transform 0.15s ease-out;
        }
          .line-reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }

          .line-reveal.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .line-reveal:nth-child(1) { transition-delay: 0.1s; }
          .line-reveal:nth-child(2) { transition-delay: 0.3s; }
          .line-reveal:nth-child(3) { transition-delay: 0.5s; }
          .line-reveal:nth-child(4) { transition-delay: 0.7s; }

      `}</style>

      <div style={styles.container}>
        {/* Custom cursor (unchanged) */}
        <div style={styles.cursor}></div>

        {/* Global background C elements */}
        {bgChars.map((c) => {
          let dx = 0;
          let dy = 0;
          if (typeof window !== "undefined") {
            dx = ((mousePosition.x - window.innerWidth / 2) * 0.015);
            dy = ((mousePosition.y - window.innerHeight / 2) * 0.015);
          }
          return (
            <div
              key={c.id}
              className="bg-char"
              style={{
                top: c.top,
                left: c.left,
                fontSize: c.size,
                opacity: c.opacity,
                transform: `translate3d(${dx}px, ${dy}px, 0) rotate(${c.rotate}deg)`,
              }}
            >
              C
            </div>
          );
        })}

        {/* Navbar */}
        <nav style={styles.navbar}>
          <div style={styles.logo}>{"<Akhil Pandey/>"}</div>
          <div className="nav-links" style={styles.navLinks}>
            {["home", "projects", "skills", "codingprofiles", "contact"].map(
              (section) => (
                <span
                  key={section}
                  className="nav-link"
                  style={styles.navLink}
                  onClick={() => scrollToSection(section)}
                >
                  {section
                    .charAt(0)
                    .toUpperCase() +
                    section
                      .slice(1)
                      .replace("profiles", " Profiles")}
                </span>
              )
            )}
          </div>
          <button
            className="mobile-menu-btn"
            style={styles.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div style={styles.mobileMenu}>
          {["home", "projects", "skills", "codingprofiles", "contact"].map(
            (section) => (
              <span
                key={section}
                style={styles.mobileNavLink}
                onClick={() => scrollToSection(section)}
              >
                {section
                  .charAt(0)
                  .toUpperCase() +
                  section
                    .slice(1)
                    .replace("profiles", " Profiles")}
              </span>
            )
          )}
        </div>

        {/* Hero */}
        <section id="home" style={styles.hero}>
          <div style={styles.heroContent} className="reveal-on-scroll">
            <h1 style={styles.heroTitle}>
              Hi, I'm <span style={styles.gradient}>Akhil</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Full-Stack Engineer crafting scalable, user-driven digital experiences.
            </p>
            <button
              className="cta-btn"
              style={styles.ctaButton}
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </button>
            <button
              className="cta-btn"
              style={{
                ...styles.ctaButton,
                background: "transparent",
                border: "2px solid #00ffff",
                color: "#00ffff",
              }}
              onClick={() =>
                handleClick(
                  "https://drive.google.com/file/d/1pXCqZvq_XJ3oo90lTf2KC-ucGRYzSGp_/view"
                )
              }
              >
              Download Resume
            </button>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            >
            <ChevronDown
              className="chevron"
              size={40}
              color="#00ffff"
              style={{ opacity: 0.6 }}
              />
          </div>
            </section>
        <section id="about" style={styles.section}>
          <h2 style={styles.sectionTitle}>
            About <span style={styles.gradient}>Me</span>
          </h2>

          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              fontSize: "1.2rem",
              lineHeight: "1.8",
              color: "#ccc",
              textAlign: "center",
            }}
          >
            <p className="line-reveal">
              I’m a passionate <span style={{ color: "#00ffff" }}>Full-Stack Developer</span> who loves
              building scalable systems, intuitive interfaces, and products that people enjoy using.
            </p>

            <p className="line-reveal">
              I specialise in transforming complex problems into simple, elegant engineering solutions
              across frontend and backend environments.
            </p>

            <p className="line-reveal">
              My strengths include strong problem-solving, fast learning ability, deep focus, and a drive
              to craft clean, maintainable systems that scale confidently.
            </p>

            <p className="line-reveal">
              As an engineer, my mission is to build meaningful digital experiences and continuously move
              toward technical excellence with every project I take on.
            </p>
          </div>
        </section>


        {/* Projects */}
        <section id="projects" style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Featured <span style={styles.gradient}>Projects</span>
          </h2>
          <div style={styles.projectsGrid}>
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card reveal-on-scroll"
                style={styles.projectCard}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={styles.projectImage}
                />
                <div style={styles.projectContent}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  <p style={styles.projectDescription}>
                    {project.description}
                  </p>
                  <div style={styles.techTags}>
                    {project.tech.map((tech, i) => (
                      <span key={i} style={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    className="cta-btn"
                    style={{
                      ...styles.ctaButton,
                      padding: "0.5rem 1.5rem",
                      fontSize: "0.9rem",
                    }}
                    onClick={() => handleClick(project.link)}
                  >
                    View Project{" "}
                    <ExternalLink
                      size={16}
                      style={{ display: "inline", marginLeft: "0.5rem" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coding Profiles */}
        <section id="codingprofiles" style={styles.section}>
          <h2 style={styles.sectionTitle}>
            My <span style={styles.gradient}>Coding Profiles</span>
          </h2>
          {profilesLoading ? (
            <div
              style={{
                maxWidth: "900px",
                margin: "0 auto",
                display: "grid",
                gap: "2rem",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              }}
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-avatar" />
                  <div className="skeleton-line long" />
                  <div className="skeleton-line medium" />
                  <div className="skeleton-line short" />
                  <div className="skeleton-line medium" />
                  <div className="skeleton-shimmer" />
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                maxWidth: "900px",
                margin: "0 auto",
                display: "grid",
                gap: "2rem",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              }}
            >
              {profiles.map((profile, idx) => (
                <div
                  key={idx}
                  className="cp-card reveal-on-scroll"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "18px",
                    padding: "1.5rem",
                    textAlign: "center",
                    border: `2px solid ${profile.color}`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "0.8rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={platformIconUrls[profile.platform]}
                      alt={profile.platform}
                      style={{ height: "40px", objectFit: "contain" }}
                    />
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {profile.platform}
                  </div>
                  <div
                    style={{
                      color: "#aaa",
                      marginBottom: "1rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    @{profile.username}
                  </div>
                  <div style={{ marginBottom: "0.4rem" }}>
                    Solved: <b>{profile.solved}</b>
                  </div>
                  <div style={{ marginBottom: "0.4rem" }}>
                    Rank: {profile.rank}
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    Rating: {profile.rating}
                  </div>
                  <button
                    onClick={() => handleClick(profile.profileUrl)}
                    style={{
                      padding: "0.6rem 1.4rem",
                      background: profile.color,
                      border: "none",
                      borderRadius: "30px",
                      color: "#000",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "0.3s",
                    }}
                  >
                    Visit Profile{" "}
                    <ExternalLink
                      size={14}
                      style={{ marginLeft: "6px", display: "inline-block" }}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Achievements */}
        <section id="achievements" style={styles.section}>
          <h2 style={styles.sectionTitle}>
            My <span style={styles.gradient}>Achievements</span>
          </h2>
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              display: "grid",
              gap: "2rem",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            }}
          >
            {achievements.map((ach, index) => (
              <div
                key={index}
                className="achievement-card reveal-on-scroll"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  padding: "1.5rem",
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
              >
                <div
                  style={{
                    fontSize: "2.2rem",
                    marginBottom: "1rem",
                    color: "#00ffff",
                  }}
                >
                  {ach.icon}
                </div>
                <h3
                  style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}
                >
                  {ach.title}
                </h3>
                <p style={{ color: "#888", lineHeight: 1.6 }}>
                  {ach.description}
                </p>
                {ach.link && (
                  <button
                    style={{
                      marginTop: "1rem",
                      padding: "0.6rem 1.5rem",
                      background: "transparent",
                      border: "2px solid #00ffff",
                      borderRadius: "30px",
                      color: "#00ffff",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      transition: "0.3s",
                    }}
                    onClick={() => window.open(ach.link, "_blank")}
                  >
                    View
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" style={styles.section}>
          <h2 style={styles.sectionTitle}>
            My <span style={styles.gradient}>Skills</span>
          </h2>
          <div style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <div
                key={index}
                style={styles.skillItem}
                className="reveal-on-scroll"
              >
                <div style={styles.skillName}>
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div style={styles.skillBar}>
                  <div
                    style={{
                      ...styles.skillProgress,
                      width: `${skill.level}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Get In <span style={styles.gradient}>Touch</span>
          </h2>
          <div style={styles.contactContainer}>
            <div style={styles.contactLinks}>
              <div
                className="social-icon"
                style={styles.socialIcon}
                onClick={() =>
                  window.open("https://github.com/akhil9648", "_self")
                }
              >
                <Github size={28} />
              </div>
              <div
                className="social-icon"
                style={styles.socialIcon}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/akhilpandey9/",
                    "_self"
                  )
                }
              >
                <Linkedin size={28} />
              </div>
              <div
                className="social-icon"
                style={styles.socialIcon}
                onClick={() =>
                  (window.location = "mailto:akhilpandey494@gmail.com")
                }
              >
                <Mail size={28} />
              </div>
            </div>
            <div
              style={{
                marginTop: "1rem",
                fontSize: "1.1rem",
                color: "#00ffff",
                textAlign: "center",
              }}
            >
              <strong>Email:</strong>{" "}
              <a
                href="mailto:akhilpandey494@gmail.com"
                style={{ color: "#00ffff" }}
              >
                akhilpandey494@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="reveal-on-scroll"
          style={{
            textAlign: "center",
            padding: "2rem 1rem",
            color: "#888",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: "3rem",
            fontSize: "1rem",
          }}
        >
          Made with{" "}
          <span
            style={{
              color: "#ff4d6d",
              filter: "drop-shadow(0 0 4px #ff4d6d)",
            }}
          >
            ❤️
          </span>{" "}
          by <strong style={{ color: "#00ffff" }}>Akhil</strong>
        </footer>
      </div>
    </>
  );
}