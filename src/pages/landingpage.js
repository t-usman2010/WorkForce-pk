import { useState, useEffect } from "react";
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
} from "lucide-react";

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isDark, setIsDark] = useState(true);

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
  ];

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
        className={
          isDark
            ? "fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md shadow-lg"
            : "fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg shadow-md"
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Workforce.pk
          </Link>

          <nav className="hidden md:flex space-x-8 text-slate-700 dark:text-slate-200 font-medium">
            <Link to="/" className="hover:text-cyan-500 transition">Home</Link>
            <a href="#services" className="hover:text-cyan-500 transition">Services</a>
            <a href="#faqs" className="hover:text-cyan-500 transition">FAQs</a>
            <Link to="/appoint" className="hover:text-cyan-500 transition">Appoint Us</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen text-center px-6">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-extrabold drop-shadow-lg">
            Professional Workforce Solutions for Your Events
          </h2>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            From ushers and security to ticketing and logistics — Workforce.pk provides everything you need for a flawless event.
          </p>
          <Link to="/appoint" className="mt-8 inline-block px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition shadow-lg text-white">
            Hire Our Team
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={isDark ? "py-20 bg-white/5 backdrop-blur-md" : "py-20 bg-cyan-50/60 backdrop-blur-md"}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-500">Our Services</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={
                  isDark
                    ? "bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                    : "bg-white border border-gray-200 hover:border-cyan-400 hover:shadow-lg p-6 rounded-2xl shadow-sm transition"
                }
              >
                {service.icon}
                <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={isDark ? "py-20 bg-gradient-to-br from-cyan-900/40 to-cyan-700/20 backdrop-blur-md" : "py-20 bg-gradient-to-tr from-cyan-100 via-white to-cyan-50 backdrop-blur-md"}>
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-cyan-500">Why Choose Workforce.pk?</h2>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            With years of experience in providing event staffing and corporate workforce solutions, we ensure reliability, professionalism, and excellence. Our trained staff is ready to make your event successful.
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className={isDark ? "py-20 bg-white/5 backdrop-blur-md" : "py-20 bg-gray-50 backdrop-blur-md"}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-500">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={
                  isDark
                    ? "bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer shadow-md"
                    : "bg-white border border-gray-200 hover:border-cyan-400 rounded-xl p-6 cursor-pointer shadow-sm transition"
                }
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <h3 className="text-lg font-semibold flex justify-between items-center">
                  {faq.q}
                  <span>{openFAQ === index ? "-" : "+"}</span>
                </h3>
                {openFAQ === index && <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={isDark ? "bg-black/40 backdrop-blur-lg py-12 mt-20" : "bg-gray-100 backdrop-blur-lg py-12 mt-20 border-t border-gray-200"}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
          <div>
            <h4 className="text-xl font-bold text-cyan-500 mb-4">Workforce.pk</h4>
            <p className="text-gray-700 dark:text-gray-300">Delivering trusted staffing, ticketing, and event solutions across Pakistan.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-cyan-500 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><a href="#services" className="hover:text-cyan-500 transition">Services</a></li>
              <li><a href="#about" className="hover:text-cyan-500 transition">About</a></li>
              <li><a href="#faqs" className="hover:text-cyan-500 transition">FAQs</a></li>
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
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-cyan-500 mb-3">Connect</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Email: contact@workforce.pk</li>
              <li>Phone: +92-300-1234567</li>
              <li>Location: Karachi, Pakistan</li>
              <div className="flex space-x-6 mt-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500"><Facebook className="h-6 w-6" /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500"><Instagram className="h-6 w-6" /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500"><Linkedin className="h-6 w-6" /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500"><Twitter className="h-6 w-6" /></a>
              </div>
            </ul>
          </div>
        </div>
        <p className="text-center mt-10 text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Workforce.pk. All rights reserved.</p>
      </footer>
    </div>
  );
}