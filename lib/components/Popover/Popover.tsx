import {Children, cloneElement, FC, useEffect, useRef, useState} from "react";
import useClickOutside from "../../hooks/click-outside";
import './popover.scss';
import {addNavigation, onHashChanges, removeNavigation} from "../../utils/navigator";
import {useWidth} from "../../hooks/use-width";
import {Portal} from "../Portal";
import {generateRandom} from "../../utils/generate-random";


export interface props {
    classNames?: {
        root?: string;
        backdrop?: string;
        content?: string;
    };
    backdrop?: "opaque" | "blur" | "transparent";
    placement?: "top-start" | "top" | "top-end" | "bottom-start" | "bottom" | "bottom-end" | "right-start" | "right" | "right-end" | "left-start" | "left" | "left-end";
    isOpen: boolean;
    onOpenChange: any;
    children?: any;
}

export const Popover: FC<props> = ({
                                       classNames = {
                                           root: "",
                                           backdrop: "",
                                           content: "",
                                       },
                                       backdrop = "opaque",
                                       placement = "bottom-start",
                                       isOpen = false,
                                       onOpenChange,
                                       children,
                                       ...otherProps
                                   }) => {
    const [trigger, content] = Children.toArray(children);
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
    const rootRef = useRef(undefined);
    const handlerRef = useRef(undefined);
    const randomUUIDRef = useRef<string>(generateRandom(5));
    const isHashChanged = onHashChanges(`#popover-` + randomUUIDRef.current);
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
    useClickOutside(rootRef, handlerRef, onClose);

    useEffect(() => {

        if (getDeviceWidth < 768) {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
                handlerRef.current?.focus();
                setTimeout(() => {
                    addNavigation(`popover-` + randomUUIDRef.current);
                }, 50)
            } else {
                if (window.location.hash && !document.referrer.includes('#')) {
                    removeNavigation(`popover-` + randomUUIDRef.current);
                }
                if((window.location.hash.match(/#/g) || []).length === 0) {
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
    }, [isOpen])
    useEffect(() => {
        if (isHashChanged) {
            onClose()
        }
    }, [isHashChanged])

    useEffect(() => {
        document.addEventListener('scroll', onClose, {capture: true});
        return () => {
            document.removeEventListener('scroll', onClose, {capture: true});
            document.body.style.overflow = "auto";
        };
    }, [])
    const update = () => {
        if (handlerRef?.current && rootRef.current) {
            const isRtl = document.documentElement?.getAttribute('dir') === 'rtl';
            const handlerRect = handlerRef.current.getBoundingClientRect();
            const popoverRect = rootRef.current.getBoundingClientRect();
            console.log(placement)
            const { bounds, animationPosition } = getPopoverBoundsAndAnimation(
                placement,
                handlerRect,
                popoverRect,
                isRtl,
                animate.type
            );

            setBounds(bounds);
            setAnimation(animationPosition);
        }
    };
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

        return { bounds, animationPosition: { type: animateType, position: animationPosition } };
    }

    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) onClose();
    };

    useEffect(() => {
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("resize", update);
        };
    }, [update]);
    return (
        <>
            <div className={`naria-popover ${classNames.root}`} data-class-prop="root">
                {cloneElement((trigger as any), {onClick: () => onToggle(), ref: handlerRef})}
            </div>
            {
                isOpen ? (
                    <Portal>
                        {
                            getDeviceWidth < 768 ? (
                                <div
                                    onClick={onBackdropClick}
                                    className={`naria-popover__backdrop ${backdrop !== 'transparent' ? `backdrop--${backdrop}` : ''} ${classNames.backdrop}`}
                                    data-class-prop="backdrop">
                                    <div
                                        className={`naria-popover__content naria-popover__content--mobile ${classNames.content}`}
                                        data-class-prop="content">
                                        {content}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`naria-popover__content naria-popover__content--desktop ${animate.type} ${animate.position} ${classNames.content}`}
                                    ref={rootRef}
                                    style={{
                                        bottom: bounds.bottom !== undefined ? bounds.bottom : "unset",
                                        top: bounds.top !== undefined ? bounds.top : "unset",
                                        left: bounds.left !== undefined ? bounds.left : "unset",
                                        right: bounds.right !== undefined ? bounds.right : "unset",
                                    }} data-class-prop="content">
                                    {content}
                                </div>
                            )
                        }
                    </Portal>
                ) : undefined
            }
        </>
    );
};


