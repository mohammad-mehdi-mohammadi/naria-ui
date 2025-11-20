import {cloneElement, FC, forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {useWidth} from "../../hooks/use-width";
import {addNavigation, onHashChanges, removeNavigation} from "../../utils/navigator";
import Close from '../../assets/icons/close.svg?react';
import './modal.scss';

export interface LibModalProps {
    isOpen: boolean;
    title?: string;
    children?: React.ReactNode;
    backdropDismissible?: boolean;
    backdrop: "opaque" | "blur" | "transparent";
    hideCloseButton?: boolean;
    footer?: React.ReactNode;
    closeIcon?: React.ReactNode;
    onOpenChange: any;
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

export const Modal: FC<LibModalProps> = ({
                                             isOpen = false,
                                             title,
                                             backdropDismissible = true,
                                             backdrop = "opaque",
                                             hideCloseButton = false,
                                             footer,
                                             closeIcon,
                                             onOpenChange,
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
                                         }) => {
    const getDeviceWidth = useWidth();
    const randomUUIDRef = useRef(window.crypto.randomUUID());
    const isHashChanged = onHashChanges('#' + randomUUIDRef.current);
    // const [isShow, setIsShow] = useState(false);

    // const open = () => setIsShow(true);
    const onClose = () => onOpenChange(false);
    // const toggle = () => setIsShow((v) => !v);

    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (backdropDismissible && e.currentTarget === e.target) onClose();
    };

    useEffect(() => {
        if (isHashChanged) {
            onClose();
        }
    }, [isHashChanged])

    useEffect(() => {
        return () => {
            onClose()
        };

    }, [])

    useEffect(() => {
        console.log(isOpen)
        if (getDeviceWidth < 768) {
            if (isOpen) {
                addNavigation(randomUUIDRef.current)
            } else {
                removeNavigation();
            }
        }
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };

    }, [isOpen]);

    return isOpen ? (
        <div
            className={`naria-modal__backdrop ${backdrop !== 'transparent' ? `naria-modal__backdrop--${backdrop}` : ''} ${!backdropDismissible ? "naria-modal__backdrop--dismissible" : ""} ${
                isOpen ? "naria-modal__backdrop--show" : ''
            } ${classNames.backdrop}`}
            data-class-prop="backdrop"
            onClick={onBackdropClick}
        >
            <div
                className={`naria-modal ${isOpen ? "naria-modal--show" : ""} ${
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
                                    closeIcon ? cloneElement((closeIcon as any), {onClick: () => onClose()}) : (
                                        <button className={`naria-modal__close-icon ${classNames.closeIcon}`}
                                                onClick={onClose} data-class-prop="closeIcon">
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
};

