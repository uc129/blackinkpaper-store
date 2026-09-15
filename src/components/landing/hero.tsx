import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative mx-auto h-[58vh] min-h-[420px] max-h-[760px] overflow-hidden bg-[var(--paper-deep)]">
      <Image
        src="/assets/hero/blue-relief-hero.jpeg"
        fill
        alt="Blue-toned illustration of classical Indian figures gathered around a reclining musician"
        preload
        sizes="100vw"
        className="object-cover object-[center_48%] brightness-75 contrast-110 saturate-90"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 p-6 sm:p-8">
        <h1 className="text-center font-display text-5xl font-bold leading-none text-white md:text-7xl lg:text-8xl">
          BlackInkPaper Illustration
        </h1>
      </div>
    </div>
  );
}
