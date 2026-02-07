import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { formatPrice, calculateDiscount } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/product/ProductGrid";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="section-padding container-luxe text-center">
        <h1 className="font-display text-2xl mb-4">Product Not Found</h1>
        <Button variant="outline-luxe" asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="section-padding">
      <div className="container-luxe">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-[3/4] bg-card border border-border/30 overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-2 font-body">
              {product.category}
            </p>

            <h1 className="font-display text-3xl md:text-4xl mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-body font-semibold">
                {formatPrice(product.price)}
              </span>

              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-body font-semibold px-2 py-0.5 bg-destructive text-destructive-foreground">
                    -{calculateDiscount(product.price, product.originalPrice)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-widest uppercase px-2.5 py-1 border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {product.inStock ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">
                    Quantity
                  </span>

                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-12 text-center text-sm font-body">
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="luxe"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      toggleWishlist(product);
                      toast.success(
                        wishlisted
                          ? "Removed from wishlist"
                          : "Added to wishlist"
                      );
                    }}
                    className={cn(wishlisted && "border-accent text-accent")}
                  >
                    <Heart
                      className={cn("w-4 h-4", wishlisted && "fill-current")}
                    />
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground border border-border px-4 py-3 text-center">
                Currently out of stock
              </p>
            )}
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl mb-8">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
