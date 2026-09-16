import Link from "next/link";

export function HomeArtistStory() {
  return (
    <section className="home-artist-story" aria-labelledby="artist-story-title">
      <div>
        <p>The artist</p>
        <h2 id="artist-story-title">
          Ria Mukharjee draws at the pace the stone asks for
        </h2>
      </div>
      <div>
        <p>
          She studied in Dubai and New Delhi, and both cities live somewhere in
          the work she makes today. Her illustrations are built on detail —
          intricate linework layered patiently, so that every piece rewards a
          long, close look and keeps offering something new the second and third
          time you come back to it. Kind and quietly attentive by nature, Ria
          brings that same care to her art, drawing each scene with the patience
          it asks for.
        </p>
        <div className="home-artist-story__actions">
          <Link
            href="/about"
            className="editorial-pill editorial-pill--outline"
          >
            Read her story
          </Link>
          <Link
            href="/contact"
            className="editorial-pill editorial-pill--solid"
          >
            Commission a piece
          </Link>
        </div>
      </div>
    </section>
  );
}
