import React, {
    cloneElement,
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import useClickOutside from "../../hooks/click-outside";
import './popover.scss';
import {addNavigation, onHashChanges, removeNavigation} from "../../utils/navigator";
import {useWidth} from "../../hooks/use-width";
import {Portal} from "../Portal";
import {generateRandom} from "../../utils/generate-random";

export interface Props {
    classNames?: {
        root?: string;
    };
    backdrop?: "opaque" | "blur" | "transparent";
    placement?: "top-start" | "top" | "top-end" | "bottom-start" | "bottom" | "bottom-end" | "right-start" | "right" | "right-end" | "left-start" | "left" | "left-end";
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    children?: React.ReactNode;
}

interface PopoverContextType {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    onBackdropClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    placement: string;
    backdrop: string;
    animate: { type: string; position: string };
    bounds: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
    rootRef: React.RefObject<HTMLDivElement>;
    handlerRef: React.RefObject<HTMLDivElement>;
    updatePosition: () => void;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export const PopoverTrigger = ({children}: {
    children?: React.ReactNode,
}) => {
    const context = useContext(PopoverContext);
    if (!context) throw new Error("PopoverTrigger must be used within Popover");

    const {onToggle, handlerRef} = context;

    return (
        <>
            {cloneElement(children as any, {
                onClick: onToggle,
                ref: handlerRef
            })}
        </>
    );
};

export const PopoverContent = ({children, classNames}: {
    children?: React.ReactNode,
    classNames?: { content?: string; backdrop?: string; }
}) => {
    const context = useContext(PopoverContext);
    if (!context) throw new Error("PopoverContent must be used within Popover");

    const {
        isOpen,
        onBackdropClick,
        backdrop,
        animate,
        bounds,
        rootRef,
    } = context;

    const getDeviceWidth = useWidth();

    return (
        <>
            {isOpen ? (
                <Portal>
                    {getDeviceWidth < 768 ? (
                        <div
                            onClick={onBackdropClick}
                            className={`naria-popover__backdrop ${backdrop !== 'transparent' ? `backdrop--${backdrop}` : ''} ${classNames?.backdrop || ''}`}
                            data-class-prop="backdrop">
                            <div
                                className={`naria-popover__content naria-popover__content--mobile ${classNames?.content || ''}`}
                                data-class-prop="content">
                                {children}
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`naria-popover__content naria-popover__content--desktop ${animate.type} ${animate.position} ${classNames?.content || ''}`}
                            ref={rootRef}
                            style={{
                                bottom: bounds.bottom !== undefined ? bounds.bottom : "unset",
                                top: bounds.top !== undefined ? bounds.top : "unset",
                                left: bounds.left !== undefined ? bounds.left : "unset",
                                right: bounds.right !== undefined ? bounds.right : "unset",
                            }}
                            data-class-prop="content">
                            {children}
                        </div>
                    )}
                </Portal>
            ) : null}
        </>
    );
};

const PopoverBase: FC<Props> = ({
                                    classNames = {
                                        root: ""
                                    },
                                    backdrop = "opaque",
                                    placement = "bottom-start",
                                    isOpen = false,
                                    onOpenChange,
                                    children,
                                }) => {
    const [animate, setAnimation] = useState({
        type: "fade-in-scale",
        position: ""
    });
    const [bounds, setBounds] = useState<{
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    }>({});
    const getDeviceWidth = useWidth();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const handlerRef = useRef<HTMLDivElement | null>(null);
    const randomUUIDRef = useRef<string>(generateRandom(5));
    const isHashChanged = onHashChanges(`#popover-${randomUUIDRef.current}`);

    const onClose = () => {
        if (onOpenChange) {
            onOpenChange(false)
        }
    };

    const onToggle = () => {
        if (onOpenChange) {
            onOpenChange(!isOpen)
        }
    };

    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) onClose();
    };

    useClickOutside(rootRef, handlerRef, onClose);

    useEffect(() => {
        if (getDeviceWidth < 768) {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
                handlerRef.current?.focus();
                setTimeout(() => {
                    addNavigation(`popover-${randomUUIDRef.current}`);
                }, 50)
            } else {
                if (window.location.hash && !document.referrer.includes('#')) {
                    removeNavigation(`popover-${randomUUIDRef.current}`);
                }
                if ((window.location.hash.match(/#/g) || []).length === 0) {
                    document.body.style.overflow = 'auto';
                }
            }
        } else {
            if (!isOpen) {
                setBounds({
                    top: undefined,
                    bottom: undefined,
                    left: undefined,
                    right: undefined,
                })
            } else {
                setTimeout(() => {
                    update()
                }, 0)
            }
        }
    }, [isOpen, getDeviceWidth])

    useEffect(() => {
        if (isHashChanged) {
            onClose()
        }
    }, [isHashChanged])

    useEffect(() => {
        const handleScroll = (e: Event) => {
            const target = e.target as HTMLElement;
            if (isOpen && rootRef.current && !rootRef.current.contains(target)) {
                onClose();
            }
        };
        window.addEventListener('scroll', handleScroll, { capture: true });

        return () => {
            window.removeEventListener('scroll', handleScroll, { capture: true });
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    const update = useCallback(() => {
        if (handlerRef?.current && rootRef.current) {
            const isRtl = document.documentElement?.getAttribute('dir') === 'rtl';
            const handlerRect = handlerRef.current.getBoundingClientRect();
            const popoverRect = rootRef.current.getBoundingClientRect();
            const {bounds, animationPosition} = getPopoverBoundsAndAnimation(
                placement,
                handlerRect,
                popoverRect,
                isRtl,
                animate.type
            );

            setBounds(bounds);
            setAnimation(animationPosition);
        }
    }, [placement, animate.type]);

    const getPopoverBoundsAndAnimation = (
        placement: string,
        handlerRect: DOMRect,
        popoverRect: DOMRect,
        isRtl: boolean,
        animateType: string
    ) => {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        let bounds: { top?: number; bottom?: number; left?: number; right?: number } = {};
        let animationPosition = "";

        const fitsBelow = windowHeight - handlerRect.bottom > popoverRect.height;
        const fitsAbove = handlerRect.top > popoverRect.height;
        const horizontalCenterOffset = (popoverRect.width - handlerRect.width) / 2;

        switch (placement) {
            case "bottom-start": {
                if (fitsBelow) {
                    animationPosition = "transform-origin-top-start";
                    bounds.top = handlerRect.bottom + window.scrollY;
                } else {
                    animationPosition = "transform-origin-bottom-start";
                    bounds.bottom = windowHeight - handlerRect.top - window.scrollY;
                }
                bounds.left = !isRtl ? handlerRect.left : undefined;
                bounds.right = isRtl ? windowWidth - handlerRect.right : undefined;
                break;
            }

            case "bottom-end": {
                if (fitsBelow) {
                    animationPosition = "transform-origin-top-end";
                    bounds.top = handlerRect.bottom + window.scrollY;
                    bounds.left = !isRtl ? handlerRect.right - popoverRect.width : undefined;
                    bounds.right = isRtl ? windowWidth - handlerRect.right - (popoverRect.width - handlerRect.width) : undefined;
                } else {
                    animationPosition = "transform-origin-bottom-end";
                    bounds.bottom = windowHeight - handlerRect.top - window.scrollY;
                    bounds.left = !isRtl ? handlerRect.left : undefined;
                    bounds.right = isRtl ? windowWidth - handlerRect.right : undefined;
                }
                break;
            }

            case "bottom":
            case "top": {
                const isTop = placement === "top";
                const fitsPreferred = isTop ? fitsAbove : fitsBelow;
                animationPosition = `transform-origin-${fitsPreferred ? (isTop ? 'bottom' : 'top') : (isTop ? 'top' : 'bottom')}-center`;

                if (fitsPreferred) {
                    bounds.top = !isTop ? handlerRect.bottom + window.scrollY : undefined;
                    bounds.bottom = isTop ? windowHeight - handlerRect.top - window.scrollY : undefined;
                } else {
                    bounds.top = !isTop ? undefined : handlerRect.bottom + window.scrollY;
                    bounds.bottom = isTop ? undefined : windowHeight - handlerRect.top - window.scrollY;
                }

                if (!isRtl) {
                    bounds.left = Math.max(handlerRect.left - horizontalCenterOffset, 0);
                } else {
                    bounds.right = Math.max(windowWidth - handlerRect.right - horizontalCenterOffset, 0);
                }
                break;
            }

            case "top-start": {
                if (fitsAbove) {
                    animationPosition = "transform-origin-bottom-start";
                    bounds.bottom = windowHeight - handlerRect.top - window.scrollY;
                } else {
                    animationPosition = "transform-origin-top-start";
                    bounds.top = handlerRect.bottom + window.scrollY;
                }
                bounds.left = !isRtl ? handlerRect.left : undefined;
                bounds.right = isRtl ? windowWidth - handlerRect.right : undefined;
                break;
            }

            case "top-end": {
                if (fitsAbove) {
                    animationPosition = "transform-origin-bottom-end";
                    bounds.bottom = windowHeight - handlerRect.top - window.scrollY;
                    bounds.top = undefined;
                } else {
                    animationPosition = "transform-origin-top-end";
                    bounds.top = handlerRect.bottom + window.scrollY;
                    bounds.bottom = undefined;
                }

                if (!isRtl) {
                    bounds.left = handlerRect.right - popoverRect.width;
                    bounds.right = undefined;
                } else {
                    bounds.left = undefined;
                    bounds.right = windowWidth - handlerRect.left - popoverRect.width;
                }
                break;
            }

            case "right-start": {
                const fitsRight = windowWidth - handlerRect.right > popoverRect.width;
                const fitsLeft = handlerRect.left > popoverRect.width;

                if (!isRtl) {
                    if (fitsRight) {
                        animationPosition = "transform-origin-right-start";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else if (fitsLeft) {
                        animationPosition = "transform-origin-left-start";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else {
                        animationPosition = "transform-origin-right-start";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    }
                } else {
                    if (fitsLeft) {
                        animationPosition = "transform-origin-left-start";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else if (fitsRight) {
                        animationPosition = "transform-origin-right-start";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else {
                        animationPosition = "transform-origin-left-start";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    }
                }

                bounds.top = handlerRect.top + window.scrollY;
                bounds.bottom = undefined;

                break;
            }

            case "right": {
                const fitsRight = windowWidth - handlerRect.right > popoverRect.width;
                const fitsLeft = handlerRect.left > popoverRect.width;

                if (!isRtl) {
                    if (fitsRight) {
                        animationPosition = "transform-origin-left-center";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else if (fitsLeft) {
                        animationPosition = "transform-origin-right-center";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else {
                        animationPosition = "transform-origin-left-center";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    }
                } else {
                    if (fitsLeft) {
                        animationPosition = "transform-origin-right-center";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else if (fitsRight) {
                        animationPosition = "transform-origin-left-center";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else {
                        animationPosition = "transform-origin-right-center";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    }
                }

                bounds.top = handlerRect.top + (handlerRect.height / 2) - (popoverRect.height / 2) + window.scrollY;
                bounds.bottom = undefined;

                break;
            }

            case "right-end": {
                const fitsRight = windowWidth - handlerRect.right > popoverRect.width;
                const fitsLeft = handlerRect.left > popoverRect.width;

                if (!isRtl) {
                    if (fitsRight) {
                        animationPosition = "transform-origin-left-bottom";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else if (fitsLeft) {
                        animationPosition = "transform-origin-right-bottom";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else {
                        animationPosition = "transform-origin-left-bottom";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    }
                } else {
                    if (fitsLeft) {
                        animationPosition = "transform-origin-right-bottom";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else if (fitsRight) {
                        animationPosition = "transform-origin-left-bottom";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else {
                        animationPosition = "transform-origin-right-bottom";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    }
                }

                bounds.top = handlerRect.bottom - popoverRect.height + window.scrollY;
                bounds.bottom = undefined;

                break;
            }
            case "left-start": {
                const fitsLeft = handlerRect.left > popoverRect.width;
                const fitsRight = windowWidth - handlerRect.right > popoverRect.width;

                if (!isRtl) {
                    if (fitsLeft) {
                        animationPosition = "transform-origin-left-start";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else if (fitsRight) {
                        animationPosition = "transform-origin-right-start";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else {
                        animationPosition = "transform-origin-left-start";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    }
                } else {
                    if (fitsRight) {
                        animationPosition = "transform-origin-right-start";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else if (fitsLeft) {
                        animationPosition = "transform-origin-left-start";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else {
                        animationPosition = "transform-origin-right-start";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    }
                }

                bounds.top = handlerRect.top + window.scrollY;
                bounds.bottom = undefined;

                break;
            }
            case "left": {
                const fitsLeft = handlerRect.left > popoverRect.width;
                const fitsRight = windowWidth - handlerRect.right > popoverRect.width;

                if (!isRtl) {
                    if (fitsLeft) {
                        animationPosition = "transform-origin-right-center";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else if (fitsRight) {
                        animationPosition = "transform-origin-left-center";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else {
                        animationPosition = "transform-origin-right-center";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    }
                } else {
                    if (fitsRight) {
                        animationPosition = "transform-origin-left-center";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else if (fitsLeft) {
                        animationPosition = "transform-origin-right-center";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else {
                        animationPosition = "transform-origin-left-center";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    }
                }
                bounds.top = handlerRect.top + (handlerRect.height / 2) - (popoverRect.height / 2) + window.scrollY;
                bounds.bottom = undefined;

                break;
            }
            case "left-end": {
                const fitsLeft = handlerRect.left > popoverRect.width;
                const fitsRight = windowWidth - handlerRect.right > popoverRect.width;

                if (!isRtl) {
                    if (fitsLeft) {
                        animationPosition = "transform-origin-right-bottom";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else if (fitsRight) {
                        animationPosition = "transform-origin-left-bottom";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else {
                        animationPosition = "transform-origin-right-bottom";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    }
                } else {
                    if (fitsRight) {
                        animationPosition = "transform-origin-left-bottom";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    } else if (fitsLeft) {
                        animationPosition = "transform-origin-right-bottom";
                        bounds.left = undefined;
                        bounds.right = windowWidth - handlerRect.left - window.scrollX;
                    } else {
                        animationPosition = "transform-origin-left-bottom";
                        bounds.left = handlerRect.right + window.scrollX;
                        bounds.right = undefined;
                    }
                }
                bounds.top = handlerRect.bottom - popoverRect.height + window.scrollY;
                bounds.bottom = undefined;

                break;
            }
            default:
                break;
        }

        return {bounds, animationPosition: {type: animateType, position: animationPosition}};
    }

    useEffect(() => {
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("resize", update);
        };
    }, [update]);

    const contextValue: PopoverContextType = {
        isOpen,
        onToggle,
        onClose,
        onBackdropClick,
        placement,
        backdrop,
        animate,
        bounds,
        rootRef,
        handlerRef,
        updatePosition: update
    };

    return (
        <PopoverContext.Provider value={contextValue}>
            <div className={`naria-popover ${classNames?.root || ""}`} data-class-prop="root">
                {children}
            </div>
        </PopoverContext.Provider>
    );
};

interface PopoverComponent extends FC<Props> {
    Trigger: typeof PopoverTrigger;
    Content: typeof PopoverContent;
}

export const Popover = PopoverBase as PopoverComponent;
Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.displayName = 'Popover';