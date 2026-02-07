const Loader = () => (
  <div className="flex items-center justify-center min-h-[300px]">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-2 border-muted" />
      <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  </div>
);

export default Loader;
