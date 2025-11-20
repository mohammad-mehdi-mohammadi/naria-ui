import {cloneElement, forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {useWidth} from "../../hooks/use-width";
import {addNavigation, onHashChanges, removeNavigation} from "../../utils/navigator";
import Close from '../../assets/icons/close.svg?react';
import './modal.scss';

export interface LibModalProps {
    title?: string;
    children?: React.ReactNode;
    backdropDismissible?: boolean;
    backdrop: "opaque" | "blur" | "transparent";
    hideCloseButton?: boolean;
    footer?: React.ReactNode;
    closeIcon?: React.ReactNode;
    classNames?: {
        root?: string;
        backdrop?: string;
        title?: string;
        header?: string;
        body?: string;
        footer?: string;
        closeIcon?: string;
    };
}

export interface LibModalRef {
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const Modal = forwardRef<LibModalRef, LibModalProps>(({
                                                                 title,
                                                                 backdropDismissible = true,
                                                                 backdrop = "opaque",
                                                                 hideCloseButton = false,
                                                                 footer,
                                                                 closeIcon,
                                                                 classNames = {
                                                                     root: "",
                                                                     backdrop: "",
                                                                     title: "",
                                                                     header: "",
                                                                     body: "",
                                                                     footer: "",
                                                                     closeIcon: "",
                                                                 },
                                                                 children
                                                             }, ref) => {
    const getDeviceWidth = useWidth();
    const isHashChanged = onHashChanges('#modal');
    const [isShow, setIsShow] = useState(false);

    const open = () => setIsShow(true);
    const close = () => setIsShow(false);
    const toggle = () => setIsShow((v) => !v);

    useImperativeHandle(ref, () => ({open, close, toggle}), []);

    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (backdropDismissible && e.currentTarget === e.target) close();
    };

    useEffect(() => {
        if (isHashChanged) {
            close();
        }
    }, [isHashChanged])

    useEffect(() => {
        if (getDeviceWidth < 768) {
            if (isShow) {
                addNavigation('modal')
            } else {
                removeNavigation();
            }
        }
        document.body.style.overflow = isShow ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };

    }, [isShow]);

    return isShow ? (
        <div
            className={`naria-modal__backdrop ${backdrop !== 'transparent' ? `naria-modal__backdrop--${backdrop}` : ''} ${!backdropDismissible ? "naria-modal__backdrop--dismissible" : ""} ${
                isShow ? "naria-modal__backdrop--show" : ''
            } ${classNames.backdrop}`}
            data-class-prop="backdrop"
            onClick={onBackdropClick}
        >
            <div
                className={`naria-modal ${isShow ? "naria-modal--show" : ""} ${
                    getDeviceWidth < 768 ? `naria-modal--mobile ` : `naria-modal--desktop`
                } ${classNames.root}`}
                data-class-prop="root"
            >
                <header className={`naria-modal__header ${classNames.header}`} data-class-prop="header">
                    <div className={`naria-modal__title ${classNames.title}`}
                         data-class-prop="title">{title ?? ""}</div>
                    {
                        !hideCloseButton ? (
                            <>
                                {
                                    closeIcon ? cloneElement((closeIcon as any), {onClick: () => close()}) : (
                                        <button className={`naria-modal__close-icon ${classNames.closeIcon}`} onClick={close} data-class-prop="closeIcon">
                                            <Close/>
                                        </button>
                                    )
                                }
                            </>
                        ) : undefined
                    }
                </header>
                <div
                    className={`naria-modal__body ${classNames.body}`} data-class-prop="body">
                    {children}
                </div>
                {
                    footer ? (
                        <footer className={`naria-modal__footer ${classNames.footer}`} data-class-prop="footer">
                            {footer}
                        </footer>
                    ) : undefined
                }
            </div>
        </div>
    ) : undefined;
});

