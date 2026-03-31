import React, { Children, cloneElement, FC, ReactElement, useEffect, useRef, useState } from "react";
import './tabs.scss';

export interface props {
    value: number;
    onChange: (index: number) => void;
    children: ReactElement[];
}

export const Tabs: FC<props> = ({
                                    value,
                                    onChange,
                                    children,
                                }) => {
    const tabsRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

    // جدا کردن Tab ها و TabContent ها از children
    const tabs = Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === Tab
    );

    const contents = Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === TabContent
    );

    const checkScroll = () => {
        if (!tabsRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    };

    const scrollToSelectedTab = () => {
        if (!tabsRef.current || !tabRefs.current[value]) return;

        const container = tabsRef.current;
        const selectedTab = tabRefs.current[value];

        if (!selectedTab) return;

        const containerRect = container.getBoundingClientRect();
        const tabRect = selectedTab.getBoundingClientRect();

        const scrollLeft = tabRect.left - containerRect.left + container.scrollLeft;

        const targetScroll = scrollLeft - (container.clientWidth / 2) + (selectedTab.clientWidth / 2);

        container.scrollTo({
            left: Math.max(0, targetScroll),
            behavior: "smooth",
        });
    };

    const checkIfTabNeedsScroll = () => {
        if (!tabsRef.current || !tabRefs.current[value]) return;

        const container = tabsRef.current;
        const selectedTab = tabRefs.current[value];

        if (!selectedTab) return;

        const containerRect = container.getBoundingClientRect();
        const tabRect = selectedTab.getBoundingClientRect();

        const isTabVisible =
            tabRect.left >= containerRect.left &&
            tabRect.right <= containerRect.right;

        if (!isTabVisible) {
            scrollToSelectedTab();
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            checkIfTabNeedsScroll();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [value]);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);

        const handleResize = () => {
            checkIfTabNeedsScroll();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", checkScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!tabsRef.current) return;
        const scrollAmount = tabsRef.current.clientWidth / 2;
        tabsRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });

        setTimeout(checkIfTabNeedsScroll, 300);
    };

    return (
        <div className="naria-tabs-container">
            <div className="naria-tabs">
                <button
                    type="button"
                    className="scroll-btn left"
                    disabled={!canScrollLeft}
                    onClick={() => scroll("left")}
                >
                    ◀
                </button>

                <div
                    className="tabs-wrapper"
                    ref={tabsRef}
                    onScroll={checkScroll}
                    onTouchMove={checkScroll}
                >
                    {Children.map(tabs, (child, index) => {
                        if (React.isValidElement(child)) {
                            return cloneElement(child, {
                                ref: (el: HTMLDivElement | null) => {
                                    tabRefs.current[index] = el;
                                },
                                selected: value === index,
                                onClick: () => onChange(index),
                            } as any);
                        }
                        return child;
                    })}
                </div>

                <button
                    type="button"
                    className="scroll-btn right"
                    disabled={!canScrollRight}
                    onClick={() => scroll("right")}
                >
                    ▶
                </button>
            </div>

            {/* نمایش محتوای تب انتخاب شده */}
            <div className="tab-contents">
                {contents.map((content, index) => {
                    if (React.isValidElement(content)) {
                        return cloneElement(content, {
                            key: index,
                            value: value,
                        } as any);
                    }
                    return content;
                })}
            </div>
        </div>
    );
};

interface TabProps {
    label: string;
    selected?: boolean;
    onClick?: () => void;
    ref?: React.Ref<HTMLDivElement>;
}

export const Tab = React.forwardRef<HTMLDivElement, TabProps>(
    ({ label, selected, onClick }, ref) => {
        return (
            <div
                ref={ref}
                className={`tab ${selected ? "active" : ""}`}
                onClick={onClick}
            >
                {label}
            </div>
        );
    }
);

interface TabContentProps {
    label: string;
    index: number;
    value?: number;
    children: React.ReactNode;
}

export const TabContent: FC<TabContentProps> = ({
                                                    label,
                                                    index,
                                                    value,
                                                    children
                                                }) => {
    return (
        <div
            className={`tab-content ${value === index ? "active" : ""}`}
            role="tabpanel"
            hidden={value !== index}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <div className="tab-content-inner">
                    {children}
                </div>
            )}
        </div>
    );
};

Tabs.displayName = 'Tabs';