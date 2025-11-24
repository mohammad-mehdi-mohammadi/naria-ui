import {Children, cloneElement, FC, useEffect, useRef, useState} from "react";
import useClickOutside from "../../hooks/click-outside";
import './popover.scss';
import {addNavigation, onHashChanges, removeNavigation} from "../../utils/navigator";
import {useWidth} from "../../hooks/use-width";
import {Portal} from "../Portal";


export interface props {
    classNames?: {
        root?: string;
        backdrop?: string;
        content?: string;
    };
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
                                       placement = "bottom-start",
                                       isOpen = false,
                                       onOpenChange,
                                       children,
                                       ...otherProps
                                   }) => {
    const [trigger, content] = Children.toArray(children);
    // const [isShow, setIsShow] = useState(false);
    const [animate, setAnimation] = useState({
        type: "fade-in-scale",
        position: ""
    });
    const [bounds, setBounds] = useState<{
        top: undefined | number,
        bottom: undefined | number,
        left: undefined | number,
        right: undefined | number,
    }>({
        top: undefined,
        bottom: undefined,
        left: undefined,
        right: undefined,
    });
    const getDeviceWidth = useWidth();
    const rootRef = useRef(undefined);
    const handlerRef = useRef(undefined);
    const randomUUIDRef = useRef(window.crypto.randomUUID());
    const isHashChanged = onHashChanges('#' + randomUUIDRef.current);
    // const onOpen = () => onOpenChange(true);
    const onClose = () => {
        if (onOpenChange) onOpenChange(false)
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
                    addNavigation(randomUUIDRef.current);
                }, 30)
            } else {
                if (window.location.hash && !document.referrer.includes('#')) {
                    removeNavigation();
                }
                document.body.style.overflow = 'auto';
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
                update()
            }
        }
    }, [isOpen])
    useEffect(() => {
        if (isHashChanged) {
            onClose()
        }
    }, [isHashChanged])


    useEffect(() => {
        ["scroll"].forEach(type => {
            window.addEventListener(type, onClose);
        });
        return () => {
            ["scroll"].forEach(type => {
                window.removeEventListener(type, onClose);
            });
        };
    }, [])
    const update = () => {
        setTimeout(() => {
            if (handlerRef?.current && rootRef.current) {
                const isRtl = document.documentElement?.getAttribute('dir') === 'rtl';
                const rect = rootRef.current.getBoundingClientRect();
                const handlerRefRect = handlerRef.current.getBoundingClientRect();
                switch (true) {
                    case placement === "bottom-start": {
                        if (window.innerHeight - handlerRefRect.bottom > rect.height) {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-top-start"
                            });
                            setBounds({
                                top: handlerRefRect.bottom + window.scrollY,
                                bottom: undefined,
                                left: !isRtl ? handlerRefRect.left : undefined,
                                right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                            })
                        } else {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-bottom-start"
                            });
                            setBounds({
                                top: undefined,
                                bottom: window.innerHeight - handlerRefRect.top - window.scrollY,
                                left: !isRtl ? handlerRefRect.left : undefined,
                                right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                            })
                        }
                        break;
                    }
                    case placement === "bottom-end": {
                        if ((window.innerHeight || document.documentElement.clientHeight) - handlerRefRect.bottom > rect.height) {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-top-end"
                            });
                            setBounds({
                                top: handlerRefRect.bottom + window.scrollY,
                                bottom: undefined,
                                left: !isRtl ? handlerRefRect.left : undefined,
                                right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                            })
                        } else {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-bottom-end"
                            });
                            setBounds({
                                top: undefined,
                                bottom: window.innerHeight - handlerRefRect.top - window.scrollY,
                                left: !isRtl ? handlerRefRect.left : undefined,
                                right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                            })
                        }
                        break;
                    }
                    case placement === "bottom": {
                        let position = {
                            y: "bottom",
                            x: "center"
                        }
                        let bounds: {
                            top: undefined | number,
                            bottom: undefined | number,
                            left: undefined | number,
                            right: undefined | number,
                        } = {
                            top: undefined,
                            bottom: window.innerHeight - handlerRefRect.top - window.scrollY,
                            left: !isRtl ? handlerRefRect.left : undefined,
                            right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                        }
                        if ((window.innerHeight || document.documentElement.clientHeight) - handlerRefRect.bottom > rect.height) {
                            position = {
                                ...position,
                                y: 'top'
                            }
                            bounds = {
                                ...bounds,
                                top: handlerRefRect.bottom + window.scrollY,
                                bottom: undefined,
                            }
                        }
                        if (!isRtl) {
                            if (((rect.width / 2) - (handlerRefRect.width / 2)) < handlerRefRect.left) {
                                bounds = {
                                    ...bounds,
                                    left: handlerRefRect.left - ((rect.width / 2) - (handlerRefRect.width / 2)),
                                    right: undefined,
                                }
                                position = {
                                    ...position,
                                    x: 'center'
                                }
                            } else {
                                position = {
                                    ...position,
                                    x: 'start'
                                }
                            }
                        } else {
                            if ((window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right > ((rect.width / 2) - (handlerRefRect.width / 2))) {
                                bounds = {
                                    ...bounds,
                                    left: undefined,
                                    right: ((window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right) - ((rect.width / 2) - (handlerRefRect.width / 2)),
                                }
                                position = {
                                    ...position,
                                    x: 'center'
                                }
                            } else {
                                position = {
                                    ...position,
                                    x: 'start'
                                }
                            }
                        }
                        setAnimation({
                            type: animate.type,
                            position: `transform-origin-${position.y}-${position.x}`
                        });
                        setBounds(bounds)
                        break;
                    }
                    case placement === "top": {
                        let position = {
                            y: "top",
                            x: "center"
                        }
                        let bounds: {
                            top: undefined | number,
                            bottom: undefined | number,
                            left: undefined | number,
                            right: undefined | number,
                        } = {
                            top: handlerRefRect.bottom + window.scrollY,
                            bottom: undefined,
                            left: !isRtl ? handlerRefRect.left : undefined,
                            right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                        }
                        if (handlerRefRect.top - rect.height > 0) {
                            position = {
                                ...position,
                                y: 'bottom'
                            }
                            bounds = {
                                ...bounds,
                                top: undefined,
                                bottom: window.innerHeight - handlerRefRect.top - window.scrollY,
                            }
                        }
                        if (!isRtl) {
                            if (((rect.width / 2) - (handlerRefRect.width / 2)) < handlerRefRect.left) {
                                bounds = {
                                    ...bounds,
                                    left: handlerRefRect.left - ((rect.width / 2) - (handlerRefRect.width / 2)),
                                    right: undefined,
                                }
                                position = {
                                    ...position,
                                    x: 'center'
                                }
                            } else {
                                position = {
                                    ...position,
                                    x: 'start'
                                }
                            }
                        } else {
                            if ((window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right > ((rect.width / 2) - (handlerRefRect.width / 2))) {
                                bounds = {
                                    ...bounds,
                                    left: undefined,
                                    right: ((window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right) - ((rect.width / 2) - (handlerRefRect.width / 2)),
                                }
                                position = {
                                    ...position,
                                    x: 'center'
                                }
                            } else {
                                position = {
                                    ...position,
                                    x: 'start'
                                }
                            }
                        }
                        setAnimation({
                            type: animate.type,
                            position: `transform-origin-${position.y}-${position.x}`
                        });
                        setBounds(bounds)
                        break;
                    }
                    case placement === "top-start": {
                        if (handlerRefRect.top > rect.height) {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-bottom-start"
                            });
                            setBounds({
                                top: undefined,
                                bottom: window.innerHeight - handlerRefRect.top - window.scrollY,
                                left: !isRtl ? handlerRefRect.left : undefined,
                                right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                            })
                        } else {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-top-start"
                            });
                            setBounds({
                                top: handlerRefRect.bottom + window.scrollY,
                                bottom: undefined,
                                left: !isRtl ? handlerRefRect.left : undefined,
                                right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                            })
                        }

                        break;
                    }
                    case placement === "top-end": {
                        if (handlerRefRect.top - rect.height > 0) {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-bottom-end"
                            });
                            setBounds({
                                top: undefined,
                                bottom: window.innerHeight - handlerRefRect.top - window.scrollY,
                                left: !isRtl ? handlerRefRect.left : undefined,
                                right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                            })
                        } else {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-top-end"
                            });
                            setBounds({
                                top: handlerRefRect.bottom + window.scrollY,
                                bottom: undefined,
                                left: !isRtl ? handlerRefRect.left : undefined,
                                right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                            })
                        }

                        break;
                    }
                    default: {
                        break
                    }
                }
            }
        }, 0)
    };
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
            {cloneElement((trigger as any), {onClick: () => onToggle(), ref: handlerRef})}



            <Portal>
                {
                    isOpen ? (
                        <div className={`naria-popover ${classNames.root}`} data-class-prop="root">
                            {
                                getDeviceWidth < 768 ? (
                                    <div
                                        onClick={onBackdropClick}
                                        className={`naria-popover__backdrop ${classNames.backdrop}`}
                                        data-class-prop="backdrop">
                                        <div className={`naria-popover__content naria-popover__content--mobile ${classNames.content}`} data-class-prop="content">
                                            {content}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`naria-popover__content naria-popover__content--desktop ${animate.type} ${animate.position} ${classNames.content}`} ref={rootRef}
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
                        </div>

                    ) : undefined
                }
            </Portal>
        </>
    );
};


