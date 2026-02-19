import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";

const Contact = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <>
      <div
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${isAtTop ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"}`}
      >
        <Navbar />
      </div>
      <CartDrawer />
      <AuthModal />

      <main className="min-h-screen bg-background pt-32 px-4 md:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-10">
              <h1 className="font-serif text-5xl text-foreground">Contact Us</h1>
              <div className="space-y-8">
                <div className="flex gap-5 items-start">
                  <Mail size={24} className="mt-1 text-primary" />
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Email Support
                    </h3>
                    <p className="text-foreground font-medium">
                      LoveInFabric.clothing15@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <Phone size={24} className="mt-1 text-primary" />
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Phone / WhatsApp
                    </h3>
                    <p className="text-foreground font-medium">+91 9958849763</p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <MapPin size={24} className="mt-1 text-primary" />
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Headquarters
                    </h3>
                    <p className="text-foreground font-medium leading-relaxed">
                      LoveInFabric Pvt Ltd.
                      <br />
                      Delhi, India
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <Clock size={24} className="mt-1 text-primary" />
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Support Hours
                    </h3>
                    <p className="text-foreground font-medium">
                      Mon - Sat | 10:00 AM - 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/10 p-10 rounded-2xl border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
                    Name
                  </label>
                  <input
                    required
                    className="w-full bg-background border border-border rounded-md p-4 text-sm focus:border-foreground outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-background border border-border rounded-md p-4 text-sm focus:border-foreground outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    required
                    className="w-full bg-background border border-border rounded-md p-4 text-sm focus:border-foreground outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white p-4 rounded-md font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
