import Image from "next/image";




export default function Hero() {

    return (
        <div className="relative mx-auto h-[58vh] min-h-[420px] max-h-[760px] overflow-hidden">
            <Image
                src="/assets/hero/hero1.jpg"
                fill
                alt="BlackInkPaper hero artwork"
                priority
                loading="eager"
                className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/15 flex items-center justify-center p-8">
                <h1 className="font-display text-center text-5xl md:text-7xl lg:text-8xl font-bold leading-none text-white">
                    BlackInkPaper Illustration
                </h1>
            </div>
        </div>
    )

}
