"use client";

import { motion } from "framer-motion";
import { NavLink } from "./_ui/primitives/links";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative bg-[#0b0b0d] text-neutral-400 border-t border-neutral-800 overflow-hidden"
        >
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="layout-navbar relative z-10">

                <div className="grid grid-cols-12 gap-8 pt-6">

                    {/* Brand */}
                    <div className="col-12 lg:col-6 pr-0 md:pr-12 pb-12 md:pb-0">
                        <h2 className="text-xl tracking-[0.25em] text-white mb-6">
                            BLACKINKPAPER ILLUSTRATION
                        </h2>
                        <p className="text-sm leading-relaxed text-neutral-500 max-w-sm">
                            A curated space for handmade artworks.
                            Where texture, silence, and human touch converge.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="col-12 lg:col-3 px-0 md:px-12 py-12 md:py-0">
                        <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-8">
                            Explore
                        </h3>

                        <ul className="space-y-4">
                            {["Original Works", "Gallery", "About", "Contact"].map((item) => (
                                <li key={item}>
                                    <NavLink
                                        text={item}
                                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                        linkSize="sm"
                                        underline={true}
                                        className="text-neutral-400 hover:text-white"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Guestbook */}
                    <div className="col-12 lg:col-3 pl-0 md:pl-12 pt-12 md:pt-0">
                        <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-8">
                            Join the Guestbook
                        </h3>

                        <form className="flex flex-col gap-4 max-w-xs">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-transparent border-b border-neutral-700 focus:border-white outline-none py-2 text-sm transition-colors"
                            />
                            <button
                                type="submit"
                                className="text-left text-sm text-neutral-500 hover:text-white transition"
                            >
                                Receive exhibition updates →
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 gap-4">

                    <span>
                        © {new Date().getFullYear()} BlackPaper Illustration. All rights reserved.
                    </span>

                    <div className="flex gap-6">
                        <NavLink
                            text="Instagram"
                            href="#"
                            linkSize="xs"
                            underline={true}
                            className="text-neutral-400 hover:text-white"
                        />
                        <NavLink
                            text="Twitter"
                            href="#"
                            linkSize="xs"
                            underline={true}
                            className="text-neutral-400 hover:text-white"
                        />
                    </div>

                </div>
            </div>
        </motion.footer>
    );
}