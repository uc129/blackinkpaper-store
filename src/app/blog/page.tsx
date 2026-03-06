'use client';

import { TvIcon, FlagIcon } from "lucide-react";
import { Button } from "../../components/_ui/primitives/button";
import { Heading } from "../../components/_ui/primitives/heading";


export default function BlogLandingPage() {
    return (
        <div className="min-h-screen">

            <section className="section grid items-end gap-8 2xl:gap-0">

                <Heading size="display" className="region-9 2xl:region-9 grid">
                    <span>THE</span><span>CANVAS</span>
                </Heading>

                <Heading size="displayCaption" className="region-2 2xl:region-2 ml-4 2xl:-ml-4">
                    Blog about music, art and design
                </Heading>

                <div className="h-1/2 ml-4 md:ml-8 2xl:ml-0 flex items-start py-4 justify-end gap-4 ">
                    <Button variant={"icon"}> <TvIcon /></Button>
                    <Button variant={'icon'}> <FlagIcon /></Button>
                </div>
            </section>



            <section className="section grid debug-grid">
                <article className="region-content">
                    Main article
                </article>

                <aside className="region-rail">
                    Sidebar
                </aside>
            </section>

        </div>
    );
}
