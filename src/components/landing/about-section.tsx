import Section from "../_ui/containers/base/section";
import {ContainerSimpleInLine} from "../_ui/containers/container-simple";

import { Button } from "../_ui/primitives/button";
import { Heading } from "../_ui/primitives/heading";


export default function AboutSection() {

    return (
        <Section className=" ">

           <ContainerSimpleInLine className="justify-between gap-12">
             <div className="col-12 2xl:col-5">

                <div className="flex aspect-[4/3] max-w-xl items-center justify-center bg-[var(--paper-deep)] text-sm text-[var(--muted)]">
                    Artist image not configured
                </div>
            </div>

            <div className="col-12 2xl:col-7 flex flex-col gap-8 items-start w-fit">
                <div className="flex flex-col gap-8 items-start">
                    <Heading size="titleSmall" className="font-display font-bold text-[var(--ink)]">A bit about the artist...</Heading>
                    <p className="max-w-2xl mx-auto text-lg leading-relaxed text-left text-[var(--ink-soft)]" >
                        Ria Mukharjee is the artist behind BlackInk Illustration. She studied in
                        Dubai and New Delhi, and both cities live somewhere in the work she makes today.
                        Her illustrations are built on detail &mdash; intricate linework layered patiently,
                        so that every piece rewards a long, close look and keeps offering something new
                        the second and third time you come back to it. Kind and quietly attentive by nature,
                        Ria brings that same care to her art, drawing each scene with the patience it asks for.
                    </p>
                </div>
                <Button variant={'pill'} size={'pill_lg'} href="/about"> Learn More </Button>
            </div>
            </ContainerSimpleInLine>

        </Section>
    )
}
