import Image from "next/image";




export default function Hero() {

    return (
        <div className="relative h-100 md:h-125 lg:h-200 rounded-sm overflow-hidden">
            <Image src="/assets/hero/hero1.jpg" width={800} height={800} alt="Hero Image" loading="eager" className="w-full h-auto object-cover object-center" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-5">
                <div className="h-1/2 w-2/3 relative">
                    <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold absolute top-1/8 left-1/8">BlackInk Illustration</h1>
                </div>
            </div>
        </div>
    )

}