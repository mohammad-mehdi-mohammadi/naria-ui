import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {useWidth} from "../../hooks/use-width";
import {addNavigation, onHashChanges, removeNavigation} from "../../utils/navigator";
import Close from '../../assets/icons/close.svg?react';
import './modal.scss';

export interface LibModalProps {
    title?: string;
    children?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    backdropDismissible?: boolean;
    backdrop: "opaque" | "blur" | "transparent";
}

export interface LibModalRef {
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const Modal = forwardRef<LibModalRef, LibModalProps>(({title, size = "lg", backdropDismissible= true, backdrop = "opaque", children}, ref) => {
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
        console.log(isHashChanged)
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
            className={`naria-modal__backdrop naria-modal__backdrop--${backdrop} ${!backdropDismissible ? "naria-modal__backdrop--dismissible" : ""} ${
                isShow ? "naria-modal__backdrop--show" : ""
            }`}
            onClick={onBackdropClick}
        >
            <div
                className={`naria-modal ${size} ${isShow ? "naria-modal--show" : ""} ${
                    getDeviceWidth < 768 ? `naria-modal--mobile ` : `naria-modal--desktop`
                }`}
            >
                <div className="naria-modal__head flex items-center justify-between">
                    <div className="font-bold text-base lg:text-lg">{title ?? ""}</div>
                    <button className="inline-block" onClick={close}>
                        <Close className="w-6"/>
                    </button>
                </div>
                <div
                    className="naria-modal__body h-full overflow-y-auto mt-3 md:mt-5 max-h-[calc(100%-40px)] lg:max-h-[calc(100vh-90px)]">
                    {children}
                </div>
            </div>
        </div>
    ) : undefined;
});

