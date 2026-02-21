import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Welcome to the LoveInFabric Fam!");
      setEmail("");
    }
  };

  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/919958849763",
    },
  ];

  return (
    <footer className="bg-[#FAF9F6] text-stone-800 border-t border-stone-200 selection:bg-stone-800 selection:text-white">
      <div className="container pt-20 pb-10">
        {/* TOP SECTION: 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* LEFT: Newsletter */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            {/* INCREASED: Title size from text-lg to text-xl md:text-2xl */}
            <h3 className="font-serif text-xl md:text-2xl mb-4 text-stone-900">
              Join our newsletter and receive 10% off your next order
            </h3>
            <form onSubmit={handleSubscribe} className="relative mt-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-stone-300 text-stone-900 px-4 py-3 pr-12 text-base focus:outline-none focus:border-stone-800 transition-colors placeholder:text-stone-500 rounded-none"
                required
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 text-stone-500 hover:text-stone-900 transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </form>
          </div>

          {/* RIGHT: Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:pl-12">
            {/* Explore */}
            <div>
              {/* INCREASED: Heading size to text-base */}
              <h4 className="font-semibold text-base text-stone-900 mb-6">
                Explore
              </h4>
              <ul className="space-y-4">
                {[
                  "Premium Blankets",
                  "Custom Tees",
                  "Accessories",
                  "New Arrivals",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      to={`/shop?category=${link.toLowerCase().replace(" ", "-")}`}
                      className="text-base text-stone-700 hover:text-stone-950 transition-colors block w-fit group"
                    >
                      {link}
                      <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-stone-900 mt-0.5"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-base text-stone-900 mb-6">
                Company
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "About LoveInFabric", path: "/about" },
                  { label: "Terms & Conditions", path: "/terms" },
                  { label: "Privacy Policy", path: "/privacy" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-base text-stone-700 hover:text-stone-950 transition-colors block w-fit group"
                    >
                      {link.label}
                      <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-stone-900 mt-0.5"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-base text-stone-900 mb-6">
                Online Support
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "Contact Us", path: "/contact" },
                  { label: "FAQ", path: "/faq" },
                  { label: "Shipping & Returns", path: "/shipping" },
                  { label: "Refund Policy", path: "/refund" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-base text-stone-700 hover:text-stone-950 transition-colors block w-fit group"
                    >
                      {link.label}
                      <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-stone-900 mt-0.5"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Socials & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-10 border-t border-stone-200">
          {/* Left: Socials & Copyright */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-700 hover:text-stone-950 transition-colors hover:scale-110 transform duration-200"
                  aria-label={social.name}
                >
                  <social.icon size={22} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            {/* INCREASED: Removed font-light, changed to text-sm */}
            <p className="text-sm text-stone-600 tracking-wide">
              &copy; 2026, LoveInFabric. Designed for comfort.
            </p>
          </div>
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-2 group"
            >
              Back to Top
              <ArrowRight
                size={14}
                className="-rotate-90 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
