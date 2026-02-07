import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="section-padding container-luxe text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-2xl mb-2">
            Your Wishlist is Empty
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Save your favorite products for later.
          </p>
          <Button variant="luxe" asChild>
            <Link to="/shop">Explore Products</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Wishlist
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            {wishlistItems.length} saved item
            {wishlistItems.length !== 1 ? "s" : ""}
          </p>
          <ProductGrid products={wishlistItems} />
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;
