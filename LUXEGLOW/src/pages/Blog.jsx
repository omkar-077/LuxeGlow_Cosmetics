import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "The Art of the Perfect Red Lip",
    excerpt:
      "Discover the secrets to finding and applying the ideal red lipstick shade for your skin tone.",
    date: "Jan 15, 2026",
    category: "Tutorials",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Why Gold-Infused Skincare is the Future",
    excerpt:
      "Exploring the science behind 24K gold in beauty products and why it's more than just luxury.",
    date: "Jan 8, 2026",
    category: "Skincare Science",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Sustainable Beauty: Our Commitment",
    excerpt:
      "How LuxeGlow is pioneering ethical practices in the luxury cosmetics industry.",
    date: "Dec 20, 2025",
    category: "Sustainability",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Winter Skincare Essentials",
    excerpt:
      "Keep your skin hydrated and glowing through the cold months with our expert guide.",
    date: "Dec 12, 2025",
    category: "Skincare Tips",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Behind the Scenes: Creating Our Eye Palette",
    excerpt:
      "A look into the 18-month journey of developing the Midnight Smoky Eye Palette.",
    date: "Nov 28, 2025",
    category: "Behind the Scenes",
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "5 Makeup Trends to Watch in 2026",
    excerpt:
      "From glass skin to bold lips — the trends that will define beauty this year.",
    date: "Nov 15, 2025",
    category: "Trends",
    readTime: "5 min read",
  },
];

const Blog = () => {
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
            Beauty Journal
          </p>
          <h1 className="font-display text-3xl md:text-4xl">
            The LuxeGlow Blog
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            Tips, trends, and behind-the-scenes stories from the world of luxury
            beauty.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card border border-border/30 hover-lift"
            >
              <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 luxe-gradient opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-lg text-foreground/30">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary font-body">
                    {post.category}
                  </span>

                  <span className="text-muted-foreground/30">·</span>

                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>

                <h2 className="font-display text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-primary font-body">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
