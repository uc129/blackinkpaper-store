"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export interface TabItem {
    label: string;
    value: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    defaultValue?: string;
    value?: string; // controlled mode
    onChange?: (value: string) => void;
}

export default function TabsSwitcher({
    tabs,
    defaultValue,
    value,
    onChange,
}: TabsProps) {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(
        defaultValue || tabs[0]?.value
    );

    const activeValue = isControlled ? value : internalValue;

    const setActive = (val: string) => {
        if (!isControlled) setInternalValue(val);
        onChange?.(val);
    };

    const activeIndex = tabs.findIndex((t) => t.value === activeValue);

    const tabRefs = useRef<(any)[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (activeIndex === -1) return;

        let newIndex = activeIndex;

        if (e.key === "ArrowRight") {
            newIndex = (activeIndex + 1) % tabs.length;
        }

        if (e.key === "ArrowLeft") {
            newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
        }

        if (e.key === "Home") newIndex = 0;
        if (e.key === "End") newIndex = tabs.length - 1;

        if (newIndex !== activeIndex) {
            setActive(tabs[newIndex].value);
            tabRefs.current[newIndex]?.focus();
        }
    };

    return (
        <div className="w-full">
            {/* Tab List */}
            <div
                role="tablist"
                aria-orientation="horizontal"
                onKeyDown={handleKeyDown}
                className="relative flex border-b border-neutral-800"
            >
                {tabs.map((tab, index) => {
                    const isActive = tab.value === activeValue;

                    return (
                        <button
                            key={tab.value}
                            ref={(el: any) => (tabRefs.current[index] = el)}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${tab.value}`}
                            id={`tab-${tab.value}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setActive(tab.value)}
                            className={`relative px-6 py-3 text-sm transition-colors ${isActive
                                ? "text-white"
                                : "text-neutral-500 hover:text-neutral-300"
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}

                {/* Animated Underline */}
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    className="absolute bottom-0 h-0.5 bg-white"
                    style={{
                        width: `${100 / tabs.length}%`,
                        left: `${(100 / tabs.length) * activeIndex}%`,
                    }}
                />
            </div>

            {/* Panels */}
            <div className="mt-8">
                {tabs.map((tab) =>
                    tab.value === activeValue ? (
                        <div
                            key={tab.value}
                            role="tabpanel"
                            id={`panel-${tab.value}`}
                            aria-labelledby={`tab-${tab.value}`}
                            className="focus:outline-none"
                        >
                            {tab.content}
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}