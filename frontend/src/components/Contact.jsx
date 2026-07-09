import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "../lib/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and a note.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Your brief has landed. We'll be in touch soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="bg-[#1c1b1a] text-[#f7f5f0]"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#c75d3b]">
            Get in touch
          </p>
          <h2 className="font-serif-display text-5xl font-light leading-none tracking-tight md:text-7xl">
            Let&apos;s make <span className="italic text-[#c75d3b]">light.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Details */}
          <div className="space-y-10">
            <div>
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.35em] text-[#8a8781]">
                Email
              </p>
              <a
                data-testid="contact-email"
                href={`mailto:${SITE.email}`}
                className="font-serif-display text-2xl text-[#f7f5f0] transition-colors duration-300 hover:text-[#c75d3b] md:text-3xl"
              >
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.35em] text-[#8a8781]">
                Phone
              </p>
              <a
                data-testid="contact-phone"
                href={SITE.phoneHref}
                className="text-lg text-[#e6e2da] transition-colors duration-300 hover:text-[#c75d3b]"
              >
                {SITE.phone}
              </a>
            </div>
            <div>
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.35em] text-[#8a8781]">
                Studio
              </p>
              <p className="max-w-xs text-lg leading-relaxed text-[#e6e2da]">
                {SITE.address}
              </p>
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] uppercase tracking-[0.35em] text-[#8a8781]">
                Elsewhere
              </p>
              <div className="flex gap-6">
                {SITE.socials.map((s) => (
                  <a
                    key={s.label}
                    data-testid={`social-${s.label.toLowerCase()}`}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm uppercase tracking-[0.2em] text-[#e6e2da] transition-colors duration-300 hover:text-[#c75d3b]"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form data-testid="contact-form" onSubmit={submit} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-[#8a8781]">
                  Your name *
                </label>
                <input
                  data-testid="contact-input-name"
                  value={form.name}
                  onChange={update("name")}
                  className="w-full border-b border-[#5c5a56] bg-transparent py-2 text-[#f7f5f0] outline-none transition-colors duration-300 placeholder:text-[#5c5a56] focus:border-[#c75d3b]"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-[#8a8781]">
                  Email *
                </label>
                <input
                  data-testid="contact-input-email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="w-full border-b border-[#5c5a56] bg-transparent py-2 text-[#f7f5f0] outline-none transition-colors duration-300 placeholder:text-[#5c5a56] focus:border-[#c75d3b]"
                  placeholder="you@studio.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-[#8a8781]">
                Subject
              </label>
              <input
                data-testid="contact-input-subject"
                value={form.subject}
                onChange={update("subject")}
                className="w-full border-b border-[#5c5a56] bg-transparent py-2 text-[#f7f5f0] outline-none transition-colors duration-300 placeholder:text-[#5c5a56] focus:border-[#c75d3b]"
                placeholder="A new film"
              />
            </div>
            <div>
              <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-[#8a8781]">
                Tell us about the project *
              </label>
              <textarea
                data-testid="contact-input-message"
                value={form.message}
                onChange={update("message")}
                rows={4}
                className="w-full resize-none border-b border-[#5c5a56] bg-transparent py-2 text-[#f7f5f0] outline-none transition-colors duration-300 placeholder:text-[#5c5a56] focus:border-[#c75d3b]"
                placeholder="What are we making together?"
              />
            </div>
            <button
              data-testid="contact-submit"
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-[#f7f5f0] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#1c1b1a] transition-colors duration-300 hover:bg-[#c75d3b] hover:text-white disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send a brief"}
              <ArrowUpRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
