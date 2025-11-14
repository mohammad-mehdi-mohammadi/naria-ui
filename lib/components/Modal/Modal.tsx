import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {useWidth} from "../../hooks/use-width";
import {addNavigation, onHashChanges, removeNavigation} from "../../utils/navigator";
import Close from '../../assets/icons/close.svg?react';
import './modal.scss';

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

export const Modal = forwardRef<LibModalRef, LibModalProps>(({title, size, height, children}, ref) => {
    const getDeviceWidth = useWidth();
    const isHashChanged = onHashChanges('#modal');
    const [isShow, setIsShow] = useState(false);

    const open = () => setIsShow(true);
    const close = () => setIsShow(false);
    const toggle = () => setIsShow((v) => !v);

    useImperativeHandle(ref, () => ({open, close, toggle}), []);

    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) close();
    };

    useEffect(() => {
        console.log(isHashChanged)
        if (isHashChanged) {
            close();
        }
    }, [isHashChanged])

    useEffect(() => {
        if (getDeviceWidth < 1024) {
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
            className={`naria-modal__backdrop ${
                isShow ? "naria-modal__backdrop--show" : ""
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

