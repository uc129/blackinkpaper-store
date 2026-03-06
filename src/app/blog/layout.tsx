import "../globals.css";
import BlogNavbar from "./navbar";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-text-primary">
            <BlogNavbar />
            <div className="layout">
                {children}
            </div>
        </div>
    );
}


