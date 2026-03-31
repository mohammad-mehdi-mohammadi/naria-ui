import React, {Children, cloneElement, FC, ReactElement, useEffect, useRef, useState} from "react";
import './tabs.scss';

export interface props {
    value: number;
    onChange: (index: number) => void;
    children: ReactElement[];
    classNames?: {
        root?: string;
        disabled?: string;
        input?: string;
    };
}

export const Tabs: FC<props> = ({
                                    value,
                                    onChange,
                                    children,
                                }) => {
    const tabsRef = useRef<HTMLDivElement>(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [showScrollButtons, setShowScrollButtons] = useState(false);
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isRTL, setIsRTL] = useState(false);

    const tabs = Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === Tab
    );

    const contents = Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === TabContent
    );

    // تشخیص RTL
    const checkRTL = () => {
        const dir = document.documentElement.getAttribute('dir') ||
            document.body.getAttribute('dir');
        setIsRTL(dir === 'rtl');
    };

    // دریافت مقدار اسکرول فعلی به صورت نرمال شده
    const getNormalizedScrollLeft = () => {
        if (!tabsRef.current) return 0;

        if (isRTL) {
            // در RTL، scrollLeft می‌تواند منفی باشد
            // ما آن را به مقدار مثبت تبدیل می‌کنیم
            const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
            return Math.abs(scrollLeft);
        }
        return tabsRef.current.scrollLeft;
    };

    const checkScroll = () => {
        if (!tabsRef.current) return;
        const { scrollWidth, clientWidth } = tabsRef.current;
        const hasScroll = scrollWidth > clientWidth;

        setShowScrollButtons(hasScroll);

        if (hasScroll) {
            const currentScroll = getNormalizedScrollLeft();
            const maxScroll = scrollWidth - clientWidth;

            setCanScrollPrev(currentScroll > 0);
            setCanScrollNext(currentScroll < maxScroll - 1);
        } else {
            setCanScrollPrev(false);
            setCanScrollNext(false);
        }
    };

    const scrollToSelectedTab = () => {
        if (!tabsRef.current || !tabRefs.current[value]) return;

        const container = tabsRef.current;
        const selectedTab = tabRefs.current[value];
        console.log("targetScroll")
        if (!selectedTab) return;

        const containerRect = container.getBoundingClientRect();
        const tabRect = selectedTab.getBoundingClientRect();

        let targetScroll;

        if (isRTL) {
            const scrollDistance = containerRect.right - tabRect.right;
            targetScroll = scrollDistance + getNormalizedScrollLeft();
        } else {
            const scrollDistance = tabRect.left - containerRect.left;
            targetScroll = scrollDistance + container.scrollLeft;
        }

        targetScroll = targetScroll - (container.clientWidth / 2) + (selectedTab.clientWidth / 2);
        targetScroll = Math.max(0, Math.min(targetScroll, container.scrollWidth - container.clientWidth));

        container.scrollTo({
            left: isRTL ? -targetScroll : targetScroll,
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

        let isTabVisible;

        if (isRTL) {
            isTabVisible = tabRect.right <= containerRect.right &&
                tabRect.left >= containerRect.left;
        } else {
            isTabVisible = tabRect.left >= containerRect.left &&
                tabRect.right <= containerRect.right;
        }

        if (!isTabVisible) {
            scrollToSelectedTab();
        }
    };

    useEffect(() => {
        checkRTL();

        const observer = new MutationObserver(() => {
            checkRTL();
            setTimeout(() => {
                checkScroll();
                checkIfTabNeedsScroll();
            }, 0);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['dir']
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['dir']
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            checkIfTabNeedsScroll();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [value, isRTL]);

    useEffect(() => {
        const handleResize = () => {
            checkScroll();
            requestAnimationFrame(() => {
                checkIfTabNeedsScroll();
            });
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [isRTL, value]);

    const scrollPrev = () => {
        if (!tabsRef.current) return;
        const scrollAmount = tabsRef.current.clientWidth / 2;
        const currentScroll = getNormalizedScrollLeft();
        const newScroll = Math.max(0, currentScroll - scrollAmount);

        tabsRef.current.scrollTo({
            left: isRTL ? -newScroll : newScroll,
            behavior: "smooth",
        });
    };

    const scrollNext = () => {
        if (!tabsRef.current) return;
        const scrollAmount = tabsRef.current.clientWidth / 2;
        const currentScroll = getNormalizedScrollLeft();
        const maxScroll = tabsRef.current.scrollWidth - tabsRef.current.clientWidth;
        const newScroll = Math.min(maxScroll, currentScroll + scrollAmount);

        tabsRef.current.scrollTo({
            left: isRTL ? -newScroll : newScroll,
            behavior: "smooth",
        });
    };

    return (
        <div className="naria-tabs" dir={isRTL ? "rtl" : "ltr"}>
            <div className="naria-tabs__container">
                {showScrollButtons && (
                    <button
                        type="button"
                        className="naria-tabs__scroll-btn naria-tabs__scroll-btn--prev"
                        disabled={!canScrollPrev}
                        onClick={scrollPrev}
                    >
                        {isRTL ? '▶' : '◀'}
                    </button>
                )}
                <div
                    className="naria-tabs__wrapper"
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
                {showScrollButtons && (
                    <button
                        type="button"
                        className="naria-tabs__scroll-btn naria-tabs__scroll-btn--next"
                        disabled={!canScrollNext}
                        onClick={scrollNext}
                    >
                        {isRTL ? '◀' : '▶'}
                    </button>
                )}
            </div>

            <div className="naria-tabs__contents">
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
    ({label, selected, onClick}, ref) => {
        return (
            <div
                ref={ref}
                className={`naria-tabs__tab ${selected ? "naria-tabs__tab--active" : ""}`}
                onClick={onClick}
            >
                {label}
            </div>
        );
    }
);

interface TabContentProps {
    index: number;
    value?: number;
    children: React.ReactNode;
}

export const TabContent: FC<TabContentProps> = ({
                                                    index,
                                                    value,
                                                    children
                                                }) => {
    return (
        <div
            className="naria-tabs__content"
            role="tabpanel"
            hidden={value !== index}
        >
            {value === index && (
                <div className="naria-tabs__content__inner">
                    {children}
                </div>
            )}
        </div>
    );
};

Tabs.Tab = Tab;
Tabs.TabContent = TabContent;
Tabs.displayName = 'Tabs';