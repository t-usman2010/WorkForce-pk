import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Ticket,
  Shield,
  Briefcase,
  Clock,
  Award,
  Truck,
  Calendar,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const headerRef = useRef(null);

  // Detect user system preference and set theme
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);

    const listener = (e) => setIsDark(e.matches);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
    };
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 50) {
          headerRef.current.classList.add("scrolled");
        } else {
          headerRef.current.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slideshow auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const services = [
    { icon: <Users className="w-10 h-10" />, title: "Human Workforce", desc: "Trained manpower for corporate, hospitality, and mega events." },
    { icon: <Ticket className="w-10 h-10" />, title: "Ticketing Solutions", desc: "Seamless ticketing platforms & onsite management." },
    { icon: <Shield className="w-10 h-10" />, title: "Ushers & Security", desc: "Professional ushers, event staff, and certified security personnel." },
    { icon: <Briefcase className="w-10 h-10" />, title: "Corporate Staffing", desc: "Temporary and permanent staffing solutions for enterprises." },
    { icon: <Clock className="w-10 h-10" />, title: "On-Demand Support", desc: "Quick response teams to support urgent staffing needs." },
    { icon: <Award className="w-10 h-10" />, title: "Training & Development", desc: "Skilled professionals trained for customer service & hospitality." },
    { icon: <Truck className="w-10 h-10" />, title: "Logistics Support", desc: "End-to-end logistics and operational support for events." },
    { icon: <Calendar className="w-10 h-10" />, title: "Event Planning", desc: "Comprehensive planning and execution of corporate & social events." },
  ];

  const faqs = [
    { q: "What types of staff can I hire?", a: "We provide ushers, ticketing staff, security, logistics, and professional workforce for any event." },
    { q: "Do you offer corporate staffing solutions?", a: "Yes, we offer both temporary and permanent staffing solutions for companies." },
    { q: "How can I book your services?", a: "Simply go to the 'Appoint Us' page in the header and fill out the booking form." },
    { q: "What areas do you serve?", a: "We provide services across all major cities in Pakistan, with teams available in Karachi, Lahore, Islamabad, and more." },
    { q: "How quickly can you provide staff?", a: "For urgent requirements, we can provide qualified staff within 24 hours through our on-demand service." },
  ];

  const slides = [
    { 
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Professional Event Staffing",
      text: "Our trained personnel ensure your events run smoothly from start to finish."
    },
    { 
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Corporate Staffing Solutions",
      text: "Reliable temporary and permanent staff for your business needs."
    },
    { 
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Ticketing & Entry Management",
      text: "Efficient ticketing solutions and professional ushers for seamless event entry."
    }
  ];

  const stats = [
    { value: "500+", label: "Events Served" },
    { value: "2000+", label: "Trained Staff" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className={
        isDark
          ? "bg-[#000020] text-white min-h-screen"
          : "bg-gradient-to-tr from-white via-yellow-50 to-gray-100 text-gray-800 min-h-screen"
      }
      style={isDark ? { 
        background: "linear-gradient(135deg, #000020 0%, #000080 50%, #000040 100%)" 
      } : {}}
    >
      {/* Header with bubble shape and translucent blur */}
      <header
        ref={headerRef}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-6xl rounded-3xl z-50 transition-all duration-300 bg-white/10 dark:bg-[#000080]/30 backdrop-blur-md border border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold z-10 flex items-center">
              <span className={isDark ? "text-white" : "text-[#000080]"}>Work</span>
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">Force</span>
              <span className={isDark ? "text-white" : "text-[#000080]"}>.pk</span>
            </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-slate-700 dark:text-slate-200 font-medium">
            <button onClick={() => scrollToSection("home")} className="hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition">Home</button>
            <button onClick={() => scrollToSection("services")} className="hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition">Services</button>
            <button onClick={() => scrollToSection("gallery")} className="hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition">Gallery</button>
            <button onClick={() => scrollToSection("faqs")} className="hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition">FAQs</button>
            <Link to="/appoint" className="hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition">Appoint Us</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-10 text-slate-700 dark:text-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Enhanced Mobile Dropdown Menu with Matching Blur & Bubble Effect */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden absolute top-full left-0 right-0 
                          bg-gradient-to-br from-white/10 via-white/5 to-white/10 
                          dark:bg-[#000080]/30
                          backdrop-blur-md rounded-3xl border border-white/10 
                          shadow-xl mt-2 py-2 overflow-hidden"
            >
              <div className="flex flex-col backdrop-blur-md bg-white/30 dark:bg-[#000080]/40">
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="py-4 px-6 text-lg text-slate-800 dark:text-slate-200 
                              hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent
                              transition-all duration-200 border-b border-white/10 flex items-center"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="py-4 px-6 text-lg text-slate-800 dark:text-slate-200 
                              hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent
                              transition-all duration-200 border-b border-white/10 flex items-center"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection("gallery")} 
                  className="py-4 px-6 text-lg text-slate-800 dark:text-slate-200 
                              hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent
                              transition-all duration-200 border-b border-white/10 flex items-center"
                >
                  Gallery
                </button>
                <button 
                  onClick={() => scrollToSection("faqs")} 
                  className="py-4 px-6 text-lg text-slate-800 dark:text-slate-200 
                              hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent
                              transition-all duration-200 border-b border-white/10 flex items-center"
                >
                  FAQs
                </button>
                <Link 
                  to="/appoint" 
                  className="py-4 px-6 text-lg text-slate-800 dark:text-slate-200 
                              hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent
                              transition-all duration-200 flex items-center"
                >
                  Appoint Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section with Background Image - Fixed for mobile */}
      <section id="home" className="relative flex items-center justify-center min-h-screen px-4 pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Event Staff Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10 text-center md:text-left w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            Professional Workforce Solutions for Your Events
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            From ushers and security to ticketing and logistics — Workforce.pk provides everything you need for a flawless event.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/appoint" className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-600 transition-all shadow-lg hover:shadow-yellow-500/50 text-white font-semibold text-lg transform hover:scale-105">
              Hire Our Team
            </Link>
            <button 
              onClick={() => scrollToSection("services")}
              className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 transition-all font-semibold text-lg transform hover:scale-105"
            >
              Explore Services
            </button>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-300/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5 dark:bg-[#000080]/20 backdrop-blur-md relative z-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">{stat.value}</div>
                <div className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={isDark ? "py-20 bg-[#000080]/20 backdrop-blur-md relative z-10 px-4" : "py-20 bg-yellow-50/60 backdrop-blur-md relative z-10 px-4"}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">Our Services</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
              Comprehensive workforce solutions tailored to meet your event and corporate needs
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={
                  isDark
                    ? "bg-[#000080]/20 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#000080]/30 group"
                    : "bg-white border border-gray-200 hover:border-yellow-400 hover:shadow-lg p-6 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2 group"
                }
              >
                <div className="flex justify-center">
                  <div className="group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:via-yellow-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">
                    {service.icon}
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-center group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:via-yellow-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">{service.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-center text-sm md:text-base">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section with Image Slideshow */}
      <section id="gallery" className="py-20 bg-gradient-to-r from-[#000080]/30 to-[#000060]/30 backdrop-blur-md relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">Our Work in Action</h2>
          
          <div className="relative">
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-full p-2 shadow-lg transform hover:scale-110 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-full p-2 shadow-lg transform hover:scale-110 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="relative h-80 sm:h-96 overflow-hidden rounded-2xl shadow-xl">
              {slides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="relative h-full">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{slide.title}</h3>
                      <p className="text-base sm:text-lg text-gray-200">{slide.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${index === activeSlide ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gray-400'}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`View slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-[#000080]/40 to-[#000060]/30 backdrop-blur-md relative z-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-8">Why Choose Workforce.pk?</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
            <div className={isDark ? "bg-[#000080]/20 p-6 rounded-xl border border-[#000080]/30 group" : "bg-white/80 p-6 rounded-xl group"}>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:via-yellow-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">Quality Assurance</h3>
              <p className="text-gray-700 dark:text-gray-300">All our staff undergo rigorous training and background checks to ensure the highest standards.</p>
            </div>
            
            <div className={isDark ? "bg-[#000080]/20 p-6 rounded-xl border border-[#000080]/30 group" : "bg-white/80 p-6 rounded-xl group"}>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:via-yellow-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">Quick Response</h3>
              <p className="text-gray-700 dark:text-gray-300">We understand urgency and can deploy teams within hours for last-minute requirements.</p>
            </div>
            
            <div className={isDark ? "bg-[#000080]/20 p-6 rounded-xl border border-[#000080]/30 group" : "bg-white/80 p-6 rounded-xl group"}>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:via-yellow-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">Reliability</h3>
              <p className="text-gray-700 dark:text-gray-300">With hundreds of successful events, we've built a reputation for dependable service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className={isDark ? "py-20 bg-[#000080]/20 backdrop-blur-md relative z-10 px-4" : "py-20 bg-yellow-50 backdrop-blur-md relative z-10 px-4"}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={
                  isDark
                    ? "bg-[#000080]/20 backdrop-blur-md rounded-xl overflow-hidden shadow-md border border-[#000080]/30 group"
                    : "bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group"
                }
              >
                <button
                  className="w-full p-4 md:p-6 text-left flex justify-between items-center group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:via-yellow-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent transition-colors"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                >
                  <h3 className="text-lg font-semibold">{faq.q}</h3>
                  <span className="group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:via-yellow-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">
                    {openFAQ === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-4 md:px-6 pb-4 md:pb-6 text-gray-600 dark:text-gray-300">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Event?</h2>
          <p className="text-lg mb-10 text-yellow-100">Get in touch with us today and let our professional team make your next event a success.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appoint" className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-yellow-600 hover:bg-gray-100 transition-all shadow-lg font-semibold text-lg transform hover:scale-105">
              Book Now
            </Link>
            <a href="tel:+923001234567" className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-white text-white hover:bg-white/10 transition-all font-semibold text-lg flex items-center justify-center gap-2 transform hover:scale-105">
              <Phone className="w-5 h-5" /> Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={isDark ? "bg-[#000040]/40 backdrop-blur-lg py-12 relative z-10 px-4" : "bg-yellow-50 backdrop-blur-lg py-12 border-t border-yellow-200 relative z-10 px-4"}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          <div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-4">Workforce.pk</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Delivering trusted staffing, ticketing, and event solutions across Pakistan.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:bg-gradient-to-r hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:bg-gradient-to-r hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:bg-gradient-to-r hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:bg-gradient-to-r hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><button onClick={() => scrollToSection("home")} className="hover:bg-gradient-to-r hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition">Home</button></li>
              <li><button onClick={() => scrollToSection("services")} className="hover:bg-gradient-to-r hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition">Services</button></li>
              <li><button onClick={() => scrollToSection("gallery")} className="hover:bg-gradient-to-r hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition">Gallery</button></li>
              <li><button onClick={() => scrollToSection("faqs")} className="hover:bg-gradient-to-r hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition">FAQs</button></li>
              <li><Link to="/appoint" className="hover:bg-gradient-to-r hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition">Appoint Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-3">Services</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Event Staffing</li>
              <li>Ticketing Solutions</li>
              <li>Corporate Workforce</li>
              <li>Logistics</li>
              <li>Security Personnel</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-3">Contact Info</h4>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent" />
                <span>+92-300-1234567</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent" />
                <span>contact@workforce.pk</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent" />
                <span>Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-10 text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Workforce.pk. All rights reserved.</p>
      </footer>
    </div>
  );
}