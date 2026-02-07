import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { validateEmail } from "@/utils/validators";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Welcome to the LuxeGlow family!");
    setEmail("");
  };

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container-luxe section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl tracking-[0.3em] text-primary mb-4">
              LUXEGLOW
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Redefining beauty with premium, ethically crafted cosmetics. Every product tells a story of elegance and confidence.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-foreground mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Shop All", to: "/shop" },
                { label: "About Us", to: "/about" },
                { label: "Blog", to: "/blog" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-foreground mb-4">
              Customer Service
            </h4>
            <div className="flex flex-col gap-3">
              {["Shipping & Returns", "FAQ", "Size Guide", "Privacy Policy"].map((item) => (
                <span
                  key={item}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-foreground mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for exclusive offers and beauty tips.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-muted text-sm text-foreground placeholder:text-muted-foreground px-3 py-2 border border-border focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="luxe-gradient text-primary-foreground px-4 py-2 text-xs tracking-widest uppercase font-body font-semibold hover:opacity-90 transition-opacity"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 LuxeGlow Cosmetics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
