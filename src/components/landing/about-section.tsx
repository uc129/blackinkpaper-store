import Section from "../_ui/containers/base/section";
import {ContainerSimpleInLine} from "../_ui/containers/container-simple";

import { ImageWithFallback } from "../_ui/images/imagewithfallback";
import { Button } from "../_ui/primitives/button";
import { Heading } from "../_ui/primitives/heading";
import { mockPicSumImages } from "@/mocks/images/picsum";


export default function AboutSection() {

    return (
        <Section className=" ">

           <ContainerSimpleInLine className="justify-between">
             <div className="col-12 2xl:col-5">

                <ImageWithFallback src={mockPicSumImages[0]}
                    alt="Artist Image"
                    width={1400}
                    height={800}
                    className="rounded-lg object-cover object-center max-w-xl" />
            </div>

            <div className="col-12 2xl:col-7 flex flex-col gap-8 items-start w-fit">
                <div className="flex flex-col gap-8 items-start">
                    <Heading size="titleSmall" className="font-bold">About The Artist</Heading>
                    <p className="max-w-2xl mx-auto text-lg text-left text-gray-700 " >
                        Utkarsh Chaudhary, the creative force behind BlackInk Illustration,
                        is a passionate artist specializing in digital art and illustration.
                        With a keen eye for detail and a love for storytelling, Utkarsh brings imagination to life through his captivating artwork.His unique style combines vibrant colors, intricate linework, and a touch of whimsy, creating pieces that resonate with art enthusiasts worldwide.Whether it's character design, concept art, or original creations, Utkarsh's work reflects his dedication to pushing artistic boundaries and sharing his vision with the world.
                    </p>
                </div>
                <Button variant={'pill'} size={'pill_lg'} href="/about"> Learn More </Button>
            </div>
            </ContainerSimpleInLine>

        </Section>
    )
}   