import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/product";
import ProductGrid from "@/components/product/ProductGrid";
import heroImage from "@/assets/images/hero.jpg";

const categories = [
  { name: "Lips", count: 3 },
  { name: "Face", count: 4 },
  { name: "Eyes", count: 3 },
  { name: "Skincare", count: 2 },
];

const Home = () => {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="LuxeGlow luxury cosmetics" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>
        <div className="relative container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-body">Premium Beauty Collection</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
              Unveil Your{" "}
              <span className="text-gradient-gold italic">Radiance</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
              Luxury cosmetics crafted with the finest ingredients for the modern woman who demands nothing less than extraordinary.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="luxe" size="xl" asChild>
                <Link to="/shop">
                  Shop Collection <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline-luxe" size="xl" asChild>
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">Explore</p>
            <h2 className="font-display text-3xl md:text-4xl">Shop by Category</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/shop?category=${cat.name}`}
                  className="block group relative bg-card border border-border/30 p-8 md:p-10 text-center hover-lift"
                >
                  <h3 className="font-display text-lg mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.count} Products</p>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-padding bg-card/50">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">Customer Favorites</p>
              <h2 className="font-display text-3xl md:text-4xl">Bestsellers</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-primary hover:text-primary/80 transition-colors font-body">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>

          <ProductGrid products={bestsellers} />

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline-luxe" asChild>
              <Link to="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding">
        <div className="container-luxe">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">Our Philosophy</p>
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Where Science Meets{" "}
                <span className="italic text-gradient-gold">Luxury</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At LuxeGlow, we believe beauty should be both indulgent and intelligent. Each formula is a masterwork of premium ingredients, 
                ethically sourced and rigorously tested to deliver visible results.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From our signature 24K Gold Serum to our iconic Velvet Matte Lipstick, every product is designed to make you feel 
                as extraordinary as you look.
              </p>
              <Button variant="outline-luxe" asChild>
                <Link to="/about">Discover More</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/5] bg-card border border-border/30 overflow-hidden"
            >
              <img
                src={heroImage}
                alt="LuxeGlow brand story"
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-card/50 border-t border-border/30">
        <div className="container-luxe max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">Stay Connected</p>
            <h2 className="font-display text-3xl md:text-4xl mb-4">Join the LuxeGlow Circle</h2>
            <p className="text-muted-foreground mb-8">
              Be the first to know about new launches, exclusive offers, and beauty tips from our experts.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
