import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="home-editorial-hero">
      <Image
        src="/assets/hero/blue-relief-hero.jpeg"
        fill
        alt="Blue-toned illustration of classical Indian figures gathered around a reclining musician"
        preload
        sizes="100vw"
        className="home-editorial-hero__image"
      />
      <div className="home-editorial-hero__shade" aria-hidden="true" />
      <div className="home-editorial-hero__content">
        <div>
          <p>Originals · one of one</p>
          <h1>
            Drawings made slowly,
            <br />
            in ink and graphite
          </h1>
        </div>
        <div className="home-editorial-hero__aside">
          <p>
            Ria Mukharjee&apos;s hand-drawn studies of temple stone, doorways
            and processions.
          </p>
          <Link href="/store/shop/category/originals">See the originals</Link>
        </div>
      </div>
    </section>
  );
}
