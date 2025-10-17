"use client"
import {FC, useEffect, useState} from "react";
import AngleDown from "@/assets/icons/angle-down.svg";
import Close from '@/assets/icons/close.svg';
import Loading from '@/components/shared/loading/Loading';
import {useWidth} from '@/hooks/use-width';
import {useRouter} from 'next/navigation';

export interface props {
    list?: any[];
    label?: string;
    title: string;
    value?: string;
    api?: any;
    maxHeight?: string;
    theme?: "secondary";
    hasError?: string | null;
    size?: "md" | "sm";
    onSelectChange?: any;
    selected?: any;
}

const themes = {
    secondary: {
        input: `border
                bg-transparent 
                placeholder:text-secondary-400 
                outline-1 
                outline-primary-100  
                border-secondary-300 
                rounded-md 
                hover:not:border-primary-100 
                focus:outline 
                focus:border-primary-100
                
                disabled:text-secondary-100
                disabled:border-secondary-500`,

        label: `text-dark-100
                peer-focus:text-primary-100 
                peer-focus:scale-90
                
                peer-disabled:text-secondary-400`
    }
}
const sizes = {
    sm: {
        input: "text-xs px-2 py-1",
        label: `px-1 text-xs `,
    },
    md: {
        input: "text-sm px-3 py-2.5",
        label: `px-1 text-xs`,
    },
}
const Select: FC<props> = ({
                                  list, label, hasError,
                                  title, value, api,
                                  maxHeight = "max-h-64", theme = "secondary", size = "md",
                                  onSelectChange,
                                  selected
                              }) => {
    const getDeviceWidth = useWidth();
    const router = useRouter();
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [localSelected, setLocalSelected] = useState(null);
    const [localList, setLocalList] = useState(null);
    useEffect(() => {
        if (api) {
            setIsLoading(true);
            api().then((res) => {
                setIsLoading(false);
                setLocalList(res?.data?.message ? [] : res.data);
            })
        }
    }, [api]);
    useEffect(() => {
        if (getDeviceWidth < 1024) {

            if (isShow) {
                router.push('#select');
                document.body.style.overflow = 'hidden';
            } else {

                if (window.location.hash && !document.referrer.includes('#')) {
                    router.back();
                }
                document.body.style.overflow = 'auto';
            }
        }
    }, [isShow]);

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
        if (label?.length) {
            setLocalSelected(localList?.find(item => item[label] === selected));
        } else {
            setLocalSelected(selected);
        }
    }, [selected, localList]);

    const onToggle = () => {
        setIsShow(prevState => !prevState);
    }
    const onToggleEvent = (e) => {
        if (e?.target?.className.toString()?.includes('backdropSelect')) {
            onToggle()
        }
    }
    const onSelect = (item) => {
        setLocalSelected(item);
        onToggle();
        onSelectChange(item);
    }

    const getActiveClass = (item) => {
        if (!localSelected) {
            return "";
        }
        if (label?.length && item[label] === localSelected[label]) {
            return "bg-grey-100"
        }
        if (item === localSelected) {
            return "bg-grey-100"
        }
    }
    return (
        <div className="relative">
            <label
                className={`cursor-pointer
                ${hasError && "!text-danger-100"}`}>
                <span className={`${themes[theme].label} ${sizes[size].label}`}>{title}</span>
                <button type="button"
                        className={`relative z-20 flex items-center mt-1 text-base justify-between gap-2 w-full ${localSelected ? "text-dark-100" : "text-grey-300"} ${themes[theme].input} ${sizes[size].input} ${hasError && "!border-danger-100 focus:border-danger-100 outline-danger-100"}`}
                        onClick={onToggle}>
                    {
                        localSelected ? (
                            value?.length ? localSelected[value] : localSelected
                        ) : "انتخاب"
                    } <AngleDown
                    className={`w-4 h-4 transition ease duration-200 ${!isShow ? "rotate-0" : "rotate-180"}`}/>
                </button>
            </label>

            {
                isShow ? (
                    <div
                        className={`overflow-hidden ${getDeviceWidth < 1024 ? "fixed top-0 right-0 h-full w-full z-40" : ""}`}>
                        <div
                            className={`flex flex-col w-full z-40 bg-light-100 w-full shadow-lg border border-secondary-300 ${getDeviceWidth < 1024 ? "relative h-full pt-1 pb-5 px-5" : `animate-fade-in-translate-y mt-1 rounded-lg absolute ${maxHeight}`} overflow-auto`}>
                            {
                                api && isLoading ? (
                                    <div className="py-10 flex justify-center">
                                        <Loading size="w-7 h-7"/>
                                    </div>
                                ) : (
                                    <>
                                        {
                                            getDeviceWidth < 1024 ? (
                                                <div className="sticky top-0 text-left">
                                                    <button className="p-3" onClick={onToggle}>
                                                        <Close className="w-6"/>
                                                    </button>
                                                </div>
                                            ) : undefined
                                        }
                                        {
                                            localList?.map((item, index) => {
                                                return (
                                                    <>
                                                        <button type="button" onClick={() => onSelect(item)} key={index}
                                                                className={`text-right py-2.5 px-4 text-base hover:bg-grey-100 rounded-lg ${getActiveClass(item)}`}>
                                                            {value?.length ? item[value] : item}
                                                        </button>
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                )
                            }
                        </div>
                        <div
                            className={`backdropSelect fixed top-0 left-0 bottom-0 w-full h-full z-30`}
                            onClick={onToggleEvent}>

                        </div>
                    </div>
                ) : undefined
            }
            {
                hasError &&
                <p className="text-xs mt-1 text-danger-100">{hasError}</p>
            }

        </div>
    );
};

export default Select;