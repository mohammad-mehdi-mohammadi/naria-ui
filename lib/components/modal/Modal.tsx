"use client"
import {FC, forwardRef, useEffect, useImperativeHandle, useState} from "react";
import Close from '@/assets/icons/close.svg'
import {useWidth} from '@/hooks/use-width';
import {addNavigation, onHashChanges, removeNavigation} from "@/utils/navigator/navigator-v2";

export interface LibModalProps {
    title?: string;
    children?: React.ReactNode;
    size?: string;
    height?: string;
}

export interface LibModalRef {
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const Modal = forwardRef<LibModalRef, LibModalProps>(({title, size, height, children}, ref) => {
    const getDeviceWidth = useWidth();
    const isHashChanged = onHashChanges();
    const [isShow, setIsShow] = useState(false);

    const open = () => setIsShow(true);
    const close = () => setIsShow(false);
    const toggle = () => setIsShow((v) => !v);

    useImperativeHandle(ref, () => ({open, close, toggle}), []);

    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) close();
    };

    useEffect(() => {
        if (isHashChanged) {
            close();
        }
    }, [isHashChanged])

    useEffect(() => {
        if (getDeviceWidth < 1024) {
            if (isShow) {
                addNavigation()
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
            className={`backdrop bg-dark-100/30 fixed items-end justify-center px-4 md:px-10 lg:px-0 
            lg:place-items-center flex right-0 top-0 left-0 bottom-0 w-full h-full z-50 duration-200 transition-opacity ${
                isShow ? "opacity-1" : "opacity-0 hidden pointer-events-none"
            }`}
            onClick={onBackdropClick}
        >
            <div
                className={`transform p-3 md:p-5 rounded-t-2xl lg:rounded-2xl bg-grey-100 shadow-xl transition-opacity
                 duration-200 lg:h-auto w-full ${
                    size || " lg:max-w-2xl"
                } ${isShow ? "opacity-1" : "opacity-0 pointer-events-none"} ${
                    getDeviceWidth < 1024 ? `${height ? height : "h-[90vh]"} animate-drawer-bottom-to-top` : `${height ? height : "h-full"} animate-fade-in-translate-y`
                }`}
            >
                <div className="flex items-center justify-between">
                    <div className="font-bold text-base lg:text-lg">{title ?? ""}</div>
                    <button className="inline-block" onClick={close}>
                        <Close className="w-6"/>
                    </button>
                </div>
                <div
                    className="h-full overflow-y-auto mt-3 md:mt-5 max-h-[calc(100%-40px)] lg:max-h-[calc(100vh-90px)]">
                    {children}
                </div>
            </div>
        </div>
    ) : <></>;
});

Modal.displayName = "LibModal";
export default Modal;
