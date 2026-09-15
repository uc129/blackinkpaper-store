"use client";

import { motion } from "framer-motion";
import { NavLink } from "../components/_ui/primitives/links";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative mt-20 overflow-hidden bg-[var(--footer-ink)] text-[#e9e4dc]"
        >
            <div className="layout-navbar relative z-10">

                <div className="grid grid-cols-12 gap-8 py-14 md:py-20">

                    {/* Brand */}
                    <div className="col-12 lg:col-6 pr-0 md:pr-12 pb-12 md:pb-0">
                        <h2 className="font-display text-3xl text-white mb-6">
                            BlackInkPaper Illustration
                        </h2>
                        <p className="text-base leading-relaxed text-[#d0c8bf] max-w-sm">
                            A curated space for handmade artworks.
                            Where texture, silence, and human touch converge.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="col-12 lg:col-3 px-0 md:px-12 py-12 md:py-0">
                        <h3 className="font-display text-2xl text-white mb-8">
                            Explore
                        </h3>

                        <ul className="space-y-4">
                            {[
                                ["Store", "/store"],
                                ["Portfolio", "/works"],
                                ["About", "/about"],
                                ["Contact", "/contact"],
                            ].map(([item, href]) => (
                                <li key={item}>
                                    <NavLink
                                        text={item}
                                        href={href}
                                        linkSize="sm"
                                        underline={true}
                                        className="text-[#d0c8bf] hover:text-white"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Guestbook */}
                    <div className="col-12 lg:col-3 pl-0 md:pl-12 pt-12 md:pt-0">
                        <h3 className="font-display text-2xl text-white mb-8">
                            Subscribe
                        </h3>

                        <form className="flex w-full max-w-xs flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-[#f6f2ea] border-0 px-5 py-4 text-sm text-[var(--ink)] outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="w-full rounded-full bg-[#d8d4cb] px-7 py-4 text-sm font-semibold text-[var(--ink)] transition hover:bg-white"
                            >
                                Sign Up
                            </button>
                            <p className="text-sm text-[#c8c0b8]">We respect your privacy.</p>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#b7aea6] gap-4">

                    <span>
                        © {new Date().getFullYear()} BlackPaper Illustration. All rights reserved.
                    </span>

                    <div className="flex gap-6">
                        <NavLink
                            text="Instagram"
                            href="#"
                            linkSize="xs"
                            underline={true}
                            className="text-[#d0c8bf] hover:text-white"
                        />
                        <NavLink
                            text="Twitter"
                            href="#"
                            linkSize="xs"
                            underline={true}
                            className="text-[#d0c8bf] hover:text-white"
                        />
                    </div>

                </div>
            </div>
        </motion.footer>
    );
}
