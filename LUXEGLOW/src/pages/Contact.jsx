import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Loader2, CheckCircle } from "lucide-react";
import { validateEmail, validateName, validateMessage } from "@/utils/validators";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    const msgErr = validateMessage(form.message);

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (msgErr) newErrors.message = msgErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1500));

    setLoading(false);
    setSent(true);

    toast.success("Message sent successfully!");
  };

  return (
    <div className="section-padding">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">
            Get in Touch
          </p>
          <h1 className="font-display text-3xl md:text-4xl">Contact Us</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            We'd love to hear from you. Reach out with any questions, feedback, or
            collaboration ideas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {[
              {
                icon: MapPin,
                label: "Visit Us",
                value: "123 Beauty Boulevard\nNew York, NY 10001",
              },
              { icon: Mail, label: "Email Us", value: "hello@luxeglow.com" },
              { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-border/50 flex-shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground whitespace-pre-line">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-card border border-border/30"
              >
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl mb-2">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border/30 p-6 md:p-8 space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                      Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-transparent border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us more…"
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button variant="luxe" size="lg" type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
