import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  MapPin, 
  MessageCircle, 
  CheckCircle, 
  ArrowLeft,
  Phone,
  Mail,
  Shield,
  Ticket,
  Briefcase,
  Award,
  Truck,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppointUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    services: [],
    date: "",
    time: "",
    duration: "2 hours",
    attendees: "50-100",
    location: "",
    message: ""
  });
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // Detect system theme preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);

    const listener = (e) => setIsDark(e.matches);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
    };
  }, []);

  // Header scroll effect (same as landing page)
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    let updatedServices = [...formData.services];
    if (checked) {
      updatedServices.push(value);
    } else {
      updatedServices = updatedServices.filter((s) => s !== value);
    }
    setFormData({ ...formData, services: updatedServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");

    const submitData = new FormData();
    submitData.append("access_key", "789c1ef7-b7e6-4e67-b90b-884d570235ef");
    Object.keys(formData).forEach(key => {
      if (key === 'services') {
        submitData.append(key, formData[key].join(", "));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        setFormData({ 
          name: "", 
          email: "", 
          phone: "", 
          eventType: "", 
          services: [], 
          date: "", 
          time: "",
          duration: "2 hours",
          attendees: "50-100",
          location: "", 
          message: "" 
        });
        setCurrentStep(1);
      } else {
        setResult(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setResult("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const serviceOptions = [
    { value: "ushers", label: "Event Ushers", icon: <Users className="w-5 h-5" /> },
    { value: "ticketing", label: "Ticketing & Counters", icon: <Ticket className="w-5 h-5" /> },
    { value: "security", label: "Event Security", icon: <Shield className="w-5 h-5" /> },
    { value: "hospitality", label: "Hospitality Staff", icon: <Award className="w-5 h-5" /> },
    { value: "manpower", label: "General Manpower", icon: <Briefcase className="w-5 h-5" /> },
    { value: "logistics", label: "Logistics Support", icon: <Truck className="w-5 h-5" /> }
  ];

  const eventTypes = [
    "Corporate Event",
    "Wedding",
    "Conference",
    "Concert",
    "Exhibition",
    "Sports Event",
    "Private Party",
    "Other"
  ];

  return (
    <div className={isDark ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen" : "bg-gradient-to-tr from-white via-cyan-50 to-gray-100 text-gray-800 min-h-screen"}>
      {/* Header with bubble shape and translucent blur (same as landing page) */}
      <header
        ref={headerRef}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-6xl rounded-3xl z-50 transition-all duration-300 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent z-10 flex items-center">
            <ArrowLeft className="mr-2 w-5 h-5" /> Workforce.pk
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-slate-700 dark:text-slate-200 font-medium">
            <Link to="/" className="hover:text-cyan-500 transition">Home</Link>
            <button onClick={() => scrollToSection("contact")} className="hover:text-cyan-500 transition">Contact</button>
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
                        dark:from-black/20 dark:via-black/10 dark:to-black/20
                        backdrop-blur-md rounded-3xl border border-white/10 
                        shadow-xl mt-2 py-2 overflow-hidden"
            >
              <div className="flex flex-col">
                <Link 
                  to="/" 
                  className="py-4 px-6 text-lg text-slate-800 dark:text-slate-200 
                            hover:text-cyan-500 hover:bg-white/5 dark:hover:bg-white/5 
                            transition-all duration-200 border-b border-white/10 flex items-center"
                >
                  Home
                </Link>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="py-4 px-6 text-lg text-slate-800 dark:text-slate-200 
                            hover:text-cyan-500 hover:bg-white/5 dark:hover:bg-white/5 
                            transition-all duration-200 flex items-center"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-16 px-6">
        <div className={`max-w-4xl mx-auto ${isDark ? "bg-gray-800/40" : "bg-white/70"} backdrop-blur-lg shadow-2xl rounded-2xl p-8`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Appoint Our Services
            </h2>
            <p className="mt-2 text-slate-400">
              Complete the form below to request our professional workforce services.
            </p>
            
            {/* Progress Bar */}
            <div className="mt-6 mb-2">
              <div className="flex justify-between mb-2 text-sm text-slate-400">
                <span>Step {currentStep} of 3</span>
                <span>{Math.round((currentStep / 3) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-cyan-500 flex items-center">
                  <Users className="mr-2 w-5 h-5" />
                  Personal Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center"
                  >
                    Next <Users className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Event Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-cyan-500 flex items-center">
                  <Calendar className="mr-2 w-5 h-5" />
                  Event Details
                </h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Event Type *</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                  >
                    <option value="">Select Event Type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Time *</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                    >
                      <option value="2 hours">2 hours</option>
                      <option value="4 hours">4 hours</option>
                      <option value="6 hours">6 hours</option>
                      <option value="Full day">Full day</option>
                      <option value="Multiple days">Multiple days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Attendees</label>
                    <select
                      name="attendees"
                      value={formData.attendees}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                    >
                      <option value="Less than 50">Less than 50</option>
                      <option value="50-100">50-100</option>
                      <option value="100-500">100-500</option>
                      <option value="500-1000">500-1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                      placeholder="Venue name and address"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-700 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center"
                  >
                    Next <Calendar className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Services & Message */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-cyan-500 flex items-center">
                  <CheckCircle className="mr-2 w-5 h-5" />
                  Services & Final Details
                </h3>
                
                <div>
                  <label className="block text-sm font-medium mb-3">Select Required Services *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {serviceOptions.map((service) => (
                      <label 
                        key={service.value} 
                        className="flex items-center space-x-3 bg-slate-700/50 px-4 py-3 rounded-lg border border-slate-700 cursor-pointer transition hover:shadow-md"
                      >
                        <input
                          type="checkbox"
                          value={service.value}
                          checked={formData.services.includes(service.value)}
                          onChange={handleServiceChange}
                          className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                        />
                        <span className="flex items-center">
                          {service.icon}
                          <span className="ml-2">{service.label}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Message</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                      placeholder="Tell us more about your event and specific requirements..."
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-700 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50 flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Request <CheckCircle className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {result && (
            <div className={`mt-6 p-4 rounded-xl ${result.includes("Successfully") ? "bg-green-900/30 text-green-300" : "bg-blue-900/30 text-blue-300"}`}>
              {result}
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div id="contact" className={`max-w-4xl mx-auto mt-12 ${isDark ? "bg-gray-800/40" : "bg-white/70"} backdrop-blur-lg shadow-xl rounded-2xl p-8`}>
          <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Contact Information
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-slate-800/50">
              <Phone className="w-8 h-8 mx-auto text-cyan-500" />
              <h4 className="font-semibold mt-2">Phone</h4>
              <p className="mt-1 text-slate-300">+92-300-1234567</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-slate-800/50">
              <Mail className="w-8 h-8 mx-auto text-cyan-500" />
              <h4 className="font-semibold mt-2">Email</h4>
              <p className="mt-1 text-slate-300">contact@workforce.pk</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-slate-800/50">
              <MapPin className="w-8 h-8 mx-auto text-cyan-500" />
              <h4 className="font-semibold mt-2">Location</h4>
              <p className="mt-1 text-slate-300">Karachi, Pakistan</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg py-12 border-t border-white/10 relative z-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Workforce.pk. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-500 transition">Facebook</a>
            <a href="#" className="hover:text-cyan-500 transition">Twitter</a>
            <a href="#" className="hover:text-cyan-500 transition">LinkedIn</a>
            <a href="#" className="hover:text-cyan-500 transition">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}