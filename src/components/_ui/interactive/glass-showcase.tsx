export function GlassShowcase({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-sky-300">
      {/* Using the 'animate-blob' class defined in globals.css.
          We can also use Tailwind's arbitrary values for delays 
      */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500/30 rounded-full filter blur-3xl animate-blob [animation-delay:2s]" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/30 rounded-full filter blur-3xl animate-blob [animation-delay:4s]" />

      <div className="relative z-10 w-full overflow-hidden rounded-sm">
        {children}
      </div>
    </div>
  );
}