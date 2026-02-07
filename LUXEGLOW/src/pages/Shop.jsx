import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "@/data/product";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        );
        break;
    }

    return result;
  }, [selectedCategories, priceRange, sortBy, searchQuery]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 150]);
    setSortBy("default");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 150 ||
    searchQuery.trim() !== "";

  const FiltersContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <h4 className="text-xs tracking-widest uppercase text-foreground mb-3">
          Search
        </h4>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products…"
          className="w-full bg-muted text-sm text-foreground placeholder:text-muted-foreground px-3 py-2 border border-border focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs tracking-widest uppercase text-foreground mb-3">
          Category
        </h4>
        <div className="space-y-2.5">
          {categories
            .filter((c) => c !== "All")
            .map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <Checkbox
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() => toggleCategory(cat)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat}
                </span>
              </label>
            ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs tracking-widest uppercase text-foreground mb-3">
          Price Range
        </h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={150}
          step={5}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground"
        >
          <X className="w-3 h-3 mr-1" /> Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="section-padding">
      <div className="container-luxe">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Shop
          </h1>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FiltersContent />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-1 w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="bg-background border-border w-72 p-6"
                >
                  <h3 className="font-display text-lg mb-6">
                    Filters
                  </h3>
                  <FiltersContent />
                </SheetContent>
              </Sheet>

              <div className="hidden lg:block" />

              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v)}
              >
                <SelectTrigger className="w-48 bg-background border-border text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-desc">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat} <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            <ProductGrid
              products={filteredProducts}
              emptyMessage="No products match your filters. Try adjusting your search."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
