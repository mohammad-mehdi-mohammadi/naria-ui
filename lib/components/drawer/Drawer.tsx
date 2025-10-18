"use client"
import {FC, forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {useWidth} from '@/hooks/use-width';
import {useRouter} from 'next/navigation';

export interface LibDrawerProps {
    children?: React.ReactNode;
    size?: string;
    position?: "TOP" | "RIGHT" | "LEFT" | "BOTTOM";
}

export interface LibDrawerRef {
    onToggle: () => void;
}

const Drawer = forwardRef<LibDrawerRef, LibDrawerProps>(({size, children, position = "TOP"}, ref) => {
    useImperativeHandle(ref, () => ({
        onToggle: () => onToggle(),
    }));
    const getDeviceWidth = useWidth();
    const router = useRouter();
    const [isShow, setIsShow] = useState(false);
    const onToggle = () => {
        setIsShow(!isShow);
    }
    const onToggleEvent = (e) => {
        if (e?.target?.className.toString()?.includes('backdrop')) {
            onToggle()
        }
    }
    const getPosition = () => {
        if (position === "TOP") {
            return `top-0 ${getDeviceWidth < 1024 ? '' : 'rounded-b-xl'}`
        }
        if (position === "BOTTOM") {
            return `bottom-0 ${getDeviceWidth < 1024 ? '' : 'rounded-t-xl'}`
        }
        if (position === "LEFT") {
            return `left-0 ${getDeviceWidth < 1024 ? '' : 'rounded-r-xl'}`
        }
        if (position === "RIGHT") {
            return `right-0 ${getDeviceWidth < 1024 ? '' : 'rounded-l-xl'}`
        }
    }

    useEffect(() => {
        const handlePopState = () => {
            setIsShow(false);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    useEffect(() => {
        if (getDeviceWidth < 1024) {
            if (isShow) {
                router.push('#drawer');
            } else {
                if (window.location.hash && !document.referrer.includes('#')) {
                    router.back();
                }
            }
        }
        if (isShow) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isShow]);

    return (
        <>
            {isShow ?
                (
                    <div
                        className={`backdrop bg-dark-100/20 backdrop-blur-sm fixed lg:place-items-center lg:grid right-0 top-0 left-0 bottom-0 w-full h-full z-40 duration-200 transition-opacity ${isShow ? "opacity-1" : "opacity-0 hidden pointer-events-none"}`}
                        onClick={onToggleEvent}>
                        <div
                            className={`absolute z-50 transform p-3 md:p-5 bg-grey-100 shadow-xl transition-opacity
                            ${getPosition()}
                             duration-200 h-full w-full lg:h-auto ${size ? size : "max-w-lg"}
                              ${isShow ? "opacity-1" : "opacity-0 pointer-events-none"}`}>
                            <div
                                className="overflow-y-auto max-h-[calc(100vh-60px)] md:max-h-[calc(100vh-90px)] h-full">
                                {children}
                            </div>
                        </div>
                    </div>
                ) : undefined
            }

        </>
    );
});

export default Drawer;