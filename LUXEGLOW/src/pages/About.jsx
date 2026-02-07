import { motion } from "framer-motion";
import { Sparkles, Leaf, Heart } from "lucide-react";
import heroImage from "@/assets/images/hero.jpg";

const values = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description:
      "Every formula is crafted with the finest ingredients, sourced from trusted suppliers around the world.",
  },
  {
    icon: Leaf,
    title: "Ethically Sourced",
    description:
      "We're committed to cruelty-free, sustainable practices across our entire supply chain.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Each product goes through rigorous testing to ensure it meets our uncompromising standards.",
  },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="About LuxeGlow"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>

        <div className="relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">
              Our Story
            </p>
            <h1 className="font-display text-4xl md:text-5xl">
              About LuxeGlow
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-luxe max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl mb-6">
              Redefining{" "}
              <span className="italic text-gradient-gold">Beauty</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2020, LuxeGlow was born from a simple belief: that luxury
              beauty should be accessible, ethical, and transformative. Our
              founder, inspired by the artistry of Parisian beauty houses and the
              innovation of Korean skincare, set out to create a brand that
              bridges both worlds.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Today, LuxeGlow stands at the intersection of science and artistry.
              Each product in our collection is the result of months of
              formulation, testing, and refinement — ensuring that every
              application delivers the luxury experience our customers deserve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card/50">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl">Our Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-8 bg-card border border-border/30"
              >
                <value.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-display text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-luxe max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">
              Our Mission
            </p>

            <h2 className="font-display text-3xl mb-6">
              Empowering Confidence Through{" "}
              <span className="italic text-gradient-gold">Beauty</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              We believe that beauty is more than skin deep. Our mission is to
              empower every individual to feel confident, radiant, and
              unapologetically themselves. Through innovative formulas,
              sustainable practices, and an unwavering commitment to quality,
              we're building a beauty revolution — one luxurious product at a
              time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
