import {Children, cloneElement, FC, useEffect, useRef, useState} from "react";
import useClickOutside from "../../hooks/click-outside";
import './popover.scss';
import {addNavigation, onHashChanges, removeNavigation} from "../../utils/navigator";
import {useWidth} from "../../hooks/use-width";

export interface props {
    classNames?: {
        root?: string;
        label?: string;
        title?: string;
        input?: string;
        errorText?: string;
    };
    placement?: "top-start" | "top" | "top-end" | "bottom-start" | "bottom" | "bottom-end" | "right-start" | "right" | "right-end" | "left-start" | "left" | "left-end";
    children?: any;
}

export const Popover: FC<props> = ({
                                       classNames = {
                                           root: "",
                                           label: "",
                                           title: "",
                                           input: "",
                                           errorText: "",
                                       },
                                       placement = "bottom-start",
                                       children,
                                       ...otherProps
                                   }) => {
    const [trigger, content] = Children.toArray(children);
    const [isShow, setIsShow] = useState(false);
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
    const isHashChanged = onHashChanges('#popover');
    const rootRef = useRef(undefined);
    const handlerRef = useRef(undefined);
    const onTrigger = () => {
        setIsShow(prevState => !prevState);
    }
    const onClose = () => {
        setIsShow(false);

    }
    useClickOutside(rootRef, handlerRef, onClose);

    useEffect(() => {
        if (!isShow) {
            setBounds({
                top: undefined,
                bottom: undefined,
                left: undefined,
                right: undefined,
            })
        } else {
            update()
        }
    }, [isShow])
    useEffect(() => {
        if (getDeviceWidth < 768) {
            if (isShow) {
                addNavigation('popover');
                // document.body.style.overflow = 'hidden';
                handlerRef.current?.focus();
            } else {
                if (window.location.hash && !document.referrer.includes('#')) {
                    removeNavigation();
                }
                // document.body.style.overflow = 'auto';
            }
        }
    }, [isShow]);
    useEffect(() => {
        if (isHashChanged) {
            setIsShow(false)
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
                        if ((window.innerHeight || document.documentElement.clientHeight) - handlerRefRect.bottom > rect.height) {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-top-start"
                            });
                            setBounds({
                                top: handlerRefRect.height,
                                bottom: undefined,
                                left: !isRtl ? 0 : undefined,
                                right: isRtl ? 0 : undefined,
                            })
                        } else {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-bottom-start"
                            });
                            setBounds({
                                top: undefined,
                                bottom: handlerRefRect.height,
                                left: !isRtl ? 0 : undefined,
                                right: isRtl ? 0 : undefined,
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
                                top: handlerRefRect.height,
                                bottom: undefined,
                                left: !isRtl ? 0 : undefined,
                                right: isRtl ? 0 : undefined,
                            })
                        } else {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-bottom-end"
                            });
                            setBounds({
                                top: undefined,
                                bottom: handlerRefRect.height,
                                left: !isRtl ? 0 : undefined,
                                right: isRtl ? 0 : undefined,
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
                            bottom: handlerRefRect.height,
                            left: !isRtl ? 0 : undefined,
                            right: isRtl ? 0 : undefined,
                        }
                        if ((window.innerHeight || document.documentElement.clientHeight) - handlerRefRect.bottom > rect.height) {
                            position = {
                                ...position,
                                y: 'top'
                            }
                            bounds = {
                                ...bounds,
                                top: handlerRefRect.height,
                                bottom: undefined,
                            }
                        }
                        if (!isRtl) {
                            if (((rect.width / 2) - (handlerRefRect.width / 2)) < handlerRefRect.left) {
                                bounds = {
                                    ...bounds,
                                    left: ((rect.width / 2) - (handlerRefRect.width / 2)) * -1,
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
                            console.log()
                            if ((window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right > ((rect.width / 2) - (handlerRefRect.width / 2))) {
                                bounds = {
                                    ...bounds,
                                    left: undefined,
                                    right: ((rect.width / 2) - (handlerRefRect.width / 2)) * -1,
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
                            top: handlerRefRect.height,
                            bottom: undefined,
                            left: !isRtl ? 0 : undefined,
                            right: isRtl ? 0 : undefined,
                        }
                        if (handlerRefRect.top - rect.height > 0) {
                            position = {
                                ...position,
                                y: 'bottom'
                            }
                            bounds = {
                                ...bounds,
                                top: undefined,
                                bottom: handlerRefRect.height,
                            }
                        }
                        if (!isRtl) {
                            if (((rect.width / 2) - (handlerRefRect.width / 2)) < handlerRefRect.left) {
                                bounds = {
                                    ...bounds,
                                    left: ((rect.width / 2) - (handlerRefRect.width / 2)) * -1,
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
                                    right: ((rect.width / 2) - (handlerRefRect.width / 2)) * -1,
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
                        if (handlerRefRect.top - rect.height > 0) {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-bottom-start"
                            });
                            setBounds({
                                top: undefined,
                                bottom: handlerRefRect.height,
                                left: !isRtl ? 0 : undefined,
                                right: isRtl ? 0 : undefined,
                            })
                        } else {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-top-start"
                            });
                            setBounds({
                                top: handlerRefRect.height,
                                bottom: undefined,
                                left: !isRtl ? 0 : undefined,
                                right: isRtl ? 0 : undefined,
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
                                bottom: handlerRefRect.height,
                                left: !isRtl ? 0 : undefined,
                                right: isRtl ? 0 : undefined,
                            })
                        } else {
                            setAnimation({
                                type: animate.type,
                                position: "transform-origin-top-end"
                            });
                            setBounds({
                                top: handlerRefRect.height,
                                bottom: undefined,
                                left: !isRtl ? 0 : undefined,
                                right: isRtl ? 0 : undefined,
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

    useEffect(() => {
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("resize", update);
        };
    }, [update]);
    return (
        <div className={`naria-popover ${classNames.root}`} data-class-prop="root">
            {cloneElement((trigger as any), {onClick: () => onTrigger(), ref: handlerRef})}
            {
                isShow && (
                    <div className={`naria-popover__content ${animate.type} ${animate.position}`} ref={rootRef} style={{
                        bottom: bounds.bottom !== undefined ? bounds.bottom : "unset",
                        top: bounds.top !== undefined ? bounds.top : "unset",
                        left: bounds.left !== undefined ? bounds.left : "unset",
                        right: bounds.right !== undefined ? bounds.right : "unset",
                    }}>
                        {content}
                    </div>
                )
            }
        </div>
    );
};


