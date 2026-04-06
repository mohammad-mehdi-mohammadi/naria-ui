import React, {
    Children,
    cloneElement,
    FC,
    ReactNode,
    useEffect,
    useRef,
    useState
} from "react";
import AngleRight from '../../assets/icons/angle-right.svg?react';
import './tabs.scss';

export interface TabsProps {
    value: number;
    onChange: (index: number) => void;
    children: ReactNode;
    prevIcon?: ReactNode | string;
    nextIcon?: ReactNode | string;
    classNames?: {
        root?: string;
        prev?: string;
        next?: string;
        tabWrapper?: string;
        contentWrapper?: string;
    };
}

const TabsBase: FC<TabsProps> = ({value, onChange, children, prevIcon, nextIcon, classNames}) => {
    const tabsRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [showScrollButtons, setShowScrollButtons] = useState(false);
    const [isRTL, setIsRTL] = useState(false);

    const tabs = Children.toArray(children).filter(
        (child): child is React.ReactElement => {
            if (!React.isValidElement(child)) return false;
            const childType = child.type as any;
            return childType.displayName === 'Tab';
        }
    );

    const contents = Children.toArray(children).filter(
        (child): child is React.ReactElement => {
            if (!React.isValidElement(child)) return false;
            const childType = child.type as any;
            return childType.displayName === 'TabContent';
        }
    );

    const checkRTL = () => {
        const dir = document.documentElement.getAttribute('dir') ||
            document.body.getAttribute('dir');
        setIsRTL(dir === 'rtl');
    };

    const getNormalizedScrollLeft = () => {
        if (!tabsRef.current) return 0;
        return isRTL ? Math.abs(tabsRef.current.scrollLeft) : tabsRef.current.scrollLeft;
    };

    const checkScroll = () => {
        if (!tabsRef.current) return;
        const {scrollWidth, clientWidth} = tabsRef.current;
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
        if (!selectedTab) return;

        const containerRect = container.getBoundingClientRect();
        const tabRect = selectedTab.getBoundingClientRect();

        let targetScroll = isRTL
            ? containerRect.right - tabRect.right + getNormalizedScrollLeft()
            : tabRect.left - containerRect.left + container.scrollLeft;

        targetScroll = targetScroll - container.clientWidth / 2 + selectedTab.clientWidth / 2;
        targetScroll = Math.max(0, Math.min(targetScroll, container.scrollWidth - container.clientWidth));

        container.scrollTo({left: isRTL ? -targetScroll : targetScroll, behavior: "smooth"});
    };

    const checkIfTabNeedsScroll = () => {
        if (!tabsRef.current || !tabRefs.current[value]) return;
        const container = tabsRef.current;
        const selectedTab = tabRefs.current[value];
        if (!selectedTab) return;

        const containerRect = container.getBoundingClientRect();
        const tabRect = selectedTab.getBoundingClientRect();

        const isTabVisible = isRTL
            ? tabRect.right <= containerRect.right && tabRect.left >= containerRect.left
            : tabRect.left >= containerRect.left && tabRect.right <= containerRect.right;

        if (!isTabVisible) scrollToSelectedTab();
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

        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['dir']});
        observer.observe(document.body, {attributes: true, attributeFilter: ['dir']});

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(checkIfTabNeedsScroll, 100);
        return () => clearTimeout(timeoutId);
    }, [value, isRTL]);

    useEffect(() => {
        const handleResize = () => {
            checkScroll();
            requestAnimationFrame(checkIfTabNeedsScroll);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isRTL, value]);

    const scrollPrev = () => {
        if (!tabsRef.current) return;
        const scrollAmount = tabsRef.current.clientWidth / 2;
        const newScroll = Math.max(0, getNormalizedScrollLeft() - scrollAmount);
        tabsRef.current.scrollTo({left: isRTL ? -newScroll : newScroll, behavior: "smooth"});
    };

    const scrollNext = () => {
        if (!tabsRef.current) return;
        const scrollAmount = tabsRef.current.clientWidth / 2;
        const maxScroll = tabsRef.current.scrollWidth - tabsRef.current.clientWidth;
        const newScroll = Math.min(maxScroll, getNormalizedScrollLeft() + scrollAmount);
        tabsRef.current.scrollTo({left: isRTL ? -newScroll : newScroll, behavior: "smooth"});
    };

    return (
        <div className={`naria-tabs ${classNames?.root || ''}`} data-class-prop="root">
            <div className="naria-tabs__container">
                {showScrollButtons && (
                    <button
                        type="button"
                        className={`naria-tabs__scroll-btn naria-tabs__scroll-btn--prev ${classNames?.prev || ''}`}
                        data-class-prop="prev"
                        disabled={!canScrollPrev}
                        onClick={scrollPrev}
                    >
                        {prevIcon ? prevIcon : (
                            <AngleRight className={`naria-tabs__scroll-btn__arrow ${!isRTL ? 'naria-tabs__scroll-btn__arrow--rotate' : ''}`} />
                        )}
                    </button>
                )}
                <div
                    className={`naria-tabs__tab-wrapper ${classNames?.tabWrapper || ''}`}
                    data-class-prop="tabWrapper"
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
                        className={`naria-tabs__scroll-btn naria-tabs__scroll-btn--next ${classNames?.next || ''}`}
                        data-class-prop="next"
                        disabled={!canScrollNext}
                        onClick={scrollNext}
                    >
                        {nextIcon ? nextIcon : (
                            <AngleRight className={`naria-tabs__scroll-btn__arrow ${isRTL ? 'naria-tabs__scroll-btn__arrow--rotate' : ''}`} />
                        )}
                    </button>
                )}
            </div>

            <div className={`naria-tabs__content-wrapper ${classNames?.contentWrapper || ''}`}
                 data-class-prop="contentWrapper">
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
    classNames?: { tab?: string; active?: string };
}

export const Tab = React.forwardRef<HTMLDivElement, TabProps>(({label, selected, onClick, classNames}, ref) => (
    <div
        ref={ref}
        className={`naria-tabs__tab ${selected ? "naria-tabs__tab--active" : ""} ${classNames?.tab || ''} ${classNames?.active || ''}`}
        data-class-prop="tab"
        data-class-prop-active="active"
        onClick={onClick}
    >
        {label}
    </div>
));
Tab.displayName = 'Tab';

interface TabContentProps {
    index: number;
    value?: number;
    children: React.ReactNode;
    classNames?: { content?: string; inner?: string; active?: string };
}

export const TabContent: FC<TabContentProps> = ({index, value, children, classNames}) => (
    <div
        className={`naria-tabs__content ${classNames?.content || ''} ${value === index ? (classNames?.active || '') : ''}`}
        data-class-prop="content"
        data-class-prop-active="active"
        role="tabpanel"
        hidden={value !== index}
    >
        {value === index && <div className={`naria-tabs__content-inner ${classNames?.inner || ''}`}>{children}</div>}
    </div>
);
TabContent.displayName = 'TabContent';

interface TabsComponent extends FC<TabsProps> {
    Tab: typeof Tab;
    TabContent: typeof TabContent;
}

export const Tabs = TabsBase as TabsComponent;
Tabs.Tab = Tab;
Tabs.TabContent = TabContent;

Tabs.displayName = 'Tabs';
