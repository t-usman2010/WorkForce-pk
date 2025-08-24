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
  MapPin
} from "lucide-react";

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  // Testimonial auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const services = [
    { icon: <Users className="w-10 h-10 text-cyan-400" />, title: "Human Workforce", desc: "Trained manpower for corporate, hospitality, and mega events." },
    { icon: <Ticket className="w-10 h-10 text-cyan-400" />, title: "Ticketing Solutions", desc: "Seamless ticketing platforms & onsite management." },
    { icon: <Shield className="w-10 h-10 text-cyan-400" />, title: "Ushers & Security", desc: "Professional ushers, event staff, and certified security personnel." },
    { icon: <Briefcase className="w-10 h-10 text-cyan-400" />, title: "Corporate Staffing", desc: "Temporary and permanent staffing solutions for enterprises." },
    { icon: <Clock className="w-10 h-10 text-cyan-400" />, title: "On-Demand Support", desc: "Quick response teams to support urgent staffing needs." },
    { icon: <Award className="w-10 h-10 text-cyan-400" />, title: "Training & Development", desc: "Skilled professionals trained for customer service & hospitality." },
    { icon: <Truck className="w-10 h-10 text-cyan-400" />, title: "Logistics Support", desc: "End-to-end logistics and operational support for events." },
    { icon: <Calendar className="w-10 h-10 text-cyan-400" />, title: "Event Planning", desc: "Comprehensive planning and execution of corporate & social events." },
  ];

  const faqs = [
    { q: "What types of staff can I hire?", a: "We provide ushers, ticketing staff, security, logistics, and professional workforce for any event." },
    { q: "Do you offer corporate staffing solutions?", a: "Yes, we offer both temporary and permanent staffing solutions for companies." },
    { q: "How can I book your services?", a: "Simply go to the 'Appoint Us' page in the header and fill out the booking form." },
    { q: "What areas do you serve?", a: "We provide services across all major cities in Pakistan, with teams available in Karachi, Lahore, Islamabad, and more." },
    { q: "How quickly can you provide staff?", a: "For urgent requirements, we can provide qualified staff within 24 hours through our on-demand service." },
  ];

  const testimonials = [
    { name: "Ali Raza", company: "EventPro Pakistan", text: "Workforce.pk provided exceptional staff for our annual conference. Their team was professional and required minimal supervision." },
    { name: "Sara Ahmed", company: "TechSolutions Inc.", text: "The corporate staffing solution saved us during our peak season. Highly recommended for any business needing reliable temporary staff." },
    { name: "Bilal Khan", company: "Karachi Expo Center", text: "Their ticketing and usher services made our event seamless. Attendees complimented the smooth entry process." }
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

  return (
    <div
      className={
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen"
          : "bg-gradient-to-tr from-white via-cyan-50 to-gray-100 text-gray-800 min-h-screen"
      }
    >
      {/* Header */}
      <header
        ref={headerRef}
        className={
          isDark
            ? "fixed top-0 w-full z-50 bg-transparent transition-all duration-300"
            : "fixed top-0 w-full z-50 bg-transparent transition-all duration-300"
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent z-10">
            Eventforce.pk
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-slate-700 dark:text-slate-200 font-medium">
            <button onClick={() => scrollToSection("home")} className="hover:text-cyan-500 transition">Home</button>
            <button onClick={() => scrollToSection("services")} className="hover:text-cyan-500 transition">Services</button>
            <button onClick={() => scrollToSection("testimonials")} className="hover:text-cyan-500 transition">Testimonials</button>
            <button onClick={() => scrollToSection("faqs")} className="hover:text-cyan-500 transition">FAQs</button>
            <Link to="/appoint" className="hover:text-cyan-500 transition">Appoint Us</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-10 text-slate-700 dark:text-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Mobile Navigation */}
          <div className={`md:hidden fixed top-0 left-0 w-full h-screen bg-gray-900 dark:bg-gray-800 bg-opacity-95 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out flex flex-col items-center justify-center space-y-10`}>
            <button onClick={() => scrollToSection("home")} className="text-2xl text-white hover:text-cyan-500 transition">Home</button>
            <button onClick={() => scrollToSection("services")} className="text-2xl text-white hover:text-cyan-500 transition">Services</button>
            <button onClick={() => scrollToSection("testimonials")} className="text-2xl text-white hover:text-cyan-500 transition">Testimonials</button>
            <button onClick={() => scrollToSection("faqs")} className="text-2xl text-white hover:text-cyan-500 transition">FAQs</button>
            <Link to="/appoint" className="text-2xl text-white hover:text-cyan-500 transition">Appoint Us</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative flex items-center justify-center min-h-screen text-center px-6 pt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Professional Eventforce Solutions for Your Events
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300">
            From ushers and security to ticketing and logistics — Eventforce.pk provides everything you need for a flawless event.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appoint" className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/30 text-white font-semibold text-lg">
              Hire Our Team
            </Link>
            <button 
              onClick={() => scrollToSection("services")}
              className="px-8 py-4 rounded-full border-2 border-cyan-500 text-cyan-500 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all font-semibold text-lg"
            >
              Explore Services
            </button>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5 dark:bg-black/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-500">{stat.value}</div>
                <div className="mt-2 text-gray-700 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={isDark ? "py-20 bg-white/5 backdrop-blur-md" : "py-20 bg-cyan-50/60 backdrop-blur-md"}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-500">Our Services</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
              Comprehensive workforce solutions tailored to meet your event and corporate needs
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={
                  isDark
                    ? "bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                    : "bg-white border border-gray-200 hover:border-cyan-400 hover:shadow-lg p-6 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2"
                }
              >
                <div className="flex justify-center">
                  {service.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-center">{service.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-cyan-500">What Our Clients Say</h2>
          
          <div className="relative h-64 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`absolute top-0 left-0 w-full h-full p-6 transition-opacity duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className={
                  isDark 
                    ? "bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg h-full flex flex-col justify-center" 
                    : "bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg h-full flex flex-col justify-center"
                }>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg italic">"{testimonial.text}"</p>
                  <div className="mt-6">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-cyan-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-cyan-500' : 'bg-gray-400'}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-900/40 to-cyan-700/20 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-500 mb-8">Why Choose Eventforce.pk?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
            <div className={isDark ? "bg-white/10 p-6 rounded-xl" : "bg-white/80 p-6 rounded-xl"}>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-700 dark:text-gray-300">All our staff undergo rigorous training and background checks to ensure the highest standards.</p>
            </div>
            
            <div className={isDark ? "bg-white/10 p-6 rounded-xl" : "bg-white/80 p-6 rounded-xl"}>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-700 dark:text-gray-300">We understand urgency and can deploy teams within hours for last-minute requirements.</p>
            </div>
            
            <div className={isDark ? "bg-white/10 p-6 rounded-xl" : "bg-white/80 p-6 rounded-xl"}>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-700 dark:text-gray-300">With hundreds of successful events, we've built a reputation for dependable service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className={isDark ? "py-20 bg-white/5 backdrop-blur-md" : "py-20 bg-gray-50 backdrop-blur-md"}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-500">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={
                  isDark
                    ? "bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-md"
                    : "bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                }
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                >
                  <h3 className="text-lg font-semibold">{faq.q}</h3>
                  <span>{openFAQ === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Event?</h2>
          <p className="text-lg mb-10 text-cyan-100">Get in touch with us today and let our professional team make your next event a success.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appoint" className="px-8 py-4 rounded-full bg-white text-cyan-600 hover:bg-gray-100 transition-all shadow-lg font-semibold text-lg">
              Book Now
            </Link>
            <a href="tel:+923001234567" className="px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white/10 transition-all font-semibold text-lg flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={isDark ? "bg-black/40 backdrop-blur-lg py-12" : "bg-gray-100 backdrop-blur-lg py-12 border-t border-gray-200"}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
          <div>
            <h4 className="text-xl font-bold text-cyan-500 mb-4">Eventforce.pk</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Delivering trusted staffing, ticketing, and event solutions across Pakistan.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-cyan-500 transition"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-cyan-500 transition"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-cyan-500 transition"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-cyan-500 transition"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-cyan-500 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><button onClick={() => scrollToSection("home")} className="hover:text-cyan-500 transition">Home</button></li>
              <li><button onClick={() => scrollToSection("services")} className="hover:text-cyan-500 transition">Services</button></li>
              <li><button onClick={() => scrollToSection("testimonials")} className="hover:text-cyan-500 transition">Testimonials</button></li>
              <li><button onClick={() => scrollToSection("faqs")} className="hover:text-cyan-500 transition">FAQs</button></li>
              <li><Link to="/appoint" className="hover:text-cyan-500 transition">Appoint Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-cyan-500 mb-3">Services</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Event Staffing</li>
              <li>Ticketing Solutions</li>
              <li>Corporate Workforce</li>
              <li>Logistics</li>
              <li>Security Personnel</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-cyan-500 mb-3">Contact Info</h4>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 text-cyan-500" />
                <span>+92-300-1234567</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 text-cyan-500" />
                <span>contact@workforce.pk</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 text-cyan-500" />
                <span>Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-10 text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Eventforce.pk. All rights reserved.</p>
      </footer>
    </div>
  );
}