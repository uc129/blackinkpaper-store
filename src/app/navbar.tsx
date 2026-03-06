'use client';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, GalleryHorizontalEnd, Cog } from 'lucide-react';
import { Button } from '@/components/_ui/primitives/button';
import { NavLink } from '@/components/_ui/primitives/links';


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        const nav = document.querySelector('nav');
        nav?.classList.toggle('hidden', open);

        return () => {
            document.body.style.overflow = ''
            nav?.classList.remove('hidden'); // Ensure nav is visible again when closing
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const f = overlayRef.current?.querySelectorAll<HTMLElement>('a,button'); f?.[0]?.focus();
        const h = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
            if (e.key === 'Tab' && f && f.length) {
                const i = [...f].indexOf(document.activeElement as HTMLElement);
                e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
            }
        };
        document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h)
    }, [open]);

    return (<>
        <nav className="sticky top-0 z-40  backdrop-blur-md bg-background/80 supports-backdrop-filter:bg-background/60 transition-all duration-300">
            <div className="layout-navbar flex items-center justify-between">
                <NavLink href="/" text='BLACKINKPAPER ILLUSTRATION' linkSize='xl' boldVariant='bold' />

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex gap-8">
                        <NavLink text="Store" href="/store" sup='1' />
                        <NavLink text="Black & White" href="/works/categories/black-and-white" />
                        <NavLink text="Cityscapes" href="/works/categories/cityscapes" />
                        <NavLink text="Commissions" href="/works/categories/commissions" />
                        <NavLink text="Travel Art" href="/works/categories/travel-art" />
                        <NavLink text="About" href="/about" />
                        <NavLink text="Contact" href="/contact" />
                        <NavLink text="Cart" href="/cart" />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="icon"><GalleryHorizontalEnd size={18} /></Button>
                        <Button variant="icon" className="md:hidden" onClick={() => setOpen(true)}>
                            <Menu size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>


        {open && (
            <div className="fixed inset-0 z-50 bg-background">
                <div className="layout py-6 flex items-center justify-between">
                    <div className="font-bold tracking-wider text-xl">THE CANVAS BLOG.</div>
                    <Button variant="icon" onClick={() => setOpen(false)} aria-label="Close menu">
                        <X size={20} />
                    </Button>
                </div>

                <div className="layout mt-12">
                    <div className="flex flex-col gap-6 text-h3">
                        <NavLink text="Trending" href="/blog/trending" />
                        <NavLink text="Art" href="/blog/art" />
                        <NavLink text="Design" href="/blog/design" />
                        <NavLink text="Music" href="/blog/music" />
                        <NavLink text="Podcast" href="/blog/podcast" sup="V2" />
                    </div>
                </div>
            </div>
        )}


    </>);
};

export default Navbar;
