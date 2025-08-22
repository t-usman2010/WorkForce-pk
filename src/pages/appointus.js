import React, { useState } from "react";

export default function AppointUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    date: "",
    message: ""
  });
  const [result, setResult] = useState("");

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
    setResult("Sending....");

    const submitData = new FormData();
    submitData.append("access_key", "789c1ef7-b7e6-4e67-b90b-884d570235ef"); // Replace with your Web3Forms key
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("services", formData.services.join(", "));
    submitData.append("date", formData.date);
    submitData.append("message", formData.message);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: submitData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      setFormData({ name: "", email: "", phone: "", services: [], date: "", message: "" });
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Workforce.pk</h1>
          <nav className="space-x-6">
            <a href="/" className="hover:text-cyan-500">Home</a>
            <a href="/appoint" className="hover:text-cyan-500">Appoint Us</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Appoint Our Services
          </h2>
          <p className="text-center mb-8 text-slate-600 dark:text-slate-300">
            Fill out the form below to request our professional workforce services.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
            </div>

            {/* Services as Checkboxes */}
            <div>
              <label className="block text-sm font-medium mb-3">Select Services</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: "ushers", label: "Event Ushers" },
                  { value: "ticketing", label: "Ticketing & Counters" },
                  { value: "security", label: "Event Security" },
                  { value: "hospitality", label: "Hospitality Staff" },
                  { value: "manpower", label: "General Manpower" }
                ].map((service) => (
                  <label key={service.value} className="flex items-center space-x-3 bg-white/60 dark:bg-slate-900/40 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md">
                    <input
                      type="checkbox"
                      value={service.value}
                      checked={formData.services.includes(service.value)}
                      onChange={handleServiceChange}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span>{service.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preferred Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              Submit Request
            </button>
            <p className="text-center text-sm mt-2">{result}</p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} Workforce.pk. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-500">Facebook</a>
            <a href="#" className="hover:text-cyan-500">Twitter</a>
            <a href="#" className="hover:text-cyan-500">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
