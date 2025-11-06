import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile-square.jpg";
import projectPranix from "@/assets/project-pranix.jpg";
import projectNAEvents from "@/assets/project-naevents.jpg";
import { toast } from "sonner";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentProfession, setCurrentProfession] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [professionIndex, setProfessionIndex] = useState(0);

  const professions = ["UI/UX Designer", "Frontend Engineer", "Problem Solver", "Tech Innovator"];

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "service", label: "Services" },
    { id: "project", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // Typewriter effect
  useEffect(() => {
    const profession = professions[professionIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentProfession(profession.substring(0, currentProfession.length - 1));
        if (currentProfession.length === 1) {
          setIsDeleting(false);
          setProfessionIndex((prevIndex) => (prevIndex + 1) % professions.length);
        }
      }, 75);
    } else {
      if (currentProfession.length < profession.length) {
        timeout = setTimeout(() => {
          setCurrentProfession(profession.substring(0, currentProfession.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentProfession, isDeleting, professionIndex, professions]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Sai_Naveen_Siddana_Resume.pdf";
    link.download = "Sai_Naveen_Siddana_Resume.pdf";
    link.click();
    toast.success("CV download started!");
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for your message! I will get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-xl shadow-lg py-2" : "bg-background/80 backdrop-blur-xl py-4"
        } border-b border-primary/15`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold cursor-pointer">
              S<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">.</span>
              <span>N</span>
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">.</span>
            </div>

            <ul className="hidden md:flex items-center gap-2 bg-glass-bg px-6 py-3 rounded-full border border-glass-border backdrop-blur-md">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeSection === link.id
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection("contact")}
              className="hidden md:block bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-2 rounded-full font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Let's Talk
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 bg-glass-bg rounded-lg border border-glass-border backdrop-blur-md"
            >
              <span
                className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
              <span
                className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-glass-bg border border-glass-border backdrop-blur-md rounded-2xl p-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === link.id
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main>
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
              <div className="space-y-6 animate-fadeInUp">
                <div className="text-lg text-primary font-medium">👋 Hello there!</div>
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                  I'm{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Sai Naveen Siddana
                  </span>
                </h1>
                <h2 className="text-2xl md:text-4xl text-primary font-light min-h-[3rem]">
                  I'm a {currentProfession}
                  <span className="animate-blink">|</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  A fresher B.Tech graduate in Computer Science and Engineering with a strong passion for UI/UX design
                  and web development. I love turning creative ideas into simple, user-friendly designs using Figma,
                  Adobe XD, Canva, and FigJam, while also building interactive experiences with HTML, CSS, and
                  JavaScript. I'm an enthusiastic learner eager to grow, explore, and create meaningful digital
                  experiences that make an impact.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
                  >
                    <span>Hire Me</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={handleDownloadCV}
                    className="group bg-glass-bg border border-glass-border text-foreground px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fas fa-download group-hover:scale-110 transition-transform" />
                    <span>Download CV</span>
                  </button>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href="https://www.behance.net/sainaveenreddy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-glass-bg border border-glass-border rounded-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-behance text-xl" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sainaveensiddana800"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-glass-bg border border-glass-border rounded-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-linkedin-in text-xl" />
                  </a>
                  <a
                    href="https://github.com/SainaveenSiddana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-glass-bg border border-glass-border rounded-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-github text-xl" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-glass-bg border border-glass-border rounded-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-instagram text-xl" />
                  </a>
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="relative w-full max-w-md mx-auto">
                  <img
                    src={profileImage}
                    alt="Sai Naveen Siddana"
                    className="w-full h-full max-h-[600px] object-cover rounded-3xl shadow-2xl"
                  />
                  <div className="absolute -top-6 -left-6 bg-glass-bg border border-glass-border backdrop-blur-md rounded-2xl p-4 shadow-lg animate-float">
                    <i className="fas fa-code text-2xl text-primary mb-2 block" />
                    <span className="text-sm font-medium">User-Centered Design</span>
                  </div>
                  <div className="absolute top-1/2 -right-6 bg-glass-bg border border-glass-border backdrop-blur-md rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                    <i className="fas fa-mobile-alt text-2xl text-primary mb-2 block" />
                    <span className="text-sm font-medium">Responsive Development</span>
                  </div>
                  <div className="absolute -bottom-6 left-1/4 bg-glass-bg border border-glass-border backdrop-blur-md rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                    <i className="fas fa-rocket text-2xl text-primary mb-2 block" />
                    <span className="text-sm font-medium">Creative-Technical Balance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="About Sai Naveen"
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  About Me
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full" />

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm Sai Naveen Siddana, a fresher B.Tech graduate in Computer Science and Engineering with a deep
                    passion for UI/UX design and web development. My journey in design and technology began during my
                    studies, where I explored how creativity and code come together to build meaningful digital
                    experiences.
                  </p>
                  <p>
                    I specialize in crafting clean, responsive, and user-friendly interfaces using tools like Figma,
                    Adobe XD, Canva, and FigJam, and developing interactive prototypes with HTML, CSS, and JavaScript in
                    VS Code. I enjoy blending design thinking with technical skills to create solutions that are both
                    visually appealing and functional.
                  </p>
                  <p>
                    When I'm not designing or coding, I love exploring new tools, improving my skills, and learning how
                    technology shapes user experiences in everyday life.
                  </p>
                </div>

                <div className="grid gap-4 pt-6">
                  <div className="flex gap-4 p-4 bg-glass-bg border border-glass-border rounded-2xl backdrop-blur-md">
                    <i className="fas fa-graduation-cap text-2xl text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Education</h4>
                      <p className="text-sm text-muted-foreground">
                        Bachelor of Technology in Computer Science and Engineering
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ramireddy Subbarami Reddy Engineering College (75%)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-glass-bg border border-glass-border rounded-2xl backdrop-blur-md">
                    <i className="fas fa-map-marker-alt text-2xl text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-sm text-muted-foreground">Nellore, Andhra Pradesh, India</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-glass-bg border border-glass-border rounded-2xl backdrop-blur-md">
                    <i className="fas fa-briefcase text-2xl text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Experience</h4>
                      <p className="text-sm text-muted-foreground">
                        Fresher - Open to internships and entry-level roles in UI/UX design and web development
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDownloadCV}
                  className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 mt-6"
                >
                  <span>Download CV</span>
                  <i className="fas fa-download group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full mx-auto mb-12" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Frontend Development */}
              <div className="bg-glass-bg border border-glass-border rounded-3xl p-6 backdrop-blur-md hover:border-primary transition-all duration-300">
                <h3 className="text-xl font-bold mb-6">Frontend Development</h3>
                <div className="space-y-4">
                  {[
                    { name: "HTML", icon: "fab fa-html5", level: 100 },
                    { name: "CSS", icon: "fab fa-css3-alt", level: 100 },
                    { name: "JavaScript", icon: "fab fa-js-square", level: 40 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center gap-3 mb-2">
                        <i className={`${skill.icon} text-xl text-primary`} />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="bg-glass-bg border border-glass-border rounded-3xl p-6 backdrop-blur-md hover:border-primary transition-all duration-300">
                <h3 className="text-xl font-bold mb-6">Tools</h3>
                <div className="space-y-4">
                  {[
                    { name: "Figma", icon: "fab fa-figma", level: 90 },
                    { name: "GitHub", icon: "fab fa-github", level: 70 },
                    { name: "VS Code", icon: "fas fa-code", level: 95 },
                    { name: "AdobeXD", icon: "fas fa-pen-nib", level: 95 },
                    { name: "Canva", icon: "fas fa-cannabis", level: 95 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center gap-3 mb-2">
                        <i className={`${skill.icon} text-xl text-primary`} />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Tools */}
              <div className="bg-glass-bg border border-glass-border rounded-3xl p-6 backdrop-blur-md hover:border-primary transition-all duration-300">
                <h3 className="text-xl font-bold mb-6">AI Tools</h3>
                <div className="space-y-4">
                  {[
                    { name: "ChatGPT", level: 90 },
                    { name: "Google Gemini", level: 70 },
                    { name: "Copilot", level: 95 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* UI/UX Design */}
              <div className="bg-glass-bg border border-glass-border rounded-3xl p-6 backdrop-blur-md hover:border-primary transition-all duration-300">
                <h3 className="text-xl font-bold mb-6">UI/UX Design</h3>
                <div className="space-y-4">
                  {[
                    { name: "UX Research", icon: "fas fa-user-check", level: 85 },
                    { name: "Wireframing", icon: "fas fa-pencil-ruler", level: 75 },
                    { name: "Prototyping", icon: "fas fa-vector-square", level: 90 },
                    { name: "Visual Design", icon: "fas fa-palette", level: 90 },
                    { name: "Usability Testing", icon: "fas fa-clipboard-check", level: 90 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center gap-3 mb-2">
                        <i className={`${skill.icon} text-xl text-primary`} />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="service" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              What I Do
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full mx-auto mb-12" />

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-glass-bg border border-glass-border rounded-3xl p-8 backdrop-blur-md hover:border-primary hover:shadow-glow transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fas fa-code text-2xl text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Web Development</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I create responsive, modern websites using the latest technologies and best practices. From concept to
                  deployment, I ensure your website looks great and performs perfectly.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    Responsive Design
                  </span>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    Performance Optimized
                  </span>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    SEO Friendly
                  </span>
                </div>
              </div>

              <div className="bg-glass-bg border border-glass-border rounded-3xl p-8 backdrop-blur-md hover:border-primary hover:shadow-glow transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fas fa-palette text-2xl text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">UI/UX Design</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Designing intuitive and beautiful user interfaces that provide exceptional user experiences. I focus
                  on usability, accessibility, and visual appeal.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    User-Centered
                  </span>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    Modern Design
                  </span>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    Accessibility
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="project" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full mx-auto mb-12" />

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Pranix Project */}
              <div className="group bg-glass-bg border border-glass-border rounded-3xl overflow-hidden backdrop-blur-md hover:border-primary transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={projectPranix}
                    alt="Pranix Healthcare App"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href="https://www.behance.net/sainaveenreddy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
                    >
                      <i className="fas fa-external-link-alt" />
                    </a>
                    <a
                      href="https://www.behance.net/sainaveenreddy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
                    >
                      <i className="fab fa-behance" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">
                    A Comprehensive UI/UX Case Study — Pranix Healthcare App Design
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Pranix is an all-in-one healthcare app that unifies medical services into a seamless digital
                    experience, solving issues like poor usability, complex navigation, and disconnected features such
                    as consultations, prescriptions, and reports.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["UX Research", "Wireframing", "Visual Design", "Prototyping", "Usability Testing"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* NA Events Project */}
              <div className="group bg-glass-bg border border-glass-border rounded-3xl overflow-hidden backdrop-blur-md hover:border-primary transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={projectNAEvents}
                    alt="NA Events App"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href="https://www.behance.net/sainaveenreddy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
                    >
                      <i className="fas fa-external-link-alt" />
                    </a>
                    <a
                      href="https://www.behance.net/sainaveenreddy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
                    >
                      <i className="fab fa-behance" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">NA Events - Simplifying Event Management Through Design</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    NA Events is a user-friendly app that simplifies discovering, managing, and attending events by
                    solving issues like cluttered interfaces, poor navigation, and limited personalization for a smooth,
                    engaging experience.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["UX Research", "Wireframing", "Visual Design", "Prototyping", "Usability Testing"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full mx-auto mb-12" />

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    icon: "fas fa-envelope",
                    title: "Email",
                    info: "sainaveenreddy03@gmail.com",
                    link: "mailto:sainaveenreddy03@gmail.com",
                    linkText: "Send Email",
                  },
                  {
                    icon: "fas fa-phone",
                    title: "Phone",
                    info: "+91 7674800527",
                    link: "tel:+917674800527",
                    linkText: "Call Now",
                  },
                  {
                    icon: "fas fa-map-marker-alt",
                    title: "Location",
                    info: "Nellore, Andhra Pradesh, India",
                    link: "#",
                    linkText: "View on Map",
                  },
                  {
                    icon: "fab fa-whatsapp",
                    title: "WhatsApp",
                    info: "+91 7674800527",
                    link: "https://wa.me/917674800527",
                    linkText: "Send Message",
                  },
                ].map((contact) => (
                  <div
                    key={contact.title}
                    className="flex gap-4 p-6 bg-glass-bg border border-glass-border rounded-2xl backdrop-blur-md hover:border-primary transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className={`${contact.icon} text-xl text-primary-foreground`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{contact.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{contact.info}</p>
                      <a
                        href={contact.link}
                        target={contact.link.startsWith("http") ? "_blank" : undefined}
                        rel={contact.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-primary hover:underline"
                      >
                        {contact.linkText}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-glass-bg border border-glass-border rounded-3xl p-8 backdrop-blur-md">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors peer"
                      placeholder=" "
                    />
                    <label className="absolute left-4 -top-2.5 bg-background px-2 text-sm text-muted-foreground peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary transition-all">
                      Your Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors peer"
                      placeholder=" "
                    />
                    <label className="absolute left-4 -top-2.5 bg-background px-2 text-sm text-muted-foreground peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary transition-all">
                      Your Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors peer"
                      placeholder=" "
                    />
                    <label className="absolute left-4 -top-2.5 bg-background px-2 text-sm text-muted-foreground peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary transition-all">
                      Your Subject
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors peer resize-none"
                      placeholder=" "
                    />
                    <label className="absolute left-4 -top-2.5 bg-background px-2 text-sm text-muted-foreground peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary transition-all">
                      Your Message
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
                  >
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
